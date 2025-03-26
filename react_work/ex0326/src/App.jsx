import { useState } from 'react'
import './App.css'

// useState useEffect useRef useMemo useCallback 훅
// 값이 변경될시에 화면이 재랜더링

function App() {
  const [count, setCount] = useState(0);

  const [data, setData] = useState([
    { review_num: 1, user_id: "40dcf945-4749-4891-8be1-cd7a431e39e3", name: "홍길동", title: "제목1", review_txt: "리뷰입니다11." },
    { review_num: 2, user_id: "40dcf945-4749-4891-8be1-cd7a431e39e3", name: "박길동", title: "제목2", review_txt: "리뷰입니다22." },
    { review_num: 3, user_id: "40dcf945-4749-4891-8be1-cd7a431e39e3", name: "이길동", title: "제목3", review_txt: "리뷰입니다33." }
  ]);

  // const retData = data.map(item => {
  //   // console.log(item);
  //   return `<li>내용</li>`;
  // })
  // console.log(retData);

  console.log("App 랜더링");

  const getReview = ()=>{
    console.log("test");
  }

  return (
    <>
      <h1>count = {count}</h1>
      <button onClick={() => { setCount(count + 1) }}>count증가</button>
      {
        data.map(item => (
          <div key={item.review_num}>
            <div><h2>게시글 {item.title}</h2></div>
            <div>{item.review_txt}</div>
            <div>작성자{item.name}</div>
          </div>
        ))
      }
      <button onClick={getReview}>review데이터 가져오기</button>
    </>
  )
}

export default App
