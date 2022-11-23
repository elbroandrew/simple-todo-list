let input_field = document.querySelector(".input-block__input-elem");

let localstorage_data = [];

input_field.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".input-block__add-button-elem").click();
    }
});

function create_todo_from_localstorage(){
    if (!"todo_data" in window.localStorage){
        return
    }
    const ls_data = JSON.parse(localStorage.getItem("todo_data"));
    const ul = document.querySelector(".todo-container__list");
    ls_data.forEach(item => {
        console.log(item)
        let li = create_todo(item);
        ul.appendChild(li);
    });
}

function push_to_localstorage(data){
    data.push("some, text");
    data.push("some text2");
    window.localStorage.setItem("todo_data", JSON.stringify(data));
}

function remove_from_localstorage(){
    window.localStorage?.removeItem("todo_data");
}

push_to_localstorage(localstorage_data);
create_todo_from_localstorage();
remove_from_localstorage();




const todo_list =  document.querySelector(".todo-container__list");

const add_todo = () => {
    const todo = create_todo_from_input_field();
    if (todo){
        todo_list.appendChild(todo);
    }
}


function toggle_class(element, from, to){
    element.classList.remove(from);
    element.classList.add(to);
}

function remove_all(){
    let todo_list = document.querySelector(".todo-container__list");
    while(todo_list.children.length > 0){
        todo_list.removeChild(todo_list.lastChild);
    }
}

function remove_todo(button_pressed){
    todo_list.removeChild(button_pressed.parentNode);
}

function create_todo(text){
    const li = document.createElement('li');
    li.classList.add("todo-container__item");
    const span_text = document.createElement("span");
    span_text.innerText = text.trim();
    span_text.classList.add("todo-container__text", "todo-container__text_state_normal");
    const input_checkbox = document.createElement("input");
    input_checkbox.type = "checkbox";
    input_checkbox.toggle_class = toggle_class;
    input_checkbox.classList.add("todo-container__checkbox");
    input_checkbox.setAttribute("onclick", "change_todo_state(this)");
    const remove_button = document.createElement("button");
    remove_button.innerText = "X";
    remove_button.classList.add("todo-container__button", "todo-container__button_state_hidden");
    remove_button.setAttribute("onclick", "remove_todo(this)");
    li.appendChild(span_text);
    li.appendChild(input_checkbox);
    li.appendChild(remove_button);

    return li;
}

function create_todo_from_input_field() {
    const text_field = document.querySelector('.input-block__input-elem');
    if (text_field.value.trim()){
        let todo = create_todo(text_field.value)
        text_field.value = "";
        return todo;
    }else{
        alert("Input field must not be empty.");
        text_field.value = "";
    }
}

function remove_selected(){
    let todo_list = document.querySelector(".todo-container__list");
    //select all checkboxes
    let selected_items = document.querySelectorAll(".todo-container__checkbox");
    for(const checkbox of selected_items){
        if(checkbox.checked){
            todo_list.removeChild(checkbox.parentNode);
        }
    }
}


function change_todo_state(checkbox){
    let text = checkbox.parentNode.querySelector(".todo-container__text");
    const remove_button = checkbox.parentNode.querySelector(".todo-container__button");

    if (checkbox.checked){
        checkbox.toggle_class(text, "todo-container__text_state_normal", "todo-container__text_state_strikethrough");
        checkbox.toggle_class(remove_button, "todo-container__button_state_hidden", "todo-container__button_state_active");
    }else{
        checkbox.toggle_class(text, "todo-container__text_state_strikethrough", "todo-container__text_state_normal");
        checkbox.toggle_class(remove_button, "todo-container__button_state_active", "todo-container__button_state_hidden")
    }
}

