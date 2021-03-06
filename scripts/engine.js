"use strict"

namespace('jsRocket.engine');

jsRocket.engine.initEngine = function () {

    var _engineConfig = {
        space: {
            starsCount: 512,
            isLimited: false
        },
        physics: {
            positionShiftMultiplier: 1.0,
            velocityFactor: 0.02,
        }
    };

    var _calculatePositions = function (gameState, objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var s = objectsArray[i];
            s.top = s.top + s.vy * _engineConfig.physics.positionShiftMultiplier;
            s.left = s.left + s.vx * _engineConfig.physics.positionShiftMultiplier;

            //Edge check
            if (_engineConfig.space.isLimited) {
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

    var _calculateRocketVelocities = function (vessel) {
        vessel.vx = vessel.vx + (_engineConfig.physics.velocityFactor * vessel.thrust * Math.cos((vessel.rotation + vessel.initRotation) * (Math.PI / 180)));
        vessel.vy = vessel.vy + (_engineConfig.physics.velocityFactor * vessel.thrust * Math.sin((vessel.rotation + vessel.initRotation) * (Math.PI / 180)));
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
            if (gravitySource.gForce > 0) {
                _applyGravity(gravitySource, gameState.spaceShips);
                _applyGravity(gravitySource, gameState.astroObjects);
            }
        }
    };

    var _applyGravity = function (gravitySource, objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var obj = objectsArray[i];
            if (gravitySource === obj) {
                continue;
            }
            
            var rx = gravitySource.getCx() - obj.getCx();
            var ry = gravitySource.getCy() - obj.getCy();            

            var distance = Math.sqrt((rx * rx) + (ry * ry));
            if (distance !== 0.0) {
                var gx = gravitySource.gForce * (rx  / distance) / distance;
                var gy = gravitySource.gForce * (ry  / distance) / distance;
                
                obj.vx = obj.vx + gx;
                obj.vy = obj.vy + gy;
            }
        }
    };

    var result = {};
    result.gameLoop = function () {
        drawingHelper.redraw(gameState);
        
        gameState.spaceShips[0].handleInput(inputManager);

        _calculateRocketVelocities(gameState.spaceShips[0]);
        _calculateGravity(gameState);
        _calculatePositions(gameState, gameState.astroObjects);
        _calculatePositions(gameState, gameState.spaceShips);
        _processObjectsActions(gameState.spaceShips);        
    };

    return result;
};