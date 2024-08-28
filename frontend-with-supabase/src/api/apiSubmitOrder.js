import supabase from "./supabase";

const submitOrder = async (tableName, productId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", productId)
    .single();

  if (error) throw error;

  return data;
};
export default submitOrder;
