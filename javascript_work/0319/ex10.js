function solution(n) {
    var answer = 0;
    const 소수 = [];
    a:for (let i = 2; i <= n; i++) {
        let count = 1;
        if (i === 2 || i === 3 || i === 5 || i === 7 || i === 11) { answer++; continue; }; // 2는 유일한 짝수 소수
        if (i % 2 == 0) continue;

        for (const element of 소수) {
            if (i % element == 0) {
                continue a;
            }
        }

        for (let j = 3; j*j <= i; j += 2) {
            if (i % j == 0) {
                count++;
                console.log("count 증가됨", count);
            }
            if (count > 2) {
                console.log('소수아님 ' + i)
                count = 1;
                break;
            }
        }

        if (count === 2) {
            answer++;
            console.log(`소수로 추가됨 ${(i)}`);
            소수.push(i);
        }
    }
    return answer;
}
// 2,3,5,7
console.log(solution(30));