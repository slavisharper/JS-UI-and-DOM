function createDiv(radius, centerCoordinates) {
    var divCount = 5;
    var container = document.getElementById("div-container");

    var currentDiv = document.createElement('div');
    var x = Math.floor(radius * Math.cos(0) + centerCoordinates);
    var y = Math.floor(radius * Math.sin(0) + centerCoordinates);

    currentDiv.style.width = 75 + 'px';
    currentDiv.className = 'rotating-div';
    currentDiv.style.height = 50 + 'px';
    currentDiv.style.position = 'absolute';
    currentDiv.style.background = generateColor();
    currentDiv.style.left = x + 'px';
    currentDiv.style.top = y + 'px';
    container.appendChild(currentDiv);
    moveDiv(currentDiv, radius, centerCoordinates);
}

function moveDiv(div, radius, center) {
    div.setAttribute("angle", "0");

    setInterval(function () {
        var angleInRadians = (div.getAttribute("angle")) * (Math.PI / 180);
        var left = radius * Math.cos(angleInRadians) + center;
        var top = radius * Math.sin(angleInRadians) + center;
        div.style.left = left + "px";
        div.style.top = top + "px";
        div.attributes.angle.nodeValue++;
    }, 5);
}

function generateColor() {
    var r = generateRandomNumber(0, 255);
    var g = generateRandomNumber(0, 255);
    var b = generateRandomNumber(0, 255);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

function generateRandomNumber(from, to) {
    var randomNumber = Math.floor((Math.random() * to) + from);
    return randomNumber;
}

function startRotating() {
    var radius = 300;
    var center = 320;

    createDiv(radius, center);
}