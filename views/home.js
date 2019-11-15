import setScreen from './index.js';
import ticTacToeMode from './tictactoe_mode.js';
import caroMode from './caro_mode.js'
const homeScreen = `
<link rel="stylesheet" href="../assets/css/home_style.css">

<main class="main">
    <div id="title">
        <span>C</span><span>H</span><span>O</span><span>O</span><span>S</span><span>E</span>
        <span>A</span>
        <span>G</span><span>A</span><span>M</span><span>E</span>

    </div>
    <div class="menu">
        <div class="choice">
            <button class="game" id="js-btnTicTacToeMode">
                <span>T</span><span>I</span><span>C</span>
                <span>T</span><span>A</span><span>C</span>
                <span>T</span><span>O</span><span>E</span>
            </button>
        </div>
        <div class="choice">
            <button class="game">
                <span>T</span><span>I</span><span>C</span>
                <span>T</span><span>A</span><span>C</span>
                <span>T</span><span>O</span><span>E</span>
                <span>4</span><span>x</span><span>4</span>
            </button>

        </div>
        <div class="choice">
            <button class="game" id="js-btnCaroMode">
                <span>C</span><span>A</span><span>R</span><span>O</span>
            </button>

        </div>
    </div>
</main>
<script src="../script/home_script.js" type="module"></script>
`
function onload()
{
    document.getElementById('js-btnTicTacToeMode').addEventListener('click', () => {
        setScreen(ticTacToeMode);
    });
    document.getElementById('js-btnCaroMode').addEventListener('click', () => {
        setScreen(caroMode);
    })
}

export default {
    content : homeScreen,
    onload : onload
}