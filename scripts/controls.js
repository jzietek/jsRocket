var keys = {
    upKeyPressed : false,
    downKeyPressed : false,
    leftKeyPressed : false,
    rightKeyPressed : false
};

var rocketState = { 
    x : 300, 
    y: 300, 
    angle: 0,
    thrust : 0
};

$(document).ready(function () {
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 40) {
            keys.downKeyPressed = true;
        }
        else if(event.keyCode == 38) {
            keys.upKeyPressed = true;
        }
        else if(event.keyCode == 37) {
            keys.leftKeyPressed = true;
        }
        else if(event.keyCode == 39) {
            keys.rightKeyPressed = true;
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 40) {
            keys.downKeyPressed = false;
        }
        else if(event.keyCode == 38) {
            keys.upKeyPressed = false;
        }
        else if(event.keyCode == 37) {
            keys.leftKeyPressed = false;
        }
        else if(event.keyCode == 39) {
            keys.rightKeyPressed = false;
        }
    });

    //Calculate every 20 ms
    setInterval(function () {
        var pixelShift = 2;        
        if (keys.upKeyPressed) {
            rocketState.y = rocketState.y - pixelShift;
            rocketState.thrust = 1;
        }
        if (keys.downKeyPressed) {
            rocketState.y = rocketState.y + pixelShift;
            rocketState.thrust = -1;            
        }
        if (!keys.downKeyPressed && !keys.upKeyPressed)
        {            
            rocketState.thrust = 0;
        }
        if (keys.leftKeyPressed) {
            rocketState.angle = rocketState.angle - 1;
        }
        if (keys.rightKeyPressed) {
            rocketState.angle = rocketState.angle + 1;
        }
    }, 20);

    //Animate at 25 FPS (every 40 ms)
    setInterval(function () {
        var r = document.getElementById("rocket");
        r.style.top = rocketState.y + "px";
        r.style.left = rocketState.x + "px";
        
        if (rocketState.thrust > 0) {
            if (r.src.endsWith("rocketWithFlame.png")) {
                r.src = "img/rocket.png";    
            } else {
                r.src = "img/rocketWithFlame.png";
            }            
        }
        else
        {
            r.src = "img/rocket.png";
        }

        $("#rocket").css("transform", "rotate(" + rocketState.angle + "deg)");
    }, 40);
});