import { FieldProps } from "formik";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
const PhoneInputField = ({
    field: { name, value },
    form: { setFieldValue }
}: FieldProps) => {

    return (
        <PhoneInput
            placeholder="Enter phone number"
            name={name}
            value={formatPhoneNumberIntl(value)}
            onChange={(value: any) => setFieldValue('mobileNumber', value)}
        />
    );
};

export default PhoneInputField