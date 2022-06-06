const buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = []; //push color after nextSequence()
var userClickPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  //key should be pressed only once
  if (!started) {
    $("#level-title").text("Level " + level); //will change to display "Level 0"only
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickPattern.push(userChosenColor);

  animatePress("#" + this.id);
  playSound(this.id);

  checkAnswer(userClickPattern.length - 1);
});

function nextSequence() {
  userClickPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //generate random number between 0-3
  var randomChosenColor = buttonColors[randomNumber]; //choose color by random number
  gamePattern.push(randomChosenColor); //append the color to gamePattern

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

//if userClickPattern.length === gamePattern.length

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } 
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    $("h1").text("Game Over,Press Any Key to Start");
    $(document).keypress(startOver());
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}