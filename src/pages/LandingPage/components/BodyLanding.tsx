import { Box, Button, Stack, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from '../landing.module.scss'
const BodyLanding = () => {

    const navigate = useNavigate();
    return <Stack className={styles['body_container']}>
        <Grid container className={styles['first_section']} direction="row">
            <Grid item lg={4} md={12} sm={12} xs={12} justifyContent="center" alignItems="center" display="flex" className={styles['left_section']}>
                <Stack maxWidth={'500px'} justifyContent={"center"}>
                    <Box fontSize={"45px"}>A New Way Of Finance</Box>
                    <Box fontSize={"25px"} padding="30px 0">
                        Every dollar will counted, every cent will saved. We will improve Your financial without cut You happniess.
                    </Box>
                    <Button
                        onClick={() => navigate('/register')}
                        variant="contained"
                        color="info"
                    >
                        Register
                    </Button>
                </Stack>
            </Grid>
            <Grid lg={8} item className={styles['right_section']} minHeight={'700px'} >
                <Box className={styles['image']}></Box>
            </Grid>
        </Grid>
        <Stack className={styles['second_section']} padding="20px 50px">
            <Box color={"white"} fontSize={"45px"} textAlign={"center"} margin={"50px 0"}>
                QuantumSafe Bank Website
            </Box>
            <Grid container spacing={5}>
                <Grid item md={6} sm={12}>
                    <Box className={styles['image_1']}></Box>
                </Grid>
                <Grid item md={6} sm={12} display={"flex"} alignItems={"center"}>
                    <Box color={"white"} fontSize={"35px"} padding={"0 20px"}>
                        Come join us for better finance Whether you are looking to budget wisely.
                        invest confidently, or plan for retirement.
                    </Box>
                </Grid>
                <Grid item md={6} sm={12} display={"flex"} alignItems={"center"} >
                    <Box color={"white"} fontSize={"35px"} padding={"0 20px"}>
                        This is Digital Banking Website Design. This is a simple and
                        functional website design for Digital Banking.It gives the banking customers
                        an easy access to their account details, transactions,
                        account balances and other banking services.
                    </Box>
                </Grid>
                <Grid item md={6} sm={12} >
                    <Box className={styles['image_2']}></Box>
                </Grid>
            </Grid>
        </Stack>
    </Stack>
}
export default BodyLanding