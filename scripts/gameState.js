"use strict"

var object2d = {
    getCx: function () {
        return this.x + (this.width / 2);
    },
    getCy: function () {
        return this.y + (this.height / 2);
    }
};


var spaceShipMethods = {
    toggleFlame: function () {
        if (this.thrust > 0) {
            if (this.imageSelector === "withFlame") {
                this.imageSelector = "default";
            } else {
                this.imageSelector = "withFlame";
            }
        } else {
            this.imageSelector = "default";
        }
    }
};


function fillWithGeneratedStars(state, count) {
    var stars = [];
    for (var i = 0; i < count; i++) {
        stars.push({
            id: "star" + i,
            left: Math.random() * state.width,
            top: Math.random() * state.height,
            rotation: Math.random() * 90,
            scale: Math.random() * 0.5,
            images: { "default": "img/star.png" },
            imageSelector: "default",
            cssClass: "star"
        });
    }
    state.backgroundStars = stars;
};

function loadGameState() { //TODO Use some default values for unavailable parsed data.
    var stateJson = getLvl1();
    var stateParsed = JSON.parse(stateJson);

    stateParsed.width = window.innerWidth;
    stateParsed.height = window.innerHeight;

    if (stateParsed.backgroundStars === undefined || stateParsed.backgroundStars.length === 0) {
        fillWithGeneratedStars(stateParsed, 512); //TODO put 512 int osome defaults config.
    }

    for (var i = 0; i < stateParsed.spaceShips.length; i++) {
        var s = stateParsed.spaceShips[i]; 
        s.action = spaceShipMethods.toggleFlame;
        s.getCx = object2d.getCx;
        s.getCy = object2d.getCy;
    }    
    for (var i = 0; i < stateParsed.astroObjects.length; i++) {
        var s = stateParsed.astroObjects[i]; 
        s.getCx = object2d.getCx;
        s.getCy = object2d.getCy;
    }
    return stateParsed;
};