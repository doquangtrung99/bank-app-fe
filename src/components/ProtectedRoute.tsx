import { Navigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication"
import { Box, CircularProgress } from "@mui/material";
import { ProtectedRouteProps } from "../interfaces";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loading, isAuthenticated } = useAuthentication();
    if (loading && !isAuthenticated) {
        return <Box width={"100%"} height={"90vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
        </Box>
    }
    if (isAuthenticated) {
        return <Box>{children}</Box>;
    } else {
        return <Navigate to="/login" />;
    }

}

export default ProtectedRoute