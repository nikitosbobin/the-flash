function Obstacle(context, type, physics, x, y) {
    this.deltaObj = context.delta;
    this.ground = context.ground;
    this.display = context.display;
    this.game = context.game;
    this.player = context.player;
    this.context = context;
    Phaser.Sprite.call(this, this.game, this.display.w, 0, "obstacle_" + context.index + "_" + type);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = !!physics;
    this.game.add.existing(this);
    this.body.velocity.x = -600;
    this.body.bounce.y = 0.1;
    this.x = x || this.display.w - 100;
    this.y = y || (this.display.h - this.height);
    this.destroyed = false;
    this.immovable = true;
    
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);  
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.create = function() {     };
Obstacle.prototype.update = function() {
    if (this.destroyed) return;
    this.body.velocity.x = this.deltaObj.x * 60;
    this.game.physics.arcade.collide(this.ground, this);
    if (this.game.physics.arcade.collide(this, this.player) 
                    && this.player.body.touching.right && !this.player.killed) {
        this.game.add.audio("bump_sound").play();
        this.player.lifes--;
        this.context.setHeartsCount();
        if (this.player.lifes != 0) {
            this.x = -this.width;
            this.player.body.velocity.x = 0;
        }
        else
            this.player.kill();
    }
    if (this.x < -this.width) {
        this.dispose();
        //this.x = this.display.w + 500;    
    }
};

Obstacle.prototype.dispose = function() {
    console.log("obstacle destroyed");
    this.destroyed = true;
    this.destroy();
};


module.exports = Obstacle;