import { writable } from 'svelte/store';

export const match = writable({matchId:1,
    homeTeam : {name:"",team:[],tossWon:false},
    awayTeam : {name:"",team:[],tossWon:false},
    result:"",
    Innings : {
        First : {},
        Second : {}
        // {
        //     runsPerBall:[],
        //     batsmen: [{name:"",runsScored:0,ballsTaken:58,fours:0,sixes:0,strikeRate:0} ],
        //     bowlers: [{name:"",runsGiven:0,oversBowled:4,wickets:0,economy:0}],
        //     wickets: []
        // },
    
    }
      });
    