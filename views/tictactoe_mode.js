import setScreen from './index.js';
import tictactoe_1player from './tictactoe_1player.js';
const modeScreen = `
<link rel="stylesheet" href="../assets/css/home_style.css">
<main class="main">
        <div class="menu">
                <div class="choice" id="one-player">
                        <button id="js-btnOnePlayer" class="game">
                            <span>1</span>
                            <span>P</span><span>L</span><span>A</span><span>Y</span><span>E</span><span>R</span>
                        </button>
                </div>
                <div class="choice" id="two-players" >
                        <button id="js-btnTwoPlayer" class="game">
                            <span>2</span>
                            <span>P</span><span>L</span><span>A</span><span>Y</span><span>E</span><span>R</span><span>S</span>
                        </button>
                </div>
        </div>
    </main>
    <script src="../script/home_script.js" type="module"></script>

`
function onload()
{
    document.getElementById("js-btnOnePlayer").addEventListener('click', () => {
        setScreen(tictactoe_1player);
    })
}
export default {
    content : modeScreen,
    onload : onload
}