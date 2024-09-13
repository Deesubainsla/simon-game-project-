

var buttonColours = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;

    }
});
document.querySelector("#rstbtn").addEventListener("click",()=>{
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
    document.querySelector("#rstbtn").style.display = "none";
});



function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio= new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        document.querySelector("#rstbtn").style.display = "inline-block";

        $("#level-title").text("Game over, Press any key or button to restart:");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern=[];
    started=false;
}

