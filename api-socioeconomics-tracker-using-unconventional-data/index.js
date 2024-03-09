const API_BASE="/api/v1";
let initialData = require('../index-AMD')


module.exports = (app,db) => {

    app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data/docs", (req, res) => {
        console.log(`REDIRECT TO structural-payment-data/docs`);
        res.status(301).redirect("https://documenter.getpostman.com/view/33058352/2sA2xh3CpF")
    
    });

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

    app.get(API_BASE + "/socioeconomics-traker-using-unconventional-data", (req, res) => {
        // Obtenemos los parámetros de búsqueda y paginación de la solicitud
        const queryParameters = req.query;
        const limit = parseInt(queryParameters.limit) || 10; // Tamaño de página predeterminado: 10
        const offset = parseInt(queryParameters.offset) || 0; // Offset predeterminado: 0
      
        // Construimos la consulta de búsqueda basada en los parámetros proporcionados
        let query = {};
      
        // Iteramos sobre cada parámetro de búsqueda
        Object.keys(queryParameters).forEach(key => {
            // Si el parámetro no es "limit", "offset", "start" ni "end", lo consideramos como un atributo de búsqueda
            if (key !== 'limit' && key !== 'offset' && key !== 'start' && key !== 'end') {
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
    
        // Si se proporciona un período de tiempo, agregamos la condición a la consulta
        if (queryParameters.start && queryParameters.end) {
            query.date = {
                $gte: new Date(queryParameters.start),
                $lte: new Date(queryParameters.end)
            };
        }
      
        // Ejecutamos la consulta en la base de datos con paginación
        db.find(query).skip(offset).limit(limit).exec((err, initialData) => {
          if (err) {
            res.sendStatus(500, "Internal Error");
          } else {
            if (initialData.length === 0 && Object.keys(queryParameters).length === 0) {
              // Si no hay datos cargados y no se proporcionan parámetros de búsqueda, devolvemos una lista vacía
              res.status(200).json([]);
            } else if (initialData.length === 0) {
              // Si no hay datos cargados y se proporcionan parámetros de búsqueda, devolvemos un error 404
              res.sendStatus(404, "No se encontraron datos que coincidan con la búsqueda");
            } else {
              // Eliminamos el campo _id de los resultados
              const resultsWithoutId = initialData.map(d => {
                const { _id, ...datWithoutId } = d;
                return datWithoutId;
              });
              res.status(200).json(resultsWithoutId);
            }
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