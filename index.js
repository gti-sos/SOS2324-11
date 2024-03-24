import express from "express";
import bodyParser from "body-parser";
import dataStore from "nedb"; 
import { handler } from "./frontend/build/handler.js";

import { loadBackend_sharay } from "./backend/v2/api-structural-investment-data/index.js";
let db_SPJ = new dataStore(); 
import { loadBackend_isabel } from "./backend/v2/api-structural-payment-data/index.js";
let db_ITR = new dataStore();
import { loadBackend_álvaro } from"./backend/v2/api-socioeconomics-tracker-using-unconventional-data/index.js";
let db_AMD = new dataStore();

let app = express();
app.use(bodyParser.json());

//API
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






