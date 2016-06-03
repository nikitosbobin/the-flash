function Player(context, x, y) {
    this.Bullet = require('./bullet.js');
    this.game = context.game;
    this.cursors = context.cursors;
    this.ground = context.ground;
    this.context = context;
    this.leftHand = this.game.add.sprite(200, 500, "player_left_hand");
    this.leftHand.anchor.set(0.9, 0.4);
    this.leftTween = this.game.add.tween(this.leftHand)
        .to({angle:-180}, 50, "Linear", true, 0, -1, true);
    
    Phaser.Sprite.call(this, this.game, 200, 500, "player_body");
    this.game.physics.arcade.enableBody(this);
    this.game.add.existing(this);
    this.anchor.set(0.77, 0.3);
    this.animations.add('jump', [8], 1000, true);
    this.animations.add('run', [0,1,2,3,4,5,6,7], 100, true);
    this.animations.play('run');
    this.immovable = true;
    this.rightHand = this.game.add.sprite(200, 560, "player_right_hand");
    this.rightHand.anchor.set(0.2, 0.2);
    this.rightTween = this.game.add.tween(this.rightHand)
        .to({angle:180}, 50, "Linear", true, 0, -1, true);
    this.lightning = this.game.add.sprite(200, 500, "lightning");
    this.lightning.anchor.set(0.8,0.5);
    this.lightning.scale.set(1.2);
    this.lightning.animations.add('do', [0,1,2], 300, true).play('do');
    
    this.rightHand.position = this.position;
    this.leftHand.position = this.position;
    this.lightning.position = this.position;
    
    this.jumpTimer = 0;
    this.shotTimer = 0;
    this.canShot = false;
    this.killed = false;
    this.coinsCount = localStorage.getItem("energy") * 1;
    this.lifes = localStorage.getItem("lifes") * 1;
    this.jumpSound = this.game.add.audio('jump_sound');
}

Player.prototype = Object.create(Phaser.Sprite.prototype);  
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.killed) return;
    this.game.physics.arcade.collide(this.ground, this);
    if (this.body.touching.down) {
        this.animations.play('run');
    }
    if (this.cursors.up.isDown && this.game.time.now > this.jumpTimer && this.body.wasTouching.down) {
        this.animations.play('jump');
        this.jumpSound.play();
        this.body.velocity.y = -600;
        this.jumpTimer = this.game.time.now + 600;
    }
    if (this.canShot && this.cursors.space.isDown && this.game.time.now > this.shotTimer) {
        this.shot();
        this.shotTimer = this.game.time.now + 1000;
    }
};

Player.prototype.setVelocity = function (int) {
    this.body.velocity.x = int;
};
    
Player.prototype.collideWith = function(sprite) {
    if (!sprite) return false;
    return Phaser.Rectangle.intersects(sprite.getBounds(), this.getBounds());
};

Player.prototype.kill = function() {
    if (this.killed) return;
    this.game.add.audio('game_over_sound').play();
    this.killed = true;
    this.rightHand.x = -500;
    this.leftHand.x = -500;
    Phaser.Sprite.call(this, this.game, 200, 600, "player_death");
    this.game.physics.arcade.enableBody(this);
    this.game.add.existing(this);
    this.lightning.position = this.position;
    this.anchor.set(0.8, 0.3);
    this.animations.add('death', [0,1,2,3,4,5], 30);
    this.animations.play('death');
    setTimeout(function() {
        if (!!this.context.enemy.theme)
            this.context.enemy.theme.stop();
        this.game.state.start("game_over");
    }.bind(this), 2000);
    console.log("player killed");
};

Player.prototype.shot = function() {
    new this.Bullet(this.game, this.enemy, this.x,this.y);
};

module.exports = Player;