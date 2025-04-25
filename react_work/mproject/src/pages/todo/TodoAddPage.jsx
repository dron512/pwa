import React, {useState} from 'react';
import {Button, Card, Form, Input, Layout} from "antd";

function TodoAddPage(props) {
    const [loading, setLoading] = useState(false);
    const onFinish = () => {
        setLoading(true);
        console.log("저장할꺼임");
        setLoading(false);
    }
    return (
        <Layout.Content>
            <h1>ADD page</h1>
            <Card hoverable>
                {/* 
                    layout vertical 세로로 나오게
                    submit 버튼 누르면 onFinish 함수연결
                    initialValues Form 에 초기값 설정
                */}
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>저장</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout.Content>
    );
}

export default TodoAddPage;