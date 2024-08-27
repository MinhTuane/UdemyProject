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
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { UserFormValues } from "../../../app/models/user";
import {v4 as uuid} from 'uuid';
import { router } from "../../../app/router/route";
import LoadingComponent from "../../../app/layout/loadingComponent";

export default observer( function Register() {
    const { userStore ,adminStore} = useStore();
    const {register} = userStore;
    const {updateUser,loadUser,loadingInitial} = adminStore;

    const [user,setUser] = useState<UserFormValues>({
        id:'',
        role:'Staff',
        displayName:'',
        username:'',
        email:'',
        dateOfBirth:new Date(),
        password:'',
    });

    const {id} = useParams();

    useEffect(()=> {
        if(id) {
            loadUser(id).then((newUser)=> {
                console.log(newUser);
                
                setUser({
                    id:newUser!.id,
                    email:newUser!.email,
                    role:newUser?.role,
                    username : newUser?.username,
                    displayName : newUser?.displayName,
                    password :newUser!.password,
                    dateOfBirth : newUser?.dateOfBirth
                })
            })
        }
    },[id,loadUser])

    function handleFormSubmit(user: UserFormValues,setErrors : any) {
        if (user.id!.length === 0) {
            let newUser = {
                ...user,
                id: uuid()
            };
            register(newUser).then(() => router.navigate(`/login`).catch(error => setErrors(error))
            )
        } else {
            updateUser(user).then(() => router.navigate(`/profile/:username`)).catch(error => setErrors(error))
        }
    }

    if(loadingInitial) return <LoadingComponent content="loading"/>
    return (
        <Formik
        initialValues = {user}
        onSubmit ={(values,{setErrors}) => handleFormSubmit(values,setErrors)}
        enableReinitialize
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
                            <ValidationError errors={errors as unknown as string[]}/>}
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