import express from "express";
import bodyParser from "body-parser";
import dataStore from "nedb"; 
import cors from "cors";
import request from "request";

import { handler } from "./frontend/build/handler.js";

import { loadBackend_sharay_v1 } from "./backend/v1/api-structural-investment-data/index.js";
import { loadBackend_sharay } from "./backend/v2/api-structural-investment-data/index.js";
let db_SPJ = new dataStore(); 
import { loadBackend_isabel_v1 } from "./backend/v1/api-structural-payment-data/index.js";
import { loadBackend_isabel } from "./backend/v2/api-structural-payment-data/index.js";
let db_ITR = new dataStore();
import { loadBackend_álvaro_v1 } from "./backend/v1/api-socioeconomics-tracker-using-unconventional-data/index.js";
import { loadBackend_álvaro } from"./backend/v2/api-socioeconomics-tracker-using-unconventional-data/index.js";
let db_AMD = new dataStore();

let app = express();

console.log("a")

app.use(cors());

// Proxy Isabel
var pathsIsabelMaria = "/proxyIsabelMaria";
var apiServerHostIsabelMaria = "https://api.openligadb.de/getavailableleagues";

app.use(pathsIsabelMaria, function(req,res){
    var url = apiServerHostIsabelMaria + req.url;
    req.pipe(request(url)).pipe(res);
});

// Proxy Sharay
var paths = "/proxySharay";
var apiServerHost = "https://restcountries.com/v3.1/all";

app.use(paths, function(req,res){
    var url = apiServerHost + req.url;
    req.pipe(request(url)).pipe(res);
});

// Proxy Alvaro
app.use("/proxyAlvaro", function (req, res) {

    const url = 'https://trading-view.p.rapidapi.com/calendars/get-economic-calendar';
    const params = new URLSearchParams({ from: '2016-01-01',
                                    to: '2022-12-31',
                                    countries: 'EU',
                                    lang: 'en',
                                    minImportance: '1' });
    const fullUrl = `${url}?${params.toString()}`;

    const options = {
        url: fullUrl,
        headers: {
            'X-RapidAPI-Key': '01bdbb50d8mshb0788f51cbd3fccp155beejsnce3fed91f95e',
            'X-RapidAPI-Host': 'trading-view.p.rapidapi.com'
        }
    };
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        } else {
            console.log(response.statusCode);
            console.log(body);
            res.send(body);
        }
    });

});



app.use(bodyParser.json());

//v1
loadBackend_sharay_v1(app, db_SPJ);
loadBackend_isabel_v1(app, db_ITR);
loadBackend_álvaro_v1(app, db_AMD);

//v2
loadBackend_sharay(app, db_SPJ);
loadBackend_isabel(app, db_ITR);
loadBackend_álvaro(app, db_AMD);

app.use(handler);

const PORT = (process.env.PORT || 10000); 

// Listening on port X
app.listen(PORT, () =>
{
    console.log("b")
    console.log(`Server listening on port PORT ${PORT} `  ); 
});
