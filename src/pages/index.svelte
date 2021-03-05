<script>
    import {addNewMatch} from "../MatchesDB.js"
    import {matches} from "../stores/Matches.js"
    import ScoreCard from "../components/ScoreCard.svelte"

    import {url,goto} from '@roxi/routify'

    let matchId;
    
    let showScorecard;
    
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
        let addRequest = await addNewMatch($matches[matchId])
        if (addRequest=="success"){
            $goto("./Team",{'matchId':matchId})// use []
        }
        
    }
    $:console.log("Inside index Component",$matches,matchId);
</script>
<style>
    .show{
        display:none;
    }
    .flex_container{
        width:30%;
        display:flex;
        flex-direction: column;
        margin:0 auto;
    }
    .flex_items{
        background-color:white;
        padding:1rem;
        margin:1rem;

    }
    h2,p{
        color:#001f3f;
    }
    #scorecard{
        background-color:#001f3f;
        color:white;
    }
</style>

<button on:click={NewMatch}>Create New Match</button>

    <div class={$matches.length<1?"show":"flex_container"}>
        <h3 style="color:white;">Previous Matches</h3>
        {#each $matches as match (match.id)}
            {#if match.result}
            <div class="flex_items">
                <h2>{match.homeTeam.name} vs {match.awayTeam.name}</h2>
                <p>Result:{match.result}</p>
                <button id="scorecard" on:click={() => showScorecard=true}>ScoreCard</button>
                {#if showScorecard}
                    <ScoreCard bind:matchSummary={match.Innings} bind:showScorecard/>
                {/if}
            </div>
            {/if}
        {/each}
    </div>