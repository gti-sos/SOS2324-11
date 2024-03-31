<script>
    import {onMount} from "svelte";
    import {dev} from "$app/environment";
	import { response } from "express";

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
    let errorMsg ="";

    onMount(()=>{
        getData();
    })

    async function getData(){
        try{
            let response = await fetch(API, {
                                method: "GET"
                        });

            let dat = await response.json();
            data = dat;
            console.log(data);
        }catch(e){
            errorMsg = e;
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
                errorMsg = "El dato se ha creado correctamente";
            } else if (response.status == 409) {
                errorMsg = "El dato ya existe";
            }else if(response.status==400){
                errorMsg = "El dato no tiene los campos esperados";
            } else if (response.status == 500) {
                errorMsg = "Error interno";
            }else{
                errorMsg = "Code: " + response.status;
            }
        
        }catch(e){
             errorMsg = e;
        }
    }

    async function deleteAllData(){
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                errorMsg = "Se han eliminado todos los datos correctamente";
            } else if (response.status == 404) {
                errorMsg = "No se ha encontrado";
            } else if (response.status == 500) {
                errorMsg = "Error interno";
            }else{
                errorMsg = "Error, código: " + response.status;
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
                errorMsg = "Dato eliminado correctamente";
            } else if (response.status == 404) {
                errorMsg = `No se ha encontrado el país ${ms_name} con fondo ${fund}`;
            } else if (response.status == 500) {
                errorMsg = "Error interno";
            }else{
                errorMsg = "Code: " + response.status;
            }
        
        }catch(e){
            errorMsg = e;
        }
    }
</script>

<table>
    <thead>
        <th>Código</th>
        <th>Nombre</th>
        <th>Fondo</th>
        <th> Año</th>
        <th>Cantidad planificada de la UE </th>
        <th>Cantidad de descompromiso n-3</th>
        <th>Cantidad neta planificada de la UE</th>
        <th>Financiamiento inicial acumulativo</th>
        <th>Financiamiento inicial adicional acumulativo </th>
        <th>Recuperación del financiamiento inicial</th>
        <th>Financiamiento inicial neto</th>
        <th>Financiamiento anual acumulativo </th>
        <th>Financiamiento anual cubierto por gastos</th>
        <th>Recuperación del financiamiento anual</th>
        <th>Financiamiento anual neto</th>
        <th>Pago interino acumulativo</th>
        <th>Recuperación del gasto</th>
        <th>Pago interino neto</th>
        <th>Pago neto total</th>
        <th>Tasa de pago de la UE</th>
        <th>Tasa de pago de la UE sobre la cantidad planificada de la UE </th>
    </thead>
    <tbody>
        <tr>
            <td><input bind:value={newData.ms}></td>
            <td><input bind:value={newData.ms_name}></td>
            <td><input bind:value={newData.fund}></td>
            <td><input bind:value={newData.year}></td>
            <td><input bind:value={newData.planned_eu_amount}></td>
            <td><input bind:value={newData.n_3_decommitment_amount}></td>
            <td><input bind:value={newData.net_planned_eu_amount}></td>
            <td><input bind:value={newData.cumulative_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_additional_initial_pre_financing}></td>
            <td><input bind:value={newData.recovery_of_initial_pre_financing}></td>
            <td><input bind:value={newData.net_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_annual_pre_financing}></td>
            <td><input bind:value={newData.annual_pre_financing_covered_by_expenditure}></td>
            <td><input bind:value={newData.recovery_of_annual_pre_financing}></td>
            <td><input bind:value={newData.net_annual_pre_financing}></td>
            <td><input bind:value={newData.cumulative_interim_payment}></td>
            <td><input bind:value={newData.recovery_of_expense}></td>
            <td><input bind:value={newData.net_interim_payment}></td>
            <td><input bind:value={newData.total_net_payment}></td>
            <td><input bind:value={newData.eu_payment_rate}></td>
            <td><input bind:value={newData.eu_payment_rate_on_planned_eu_amount}></td>
        </tr>
    </tbody>
</table>
<ul>
    
    {#each data as d}
        <li><a href="/structural-payment-data/{d.ms_name}/{d.fund}">{d.ms_name}-{d.fund}</a><button on:click="{deleteData(d.ms_name, d.fund)}">Delete</button>
        </li>
    {/each}
</ul>

<button on:click="{createData}">Crear nuevo dato</button>
<button on:click="{deleteAllData}">Eliminar todos los datos</button>

{#if errorMsg != ""}
{errorMsg}
{/if}