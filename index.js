let cool = require("cool-ascii-faces");
let express = require("express");
const data = require('./index-SPJ'); 


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
    res.send(`The average cumulative annual prefinancing for the country is: ${result}`);
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
