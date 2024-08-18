import { useField } from "formik";
import { Checkbox, Form, Label } from "semantic-ui-react";

interface Props {
    name: string;
    label?: string;
    options: { text: string; value: string }[];
}

export default function MyCheckInput(props: Props) {
    const [field, meta, helpers] = useField({ name: props.name });

    const handleChange = (value: string) => {
        if (field.value.includes(value)) {
            helpers.setValue(field.value.filter((v: string) => v !== value));
        } else {
            helpers.setValue([...field.value, value]);
        }
    };

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {props.label && <label>{props.label}</label>}
            {props.options.map(option => (
                <Checkbox
                    key={option.value}
                    label={option.text}
                    checked={field.value.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                />
            ))}
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}
