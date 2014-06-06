var canvas = document.getElementById("canvas-obj");
var ctx = canvas.getContext("2d");
drawHouse();
drawBike();
drawHead();

function drawHouse() {

    ctx.lineWidth = 3;
    //Draw main body of the house
    ctx.fillStyle = "#975B5B";
    ctx.fillRect(0, 160, 290, 220);
    ctx.strokeRect(0, 160, 290, 220);

    //Draw the roof
    ctx.beginPath();
    ctx.moveTo(0, 160);
    ctx.lineTo(145, 5);
    ctx.lineTo(290, 160);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(210, 120);
    ctx.lineTo(210, 45);
    ctx.lineTo(235, 45);
    ctx.lineTo(235, 120);
    
    ctx.moveTo(290, 160);
    ctx.lineTo(235, 100);
    //ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //Draw windows
    ctx.fillStyle = "#000";
    ctx.fillRect(25, 190, 100, 70);
    ctx.fillRect(165, 190, 100, 70);
    ctx.fillRect(165, 285, 100, 70);

    //Draw windows borders
    ctx.strokeStyle = "#975B5B";
    ctx.beginPath();
    ctx.moveTo(25, 225);
    ctx.lineTo(275, 225);
    ctx.moveTo(75, 190);
    ctx.lineTo(75, 260);
    ctx.moveTo(215, 190);
    ctx.lineTo(215, 355);
    ctx.moveTo(165, 320);
    ctx.lineTo(265, 320);
    ctx.closePath();
    ctx.stroke();

    //Draw door
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(40, 380);
    ctx.lineTo(40, 310);

    ctx.moveTo(40, 310);
    ctx.bezierCurveTo(37, 279, 116, 280, 110, 310);
    ctx.stroke();

    //ctx.lineWidth = 2;
    ctx.moveTo(110, 380);
    ctx.lineTo(110, 310);
    ctx.moveTo(75, 380);
    ctx.lineTo(75, 285);
    ctx.moveTo(62, 350);
    ctx.arc(62, 350, 5, 0, 2 * Math.PI);
    ctx.moveTo(88, 350);
    ctx.arc(88, 350, 5, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawBike() {

    //Draw wheels
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#348092";
    ctx.fillStyle = "#90CAD7";
    ctx.beginPath();
    ctx.arc(400, 200, 60, 0, 2 * Math.PI);
    ctx.moveTo(640, 200);
    ctx.arc(640, 200, 60, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //Draw frame
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 200);
    ctx.lineTo(500, 200);
    ctx.lineTo(622, 125);
    ctx.lineTo(480, 125);
    ctx.lineTo(400, 200);

    ctx.moveTo(500, 200);
    ctx.lineTo(470, 100);
    ctx.moveTo(450, 100);
    ctx.lineTo(490, 100);

    ctx.moveTo(640, 200);
    ctx.lineTo(615, 80);
    ctx.lineTo(650, 50);
    ctx.moveTo(615, 80);
    ctx.lineTo(570, 90);
    ctx.stroke();

    //Draw 
    ctx.beginPath();
    ctx.arc(500, 200, 15, 0, 2 * Math.PI);
    ctx.moveTo(492, 188);
    ctx.lineTo(483, 175);
    ctx.moveTo(508, 212);
    ctx.lineTo(517, 223);
    ctx.stroke();
}

function drawHead() {
    //I DIDN'T HAD ANY TIME and i'am sorry. 

    //ctx.strokeStyle = "#22545F";
    //ctx.fillStyle = "#90CAD7";
    //
    //ctx.beginPath();
    //ctx.moveTo(850, 250);
    //ctx.arc(850, 250, 60, 0, 2 * Math.PI);
    //ctx.stroke();
    //ctx.fill();
    //
    //ctx.beginPath();
    //ctx.scale(1, 0.8);
    //ctx.moveTo(840, 240);
    //ctx.arc(840, 240, 10, 0, 2 * Math.PI);
    //ctx.stroke();
    //ctx.fill();
    var faceImage = new Image();
    faceImage.src = 'images/face.png';
    faceImage.onload = function () {
        ctx.drawImage(faceImage, 750, 20);
    }
}