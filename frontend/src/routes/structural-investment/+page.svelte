<script>

    import {onMount} from "svelte";
    import {dev} from "$app/environment";

    let API = "/api/v2/structural-investment-data";
    if(dev)
        API = "http://localhost:10000" + API;


    let Msg ="";
    let data = [];
    let newData = {
        "ms": "Siglas país",
        "ms_name": "Nombre",
        "cci": "Código identificador",
        "title": "Título",
        "fund": "Nombre ",
        "category_of_region": "Categoría ",
        "year": "Año",
        "net_planned_eu_amount": "Cantidad",
        "cumulative_initial_pre_financing": "Cantidad",
        "cumulative_additional_initial_pre_financing": "Cantidad",
        "recovery_of_initial_pre_financing": "Cantidad",
        "cumulative_annual_pre_financing": "Cantidad",
        "pre_financing_covered_by_expenditure": "Cantidad",
        "recovery_of_annual_pre_financing": "Cantidad",
        "net_pre_financing": "Cantidad",
        "cumulative_interim_payments": "Cantidad",
        "recovery_of_expenses": "Cantidad",
        "net_interim_payments": "Cantidad",
        "total_net_payments": "Cantidad",
        "eu_payment_rate": "Cantidad",
        "eu_payment_rate_on_planned_eu_amount": "Cantidad"
    };

    
    onMount(()=>{
        getData();
    })

    async function getData(){
        try{
            let response = await fetch(API, {
                                method: "GET"
                        });

            let a = await response.json();
            data = a;
            console.log(data);
        }catch(e){
            Msg = e;
            document.getElementById('message-container').textContent = "Error interno del servidor.";
        }
    }
    

    async function createData(){
        try{
            let response = await fetch(API, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newData,null,2)
            });

            let status = await response.status;
            console.log(`Creación, ´respuesta de estado ${status}`);
            if(responde == 201) {
                getData();
                document.getElementById('message-container').textContent = "Creación exitosa.";
            } else if(responde == 409) {
                document.getElementById('message-container').textContent = "El dato no tiene los campos esperados.";
            } else if(responde == 400){
                document.getElementById('message-container').textContent = "No se puede crear el dato indicado porque ya existe en la base de datos.";
            } else {
                document.getElementById('message-container').textContent = + response.status;
            }

        } catch(e) {
            Msg = e;
            document.getElementById('message-container').textContent = "Error interno del servidor.";
        }
    }


    async function deleteAllData(){
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                document.getElementById('message-container').textContent = "Se han borrado correctamente todos los datos.";
            } else if(responde == 404) {
                document.getElementById('message-container').textContent = "No se han podido borrar los datos.";
            }else{ 
                Msg = e;
            document.getElementById('message-container').textContent = + response.status;
            }
        }catch(e){
            Msg = e;
            document.getElementById('message-container').textContent = "Error interno del servidor.";
        }
    }

    async function deleteDataByCci(cci) {
        try {
            let response = await fetch(API + "/" + cci, {
                method: "DELETE"
            });
            if (response.status === 200) {
                getData(); 
                document.getElementById('message-container').textContent = "Dato borrado correctamente.";
            } else if(responde == 404) {
                document.getElementById('message-container').textContent = `No se ha encontrado el país con el cci ${cci}.`;
            } else {
                Msg = e;
                document.getElementById('message-container').textContent = "No se puede boorar un dato que no existe.";
            }
        } catch (e) {
            Msg = e;
            document.getElementById('message-container').textContent = "Error interno del servidor.";
        }
    }
    
</script>

<body>
    
<br> <br>
<div id="message-container"></div>

<br> <br>
<table class="tabla-datos">

    <thead>
        <tr>
            <th>Código país</th>
            <th>Nombre país</th>
            <th>Código identificador</th>
            <th>Título</th>
            <th>Nombre del fondo</th>
            <th>Categoría de la región</th>
            <th>Año</th>
        </tr>
        <tr>
            <td><input bind:value={newData.ms}></td>
            <td><input bind:value={newData.ms_name}></td>
            <td><input bind:value={newData.cci}></td>
            <td><input bind:value={newData.title}></td>
            <td><input bind:value={newData.fund}></td>
            <td><input bind:value={newData.category_of_region}></td>
            <td><input bind:value={newData.year}></td>
        </tr>
        <tr>
            <th>Cantidad neta planificada de la UE</th>
            <th>Financiación previa inicial acumulativa</th>
            <th>Financiación previa inicial adicional acumulativa</th>
            <th>Recuperación de la financiación previa inicial</th>
            <th>Financiación previa anual acumulativa</th>
            <th>Financiación previa cubierta por gastos</th>
            <th>Recuperación de la financiación previa anual</th>
        </tr> 
        <tr>
            <td><input bind:value={newData.cumulative_additional_initial_pre_financing}></td>
            <td><input bind:value={newData.recovery_of_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_annual_pre_financing}></td>
            <td><input bind:value={newData.pre_financing_covered_by_expenditure}></td>
            <td><input bind:value={newData.recovery_of_annual_pre_financing}></td>
            <td><input bind:value={newData.net_pre_financing}></td>
            <td><input bind:value={newData.cumulative_interim_payments}></td>
         
        </tr>
        <tr>
            <th>Financiación previa neta</th>
            <th>Pago interino acumulativo</th>
            <th>Recuperación de gasto</th>
            <th>Pagos intermedios netos</th>
            <th>Total de pagos netos</th>
            <th>Tasa de pago de la UE</th>
            <th>Tasa de pago de la UE sobre la cantidad planificada de la UE</th>
        </tr>
        <tr>
            <td><input bind:value={newData.total_net_payments}></td>
            <td><input  bind:value={newData.eu_payment_rate}></td>
            <td><input bind:value={newData.eu_payment_rate_on_planned_eu_amount}></td>
            <td><input bind:value={newData.recovery_of_expenses}></td>
            <td><input bind:value={newData.net_interim_payments}></td>
            <td><input  bind:value={newData.net_planned_eu_amount}></td>
            <td><input bind:value={newData.cumulative_initial_pre_financing}></td>
        </tr>
    </thead>

</table>


<ul>
    {#each data as d}
        <li style = "margin-bottom: 10px;">
            <a href="/structural-investment/{d.cci}"> {d.ms_name} -> {d.cci} 
            </a><button class="button" on:click="{deleteDataByCci(d.cci)}">Borrar</button>
        </li>
    {/each}
</ul>

<br>
<button class="button" on:click="{createData}">Crear nuevo dato</button>
<button class="button"  on:click="{deleteAllData}">Eliminar todos los datos</button>

</body>


<style>
    /* Estilo para la tabla */
    .tabla-datos {
        border: 2px solid #000; 
        background-color: #ADD8E6; 
        border-collapse: collapse; 
        margin-left: 10px;
        margin-right: 10px;
    }

    /* Estilo para las celdas de la tabla */
    .tabla-datos th, .tabla-datos td {
        border: 1px solid #000; 
        padding: 20px; 
        text-align: center; 
        
    }

    /* Estilo para las celdas de encabezado */
    .tabla-datos th {
        background-color: #4682B4; 
        color: white; 
        text-align: center; 
        
    }

    /* Estilo para los botones */
    .button {
    background-color: #007BFF; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    font-size: 16px; 
    margin: 4px 2px; 
    cursor: pointer; 
    border-radius: 4px; 
    margin-left: 1%;
    }

    .button:hover {
        background-color: #0056b3; 
    }

    /* Mensaje de error*/
    #message-container {
    padding: 10px;
    font-size: 28px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 0px;
    background-color: #f8b8a3; 
    color: #000000; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}


</style>
