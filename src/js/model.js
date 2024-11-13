export const state = {
  notes: [],
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

const saveNotes = function () {
  localStorage.setItem('notes', JSON.stringify(state.notes));
};

export const addNote = function (note) {
  if (typeof note === 'object') {
    state.notes.push({
      ...note,
      type: 'title',
      checked: false,
    });
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

const init = function () {
  const stored = localStorage.getItem('notes');
  if (stored) state.notes = JSON.parse(stored);
};

init();
