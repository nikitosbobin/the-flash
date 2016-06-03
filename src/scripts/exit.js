function Exit(context) {
    this.ground = context.ground;
    this.display = context.display;
    this.game = context.game;
    this.player = context.player;
    this.context = context;
    Phaser.Sprite.call(this, this.game, this.display.w, 0, "exit_" + context.index);
    this.y = this.display.h - this.height/2;
    this.x += this.width/2;
    this.anchor.set(0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = true;
    this.game.add.existing(this);
    this.body.bounce.y = 0.1;
    this.immovable = true;
    setTimeout(function(){ 
        this.game.add.audio('transfer_sound').play();
        this.player.body.velocity.x = 400;
        this.game.add.tween(this).to({x:this.display.w-this.width/2}, 500, "Linear", true, 0, 0, false);
        this.game.add.tween(this.context.delta).to({x:0}, 1500, "Linear", true, 0, 0, false);
    }.bind(this), 1000);
    
}

Exit.prototype = Object.create(Phaser.Sprite.prototype);  
Exit.prototype.constructor = Exit;

Exit.prototype.create = function() {  };
Exit.prototype.update = function() {
    this.game.physics.arcade.collide(this.ground, this);
    if (this.game.physics.arcade.overlap(this, this.player) && this.player.body.touching.right && !this.player.killed) {
        console.log("exit_" + this.context.index);
        this.context.setNextLevel();
    }
};

module.exports = Exit;