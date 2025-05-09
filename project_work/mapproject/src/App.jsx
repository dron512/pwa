import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { fetchCities } from "../api/supadb.js";
import { fetchAqi } from "../api/airapi.js";
import AirTable from "./components/AirTable.jsx";
import { Bar, Line, Pie, Column } from "@ant-design/plots";

const DemoDefaultTooltip = () => {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json",
    },
    xField: "月份",
    yField: "月均降雨量",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
    onReady: ({ chart }) => {
      try {
        chart.on("afterrender", () => {
          chart.emit("legend:filter", {
            data: { channel: "color", values: ["London"] },
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
  };
  return <Column {...config} />;
};

function App() {
  // supabase 에서 가져온 도시 좌표 데이터 supabase
  const [cities, setCities] = useState([]);
  // 클릭한 좌표의 미세먼지 초미세먼지 데이터
  // {city: {pm10, pm25, o3, no2, so2, co}}
  const [aqiInfo, setAqiInfo] = useState({});

  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer", "services", "drawing"],
  });

  // supabase 에서 cities 데이터 가져오기
  useEffect(() => {
    fetchCities().then((data) => {
      setCities(data);
    });
  }, []);

  // 좌표 클릭시 해당 미세먼지 초미세먼지 데이터 가져와서 뿌리기
  const clickAqi = (city) => {
    fetchAqi(city.latitude, city.longitude).then((data) => {
      setAqiInfo(data);
    });
  };

  const config = {
    data: [
      { x: "2023-10-01", y: 50 },
      { x: "2023-10-02", y: 20 },
      { x: "2023-10-03", y: 30 },
      { x: "2023-10-04", y: 40 },
      { x: "2023-10-05", y: 100 },
    ],
    xField: "x",
    yField: "y",
  };

  return (
    <>
      <h1>미세먼지</h1>
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
            }}
          ></MapMarker>
        ))}
      </Map>
      {/* { AirTable({...aqiInfo}) } */}
      <AirTable {...aqiInfo}></AirTable>
      {/* <Line {...config} /> */}
      <Line data={config.data} xField={config.xField} yField={config.yField} />
      <Bar data={config.data} xField={config.xField} yField={config.yField} />
      <Pie data={config.data} xField={config.xField} yField={config.yField} />
      <DemoDefaultTooltip />
    </>
  );
}

export default App;
