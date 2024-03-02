const isabel_data = require('./index-ITR');

const API_BASE = "/api/v1";

module.exports = (app) => {
    app.get(API_BASE+"/structural-payment-data", (req, res)=>{
        res.send(JSON.stringify(isabel_data));
    });

};
