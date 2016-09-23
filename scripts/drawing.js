"use strict"

var drawingHelper = {
    drawRocket: function (rocketState) {
        var imgRocketWithFlame = "img/rocketWithFlame.png";
        var imgRocket = "img/rocket.png";

        //Locate
        var r = document.getElementById(rocketState.id);
        r.style.top = rocketState.y + "px";
        r.style.left = rocketState.x + "px";

        //Toggle flame
        if (rocketState.thrust > 0) {
            if (r.src.endsWith(imgRocketWithFlame)) {
                r.src = imgRocket;
            } else {
                r.src = imgRocketWithFlame;
            }
        } else {
            r.src = imgRocket;
        }

        //Rotate
        r.style.transform = "rotate(" + rocketState.rotation + "deg)";
    },


    drawSpace: function (spaceState) {
        $("#space").css("height", spaceState.height).css("width", spaceState.width);
    },

    add2dObjects: function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var s = objectsArray[i];
            var newImgTag = "<img src='" + s.image + "' class='" + s.cssClass + "' style='top: " + s.top + "px; left:" + s.left 
                            + "px; transform: rotate(" + s.rotation + "deg) scale(" + s.scale + "," + s.scale + ")'></img>"
            $("#space").append(newImgTag);
        }
    }
};