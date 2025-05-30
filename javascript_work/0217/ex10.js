// ()소괄호 {}중괄호 []대괄호
const f = () => {  
    return { name: '홍길동', age: 20 };
};
console.log(f());

const f1 = arr => '돌아오는값';

/*
    -- 한줄인 상황
    1. return 생략 가능한 경우는 한줄일때...
    2. 원시값 반환시에는 () 소괄호 생략가능
       객체값 반환시에는 () 소괄호 생략불가

    -- 여러줄인 상황 
    1. {} 중괄호 생략 불가
    2. return 생략 불가

    한줄 여러줄 상황
    매개변수 한개일때 () 생략 가능
*/