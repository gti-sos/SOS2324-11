let data = require('../index-ITR');
const API_BASE = "/api/v1";

module.exports = (app, db) => {

    //DOCUMENTACIÓN EN POSTMAN
    app.get(API_BASE + "/structural-payment-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-payment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/32944023/2sA2xh1XiK")
    
    });

    //GET - PAGINACIÓN Y BÚSQUEDAD POR CAMPOS
    app.get(API_BASE + "/structural-payment-data", (req, res) => {
        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 10;
        const offset = parseInt(queryParameters.offset) || 0;
        const hasSearchParameters = Object.keys(queryParameters).some(key => key !== 'limit' && key !== 'offset');
        let query = {};
    
        // Si no se proporcionaron parámetros de búsqueda, verificamos si hay datos en la base de datos
        if (!hasSearchParameters) {
            db.count({}, (err, count) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (count === 0) {
                        // Si no hay datos, devolvemos una lista vacía
                        res.status(200).json([]);
                    } else {
                        // Si hay datos, realizamos la consulta para obtener todos los datos
                        db.find({}).skip(offset).limit(limit).exec((err, data) => {
                            if (err) {
                                res.sendStatus(500, "Internal Error");
                            } else {
                                const resultsWithoutId = data.map(d => {
                                    const { _id, ...datWithoutId } = d;
                                    return datWithoutId;
                                });
                                res.status(200).json(resultsWithoutId);
                            }
                        });
                    }
                }
            });
        } else {
            // Construimos la consulta basada en los parámetros proporcionados
            Object.keys(queryParameters).forEach(key => {
                if (key !== 'limit' && key !== 'offset') {
                    const value = !isNaN(queryParameters[key]) ? parseFloat(queryParameters[key]) : queryParameters[key];
                    if (typeof value === 'string') {
                        query[key] = new RegExp(value, 'i');
                    } else {
                        query[key] = value;
                    }
                }
            });
    
            // Ejecutamos la consulta en la base de datos con paginación
            db.find(query).skip(offset).limit(limit).exec((err, data) => {
                if (err) {
                    res.sendStatus(500, "Internal Error");
                } else {
                    if (data.length === 0) {
                        res.status(404).send("Not Found");
                    } else {
                        const resultsWithoutId = data.map(d => {
                            const { _id, ...datWithoutId } = d;
                            return datWithoutId;
                        });
                        res.status(200).json(resultsWithoutId);
                    }
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

    //PUT - ACTUALIZAR DATO DE UN PAIS
    app.put(API_BASE+"/structural-payment-data/:ms_name/:fund", (req,res) => {
        let country = req.params.ms_name;
        let fund = req.params.fund;
        let data = req.body;
        if (!data || Object.keys(data).length === 0 || data.ms_name !== country || data.fund !== fund) {
            res.sendStatus(400, "Bad request");
        } else {
            db.update({ "ms_name": country, "fund": fund }, {data}, (err) => {
                if (err) {
                    res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
                }
                res.sendStatus(200, "Ok"); //Actualizacion correcta
            });
        }
    });

    //DELETE - BORRA DATOS DE UN PAIS
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
