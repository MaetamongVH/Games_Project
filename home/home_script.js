const btnSound = document.getElementById("js-btnSound");
function loadAssetsTTT()
{
    btnSound.play();
        // Handler for .ready() called.
        window.setTimeout(function () {
            location.href = "/tic_tac_toe/html/mode_play_ttt.html";
        }, 1500);
}
function loadAssetsCaro()
{
    btnSound.play();
        // Handler for .ready() called.
        window.setTimeout(function () {
            location.href = "/caro/html/mode_play_caro.html";
        }, 1500);
}
function load1PlayerTTT()
{
    btnSound.play();
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "/tic_tac_toe/html/ttt_1player.html";
    }, 1500);
}
function load2PlayersTTT()
{
    btnSound.play();
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "/tic_tac_toe/html/ttt_2players.html";
    }, 1500);
}
function load1PlayerCaro()
{
    btnSound.play();
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "/caro/html/caro_1player.html";
    }, 1500);
}
function load2PlayersCaro()
{
    btnSound.play();
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "/caro/html/caro_2players.html";
    }, 1500);
}
setInterval(()=>{
    document.getElementById("background-sound").play();
}, -1000);