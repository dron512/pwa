function solution(numbers) {
    var temp1 = numbers[0];
    var temp2 = numbers[1];

    for (var i = 2; i < numbers.length; i++) {
        if (temp1 < numbers[i]) {
            temp2 = temp1;
            temp1 = numbers[i]
        }
        if (temp2 < numbers[i] && temp1 > numbers[i]) {
            temp2 = numbers[i]
        }
    }
    console.log(`temp2 ${temp2}`)
    console.log(`temp1 ${temp1}`)
    return temp1 * temp2;
}

solution([200, 200, 1, 100, 3, 110, 160])