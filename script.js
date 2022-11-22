
let checkbox_list = Array.from(document.getElementsByClassName("todo-container__checkbox"))
checkbox_list.forEach( c => {
    c.toggle_class = function(element, from, to){
        element.classList.remove(from);
        element.classList.add(to);
    }
})


function pprint(checkbox){
    let text = checkbox.parentNode.querySelector(".todo-container__text");
    if (checkbox.checked){
        checkbox.toggle_class(text, "todo-container__text_state_normal", "todo-container__text_state_strikethrough");

    }else{
        checkbox.toggle_class(text, "todo-container__text_state_strikethrough", "todo-container__text_state_normal")
    }
}

