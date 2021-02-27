<script>
    import {match} from "../stores/matchStore.js"
    import ScoreCard from "./ScoreCard.svelte"
    import Innings from "./Innings.svelte"

    // import { writable } from 'svelte/store'
    // import { setContext } from 'svelte';
    // $:{
    //     console.log("HomeTeam",$homeTeam.name,$homeTeam.tossWon,$homeTeam.choseTo)
    //     console.log("AwayTeam",$awayTeam.name,$awayTeam.tossWon,$awayTeam.choseTo)
    // }

    let startSecondInnings=false;
    let showScorecard = false;
    
    function getTeam(choice){
        if ($match.homeTeam.tossWon){
            if($match.homeTeam.choseTo==choice){
                return $match.homeTeam
            }
            else{
                return $match.awayTeam
            }
        }
        else{
            if($match.awayTeam.choseTo==choice){
                return $match.awayTeam
            }
            else{
                return $match.homeTeam
            }
        }
    }

    function setTarget(event){
        $match.target = event.detail;
        startSecondInnings=true;
    }

    function showResult(event){
        console.log("Calculating REsult....inside Match Component")
        if(event.detail==0){
            $match.result= getTeam("bowl").name
        }
        else if(event.detail==1){
            $match.result= getTeam("bat").name
        }
        else{
            $match.result = event.detail
        }
    }
</script>

<style>
    .hide{
        display: none;
    }
</style>

<h2>{$match.homeTeam.name} VS {$match.awayTeam.name}</h2>

{#if ($match.result)}
    <h5>Match Result - {$match.result}</h5>
{/if}

<p>{$match.homeTeam.tossWon? $match.homeTeam.name : $match.awayTeam.name} won the Toss and Elected to {$match.homeTeam.tossWon? $match.homeTeam.choseTo : $match.awayTeam.choseTo}</p>
<button on:click={() => showScorecard=true}>ScoreCard</button>
{#if showScorecard}
    <ScoreCard bind:matchSummary={$match.Innings} bind:showScorecard/>
{/if}
<main class="{showScorecard?'hide' : ''}">
    <Innings battingTeam={getTeam("bat")} bowlingTeam={getTeam("bowl")} bind:innings={$match.Innings.First} nthInnings="First" on:firstInningsEnd={setTarget}/>
    {#if (startSecondInnings)}
        <Innings battingTeam={getTeam("bowl")} bowlingTeam={getTeam("bat")} bind:innings={$match.Innings.Second} nthInnings="Second" bind:target={$match.target} on:result={showResult}/>
    {/if}
</main>

