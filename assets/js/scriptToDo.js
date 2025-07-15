function addToList(event) {
    event.preventDefault();
    
    const title = document.querySelector("#textOne");
    const ulList = document.querySelector("#taskList");
    const getTitle = title.value.trim();
    
    if (getTitle === '') {
        alert("Please enter Title Name");
        return;
    }

    // Create <li>
    const createLi = document.createElement("li");
    createLi.className = " d-flex justify-content-between border-bottom pb-2 align-items-center mb-2";

    // Create editable span
    const taskSpan = document.createElement("span");
    taskSpan.textContent = getTitle;
    taskSpan.className = "flex-grow-1";
    taskSpan.contentEditable = false; // default not editable
    createLi.appendChild(taskSpan);

    // Clear input
    title.value = "";

    // check for the duplicate names

    const exitingItems = ulList.querySelectorAll("li span");
    for(let item of exitingItems){
        if(item.textContent.toLowerCase() === getTitle.toLowerCase()){
           alert("This name already exists in the list! Please rename your app name.");
            return;
        }
    }

    // Create button container
    const createRow = document.createElement("div");
    createRow.className = "d-flex";
    createLi.appendChild(createRow);

    // Update button (hidden by default)
    const createUpdate = document.createElement("button");
    createUpdate.className = "btn btn-success btn-sm ms-2 d-none";
    createUpdate.textContent = "Update";
    createRow.appendChild(createUpdate);

    // Edit button
    const createEdit = document.createElement("button");
    createEdit.className = "btn btn-info btn-sm ms-2";
    createEdit.textContent = "Edit";
    createRow.appendChild(createEdit);

    // Delete button
    const createDel = document.createElement("button");
    createDel.className = "btn btn-danger btn-sm ms-2";
    createDel.textContent = "Delete";
    createRow.appendChild(createDel);

    // Append to ul
    ulList.appendChild(createLi);

    // --- Edit functionality ---
    createEdit.onclick = function () {
        taskSpan.contentEditable = true;
        taskSpan.focus();
        createUpdate.classList.remove("d-none");
        createEdit.classList.add("d-none");
    };

    // --- Update functionality ---
    createUpdate.onclick = function () {
        taskSpan.contentEditable = false;
        createUpdate.classList.add("d-none");
        createEdit.classList.remove("d-none");
    };

    // --- Delete functionality ---
    createDel.onclick = function () {
        createLi.remove();
    };
}
