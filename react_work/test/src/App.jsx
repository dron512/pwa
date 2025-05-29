import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import { useAuth } from "./AuthContext";


function App() {
  const [result, setResult] = useState('');
  const [posts, setPosts] = useState(null);
  const { user, login, logout } = useAuth();

  const join = async () => {
    const result = await axios.post('http://localhost:8001/auth/join',
      {email: "ccc@naver.com", nick: "닉네임", password: "1234"});
    console.log(result);
  }

  const getPosts = async ()=>{
    axios.get('http://localhost:8001/post/posts')
    .then(res => {
      console.log(res);
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      result = {result}
      {user && (
        <div className="user-info">
          <h3>로그인 정보</h3>
          <div className="user-details">
            <p>이메일: {user.email}</p>
            <p>닉네임: {user.nick}</p>
            <p>아이디: {user.id}</p>
            <p>로그인 방식: {user.provider}</p>
            <p>SNS ID: {user.snsId || '없음'}</p>
          </div>
        </div>
      )}
      <button onClick={join}>회원가입</button>
      <button onClick={()=>{
        login("aaa@naver.com","1234","닉네임")
        }}>로그인</button>
      {user && <button onClick={logout}>로그아웃</button>}
      {
        posts && posts.map(post => {
          return <div key={post.id}>{post.content}</div>
        })
      }
    </>
  )
}

export default App
