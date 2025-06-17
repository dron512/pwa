const express = require('express');
const router = express.Router();
const supabase = require('../config/supa.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// uploads/cleaners 폴더 생성
const uploadDir = 'public/uploads/cleaners';
try {
  if (!fs.existsSync('public/uploads')) {
    fs.mkdirSync('public/uploads', { recursive: true });
  }
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.error('폴더 생성 중 오류 발생:', err);
}

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024 // 5MB 제한
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cleaner').select('*');
    if (error) {
      return res.status(400).send('청소기사 조회 실패: ' + error.message);
    }
    res.render('admin', { cleaners: data });
  } catch (e) {
    res.status(500).send('서버 오류: ' + e.message);
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  const { name, phone, email, address } = req.body;
  const photo_url = req.file ? `/uploads/cleaners/${req.file.filename}` : null;

  try {
    const { error } = await supabase
      .from('cleaner')
      .insert([{ 
        name, 
        phone, 
        email, 
        address,
        photo_url 
      }]);

    if (error) {
      return res.status(400).send('청소기사 등록 실패: ' + error.message);
    }
    res.redirect('/admin');
  } catch (e) {
    res.status(500).send('서버 오류: ' + e.message);
  }
});

module.exports = router; 