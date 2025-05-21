import { useEffect, useState } from 'react';
import { Card, Typography, Space, Rate, Divider, Empty, Form, Input, Button, message } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import AirQualityChart from './AirQualityChart';
import { fetchReviews, insertReview } from '../supa/supaApi';

const { Title, Text } = Typography;
const { TextArea } = Input;

function Reviews({ cityId, aqiInfo }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!cityId) {
            setReviews([]);
            return;
        }
        setLoading(true);
        fetchReviews(cityId)
            .then(data => {
                setReviews(data || []);
                setLoading(false);
            });
    }, [cityId]);

    const handleSubmit = async (values) => {
        try {
            await insertReview({
                city_id: cityId,
                user_name: values.userName,
                rating: values.rating,
                comment: values.comment,
                air_quality_index: aqiInfo?.aqi || 0,
            });

            message.success('리뷰가 성공적으로 작성되었습니다.');
            form.resetFields();

            // 리뷰 목록 새로고침
            const newReviews = await fetchReviews(cityId);
            setReviews(newReviews || []);
        } catch (error) {
            message.error('리뷰 작성 중 오류가 발생했습니다.');
            console.error('Error:', error);
        }
    };

    if (!cityId) return (
        <Card>
            <Empty description="마커를 클릭하여 리뷰를 확인하세요" />
        </Card>
    );

    if (loading) return (
        <Card>
            <Empty description="리뷰를 불러오는 중..." />
        </Card>
    );

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <AirQualityChart aqiInfo={aqiInfo} />

            <Card>
                <Title level={4}>
                    <EnvironmentOutlined /> 리뷰 목록
                </Title>
                {!reviews.length ? (
                    <Empty description="아직 작성된 리뷰가 없습니다" />
                ) : (
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {reviews.map(r => (
                            <Card key={r.id} size="small">
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <UserOutlined />
                                        <Text strong>{r.user_name}</Text>
                                        <Rate disabled defaultValue={r.rating} />
                                    </Space>
                                    <Text>{r.comment}</Text>
                                    <Space split={<Divider type="vertical" />}>
                                        <Text type="secondary">
                                            공기질 지수: {r.air_quality_index}
                                        </Text>
                                        <Text type="secondary">
                                            작성일: {new Date(r.created_at).toLocaleString()}
                                        </Text>
                                    </Space>
                                </Space>
                            </Card>
                        ))}
                    </Space>
                )}
            </Card>

            <Card>
                <Title level={4}>
                    <EnvironmentOutlined /> 리뷰 작성
                </Title>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="userName"
                        label="이름"
                        rules={[{ required: true, message: '이름을 입력해주세요' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="이름을 입력해주세요" />
                    </Form.Item>

                    <Form.Item
                        name="rating"
                        label="평점"
                        rules={[{ required: true, message: '평점을 선택해주세요' }]}
                    >
                        <Rate />
                    </Form.Item>

                    <Form.Item
                        name="comment"
                        label="리뷰 내용"
                        rules={[{ required: true, message: '리뷰 내용을 입력해주세요' }]}
                    >
                        <TextArea rows={4} placeholder="리뷰 내용을 입력해주세요" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            리뷰 작성
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
}

export default Reviews;
