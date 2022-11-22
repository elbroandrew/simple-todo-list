

const checkboxes = Array.from(document.getElementsByClassName("todo-container__checkbox"));

function update_checkboxes(checkbox_list){
    checkbox_list.forEach( c => {
        c.toggle_class = toggle_class;
    });
}

function toggle_class(element, from, to){
    element.classList.remove(from);
    element.classList.add(to);
}

update_checkboxes(checkboxes);

const todo_list =  document.querySelector(".todo-container__list");


function remove_todo(button_pressed){
    todo_list.removeChild(button_pressed.parentNode);
}

function remove_all(){
    let todo_list = document.querySelector(".todo-container__list");
    for(let i = 0; i < todo_list.children.length; ){
        todo_list.removeChild(todo_list.children[i])
    }
}

function create_todo() {
    const li = document.createElement('li');
    const span_text = document.createElement("span");
    span_text.innerText = `${document.querySelector('.input-block__input-elem').value}`;
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


const add_todo = () => {
    const todo = create_todo();
    todo_list.appendChild(todo);
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



