import * as Yup from 'yup';

export const transferValidation = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    receiver: Yup.number().required('Receiver is required')
})