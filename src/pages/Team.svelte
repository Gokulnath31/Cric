<script>
        import {BATTING,BOWLING} from "../constants.js"
    
        import {matches} from "../stores/Matches.js"
        import AddPlayers from "../components/AddPlayers.svelte"
        

        import {goto, params } from '@roxi/routify'
        import {updateExistingMatch} from "../MatchesDB.js"
    
        let matchId=$params.matchId;
        console.log($matches)
        let toss = ""; 
        let choseTo;
        let current=0;
        let divs=[" ","hide","hide","hide","hide"];
        function updateTossDetails(toss,choseTo){
    
            if (toss!="" && choseTo){
                if ($matches[matchId].homeTeam.name==toss){
                    $matches[matchId].awayTeam.tossWon = false
                    $matches[matchId].homeTeam.tossWon = true
                    $matches[matchId].awayTeam.choseTo = null
                    $matches[matchId].homeTeam.choseTo = choseTo
                }
                else if($matches[matchId].awayTeam.name==toss){
                    $matches[matchId].homeTeam.tossWon = false
                    $matches[matchId].awayTeam.tossWon = true
                    $matches[matchId].homeTeam.choseTo = null
                    $matches[matchId].awayTeam.choseTo = choseTo
                }
            }
            
        }
        $:updateTossDetails(toss,choseTo)
    
        async function startMatch(){
            if ($matches[matchId].homeTeam.team.length<11 || $matches[matchId].awayTeam.team.length<11){
                alert("Not enought members to play! Each teammust have exactly 11 members")
            }
            else if(!$matches[matchId].homeTeam.name.length || !$matches[matchId].awayTeam.name.length){
                alert("Invalid Team Name!")
            }
            else if(toss=="" || !choseTo){
                alert("Update the Toss Details")
            }
            else{
                await  updateExistingMatch($matches[matchId]);
                $goto("./Match",{'matchId':matchId})
            }
        }
        function handlePrev(){
            divs[current] = "hide";
            current -=1; 
            divs[current] =  " ";
        }
        function handleNext(){
            divs[current] = "hide";
            current +=1; 
            divs[current] = " ";
        }
</script>
<style>
    p,label{
        color:white;
    }
    #prev{
        position:relative;
        left:25vw;
        float:left;
    }
    #next{
        position:relative;
        right:25vw;
        float:right;
    }
    .hide{
        display:none;
    }
    ul{
        width:35%;
        color:#c7ffd8;
        margin:0 auto;    
    }
    li{
        list-style-type:none;
        background-color :#92A8D1;
        padding:1rem 0;
        margin:1rem;
    }
</style>

<section>
    <div class={divs[0]}>
        <label>
            Home Team <input type="text" bind:value={$matches[matchId].homeTeam.name} />
        </label>
        
        <label>
            Away Team <input type="text" bind:value={$matches[matchId].awayTeam.name} />
        </label>
    </div>
    
    <div class={divs[1]} >
        {#if ($matches[matchId].homeTeam.name && $matches[matchId].awayTeam.name)}
            <div>
                <p>Toss won By :</p>
                <label>
                    <input type=radio bind:group={toss} value={$matches[matchId].homeTeam.name} checked>
                    {$matches[matchId].homeTeam.name}
                </label>
                
                <label>
                    <input type=radio bind:group={toss} value={$matches[matchId].awayTeam.name}>
                    {$matches[matchId].awayTeam.name}
                </label>
            </div>
        {/if}
    </div>
    
    <div class={divs[2]}>
        {#if toss}
            <p>{toss} won the toss and Elected to</p>
            <label>
                <input type=radio bind:group={choseTo} value={BATTING}/>
                Bat
            </label>
            <label>
                <input type=radio bind:group={choseTo} value={BOWLING}/>
                Bowl
            </label>
        {/if}
    </div>
    
    
    <div class={divs[3]}>
        <p>Home Team</p>
        <AddPlayers bind:team={$matches[matchId].homeTeam.team}/>
        <ul>
            {#each $matches[matchId].homeTeam.team as player}
                <li>{player}</li>
            {/each}
        </ul>
    </div>
    
    <div class={divs[4]}>
        <p>Away Team</p>
        <AddPlayers bind:team={$matches[matchId].awayTeam.team}/>
        <ul>
            {#each $matches[matchId].awayTeam.team as player}
                <li>{player}</li>
            {/each}
        </ul>

        <button on:click={startMatch}>
            Start Match
        </button>
    </div>
    <button id="prev" class="{current==0 ? 'hide' : ''}" on:click={handlePrev}>Prev</button>
    <button id="next" class="{current==4 ? 'hide' : ''}" on:click={handleNext}>Next</button>
</section>
