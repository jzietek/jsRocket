"use strict"

var globalConfig = {
    space : {
        starsCount: 512,
        isLimited:false
    },
    physics : {
        positionShiftMultiplier: 1.0,
        velocityFactor: 0.02
    }
};


var object2dMethods = {
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

function loadGameState() {
    var stateJson = getLvl1();
    var stateParsed = JSON.parse(stateJson);

    stateParsed.width = window.innerWidth;
    stateParsed.height = window.innerHeight;

    if (stateParsed.backgroundStars === undefined || stateParsed.backgroundStars.length === 0) {
        fillWithGeneratedStars(stateParsed, globalConfig.space.starsCount);
    }

    for (var i = 0; i < stateParsed.spaceShips.length; i++) {
        var s = stateParsed.spaceShips[i]; 
        s.action = spaceShipMethods.toggleFlame;
        s.getCx = object2dMethods.getCx;
        s.getCy = object2dMethods.getCy;
    }    
    for (var i = 0; i < stateParsed.astroObjects.length; i++) {
        var s = stateParsed.astroObjects[i]; 
        s.getCx = object2dMethods.getCx;
        s.getCy = object2dMethods.getCy;
    }
    return stateParsed;
};