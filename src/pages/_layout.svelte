<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
</head>
<script>
    import { onMount } from 'svelte';
    import { ready } from '@roxi/routify'

    import {getAllMatches} from "../MatchesDB.js"
    import {matches} from "../stores/Matches.js"

    // onMount(async () => {
	// 	$matches = await getAllMatches()
    //     console.log($matches);
    //     $ready();
    // });
    
    $:console.log("Inside _layout",$matches)
</script>
{#if $matches.length}
    <slot />
{/if}
