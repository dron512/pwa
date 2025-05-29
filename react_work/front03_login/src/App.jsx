import './App.css'
import axios from "axios";
import {useState} from "react";

function App() {
  const [state, setState] = useState("");
  const test = "test 입니다";
  const login = async () => {
    const res =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/login`, // 전송 url 설정
        {email: "aaa@naver.com", password: "1234"}, // req.body내용 보냄
        {withCredentials: true} // 쿠키설정 허용
      )
    // console.log(res);
    setState(res.data);
  }
  const logout = async () => {
    const res =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/logout`, // 전송 url 설정
        {withCredentials: true} // 쿠키설정 허용
      )
    // console.log(res);
    setState(res.data);
  }
  const mypage = async () => {
    const res
      = await axios.get(`${import.meta.env.VITE_API_URL}/mypage`, {withCredentials: true})
    console.log(res);
    setState(JSON.stringify(res.data));
  }
  return (
    <>
      <h1>{`test= ${test}`}</h1>
      <h1>{state}</h1>
      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <button onClick={mypage}>마이페이지</button>
    </>
  )
}

export default App
