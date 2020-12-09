const initialState = {
  allNotebooks: [],
  noteToAdd: {
    notebookId: null,
    title: "",
    content: "",
    imageUrl: "",
    typeOfNote: "textnote",
  },
};

export default function allNotebooksReducer(state = initialState, action) {
  switch (action.type) {
    case "allNotebooksFetched":
      return {
        ...state,
        allNotebooks: [...action.payload],
      };
    case "ADD_A_NOTE":
      return {
        ...state,
        noteToAdd: {
          ...state.noteToAdd,
          notebookId: action.payload.notebookId,
          title: action.payload.title,
          content: action.payload.content,
        },
      };

    default: {
      return state;
    }
  }
}
