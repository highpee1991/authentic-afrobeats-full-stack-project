import supabase from "./supabase";

export async function deleteProduct(productId, itemName) {
  const { data, error } = await supabase
    .from(itemName)
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error("Product Could not be deleted");
  }

  return data;
}
