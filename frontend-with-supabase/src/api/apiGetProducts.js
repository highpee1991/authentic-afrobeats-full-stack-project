import supabase from "./supabase";

export async function getProduct(tableName) {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not load wears data");
  }

  return data;
}
