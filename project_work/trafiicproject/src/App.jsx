import { useState, useEffect } from 'react';
import { MapMarker, Map, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Card, Table, Typography, Space, Button } from 'antd';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { getCurrentLocation } from './supa/supaApi';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const DAEGU_CENTER = { lat: 35.8714, lng: 128.6014 };
const DEFAULT_ZOOM_LEVEL = 8;

const { Title, Text } = Typography;

function App() {
  const [mapCenter, setMapCenter] = useState(DAEGU_CENTER);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCurrentLocationInfo, setShowCurrentLocationInfo] = useState(false);
  const [busLocations1, setBusLocations1] = useState([]);
  const [busLocations3, setBusLocations3] = useState([]);
  const [busLocationsDalseo1, setBusLocationsDalseo1] = useState([]);
  const [busLocationsDonggu2, setBusLocationsDonggu2] = useState([]);
  const [isTrackingBus1, setIsTrackingBus1] = useState(false);
  const [isTrackingBus3, setIsTrackingBus3] = useState(false);
  const [isTrackingDalseo1, setIsTrackingDalseo1] = useState(false);
  const [isTrackingDonggu2, setIsTrackingDonggu2] = useState(false);

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


  const handleMarkerClick = (cityId) => {
    setSelectedCityId(cityId);
  };

  // 급행1번 버스 위치 데이터 가져오기
  const fetchBusLocations1 = async () => {
    try {
      const response = await fetch('https://apis.data.go.kr/6270000/dbmsapi01/getPos?serviceKey=6j4MG9vFqOJ24QdvW%2BQ1R5lChK83ym4k0UFBww6Kv%2FGKEmRsYrtwq%2FTnVYqpWX640SMT%2BQXrEdOTn2zFEzdC0g%3D%3D&routeId=1000001000');
      const data = await response.json();

      if (data.header.success) {
        setBusLocations1(data.body.items);
      }
    } catch (error) {
      console.error('급행1번 버스 위치 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  // 급행3번 버스 위치 데이터 가져오기
  const fetchBusLocations3 = async () => {
    try {
      const response = await fetch('https://apis.data.go.kr/6270000/dbmsapi01/getPos?serviceKey=6j4MG9vFqOJ24QdvW%2BQ1R5lChK83ym4k0UFBww6Kv%2FGKEmRsYrtwq%2FTnVYqpWX640SMT%2BQXrEdOTn2zFEzdC0g%3D%3D&routeId=1000003000');
      const data = await response.json();

      if (data.header.success) {
        setBusLocations3(data.body.items);
      }
    } catch (error) {
      console.error('급행3번 버스 위치 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  // 달서1번 버스 위치 데이터 가져오기
  const fetchBusLocationsDalseo1 = async () => {
    try {
      const response = await fetch('https://apis.data.go.kr/6270000/dbmsapi01/getPos?serviceKey=6j4MG9vFqOJ24QdvW%2BQ1R5lChK83ym4k0UFBww6Kv%2FGKEmRsYrtwq%2FTnVYqpWX640SMT%2BQXrEdOTn2zFEzdC0g%3D%3D&routeId=4030001000');
      const data = await response.json();
      
      if (data.header.success) {
        setBusLocationsDalseo1(data.body.items);
      }
    } catch (error) {
      console.error('달서1번 버스 위치 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  // 동구2번 버스 위치 데이터 가져오기
  const fetchBusLocationsDonggu2 = async () => {
    try {
      const response = await fetch('https://apis.data.go.kr/6270000/dbmsapi01/getPos?serviceKey=6j4MG9vFqOJ24QdvW%2BQ1R5lChK83ym4k0UFBww6Kv%2FGKEmRsYrtwq%2FTnVYqpWX640SMT%2BQXrEdOTn2zFEzdC0g%3D%3D&routeId=4060004000');
      const data = await response.json();
      
      if (data.header.success) {
        setBusLocationsDonggu2(data.body.items);
      }
    } catch (error) {
      console.error('북구4번 버스 위치 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  // 급행1번 버스 추적 시작/중지 토글
  const toggleBusTracking1 = () => {
    if (!isTrackingBus1) {
      fetchBusLocations1();
      const interval = setInterval(fetchBusLocations1, 10000);
      setIsTrackingBus1(true);
      return () => clearInterval(interval);
    } else {
      setBusLocations1([]);
      setIsTrackingBus1(false);
    }
  };

  // 급행3번 버스 추적 시작/중지 토글
  const toggleBusTracking3 = () => {
    if (!isTrackingBus3) {
      fetchBusLocations3();
      const interval = setInterval(fetchBusLocations3, 10000);
      setIsTrackingBus3(true);
      return () => clearInterval(interval);
    } else {
      setBusLocations3([]);
      setIsTrackingBus3(false);
    }
  };

  // 달서1번 버스 추적 시작/중지 토글
  const toggleBusTrackingDalseo1 = () => {
    if (!isTrackingDalseo1) {
      fetchBusLocationsDalseo1();
      const interval = setInterval(fetchBusLocationsDalseo1, 10000);
      setIsTrackingDalseo1(true);
      return () => clearInterval(interval);
    } else {
      setBusLocationsDalseo1([]);
      setIsTrackingDalseo1(false);
    }
  };

  // 동구2번 버스 추적 시작/중지 토글
  const toggleBusTrackingDonggu2 = () => {
    if (!isTrackingDonggu2) {
      fetchBusLocationsDonggu2();
      const interval = setInterval(fetchBusLocationsDonggu2, 10000);
      setIsTrackingDonggu2(true);
      return () => clearInterval(interval);
    } else {
      setBusLocationsDonggu2([]);
      setIsTrackingDonggu2(false);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
      <Title level={2}>대구 대중교통 위치서비스</Title>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type={isTrackingBus1 ? "primary" : "default"}
            onClick={toggleBusTracking1}
            icon={<EnvironmentOutlined />}
          >
            {isTrackingBus1 ? '급행1 중지' : '급행1 시작'}
          </Button>
          <Button
            type={isTrackingBus3 ? "primary" : "default"}
            onClick={toggleBusTracking3}
            icon={<EnvironmentOutlined />}
          >
            {isTrackingBus3 ? '급행3 중지' : '급행3 시작'}
          </Button>
          <Button
            type={isTrackingDalseo1 ? "primary" : "default"}
            onClick={toggleBusTrackingDalseo1}
            icon={<EnvironmentOutlined />}
          >
            {isTrackingDalseo1 ? '달서1 중지' : '달서1 시작'}
          </Button>
          <Button
            type={isTrackingDonggu2 ? "primary" : "default"}
            onClick={toggleBusTrackingDonggu2}
            icon={<EnvironmentOutlined />}
          >
            {isTrackingDonggu2 ? '북구4 중지' : '북구4 시작'}
          </Button>
        </Space>

        <Map
          center={mapCenter}
          style={{ width: "100%", height: "75vh" }}
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

          {/* 급행1번 버스 마커들 */}
          {busLocations1.map((bus) => (
            <>
              <MapMarker
                key={`1-${bus.vhcNo2}-${bus.seq}`}
                position={{ lat: bus.yPos, lng: bus.xPos }}
                image={{
                  src: "https://img.freepik.com/free-vector/school-bus-transport_24877-83090.jpg?semt=ais_hybrid&w=740",
                  size: { width: 24, height: 24 },
                }}
              >
              </MapMarker>
              <CustomOverlayMap
                position={{ lat: bus.yPos, lng: bus.xPos }}
                yAnchor={2.2}
              >
                <div style={{
                  padding: '5px 10px',
                  backgroundColor: 'rgba(100, 255, 255, 0.9)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                  onClick={() => setShowCurrentLocationInfo(false)}
                >
                  급행1
                </div>
              </CustomOverlayMap>
            </>
          ))}

          {/* 급행3번 버스 마커들 */}
          {busLocations3.map((bus) => (
            <>
              <MapMarker
                key={`3-${bus.vhcNo2}-${bus.seq}`}
                position={{ lat: bus.yPos, lng: bus.xPos }}
                image={{
                  src: "https://img.freepik.com/free-vector/school-bus-transport_24877-83090.jpg?semt=ais_hybrid&w=740",
                  size: { width: 24, height: 24 },
                }}
              >
              </MapMarker>
              <CustomOverlayMap
                position={{ lat: bus.yPos, lng: bus.xPos }}
                yAnchor={2.2}
              >
                <div style={{
                  padding: '5px 10px',
                  backgroundColor: 'rgba(255, 255, 100, 0.9)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                  onClick={() => setShowCurrentLocationInfo(false)}
                >
                  급행3
                </div>
              </CustomOverlayMap>
            </>
          ))}

          {/* 달서1번 버스 마커들 */}
          {busLocationsDalseo1.map((bus) => (
            <>
              <MapMarker
                key={`d1-${bus.vhcNo2}-${bus.seq}`}
                position={{ lat: bus.yPos, lng: bus.xPos }}
                image={{
                  src: "https://img.freepik.com/free-vector/school-bus-transport_24877-83090.jpg?semt=ais_hybrid&w=740",
                  size: { width: 24, height: 24 },
                }}
              >
              </MapMarker>
              <CustomOverlayMap
                position={{ lat: bus.yPos, lng: bus.xPos }}
                yAnchor={2.2}
              >
                <div style={{
                  padding: '5px 10px',
                  backgroundColor: 'rgba(255, 100, 255, 0.9)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                  onClick={() => setShowCurrentLocationInfo(false)}
                >
                  달서1
                </div>
              </CustomOverlayMap>
            </>
          ))}

          {/* 동구2번 버스 마커들 */}
          {busLocationsDonggu2.map((bus) => (
            <>
              <MapMarker
                key={`dg2-${bus.vhcNo2}-${bus.seq}`}
                position={{ lat: bus.yPos, lng: bus.xPos }}
                image={{
                  src: "https://img.freepik.com/free-vector/school-bus-transport_24877-83090.jpg?semt=ais_hybrid&w=740",
                  size: { width: 24, height: 24 },
                }}
              >
              </MapMarker>
              <CustomOverlayMap
                position={{ lat: bus.yPos, lng: bus.xPos }}
                yAnchor={2.2}
              >
                <div style={{
                  padding: '5px 10px',
                  backgroundColor: 'rgba(100, 255, 100, 0.9)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                  onClick={() => setShowCurrentLocationInfo(false)}
                >
                  북구4
                </div>
              </CustomOverlayMap>
            </>
          ))}
        </Map>
      </Card>

    </Space>
  );
}

export default App; 