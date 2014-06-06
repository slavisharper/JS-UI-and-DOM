//Exercise 4*
// I am using Sizzle library Sizzle supports:IE6+, FF 3.0+, Chrome 5+,
//Safari 4+, Opera 10.6+
if (!document.querySelector) {
    document.querySelector = function (selector) {
        var elements = Sizzle(selector);
        var element = elements[0];
        return element;
    }
}

if (!document.querySelectorAll) {
    document.querySelectorAll = function (selector) {
        var elements = Sizzle(selector);
        return elements;
    }
}