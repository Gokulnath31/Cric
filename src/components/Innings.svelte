<script>
    import {FIRST_INNINGS,BATSMAN,BOWLER} from "../constants.js"
    
    import GetPlayer from "./GetPlayer.svelte"
    import Overs from "./Overs.svelte"

    import { createEventDispatcher } from 'svelte';
    import { setContext} from 'svelte';
    
    const dispatch = createEventDispatcher();

    export let battingTeam;
    export let bowlingTeam;
    export let innings;
    export let nthInnings;
    export let target;
    
    setContext('nthInnings', nthInnings);
    setContext('target', target);

    let startOfInnings = true;

    let overs = 5;
    let striker,nonStriker,currentBowler;
    let commentary = [];

    innings.batsmen = innings?.batsmen ?? battingTeam.team.map(function(player) { return {  playername:player,
                                                                        runsScored:0,
                                                                        fours:0,
                                                                        sixes:0,
                                                                        ballsUsed:0,
                                                                        yetToBat:true
                                                                    }
                                                                }
                                                );
    innings.bowlers = innings?.bowlers ?? bowlingTeam.team.map(function(player) { return {  playername:player,
                                                                        oversBowled:"0.0",
                                                                        wicketsTaken:0,
                                                                        runsgiven:0
                                                                    }
                                                                }
                                            );

    $: yetTobat = innings.batsmen.filter(player => player.yetToBat)
    
    function updateInningsData(){
        if(nthInnings==FIRST_INNINGS){
            dispatch('firstInningsEnd',innings.totalScore);   
        }
    }

    function displayCommentary(event){
        commentary=[{id:commentary.length,...event.detail},...commentary]
        dispatch('updateDB',"Ball Bowled");
    }
    function removeCommentary(event){
        commentary=commentary.slice(1);
        console.log(commentary)
        dispatch('updateDB',"Corrected Previous Delivery");
    }
</script>
<style>
    #startInnings{
        background-color:white;
        color:#001f3f;
    }
    .container{
        display:grid;
        grid-gap: 5vmax;
        grid-template-columns: 70% 20%;
        padding:2rem 0;
    }
    .wrapper{
        width:50%;
        margin:0 auto;
    }
    .scorecard{
        background-color:white;
        color:#001f3f;
        padding:2rem 0;
        margin: 0 auto;
    }
    #nthInn{
        color:white;
    }
    #commentary{
        height:18rem;
        overflow: auto;
        color:white;
        border:1px solid white;
    }
    label{
        color:white;
        font-weight: 900;
    }

</style>
<div class="container">
    <div>
        {#if (startOfInnings)}
            <form on:submit|preventDefault ="{() => startOfInnings=false}">


                <label>
                    Batsman at Striker's End
                    <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={striker} type={BATSMAN}/>
                </label> 
                
                
                <label>
                    Batsman at Non-Striker's End 
                    <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={nonStriker} type={BATSMAN}/>
                </label>
                    
                <label>
                    Bowler
                    <GetPlayer  bind:squad={innings.bowlers} 
                                bind:chosenPlayer={currentBowler} 
                                type={BOWLER}/>
                </label>
                
                <button id="startInnings" type="submit">Start Innings</button>
            </form>
        {/if}



        {#if (!startOfInnings && striker && nonStriker && currentBowler)}
            <p id="nthInn">{nthInnings} Innings</p>
            <div class="wrapper">
                <div class="scorecard">
                    <h3>{battingTeam.name} {innings.totalScore} - {innings.wicketsDown}</h3>
                    <p>Striker'end       {`${striker.playername} ${striker.runsScored} ${striker.ballsUsed}`}</p>
                    <p>Non Striker's end {`${nonStriker.playername} ${nonStriker.runsScored} ${nonStriker.ballsUsed}`}</p>
                    <p>Current Bowler    {currentBowler.playername}</p>
                    <p>{innings.oversCompleted}</p>
                </div>
            </div>
            <Overs 
                bind:striker 
                bind:nonStriker 
                bind:currentBowler 
                bind:yetTobat 
                totalOvers={overs}  
                bind:innings={innings} 
                on:inningsEnd={() => updateInningsData()} 
                on:result 
                on:ballBowled={displayCommentary} 
                on:undoLastBall={removeCommentary}
            />

            <!-- {#if (nthInnings=="Second")}
                
                <p>Need {target} Runs to win with {10-innings.wicketsDown} Wickets in Hand</p>
            {/if} -->
        {/if}
    </div>
    <div id="commentary">

            {#each commentary as ball (ball)}
                <p> {ball.overs} {ball.bowler} to {ball.batsman} {ball.ball} {ball.ball}</p>
                
            {/each} 
    </div>
</div>


