const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    console.log(email, nick, password);
    console.log(exUser);
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.send("회원가입완료");
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 비밀번호를 제외한 사용자 정보 전송
      const userInfo = {
        id: user.id,
        email: user.email,
        nick: user.nick,
        provider: user.provider,
        snsId: user.snsId,
      };
      console.log(userInfo);
      return res.json({
        message: '로그인 성공',
        user: userInfo
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 중 에러 발생:', err);
        return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
      }
      res.clearCookie('connect.sid');
      res.send('로그아웃 성공');
    });
  });
};

exports.me = (req, res) => {
  const userInfo = {
    id: req.user.id,
    email: req.user.email,
    nick: req.user.nick,
    provider: req.user.provider,
    snsId: req.user.snsId,
  };
  return res.json({
    message: '현재 로그인된 사용자 정보',
    user: userInfo
  });
};
