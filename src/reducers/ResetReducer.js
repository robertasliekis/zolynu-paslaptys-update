const initialState = {
  reset: 0,
};

const resetChanged = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_CHANGED":
      console.log("reset " + state.reset);
      return { ...state, reset: state.reset + 1 };
    default:
      return state;
  }
};

export default resetChanged;
