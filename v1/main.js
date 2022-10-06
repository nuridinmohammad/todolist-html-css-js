const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");

let todos = JSON.parse(localStorage.getItem("todo-list"));

const showTodo = () => {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      li += `<li class="task">
          <label for="${id}">
            <input type="checkbox" name="" id="${id}" />
            <p>${todo.name}</p>
          </label>
          <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
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
