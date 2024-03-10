let data_SPJ = require('../index-SPJ');
const API_BASE = "/api/v1";


module.exports = (app, db) => {


   // Insert data
    app.get(API_BASE + "/structural-investment-data/loadInitialData", (req, res) => {
       
        db.count({}, (err, count) => { // Check if the collection is empty
            if (err) {
                res.sendStatus(500, "Internal Error"); 
            } else {
                if (count === 0) { // Insert initial data only if the collection is empty
                    db.insert(data_SPJ, (err, docs) => {
                        if (err) {
                            console.error("Error when inserting data:", err);
                            res.sendStatus(500, "Internal Error"); 
                        } else {
                            console.log("Data inserted correctly");
                            res.sendStatus(200, "Ok"); 
                        }
                    });
                } else {
                    console.log("The database already has data");
                    res.sendStatus(400, "Bad Request"); 
                }
            }
        });
    });

    

    
    //POST --- OK 
    app.post(API_BASE + "/structural-investment-data", (req, res) => {
        const newData = req.body;
        const expectedFields = ["ms", "ms_name", "cci", "title", "fund", "category_of_region", "year", "net_planned_eu_amount", "cumulative_initial_pre_financing", "cumulative_additional_initial_pre_financing", "recovery_of_initial_pre_financing", "cumulative_annual_pre_financing", "pre_financing_covered_by_expenditure", "recovery_of_annual_pre_financing", "net_pre_financing", "cumulative_interim_payments", "recovery_of_expenses", "net_interim_payments", "total_net_payments", "eu_payment_rate"];
        const receivedFields = Object.keys(newData);
        const isValidData = expectedFields.every(field => receivedFields.includes(field));
    
        if (!isValidData) {
            console.error("Invalid data");
            res.status(400).send("Bad Request");
        } else {
            // Check if a document with the same cci already exists in the database
            db.findOne({ cci: newData.cci }, (err, existingData) => {
                if (err) {
                    res.status(500).send("Internal Error");
                } else {
                    if (existingData) {
                        console.error("Existing data");
                        res.status(409).send("Conflict");
                    } else {
                        // If it does not exist, insert the new document
                        db.insert(newData, (err, insertedData) => {
                            if (err) {
                                console.error("Error when inserting data:", err);
                                res.status(500).send("Internal Error");
                            } else {
                                console.log("The new data has been successfully created");
                                res.status(201).send("Created");
                            }
                        });
                    }
                }
            });
        }
    });

    // POST --- NOK
    app.post(API_BASE + "/structural-investment-data/:cci", (req, res) => {  //The cci attribute is a single attribute per data.
        console.error("This method cannot be performed:");
        res.sendStatus(405, "Method Not Allowed"); 
    });





    //GET --- OK
    // Data search by specific parameters or without them and paging and front/to
    app.get(API_BASE + "/structural-investment-data", (req, res) => {
        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 10;
        const offset = parseInt(queryParameters.offset) || 0;
        let from = req.query.from;
        let to = req.query.to;
    
        // Check for 'from' and 'to' parameters
        if (from !== undefined && to !== undefined) {
            const fromYear = parseInt(from);
            const toYear = parseInt(to);
            console.log(fromYear, toYear);
            if (isNaN(fromYear) || isNaN(toYear)) {
                return res.status(400).send("Invalid year format. Please provide valid year values.");
            }
            // If the years are valid, build the query to filter by the year range
            queryParameters.year = { $gte: fromYear, $lte: toYear };
        }
    
        let query = {};
        // Build the query based on the provided parameters
        Object.keys(queryParameters).forEach(key => {
            if (key !== 'limit' && key !== 'offset' && key !== 'from' && key !== 'to') {
                const value = !isNaN(queryParameters[key]) ? parseFloat(queryParameters[key]) : queryParameters[key];
                if (typeof value === 'string') {
                    query[key] = new RegExp(value, 'i');
                } else {
                    query[key] = value;
                }
            }
        });
    
        // Check if search parameters were provided
        const hasSearchParameters = Object.keys(queryParameters).some(key => key !== 'limit' && key !== 'offset' && key !== 'from' && key !== 'to');
    
        if (!hasSearchParameters) {
            db.count({}, (err, count) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (count === 0) {
                        console.error("If there is no data, we return an empty list.");
                        res.status(200).json([]);
                    } else {
                        db.find({}).skip(offset).limit(limit).exec((err, data) => {
                            if (err) {
                                console.error("Error when inserting data:", err);
                                res.sendStatus(500);
                            } else {
                                const resultsWithoutId = data.map(d => {
                                    const { _id, ...datWithoutId } = d;
                                    return datWithoutId;
                                });
                                console.log("Sending the data");
                                res.status(200).json(resultsWithoutId);
                            }
                        });
                    }
                }
            });
        } else {
            db.find(query).skip(offset).limit(limit).exec((err, data) => {
                if (err) {
                    console.error("Database error:", err);
                    res.sendStatus(500);
                }
                if (data.length > 0) {
                    const formattedData = data.map((d) => {
                        const { _id, ...formatted } = d;
                        return formatted;
                    });
                    res.status(200).json(formattedData);
                } else {
                    console.error("Non existing data");
                    res.sendStatus(404, "Not Found");
                }
            });
        }
    });
    

    //GET - OK front and to with country
    app.get(API_BASE + "/structural-investment-data/:ms_name", (req, res) => {

        let pais = req.params.ms_name;
        let fromDate = req.query.from;
        let toDate = req.query.to;

       // Create a query object to filter by date range if present
        let query = { ms_name: pais };
        if (fromDate && toDate) {
            query.year = { $gte: parseInt(fromDate), $lte: parseInt(toDate) };
        }

        db.find(query, (err, countryData) => {
            if (err) {
                console.error("Database error:", err);
                res.sendStatus(500);
            }
            if (countryData.length > 0) {
                const formattedData = countryData.map((c) => {
                    const { _id, ...formatted } = c;
                    return formatted;
                });
                res.status(200).json(formattedData); 
            } else {
                console.error("Non existing data");
                res.sendStatus(404, "Not Found");
            }
        });
    });


    // GET --- OK  Specific statistics
    app.get(API_BASE + "/structural-investment-data/:ms/:year", (req, res) => {
        const ms = req.params.ms;
        const year = parseInt(req.params.year); 
    
        db.findOne({ ms: ms, year: year }, (err, countryData) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
    
            if (countryData) {
                
                const { _id, ...data } = countryData;
                res.status(200).send(data); 
            } else {
                console.error("No data found for ms:", ms, "and year:", year);
                res.sendStatus(404, "Not found");
            }
        });
    });




    //PUT --- NOK
    app.put(API_BASE + "/structural-investment-data", (req, res) => {
        console.error("This method cannot be performed:");
        res.sendStatus(405, "Method Not Allowed"); 
    });

    
    // PUT --- OK
    app.put(API_BASE + "/structural-investment-data/:cci", (req, res) => { 

        const cci = req.params.cci; //The cci attribute is a single attribute per data.
        let data = req.body;

        if (!data || Object.keys(data).length === 0 || data.cci !== cci) {
            console.error("Invalid data");
            res.sendStatus(400, "Bad Request"); 
        } else {
            db.update({ cci: cci }, data, { }, (err) => {
                if (err) {
                    res.sendStatus(500, "Internal Server Error"); 
                }
                console.log("Correct update");
                res.sendStatus(200, "Ok"); 
            });
        }
    });

    // PUT --- OK statistics
    app.put(API_BASE + "/structural-investment-data/:cci/:ms_name", (req, res) => { 

        const cci = req.params.cci; 
        const ms_name = req.params.ms_name; 
        let data = req.body;
    
        if (!data || Object.keys(data).length === 0 || data.cci !== cci || data.ms_name !== ms_name) {
            console.error("Invalid data");
            res.status(400).send("Bad Request"); 
        }
    
        db.update({ cci: cci, ms_name: ms_name }, data, {}, (err) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).send("Internal Server Error"); 
            } else {
                console.log("Correct update");
                res.status(200).send("Ok"); 
            }
        });
    });
    

    

    //DELETE --- OK
    app.delete(API_BASE + "/structural-investment-data", (req, res) => {

        db.remove({}, { multi: true }, (err, numRemoved) => { 
            if (err) {
                res.sendStatus(500, "Internal Error"); 
            } else {
                if (numRemoved >= 1) {
                    console.log("All data has been successfully deleted");
                    res.sendStatus(200, "Ok"); 
                } else {
                    console.log("No data found for deletion");
                    res.sendStatus(404, "Not found"); 
                }
            }
        });
    });
    
    
    // DELETE --- OK
    app.delete(API_BASE + "/structural-investment-data/:cci", (req, res) => {
        const cci = req.params.cci; //The cci attribute is a single attribute per data.

        db.remove({ cci: cci }, {multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500, "Internal Server Error"); 
            }

            if (numRemoved > 0) {
                console.log("Correct deletion");
                res.sendStatus(200, "Ok");
            } else {
                console.error("Non existing data");
                res.sendStatus(404, "Not Found"); 
            }
        });
    });



    //Redirect to the documentation portal generated in POSTMAN
    app.get(API_BASE + "/structural-investment-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-investment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/33019318/2sA2xh3svw")
    
    });


  
}

