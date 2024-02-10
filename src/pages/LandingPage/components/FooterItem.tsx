import { Box, Stack } from "@mui/material"
import { IFooterItem } from "../../../interfaces"
const FooterItem = ({ icon, title, content }: IFooterItem) => {

    return (
        <Stack
            color={"white"}
            margin={"50px 0"}
            padding={"15px"}
            borderRadius={"10px"}
        >
            <Box>{icon}</Box>
            <Box margin={"20px 0"}>{title}</Box>
            <Box>{content}</Box>
        </Stack>
    )
}

export default FooterItem