const API_BASE="/api/v2";
const data_AMD = [
    {
        "date":2022-9-25,
        "year":2022,
        "month":9,
        "day":25,
        "tone_doc_count":1.0,
        "popularity_rate":0.1249999999999999,
        "tone_avg":-1.2621819776522465,
        "tone_w_avg":-0.4739113015225997,
        "tone_cum":-0.0163342258012192,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",

    },
    {
        "date":2022-9-26,
        "year":2022,
        "month":9,
        "day":26,
        "tone_doc_count":0.0,
        "popularity_rate":0.0,
        "tone_avg":null,
        "tone_w_avg":null,
        "tone_cum":null,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2022-9-27,
        "year":2022,
        "month":9,
        "day":27,
        "tone_doc_count":6.0,
        "popularity_rate":0.1363636363636363,
        "tone_avg":-0.2239823044233394,
        "tone_w_avg":-0.0578924141122189,
        "tone_cum":-0.2239335517183661,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2022-9-28,
        "year":2022,
        "month":9,
        "day":28,
        "tone_doc_count":3.0,
        "popularity_rate":0.1428571428571428,
        "tone_avg":1.1282691135639402,
        "tone_w_avg":0.57636924474005,
        "tone_cum":0.767818931106427,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2022-9-29,
        "year":2022,
        "month":9,
        "day":29,
        "tone_doc_count":7.0,
        "popularity_rate":0.21875,
        "tone_avg":0.7663061405820866,
        "tone_w_avg":0.5453324583233635,
        "tone_cum":0.9806448635392798,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2022-9-30,
        "year":2022,
        "month":9,
        "day":30,
        "tone_doc_count":5.0,
        "popularity_rate":0.064102564102564,
        "tone_avg":2.843735880024951,
        "tone_w_avg":0.7011983336427368,
        "tone_cum":2.69846661756732,
        "amd1code":"EN",
        "country":"Estonia",
        "area":"EE",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-1,
        "year":2016,
        "month":1,
        "day":1,
        "tone_doc_count":1.0,
        "popularity_rate":0.1666666666666666,
        "tone_avg":0.6430714406706091,
        "tone_w_avg":0.5398071634637324,
        "tone_cum":0.6427630724168044,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-2,
        "year":2016,
        "month":1,
        "day":2,
        "tone_doc_count":1.0,
        "popularity_rate":0.2222222222222222,
        "tone_avg":-1.9795312580478424,
        "tone_w_avg":-1.5532919307113402,
        "tone_cum":0.4050479846737319,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-3,
        "year":2016,
        "month":1,
        "day":3,
        "tone_doc_count":4.0,
        "popularity_rate":0.2222222222222222,
        "tone_avg":1.2797845856517012,
        "tone_w_avg":1.075785142481654,
        "tone_cum":0.9037941568507296,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-4,
        "year":2016,
        "month":1,
        "day":4,
        "tone_doc_count":7.0,
        "popularity_rate":0.2692307692307692,
        "tone_avg":-0.6958476825206091,
        "tone_w_avg":-0.7273542051605381,
        "tone_cum":-0.1463987228495722,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-5,
        "year":2016,
        "month":1,
        "day":5,
        "tone_doc_count":6.0,
        "popularity_rate":0.1111111111111111,
        "tone_avg":0.7840440555030023,
        "tone_w_avg":0.5742807625174653,
        "tone_cum":0.7697338135393323,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-6,
        "year":2016,
        "month":1,
        "day":6,
        "tone_doc_count":9.0,
        "popularity_rate":0.276923076923077,
        "tone_avg":0.304122300578898,
        "tone_w_avg":0.2435204261527754,
        "tone_cum":0.4467446376892967,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-7,
        "year":2016,
        "month":1,
        "day":7,
        "tone_doc_count":6.0,
        "popularity_rate":0.15,
        "tone_avg":0.1043290767275444,
        "tone_w_avg":0.2397586620885684,
        "tone_cum":0.4000739198035909,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-8,
        "year":2016,
        "month":1,
        "day":8,
        "tone_doc_count":8.0,
        "popularity_rate":0.2666666666666667,
        "tone_avg":0.2217287342642766,
        "tone_w_avg":0.1722531921082014,
        "tone_cum":0.4076607890756853,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-9,
        "year":2016,
        "month":1,
        "day":9,
        "tone_doc_count":5.0,
        "popularity_rate":0.5555555555555557,
        "tone_avg":-0.0093280093236651,
        "tone_w_avg":-0.6191311419918613,
        "tone_cum":0.3873354240805228,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    },
    {
        "date":2016-1-10,
        "year":2016,
        "month":1,
        "day":10,
        "tone_doc_count":7.0,
        "popularity_rate":0.4242424242424243,
        "tone_avg":-2.094731500463048,
        "tone_w_avg":-3.572465805765719,
        "tone_cum":-1.0339714107787523,
        "amd1code":"LU",
        "country":"Luxembourg",
        "area":"LU",
        "ref_time":"day",
        "topic":"unemployment",
    }
]


function loadBackend_álvaro (app, db) {

    db.insert(data_AMD);

    app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-payment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/33058352/2sA2xh3CpF")
    
    });

    app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {
        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 20;
        const offset = parseInt(queryParameters.offset) || 0;
        let from = req.query.from;
        let to = req.query.to;
    
        // Verifica si hay parámetros 'from' y 'to'
        if (from !== undefined && to !== undefined) {
            const fromYear = parseInt(from);
            const toYear = parseInt(to);
            console.log(fromYear, toYear);
            if (isNaN(fromYear) || isNaN(toYear)) {
                return res.status(400).send("Invalid year format. Please provide valid year values.");
            }
            // Si los años son válidos, construye la consulta para filtrar por el rango de años
            queryParameters.year = { $gte: fromYear, $lte: toYear };
        }
    
        let query = {};
        // Construir la consulta basada en los parámetros proporcionados
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
    
        // Verificar si se proporcionaron parámetros de búsqueda
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
                    res.status(500).send("Internal Server Error");
                    return;
                }
                if (data.length > 0) {
                    const formattedData = data.map((d) => {
                        const { _id, ...formatted } = d;
                        return formatted;
                    });
                    res.status(200).json(formattedData);
                } else {
                    console.error("Datos no existentes");
                    res.status(200).json([]);
                }
            });
        }
    });

    app.get(API_BASE+"/socioeconomics-traker-using-unconventional-data/loadInitialData",(req, res) =>{
        db.find({},(err,data) => {

            if(err){
                res.sendStatus(500, "Internal Error")
            }else{
                if(data.length==0){
                    db.insert(data_AMD)
                    res.sendStatus(200, "Ok")
                }else{
                    res.sendStatus(200, "Data is already inserted")
                }
            }
        })

    });

    
    
    
    //GET - ACCESS SPECIFIC DATA
   app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data/:country/:year/:day", (req, res) => {
    const country = req.params.country;
    const year = parseInt(req.params.year);
    const day = parseInt(req.params.day);

    db.find({ country: country, year: year, day: day }, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            res.sendStatus(500, "Internal Error");
            return;
        }
        if (data.length > 0) {
            const singleData = data[0];
            const { _id, ...formatted } = singleData;
            res.status(200).json(formatted);
        } else {
            console.error("Datos no existentes");
            res.sendStatus(404, "Not found");
        }
    });
});


    
    //POST - NO PERMITIDO
    app.post(API_BASE + "/socioeconomics-traker-using-unconventional-data/:country/:year/:day", (req, res) => {
        const id = req.params.id;
        let data = req.body;
        res.sendStatus(405, "Method Not Allowed");
    });

    app.post(API_BASE+'/socioeconomics-traker-using-unconventional-data', (req, res) => {
        let newData = req.body; 
    
       
        const expectedFields = ["date", "year", "month", "day", "tone_doc_count", "popularity_rate", "tone_avg", "tone_w_avg", "tone_cum", "amd1code", "country", "area", "ref_time", "topic"];
        const newDataFields = Object.keys(newData);
        const isValidData = expectedFields.every(field => newDataFields.includes(field));
    
        if (!isValidData) {
            
            res.sendStatus(400); 
            return;
        }

        
        db.findOne({ 

            date: newData.date,
            year: newData.year,
            month: newData.month,
            day: newData.day,
            tone_doc_count: newData.tone_doc_count,
            popularity_rate: newData.popularity_rate,
            tone_avg: newData.tone_avg,
            tone_w_avg: newData.tone_w_avg,
            tone_cum: newData.tone_cum,
            amd1code: newData.amd1code,
            country: newData.country,
            area: newData.area,
            ref_time: newData.ref_time,
            topic: newData.topic

        }, (err, existingData) => {
            if (err) {
               
                res.sendStatus(500); 
            } else {
                if (existingData) {
                   
                    res.sendStatus(409); 
                } else {
                    
                    db.insert(newData, (err, insertedData) => {
                        if (err) {
                            
                            res.sendStatus(500); 
                        } else {
                          
                            res.sendStatus(201); 
                        }
                    });
                }
            }
        });
    });

    //PUT - NO PERMITIDO
    app.put(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {
        let data = req.body;
        res.sendStatus(405, "Method not allowed");
    });

    app.put(API_BASE+'/socioeconomics-traker-using-unconventional-data/:country/:year/:day', (req, res) => {
        const country = req.params.country;
        const year = parseInt(req.params.year);
        const day = parseInt(req.params.day);
        let updatedData = req.body; 
    
        // Validamos que los campos necesarios estén presentes en los datos actualizados
        const expectedFields = ["date", "year", "month", "day", "tone_doc_count", "popularity_rate", "tone_avg", "tone_w_avg", "tone_cum", "amd1code", "country", "area", "ref_time", "topic"];
        const updatedDataFields = Object.keys(updatedData);
        const isValidData = expectedFields.every(field => updatedDataFields.includes(field));
    
        if (!isValidData) {
            res.sendStatus(400); 
            return;
        }
    
        // Verificamos que los datos actualizados coincidan con los parámetros de la URL
        if (updatedData.country !== country || updatedData.year !== year || updatedData.day !== day) {
            res.sendStatus(400); 
            return;
        }
    
        // Realizamos la actualización en la base de datos
        db.update({ country: country, year: year, day: day }, { $set: updatedData }, { multi: true }, (err, numReplaced) => {
            if (err) {
                res.sendStatus(500); 
            } else {
                if (numReplaced === 0) {
                    res.sendStatus(404); 
                } else {
                    res.sendStatus(200); 
                }
            }
        });
    });
    

    
    app.delete(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {

        db.remove({}, { multi: true }, (err, numRemoved) => { 
            if (err) {
                res.sendStatus(500, "Internal Error "); 
                return;
            } else {
                if (numRemoved >= 1) {
                    res.sendStatus(200, "Ok"); 
                } else {
                    res.sendStatus(404, "Not found"); 
                }
            }
        });
    });
    

    
    app.delete(API_BASE+'/socioeconomics-traker-using-unconventional-data/:country/:year/:day', (req, res) => {
        const { country, year, day } = req.params;
        
        db.remove({ country: country, year: parseInt(year), day: parseInt(day) }, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500); 
            } else {
                if (numRemoved === 0) {
                    res.sendStatus(404); 
                } else {
                    res.sendStatus(200); 
                }
            }
        });
    });
    
    
}

export { loadBackend_álvaro }