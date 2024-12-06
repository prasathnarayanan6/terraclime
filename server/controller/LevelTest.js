const fs = require('fs');
const {InsertData, TotalCons, AnalyticsModel, PopUpDataModel, PriceFixModel, GraphDataModel} = require('../model/FlowModel');
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});
const LevelTest = async(req, res) => {
    
    const {flow, device_id} = req.query;
    try
    {
        // res.send(` ${flow} ${device_id}`); 
        // fs.writeFileSync("terr.text", device_id)
        const result = await InsertData(flow, device_id);
        if(result)
        {
            res.send('Inserted');
        }
    }
    catch(err)
    {
            res.status(500).send(err);
    }
}

const Counts = async(req, res) => {
    try
    {
            const result = await TotalCons();
            res.json({
               Total_Devices: parseInt(result.TotalDevices.rows[0].count),
               Total_Flow: parseInt(result.TotalFlow.rows[0].sum),
               Price: parseInt(result.WaterPriceLatest.rows[0].price),
               InactiveDevices: parseInt(result.InactiveDevices.rows[0].total_inactive_devices),
               ActiveDevices : parseInt(result.ActiveDevices.rows[0].active_devices)
            });
            // res.json({
            //     Total_flow: result.rows[0].sum,
            //     TotalDevices: result.rows[0].count
            // });
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}

const getDeviceRelatedData = async(req, res) => {
    const {flat_id} = req.query
    try
    {
            res.send(flat_id);
    }
    catch(err)
    {
        res.send(err);
    }
}
const AnalyticsData = async(req, res) => {
    try
    {
         const result = await AnalyticsModel();
         res.send(result);
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const PopUpData = async(req, res) => {
    const { flid, device_id} = req.query;
    try
    {
         const result = await PopUpDataModel(flid, device_id);
         res.send(result);
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

const FlowPriceSetUp = async(req, res) => {
    const {amount_price} = req.body;
    try
    {
        //res.send(amount_price);  
        if(!amount_price)
        {
            res.status(502).json({
                status: 'Please enter valid number'
            })
        }
        else
        {
            const result = await PriceFixModel(amount_price)
            res.status(200).json({
                data: 'Price fixed successfully'
            });
        }
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}
const GraphAnalysis = async(req, res) => {
    const {device_id, flat_id} = req.query;
    try 
    {
        if(device_id == 'device_id_1')
        {
            let jdeviceid = 'a22'
            const result = await GraphDataModel(jdeviceid, device_id, flat_id);
            res.send(result); 
        }
        else if(device_id == 'device_id_2')
        {
            let jdeviceid = 'a23'
            const result = await GraphDataModel(jdeviceid, device_id, flat_id)
            res.send(result)
        }
        else
        {
            res.status(401).send('not matching');
        }
    }
    catch(err)
    {
        res.status(500).send(err)
        console.log(err);
    }
}
module.exports = {LevelTest, Counts, getDeviceRelatedData, AnalyticsData, PopUpData, FlowPriceSetUp, GraphAnalysis};