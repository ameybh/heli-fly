const Heli = function ({
	sprite,
	initHeight,
	gravity: gravity = 0.6,
	wingDuration: wingDuration = 5,
	maxV: maxV = -15,
}) {
	console.log(sprite);
	this.sprite = sprite;
	this.dimension = [sprite[0].width, sprite[0].height];
	this.height = initHeight;
	this.v = 0;

	this.passes = (pipe, { offset: offset = 0 }) => {
		if (pipe.withinX(this, offset)) {
			return pipe.position[0] + pipe.dimension[0] / 2 < width;
		}
	};
	this.jump = () => {
		this.v = -5;
	};
	this.update = () => {
		if (this.v >= maxV) this.v += gravity;
		// reversed
		this.height += this.v;
	};
	this.render = (crashed = false) => {
		push();
		translate(width / 3, this.height - this.sprite[0].height + 20);
		imageMode(CENTER);
		image(
			this.sprite[
				!crashed ? Math.floor((frameCount / wingDuration) % 3) : 0
			],
			0,
			0
		);
	};
};
