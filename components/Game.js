console.log('Loaded game.js');

const Game = function ({ width, height, background, heliSprite }) {
	this.state = {
		stage: 'live',
	};
	this.background = new RepetitiveSprite({
		sprite: background,
		initY: height - background.height / 2,
		velocity: -5,
	});
	this.heli = new Heli({
		sprite: heliSprite,
		initHeight: 0,
		gravity: 0.5,
	});
	this.update = () => {
		this.background.update();
		if (this.heli.height < height) this.heli.update();
	};
	this.render = () => {
		this.background.render();
		this.heli.render();
	};
};
