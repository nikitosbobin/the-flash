function Level1(currentGame, displaySize, cursors) {
    this.game = currentGame;
    this.display = displaySize;
    this.cursors = cursors;
    var BaseClass = require("./game.js");
    var result = new BaseClass(this, 1, "level0", 300, 3);
    result.preload = function() {
        this.game.load.image(      'obstacle_1_1',     'src/img/obstacles/obstacle_1_1.svg'        );
        this.game.load.image(      'obstacle_1_2',     'src/img/obstacles/obstacle_1_2.svg'        );
        this.game.load.image(      'obstacle_1_3',     'src/img/obstacles/obstacle_1_3.png'        );
        this.game.load.image(      'obstacle_1_4',     'src/img/obstacles/obstacle_1_4.svg'        );
        this.game.load.image(      'obstacle_1_5',     'src/img/obstacles/obstacle_1_5.svg'        );
        this.game.load.image(      'obstacle_1_6',     'src/img/obstacles/obstacle_1_6.png'        );
        this.game.load.image(      'background_1_1',   'src/img/backgrounds/background_1_1.png'    );
	    this.game.load.image(      'background_1_2',   'src/img/backgrounds/background_1_2.svg'    );
        this.game.load.image(      'exit_1',           'src/img/hud/exit_1.png'                    );
        this.game.load.spritesheet('grodd_body',       'src/img/enemy2/body.svg',          105, 135);
	    this.game.load.spritesheet('grodd_death',      'src/img/enemy2/death.png',         150, 147);
	    this.game.load.image(      'grodd_right_hand', 'src/img/enemy2/right_hand.svg'             );
	    this.game.load.image(      'grodd_left_hand',  'src/img/enemy2/left_hand.svg'              );
        this.game.load.audio(      'grodd_apperance',  'src/sounds/grodd_apperance.wav'            );
        this.game.load.audio(      'grodd_death',      'src/sounds/grodd_death.wav'                );
        this.game.load.audio(      'grodd_theme',      'src/sounds/grodd_theme.mp3'                );
    }.bind(this);
    return result;
}

module.exports = Level1;