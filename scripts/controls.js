var keys = {
    upKeyPressed : false,
    downKeyPressed : false,
    leftKeyPressed : false,
    rightKeyPressed : false
};

var rocketLocation = { x : 300, y: 300};

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


    setInterval(function () {
        var pixelShift = 2;
        if (keys.downKeyPressed) {
            rocketLocation.y = rocketLocation.y + pixelShift;
        }
        if (keys.upKeyPressed) {
            rocketLocation.y = rocketLocation.y - pixelShift;
        }
        if (keys.leftKeyPressed) {
            rocketLocation.x = rocketLocation.x - pixelShift;
        }
        if (keys.rightKeyPressed) {
            rocketLocation.x = rocketLocation.x + pixelShift;
        }
    }, 20);

    setInterval(function () {
        document.getElementById("rocket").style.top = rocketLocation.y + "px";
        document.getElementById("rocket").style.left = rocketLocation.x + "px";
    }, 20);
});