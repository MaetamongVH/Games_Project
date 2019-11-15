
const onePlayer = `
<link rel="stylesheet" href="../assets/css/main.css">

<main class="main">
    <div class="result-game"></div>

    <div class="board">
        <div class="item" data-box="0"></div>
        <div class="item" data-box="1"></div>
        <div class="item" data-box="2"></div>
        <div class="item" data-box="3"></div>
        <div class="item" data-box="4"></div>
        <div class="item" data-box="5"></div>
        <div class="item" data-box="6"></div>
        <div class="item" data-box="7"></div>
        <div class="item" data-box="8"></div>
    </div>
</main>
<script src="../script/one_player_script.js" type="module"></script>
`
function onload()
{

}
export default {
    content : onePlayer,
    onload : onload
}