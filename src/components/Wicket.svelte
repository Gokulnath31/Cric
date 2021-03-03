<script>
    import {BATSMAN,BOWLER,STRIKER,NONSTRIKER} from "../constants.js"
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
    let end;
    let fielder;
    let strikeChange=false;


    function updateBowler(type){
        if(type=="catch" || type=="hitout"){
            currentBowler.wicketsTaken +=1
        }
        
    }
    function changeStrike(){
            [striker,nonStriker] = [nonStriker,striker];
    }
    function replaceBatsman(end){
        switch(end)
        {
            case STRIKER:
                striker.yetToBat = false
                striker = newBatsman
                break;
            case NONSTRIKER:
                nonStriker.yetToBat = false
                nonStriker = newBatsman
                break;
        }
    }
    function makeWicket(playedAt){
        console.log(playedAt)
        if(playedAt==end){
            console.log("Got out at his own end")
            replaceBatsman(end)
        }
        else{
            
            changeStrike();
            strikeChange=true;
            console.log("Got out at his opposite end so chaning strike",strikeChange)
            replaceBatsman(end)
        }
        
    }
    function updateBatsman(wicket){
        if (wicket==striker){
            console.log("Striker got Out")
            makeWicket(STRIKER)
        }
        else if (wicket==nonStriker){
            console.log("NonStriker got Out")
            makeWicket(NONSTRIKER)
        }
    }


    function addWicket(){
        handleWicket=false
        
        wickets.push({out:wicket,"type":type,"fielder":fielder,"at":end,runCross:strikeChange})
    }
</script>

<form on:submit|preventDefault="{() => {updateBowler(type);updateBatsman(wicket);addWicket();}}">
    {#if !wicket}
        <div>
            Batsman who got out :
            <label>
                <input type=radio bind:group={wicket} value={striker}>
                {striker.playername}
            </label>
            
            <label>
                <input type=radio bind:group={wicket} value={nonStriker}>
                {nonStriker.playername}
            </label>
        </div>
    {/if}
    <div>
        At which End the batsman got 
        <label>
            <input type=radio bind:group={end} value={STRIKER}>
            Striker'end
        </label>
        
        <label>
            <input type=radio bind:group={end} value={NONSTRIKER}>
            Non - Striker's end
        </label>
    </div>
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
            Fielder <GetPlayer bind:squad={bowlers} bind:chosenPlayer={fielder} type={BOWLER}/>
        </label>
        
    {/if}
    
    {#if wicket}
        New Batsman 
        <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={newBatsman} type={BATSMAN}/>
    {/if}
    <button type="Submit"> Resume Play</button>
</form>
