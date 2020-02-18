const express = require('express');
const router = express.Router(); // 라우터 분리

router.get('/api/hello', (req, res) => { // app 대신 router에 연결
  res.json({express:"hello~"});
});


module.exports = router; // 모듈로 만드는 부분