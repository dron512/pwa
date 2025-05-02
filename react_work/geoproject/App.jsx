import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Card, Table, Typography, Space, Divider } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css';

const { Title, Text } = Typography;

const API_KEY = "24c9e5d547168d084b63e7b5bbf25a4b1888803d"; // WAQI API 키

// 도시 데이터
const cities = [
  { name: "서울", lat: 37.5665, lng: 126.978 },
  { name: "대구", lat: 35.8714, lng: 128.6014 },
  { name: "부산", lat: 35.1796, lng: 129.0756 },
  { name: "인천", lat: 37.4563, lng: 126.7052 },
  { name: "광주", lat: 35.1595, lng: 126.8526 },
  { name: "대전", lat: 36.3504, lng: 127.3845 },
  { name: "울산", lat: 35.5384, lng: 129.3114 },
  { name: "달서구", lat: 35.8296, lng: 128.5328 },
  { name: "중구", lat: 35.8693, lng: 128.6062 },
  { name: "남구", lat: 35.8467, lng: 128.5971 },
  { name: "동구", lat: 35.8867, lng: 128.635 },
  { name: "수성구", lat: 35.8588, lng: 128.6305 },
  { name: "두류공원", lat: 35.84769, lng: 128.55848 },
];

const App = () => {
  const [aqiInfo, setAqiInfo] = useState(null);

  const fetchAQI = async (city) => {
    try {
      const url = `https://api.waqi.info/feed/geo:${city.lat};${city.lng}/?token=${API_KEY}`;
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

  // 대기오염 지표 테이블 컬럼 정의
  const pollutantColumns = [
    {
      title: '지표',
      dataIndex: 'indicator',
      key: 'indicator',
      width: '15%',
      render: text => <Text strong>{text}</Text>
    },
    {
      title: '의미',
      dataIndex: 'meaning',
      key: 'meaning',
      width: '20%',
    },
    {
      title: '주요 원인',
      dataIndex: 'cause',
      key: 'cause',
      width: '30%',
    },
    {
      title: '인체 영향',
      dataIndex: 'effect',
      key: 'effect',
      width: '35%',
    },
  ];

  const pollutantData = [
    {
      key: '1',
      indicator: "PM2.5",
      meaning: "초미세먼지",
      cause: "자동차 배기가스, 화석연료 연소",
      effect: "폐질환, 심혈관 질환"
    },
    {
      key: '2',
      indicator: "PM10",
      meaning: "미세먼지",
      cause: "공장, 황사, 도로 먼지",
      effect: "호흡기 질환, 기관지 자극"
    },
    {
      key: '3',
      indicator: "NO2",
      meaning: "이산화질소",
      cause: "자동차 배기가스, 공장",
      effect: "천식, 폐 손상"
    },
    {
      key: '4',
      indicator: "SO2",
      meaning: "아황산가스",
      cause: "석탄, 석유 연소",
      effect: "눈/기관지 자극, 산성비 유발"
    },
    {
      key: '5',
      indicator: "CO",
      meaning: "일산화탄소",
      cause: "자동차 배기가스, 연소",
      effect: "두통, 질식 위험"
    },
    {
      key: '6',
      indicator: "O3",
      meaning: "오존",
      cause: "배기가스 + 햇빛 반응",
      effect: "피부/호흡기 자극, 오존 경보"
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
      <Title level={2}>도시 클릭 시 대기질 정보 가져오기</Title>
      
      <Card>
        <Map
          center={{ lat: 35.8714, lng: 128.6014 }}
          style={{ width: "100%", height: "500px" }}
          level={7}
        >
          {cities.map((city) => (
            <MapMarker
              key={`${city.name}-${city.lat}-${city.lng}`}
              position={{ lat: city.lat, lng: city.lng }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: { width: 24, height: 35 },
              }}
              onClick={() => fetchAQI(city)}
            />
          ))}
        </Map>
      </Card>

      <Card>
        {aqiInfo ? (
          <Space direction="vertical" size="small">
            <Title level={3}>
              <EnvironmentOutlined /> {aqiInfo.cityName} 대기질 정보
            </Title>
            <Text strong>AQI: {aqiInfo.aqi}</Text>
            <Text>미세먼지(PM10): {aqiInfo.pm10}</Text>
            <Text>초미세먼지(PM2.5): {aqiInfo.pm25}</Text>
            <Text>이산화질소(NO₂): {aqiInfo.no2} ppb</Text>
            <Text>아황산가스(SO₂): {aqiInfo.so2} ppb</Text>
            <Text>일산화탄소(CO): {aqiInfo.co} ppm</Text>
            <Text>오존(O₃): {aqiInfo.o3} ppb</Text>
          </Space>
        ) : (
          <Text>도시를 클릭하면 AQI 정보가 표시됩니다.</Text>
        )}
      </Card>

      <Card>
        <Title level={3}>🌍 대기오염 지표 정보</Title>
        <Table 
          columns={pollutantColumns} 
          dataSource={pollutantData} 
          pagination={false}
          bordered
        />
      </Card>
    </Space>
  );
};

export default App; 