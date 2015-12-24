var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() + (Math.random()*3);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    (this.x += this.speed) * dt;
    if (this.x > 505) {
        this.x = -110;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.x = 200;
    this.y = 415;
    this.speed = 100;
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
    playerBounds();
    score();
    //playerLife();
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

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 101;
    }
    if (direction == 'up') {
        this.y -= 83;
    }
    if (direction == 'right') {
        this.x += 101;
    }
    if (direction == 'down') {
        this.y += 83;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var playerLives = 3;
var playerHearts = 'images/Heart.png';
var lifeEl = document.getElementById('life');
lifeEl.textContent = 'Lives: ' + playerLives;

var playerScore = 0;
var scoreEl = document.getElementById('score');
scoreEl.textContent = 'Score: ' + playerScore;

function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= allEnemies[i].x + 70
            && player.x + 70 >= allEnemies[i].x
            && player.y <= allEnemies[i].y + 50
            && player.y + 50 >= allEnemies[i].y)
        {
                player.x = 200;
                player.y = 415;
                if (playerScore >= 100) {
                    playerScore -= 100;
                    var scoreEl = document.getElementById('score');
                    scoreEl.textContent = 'Score: ' + playerScore;
                }
                if (playerLives >= 1) {
                    playerLives--;
                    lifeEl.textContent = 'Lives: ' + playerLives;
                }
                //reset(); //create reset function
        }
    }
}

function score() {
    if (player.y < 60) {
        player.x = 200;
        player.y = 415;
        playerScore += 100;
        var scoreEl = document.getElementById('score');
        scoreEl.textContent = 'Score: ' + playerScore;
    }
}

/*function playerLife() {
    for (var i = 0; i < playerLives; i++) {
        playerLives[i] = playerHearts;
        var lifeEl = document.getElementById('life');
        lifeEl.write = 'Lives: ' + playerHearts;
    }
}*/

function gameOver() {
    //if playerLives = 0 ...
}

var player = new Player();
var allEnemies = [
    new Enemy(-110, 66),
    new Enemy(-310, 66),
    new Enemy(-110, 140),
    new Enemy(-310, 140),
    new Enemy(-110, 230),
    new Enemy(-310, 230)
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
