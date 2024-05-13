<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  

  onMount(async () => {
    await getSpotify();
  });

  async function getSpotify() {
    const url = 'https://spotify23.p.rapidapi.com/user_followers/';
    const params = new URLSearchParams({ id: 'nocopyrightsounds' });
    const fullUrl = `${url}?${params.toString()}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '01bdbb50d8mshb0788f51cbd3fccp155beejsnce3fed91f95e',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
      const response = await fetch(fullUrl, options);
      if (response.ok) {
            let spotifyData = await response.json();
            console.log(spotifyData); // Asegúrate que tenga una propiedad 'data'
            if (Array.isArray(spotifyData.profiles)) {
                const data = spotifyData.profiles;
                createSpotifyGraph(data);
            } else {
            console.error("Expected data to be an array, but it's not.");
            }
      } else {
        console.error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
    }
  }

  function createSpotifyGraph(data) {
    
    const mapeoFiltrado = data
      .filter((d) => d.followers_count >= 300)
      .map((d) => ({
        y: d.followers_count,
        label: d.name
      }));

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Usuarios con mas de 300 seguidores'
      },
      axisX: {
        interval: 1
      },
      axisY2: {
        interlacedColor: 'rgba(1,77,101,.2)',
        gridColor: 'rgba(1,77,101,.1)',
        title: 'Numero de seguidores'
      },
      data: [
        {
          type: 'bar',
          name: 'companies',
          color: '#014D65',
          axisYType: 'secondary',
          dataPoints: mapeoFiltrado
        }
      ]
    });

    chart.render();
  }
</script>

<div id="chartContainer">

</div>
