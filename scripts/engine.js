"use strict"

function calculatePositions(gameState, objectsArray) {
    var pixelShiftMultiplier = 1.0;
    for (var i = 0; i < objectsArray.length; i++) {
        var s = objectsArray[i];
        s.top = s.top + s.vy * pixelShiftMultiplier;
        s.left = s.left + s.vx * pixelShiftMultiplier;

        //Edge check
        //TODO make that configurable
        if (1) {
            if (s.top < -1 * s.height) {
                s.top = gameState.height;
            }
            else if (s.top > gameState.height) {
                s.top = -1 * s.height;
            }

            if (s.left < -1 * s.width) {
                s.left = gameState.width;
            }
            else if (s.left > gameState.width) {
                s.left = -1 * s.width;
            }
        }
    }
}

function setThrustAndAngle(vessel) {
    if (inputManager.isUpKeyPressed()) {
        vessel.thrust = 2;
    }
    if (inputManager.isDownKeyPressed()) {
        vessel.thrust = -1;
    }
    if (!inputManager.isDownKeyPressed() && !inputManager.isUpKeyPressed()) {
        vessel.thrust = 0;
    }
    if (inputManager.isLeftKeyPressed()) {
        vessel.rotation = vessel.rotation - 2; //TODO adjust that when changed to radians 
    }
    if (inputManager.isRightKeyPressed()) {
        vessel.rotation = vessel.rotation + 2;
    }
};

function calculateRocketVelocities(rState) {
    rState.vx = rState.vx + (0.02 * rState.thrust * Math.cos((rState.rotation + 225) * (Math.PI / 180))); //TODO configure the steering angle offset
    rState.vy = rState.vy + (0.02 * rState.thrust * Math.sin((rState.rotation + 225) * (Math.PI / 180))); //TODO find a way to operate in radians
};

function processObjectsActions(objectsArray) {
    for (var i = 0; i < objectsArray.length; i++) {
        var obj = objectsArray[i];
        if (obj.action) {
            obj.action();
        }
    }
}

function calculateGravity(pState, rState) { //TODO cleanu-up this
    var maxV = 5;
    var rtpx = pState.getCx() - rState.getCx();
    var rtpy = pState.getCy() - rState.getCy();
    var distance = Math.sqrt((rtpx * rtpx) + (rtpy * rtpy));

    if (distance !== 0.0) {
        var invDistance2 = Math.min(5 / (distance), 2);
        //console.log(invDistance2);

        var tempX = rState.vx + ((rtpx / distance) * invDistance2);
        var tempY = rState.vy + ((rtpy / distance) * invDistance2);
        tempX = Math.max(-1 * maxV, Math.min(maxV, tempX));
        tempY = Math.max(-1 * maxV, Math.min(maxV, tempY));

        rState.vx = tempX;
        rState.vy = tempY;
    }
};

//Load the level data 
var gameState = loadGameState();

$(document).ready(function () {
    //Set controls
    document.addEventListener('keydown', function (event) {
        inputManager.keyDownFunc(event);
    });
    document.addEventListener('keyup', function (event) { inputManager.keyUpFunc(event); });

    //Initialize game area
    drawingHelper.drawSpace(gameState);
    drawingHelper.add2dObjects(gameState.backgroundStars);
    drawingHelper.add2dObjects(gameState.astroObjects);
    drawingHelper.add2dObjects(gameState.spaceShips);

    //Start the logic loop
    setInterval(function () {
        setThrustAndAngle(gameState.spaceShips[0]);
        calculateRocketVelocities(gameState.spaceShips[0]);

        //calculateGravity(planetState, rocketState); //TODO clean-up the gravity part. Add some configs to indicate what has it's own gravity.

        calculatePositions(gameState, gameState.astroObjects);
        calculatePositions(gameState, gameState.spaceShips);

        processObjectsActions(gameState.spaceShips);
    }, 25);

    //Start the animation loop
    setInterval(function () {
        drawingHelper.animateObjects(gameState.spaceShips);
        drawingHelper.animateObjects(gameState.astroObjects);
    }, 40);
});