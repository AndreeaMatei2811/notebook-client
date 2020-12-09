export const selectAllNotebooks = (state) => {
  return state.notebooks.allNotebooks;
};

export const selectNewNote = (state) => {
  return state.notebooks.noteToAdd;
};
