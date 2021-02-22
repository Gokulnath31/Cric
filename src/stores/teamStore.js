import { writable } from 'svelte/store';

export const homeTeam = writable({name:"",team:[],tossWon:false});
export const awayTeam = writable({name:"",team:[],tossWon:false});