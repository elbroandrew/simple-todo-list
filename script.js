

let checkbox_list = Array.from(document.getElementsByClassName("todo-container__checkbox"))
checkbox_list.forEach( c => {
    c.toggle_class = function(element, from, to){
        element.classList.remove(from);
        element.classList.add(to);
    }
});

const todo_list = document.querySelector(".todo-container__list");


function remove_todo(button_pressed){
    todo_list.removeChild(button_pressed.parentNode);
}

class Todo extends HTMLLIElement{

    constructor() {
        super();
        this.span_text = document.createElement("span");
        this.span_text.innerText = "text3";
        this.appendChild(this.span_text);
    }
}
customElements.define('todo-li', Todo, { extends: 'li' });


const add_todo = () => {
    const li = document.createElement('li', { is: 'todo-li' });
    todo_list.appendChild(li);
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



