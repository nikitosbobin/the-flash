//var displaySize = { w:document.documentElement.clientWidth, h: document.documentElement.clientHeight };
var displaySize = { w: 1280, h: 700 };
var game = new Phaser.Game(displaySize.w, displaySize.h, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

var MenuState     = require("./menu.js"     );
var Level0State   = require("./level0.js"   );
var Level1State   = require("./level1.js"   );
var TutorialState = require("./tutorial.js" );
var GameOverState = require("./game_over.js");
var RatingState   = require("./rating.js"   );

function preload() {
	game.load.spritesheet('player_body',         'src/img/player/body.svg',         118, 109);
	game.load.spritesheet('player_death',        'src/img/player/death.svg',        140, 140);
	game.load.image(      'player_right_hand',   'src/img/player/right_hand.svg'            );
	game.load.image(      'player_left_hand',    'src/img/player/left_hand.svg'             );
	game.load.spritesheet('lightning',           'src/img/hud/lightning.svg',       100, 100);
	game.load.spritesheet('bullet',              'src/img/hud/bullet.svg',          192, 64 );
	game.load.image(      'floor',               'src/img/hud/floor.png'                    );
	game.load.spritesheet('heart',               'src/img/hud/heart.svg',           36,  70 );
	game.load.spritesheet('coin',                'src/img/hud/coin.svg',            34.7,70 );
	game.load.image(      'flashlight',          'src/img/hud/flashlight.png'               );
	game.load.image(      'heart_hud',           'src/img/hud/heart_hud.png'				);
	game.load.image(      'plus',                'src/img/hud/plus.png'						);
	game.load.image(      'energy_color',        'src/img/hud/energy_color.png'				);
	game.load.image(      'gray',                'src/img/hud/gray.png'						);
	game.load.image(      'red',                 'src/img/hud/red.png'						);
	game.load.audio(      'coin_sound',          'src/sounds/coin.wav'                      );
	game.load.audio(      'life_sound',          'src/sounds/life.wav'                      );
	game.load.audio(      'jump_sound',          'src/sounds/jump.wav'                      );
	game.load.audio(      'lightning_sound',     'src/sounds/lightning.wav'                 );
	game.load.audio(      'transfer_sound',      'src/sounds/transfer.wav'                  );
	game.load.audio(      'game_over_sound',     'src/sounds/game_over.wav'                 );
	game.load.audio(      'bump_sound',          'src/sounds/bump.wav'                      );
	game.load.audio(      'menu_sound',          'src/sounds/menu_theme.mp3'                );
	game.load.audio(      'main_theme_sound',    'src/sounds/main_theme.mp3'                );
	game.load.audio(      'speed_boost_sound',   'src/sounds/speed_boost.wav'               );
}

function create() {
	var cursors = game.input.keyboard.createCursorKeys();
	cursors.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	cursors.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	cursors.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 1000;
	game.state.add('menu', new MenuState(game, displaySize));
	var level0 = Level0State(game, displaySize, cursors);
	var level1 = Level1State(game, displaySize, cursors);
	var tutorial = new TutorialState(game, displaySize, cursors);
	game.state.add('level0', level0);
	game.state.add('level1', level1);
	game.state.add('tutorial', tutorial);
	game.state.add('game_over', new GameOverState(game, displaySize, cursors));
	game.state.add('rating', new RatingState(game, displaySize, cursors));
	game.state.start("menu");
}

function update() {}

function render() {}