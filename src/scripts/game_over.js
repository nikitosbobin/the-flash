function GameOver(currentGame, displaySize) {
    this.game = currentGame;
    this.displaySize = displaySize;
    this.saveTimer = 0;
}

GameOver.prototype = {
    preload: function() {
        this.game.load.image('game_over_image', 'src/img/hud/game_over.png');
    },
    create: function() {
        this.game.stage.backgroundColor = '#e13933';
        this.saveRating();
        var logo = this.game.add.sprite(this.displaySize.w/2, 150, "game_over_image");
        logo.scale.set(0.7);
        logo.anchor.setTo(0.5, 0.5);
        this.game.add.button(this.game.world.centerX, 400, 
            'start_button', function() {
                localStorage.setItem("distance", "0");
                localStorage.setItem("energy", "8");
                this.game.state.start('level0');
            }, this, 2, 1, 0).anchor.set(0.5);
        this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, 
            "Distance:" + localStorage.getItem('distance'), { font: "25px Arial", fill: "#424242", align: "center" }).anchor.set(0.5);
        this.game.add.button(50, 600, 
            'rating_button', function(){this.game.state.start('rating');}, this, 2, 1, 0);
        this.game.input.keyboard.onUpCallback = function(e) {
            if (e.keyCode == Phaser.Keyboard.ESC)
                this.game.state.start('menu');
        }.bind(this);
    },
    update: function() {
    },
    saveRating: function () {
        var name = prompt("Your name?", "Allen");
        //var name = "test";
        if (!name) return;
        if (localStorage.rating)
            localStorage.rating += (localStorage.getItem('distance') +  "-" + name + ",");
        else
            localStorage.setItem("rating", localStorage.getItem('distance') +  "-" + name + ",");
    }
};

module.exports = GameOver;
