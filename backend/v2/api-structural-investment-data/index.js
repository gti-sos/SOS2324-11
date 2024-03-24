const API_BASE = "/api/v2";

const data_SPJ = [ 

    {
        "ms": "IT",
        "ms_name": "Italy",
        "cci": "2014IT16RFOP017",
        "title": "Toscana - ERDF",
        "fund": "ERDF",
        "category_of_region": "More developed",
        "year": 2023,
        "net_planned_eu_amount": 389513945,
        "cumulative_initial_pre_financing": 11173608.57,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 72720941.21,
        "pre_financing_covered_by_expenditure": 26381261.74,
        "recovery_of_annual_pre_financing": 34963288.36,
        "net_pre_financing": 22549999.68,
        "cumulative_interim_payments": 340582683.58,
        "recovery_of_expenses": 0,
        "net_interim_payments": 366963945.32,
        "total_net_payments": 389513945,
        "eu_payment_rate": 100,
        "eu_payment_rate_on_planned_eu_amount": 100
    },
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES16RFOP005",
        "title": "Asturias - ERDF",
        "fund": "ERDF",
        "category_of_region": "More developed",
        "year": 2023,
        "net_planned_eu_amount": 256779031,
        "cumulative_initial_pre_financing": 8341606.04,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 47815463.33,
        "pre_financing_covered_by_expenditure": 11534327.06,
        "recovery_of_annual_pre_financing": 26301724.45,
        "net_pre_financing": 18321017.86,
        "cumulative_interim_payments": 227111465.82,
        "recovery_of_expenses": 187779.74,
        "net_interim_payments": 238458013.14,
        "total_net_payments": 256779031,
        "eu_payment_rate": 100,
        "eu_payment_rate_on_planned_eu_amount": 100
    },
    {
        "ms": "PT",
        "ms_name": "Portugal",
        "cci": "2014PT16M2OP004",
        "title": "Azores - ERDF/ESF",
        "fund": "ESF",
        "category_of_region": "Less developed",
        "year": 2023,
        "net_planned_eu_amount": 343756016,
        "cumulative_initial_pre_financing": 10354452.85,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 59832136.07,
        "pre_financing_covered_by_expenditure": 22765761.45,
        "recovery_of_annual_pre_financing": 25951963.66,
        "net_pre_financing": 21468863.81,
        "cumulative_interim_payments": 289402344.33,
        "recovery_of_expenses": 1644419.15,
        "net_interim_payments": 310523686.63,
        "total_net_payments": 331992550.44,
        "eu_payment_rate": 965779608174188,
        "eu_payment_rate_on_planned_eu_amount": 965779608174188
    },
    {
        "ms": "MT",
        "ms_name": "Malta",
        "cci": "2014MT16M1OP001",
        "title": "Fostering a competitive and sustainable economy - MT - ERDF/CF",
        "fund": "ERDF",
        "category_of_region": "REACT-EU",
        "year": 2023,
        "net_planned_eu_amount": 11162285,
        "cumulative_initial_pre_financing": 0,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 446491.4,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 433912.6,
        "net_pre_financing": 433912.6,
        "cumulative_interim_payments": 3510747.4,
        "recovery_of_expenses": 0,
        "net_interim_payments": 3510747.4,
        "total_net_payments": 5678496.34,
        "eu_payment_rate": 508721676610121,
        "eu_payment_rate_on_planned_eu_amount": 508721676610121
    },
    {
        "ms": "PT",
        "ms_name": "Portugal",
        "cci": "2014PT16M2OP004",
        "title": "Azores - ERDF/ESF",
        "fund": "ERDF",
        "category_of_region": "Outermost or Northern Sparsely Populated",
        "year": 2022,
        "net_planned_eu_amount": 57500000,
        "cumulative_initial_pre_financing": 1891750,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 7161625,
        "pre_financing_covered_by_expenditure": 4932062.5,
        "recovery_of_annual_pre_financing": 2567375,
        "net_pre_financing": 1553937.5,
        "cumulative_interim_payments": 51014000,
        "recovery_of_expenses": 671081.82,
        "net_interim_payments": 55274980.68,
        "total_net_payments": 56828918.18,
        "eu_payment_rate": 988329011826087,
        "eu_payment_rate_on_planned_eu_amount": 988329011826087
    },
    {
        "ms": "DE",
        "ms_name": "Germany",
        "cci": "2014DE05SFOP002",
        "title": "Federal Germany - ESF",
        "fund": "ESF",
        "category_of_region": "Transition",
        "year": 2023,
        "net_planned_eu_amount": 746745746,
        "cumulative_initial_pre_financing": 21058230.09,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 136066013.72,
        "pre_financing_covered_by_expenditure": 60676543.34,
        "recovery_of_annual_pre_financing": 51961412.24,
        "net_pre_financing": 44486288.23,
        "cumulative_interim_payments": 641582914.43,
        "recovery_of_expenses": 0,
        "net_interim_payments": 702259457.77,
        "total_net_payments": 746745746,
        "eu_payment_rate": 100,
        "eu_payment_rate_on_planned_eu_amount": 100
    },
    {
        "ms": "MT",
        "ms_name": "Malta",
        "cci": "2014MT05FMOP001",
        "title": "FEAD - Malta",
        "fund": "FEAD",
        "category_of_region": null,
        "year": 2023,
        "net_planned_eu_amount": 3944660,
        "cumulative_initial_pre_financing": 433912.6,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 0,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 0,
        "net_pre_financing": 433912.6,
        "cumulative_interim_payments": 3510747.4,
        "recovery_of_expenses": 0,
        "net_interim_payments": 3510747.4,
        "total_net_payments": 3944660,
        "eu_payment_rate": 100,
        "eu_payment_rate_on_planned_eu_amount": 100
    },
    {
        "ms": "IT",
        "ms_name": "Italy",
        "cci": "2014IT16RFOP013",
        "title": "Marche - ERDF",
        "fund": "ERDF",
        "category_of_region": "More developed",
        "year": 2023,
        "net_planned_eu_amount": 292691644,
        "cumulative_initial_pre_financing": 4757104.35,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 48625342.87,
        "pre_financing_covered_by_expenditure": 11600406.34,
        "recovery_of_annual_pre_financing": 25837159.2,
        "net_pre_financing": 15944881.68,
        "cumulative_interim_payments": 239962298.56,
        "recovery_of_expenses": 56329.33,
        "net_interim_payments": 251506375.57,
        "total_net_payments": 267451257.25,
        "eu_payment_rate": 913764580344494,
        "eu_payment_rate_on_planned_eu_amount": 913764580344494
    },
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES16RFOP018",
        "title": "Melilla - ERDF",
        "fund": "ERDF",
        "category_of_region": "Transition",
        "year": 2023,
        "net_planned_eu_amount": 52664377,
        "cumulative_initial_pre_financing": 1609293.14,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 9556192.9,
        "pre_financing_covered_by_expenditure": 3266584.78,
        "recovery_of_annual_pre_financing": 4868819.44,
        "net_pre_financing": 3030081.82,
        "cumulative_interim_payments": 43939323.89,
        "recovery_of_expenses": 0,
        "net_interim_payments": 47205908.67,
        "total_net_payments": 50235990.49,
        "eu_payment_rate": 95388939735601,
        "eu_payment_rate_on_planned_eu_amount": 953889390735601
    },
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES16RFOP019",
        "title": "Melilla - ERDF",
        "fund": "ERDF",
        "category_of_region": "REACT-EU",
        "year": 2023,
        "net_planned_eu_amount": 4071366,
        "cumulative_initial_pre_financing": 556219.95,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 162854.64,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 81427.32,
        "net_pre_financing": 637647.27,
        "cumulative_interim_payments": 1549962.02,
        "recovery_of_expenses": 0,
        "net_interim_payments": 1549962.02,
        "total_net_payments": 2187609.29,
        "eu_payment_rate": 537315802607773,
        "eu_payment_rate_on_planned_eu_amount": 537315802607773
    },
    {
        "ms": "DE",
        "ms_name": "Germany",
        "cci": "2014DE16RFOP015",
        "title": "Thüringen - ERDF",
        "fund": "ERDF",
        "category_of_region": "Transition",
        "year": 2021,
        "net_planned_eu_amount": 1165077915,
        "cumulative_initial_pre_financing": 32855197.2,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 168412012.61,
        "pre_financing_covered_by_expenditure": 24501676.92,
        "recovery_of_annual_pre_financing": 89122546.74,
        "net_pre_financing": 87642986.15,
        "cumulative_interim_payments": 550193406.66,
        "recovery_of_expenses": 0,
        "net_interim_payments": 574695083.58,
        "total_net_payments": 662338069.73,
        "eu_payment_rate": 568492511275523,
        "eu_payment_rate_on_planned_eu_amount": 568492511275523
    },
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES06RDRP007",
        "title": "Castilla-La Mancha - Rural Development",
        "fund": "EAFRD",
        "category_of_region": null,
        "year": 2016,
        "net_planned_eu_amount": 1147779504,
        "cumulative_initial_pre_financing": 40172282.64,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 0,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 0,
        "net_pre_financing": 40172282.64,
        "cumulative_interim_payments": 63042487.49,
        "recovery_of_expenses": 0,
        "net_interim_payments": 63042487.49,
        "total_net_payments": 103214770.13,
        "eu_payment_rate": 899256083335672,
        "eu_payment_rate_on_planned_eu_amount": 899256083335672
    },
    {
        "ms": "PT",
        "ms_name": "Portugal",
        "cci": "2014PT16M2OP006",
        "title": "Madeira - ERDF/ESF",
        "fund": "ERDF",
        "category_of_region": "Outermost or Northern Sparsely Populated",
        "year": 2017,
        "net_planned_eu_amount": 58181815,
        "cumulative_initial_pre_financing": 1914181.71,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 2529454.4,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 1093818.12,
        "net_pre_financing": 3349817.99,
        "cumulative_interim_payments": 14579298.68,
        "recovery_of_expenses": 0,
        "net_interim_payments": 14579298.68,
        "total_net_payments": 17929116.67,
        "eu_payment_rate": 308156709617945,
        "eu_payment_rate_on_planned_eu_amount": 308156709617945
    },
    {
        "ms": "IT",
        "ms_name": "Italy",
        "cci": "2014IT05SFOP018",
        "title": "Trento - ESF",
        "fund": "ESF",
        "category_of_region": "More developed",
        "year": 2022,
        "net_planned_eu_amount": 63218677,
        "cumulative_initial_pre_financing": 1550717.76,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 9377750.52,
        "pre_financing_covered_by_expenditure": 3593861.25,
        "recovery_of_annual_pre_financing": 4168370.97,
        "net_pre_financing": 3166236.06,
        "cumulative_interim_payments": 45147663.23,
        "recovery_of_expenses": 0,
        "net_interim_payments": 48741524.48,
        "total_net_payments": 51907760.54,
        "eu_payment_rate": 821082676880442,
        "eu_payment_rate_on_planned_eu_amount": 821082676880442
    },
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES05SFOP016",
        "title": "Extremadura - ESF",
        "fund": "ESF",
        "category_of_region": "Less developed",
        "year": 2018,
        "net_planned_eu_amount": 274376562,
        "cumulative_initial_pre_financing": 8726407.17,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 18387786.53,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 11531323.76,
        "net_pre_financing": 15582869.94,
        "cumulative_interim_payments": 67389034.31,
        "recovery_of_expenses": 0,
        "net_interim_payments": 67389034.31,
        "total_net_payments": 82971904.25,
        "eu_payment_rate": 302401574118419,
        "eu_payment_rate_on_planned_eu_amount": 302401574118419
    }
]



function loadBackend_sharay (app, db) {


    //Redirect to the documentation portal generated in POSTMAN
    app.get(API_BASE + "/structural-investment-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-investment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/33019318/2sA2xh3svw")
    
    });


    

   // Insert data
    app.get(API_BASE + "/structural-investment-data/loadInitialData", (req, res) => {
       
        db.count({}, (err, count) => { // Check if the collection is empty
            if (err) {
                console.error("Database error:", err);
                res.sendStatus(500, "Internal Error"); 
                return; //If there is an internal error for the execution
            } else {
                if (count === 0) { // Insert initial data only if the collection is empty
                    db.insert(data_SPJ, (err, docs) => {
                        if (err) {
                            console.error("Error when inserting data:", err);
                            res.sendStatus(500, "Internal Error"); 
                            return;
                        } else {
                            console.log("Data inserted correctly");
                            res.sendStatus(200, "Ok"); 
                        }
                    });
                } else {
                    console.error("The database already has data");
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
            res.sendStatus(400, "Bad Request"); 
        } else {
            // Check if a document with the same cci already exists in the database
            db.findOne({ cci: newData.cci }, (err, existingData) => {
                if (err) {
                    console.error("Database error:", err);
                    res.sendStatus(500, "Internal Error"); 
                    return;
                } else {
                    if (existingData) {
                        console.error("Existing data");
                        res.sendStatus(409, "Conflict"); 
                    } else {
                        // If it does not exist, insert the new data
                        db.insert(newData, (err, insertedData) => {
                            if (err) {
                                console.error("Error when inserting data:", err);
                                res.sendStatus(500, "Internal Error");
                            } else {
                                console.log("The new data has been successfully created");
                                res.sendStatus(201, "Created");
                            }
                        });
                    }
                }
            });
        }
    });

    // POST --- NOK
    app.post(API_BASE + "/structural-investment-data/:cci", (req, res) => {  //The cci attribute is a single attribute per data.

        console.error("This method cannot be performed");
        res.sendStatus(405, "Method Not Allowed"); 
    });




    //GET --- OK
    // Data search by specific parameters or without them and paging and front/to
    app.get(API_BASE + "/structural-investment-data", (req, res) => {

        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 20;
        const offset = parseInt(queryParameters.offset) || 0;
        let from = req.query.from;
        let to = req.query.to;
    
        // Check for 'from' and 'to' parameters
        if (from !== undefined && to !== undefined) {
            const fromYear = parseInt(from);
            const toYear = parseInt(to);
            if (isNaN(fromYear) || isNaN(toYear)) {
                console.error("Invalid year format. Please provide valid year values.")
                return  res.sendStatus(400, "Bad Request"); 
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
                    console.error("Database error:", err);
                    res.sendStatus(500, "Internal Error");
                    return ;
                } else {
                    if (count === 0) {
                        console.error("If there is no data, we return an empty list.");
                        res.status(200).json([]);
                    } else {
                        db.find({}).skip(offset).limit(limit).exec((err, data) => {
                            if (err) {
                                console.error("Error when inserting data:", err);
                                res.sendStatus(500, "Internal Error");
                                return ;
                            } else {
                                const resultsWithoutId = data.map(d => { // Delete default generated id
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
                    res.sendStatus(500, "Internal Error");
                    return;
                } else {
                    // Always return an array, even if there's only one data
                    const formattedData = data.map((d) => {
                        const { _id, ...formatted } = d;
                        return formatted;
                    });
                    console.log("Sending the data");
                    res.status(200).json(formattedData);
                }
            });
        }
    });
    
    //GET -- OK  Search by single field or by country name with range
    app.get(API_BASE + "/structural-investment-data/:identifier", (req, res) => {
        const identifier = req.params.identifier;
        let fromDate = req.query.from;
        let toDate = req.query.to;
    
        let query = {};
    
        // Try to search by cci first
        query.cci = identifier;
        db.findOne(query, (err, countryData) => {
            if (err) {
                console.error("Database error:", err);
                res.sendStatus(500, "Internal Error");
                return;
            }
    
            if (countryData) {
                const { _id, ...data } = countryData;
                res.status(200).json(data);
                return; // Detiene la ejecución aquí para evitar más consultas
            }
    
            // If not found by cci, try searching by ms_name
            query = { ms_name: identifier };
            if (fromDate && toDate) {
                query.year = { $gte: parseInt(fromDate), $lte: parseInt(toDate) };
            }
    
            db.find(query, (err, countryData) => {
                if (err) {
                    console.error("Database error:", err);
                    res.sendStatus(500, "Internal Error");
                    return;
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
                    console.error("Database error:", err);
                    res.sendStatus(500, "Internal Server Error"); 
                    return;
                }
                console.log("Correct update");
                res.sendStatus(200, "Ok"); 
            });
        }
    });
    
  
    

    //DELETE --- OK
    app.delete(API_BASE + "/structural-investment-data", (req, res) => {

        db.remove({}, { multi: true }, (err, numRemoved) => { 
            if (err) {
                console.error("Database error:", err);
                res.sendStatus(500, "Internal Error"); 
                return;
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
                console.error("Database error:", err);
                res.sendStatus(500, "Internal Server Error"); 
                return;
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


}

export { loadBackend_sharay }

