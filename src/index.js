import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import 'bootstrap';
import Display from './modules/display';
import Project from './modules/Project';


Display.initDisplay();

Project.loadStoredProjects();
Project.initProject();
const formProject = document.querySelector('.add-project-form');
formProject.onsubmit = (e) => {
  e.preventDefault();
  const {
    projectName,
  } = e.target.elements;
  Display.insertProject(projectName.value);
  Project.addProject(projectName.value);
  e.target.reset();
};

const form = document.querySelector('#formToDo');
form.onsubmit = (e) => {
  e.preventDefault();
  Project.sumbitTodo(e);
  e.target.reset();
};
