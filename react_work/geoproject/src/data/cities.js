import { supabase } from '../lib/supabaseClient';

export const cities = [
  // 대구 권역
  { name: "대구 중구", lat: 35.8693, lng: 128.6062 },
  { name: "대구 동구", lat: 35.8867, lng: 128.635 },
  { name: "대구 서구", lat: 35.8714, lng: 128.5591 },
  { name: "대구 남구", lat: 35.8467, lng: 128.5971 },
  { name: "대구 북구", lat: 35.8858, lng: 128.5828 },
  { name: "대구 수성구", lat: 35.8588, lng: 128.6305 },
  { name: "대구 달서구", lat: 35.8296, lng: 128.5328 },
  { name: "대구 달성군", lat: 35.7747, lng: 128.4314 },
  
  // 주요 랜드마크
  { name: "동대구역", lat: 35.8776, lng: 128.6284 },
  { name: "대구시청", lat: 35.8714, lng: 128.6014 },
  { name: "두류공원", lat: 35.84769, lng: 128.55848 },
  { name: "팔공산", lat: 35.9891, lng: 128.6943 },
  { name: "이월드", lat: 35.8531, lng: 128.5651 },
  
  // 인근 도시
  { name: "경산", lat: 35.8250, lng: 128.7414 },
  { name: "구미", lat: 36.1196, lng: 128.3445 },
  { name: "포항", lat: 36.0190, lng: 129.3435 },
  { name: "청도", lat: 35.6472, lng: 128.7339 },
];

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

export async function fetchCityRatings() {
  const { data, error } = await supabase
    .from('city_ratings')
    .select('*');
  
  if (error) {
    console.error('Error fetching city ratings:', error);
    return [];
  }
  
  return data;
} 