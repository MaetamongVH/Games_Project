//@ts-nocheck
var origBoard;
let huPlayer = 'o';
let dumBot = 'x';
let player = 1;
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
const tick = document.getElementById("tick-sound");
const tieSound = document.getElementById("tie-sound");
const loseSound = document.getElementById("lose-sound");
let count = 0;
startGame();
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

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if(emptySquares().length > 0) turn(minimax(origBoard,0,dumBot).index, dumBot);
	}
}
function turn(squareId, player) {

	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	tick.play();
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
	else checkTie();
	
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a,[]);
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
	table.style.filter = "blur(3px)";
	if(gameWon.player == huPlayer) result.innerHTML = `<div>You Won</div>
	<button onClick="startGame()">Replay</button>`;
	else if(gameWon.player == dumBot) {
		result.innerHTML = `<div>You Lose</div>
	<button onClick="startGame()">Replay</button>`;
	loseSound.play();
	}
	
	for (let index of winCombos[gameWon.index]) {
		if(gameWon.player === huPlayer) {	
			document.getElementById(index).classList.add("won-1")	
		}
		else if(gameWon.player === dumBot) {
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

function checkTie() {
	count++;
	if (count == 9) {
		result.innerHTML = `<div>Tie game</div>
		<button onClick="startGame()">Replay</button>`
		table.style.filter = "blur(3px)";
		cells.forEach(e => {
			e.classList.add("tie");
		})
		count = 0;
		tieSound.play();
	}
}


function minimax(newBoard, depth, player){
	var available = emptySquares();
	if (checkWin(newBoard, huPlayer)) {
		return {score: depth - 10};
	} else if (checkWin(newBoard, dumBot)) {
		return {score: 10 - depth};
	} else if (available.length === 0) {
		return {score: 0};
	}

	var moves = [] ;
	for(var i = 0; i<available.length ; i++){
		var move ={}
		move.index = newBoard[available[i]];
		newBoard[available[i]] = player;

		if (player ==dumBot) {
			var result = minimax(newBoard, depth + 1, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, depth + 1, dumBot);
			move.score = result.score;
		}

		newBoard[available[i]] = move.index;

		moves.push(move);
	
	}
	

	var bestMove;
	if(player === dumBot) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return  moves[bestMove];
}

	

