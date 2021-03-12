import { writable } from 'svelte/store'
import {getAllMatches,addNewMatch} from "../MatchesDB.js"



export let matches = (() => {
    const {subscribe,set,update} = writable([]);
    getAllMatches().then(r => {
        set(r);
    });

    async function addMatch(store){
            let id = store.length;
            let newMatch = {id:id,
                homeTeam : {name:"",team:[],tossWon:false},
                awayTeam : {name:"",team:[],tossWon:false},
                result:"",
                Innings : {
                    First : {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]},
                    Second: {totalScore:0,wicketsDown:0,oversCompleted:0,runsPerBall:[],wickets:[]}  
                
                }
            }
            newMatch.id = id
            store = [...store,newMatch]
            let addRequest = await addNewMatch(store[id])
            return new Promise(function(resovle,reject){

                if(addRequest=="success"){
                    console.log("MAtch added SUccessfully iniside store");
                    resovle("added")
                }
            });
    }

    return {subscribe,set,update,addMatch};
})();


// const store = writable([]);
// getAllMatches().then(r => store.set(r));
// export const matches = store;