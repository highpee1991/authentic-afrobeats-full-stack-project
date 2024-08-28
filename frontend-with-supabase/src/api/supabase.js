import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sfqvkwwiriqbaukqmwdc.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmcXZrd3dpcmlxYmF1a3Ftd2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5OTk5MDEsImV4cCI6MjAzNzU3NTkwMX0.7Wy1nag7dEPHhpTkb9oxeIPuqfZnnLQL19CzhU56JvQ";
const supabase = createClient(supabaseUrl, supabaseKey, {
  persistSession: true,
});

export default supabase;
