import * as model from './model.js';
import TodoView from './views/TodoView.js';
import FinishNote from './views/FinishNote.js';
import Dialog from './views/Dialog.js';
import NavToggle from './views/NavToggle.js';
import TabChange from './views/TabChange.js';

const controlAddNote = function (text) {
  model.addNote(text);
  TodoView.render(model.state.notes);
  FinishNote.render(model.state.notes);
};

const controlAddTitle = function (newNote) {
  model.addNote(newNote);
  TodoView.render(model.state.notes);
  FinishNote.render(model.state.notes);
};

const controlDeleteNote = function (id) {
  model.deleteNote(id);
  TodoView.render(model.state.notes);
};

const controlEditNote = function (id, newText) {
  model.editNote(id, newText);
  TodoView.render(model.state.notes);
};

const controlReorder = function (fromIndex, toIndex) {
  model.reorderNotes(fromIndex, toIndex);
};

const controlToggleCheck = function (id) {
  model.toggleCheck(id);
  TodoView.render(model.state.notes);
  FinishNote.render(model.state.notes);
};

const controlDialog = function () {
  Dialog.addHandlerOpen(model.state.notes);
  Dialog.addHandlerClose();
};

const controlNavToggle = function (e) {
  const clickedTab = e.target.closest('.tab');
  if (!clickedTab) return;

  NavToggle.toggleSections(clickedTab);
};

const init = function () {
  FinishNote.render(model.state.notes);
  FinishNote.addHandlerReset(controlToggleCheck);
  TodoView.render(model.state.notes);
  TodoView.addHandlerAddItem(controlAddNote);
  TodoView.addHandlerDelete(controlDeleteNote);
  TodoView.addHandlerEdit(controlEditNote);
  TodoView.addHandlerAddTitle(controlAddTitle);
  TodoView.addHandlerReorder(controlReorder);
  TodoView.addHandleToggle(controlToggleCheck);
  NavToggle.addHandlerToggle(controlNavToggle);

  controlDialog();
};

init();