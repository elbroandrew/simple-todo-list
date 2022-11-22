

function pprint(checkbox){
    let text = checkbox.parentNode.querySelector(".todo-container__text");
    if (checkbox.checked){
        toggle_strikethrough(text, "todo-container__text_state_normal", "todo-container__text_state_strikethrough");
    }else{
        toggle_strikethrough(text, "todo-container__text_state_strikethrough", "todo-container__text_state_normal")
    }
}

function toggle_strikethrough(element, from, to){
    element.classList.remove(from);
    element.classList.add(to);
}