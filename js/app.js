/* TODO
-implement gems that give points and time based bonuses
-create a gameover function
    -resets player location
    -resets enemy location and speed
    -resets score
    -resets lives
    -takes back to splash screen and character select?
-create a second level area?
-create a splash screen with character select
-modify lives and score CSS
-implement heart powerup section?
-collect enough gems to enter additional underwater level
*/
var level = 1;
var levelEl = document.getElementById('level');

var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() + (Math.random()*3);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    (this.x += this.speed + (level * .3)) * dt;
    if (this.x > 505) {
        this.x = -110;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function () {
    this.x = getRandomInt(0, 4) * 101;
    this.y = getRandomInt(1, 4) * 83;
    this.sprite = 'images/Heart.png';
}

Heart.prototype.location = function () {
    this.x = getRandomInt(0, 4) * 101;
    this.y = getRandomInt(1, 4) * 83;
}

Heart.prototype.create = function () {
    heart.location();
}

Heart.prototype.disappear = function () {
    heart.x = -100;
    setTimeout(heart.create, 11500);
}

Heart.prototype.collision = function () {
    if (player.x <= heart.x + 70
        && player.x + 70 >= heart.x
        && player.y <= heart.y + 50
        && player.y + 50 >= heart.y)
    {
        playerLives.push('&#128154;');
        heart.disappear();
    }
}

Heart.prototype.update = function (dt) {
    heart.collision();
}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
    playerBounds();
    score();
    playerLife();
}

function playerBounds() {
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
}

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= 101;
    }
    if (key == 'up') {
        this.y -= 83;
    }
    if (key == 'right') {
        this.x += 101;
    }
    if (key == 'down') {
        this.y += 83;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var playerLives = ['&#128154;', '&#128154;', '&#128154;'];

var playerScore = 0;
var scoreEl = document.getElementById('score');

function checkEnemyCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= allEnemies[i].x + 70
            && player.x + 70 >= allEnemies[i].x
            && player.y <= allEnemies[i].y + 50
            && player.y + 50 >= allEnemies[i].y)
        {
                player.x = 200;
                player.y = 415;
                playerLives.splice(-1, 1);
                if (playerScore >= 50) {
                    playerScore -= 50;
                    scoreEl.textContent = 'Score: ' + playerScore;
                }
                //reset(); //create reset function
        }
    }
}

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

function playerLife() {
    for (var i = 1; i <= 3; i++) {
        var lifeEl = document.getElementById('life');
        lifeEl.innerHTML = 'Lives: ' + playerLives.join("");
    }
}

/*function gameOver() {
    if (playerLives == false) {

    }
}*/

//Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//creates a true random number between minimum and maximum
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});