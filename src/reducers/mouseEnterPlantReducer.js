const initialState = {
  plantIndex: 28,
  plantOpen: false
};

const mouseEnterPlant = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_ENTER_PLANT":
      return { ...state, plantIndex: action.payload.plantIndex, plantOpen: action.payload.open };
    default:
      return state;
  }
};

export default mouseEnterPlant;
