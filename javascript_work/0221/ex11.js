var x = 5;

function foo(){
    var x = 10;
    console.log(`foo의 상위스코프 x = ${x}`);

    function test(){
        console.log(`상위 스코프 = ${x}`);
    }
    test();
}

foo();