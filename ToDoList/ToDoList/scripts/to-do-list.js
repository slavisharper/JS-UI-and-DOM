function showListInput() {
    var createLi = document.getElementById("add-list");

    var inputField = createLi.getElementsByTagName('input')[0];
    inputField.style.display == 'inline' ?
        inputField.style.display = 'none' :
        inputField.style.display = 'inline';

    var addButton = createLi.getElementsByTagName('button')[0];
    addButton.style.display == 'inline' ?
        addButton.style.display = 'none' :
        addButton.style.display = 'inline';
    addButton.addEventListener('click', createList, false);
}

function selectList(holdingLi) {
    removeCurrentClassName();
    holdingLi.className = 'current';
}

function createList(e) {
    var listName = e.target.previousElementSibling.value;
    e.target.previousElementSibling.value = '';
    if (listName.length < 1) {
        alert("Enter at least one letter for the list name!");
        return;
    }

    var listHolder = document.createElement('li');
    listHolder.innerHTML = getNewListTemplate(listName);
    listHolder.className = 'current';
    listHolder.setAttribute('onclick', 'selectList(this)');
    removeCurrentClassName();

    var creationLi = e.target.parentNode;
    var listNav = document.getElementById('list-nav');
    listNav.insertBefore(listHolder, creationLi);
    showListInput();
}

function addTask(addButton) {
    var task = addButton.previousElementSibling.value;
    addButton.previousElementSibling.value = "";

    if (task.length < 1) {
        alert("Entered empty task!");
        return;
    }

    var spanElement = document.createElement('span');
    spanElement.innerHTML = task;

    var removeButton = document.createElement('a');
    removeButton.href = '#';
    removeButton.innerHTML = ' x';
    removeButton.className = 'remove-task-btn';
    removeButton.addEventListener('click', removeTask, false);

    var liElement = document.createElement('li');
    liElement.appendChild(spanElement);
    liElement.appendChild(removeButton);

    var addTaskLi = addButton.parentNode;
    var taskList = addTaskLi.parentNode;
    taskList.insertBefore(liElement, addTaskLi)
}

function removeTask(e) {
    var sureToRemove = confirm("Delete these task?");
    
    if (sureToRemove) {
        var itemToRemove = e.target.parentNode;
        itemToRemove.parentNode.removeChild(itemToRemove);
    }

}

function removeCurrentClassName() {
    var currentClassElements = document.getElementsByClassName('current');

    for (var i = 0; i < currentClassElements.length; i++) {
        currentClassElements[i].className = '';
    }
}

function getNewListTemplate(listName) {
    var firstPart = '<a href="#" class="list-btn">';
    var secondPart = '</a><ul class="list"><li><input type="text" id="item-value"/><a href="#" class="add-task" onclick="addTask(this)">Add task</a></li></ul>';

    return firstPart + listName + secondPart;
}