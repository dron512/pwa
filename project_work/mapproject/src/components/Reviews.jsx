import React, { useState } from "react";

const Reviews = ({ city: propCity }) => {
  if (propCity == null) {
    return <div>Loading...</div>;
  }

  const [city, setCity] = useState(propCity);
  console.log(city);

  return (
    <div>
      <h1>Reviews {city.name}</h1>
      <h2>미세먼지 {city.aqi}</h2>
    </div>
  );
};

export default Reviews;
