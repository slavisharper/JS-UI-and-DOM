(function () {
    var container = document.getElementById('the-svg');
    var svgNS = 'http://www.w3.org/2000/svg';
    var startY = 0;
    var startX = 0;
    var cellDistance = 8;
    var mainPadding = 70;
    var groupDistance = 40;
    var normalCellWidth = 120;
    var screenWidth = 1200;
    var screenHeight = 780;
    var wideCellWidth = normalCellWidth * 2 + cellDistance;
    var cellHeigth = normalCellWidth;

    paintMainRect('#001941');
    startX += mainPadding;
    startY += mainPadding - 10;
    paintStart(startX, startY);

    //First row
    startY += mainPadding;
    paintCell(startX, startY, '#2776EC', 'Store', false);
    paintIcon(startX, startY, 'store', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#61AB18', 'Xbox LIVE Games', false);
    paintIcon(startX, startY, 'xbox', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#B41A40', 'Photos', true);
    paintIcon(startX, startY, 'photos', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#009518', 'Calendar', true);
    paintIcon(startX, startY, 'calendar', true);

    startX += wideCellWidth + cellDistance + groupDistance;
    paintCell(startX, startY, '#603CBA', 'Music', true);
    paintIcon(startX, startY, 'music', true);

    //Second row
    startX = mainPadding;
    startY += cellDistance + cellHeigth;
    paintCell(startX, startY, '#603CBA', 'Maps', false);
    paintIcon(startX, startY, 'maps', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#39BBEA', 'Internet Explorer', false);
    paintIcon(startX, startY, 'internet-explorer', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#603CBA', 'Messaging', true);
    paintIcon(startX, startY, 'messaging', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#DA542E', 'People', true);
    paintIcon(startX, startY, 'people', true);

    startX += wideCellWidth + cellDistance + groupDistance;
    paintCell(startX, startY, '#2776EC', 'SkyDrive', false);
    paintIcon(startX, startY, 'sky-drive', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#DA542E', 'Remote Desktop', false);
    paintIcon(startX, startY, 'remote-desctop', false);

    //Third row
    startX = mainPadding;
    startY += cellDistance + cellHeigth;
    paintCell(startX, startY, '#DA542E', 'Video', true);
    paintIcon(startX, startY, 'video', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#009518', 'Mail', true);
    paintIcon(startX, startY, 'mail', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#000', 'Pinball FX2', false);
    paintImage(startX, startY, 'pinball-fx2');
    paintxBoxLive(startX, startY);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#2776EC', 'Solitare', false);
    paintIcon(startX, startY, 'solitare', false);
    paintxBoxLive(startX, startY);

    startX += normalCellWidth + cellDistance + groupDistance;
    paintCell(startX, startY, '#009518', 'Finance', true);
    paintIcon(startX, startY, 'finance', true);

    //Fourth row
    startX = mainPadding;
    startY += cellDistance + cellHeigth;
    paintCell(startX, startY, '#000', 'Desktop', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#2776EC', 'Weather', true);
    paintIcon(startX, startY, 'weather', true);

    startX += wideCellWidth + cellDistance;
    paintCell(startX, startY, '#B41A40', 'Camera', false);
    paintIcon(startX, startY, 'camera', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#61AB18', 'Xbox Companion', false);
    paintIcon(startX, startY, 'xbox-comp', false);

    startX += normalCellWidth + cellDistance + groupDistance;
    paintCell(startX, startY, '#DA542E', 'Reader', false);
    paintIcon(startX, startY, 'reader', false);

    startX += normalCellWidth + cellDistance;
    paintCell(startX, startY, '#012C70', 'Windows Explorer', false);

    function paintIcon(x, y, iconName, isWide) {
        var iconX;

        if (isWide) {
            iconX = x + 84;
        }
        else {
            iconX = x + 20;
        }
        var iconY = y + 15;

        var icon;// generateIcon(iconName, iconX, iconY);

        icon = document.createElementNS(svgNS, 'image');
        icon.setAttribute('x', iconX);
        icon.setAttribute('y', iconY);
        icon.setAttribute('height', '80px');
        icon.setAttribute('width', '80px');
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'metro-icons/' + iconName + '.png');
        container.appendChild(icon);
    }

    function paintxBoxLive(x, y) {
        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', normalCellWidth);
        rect.setAttribute('height', 15);
        rect.setAttribute('fill', 'white');
        container.appendChild(rect);

        var xBoxText = document.createElementNS(svgNS, 'text');
        xBoxText.setAttribute('y', y + 13);
        xBoxText.setAttribute('x', x + 50);
        xBoxText.setAttribute('fill', 'black');
        xBoxText.setAttribute('font-size', '12px');
        xBoxText.setAttribute('font-family', 'Open Sans');
        xBoxText.innerHTML = 'XBOX LIVE';
        container.appendChild(xBoxText);

        var line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y + 16);
        line.setAttribute('x2', x + normalCellWidth);
        line.setAttribute('y2', y + 16);
        line.setAttribute('stroke-width', 3);
        line.setAttribute('stroke', '#F67A22');
        container.appendChild(line);
    }

    function paintMainRect(color) {
        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('width', screenWidth);
        rect.setAttribute('height', screenHeight);
        rect.setAttribute('fill', color);
        container.appendChild(rect);
    }

    function paintStart(x, y) {
        var start = document.createElementNS(svgNS, 'text');
        start.setAttribute('y', y);
        start.setAttribute('x', x);
        start.setAttribute('fill', 'white');
        start.setAttribute('font-size', '34px');
        start.setAttribute('font-family', 'Open Sans');
        start.innerHTML = 'Start';
        container.appendChild(start);

        var nameX = (screenWidth - 3 * mainPadding) - x;
        var fistName = document.createElementNS(svgNS, 'text');
        fistName.setAttribute('y', y);
        fistName.setAttribute('x', nameX);
        fistName.setAttribute('fill', 'white');
        fistName.setAttribute('font-size', '24px');
        fistName.setAttribute('font-family', 'Open Sans');
        fistName.innerHTML = 'Kircho';
        container.appendChild(fistName);

        var nameY = y + 24;
        var lastName = document.createElementNS(svgNS, 'text');
        lastName.setAttribute('y', nameY);
        lastName.setAttribute('x', nameX + 35);
        lastName.setAttribute('fill', 'white');
        lastName.setAttribute('font-size', '14px');
        lastName.setAttribute('font-family', 'Open Sans');
        lastName.innerHTML = 'Kirov';
        container.appendChild(lastName);

        paintIcon(nameX + 70, y - 60, 'profile-icon', false);
    }

    function paintImage(x, y, imageName) {
        var image = document.createElementNS(svgNS, 'image');
        image.setAttribute('x', x);
        image.setAttribute('y', y + 15);
        image.setAttribute('height', '105');
        image.setAttribute('width', '120');
        image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/' + imageName + '.png');
        container.appendChild(image);
    }

    function paintCell(x, y, color, text, isWide) {
        var width;

        if (isWide) {
            width = wideCellWidth
        }
        else {
            width = normalCellWidth
        }

        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', cellHeigth);
        rect.setAttribute('fill', color);
        container.appendChild(rect);

        var textY = y + cellHeigth - 10;
        var textX = x + 10;
        paintCellText(textX, textY, text);
    }

    function paintCellText(x, y, cellText) {
        var text = document.createElementNS(svgNS, 'text');
        text.setAttribute('y', y);
        text.setAttribute('x', x);
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '12px');
        text.setAttribute('font-family', 'Open Sans');
        text.innerHTML = cellText;

        container.appendChild(text);
    }
}());