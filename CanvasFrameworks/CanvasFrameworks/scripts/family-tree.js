//There are some thing to do. I don't like the lines. 
//Could refactor later but there is no time now. I hope you understand.

var stage = new Kinetic.Stage({
    container: 'container',
    width: 1024,
    height: 768
});

var layer = new Kinetic.Layer();

var familyMembers = [
     {
         mother: 'Maria Petrova',
         father: 'Georgi Petrov',
         children: ['Teodora Petrova', 'Peter Petrov']
     }, {
        mother: 'Petra Stamatova',
        father: 'Todor Stamatov',
        children: ['Maria Petrova', 'Golem Pich']
     }, {
         mother: 'Teodora Petrova',
         father: 'Grigor Cvetanov',
         children: ['Petq Cvetanova']
     }, {
         father: 'Peshko Stamatov',
         mother: 'Gergana Stamatova',
         children: ['Todor Stamatov']
     }, {
         father: 'Peter Petrov',
         mother: 'Gabi Kiurova',
         children: ['Toshko']
     }, {
         father: 'Slavi Cvetanov',
         mother: 'Gabi Cvetanova',
         children: ['Peshko Stamatov', 'Tup Tup']
     }, {
		father: 'Golem Pich',
		mother: 'Simona Todorova',
		children: ['Gulubin Petrov']
	 }, {
		father: 'Tup Tup',
		mother: 'Umna Umna',
		children: ['Sredno Glupovato']
	 } , {
		father: 'Sredno Glupovato',
		mother: 'Mariika',
		children: ['Ivancho']
	 }
];

var connectingLines = {};
var sortedFamilies = sortFamilyToLevels(familyMembers);
addFamilyLevelsToLayer(layer, sortedFamilies);
//addConnectingLinesToLayer(layer, connectingLines);

// add the layer to the stage
stage.add(layer);

//These needs to be broken into  smaller methods but i didn't have any time.
//It does the following things: Takes the sorted family level, and for every
//one generates the graphics (mother and father from one family are closer.
//Calculates the position of every element, and adds it to the layer
function addFamilyLevelsToLayer(layer, sortedFamilies) {
    var spaceBetweenLevels = 110;
    var spaceBetweenFamilyMembers = 30;
    var startY;
    var startX;

    for (var i = 0; i < sortedFamilies.length; i++) {
        var currentFamilyLevel = sortedFamilies[i];
        var loadedFamilyGraphic = [];
        var isLastAFamily = false;

        for (var j = 0; j < currentFamilyLevel.length; j++) {
  
            //Depend on valid family and check just one of the parrents
            if (currentFamilyLevel[j].father) {
                var maleBox, femaleBox;

                if (isLastAFamily) {
                    maleBox = generateMaleBox(currentFamilyLevel[j].father, 30, 0);
                    femaleBox = generateFemaleBox(currentFamilyLevel[j].mother, 30, 0);
                }
                else {
                    maleBox = generateMaleBox(currentFamilyLevel[j].father, 0, 0);
                    femaleBox = generateFemaleBox(currentFamilyLevel[j].mother, 0, 0);
                }

                loadedFamilyGraphic.push(maleBox);
                loadedFamilyGraphic.push(femaleBox);
                isLastAFamily = true;
            }
            else {
                var childWithoutFamily = currentFamilyLevel[j];
                
                if (isLastAFamily) {
                    if (childWithoutFamily[childWithoutFamily.length - 1] == 'a') {
                        loadedFamilyGraphic.push(generateFemaleBox(childWithoutFamily, 60, 0));
                    }
                    else {
                        loadedFamilyGraphic.push(generateMaleBox(childWithoutFamily, 60, 0));
                    }
                }
                else {
                    if (childWithoutFamily[childWithoutFamily.length - 1] == 'a') {
                        loadedFamilyGraphic.push(generateFemaleBox(childWithoutFamily, 30, 0));
                    }
                    else {
                        loadedFamilyGraphic.push(generateMaleBox(childWithoutFamily, 30, 0));
                    }
                }

                isLastAFamily = false;
            }
        }

        var levelWidth = calculateFamilyLevelWidth(loadedFamilyGraphic);
        startX = 1024 / 2 - levelWidth / 2;
        startY = i * spaceBetweenLevels + 40;

        for (var k = 0; k < loadedFamilyGraphic.length; k++) {
            var additonalSpace = loadedFamilyGraphic[k].box.attrs.x;

            loadedFamilyGraphic[k].name.setX(startX + additonalSpace);
            loadedFamilyGraphic[k].name.setY(startY);
            loadedFamilyGraphic[k].box.setX(startX + additonalSpace);
            loadedFamilyGraphic[k].box.setY(startY);

            saveLineData(loadedFamilyGraphic[k].name, sortedFamilies, layer);
            layer.add(loadedFamilyGraphic[k].box).add(loadedFamilyGraphic[k].name);

            var currentBoxLength = loadedFamilyGraphic[k].box.attrs.width
            startX = currentBoxLength + spaceBetweenFamilyMembers + startX;
        }
    }

    addLastLevelChildren(sortedFamilies[sortedFamilies.length - 1],
        layer, startY + spaceBetweenLevels);
}

//This method saves and adds the lines connecting the members.
//Gets name, calculates starting point for the line, if the 
//person has a parents, finds there starting points and creates a line.
function saveLineData(nameElement, sortedFamilies, layer) {
    var name = nameElement.attrs.text;
    var elementWidth = nameElement.getTextWidth();
    var elementX = nameElement.attrs.x + 10;
    var startX = elementX + elementWidth / 2;
    var startY = nameElement.attrs.y;
    connectingLines[name] = {};
    connectingLines[name].startX = startX;
    connectingLines[name].startY = startY + 34;

    var parents = getParents(name, sortedFamilies);

    //add actual line
    if (parents.length != 0) {
        var parentX = connectingLines[parents[0]].startX;
        var parentY = connectingLines[parents[0]].startY;
        var secondParentX = connectingLines[parents[1]].startX;
        var secondParentY = connectingLines[parents[1]].startY;

       var line = generateLine(parentX, parentY, startX, startY);
       var secondLine = generateLine(secondParentX, secondParentY, startX, startY);
       layer.add(line).add(secondLine);
    }
}

//Add-on function for the last level of the family tree
function addLastLevelChildren(lastLevel, layer, startY) {
    var lastLevelGraphics = []

    for (var i = 0; i < lastLevel.length; i++) {

        if (lastLevel[i].children) {

            for (var j = 0; j < lastLevel[i].children.length; j++) {
                var childName = lastLevel[i].children[j];

                if (childName[childName.length - 1] == 'a') {
                    lastLevelGraphics.push(generateFemaleBox(childName, 50, 0));
                }
                else {
                    lastLevelGraphics.push(generateMaleBox(childName, 50, 0));
                }
            }
        }
    }

    var startX = 1024 / 2 - calculateFamilyLevelWidth(lastLevelGraphics) / 2;

    for (var k = 0; k < lastLevelGraphics.length; k++) {
        lastLevelGraphics[k].name.setX(startX);
        lastLevelGraphics[k].name.setY(startY);
        lastLevelGraphics[k].box.setX(startX);
        lastLevelGraphics[k].box.setY(startY);

        saveLineData(lastLevelGraphics[k].name, sortedFamilies, layer);
        layer.add(lastLevelGraphics[k].box).add(lastLevelGraphics[k].name);

        var currentBoxLength = lastLevelGraphics[k].box.attrs.width
        startX = currentBoxLength + 50 + startX;
    }
}

//Calculates the whole width of the family(boxes and spaces beween them)
function calculateFamilyLevelWidth(levelGraphics) {
    var length = (levelGraphics.length - 1) * 50;

    for (var i = 0; i < levelGraphics.length; i++) {
        var boxLength = levelGraphics[i].box.attrs.width;
        length += boxLength;
    }

    return length;
}

//Sorts the families to family levels.
//First finds the elder family and then seeks others by the children
//It deletes the familyMembers. Could save the variable into local to prevent this
function sortFamilyToLevels(familyMembers) {
    var familyLevels = [];
    var elderFamilyLevel = [findAndRemoveElderFamily(familyMembers)];
    familyLevels.push(elderFamilyLevel);
    
    var nextFamilyLevel = [];
    
    while (familyMembers.length != 0) {
        for (var j = 0; j < elderFamilyLevel.length; j++) {

            if (elderFamilyLevel[j].children) {
                for (var i = 0; i < elderFamilyLevel[j].children.length; i++) {
                    var childFamily;

                    childFamily = findAndRemoveChildrenFamily(elderFamilyLevel[j].children[i],
                        familyMembers);

                    nextFamilyLevel.push(childFamily);
                }
            }
        }

        elderFamilyLevel = nextFamilyLevel;
        nextFamilyLevel = [];
        familyLevels.push(elderFamilyLevel);
    }
    return familyLevels;
}

//The same as the previous
function findAndRemoveChildrenFamily(name, familyMembers) {
    var family;

    for (var i = 0; i < familyMembers.length; i++) {
        
        if (familyMembers[i].father == name || familyMembers[i].mother == name) {
            family = familyMembers[i];
            break;
        }
    }
    if (family == undefined) {
        return name;
    }
    familyMembers.splice(familyMembers.indexOf(family), 1);
    return family;
}

function findAndRemoveElderFamily(familyMembers) {
    var elderFamily;
    var areChildren = false;

    for (var i = 0; i < familyMembers.length; i++) {
        var currentelderFamily = familyMembers[i];

        for (var j = 0; j < familyMembers.length; j++) {
            if (i == j) {
                continue;
            }
            var comparingFamily = familyMembers[j];

            for (var k = 0; k < comparingFamily.children.length; k++) {
                if (currentelderFamily.mother == comparingFamily.children[k]
                    || currentelderFamily.father == comparingFamily.children[k]) {
                    areChildren = true;
                    break;
                }
            }

            if (areChildren) {
                break;
            }
        }

        if (!areChildren) {
            elderFamily = currentelderFamily;
            break;
        }
        areChildren = false;
    }
    console.log(elderFamily.father);
    familyMembers.splice(familyMembers.indexOf(elderFamily), 1);
    return elderFamily;
}

function generateMaleBox(name, x, y, layer) {
    var text = generateText(name, x, y);
    var boxWidth = text.getTextWidth() + 20;

    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        cornerRadius: 5,
        stroke: 'green',
        width: boxWidth,
        height: 34
    });

    return{name: text , box: rect};
}

function generateFemaleBox(name, x, y) {
    var text = generateText(name, x, y);
    var boxWidth = text.getTextWidth() + 20;

    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        cornerRadius: 15,
        stroke: 'green',
        width: boxWidth,
        height: 34
    });

    return{name: text , box: rect};
}

function generateText(name, x, y) {
    var text = new Kinetic.Text({
        text: name,
        fontFamily: 'Calibri',
        fontSize: 14,
        padding: 10,
        fill: 'black',
        x: x,
        y: y
    });

    return text;
}

function generateLine(startX, startY, endX, endY) {
    var line = new Kinetic.Line({
        points: [startX, startY, endX, endY],
        stroke: 'green',
    });

    return line;
}

function getParents(name, sortedList) {
    var mother;
    var father;

    for (var i = 0; i < sortedList.length; i++) {
        var currentFamilyLine = sortedList[i];

        for (var k = 0; k < currentFamilyLine.length; k++) {
            var currentFamily = currentFamilyLine[k];
            if (!currentFamily.mother) {
                continue;
            }

            var children = currentFamily.children;

            for (var j = 0; j < children.length; j++) {

                if (name == children[j]) {
                    mother = currentFamily.mother;
                    father = currentFamily.father;
                    return [mother, father];
                }
            }
        }
    }
    return [];
}