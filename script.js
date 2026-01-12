const list = document.getElementById("list");
const taskInput = document.getElementById("task");

function showToast(type) {
  const el = document.querySelector(type === "success" ? ".toast.success" : ".toast.error");
  if (!el) return;
  $(el).toast("show");
}

function addCloseButton(li) {
  const span = document.createElement("span");
  span.className = "close";
  span.innerHTML = "&times;";
  span.onclick = function (e) {
    e.stopPropagation();
    deleteElement(li);
  };
  li.appendChild(span);
}

function deleteElement(li) {
  li.remove();
}

function toggleDone(li) {
  li.classList.toggle("checked");
}

function newElement() {
  const value = taskInput.value.trim();

  if (value === "") {
    showToast("error");
    taskInput.value = "";
    return;
  }

  const li = document.createElement("li");
  li.textContent = value;

  addCloseButton(li);
  list.appendChild(li);

  taskInput.value = "";
  showToast("success");
}

Array.from(list.querySelectorAll("li")).forEach(function (li) {
  addCloseButton(li);
});

list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    toggleDone(e.target);
  }
});

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    newElement();
  }
});
