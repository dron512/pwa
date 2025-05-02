import { Card, Table, Typography } from 'antd';

const { Title, Text } = Typography;

const pollutantColumns = [
  {
    title: '지표',
    dataIndex: 'indicator',
    key: 'indicator',
    width: '15%',
    render: text => <Text strong>{text}</Text>
  },
  {
    title: '의미',
    dataIndex: 'meaning',
    key: 'meaning',
    width: '20%',
  },
  {
    title: '주요 원인',
    dataIndex: 'cause',
    key: 'cause',
    width: '30%',
  },
  {
    title: '인체 영향',
    dataIndex: 'effect',
    key: 'effect',
    width: '35%',
  },
];

const pollutantData = [
  {
    key: '1',
    indicator: "PM2.5",
    meaning: "초미세먼지",
    cause: "자동차 배기가스, 화석연료 연소",
    effect: "폐질환, 심혈관 질환"
  },
  {
    key: '2',
    indicator: "PM10",
    meaning: "미세먼지",
    cause: "공장, 황사, 도로 먼지",
    effect: "호흡기 질환, 기관지 자극"
  },
  {
    key: '3',
    indicator: "NO2",
    meaning: "이산화질소",
    cause: "자동차 배기가스, 공장",
    effect: "천식, 폐 손상"
  },
  {
    key: '4',
    indicator: "SO2",
    meaning: "아황산가스",
    cause: "석탄, 석유 연소",
    effect: "눈/기관지 자극, 산성비 유발"
  },
  {
    key: '5',
    indicator: "CO",
    meaning: "일산화탄소",
    cause: "자동차 배기가스, 연소",
    effect: "두통, 질식 위험"
  },
  {
    key: '6',
    indicator: "O3",
    meaning: "오존",
    cause: "배기가스 + 햇빛 반응",
    effect: "피부/호흡기 자극, 오존 경보"
  }
];

const PollutantTable = () => {
  return (
    <Card>
      <Title level={3}>🌍 대기오염 지표 정보</Title>
      <Table 
        columns={pollutantColumns} 
        dataSource={pollutantData} 
        pagination={false}
        bordered
      />
    </Card>
  );
};

export default PollutantTable; 