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

app.use(cors());

// Proxy Sharay
var paths = "/proxySharay";
var apiServerHost = "https://restcountries.com/v3.1/all";

app.use(paths, function(req,res){
    var url = apiServerHost + req.url;
    req.pipe(request(url)).pipe(res);
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
    console.log(`Server listening on port PORT ${PORT} `  ); 
});






