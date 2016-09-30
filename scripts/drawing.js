"use strict"

namespace('jsRocket.drawing');

jsRocket.drawing.initDrawingHelper = function() {   
    var _spaceSet = false;
    var _2dObjectsAdded = false;

    var _drawSpace = function (spaceState) {
        $("#space").css("height", spaceState.height).css("width", spaceState.width);
    };

    var _create2dObject = function (s, img) {
        return "<img id='" + s.id + "_" + img.name + "' class='" + s.cssClass + "' src='" + img.src 
                + "' width=" + s.width + " height=" + s.height 
                +  " style='top: " + (s.top || 0) + "px; left:" + (s.left || 0) + "px; transform: rotate(" + (s.rotation || 0) + "deg); visibility: "+ (img.visible ? "visible" :  "hidden") + "'" 
                + "></img>";
    };

    var _createHudObject = function (spaceShip, i) {
        return  "<p id='" + spaceShip.id +  "_fuel' class='hud' style='top: " + i * 20 + "px; left: 10px'>" +  spaceShip.id + " fuel: " +  spaceShip.fuel + "</p>";
    };

    var _add2dObjects = function (objectsArray) {
        objectsArray.forEach(function(obj) { 
            obj.images.forEach(function(img) { 
                $("#space").append(_create2dObject(obj, img)); 
            }, this);
        }, this);
    };

    var _addHudObjects = function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            $("#space").append(_createHudObject(objectsArray[i], i));
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

    var _animateHudObjects = function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var spaceShip = objectsArray[i];
            var p = document.getElementById(spaceShip.id + "_fuel");
            p.innerHTML = spaceShip.id + " fuel: " +  spaceShip.fuel;
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
            _addHudObjects(gameState.spaceShips);
            _2dObjectsAdded = true;
        }
        
        _animateObjects(gameState.spaceShips);
        _animateObjects(gameState.astroObjects);
        _animateHudObjects(gameState.spaceShips);
    };

    return result;
};