<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
</svelte:head>

<script>
  import { onMount } from 'svelte';


  const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
  const apiUrl2 = 'https://sos2324-11.appspot.com/proxyIsabel';
  let yearData = [];

  onMount(async () => {
        await combinedData();
        createGraph();
    });

    // Función asincrónica para obtener datos de una URL
  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data fetched from', url, data);
    return data;
  }


  async function combinedData() {
    const data1 = await fetchData(apiUrl1);
    const data2 = await fetchData(apiUrl2);

    const combinedData = {};

    data1.forEach(entry => {
        const year = entry.year;
        if(!combinedData[year]){
            combinedData[year]={
                year: year,
                eu_payment_rate: 0,
                round: 0,
            };
        }
        combinedData[year].eu_payment_rate += entry.eu_payment_rate;
        console.log("ver los datos", combinedData)
    });

    data2.MRData.RaceTable.Races.forEach(entry => {
      const year = parseInt(entry.season);
      if (combinedData[year]) {
        combinedData[year].round += 1;
      }
    });

    yearData = Object.values(combinedData);
    console.log("Datos combinados", yearData);
}


function createGraph(){
  var chart = // Retrieved from https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt
Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Moose and deer hunting in Norway, 2000 - 2021',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
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
            text: 'Quantity'
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
        name: 'Moose',
        data:
            yearData.map(item=>item.round)
    }, {
        name: 'Deer',
        data:
            yearData.map(item=>item.eu_payment_rate)
              
    }]
});

}




</script>


<div id="container"></div>