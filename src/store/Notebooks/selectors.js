export const selectAllNotebooks = (state) => {
  return state.notebooks.allNotebooks;
};

export const selectNewNote = (state) => {
  return state.notebooks.noteToAdd;
};

export const selectNotebook = (state) => {
  return state.notebooks.selectedNotebook;
};

export const selectStudentNotebooks = (state) => {
  return state.notebooks.studentNotebooks;
};
