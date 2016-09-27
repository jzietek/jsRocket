"use strict"

var initInputManager = function () {
    var _upKeyPressed = false;
    var _downKeyPressed = false;
    var _leftKeyPressed = false;
    var _rightKeyPressed = false;

    var _keyDownFunc = function (event) {
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
    };

    var _keyUpFunc = function (event) {
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
    };

    var _isUpKeyPressed = function () {
        return _upKeyPressed;
    };

    var _isDownKeyPressed = function () {
        return _downKeyPressed;
    };

    var _isLeftKeyPressed = function () {
        return _leftKeyPressed;
    };

    var _isRightKeyPressed = function () {
        return _rightKeyPressed;
    };

    return {
        keyDownFunc: _keyDownFunc,
        keyUpFunc: _keyUpFunc,
        isUpKeyPressed: _isUpKeyPressed,
        isDownKeyPressed: _isDownKeyPressed,
        isLeftKeyPressed: _isLeftKeyPressed,
        isRightKeyPressed: _isRightKeyPressed
    };
};