// @ts-nocheck
var origBoard;
const huPlayer1 = 'o';
const huPlayer2 = 'x';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const table = document.getElementById("table");
const cells = document.querySelectorAll('.cell');
const result = document.getElementById("result-game");
//SOUND
const tick = document.getElementById("tick-sound");
const wonSound = document.getElementById("won-sound");
const tieSound = document.getElementById("tie-sound");
startGame();
let count = 0;

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	table.style.filter = "blur(0px)";
	result.innerHTML = "";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].classList.remove("won-1");
		cells[i].classList.remove("won-2");
		cells[i].classList.remove("tie");
		cells[i].addEventListener('click', turnClick, false);
	}
}

let changeTurn = true;

function turnClick(square) {

	if (typeof origBoard[square.target.id] == 'number') {
		if (changeTurn) {
			turn(square.target.id, huPlayer1)
		} else turn(square.target.id, huPlayer2)
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	tick.play();
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon);
	else checkTie();
	changeTurn = !changeTurn

}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {
				index: index,
				player: player
			};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	table.style.filter = "blur(3px)";
	if (gameWon.player == huPlayer1) {
		result.innerHTML = `<div>Player 1 Won</div>
	<button onClick="startGame()">Replay</button>`;
	wonSound.play();
	}
	else if (gameWon.player == huPlayer2) {
		result.innerHTML = `<div>Player 2 Won</div>
	<button onClick="startGame()">Replay</button>`;
	wonSound.play();
	}
	for (let index of winCombos[gameWon.index]) {
		if (gameWon.player === huPlayer1) {
			document.getElementById(index).classList.add("won-1")
		} else if (gameWon.player === huPlayer2) {
			document.getElementById(index).classList.add("won-2")
		}

	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	count = 0;

}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

async function checkTie() {
	count++;
	if (count === 9) {
			result.innerHTML = `<div>Tie game</div>
		<button onClick="startGame()">Replay</button>`
		tieSound.play();
		table.style.filter = "blur(3px)";
		cells.forEach(e => {
			e.classList.add("tie");
		})
		count = 0;
	}
}