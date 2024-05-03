<script>
    import { onMount } from "svelte";
    import Plotly from 'plotly.js-dist';

    let serieData = [];

    onMount(async () => {
        await getSeries();
        createGraph();
    });

    async function getSeries() {
        const url = 'https://imdb-top-100-movies.p.rapidapi.com/series';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dfc6d02a2emsh256a933352cbeb3p1422d0jsn488d0fd24824',
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            serieData = await response.json();
            console.log(serieData);
        } catch (error) {
            console.error(error);
        }
    }

    function createGraph() {

        const palette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

        const data = [{
            type: 'treemap',
            labels: serieData.map(item => item.title),
            parents: serieData.map(_ => ''),
            values: serieData.map(item => item.rank),
            hoverinfo: 'label+value',
            hovertemplate: '<b>%{label}</b><br>Rank: %{value}',
            marker: {
                colors: palette
            }
        }];

        const layout = {
            height: 800,
            width: 1500
        };

        Plotly.newPlot('serieGraph', data, layout);

        document.getElementById('serieGraph').on('plotly_click', function(data){
            const point = data.points[0];
            const serieName = point.label;
            const serieRank = point.value;
            alert(`Serie: ${serieName}\nRank: ${serieRank}`);
        });
    }

</script>

<e>Ranking de series</e>
<div id="serieGraph"></div>


<style>

    /* Estilo de textos */
    e {
        font-family: '';
        font-size: 60px;
        color: #ff4a9e;
        text-shadow: 2px 2px 4px rgba(254, 0, 0, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px;
    }

</style>