import {
  Container,
} from "@mui/material";
import { red } from "@mui/material/colors";
import styles from "../Home.module.scss";

const DashboardSize = () => {
  return (
    <Container
      sx={{ flex: 1, bgcolor: red[100] }}
      className={styles["dashboard_side"]}
    >
    </Container>
  );
};

export default DashboardSize;
