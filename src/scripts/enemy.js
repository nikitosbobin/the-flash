function Enemy(context, name, obstacleStart, obstacleCount) {
    this.obstacleStart = obstacleStart;
    this.obstacleCount = obstacleCount;
    this.name = name;
    this.context = context;
    this.game = context.game;
    this.display = context.display;
    this.player = context.player;
    this.ground = context.ground;
    this.deltaObj = context.delta;
    this.Obstacle = require("./obstacle.js");
    this.leftHand = this.game.add.sprite(200, 500, name + "_left_hand");
    this.leftHand.anchor.set(0.9, 0.4);
    this.leftTween = this.game.add.tween(this.leftHand)
        .to({angle:-180}, 400, "Linear", true, 0, -1, true);

    Phaser.Sprite.call(this, this.game, 1000, 500, name + "_body");
    this.game.physics.arcade.enableBody(this);
    this.game.add.existing(this);
    this.anchor.set(0.7, 0.25);
    this.animations.add('jump', [6], 1000, true);
    this.animations.add('run', [0,1,2,3,4,5], 10, true);
    this.animations.play('run');

    this.rightHand = this.game.add.sprite(200, 560, name + "_right_hand");
    this.rightHand.anchor.set(0.1, 0.2);
    this.rightTween = this.game.add.tween(this.rightHand)
        .to({angle:180}, 400, "Linear", true, 0, -1, true);

    this.rightHand.position = this.position;
    this.leftHand.position = this.position;
    this.shotTimer = 0;
    this.jumpTimer = 0;
    this.swapLvlTimer = this.game.time.now;
    this.killed = false;
    this.lifes = 4;
    this.createHealthHud();
    this.game.add.audio(this.name + "_apperance").play();
    this.theme = this.game.add.audio(this.name + "_theme");
    this.theme.play();
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    if (this.killed) return;
    this.game.physics.arcade.collide(this.ground, this);
    if (this.body.touching.down) {
        this.animations.play('run');
    }
    var timeOnLvl = 20000;
    var lvlTimer = (this.game.time.now - this.swapLvlTimer) % timeOnLvl;
    if (lvlTimer > timeOnLvl/2 &&  this.game.time.now > this.jumpTimer && this.body.wasTouching.down) {
        this.setHudAlpha(1);
        this.player.canShot = true;
        this.animations.play('jump');
        this.body.velocity.y = -600;
        var r = 1200 + Math.random()*1000;
        this.jumpTimer = this.game.time.now + r;
    }
    if (lvlTimer < timeOnLvl/2 && this.game.time.now > this.shotTimer) {
        this.setHudAlpha(0);
        this.player.canShot = false;
        this.shot();
        var r = 1200 + Math.random()*400;
        this.shotTimer = this.game.time.now + r;
    }
};

Enemy.prototype.createHealthHud = function() {
    this.gray = this.game.add.sprite(499, 19, "gray");
    this.gray.width = 200;
    this.healthHud = this.context.game.add.sprite(500, 20, "red");
    this.setHealthHud();
};

Enemy.prototype.setHealthHud = function() {
    this.healthHud.width = this.lifes * 200 / 4;
};

Enemy.prototype.setHudAlpha = function(value) {
    this.gray.alpha = value;
    this.healthHud.alpha = value;
};

Enemy.prototype.setVelocity = function (int) {
    this.body.velocity.x = int;
};

Enemy.prototype.collideWith = function(sprite) {
    if (!sprite) return false;
    return Phaser.Rectangle.intersects(sprite.getBounds(), this.getBounds());
};

Enemy.prototype.kill = function() {
    if (this.killed) return;
    console.log("enemy killed");
    this.killed = true;
    this.rightHand.x = -500;
    this.leftHand.x = -500;
    Phaser.Sprite.call(this, this.game, 1000, 500, this.name + "_death");
    this.game.physics.arcade.enableBody(this);
    this.game.add.existing(this);
    this.anchor.set(0.8, 0.3);
    this.animations.add('death', [0,1,2,3,4,5], 30);
    this.animations.play('death');
    this.game.add.audio(this.name + "_death").play();
    this.theme.stop();
    var Exit = require('./exit.js');
    var exit = new Exit(this.context);
    if (this.name == "grodd") {
        exit.body.allowGravity = false;
        this.game.add.tween(exit.scale).to({x:0.95, y:0.95}, 400, "Linear", true, 0, -1, true);
    }
};

Enemy.prototype.shot = function() {
    new this.Obstacle(this.context, this.game.time.now % this.obstacleCount + this.obstacleStart, true, this.x, this.y-100);
};

module.exports = Enemy;