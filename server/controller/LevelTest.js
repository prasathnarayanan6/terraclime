const fs = require('fs');
const {InsertData, TotalCons} = require('../model/FlowModel');
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
            res.send(result);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}
module.exports = {LevelTest, Counts};