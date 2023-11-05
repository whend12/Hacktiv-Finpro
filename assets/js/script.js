const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const checkButton = document.getElementById("check-button");
const clearButton = document.getElementById("clear-button");

let tasks = [];

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    const task = {
      text: inputBox.value ? inputBox.value : "",
    };
    tasks.push(task);

    createTaskElement(task);

    inputBox.value = "";
    saveData();
  }
}

function createTaskElement(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.innerHTML = task.text;
  span.innerHTML = "\u00d7";

  if (task.checked) {
    li.classList.add("checked");
  }

  li.appendChild(span);
  listContainer.appendChild(li);

  span.addEventListener("click", function () {
    removeTask(task, li);
  });

  li.addEventListener("click", function () {
    toggleTask(task, li);
  });
}

function removeTask(task, element) {
  const taskIndex = tasks.indexOf(task);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    element.remove();
    saveData();
  }
}

function toggleTask(task, element) {
  task.checked = !task.checked;
  task.checked
    ? element.classList.add("checked")
    : element.classList.remove("checked");

  saveData();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.checked);
  saveData();
  listContainer.innerHTML = "";
  tasks.forEach((task) => {
    createTaskElement(task);
  });
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }
}

loadTasks();
