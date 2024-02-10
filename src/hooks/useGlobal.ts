import { useContext } from "react";
import { GlobalContext } from "../components/GlobalComponent";

const useGlobal = () => {
    const { user, setUser }: any = useContext(GlobalContext)

    return {
        user,
        setUser
    }
}

export default useGlobal
