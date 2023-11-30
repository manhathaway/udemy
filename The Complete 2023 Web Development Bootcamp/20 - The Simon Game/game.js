const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
    level = level + 1;
    $("h1").text(`Level ${level}`);

    let randomNumber = Math.round(Math.random() * 3);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (let i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                playSound(gamePattern[i]);
            }, 500 * i);
        })(i);
    }
}

$(".btn").click(function() {
    let userChosenColor = this.id;
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);

    if (gamePattern.length === userClickedPattern.length) {
        if (gamePattern.toString() === userClickedPattern.toString()) {
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 500);
        } else {
            let gameOver = new Audio("./sounds/wrong.mp3");
            gameOver.play();
            $("h1").text("GAME OVER");
            setTimeout(function(){
                location.reload();
            }, 5000);
        }
    }
});


function playSound(name) {
    $(`#${name}`).fadeIn(100).fadeOut(100).fadeIn(100);
    let buttonSound = new Audio(`./sounds/${name}.mp3`);
    buttonSound.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

$(window).one('keydown', function(){
    $("h1").text(`Level ${level}`);
    nextSequence();
});