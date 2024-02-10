
import { Box, Button, CircularProgress, Stack, TextField, Grid } from "@mui/material"
import { AuthService } from "../../services"
import useTrigger from "../../hooks/useTrigger"
import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FormItem from "../../components/FormItem";
import styles from './login.module.scss'
import { Form, Formik } from "formik";
import useAuthentication from "../../hooks/useAuthentication";
import useGlobal from "../../hooks/useGlobal";
import { loginValidationSchema } from "../../validations/login.validation";
import { toast } from "react-toastify";

const Login = () => {
    const { loading, trigger } = useTrigger();
    const { loading: authenLoading, isAuthenticated } = useAuthentication();
    const { setUser } = useGlobal();

    const navigate = useNavigate();
    const controllerRef = useRef<AbortController | null>(null);
    useEffect(() => {
        controllerRef.current = new AbortController();
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        }
    }, [isAuthenticated])

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: { email: string; password: string }) => {
        if (controllerRef.current) {
            try {
                const signal = controllerRef.current.signal;
                const res = await trigger(AuthService.login(values, signal));
                if (res) {
                    setUser(res);
                    navigate('/home');
                }
            } catch (error) {
                toast.error(`Password or email doesn't correct`);
            }
        }
    };
    if (authenLoading && !isAuthenticated) {
        return <Box width={"100%"} height={"90vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
        </Box>
    }

    if (isAuthenticated) {
        return <Box width={"100%"} height={"90vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Navigate to="/home" />
        </Box>;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
                <Grid container className={styles['login-form']} justifyContent="center" lg={6} md={6} sm={10} xs={10}>
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Form >
                            <FormItem
                                as={TextField}
                                id="email"
                                label='Email:'
                                type="text"
                                name="email"
                                variant="outlined"
                            />

                            <FormItem
                                as={TextField}
                                id="password"
                                label='Password:'
                                type="password"
                                name="password"
                                variant="outlined"
                            />

                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Button type="submit" variant="outlined" color="primary" >
                                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                                </Button>
                                <Box onClick={() => navigate('/register')} className={styles['register_account']} >
                                    Register account now
                                </Box>
                            </Stack>
                        </Form>
                    </Grid>
                </Grid>
            </Box>
        </Formik>
    )
}

export default Login;
