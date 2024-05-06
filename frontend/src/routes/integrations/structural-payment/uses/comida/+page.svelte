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
        //const url = 'https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
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
        var chart = new Chartist.Pie('.ct-chart', {
            labels: foodData.dishes.map(food=>food.name),
            series: foodData.dishes.map(food=>parseInt(food.caloric))
        }, {
        donut: true,
        showLabel: true
        });

        chart.on('draw', function(data) {
        if(data.type === 'slice') {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
            'stroke-dashoffset': {
                id: 'anim' + data.index,
                dur: 1000,
                from: -pathLength + 'px',
                to:  '0px',
                easing: Chartist.Svg.Easing.easeOutQuint,
                // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                fill: 'freeze'
            }
            };

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if(data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
            'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false);
        }
        });

        // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
        chart.on('created', function() {
        if(window.__anim21278907124) {
            clearTimeout(window.__anim21278907124);
            window.__anim21278907124 = null;
        }
        window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
        });

    }

</script>



<style>
    .ct-chart{
        width: 100%;
        height: 360px;
        margin-bottom: 20px; 

    }

    h3 {
            text-align: center;
        }
</style>

<br>
<h3>Calorias de cada comida</h3>
<div class="ct-chart"></div>