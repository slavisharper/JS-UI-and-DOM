var container = document.getElementById("container");
var textarea = document.createElement('textarea');
textarea.id = 'input';
var inputTextColor = document.createElement('input');
inputTextColor.type = 'color';
var inputBackgroundColor = inputTextColor.cloneNode(true);

inputTextColor.id = 'text-color';
inputTextColor.addEventListener('change', function () {
    var color = inputTextColor.value;
    textarea.style.color = color;
});

inputBackgroundColor.id = 'background-color';
inputBackgroundColor.addEventListener('change', function () {
    var color = inputBackgroundColor.value;
    textarea.style.background = color;
});

container.appendChild(textarea);
container.appendChild(inputTextColor);
container.appendChild(inputBackgroundColor);
