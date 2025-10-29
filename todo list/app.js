var todo = [];

function id() {
    return Math.floor(Math.random() * 1000000) + 1;
}
// console.log(id());
var input = document.getElementById("todo");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add_btn").click();
    }
})


function add() {
    var input = document.getElementById("todo").value;
    if (input.trim() !== "") {
        todo.push({ title: input, id: id() });
        display();


        document.getElementById("todo").value = "";
    }
    edit = 0
}
function deleteTodo(deleteId) {
    todo = todo.filter((todo) => todo.id !== deleteId);
    display()
    edit = 0
}
var edit = 0
function editTodo(editId) {
    // todo = todo.map((todo) =>
    //     todo.id === editId ? { ...todo, title: newTitle } : todo
    // );
    // var editvalue = ""

    if (edit === 0) {
        edit = 1
        var editinput = document.getElementById("editInput_" + editId)
        editinput.style.display = "block"
        editinput.innerHTML = `
    <p>Edit Your Task :</p>
        <input type="text" name="edit" id="editinput${editId}" maxlength="35" value="" placeholder="Enter your task for edit ">
        <button id="updatebtn" onclick="updatetodo(${editId})"><i class="fa-solid fa-plus"></i> Update</button>
        `
        // for (var i = 0; i < todo.length; i++) {
        // todo[i].title = document.getElementById("editinput").value
        // var editdiv = document.getElementById("editInput")
        // var editdiv = todo[i]
        // editinput.innerHTML = edit
        // }
    }
}
function updatetodo(updateId) {

    var editinput = document.getElementById("editInput_" + updateId)
    var input = document.getElementById("editinput" + updateId)
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].id == updateId && input.value.trim() !== "") {
            todo.splice(i, 1, { title: input.value, id: updateId })

        }
    }
    edit = 0
    editinput.innerHTML = ""
    display()
}


function display() {
    // var editinput = document.getElementById("todo_container")
    // var edit = ""
    // var newTitle = document.getElementById("todo").value;
    var list = document.getElementById("todo_list");
    var newlist = "";
    for (var i = 0; i < todo.length; i++) {
        newlist += `
        <li class="list animate__animated animate__fadeInRight">
        
        ${todo[i].title}
        <div class="button_container">
        <button onclick="editTodo(${todo[i].id})" class="edit_btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteTodo(${todo[i].id})" class="delete_btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        </li>
        <div class="edit_container animate__animated animate__flipInX" id="editInput_${todo[i].id}"></div>
        `;
    }
    list.innerHTML = newlist;
    // editinput.innerHTML += edit;
    // var editinput = document.getElementById("editInput")
    // // editinput.style.display = "none";
    // console.log(editinput);
    console.log(todo);
}

