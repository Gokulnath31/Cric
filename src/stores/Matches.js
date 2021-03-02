import { writable } from 'svelte/store'

// function getMatches() {
// 	const { subscribe, set, update } = writable([]);

// 	return {
// 		subscribe,
// 		newMatch: () => update(n => [...n,{matchId:0,homeTeam : {name:"",team:[],tossWon:false},awayTeam : {name:"",team:[],tossWon:false},result:"",Innings : {First : {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]},Second: {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]} }}]),
// 	};
// }
export let matches = writable([])
