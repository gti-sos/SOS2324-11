const API_BASE = "/api/v1";

let data_SPJ = require('../index-SPJ');

/*
var initialData =  [
    {
        "ms" : "IT", 
        "ms_name" : "Italy", 
        "cci" : "2014IT16RFOP017", 
        "title" : "Toscana - ERDF", 
        "fund" : "ERDF", 
        "category_of_region" : "More developed", 
        "year" : 2023, 
        "net_planned_eu_amount" : 389513945, 
        "cumulative_initial_pre_financing" : 11173608.57, 
        "cumulative_additional_initial_pre_financing" : 0, 
        "recovery_of_initial_pre_financing" : 0, 
        "cumulative_annual_pre_financing" : 72720941.21, 
        "pre_financing_covered_by_expenditure" : 26381261.74, 
        "recovery_of_annual_pre_financing" : 34963288.36, 
        "net_pre_financing": 22549999.68,
        "cumulative_interim_payments" : 340582683.58, 
        "recovery_of_expenses" : 0,
        "net_interim_payments" : 366963945.32, 
        "total_net_payments" : 389513945, 
        "eu_payment_rate" : 100, 
        "eu_payment_rate_on_planned_eu_amount" : 100
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
        "recovery_of_annual_pre_financing": 223245.7,
        "net_pre_financing": 223245.7,
        "cumulative_interim_payments": 5455250.64,
        "recovery_of_expenses": 0,
        "net_interim_payments": 5455250.64,
        "total_net_payments": 5678496.34,
        "eu_payment_rate": 50.8721676610121,
        "eu_payment_rate_on_planned_eu_amount": 50.8721676610121
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
        "eu_payment_rate": 98.8329011826087
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
        "eu_payment_rate": 91.3764580344494,
        "eu_payment_rate_on_planned_eu_amount": 91.3764580344494
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
        "eu_payment_rate": 95.3889390735601,
        "eu_payment_rate_on_planned_eu_amount": 95.3889390735601
    } ,
    {
        "ms": "ES",
        "ms_name": "Spain",
        "cci": "2014ES16RFOP018",
        "title": "Melilla  - ERDF",
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
        "eu_payment_rate": 53.7315802607773
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
        "eu_payment_rate": 56.8492511275523  
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
        "eu_payment_rate": 8.99256083335672,
        "eu_payment_rate_on_planned_eu_amount": 8.99256083335672
    },
    {
        "ms": "DE",
        "ms_name": "Germany",
        "cci": "2014DE05SFOP007",
        "title": "Hamburg - ESF",
        "fund": "ESF",
        "category_of_region": "More developed",
        "year": 2016,
        "net_planned_eu_amount": 78176271,
        "cumulative_initial_pre_financing": 2204570.88,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 1469713.92,
        "pre_financing_covered_by_expenditure": 0,
        "recovery_of_annual_pre_financing": 0,
        "net_pre_financing": 3674284.8,
        "cumulative_interim_payments": 0,
        "recovery_of_expenses": 0,
        "net_interim_payments": 0,
        "total_net_payments": 3674284.8,
        "eu_payment_rate": 4.70000008058711,
        "eu_payment_rate_on_planned_eu_amount": 4.70000008058711
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
        "eu_payment_rate": 30.8156709617945
    },
    {
        "ms": "IT",
        "ms_name": "Italy",
        "cci": "2014IT05SFOP018",
        "title": "Trento  - ESF",
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
        "eu_payment_rate": 82.1082676880442
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
        "eu_payment_rate": 30.2401574118419
    }
 
];
*/

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
                            res.sendStatus(200, "Ok"); // Todos los datos han sido eliminados correctamente
                        }
                    });
                } else {
                    res.sendStatus(200, "Ok"); // La base de datos ya tiene datos
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

