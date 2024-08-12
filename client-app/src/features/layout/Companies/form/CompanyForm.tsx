import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInPut from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { router } from "../../../../app/router/route";
import { Company } from "../../../../app/models/company";

export default observer(function CompanyFrom() {

    const {companyStore } = useStore();
    const {loadingInitial,createCompany,loading } = companyStore;
    
    const { id } = useParams();

    const [company, setCompany] = useState<Company>({
        id: '',
        name: '',
        address: '',
        taxCode: ''
    })

    const validationChema = Yup.object({
        name: Yup.string().required('The company name is required'),
        address: Yup.string().required('The company address is required'),
        taxCode: Yup.string().required('The comapany taxcode is required'),
       
    })

    function handleFormSubmit(company: Company) {
        
            let newCompnay = {
                ...company,
                id: uuid()
            };
            createCompany(newCompnay).then(() => router.navigate(`/materials/${newCompnay.id}`))
           
    }

        if (loadingInitial) return <LoadingComponent content="loading  .." />

        return (
            <Segment clearing>
                <Header content='Company Details' sub color="teal" />
                <Formik
                    validationSchema={validationChema}
                    enableReinitialize
                    initialValues={company}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInPut name="name" placeholder="Name" />

                            <MyTextArea rows={3} placeholder='Address' name='address' />
                            <MyTextInPut  placeholder='Tax Code' name='taxCode' />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading}
                                floated="right"
                                positive
                                type="submit"
                                content='Submit' />
                            <Button as={Link} to='/productLineDashBoard' floated="right" type="button" content='Cancel' />
                        </Form>
                    )}
                </Formik>
            </Segment>
        )
    })