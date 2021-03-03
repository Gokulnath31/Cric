
<script>
        console.log("Team")
        import {BATTING,BOWLING} from "../constants.js"
    
        import {matches} from "../stores/Matches.js"
        import AddPlayers from "../components/AddPlayers.svelte"
        

        import { params } from '@roxi/routify'
        console.log($params) 

        
        let matchId=$params.matchId;
        console.log($matches)
        let toss = ""; 
        let choseTo;
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
    
        function startMatch(){
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
                //Match redirect to matchComponent
            }
        }
</script>


<section>
    <label>
        Home Team <input type="text" bind:value={$matches[matchId].homeTeam.name} />
    </label>
    
    <label>
        Away Team <input type="text" bind:value={$matches[matchId].awayTeam.name} />
    </label>
    
    {#if ($matches[matchId].homeTeam.name && $matches[matchId].awayTeam.name)}
        <div>
            Toss won By :
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
    
    
    <AddPlayers bind:team={$matches[matchId].homeTeam.team}/>
    
    <AddPlayers bind:team={$matches[matchId].awayTeam.team}/>
    
    <button on:click={startMatch}>
        Start Match
    </button>
</section>
