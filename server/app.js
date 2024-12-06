const express = require('express');
const cors = require('cors');
const LevelTest = require('./routes/route.js');
const Counts = require('./routes/route.js')
const app = express();
const getDeviceRelatedData =  require('./routes/route.js');
const client = require('./utils/conn.js');
const LoginController= require('./routes/route'); 
const AnalyticsData = require('./routes/route');
const PopUpData = require('./routes/route');
const FlowPriceSetUp = require('./routes/route');
const GraphAnalysis = require('./routes/route')
app.use(cors());
app.use(express.json());
app.listen('3007', (err)=> {
    if(err) process.exit(1);
    console.log('working')
})
app.use('/api/v1/', LevelTest);
app.use('/api/v1/', Counts);
app.use('/api/v1/', getDeviceRelatedData);
app.use('/api/v1/', LoginController);
app.use('/api/v1/', AnalyticsData);
app.use('/api/v1/', PopUpData);
app.use('/api/v1/', FlowPriceSetUp);
app.use('/api/v1/', GraphAnalysis)
