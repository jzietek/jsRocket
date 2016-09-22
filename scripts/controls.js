var keys = {
    upKeyPressed : false,
    downKeyPressed : false,
    leftKeyPressed : false,
    rightKeyPressed : false
};

var rocketState = { 
    x : 100, 
    y: 100, 
    vx : 0,
    vy : 0,
    angle: 0,
    thrust : 0,
    width : 0,
    height : 0
};

var planetState = {
    x : 0,
    y : 0,
    g : 1,
    width : 0,
    height : 0
};

var spaceState = {
    width : 0,
    height : 0
};

$(document).ready(function () {    
    initAll();
    
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 40) {
            keys.downKeyPressed = true;
        }
        else if(event.keyCode == 38) {
            keys.upKeyPressed = true;
        }
        else if(event.keyCode == 37) {
            keys.leftKeyPressed = true;
        }
        else if(event.keyCode == 39) {
            keys.rightKeyPressed = true;
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 40) {
            keys.downKeyPressed = false;
        }
        else if(event.keyCode == 38) {
            keys.upKeyPressed = false;
        }
        else if(event.keyCode == 37) {
            keys.leftKeyPressed = false;
        }
        else if(event.keyCode == 39) {
            keys.rightKeyPressed = false;
        }
    });

    function calculateRocketPositionOffset(rState, pixelShiftMultiplier) {
        rState.y = rState.y + rState.vy * pixelShiftMultiplier;
        rState.x = rState.x + rState.vx * pixelShiftMultiplier;

        //Edge check
        var margin = 160;
        if (rState.y < -1 * rState.height - margin) {
            rState.y = spaceState.height + margin;
        }
        else if (rState.y > spaceState.height + margin) {
            rState.y = -1 * rState.height - margin;
        }

        if (rState.x < -1 * rState.width - margin) {
            rState.x = spaceState.width + margin;
        }
        else if (rState.x > spaceState.width + margin) {
            rState.x = -1 * rState.width - margin;
        }
    }

    function setThrustAndAngle(rState)
    {
        if (keys.upKeyPressed) {
            rState.thrust = 2;
        }
        if (keys.downKeyPressed) {
            rState.thrust = -1;            
        }
        if (!keys.downKeyPressed && !keys.upKeyPressed)
        {            
            rState.thrust = 0;
        }
        if (keys.leftKeyPressed) {
            rState.angle = rState.angle - 2;
        }
        if (keys.rightKeyPressed) {
            rState.angle = rState.angle + 2;
        }
    }
    
    function calculateRocketVelocities(rState) {
        rState.vx = rState.vx + (0.01 * rState.thrust * Math.cos((rState.angle + 225) * (Math.PI/180)));
        rState.vy = rState.vy + (0.01 * rState.thrust * Math.sin((rState.angle + 225) * (Math.PI/180)));      
    }

    function initAll() {
        //Space part
        spaceState.width = window.innerWidth - 30;
        spaceState.height = window.innerHeight - 30;               
        $("#space").css("height", spaceState.height);
        $("#space").css("width", spaceState.width);

        //Planet part        
        var p = document.getElementById("planet");
        planetState.width = p.width;
        planetState.height = p.height;
        planetState.x = (spaceState.width / 2) - (planetState.width/2);
        planetState.y = (spaceState.height / 2) - (planetState.height/2);

        p.style.top = planetState.y + "px";
        p.style.left = planetState.x + "px";
    }

    //Calculate every 20 ms
    setInterval(function () {          
        setThrustAndAngle(rocketState);
               
        calculateRocketVelocities(rocketState);
 
        calculateRocketPositionOffset(rocketState, 2);        
    }, 20);

    //Animate at 25 FPS (every 40 ms)
    setInterval(function () {       
        //Rocket part
        var r = document.getElementById("rocket");
        r.style.top = rocketState.y + "px";
        r.style.left = rocketState.x + "px";
        
        if (rocketState.thrust > 0) {
            if (r.src.endsWith("rocketWithFlame.png")) {
                r.src = "img/rocket.png";    
            } else {
                r.src = "img/rocketWithFlame.png";
            }            
        }
        else
        {
            r.src = "img/rocket.png";
        }

        $("#rocket").css("transform", "rotate(" + rocketState.angle + "deg)");
    }, 40);
});