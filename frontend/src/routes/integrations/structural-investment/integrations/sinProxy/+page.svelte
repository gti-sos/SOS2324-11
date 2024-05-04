<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    let data1 = [];
    let data2 = [];
    let dataAvailable = false;

    async function fetchData1() {
      try {
        const response = await fetch('https://sky-scanner3.p.rapidapi.com/get-config', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'dfc6d02a2emsh256a933352cbeb3p1422d0jsn488d0fd24824',
            'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
          }
        });
        const jsonData = await response.json();
        data1 = jsonData;
        console.log('Datos de la primera API:', data1);
      } catch (error) {
        console.error('Error al obtener datos de la primera API:', error);
      }
    }
  
    async function fetchData2() {
      try {
        const response = await fetch('https://sos2324-11.appspot.com/api/v2/structural-investment-data');
        const jsonData = await response.json();
        data2 = jsonData;
        console.log('Datos de la segunda API:', data2);
      } catch (error) {
        console.error('Error al obtener datos de la segunda API:', error);
      }
    }

    async function loadData() { 
    try {
        const response = await fetch('https://sos2324-11.appspot.com/api/v2/structural-investment-data/loadInitialData', {
            method: 'GET',
        });

        const status = response.status;
        console.log(`Status code: ${status}`);

        if (status === 200) { 
            await fetchData1(); 
            
            if (data2.length > 0) {
                dataAvailable = true; 
                combineData()
                renderChart();
            } 
        } 
    } catch (error) {
        console.error(error);
    }
}


    async function getData() {

        try {
            const res = await fetch('https://sos2324-11.appspot.com/api/v2/structural-investment-data');
            const data = await res.json();
            console.log(`Data received: ${JSON.stringify(data, null, 2)}`);
   
            if (data.length > 0) {
                dataAvailable = true; 
                renderChart();
            }

        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }
    
    function combineData() {
        const combinedNames = new Set([...(data1.data || []).map(country => country.country), ...(data2 || []).map(country => country.ms_name)]);
        console.log("Combined Names:", combinedNames);
        
        const combinedData = Array.from(combinedNames).map(name => {
            const country1 = (data1.data || []).find(country => country.country === name);
            const country2 = (data2.data || []).find(country => country.ms_name === name);
            console.log("Country 1:", country1);
            console.log("Country 2:", country2);
            
            return {
                name: name,
                value1: country1 ? country1.market : 0,
                value2: country2 ? country2.cci : 0
            };
        });
        console.log("Combined Data:", combinedData);
        
        return combinedData;
    }



  function renderChart() {
    const dataCombined = combineData();

    Highcharts.chart('chart-container', {
      title: {
        text: 'Datos combinados por país'
      },
      xAxis: {
        categories: dataCombined.map(country => country.name)
      },
      yAxis: {
        title: {
          text: 'Valor'
        }
      },
      series: [{
        name: 'Data 1',
        data: dataCombined.map(country => country.value1)
      }, {
        name: 'Data 2',
        data: dataCombined.map(country => country.value2)
      }]
    });
  }


  
    onMount(async () => {
      await getData();
    });

</script>
  
{#if dataAvailable==false}
  <e>No hay datos disponibles. Por favor, introduzca los datos.</e>
  <button class="initial" on:click={loadData}>Cargar datos de prueba</button>
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
