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
        r.style.transform = "rotate(" + rocketState.angle + "deg)";
    },


    drawSpace: function (spaceState) {
        $("#space").css("height", spaceState.height);
        $("#space").css("width", spaceState.width);

        for (var i = 0; i < spaceState.starsStates.length; i++) {
            var sState = spaceState.starsStates[i];            
            var newImgTag = "<img src='img/star.png' class='star' style='top: " + sState.y + "px; left:" + sState.x + "px; transform: rotate(" + sState.rotation + "deg); transform: scale(" + sState.scale + "," + sState.scale + ")'></img>"
            $("#space").append(newImgTag);
        }
    }
};