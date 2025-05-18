import { Column, Line } from '@ant-design/plots';
import { Card, Typography, Row, Col } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

// 오염물질 설명 데이터
const pollutantDescriptions = {
  'PM10': '미세먼지: 직경 10마이크로미터 이하의 먼지 입자',
  'PM2.5': '초미세먼지: 직경 2.5마이크로미터 이하의 먼지 입자',
  'NO₂': '이산화질소: 자동차 배기가스, 공장 배출물의 주요 성분',
  'SO₂': '아황산가스: 석탄, 석유 연소 시 발생하는 대기오염물질',
  'CO': '일산화탄소: 불완전 연소 시 발생하는 무색무취의 유독가스',
  'O₃': '오존: 자외선과 대기오염물질의 광화학 반응으로 생성'
};

function AirQualityChart({ aqiInfo }) {
  const isLargeScreen = useMediaQuery({ minWidth: 1100 });

  if (!aqiInfo) return null;

  // 대기질 지표 데이터
  const pollutantData = [
    { type: 'PM10', value: aqiInfo.pm10 },
    { type: 'PM2.5', value: aqiInfo.pm25 },
    { type: 'NO₂', value: aqiInfo.no2 },
    { type: 'SO₂', value: aqiInfo.so2 },
    { type: 'CO', value: aqiInfo.co },
    { type: 'O₃', value: aqiInfo.o3 },
  ];

  // AQI 추이 데이터 (예시 데이터)
  const aqiTrendData = [
    { time: '00:00', value: aqiInfo.aqi - 10 },
    { time: '03:00', value: aqiInfo.aqi - 5 },
    { time: '06:00', value: aqiInfo.aqi },
    { time: '09:00', value: aqiInfo.aqi + 5 },
    { time: '12:00', value: aqiInfo.aqi },
    { time: '15:00', value: aqiInfo.aqi - 3 },
    { time: '18:00', value: aqiInfo.aqi - 7 },
    { time: '21:00', value: aqiInfo.aqi - 10 },
  ];

  const columnConfig = {
    data: pollutantData,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'top',
      formatter: (value) => `${value} μg/m³`,
    },
    tooltip: {
      showMarkers: true,
      showTitle: true,
      title: (data) => {
        return `${pollutantDescriptions[data.type]} μg/m³`
      },
    },
    colorField: 'type',
  };

  const lineConfig = {
    data: aqiTrendData,
    xField: 'time',
    yField: 'value',
    point: {
      shape: 'circle',
    },
  };

  return (
    <Card>
      <Title level={4}>
        <EnvironmentOutlined /> 대기질 분석
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card size="small">
            <Title level={5}>대기오염 물질 농도</Title>
            <Column {...columnConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card size="small">
            <Title level={5}>AQI 대기질 지수 추이</Title>
            <Line {...lineConfig} height={300} />
          </Card>
        </Col>
      </Row>
    </Card >
  );
}

export default AirQualityChart; 