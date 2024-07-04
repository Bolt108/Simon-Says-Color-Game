var buttonColours = ["red", "blue", "green", "yellow"];
console.log("I'm here!")
var gamePattern = [];
var userClickedPattern = [];
var started = false; 
var level = 0;

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        console.log(userClickedPattern, gamePattern);
        console.log(gamePattern.length)
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                console.log(gamePattern.length)
                nextSequence();
              }, 1000);
        }

    } else {
        console.log("wrong");
        var audio = new Audio("sounds/" + "wrong" + ".mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }   
}

$(document).keypress(function() {
  if (!started) {
    console.log("started!");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});


function nextSequence(){
    console.log(gamePattern);
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = []
    started = false;
}