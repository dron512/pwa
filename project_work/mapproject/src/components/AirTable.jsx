import React, { useState, useEffect } from 'react';
import {Card, Space, Table} from "antd";
import {Line} from "@ant-design/plots";

function AirTable(props) {
    const [tableData, setTableData] = useState({
        forecast: props.forecast || {},
        aqi: props.aqi || {}
    });

    useEffect(() => {
        setTableData({
            forecast: props.forecast || {},
            aqi: props.aqi || {}
        });
    }, [props]);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <Card hoverable style={{margin:'2rem'}}>
                <h1>대기질 정보</h1>
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </Card>
            <Card hoverable style={{margin:'2rem'}}>
                <h1>미세먼지/초미세먼지 예보</h1>
                <Line
                    data={tableData.forecast?.daily?.pm10?.map((item, index) => ({
                        date: item.day,
                        value: item.avg,
                        type: 'PM10'
                    })).concat(
                        tableData.forecast?.daily?.pm25?.map((item) => ({
                            date: item.day,
                            value: item.avg,
                            type: 'PM2.5'
                        }))
                    ) || []}
                    xField="date"
                    yField="value"
                    point={{
                        shape: 'diamond',
                    }}
                />
            </Card>
        </>
    );
}

export default AirTable;