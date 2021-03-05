<script>
	
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	console.log(routes);
</script>

<main>
	<Router config={{useHash: true}} {routes}/>
</main>

<style>
	:root{
        background-color:#001f3f;
        color:#7FDBFF; 
    }
	main {
		text-align: center;
		padding: 1em 0;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>