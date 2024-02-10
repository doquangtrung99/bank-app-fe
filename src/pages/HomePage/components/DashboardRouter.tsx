import { Box, Container, Stack } from "@mui/material";
import DashboardItem from "./DashboardItem";
import styles from "../Home.module.scss";

const DashboardRouter = () => {
  return (
    <Stack direction={"column"} className={styles["dashboard_router"]}>
      <Box className={styles["dashboard_header"]}>BankingApp</Box>
      <Container className={styles["dashboard_item_container"]}>
        <DashboardItem
          caption={"Account"}
          navigateTo={"accounts"}
          icon={<i className="fa-solid fa-receipt" />}
        />
        <DashboardItem
          caption={"Transaction"}
          navigateTo={"transaction"}
          icon={<i className="fa-solid fa-tent-arrow-left-right" />}
        />
        <DashboardItem
          caption={"Logout"}
          navigateTo={"login"}
          icon={<i className="fa-solid fa-arrow-right-from-bracket" />}
          className={styles["logout_button"]}
        />
      </Container>
    </Stack>
  );
};

export default DashboardRouter;
