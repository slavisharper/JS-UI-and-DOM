/*
 * It is not finished but a tried to use as man things in this homework
 * as i can. I could do with the requestAnimeFrame but i tried something else
 * and didn't have time for changes. Things left to do : Better visuals (for
 * the html page and element ) and remove some small bugs
 */

function startGame() {
    var canvas = document.getElementById("snake-game");
    var ctx = canvas.getContext("2d");
    var fieldWidth = 450;
    var fieldHeight = 450;
    var speed = 80;
    var cellWidth = 10;
    var direction;
    var food;
    var score;
    var snakeArray; 
    var isInGame = false;
    var playerName = 'player'; //default name

   //var snakePattern;
   //var snakeSkinImg = new Image();
   //snakeSkinImg.src = 'images/skin.png';
   //snakeSkinImg.onload = function () {
   //    snakePattern = ctx.createPattern(snakeSkinImg, 'repeat');
   //};

    var fieldPatter;
    var patternImg = new Image();
    patternImg.src = 'images/wood.png';
    patternImg.onload = function () {
        fieldPatter = ctx.createPattern(patternImg, 'repeat');
    }

    //Listeners
    var saveButton = document.getElementById('save-score-btn');
    saveButton.addEventListener("click", function (e) {
        saveScore();
    });
    var showScoreButton = document.getElementById('scores');
    showScoreButton.addEventListener('click', function (e) {
        printTopScores();
    });

    //hides save score when start a new game
    var saveScoreEl = document.getElementById('save-score-field');
    saveScoreEl.style.display = "none";

    function initialize(){
        direction = "right"; //default direction
        createSnake();
        createFood();
        score = 0;
        isInGame = true;

        if (typeof game_loop != "undefined") {
            clearInterval(game_loop);
        }
        game_loop = setInterval(paint, speed);
    }
    initialize();
	
    function createSnake(){
        var length = 3; //Length of the snake
        snakeArray = [];
        for(var i = length - 1; i >= 0; i -= 1)
        {
            snakeArray.push({x: i, y:0});
        }
    }
	
    function createFood() {
        //sometimes to generat food that gives more points
        var isNormalFood = true;
        var bigFoodChance = Math.floor((Math.random() * 100));  // 0 - 100
        var scoreValue = 10;
        var foodColor = "#FF3300";

        if (bigFoodChance < 10) { //around 10 % chance
            scoreValue = 50;
            foodColor = "#990066";
        }
        food = {
            x: Math.round(Math.random()*(fieldWidth - cellWidth) / cellWidth), 
            y: Math.round(Math.random() * (fieldHeight - cellWidth) / cellWidth),
            score: scoreValue,
            color: foodColor
        };
    }
	
    function paint(){
        ctx.fillStyle = fieldPatter;  //'white';
        ctx.fillRect(0, 0, fieldWidth, fieldHeight);
		
        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;

        //The position of the head cell.
        if (direction == "right") {
            nx++;
        }
        else if (direction == "left") {
            nx--;
        }
        else if (direction == "up") {
            ny--;
        }
        else if (direction == "down") {
            ny++;
        }
		
        //Game over clauses
        if (nx == -1 || nx == fieldWidth / cellWidth || ny == -1 ||
                ny == fieldHeight / cellWidth || checkCollision(nx, ny, snakeArray)){
            endGame();
            isInGame = false;
            return;
        }
		
        //Create a new head instead of moving the tail
        if(nx == food.x && ny == food.y) {
            var tail = {x: nx, y: ny};
            score += food.score;

            createFood();
        }
        else{
            var tail = snakeArray.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
		
        snakeArray.unshift(tail); //puts back the tail as the first cell
		
        for(var i = 0; i < snakeArray.length; i++){
            var cell = snakeArray[i];
            paintSnakeCell(cell.x, cell.y);
        }
		
        paintFood(food.x, food.y);
        var scoreText = "Score: " + score;
		ctx.font = "12px Consolas";
        ctx.fillText(scoreText, 5, fieldHeight - 5);

        if (score >= 100 && score < 200) {
            speed = 70;
        }
        else if (score >= 200 && score < 250) {
            speed = 60;
        }
        else if (score >= 250 && score < 500) {
            speed = 50;
        }
        else {
            speed = 40;
        }
    }
	
    function paintSnakeCell(x, y) {
        ctx.fillStyle = '#009900';//snakePattern; //'#009900';
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        ctx.strokeStyle = "#66FF33";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    function paintFood(x, y) {
        ctx.fillStyle = food.color;
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }
	
    function checkCollision(x, y, array) {
        for(var i = 0; i < array.length; i++)
        {
            if(array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    function saveScore() {
        var name = document.getElementById('player-name').value;
        name = name || playerName;
        localStorage.setItem(name, score.toString());
        var saveScoreEl = document.getElementById('save-score-field');
        saveScoreEl.style.display = "none";
    }
	
    function endGame() {
        clearInterval(game_loop);
        var saveScoreEl = document.getElementById("save-score-field");
        saveScoreEl.style.display = "block";

        //Paint end game on canvas
        ctx.fillStyle = fieldPatter;  //'white';
        ctx.fillRect(0, 0, fieldWidth, fieldHeight);
        ctx.fillStyle = 'black';
        ctx.font = "40px Georgia";
        ctx.fillText("GAME OVER!", 100, 200);
        ctx.font = '30px Consolas';
        ctx.fillStyle = 'green';

        var scoreString = "Your score: " + score;
        var startPoint = fieldWidth / 2 - scoreString.length;
        ctx.fillText(scoreString, 120, 250);
    }

    function printTopScores() {
        var scoreField = document.getElementById('top-scores-field');

        while (scoreField.firstChild) {
            scoreField.removeChild(scoreField.firstChild);
        }

        var storageLength = localStorage.length;
        var topScores = [];
        console.log('storage length: ' + storageLength);

        for (var i = 0; i < storageLength; i++) {
            var key = localStorage.key(i);
            var value = parseInt(localStorage.getItem(key));
            console.log(key + ": " + value);
            topScores[i] = { name: key, score: value };
        }

        //sort scores and remove to stay top 15 results
        topScores.sort(function (a, b) {
            return b.score - a.score;
        });
		
		if (topScores.length > 15){
			var removeCount = topScores.length - 15;
			topScores.splice(15, removeCount);
		}
        
        var htmlScoreList = document.createElement('ul');

        for (var i = 0; i < topScores.length; i++) {
            var liScoreElement = document.createElement('li');
            liScoreElement.innerHTML = (i + 1) + ". " + topScores[i].name + " - " +
                topScores[i].score + " points."
            htmlScoreList.appendChild(liScoreElement);
        }
        scoreField.appendChild(htmlScoreList);
    } 
    //Keyboard controls
    window.addEventListener('keydown', function (e) {
        var key = e.which;
        //Prevent reverse gear
        if (key == "37" && direction != "right") {
            direction = "left";
        }
        else if (key == "38" && direction != "down") {
            direction = "up";
        }
        else if (key == "39" && direction != "left") {
            direction = "right";
        }
        else if (key == "40" && direction != "up") {
            direction = "down";
        }
    })
}