<script>
    import {FIRST_INNINGS,BATSMAN,BOWLER} from "../constants.js"
    
    import GetPlayer from "./GetPlayer.svelte"
    import Overs from "./Overs.svelte"

    import {onMount, setContext,createEventDispatcher } from 'svelte';

    
    const dispatch = createEventDispatcher();

    export let battingTeam;
    export let bowlingTeam;
    export let innings;
    export let nthInnings;
    export let target;

    let overs = 5;
    innings.commentary= innings?.commentary??[];



    setContext('nthInnings', nthInnings);
    setContext('target', target);

    innings.startOfInnings = innings?.startOfInnings ?? true;


    innings.striker = innings ?.striker;
    innings.nonStriker = innings ?.nonStriker;
    innings.currentBowler = innings?.currentBowler;

    

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
        innings.commentary=[{id:innings.commentary.length,...event.detail},...innings.commentary]
        dispatch('updateDB',"Ball Bowled");
    }
    function removeCommentary(event){
        innings.commentary=innings.commentary.slice(1);
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
        {#if (innings.startOfInnings)}
            <form on:submit|preventDefault ="{() => innings.startOfInnings=false}">


                <label>
                    Batsman at Striker's End
                    <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={innings.striker} type={BATSMAN}/>
                </label> 
                
                
                <label>
                    Batsman at Non-Striker's End 
                    <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={innings.nonStriker} type={BATSMAN}/>
                </label>
                    
                <label>
                    Bowler
                    <GetPlayer  bind:squad={innings.bowlers} 
                                bind:chosenPlayer={innings.currentBowler} 
                                type={BOWLER}/>
                </label>
                
                <button id="startInnings" type="submit">Start Innings</button>
            </form>
        {/if}



        {#if (!innings.startOfInnings && innings.striker && innings.nonStriker && innings.currentBowler)}
            <p id="nthInn">{nthInnings} Innings</p>
            <div class="wrapper">
                <div class="scorecard">
                    <h3>{battingTeam.name} {innings.totalScore} - {innings.wicketsDown}</h3>
                    <p>Striker'end       {`${innings.striker.playername} ${innings.striker.runsScored} ${innings.striker.ballsUsed}`}</p>
                    <p>Non Striker's end {`${innings.nonStriker.playername} ${innings.nonStriker.runsScored} ${innings.nonStriker.ballsUsed}`}</p>
                    <p>Current Bowler    {innings.currentBowler.playername}</p>
                    <p>{innings.oversCompleted}</p>
                </div>
            </div>
            <Overs 
                bind:striker={innings.striker} 
                bind:nonStriker={innings.nonStriker} 
                bind:currentBowler={innings.currentBowler} 
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

            {#each innings.commentary as ball (ball.id)}
                <p> {ball.overs} {ball.bowler} to {ball.batsman} {ball.ball} {ball.ball}</p>
                
            {/each} 
    </div>
</div>


