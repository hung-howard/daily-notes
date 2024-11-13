import * as model from './model.js';
import TodoView from './views/TodoView.js';
import FinishNote from './views/FinishNote.js';
import Dialog from './views/Dialog.js';
import NavToggle from './views/NavToggle.js';
import DailyNoteView from './views/DailyNoteView.js';
import TabChange from './views/TabChange.js';

const updateViews = function () {
  TodoView.render(model.state.notes);
  FinishNote.render(model.state.notes);
};

const controlAddNote = function (text) {
  model.addNote(text);
  updateViews();
};

const controlAddTitle = function (newNote) {
  model.addNote(newNote);
  updateViews();
};

const controlDeleteNote = function (id) {
  model.deleteNote(id);
  updateViews();
};

const controlEditNote = function (id, newText) {
  model.editNote(id, newText);
  updateViews();
};

const controlReorder = function (fromIndex, toIndex) {
  model.reorderNotes(fromIndex, toIndex);
};

const controlToggleCheck = function (id) {
  model.toggleCheck(id);
  updateViews();
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

const controlDailyNoteView = function (experience) {
  const currentDate = new Date().toLocaleDateString();
  const completedTasks = model.state.notes.filter(
    (note) => note.checked && note.type === 'item'
  );

  // 1. 儲存到 model
  const newNote = model.addDailyNote(currentDate, experience, completedTasks);

  // 2. 重新渲染所有記錄
  controlRenderDailyNotes();
};

const controlRenderDailyNotes = function () {
  const dailyNotes = model.state.dailyNotes;

  DailyNoteView.clear();

  if (Object.keys(dailyNotes).length > 0) {
    // 使用 entries() 來同時獲取 key(date) 和 value(note)
    const sortedNotes = Object.entries(dailyNotes)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .forEach(([date, note]) => {
        DailyNoteView.render({
          date: date, // 使用 key 作為日期
          notes: note.completedTasks,
          experience: note.experiences,
        });
      });
  }
};

const controlDeleteDailyNote = function (date) {
  const deleted = model.deleteDailyNote(date);

  if (deleted) controlRenderDailyNotes();
};

const controlEditDailyNote = function (date, textarea) {
  textarea.dataset.originalContent = textarea.value;
};

const controlSaveEdit = function (date, textarea) {
  const newExperience = textarea.value;
  const dateText = date.textContent;

  model.updateDailyNote(dateText, newExperience);

  controlRenderDailyNotes();
};

const init = function () {
  if (model.checkAndClearNotes) {
    updateViews();
  }
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
  DailyNoteView.addHandlerSave(controlDailyNoteView);
  DailyNoteView.addHandlerDelete(controlDeleteDailyNote);
  DailyNoteView.addHandleSaveEdit(controlSaveEdit);
  DailyNoteView.addHandlerEdit(controlEditDailyNote);
  DailyNoteView.addHandleCancel();
  controlDialog();
  controlRenderDailyNotes();
};

init();
