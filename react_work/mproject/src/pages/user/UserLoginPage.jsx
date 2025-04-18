import React, {useState} from 'react';
import {Button, Flex, Form, Input, Layout} from "antd";
import {loginUser} from "../../database/userManager.js";

const {Content} = Layout;

function UserLoginPage(props) {
    const [loading, setLoading] = useState(false);
    const finish = (values) => {
        const {email, password} = values;
        setLoading(true);// 로그인 못하게 막음
        // userManager안에 loginUser 함수 호출
        loginUser(email, password);
        setLoading(false);// 로그인 할 수 있게 풀음
    }

    return (
        <Content>
            <Flex style={{justifyContent: 'center', alignItems: 'center', height: '100%'}} vertical>
                <h1 style={{fontSize: '2rem'}}>로그인</h1>
                <Form onFinish={finish} initialValues={{email: "aaa@naver.com", password: "12345"}}>
                    <Form.Item
                        label="이메일"
                        name="email"
                        rules={[{required: true, type: 'email', message: '이메일을 입력해주세요'}]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        label="패스워드"
                        name="password"
                        rules={[{required: true, message: '비밀번호를 입력해주세요'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>로그인</Button>
                </Form>
            </Flex>
        </Content>
    );
}

export default UserLoginPage;