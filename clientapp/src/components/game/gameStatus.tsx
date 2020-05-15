import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {SET_GAME_CURRENT_GAME} from "./actions/gameActions";
import {GameReducerStateType} from "./reducers/gameReducer";

const GameStatus:React.FC<{games: Array<{name: string, component: any}>, currentGame: any}> = ({games, currentGame}) => {
const game = useSelector<AppState, GameReducerStateType>(state => state.game);
const state = useSelector<AppState>(state => state);
const [bubbles, setBubbles] = useState<any[]>([]);
const dispatch = useDispatch();
useEffect(() => {
    const tempBubbles = [...bubbles];
    for(let i = 0; i < games.length; i++){
        tempBubbles.push({no: i, name: games[i].name})
    }
    setBubbles(tempBubbles);
},[]);




    return <div className="game-status">
        <div className="game-status-bubbles">
        {bubbles.map(bubble => {
            // @ts-ignore
            return <div key={bubble.no + bubble.name} style={{boxShadow: game.currentGame === bubble.no ? "none" : "0px 2px 5px 0px rgba(0,0,0,.2)", backgroundColor: state[bubble.name].gameCompleted ? "#208838" : "#FFCA94", transform: game.currentGame === bubble.no ? "scale(1.1)" : "scale(1)", transition: "all .2s ease"}} onClick={() => {dispatch(SET_GAME_CURRENT_GAME(bubble.no))}} className="game-status-bubble">{bubble.no + 1}
                {game.currentGame === bubble.no ? <div className="game-status-bubble-indicator"/> : ""}
            </div>
        })}
        </div>

    </div>
}

export default GameStatus;