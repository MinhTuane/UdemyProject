import { useField } from "formik"
import { Form, Label, Select } from "semantic-ui-react";



interface Props {
    placeholder?:string;
    value?:any;
    name:string;
    label?:string;
    options: any;
}

export default function MySelectInput(props:Props) {
    const [field,meta,helpers] = useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
             <Select
                clearable
                options={props.options}
                value={field.value || props.value || null}
                onChange={(_,data) => {helpers.setValue(data.value); }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
             />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}