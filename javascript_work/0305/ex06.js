function arg(){
    // 유사 배열 객체를 -> 배열객체로 만드는 방법
    // Array.prototype.slice.call 사용해야함
    const test = Array.prototype.slice.call(arguments);
    console.log(test);
}

arg(10,20,30)