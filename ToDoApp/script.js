const input = document.getElementById('taskInput');
const btn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');

btn.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.addEventListener('click', () => li.remove());
    list.appendChild(li);
    input.value = '';
  }
});
