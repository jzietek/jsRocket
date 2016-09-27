function getLvl1() {
    var _width = window.innerWidth;
    var _height = window.innerHeight;

    var _spaceShips = [
            {
                id: "rocket1",
                cssClass: "spaceShip",
                images: { "default": "img/rocket.png", "withFlame": "img/rocketWithFlame.png" },
                imageSelector: "default",
                top: 30,
                left: 30,
                rotation: 180,
                vx: 1.0,
                vy: 0,
                thrust: 0,
                maxThrust: 2,
                vr: 0.0,
                vrMax: 2,
                vrDelta: 0.02,
                initRotation: 225,
                width : 180,
                height : 180 
            }];


    var _astroObjects = [
            {
                id: "earth",
                cssClass: "astroObject",
                images: { "default": "img/planet.png" },
                imageSelector: "default",
                top: 400,
                left: 500,
                rotation: 0,
                vx: 0,
                vy: 0,
                vr: 0.1,
                gForce: 1,
                width : 300,
                height : 300
            },
            {
                id: "moon1",
                cssClass: "astroObject",
                images: { "default": "img/moon.png" },
                imageSelector: "default",
                top: 220,
                left: 480,
                rotation: 0,
                vx: 0.9,
                vy: 0.0,
                vr: 0.1,
                width : 60,
                height : 60
            }];      

            var _copyProps = function (obj, newObj) {
                for (var i in obj) {
                    newObj[i] = obj[i];
                }
                return newObj;
            };

            var _generateStars = function (count) {
                var stars = [];
                for (var i = 0; i < count; i++) {
                    stars.push({
                        id: "star" + i,
                        left: Math.random() * _width,
                        top: Math.random() * _height,
                        rotation: Math.random() * 90,
                        width : Math.random() * 20,
                        height : this.width,
                        images: { "default": "img/star.png" },
                        imageSelector: "default",
                        cssClass: "star",
                        vr : 0
                    });
                }
                return stars;
            };
            
    return {
        width: _width,
        height: _height,
        spaceShips: _spaceShips.map(function (x) {return _copyProps(x, new SpaceShip()); }),
        astroObjects: _astroObjects.map(function (x) {return _copyProps(x, new SpaceObject()); }),
        backgroundStars: _generateStars(512)
    };
}