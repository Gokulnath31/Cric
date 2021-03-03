<script>
	
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	console.log(routes);
</script>

<main>
	<Router {routes}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>