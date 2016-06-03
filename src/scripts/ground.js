function Ground(currentGame,y) {
    Phaser.TileSprite.call(this, currentGame, 0, y, 2500, 20, 'floor');
    currentGame.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    currentGame.add.existing(this);
    this.body.immovable = true;  
}

Ground.prototype = Object.create(Phaser.TileSprite.prototype);  
Ground.prototype.constructor = Ground;

Ground.prototype.create = function() {     };
Ground.prototype.update = function() {     };


module.exports = Ground;