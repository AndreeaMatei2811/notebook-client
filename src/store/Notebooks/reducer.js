const initialState = {
  allNotebooks: [],
  noteToAdd: {
    notebookId: null,
    title: "",
    content: "",
    imageUrl: "",
    typeOfNote: "textnote",
  },
  selectedNotebook: {},
  studentNotebooks: [],
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

    case "SELECT_NOTEBOOK":
      return {
        ...state,
        selectedNotebook: { ...action.payload },
      };

    case "STUDENT_NOTEBOOK":
      return {
        ...state,
        studentNotebooks: [...action.payload],
      };

    default: {
      return state;
    }
  }
}
