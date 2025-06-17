import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const reqLogin = async () => {
    axios.defaults.withCredentials = true;
    const result = await axios.post("http://localhost:4003/api/login", {
      id: "admin",
      password: "admin!!!!",
    });
    console.log(result);
  };

  return (
    <>
      <button onClick={reqLogin}>로그인</button>
    </>
  );
}

export default App;
