// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

var canvas = document.getElementById('animation');
var context = canvas.getContext('2d');
var radius = 20;
var x = radius;
var y = radius;
var direction = {
    x : 1,
    y : 1
};


function animate() {
    requestAnimFrame(animate);
    draw();
}

function draw() {
    //Check this :)
    //var time = new Date().getTime() * 0.002;
    //x = Math.sin(time) * 192 + 256;
    //y = Math.cos(time * 0.9) * 192 + 256;
    var isHittedWall = false;

    if (x <= radius) {
        direction.x = 1;
        isHittedWall = true;
    }
    else if (x >= 500 - radius) {
        direction.x = -1;
        isHittedWall = true;
    }

    if (y < radius) {
        direction.y = 1;
        isHittedWall = true;
    }
    else if (y >= 300 - radius) {
        direction.y = -1;
        isHittedWall = true;
    }

    x += direction.x;
    y += direction.y;

    if (isHittedWall) {
        context.fillStyle = "#AB0000";
    }
    else {
        context.fillStyle = "rgb(200,200,20)";
    }
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.clearRect(0, 0, 512, 512);
    context.fill();

}

animate();