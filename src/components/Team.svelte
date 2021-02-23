<script>
    import {homeTeam,awayTeam} from "../stores/teamStore.js"
    import AddPlayers from "./AddPlayers.svelte"
    import Match from "./Match.svelte"
    export let nxtComponent;

    let toss = ""; 
    let choseTo;
    function updateTossDetails(toss,choseTo){

        if (toss!="" && choseTo){
            if ($homeTeam.name==toss){
                $awayTeam.tossWon = false
                $homeTeam.tossWon = true
                $awayTeam.choseTo = null
                $homeTeam.choseTo = choseTo
            }
            else if($awayTeam.name==toss){
                $homeTeam.tossWon = false
                $awayTeam.tossWon = true
                $homeTeam.choseTo = null
                $awayTeam.choseTo = choseTo
            }
        }
        
    }
    $:updateTossDetails(toss,choseTo)

    function startMatch(){
        if ($homeTeam.team.length<11 || $awayTeam.team.length<11){
            alert("Not enought members to play! Each teammust have exactly 11 members")
        }
        else if(!$homeTeam.name.length || !$awayTeam.name.length){
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
    Home Team <input type="text" bind:value={$homeTeam.name} />
</label>

<label>
    Away Team <input type="text" bind:value={$awayTeam.name} />
</label>

{#if ($homeTeam.name && $awayTeam.name)}
    <div>
        Toss won By :
        <label>
            <input type=radio bind:group={toss} value={$homeTeam.name} checked>
            {$homeTeam.name}
        </label>
        
        <label>
            <input type=radio bind:group={toss} value={$awayTeam.name}>
            {$awayTeam.name}
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


<AddPlayers bind:team={$homeTeam.team}/>

<AddPlayers bind:team={$awayTeam.team}/>

<button on:click={startMatch}>
    Start Match
</button>
