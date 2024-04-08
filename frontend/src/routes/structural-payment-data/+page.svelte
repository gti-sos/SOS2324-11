<script>
    import {onMount} from "svelte";
    import {dev} from "$app/environment";

    let API = "/api/v2/structural-payment-data";
    if(dev)
        API = "http://localhost:10000"+API;

    
    let data = [];
    let newData = {
        "ms": "Código",
        "ms_name": "Nombre",
        "fund": "Fondo",
        "year": "Año",
        "planned_eu_amount": "Cantidad",
        "n_3_decommitment_amount": "Cantidad",
        "net_planned_eu_amount": "Cantidad",
        "cumulative_initial_pre_financing": "Cantidad",
        "cumulative_additional_initial_pre_financing": "Cantidad",
        "recovery_of_initial_pre_financing": "Cantidad",
        "net_initial_pre_financing": "Cantidad",
        "cumulative_annual_pre_financing": "Cantidad",
        "annual_pre_financing_covered_by_expenditure": "Cantidad",
        "recovery_of_annual_pre_financing": "Cantidad",
        "net_annual_pre_financing": "Cantidad",
        "cumulative_interim_payment": "Cantidad",
        "recovery_of_expense": "Cantidad",
        "net_interim_payment": "Cantidad",
        "total_net_payment": "Cantidad",
        "eu_payment_rate": "Cantidad",
        "eu_payment_rate_on_planned_eu_amount": "Cantidad"
    };

    let ms = "";
    let ms_name = "";
    let fund = "";
    let year = "";
    let planned_eu_amount = "";
    let n_3_decommitment_amount = "";
    let net_planned_eu_amount = "";
    let cumulative_initial_pre_financing= "";
    let cumulative_additional_initial_pre_financing= "";
    let recovery_of_initial_pre_financing= "";
    let net_initial_pre_financing= "";
    let cumulative_annual_pre_financing= "";
    let annual_pre_financing_covered_by_expenditure= "";
    let recovery_of_annual_pre_financing= "";
    let net_annual_pre_financing= "";
    let cumulative_interim_payment= "";
    let recovery_of_expense= "";
    let net_interim_payment= "";
    let total_net_payment= "";
    let eu_payment_rate= "";
    let eu_payment_rate_on_planned_eu_amount= "";
    let from = ""; 
    let to = "";

  
    let errorMsg ="";
    const limit = 10;
    let mostrarTabla = false;
    


    onMount(()=>{
        mostrarTabla = false;
        filterApplied = false;
        getData();
        
    })
    
    let filterApplied = false; // Variable para controlar si se ha aplicado un filtro
    
    async function getData() {
    try {
        let parametros;
        

        // Verificamos si se han introducido parámetros de búsqueda
        if (ms !== "") {
            parametros += `&ms=${ms}`;
        }
        if (ms_name !== "") {
            parametros += `&ms_name=${ms_name}`;
        }
        if (fund !== "") {
            parametros += `&fund=${fund}`;
        }
        if (year !== "") {
            parametros += `&year=${year}`;
        }
        if (planned_eu_amount !== "") {
            parametros += `&planned_eu_amount=${planned_eu_amount}`;
        }
        if (n_3_decommitment_amount !== "") {
            parametros += `&n_3_decommitment_amount=${n_3_decommitment_amount}`;
        }
        if (net_planned_eu_amount !== "") {
            parametros += `&net_planned_eu_amount=${net_planned_eu_amount}`;
        }
        if (cumulative_initial_pre_financing !== "") {
            parametros += `&cumulative_initial_pre_financing=${cumulative_initial_pre_financing}`;
        }
        if (cumulative_additional_initial_pre_financing !== "") {
            parametros += `&cumulative_additional_initial_pre_financing=${cumulative_additional_initial_pre_financing}`;
        }
        if (recovery_of_initial_pre_financing !== "") {
            parametros += `&recovery_of_initial_pre_financing=${recovery_of_initial_pre_financing}`;
        }
        if (net_initial_pre_financing !== "") {
            parametros += `&net_initial_pre_financing=${net_initial_pre_financing}`;
        }
        if (cumulative_annual_pre_financing !== "") {
            parametros += `&cumulative_annual_pre_financing=${cumulative_annual_pre_financing}`;
        }
        if (annual_pre_financing_covered_by_expenditure !== "") {
            parametros += `&annual_pre_financing_covered_by_expenditure=${annual_pre_financing_covered_by_expenditure}`;
        }
        if (recovery_of_annual_pre_financing !== "") {
            parametros += `&recovery_of_annual_pre_financing=${recovery_of_annual_pre_financing}`;
        }
        if (net_annual_pre_financing !== "") {
            parametros += `&net_annual_pre_financing=${net_annual_pre_financing}`;
        }
        if (cumulative_interim_payment !== "") {
            parametros += `&cumulative_interim_payment=${cumulative_interim_payment}`;
        }
        if (recovery_of_expense !== "") {
            parametros += `&recovery_of_expense=${recovery_of_expense}`;
        }
        if (net_interim_payment !== "") {
            parametros += `&net_interim_payment=${net_interim_payment}`;
        }
        if (total_net_payment !== "") {
            parametros += `&total_net_payment=${total_net_payment}`;
        }
        if (eu_payment_rate !== "") {
            parametros += `&eu_payment_rate=${eu_payment_rate}`;
        }
        if (eu_payment_rate_on_planned_eu_amount !== "") {
            parametros += `&eu_payment_rate_on_planned_eu_amount=${eu_payment_rate_on_planned_eu_amount}`;
        }

        let response = await fetch(API+`?offset=0&&limit=${limit}`+ parametros, {
            method: "GET",
        });

        let status = await response.status;
        if (status === 404) {
            document.getElementById('message-container').textContent = "No se encontraron datos que coincidan con los filtros especificados.";
            data = []; // Limpiar el arreglo de estudiantes

            

            return;
        }
        let dat = await response.json();
        // Filtrar por rango de año si se especifica
        if (from !== "" && to !== "") {
            dat = dat.filter(d => d.year >= from && d.year <= to);
        }

        data = dat;
        console.log(dat);

        // Verificar si se han aplicado filtros
        if (
            ms !== "" ||
            ms_name !== "" ||
            fund !== "" ||
            year !== "" ||
            planned_eu_amount !== "" ||
            n_3_decommitment_amount !== "" ||
            net_planned_eu_amount !== "" ||
            cumulative_initial_pre_financing !== "" ||
            cumulative_additional_initial_pre_financing !== "" ||
            recovery_of_initial_pre_financing !== "" ||
            net_initial_pre_financing !== "" ||
            cumulative_annual_pre_financing !== "" ||
            annual_pre_financing_covered_by_expenditure !== "" ||
            recovery_of_annual_pre_financing !== "" ||
            net_annual_pre_financing !== "" ||
            cumulative_interim_payment !== "" ||
            recovery_of_expense !== "" ||
            net_interim_payment !== "" ||
            total_net_payment !== "" ||
            eu_payment_rate !== "" ||
            eu_payment_rate_on_planned_eu_amount !== "" ||
            from !== "" ||
            to !== ""
        ) {
            filterApplied = true;
        } else {
            filterApplied = false;
        }

        if (dat.length > 0 && filterApplied) {

            // Mostrar mensaje de éxito
            document.getElementById('message-container').textContent = "La búsqueda se ha realizado con éxito.";
        }
    } catch (e) {
        errorMsg = e;
    }
}
/*
    async function getData(){
        try{
            let response = await fetch(API+`?offset=0&&limit=${limit}`, {
                                method: "GET"
                        });

            let dat = await response.json();
            data = dat;
            console.log(data);
        }catch(e){
            errorMsg = e;
        }
    }*/

    async function getInitialData() {
        let response = await fetch(API+"/loadInitialData", {
                                        method: "GET",
        });
        try {
            const dat = await res.json();
            data = dat;
        } catch (error) {
            console.log(`Error al parsear el resultado: ${error}`);
        }
        let status = await response.status;
        if(status==200){
            getData();
            document.getElementById('message-container').textContent = "Los datos han sido insertados correctamente.";
        }
    }

    async function getNextPage() {
        let response = await fetch(API+`?offset=10&&limit=${limit}`, {
            method: "GET",
        });
        try {
            let dat = await response.json();
            data = dat;
            console.log(data);
        } catch (error) {
            console.log(`Error al parsear el resultado: ${error}`);
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
            console.log(`Creation response status ${status}`);
            if(response.status==201){
                getData();
                document.getElementById('message-container').textContent = "El dato se ha creado correctamente";
            } else if (response.status == 409) {
                document.getElementById('message-container').textContent = "El dato ya existe";
            }else if(response.status==400){
                document.getElementById('message-container').textContent = "El dato no tiene los campos esperados";
            } else if (response.status == 500) {
                document.getElementById('message-container').textContent = "Error interno";
            }else{
                document.getElementById('message-container').textContent = "Error, código: " + response.status;
            }
        
        }catch(e){
             errorMsg = e;
        }
    }

    function toggleTabla() {
        mostrarTabla = !mostrarTabla;
    }

    

 


   /*
    let getFrom = null;
    let getTo = null;

    async function getFromTo(getFrom,getTo) {
            let response = await fetch(API+`?from=${getFrom}&to=${getTo}`, {
                method: "GET",
            });
            try {
                let dat = await response.json();
                data = dat;
                console.log(data);
            } catch (error) {
                console.log(`Error al parsear el resultado: ${error}`);
            }
            let status = await response.status;
            if (status == 200) {
                document.getElementById('message-container').textContent = "Se ha realizado la petición correctamente";
            } else if (status == 400) {
                document.getElementById('message-container').textContent = "La petición no es correcta."
            } else if (status == 500) {
                document.getElementById('message-container').textContent = "Error del servidor";
            } 
    }
        */

    async function deleteAllData(){
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                document.getElementById('message-container').textContent = "Se han eliminado todos los datos correctamente";
            } else if (response.status == 404) {
                document.getElementById('message-container').textContent = "No se ha encontrado";
            } else if (response.status == 500) {
                document.getElementById('message-container').textContent = "Error interno";
            }else{
                document.getElementById('message-container').textContent = "Error, código: " + response.status;
            }
        
        }catch(e){
            errorMsg = e;
        }
    }

    async function deleteData(ms_name,fund){
        try{
            let response = await fetch(API+"/"+ms_name+"/"+fund,{
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                document.getElementById('message-container').textContent = "Dato eliminado correctamente";
            } else if (response.status == 404) {
                document.getElementById('message-container').textContent = `No se ha encontrado el país ${ms_name} con fondo ${fund}`;
            } else if (response.status == 500) {
                document.getElementById('message-container').textContent = "Error interno";
            }else{
                document.getElementById('message-container').textContent = "Error, código: " + response.status;
            }
        
        }catch(e){
            errorMsg = e;
        }
    }
</script>

<br>
<br>
<table class="tabla-datos">
    <thead>
        <tr>
        <th>Código</th>
        <th>Nombre</th>
        <th>Fondo</th>
        <th> Año</th>
        <th>Cantidad planificada de la UE </th>
        <th>Cantidad de descompromiso n-3</th>
        </tr>
        <tr>
            <td><input bind:value={newData.ms}></td>
            <td><input bind:value={newData.ms_name}></td>
            <td><input bind:value={newData.fund}></td>
            <td><input bind:value={newData.year}></td>
            <td><input bind:value={newData.planned_eu_amount}></td>
            <td><input bind:value={newData.n_3_decommitment_amount}></td>
        </tr>
        <tr>
        <th>Cantidad neta planificada de la UE</th>
        <th>Financiamiento inicial acumulativo</th>
        <th>Financiamiento inicial adicional acumulativo </th>
        <th>Recuperación del financiamiento inicial</th>
        <th>Financiamiento inicial neto</th>
        <th>Financiamiento anual acumulativo </th>
        </tr>  
        <tr>
            <td><input bind:value={newData.net_planned_eu_amount}></td>
            <td><input bind:value={newData.cumulative_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_additional_initial_pre_financing}></td>
            <td><input bind:value={newData.recovery_of_initial_pre_financing}></td>
            <td><input bind:value={newData.net_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_annual_pre_financing}></td>
        </tr>
        <tr>
        <th>Financiamiento anual cubierto por gastos</th>
        <th>Recuperación del financiamiento anual</th>
        <th>Financiamiento anual neto</th>
        <th>Pago interino acumulativo</th>
        <th>Recuperación del gasto</th>
        <th>Pago interino neto</th>
        </tr>
        <tr>
            <td><input bind:value={newData.annual_pre_financing_covered_by_expenditure}></td>
            <td><input bind:value={newData.recovery_of_annual_pre_financing}></td>
            <td><input bind:value={newData.net_annual_pre_financing}></td>
            <td><input bind:value={newData.cumulative_interim_payment}></td>
            <td><input bind:value={newData.recovery_of_expense}></td>
            <td><input bind:value={newData.net_interim_payment}></td>
        </tr>
        <tr>
        <th>Pago neto total</th>
        <th>Tasa de pago de la UE</th>
        <th>Tasa de pago de la UE sobre la cantidad planificada de la UE </th>
        </tr>
        <tr>
            <td><input bind:value={newData.total_net_payment}></td>
            <td><input bind:value={newData.eu_payment_rate}></td>
            <td><input bind:value={newData.eu_payment_rate_on_planned_eu_amount}></td>
        </tr>
    </thead>
</table>

<ul>
    {#each data as d}
        <li class = "dataItem"><a href="/structural-payment-data/{d.ms_name}/{d.fund}">{d.ms_name} - {d.fund}</a><button class="button" on:click="{deleteData(d.ms_name, d.fund)}">Delete</button>
        </li>
    {/each}
</ul>

<div id="message-container"></div>
<button class="button" on:click="{createData}">Crear nuevo dato</button>
<button class="button" on:click="{deleteAllData}">Eliminar todos los datos</button>
<button class="button" on:click={toggleTabla}>Filtrar</button>

<div>
    <button class="button" on:click={getData}>Página anterior</button>
    <button class="button" on:click={getNextPage}>Página siguiente</button>
</div>

{#if data.length == 0}
<button class="button" on:click="{getInitialData}">Cargar datos iniciales</button>
{/if}

{#if mostrarTabla}
    <div>
    <table class:tabla-datos={mostrarTabla}>
        <caption><div>
            Menú de búsqueda
          </div></caption>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Fondo</th>
                <th> Año</th>
                <th>Cantidad planificada de la UE </th>
                <th>Cantidad de descompromiso n-3</th>
                </tr>
                <tr>
                    <td><input bind:value={ms}></td>
                    <td><input bind:value={ms_name}></td>
                    <td><input bind:value={fund}></td>
                    <td><input bind:value={year}></td>
                    <td><input bind:value={planned_eu_amount}></td>
                    <td><input bind:value={n_3_decommitment_amount}></td>
                </tr>
                <tr>
                <th>Cantidad neta planificada de la UE</th>
                <th>Financiamiento inicial acumulativo</th>
                <th>Financiamiento inicial adicional acumulativo </th>
                <th>Recuperación del financiamiento inicial</th>
                <th>Financiamiento inicial neto</th>
                <th>Financiamiento anual acumulativo </th>
                </tr>
                <tr>
                    <td><input bind:value={net_planned_eu_amount}></td>
                    <td><input bind:value={cumulative_initial_pre_financing}></td>
                    <td><input bind:value={cumulative_additional_initial_pre_financing}></td>
                    <td><input bind:value={recovery_of_initial_pre_financing}></td>
                    <td><input bind:value={net_initial_pre_financing}></td>
                    <td><input bind:value={cumulative_annual_pre_financing}></td>
                </tr>
                <tr>
                <th>Financiamiento anual cubierto por gastos</th>
                <th>Recuperación del financiamiento anual</th>
                <th>Financiamiento anual neto</th>
                <th>Pago interino acumulativo</th>
                <th>Recuperación del gasto</th>
                <th>Pago interino neto</th>
                </tr>
                <tr>
                    <td><input bind:value={annual_pre_financing_covered_by_expenditure}></td>
                    <td><input bind:value={recovery_of_annual_pre_financing}></td>
                    <td><input bind:value={net_annual_pre_financing}></td>
                    <td><input bind:value={cumulative_interim_payment}></td>
                    <td><input bind:value={recovery_of_expense}></td>
                    <td><input bind:value={net_interim_payment}></td>
                </tr>
                <tr>
                <th>Pago neto total</th>
                <th>Tasa de pago de la UE</th>
                <th>Tasa de pago de la UE sobre la cantidad planificada de la UE </th>
                <th> Desde el año </th>
                <th> Hasta el año </th>
                </tr>
                <tr>
                    <td><input bind:value={total_net_payment}></td>
                    <td><input bind:value={eu_payment_rate}></td>
                    <td><input bind:value={eu_payment_rate_on_planned_eu_amount}></td>
                    <td><input bind:value={from} /></td>
                    <td>
                        <input bind:value={to} />
                    </td>
                </tr>
    </table>
    </div>
        <button class="button" on:click={getData}>Buscar</button>


{/if}





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