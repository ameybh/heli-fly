console.log('Loaded sketch.js');

let gameWrapper = null,
	assets = {},
	scoreElem,
	updateScore,
	game;
const gameScale = 1;
function preload() {
	assets['background'] = loadImage(
		`assets/sprites/background.png`,
		(img) => {
			img.resize(width, height / 2);
			console.log(`Preloaded background-${name}.png`);
		}
	);
	assets['heli'] = [];
	for (let i = 0; i < 4; i++) {
		assets.heli[i] = loadImage(`./assets/sprites/heli/heli-${i}.png`);
	}
	assets['gameover'] = loadImage('./assets/sprites/gameover.png');
	console.log(assets);
}
function setup() {
	gameWrapper = document.getElementById('game');
	scoreElem = createDiv('Score = 0');
	scoreElem.position(20, 20);
	scoreElem.id = 'score';
	updateScore = setInterval(() => {
		const prevScore = parseInt(scoreElem.html().substring(8));
		scoreElem.html('Score = ' + (prevScore + 1));
	}, 100);
	const gameCanvas = createCanvas(
		gameWrapper.offsetWidth,
		gameWrapper.offsetHeight
	);
	gameCanvas.parent('game');

	noCursor();
	game = new Game({
		width,
		height,
		background: assets.background,
		heliSprite: assets.heli,
		gameover: assets.gameover,
		crashHeight: height - 175,
	});
	background(0);
}
function draw() {
	background(color('#C91B26'));
	game.update();
	game.render();
	push();
	noStroke();
	fill(color('#FFEEEE55'));
	circle(mouseX, mouseY, 50);
	pop();
}
function mousePressed() {
	pressHandler();
}
function keyPressed() {
	pressHandler();
}
function pressHandler() {
	if (game.state.stage == 'live') {
		game.heli.jump();
	} else if (game.state.stage == 'game-over') {
		window.location.reload();
	}
}
