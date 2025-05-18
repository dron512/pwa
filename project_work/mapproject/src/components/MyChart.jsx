import { Bar, Line, Pie } from "@ant-design/plots";
import { Button } from "antd";
import React, { useState } from "react";

const MyChart = (props) => {
  const [data, setData] = useState(props.data);

  const lineConfig = {
    data,
    xField: "date",
    yField: "value",
    height: 300,
  };

  const changeData = () => {
    setData([
      {
        date: "2023-01-01",
        value: Math.floor(Math.random() * 100),
      },
      {
        date: "2023-01-02",
        value: Math.floor(Math.random() * 100),
      },
      {
        date: "2023-01-03",
        value: Math.floor(Math.random() * 100),
      },
      {
        date: "2023-01-04",
        value: Math.floor(Math.random() * 100),
      },
      {
        date: "2023-01-05",
        value: Math.floor(Math.random() * 100),
      },
    ]);
  };

  const piedata = [
    { category: "A", percent: 30 },
    { category: "B", percent: 90 },
    { category: "C", percent: 10 },
    { category: "D", percent: 50 },
  ];

  const pieConfig = {
    data: piedata,
    angleField: "percent",
    colorField: "category",
    height: 300,
  };

  return (
    <>
      <div>MyChart</div>
      <Pie {...pieConfig} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "70%" }}>
          <Line {...lineConfig} />
        </div>
        <div style={{ width: "30%" }}>
          <Button onClick={changeData}>버튼</Button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "70%" }}>
          <Bar {...lineConfig} />
        </div>
        <div style={{ width: "30%" }}>
          <Button onClick={changeData}>버튼</Button>
        </div>
      </div>
    </>
  );
};

export default MyChart;
