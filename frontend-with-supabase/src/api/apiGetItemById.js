import supabase from "./supabase";

export const getItemById = async (tableName, productId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", productId)
    .single();

  if (error) throw error;

  return data;
};
