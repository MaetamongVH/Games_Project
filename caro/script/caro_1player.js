// @ts-nocheck
const container = document.querySelector('.container');
const nodes = document.querySelectorAll(".rows");
const board = document.getElementById("board");
const virtualBoard = [];
console.log(board)
console.log(nodes);
// board.firstElementChild.children[y+h].children[x].classList.add("won-2");
console.log(board.firstElementChild.children[0].children[0]);
const size = nodes.length;
// TO PLAYER CHOOSE FIRST TURN PLAY
//This is symbol default (Player can set again) by DOM
let symbolHuman = "x";
let symbolBot = "o";
let human = 1;
let bot = 0;
let player = 1;
var currentPos = {};
const check = [];
const result = document.querySelector('#result-game');
const tick = document.getElementById("tick-sound");
const wonSound = document.getElementById("won-sound");
const loseSound = document.getElementById("lose-sound");

// function chooseX() {
//     symbolHuman = 'x';
//     symbolBot = 'o';
// }
// function chooseO() {
//     symbolHuman = 'o';
//     symbolBot = 'x';
// }
// function humanFirst() {
//     player = 1;
//     console.log(player);
// }
// function botFirst() {
//     player = 0;
//     console.log(player);
// }
// function startPlay() {
//     if (human > -1 && bot > -1) {
//         if (player === human) {
//             document.getElementById('chooseSymbol').remove();
//             container.setAttribute('style', 'display:block');
//         } else if (player === bot) {
//             document.getElementById('chooseSymbol').remove();
//             container.setAttribute('style', 'display:block');
//             nodes[6].children[12].innerHTML = symbolBot;
//             virtualBoard[6][12] = bot;
//         }
//     }
// }
for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].childElementCount; j++) {
        // console.log(nodes[i].children[j]);
        const element = nodes[i].children[j];
        element.addEventListener('click', () => {
            if (virtualBoard[i][j] != 0 && virtualBoard[i][j] != 1 && result.innerHTML === "") {
                virtualBoard[i][j] = human;
                element.innerHTML = symbolHuman;
                tick.play();
                // console.log(i ,j);
                // console.log(virtualBoard[i][j])
                currentPos = {
                    x: j,
                    y: i
                }
                check.push(currentPos);
                const score = evalScore(virtualBoard, bot);
                // console.log(virtualBoard);
                // let maxP = maxPos(score);
                // console.log(minimax_depth(virtualBoard, 0, bot));
                botPlay();
                checkComboWin();
                // console.log(alpha_beta_test(virtualBoard, -Infinity, Infinity, 0, bot));
                // botPlay_alpha();
                // console.log(virtualBoard)
            }

        })
    }
}
const redo = function()
{
    if(check.length > 0)
    {
        const lastBot = check.pop();
        const lastHuman = check.pop();
        nodes[lastBot.y].children[lastBot.x].innerHTML = '';
        nodes[lastHuman.y].children[lastHuman.x].innerHTML = '';
        virtualBoard[lastBot.y][lastBot.x] = -1;
        virtualBoard[lastHuman.y][lastHuman.x] = -1;
        result.innerHTML = "";
        board.setAttribute("style", "filter:blur(0px)");
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].childElementCount; j++) {
                const element = nodes[i].children[j];
                element.classList.remove("won-1");
                element.classList.remove("won-2");
            }
        }
    }
}
const restart = function () {
    result.innerHTML = "";
    board.setAttribute("style", "filter:blur(0px)");
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].childElementCount; j++) {
            const element = nodes[i].children[j];
            element.innerHTML = '';
            element.classList.remove("won-1");
            element.classList.remove("won-2");
        }
    }
    memset2d(virtualBoard, -1, size);
}
const startGame = function()
{

}
const botPlay = function () {
    const currentScore = evalScore(virtualBoard, bot);
    const bestPos = maxPos(currentScore).pos;
    check.push(bestPos);
    nodes[bestPos.y].children[bestPos.x].innerHTML = symbolBot;
    tick.play();
    virtualBoard[bestPos.y][bestPos.x] = bot;
}
const botPlay_alpha = function () {
    const bestPos = minimax_depth(virtualBoard, 0, bot);
    // console.log(bestPos);
    check.push(bestPos);
    nodes[bestPos.y].children[bestPos.x].innerHTML = symbolBot;
    currentPos = bestPos;
    virtualBoard[bestPos.y][bestPos.x] = bot;
}

function memset2d(array, value, size) {
    for (let i = 0; i < size; i++) {
        array[i] = [];
        for (let j = 0; j < size; j++) {
            array[i].push(value);
        }
    }
}
memset2d(virtualBoard, -1, size);

const checkEmpty = function (board) {
    let length = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === -1) length++;
        }
    }
    return length;
}
const checkRowsPoint = function (board, x, y) {
    let count = 1;
    let pivot = board[y][x];
    if (pivot === board[y][x + 1]) count++;
    if (pivot === board[y][x + 2]) count++;
    if (pivot === board[y][x + 3]) count++;
    if (pivot === board[y][x + 4]) count++;
    if (count === 5) return true;
    return false;
}
const checkColumnsPoint = function (board, x, y) {
    let pivot = board[y][x];
    let count = 1;
    if (pivot === board[y + 1][x]) count++;
    if (pivot === board[y + 2][x]) count++;
    if (pivot === board[y + 3][x]) count++;
    if (pivot === board[y + 4][x]) count++;
    if (count === 5) return true;
    return false;
}
const checkDiagonalsPoint = function (board, x, y) {
    let count1 = 1;
    let count2 = 1;
    let pivot = board[y][x];
    if (pivot === board[y + 1][x + 1]) count1++;
    if (pivot === board[y + 2][x + 2]) count1++;
    if (pivot === board[y + 3][x + 3]) count1++;
    if (pivot === board[y + 4][x + 4]) count1++;
    if (pivot === board[y + 1][x - 1]) count2++;
    if (pivot === board[y + 2][x - 2]) count2++;
    if (pivot === board[y + 3][x - 3]) count2++;
    if (pivot === board[y + 4][x - 4]) count2++;
    if (count1 === 5 || count2 === 5) return true;
    return false;
}
const checkComboWin = function () {
    //CHECK ROWS
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size - 4; x++) {
            for(let k = 0; k < 9; k++)
            {
                if(y + k >= size) break;
                if(virtualBoard[y][x] === virtualBoard[y+k][x]) count1++;
                else break;
            }
            if(count1 >= 5) 
            {
                for(let h = 0; h < count1; h++)
                {
                    if(virtualBoard[y][x] === human) 
                    {
                        result.innerHTML = `<div>You Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        wonSound.play();
                        nodes[y+h].children[x].classList.add("won-1");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                    else if(virtualBoard[y][x] === bot) 
                    {
                        result.innerHTML = `<div>You Lose</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        loseSound.play();
                        nodes[y+h].children[x].classList.add("won-2");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                }
            }
            count1 = 0;
        }
    }
    //CHECK COLUMNS

    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size; x++) {
            for(let k = 0; k < 9; k++)
            {
                if(x+k >= 25) break;
                if(virtualBoard[y][x] === virtualBoard[y][x+k]) count2++;
                else break;
            }
            if(count2 >= 5) 
            {
                for(let h = 0; h < count2; h++)
                {
                    if(virtualBoard[y][x] === human) 
                    {
                        result.innerHTML = `<div>You Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        wonSound.play();
                        nodes[y].children[x+h].classList.add("won-1");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                    else if(virtualBoard[y][x] === bot) 
                    {
                        result.innerHTML = `<div>You Lose</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        loseSound.play();
                        nodes[y].children[x+h].classList.add("won-2");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                }
            }
            count2 = 0;
        }
    }
    
    //CHECK CROSS DOWN
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size - 4; x++) {
            for(let k = 0; k < 9; k++)
            {
                if(y+k >= 25 || x +k >= 25) break;
                if(virtualBoard[y][x] === virtualBoard[y+k][x+k]) count3++;
                else break;
            }
            if(count3 >= 5) 
            {
                for(let h = 0; h < count3; h++)
                {
                    if(virtualBoard[y][x] === human) 
                    {
                        result.innerHTML = `<div>You Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        wonSound.play();
                        nodes[y+h].children[x+h].classList.add("won-1");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                    else if(virtualBoard[y][x] === bot) 
                    {
                        result.innerHTML = `<div>You Lose</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        loseSound.play();
                        nodes[y+h].children[x+h].classList.add("won-2");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                }
            }
            count3 = 0;
        }
    }
    //CHECK CROSS UP
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size - 4; x++) {
            for(let k = 0; k < 9; k++)
            {
                if(x+k >= 25 || y - k < 0) break;
                if(virtualBoard[y][x] === virtualBoard[y-k][x+k]) count4++;
                else break;
            }
            if(count4 >= 5) 
            {
                for(let h = 0; h < count4; h++)
                {
                    if(virtualBoard[y][x] === human) 
                    {
                        result.innerHTML = `<div>You Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        wonSound.play();
                        nodes[y-h].children[x+h].classList.add("won-1");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                    else if(virtualBoard[y][x] === bot) 
                    {

                        result.innerHTML = `<div>You Lose</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
                        loseSound.play();
                        nodes[y-h].children[x+h].classList.add("won-2");
                        board.setAttribute("style", "filter:blur(3px)");
                    }
                }
            }
            count4 = 0;
        }
    }    
}
const checkEnd = function (board, x, y) {
    if (checkColumnsPoint(board, x, y) || checkRowsPoint(board, x, y) || checkDiagonalsPoint(board, x, y)) return true;
}
const checkRows = function (board, x, y) {
    let count = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size - 4; x++) {
            count = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y][x + i] == player) count++;
            }
            if (count === 5) return player;
        }
    }
}
const checkColumns = function (board, player) {
    let count = 0;
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size; x++) {
            count = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y + i][x] == player) count++;
            }
            if (count === 5) return player;
        }
    }
}
const checkDiagonals = function (board, player) {
    let count1 = 0;
    let count2 = 0;
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size - 4; x++) {
            count1 = 0;
            count2 = 0;
            for (let i = 0; i < 5; i++) {
                // checkCrossUp
                if (board[y + i][x - i] === player) count1++;
                //checkCrossDown
                if (board[y + i][x + i] === player) count2++;
            }
            if (count1 === 5 || count2 === 5) return player;
        }
    }

}

const resultGame = function (board, player) {
    if (checkRows(board, player) === player ||
        checkColumns(board, player) === player ||
        checkDiagonals(board, player) === player) return player;
    return false;
}

let AScore = [0, 4, 27, 256, 1458];
let DScore = [0, 2, 9, 99, 769];
const maxDepth = 6;
const maxMove = 4;
const evalScore = function (board, player) {
    let cHuman = 0;
    let cBot = 0;
    let score = [];
    memset2d(score, 0, size);
    //CHECK ROWS
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size - 4; x++) {
            cHuman = 0;
            cBot = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y][x + i] == human) cHuman++;
                else if (board[y][x + i] == bot) cBot++;
            }
            if (cHuman * cBot == 0 && cHuman != cBot) {
                for (let i = 0; i < 5; i++) {
                    if (board[y][x + i] == -1) {
                        if (cHuman == 0) {
                            if (player == 1) score[y][x + i] += DScore[cBot];
                            else score[y][x + i] += AScore[cBot];
                        } else if (cBot == 0) {
                            if (player == 0) score[y][x + i] += DScore[cHuman];
                            else score[y][x + i] += AScore[cHuman];
                        }
                    }
                }
            }
        }
    }
    //CHECK COLUMNS
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size; x++) {
            cHuman = 0;
            cBot = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y + i][x] == human) cHuman++;
                else if (board[y + i][x] == bot) cBot++;
            }
            if (cHuman * cBot == 0 && cHuman != cBot) {
                for (let i = 0; i < 5; i++) {
                    if (board[y + i][x] == -1) {
                        if (cHuman == 0) {
                            if (player == 1) score[y + i][x] += DScore[cBot];
                            else score[y + i][x] += AScore[cBot];
                        } else if (cBot == 0) {
                            if (player == 0) score[y + i][x] += DScore[cHuman];
                            else score[y + i][x] += AScore[cHuman];
                        }
                    }
                }
            }
        }
    }
    //CHECK CROSS DOWN
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size - 4; x++) {
            cHuman = 0;
            cBot = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y + i][x + i] == human) cHuman++;
                else if (board[y + i][x + i] == bot) cBot++;
            }
            if (cHuman * cBot == 0 && cHuman != cBot) {
                for (let i = 0; i < 5; i++) {
                    if (board[y + i][x + i] == -1) {
                        if (cHuman == 0) {
                            if (player == 1) score[y + i][x + i] += DScore[cBot];
                            else score[y + i][x + i] += AScore[cBot];
                        } else if (cBot == 0) {
                            if (player == 0) score[y + i][x + i] += DScore[cHuman];
                            else score[y + i][x + i] += AScore[cHuman];
                        }
                    }
                }
            }
        }
    }
    //CHECK CROSS UP
    for (let y = 0; y < size - 4; y++) {
        for (let x = 0; x < size - 4; x++) {
            cHuman = 0;
            cBot = 0;
            for (let i = 0; i < 5; i++) {
                if (board[y + i][x - i] == human) cHuman++;
                else if (board[y + i][x - i] == bot) cBot++;
            }
            if (cHuman * cBot == 0 && cHuman != cBot) {
                for (let i = 0; i < 5; i++) {
                    if (board[y + i][x - i] == -1) {
                        if (cHuman == 0) {
                            if (player == 1) score[y + i][x - i] += DScore[cBot];
                            else score[y + i][x - i] += AScore[cBot];
                        } else if (cBot == 0) {
                            if (player == 0) score[y + i][x - i] += DScore[cHuman];
                            else score[y + i][x - i] += AScore[cHuman];
                        }
                    }
                }
            }
        }
    }
    return score;
}

const maxPos = function (newScore) {
    let max = {
        score: 0,
        pos: {
            x: 0,
            y: 0
        }
    };
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (newScore[i][j] >= max.score) {
                max.score = newScore[i][j];
                max.pos = {
                    x: j,
                    y: i
                };
            }
        }
    }
    return max;
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
// Array.prototype.findMaxNumbers = function(number)
// {
//     const newArray = [];
//     const check = [];
//     memset2d(check, -1, )
//     for(let k = 0; k < number; k++)
//     {
//         for(let i = 0; i < this.length; i++)
//         {
//             for(let j = 0; j < this[i].length; j++) {
//                 if()
//             }
//         }
//     }
// }

const minimax_depth = function(evalBoard, depth, player)
{
    const score = evalScore(evalBoard, player);
    // const newScore = score.slice(0);
    if(depth < maxDepth) 
    {
        const values = [];
        for(let i = 0; i < maxMove; i++)
        {
            const value = maxPos(score);
            values.push(value);
            score[value.pos.y][value.pos.x] = 0;
        }
        // console.log(values);
        // console.log(score);
        for(let i = 0; i < values.length; i++)
        {
            const newBoard = evalBoard.slice(0);
            console.log(newBoard);
            newBoard[values[i].pos.y][values[i].pos.x] = player;
            values[i].score = minimax_depth(newBoard, depth+1, (player === human) ? bot : human);
        }
        if(player === bot)
        {
            const max = values.maxBy(v => {
                return v.score;
            })
            if(depth === 0) return max.pos;
            else return max.score;
        }
        else (player === human)
        {
            const min = values.minBy(v =>  {
                return v.score;
            })
            return min.score;
        }
    }
    else
    {
        return maxPos(score).score;
    }

}

const alpha_beta = function (alpha, beta, depth, player) {
    if (player === bot) maxValue(virtualBoard, alpha, beta, depth);
    else if (player === human) minValue(virtualBoard, alpha, beta, depth);
}

const maxValue = function (evalBoard, alpha, beta, depth) {
    // console.log(evalBoard);
    const score = evalScore(evalBoard, bot);
    console.log(score);
    const value = maxPos(score).score;
    if (depth >= maxDepth) return value;
    const moves = [];
    for (let i = 0; i < maxMove; i++) {
        const move = maxPos(score);
        if (move === null || move === undefined) break;
        moves.push(move);
        score[move.pos.y][move.pos.x] = 0;
    }
    let v = -Infinity;
    for (let i = 0; i < moves.length; i++) {
        const newBoard = evalBoard.slice(0);
        newBoard[moves[i].pos.y][moves[i].pos.x] = player;
        v = Math.max(v, minValue(newBoard, alpha, beta, depth + 1));
        // console.log(v);
        if (v >= beta || checkEnd(newBoard, moves[i].pos.x, moves[i].pos.y)) {
            // bestPos = moves[i].pos;
            return v;
        }
        alpha = Math.max(v, alpha);
    }
    // if(depth === 0) return bestPos;
    return v;
}

const minValue = function (evalBoard, alpha, beta, depth) {
    const score = evalScore(evalBoard, human);
    const value = maxPos(score).score;
    if (depth >= maxDepth) return value;
    const moves = [];
    for (let i = 0; i < maxMove; i++) {
        const move = maxPos(score);
        if (move === null || move === undefined) break;
        moves.push(move);
        score[move.pos.y][move.pos.x] = 0;
    }
    let v = Infinity;
    for (let i = 0; i < moves.length; i++) {
        const newBoard = evalBoard.slice(0);
        newBoard[moves[i].pos.y][moves[i].pos.x] = player;
        v = Math.min(v, maxValue(newBoard, alpha, beta, depth + 1, bot));
        // console.log(v);
        if (v <= alpha || checkEnd(newBoard, moves[i].pos.x, moves[i].pos.y)) {
            return v;
        }
        beta = Math.min(v, beta);
    }
    return v;
}

const alpha_beta_test = function (board, alpha, beta, depth, player) {

    // for(let i = 0; i < moves.length; i++)
    // {
    //     const newBoard = board.slice(0);
    //     newBoard[moves[i].pos.y][moves[i].pos.x] = player;
    //     if(player === bot)
    //     {
    //         moves[i].score = Math.max(moves[i].score, alpha_beta_test(newBoard, depth + 1, human));
    //     }
    //     else {
    //         moves[i].score = Math.min(moves[i].score, alpha_beta_test(newBoard, depth + 1, bot));
    //     }
    // }
    //     if(player === bot)
    // {
    //     const max = moves.maxBy(v => {
    //         return v.score;
    //     })
    //     console.log(max);
    //     if(depth === 0)
    //     {
    //         return max.pos;
    //     }
    //     else return max.score; 
    // }
    // else if(player === human)
    // {
    //     const min = moves.minBy(v => {
    //         return v.score;
    //     })
    //     if(depth === 0)
    //     {
    //         return min.pos;
    //     }
    //     else return min.score;
    // }

    if (player === bot) {
        const score = evalScore(board, player);
        const value = maxPos(score).score;
        if (depth >= maxDepth) return value;
        const moves = [];
        for (let i = 0; i < maxMove; i++) {
            const move = maxPos(score);
            if (move === null || move === undefined) break;
            moves.push(move);
            score[move.pos.y][move.pos.x] = 0;
        }
        let v = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            const newBoard = board.slice(0);
            newBoard[moves[i].pos.y][moves[i].pos.x] = player;
            v = Math.max(v, alpha_beta_test(newBoard, alpha, beta, depth + 1, human));
            // console.log(v);
            if (v >= beta || checkEnd(newBoard, moves[i].pos.x, moves[i].pos.y)) {
                bestPos = moves[i].pos;
                return v;
            }
            alpha = Math.max(v, alpha);
        }
        return v;
    } else if (player === human) {
        const score = evalScore(board, player);
        console.log();
        const value = maxPos(score).score;
        if (depth >= maxDepth) return value;
        const moves = [];
        for (let i = 0; i < maxMove; i++) {
            const move = maxPos(score);
            if (move === null || move === undefined) break;
            moves.push(move);
            score[move.pos.y][move.pos.x] = 0;
        }
        let v = Infinity;
        for (let i = 0; i < moves.length; i++) {
            const newBoard = board.slice(0);
            newBoard[moves[i].pos.y][moves[i].pos.x] = player;
            v = Math.min(v, alpha_beta_test(newBoard, alpha, beta, depth + 1, bot));
            // console.log(v);
            if (v <= alpha || checkEnd(newBoard, moves[i].pos.x, moves[i].pos.y)) {
                return v;
            }
            beta = Math.min(v, beta);
        }
        return v;
    }

}
// if (player === bot) {
//     let max = {};
//     max.v = -Infinity;
//     for (let i = 0; i < values.length; i++) {
//         const newBoard = board.slice(0);
//         newBoard[values[i].pos.y][values[i].pos.x] = player;
//         max.v = alpha_beta_test(newBoard, alpha, beta, depth + 1, human);
//         if(alpha_beta_test(newBoard, alpha, beta, depth + 1, human) > max.v)
//         {
//             max.v = alpha_beta_test(newBoard, alpha, beta, depth + 1, human);
//             max.pos = {x : values[i].pos.x, y : values[i].pos.y};
//         }
//         // v = Math.max(v, alpha_beta_test(newBoard, alpha, beta, depth + 1, human));
//         if (max.v >= beta) 
//         {
//             if(depth === 0) return max.pos;
//             return max.v;
//         }
//         alpha = Math.max(max.v, alpha);
//     }
//     if(depth === 0) return max.pos;
//     return max.v;
// }
// else if (player === human) {
//     let min = {};
//     min.v = Infinity;
//     for (let i = 0; i < values.length; i++) {
//         const newBoard = board.slice(0);
//         newBoard[values[i].pos.y][values[i].pos.x] = player;
//         if(alpha_beta_test(newBoard, alpha, beta, depth + 1, human) < min.v)
//         {
//             min.v = alpha_beta_test(newBoard, alpha, beta, depth + 1, human);
//             min.pos = {x : values[i].pos.x, y : values[i].pos.y};
//         }
//         // v = Math.max(v, alpha_beta_test(newBoard, alpha, beta, depth + 1, human));
//         if (min.v <= alpha) 
//         {
//             if(depth === 0) return min.pos;
//             return min.v;
//         }
//         beta = Math.min(min.v, beta);
//     }
//     if(depth === 0) return min.pos;
//     return min.v;
// }