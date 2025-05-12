import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { fetchCities } from "../api/supadb.js";
import { fetchAqi } from "../api/airapi.js";
import AirTable from "./components/AirTable.jsx";
import MyChart from "./components/MyChart.jsx";

import { Button, Drawer, Radio, Space } from "antd";
import Link from "antd/es/typography/Link.js";
import Reviews from "./components/Reviews.jsx";

function App() {
  const [cities, setCities] = useState([]);
  const [aqiInfo, setAqiInfo] = useState({});
  const [city, setCity] = useState(null);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

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
      <div
        style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 100 }}
      >
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="메뉴입니다."
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>
          <Link href="">어떤메뉴</Link>
        </p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      {/* <h1>미세먼지</h1> */}
      {/* <MyChart data={data}></MyChart> */}
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
              clickAqi(city);
              setCity(city);
            }}
          ></MapMarker>
        ))}
      </Map>
      <Reviews city={city}></Reviews>
      <AirTable {...aqiInfo}></AirTable>
    </>
  );
}

export default App;
