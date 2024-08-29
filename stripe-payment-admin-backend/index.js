const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

// Load environment variables
dotenv.config();

const emailPassword = process.env.EMAIL_PASS;
const email = process.env.EMAIL_USER;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// app.use(cors());

app.use(
  cors({
    origin:
      "https://authentic-afrobeats-full-stack-project-frontend.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

//////////// node mailer for receiving email notifcation when order is completed
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: emailPassword,
  },
});
///////// end of nodemailer

/////////// Webhook updated
app.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Middleware to parse raw body
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    console.log("Headers:", request.headers);
    console.log("Body:", request.body);

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Received event:", JSON.stringify(event, null, 2));
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:`, err.message);
      return response.sendStatus(400);
    }

    // Handle the event
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId; // Access orderId from metadata
          const totalAmount = paymentIntent.amount / 100;

          if (!orderId) {
            console.error(
              "No orderId found in metadata in payment_intent.succeeded"
            );
          } else {
            console.log("Found orderId in metadata:", orderId);
          }

          const { error: updateError } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("id", orderId);

          if (updateError) {
            console.error("Error updating order status:", updateError);
            return response.sendStatus(500);
          }

          ///////receiving email for each succesful order
          const mailOptions = {
            from: "aafoodstores@gmail.com", // Your main email
            to: "aafoodstores@gmail.com, ipadeola.it@gmail.com", // Both your main and admin notification emails
            subject: `New Order Placed - Order ID: ${orderId}`,
            text: `A new order has been placed.\n\nOrder ID: ${orderId}\nStatus: Paid\nTotal Amount: $${totalAmount}\n\n\nPlease check the admin panel for more details.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
          ////// end of email receiving

          ///////////
          // Send the receipt to the user's email
          const chargeId = paymentIntent.latest_charge;
          const email = paymentIntent.receipt_email; // Ensure receipt_email was set when creating the PaymentIntent

          if (chargeId && email) {
            await stripe.charges.update(chargeId, {
              receipt_email: email,
            });
            console.log("Receipt sent to:", email);
          }
          ///////////

          break;

        case "charge.succeeded":
          const charge = event.data.object;
          const chargePaymentIntentId = charge.payment_intent;

          if (!chargePaymentIntentId) {
            console.error("No payment_intent ID found in charge.succeeded");
            return response.sendStatus(400);
          }

          const paymentIntentDetails = await stripe.paymentIntents.retrieve(
            chargePaymentIntentId
          );

          const chargeOrderId = paymentIntentDetails.metadata.orderId;

          if (!chargeOrderId) {
            console.error("No orderId found in metadata of paymentIntent");
          } else {
            console.log("Found orderId in metadata:", chargeOrderId);

            const { error: chargeUpdateError } = await supabase
              .from("orders")
              .update({ status: "paid" })
              .eq("id", chargeOrderId);

            if (chargeUpdateError) {
              console.error("Error updating order status:", chargeUpdateError);
              return response.sendStatus(500);
            }
          }

          break;

        case "payment_intent.payment_failed":
          const failedIntent = event.data.object;
          const failedOrderId = failedIntent.metadata.orderId;
          const message = failedIntent.last_payment_error?.message;

          const { error: failError } = await supabase
            .from("orders")
            .update({ status: "failed", failure_message: message })
            .eq("id", failedOrderId);

          if (failError) {
            console.error("Error updating failed order status:", failError);
            return response.sendStatus(500);
          }

          console.log(
            `PaymentIntent failed: ${failedIntent.id}, orderId: ${failedOrderId}, error: ${message}`
          );
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      response.json({ received: true });
    } catch (err) {
      console.error("Error handling webhook event:", err);
      response.sendStatus(500);
    }
  }
);

/////////// end of webhook updated

// JSON and URL Encoded parsers for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Stripe Payment Backend is running!");
});

// Payment Intent creation route
app.post("/create-payment-intent", async (req, res) => {
  const { orderId } = req.body;

  console.log("Received orderId:", orderId);

  if (!orderId) {
    console.error("Missing orderId or billingDetails in request body");
    return res.status(400).send({ error: "Missing orderId or billingDetails" });
  }

  try {
    const { data: orderItems, error } = await supabase
      .from("order_items")
      .select("product_name, unit_price, quantity, image_url")
      .eq("order_id", orderId);
    console.log("Order orderItems:", orderItems);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(400).send({ error: "Error fetching order items." });
    }

    if (orderItems.length === 0) {
      console.error("Order not found for orderId:", orderId);
      return res.status(400).send({ error: "Order not found." });
    }

    // Fetch delivery cost from orders table
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("delivery_cost")
      .eq("id", orderId)
      .single();

    const amount =
      orderItems.reduce(
        (total, item) => total + item.unit_price * item.quantity,
        0
      ) + (order.delivery_cost || 0);

    console.log("Order ID:", orderId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { orderId },
    });
    console.log("PaymentIntent created:", paymentIntent);
    console.log("Created PaymentIntent ID:", paymentIntent.id);
    console.log("PaymentIntent created with order_id:", orderId);
    console.log(
      "Order ID after PaymentIntent:",
      paymentIntent.metadata.orderId
    );

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        client_secret: paymentIntent.client_secret,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order with client_secret:", updateError);
      return res.status(500).send({ error: "Error updating order." });
    }

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount: Math.round(amount * 100),
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).send({ error: error.message });
  }
});

//////////////////////////////////////////////////////////
////beginging of admin portal
// Fetch orders with optional filters for date and status
app.get("/orders", async (req, res) => {
  console.log("trigered orders api");
  const { date, status } = req.query;

  try {
    let query = supabase.from("orders").select(`*, profiles(name)`);

    if (date) {
      query = query
        .gte("created_at", `${date} 00:00:00`)
        .lte("created_at", `${date} 23:59:59`);
    }

    if (status) {
      query = query.ilike("status", `%${status}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (data.length === 0) {
      return res.status(200).json({ message: "No orders match the criteria." });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch order items for a specific order (unchanged)
app.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//// end of admin portal

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
