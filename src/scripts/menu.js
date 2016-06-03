function Menu(currentGame, displaySize) {
    this.game = currentGame;
    this.displaySize = displaySize;
}

Menu.prototype = {
    preload: function() {
        this.game.load.spritesheet('start_button',     'src/img/hud/start_button.png',     200, 200);
        this.game.load.spritesheet('rating_button',    'src/img/hud/rating_button.png',    124, 41 );
        this.game.load.spritesheet('team_logo_button', 'src/img/hud/team_logo_button.png', 100, 100);
        this.game.load.image(      'face',             'src/img/hud/flash_face.png'                );
        this.game.load.image(      'logo',             'src/img/hud/start_logo.png'                );
    },
    
    create: function() {
        this.sound = this.game.add.sound('menu_sound',1,true);
        this.sound.play();
        this.game.stage.backgroundColor = '#e13933';
        var logo = this.game.add.sprite(this.displaySize.w/2, 150, "logo");
        logo.anchor.setTo(0.5, 0.5);
        var face = this.game.add.sprite(0, 0, "face");
        face.scale.set(0.8);
        face.x = this.displaySize.w-face.width;
        face.y = this.displaySize.h-face.height;
        this.startButton = this.game.add.button(this.game.world.centerX, 400, 
            'start_button', function() {
                this.sound.destroy();
                this.game.state.start('tutorial');
            }.bind(this), this, 2, 1, 0).anchor.set(0.5);
        this.game.add.button(575, 550, 
            'rating_button', function(){ this.game.state.start('rating'); }, this, 2, 1, 0);
        this.game.add.button(25, 575, 
            'team_logo_button', function(){alert(
                "Команда ASA-No:\n"+
                "--------------------\n"+
                "Бобин Никита\n"+
                "Белинский Егор\n"+
                "Привалов Сергей\n"+
                "Арасланова Вика\n"+
                "Зырянова Настя\n"+
                "--------------------");}, this, 2, 1, 0);
        localStorage.setItem("distance",      "0");
	    localStorage.setItem("energy",        "8");
	    localStorage.setItem("lifes",         "3");
        localStorage.setItem("obstacle_time", "3500");
    },
    update: function() {
    }
    
};

module.exports = Menu;