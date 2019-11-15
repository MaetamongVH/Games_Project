// @ts-nocheck
const container = document.querySelector('.container');
const nodes = document.querySelectorAll(".rows");
const board = document.getElementById("board");

const virtualBoard = [];

const size = board.childElementCount;

// TO PLAYER CHOOSE FIRST TURN PLAY
//This is default symbol (Player can set again) by DOM
let symbolPlayer1 = "";
let symbolPlayer2 = "";
let player1 = 1;
let player2 = 0;
var player;
let check = [];
let currentPos = {};
const result = document.querySelector('.result-game');

function chooseX() {
    symbolPlayer1 = 'X';
    symbolPlayer2 = 'O';
    player1 = 1;
    player2 = 0;
    player = 1;
    container.setAttribute('style', 'display:block');
    document.getElementById('chooseSymbol').remove();
}

function chooseO() {
    symbolPlayer1 = 'O';
    symbolPlayer2 = 'X';
    player1 = 0;
    player2 = 1;
    player = 0;
    container.setAttribute('style', 'display:block');
    document.getElementById('chooseSymbol').remove();

}

for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].childElementCount; j++) {
        // console.log(nodes[i].children[j]);
        const element = nodes[i].children[j];
        element.addEventListener('click', () => {
            if (virtualBoard[i][j] === -1 && virtualBoard[i][j] !== player2 && virtualBoard[i][j] !== player1) {
                console.log(virtualBoard);
                if (player === player1) {
                    virtualBoard[i][j] = player1;
                    element.innerHTML = symbolPlayer1;
                    currentPos = {
                        x: j,
                        y: i
                    }
                    check.push(currentPos);
                    if (resultGame(virtualBoard, player1) === player1) {
                        result.innerHTML = `<div>Player 1 Won !!!</div>
                                            <a href="/html/caro_2players.html" id="replay">REPLAY<a>`;
                        board.remove();
                        return;
                    }
                    player = player2;
                } else if (player === player2) {
                    virtualBoard[i][j] = player2;
                    element.innerHTML = symbolPlayer2;
                    currentPos = {
                        x: j,
                        y: i
                    }
                    check.push(currentPos);
                    if (resultGame(virtualBoard, player2) === player2) {
                        result.innerHTML = `<div>Player 2 Won !!!</div>
                                            <a href="/html/caro_2players.html" id="replay">REPLAY<a>`;
                        board.remove();
                        return;
                    }
                    player = player1;
                }
            }
        })
    }
}

const redo = function () {
    const beforePos = check.pop();
    nodes[beforePos.y].children[beforePos.x].innerHTML = '';
    if (player === player2) player = player1;
    else player = player2;
    virtualBoard[beforePos.y][beforePos.x] = -1;
}
const restart = function () {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].childElementCount; j++) {
            const element = nodes[i].children[j];
            element.innerHTML = '';
        }
    }
    memset2d(virtualBoard, -1, size);
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
const checkRows = function (board, player) {
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