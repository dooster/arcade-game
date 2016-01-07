/* TODO
-create a second level area? collect enough gems for underwater level
-create a splash screen with character select
*/

//create global variable level which is used to determine enemy speed
//and increases every time a player scores
var level = 1;
var levelEl = document.getElementById('level');

//a global variable displaying the player's score, starting at 0
var scoreEl = document.getElementById('score');

var Character = function() {
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//a basic enemy object creator function that determines:
//x && y coordinates based on input parameters
//a random base speed, and the character sprite
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() + (Math.random()*3);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Character.prototype);

//function responsible for enemy movement which takes dt as param
//speed is increased in proportion to level
//enemy's loop. After disappearing off the right side of the canvas
//they reappear at a -110 x-point
Enemy.prototype.update = function(dt) {
    (this.x += this.speed + (level * 0.3)) * dt;
    if (this.x > 505) {
        this.x = -110;
    }
};

//Enemy.prototype.render();

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//creates a heart object at initial randomized rows from 2 to 4
var Heart = function () {
    this.x = getRandomInt(0, 4) * 101;
    this.y = getRandomInt(1, 4) * 83;
    this.sprite = 'images/heart-purple-small.png';
};

//creates a location function for the heart with random
//x && y coordinates in rows 2 to 4 and any column
Heart.prototype.location = function () {
    this.x = getRandomInt(0, 4) * 101;
    this.y = getRandomInt(1, 4) * 83;
};

//creates the heart based on the location function
Heart.prototype.create = function () {
    heart.location();
};

//the function removes the heart from the board
//and calls the create function, respawning the heart
//at a random location after 11.5 seconds
Heart.prototype.disappear = function () {
    heart.x = -100;
    setTimeout(heart.create, 11500);
};

//Hearts make the player hearty and increase
//total number of lives and player speed upon contact
Heart.prototype.collision = function () {
    if (player.x <= heart.x + 65 &&
        player.x + 65 >= heart.x &&
        player.y <= heart.y + 55 &&
        player.y + 90 >= heart.y)
    //contact pushes an extra unicode heart ('&#128154;')
    //into the player live's array, calls the disappear function
    //and increases player speed
    {
        player.lives.push('&#128156;');
        heart.disappear();
        player.speed += 2;
    }
};

Heart.prototype.update = function (dt) {
    heart.collision();
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//creates a gem object with random initial coordinates
//it has a spawn time of 7 seconds, which will increase
//and a counter, which starts at zero but can increase and decrease
var Gem = function () {
    this.x = (getRandomInt(0, 4) * 101) + 20;
    this.y = (getRandomInt(1, 5) * 83) + 15;
    //this.speed = 4; //if decide to make gems move
    this.sprite = 'images/gem-blue.png';
    this.spawnTime = 7000;
    this.count = [];
};

//a funcion that randomizes the gem's location
Gem.prototype.location = function () {
    this.x = (getRandomInt(0, 4) * 101) + 20;
    this.y = (getRandomInt(1, 6) * 83) + 15;
};

//places the gem randomly on the gameboard
Gem.prototype.create = function () {
    gem.location();
};

//when called, hides the gem off screen and
//creates a gem again, after it's spawnTime
Gem.prototype.disappear = function () {
    this.x = -100;
    setTimeout(gem.create, gem.spawnTime);
};

//gems are valuable but extremely big and heavy
Gem.prototype.collision = function () {
    if (player.x <= gem.x + 55 &&
        player.x + 70 >= gem.x &&
        player.y <= gem.y + 45 &&
        player.y + 90 >= gem.y)
    //on contact, each gem:
    //increases a player's score, which is written onto the browser
    //calls the gem's disappear function
    //increases the spawn time by a quarter second, making the gems rarer
    //increases the player's gem count by 1
    //and decreases the player's speed by 2 due to their weight.
    {
        player.score += 50;
        scoreEl.textContent = 'Score: ' + player.score;
        gem.disappear();
        gem.spawnTime += 250;
        gem.count.push('&#128142;');
        player.speed -= 2;
        gem.cssUpdate();
    }
    if (heart.x <= gem.x + 30 &&
        heart.x + 30 >= gem.x &&
        heart.y <= gem.y + 50 &&
        heart.y + 50 >= gem.y
        )
    //if a gem and a heart appear in the same location, the gem will
    //immediately move locations
    {
        gem.create();
    }
};

Gem.prototype.cssUpdate = function () {
    if (gem.count.length > 0) {
        var gemCSS = document.getElementById('gem');
        gemCSS.style.padding = '-1px';
    }
};

Gem.prototype.update = function (dt) {
    gem.collision();
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//creates the player object, determines starting position, speed, and sprite
var Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-cat-girl.png';
    this.speed = 30;
<<<<<<< HEAD
    this.score = 0;
    this.lives = ['&#128156;', '&#128156;', '&#128156;'];
};
||||||| merged common ancestors
}
=======
};
>>>>>>> b269bc9990a8dcd96af3365db4a2f0dbe20ccb89

//sets the bounds of the player's movement
Player.prototype.playerBounds = function() {
    if(player.x < 0) {
        player.x = 0;
    }
    else if(player.x > 402){
        player.x = 402;
    }

    if(player.y < 0) {
        player.y = 0;
    }
    else if(player.y > 400){
        player.y = 400;
    }
};

//sets the player's movement so that a keypress leads to the
//movement of the player in that direction based on the player's speed
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= this.speed;
    }
    if (key == 'up') {
        this.y -= this.speed;
    }
    if (key == 'right') {
        this.x += this.speed;
    }
    if (key == 'down') {
        this.y += this.speed;
    }
<<<<<<< HEAD
};

//this function adds 100 to the player's score and writes it to the browser,
//increases the level, speeding up the enemy,
//and returns the player to a starting position
//if the player's y coordinate is less than 60
Player.prototype.addScore = function() {
    if (player.y < 60) {
        player.x = 200;
        player.y = 400;
        player.score += 100;
        scoreEl.textContent = 'Score: ' + player.score;
        level++;
        levelEl.textContent = 'Level: ' + level;
    }
};

//this function writes the number of new lives to the browser
//as a string, from the player.lives array
//if the player.lives function is empty, it calls the gameOver function
Player.prototype.playerLife = function() {
    var lifeEl = document.getElementById('life');
    lifeEl.innerHTML = 'Lives: ' + player.lives.join("");
    if (player.lives == false) {
        gameOver();
    }
};

//this function writes the number of gems to the browser
//as a string, from the gem.count array
Player.prototype.playerGem = function() {
    var gemEl = document.getElementById('gem');
    gemEl.innerHTML = 'Gems: ' + gem.count.join("");
};

//The player.update function keeps track of all the functions related
//to the player. It modifies the player's location,
//and calls the playerBounds, score, and playerLife functions
Player.prototype.update = function(dt) {
    player.playerBounds();
    player.addScore();
    player.playerLife();
    player.playerGem();
};
||||||| merged common ancestors
}
=======
};
>>>>>>> b269bc9990a8dcd96af3365db4a2f0dbe20ccb89

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//a function that checks to see if the player and enemy sprites collide
function checkEnemyCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= allEnemies[i].x + 70 &&
            player.x + 70 >= allEnemies[i].x &&
            player.y <= allEnemies[i].y + 50 &&
            player.y + 50 >= allEnemies[i].y)
            //if there is a collision:
            //the player returns to the starting coordinates on the canvas,
            //the player life array loses a heart,
            //and the player speed decreases by two due to the loss of life
        {
                player.x = 200;
                player.y = 415;
                player.lives.splice(-1, 1);
                player.speed -= 2;
                //additionally, if the player score is greater or equal to 50,
                //the player loses 50 points and that is written into the browser
                if (player.score >= 50) {
                    player.score -= 50;
                    scoreEl.textContent = 'Score: ' + player.score;
                }
                //And if the gem count is greater or equal to one,
                //the player loses a gem to the greedy bugs
                //but the loss of the additional weight makes the player's speed
                //increase by 2
                if (gem.count.length >=1) {
                    gem.count.splice(-1, 1);
                    player.speed += 2;
                }
        }
    }
}

<<<<<<< HEAD
||||||| merged common ancestors
//this function adds 100 to the player's score and writes it to the browser,
//increases the level, speeding up the enemy,
//and returns the player to a starting position
//if the player's y coordinate is less than 60
function score() {
    if (player.y < 60) {
        player.x = 200;
        player.y = 400;
        playerScore += 100;
        scoreEl.textContent = 'Score: ' + playerScore;
        level++;
        levelEl.textContent = 'Level: ' + level;
    }
}
//this function writes the number of new lives to the browser
//as a string, from the playerLives array
//if the playerLives function is empty, it calls the gameOver function
function playerLife() {
    var lifeEl = document.getElementById('life');
    lifeEl.innerHTML = 'Lives: ' + playerLives.join("");
    if (playerLives == false) {
        gameOver();
    }
}

//this function writes the number of gems to the browser
//as a string, from the gem.count array
function playerGem() {
    var gemEl = document.getElementById('gem');
    gemEl.innerHTML = 'Gems: ' + gem.count.join("");
}

//The player.update function keeps track of all the functions related
//to the player. It modifies the player's location,
//and calls the playerBounds, score, and playerLife functions
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
    playerBounds();
    score();
    playerLife();
    playerGem();
}

=======
//this function adds 100 to the player's score and writes it to the browser,
//increases the level, speeding up the enemy,
//and returns the player to a starting position
//if the player's y coordinate is less than 60
function score() {
    if (player.y < 60) {
        player.x = 200;
        player.y = 400;
        playerScore += 100;
        scoreEl.textContent = 'Score: ' + playerScore;
        level++;
        levelEl.textContent = 'Level: ' + level;
    }
}
//this function writes the number of new lives to the browser
//as a string, from the playerLives array
//if the playerLives function is empty, it calls the gameOver function
function playerLife() {
    var lifeEl = document.getElementById('life');
    lifeEl.innerHTML = 'Lives: ' + playerLives.join("");
    if (playerLives == false) {
        gameOver();
    }
}

//this function writes the number of gems to the browser
//as a string, from the gem.count array
function playerGem() {
    var gemEl = document.getElementById('gem');
    gemEl.innerHTML = 'Gems: ' + gem.count.join("");
}

//The player.update function keeps track of all the functions related
//to the player. It modifies the player's location,
//and calls the playerBounds, score, and playerLife functions
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
    playerBounds();
    score();
    playerLife();
    playerGem();
};

>>>>>>> b269bc9990a8dcd96af3365db4a2f0dbe20ccb89
//a simple function called when the player runs out of lives
//that resets all aspects of the game
function gameOver() {
    allEnemies = [
    new Enemy(-140, 66),
    new Enemy(-340, 66),
    new Enemy(-110, 140),
    new Enemy(-310, 140),
    new Enemy(-70, 230),
    new Enemy(-270, 230)
    ];
    level = 1;
    levelEl.textContent = 'Level: ' + level;
    gem.count = [];
    player.lives = ['&#128156;', '&#128156;', '&#128156;'];
    player.speed = 24;
    player.score = 0;
    scoreEl.textContent = 'Score: ' + player.score;
}

//Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//creates a true random number between minimum and maximum
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var gem = new Gem();
var heart = new Heart();
var player = new Player();
var allEnemies = [
    new Enemy(-140, 66),
    new Enemy(-340, 66),
    new Enemy(-110, 140),
    new Enemy(-310, 140),
    new Enemy(-70, 230),
    new Enemy(-270, 230)
    ];

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
