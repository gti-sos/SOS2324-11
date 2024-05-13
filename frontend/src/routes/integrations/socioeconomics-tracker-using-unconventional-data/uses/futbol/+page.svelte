<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(async () => {
        await getGoles();
    });

    async function getGoles() {
        //const url = 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers';
        const params = new URLSearchParams({ league: '39',
                                                season: '2020' });
        const fullUrl = `${url}?${params.toString()}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '01bdbb50d8mshb0788f51cbd3fccp155beejsnce3fed91f95e',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
    };

    try {
        const response = await fetch(fullUrl, options);
        if (response.ok) {
                let futbolData = await response.json();
                console.log(futbolData.response); 
                if (Array.isArray(futbolData.response)) {
                    const data = futbolData.response;
                    createGoalsGraph(data);
                } else {
                console.error("Expected data to be an array, but it's not.");
                }
        } else {
            console.error(`HTTP Error: ${response.status}`);
        }
        } catch (error) {
        console.error('Error fetching Football data:', error);
        }
  }

  function createGoalsGraph(data){

    const mapeo = data
    .map((d) => {
      const totalGoals = d.statistics[0].goals.total; // Usa el operador opcional para verificar la existencia y asigna un valor predeterminado si es undefined
      const playerName = d.player.name  ; // Verifica la existencia del nombre del jugador
      return {
        y: totalGoals,
        label: playerName,
      };
    });

    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Top 20 goleadores de la premier en la temporada 2020"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "0",
		indexLabel: "{label} {y}",
		dataPoints: mapeo
	}]
});
chart.render();
  }


</script>

<div id="chartContainer"></div>