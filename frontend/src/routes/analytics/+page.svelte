<svelte:head>

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>

  import { onMount } from 'svelte';

  // Define las URLs de las tres APIs
  const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-investment-data';
  const apiUrl2 = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
  const apiUrl3 = 'https://sos2324-11.appspot.com/api/v2/socioeconomics-traker-using-unconventional-data';

  let countryData = [];

  // Función para obtener datos 
  async function fetchData(url) {

    const response = await fetch(url);
    const data = await response.json();
    return data;
    
  }

  // Función para procesar los datos de las tres fuentes de datos
  async function processCountryData() {

      const data1 = await fetchData(apiUrl1);
      console.log(data1)
      const data2 = await fetchData(apiUrl2);
      console.log(data2)
      const data3 = await fetchData(apiUrl3);
      console.log(data3)

      // Combinar los datos de las tres fuentes
      const combinedData = {};

      // Procesar datos de la primera fuente
      data1.forEach(entry => {
          const country = entry.ms_name;
          if (!combinedData[country]) {
              combinedData[country] = {
                  name: country,
                  net_planned_eu_amount: 0,
                  popularity_rate: 0
              };
          }
          combinedData[country].net_planned_eu_amount += entry.net_planned_eu_amount || 0;
      });

      // Procesar datos de la segunda fuente
      data2.forEach(entry => {
          const country = entry.ms_name;
          if (!combinedData[country]) {
              combinedData[country] = {
                  name: country,
                  net_planned_eu_amount: 0,
                  popularity_rate: 0
              };
          }
          combinedData[country].net_planned_eu_amount += entry.net_planned_eu_amount || 0;
      });

      // Procesar datos de la tercera fuente
      data3.forEach(entry => {
          const country = entry.country;
          if (!combinedData[country]) {
              combinedData[country] = {
                  name: country,
                  net_planned_eu_amount: 0,
                  popularity_rate: 0
              };
          }
          combinedData[country].popularity_rate += entry.popularity_rate || 0;
      });

      // Convertir objeto combinado en un array
      countryData = Object.values(combinedData);
  }

  // Función para crear el gráfico
    function createChart() {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Datos de los países'
            },
            xAxis: {
                title: {
                    text: 'País'
                },
                categories: countryData.map(country => country.name)
            },
            yAxis: [{
                title: {
                    text: 'Net Planned EU Amount'
                }
            }, {
                title: {
                    text: 'Popularity Rate'
                },
                opposite: true,
                min: 0.1 // Establecer un mínimo en el eje y
            }],
            series: [{
                name: 'Net Planned EU Amount',
                data: countryData.map(country => country.net_planned_eu_amount)
            }, {
                name: 'Popularity Rate',
                data: countryData.map(country => country.popularity_rate),
                yAxis: 1
            }]
        });
    }


  onMount(async () => {

    try {
      await processCountryData();
      createChart();

    } catch (error) {
      console.error('Error al obtener datos o crear el gráfico:', error);
    }

  });

</script>

<style>

  #chart-container {
  width: 100%; 
  max-width: 1000px; 
  margin: 0 auto; 
  }

</style>

<div id="chart-container"></div>