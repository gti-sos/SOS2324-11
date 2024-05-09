<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
  
    const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
    const apiUrl2 = 'https://sos2324-11.appspot.com/proxyIsabelMaria';

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
                eu_payment_rate: 0,
                leagueName: 0,
            };
        }
        combinedData[year].eu_payment_rate += entry.eu_payment_rate;
    });

    data2.forEach(entry => {
        const year = parseInt(entry.leagueSeason);
        if(combinedData[year]){
            combinedData[year].leagueName += 1;
        }
    });

    yearData = Object.values(combinedData);
    console.log("Datos combinados", yearData);
}


function createGraph(){
  var chart = Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Datos combinados, 2020 - 2024',
        align: 'left'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
      categories: yearData.map(item => item.year),
        plotBands: [{ // Highlight the two last years
            from: 2020,
            to: 2024,
            color: 'rgba(68, 170, 213, .2)'
        }],
    },
    yAxis: {
        title: {
            text: 'Cantidad'
        }
    },
    tooltip: {
        shared: true,
        headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            pointStart: 2020
        },
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'Ligas de fútbol',
        data:
            yearData.map(item=>item.leagueName)
    }, {
        name: 'Tasa de pago de la UE',
        data:
            yearData.map(item=>item.eu_payment_rate)
              
    }]
});

}


</script>

<div id="container" />