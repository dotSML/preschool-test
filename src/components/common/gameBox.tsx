import React, {ReactNode} from 'react';

const GameBox: React.FC<{children: ReactNode}> = ({children}) => {

    return <div className="game-box">
        {children}
    </div>
}

export default GameBox;