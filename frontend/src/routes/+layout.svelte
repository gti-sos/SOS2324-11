<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<svelte:head>
    <title>SOS2324-11</title>
</svelte:head>

<body>
<h1>SOS2324-11</h1>
<Header/>
<slot></slot>
<Footer/>
</body>



<style>
    body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            margin: 0;
            padding: 0;
    }
    h1 {
        font-family: Arial, sans-serif;
        background-color: #007BFF;
        color: white;
        padding: 20px;
        margin: 0;
    }

</style>