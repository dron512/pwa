import React, { useEffect, useState } from "react";
import AirTable from "../components/AirTable.jsx";
import Reviews from "../components/Reviews.jsx";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { fetchCities } from "../../api/supadb.js";
import { fetchAqi } from "../../api/airapi.js";

const RootPage = () => {
  const [cities, setCities] = useState([]);
  const [aqiInfo, setAqiInfo] = useState({});
  const [city, setCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);

  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer", "services", "drawing"],
  });

  useEffect(() => {
    fetchCities().then((data) => {
      setCities(data);
    });
  }, []);

  const clickAqi = (city) => {
    fetchAqi(city.latitude, city.longitude).then((data) => {
      setAqiInfo(data);
    });
  };

  const data = [
    {
      date: "2023-01-01",
      value: 100,
    },
    {
      date: "2023-01-02",
      value: 30,
    },
    {
      date: "2023-01-03",
      value: 0,
    },
    {
      date: "2023-01-04",
      value: 40,
    },
    {
      date: "2023-01-05",
      value: 65,
    },
  ];

  return (
    <>
      <Map
        center={{ lat: 35.8693, lng: 128.6062 }}
        level={7}
        style={{ width: "100%", height: "50vh" }}
      >
        {/* cities 데이터는 supabase에 있는 데이터들을 가지고 와서 해당하는곳에
        위도 경도를 가지고 mapMarker를 생성합니다. */}
        {cities.map((city) => (
          <MapMarker
            key={city.id}
            position={{ lat: city.latitude, lng: city.longitude }}
            onClick={() => {
              clickAqi(city); // 미세먼지 데이터 정보 가져오기
              setCity(city); // 해당좌표 클릭해서 하위 컴포넌트인 Reivews 곳에 props넘기는 역활
            }}
            onMouseOut={() => {
              // console.log('마우스 나감');
              // console.log(city);
              setHoveredCity(null);
            }}
            onMouseOver={() => {
              // console.log('마우스 들어옴');
              // console.log(city);
              setHoveredCity(city);
            }}
          ></MapMarker>
        ))}
        {hoveredCity && (
          <CustomOverlayMap
            position={{ lat: hoveredCity.latitude, lng: hoveredCity.longitude }}
          >
            <div
              style={{
                padding: "5px 10px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "4px",
                fontSize: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                whiteSpace: "nowrap",
              }}
            >
              {hoveredCity.name}
            </div>
          </CustomOverlayMap>
        )}
      </Map>
      <Reviews city={city} aqi={aqiInfo.aqi}></Reviews>
      <AirTable {...aqiInfo}></AirTable>
    </>
  );
};
export default RootPage;
