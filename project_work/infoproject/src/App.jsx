import { useState } from "react";
import "./App.css";
import Person from "./components/Person";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import data from './basicData.json';

function App() {
  console.log(data);
  
  useKakaoLoader({
    appkey: "53de8c1d632691695fa1b4266e5b2567",
  });

  const [test, setTest] = useState(null);
  const print = "hello print";

  const mouseOver = () => {
    console.log("마우스 들어옴");
    setTest({});
  };
  const mouseOut = () => {
    console.log("마우스 나감");
    setTest(null);
  };

  return (
    <>
      <Map
        onMouseOut={() => {
          alert("마우스나감");
        }}
        center={{ lat: 33.5564, lng: 126.7981 }}
        style={{ width: "100%", height: "360px" }}
        level={4}
      >
        <MapMarker
          position={{ lat: 33.5564, lng: 126.7981 }}
          image={{ src: "/aa.jpg", size: { width: 30, height: 40 } }}
        >
          좌표설정
        </MapMarker>
      </Map>
      {test && (
        <>
          <Person name="홍길동" age={30} position="right"></Person>
          <Person name="박길동" age={40} position="bottom"></Person>
        </>
      )}
      <div
        style={{ position: "absolute", zIndex: 100, backgroundColor: "#fff" }}
      >
        {test && print}
      </div>
      <h1>대중교통정보서비스</h1>
      <div
        style={{ cursor: "pointer" }}
        onMouseOver={mouseOver} // 마우스 들어올때
        onMouseOut={mouseOut} // 마우스 나갔을때
      >
        여기에 마우스 올리면 이벤트 작동
      </div>
    </>
  );
}

export default App;
