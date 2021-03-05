<script>
    import {FIRST_INNINGS,SECOND_INNINGS,BOWLER,STRIKER,NONSTRIKER} from "../constants.js"

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

    const dispatch = createEventDispatcher();

    let noball,wide,b,lb,wicket;
    innings.balls = innings ?. balls ?? 0;

    $: innings.oversCompleted = Math.floor(innings.balls/6).toString() + "." +(innings.balls%6).toString();

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
        if(innings.wicketsDown==10 || (balls/6)===totalOvers){
            hasEnded = true;
        }
        if (hasEnded && nthInnings==FIRST_INNINGS){
                dispatch('inningsEnd','Innings has Ended');
        }
        else if(nthInnings==SECOND_INNINGS){
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
        if(innings.balls%6 == 0){
            currentBowler.oversBowled = `${parseInt(split[0])+1}.${split[1]}`;
        }
        else{
            split[1] += innings.balls%6
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
            striker.ballsUsed+=1
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
            innings.balls +=1;
            ballData = `${runs}b`
       }
       else{
            updateRuns(runs);
            updateBatsmanRuns(striker,runs);
            striker.ballsUsed+=1
            innings.balls+=1
            ballData = `${runs}R`
       } 
       if(!noball && wicket){
            innings.wicketsDown +=1;
            //balls +=1;
            handleWicket = true;
            ballData = `${runs}W`
       }
       innings.runsPerBall=[...innings.runsPerBall,ballData]
       
       dispatch('ballBowled',{batsman:striker.playername,
                                bowler:currentBowler.playername,
                                ball:ballData,
                                overs:innings.oversCompleted
                            });
       checkStriker(runs);
       updateOver(innings.balls,extra);

    }
    $:hasInningsEnded(innings.balls,innings.wicketsDown,innings.totalScore)

    function undoLastDelivery(){
        let lastBall = innings.runsPerBall.pop()
        let runsOnLastBall = parseInt(lastBall[0])
        let happened = lastBall.slice(1)
        dispatch('undoLastBall',"By Mistake");
        if(happened!="W" && runsOnLastBall%2==1){
            changeStrike()
        }
        switch(happened){
            case "NB":
                striker.runsScored -= runsOnLastBall
                innings.totalScore -= runsOnLastBall
                currentBowler.runsgiven -= runsOnLastBall
                break;
            case "Wd":
                striker.runsScored -= runsOnLastBall
                innings.totalScore -= runsOnLastBall +1
                currentBowler.runsgiven -= runsOnLastBall + 1
                break;

            case "b":
                currentBowler.runsgiven -= runsOnLastBall
                innings.totalScore -= runsOnLastBall
                striker.ballsUsed-=1
                innings.balls-=1
                break;
            case"R":
                currentBowler.runsgiven -= runsOnLastBall
                innings.totalScore -= runsOnLastBall
                striker.runsScored -= runsOnLastBall
                striker.ballsUsed-=1
                innings.balls-=1
                break;
            case "W":
                innings.wicketsDown -=1
                let previousWicket = innings.wickets.pop()
                console.log("previousWicket",previousWicket)
                // console.log(previousWicket.out)
                if(previousWicket.at==STRIKER){
                    console.log("Undoing wicket at striker's end")
                    striker = previousWicket.out
                    striker.yetToBat = true
                }
                else if(previousWicket.at==NONSTRIKER){
                    console.log("Undoing wicket at non-striker's end")
                    nonStriker = previousWicket.out
                    nonStriker.yetToBat = true
                }
                currentBowler.wicketsTaken -=1
                currentBowler.runsgiven -= runsOnLastBall
                innings.totalScore -= runsOnLastBall
                if(!previousWicket.runCross){
                    striker.runsScored -= runsOnLastBall
                    striker.ballsUsed-=1
                }
                if (runsOnLastBall%2==0 && previousWicket.runCross){
                    changeStrike()
                    striker.runsScored -= runsOnLastBall
                    striker.ballsUsed-=1
                    
                }
                else if (runsOnLastBall%2==1 && previousWicket.runCross){
                    changeStrike()
                    changeStrike()
                    striker.runsScored -= runsOnLastBall
                    striker.ballsUsed-=1
                    
                }    
                innings.balls-=1
        }
    }
</script>
<style>
    label{
        color:white;
    }
</style>

{#if (!hasEnded && handleWicket)}
    {console.log("CAlling Wicket")}
    <Wicket bind:currentBowler 
            bind:striker 
            bind:nonStriker 
            bind:yetTobat 
            bind:bowlers={innings.bowlers} 
            bind:handleWicket 
            bind:wickets={innings.wickets}
    />
{/if}

{#if (!hasEnded && endOfOver)}
    Choose Bowler<GetPlayer bind:squad={innings.bowlers} 
                            bind:chosenPlayer={currentBowler} 
                            type={BOWLER}
                            on:change={() => endOfOver=false}
                />
{/if}
{#if (!hasEnded && !handleWicket && !endOfOver)}
    <label>
    <input  type="checkbox" 
            bind:checked={noball}>
	    No Ball
    </label>
    <label>
        <input  type="checkbox" 
                bind:checked={wide}>
        Wide
    </label>
    <label>
        <input type="checkbox" 
                bind:checked={b}>
        Byes
    </label>
    <label>
        <input  type="checkbox" 
                bind:checked={lb} >
        Leg Byes
    </label>
    <label>
        <input  type="checkbox" 
                bind:checked={wicket}>
        Wicket
    </label>

    <button on:click={() => processRuns(0)}>0</button>
    <button on:click={() => processRuns(1)}>1</button>
    <button on:click={() => processRuns(2)}>2</button>
    <button on:click={() => processRuns(3)}>3</button>
    <button on:click={() => processRuns(4)}>4</button>
    <button on:click={() => processRuns(5)}>5</button>
    <button on:click={() => processRuns(6)}>6</button>

    <button on:click={undoLastDelivery}>Undo last Ball</button>
    <!-- <button on:click={() => processRuns(6)}>Replace Batsman</button>
    <button on:click={() => processRuns(6)}>Replace Bowler</button> -->
{/if}