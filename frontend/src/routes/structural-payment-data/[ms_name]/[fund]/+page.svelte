<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { page } from '$app/stores';

    onMount(async () => {
        getData();
    });

    let ms_name = $page.params.ms_name;
    let fund = $page.params.fund;

    let API = "/api/v2/structural-payment-data";

    if (dev) {
        API = "http://localhost:10000"+API;
    }

    let dato = [];
    let result = "";
    let resultStatus = "";
    let message = "";

    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API + "/" + ms_name + "/" + fund, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updatedMs = dato.ms;
            updatedMs_name = dato.ms_name;
            updatedFund = dato.fund;
            updatedYear = dato.year;
            updatedPlanned_eu_amount = dato.planned_eu_amount;
            updatedN_3_decommitment_amount = dato.n_3_decommitment_amount;
            updatedNet_planned_eu_amount = dato.net_planned_eu_amount;
            updatedCumulative_initial_pre_financing = dato.cumulative_initial_pre_financing;
            updatedCumulative_additional_initial_pre_financing = dato.cumulative_additional_initial_pre_financing;
            updatedRecovery_of_initial_pre_financing = dato.recovery_of_initial_pre_financing;
            updatedNet_initial_pre_financing = dato.net_initial_pre_financing;
            updatedCumulative_annual_pre_financing = dato.cumulative_annual_pre_financing;
            updatedAnnual_pre_financing_covered_by_expenditure = dato.annual_pre_financing_covered_by_expenditure;
            updatedRecovery_of_annual_pre_financing = dato.recovery_of_annual_pre_financing;
            updatedNet_annual_pre_financing = dato.net_annual_pre_financing;
            updatedCumulative_interim_payment = dato.cumulative_interim_payment;
            updatedRecovery_of_expense = dato.recovery_of_expense;
            updatedNet_interim_payment = dato.net_interim_payment;
            updatedTotal_net_payment = dato.total_net_payment;
            updatedEu_payment_rate = dato.eu_payment_rate;
            updatedEu_payment_rate_on_planned_eu_amount = dato.eu_payment_rate_on_planned_eu_amount;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            message = `El elemento: ${ms_name} ${fund}; No encontrado`;
        }
        if (status == 500) {
            message = "Error interno";
        }
    }

    let updatedMs = "";
    let updatedMs_name = ms_name;
    let updatedFund = fund;
    let updatedYear = "";
    let updatedPlanned_eu_amount = "";
    let updatedN_3_decommitment_amount = "";
    let updatedNet_planned_eu_amount = "";        
    let updatedCumulative_initial_pre_financing = "";
    let updatedCumulative_additional_initial_pre_financing = "";
    let updatedRecovery_of_initial_pre_financing = "";
    let updatedNet_initial_pre_financing = "";
    let updatedCumulative_annual_pre_financing = "";
    let updatedAnnual_pre_financing_covered_by_expenditure = "";
    let updatedRecovery_of_annual_pre_financing = "";
    let updatedNet_annual_pre_financing = "";
    let updatedCumulative_interim_payment = "";
    let updatedRecovery_of_expense = "";
    let updatedNet_interim_payment = "";
    let updatedTotal_net_payment = "";
    let updatedEu_payment_rate = "";
    let updatedEu_payment_rate_on_planned_eu_amount = "";

    async function updateData() {
        resultStatus = result = "";
        const res = await fetch(API + "/" + ms_name + "/" + fund, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ms: updatedMs,
                ms_name:updatedMs_name,
                fund: updatedFund,
                year: updatedYear,
                planned_eu_amount: updatedPlanned_eu_amount,
                n_3_decommitment_amount: updatedN_3_decommitment_amount,
                net_planned_eu_amount: updatedNet_planned_eu_amount,
                cumulative_initial_pre_financing: updatedCumulative_initial_pre_financing,
                cumulative_additional_initial_pre_financing: updatedCumulative_additional_initial_pre_financing,
                recovery_of_initial_pre_financing: updatedRecovery_of_initial_pre_financing,
                net_initial_pre_financing: updatedNet_initial_pre_financing,
                cumulative_annual_pre_financing: updatedCumulative_annual_pre_financing,
                annual_pre_financing_covered_by_expenditure: updatedAnnual_pre_financing_covered_by_expenditure,
                recovery_of_annual_pre_financing: updatedRecovery_of_annual_pre_financing,
                net_annual_pre_financing: updatedNet_annual_pre_financing,
                cumulative_interim_payment: updatedCumulative_interim_payment,
                recovery_of_expense: updatedRecovery_of_expense,
                net_interim_payment: updatedNet_interim_payment,
                total_net_payment: updatedTotal_net_payment,
                eu_payment_rate: updatedEu_payment_rate,
                eu_payment_rate_on_planned_eu_amount: updatedEu_payment_rate_on_planned_eu_amount
            }),
        });
        const status = await res.status;
        resultStatus = status;

        if (status == 200) {
            message = "El elemento se ha actualizado";
            getData();
        } else if (status == 400) {
            message = "Rellena todos los campos";
        } else if (status == 500) {
            message = "Error interno";
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
            <td><input bind:value={updatedMs}></td>
            <td>{updatedMs_name}</td>
            <td>{updatedFund}</td>
            <td><input bind:value={updatedYear}></td>
            <td><input bind:value={updatedPlanned_eu_amount}></td>
            <td><input bind:value={updatedN_3_decommitment_amount}></td>
            <td><input bind:value={updatedNet_planned_eu_amount}></td>
            <td><input bind:value={updatedCumulative_initial_pre_financing}></td>
            <td><input bind:value={updatedCumulative_additional_initial_pre_financing}></td>
            <td><input bind:value={updatedRecovery_of_initial_pre_financing}></td>
            <td><input bind:value={updatedNet_initial_pre_financing}></td>
            <td><input bind:value={updatedCumulative_annual_pre_financing}></td>
            <td><input bind:value={updatedAnnual_pre_financing_covered_by_expenditure}></td>
            <td><input bind:value={updatedRecovery_of_annual_pre_financing}></td>
            <td><input bind:value={updatedNet_annual_pre_financing}></td>
            <td><input bind:value={updatedCumulative_interim_payment}></td>
            <td><input bind:value={updatedRecovery_of_expense}></td>
            <td><input bind:value={updatedNet_interim_payment}></td>
            <td><input bind:value={updatedTotal_net_payment}></td>
            <td><input bind:value={updatedEu_payment_rate}></td>
            <td><input bind:value={updatedEu_payment_rate_on_planned_eu_amount}></td>
        </tr>
        <tr>
            <td>{updatedMs}</td>
            <td>{updatedMs_name}</td>
            <td>{updatedFund}</td>
            <td>{updatedYear}</td>
            <td>{updatedPlanned_eu_amount}</td>
            <td>{updatedN_3_decommitment_amount}</td>
            <td>{updatedNet_planned_eu_amount}</td>
            <td>{updatedCumulative_initial_pre_financing}</td>
            <td>{updatedCumulative_additional_initial_pre_financing}</td>
            <td>{updatedRecovery_of_initial_pre_financing}</td>
            <td>{updatedNet_initial_pre_financing}</td>
            <td>{updatedCumulative_annual_pre_financing}</td>
            <td>{updatedAnnual_pre_financing_covered_by_expenditure}</td>
            <td>{updatedRecovery_of_annual_pre_financing}</td>
            <td>{updatedNet_annual_pre_financing}</td>
            <td>{updatedCumulative_interim_payment}</td>
            <td>{updatedRecovery_of_expense}</td>
            <td>{updatedNet_interim_payment}</td>
            <td>{updatedTotal_net_payment}</td>
            <td>{updatedEu_payment_rate}</td>
            <td>{updatedEu_payment_rate_on_planned_eu_amount}</td>
        </tr>
    </tbody>
</table>

<button on:click="{updateData}">Actualizar dato</button>

{#if message != ""}
{message}
{/if}