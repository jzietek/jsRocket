"use strict"

namespace('jsRocket.types');

jsRocket.types.SpaceObject = function () {
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
    this.fuel = 10000;

    this.getCx = function () {        
        return this.left + (this.width / 2);
    };
    this.getCy = function () {
        return this.top + (this.height / 2);
    };   

    return this;  
};

jsRocket.types.SpaceShip = function () {
    var imageIndex = { default: 0, rearFlame : 1, leftFlame: 2, rightFlame: 3, frontFlame: 4 };
    this.thrust = 0;
    this.leftThrust = false;
    this.rightThrust = false;
    this.maxThrust = 2;
    this.cssClass = "spaceShip";
    this.action = function () {      
        if (this.thrust > 0) {
            this.images[imageIndex.rearFlame].visible = !this.images[imageIndex.rearFlame].visible;
            this.fuel -= 1;
        } else if (this.thrust < 0) {
            this.images[imageIndex.frontFlame].visible = !this.images[imageIndex.frontFlame].visible;
            this.fuel -= 1;
        } else {
            this.images[imageIndex.rearFlame].visible = false;
            this.images[imageIndex.frontFlame].visible = false;
        }

        if (this.leftThrust) {
            this.images[imageIndex.leftFlame].visible = !this.images[imageIndex.leftFlame].visible;
            this.fuel -= 1;
        } else {
            this.images[imageIndex.leftFlame].visible = false;
        }

        if (this.rightThrust) {
            this.images[imageIndex.rightFlame].visible = !this.images[imageIndex.rightFlame].visible;
            this.fuel -= 1;
        } else {
            this.images[imageIndex.rightFlame].visible = false;
        }
        this.fuel = Math.max(0, this.fuel);
    };

    this.handleInput = function(inputManager) {
        if (this.fuel <= 0) {
            this.leftThrust = false;
            this.rightThrust = false;
            this.thrust = 0;
            return;
        }

        if (inputManager.isUpKeyPressed()) {
            this.thrust = this.maxThrust;
        }
        if (inputManager.isDownKeyPressed()) {
            this.thrust = this.maxThrust * -0.5;
        }
        if (!inputManager.isDownKeyPressed() && !inputManager.isUpKeyPressed()) {
            this.thrust = 0;
        }

        if (inputManager.isLeftKeyPressed()) {
            this.vr = this.vr - this.vrDelta;
            this.vr = Math.max(this.vr, -1 * this.vrMax);
            this.leftThrust = true;
        } else {
            this.leftThrust = false;
        }

        if (inputManager.isRightKeyPressed()) {
            this.vr = this.vr + this.vrDelta;
            this.vr = Math.min(this.vr, this.vrMax);
            this.rightThrust = true;
        } else {
            this.rightThrust = false;
        }

    };

    return this;
};
jsRocket.types.SpaceShip.prototype = new jsRocket.types.SpaceObject();
