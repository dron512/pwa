const express = require('express');
const router = express.Router();
const User = require('../schemas/users');

// [1] 사용자 등록
router.post('/register', async (req, res, next) => {
  try {
    const { nickname, email, password } = req.body;
    const user = new User({ email, password, nickname });
    const result = await user.save();
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// [2] 사용자 전체 조회
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ✅ [3] 사용자 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    return res.json({ message: '삭제 성공', deleted });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ✅ [4] 사용자 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, email, password } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { nickname, email, password },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    return res.json({ message: '수정 성공', updated });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
