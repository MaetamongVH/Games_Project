// @ts-nocheck
const container = document.querySelector(".container");
const nodes = document.querySelectorAll(".rows");
const board = document.getElementById("board");
const virtualBoard = [];
console.log(board);
console.log(nodes);
// board.firstElementChild.children[y+h].children[x].classList.add("won-2");
console.log(board.firstElementChild.children[0].children[0]);
const size = nodes.length;
// TO PLAYER CHOOSE FIRST TURN PLAY
//This is default symbol (Player can set again) by DOM
let symbolPlayer1 = "o";
let symbolPlayer2 = "x";
let player1 = 1;
let player2 = 0;
var player = 1;
let check = [];
let currentPos = {};
const result = document.querySelector("#result-game");
const tick = document.getElementById("tick-sound");
const won1Sound = document.getElementById("won1-sound");
const won2Sound = document.getElementById("won2-sound");

for (let i = 0; i < nodes.length; i++) {
  for (let j = 0; j < nodes[i].childElementCount; j++) {
    // console.log(nodes[i].children[j]);
    const element = nodes[i].children[j];
    element.addEventListener("click", () => {
      if (
        virtualBoard[i][j] === -1 &&
        virtualBoard[i][j] !== player2 &&
        virtualBoard[i][j] !== player1 &&
        result.innerHTML === ""
      ) {
        tick.play();
        console.log(virtualBoard);
        if (player === player1) {
          virtualBoard[i][j] = player1;
          element.innerHTML = symbolPlayer1;
          currentPos = {
            x: j,
            y: i,
          };
          check.push(currentPos);
          checkComboWin();
          player = player2;
        } else if (player === player2) {
          virtualBoard[i][j] = player2;
          element.innerHTML = symbolPlayer2;
          currentPos = {
            x: j,
            y: i,
          };
          check.push(currentPos);
          checkComboWin();
          player = player1;
        }
      }
    });
  }
}

const checkComboWin = function () {
  //CHECK ROWS
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size - 4; x++) {
      for (let k = 0; k < 9; k++) {
        if (y + k >= size) break;
        if (virtualBoard[y][x] === virtualBoard[y + k][x]) count1++;
        else break;
      }
      if (count1 >= 5) {
        for (let h = 0; h < count1; h++) {
          if (virtualBoard[y][x] === player1) {
            result.innerHTML = `<div>Player 1 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won1Sound.play();
            nodes[y + h].children[x].classList.add("won-1");
            board.setAttribute("style", "filter:blur(3px)");
          } else if (virtualBoard[y][x] === player2) {
            result.innerHTML = `<div>Player 2 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won2Sound.play();
            nodes[y + h].children[x].classList.add("won-2");
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
      for (let k = 0; k < 9; k++) {
        if (x + k >= 25) break;
        if (virtualBoard[y][x] === virtualBoard[y][x + k]) count2++;
        else break;
      }
      if (count2 >= 5) {
        for (let h = 0; h < count2; h++) {
          if (virtualBoard[y][x] === player1) {
            result.innerHTML = `<div>Player 1 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won1Sound.play();
            nodes[y].children[x + h].classList.add("won-1");
            board.setAttribute("style", "filter:blur(3px)");
          } else if (virtualBoard[y][x] === player2) {
            result.innerHTML = `<div>Player 2 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won2Sound.play();
            nodes[y].children[x + h].classList.add("won-2");
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
      for (let k = 0; k < 9; k++) {
        if (y + k >= 25 || x + k >= 25) break;
        if (virtualBoard[y][x] === virtualBoard[y + k][x + k]) count3++;
        else break;
      }
      if (count3 >= 5) {
        for (let h = 0; h < count3; h++) {
          if (virtualBoard[y][x] === player1) {
            result.innerHTML = `<div>Player 1 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won1Sound.play();
            nodes[y + h].children[x + h].classList.add("won-1");
            board.setAttribute("style", "filter:blur(3px)");
          } else if (virtualBoard[y][x] === player2) {
            result.innerHTML = `<div>Player 2 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won2Sound.play();
            nodes[y + h].children[x + h].classList.add("won-2");
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
      for (let k = 0; k < 9; k++) {
        if (x + k >= 25 || y - k < 0) break;
        if (virtualBoard[y][x] === virtualBoard[y - k][x + k]) count4++;
        else break;
      }
      if (count4 >= 5) {
        for (let h = 0; h < count4; h++) {
          if (virtualBoard[y][x] === player1) {
            result.innerHTML = `<div>Player 1 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won1Sound.play();
            nodes[y - h].children[x + h].classList.add("won-1");
            board.setAttribute("style", "filter:blur(3px)");
          } else if (virtualBoard[y][x] === player2) {
            result.innerHTML = `<div>Player 2 Won</div>
                        <button onclick="restart()" id="restart">Replay</button>`;
            won2Sound.play();
            nodes[y - h].children[x + h].classList.add("won-2");
            board.setAttribute("style", "filter:blur(3px)");
          }
        }
      }
      count4 = 0;
    }
  }
};

const redo = function () {
  const beforePos = check.pop();
  nodes[beforePos.y].children[beforePos.x].innerHTML = "";
  if (player === player2) player = player1;
  else player = player2;
  virtualBoard[beforePos.y][beforePos.x] = -1;
};
const restart = function () {
  result.innerHTML = "";
  board.setAttribute("style", "filter:blur(0px)");
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].childElementCount; j++) {
      const element = nodes[i].children[j];
      element.innerHTML = "";
      element.classList.remove("won-1");
      element.classList.remove("won-2");
    }
  }
  memset2d(virtualBoard, -1, size);
};

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
};
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
};
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
};
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
};

const resultGame = function (board, player) {
  if (
    checkRows(board, player) === player ||
    checkColumns(board, player) === player ||
    checkDiagonals(board, player) === player
  )
    return player;
  return false;
};

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
};
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
};
