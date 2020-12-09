const initialState = {
  all: [],
};

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case "allUsersFetched": {
      return {
        all: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
