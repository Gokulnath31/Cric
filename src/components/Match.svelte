<script>
    import {getDB,updateExistingMatch} from "../MatchesDB.js"

    import {matches} from "../stores/Matches.js"
    
    import Home from "./Home.svelte"
    import ScoreCard from "./ScoreCard.svelte"
    import Innings from "./Innings.svelte"


    export let matchId;
    export let nxtComponent;

    let cricDB;
    let startSecondInnings=false;
    let showScorecard = false;
    
    function getTeam(choice){
        if ($matches[matchId].homeTeam.tossWon){
            if($matches[matchId].homeTeam.choseTo==choice){
                return $matches[matchId].homeTeam
            }
            else{
                return $matches[matchId].awayTeam
            }
        }
        else{
            if($matches[matchId].awayTeam.choseTo==choice){
                return $matches[matchId].awayTeam
            }
            else{
                return $matches[matchId].homeTeam
            }
        }
    }

    async function setTarget(event){
        $matches[matchId].target = event.detail;
        startSecondInnings=true;
        updateDatabase();
    }

    async function showResult(event){
        console.log("Calculating REsult....inside Match Component")
        if(event.detail==0){
            $matches[matchId].result= getTeam("bowl").name
        }
        else if(event.detail==1){
            $matches[matchId].result= getTeam("bat").name
        }
        else{
            $matches[matchId].result = event.detail
        }
        updateDatabase();
    }
    async function updateDatabase(){
        cricDB = await getDB();
        updateExistingMatch(cricDB,$matches[matchId]);
    }
</script>

<style>
    .hide{
        display: none;
    }
</style>

<h2>{$matches[matchId].homeTeam.name} VS {$matches[matchId].awayTeam.name}</h2>

{#if ($matches[matchId].result)}
    <h5>Match Result - {$matches[matchId].result}</h5>
    <button on:click={() => nxtComponent=Home}>Back to Home Page</button>
{/if}

<p>{$matches[matchId].homeTeam.tossWon? $matches[matchId].homeTeam.name : $matches[matchId].awayTeam.name} won the Toss and Elected to {$matches[matchId].homeTeam.tossWon? $matches[matchId].homeTeam.choseTo : $matches[matchId].awayTeam.choseTo}</p>
<button on:click={() => showScorecard=true}>ScoreCard</button>
{#if showScorecard}
    <ScoreCard bind:matchSummary={$matches[matchId].Innings} bind:showScorecard/>
{/if}
<main class="{showScorecard?'hide' : ''}">
    <Innings 
        battingTeam={getTeam("bat")} 
        bowlingTeam={getTeam("bowl")} 
        bind:innings={$matches[matchId].Innings.First} 
        nthInnings="First" 
        on:firstInningsEnd={setTarget}
        on:updateDB={updateDatabase}
    />
    {#if (startSecondInnings)}
        <Innings    
            battingTeam={getTeam("bowl")} 
            bowlingTeam={getTeam("bat")} 
            bind:innings={$matches[matchId].Innings.Second} 
            nthInnings="Second" bind:target={$matches[matchId].target} 
            on:result={showResult}
            on:updateDB={updateDatabase}
        />
    {/if}
</main>

