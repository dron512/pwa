import {useState} from 'react'
import './App.css'
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import axios from "axios";

function App() {
    const [count, setCount] = useState(0);
    // 마커 설정할 위도 경도 나중에 supabase 에서 데이터 가져와서 setCities 할 계획
    const [cities, setCities] = useState([
        {id: 1, name: "달서구", lat: 35.8296, lng: 128.5328}, // 달서구
        {id: 2, name: "중구", lat: 35.8693, lng: 128.6062}, // 중구
        {id: 3, name: "남구", lat: 35.8467, lng: 128.5971}, // 남구
        {id: 4, name: "동구", lat: 35.8867, lng: 128.6350}, // 동구
        {id: 5, name: "수성구", lat: 35.8588, lng: 128.6305}, // 수성구

      // {id: 6, name: "내마음데로", lat: 35.8588, lng: 128.8888} // 수성구

    ]);
    // 카카오 api key 설정
    useKakaoLoader({
        appkey: 'a38e46e8d7d8c504f896a7933c9e4494',
    })
    // 좌표 클릭시 해당 미세먼지 초미세먼지 데이터 가져와서 뿌리기
    const getAqi = () => {
    }
    return (
        <>
            <h1>Hello</h1>
            <button onClick={() => setCities([...cities])}></button>
            <Map center={{lat: 35.8693, lng: 128.6062}} level={7}
                 style={{width: '100%', height: '80vh'}}>
                {cities.map((city) => (
                    <MapMarker key={city.id}
                               position={{lat: city.lat, lng: city.lng}}
                               onClick={getAqi}
                    >
                    </MapMarker>
                ))}
            </Map>
        </>
    )
}

export default App
