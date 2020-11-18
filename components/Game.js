console.log("Loaded game.js");

const Game = function ({ width, height, background, heliSprite, obstacleSprite, gameover, crashHeight }) {
  this.state = {
    stage: "live",
  };
  this.background = new RepetitiveSprite({
    sprite: background,
    initY: height - background.height,
    velocity: -1,
  });
  this.heli = new Heli({
    sprite: heliSprite,
    initHeight: 0,
    gravity: 0.3,
  });
  this.update = () => {
    this.background.update();
    if (this.heli.height < crashHeight) {
      this.heli.update();
    } else {
      this.state.stage = "game-over";
      this.background.velocity = 0;
      clearInterval(updateScore);
    }
  };
  this.render = () => {
    this.background.render();
    this.heli.render(this.state.stage == "game-over");
    if (this.state.stage == "game-over") {
      push();
      imageMode(CENTER);
      image(gameover, width / 2, height / 2 - 100);
      pop();
      textSize(24);
      textAlign(CENTER);
      text("Reload to reset game.", width / 2, height / 2);
    }
  };
  this.sound = () => {
    if (this.state.stage === "game-over" && heliSound.isPlaying(true)) {
      heliSound.stop();
      crashSound.play();
    }
  };
};
