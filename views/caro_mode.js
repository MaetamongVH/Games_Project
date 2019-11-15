
const modeScreen = `
<main class="main">
        <div class="menu">
                <div class="choice" id="one-player">
                        <a href="/html/one_player_view.html" id="js-btnOnePlayer" class="game" onclick="displayEffect()">
                            <span>1</span>
                            <span>P</span><span>L</span><span>A</span><span>Y</span><span>E</span><span>R</span>
                        </a>
                </div>
                <div class="choice" id="two-players" >
                        <a href="/html/two_players_view.html" class="game" id="js-btnTwoPlayer" onclick="displayEffect()">
                            <span>2</span>
                            <span>P</span><span>L</span><span>A</span><span>Y</span><span>E</span><span>R</span><span>S</span>
                        </a>
                </div>
        </div>
    </main>
`
export default {
    content : modeScreen
}
