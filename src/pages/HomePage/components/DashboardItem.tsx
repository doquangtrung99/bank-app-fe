import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  navigateTo: string;
  caption: string;
  icon: JSX.Element;
  className?: string;
}

const DashboardItem = ({ navigateTo, caption, icon, className }: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      className={className}
      display={"flex"}
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => {
        if (caption !== 'Logout') {
          navigate(`/${navigateTo}`);
        } else {
          localStorage.removeItem('token');
          location.replace('/login');
        }
      }}
    >
      <Box width={40} textAlign={"center"}>
        {icon}
      </Box>
      {caption}
    </Box>
  );
};

export default DashboardItem;
