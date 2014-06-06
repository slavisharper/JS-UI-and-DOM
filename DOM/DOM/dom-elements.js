
//Exercise 1.1
function findNestedDivNodes() {
    var nestedDivNodes = document.querySelectorAll("div > div");
    console.log(nestedDivNodes.length);

    return nestedDivNodes;
}

//Exercise 1.2
function findNestedDivNodesByTagName() {
    var divTags = document.getElementsByTagName("div");
    var nestedDivNodes = [];

    for (var i = 0; i < divTags.length; i++) {
        var divTag = divTags[i];
        var innerDivTags = divTag.getElementsByTagName("div");
        var innerDivTagsLength = innerDivTags.length;

        if (innerDivTagsLength > 0) {

            for (var i = 0; i < innerDivTagsLength; i++) {
                var parentNode = innerDivTags[i].parentNode;
                
                if (parentNode.tagName != innerDivTags[i].tagName) {
                    continue;
                }
                nestedDivNodes.push(innerDivTags[i]);
            }
        }
    }

    console.log(nestedDivNodes.length);
    return nestedDivNodes;
}

//Exercise 2
function getInputValue() {
    var inputText = document.getElementById("text-input");
    var value = inputText.value;
    console.log(value);
}

//Exercise 3
function colorChanger() {
    var inputColor = document.getElementById("color-changer");
    var color = inputColor.value;
    //var body = document.body;
    //document.body.setAttribute("style", "background: " + color);
	document.body.style.background = color;
}