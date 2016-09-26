function getLvl1() {
    return `{
    "spaceShips": [
        {
             "id": "rocket1",
             "cssClass" : "astroObject",
             "images": { "default" : "img/rocket.png", "withFlame" : "img/rocketWithFlame.png" },
             "imageSelector" : "default",
             "top": 30,
             "left": 30,
             "rotation": 180,
             "scale" : 1.0,
             "vx": 0,
             "vy": 3,
             "thrust": 0,
             "maxThrust": 2,
             "rotationSpeed": 3,
             "initRotation" :225
        }],
    "astroObjects": [
        {
            "id" : "earth",
            "cssClass" : "astroObject",
            "images": { "default" : "img/planet.png" },
            "imageSelector" : "default",
            "top" : 300,
            "left" : 100,
            "rotation" : 0,
            "vx" : 0,
            "vy" : 0,
            "scale" : 1.0
        },
        {
            "id" : "moon1",
            "cssClass" : "astroObject",
            "images": { "default" : "img/moon.png" },
            "imageSelector" : "default",
            "top" : 20,
            "left" : 80,
            "rotation" : 0,
            "vx" : 0.2,
            "vy" : 0.2,
            "scale" : 1.0
        },
        {
            "id" : "moon2",
            "cssClass" : "astroObject",
            "images": { "default" : "img/moon.png" },
            "imageSelector" : "default",
            "top" : 120,
            "left" : 60,
            "rotation" : 120,
            "vx" : -0.1,
            "vy" : 0.1,
            "scale" : 0.5
        }],
    "backgroundStars": []
}`;
}