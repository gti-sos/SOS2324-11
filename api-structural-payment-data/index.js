let data = require('../index-ITR');
const API_BASE = "/api/v1";

module.exports = (app, db) => {

app.get(API_BASE + "/structural-payment-data", (req, res) => {
    const queryParameters = req.query;
    const limit = parseInt(queryParameters.limit) || 10; 
    const offset = parseInt(queryParameters.offset) || 0; 
  
    let query = {};
  
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
  
    db.find(query).skip(offset).limit(limit).exec((err, data) => {
        if (err) {
            res.sendStatus(500, "Internal Error");
          } else {
              if (data.length === 0) {
                res.sendStatus(404);
              } else {
                const resultsWithoutId = data.map(d => {
                const { _id, ...datWithoutId } = d;
                return datWithoutId;
                });
                res.status(200).json(resultsWithoutId);
              }
          }
    });
  });

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
    

//Implementación de los métodos de la tabla azul

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
      
/*
    //GET - LISTA TODOS LOS DATOS
    app.get(API_BASE+"/structural-payment-data", (req, res)=>{
        db.find({}, (err, data)=>{
            if(err){
                res.sendStatus(500, "Internal Error");
            } else{
                res.send(JSON.stringify(data.map((c)=>{
                    delete c._id;
                    return c;
                })));
            }
        });
    });
*/
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
/*
    //GET - DATOS DE UN PAIS
    app.get(API_BASE + "/structural-payment-data/:ms_name", (req, res) => {
        let pais = req.params.ms_name;

        db.find({ ms_name: pais }, (err, countryData) => {
            if (err) {
                res.sendStatus(500, "Internal Server Error");
            }
            if (countryData.length > 0) {
                res.send(JSON.stringify(countryData.map((c)=>{
                    delete c._id;
                    return c;
                }))); // Devolver los datos encontrados
            } else {
                res.sendStatus(404, "Not Found"); //Datos no existentes
            }
        });
    });*/

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
