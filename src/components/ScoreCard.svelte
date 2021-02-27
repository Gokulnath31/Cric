<script>
    export let matchSummary;

    export let showScorecard;

    console.log(matchSummary)

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    function getStrikeRate(runsScored,ballsUsed){
        if(ballsUsed==0){
            return "-"
        }
        return ((runsScored/ballsUsed)*100).toFixed(2)
    }
    function getEconomy(overs,runs){
        if(overs=="0.0"){
            return "-"
        }
        let ballsBowled = parseInt(overs.split(".")[0])*6 +  parseInt(overs.split(".")[1])
        return ((runs/ballsBowled)*6).toFixed(2)
    }
</script>
<style>
    .hide{
        display: none;
    }
</style>
<main class="{!showScorecard?'hide' : ''}">

    <button on:click={() => showScorecard=false}>Back</button>
    <p>First Innings:</p>

    <p>BAtting</p>
    <table>
        <tr>
            <th>Player</th>
            <th>Runs</th>
            <th>4</th>
            <th>6</th>
            <th>Balls</th>
            <th>Strike Rate</th>
        </tr>
        {#each matchSummary.First.batsmen as { playername,runsScored,fours,sixes,ballsUsed,yetToBat}}
            <tr>
                <td>{playername}</td>
                <td>{runsScored}</td>
                <td>{fours}</td>
                <td>{sixes}</td>
                <td>{ballsUsed}</td>
                <td>{getStrikeRate(runsScored,ballsUsed)}</td>
            </tr>
        {/each}
    </table>
       

    <p>Bowling</p>
    <table>
        <tr>
            <th>Player</th>
            <th>Overs</th>
            <th>Wickets</th>
            <th>Runs</th>
            <th>Economy</th>
        </tr>
        {#each matchSummary.First.bowlers as { playername,oversBowled,wicketsTaken,runsgiven}}
            {#if oversBowled!="0.0"}
                <tr>
                    <td>{playername}</td>
                    <td>{oversBowled}</td>
                    <td>{wicketsTaken}</td>
                    <td>{runsgiven}</td>
                    <td>{getEconomy(oversBowled,runsgiven)}</td>
                </tr>
            {/if}
        {/each}
    </table>



    {#if (!isEmpty(matchSummary.Second))}
        Second Innings:
        <p>BAtting</p>
        <table>
            <tr>
                <th>Player</th>
                <th>Runs</th>
                <th>4</th>
                <th>6</th>
                <th>Balls</th>
                <th>Strike Rate</th>
            </tr>
            {#each matchSummary.Second.batsmen as { playername,runsScored,fours,sixes,ballsUsed,yetToBat}}
                <tr>
                    <td>{playername}</td>
                    <td>{runsScored}</td>
                    <td>{fours}</td>
                    <td>{sixes}</td>
                    <td>{ballsUsed}</td>
                    <td>{getStrikeRate(runsScored,ballsUsed)}</td>
                </tr>
            {/each}
        </table>
        <p>Bowling</p>
        <table>
            <tr>
                <th>Player</th>
                <th>Overs</th>
                <th>Wickets</th>
                <th>Runs</th>
                <th>Economy</th>
            </tr>
            {#each matchSummary.Second.bowlers as { playername,oversBowled,wicketsTaken,runsgiven}}
                <tr>
                    <td>{playername}</td>
                    <td>{oversBowled}</td>
                    <td>{wicketsTaken}</td>
                    <td>{runsgiven}</td>
                    <td>{getEconomy(oversBowled,runsgiven)}</td>
                </tr>
            {/each}
        </table>
    {:else}
        <p>Innings is about to start
    {/if}

</main>