<script>
    import {match} from "../stores/matchStore.js"
    import AddPlayers from "./AddPlayers.svelte"
    import Match from "./Match.svelte"
    // let choice = ["bat","bowl"]
    export let nxtComponent;

    let toss = ""; 
    let choseTo;
    function updateTossDetails(toss,choseTo){

        if (toss!="" && choseTo){
            if ($match.homeTeam.name==toss){
                $match.awayTeam.tossWon = false
                $match.homeTeam.tossWon = true
                $match.awayTeam.choseTo = null
                $match.homeTeam.choseTo = choseTo
            }
            else if($match.awayTeam.name==toss){
                $match.homeTeam.tossWon = false
                $match.awayTeam.tossWon = true
                $match.homeTeam.choseTo = null
                $match.awayTeam.choseTo = choseTo
            }
        }
        
    }
    $:updateTossDetails(toss,choseTo)

    function startMatch(){
        if ($match.homeTeam.team.length<11 || $match.awayTeam.team.length<11){
            alert("Not enought members to play! Each teammust have exactly 11 members")
        }
        else if(!$match.homeTeam.name.length || !$match.awayTeam.name.length){
            alert("Invalid Team Name!")
        }
        else if(toss=="" || !choseTo){
            alert("Update the Toss Details")
        }
        else{
            nxtComponent = Match
        }
    }
</script>

<label>
    Home Team <input type="text" bind:value={$match.homeTeam.name} />
</label>

<label>
    Away Team <input type="text" bind:value={$match.awayTeam.name} />
</label>

{#if ($match.homeTeam.name && $match.awayTeam.name)}
    <div>
        Toss won By :
        <label>
            <input type=radio bind:group={toss} value={$match.homeTeam.name} checked>
            {$match.homeTeam.name}
        </label>
        
        <label>
            <input type=radio bind:group={toss} value={$match.awayTeam.name}>
            {$match.awayTeam.name}
        </label>
    </div>
{/if}

{#if toss}
    <p>{toss} won the toss and Elected to</p>
    <label>
        <input type=radio bind:group={choseTo} value="bat"/>
        Bat
    </label>
    <label>
        <input type=radio bind:group={choseTo} value="bowl"/>
        Bowl
    </label>
{/if}


<AddPlayers bind:team={$match.homeTeam.team}/>

<AddPlayers bind:team={$match.awayTeam.team}/>

<button on:click={startMatch}>
    Start Match
</button>
