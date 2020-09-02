const Display = (() => {
  const insertNavBar = () => {
    const body = document.querySelector('body');
    const navContainer = document.createElement('nav');
    navContainer.classList.add('navbar', 'navbar-dark', 'sticky-top', 'bg-dark', 'flex-md-nowrap', 'p-0', 'shadow');

    const anchor = document.createElement('a');
    anchor.classList.add('navbar-brand', 'col-md-3', 'col-lg-2', 'mr-0', 'px-3');
    anchor.textContent = 'Project: TODO!';

    const navBtn = document.createElement('button');
    navBtn.classList.add('navbar-toggler', 'position-absolute', 'd-md-none', 'collapsed');
    navBtn.setAttribute('type', 'button');
    navBtn.setAttribute('data-toggle', 'collapse');
    navBtn.setAttribute('data-target', '#sidebarMenu');
    navBtn.setAttribute('aria-controls', 'sidebarMenu');
    navBtn.setAttribute('aria-expanded', 'false');
    navBtn.setAttribute('aria-label', 'Toggle navigation');
    const navSpan = document.createElement('span');
    navSpan.classList.add('navbar-toggler-icon');
    navBtn.appendChild(navSpan);

    const navList = document.createElement('ul');
    navList.classList.add('navbar-nav', 'px-3');
    const navOpt = document.createElement('li');
    navList.appendChild(navOpt);

    navContainer.appendChild(anchor);
    navContainer.appendChild(navBtn);
    navContainer.appendChild(navList);
    body.prepend(navContainer);
  };

  const insertSideBar = () => {
    const container = document.querySelector('#main-row');
    const sidebarMenu = document.createElement('nav');
    sidebarMenu.classList.add('col-md-3', 'col-lg-2', 'd-md-block', 'bg-light', 'sidebar', 'collapse');
    sidebarMenu.setAttribute('id', 'sidebarMenu');

    const sideBarDiv = document.createElement('div');
    sideBarDiv.classList.add('sidebar-sticky', 'pt-3');
    const sideBarUL = document.createElement('ul');
    sideBarUL.setAttribute('id', 'projectListing');
    sideBarUL.classList.add('nav', 'flex-column');

    const itemForm = document.createElement('form');
    itemForm.classList.add('add-project-form');
    const itemLI = document.createElement('li');
    itemLI.classList.add('nav-item', 'text-left');
    const itemName = document.createElement('input');
    itemName.setAttribute('placeholder', 'Project Name');
    itemName.setAttribute('name', 'projectName');
    itemName.setAttribute('minlength', '2');
    itemName.setAttribute('maxlength', '12');
    itemName.required = true;
    itemName.classList.add('form-control', 'mx-3', 'w-75');
    const itemBtn = document.createElement('button');
    itemBtn.classList.add('btn', 'btn-danger', 'form-control', 'w-75', 'mx-3', 'my-2');
    itemBtn.textContent = 'ADD PROJECT';
    itemForm.appendChild(itemName);
    itemForm.appendChild(itemBtn);
    itemLI.appendChild(itemForm);
    sideBarUL.appendChild(itemLI);


    sidebarMenu.appendChild(sideBarDiv);
    sideBarDiv.appendChild(sideBarUL);
    container.appendChild(sidebarMenu);
  };

  const initMain = () => {
    const container = document.querySelector('#main-row');
    const main = document.createElement('main');
    main.setAttribute('role', 'main');
    main.classList.add('col-md-9', 'ml-sm-auto', 'col-lg-10', 'px-md-4');
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('id', 'todosContainer');
    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('id', 'projectTitle');
    headerDiv.classList.add('d-flex', 'justify-content-between', 'flex-wrap', 'flex-md-nowrap', 'align-items-center', 'pt-3', 'pb-2', 'mb-3', 'border-bottom');
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('h2', 'projectTitle');
    headerTitle.textContent = '';
    headerDiv.appendChild(headerTitle);
    containerDiv.prepend(headerDiv);
    main.appendChild(containerDiv);
    container.append(main);
  };

  const insertTodoTable = () => {
    const main = document.querySelector('#todosContainer');
    const tableContainer = document.createElement('table');
    tableContainer.classList.add('table', 'table-dark', 'table-striped', 'table-hover');

    const tableHead = document.createElement('thead');
    const tRowHeader = document.createElement('tr');

    const tHeaderTitle = document.createElement('th');
    tHeaderTitle.textContent = 'Title';
    tRowHeader.appendChild(tHeaderTitle);
    const tHeaderDescription = document.createElement('th');
    tHeaderDescription.textContent = 'Description';
    tRowHeader.appendChild(tHeaderDescription);
    const tHeaderDate = document.createElement('th');
    tHeaderDate.textContent = 'Date';
    tRowHeader.appendChild(tHeaderDate);
    const tHeaderPriority = document.createElement('th');
    tHeaderPriority.textContent = 'Priority';
    tRowHeader.appendChild(tHeaderPriority);
    const tHeaderComplete = document.createElement('th');
    tHeaderComplete.textContent = 'Complete?';
    tRowHeader.appendChild(tHeaderComplete);

    tableHead.appendChild(tRowHeader);
    tableContainer.appendChild(tableHead);

    const tBody = document.createElement('tbody');
    tBody.classList.add('todos-table');
    tableContainer.appendChild(tBody);
    main.appendChild(tableContainer);
  };


  const insertProjectTodos = (title, description, date, priority, complete) => {
    const ParentTable = document.querySelector('.todos-table');
    const tableRow = document.createElement('tr');

    const todoTitle = document.createElement('td');
    todoTitle.textContent = title;
    tableRow.appendChild(todoTitle);

    const todoDescription = document.createElement('td');
    todoDescription.textContent = description;
    tableRow.appendChild(todoDescription);

    const todoDate = document.createElement('td');
    todoDate.textContent = date;
    tableRow.appendChild(todoDate);

    const todoPriority = document.createElement('td');
    todoPriority.textContent = priority;
    tableRow.appendChild(todoPriority);

    const todoComplete = document.createElement('td');
    todoComplete.textContent = complete;
    tableRow.appendChild(todoComplete);
    ParentTable.appendChild(tableRow);
  };

  const clearTodosTable = () => {
    const ParentTable = document.querySelector('.todos-table');
    ParentTable.innerHTML = null;
  };

  const initAddTodoForm = () => {
    const container = document.querySelector('#projectTitle');
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('id', 'accordionForm');
    containerDiv.classList.add('mt-3', 'accordion');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.setAttribute('id', 'headingForm');
    const cardHeaderText = document.createElement('h2');
    cardHeaderText.classList.add('mb-0');
    const cardHeaderButton = document.createElement('button');
    cardHeaderButton.classList.add('btn', 'btn-link', 'btn-block', 'text-left', 'collapsed');
    cardHeaderButton.setAttribute('type', 'button');
    cardHeaderButton.setAttribute('data-toggle', 'collapse');
    cardHeaderButton.setAttribute('data-target', '#collapseForm');
    cardHeaderButton.setAttribute('id', 'toDoOpenButton');
    cardHeaderButton.setAttribute('aria-expanded', 'false');
    cardHeaderButton.setAttribute('aria-controls', 'collapseForm');
    cardHeaderButton.textContent = 'Add Todo Item';
    cardHeaderText.appendChild(cardHeaderButton);
    cardHeader.appendChild(cardHeaderText);
    cardDiv.appendChild(cardHeader);

    const formContainer = document.createElement('div');
    formContainer.classList.add('collapse');
    formContainer.setAttribute('id', 'collapseForm');
    formContainer.setAttribute('aria-labelledby', 'headingForm');
    formContainer.setAttribute('data-parent', '#accordionForm');

    const formWrapper = document.createElement('div');
    formWrapper.classList.add('card-body');

    const formElement = document.createElement('form');
    formElement.setAttribute('id', 'formToDo');
    const formRowOne = document.createElement('div');
    formRowOne.classList.add('form-row');

    const formTitleCol = document.createElement('div');
    formTitleCol.classList.add('col');
    const formTitle = document.createElement('input');
    formTitle.classList.add('form-control');
    formTitle.setAttribute('type', 'text');
    formTitle.setAttribute('placeholder', 'Title');
    formTitle.setAttribute('name', 'title');
    formTitle.setAttribute('minlength', '2');
    formTitle.setAttribute('maxlength', '15');
    formTitle.required = true;
    formTitleCol.appendChild(formTitle);
    formRowOne.appendChild(formTitleCol);

    const priorityWrapper = document.createElement('div');
    priorityWrapper.classList.add('form-group', 'col');
    const prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'inputState');
    prioritySelect.setAttribute('name', 'priority');
    prioritySelect.classList.add('form-control');
    const priorityHigh = document.createElement('option');
    priorityHigh.selected = true;
    priorityHigh.textContent = 'High Priority';
    const priorityMedium = document.createElement('option');
    priorityMedium.textContent = 'Medium Priority';
    const priorityLow = document.createElement('option');
    priorityLow.textContent = 'Low Priority';
    prioritySelect.appendChild(priorityLow);
    prioritySelect.appendChild(priorityMedium);
    prioritySelect.appendChild(priorityHigh);
    priorityWrapper.appendChild(prioritySelect);

    formRowOne.appendChild(priorityWrapper);


    const formRowTwo = document.createElement('div');
    formRowTwo.classList.add('form-row');

    const formDescriptionCol = document.createElement('div');
    formDescriptionCol.classList.add('col');
    const formDescription = document.createElement('input');
    formDescription.classList.add('form-control');
    formDescription.setAttribute('type', 'text');
    formDescription.setAttribute('name', 'description');
    formDescription.setAttribute('placeholder', 'Description');
    formDescription.setAttribute('minlength', '2');
    formDescription.setAttribute('maxlength', '40');
    formDescription.required = true;
    formDescriptionCol.appendChild(formDescription);

    formRowTwo.appendChild(formDescriptionCol);

    const formRowDate = document.createElement('div');
    formRowDate.classList.add('form-row', 'my-2');

    const formDateCol = document.createElement('div');
    formDateCol.classList.add('col');
    const formDate = document.createElement('input');
    formDate.classList.add('form-control');
    formDate.setAttribute('type', 'date');
    formDate.setAttribute('id', 'date');
    formDate.setAttribute('name', 'date');
    formDate.setAttribute('value', '2020-09-01');
    formDate.setAttribute('min', '2020-01-01');
    formDate.setAttribute('max', '2099-12-12');

    formDate.required = true;
    formDateCol.appendChild(formDate);

    formRowDate.appendChild(formDateCol);

    const formRowThree = document.createElement('div');
    formRowThree.classList.add('form-row');

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('col');
    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'idAddTodo');
    submitButton.classList.add('btn', 'btn-primary', 'form-control');
    submitButton.textContent = 'ADD';
    btnWrapper.appendChild(submitButton);
    formRowThree.appendChild(btnWrapper);


    formElement.appendChild(formRowOne);
    formElement.appendChild(formRowTwo);
    formElement.appendChild(formRowDate);
    formElement.appendChild(formRowThree);
    formWrapper.appendChild(formElement);

    formContainer.appendChild(formWrapper);
    cardDiv.appendChild(formContainer);
    containerDiv.appendChild(cardDiv);
    container.append(containerDiv);
  };

  const insertProject = (title, id) => {
    const ParentUL = document.querySelector('#projectListing');
    const itemLI = document.createElement('li');
    itemLI.classList.add('nav-item', 'text-left', 'project-link');
    itemLI.setAttribute('id', id);
    const itemLink = document.createElement('a');
    itemLink.classList.add('nav-link');
    itemLink.setAttribute('href', '#');
    itemLI.appendChild(itemLink);
    ParentUL.appendChild(itemLI);
    itemLink.textContent = title;
  };

  const closeTodoForm = () => {
    const addTodoBtn = document.querySelector('#toDoOpenButton');
    addTodoBtn.classList.add('collapsed');
    addTodoBtn.setAttribute('aria-expanded', 'false');
    const collapseForm = document.querySelector('#collapseForm');
    collapseForm.classList.remove('show');
  };

  const initDisplay = () => {
    insertNavBar();
    insertSideBar();
    initMain();
    initAddTodoForm();
    insertTodoTable();
  };


  return {
    initDisplay, insertProject, insertProjectTodos, closeTodoForm, clearTodosTable,
  };
})();

export default Display;