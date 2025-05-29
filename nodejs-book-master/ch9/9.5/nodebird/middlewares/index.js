exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const userInfo = {
      id: req.user.id,
      email: req.user.email,
      nick: req.user.nick,
      provider: req.user.provider,
      snsId: req.user.snsId,
    };
    return res.json({
      message: '이미 로그인한 상태입니다.',
      user: userInfo
    });
  }
};
