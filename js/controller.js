import * as model from './model.js';
import todoView from './views/TodoView.js';

const controlAddNote = function (text) {
  model.addNote(text);
  todoView.render(model.state.notes);
};

const controlAddTitle = function (newNote) {
  model.addNote(newNote);
  todoView.render(model.state.notes);
};

const controlDeleteNote = function (id) {
  model.deleteNote(id);
  todoView.render(model.state.notes);
};

const controlEditNote = function (id, newText) {
  model.editNote(id, newText);
  todoView.render(model.state.notes);
};

const controlReorder = function (fromIndex, toIndex) {
  model.reorderNotes(fromIndex, toIndex);
};

const controlToggleCheck = function (id) {
  model.toggleCheck(id);
};

const init = function () {
  todoView.render(model.state.notes);
  todoView.addHandlerAddItem(controlAddNote);
  todoView.addHandlerDelete(controlDeleteNote);
  todoView.addHandlerEdit(controlEditNote);
  todoView.addHandlerAddTitle(controlAddTitle);
  todoView.addHandlerReorder(controlReorder);
};

init();
