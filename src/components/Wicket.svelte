<script>
    import GetPlayer from "./GetPlayer.svelte"

    export let currentBowler;
    export let striker;
    export let nonStriker;
    export let yetTobat;
    export let bowlers;
    export let handleWicket;
    export let wickets;

    let wicket;
    let newBatsman;
    let type;
    let fielder;
    let batsmanWhoGotOut;
    $:console.log(batsmanWhoGotOut)
    function updateBowler(type){
        if(type=="catch" || type=="hitout"){
            currentBowler.wicketsTaken +=1
        }
        
    }
    function updateBatsman(wicket,newBatsman){
        if (wicket=="s"){
            batsmanWhoGotOut = striker
            striker.yetToBat = false
            striker = newBatsman
        }
        else if (wicket=="ns"){

            batsmanWhoGotOut = nonStriker
            nonStriker.yetToBat = false
            nonStriker = newBatsman
        }
    }
    $: if(wicket && newBatsman){
        updateBatsman(wicket,newBatsman);
    }
    $:updateBowler(type);
    function addWicket(){
        handleWicket=false
        wickets.push({out:batsmanWhoGotOut,"type":type,"fielder":fielder,"at":wicket})
    }
</script>

<form on:submit|preventDefault="{addWicket}">
    {#if !wicket}
        <div>
            Batsman who got out :
            <label>
                <input type=radio bind:group={wicket} value="s">
                {striker.playername}
            </label>
            
            <label>
                <input type=radio bind:group={wicket} value="ns">
                {nonStriker.playername}
            </label>
        </div>
    {/if}
    <div>
        How the wicket was taken :
        <label>
            <input type=radio bind:group={type} value="catch" checked>
            Catch
        </label>
        
        <label>
            <input type=radio bind:group={type} value="runout">
            Run out
        </label>

        <label>
            <input type=radio bind:group={type} value="hitout">
            Hit out
        </label>
    </div>

    {#if type=="catch" || type=="runout"}
        <label>
            Fielder <GetPlayer bind:squad={bowlers} bind:chosenPlayer={fielder} type="bowler"/>
        </label>
        
    {/if}
    
    {#if wicket}
        New Batsman 
        <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={newBatsman} type="batsman"/>
    {/if}
    <button type="Submit"> Resume Play</button>
</form>
