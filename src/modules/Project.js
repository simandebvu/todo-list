import ProjectObject from '../objects/ProjectObject';
import Display from './display';

const Project = (() => {
  let currentProjectID = 0;
  const projectsList = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects'))
    : [];

  const addTodo = (title, description, date, priority) => {
    const currentProject = projectsList[currentProjectID];
    Display.insertProjectTodos(title, description, date, priority, 'No');
    currentProject.todos.push({
      title, date, description, priority,
    });
    localStorage.setItem('projects', JSON.stringify(Project.projectsList));
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
        projectTodos.todos.forEach((todo) => {
          Display.insertProjectTodos(todo.title, todo.description, todo.date, todo.priority, 'No');
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
    addProject,
    loadStoredProjects,
    projectsList,
    addTodo,
    getCurrentProjectID,
  };
})();

export default Project;