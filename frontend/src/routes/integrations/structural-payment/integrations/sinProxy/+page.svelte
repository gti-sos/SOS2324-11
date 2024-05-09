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
   

    onMount(async () => {
        await combinedData();
        createGraph();
    });

    let yearData=[];

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

    data1.forEach(entry => {
        const year = entry.year;
        if(!combinedData[year]){
            combinedData[year]={
                year: year,
                recovery_of_expense: 0,
                totalTestResults: 0,
            };
        }
        combinedData[year].recovery_of_expense += entry.recovery_of_expense;
    });

    data2.forEach(entry => {
        const year = parseInt(entry.date/10000);
        if(combinedData[year]){
            combinedData[year].totalTestResults += entry.totalTestResults;
        }
    });

    yearData = Object.values(combinedData);
    console.log("Datos combinados", yearData);
}


function createGraph(){
    console.log("datos", yearData);
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