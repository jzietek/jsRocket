var SpaceObject = function () {
    this.id = undefined;
    this.cssClass = "spaceObject";
    this.images = undefined;
    this.imageSelector = "default";
    this.top = 0;
    this.left = 0;
    this.rotation = 0;    
    this.vx = 0;
    this.vy = 3;
    this.vr = 0.0;
    this.vrMax = 2;
    this.vrDelta = 0.02;
    this.initRotation = 225;
    this.gForce = 0;

    this.getCx = function () {        
        return this.left + (this.width / 2);
    };
    this.getCy = function () {
        return this.top + (this.height / 2);
    };   

    return this;  
};

var SpaceShip = function () {
    this.thrust = 0;
    this.maxThrust = 2;
    this.cssClass = "spaceShip";
    this.action = function () {
        if (this.thrust > 0) {
            if (this.imageSelector === "withFlame") {
                this.imageSelector = "default";
            } else {
                this.imageSelector = "withFlame";
            }
        } else {
            this.imageSelector = "default";
        }
    };
    return this;
};
SpaceShip.prototype = new SpaceObject();




