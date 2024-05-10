<svelte:head>

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>

  import { onMount } from 'svelte';

  let dataAvailable = false; 
  let yearData = [];
  const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/structural-investment-data';
  const apiUrl2 = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain';
 

 // Función asincrónica para insertar datos de mi API
  async function insertData() {

    try {
      let response = await fetch(apiUrl1 + "/loadInitialData", {
        method: "GET",
      });

      let status = response.status;
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

      // Procesar los datos de data1
      data1.forEach(entry => {
          const year = entry.year;
          if (!combinedData[year]) {
              combinedData[year] = {
                  year: year,
                  net_planned_eu_amount: 0,
                  idAPIfootball: 0,
              };
          }
          combinedData[year].net_planned_eu_amount += entry.net_planned_eu_amount;
      });

      // Combinar los datos de data2
      data2.teams.forEach(team => {
          const year = team.intFormedYear;
          if (combinedData[year]) {
              combinedData[year].idAPIfootball = parseInt(team.idAPIfootball) || 0;
          }
      });
    }

      // Filtrar solo los años comunes con datos en ambas fuentes
      yearData = Object.values(combinedData);
      console.log("Datos combinados", yearData);

  }
    

  // Función para crear el gráfico utilizando Highcharts
  function createChart() {

      if (!dataAvailable) return; 
      if (!yearData || yearData.length === 0) return;

      Highcharts.chart('chart-container', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Datos combinados por año'
          },
          xAxis: {
              categories: yearData.map(data => data.year)
          },
          yAxis: [{
              title: {
                  text: 'Importe neto previsto de la UE'
              }
          }, {
              title: {
                  text: 'ID API Football'
              },
              opposite: true
          }],
          series: [{
              name: 'Importe neto previsto de la UE',
              data: yearData.map(data => data.net_planned_eu_amount),
              yAxis: 0,
              dataLabels: {
                  enabled: true,
                  format: '{y}'
              }
          }, {
              name: 'ID API Football',
              data: yearData.map(data => parseInt(data.idAPIfootball)),
              yAxis: 1,
              dataLabels: {
                  enabled: true,
                  format: '{y}'
              },
              pointWidth: 40 
          }]
      });
  }
  
  
  onMount(async () => {
    await combinedData();
    if(dataAvailable){
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

  /*Estilo del texto */
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
