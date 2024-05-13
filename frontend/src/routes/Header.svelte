<br>
<header> 
    <nav>
        <div class="container"> 
            <span class="sos-code" style="margin-left: 20px; font-size: 19px;">SOS2324-11</span>
            <a href="/" >Nosotros</a>
            <a href="/type" >Estado</a>
            <div class="dropdown">
                <button class="dropbtn" >Frontends</button>
                <div class="dropdown-content">
                    <a href="/structural-investment" >Inversión estructural</a>
                    <a href="/structural-payment-data" >Pagos estructurales</a>
                    <a href="/socioeconomics-tracker-using-unconventional-data" >Rastreador de socioeconomía</a>
                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn" >Gráficas</button>
                <div class="dropdown-content">
                    <a href="/analytics">Gráfica grupal</a>
                    <a href="/structural-investment/vista">Inversión estructural</a>
                    <a href="/structural-payment-data/vista">Pagos estructurales</a>
                    <a href="/socioeconomics-tracker-using-unconventional-data/vista">Rastreador de socioeconomía</a>
                </div>
            </div>
            <a href="/integrations">Integraciones/Usos</a>

            <a href="/about" >Videos</a>

        </div>
    </nav>
</header>


<style> 

    header {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #ADD8E6; 
        z-index: 1000; 
    }

    .container {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center; 
        padding: 0 20px; 
    }

    a, .sos-code, .dropbtn {
        color: #000;
        font-weight: bold; 
        text-decoration: none;
        font-size: 18px; 
        padding-top: 30px;
        margin-left: 30px; 
        margin-right: 25px;
        margin-bottom: 30px;
    }

    .sos-code {
        color: #076c8e; 
        font-size: 14px; 
    }

    a:hover {
        color: #00b3ff; 
    }

    a:active {
        color: blue; 
    }

    /* Botón desplegable */
    .dropbtn {
        background-color: transparent;
        border: none;
        cursor: pointer;
        border-radius: 5px; 
        transition: background-color 0.3s;
    }

    .dropbtn:hover{
        color: #00b3ff; 
    }

    /* Contenido desplegable (oculto por defecto)  */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #9bcedf; 
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 5px;
        overflow: hidden; 
    }

    /* Links de dentro del desplegable*/
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-size: 16px; 
        transition: background-color 0.3s; 
    }

    .dropdown-content a:hover {
        color: #00b3ff; 
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

</style>
