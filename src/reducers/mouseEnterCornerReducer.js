const initialState = {
  cornerIndex: ""
};

const mouseEnterCorner = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_ENTER_CORNER":
      return { ...state, cornerIndex: action.payload };
    default:
      return state;
  }
};

export default mouseEnterCorner;
