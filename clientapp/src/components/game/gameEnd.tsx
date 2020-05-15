import React, {useEffect, useState} from 'react';
import {resultsTemp} from "./rawResultsTemp";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";

const GameEnd = () => {
    // const results = useSelector<AppState, any>(state => state.game.results);
    const [resultsState, setResultsState] = useState<any[]>([]);
    const game = useSelector<AppState, any>(state => state.game);
    useEffect(() => {
        let tempArr: any[] = [];
        Object.keys(game.results).forEach((key) => {
            // @ts-ignore
            tempArr.push(game.results[key]);
        });
        setResultsState(tempArr);
    }, [])


    return <div className="game-end-wrapper">
        <div className="game-end-heading">Test on sooritatud!</div>
        <h2>MÄNGIJA - {game.player}</h2>
        <h3>ÕPETAJA - {game.teacher}</h3>
        <div className="game-end-dev-results">
            {resultsState.length ? resultsState.map((game, idx) => {
               return  <div className="game-end-dev-game-results">{idx + 1}. Mäng {game.map((result: any, resultIdx: number) => {
                   if(!Array.isArray(result) ){
                       return <div className="game-end-dev-game-result">{resultIdx + 1}<div>ÕIGE VASTUS - {result.expected || ""}</div>
                           <div>LAPSE VASTUS - {result.answer || ""}</div>
                           <div>KAS ÕIGE? - {result.correct ? "JAH" : "EI"}</div></div>
                   }else {
                       return  <div className="game-end-dev-game-result">
                           {resultIdx + 1 + ". ÜLESANNE"}
                           {result.map((subResult, idx) => {
                               return <div className="game-end-dev-game-result"><div>{idx + 1}. KÜSIMUS <div>LAPSE VASTUS - {subResult.answer}</div></div>
                               <div>ÕIGE VASTUS - {subResult.expected}</div>
                                   <div>KAS ÕIGE - {subResult.correct ? "JAH" : "EI"}</div>
                               </div>
                           })}
                       </div>
                   }

                    })}
                </div>
            }) : ""}
        </div>
    </div>
}

export default GameEnd;