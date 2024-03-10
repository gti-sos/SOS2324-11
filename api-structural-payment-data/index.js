let data = require('../index-ITR');
const API_BASE = "/api/v1";

module.exports = (app, db) => {

    //DOCUMENTACIÓN EN POSTMAN
    app.get(API_BASE + "/structural-payment-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-payment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/32944023/2sA2xh1XiK")
    
    });

    //GET - PAGINACIÓN, BÚSQUEDAD POR CAMPOS Y PERIODO
    app.get(API_BASE + "/structural-payment-data", (req, res) => {
        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 10;
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
                    res.status(404).send("Not Found");
                }
            });
        }
    });

    //INTRODUCIR DATOS
    app.get(API_BASE + "/structural-payment-data/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                if (count === 0) {
                    db.insert(data, (err, docs) => {
                        if (err) {
                            res.sendStatus(500, "Internal Error"); 
                        } else {
                            res.sendStatus(200, "Ok"); 
                        }
                    });
                } else {
                    res.sendStatus(400, "Bad Request"); 
                }
            }
        });
    });

   //GET - ACCEDER A UN DATO CONCRETO
   app.get(API_BASE + "/structural-payment-data/:ms_name/:fund", (req, res) => {
    let pais = req.params.ms_name;
    let fund = req.params.fund;

    db.find({ ms_name: pais, fund:fund }, (err, countryData) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (countryData.length > 0) {
            const formattedData = countryData.map((c) => {
                const { _id, ...formatted } = c;
                return formatted;
            });
            res.status(200).json(formattedData); // Devolver los datos encontrados
        } else {
            console.error("Datos no existentes");
            res.status(404).send("Not Found");
        }
    });
});

    //GET - DATOS DE UN PAIS EN UN PERIODO DE TIEMPO
    app.get(API_BASE + "/structural-payment-data/:ms_name", (req, res) => {

        let pais = req.params.ms_name;
        let fromDate = req.query.from;
        let toDate = req.query.to;
    
        let query = { ms_name: pais };
        if (fromDate && toDate) {
            query.year = { $gte: parseInt(fromDate), $lte: parseInt(toDate) };
        }
    
        db.find(query, (err, countryData) => {
            if (err) {
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            if (countryData.length > 0) {
                const formattedData = countryData.map((c) => {
                    const { _id, ...formatted } = c;
                    return formatted;
                });
                res.status(200).json(formattedData);
            } else {
                res.sendStatus(404, "Not Found");
            }
        });
    });


    //POST - VERIFICAR SI LOS DATOS YA EXISTEN EN LA BASE DE DATOS
    app.post(API_BASE + "/structural-payment-data", (req, res) => {
        const newData = req.body;
        const expectedFields = [
            "ms",
            "ms_name",
            "fund",
            "year",
            "planned_eu_amount",
            "n_3_decommitment_amount",
            "net_planned_eu_amount",
            "cumulative_initial_pre_financing",
            "cumulative_additional_initial_pre_financing",
            "recovery_of_initial_pre_financing",
            "net_initial_pre_financing",
            "cumulative_annual_pre_financing",
            "annual_pre_financing_covered_by_expenditure",
            "recovery_of_annual_pre_financing",
            "net_annual_pre_financing",
            "cumulative_interim_payment",
            "recovery_of_expense",
            "net_interim_payment",
            "total_net_payment",
            "eu_payment_rate",
            "eu_payment_rate_on_planned_eu_amount"
        ];
        const receivedFields = Object.keys(newData);
        const isValidData = expectedFields.every(field => receivedFields.includes(field));
    
        if (!isValidData) {
            res.sendStatus(400, "Bad Request");
        } else {
          db.findOne({ ms_name: newData.ms_name }, (err, existingData) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
              if (existingData) {
                res.sendStatus(409, "Conflict");
              } else {
                db.insert(newData, (err, insertedData) => {
                  if (err) {
                    res.sendStatus(500, "Internal Error");
                  } else {
                    res.sendStatus(201, "Created");
                  }
                });
              }
            }
          });
        }
      });
      
    //PUT - NO PERMITIDO
    app.put(API_BASE + "/structural-payment-data", (req, res) => {
        let data = req.body;
        res.sendStatus(405, "Method not allowed");
    });

    //DELETE - BORRA TODOS LOS DATOS
    app.delete(API_BASE + "/structural-payment-data", (req, res) => {
        db.remove({}, {multi:true}, (err, numRemoved)=>{
            if(err){
                res.sendStatus(500, "Internal Error");
                return;
            }else{
                if(numRemoved>=1){
                    res.sendStatus(200, "Ok");
                }else{
                    res.sendStatus(404, "Not found");
                }
            }
        });
    });

    //POST - NO PERMITIDO
    app.post(API_BASE + "/structural-payment-data/:country", (req, res) => {
        const pais = req.params.ms_name;
        let data = req.body;
        res.sendStatus(405, "Method Not Allowed");
    });

    //PUT - ACTUALIZAR UN DATO CONCRETO
    // PUT --- OK statistics
    app.put(API_BASE + "/structural-payment-data/:ms_name/:fund", (req, res) => { 
        const fund = req.params.fund; // El atributo cci es un atributo único por dato.
        const ms_name = req.params.ms_name; // Obtener ms_name de los parámetros de la ruta
        let data = req.body;
    
        if (!data || Object.keys(data).length === 0 || data.fund !== fund || data.ms_name !== ms_name) {
            console.error("Invalid data");
            res.status(400).send("Bad Request"); 
            return;
        }
    
        db.update({ ms_name: ms_name, fund: fund }, data, {}, (err) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).send("Internal Server Error"); 
            } else {
                console.log("Correct update");
                res.status(200).send("Ok"); 
            }
        });
    });

    //DELETE - ELIMINAR UN DATO CONCRETO
    app.delete(API_BASE + "/structural-payment-data/:ms_name/:fund", (req, res) => {
        let country = req.params.ms_name;
        let fund = req.params.fund;
        db.remove({"ms_name": country, "fund": fund}, {}, (err, numRemoved)=>{
            if(err){
                res.sendStatus(500, "Internal Error");
            }else{
                if(numRemoved>=1){
                    res.sendStatus("200", "OK");
                }else{
                    res.sendStatus("404", "Not found");
                }
            }
        });
    });

    

}
