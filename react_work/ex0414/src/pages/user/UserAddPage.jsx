import React, {useState} from 'react';
import {Card, Col, Form, Input, Layout, Row, Button} from "antd";

const {Content} = Layout;
// const {Item} = Form;

function UserAddPage(props) {
    const [loading, setLoading] = useState(false);
    const onFinish = () => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },2000)
    }
    return (
        <Content>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card style={{margin: '1rem', padding: '1rem'}}>
                        <h1 style={{fontSize: '2rem'}}>사용자추가</h1>
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item label="이름" name="name" rules={[{required: true, message: '이름을 입력해주세요'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="이메일" name="email"
                                       rules={[{required: true, type: 'email', message: '올바른 이메일을 입력해주세요'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="나이" name="age" rules={[{required: true, message: '나이를 입력해주세요'}]}>
                                <Input type="number"/>
                            </Form.Item>
                            <Form.Item label="전화번호" name="phone" rules={[{required: true, message: '전화번호를 입력해주세요'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="비밀번호" name="password" rules={[{required: true, message: '비밀번호를 입력해주세요'}]}>
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    등록
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default UserAddPage;