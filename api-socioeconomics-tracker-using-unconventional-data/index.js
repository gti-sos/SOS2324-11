const API_BASE="/api/v1";
let initialData = require('../index-AMD')


module.exports = (app,db) => {

    app.get(API_BASE+"/socioeconomics-traker-using-unconventional-data/loadInitialData",(req, res) =>{
        db.find({},(err,data) => {

            if(err){
                res.sendStatus(500, "Internal Error")
            }else{
                if(data.length==0){
                    db.insert(initialData)
                    res.sendStatus(200, "Ok")
                }else{
                    res.sendStatus(200, "Data is already inserted")
                }
            }
        })

    });

    //Este get nos permite filtrar por pais
    app.get(API_BASE + '/socioeconomics-traker-using-unconventional-data/:country', (req, res) => {
        let country = req.params.country; 
    
        
        db.find({ country: country }, (err, data) => {
            if (err) {
                
                res.sendStatus(500); 
            } else {
                if (data.length === 0) {
                    
                    res.sendStatus(404); 
                } else {
                    
                    res.send(data); 
                }
            }
        });
    });

    
    app.get(API_BASE + '/socioeconomics-traker-using-unconventional-data/:year', (req, res) => {
        const year = parseInt(req.params.year);
        console.log(year);
    
        
        db.find({ year: parseInt(year) }, (err, data) => {
            if (err) {
                res.sendStatus(500); 
            } else {
                if (data.length === 0) {
                    res.sendStatus(404);
                } else {
                    res.send(data); 
                }
            }
        });
    });
    

    app.get(API_BASE + '/socioeconomics-traker-using-unconventional-data/:country/:year', (req, res) => {
        const country = req.params.country;
        const year = parseInt(req.params.year);
    
        
        db.find({ country: country, year: parseInt(year) }, (err, data) => {
            if (err) {
                
                res.status(500).send("Error interno del servidor");
            } else {
                if (data.length === 0) {
                   
                    res.status(404).send("No se encontraron datos para el país y el año especificados");
                } else {
                    
                    res.send(data);
                }
            }
        });
    });


    app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {
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
                // Validamos si el valor es numérico
                const value = !isNaN(queryParameters[key]) ? parseFloat(queryParameters[key]) : queryParameters[key];
                // Creamos una expresión regular para buscar el valor en cualquier parte del atributo (para strings)
                if (typeof value === 'string') {
                    query[key] = new RegExp(value, 'i');
                } else {
                    query[key] = value;
                }
            }
        });
      
        // Ejecutamos la consulta en la base de datos con paginación
        db.find(query).skip(offset).limit(limit).exec((err, initialData) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                res.status(200).json(initialData);
            }
        });
    });
    
    

    
    
    //POST - NO PERMITIDO
    app.post(API_BASE + "/socioeconomics-traker-using-unconventional-data/:id", (req, res) => {
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

    app.put(API_BASE+'/socioeconomics-traker-using-unconventional-data/:id', (req, res) => {
        let resourceIdFromURL = req.params.id; 
        let updatedData = req.body; 
    
        
        const expectedFields = ["date", "year", "month", "day", "tone_doc_count", "popularity_rate", "tone_avg", "tone_w_avg", "tone_cum", "amd1code", "country", "area", "ref_time", "topic", "_id"];
        const updatedDataFields = Object.keys(updatedData);
        const isValidData = expectedFields.every(field => updatedDataFields.includes(field));
    
        if (!isValidData) {
         
            res.sendStatus(400); 
            return;
        }
    
        if (resourceIdFromURL !== updatedData._id) {
            
            res.sendStatus(400); 
        } else {
           
            db.update({ _id: resourceIdFromURL }, updatedData, {}, (err, numReplaced) => {
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
        }
    });

    /*
    app.delete(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {

        db.remove({}, { multi: true }, (err, numRemoved) => { 
            if (err) {
                res.sendStatus(500, "Internal Error"); 
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
    */

    /*
    app.delete(API_BASE+'/socioeconomics-traker-using-unconventional-data/:id', (req, res) => {
        let resourceId = req.params.id; 
    
       
        db.remove({ _id: resourceId }, {}, (err, numRemoved) => {
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
    */
    app.delete(API_BASE + '/socioeconomics-traker-using-unconventional-data', (req, res) => {
        const queryField = req.query.field; // Campo para buscar
        let queryValue = req.query.value; // Valor a buscar
    
        if (!queryField && !queryValue) {
            // Si no se proporcionan campo y valor, eliminar todos los datos
            db.remove({}, { multi: true }, (err, numRemoved) => {
                if (err) {
                    res.sendStatus(500, "Internal Error");
                } else {
                    if (numRemoved >= 1) {
                        res.sendStatus(200, "Todos los datos fueron eliminados correctamente");
                    } else {
                        res.sendStatus(404, "No se encontraron datos para eliminar");
                    }
                }
            });
        } else {
            // Si se proporcionan campo y valor, eliminar por ese criterio
            if (!queryField || !queryValue) {
                res.status(400).send("Se requieren parámetros de consulta 'field' y 'value'");
                return;
            }
    
            const query = {};
            // Verificar si el valor es numérico o una cadena
            if (!isNaN(queryValue)) {
                // Si es numérico, convertirlo a número
                queryValue = parseFloat(queryValue);
            }
    
            query[queryField] = queryValue;
    
            db.remove(query, { multi: true }, (err, numRemoved) => {
                if (err) {
                    res.sendStatus(500, "Internal Error");
                } else {
                    if (numRemoved >= 1) {
                        res.sendStatus(200, "Datos eliminados correctamente");
                    } else {
                        res.sendStatus(404, "No se encontraron datos para eliminar");
                    }
                }
            });
        }
    });
    
    
    


    
    

}