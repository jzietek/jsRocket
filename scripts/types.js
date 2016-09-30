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
    var imageIndex = { default: 0, rearFlame : 1, leftFlame: 2, rightFlame: 3, frontFlame: 4 };
    this.thrust = 0;
    this.leftThrust = false;
    this.rightThrust = false;
    this.maxThrust = 2;
    this.cssClass = "spaceShip";
    this.action = function () {
        if (this.thrust > 0) {
            this.images[imageIndex.rearFlame].visible = !this.images[imageIndex.rearFlame].visible;
        } else if (this.thrust < 0) {
            this.images[imageIndex.frontFlame].visible = !this.images[imageIndex.frontFlame].visible;
        } else {
            this.images[imageIndex.rearFlame].visible = false;
            this.images[imageIndex.frontFlame].visible = false;
        }

        if (this.leftThrust) {
            this.images[imageIndex.leftFlame].visible = !this.images[imageIndex.leftFlame].visible;
        } else {
            this.images[imageIndex.leftFlame].visible = false;
        }

        if (this.rightThrust) {
            this.images[imageIndex.rightFlame].visible = !this.images[imageIndex.rightFlame].visible;
        } else {
            this.images[imageIndex.rightFlame].visible = false;
        }
    };
    return this;
};
SpaceShip.prototype = new SpaceObject();




