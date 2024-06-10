import { Button, Form, FormField, Header, Label, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../../app/models/activity";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import { v4 as uuid } from 'uuid';
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInPut from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../../app/common/options/categoryOptions";
import MyDateInput from "../../../../app/common/form/MyDateInput";
import { router } from "../../../../app/router/route";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateActivity, loading,
        loadActivity, loadingInitial } = activityStore;
    const navigate = useNavigate();
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
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity Description is required'),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
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
                <Header content='Activity Details' sub color="teal" />
                <Formik
                    validationSchema={validationChema}
                    enableReinitialize
                    initialValues={activity}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInPut name="title" placeholder="Title" />

                            <MyTextArea rows={3} placeholder='Description' name='description' />
                            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                            <MyDateInput
                                placeholderText="date"
                                name='date'
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            <Header content='Location Details' sub color="teal" />
                            <MyTextInPut placeholder='City' name='city' />
                            <MyTextInPut placeholder='Venue' name='venue' />
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