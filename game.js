//Global Variables

let colors = ["red", "blue", "green", "yellow"]; //Array of possible button colors
let gameInProgress = false;
let colorPattern = [];
let level = 0;
let sequence = 0;
let highScore = 0;

//Main Body

$("body").keypress(function() {
    if(!gameInProgress) {
        gameInProgress = true;
        resetGame();
        updateRound();
        setTimeout(updatePattern, 1000);
    }
});
    
$(".btn").click(function() {
    if (gameInProgress) {
        playerAnswer($(this).attr("id"));
    }   else {
        playSound("wrong");
    }
});

function playerAnswer(pressed) {
    displayColor(pressed);
    if(checkAnswer(pressed, colorPattern[sequence])) {
        sequence++;
        if (sequence >= colorPattern.length) {
            sequence = 0;
            updateRound();
            setTimeout(updatePattern, 1500);
        }
    }   else {
        $("#level-title").text("Game Over! Press Any Key to Restart");
        if (level-1 > highScore) { 
            highScore = level-1; 
            $("#high-score").text("* New High Score: " + highScore + " *");
        }
        $("body").addClass("game-over");
        gameInProgress = false;
        setTimeout(function() { $("body").removeClass("game-over"); }, 200);
    }
}

//Utility Functions

function updatePattern() {
    colorPattern.push(colors[Math.floor(Math.random()*4)]);
    for (let i = 0; i < colorPattern.length; i++) {
        setTimeout(function () {
            displayColor(colorPattern[i]);
            playSound(colorPattern[i]);
        }, i*500);
    }
}

function checkAnswer(answer, question) {
    if (answer === question) {
        playSound(answer);
        return true;
    } else {
        playSound("wrong");
        return false;
    }
}

function resetGame() {
    colorPattern = [];
    level = 0;
    sequence = 0;
    if (highScore > 0) { $("#high-score").text("High Score: " + highScore); }
}

function updateRound() {
    level++;
    $("#level-title").text("Level "+ level);
}

function displayColor(color) {
    $("#"+color).addClass("pressed");
    setTimeout( function() {
        $("#"+color).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    let sound = new Audio("sounds/"+ color + ".mp3");
    sound.play();
}