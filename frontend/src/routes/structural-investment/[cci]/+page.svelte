<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {page} from '$app/stores';
    import Mensaje from "../../Mensaje.svelte";

    
    onMount(async () => {
        getData();
    });

    let cci = $page.params.cci;

    let API = "/api/v2/structural-investment-data";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    let errorMsg = "";
    let msg = "";
    let result = "";
    let resultStatus = "";
    let dato = [];


    async function getData() {

        resultStatus = result = "";
        const res = await fetch(API + "/" + cci, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updateMs = dato.ms;
            updateMsName = dato.ms_name;
            updateCCI = dato.cci;
            updateTitle = dato.title;
            updateFund = dato.fund;
            updateCategory_of_region = dato.category_of_region;
            updateYear = dato.year;
            updateNet_planned_eu_amount = dato.net_planned_eu_amount;
            updateCumulative_initial_pre_financing = dato.cumulative_initial_pre_financing;
            updateCumulative_additional_initial_pre_financing = dato.cumulative_additional_initial_pre_financing;
            updateRecovery_of_initial_pre_financing = dato.recovery_of_initial_pre_financing;
            updateCumulative_annual_pre_financing = dato.cumulative_annual_pre_financing;
            updatePre_financing_covered_by_expenditure = dato.pre_financing_covered_by_expenditure;
            updateRecovery_of_annual_pre_financing = dato.recovery_of_annual_pre_financing; 
            updateNet_pre_financing = dato.net_pre_financing;
            updateCumulative_interim_payments = dato.cumulative_interim_payments;
            updateRecovery_of_expenses = dato.recovery_of_expenses;
            updateNet_interim_payments = dato.net_interim_payments;
            updateTotal_net_payments = dato.total_net_payments;
            updateEu_payment_rate = dato.eu_payment_rate;
            updateEu_payment_rate_on_planned_eu_amount = dato.eu_payment_rate_on_planned_eu_amount;

        } catch (e) {
            errorMsg = "Error al parserar los datos.";
            console.error(`Error parsing result: ${e}`);
        }

        const status = await res.status;
        resultStatus = status;
        if (resultStatus === 404) {
            errorMsg = `El elemento: ${cci} , no ha sido encontrado.`;
        }
        if (resultStatus === 500) {
            errorMsg = "Error interno del servidor.";
        }
    }
   
    let updateMs = "";
    let updateMsName = "";
    let updateCCI = cci; 
    let updateTitle = "";
    let updateFund = "";
    let updateCategory_of_region = "";
    let updateYear = "";
    let updateNet_planned_eu_amount = "";
    let updateCumulative_initial_pre_financing = "";
    let updateCumulative_additional_initial_pre_financing = ""; 
    let updateRecovery_of_initial_pre_financing = "";
    let updateCumulative_annual_pre_financing = "";
    let updatePre_financing_covered_by_expenditure = "";
    let updateRecovery_of_annual_pre_financing = ""; 
    let updateNet_pre_financing = "";
    let updateCumulative_interim_payments = "";
    let updateRecovery_of_expenses = ""; 
    let updateNet_interim_payments = "";
    let updateTotal_net_payments = "";
    let updateEu_payment_rate = "";
    let updateEu_payment_rate_on_planned_eu_amount = "";

    async function updateData() {

        resultStatus = result = "";
        const requestBody = {
            ms: updateMs,
            ms_name: updateMsName,
            cci: updateCCI,
            title: updateTitle,
            fund: updateFund,
            category_of_region: updateCategory_of_region,
            year: updateYear,
            net_planned_eu_amount: updateNet_planned_eu_amount,
            cumulative_initial_pre_financing: updateCumulative_initial_pre_financing,
            cumulative_additional_initial_pre_financing: updateCumulative_additional_initial_pre_financing,
            recovery_of_initial_pre_financing: updateRecovery_of_initial_pre_financing,
            cumulative_annual_pre_financing: updateCumulative_annual_pre_financing,
            pre_financing_covered_by_expenditure: updatePre_financing_covered_by_expenditure,
            recovery_of_annual_pre_financing: updateRecovery_of_annual_pre_financing,
            net_pre_financing: updateNet_pre_financing,
            cumulative_interim_payments: updateCumulative_interim_payments,
            recovery_of_expenses: updateRecovery_of_expenses,
            net_interim_payments: updateNet_interim_payments,
            total_net_payments: updateTotal_net_payments,
            eu_payment_rate: updateEu_payment_rate,
            eu_payment_rate_on_planned_eu_amount: updateEu_payment_rate_on_planned_eu_amount
        };

        // Verificar si alguno de los campos está vacío o undefined
        for (const key in requestBody) {
            if (requestBody[key] === undefined || requestBody[key] === "") {
                errorMsg = "Rellene todos los campos, por favor.";
                return; 
            }
        }

       // Verificar si los campos son iguales a un dato existente
        const res = await fetch(API + "/" + cci, {
            method: "GET",
        });
        const existingData = await res.json();

        // Comparar los campos del dato existente con los campos del formulario
        const fieldsAreEqual = Object.keys(requestBody).every(key => {
            return requestBody[key] === existingData[key];
        });

        if (fieldsAreEqual) {
            errorMsg = "Existe un dato idéntico, cambie algún campo para actulizar el dato.";
            return;
        }

        // Si los campos son diferentes, proceder con la actualización
        const putResponse = await fetch(API + "/" + cci, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const status = await res.status;
        resultStatus = status;

            if (resultStatus === 200) {
                msg = "El elemento ha sido actualizado correctamente.";
                getData();
            } else if (resultStatus === 400) {
                errorMsg = "Rellene todos los campos, por favor.";
            } else if (resultStatus === 500) {
                errorMsg = "Error interno del servidor.";
            }

    }


</script>

<br>

{#if msg!=""}
<div>
    <Mensaje tipo="exito" mensaje={msg} />
</div>
{/if}

{#if errorMsg!=""}
    <div>
        <Mensaje tipo="error" mensaje={errorMsg} />
    </div>
{/if}


<br> 
<p style="text-align: center;">Detalles sobre el dato con "cci" {cci}</p> 
<br> <br> 

<br> 
<div class="tabla-container">
        <table class="tabla-datos">

        <thead>
            <tr>
                <th>Código país</th>
                <th>Nombre país</th>
                <th>Código identificador</th>
                <th>Título</th>
            </tr>
            <tr>
                <td><input bind:value={updateMs}></td>
                <td><input bind:value={updateMsName}></td>
                <td>{updateCCI}</td>
                <td><input bind:value={updateTitle}></td>
            </tr>
            <tr>
                <th>Nombre del fondo</th>
                <th>Categoría de la región</th>
                <th>Año</th>
                <th>Cantidad neta planificada de la UE</th>
            </tr>
            <tr>
                <td><input bind:value={updateFund}></td>
                <td><input bind:value={updateCategory_of_region}></td>
                <td><input bind:value={updateYear}></td>
                <td><input bind:value={updateNet_planned_eu_amount}></td>
            </tr>
            <tr>
                <th>Financiación previa inicial acumulativa</th>
                <th>Financiación previa inicial adicional acumulativa</th>
                <th>Recuperación de la financiación previa inicial</th>
                <th>Financiación previa anual acumulativa</th>
            </tr>
            <tr>
                <td><input bind:value={updateCumulative_initial_pre_financing}></td>
                <td><input bind:value={updateCumulative_additional_initial_pre_financing}></td>
                <td><input bind:value={updateRecovery_of_initial_pre_financing}></td>
                <td><input bind:value={updateCumulative_annual_pre_financing}></td>
            </tr>
            <tr>
                <th>Financiación previa cubierta por gastos</th>
                <th>Recuperación de la financiación previa anual</th>
                <th>Financiación previa neta</th>
                <th>Pago interino acumulativo</th>
            </tr>
            <tr>
                <td><input bind:value={updatePre_financing_covered_by_expenditure}></td>
                <td><input bind:value={updateRecovery_of_annual_pre_financing}></td>
                <td><input bind:value={updateNet_pre_financing}></td>
                <td><input bind:value={updateCumulative_interim_payments}></td>
            </tr>
            <tr>
                <th>Recuperación de gasto</th>
                <th>Pagos intermedios netos</th>
                <th>Total de pagos netos</th>
                <th>Tasa de pago de la UE</th>
            </tr>
            <tr>
                <td><input bind:value={updateRecovery_of_expenses}></td>
                <td><input bind:value={updateNet_interim_payments}></td>
                <td><input bind:value={updateTotal_net_payments}></td>
                <td><input bind:value={updateEu_payment_rate}></td>
            </tr>
            <tr>
                <th>Tasa de pago de la UE sobre la cantidad planificada de la UE</th>
                <td colspan="4" style="background-color: #f0f0f0;"></td>
            </tr>
            
            <tr>
                <td><input bind:value={updateEu_payment_rate_on_planned_eu_amount}></td>
                <td colspan="4" style="background-color: #f0f0f0;"></td>
            </tr>
        </thead>

    </table>
</div>

<button class="button" on:click="{updateData}">Actualizar dato</button>


<style>
    p {
        font-family: ''; 
        font-size: 40px; 
        color: #0e2ac8; 
        text-shadow: 2px 2px 4px rgba(111, 54, 191, 0.5); 
        text-align: center; 
        margin-top: 10px; 
        margin-bottom: -30px;
    }

     /* Estilo para la tabla */
    .tabla-container {
        overflow-x: auto; /* Hace que el contenedor sea desplazable horizontalmente si es necesario */
        margin: 10px auto; /* Centra el contenedor horizontalmente */
        width: 90%; /* Establece el ancho del contenedor al 90% del contenedor padre */
    }

    /* Estilo para la tabla */
    .tabla-datos {
        border: 2px solid #000; 
        background-color: #ADD8E6; 
        border-collapse: collapse; 
        margin-left: auto;
        margin-right: auto;
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

    .button {
        background-color: #ADD8E6; 
        color: rgb(0, 0, 0);
        border: none;
        padding: 8px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        font-size: 30px; 
    }

    .button:hover {
        background-color: #4682B4; 
    }
</style>
