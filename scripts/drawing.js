"use strict"

var initDrawingHelper = function() {   
    var _spaceSet = false;
    var _2dObjectsAdded = false;

    var _drawSpace = function (spaceState) {
        $("#space").css("height", spaceState.height).css("width", spaceState.width);
    };

    var _add2dObjects = function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var s = objectsArray[i];

            for (var j = 0; j < s.images.length; j++) {
                var img = s.images[j];
                var newImgTag = "<img id='" + s.id + "_" + img.name + "' class='" + s.cssClass + "' src='" + img.src 
                + "' width=" + s.width + " height=" + s.height 
                +  " style='top: " + (s.top || 0) + "px; left:" + (s.left || 0) + "px; transform: rotate(" + (s.rotation || 0) + "deg); visibility: "+ (img.visible ? "visible" :  "hidden") + "'" 
                + "></img>";

                $("#space").append(newImgTag);
            }
        }
    };

    var _animateObjects = function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var obj = objectsArray[i];

            for (var j=0; j < obj.images.length; j++) {
                var imgObj = obj.images[j];
                var img = document.getElementById(obj.id + "_" + imgObj.name);

                img.style.top = obj.top + "px";
                img.style.left = obj.left + "px";
                img.style.visibility = (imgObj.visible ? "visible" :  "hidden");
                img.style.transform = "rotate(" + obj.rotation + "deg)";
            }
        }
    };

    var result = {};
    result.redraw = function(gameState) {
            //Initialize game area
        if (!_spaceSet) {
            _drawSpace(gameState);
            _spaceSet = true;
        } 

        if (!_2dObjectsAdded) {
            _add2dObjects(gameState.backgroundStars);
            _add2dObjects(gameState.astroObjects);
            _add2dObjects(gameState.spaceShips);
            _2dObjectsAdded = true;
        }
        
        _animateObjects(gameState.spaceShips);
        _animateObjects(gameState.astroObjects);
    };

    return result;
};