import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { gameReducer } from "../components/game/reducers/gameReducer";
import { audioToTextGameReducer } from "../components/audioToTextGame/reducers/audioToTextGameReducer";
import { dragWordToPictureGameReducer } from "../components/dragWordToPictureGame/reducers/dragWordToPictureGameReducer";
import { imageSequenceGameReducer } from "../components/imageSequenceGame/reducers/imageSequenceGameReducer";
import { monthsGameReducer } from "../components/monthsGame/reducers/monthsGameReducer";
import { weekdaysGameReducer } from "../components/weekdaysGame/reducers/weekdaysGameReducer";
import { numberSequencingGameReducer } from "../components/numberSequencingGame/reducers/numberSequencingGameReducer";
import { calculationGameReducer } from "../components/calculationGame/reducers/calculationGameReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  audioToTextGame: audioToTextGameReducer,
  dragWordToPictureGame: dragWordToPictureGameReducer,
  imageSequenceGame: imageSequenceGameReducer,
  monthsGame: monthsGameReducer,
  weekdaysGame: weekdaysGameReducer,
  numberSequencingGame: numberSequencingGameReducer,
  calculationGame: calculationGameReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares: any[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
