const aa = require('randomcolor');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('이름입력해봐\n', name => {
    console.log(`name = ${name}`);
    rl.close();
});

// console.log(readline);
// console.log(aa());