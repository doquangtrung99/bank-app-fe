import { FormControl, FormLabel } from "@mui/material"
import { ErrorMessage, Field, useField } from "formik"
import { IFormItem } from "../interfaces";

const FormItem = ({ as, label, id, name, type, ...props }: IFormItem) => {

    const [field] = useField('proofOfIdentity');

    return (
        <FormControl fullWidth margin="normal">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {
                type && type === 'file' ?
                    <input
                        type="file"
                        name={name}
                        onChange={(e: any) => {
                            field.onChange({ target: { name, value: e.target.files[0] } })
                        }}
                        {...[props]}
                    />
                    : <Field
                        as={as}
                        id={id}
                        type={type}
                        name={name}
                        {...props}
                    />
            }
            <ErrorMessage name={name}>
                {msg => <div style={{ color: 'red' }}>{msg}</div>}
            </ErrorMessage>
        </FormControl>
    )
}

export default FormItem