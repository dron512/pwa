import React, { useEffect, useState } from "react";
import AirTable from "../components/AirTable.jsx";
import Reviews from "../components/Reviews.jsx";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { fetchCities } from "../../api/supadb.js";
import { fetchAqi } from "../../api/airapi.js";
import { Input, List, Typography, Divider, Tabs } from "antd";
import axios from "axios";

const { Search } = Input;
const { Title } = Typography;

const TrafficPage = () => {
    const [cities, setCities] = useState([]);
    const [aqiInfo, setAqiInfo] = useState({});
    const [city, setCity] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

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

    return (
        <>
            <div style={{ display: "flex", width: "100%", height: "100vh" }}>
                <Map
                    center={{ lat: 35.8693, lng: 128.6062 }}
                    level={7}
                    style={{ width: "70%", height: "100%" }}
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
                <div style={{ width: "30%", height: "100%", overflowY: "auto" }}>
                    <div style={{ padding: "1rem" }}>
                        <h3>대구 버스 정류장 검색</h3>
                        <div style={{ marginBottom: "1rem" }}>
                            <Input.Search
                                placeholder="정류장 검색"
                                enterButton="검색"
                                size="large"
                                onSearch={(value) => {
                                    axios.get(`https://businfo.daegu.go.kr:8095/dbms_web_api/bs/search?searchText=${value}&wincId=`)
                                        .then(response => {
                                            if (response.data.header.success) {
                                                setSearchResults(response.data.body);
                                            }
                                        })
                                        .catch(error => {
                                            console.error("정류장 검색 실패:", error);
                                        });
                                }}
                            />
                        </div>
                        <div>
                            <List
                                bordered
                                dataSource={searchResults}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div style={{ width: "100%" }}>
                                            <div style={{ 
                                                fontWeight: "bold", 
                                                fontSize: "1.1em",
                                                marginBottom: "4px"
                                            }}>
                                                {item.bsNm}
                                            </div>
                                            <div style={{ 
                                                color: "#666",
                                                fontSize: "0.9em",
                                                marginBottom: "4px"
                                            }}>
                                                정류장 ID: {item.bsId}
                                            </div>
                                            <div style={{ 
                                                color: "#1890ff",
                                                fontSize: "0.9em"
                                            }}>
                                                경유 노선: {item.routeList}
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TrafficPage; 