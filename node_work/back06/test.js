const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: 'dfc172d3',
  apiSecret: '',// 이미지에 표시된 Secret 값 사용
});

const from = "Vonage APIs";// 혹은 설정한 발신자 IDconst to = {{보내고자하는 핸드폰번호}};
const text = "A text message sent using the Vonage SMS API";

async function sendSMS(to) {
  try {
    const resp = await vonage.sms.send({ to, from, text });
    console.log(resp);
    if (resp.messages[0].status === "0") {
      console.log("Message sent successfully");
    } else {
      console.log("Message failed with error:", resp.messages[0]["error-text"]);
    }
  } catch (err) {
    console.log("There was an error sending the messages.");
    console.error(err);
  }
}

module.exports = sendSMS;
