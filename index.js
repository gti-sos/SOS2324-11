let express = require("express");
let bodyParser = require("body-parser");
let dataStore = require("nedb"); 

let API_SPJ = require("./api-structural-investment-data")
let db_SPJ = new dataStore(); 
let API_ITR = require("./api-structural-payment-data")
let db_ITR = new dataStore();
let API_AMD = require("./api-socioeconomics-tracker-using-unconventional-data");
let db_AMD = new dataStore();

let app = express();
app.use(bodyParser.json());

const PORT = (process.env.PORT || 10000); 

//API
API_SPJ(app, db_SPJ);
API_ITR(app, db_ITR);
API_AMD(app, db_AMD);

// Listening on port X
app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});

//Shows information from index.js
app.use("/", express.static("./public"));




