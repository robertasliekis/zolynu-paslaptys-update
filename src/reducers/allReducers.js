import { combineReducers } from "redux";
import changePageNumber from "./changePageNumberReducer";
import hoveredChanged from "./hoveredReducer";
import mouseEnterCorner from "./mouseEnterCornerReducer";
import mouseEnterPlant from "./mouseEnterPlantReducer";
import mouseEnterMovie from "./mouseEnterMovieReducer";
import resetChanged from "./ResetReducer";

export default combineReducers({
  changePageNumber: changePageNumber,
  hoveredChanged: hoveredChanged,
  mouseEnterCorner: mouseEnterCorner,
  mouseEnterPlant: mouseEnterPlant,
  mouseEnterMovie: mouseEnterMovie,
  resetChanged: resetChanged,
});
