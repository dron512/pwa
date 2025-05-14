import { SupabaseClient } from "@supabase/supabase-js";

const supabase = new SupabaseClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchCities = async () => {
  try {
    const { data } = await supabase
      .from("cities")
      .select("*")
      .order("category");
    return data;
  } catch (e) {
    return [];
  }
};

export const fetchReviews = async (cityId) => {
  try {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("city_id", cityId);
    return data;
  } catch (e) {
    return [];
  }
};

export const postReview = async (values) => {
  console.log(values);
  try {
    const { data, error } = await supabase.from("reviews").insert([
      {
        city_id: values.city_id,
        user_name: values.user_name,
        rating: values.rating,
        comment: values.comment,
        air_quality_index: values.air_quality_index,
      },
    ]);
    if (error) throw error;
    return "success";
  } catch (e) {
    console.log(e);
    return "fail";
  }
};
