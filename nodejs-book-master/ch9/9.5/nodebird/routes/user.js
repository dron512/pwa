const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow,followingDisconnect } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);
router.post('/:id/followingDisconnect', isLoggedIn, followingDisconnect);

module.exports = router;
