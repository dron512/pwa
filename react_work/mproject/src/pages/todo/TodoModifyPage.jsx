import React, {useState} from 'react';
import {Button, Card, Form, Input, Layout, notification, Select} from "antd";
import {useParams} from "react-router-dom";

function TodoModifyPage(props) {
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    console.log(id);

    const onFinish =  (values) => {
        setLoading(true);
        fetch( 'https://6809e0571f1a52874cde2b14.mockapi.io/todos',{
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            notification.success({
                message: "성공적으로 저장하였습니다."
            })
        })

        setLoading(false);
    }
    return (
        <Layout.Content>
            <h1>Modify page</h1>
            <Card hoverable>
                <Form layout="vertical" onFinish={onFinish} initialValues={{
                    createdAt: "2025-04-24T09:10:09.632Z",
                    todo: "추가하기",
                    completed: "false",
                    userId: "123",
                    id: "1"
                }}>
                    <Form.Item label="Todo" name="todo" rules={[{required: true, message: "할일을 입력하세요"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="completed" name="completed" rules={[{required: true, message: "할일 완료여부 선택하세요"}]}>
                        <Select>
                            <Select.Option value="false">미완료</Select.Option>
                            <Select.Option value="true">완료</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="userID" name="userId" rules={[{required: true, message: "사용자ID를 입력하세요"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>저장</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout.Content>
    );
}

export default TodoModifyPage;