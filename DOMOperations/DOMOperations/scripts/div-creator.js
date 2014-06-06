function onGenerateDivsButtonClick() {
    var container = document.getElementById("boxes-container");
    var inputValue = document.getElementById("div-count").value;
    var divCount = inputValue | 0;

    var docFragment = document.createDocumentFragment();
    var div = document.createElement("div");
    var divContent = "<strong>div</strong>"
    div.innerHTML = divContent;
    div.style.position = "absolute";

    clearNodeContent(container);

    for (var i = 0; i < divCount; i++) {
        var currentDiv = div.cloneNode(true);
        generateStyle(currentDiv);
        docFragment.appendChild(currentDiv);
    }

    if (docFragment.length < 1) {
        //show some error
    }
    else {
        container.appendChild(docFragment);
    }

    function generateStyle(node) {
        node.style.width = generateRandomNumber(20, 100) + "px";
        node.style.height = generateRandomNumber(20, 100) + "px";
        node.style.background = generateColor();
        node.style.color = generateColor();
        node.style.top = generateRandomNumber(0, 640) + "px";
        node.style.right = generateRandomNumber(0, 1024) + "px";
        node.style.borderRadius = generateRandomNumber(0, 50) + "px";
        node.style.border = generateRandomNumber(1, 20) + "px solid"; 
        node.style.borderColor = generateColor();
    }

    function generateColor(){
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

    function clearNodeContent(nodeElement){
        while (nodeElement.firstChild) {
            nodeElement.removeChild(nodeElement.firstChild);
        }
    }
}