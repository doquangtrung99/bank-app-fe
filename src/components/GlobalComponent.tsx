import { createContext, useState } from "react";

export const GlobalContext = createContext({});

const GlobalComponent = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState({});

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalComponent
