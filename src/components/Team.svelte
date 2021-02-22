<script>
    import {homeTeam,awayTeam} from "../stores/teamStore.js"
    import AddPlayers from "./AddPlayers.svelte"
    export let nxtComponent;
    // let homeTeam = {name:"",team:[],tossWon:false}
    // let awayTeam = {name:"",team:[],tossWon:false}
    let toss = ""; 
    let choseTo;
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
    $:console.log(homeTeam,awayTeam,toss)
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
            <input type=radio bind:group={toss} value={$homeTeam} checked>
            {$homeTeam.name}
        </label>
        
        <label>
            <input type=radio bind:group={toss} value={$awayTeam}>
            {$awayTeam.name}
        </label>
    </div>
{/if}

{#if toss}
    <p>{toss.name} won the toss and Elected to</p>
    <label>
        <input type=radio bind:group={toss.choseTo} value="bat"/>
        Bat
    </label>
    <label>
        <input type=radio bind:group={toss.choseTo} value="bowl"/>
        Bowl
    </label>
{/if}


<AddPlayers bind:team={$homeTeam.team}/>

<AddPlayers bind:team={$awayTeam.team}/>

<button on:click={startMatch}>
    Start Match
</button>
