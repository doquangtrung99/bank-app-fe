
import { AppBar, Container, Box, Stack, Button } from '@mui/material'
import BodyLanding from './components/BodyLanding'
import { useNavigate } from "react-router-dom"
import styles from './landing.module.scss'
import FooterLanding from './components/FooterLanding '
const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Stack marginTop="50px" className={styles['container']}>
            <AppBar className={styles['navbar_wrapper']} >
                <Container className={styles['app_bar']}>
                    <Box color="black" >
                        QuantumSafe Bank <Box marginLeft={'10px'}><i className="fa-brands fa-font-awesome"></i></Box>
                    </Box>
                    <Stack direction="row" gap={3}>
                        <Button
                            onClick={() => navigate('/register')}
                            variant='outlined'
                            color='info'
                        >
                            Register
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            variant='outlined'
                            color='info'>
                            Sign In
                        </Button>
                    </Stack>
                </Container>
            </AppBar>
            <BodyLanding />
            <FooterLanding />
        </Stack >
    )
}
export default LandingPage
