var paper = Raphael(10, 10, 1024, 768);

var x = 20;
var y = 20;

var telerikLogo = generateTelerikLogo(x, y);
x += 165;
y += 40;
var telerikText = generateTelerikText(x, y);
x = 80;
y += 100;
generateYouTubeLogo(x, y);
x = 250;
y = 450;
generateArhimedeanSpiral(x, y);

function generateTelerikLogo(x, y) {
    var logo = paper.path(['M', x, y + 16, 'L', x + 16, y, 'L', x + 32, y + 16,
        'L', x + 48, y, 'L', x + 64, y + 16, , 'L', x + 59, y + 21, , 'L', x + 49, y + 11,
        'L', x + 38, y + 22, , 'L', x + 54, y + 38, , 'L', x + 32, y + 60, , 'L', x + 10, y + 38,
        'L', x + 26, y + 22, 'L', x + 16, y + 11, 'L', x + 5, y + 21, , 'L', x, y + 16
        ]);
    logo.attr({
        fill: '#5CE600',
        stroke: '#62F500'
    });

    var innerLogo = paper.path(['M', x + 32, y + 27, 'L', x + 43, y + 38, 'L', x + 32, y + 49,
        'L', x + 21, y + 38, 'L', x + 32, y + 27]);
    innerLogo.attr({
        fill: '#FFF',
        stroke: '#62F500'
    });
}

function generateTelerikText(x, y) {
    var text = paper.text(x, y, 'Telerik');
    text.attr({
        "font-size": "58px",
        "font-weight": "bold"
    });

    generetaMoto(x + 30, y + 38);
}

function generetaMoto(x, y) {
    var text = paper.text(x, y, 'Develop experiences');
    text.attr({
        'font-size': '24px'
    });
}

function generateYouTubeLogo(x, y) {
    var you = paper.text(x, y, "You");
    you.attr({
        "font-weight": 650,
        "font-size": 80,
        "font-family": "Tahoma, Arial"
    });
    you.node.setAttribute('class', 'you-logo');

    var rect = paper.rect(x + 70, y - 45, 190, 100);
    rect.attr({
        fill: "#DD2826"
    });
    rect.node.setAttribute('rx', '10px');
    rect.node.setAttribute('ry', '45px');

    var tube = paper.text(x + 165, y, "Tube");
    tube.attr({
        "font-weight": 650,
        "font-size": 80,
        "font-family": "Tahoma, Arial",
        fill: "white"
    });

    tube.node.setAttribute('class', 'youtube-logo');
}

function generateArhimedeanSpiral(x, y) {
    var centerX = x;
    var centerY = y;
    var currentX, currentY;
    var gap = 5;
    var rot = 2 * Math.PI;
    var angle = 0;
    var pathArray = ['M', centerX, centerY];
    var numberOfRounds = 7;
    var rounds = 2 * numberOfRounds * Math.PI;

    while (angle < rounds) {
        currentX = centerX + angle * Math.cos(angle + rot) * gap;
        currentY = centerY + angle * Math.sin(angle + rot) * gap;
        var lineToArray = ['L', currentX, currentY];
        pathArray = pathArray.concat(lineToArray);
        angle += 1 / (10 + angle);
    }
    
    var spiralPath = paper.path(pathArray);
    spiralPath.attr({
        stroke: 'green'
    });
}