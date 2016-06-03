function Game(context, index, nextLevelName, changeDistance, obstacleCount) {
    this.obstacleCount = obstacleCount;
    this.game = context.game;
    this.display = context.display;
    this.cursors = context.cursors;
    this.Obstacle = require('./obstacle.js');
    this.Coin = require('./coin.js');
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
        var Ground = require('./ground.js');
        this.delta = { x: -10 };
        this.ground = new Ground(this.game,this.display.h);
        this.secondBackground.fixedToCamera = true;
        var Player = require('./player.js');
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
        var Enemy = require('./enemy.js');
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