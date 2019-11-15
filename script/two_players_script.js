//Mode 2 players (Done)
const twoPlayersMode = function () {
    const items = document.querySelectorAll('.item');
    const board = document.querySelector('.board');
    // for(let i = 0; i < items.length; i++)
    // {
    //     const box = document.querySelector(`div[data-box="${i}"]`);
    //     console.log(box);
    // }

    const gamePlay = function () {
        let resultGame = document.querySelector('.result-game');
        let virtualBoard = [];
        let player = 1;
        let empty = [];
        let count = 0;
        const memset = function (array, value, size) {
            for (let i = 0; i < size; i++) {
                array[i] = value;
            }
        }
        memset(empty, true, items.length);
        memset(virtualBoard, 0, items.length);
        items.forEach((e, i) => {
            e.addEventListener('click', function () {
                if (player == 1 && empty[i]) {
                    e.innerHTML += `<div class="player display-player">X</div>`
                    empty[i] = false;
                    virtualBoard[i] = 1;
                    if (Won(virtualBoard, player) == 1) {
                        resultGame.innerHTML += `<div>Player 1 Won !!!</div>
                                            <a href="/html/two_players_view.html" id="replay">REPLAY<a>`;
                        board.remove();
                        return;
                    }
                    player = 2;
                    count++;
                }
                else if (player == 2 && empty[i]) {
                    e.innerHTML += `<div class="player display-player">O</div>
                                `;
                    empty[i] = false;
                    virtualBoard[i] = 2;
                    if (Won(virtualBoard, player) == 2) {
                        resultGame.innerHTML += `<div>Player 2 Won !!!</div>
                                            <a href="/html/two_players_view.html" id="replay">REPLAY<a>`;
                        board.remove();
                        return;
                    }
                    player = 1;
                    count++;
                }
                console.log(count);
                if (count == 9) {
                    resultGame.innerHTML += `<div>TIE!!!</div>
                                <a href="/html/two_players_view.html" id="replay">REPLAY<a> `;
                    board.remove();
                }
            })
        })

    }
    gamePlay();

//Conditions to end game
    const Won = function (array, player) {
        for (let i = 0; i < items.length; i += 3) {
            if (array[i] == array[i + 1] && array[i] == array[i + 2] && array[i] == player) return player;
        }
        for (let i = 0; i < 3; i++) {
            if (array[i] == array[i + 3] && array[i] == array[i + 6] && array[i] == player) return player;
        }
        for (let i = 0; i < 3; i += 2) {
            let step = 4 - i;
            if (array[i] == array[i + step] && array[i] == array[i + 2 * step] && array[i] == player) return player;
        }
    }

}
twoPlayersMode();


