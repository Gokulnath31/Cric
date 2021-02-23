<script>
    import {homeTeam,awayTeam} from "../stores/teamStore.js"
    $:{
        console.log("HomeTeam",$homeTeam.name,$homeTeam.tossWon,$homeTeam.choseTo)
        console.log("AwayTeam",$awayTeam.name,$awayTeam.tossWon,$awayTeam.choseTo)
    }
</script>

<h2>{$homeTeam.name} VS {$awayTeam.name}</h2>
<p>{$homeTeam.tossWon? $homeTeam.name : $awayTeam.name} won the Toss and Elected to {$homeTeam.tossWon? $homeTeam.choseTo : $awayTeam.choseTo}</p>