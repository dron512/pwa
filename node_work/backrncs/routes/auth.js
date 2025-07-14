const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.get('/me', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({message: '토큰 없음'});

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({message: '토큰 무효'});
  }
}, async (req, res, next) => {
  try {
    const user = await User.findOne({_id:req.user.userId})
    console.log(user);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const {nickname, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = new User({email, password: hashed, nickname});
    const result = await user.save();
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({error: 'User is not exists'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({error: 'password does not match'});
    }
    // payload 는 데이터 보이는 거
    const token = jwt.sign({
        userId: user._id,
        nickName: user.nickname,
      },
      // 비밀번호 유효한지 검사하기 위해
      "secret"
      , {expiresIn: "1h"}
    )
    res.json({token});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;