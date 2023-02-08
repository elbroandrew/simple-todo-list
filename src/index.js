import { drawApp } from "./drawApp.js";
import { add_todo } from "./addTodo.js";

drawApp(document.querySelector(".container"));
document.querySelector(".input-block__add-button-elem").addEventListener("click", () =>{
    add_todo();
})