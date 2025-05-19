import React from "react";

// const Person = (asdf) => {
const Person = ({ name, age, position }) => {
  const myStyle = {
    position: "absolute",
    zIndex: 100,
    width: "200px",
    backgroundColor: "#fff",
  };

  if (position === "right") {
    myStyle.right = "0";
  } else {
    myStyle.bottom = "0";
  }

  return (
    <div style={{ ...myStyle }}>
      <h2>name ={name}</h2>
      <h2>age ={age}</h2>
    </div>
  );
};

export default Person;
