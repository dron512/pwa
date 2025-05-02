import {useEffect, useRef, useState} from 'react'
import './App.css'
import {MapMarker, Map} from "react-kakao-maps-sdk";

const API_KEY = "e2e2a254b45f875ca65de396caabf107";

function App() {
    const [count, setCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // SDK 로딩 완료 확인
        if (window.kakao && window.kakao.maps) {
            console.log("true")
            setLoaded(true);
        } else {
            console.log("false")
            // 100ms 간격으로 계속 체크
            const interval = setInterval(() => {
                if (window.kakao && window.kakao.maps) {
                    setLoaded(true);
                    clearInterval(interval);
                }
            }, 100);
        }
    }, []);
    return (
        <>
            <h1>Hello</h1>
            <Map
                center={{lat: 33.5563, lng: 126.79581}}
                style={{width: "100%", height: "360px"}}
            >
                <MapMarker position={{lat: 33.55635, lng: 126.795841}}>
                    <div style={{color: "#000"}}>Hello World!</div>
                </MapMarker>
            </Map>
        </>
    )
}

export default App
