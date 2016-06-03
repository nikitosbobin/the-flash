function Rating(currentGame, displaySize) {
    this.game = currentGame;
    this.displaySize = displaySize;
    this.rating = [];
}

Rating.prototype = {
    preload: function() {
        this.game.load.spritesheet('menu_button',         'src/img/hud/menu_button.png',     124, 41 );
        this.game.load.image(      'rating_card',         'src/img/hud/rating_card.png'              );
    },
    create: function() {
        this.game.add.button(50, 600, 
            'menu_button', function(){this.game.state.start('menu');}, this, 2, 1, 0);
        this.game.add.text(this.game.world.centerX, 40, 
            "Rating table", { font: "50px Segoe UI", fill: "#000000", align: "center" }).anchor.set(0.5);
        this.loadRating();
        for (var i = 0; i < this.rating.length; ++i) {
            this.game.add.sprite(this.displaySize.w/2, i * 60 + 115, "rating_card").anchor.set(0.5);
            this.game.add.text(this.game.world.centerX - 140, i * 60 + 100, 
                this.rating[i], { font: "20px Arial", fill: "#000000", align: "center" });
        }
        this.game.input.keyboard.onUpCallback = function(e) {
            if (e.keyCode == Phaser.Keyboard.ESC)
                this.game.state.start('menu');
        }.bind(this);
    },
    update: function() {
    },
    loadRating: function() {
        if (localStorage.rating){
            var ratingObj = {};
            this.rating = localStorage.rating
                .split(',')
                .filter(function(item){return item != "";});
            this.rating.forEach(function(item) { ratingObj[item] = 0; });
            this.rating = Object.keys(ratingObj);
            localStorage.setItem("rating", "");
            this.rating.sort(function compare(a, b) {
                var data1 = a.split('-')[0] * 1;
                var data2 = b.split('-')[0] * 1;
                if (data1 > data2) { return -1; }
                if (data1 < data2) { return 1; }
                return 0;
            });
            this.rating.forEach(function(item){localStorage.rating += item + ","});
            var count = this.rating.length > 10 ? 10 : this.rating.length;
            this.rating = this.rating.slice(0, count);
            this.rating = this.rating.map(function(item) {
                var data = item.split('-');
                return data[1] + this.getString(" ", 47 - item.length - 1) + data[0];
            }.bind(this));
        }
        console.log(this.rating);
    },
    getString: function(char, count) {
        var result = "";
        for (var i = 0; i < count; ++i)
            result += char;
        return result;
    }
};

module.exports = Rating;