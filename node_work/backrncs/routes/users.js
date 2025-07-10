const express = require('express');
const router = express.Router();
const User = require('../schemas/users');

router.post('/register', async (req, res, next) => {
  try {
    const {nickname, email, password} = req.body;
    const user = new User({email, password, nickname});
    // insert...
    const result = await user.save();
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    // select....
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

routet.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const {nickname, email, password} = req.body;
    const updated = User.findByIdAndUpdate(
      id,
      {nickname, email, password},
      {new: true, runValidators: true}
    )
    if (!updated) {
      return res.status(404).json({message:'사용자를 찾을수 없습니다.'})
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  // const id = req.params.id;
  try {
    const {id} = req.params;
    // supabase.from('users').delete().eq('id',id);
    const deleted = await User.findByIdAndDelete(id);
    // 정상일때
    return res.json(deleted);
  } catch (err) {
    // 에러일때
    return res.status(500).json(err);
  }


})

module.exports = router;