function Level0(currentGame, displaySize, cursors) {
    this.game = currentGame;
    this.display = displaySize;
    this.cursors = cursors;
    var BaseClass = require("./game.js");
    var result = new BaseClass(this, 0, "level1", 300, 3);
    result.preload = function() {       
        this.game.load.image(      'obstacle_0_1',      'src/img/obstacles/obstacle_0_1.svg'       );
        this.game.load.image(      'obstacle_0_2',      'src/img/obstacles/obstacle_0_2.svg'       );
        this.game.load.image(      'obstacle_0_3',      'src/img/obstacles/obstacle_0_3.svg'       );
        this.game.load.image(      'obstacle_0_4',      'src/img/obstacles/obstacle_0_4.png'       );
        this.game.load.image(      'obstacle_0_5',      'src/img/obstacles/obstacle_0_5.png'       );
        this.game.load.image(      'obstacle_0_6',      'src/img/obstacles/obstacle_0_6.png'       );
        this.game.load.image(      'background_0_1',    'src/img/backgrounds/background_0_1.png'   );
	    this.game.load.image(      'background_0_2',    'src/img/backgrounds/background_0_2.png'   );
        this.game.load.image(      'exit_0',            'src/img/hud/exit_0.png'                   );
        this.game.load.spritesheet('frost_body',        'src/img/enemy1/body.svg',         79,  150);
	    this.game.load.spritesheet('frost_death',       'src/img/enemy1/death.svg',        152, 154);
	    this.game.load.image(      'frost_right_hand',  'src/img/enemy1/right_hand.svg'            );
	    this.game.load.image(      'frost_left_hand',   'src/img/enemy1/left_hand.svg'             );
        this.game.load.audio(      'frost_apperance',   'src/sounds/frost_apperance.wav'           );
        this.game.load.audio(      'frost_death',       'src/sounds/frost_death.wav'               );
        this.game.load.audio(      'frost_theme',       'src/sounds/frost_theme.mp3'               );
    }.bind(this);
    return result;
}

module.exports = Level0;