<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-investment-data';
  const apiUrl2 = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
  const apiUrl3 = 'https://sos2324-11.appspot.com/api/v2/socioeconomics-traker-using-unconventional-data';

  let countryData = [];
  let dataAvailable = false; 

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }


async function processCountryData() {
    const data1 = await fetchData(apiUrl1);
    console.log(data1);
    const data2 = await fetchData(apiUrl2);
    console.log(data2);
    const data3 = await fetchData(apiUrl3);
    console.log(data3);

    const combinedData = {};

    // Combinar datos de las tres fuentes
    [data1, data2, data3].forEach(data => {
        data.forEach(entry => {
            const country = entry.ms_name || entry.country; // Asegurarse de que se utilice el campo correcto para el país
            if (!combinedData[country]) {
                combinedData[country] = {
                    name: country,
                    net_planned_eu_amount: 0,
                    total_net_payment: 0,
                    popularity_rate: 0,
                };
            }

            combinedData[country].net_planned_eu_amount += entry.net_planned_eu_amount || 0;
            combinedData[country].total_net_payment += entry.total_net_payment || 0;
            combinedData[country].popularity_rate += entry.popularity_rate || 0;
        });
    });

    // Convertir el objeto combinedData en un array para facilitar su uso en la gráfica
    countryData = Object.values(combinedData);

    // Establecer dataAvailable basado en si hay datos disponibles
    dataAvailable = countryData.length > 0;
}


function createChart() {
  // Calcular los valores mínimos y máximos para cada conjunto de datos
  const minNetPlannedEuAmount = Math.min(...countryData.map(country => country.net_planned_eu_amount));
  const maxNetPlannedEuAmount = Math.max(...countryData.map(country => country.net_planned_eu_amount));

  const minTotalNetPayment = Math.min(...countryData.map(country => country.total_net_payment));
  const maxTotalNetPayment = Math.max(...countryData.map(country => country.total_net_payment));

  const minPopularityRate = Math.min(...countryData.map(country => country.popularity_rate));
  const maxPopularityRate = Math.max(...countryData.map(country => country.popularity_rate));

  Highcharts.chart('chart-container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Datos combinados por país'
      },
      xAxis: {
        categories: countryData.map(country => country.name),
        title: {
          text: 'País'
        }
      },
      yAxis: [{
        title: {
          text: 'Net Planned EU Amount y Total Net Payment'
        },
        min: Math.min(minNetPlannedEuAmount, minTotalNetPayment), 
        max: Math.max(maxNetPlannedEuAmount, maxTotalNetPayment), 
        opposite: false // Este eje Y estará a la izquierda
      }, {
        title: {
          text: 'Popularity Rate'
        },
        min: minPopularityRate, 
        max: maxPopularityRate, 
        opposite: true // Este eje Y estará a la derecha
      }],
      series: [{
        name: 'Net Planned EU Amount',
        data: countryData.map(country => country.net_planned_eu_amount),
        yAxis: 0 // Asignar a este eje Y
      }, {
        name: 'Total Net Payment',
        data: countryData.map(country => country.total_net_payment),
        yAxis: 0 // Asignar a este eje Y
      }, {
        name: 'Popularity Rate',
        data: countryData.map(country => country.popularity_rate),
        yAxis: 1 // Asignar a este eje Y
      }]
  });
  }




  async function insertData() {
    try {
      let response = await fetch(apiUrl1 + "/loadInitialData", {
        method: "GET",
      });
      let status = await response.status;
      console.log(`Status code: ${status}`);
      if (status === 200) {
        await processCountryData(); // Asegurarse de que los datos se procesen antes de intentar crear el gráfico
        if (dataAvailable) {
          createChart();
        }
      } 
    } catch (e) {
      console.error(e);
    }
 }

 onMount(async () => {
    await processCountryData();
    if (dataAvailable) {
      createChart();
    }
 });
  
</script>

<style>
  #chart-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

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

{#if dataAvailable==false}
  <e>Faltan los datos de uno de los integrantes. Por favor, introduzca los datos.</e>
  <button class="initial" on:click={insertData}>Cargar datos restantes</button>
{:else}
  <div id="chart-container"></div>
{/if}
