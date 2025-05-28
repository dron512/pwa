import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [result, setResult] = useState('');
  const [posts, setPosts] = useState(null);

  const join = async () => {
    const result = await axios.post('http://localhost:8001/auth/join',
      {email: "ccc@naver.com", nick: "닉네임", password: "1234"});
    console.log(result);
  }
  const login = async () => {
    const formData = new FormData();
    formData.append('email', "ccc@naver.com");
    formData.append('password', "1234");

    const data = {email: "ccc@naver.com", nick: "닉네임", password: "1234"};
    axios.defaults.withCredentials = true;

    const result = await axios.post('http://localhost:8001/auth/login', data);
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
      <button onClick={join}>회원가입</button>
      <button onClick={login}>로그인</button>
      {
        posts && posts.map(post => {
          return <div key={post.id}>{post.content}</div>
        })
      }
    </>
  )
}

export default App
