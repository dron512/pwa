import { supabase } from '../lib/supabaseClient';

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
