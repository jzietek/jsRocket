 "use strict"

var inputManager = {
    _upKeyPressed: false,
    _downKeyPressed: false,
    _leftKeyPressed: false,
    _rightKeyPressed: false,

    keyDownFunc : function(event) {
        if(event.keyCode == 40) {
            this._downKeyPressed = true;
        }
        else if(event.keyCode == 38) {            
            this._upKeyPressed = true;
        }
        else if(event.keyCode == 37) {
            this._leftKeyPressed = true;
        }
        else if(event.keyCode == 39) {
            this._rightKeyPressed = true;
        }
    },

    keyUpFunc : function (event) {
        if (event.keyCode == 40) {
            this._downKeyPressed = false;
        }
        else if (event.keyCode == 38) {
            this._upKeyPressed = false;
        }
        else if (event.keyCode == 37) {
            this._leftKeyPressed = false;
        }
        else if (event.keyCode == 39) {
            this._rightKeyPressed = false;
        }
    },

    get upKeyPressed () {
        return this._upKeyPressed;
    },

    get downKeyPressed () {
        return this._downKeyPressed;
    },

    get leftKeyPressed () {
        return this._leftKeyPressed;
    },

    get rightKeyPressed () {
        return this._rightKeyPressed;
    },
};