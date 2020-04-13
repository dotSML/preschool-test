import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { gameReducer } from "../components/game/reducers/gameReducer";
import { audioToTextGameReducer } from "../components/audioToTextGame/reducers/audioToTextGameReducer";
import { dragWordToPictureGameReducer } from "../components/dragWordToPictureGame/reducers/dragWordToPictureGameReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  audioToTextGame: audioToTextGameReducer,
  dragWordToPictureGame: dragWordToPictureGameReducer
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
