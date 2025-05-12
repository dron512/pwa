import React, { useState } from "react";

const Reviews = ({ city }) => {
  if (city == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Reviews {city.name}</h1>
      <h2>미세먼지 {city.aqi}</h2>
    </div>
  );
};

export default Reviews;
