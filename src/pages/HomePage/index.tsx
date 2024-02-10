import { Stack } from "@mui/material";
import DashboardRouter from "./components/DashboardRouter";
import styles from "./Home.module.scss";
import DashboardSize from "./components/DashboardSize";

const Home = () => {
    return (
        <Stack direction={"row"} className={styles["container"]}>
            <DashboardRouter />
            <DashboardSize />
        </Stack>
    );
};
export default Home;