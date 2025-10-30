const addButton = document.getElementById("add");
const themeToggleBtn = document.getElementById("themeToggle");

//Load Saved Notes
const notes = JSON.parse(localStorage.getItem("notes"));

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.classList.add(savedTheme);
} else {
  // Default to pink-theme if no theme saved
  document.documentElement.classList.add("pink-theme");
}

//Update Notes in LocalStorage
const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};

//Add a New Note
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  // Delete Note
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  // Toggle Edit Mode
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  // Markdown Preview
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.appendChild(note);
};

//Add Button Click
addButton.addEventListener("click", () => addNewNote());

//Load Notes from Storage
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

//Theme Toggle Button
themeToggleBtn.addEventListener("click", () => {
  if (document.documentElement.classList.contains("pink-theme")) {
    document.documentElement.classList.remove("pink-theme");
    document.documentElement.classList.add("blue-theme");
    localStorage.setItem("theme", "blue-theme");
  } else {
    document.documentElement.classList.remove("blue-theme");
    document.documentElement.classList.add("pink-theme");
    localStorage.setItem("theme", "pink-theme");
  }
});