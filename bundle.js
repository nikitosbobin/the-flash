/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//var displaySize = { w:document.documentElement.clientWidth, h: document.documentElement.clientHeight };
	var displaySize = { w: 1280, h: 700 };
	var game = new Phaser.Game(displaySize.w, displaySize.h, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

	var MenuState     = __webpack_require__(1     );
	var Level0State   = __webpack_require__(2   );
	var Level1State   = __webpack_require__(11   );
	var TutorialState = __webpack_require__(12 );
	var GameOverState = __webpack_require__(13);
	var RatingState   = __webpack_require__(14   );

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

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	function Level0(currentGame, displaySize, cursors) {
	    this.game = currentGame;
	    this.display = displaySize;
	    this.cursors = cursors;
	    var BaseClass = __webpack_require__(3);
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	function Game(context, index, nextLevelName, changeDistance, obstacleCount) {
	    this.obstacleCount = obstacleCount;
	    this.game = context.game;
	    this.display = context.display;
	    this.cursors = context.cursors;
	    this.Obstacle = __webpack_require__(4);
	    this.Coin = __webpack_require__(5);
	    this.startFlashlightTime = 0;
	    this.nextLevelName = nextLevelName;
	    this.index = index;
	    this.changeDistance = changeDistance;
	    this.coinTimer = 0;
	    this.lifeTimer = 0;
	    this.triggerEnabled = false;
	    this.enemy = {killed:false};
	}

	Game.prototype = {
	    preload: function() {
	        
	    },
	    create: function() {
	        this.mainSound = this.game.add.sound('main_theme_sound',1,true);
	        this.mainSound.play();
	        this.enemy.killed = false;
	        this.triggerEnabled = false;
	        this.game.stage.backgroundColor = '#ffffff';
	        this.distance = this.startDistance = localStorage.getItem("distance") * 1;
	        this.obstacleDiff = localStorage.getItem("obstacle_time") * 1;
	        this.obstacles = [];
	        this.distanceTimer = 0;
	        this.firstBackground = this.game.add.tileSprite(0, 0, this.display.w, this.display.h, "background_" + this.index + "_1");
	        this.secondBackground = this.game.add.tileSprite(0, 0, this.display.w, this.display.h, "background_" + this.index + "_2");
	        var Ground = __webpack_require__(6);
	        this.delta = { x: -10 };
	        this.ground = new Ground(this.game,this.display.h);
	        this.secondBackground.fixedToCamera = true;
	        var Player = __webpack_require__(7);
	        this.player = new Player(this);
	        this.distanceLabel = this.game.add.text(20, 20, 
	            "Distance: " + this.distance, { font: "15px Arial", fill: "#ffffff", align: "center" });
	        this.obstacleTimer = 0;
	        var flashLight = this.game.add.tileSprite(0, 0, this.display.w, this.display.h, "flashlight");
	        this.game.add.tween(flashLight).to({alpha: 0}, 2000, "Linear", true, 0, 0, false);
	        this.game.input.keyboard.onUpCallback = function(e) {
	            if (e.keyCode == Phaser.Keyboard.ESC)
	                if(confirm("Точно выйти?"))
	                    this.game.state.start('menu');
	        }.bind(this);
	        this.boostSound = this.game.add.audio('speed_boost_sound');
	        this.createHearts();
	        this.createEnergy();
	    },
	    shutdown: function() {
	        this.mainSound.destroy();
	        this.boostSound.destroy();
	    },
	    update: function () {
	        if (this.distanceTimer < this.game.time.now && !this.player.killed) {
	            this.distanceTimer = this.game.time.now + 100;
	            this.distance += (this.delta.x / -10);
	            this.distance = Math.floor(this.distance);
	            this.distanceLabel.text = "Distance: " + this.distance;
	            if (this.cursors.shift.isDown) {
	                this.mainSound.pause();
	                if (!this.boostSound.isPlaying)
	                    this.boostSound.play();
	            } else {
	                this.boostSound.stop();
	                this.mainSound.resume();
	            }
	        }
	        if (!this.enemy.killed){
	            if (!this.player.killed && this.delta.x != 0) {
	                if (this.cursors.shift.isDown && this.player.coinsCount > 0)
	                    this.delta.x = -30;
	                else  
	                    this.delta.x = -10;
	            }
	        }
	        this.secondBackground.tilePosition.x += this.delta.x;
	        if (this.player.killed) {
	            localStorage.setItem('distance', this.distance);
	            this.game.add.tween(this.delta).to({x:0}, 600, "Linear", true, 0, 0, false);
	        }
	        if (this.game.time.now > this.coinTimer && !this.player.killed) {
	            this.addCoin();
	        }
	        if (this.game.time.now > this.lifeTimer && !this.player.killed) {
	            this.addLife();
	        }
	        if (this.game.time.now > this.obstacleTimer && !this.player.killed && !this.triggerEnabled) {
	            this.addObstacle(this.game.time.now % this.obstacleCount + 1, true, this.display.w+1500, 200);
	        }
	        if (this.distance >= this.startDistance + this.changeDistance && !this.triggerEnabled) {
	            this.triggerEnabled = true;
	            this.timeTrigger();
	        }
	    },
	    createHearts: function() {
	        var top = 50;
	        this.heartsHudGroup = this.game.add.group();
	        for (var i = 0; i < 5; ++i)
	            this.heartsHudGroup.create(20 + 30 * i, top, 'heart_hud').scale.set(0.6);
	        this.heartsHudGroup.create(170, top + 2, 'plus').scale.set(0.4);
	        this.setHeartsCount();
	    },
	    setHeartsCount: function() {
	        var count = this.player.lifes;
	        for (var i = 0; i < 6; ++i)
	            this.heartsHudGroup.children[i].alpha = 0;
	        for (var j = 0; j < (count <= 6 ? count : 6); ++j)
	            this.heartsHudGroup.children[j].alpha = 1;
	    },
	    createEnergy: function() { 
	        this.game.add.sprite(19, 79, "gray").width = 200;
	        this.energyHud = this.game.add.sprite(20, 80, "energy_color");
	        this.setEnergyHud();
	    },
	    setEnergyHud: function() {
	        var max = 200;
	        this.energyHud.width = this.player.coinsCount * max / 100;
	    },
	    addObstacle: function (type, physics, x, y) {
	        this.obstacleTimer = this.game.time.now + this.obstacleDiff;
	        this.obstacles.push(new this.Obstacle(this, type, physics, x, y));
	    },
	    addCoin: function () {
	        new this.Coin(this, "coinsCount", "coin");
	        this.coinTimer = this.game.time.now + 1000;
	    },
	    addLife: function () {
	        new this.Coin(this, "lifes", "heart");
	        this.lifeTimer = this.game.time.now + 8619;
	    },
	    setNextLevel: function() {
	        console.log("changing level");
	        this.secondBackground.destroy();
	        this.firstBackground.destroy();
	        localStorage.setItem("distance", this.distance);
	        localStorage.setItem("energy", this.player.coinsCount);
	        localStorage.setItem("lifes", this.player.lifes);
	        this.game.state.start(this.nextLevelName);
	        var time = localStorage.getItem("obstacle_time") * 1 - 500;
	        if (time > 500)
	            localStorage.setItem("obstacle_time", time);
	    },
	    timeTrigger: function() {
	        this.mainSound.stop();
	        console.log("off sound");
	        var Enemy = __webpack_require__(9);
	        var name = null;
	        switch(this.index) {
	            case 0: name = "frost"; break;
	            case 1: name = "grodd"; break;
	        }
	        this.enemy = new Enemy(this, name, 4, 3);
	        this.player.enemy = this.enemy;
	    }
	};

	module.exports = Game;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Obstacle(context, type, physics, x, y) {
	    this.deltaObj = context.delta;
	    this.ground = context.ground;
	    this.display = context.display;
	    this.game = context.game;
	    this.player = context.player;
	    this.context = context;
	    Phaser.Sprite.call(this, this.game, this.display.w, 0, "obstacle_" + context.index + "_" + type);
	    this.game.physics.arcade.enableBody(this);
	    this.body.allowGravity = !!physics;
	    this.game.add.existing(this);
	    this.body.velocity.x = -600;
	    this.body.bounce.y = 0.1;
	    this.x = x || this.display.w - 100;
	    this.y = y || (this.display.h - this.height);
	    this.destroyed = false;
	    this.immovable = true;
	    
	}

	Obstacle.prototype = Object.create(Phaser.Sprite.prototype);  
	Obstacle.prototype.constructor = Obstacle;

	Obstacle.prototype.create = function() {     };
	Obstacle.prototype.update = function() {
	    if (this.destroyed) return;
	    this.body.velocity.x = this.deltaObj.x * 60;
	    this.game.physics.arcade.collide(this.ground, this);
	    if (this.game.physics.arcade.collide(this, this.player) 
	                    && this.player.body.touching.right && !this.player.killed) {
	        this.game.add.audio("bump_sound").play();
	        this.player.lifes--;
	        this.context.setHeartsCount();
	        if (this.player.lifes != 0) {
	            this.x = -this.width;
	            this.player.body.velocity.x = 0;
	        }
	        else
	            this.player.kill();
	    }
	    if (this.x < -this.width) {
	        this.dispose();
	        //this.x = this.display.w + 500;    
	    }
	};

	Obstacle.prototype.dispose = function() {
	    console.log("obstacle destroyed");
	    this.destroyed = true;
	    this.destroy();
	};


	module.exports = Obstacle;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	function Player(context, x, y) {
	    this.Bullet = __webpack_require__(8);
	    this.game = context.game;
	    this.cursors = context.cursors;
	    this.ground = context.ground;
	    this.context = context;
	    this.leftHand = this.game.add.sprite(200, 500, "player_left_hand");
	    this.leftHand.anchor.set(0.9, 0.4);
	    this.leftTween = this.game.add.tween(this.leftHand)
	        .to({angle:-180}, 50, "Linear", true, 0, -1, true);
	    
	    Phaser.Sprite.call(this, this.game, 200, 500, "player_body");
	    this.game.physics.arcade.enableBody(this);
	    this.game.add.existing(this);
	    this.anchor.set(0.77, 0.3);
	    this.animations.add('jump', [8], 1000, true);
	    this.animations.add('run', [0,1,2,3,4,5,6,7], 100, true);
	    this.animations.play('run');
	    this.immovable = true;
	    this.rightHand = this.game.add.sprite(200, 560, "player_right_hand");
	    this.rightHand.anchor.set(0.2, 0.2);
	    this.rightTween = this.game.add.tween(this.rightHand)
	        .to({angle:180}, 50, "Linear", true, 0, -1, true);
	    this.lightning = this.game.add.sprite(200, 500, "lightning");
	    this.lightning.anchor.set(0.8,0.5);
	    this.lightning.scale.set(1.2);
	    this.lightning.animations.add('do', [0,1,2], 300, true).play('do');
	    
	    this.rightHand.position = this.position;
	    this.leftHand.position = this.position;
	    this.lightning.position = this.position;
	    
	    this.jumpTimer = 0;
	    this.shotTimer = 0;
	    this.canShot = false;
	    this.killed = false;
	    this.coinsCount = localStorage.getItem("energy") * 1;
	    this.lifes = localStorage.getItem("lifes") * 1;
	    this.jumpSound = this.game.add.audio('jump_sound');
	}

	Player.prototype = Object.create(Phaser.Sprite.prototype);  
	Player.prototype.constructor = Player;

	Player.prototype.update = function() {
	    if (this.killed) return;
	    this.game.physics.arcade.collide(this.ground, this);
	    if (this.body.touching.down) {
	        this.animations.play('run');
	    }
	    if (this.cursors.up.isDown && this.game.time.now > this.jumpTimer && this.body.wasTouching.down) {
	        this.animations.play('jump');
	        this.jumpSound.play();
	        this.body.velocity.y = -600;
	        this.jumpTimer = this.game.time.now + 600;
	    }
	    if (this.canShot && this.cursors.space.isDown && this.game.time.now > this.shotTimer) {
	        this.shot();
	        this.shotTimer = this.game.time.now + 1000;
	    }
	};

	Player.prototype.setVelocity = function (int) {
	    this.body.velocity.x = int;
	};
	    
	Player.prototype.collideWith = function(sprite) {
	    if (!sprite) return false;
	    return Phaser.Rectangle.intersects(sprite.getBounds(), this.getBounds());
	};

	Player.prototype.kill = function() {
	    if (this.killed) return;
	    this.game.add.audio('game_over_sound').play();
	    this.killed = true;
	    this.rightHand.x = -500;
	    this.leftHand.x = -500;
	    Phaser.Sprite.call(this, this.game, 200, 600, "player_death");
	    this.game.physics.arcade.enableBody(this);
	    this.game.add.existing(this);
	    this.lightning.position = this.position;
	    this.anchor.set(0.8, 0.3);
	    this.animations.add('death', [0,1,2,3,4,5], 30);
	    this.animations.play('death');
	    setTimeout(function() {
	        if (!!this.context.enemy.theme)
	            this.context.enemy.theme.stop();
	        this.game.state.start("game_over");
	    }.bind(this), 2000);
	    console.log("player killed");
	};

	Player.prototype.shot = function() {
	    new this.Bullet(this.game, this.enemy, this.x,this.y);
	};

	module.exports = Player;

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	function Enemy(context, name, obstacleStart, obstacleCount) {
	    this.obstacleStart = obstacleStart;
	    this.obstacleCount = obstacleCount;
	    this.name = name;
	    this.context = context;
	    this.game = context.game;
	    this.display = context.display;
	    this.player = context.player;
	    this.ground = context.ground;
	    this.deltaObj = context.delta;
	    this.Obstacle = __webpack_require__(4);
	    this.leftHand = this.game.add.sprite(200, 500, name + "_left_hand");
	    this.leftHand.anchor.set(0.9, 0.4);
	    this.leftTween = this.game.add.tween(this.leftHand)
	        .to({angle:-180}, 400, "Linear", true, 0, -1, true);

	    Phaser.Sprite.call(this, this.game, 1000, 500, name + "_body");
	    this.game.physics.arcade.enableBody(this);
	    this.game.add.existing(this);
	    this.anchor.set(0.7, 0.25);
	    this.animations.add('jump', [6], 1000, true);
	    this.animations.add('run', [0,1,2,3,4,5], 10, true);
	    this.animations.play('run');

	    this.rightHand = this.game.add.sprite(200, 560, name + "_right_hand");
	    this.rightHand.anchor.set(0.1, 0.2);
	    this.rightTween = this.game.add.tween(this.rightHand)
	        .to({angle:180}, 400, "Linear", true, 0, -1, true);

	    this.rightHand.position = this.position;
	    this.leftHand.position = this.position;
	    this.shotTimer = 0;
	    this.jumpTimer = 0;
	    this.swapLvlTimer = this.game.time.now;
	    this.killed = false;
	    this.lifes = 4;
	    this.createHealthHud();
	    this.game.add.audio(this.name + "_apperance").play();
	    this.theme = this.game.add.audio(this.name + "_theme");
	    this.theme.play();
	}

	Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.update = function() {
	    if (this.killed) return;
	    this.game.physics.arcade.collide(this.ground, this);
	    if (this.body.touching.down) {
	        this.animations.play('run');
	    }
	    var timeOnLvl = 20000;
	    var lvlTimer = (this.game.time.now - this.swapLvlTimer) % timeOnLvl;
	    if (lvlTimer > timeOnLvl/2 &&  this.game.time.now > this.jumpTimer && this.body.wasTouching.down) {
	        this.setHudAlpha(1);
	        this.player.canShot = true;
	        this.animations.play('jump');
	        this.body.velocity.y = -600;
	        var r = 1200 + Math.random()*1000;
	        this.jumpTimer = this.game.time.now + r;
	    }
	    if (lvlTimer < timeOnLvl/2 && this.game.time.now > this.shotTimer) {
	        this.setHudAlpha(0);
	        this.player.canShot = false;
	        this.shot();
	        var r = 1200 + Math.random()*400;
	        this.shotTimer = this.game.time.now + r;
	    }
	};

	Enemy.prototype.createHealthHud = function() {
	    this.gray = this.game.add.sprite(499, 19, "gray");
	    this.gray.width = 200;
	    this.healthHud = this.context.game.add.sprite(500, 20, "red");
	    this.setHealthHud();
	};

	Enemy.prototype.setHealthHud = function() {
	    this.healthHud.width = this.lifes * 200 / 4;
	};

	Enemy.prototype.setHudAlpha = function(value) {
	    this.gray.alpha = value;
	    this.healthHud.alpha = value;
	};

	Enemy.prototype.setVelocity = function (int) {
	    this.body.velocity.x = int;
	};

	Enemy.prototype.collideWith = function(sprite) {
	    if (!sprite) return false;
	    return Phaser.Rectangle.intersects(sprite.getBounds(), this.getBounds());
	};

	Enemy.prototype.kill = function() {
	    if (this.killed) return;
	    console.log("enemy killed");
	    this.killed = true;
	    this.rightHand.x = -500;
	    this.leftHand.x = -500;
	    Phaser.Sprite.call(this, this.game, 1000, 500, this.name + "_death");
	    this.game.physics.arcade.enableBody(this);
	    this.game.add.existing(this);
	    this.anchor.set(0.8, 0.3);
	    this.animations.add('death', [0,1,2,3,4,5], 30);
	    this.animations.play('death');
	    this.game.add.audio(this.name + "_death").play();
	    this.theme.stop();
	    var Exit = __webpack_require__(10);
	    var exit = new Exit(this.context);
	    if (this.name == "grodd") {
	        exit.body.allowGravity = false;
	        this.game.add.tween(exit.scale).to({x:0.95, y:0.95}, 400, "Linear", true, 0, -1, true);
	    }
	};

	Enemy.prototype.shot = function() {
	    new this.Obstacle(this.context, this.game.time.now % this.obstacleCount + this.obstacleStart, true, this.x, this.y-100);
	};

	module.exports = Enemy;

/***/ },
/* 10 */
/***/ function(module, exports) {

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	function Level1(currentGame, displaySize, cursors) {
	    this.game = currentGame;
	    this.display = displaySize;
	    this.cursors = cursors;
	    var BaseClass = __webpack_require__(3);
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	function Tutorial(ame, display, cursors) {
	    this.game = game;
	    this.display = display;
	    this.cursors = cursors;
	    this.Obstacle = __webpack_require__(4);
	    this.canCreateObstacles = false;
	    this.canCreateCoins = false;
	    this.canCreateLifes = false;
	    this.Coin = __webpack_require__(5);
	    this.coinTimer = 0;
	    this.lifeTimer = 0;
	    this.index = 0;
	}

	Tutorial.prototype = {
	    preload: function() {
	        this.game.load.image('background_0_1',  'src/img/backgrounds/background_0_1.png');
		    this.game.load.image('background_0_2',  'src/img/backgrounds/background_0_2.png');
	        this.game.load.image('black',           'src/img/hud/black.png'                 );
	        this.game.load.image('obstacle_0_2',    'src/img/obstacles/obstacle_0_2.svg'    );
	    },
	    create: function() {
	        this.game.stage.backgroundColor = '#ffffff';
	        this.firstBackground = this.game.add.tileSprite(0, 0, this.display.w, this.display.h, "background_0_1");
	        this.secondBackground = this.game.add.tileSprite(0, 0, this.display.w, this.display.h, "background_0_2");
	        this.delta = { x: -10 };
	        this.obstacleTimer = 0;
	        var Ground = __webpack_require__(6);
	        this.ground = new Ground(this.game,this.display.h);
	        var Player = __webpack_require__(7);
	        this.player = new Player(this);
	        this.player.coinsCount = 90;
	        this.player.lifes = 4;
	        this.player.canShot=true;
	        this.currentHint = 0;
	        this.tutorialFunctions = [];
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;this.canCreateLifes=true;}.bind(this),
	            button: Phaser.Keyboard.ENTER, 
	            text: "Добро пожаловать в игру The Flash\nДля начала обучения нажмите Enter\nЧтобы пропустить обучение нажмите ESC",
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;this.canCreateLifes=false;this.canCreateCoins=true;}.bind(this),
	            button: Phaser.Keyboard.ENTER, 
	            text: "Сердечки увеличивают ваше здоровье\nДля продолжения нажмите Enter", 
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;this.canCreateCoins=false;this.canCreateObstacles=true;}.bind(this),
	            button: Phaser.Keyboard.ENTER, 
	            text: "Монеты увеличивают вашу энергию\nДля продолжения нажмите Enter", 
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;this.canCreateObstacles=false;}.bind(this),
	            button: Phaser.Keyboard.UP, 
	            text: "Для прыжка нажмите стрелку ВВЕРХ", 
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;}.bind(this),
	            button: Phaser.Keyboard.SHIFT,
	            text: "Для Ускорения удерживайте SHIFT\nЖёлтая шкала показывает остаток энергии", 
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.currentHint++;}.bind(this),
	            button: Phaser.Keyboard.SPACEBAR,
	            text: "Для стрельбы нажмите SPACEBAR", 
	            activated: false});
	        this.tutorialFunctions.push({
	            action: function() {this.game.state.start('level0');}.bind(this),
	            button: Phaser.Keyboard.ENTER,
	            text: "Для начала игры нажмите ENTER", 
	            activated: false});
	        this.createHearts();
	        this.createEnergy();
	    },
	    update: function() {
	        if (!this.tutorialFunctions[this.currentHint].activated) {
	            this.addText(this.tutorialFunctions[this.currentHint].text);
	            this.game.input.keyboard.onUpCallback = function(e) { 
	                if (e.keyCode == this.tutorialFunctions[this.currentHint].button) {
	                    this.tutorialFunctions[this.currentHint].action();
	                }
	                if (e.keyCode == Phaser.Keyboard.ESC){
	                    this.game.state.start('level0');
	                }
	            }.bind(this);
	            this.tutorialFunctions[this.currentHint].activated = true;
	        }
	        if (!this.player.killed && this.delta.x != 0) {
	            if (this.cursors.shift.isDown)
	                this.delta.x = -30;
	            else  
	                this.delta.x = -10;
	        }
	        this.secondBackground.tilePosition.x += this.delta.x;
	        if (this.game.time.now > this.obstacleTimer && this.canCreateObstacles) {
	            this.addObstacle(2, true, this.display.w + 500, 200);
	        }
	        if (this.game.time.now > this.coinTimer && this.canCreateCoins) {
	            this.addCoin();
	        }
	        if (this.game.time.now > this.lifeTimer && this.canCreateLifes) {
	            this.addLife();
	        }
	    },
	    addText: function(text) {
	        if (!!this.lastLabel) this.lastLabel.destroy();
	        if (!!this.lastSprite) this.lastSprite.destroy();
	        this.lastSprite = this.game.add.sprite(0, 0, "black");
	        this.lastSprite.anchor.set(0.5);
	        this.lastLabel = this.game.add.text(0, 0, 
	            text, { font: "45px Arial", fill: "#fbc02d", align: "center" });
	        this.lastLabel.anchor.set(0.5);
	        this.lastSprite.width = this.lastLabel.width;
	        this.lastSprite.height = this.lastLabel.height;
	        this.lastSprite.position = this.lastLabel.position;
	        this.lastLabel.x = this.game.world.centerX;
	        this.game.add.tween(this.lastLabel).to({y:250}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
	    },
	    onUp: function(keyChar) {
	        
	    }, 
	    createHearts: function() {
	        var top = 50;
	        this.heartsHudGroup = this.game.add.group();
	        for (var i = 0; i < 5; ++i)
	            this.heartsHudGroup.create(20 + 30 * i, top, 'heart_hud').scale.set(0.6);
	        this.heartsHudGroup.create(170, top + 2, 'plus').scale.set(0.4);
	        
	        this.setHeartsCount();
	    },
	    setHeartsCount: function() {
	        var count = this.player.lifes;
	        for (var i = 0; i < 6; ++i)
	            this.heartsHudGroup.children[i].alpha = 0;
	        for (var j = 0; j < (count <= 6 ? count : 6); ++j)
	            this.heartsHudGroup.children[j].alpha = 1;
	    },
	    createEnergy: function() { 
	        this.game.add.sprite(19, 79, "gray").width = 200;
	        this.energyHud = this.game.add.sprite(20, 80, "energy_color");
	        this.setEnergyHud();
	    },
	    setEnergyHud: function() {
	        var max = 200;
	        this.energyHud.width = this.player.coinsCount * max / 100;
	    },
	    addObstacle: function (type, physics, x, y) {
	        this.obstacleTimer = this.game.time.now + 3500;
	        new this.Obstacle(this, type, physics, x, y);
	    },
	    addCoin: function () {
	        new this.Coin(this, "coinsCount", "coin");
	        this.coinTimer = this.game.time.now + 1000;
	    },
	    addLife: function () {
	        new this.Coin(this, "lifes", "heart");
	        this.lifeTimer = this.game.time.now + 1000;
	    },
	};

	module.exports = Tutorial;

/***/ },
/* 13 */
/***/ function(module, exports) {

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


/***/ },
/* 14 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);