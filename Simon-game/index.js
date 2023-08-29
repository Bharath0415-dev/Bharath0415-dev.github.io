var gameSequence=[]
var buttonColor=["green","red","yellow","blue"]
var userButton=[]
var toggle=false;
var level=0;
var highScore=0;
$(document).keydown(function(){
    if(!toggle){
        $("#level-title").text("LEVEL "+level);
        nextSequence();
        toggle=true;
    }
})
function nextSequence(){
    userButton=[];
    level++
    $("#level-title").text("LEVEL "+level);
    var randomNumber=Math.floor(Math.random()*3);
    var buttonSelected=buttonColor[randomNumber];
    gameSequence.push(buttonSelected);
    $("."+buttonSelected).fadeOut(100).fadeIn(100);
    playSound(buttonSelected);
}   
$(".btn").click(function(){
    var buttonPressed=$(this).attr("id");
    userButton.push(buttonPressed);
    playSound(buttonPressed);
    animatePress(buttonPressed)
    checkAnswer(userButton.length-1)
})
function checkAnswer(currentLevel){
    if(gameSequence[currentLevel]===userButton[currentLevel]){
        console.log("success");
        if(gameSequence.length===userButton.length){
            setTimeout(function(){
                nextSequence();
            },1000)

        }
    }else{
        console.log("wrong");
        playSound("wrong");
        if(level>highScore){
            highScore=level-1;
        }
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            startover();
        },200)

    }
}

function playSound(key)
{
    var soundPlayed=new Audio("sounds/"+key+".mp3");
    soundPlayed.play();
}
function animatePress(pressed){
    $("#"+pressed).addClass("pressed");
    setTimeout(function(){
        $("#"+pressed).removeClass("pressed")
    },100)
}
function startover(){
    gameSequence=[];
    toggle=false;
    level=0;
    $("#level-title").text("Game Over,Press A Key to Restart");
    $("footer").text("HighScore = "+highScore);
}
