import React, { useEffect, useState } from "react";
import { fetchReviews, postReview } from "../../api/supadb";
import { UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card, Typography, Form, Input, Button, message, Rate } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Reviews = ({ city, aqi }) => {
  if (!city) {
    return <div>Loading...</div>;
  }
  
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviews(city.id)
      .then((data) => {
        setReviews(data); // 화면 재랜더링
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  // custom 훅은 맨 마지막에 호출되야 한다고 경고 메시지 떠서 옮겼습니다.
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    values.city_id = city.id;
    values.air_quality_index = aqi;
    const ret = await postReview(values);
    if(ret==='success'){
      message.success('성공적으로 저장하였습니다.');
    }
    else{
      message.error('저장 실패');
    }
  };

  return (
    <div>
      <h1>Reviews {city.name}</h1>
      <h2>미세먼지 {aqi}</h2>
      { city && reviews &&
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.comment}</p>
            <p>
              <UserOutlined />
              작성자: {review.user_name}
            </p>
            <p>작성일: {new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      <Card>
        <Title level={3}>
          <EnvironmentOutlined />
          리뷰작성
        </Title>
        {
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="user_name"
              label="이름"
              rules={[{ required: true, message: "이름을 입력하세요" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="이름을 입력하세요"
              />
            </Form.Item>
            <Form.Item
              name="rating"
              label="평점"
              rules={[{ required: true, message: "평점을 선택해주세요" }]}
            >
              <Rate></Rate>
            </Form.Item>
            <Form.Item
              name="comment"
              label="리뷰 내용"
              rules={[{ required: true, message: "리뷰 내용을 입력해주세요" }]}
            >
              <TextArea rows={4} placeholder="리뷰 내용을 입력해주세요" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>리뷰 작성</Button>
            </Form.Item>
          </Form>
        }
      </Card>
    </div>
  );
};

export default Reviews;