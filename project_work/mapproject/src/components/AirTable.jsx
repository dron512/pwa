import React, { useEffect, useState } from "react";
import { Card, Space, Table } from "antd";

function AirTable(props) {
  const [data, setData] = useState(props);

  // porps 값이 바뀌면.. useEffect 가 실행된다.
  useEffect(() => {
    console.log("AirTable useEffect");
    // setData 로 useState 사용시 화면 재랜더링이 이루어지면서 클릭했는
    // 좌표의 미세먼지 데이터가 표시된다.
    setData(props);
  }, [props]);

  try {
    const {
      aqi,
      city: { geo },
      iaqi: { co, no2, o3, pm10, pm25, so2 },
    } = props;
    console.log(aqi);
    console.log(geo);
    console.log("일산화탄소", co);
    console.log("이산화질소", no2);
    console.log("오존", o3);
    console.log("미세먼지", pm10);
    console.log("초미세먼지", pm25);
    console.log("아황산가스", so2);
  } catch (e) {}

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  // props 값이 바뀌면.. 컴포넌트가 재랜더링 되지 않는다.

  return (
    <Card hoverable style={{ margin: "2rem" }}>
      <h1>대기질 정보</h1>
      <p>
        {/* <h2>일산화탄소 : {JSON.stringify(data)} </h2> */}
        <h2>일산화탄소 : {data?.iaqi?.co?.v} </h2>
        <h2>이산화질소 : {data?.iaqi?.no2?.v} </h2>
        <h2>오존 : {data?.iaqi?.o3?.v} </h2>
        <h2>미세먼지 : {data?.iaqi?.pm10?.v} </h2>
        <h2>초미세먼지 : {data?.iaqi?.pm25?.v} </h2>
        <h2>아황산가스 : {data?.iaqi?.so2?.v} </h2>
      </p>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
}

export default AirTable;
