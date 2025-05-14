import React, { useEffect, useState } from "react";
import AirTable from "../components/AirTable.jsx";
import Reviews from "../components/Reviews.jsx";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { fetchCities } from "../../api/supadb.js";
import { fetchAqi } from "../../api/airapi.js";

const RootPage = () => {
  const [cities, setCities] = useState([]);
  const [aqiInfo, setAqiInfo] = useState({});
  const [city, setCity] = useState(null);

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
        {cities.map((city) => (
          <MapMarker
            key={city.id}
            position={{ lat: city.latitude, lng: city.longitude }}
            onClick={() => {
              clickAqi(city); // 미세먼지 데이터 정보 가져오기
              setCity(city); // 해당좌표 클릭해서 하위 컴포넌트인 Reivews 곳에 props넘기는 역활
            }}
          ></MapMarker>
        ))}
      </Map>
      <Reviews city={city} aqi={aqiInfo.aqi}></Reviews>
      <AirTable {...aqiInfo}></AirTable>
    </>
  );
};
export default RootPage;
