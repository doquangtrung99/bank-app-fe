import * as Yup from 'yup';

export const withdrawValidation = Yup.object().shape({
    amount: Yup.number().required('Amount is required')
})