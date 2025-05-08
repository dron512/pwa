import {useEffect, useState} from 'react'
import './App.css'
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {fetchCities} from "../api/supadb.js";
import {fetchAqi} from "../api/airapi.js";
import {Card, Space} from "antd";
import AirTable from "./components/AirTable.jsx";

function App() {
    const [count, setCount] = useState(0);
    // 마커 설정할 위도 경도 나중에 supabase 에서 데이터 가져와서 setCities 할 계획
    const [cities, setCities] = useState([]);
    const [aqiInfo,setAqiInfo] = useState({});

    const [loading, error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
        libraries: ["clusterer", "services", "drawing"]
    });

    // supabase 에서 cities 데이터 가져오기
    useEffect(() => {
        fetchCities()
            .then(data => {
                setCities(data);
            });
    }, []);

    // 좌표 클릭시 해당 미세먼지 초미세먼지 데이터 가져와서 뿌리기
    const clickAqi = (city) => {
        fetchAqi(city.latitude, city.longitude)
            .then(data => {
                setAqiInfo(data);
            });
    }

    return (
        <>
            <h1>Hello</h1>
            <button onClick={() => setCities([...cities])}></button>
            <Map center={{lat: 35.8693, lng: 128.6062}} level={7}
                 style={{width: '100%', height: '80vh'}}>
                {cities.map((city) => (
                    <MapMarker key={city.id}
                               position={{lat: city.latitude, lng: city.longitude}}
                               onClick={() => {
                                   clickAqi(city)
                               }}
                    >
                    </MapMarker>
                ))}
            </Map>
            <AirTable {...aqiInfo}></AirTable>
        </>
    )
}

export default App
