<script>
    export let chosenPlayer;
    export let squad;
    export let type;


</script>


<select bind:value={chosenPlayer} on:change>
    {#each squad as player (player)}
        <option value={player}>
            {player.playername}
        </option>
    {/each}
</select>