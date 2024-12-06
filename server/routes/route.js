const express = require('express');
const router = express.Router();
const {LevelTest, Counts, getDeviceRelatedData, AnalyticsData, PopUpData, FlowPriceSetUp, GraphAnalysis}= require('../controller/LevelTest');
const LoginController = require('../controller/LoginController');
router.get('/test', LevelTest);  
router.get('/data', Counts);
router.get('/getdevices', getDeviceRelatedData)
router.post('/login', LoginController);
router.get('/analytics-data', AnalyticsData);
router.get('/popupdata', PopUpData);
router.post('/price-setup', FlowPriceSetUp);
router.get('/get-graph', GraphAnalysis);

module.exports = router;


