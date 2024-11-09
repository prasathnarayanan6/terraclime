const express = require('express');
const router = express.Router();
const {LevelTest, Counts}= require('../controller/LevelTest');
router.get('/test', LevelTest);
router.get('/data', Counts);
module.exports = router;


