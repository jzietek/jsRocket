"use strict"

var inputManager = (function () {
    var _upKeyPressed = false;
    var _downKeyPressed = false;
    var _leftKeyPressed = false;
    var _rightKeyPressed = false;

    return {
        keyDownFunc: function (event) {
            if (event.keyCode == 40) {
                _downKeyPressed = true;
            }
            else if (event.keyCode == 38) {
                _upKeyPressed = true;
            }
            else if (event.keyCode == 37) {
                _leftKeyPressed = true;
            }
            else if (event.keyCode == 39) {
                _rightKeyPressed = true;
            }
        },

        keyUpFunc: function (event) {
            if (event.keyCode == 40) {
                _downKeyPressed = false;
            }
            else if (event.keyCode == 38) {
                _upKeyPressed = false;
            }
            else if (event.keyCode == 37) {
                _leftKeyPressed = false;
            }
            else if (event.keyCode == 39) {
                _rightKeyPressed = false;
            }
        },

        isUpKeyPressed: function () {
            return _upKeyPressed;
        },

        isDownKeyPressed: function () {
            return _downKeyPressed;
        },

        isLeftKeyPressed: function () {
            return _leftKeyPressed;
        },

        isRightKeyPressed: function () {
            return _rightKeyPressed;
        }
    };
})();