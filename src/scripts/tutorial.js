function Tutorial(ame, display, cursors) {
    this.game = game;
    this.display = display;
    this.cursors = cursors;
    this.Obstacle = require('./obstacle.js');
    this.canCreateObstacles = false;
    this.canCreateCoins = false;
    this.canCreateLifes = false;
    this.Coin = require('./coin.js');
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
        var Ground = require('./ground.js');
        this.ground = new Ground(this.game,this.display.h);
        var Player = require('./player.js');
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