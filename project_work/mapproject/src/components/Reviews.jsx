import React, { useEffect, useState } from "react";
import { fetchReviews } from "../../api/supadb";
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

const Reviews = ({ city }) => {
  if (!city) {
    return <div>Loading...</div>;
  }

  // console.log("Reviews", propCity);
  // const [city, setCity] = useState(propCity);

  // 해당하는 좌표를 클릭하게 맞는 리뷰 데이터 슈파베이스에서 가져와야하기때문에
  // useEffect(() => {
  //   setCity(propCity);
  // }, [propCity]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(city.id)
      .then((data) => {
        setReviews(data); // 화면 재랜더링
      })
      .catch(e=>{
        console.log(e);
      });
  }, [city]);

  return (
    <div>
      <h1>Reviews {city.name}</h1>
      <h2>미세먼지 {city.aqi}</h2>
      { reviews.map((review) => {
        console.log(review);
        return (
            <div key={review.id}>
              <p>{review.comment}</p>
              <p> 
                <UserOutlined />
                 작성자: {review.user_name}</p>
              <p>작성일: {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
        );
      }
    )}
    </div>
  );
};

export default Reviews;
