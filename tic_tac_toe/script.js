var origBoard;
const huPlayer1 = 'O';
const huPlayer2 = 'X';
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

const cells = document.querySelectorAll('.cell');
startGame();
let count = 0;
function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}
let changeTurn = true;
function turnClick(square) {

	if (typeof origBoard[square.target.id] == 'number') {
		if (changeTurn) {
			turn(square.target.id, huPlayer1)
		}
		else turn(square.target.id, huPlayer2)
	}
}
function turn(squareId, player) {
	checkTie();
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
	changeTurn = !changeTurn


}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer1 ? "#16516d" : "#ffbc58";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	count = 0;
	declareWinner(gameWon.player == huPlayer1 ? "huPlayer1 win!" : "huPlayer2 win");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function checkTie() {
	count++;
	if (count == 9) {
		declareWinner("Tie!!!");
		cells.forEach(e => {
			e.setAttribute("style", "background-color : green");
		})
		count = 0;

	}
}