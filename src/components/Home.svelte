<script>
    import {getDB,getAllMatches,addNewMatch} from "../MatchesDB.js"
    import {matches} from "../stores/Matches.js"
    import Team from "./Team.svelte"
    import ScoreCard from "./ScoreCard.svelte"

    export let nxtComponent;
    export let matchId;
    
    let cricDB;
    let showScorecard;
    async function getAll(){
        cricDB = await getDB()
        $matches = await getAllMatches(cricDB)
        console.log($matches);
        
    }
    getAll()
    async function NewMatch(){
        let tid = $matches.length
        let newMatch = {id:tid,
            homeTeam : {name:"",team:[],tossWon:false},
            awayTeam : {name:"",team:[],tossWon:false},
            result:"",
            Innings : {
                First : {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]},
                Second: {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]}  
            
            }
        }
        newMatch.id = $matches.length
        $matches =[...$matches,newMatch]
        matchId = $matches.length-1
        let addRequest = await addNewMatch(cricDB,$matches[matchId])
        if (addRequest=="success"){
            nxtComponent=Team 
        }
        
    }
</script>
<style>
    .show{
        display:none;
    }
</style>

<button on:click={NewMatch}>Create New Match</button>

<div class:show={$matches.length<1?"show":""}>
    Previous Matches
    {#each $matches as match (match.id)}
        {#if match.result}
            <p>{match.homeTeam.name} vs {match.awayTeam.name}      {match.result}</p>
            <button on:click={() => showScorecard=true}>ScoreCard</button>
            {#if showScorecard}
                <ScoreCard bind:matchSummary={match.Innings} bind:showScorecard/>
            {/if}
        {/if}
    {/each}
</div>