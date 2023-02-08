import { drawApp } from "./drawApp.js";
import { add_todo } from "./addTodo.js";
import { removeAll } from "./removeAllTodos.js";
import { removeSelected } from "./removeSelectedTodos.js";

drawApp(document.querySelector(".container"));

document.querySelector(".input-block__add-button-elem").addEventListener("click", () =>{
    add_todo();
})

document.querySelector(".remove-todos-button").addEventListener("click", () =>{
    removeAll();
})

document.querySelector(".remove-selected-todos-button").addEventListener("click", () =>{
    removeSelected();
})