import { writable } from 'svelte/store'
import {getAllMatches} from "../MatchesDB.js"



export let matches = (() => {
    const {subscribe,set,update} = writable([]);
    getAllMatches().then(r => {
        set(r);
    });
    return {subscribe,set,update};
})();


// const store = writable([]);
// getAllMatches().then(r => store.set(r));
// export const matches = store;