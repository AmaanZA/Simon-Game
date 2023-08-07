function random(){
    var holder = Math.floor(Math.random() * 4);
    return holder;
}

var block_colours = ["green", "red", "yellow", "blue"];
var game_pattern = [];
var current_sequence = [];

var is_started = false;
var level = 0;

$(document).keydown(function(){
    if(!is_started){
        is_started = true;
        level = 1;
        $("p").text("Level " + level);
        next_tile();
    }
})

$(".blocks").click(function(){
    if(is_started){
        var pressed_block = $(this).attr("id");
        $("#" + pressed_block).addClass("pressed");
        setTimeout(function(){
            $("#" + pressed_block).removeClass("pressed");
        }, 70);
        current_sequence.push(pressed_block);
        check_answer();
    }
})

function check_answer(){
    if(!(game_pattern[current_sequence.length - 1] == current_sequence[current_sequence.length -1])){
        is_started = false;
        level = 0;
        game_pattern = [];
        $("body").addClass("game_over");
        setTimeout(function(){
            $("body").removeClass("game_over");
        }, 300);
        $("p").text("PRESS A KEY TO START");
    }
    if(current_sequence.length == game_pattern.length){
        level++;
        next_tile();
    }
}

function next_tile(){
    $("p").text("Level " + level);
    current_sequence = [];
    var rand_num = random();
    var new_colour = block_colours[rand_num];
    setTimeout(function(){
        $("#" + new_colour).fadeIn(100).fadeOut(100).fadeIn(100);
    },400);
    game_pattern.push(new_colour);
}

function playSound(button_id){
    var sound = new Audio("sounds/" + button_id + ".mp3" )
    sound.play();
}
