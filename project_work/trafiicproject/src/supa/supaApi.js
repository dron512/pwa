import { SupabaseClient } from "@supabase/supabase-js";

const supabase = new SupabaseClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 현재 위치를 가져오는 함수
export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("이 브라우저에서는 Geolocation을 지원하지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        // 위치 정보를 가져오는데 실패하면 대구시청 좌표를 기본값으로 사용
        resolve(DAEGU_CENTER);
      }
    );
  });
}

// 대구시청 좌표 (지도 중심점)
export const DAEGU_CENTER = {
  lat: 35.8714,
  lng: 128.6014
};

// 지도 기본 확대 레벨
export const DEFAULT_ZOOM_LEVEL = 8;

export async function fetchCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('category');
  
  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
  
  return data;
}

export async function fetchReviews(cityId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('city_id', cityId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  
  return data;
}

export async function insertReview(reviewData) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData]);

  if (error) {
    console.error('Error inserting review:', error);
    throw error;
  }

  return data;
}