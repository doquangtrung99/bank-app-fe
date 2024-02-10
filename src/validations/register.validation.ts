
import * as Yup from 'yup';
import { isValidPhoneNumber } from "react-phone-number-input";


export const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    identificationNumber: Yup.string().required('Identification number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    mobileNumber: Yup.string().required('Mobile number is required').test('mobileNumber', 'Invalid phone number', function (mobilePhone) {
        if (!isValidPhoneNumber(mobilePhone)) {
            return false
        }
        return true
    }),
    country: Yup.string().required('Country is required'),
    proofOfIdentity: Yup.mixed().required('Proof of identity is required'),
});