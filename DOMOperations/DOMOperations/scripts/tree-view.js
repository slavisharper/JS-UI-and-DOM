function generateULList(elements, isMain) {
    var ulList = document.createElement('ul');
    var innerHtml;

    if (isMain) {
        ulList.id = 'main-menu';
        innerHtml = '<a href="#">List Item</a>';

    }
    else {
        innerHtml = '<a href="#">SubList Item</a>';
    }

    var liItem = document.createElement('li');
    liItem.innerHTML = innerHtml;

    for (var i = 0; i < elements; i++) {
        var item = liItem.cloneNode(true);
        ulList.appendChild(item);
    }

    return ulList;
}

//Add list on the selected position 
//It's done recursevly and can be modified to add at specific or random position without recursion

function insertSubmenus(numberOfLayers, position, ulList, layer) {
    layer += 1;

    if (numberOfLayers == 0) {
        return;
    }

    var liItems = ulList.childNodes;
    var item = liItems[position];
    item.firstChild.setAttribute('onclick', 'editVisibility(this.parentElement)');

    if (position > liItems.length) {
        return;
    }

    var subMenu = generateULList(4, false);
    subMenu.className = "sub-menu";
    subMenu.id = layer + " " + position;
    subMenu.style.display = 'none';
    insertSubmenus(numberOfLayers - 1, position, subMenu, layer);

    item.appendChild(subMenu);
}

function editVisibility(node) {
    var insideMenus = node.getElementsByClassName('sub-menu');

    if (insideMenus[0].style.display == 'none') {
        insideMenus[0].style.display = 'block';
    }
    else {
        for (var i = 0; i < insideMenus.length; i += 1) {
            insideMenus[0].style.display = 'none';
        }
    }
}

function createTree() {
    var container = document.getElementById('tree-container');
    var mainList = generateULList(10, true);
    insertSubmenus(3, 1, mainList, 0);   //zero is the starting layer

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.parentElement
    container.appendChild(mainList);
}