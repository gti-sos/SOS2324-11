let cool = require("cool-ascii-faces");
let express = require("express");
let bodyParser = require("body-parser");
let isabel_API = require("./api-structural-payment-data")
let dataStore = require("nedb");


//let isabel_API = require("./api-structural-payment-data");
let alvaro_API = require("./api-socioeconomics-tracker-using-unconventional-data");


const data = require('./index-SPJ'); 
const alvaro_data = require('./index-AMD');
const isabel_data = require('./index-ITR');


let db_ITR = new dataStore();

let dbAlvaro = new dataStore();


let app = express();

const PORT = (process.env.PORT || 10000); 

app.use(bodyParser.json());


isabel_API(app, db_ITR);


alvaro_API(app,dbAlvaro);


app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});

//Shows information from index.js
app.use("/", express.static("./public"));

//Coll Request
app.get("/cool", (req, res) => {
    res.send(`<html> <body> <h1> ${cool()}</h1> </body> </html>`)
});

//Sharay Algorithm
function calculateResultSharay(entry, countryWanted) {
    let listValues = entry.filter((data) => data.ms_name.match(countryWanted))
                           .map((line) => line.cumulative_annual_pre_financing);

    if (listValues.length === 0) {
        console.log(`No data found for the country: ${countryWanted}`);
        return null;
    }

    let sum = 0;
    listValues.forEach((value) => {
        sum += value;
    });

    return sum / listValues.length;
}

//Sharay Sample Request
app.get("/samples/SPJ", (req, res) => {

    const result = calculateResultSharay(data, "Spain"); 
    res.send(` <html> <body> <h1> The average cumulative annual prefinancing for the country is:  ${result}</h1> </body> </html>`);
});



//Alvaro Algorithm
function popularity_rate_average(data, country){
    var list = data.filter((n) => n.country === country).map((n) => n.popularity_rate);
    
    
    if (list.length === 0) {
        return 0; 
    }
    
    var sum = 0;
    list.forEach((n) => sum += n);

    var average = sum / list.length;

    return average;
} 

//Alvaro Sample Request
app.get("/samples/AMD", (req, res) => {

    const result = popularity_rate_average(alvaro_data, "Luxembourg"); 
    res.send(`<html> <body> <h1> Popularity rate in the country is:  ${result}</h1> </body> </html>`)
    
});


//Isabel Algorithm
function averageRecoveredExpensesByCountry(dataEntry, country){
    let list = dataEntry.filter((data) => data.ms_name.match(country)).map((line) => line.recovery_of_expense)
    
    if (list.length === 0) {
        console.log(`There is no data for the country you have chosen`);
        return null;
    }

    
    let sum = 0;
    list.forEach((value) => sum += value);
    return sum / list.length

}

//Isabel Sample Request
app.get("/samples/ITR", (req, res) => {

    const result = averageRecoveredExpensesByCountry(isabel_data, "Romania"); 
    res.send(`<html> <body> <h1> The average recovered expenses for the chosen country is:  ${result}</h1> </body> </html>`)
    
});


