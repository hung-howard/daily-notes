import * as model from './model.js';
import TodoView from './views/TodoView.js';
import Finishitem from './views/Finishitem.js';

const controlAddNote = function (text) {
  model.addNote(text);
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
};

const controlAddTitle = function (newNote) {
  model.addNote(newNote);
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
};

const controlDeleteNote = function (id) {
  model.deleteNote(id);
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
};

const controlEditNote = function (id, newText) {
  model.editNote(id, newText);
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
};

const controlReorder = function (fromIndex, toIndex) {
  model.reorderNotes(fromIndex, toIndex);
};

const controlToggleCheck = function (id) {
  model.toggleCheck(id);
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
};

const init = function () {
  TodoView.render(model.state.notes);
  Finishitem.render(model.state.notes);
  Finishitem.addHandlerReset(controlToggleCheck);
  TodoView.addHandlerAddItem(controlAddNote);
  TodoView.addHandlerDelete(controlDeleteNote);
  TodoView.addHandlerEdit(controlEditNote);
  TodoView.addHandlerAddTitle(controlAddTitle);
  TodoView.addHandlerReorder(controlReorder);
  TodoView.addHandleToggle(controlToggleCheck);
};

init();
