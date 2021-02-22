import { writable } from 'svelte/store';

function createTeam() {
	const { subscribe, set, update } = writable({name:"",team:[],tossWon:false});

	return {
		subscribe,
		set,
		update,
		addPlayer: (playerName) => update(name => name.team.push([layerName])),
	};
}


export const homeTeam = createTeam();
export const awayTeam = createTeam();