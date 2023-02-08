
export function drawApp(el){
    el.innerHTML = `
    <h1>ToDo App</h1>
    <div class="input-block">
        <input type="text" class="input-block__input-elem" maxlength="50" placeholder="todo">
        <input type="button" value="add" name="add" class="input-block__add-button-elem">
    </div>
    <div class="todo-container">
        <ul class="todo-container__list">
        </ul>
    </div>
    <button type="button" class="remove-todos-button">Remove All</button>
    <button type="button" class="remove-selected-todos-button">Remove Selected</button>
    `;

}
