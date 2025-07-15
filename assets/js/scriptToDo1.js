const addItem = (event) => {
    event.preventDefault(); // Prevent form submission default behavior

    // === Get DOM Elements ===
    const textOne = document.getElementById("textOne"); // Input field
    const checkItNow = document.getElementById("AddToList"); // Add button (not used in logic here)
    const createUl = document.querySelector("#taskList"); // Where items will be appended
    const getTitle = textOne.value.trim(); // User input text

    // === Validation: Empty input ===
    if (getTitle === "") {
        alert("Please add Name/Title of the app");
        return;
    }

    // === Check for duplicates ===
    const exitingItems = document.querySelectorAll("#taskList input[type='text']");
    for (let itemVal of exitingItems) {
        if (itemVal.value.trim().toLowerCase() === getTitle.toLowerCase()) {
            alert("Item/Name already exits!!");
            return;
        }
    }

    // === Create List Item Structure ===
    const liItemWrap = document.createElement("div");
    const liItem = document.createElement("li");

    liItemWrap.className = "li-wrap";
    liItem.className = "li-info d-flex w-100 align-content-center gap-2 justify-content-between";

    const ctaWrap = document.createElement("div");
    ctaWrap.className = "d-flex gap-2 justify-content-end";

    const contentVal = document.createElement("input");
    contentVal.type = "text";
    contentVal.className = "form-control w-100";
    contentVal.disabled = true; // initially non-editable

    // === Create Action Buttons ===
    const editBtn = document.createElement("button");
    const updateBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    editBtn.className = "btn btn-info editBtn";
    editBtn.textContent = "Edit";

    updateBtn.className = "btn btn-success updBtn d-none"; // hidden initially
    updateBtn.textContent = "Update";

    delBtn.className = "btn btn-danger delBtn";
    delBtn.textContent = "Delete";

    // === Append Elements to DOM ===
    contentVal.value = getTitle;
    liItem.appendChild(contentVal);
    ctaWrap.appendChild(editBtn);
    ctaWrap.appendChild(updateBtn);
    ctaWrap.appendChild(delBtn);
    liItem.appendChild(ctaWrap);
    liItemWrap.appendChild(liItem);
    createUl.appendChild(liItemWrap);

    // === DELETE button functionality ===
    delBtn.addEventListener("click", () => {
        const confirmItem = confirm("Are you sure you want to delete this item?");
        if (confirmItem) {
            liItemWrap.remove();
        }
    });

    // === EDIT button functionality ===
    editBtn.addEventListener("click", () => {
        contentVal.disabled = false;
        updateBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
        delBtn.classList.add("d-none");
    });

    // === UPDATE button functionality ===
    updateBtn.addEventListener("click", () => {
        const updateContent = contentVal.value.trim();

        // Validate non-empty
        if (updateContent === "") {
            alert("Title cannot be empty");
            contentVal.focus();
            return;
        }

        // Check for duplicates after editing
        const exitingItems = document.querySelectorAll("#taskList input[type='text']");
        for (let itemVal of exitingItems) {
            if (
                itemVal !== contentVal && // exclude current field from checking
                itemVal.value.trim().toLowerCase() === updateContent.toLowerCase()
            ) {
                alert("Another item with the same name already exists!");
                contentVal.focus();
                return;
            }
        }

        // Toggle buttons and disable editing
        contentVal.disabled = true;
        updateBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        delBtn.classList.remove("d-none");
    });

    // === Reset input field ===
    textOne.value = "";
    textOne.focus();
};
