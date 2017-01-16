// Global Variables
var allItems = [];
var allEnemies = [];
var enemySpeeds = [101, 181, 201, 301, 420, 450, 600],
    enemyPositionY = [83, 150, 220, 300];
var gameScore;
var gameHasStarted = false;
var instructions = $('canvas');
var selectionCharacters = ['images/Star.png', 'images/Heart.png', 'images/Key.png', 'images/Gem-orange.png', 'images/Gem-blue.png', 'images/Gem-green.png'];
/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

var Game = function() {
    this.stop = false;
    this.reset = function() { location.reload(); }

    this.gameOver = function() {
        var overlay = document.getElementById('game');
        overlay.parentNode.removeChild(overlay);
        var gameOverMsg = document.getElementById('gameover');
        var noLifeMessage = 'Unfortunately, you failed and died too much!';
        var scoreMessage = 'Your final score is' + gameScore + '!';
        if (player.health < 1) {
            gameOverMsg.innerHTML = noLifeMessage + scoreMessage;
        } else {
            gameOverMsg.innerHTML = scoreMessage;
        }

    }
}

/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101
    this.y = enemyPositionY[Math.floor(Math.random() * 3)]
    this.speed = enemySpeeds[Math.floor(Math.random() * 7)];
    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x = this.x + (this.speed * dt);
        if (this.x > ctx.canvas.width) {
            this.x = -101;
            this.y = this.y + 90;
            this.speed = enemySpeeds[Math.floor(Math.random() * 7)]
            if (this.y > 230) {
                this.y = 60;
            }
        };
    }
    // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Player class
 *   -- constructs player
 * @constructor
 *
 */
var Player = function() {
    this.sprite = 'images/char-boy.png'
    this.x = 404;
    this.y = 392;
    this.health = 7;
    this.isDead = false;
    this.hasStar = false;

    this.reset = function() {
        this.x = 404;
        this.y = 392;
        this.health -= 1;

    }

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


/**
 * update updates the life status , points, etc of user
 * @param {number} dt
 * @return {void}
 */

Player.prototype.update = function() {

    if (this.x > 804) {
        this.reset();
    } else if (this.y < 11) {
        this.reset();
    } else if (this.x < 0) {
        this.reset();
    } else if (this.y > 475) {
        this.reset();
    }

    if (this.hasStar) {
        this.starMode();
    }

    if (this.health < 1) {
        this.isDead = true;
    }
}


/**
 * handleInput  handles user inputted keypresses
 * @param {string} key from code of key pressed
 * @return {void}
 */

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0)
                this.x -= 100;
            break;
        case 'up':
            if (this.y > 0)
                this.y -= 83;
            break;
        case 'right':
            if (this.x < 900)
                this.x += 100;
            break;
        case 'down':
            if (this.y < 600)
                this.y += 83;
            break;
        default:
            return;

    };
};

Player.prototype.starMode = function() {


    //player has 1.5 the speed and
    // is unaffected by bug bitss

}


/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


/** Item Class
 * item that player uses to earn points, receive special powers, earn more health
 * @constructor
 */

var Item = function() {
    this.possibleX = [0, 100, 200, 300, 400, 500, 600, 800, 700];
    this.possibleY = [80, 160, 240, 320, 400, 480];
    this.x = this.randomizeX();
    this.y = this.randomizeY();
    allItems.push(this);
}

Item.prototype.randomizeX = function() {
    var xO = this.possibleX[Math.floor(Math.random() * this.possibleX.length)];
    return xO;

};
Item.prototype.randomizeY = function() {
    var yO = this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
    return yO;
};
Item.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
};
Item.prototype.reset = function() {
    this.x = this.randomizeX();
    this.y = this.randomizeY();
}
Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---
*/


/** Helper Class
 * item that player uses to earn points, receive special powers, earn more health
 * @constructor
 * @extends Item class
 */

var Helper = function() {
    Item.call(this);
    this.loadItem();
    this.reset();
}


Helper.prototype = Object.create(Item.prototype);
Helper.prototype.constructor = Helper;


Helper.prototype.loadItem = function() {
    this.possibleSprites = selectionCharacters;
    this.sprite = this.possibleSprites[Math.floor(Math.random() * this.possibleSprites.length)]

};

Helper.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Helper.prototype.reset = function() {
    var dass = this;
    dass.x = -101;
    dass.y = -101;

    setInterval(function() {
        dass.loadItem();
        Item.prototype.reset.call(dass);
    }, 3000);

    
};
/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();
var player = new Player();
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
var enemyE = new Enemy(); 
var item = new Helper();
/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        13: 'enter'
    };
    e.preventDefault()
    player.handleInput(allowedKeys[e.keyCode]);
});
