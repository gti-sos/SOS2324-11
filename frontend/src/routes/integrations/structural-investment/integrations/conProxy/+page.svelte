<svelte:head>

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>

</svelte:head>

<script>
  import { onMount } from 'svelte';

  let dataAvailable = false; 
  const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-investment-data';
  const apiUrl2 = 'https://sos2324-11.appspot.com/proxySharay';
  let countryData = [];

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

    if (data1.length === 0) {
        dataAvailable = false;
      } else {
        dataAvailable=true;
    // Procesar los datos de data1
    data1.forEach(entry => {
        const country = entry.ms_name.toString();
        if (!combinedData[country]) {
            combinedData[country] = {
                country: country,
                cumulative_initial_pre_financing: 0,
                flag: 0,
            };
        }
        combinedData[country].cumulative_initial_pre_financing += entry.cumulative_initial_pre_financing;
    });

    // Combinar los datos de data2
    data2.forEach(entry => {
        const country = entry.name.common.toString();
        if (combinedData[country]) {
            combinedData[country].flag = entry.flag;
        }
    });
  }
    // Filtrar solo los países que están en ambas fuentes
    const countryData = Object.values(combinedData);
    console.log("Datos combinados", countryData);
    createChart(countryData);
}


  // Función asincrónica para insertar datos de mi API
  async function insertData() {
    try {
      let response = await fetch(apiUrl1 + "/loadInitialData", {
        method: "GET",
      });
      let status = await response.status;
      console.log(`Status code: ${status}`);
      if (status === 200) {
        await combinedData();
        if (dataAvailable) {
          createChart();
        }
      } 
    } catch (e) {
      console.error(e);
    }
  }
  

// Función para crear el gráfico utilizando Highcharts
function createChart(countryData) {

    Highcharts.chart('chart-container', {
        chart: {
            type: 'packedbubble',
            plotBorderWidth: 0,
            margin: [0, 0, 0, 0],
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: "Datos combinados por países"
        },
        yAxis: {
            visible: false
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>Financiamiento acumulado:</b> {point.net_planned_eu_amount}<br><b>Bandera:</b> {point.flag}'
        },
        series: [{
            data: countryData.map(data => ({
                name: data.country,
                value: data.cumulative_initial_pre_financing,
                flag: data.flag,
                net_planned_eu_amount: data.cumulative_initial_pre_financing
            })),
            color: 'rgba(147, 112, 219, 0.5)', 
            dataLabels: { 
                enabled: true,
                format: '{point.name}',
                style: {
                    fontSize: '16px' 
                }
            },
            events: { 
                legendItemClick: function () {
                    return false;
                }
            }
        }],
        plotOptions: {
            packedbubble: {
                marker: {
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                },
                minSize: '20%',
                maxSize: '100%'
            }
        },
        legend: {
            enabled: false
        }
    });
}


  
  onMount(async () => {
    await combinedData();
  });

</script>
  

{#if dataAvailable==false}
  <e>No hay datos disponibles. Por favor, introduzca los datos.</e>
  <button class="initial" on:click={insertData}>Cargar datos de prueba</button>
{/if}
<br>
<div id="chart-container" />




<style>

e {
    font-family: '';
    font-size: 40px;
    color: #ff864a;
    text-shadow: 2px 2px 4px rgba(254, 0, 0, 0.5);
    text-align: center;
    display: flex;
    align-items: center; 
    justify-content: center; 
  }

  /* Estilo botón de cargar datos */
  .initial {
    background-color: #ba3da7;
    color: white;
    border: none;
    padding: 2vh 3vw;
    border-radius: 5px;
    cursor: pointer;
    font-size: 30px; 
    margin-left: auto;
    margin-right: auto;
    display: block; 
    margin-top: 20px;
  }

  .initial:hover {
    background-color: #d64fb7;
  }

</style>
