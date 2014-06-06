var container = document.getElementById('the-svg');
var svgNS = 'http://www.w3.org/2000/svg';
var startY = 120;
var startX = 50;
var fontSize = 48;
var radius = 70;
var letterCircleDistance = 150;
var rowDistance = 100;

container.appendChild(paintLetter(startX, startY, '#3E3F37', 'M', fontSize));
startX += letterCircleDistance;
startY -= fontSize / 2;
container.appendChild(paintCircle(startX, startY, radius, '#3E3F37'));
paintMongoDbLogo(startX - 55, startY - 50);

startX -= letterCircleDistance;
startY += rowDistance;
container.appendChild(paintLetter(startX, startY, 'black', 'E', fontSize));
startX += letterCircleDistance;
startY -= fontSize / 2;
container.appendChild(paintCircle(startX, startY, radius, 'black'));
paintExpressLogo(startX - 60, startY + 10);

startX -= letterCircleDistance;
startY += rowDistance;
container.appendChild(paintLetter(startX, startY, '#E23337', 'A', fontSize));
startX += letterCircleDistance;
startY -= fontSize / 2;
container.appendChild(paintCircle(startX, startY, radius, '#E23337'));
paintAngularJsLogo(startX - 55, startY - 50);

startX -= letterCircleDistance;
startY += rowDistance;
container.appendChild(paintLetter(startX, startY, '#8EC74E', 'N', fontSize));
startX += letterCircleDistance;
startY -= fontSize / 2;
container.appendChild(paintCircle(startX, startY, radius, '#8EC74E'));
paintNodeJsLogo(startX - 60, startY - 20);

function paintExpressLogo(x, y) {
    var expressLogo = document.createElementNS(svgNS, 'text');
    expressLogo.setAttribute('y', y);
    expressLogo.setAttribute('x', x);
    expressLogo.setAttribute('fill', 'white');
    expressLogo.setAttribute('font-size', '34px');
    expressLogo.setAttribute('font-family', 'Open Sans');
    expressLogo.innerHTML = 'express';
    container.appendChild(expressLogo);
}

function paintMongoDbLogo(x, y) {
    var logo = document.createElementNS(svgNS, 'image');
    logo.setAttribute('x', x);
    logo.setAttribute('y', y);
    logo.setAttribute('height', '110px');
    logo.setAttribute('width', '110px');
    logo.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'logos/mongodb.png');
    container.appendChild(logo);
}

function paintNodeJsLogo(x, y) {
    var logo = document.createElementNS(svgNS, 'image');
    logo.setAttribute('x', x);
    logo.setAttribute('y', y);
    logo.setAttribute('height', '43px');
    logo.setAttribute('width', '120px');
    logo.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'logos/node.png');
    container.appendChild(logo);
}

function paintAngularJsLogo(x, y) {
    var logo = document.createElementNS(svgNS, 'image');
    logo.setAttribute('x', x);
    logo.setAttribute('y', y);
    logo.setAttribute('height', '110px');
    logo.setAttribute('width', '110px');
    logo.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'logos/angularjs.png');
    container.appendChild(logo);
}

function paintLetter(x, y, color, letter, fontSize) {
    var letterM = document.createElementNS(svgNS, 'text');
    letterM.setAttribute('y', y);
    letterM.setAttribute('x', x);
    letterM.setAttribute('fill', color);
    letterM.setAttribute('font-size', fontSize + 'px');
    letterM.setAttribute('font-family', 'Arial Black');
    letterM.innerHTML = letter;
    return letterM;
}

function paintCircle(x, y, radius, color) {
    var circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', color);
    return circle;
}