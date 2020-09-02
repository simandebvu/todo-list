import ProjectObject from '../objects/ProjectObject';
import Display from './display';

const Project = (() => {
  let currentProjectID = 0;
  const projectsList = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects'))
    : [];

  const initButtonListeners = () => {
    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach((project, idx) => {
      project.addEventListener('click', (e) => {
        Display.showEditTodoForm(projectsList[currentProjectID].todos[idx]);
        const addTodoBtn = document.querySelector('#toDoOpenButton');
        const mainForm = document.querySelector('#formToDo');
        const submitBtn = document.querySelector('#idAddTodo');
        const titleElement = document.querySelector('#formTitle');
        const descriptionElement = document.querySelector('#formDescription');
        addTodoBtn.onclick = () => {
          addTodoBtn.textContent = 'Add Todo Item';
          submitBtn.setAttribute('data-mode', 'add');
          titleElement.textContent = null;
          descriptionElement.textContent = null;
        };
        addTodoBtn.textContent = 'Editing Todo';
        submitBtn.setAttribute('data-mode', 'edit');
        mainForm.onsubmit = (e) => {
          const {
            title, description, date, priority,
          } = e.target.elements;
          const curTodo = projectsList[currentProjectID].todos[idx];
          curTodo.title = title.value;
          curTodo.description = description.value;
          curTodo.priority = priority.value;
          curTodo.date = date.value;
          localStorage.setItem('projects', JSON.stringify(projectsList));
          Display.closeTodoForm();
          return {
            title, description, date, priority,
          };
        };
        e.preventDefault();
      });
    });
    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach((project, idx) => {
      project.onclick = () => {
        projectsList[currentProjectID].todos.splice(idx, 1);
        localStorage.setItem('projects', JSON.stringify(projectsList));
        const projectTodos = projectsList[currentProjectID];
        Display.clearTodosTable();
        projectTodos.todos.forEach((todo, idx) => {
          Display.insertProjectTodos(idx, todo.title, todo.description, todo.date, todo.priority);
        });
      };
    });
  };

  const addTodo = (title, description, date, priority) => {
    const currentProject = projectsList[currentProjectID];
    currentProject.todos.push({
      title, date, description, priority,
    });
    const todoID = currentProject.todos.length > 0 ? currentProject.todos.length - 1 : 0;
    Display.insertProjectTodos(todoID, title, description, date, priority);
    localStorage.setItem('projects', JSON.stringify(Project.projectsList));
    initButtonListeners();
  };

  const sumbitTodo = (e) => {
    Display.closeTodoForm();
    const addBtn = document.querySelector('#idAddTodo');
    const {
      title, description, date, priority,
    } = e.target.elements;
    if (addBtn.dataset.mode === 'add') {
      addTodo(
        title.value,
        description.value,
        date.value,
        priority.value,
      );
    }
  };

  const initProject = () => {
    const projects = document.querySelectorAll('.project-link');
    const projectTitle = document.querySelector('.projectTitle');
    const demoProject = projects[0];
    projectTitle.textContent = demoProject.textContent;
    const projectTodos = projectsList[demoProject.id];
    currentProjectID = demoProject.id;
    Display.clearTodosTable();
    projectTodos.todos.forEach((todo, idx) => {
      Display.insertProjectTodos(idx, todo.title, todo.description, todo.date, todo.priority);
    });
    initButtonListeners();
  };

  const initProjectListeners = () => {
    const projects = document.querySelectorAll('.project-link');
    const projectTitle = document.querySelector('.projectTitle');

    projects.forEach((project) => {
      project.onclick = () => {
        const projectName = project.textContent;
        projectTitle.textContent = projectName;
        const projectTodos = projectsList[project.id];
        currentProjectID = project.id;
        Display.clearTodosTable();
        projectTodos.todos.forEach((todo, idx) => {
          Display.insertProjectTodos(idx, todo.title, todo.description, todo.date, todo.priority);
          initButtonListeners();
        });
      };
    });
  };

  const loadStoredProjects = () => {
    Display.clearProjectsList();
    if (projectsList.length <= 0) {
      const project = new ProjectObject('Sample Project');
      project.todos = [{
        title: 'Sample todo',
        description: 'Sample Description',
        priority: 'High Priority',
        date: '2020-08-19',
      }];
      projectsList.push(project);
      localStorage.setItem('projects', JSON.stringify(projectsList));
    }
    projectsList.forEach((project, index) => {
      Display.insertProject(project.title, index);
    });
    initProjectListeners();
  };

  const addProject = (value) => {
    const project = new ProjectObject(value);
    projectsList.push(project);
    localStorage.setItem('projects', JSON.stringify(projectsList));
    loadStoredProjects();
  };


  const getCurrentProjectID = () => currentProjectID;
  return {
    initProject,
    addProject,
    loadStoredProjects,
    projectsList,
    sumbitTodo,
    getCurrentProjectID,
  };
})();

export default Project;