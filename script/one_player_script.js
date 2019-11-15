//@ts-nocheck
// DOM board from HTML
const items = document.querySelectorAll('.item');
const board = document.querySelector('.board');


// const virtualBoard = Array.from(Array(9).keys());
// Create and set all element in a virtual board  is -1
const virtualBoard = [];
const memset = function (array, value, size) {
    for (let i = 0; i < size; i++) {
        array[i] = value;
    }
}

memset(virtualBoard, -1, items.length);
// console.log(virtualBoard);

// TO PLAYER CHOOSE FIRST TURN PLAY
const firstPlayer = 1//need set in html
//This is symbol default (Player can set again) by DOM
const symbolHuman = "X";
const symbolBot = "O";
const human = 1;
const bot = 0;
let player = firstPlayer;

const result = document.querySelector('.result-game');

items.forEach((e, i) => {
    e.addEventListener('click', () => {
        if (checkEmpty(virtualBoard).length && virtualBoard[i] === -1) {
            e.innerHTML = `<div class="player display-player">${symbolHuman}</div>`;
            virtualBoard[i] = human;            
            if (checkEmpty(virtualBoard).length > 0) {
                botPlay(minimax_depth(virtualBoard, 0, bot));
            }    
            setTimeout(endGame, 2000);
        }
    });
})
const endGame = function()
{
    if (resultGame(virtualBoard, human) == 1) {
        //NEVER HAPPEN :)
        result.innerHTML = `<div>You Won :> </div>
        <a href="/html/one_player_view.html" id="replay">REPLAY<a>`;
        board.remove();
    }
    else if (resultGame(virtualBoard, bot) === bot) {
        result.innerHTML = `<div>You Are Foolish :)</div>
                <a href="/html/one_player_view.html" id="replay">REPLAY<a>`;
        board.remove();
    }
    else if (checkEmpty(virtualBoard).length == 0 && resultGame(virtualBoard, bot) === false && resultGame(virtualBoard, human) === false)
    {
        result.innerHTML = `<div>Tie!!!</div>
        <a href="/html/one_player_view.html" id="replay">REPLAY<a>`;
        board.remove();

    }
}


const botPlay = function (bestPosition) {
    items[bestPosition].innerHTML = `<div class="player display-player">${symbolBot}</div>`;
    virtualBoard[bestPosition] = bot;
    
}




const checkEmpty = function (virtualBoard) {
    return virtualBoard.filter(e => e == -1);
}


//This is function to check score of game

const resultGame = function (array, player) {
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
    return false;
}


//Method to find max score and max position
Array.prototype.maxBy = function (callback) {
    let max = -Infinity;
    let result;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) > max) {
            max = callback(this[i]);
            result = i;
        }
    }
    return this[result];
}
Array.prototype.minBy = function (callback) {
    let min = Infinity;
    let result;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) < min) {
            min = callback(this[i]);
            result = i;
        }
    }
    return this[result];
}
function minimax_depth(board, depth, player) {
    const emptyPos = checkEmpty(board).length;
    if (resultGame(board, human) === false && resultGame(board, bot) === false && emptyPos > 0) {
        const values = [];
        for (let i = 0; i < items.length; i++) {
            const newBoard = board.slice(0); // Clone a new board (!!newBoard == board is WRONG!!);
            if (newBoard[i] !== -1) continue;
            newBoard[i] = player;
            const value = minimax_depth(newBoard, depth + 1, (player === bot) ? human : bot);
            values.push({
                pos: i,
                cost: value
            });
        }

        if (player === bot) {
            const max = values.maxBy((value) => {
                return value.cost;
            })
            if (depth === 0) {
                return max.pos;
            }
            else {
                return max.cost;
            }
        }
        else if (player === human) {
            const min = values.minBy((value) => {
                return value.cost;
            })
            if (depth === 0) {
                return min.pos;
            }
            else {
                return min.cost;
            }
        }
    }
    else if (resultGame(board, human) === human) {
        return depth - 10;
    }
    else if (resultGame(board, bot) === bot) {
        return 10 - depth;
    }
    else if (emptyPos === 0) {
        return 0;
    }
}






                            // MINIMAX WITHOUT DEPTH

// const minimax = function(board, player)
// {

//     if(resultGame(board, human) == 1) return -10;
//     else if(resultGame(board, bot) == 0) return 10;
//     else if(checkEmpty(board).length == 0) return 0;


//     var moves = [];
//     for(let i = 0; i < items.length; i++)
//     {
//         const newBoard = board.slice(0);
//         if(board[i] == -1)
//         {
//             newBoard[i] = player;
//             // console.log(i);
//             var move = {};
//             move.pos = i;
//             if(player == human)
//             {
//                 value = Infinity;
//                 value = Math.min(value, minimax(board, bot));
//                 move.value = value;    
//             // moves.push(value);
//             console.log(value);
//             }
//             else if(player == bot)
//             {
//                 value = -Infinity;
//                 value = Math.max(minimax(board, human));
//                 // move.index = i;
//                 move.value = value;
//                 // moves.push(value);
//                 console.log(value);
//             }
//             moves.push(move);


//         }

//     }
//     // return moves;
//     // var bestMove;
//     // if(player == bot)
//     // {
//     //     let bestValue = -Infinity;
//     //     for(let i = 0; i < move.length; i++)
//     //     {
//     //         if(moves[i].value > bestValue) 
//     //         {
//     //             bestValue = moves[i].value;
//     //             bestMove = moves[i].index;
//     //         }
//     //     }
//     // }
//     // else 
//     // {
//     //     let bestValue = Infinity;
//     //     for(let i = 0; i < move.length; i++)
//     //     {
//     //         if(moves[i].value < bestValue) 
//     //         {
//     //             bestValue = moves[i].value;
//     //             bestMove = moves[i].index;
//     //         }
//     //     }
//     // }
//     // return bestMove;

// }