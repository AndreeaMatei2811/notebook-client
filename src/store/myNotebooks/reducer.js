const initialState = {
  allMyNotebooks: [],
};

export default function allMyNotebooksReducer(state = initialState, action) {
  switch (action.type) {
    case "allMyNotebooks": {
      return {
        state,
        allMyNotebooks: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
