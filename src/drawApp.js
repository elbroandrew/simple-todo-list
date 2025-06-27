
export function drawApp(el){
    el.innerHTML = `
    <h1>ToDo App</h1>
    <div class="input-block">
        <input type="text" class="input-block__input-elem" maxlength="50" placeholder="todo">
        <button class="input-block__add-button-elem">
            <i class="fas fa-plus"></i> Add Task
        </button>
    </div>
    <div class="todo-container">
        <ul class="todo-container__list">
        </ul>
    </div>

    <button class="remove-todos-button">
        <i class="fas fa-trash-alt"></i> Remove All
    </button>

    <button class="remove-selected-todos-button">
        <i class="fas fa-times-circle"></i> Remove Selected
    </button>
    `;

}
