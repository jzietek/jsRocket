"use strict"

var initEngine = function () {
    var _calculatePositions = function (gameState, objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var s = objectsArray[i];
            s.top = s.top + s.vy * globalConfig.physics.positionShiftMultiplier;
            s.left = s.left + s.vx * globalConfig.physics.positionShiftMultiplier;

            //Edge check
            if (globalConfig.space.isLimited) {
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

            //Set rotation
            s.rotation = s.rotation + s.vr;
        }
    };

    var _setThrustAndAngle = function (vessel) {
        if (inputManager.isUpKeyPressed()) {
            vessel.thrust = vessel.maxThrust;
        }
        if (inputManager.isDownKeyPressed()) {
            vessel.thrust = vessel.maxThrust * -0.5;
        }
        if (!inputManager.isDownKeyPressed() && !inputManager.isUpKeyPressed()) {
            vessel.thrust = 0;
        }
        if (inputManager.isLeftKeyPressed()) {
            vessel.vr = vessel.vr - vessel.vrDelta;
            vessel.vr = Math.max(vessel.vr, -1 * vessel.vrMax);
        }
        if (inputManager.isRightKeyPressed()) {
            vessel.vr = vessel.vr + vessel.vrDelta;
            vessel.vr = Math.min(vessel.vr, vessel.vrMax);
        }
    };

    var _calculateRocketVelocities = function (vessel) {
        vessel.vx = vessel.vx + (globalConfig.physics.velocityFactor * vessel.thrust * Math.cos((vessel.rotation + vessel.initRotation) * (Math.PI / 180)));
        vessel.vy = vessel.vy + (globalConfig.physics.velocityFactor * vessel.thrust * Math.sin((vessel.rotation + vessel.initRotation) * (Math.PI / 180))); //TODO find a way to operate in radians
    };

    var _processObjectsActions = function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var obj = objectsArray[i];
            if (obj.action) {
                obj.action();
            }
        }
    };

    var _calculateGravity = function (gameState) {
        for (var i = 0; i < gameState.astroObjects.length; i++) {
            var gravitySource = gameState.astroObjects[i];
            //applyGravity(gravitySource, gameState.spaceShips);
            //applyGravity(gravitySource, gameState.astroObjects);
        }
    };

    var _applyGravity = function (gravitySource, objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var obj = objectsArray[i];
            if (gravitySource === obj) {
                continue;
            }

            var rtpx = gravitySource.getCx() - obj.getCx();
            var rtpy = gravitySource.getCy() - obj.getCy();

            var distance = Math.sqrt((rtpx * rtpx) + (rtpy * rtpy));
            debugger;
            if (distance !== 0.0) {
                var invDistance2 = Math.min(5 / (distance), 2);
                console.log(invDistance2);

                var tempX = obj.vx + ((rtpx / distance) * invDistance2);
                var tempY = obj.vy + ((rtpy / distance) * invDistance2);
                //tempX = Math.max(-1 * maxV, Math.min(maxV, tempX));
                //tempY = Math.max(-1 * maxV, Math.min(maxV, tempY));

                obj.vx = tempX;
                obj.vy = tempY;
            }
        }
    };

    var result = {};
    result.gameLoop = function () {
        _setThrustAndAngle(gameState.spaceShips[0]);
        _calculateRocketVelocities(gameState.spaceShips[0]);
        _calculateGravity(gameState);
        _calculatePositions(gameState, gameState.astroObjects);
        _calculatePositions(gameState, gameState.spaceShips);
        _processObjectsActions(gameState.spaceShips);

        drawingHelper.redraw(gameState);
    };

    return result;
};