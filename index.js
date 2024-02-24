let cool = require("cool-ascii-faces");
let express = require("express");
const { data, averageByCountry } = require('./samples/SPJ');
const { amd_data, popularity_rate_average} = require('./samples/AMD');

/*
const alvaro_data = require('./index-AMD');
const isabel_data = require('./index-ITR'); */

let app = express();
const PORT = (process.env.PORT || 10000); 

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

// .../samples/SPJ Requests
app.get("/samples/SPJ", (req, res) => {
    const average = averageByCountry(data, "Spain");
    res.send(`<html> <body> <h1> The average cumulative annual prefinancing for Spain is: ${average} </h1> </body> </html>`);
});


// .../samples/AMD Request
app.get("/samples/AMD", (req, res) => {

    const result = popularity_rate_average(amd_data, "Luxembourg"); 
    res.send(`<html> <body> <h1> Popularity rate in the country is:  ${result}</h1> </body> </html>`)
    
});

// .../samples/ITR Request
app.get("/samples/ITR", (req, res) => {

    const result = averageRecoveredExpensesByCountry(isabel_data, "Poland"); 
    res.send(`<html> <body> <h1> The average recovered expenses for the chosen country is:  ${result}</h1> </body> </html>`)
    
});
