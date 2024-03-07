let data_SPJ = require('../index-SPJ');
const API_BASE = "/api/v1";


module.exports = (app, db) => {

    //El recurso debe contener una ruta /api/v1/structural-investment-data/loadInitialData que al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío.
    app.get(API_BASE + "/structural-investment-data/loadInitialData", (req, res) => {
        // Verificar si la colección está vacía
        db.count({}, (err, count) => {
            if (err) {
                res.sendStatus(500, "Internal Error"); // Error interno del servidor
            } else {
                if (count === 0) {
                    // Insertar datos iniciales solo si la colección está vacía
                    db.insert(data_SPJ, (err, docs) => {
                        if (err) {
                            res.sendStatus(500, "Internal Error"); // Error interno del servidor
                        } else {
                            res.sendStatus(200, "Ok"); // Datos insertados correctamente
                        }
                    });
                } else {
                    res.sendStatus(400, "Bad Request"); // La base de datos ya tiene datos
                }
            }
        });
    });
    

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    //Implementación de todos los métodos de la tabla azul y códigos del cuadro verde 
    
    //POST --- OK 
    app.post(API_BASE + "/structural-investment-data", (req, res) => {

        const newData =  req.body;
        const expectedFields = ["ms","ms_name","cci", "title","fund", "category_of_region", "year","net_planned_eu_amount","cumulative_initial_pre_financing","cumulative_additional_initial_pre_financing", "recovery_of_initial_pre_financing", "cumulative_annual_pre_financing", "pre_financing_covered_by_expenditure", "recovery_of_annual_pre_financing", "net_pre_financing","cumulative_interim_payments", "recovery_of_expenses","net_interim_payments","total_net_payments", "eu_payment_rate"
        ];
        const receivedFields = Object.keys(newData);
        const isValidData = expectedFields.every(field => receivedFields.includes(field));
    
        if (!isValidData) {
            res.sendStatus(400, "Bad Request"); // Datos inválidos
        } else {
            // Verificar si ya existe un documento con el mismo cci en la base de datos
            db.findOne({ cci: newData.cci }, (err, existingData) => {
                if (err) {
                    res.sendStatus(500, "Internal Error"); // Error interno del servidor
                } else {
                    if (existingData) {
                        res.sendStatus(409, "Conflict"); //Datos existentes
                    } else {
                        // Si no existe, insertar el nuevo documento
                        db.insert(newData, (err, insertedData) => {
                            if (err) {
                                res.sendStatus(500, "Internal Error"); // Error interno del servidor
                            } else {
                                res.sendStatus(201, "Created");
                            }
                        });
                    }
                }
            });
        }
    });
    

    //GET --- OK
    app.get(API_BASE + "/structural-investment-data", (req, res) => {

        db.find({}, (err, data) => {
            if (err) {
                res.sendStatus(500, "Internal Eroor"); // Error interno del servidor
            }else{
                res.send(JSON.stringify(data.map((c)=>{
                    delete c._id;
                    return c;
                }))); // Devolver los datos encontrados, quitando el campo que se crea por defecto
            }
        });
    });


    //PUT --- NOK
    app.put(API_BASE + "/structural-investment-data", (req, res) => {
        res.sendStatus(405, "Method Not Allowed"); // Enviar respuesta con estado 405
    });

    //DELETE --- OK
    app.delete(API_BASE + "/structural-investment-data", (req, res) => {

        db.remove({}, { multi: true }, (err, numRemoved) => { // Borrar todo la base de datos
            if (err) {
                res.sendStatus(500, "Internal Error"); // Error interno del servidor
                return;
            } else {
                if (numRemoved >= 1) {
                    res.sendStatus(200, "Ok"); // Todos los datos han sido eliminados correctamente
                } else {
                    res.sendStatus(404, "Not found"); // No se encontraron datos para eliminar
                }
            }
        });
    });

     //-------------------------------------------------------------------------------------------------------------------------------------------------------

    // POST --- NOK
    app.post(API_BASE + "/structural-investment-data/:ms", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");  // Enviar respuesta con estado 405
    });

    // GET --- OK
    app.get(API_BASE + "/structural-investment-data/:ms", (req, res) => {

        const ms = req.params.ms;
        
        db.find({ ms: ms }, (err, countryData) => {
            if (err) {
                res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
            }

            if (countryData.length > 0) {
                res.send(JSON.stringify(countryData.map((c)=>{
                    delete c._id;
                    return c;
                }))); // Devolver los datos encontrados, quitando el campo que se crea por defecto
            } else {
                res.sendStatus(404, "Not Found"); //Datos no existentes
            }
        });
    });

    // PUT --- OK
    app.put(API_BASE + "/structural-investment-data/:ms", (req, res) => {

        const ms = req.params.ms;
        let data = req.body;

        if (!data || Object.keys(data).length === 0 || data.ms !== ms) {
            res.sendStatus(400, "Bad Request"); // Datos inválidos
        } else {
            db.update({ ms: ms }, data, { }, (err) => {
                if (err) {
                    res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
                }
                res.sendStatus(200, "Ok"); //Actualizacion correcta
            });
        }
    });

    // DELETE --- OK
    app.delete(API_BASE + "/structural-investment-data/:ms", (req, res) => {
        const ms = req.params.ms;

        db.remove({ ms: ms }, {multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
                return;
            }

            if (numRemoved > 0) {
                res.sendStatus(200, "Ok"); //Borrado correcto
            } else {
                res.sendStatus(404, "Not Found"); // Datos no existentes
            }
        });
    });

    

}

