
(function textFieldSendOnEnterKey(){
    document.querySelector(".input-block__input-elem").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".input-block__add-button-elem").click();
        }
    });
})();

// (function clearInputClickOnPage(){
//     document.addEventListener('click', function (event){
//         document.querySelector(".input-block__input-elem").value = "";
//     })
// })();



const add_todo = () => {
    const todo = create_todo_from_input_field();
    if (todo){
        //append to ul
        document.querySelector(".todo-container__list").appendChild(todo);
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
    let parent_node = button_pressed.parentNode;
    parent_node.querySelector(".todo-container__text").innerText.trim();
    document.querySelector(".todo-container__list").removeChild(parent_node);
}


function create_elements(...tag_names_list){
    let res = [];
    for (let tag of tag_names_list){
        res.push(document.createElement(`${tag}`));
    }
    return res;
}

function add_attributes(elements, text){
    for (let el of elements){
        if(el.nodeName === "LI"){
            el.classList.add("todo-container__item");
        }
        else if(el.nodeName === "SPAN"){
            el.classList.add("todo-container__text", "todo-container__text_state_normal");
            el.innerText = text.trim();
        }
        else if(el.nodeName === "INPUT") {
            el.classList.add("todo-container__checkbox");
            el.toggle_class = toggle_class;
            el.type = "checkbox";
            el.setAttribute("onclick", "change_todo_state(this)");
        }
        else if(el.nodeName === "BUTTON"){
            el.classList.add("todo-container__button", "todo-container__button_state_hidden");
            el.innerText = "x";
            el.setAttribute("onclick", "remove_todo(this)");
        }
    }
}

function appendToLi(li, list1){
    for (let e of list1){
        li.appendChild(e);
    }
}

function create_todo(text){
    let list_of_elements = create_elements('li', 'span', 'input', "button");
    add_attributes(list_of_elements, text);
    const [li, ...elements] = list_of_elements;
    appendToLi(li, elements);

    return li;
}

function text_field_is_empty(txt){
    return !!txt.trim();
}


function create_todo_from_input_field() {
    const text_field = document.querySelector('.input-block__input-elem');
    if (text_field_is_empty(text_field.value)){
        let todo = create_todo(text_field.value)
        text_field.value = "";
        return todo;
    }
    alert("Input field must not be empty.");
    text_field.value = "";
}

function remove_selected(){
    let selected_items = document.querySelectorAll(".todo-container__checkbox");
    for(const checkbox of selected_items){
        if(checkbox.checked){
            document.querySelector(".todo-container__list").removeChild(checkbox.parentNode);
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

