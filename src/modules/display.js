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
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('d-flex', 'justify-content-between', 'flex-wrap', 'flex-md-nowrap', 'align-items-center', 'pt-3', 'pb-2', 'mb-3', 'border-bottom');
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('h2');
    headerTitle.textContent = 'Projects Listing';
    headerDiv.appendChild(headerTitle);
    containerDiv.appendChild(headerDiv);
    main.appendChild(containerDiv);
    container.append(main);
  };

  const insertTable = () => {
    const main = document.querySelector('main');
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


  const insertProjectTodo = (project, title, date, description, complete) => {
    const ParentTable = document.querySelector('.todos-table');
    const tableRow = document.createElement('tr');

    const todoTitle = document.createElement('td');
    todoTitle.textContent = title;
    tableRow.appendChild(todoTitle);

    const todoDate = document.createElement('td');
    todoDate.textContent = date;
    tableRow.appendChild(todoDate);

    const todoDescription = document.createElement('td');
    todoDescription.textContent = description;
    tableRow.appendChild(todoDescription);

    const todoComplete = document.createElement('td');
    todoComplete.textContent = complete;
    tableRow.appendChild(todoComplete);
    ParentTable.appendChild(tableRow);
  };

  const initDisplay = () => {
    insertNavBar();
    insertSideBar();
    initMain();
    insertTable();
  };

  const insertProject = (title) => {
    const ParentUL = document.querySelector('#projectListing');
    const itemLI = document.createElement('li');
    itemLI.classList.add('nav-item', 'text-left');
    const itemLink = document.createElement('a');
    itemLink.classList.add('nav-link');
    itemLink.setAttribute('href', '#');
    itemLI.appendChild(itemLink);
    ParentUL.appendChild(itemLI);
    itemLink.textContent = title;
  };


  return { initDisplay, insertProject, insertProjectTodo };
})();

export default Display;