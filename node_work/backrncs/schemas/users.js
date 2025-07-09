const mongoose = require('mongoose');

const users = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: String,
  },
  {timestamps: true},
  // createAt insert sql 구문 실행시 입력시간 설정
  // updateAt update sql 구문 실행시 수정시간 설정
);

module.exports = mongoose.model('Users', users);