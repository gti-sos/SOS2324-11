let data = require('../index-ITR');
const API_BASE = "/api/v1";

module.exports = (app, db) => {

        // Búsqueda de datos con parámetros específicos y paginación
app.get(API_BASE + "/structural-payment-data", (req, res) => {
    // Obtenemos los parámetros de búsqueda y paginación de la solicitud
    const queryParameters = req.query;
    const limit = parseInt(queryParameters.limit) || 10; // Tamaño de página predeterminado: 10
    const offset = parseInt(queryParameters.offset) || 0; // Offset predeterminado: 0
  
    // Construimos la consulta de búsqueda basada en los parámetros proporcionados
    let query = {};
  
    // Iteramos sobre cada parámetro de búsqueda
    Object.keys(queryParameters).forEach(key => {
      // Si el parámetro no es "limit", "offset" u otros parámetros de paginación, lo consideramos como un atributo de búsqueda
      if (key !== 'limit' && key !== 'offset') {
        // Convertimos el valor a minúsculas para una búsqueda insensible a mayúsculas/minúsculas
        const value = queryParameters[key].toLowerCase();
        // Creamos una expresión regular para buscar el valor en cualquier parte del atributo
        const regex = new RegExp(value, 'i');
        // Agregamos el atributo y su valor a la consulta
        query[key] = regex;
      }
    });
  
    // Ejecutamos la consulta en la base de datos con paginación
    db.find(query).skip(offset).limit(limit).exec((err, data) => {
      if (err) {
        res.sendStatus(500, "Internal Error");
      } else {
        // Eliminamos el campo _id de los resultados
          const resultsWithoutId = data.map(d => {
          const { _id, ...datWithoutId } = d;
          return datWithoutId;
        });
        res.status(200).json(resultsWithoutId);
      }
    });
  });

    app.get(API_BASE + "/structural-payment-data/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
            if (err) {
                res.sendStatus(500, "Internal Error"); // Error interno del servidor
            } else {
                if (count === 0) {
                    // Insertar datos iniciales solo si la colección está vacía
                    db.insert(data, (err, docs) => {
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
    });

    //PUT - ACTUALIZAR DATOS
    app.put(API_BASE+"/structural-payment-data/:ms_name", (req,res) => {
        let countryToUpdate = req.params.ms_name;
        let newData = req.body;

        db.update({ "ms_name": countryToUpdate }, { $set : newData}, (err,numUpdated) => {
          if (err) {
            res.sendStatus(500, "Internal server error");
        } else {
            if (numUpdated === 0) {
                res.sendStatus(400, "Bad request");
            } else {
                res.sendStatus(200, "Ok");
            }
          }
        });
      });

    //DELETE - BORRA DATOS DE UN PAIS
    app.delete(API_BASE + "/structural-payment-data/:ms_name", (req, res) => {
        let country = req.params.ms_name;
        db.remove({"ms_name": country}, {}, (err, numRemoved)=>{
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
