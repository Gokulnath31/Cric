<script>
    export let team;
    let playerName="";
    function addPlayer(){
        if(team.length===11){
            alert('Already 11 players are there in your team');
        }
        else if (playerName==""){
            alert("Please enter a player name to add!")
        }
        else{
                team=[...team,playerName]
                console.log(playerName,team) 
        }
        playerName=""
    }
</script>

<form on:submit|preventDefault={addPlayer}>
    <input type="text" bind:value={playerName} />
    <button  type="submit">Add Player</button>
</form>