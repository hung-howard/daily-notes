export const state = {
  notes: [],
  dailyNotes: {},
};

console.log(state);

const createNote = function (text, type = 'item') {
  return {
    id: Date.now(),
    text: text,
    isEditing: false,
    type: type,
    checked: false,
  };
};

//每日
export const createDailyNote = function () {
  return {
    id: Date.now(),
    experiences: '',
    completedTasks: [],
  };
};

export const saveDailyNotes = function () {
  localStorage.setItem('dailyNotes', JSON.stringify(state.dailyNotes));
};

export const addDailyNote = function (date, experiences, completedTasks) {
  const dailyNote = createDailyNote();
  dailyNote.experiences = experiences;
  dailyNote.completedTasks = completedTasks;

  state.dailyNotes[date] = dailyNote;

  saveDailyNotes();

  return dailyNote;
};

export const getDailyNote = function (date) {
  return state.dailyNotes[date];
};

export const updateDailyNote = function (date, experiences) {
  if (state.dailyNotes[date]) {
    state.dailyNotes[date].experiences = experiences;

    saveDailyNotes();
  }
};

export const deleteDailyNote = function (date) {
  if (state.dailyNotes[date]) {
    delete state.dailyNotes[date];
    saveDailyNotes();
    return true;
  }
  return false;
};

//事項
const saveNotes = function () {
  localStorage.setItem('notes', JSON.stringify(state.notes));
};

export const addNote = function (note) {
  if (typeof note === 'object') {
    state.notes.push(note);
  } else {
    const newNote = createNote(note, 'item');
    state.notes.push(newNote);
  }
  saveNotes();
};

export const deleteNote = function (id) {
  const index = state.notes.findIndex((note) => note.id === id);
  if (index > -1) {
    state.notes.splice(index, 1);
    saveNotes();
  }
};

export const editNote = function (id, newText) {
  const note = state.notes.find((note) => note.id === id);
  if (note) {
    note.text = newText;
    note.isEditing = false;
    saveNotes();
  }
};

export const reorderNotes = function (fromIndex, toIndex) {
  const [movedItem] = state.notes.splice(fromIndex, 1);
  state.notes.splice(toIndex, 0, movedItem);
  saveNotes();
};

export const toggleCheck = function (id) {
  const note = state.notes.find((note) => note.id === id);
  if (note) {
    note.checked = !note.checked;
    saveNotes();
  }
};

//每日檢查
export const clearAllNotes = function () {
  state.notes = [];
  saveNotes();
};

export const checkAndClearNotes = function () {
  const lastAccessDate = localStorage.getItem('lastAccessDate');
  const currentDate = new Date().toLocaleString();

  if (lastAccessDate !== currentDate) {
    clearAllNotes();
    localStorage.setItem('lastAccessDate', currentDate);
    return true;
  }
};

const init = function () {
  const storedNotes = localStorage.getItem('notes');
  const storedDailyNotes = localStorage.getItem('dailyNotes');

  if (storedNotes) state.notes = JSON.parse(storedNotes);
  if (storedDailyNotes) {
    state.dailyNotes = JSON.parse(storedDailyNotes);
  } else {
    state.dailyNotes = {};
  }
};

init();
