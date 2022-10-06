const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");

let todos = JSON.parse(localStorage.getItem("todo-list"));

const showTodo = () => {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      li += `<li class="task">
          <label for="${id}">
            <input type="checkbox" onclick="updateStatus(this)" name="" id="${id}" ${isCompleted}/>
            <p class="${isCompleted}">${todo.name}</p>
          </label>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
            <ul class="task-menu">
              <li><i class="uil uil-pen"></i>Edit</li>
              <li><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
    });
  }
  taskBox.innerHTML = li;
};

showTodo();

const showMenu = (selectedTask) => {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
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
    if (!todos) {
      todos = [];
    }

    let todo = { name: task, status: "pending" };
    todos.push(todo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskInput.value = "";
    alert("Successfully added!");
    showTodo();
  }
});
