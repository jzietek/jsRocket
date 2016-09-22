var Object2d = function () {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.width = 0;
    this.height = 0;
    this.getCx = function () {
        return this.x + (this.width / 2);
    };
    this.getCy = function () {
        return this.y + (this.height / 2);
    }
    return this;
};

var Rocket = function () {
    this.thrust = 0;
    this.angle = 0;
    this.id = "rocket";
};
Rocket.prototype = new Object2d();

var Planet = function () {
    this.g = 1; //TODO this is not used?
};
Planet.prototype = new Object2d();


var rocketState = new Rocket();
var planetState = new Planet();
var spaceState = new Object2d();

var starsStates = [];


function calculateRocketPositionOffset(rState, pixelShiftMultiplier) {
    rState.y = rState.y + rState.vy * pixelShiftMultiplier;
    rState.x = rState.x + rState.vx * pixelShiftMultiplier;

    //Edge check
    if (rState.y < -1 * rState.height) {
        rState.y = spaceState.height;
    }
    else if (rState.y > spaceState.height) {
        rState.y = -1 * rState.height;
    }

    if (rState.x < -1 * rState.width) {
        rState.x = spaceState.width;
    }
    else if (rState.x > spaceState.width) {
        rState.x = -1 * rState.width;
    }
};

function setThrustAndAngle(rState) {
    if (inputManager.upKeyPressed) {
        rState.thrust = 2;
    }
    if (inputManager.downKeyPressed) {
        rState.thrust = -1;
    }
    if (!inputManager.downKeyPressed && !inputManager.upKeyPressed) {
        rState.thrust = 0;
    }
    if (inputManager.leftKeyPressed) {
        rState.angle = rState.angle - 2;
    }
    if (inputManager.rightKeyPressed) {
        rState.angle = rState.angle + 2;
    }
};

function calculateRocketVelocities(rState) {
    rState.vx = rState.vx + (0.01 * rState.thrust * Math.cos((rState.angle + 225) * (Math.PI / 180)));
    rState.vy = rState.vy + (0.01 * rState.thrust * Math.sin((rState.angle + 225) * (Math.PI / 180)));
};

function generateStarStates(starsCount) {
    var result = [];
    for (var i = 0; i < starsCount; i++) {
        result.push({
            x: Math.random() * spaceState.width,
            y: Math.random() * spaceState.height,
            rotation: Math.random() * 90,
            scale: Math.random() * 0.5
        });
    }
    return result;
};

function initAll() {
    //Space part
    spaceState.width = window.innerWidth;
    spaceState.height = window.innerHeight;
    
    //Rocket part
    var r = document.getElementById("rocket");
    rocketState.width = r.width;
    rocketState.height = r.height;

    //Planet part        
    var p = document.getElementById("planet");
    planetState.width = p.width;
    planetState.height = p.height;
    planetState.x = (spaceState.width / 2) - (planetState.width / 2);
    planetState.y = (spaceState.height / 2) - (planetState.height / 2);

    p.style.top = planetState.y + "px";
    p.style.left = planetState.x + "px";

    $("#pCenter").css("top", planetState.getCy());
    $("#pCenter").css("left", planetState.getCx());

    $("#rCenter").css("top", rocketState.getCy());
    $("#rCenter").css("left", rocketState.getCx());

    //Stars part
    starsStates = generateStarStates(256);
    for (var i = 0; i < starsStates.length; i++) {
        var sState = starsStates[i];
        $("#space").append("<img src='img/star.png' style='z-order: 0; position: absolute; top: " + sState.y + "px; left:" + sState.x + "px; transform: rotate(" + sState.rotation + "deg); transform: scale(" + sState.scale + "," + sState.scale + ")'></img>");
    }
};

function calculateGravity(pState, rState) {
    var maxV = 5;
    var rtpx = pState.getCx() - rState.getCx();
    var rtpy = pState.getCy() - rState.getCy();
    var distance = Math.sqrt((rtpx * rtpx) + (rtpy * rtpy));

    if (distance !== 0.0) {
        var invDistance2 = Math.min(5 / (distance), 2);
        console.log(invDistance2);

        var tempX = rState.vx + ((rtpx / distance) * invDistance2);
        var tempY = rState.vy + ((rtpy / distance) * invDistance2);
        tempX = Math.max(-1 * maxV, Math.min(maxV, tempX));
        tempY = Math.max(-1 * maxV, Math.min(maxV, tempY));

        rState.vx = tempX;
        rState.vy = tempY;
    }
};

$(document).ready(function () {
    //Set controls
    document.addEventListener('keydown', inputManager.keyDownFunc);
    document.addEventListener('keyup', inputManager.keyUpFunc);

    //Initialize game area
    initAll();
    drawingHelper.drawSpace(spaceState);

    //Start the logic loop
    setInterval(function () {
        setThrustAndAngle(rocketState);
        calculateRocketVelocities(rocketState);
        calculateGravity(planetState, rocketState);
        calculateRocketPositionOffset(rocketState, 1);
    }, 25);

    //Start the animation loop
    setInterval(function () {
        drawingHelper.drawRocket(rocketState);        
    }, 40);
});