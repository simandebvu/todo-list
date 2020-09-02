import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import 'bootstrap';
import Display from './modules/display';
import Project from './modules/Project';


Display.initDisplay();


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
  Display.closeTodoForm();
  const {
    title, description, date, priority,
  } = e.target.elements;
  Project.addTodo(
    title.value,
    description.value,
    date.value,
    priority.value,
  );
  e.target.reset();
};
Project.loadStoredProjects();
