<script>
    import GetPlayer from "./GetPlayer.svelte"
    import Wicket from "./Wicket.svelte"

    import { createEventDispatcher } from 'svelte';
    import { getContext } from 'svelte';


    export let striker;
    export let nonStriker;
    export let currentBowler;
    
    export let totalOvers;
    export let yetTobat;
    export let innings;

    const nthInnings = getContext("nthInnings");
    const target = getContext("target");

    $:console.log("target Inside Overs...",target)
    const dispatch = createEventDispatcher();

    let extras=0;
    let noball,wide,b,lb,wicket;
    let balls = 0;

    $: oversCompleted = Math.floor(balls/6).toString() + "." +(balls%6).toString();

    let endOfOver =false;
    let handleWicket = false;
    let hasEnded = false;

    function findResult(score){
        if(score>target){
            hasEnded= true;
            console.log("REsult Dispatched chasing won")
            dispatch('result',0);
        }
        else if(hasEnded){
            if(score<target){
                console.log("REsult Dispatched batting first won")
                dispatch('result',1);
            }
            else if(score==target){
                console.log("REsult Dispatched draw")
                dispatch('result',"Draw");
            }
        
        } 

    }

    function hasInningsEnded(balls,wicketsDown,score){
        // console.log(totalOvers,balls,wicketsDown)
        if(innings.wicketsDown==10 || (balls/6)===totalOvers){
            hasEnded = true;
        }
        if (hasEnded && nthInnings=="First"){
                dispatch('inningsEnd','Innings has Ended');
        }
        else if(nthInnings=="Second"){
            findResult(score);
        }
    }
    function updateRuns(runs){
        innings.totalScore += runs;
        currentBowler.runsgiven += runs;
    }
    function changeStrike(){
            [striker,nonStriker] = [nonStriker,striker];
    }

    function checkStriker(runs){
        if(runs%2==1){
            changeStrike();
        }
    }
    function updateBatsmanRuns(batsman,runs){
        if (runs%4==0){
            batsman.fours +=1
        }
        else if (runs%6==0){
            batsman.sixes +=1
        }
        batsman.runsScored +=runs

    }
    function updateBowlerDetails(currentBowler){
        let split = currentBowler.oversBowled.split(".")
        if(balls%6 == 0){
            currentBowler.oversBowled = `${parseInt(split[0])+1}.${split[1]}`;
        }
        else{
            split[1] += balls%6
            split[0] += Match.floor(split[1])
            split[1] %=6  
            currentBowler.oversBowled = split.join(".")
        }
        
    }

    function updateOver(balls,extra){
        if (!extra && balls%6==0){
            changeStrike();
            updateBowlerDetails(currentBowler);
            endOfOver =true;
        }
    }
    function processRuns(runs){
        
       let ballData;
       let extra = false;
       if(noball){
            updateRuns(runs + 1);
            updateBatsmanRuns(striker,runs);
            ballData = `${runs}NB`
            extra=true;
       }
       else if (wide){
            updateRuns(runs + 1);
            ballData = `${runs}Wd`
            extra=true;
       }
       else if (b || lb){  
            updateRuns(runs);
            striker.ballsUsed+=1
            balls +=1;
            ballData = `${runs}b`
       }
       else{
            updateRuns(runs);
            updateBatsmanRuns(striker,runs);
            striker.ballsUsed+=1
            balls+=1
            ballData = `${runs}`
       } 
       if(!noball && wicket){
            innings.wicketsDown +=1;
            //balls +=1;
            handleWicket = true;
            ballData = `${runs}W`
       }
       innings.runsPerBall=[...innings.runsPerBall,ballData]
       
       dispatch('ballBowled',{batsman:striker.playername,bowler:currentBowler.playername,ball:ballData,overs:oversCompleted});
       checkStriker(runs);
       updateOver(balls,extra);
    }
    $:hasInningsEnded(balls,innings.wicketsDown,innings.totalScore)
    // $:console.log(innings)
</script>
<p>{oversCompleted}</p>

{#if (!hasEnded && handleWicket)}
    {console.log("CAlling Wicket")}
    <Wicket bind:currentBowler bind:striker bind:nonStriker bind:yetTobat bind:bowlers={innings.bowlers} bind:handleWicket/>
{/if}

{#if (!hasEnded && endOfOver)}
    Choose Bowler<GetPlayer bind:squad={innings.bowlers} bind:chosenPlayer={currentBowler} type="bowler" on:change={() => endOfOver=false}/>
{/if}
{#if (!hasEnded && !handleWicket && !endOfOver)}
    <label>
	<input type="checkbox" bind:checked={noball}>
	    No Ball
    </label>
    <label>
        <input type="checkbox" bind:checked={wide}>
        Wide
    </label>
    <label>
        <input type="checkbox" bind:checked={b}>
        Byes
    </label>
    <label>
        <input type="checkbox" bind:checked={lb}>
        Leg Byes
    </label>
    <label>
        <input type="checkbox" bind:checked={wicket}>
        Wicket
    </label>

    <button on:click={() => processRuns(0)}>0</button>
    <button on:click={() => processRuns(1)}>1</button>
    <button on:click={() => processRuns(2)}>2</button>
    <button on:click={() => processRuns(3)}>3</button>
    <button on:click={() => processRuns(4)}>4</button>
    <button on:click={() => processRuns(5)}>5</button>
    <button on:click={() => processRuns(6)}>6</button>

    <button on:click={() => processRuns(6)}>Replace Batsman</button>
    <button on:click={() => processRuns(6)}>Replace Bowler</button>
{/if}