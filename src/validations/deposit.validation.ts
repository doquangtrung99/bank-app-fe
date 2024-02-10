import * as Yup from 'yup';

export const depositValidation = Yup.object().shape({
    amount: Yup.number().required('Amount is required')
})