import ProjectObject from '../objects/ProjectObject';
import Display from './display';

const Project = (() => {
  let currentProjectID = 0;
  const projectsList = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects'))
    : [];

  const initButtonListeners = () => {
    const btnsDone = document.querySelectorAll('.btn-done');
    btnsDone.forEach((project) => {
      project.onclick = () => {
        console.log(`done ${Project.getCurrentProjectID()}`);
      };
    });
    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach((project, idx) => {
      project.addEventListener('click', (e) => {
        const id = event.target.getAttribute('id');
        console.log(idx);
        console.log(projectsList[currentProjectID][idx]);

        e.preventDefault();
      });
      // project.onclick = (e) => {
      //   console.log(e.target.elements);
      //   const id = e.target.getAttribute('id');
      //   console.log(`edit ${Project.getCurrentProjectID()} id ${id}`);
      // };
    });
    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach((project) => {
      project.onclick = () => {
        console.log(`delete ${Project.getCurrentProjectID()}`);
      };
    });
  };

  const addTodo = (title, description, date, priority) => {
    const currentProject = projectsList[currentProjectID];
    currentProject.todos.push({
      title, date, description, priority,
    });
    const todoID = currentProject.todos.length > 0 ? currentProject.todos.length - 1 : 0;
    Display.insertProjectTodos(todoID, title, description, date, priority, 'No');
    localStorage.setItem('projects', JSON.stringify(Project.projectsList));
    initButtonListeners();
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
      Display.insertProjectTodos(idx, todo.title, todo.description, todo.date, todo.priority, 'No');
    });
    initButtonListeners();
  };

  const initProjectListeners = () => {
    const projectsList = JSON.parse(localStorage.getItem('projects'));
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
          Display.insertProjectTodos(idx, todo.title, todo.description, todo.date, todo.priority, 'No');
          initButtonListeners();
        });
      };
    });
  };

  const loadStoredProjects = () => {
    if (projectsList.length <= 0) {
      const project = new ProjectObject('Sample Project');
      project.todos = [{
        title: 'Sample todo',
        description: 'Sample Description',
        priority: 'high',
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
    initProjectListeners();
  };


  const getCurrentProjectID = () => currentProjectID;
  return {
    initProject,
    addProject,
    loadStoredProjects,
    projectsList,
    addTodo,
    getCurrentProjectID,
  };
})();

export default Project;