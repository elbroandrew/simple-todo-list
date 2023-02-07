
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
        res.push(document.createElement(tag));
    }
    return res;
}

let li_classes = [
    "todo-container__item",
];

let span_classes = [
    "todo-container__text",
    "todo-container__text_state_normal",
];

let input_classes = [
    "todo-container__checkbox",
];

let button_classes = [
    "todo-container__button",
    "todo-container__button_state_hidden",
];

let classes_obj = {
    'li': li_classes,
    'span': span_classes,
    'input': input_classes,
    'button': button_classes,
}

function add_classes(elements, obj){
    for (let el of elements){
        if(el.nodeName === "LI"){
            el.classList.add(...obj['li']);
        }
        else if(el.nodeName === "SPAN"){
            el.classList.add(...obj['span']);
        }
        else if(el.nodeName === "INPUT") {
            el.classList.add(...obj["input"]);
            //el.setAttribute("onclick", "change_todo_state(this)");
        }
        else if(el.nodeName === "BUTTON"){
            el.classList.add(...obj["button"]);
            //el.setAttribute("onclick", "remove_todo(this)");
        }
    }
}

let obj_of_functions = {
    "INPUT": change_todo_state.name,
    "BUTTON": remove_todo.name,
}

function setOnClickAttr(elements, obj){
    for(let el of elements){
        if (obj[el.nodeName]){
            el.setAttribute("onclick", obj[el.nodeName] + "()");
        }
    }
}

function appendToLi(list1){
    let [li, ...list2] = list1;
    for (let el of list2){
        li.appendChild(el);
    }

    return li;
}

function create_todo_elements(text){
    let list_of_elements = create_elements('li', 'span', 'input', "button");
    add_classes(list_of_elements, classes_obj);
    const [li, span, input, button] = list_of_elements;
    input.type = "checkbox";
    input.toggle_class = toggle_class;
    button.innerText = "x";
    setOnClickAttr(list_of_elements, obj_of_functions);
    span.innerText = text.trim();

    return list_of_elements;
}

function create_todo_from_input_field() {
    const text_field = document.querySelector('.input-block__input-elem');
    if (text_field_is_empty(text_field.value)){
        let elements = create_todo_elements(text_field.value);
        let todo = appendToLi(elements);
        text_field.value = "";
        return todo;
    }
    alert("Input field must not be empty.");
    text_field.value = "";
}

function text_field_is_empty(txt){
    return !!txt.trim();
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

