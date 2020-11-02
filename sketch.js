console.log('Loaded sketch.js');

let gameWrapper = null,
	assets = {},
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
	console.log(assets);
}
function setup() {
	gameWrapper = document.getElementById('game');
	console.log();
	const gameCanvas = createCanvas(
		gameWrapper.offsetWidth,
		gameWrapper.offsetHeight
	);
	gameCanvas.parent('game');
	game = new Game({
		width,
		height,
		background: assets.background,
		heliSprite: assets.heli,
	});
	background(0);
}
function draw() {
	background(color('#C91B26'));
	game.update();
	game.render();
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
	}
}
