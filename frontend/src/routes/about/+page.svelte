<script>
    import {dev} from "$app/environment";
    let mode = "production";
    
    if(dev)
        mode="development";
</script>

This is the data manager app in {mode} mode