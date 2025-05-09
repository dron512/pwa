import {useEffect, useState} from 'react'
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {fetchCities} from "../api/supadb.js";
import {fetchAqi} from "../api/airapi.js";
import AirTable from "./components/AirTable.jsx";

function App() {
    // supabase 에서 가져온 도시 좌표 데이터 supabase
    const [cities, setCities] = useState([]);
    // 클릭한 좌표의 미세먼지 초미세먼지 데이터
    // {city: {pm10, pm25, o3, no2, so2, co}}
    const [aqiInfo, setAqiInfo] = useState({});

    useKakaoLoader({
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
            <h1>미세먼지</h1>
            <Map center={{lat: 35.8693, lng: 128.6062}} level={7}
                 style={{width: '100%', height: '50vh'}}>
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
            {/* { AirTable({...aqiInfo}) } */}
            <AirTable {...aqiInfo}></AirTable>
        </>
    )
}

export default App
