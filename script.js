let input_field = document.querySelector(".input-block__input-elem");

input_field.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".input-block__add-button-elem").click();
    }
});

function toggle_class(element, from, to){
    element.classList.remove(from);
    element.classList.add(to);
}


const todo_list =  document.querySelector(".todo-container__list");


function remove_all(){
    let todo_list = document.querySelector(".todo-container__list");
    while(todo_list.children.length > 0){
        todo_list.removeChild(todo_list.lastChild);
    }
}


function create_todo() {
    const text_field = document.querySelector('.input-block__input-elem');
    if (text_field.value.trim()){
        const li = document.createElement('li');
        li.classList.add("todo-container__item");
        const span_text = document.createElement("span");
        span_text.innerText = text_field.value.trim();
        text_field.value = "";
        span_text.classList.add("todo-container__text", "todo-container__text_state_normal");
        const input_checkbox = document.createElement("input");
        input_checkbox.type = "checkbox";
        input_checkbox.toggle_class = toggle_class;
        input_checkbox.classList.add("todo-container__checkbox");
        input_checkbox.setAttribute("onclick", "change_todo_state(this)");
        li.appendChild(span_text);
        li.appendChild(input_checkbox);

        return li;
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

const add_todo = () => {
    const todo = create_todo();
    if (todo){
        todo_list.appendChild(todo);
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

/*TODO:
- local storage
- scss
- rollup
- backend routes
- change marker (emoji)

*/
