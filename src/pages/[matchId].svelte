<script>
    import {FIRST_INNINGS,SECOND_INNINGS,BATTING,BOWLING} from "../constants.js"

    import {updateExistingMatch} from "../MatchesDB.js"

    import {matches} from "../stores/Matches.js"
    
    import ScoreCard from "../components/ScoreCard.svelte"
    import Innings from "../components/Innings.svelte"

    import {goto, params } from '@roxi/routify'

    export let matchId;// let matchId=$params.matchId;;
    
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
        $matches[matchId].startSecondInnings=true;
        updateDatabase();
    }

    async function showResult(event){
        console.log("Calculating REsult....inside Match Component")
        if(event.detail==0){
            $matches[matchId].result= getTeam(BOWLING).name
        }
        else if(event.detail==1){
            $matches[matchId].result= getTeam(BATTING).name
        }
        else{
            $matches[matchId].result = event.detail
        }
        updateDatabase();
    }
    async function updateDatabase(){
        updateExistingMatch($matches[matchId]);
    }
    
    $:if($matches.length){
        $matches[matchId].startSecondInnings= $matches[matchId]?.startSecondInnings ?? false;
        console.log("STart second Innings",$matches[matchId].startSecondInnings)
    }
</script>

<style>
    .hide{
        display: none;
    }
    .wrapper{
        width:100vw;
        background-color:white;

    }

    .title{
        color:#001f3f;
        padding:2rem 0;
        
    }
    .title button{
        background-color:#001f3f;
        color:white;
    }
    main{
        padding:2rem 0; 
    }
    
</style>
    <div class="wrapper">
        <div class="title">
            <h2>{$matches[matchId].homeTeam.name} VS {$matches[matchId].awayTeam.name}</h2>
            
            {#if ($matches[matchId].result)}
                <h5>Match Result - {$matches[matchId].result}</h5>
                <button on:click={() => $goto("./",)}>Back to Home Page</button>
            {/if}
            
            <p>{$matches[matchId].homeTeam.tossWon? $matches[matchId].homeTeam.name : $matches[matchId].awayTeam.name} won the Toss and Elected to {$matches[matchId].homeTeam.tossWon? $matches[matchId].homeTeam.choseTo : $matches[matchId].awayTeam.choseTo}</p>
            <button on:click={() => showScorecard=true}>ScoreCard</button>
        </div>
    </div>
    {#if showScorecard}
        <ScoreCard bind:matchSummary={$matches[matchId].Innings} bind:showScorecard/>
    {/if}
    <main class="{showScorecard?'hide' : ''}">
        <Innings 
            battingTeam={getTeam(BATTING)} 
            bowlingTeam={getTeam(BOWLING)} 
            bind:innings={$matches[matchId].Innings.First} 
            nthInnings={FIRST_INNINGS} 
            on:firstInningsEnd={setTarget}
            on:updateDB={updateDatabase}
        />
        {#if ($matches[matchId].startSecondInnings)}
            <Innings    
                battingTeam={getTeam(BOWLING)} 
                bowlingTeam={getTeam(BATTING)} 
                bind:innings={$matches[matchId].Innings.Second} 
                nthInnings={SECOND_INNINGS} 
                bind:target={$matches[matchId].target} 
                on:result={showResult}
                on:updateDB={updateDatabase}
            />
        {/if}
    </main>

