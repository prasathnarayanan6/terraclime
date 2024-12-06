const client = require('../utils/conn');
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
                client.query('SELECT SUM(flow) FROM flow;', (err, result) => {
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
        const InactiveDevices = new Promise((resolveQuery3, rejectQuery3) => {
            client.query(`SELECT COUNT(DISTINCT device_id) AS total_inactive_devices FROM flow WHERE device_id IN (SELECT device_id FROM flow GROUP BY device_id HAVING MAX(timestamp) < NOW() - INTERVAL '24 hours');`, (err, result) => {
                if(err)
                {
                    rejectQuery3(err)
                }
                else
                {
                    resolveQuery3(result);
                }
            })
        })

        const ActiveDevices = new Promise((resolveQuery7, rejectQuery7) => {
            client.query(`SELECT COUNT(DISTINCT device_id) AS active_devices FROM flow WHERE device_id IN (SELECT device_id FROM flow GROUP BY device_id HAVING MAX(timestamp) >= NOW() - INTERVAL '24 hours');`, (err, result) => {
                if(err)
                {
                    rejectQuery7(err)
                }
                else
                {
                    resolveQuery7(result);
                }
            })
        })


        const TotalDevices = new Promise((resolveQuery4, rejectQuery4) => {
            client.query(`SELECT COUNT(DISTINCT device_id) FROM flow;`, (err, result) => {
                if(err)
                {
                    rejectQuery4(err)
                }
                else
                {
                    resolveQuery4(result)
                }
            })
        })

        const WaterPriceLatest = new Promise((resolveQuery5, rejectQuery5) => {
            client.query(`SELECT * FROM price ORDER BY timestamp DESC LIMIT 1; `, (err, result) => {
                if(err)
                {
                    rejectQuery5(err)
                }       
                else
                {
                    resolveQuery5(result);
                }
            })
        })
        Promise.all([TotalFlow, Flw, InactiveDevices, TotalDevices, WaterPriceLatest, ActiveDevices]).then(([TotalFlow, Flw, InactiveDevices, TotalDevices, WaterPriceLatest, ActiveDevices])=>{
            resolve({TotalFlow, Flw, InactiveDevices, TotalDevices, WaterPriceLatest, ActiveDevices})
        }).catch((err)=>{
            reject(err)
        })
    })
}

const AnalyticsModel = () => {
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM users;', (err, result) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(result);
            }
        })
    })
}
const PopUpDataModel = (flatid, device_id) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT f.device_id, SUM(f.flow) as flow_sum, MAX(f.timestamp), u.flat_id, u.apartment_id FROM flow f JOIN users u ON f.device_id = u.device_id->>$1 WHERE u.flat_id=$2 GROUP BY f.device_id, u.apartment_id, u.flat_id;`,[device_id, flatid], (err, result)=> {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        })
    })
}
const PriceFixModel = (amount_price) => {
    return new Promise((resolve, reject) => {
        client.query('INSERT INTO price(price, timestamp) VALUES($1, NOW())', [amount_price], (err, result) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        })
    })
}
const GraphDataModel = (jdeviceid, device_id, flat_id) => {
    return new Promise((resolve, reject) => {
        client.query(`select f.device_id, f.flow, f.timestamp from flow f JOIN users u on f.device_id=u.device_id->>$1 WHERE f.device_id=$2 and u.flat_id=$3; `, [device_id,jdeviceid, flat_id], (err, result) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        })
    })
}
module.exports = {CountTotalDevices, InsertData, TotalCons, AnalyticsModel, PopUpDataModel, PriceFixModel, GraphDataModel};