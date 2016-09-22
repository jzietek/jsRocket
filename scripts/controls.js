var inputManager = {
    upKeyPressed: false,
    downKeyPressed: false,
    leftKeyPressed: false,
    rightKeyPressed: false,

    keyDownFunc : function(event) {
        if(event.keyCode == 40) {
            inputManager.downKeyPressed = true;
        }
        else if(event.keyCode == 38) {
            inputManager.upKeyPressed = true;
        }
        else if(event.keyCode == 37) {
            inputManager.leftKeyPressed = true;
        }
        else if(event.keyCode == 39) {
            inputManager.rightKeyPressed = true;
        }
    },

    keyUpFunc : function (event) {
        if (event.keyCode == 40) {
            inputManager.downKeyPressed = false;
        }
        else if (event.keyCode == 38) {
            inputManager.upKeyPressed = false;
        }
        else if (event.keyCode == 37) {
            inputManager.leftKeyPressed = false;
        }
        else if (event.keyCode == 39) {
            inputManager.rightKeyPressed = false;
        }
    }
};