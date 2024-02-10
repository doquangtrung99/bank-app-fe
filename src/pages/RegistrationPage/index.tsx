import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, FormControl, FormLabel, RadioGroup, Radio, TextField, FormControlLabel, Box, CircularProgress, Stack, Grid } from '@mui/material';
import styles from './register.module.scss'
import 'react-phone-number-input/style.css'
import PhoneInputField from './components/PhoneInputField';
import { parsePhoneNumber } from "react-phone-number-input";
import FormItem from '../../components/FormItem';
import { AuthService } from '../../services';
import useTrigger from '../../hooks/useTrigger';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../interfaces';
import { registerValidationSchema } from '../../validations/register.validation';
import { toast } from "react-toastify";

const Register = () => {

    const { loading, trigger } = useTrigger();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        password: '',
        identificationType: '',
        identificationNumber: '',
        email: '',
        mobileNumber: '',
        country: '',
        proofOfIdentity: '',
    };

    const handleSubmit = (values: RegisterUser) => {
        // Handle form submission here
        const countryCode = parsePhoneNumber(values.mobileNumber)?.countryCallingCode;
        const phoneNumber = parsePhoneNumber(values.mobileNumber)?.nationalNumber;
        const mpbilePhoneNumber = countryCode + ' ' + phoneNumber;

        const file = new FileReader();

        file.onload = async () => {
            try {
                const registerData = {
                    name: values.name,
                    password: values.password,
                    identificationType: values.identificationType,
                    identificationNumber: values.identificationNumber,
                    email: values.email,
                    mobileNumber: mpbilePhoneNumber,
                    country: values.country,
                    proofOfIdentity: file.result
                };
                await trigger(AuthService.register(registerData));
                toast.success('Register user sucessfully');
                navigate('/login');
            } catch (error: any) {
                console.log('error', error)
                if (error?.response?.data?.message) {
                    return toast.error(error.response.data.message);
                }
                toast.error('Fail to register user');
            }
        }

        file.readAsDataURL(values.proofOfIdentity as Blob);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
                <Grid container className={styles['registration-form']} justifyContent="center" lg={6} md={8} sm={10} xs={10}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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

                            <FormControl fullWidth margin="normal">
                                <FormLabel htmlFor="name">Identification Type:</FormLabel>
                                <Field name="identificationType">
                                    {({ field }: FieldProps) => {
                                        return (
                                            <RadioGroup {...field} >
                                                <FormControlLabel
                                                    value="citizenId"
                                                    control={<Radio />}
                                                    label="Citizen ID"
                                                />
                                                <FormControlLabel
                                                    value="passportNumber"
                                                    control={<Radio />}
                                                    label="Passport number"
                                                />
                                            </RadioGroup>
                                        );
                                    }}
                                </Field>
                            </FormControl>

                            <FormItem
                                as={TextField}
                                id="identificationNumber"
                                label='Citizen ID/Passport Number:'
                                type="text"
                                name="identificationNumber"
                                variant="outlined"
                            />

                            <FormItem
                                as={TextField}
                                id="name"
                                label='Name:'
                                type="text"
                                name="name"
                                variant="outlined"
                            />

                            <FormItem
                                id="mobileNumber"
                                label='Mobile Number:'
                                type="text"
                                name="mobileNumber"
                                component={PhoneInputField}
                            />

                            <FormItem
                                as={TextField}
                                id="country"
                                label='Country:'
                                type="text"
                                name="country"
                                variant="outlined"
                            />

                            <FormItem
                                id="proofOfIdentity"
                                label='Proof of Identity (png/jpg only):'
                                type="file"
                                name="proofOfIdentity"
                                accept=".png, .jpg"
                            />
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Button type="submit" variant="outlined" color="primary" >
                                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                                </Button>
                                <Box onClick={() => navigate('/login')} className={styles['already-have-account']} >
                                    Already have an Account
                                </Box>
                            </Stack>
                        </Form>
                    </Grid >
                </Grid>
            </Box>

        </Formik>
    );
};

export default Register;
