<script>
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
    // $:console.log("target Inside Innings",target)
    let inningsData = {
        runsPerBall:[],
        batsmen: [],
        bowlers: [],
        wickets: []
    }

    let startOfInnings = true;

    let overs = 5;
    let striker,nonStriker,currentBowler;
    let commentary = [];

    innings.batsmen = battingTeam.team.map(function(player) { return {playername:player,runsScored:0,fours:0,sixes:0,ballsUsed:0,yetToBat:true}});
    innings.bowlers = bowlingTeam.team.map(function(player) { return {playername:player,oversBowled:"0.0",wicketsTaken:0,runsgiven:0}});

    innings.totalScore = 0;
    innings.wicketsDown = 0;
    innings.oversCompleted = 0;
    innings.runsPerBall = []

    // $: console.log(striker,nonStriker,currentBowler)
    $: yetTobat = innings.batsmen.filter(player => player.yetToBat)
    // $:console.log(yetTobat)
    // $:console.log(inningsData)
    function updateInningsData(){
        if(nthInnings=="First"){
            dispatch('firstInningsEnd',innings.totalScore);   
        }
    }

    function displayCommentary(event){
        // console.log(event.detail.batsman,event.detail.bowler,event.detail.oversCompleted,event.detail.ball)
        commentary=[{id:commentary.length,...event.detail},...commentary]
    }
</script>
<style>
    .container{
        display:grid;
        grid-gap: 5vmax;
        grid-template-columns: 70% 20%;
    }
</style>
<div class="container">
    <div>
        {#if (startOfInnings)}
            <form on:submit|preventDefault ="{() => startOfInnings=false}">
                Opening batsmen

                Batsman at Striker's End 
                <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={striker} type="batsman"/>
                
                Batsman at Non-Striker's End 
                <GetPlayer bind:squad={yetTobat} bind:chosenPlayer={nonStriker} type="batsman"/>
                    
                Opening bowler
                <GetPlayer bind:squad={innings.bowlers} bind:chosenPlayer={currentBowler} type="bowler"/>
                
                <button type="submit">Start Innings</button>
            </form>
        {/if}



        {#if (!startOfInnings && striker && nonStriker && currentBowler)}
            <p>{nthInnings} Innings</p>
            <div class="scorecard">
                <h3>{battingTeam.name} {innings.totalScore} - {innings.wicketsDown}</h3>
                <p>Striker'end       {`${striker.playername} ${striker.runsScored} ${striker.ballsUsed}`}</p>
                <p>Non Striker's end {`${nonStriker.playername} ${nonStriker.runsScored} ${nonStriker.ballsUsed}`}</p>
                <p>Current Bowler    {currentBowler.playername}</p>
            </div>
            <Overs bind:striker bind:nonStriker bind:currentBowler bind:yetTobat totalOvers={overs}  bind:innings={innings} on:inningsEnd={() => updateInningsData()} on:result on:ballBowled={displayCommentary}/>

            <!-- {#if (nthInnings=="Second")}
                
                <p>Need {target} Runs to win with {10-innings.wicketsDown} Wickets in Hand</p>
            {/if} -->
        {/if}
    </div>
    <div>

            {#each commentary as ball (ball.id)}
                <p> {ball.overs} {ball.bowler} to {ball.batsman} {ball.ball} {ball.ball}</p>
                
            {/each} 
    </div>
</div>


