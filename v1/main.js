const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditTask = false;

clearAll.addEventListener("click", () => {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

const showTodo = (filtersId) => {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filtersId == todo.status || filtersId == "all") {
        li += `<li class="task">
          <label for="${id}">
            <input type="checkbox" onclick="updateStatus(this)" name="" id="${id}" ${isCompleted}/>
            <p class="${isCompleted}">${todo.name}</p>
          </label>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
            <ul class="task-menu">
              <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `U don't have any task.. `;
};

showTodo("all");

const editTask = (id, name) => {
  editId = id;
  isEditTask = true;
  taskInput.value = name;
};

const showMenu = (selectedTask) => {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
};

const deleteTask = (id) => {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
};

const updateStatus = (selectedTask) => {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
};

taskInput.addEventListener("keyup", (e) => {
  let task = taskInput.value.trim();

  if (e.key == "Enter" && task) {
    if (!isEditTask) {
      if (!todos) {
        todos = [];
      }
      let todo = { name: task, status: "pending" };
      todos.push(todo);
    } else {
      isEditTask = false;
      todos[editId].name = task;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }
});
