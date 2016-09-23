"use strict"

var drawingHelper = {   
    drawSpace: function (spaceState) {
        $("#space").css("height", spaceState.height).css("width", spaceState.width);
    },

    add2dObjects: function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var s = objectsArray[i];
            var newImgTag = "<img src='" + s.images[s.imageSelector] + "' class='" + s.cssClass + "' id='" + s.id + "' style='top: " + (s.top || 0) + "px; left:" + (s.left || 0) 
                            + "px; transform: rotate(" + (s.rotation || 0) + "deg) scale(" + (s.scale || 1.0) + "," + (s.scale || 1.0) + ")'></img>"
            $("#space").append(newImgTag);   
            var loadedObject = document.getElementById(s.id);
            s.width = loadedObject.width;
            s.height = loadedObject.height;
        }
    },

    animateObjects: function (objectsArray) {
        for (var i = 0; i < objectsArray.length; i++) {
            var obj = objectsArray[i];
            var img = document.getElementById(obj.id);
            if (img.src !== obj.images[obj.imageSelector])
            {
               img.src = obj.images[obj.imageSelector];
            }

            img.style.top = obj.top + "px";
            img.style.left = obj.left + "px";
            img.style.transform = "rotate(" + obj.rotation + "deg)";
        }
    }
};