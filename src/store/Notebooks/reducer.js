const initialState = {
  allNotebooks: [],
};

export default function allNotebooksReducer(state = initialState, action) {
  switch (action.type) {
    case "allNotebooksFetched": {
      return {
        ...state,
        allNotebooks: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
