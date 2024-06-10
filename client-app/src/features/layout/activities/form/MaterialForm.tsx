import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../../app/models/activity";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInPut from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import MyDateInput from "../../../../app/common/form/MyDateInput";
import { router } from "../../../../app/router/route";
import { materialOptions } from "../../../../app/common/options/materialOptions";

export default observer(function MaterialForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading,
        loadActivity, loadingInitial } = activityStore;
    
    const { id } = useParams();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: new Date(),
        city: '',
        venue: ''
    })
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    const validationChema = Yup.object({
        name: Yup.string().required('The material name is required'),
        description: Yup.string().required('The material Description is required'),
        date: Yup.string().required(),
        InputQuantity: Yup.string().required('Fill in the quantity or volumn correspond of material'),
        country: Yup.string().required('Manufacturing country is required'),
        factory: Yup.string().required('Manufacturing factory is required'),
        price: Yup.string().required(' Price is required'),
    })

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => router.navigate(`/activities/${newActivity.id}`)
            )
        } else {
            updateActivity(activity).then(()=>router.navigate(`/activities/${activity.id}`))
        }
    }

        if (loadingInitial) return <LoadingComponent content="loading activity .." />

        return (
            <Segment clearing>
                <Header content='Material Details' sub color="teal" />
                <Formik
                    validationSchema={validationChema}
                    enableReinitialize
                    initialValues={activity}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInPut name="name" placeholder="Name" />

                            <MyTextArea rows={3} placeholder='Description' name='description' />
                            <MySelectInput options={materialOptions}  value={materialOptions[0].value} name='category' />
                            <MyTextInPut  placeholder='' name='InputQuantity' />
                            <MyTextInPut  placeholder='Price' name='price' />
                            <MyDateInput
                                placeholderText="date"
                                name='date'
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            <Header content='Origin Details' sub color="teal" />
                            <MyTextInPut placeholder='Country' name='country' />
                            <MyTextInPut placeholder='Factory' name='factory' />
                            <MyDateInput
                                placeholderText="date"
                                name='date'
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMMM d, yyyy'
                            />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading}
                                floated="right"
                                positive
                                type="submit"
                                content='Submit' />
                            <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
                        </Form>
                    )}
                </Formik>
            </Segment>
        )
    })