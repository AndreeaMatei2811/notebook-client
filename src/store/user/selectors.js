export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user;
export const selectMyNotebooks = (state) => state.user.notebooks;

export const selectMyNotebooksIds = (state) => {
  const notebookIdArray = state.user.notebooks.map((notebook) => notebook.id);
  return notebookIdArray;
};
