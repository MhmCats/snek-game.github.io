const GRIDSIZE = 25; 

var PLAYING = true;

var x = 225;
var y = 225;

var foodPos = [400, 225]

var direction = null;

var length = 0;
var positions = [];

function updateGame() {

	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");

	document.getElementById("output").innerHTML = `Score: ${length}`;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#23272A";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(foodPos[0]-1, foodPos[1]-1, GRIDSIZE-1, GRIDSIZE-1);

	ctx.fillStyle = "#4E5D94";
	for (let i = 0; i < length; i++) {
		ctx.fillRect(positions[i][0]-1, positions[i][1]-1, GRIDSIZE-1, GRIDSIZE-1);
	}
	ctx.fillRect(x-1, y-1, GRIDSIZE-1, GRIDSIZE-1);

	positions = positions.slice(0, length);
	positions = [[x, y], ...positions];

	if (checkDead()) {
		PLAYING = false;
		document.getElementById("output").innerHTML = `You died... your score was ${length}`;
		return;
	}

	if (x == foodPos[0] && y == foodPos[1]) {
		length ++;
		foodPos = generateFood();
	}
}

function generateFood() {
	var tempFood = null;
	while (tempFood == null) {
		tempFood = [Math.floor(Math.random()*19)*25, Math.floor(Math.random()*19)*25];
		for (position of positions) {
			if (tempFood[0] == position[0] && tempFood[1] == position[1]) {
				tempFood = null;
				break;
			}
		}
	}
	return tempFood;
}

function checkDead() {
	for (let position of positions.slice(1)) {
		if (x == position[0] && y == position[1]) {
			return true;
		}
	}
	return false;
}


function movement() {
	if (PLAYING == true){
		var canvas = document.getElementById("gameCanvas");
		switch (direction) {
			case "u":
				if (y == 0) {
					y = canvas.width-GRIDSIZE;
				} else {
					y -= GRIDSIZE;
				}
				updateGame();
				break;
			case "d":
				if (y == canvas.width-GRIDSIZE) {
					y = 0;
				} else {
					y += GRIDSIZE;
				}
				updateGame();
				break;
			case "l":
				if (x == 0) {
					x = canvas.width-GRIDSIZE;
				} else {
					x -= GRIDSIZE;
				}
				updateGame();
				break;
			case "r":
				if (x == canvas.width-GRIDSIZE) {
					x = 0;
				} else {
					x += GRIDSIZE;
				}
				updateGame();
				break;
			default:
				break;
		}
	}
}

function keydownHandler(event) {
	if(!PLAYING){return;}
	switch (event.key){
		case "ArrowDown":
			if (!(direction == "u")) {
				direction = "d"; 
			}
			break;
		case "ArrowUp":
			if (!(direction == "d")) {
				direction = "u";
			}
			break;
		case "ArrowLeft":
			if (!(direction == "r")) {
				direction = "l";
			}
			break;
		case "ArrowRight":
			if (!(direction == "l")) {
				direction = "r";
			}
			break;
		default:
			break;
	}
}

window.addEventListener("keydown", function (event) { keydownHandler(event) });

window.onload = function () {
	updateGame();
	setInterval(movement, 75);
}