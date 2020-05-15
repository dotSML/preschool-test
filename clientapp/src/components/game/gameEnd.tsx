import React, {useEffect, useState} from 'react';
import {resultsTemp} from "./rawResultsTemp";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";

const GameEnd = () => {
    // const results = useSelector<AppState, any>(state => state.game.results);
    const [resultsState, setResultsState] = useState<any[]>([]);

    useEffect(() => {
        let tempArr: any[] = [];

        Object.keys(resultsTemp.results).forEach((key) => {
            // @ts-ignore
            tempArr.push(resultsTemp.results[key]);
        });

        setResultsState(tempArr);




    }, [])


    return <div className="game-end-wrapper">
        <div className="game-end-heading">Test on sooritatud!</div>
        <div className="game-end-dev-results">

        </div>
    </div>
}

export default GameEnd;