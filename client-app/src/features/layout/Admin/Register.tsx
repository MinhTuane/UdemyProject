import {ErrorMessage, Form,Formik} from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../../errors/ValidationError";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { roleOptions } from "../../../app/common/options/roleOptions";

export default observer( function Register() {
    const { userStore } = useStore();

    return (
        <Formik
        initialValues = {{role:'Staff',displayName:'',username:'',email:'',dateOfBirth:new Date(),password:'',error:null}}
        onSubmit ={(values,{setErrors}) => 
            userStore.register(values).catch(error =>setErrors({error})
        )}
        validationSchema={Yup.object({
            displayName : Yup.string().required(),
            username : Yup.string().required(),
            email : Yup.string().required(),
            dateOfBirth:Yup.string().required(),
            role:Yup.string().required(),
        
            password : Yup.string().required(),
            
        })}
        >
            {({handleSubmit,isSubmitting,errors,isValid,dirty}) => (
                <Form className="ui form error"  onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign up' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="Display Name" name="displayName"/>
                    <MyTextInput placeholder="Username" name="username"/>
                    <MyTextInput placeholder="Email" name="email" type="email"/>
                    <MySelectInput placeholder="Role" name="role" options={roleOptions}/>
                    <MyDateInput 
                        placeholderText="Day Of Birth"
                        name='dayOfBirth'
                        showTimeSelect
                        dateFormat='yyyy-MM-dd'
                    />                    
                    <MyTextInput type="password" placeholder="Password" name="password"/>
                    <ErrorMessage
                        name="error" 
                        render={()=> 
                            <ValidationError errors={errors.error as unknown as string[]}/>}
                            />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content='Register' 
                        type='submit' fluid
                    />
                </Form>
            )}
        </Formik>
    )
})