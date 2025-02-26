const readline = require('readline/promises');
const { people_select } = require('../ex02/db/select.js');
const { people_insert } = require('../ex02/db/insert.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getInput() {
    // 계속 
    while (true) {
        const number =
            await rl.question('1.select 2.insert \n');

        if (number == '1') {
            console.log("1번 입력했네");
            people_select();
        } else if (number == '2') {
            console.log('2번입력했네');
            people_insert();
        } else {
            console.log(`number = ${number} 종료됩니다.`);
            break;
        }
    }

    rl.close();
}

getInput();