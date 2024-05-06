<script>
    import { onMount } from "svelte";
    import Plotly from 'plotly.js-dist';

    let reseñasData = [];

    onMount(async () => {
        await getReseñas();
        createGraph(reseñasData);
    });

    async function getReseñas() {
        //const url = 'https://amazonlive.p.rapidapi.com/reviews?asin=B0BBLT626J&location=de&page=1&amount=10';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dfc6d02a2emsh256a933352cbeb3p1422d0jsn488d0fd24824',
                'X-RapidAPI-Host': 'amazonlive.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            reseñasData = await response.json();
            console.log(reseñasData);

        } catch (error) {
            console.error(error);
        }
    }

    function createGraph(reseñasData) {
        const palette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

        const data = [{
            type: 'treemap',
            labels: reseñasData.map(item => item.author), 
            parents: reseñasData.map(_ => ''), 
            values: reseñasData.map(item => item.rating),
            hoverinfo: 'label+value',
            hovertemplate: '<b>%{label}</b><br>Rating: %{value}',
            marker: {
                colors: palette
            }
        }];

        const layout = {
            height: 600,
            width: 1500
        };

        Plotly.newPlot('reseñasGraph', data, layout);

        document.getElementById('reseñasGraph').on('plotly_click', function(data){
            const point = data.points[0];
            const reseñaAuthor = point.label;
            const reseñaRating = point.value;
            alert(`Review: ${reseñaAuthor}\nRating: ${reseñaRating}`);
        });
    }
</script>

<e>Reseñas de Productos</e>
<div id="reseñasGraph"></div>


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