const client = require('../Helpers/Conn');
const CountTotalDevices = () => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM`)
    })
}
const InsertData = (flow, device_id) => {
    return new Promise((resolve, reject) => {
        client.query('INSERT INTO flow(device_id, flow, timestamp) VALUES($1, $2, NOW())', [device_id, flow], 
        (err, result) => {
            if(err){
                reject(err)
            }
            else
            {
                resolve(result);
            }
        })
    })
}
const TotalCons = () => {
    return new Promise((resolve, reject) => {
        const TotalFlow = new Promise((resolveQuery1, rejectQuery1) => {
            client.query('SELECT SUM(flow) FROM flow;', 
                (err, result) => {
                    if(err)
                    {
                        rejectQuery1(err);
                    }
                    else
                    {
                        resolveQuery1(result);
                    }
                })
        })
        const Flw = new Promise((resolveQuery2, rejectQuery2) => {
                client.query('', (err, result) => {
                    if(err)
                    {
                        rejectQuery2(err);
                    }
                    else
                    {
                        resolveQuery2(result);
                    }
                })
        })
        Promise.all([TotalFlow, Flw]).then(([TotalFlow, Flw])=>{
            resolve({TotalFlow, Flw})
        }).catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {CountTotalDevices, InsertData, TotalCons};