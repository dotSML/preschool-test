import React, {ReactNode} from 'react';

const Layout: React.FC<{children: ReactNode}> = ({children}) => {
    return <div className="game-layout">
        {children}
    </div>
};

export default Layout;