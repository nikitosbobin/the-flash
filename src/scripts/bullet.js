function Bullet(currentGame, target, x, y) {
    Phaser.Sprite.call(this, currentGame, x, y, 'bullet');
    this.animations.add('do', [0,1,2], 100, true);
    this.animations.play('do');
    this.scale.set(0.5);
    currentGame.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    currentGame.add.existing(this);
    this.body.immovable = true; 
    this.body.velocity.x = 1800;
    this.targetBody = target;
    this.game.add.audio('lightning_sound').play();
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);  
Bullet.prototype.constructor = Bullet;

Bullet.prototype.create = function() { };
Bullet.prototype.update = function() {  
    if (this.game.physics.arcade.collide(this.targetBody, this)) {
        this.targetBody.lifes--;
        if (this.targetBody.lifes != 0) {
            this.targetBody.body.velocity.x = 0;
        } else {
            this.targetBody.kill();
        }
        this.targetBody.setHealthHud();
        this.destroy();
    }
};


module.exports = Bullet;