<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.css">
</svelte:head>
<script>
    
    import { onMount } from "svelte";

    let foodData = {};

    onMount(async () => {
        await getData();
    });
    
    async function getData() {
        const url = 'https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ca5c298a0emsh256fcb07f27e2a0p1330b7jsn2140fe88722e',
                'X-RapidAPI-Host': 'dietagram.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const foodData = await response.json();
            console.log(foodData);

            if (foodData.dishes) {
                createGraph(foodData);
                
            }
        } catch (error) {
            console.error(error);
        }
    }

    function createGraph(foodData){
        var data ={
            labels: foodData.dishes.map(food=>food.name),
            series: foodData.dishes.map(food=>parseInt(food.caloric))
                };

                var options = {
                labelInterpolationFnc: function(value) {
                    return value[0]
                }
                };

                var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                    chartPadding: 30,
                    labelOffset: 100,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function(value) {
                    return value;
                    }
                }],
                ['screen and (min-width: 1024px)', {
                    labelOffset: 80,
                    chartPadding: 20
                }]
                ];

                new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
        
            }

</script>



<style>
    .ct-chart{
        width: 100%;
        height: 360px;
        margin-bottom: 20px; 

    }

    e {
        font-family: '';
        font-size: 60px;
        color: #290ef5;
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px;
        }
</style>

<br>
<e>Calorías de comidas</e>
<div class="ct-chart"></div>