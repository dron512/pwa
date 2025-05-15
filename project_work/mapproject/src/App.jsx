import { useState, useEffect } from 'react';
import { MapMarker, Map, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Card, Table, Typography, Space } from 'antd';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import PollutantTable from './components/PollutantTable';
import Reviews from './components/Reviews';
import { fetchCities, getCurrentLocation } from './supa/supaApi';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const WAQI_API_KEY = "24c9e5d547168d084b63e7b5bbf25a4b1888803d";
const DAEGU_CENTER = { lat: 35.8714, lng: 128.6014 };
const DEFAULT_ZOOM_LEVEL = 8;

const { Title, Text } = Typography;

function App() {
  const [cities, setCities] = useState([]);
  const [aqiInfo, setAqiInfo] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [mapCenter, setMapCenter] = useState(DAEGU_CENTER);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCurrentLocationInfo, setShowCurrentLocationInfo] = useState(false);

  // 카카오훅
  useKakaoLoader({
    appkey: KAKAO_API_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });

  // 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        setMapCenter(location);
        setCurrentLocation(location);
      })
      .catch(error => {
        console.error('위치 정보를 가져오는데 실패했습니다:', error);
      });
  }, []);

  // Supabase에서 도시 데이터 가져오기
  useEffect(() => {
    (async function () {
      const data = await fetchCities();
      setCities(data);
    })();
  }, []);

  const fetchAQI = async (city) => {
    try {
      const url = `https://api.waqi.info/feed/geo:${city.latitude};${city.longitude}/?token=${WAQI_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        setAqiInfo({
          cityName: city.name,
          aqi: data.data.aqi,
          pm10: data.data.iaqi.pm10?.v || "N/A",
          pm25: data.data.iaqi.pm25?.v || "N/A",
          no2: data.data.iaqi.no2?.v || "N/A",
          so2: data.data.iaqi.so2?.v || "N/A",
          co: data.data.iaqi.co?.v || "N/A",
          o3: data.data.iaqi.o3?.v || "N/A",
        });
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleMarkerClick = (cityId) => {
    setSelectedCityId(cityId);
  };


  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
      <Title level={2}>대구 권역 대기질 정보</Title>

      <Card>
        <Map
          center={mapCenter}
          style={{ width: "100%", height: "500px" }}
          level={DEFAULT_ZOOM_LEVEL}
        >
          {/* 현재 위치 마커 */}
          {currentLocation && (
            <>
              <MapMarker
                position={currentLocation}
                image={{
                  src: "https://png.pngtree.com/png-vector/20221029/ourmid/pngtree-ilustrasi-soju-bottle-drink-korean-alcohol-png-image_6390162.png",
                  size: { width: 24, height: 35 },
                }}
                onClick={() => setShowCurrentLocationInfo(!showCurrentLocationInfo)}
              />
              {showCurrentLocationInfo && (
                <CustomOverlayMap
                  position={currentLocation}
                  yAnchor={2.2}
                >
                  <div style={{
                    padding: '5px 10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                    onClick={() => setShowCurrentLocationInfo(false)}
                  >
                    내 위치
                  </div>
                </CustomOverlayMap>
              )}
            </>
          )}

          {/* 도시 마커들 */}
          {cities.map((city) => (
            <MapMarker
              key={`${city.name}-${city.latitude}-${city.longitude}`}
              position={{ lat: city.latitude, lng: city.longitude }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
                size: { width: 18, height: 24 },
              }}
              onClick={() => {
                fetchAQI(city);
                handleMarkerClick(city.id);
              }}
              onMouseOver={() => setHoveredCity(city)}
              onMouseOut={() => setHoveredCity(null)}
            />
          ))}
          {hoveredCity && (
            <CustomOverlayMap
              position={{ lat: hoveredCity.latitude, lng: hoveredCity.longitude }}
              yAnchor={2.2}
            >
              <div style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '4px',
                fontSize: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap'
              }}>
                {hoveredCity.name}
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </Card>

      <Card>
        {aqiInfo ? (
          <Space direction="vertical" size="small">
            <Title level={3}>
              <EnvironmentOutlined /> {aqiInfo.cityName} 대기질 정보 AQI (Air Quality Index 대기질 지수)
            </Title>
            <Text strong>AQI(대기질 지수): {aqiInfo.aqi}</Text>
            <Text>미세먼지(PM10): {aqiInfo.pm10}</Text>
            <Text>초미세먼지(PM2.5): {aqiInfo.pm25}</Text>
            <Text>이산화질소(NO₂): {aqiInfo.no2} ppb</Text>
            <Text>아황산가스(SO₂): {aqiInfo.so2} ppb</Text>
            <Text>일산화탄소(CO): {aqiInfo.co} ppm</Text>
            <Text>오존(O₃): {aqiInfo.o3} ppb</Text>
          </Space>
        ) : (
          <Text>지도에서 지역을 클릭하면 대기질 정보가 표시됩니다.</Text>
        )}
      </Card>

      <PollutantTable />

      <Reviews cityId={selectedCityId} aqiInfo={aqiInfo} />

    </Space>
  );
}

export default App;