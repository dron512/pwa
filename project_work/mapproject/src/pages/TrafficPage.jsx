import React, { useState, useEffect } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { Input, List, Typography, Card } from "antd";
import axios from "axios";
import basicData from '../bs.json';

const { Search } = Input;
const { Title } = Typography;

const TrafficPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [arrivalInfo, setArrivalInfo] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 35.8693, lng: 128.6062 });
    const [selectedStop, setSelectedStop] = useState(null);
    const [map, setMap] = useState(null);
    const [currentZoomLevel, setCurrentZoomLevel] = useState(3);
    const [visibleStops, setVisibleStops] = useState([]);

    useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
        libraries: ["clusterer", "services", "drawing"],
    });

    useEffect(() => {
        if (map) {
            const bounds = map.getBounds();
            const swLatLng = bounds.getSouthWest();
            const neLatLng = bounds.getNorthEast();

            const minLat = swLatLng.getLat();
            const maxLat = neLatLng.getLat();
            const minLng = swLatLng.getLng();
            const maxLng = neLatLng.getLng();

            const filteredStops = basicData.bs.filter(stop => {
                const lat = parseFloat(stop.yPos);
                const lng = parseFloat(stop.xPos);
                return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
            }).slice(0, 500);

            setVisibleStops(filteredStops);
        } else {
            // 초기 로드 시 기본 영역의 정류장 표시
            const initialStops = basicData.bs.filter(stop => {
                const lat = parseFloat(stop.yPos);
                const lng = parseFloat(stop.xPos);
                // 대구시 중심 좌표 기준 ±0.1도 범위
                return lat >= 35.7693 && lat <= 35.9693 && lng >= 128.5062 && lng <= 128.7062;
            }).slice(0, 500);
            setVisibleStops(initialStops);
        }
    }, [map, mapCenter]);

    const fetchArrivalInfo = (bsId) => {
        axios.get(`https://businfo.daegu.go.kr:8095/dbms_web_api/realtime/arr/${bsId}`)
            .then(response => {
                if (response.data.header.success) {
                    setArrivalInfo(response.data.body);
                }
            })
            .catch(error => {
                console.error("도착 정보 조회 실패:", error);
            });
    };

    const onMapCenterChanged = (map) => {
        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        const minLat = swLatLng.getLat();
        const maxLat = neLatLng.getLat();
        const minLng = swLatLng.getLng();
        const maxLng = neLatLng.getLng();

        const filteredStops = basicData.bs.filter(stop => {
            const lat = parseFloat(stop.yPos);
            const lng = parseFloat(stop.xPos);
            return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
        }).slice(0, 500);

        setVisibleStops(filteredStops);
    };

    const onZoomChanged = (map) => {
        const level = map.getLevel();
        setCurrentZoomLevel(level);
        if (level <= 4) {
            onMapCenterChanged(map);
        } else {
            setVisibleStops([]);
        }
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex" }}>
            <Map
                center={mapCenter}
                level={3}
                style={{ width: "70%", height: "100%" }}
                onCenterChanged={(map) => onMapCenterChanged(map)}
                onZoomChanged={(map) => onZoomChanged(map)}
                onLoad={setMap}
            >
                {currentZoomLevel <= 4 && visibleStops.map((stop) => (
                    <MapMarker
                        key={stop.bsId}
                        position={{
                            lat: parseFloat(stop.yPos),
                            lng: parseFloat(stop.xPos)
                        }}
                        onClick={() => {
                            setSelectedStop(stop);
                            fetchArrivalInfo(stop.bsId);
                        }}
                    >
                        <div style={{ padding: "5px", color: "#000" }}>
                            {stop.bsNm}
                        </div>
                    </MapMarker>
                ))}
            </Map>
            <div style={{ width: "30%", height: "100%", overflowY: "auto" }}>
                <div style={{ padding: "1rem" }}>
                    <h3>대구 버스 정류장 검색</h3>
                    <div style={{ marginBottom: "1rem"}}>
                        <Input.Search
                            placeholder="정류장 검색"
                            enterButton="검색"
                            size="large"
                            onSearch={(value) => {
                                const filteredStops = basicData.bs.filter(stop =>
                                    stop.bsNm.includes(value)
                                );
                                setSearchResults(filteredStops);
                                setArrivalInfo(null);
                                if (filteredStops.length > 0) {
                                    const firstStop = filteredStops[0];
                                    setSelectedStop(firstStop);
                                    setMapCenter({
                                        lat: parseFloat(firstStop.yPos),
                                        lng: parseFloat(firstStop.xPos)
                                    });
                                    fetchArrivalInfo(firstStop.bsId);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <List
                            bordered
                            dataSource={searchResults}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => {
                                        fetchArrivalInfo(item.bsId);
                                        setSelectedStop(item);
                                        setMapCenter({
                                            lat: parseFloat(item.yPos),
                                            lng: parseFloat(item.xPos)
                                        });
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
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
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    {selectedStop && (
                        <Card
                            title={`${selectedStop.bsNm} 실시간 도착 정보`}
                            style={{ marginTop: "1rem" }}
                        >
                            {arrivalInfo ? (
                                <List
                                    dataSource={arrivalInfo.list}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <div style={{ width: "100%" }}>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "4px"
                                                }}>
                                                    <div style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.1em"
                                                    }}>
                                                        {item.routeNo} {item.routeNote && `(${item.routeNote})`}
                                                    </div>
                                                    <div style={{
                                                        color: item.arrState === "전" ? "#52c41a" :
                                                            item.arrState === "전전" ? "#faad14" : "#1890ff",
                                                        fontWeight: "bold"
                                                    }}>
                                                        {item.arrState === "전" ? "곧 도착" :
                                                            item.arrState === "전전" ? "곧 도착 예정" :
                                                                `${item.arrState} 후 도착`}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    color: "#666",
                                                    fontSize: "0.9em"
                                                }}>
                                                    버스 번호: {item.vhcNo2}
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <div>도착 정보를 불러오는 중...</div>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrafficPage; 