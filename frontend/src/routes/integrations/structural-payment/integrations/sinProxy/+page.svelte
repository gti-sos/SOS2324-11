<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
  
    const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
    const apiUrl2 = 'https://api.covidtracking.com/v1/us/daily.json';
    let yearData = [];

    onMount(async () => {
        await combinedData();
        createGraph();
    });

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data fetched from', url, data);
    return data;
  }

  async function combinedData() {
    const data1 = await fetchData(apiUrl1);
    const data2 = await fetchData(apiUrl2);

    // Verificar si hay datos disponibles en ambas fuentes
    if (!Array.isArray(data1) || !data2 || !Array.isArray(data2)) {
        console.error('No se pudieron obtener los datos de ambas fuentes.');
        return;
    }

    const combinedData = {};


    // Iterar sobre los datos de la URL1 y construir un conjunto de años
    const yearsFromData1 = new Set(data1.map(entry => parseInt(entry.year , 10)));
    console.log("Años url1", yearsFromData1)
    const yearsFromData2 = new Set(data2.map(c => parseInt(c.date/10000, 10)));
    console.log("Años url2", yearsFromData2)

    //Encomtarr años en comun
    const commonYears = Array.from(new Set([...yearsFromData1].filter(year => yearsFromData2.has(year))));
    console.log("Años comun", commonYears)

       // Iterar sobre los años comunes y obtener los datos correspondientes de cada URL
       commonYears.forEach(year => {
            const dataFromUrl1 = data1.find(entry => entry.year === year );
            const dataFromUrl2 = data2.find(c => parseInt(c.date/10000) === year);
            console.log("1", dataFromUrl1)
            console.log("2", dataFromUrl2)
            if (dataFromUrl1 && dataFromUrl2) {
                // Asegurarse de que combinedData sea un objeto para poder agregar propiedades
                if (!combinedData[year]) {
                    combinedData[year] = {
                        year: year,
                        recovery_of_expense: 0,
                        totalTestResults: 0,
                    };
                }
                combinedData[year].recovery_of_expense = dataFromUrl1.recovery_of_expense || 0;
                combinedData[year].totalTestResults += dataFromUrl2.totalTestResults || 0;
    
            }
        });

    
  

    // Filtrar solo los años comunes con datos en ambas fuentes
    yearData = Object.values(combinedData);
    console.log("Datos combinados" , yearData);
  
}

function createGraph(){

    if (!yearData || yearData.length === 0) return;

        Highcharts.chart('container-bar', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Datos combinados por año',
                    align: 'left'
                },
                xAxis: {
                    categories: yearData.map(data => data.year)
                },
                yAxis: [{
                            title: {
                                text: 'Recuperación de gastos'
                            }
                        }, {
                            title: {
                                text: 'Resultados totales de los test COVID'
                            },
                            opposite: true
                        }],
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Recuperación de gastos',
                    data: yearData.map(data => data.recovery_of_expense),
                    yAxis: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{y}'
                    }
                }, {
                    name: 'Resultados totales de los test COVID',
                    data: yearData.map(data => data.totalTestResults),
                    yAxis: 1,
                    dataLabels: {
                        enabled: true,
                        format: '{y}'
                    }
                }]
        });



    }


</script>

<div id="container-bar" />