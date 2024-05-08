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

    // Función asincrónica para combinar los datos de las dos APIs
  async function combinedData() {
    const data1 = await fetchData(apiUrl1);
    const data2 = await fetchData(apiUrl2);

    const combinedData = {};

    if (data1.length === 0) {
        dataAvailable = false;
      } else {
        dataAvailable=true;

    const countryFromData1 = new Set(data1.map(c => c.ms_name));
    console.log("Countries from data1", countryFromData1)
    const countryFromData2 = new Set(data2.map(c => c.name.common));
    console.log("Countries from data2", countryFromData2);

    //Encomtrar países en comun
    const commonCountry = Array.from(new Set([...countryFromData1].filter(c => countryFromData2.has(c))));
    console.log("Countries comun", commonCountry)

       // Iterar sobre los países comunes y obtener los datos correspondientes de cada URL
       commonCountry.forEach(country => {
            const dataFromUrl1 = data1.find(entry => entry.ms_name === country);
            const dataFromUrl2 = data2.find(team => team.name.common === country);
            console.log("Data from URL1 for", country, dataFromUrl1);
            console.log("Data from URL2 for", country, dataFromUrl2);

            if (dataFromUrl1 && dataFromUrl2) {
                if (!combinedData[country]) {
                    combinedData[country] = {
                        country: country,
                        title: 0,
                        flag: 0,
                    };
                }
                combinedData[country].title = dataFromUrl1.title ;
                combinedData[country].flag = dataFromUrl2.flag ;
            }
        });
  }

    // Filtrar solo los países comunes con datos en ambas fuentes
    countryData = Object.values(combinedData);
    console.log("Datos combinados" , countryData);
  
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
  function createChart() {
      if (!dataAvailable || !countryData || countryData.length === 0) return;

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
              pointFormat: '<b>Title:</b> {point.title}<br><b>Flags:</b> {point.flag} <sub></sub>'
          },
          series: [{
              data: countryData.map(data => ({
                  name: data.country,
                  value: 1,
                  flag: data.flag,
                  title: data.title
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
  if (dataAvailable) {
    createChart();
  }
  });

</script>
  
{#if dataAvailable==false}
  <e>No hay datos disponibles. Por favor, introduzca los datos.</e>
  <button class="initial" on:click={insertData}>Cargar datos de prueba</button>
{/if}
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
