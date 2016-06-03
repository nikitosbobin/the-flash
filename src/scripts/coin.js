function Coin(context, pointer, sprite) {
    this.pointer = pointer;
    this.deltaObj = context.delta;
    this.ground = context.ground;
    this.game = context.game;
    this.player = context.player;
    this.context = context;
    Phaser.Sprite.call(this, this.game, context.display.w + 1500, 200, sprite);
    this.game.physics.arcade.enableBody(this);
    this.game.add.existing(this);
    console.log("coin created");
    this.destroyed = false;
    this.animations.add('rot', [0,1,2,3,4,5,6], 20, true);
    this.animations.play('rot'); 
    this.lifeSound = this.game.add.audio('life_sound');
    this.coinSound = this.game.add.audio('coin_sound');
}

Coin.prototype = Object.create(Phaser.Sprite.prototype);  
Coin.prototype.constructor = Coin;

Coin.prototype.create = function() {     };
Coin.prototype.update = function() {
    if (this.destroyed) return;
    this.x += this.deltaObj.x;
    this.game.physics.arcade.collide(this.ground, this);
    if (this.game.physics.arcade.overlap(this, this.player)) {
        var delta = 1;
        if (this.pointer == "coinsCount") {
            delta = this.player.coinsCount >= 100 ? 0 : 4;
            this.coinSound.play();
        }
        if (this.pointer == "lifes") {
            this.lifeSound.play();
        }
        this.player[this.pointer] += delta;
        if (this.player.coinsCount > 100)
            this.player.coinsCount = 100;
        this.context.setEnergyHud();
        this.context.setHeartsCount();
        this.dispose();
        return;
    }
    if (this.x < 0) {
        this.dispose();
        return;
    }
};

Coin.prototype.dispose = function() {
    console.log("coin destroyed");
    this.destroyed = true;
    this.destroy();
};


module.exports = Coin;