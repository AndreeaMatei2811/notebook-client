const initialState = {
  allSubjects: [],
};

export default function allSubjectsReducer(state = initialState, action) {
  switch (action.type) {
    case "allSubjectsFetched": {
      return {
        state,
        allSubjects: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
