import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik } from "formik";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { ProductionRecord } from "../../../app/models/productionRecord";
import { productStatusOptions } from "../../../app/common/options/productStatusOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { toast } from "react-toastify";

export default observer(function MaterialForm() {

    const {materialStore,productionRecordStore,productStore } = useStore();
    const {
        loadingInitial } = materialStore;
    
    const {createProductionRecord,loading} = productionRecordStore;
    const {producingProductOptions,products,loadProducts} = productStore;
    const [productionRecord,setProductionRecord] = useState<ProductionRecord>({
            id:'',
            productId : '',
            productStatus:'Good', 
            productionDateTime: new Date()        
    });

    useEffect(() => {
        if(products.size <1) loadProducts();
    }, [products,loadProducts])

    function handleFormSubmit(newProducitonRecord : ProductionRecord) {
            newProducitonRecord = {
                ...newProducitonRecord,
                id: uuid()
            }
            createProductionRecord(newProducitonRecord).then(()=> toast.success('Add Product Successful'));
    }

    const validationChema = Yup.object({
        productId: Yup.string().required('The Product is required'),
        productStatus: Yup.string().required('The Status is required'),
        productionDateTime: Yup.string().required(),
    })
        if (loadingInitial) return <LoadingComponent content="loading .." />

        return (
            <Segment clearing>
                <Header content='Material Details' sub color="teal" />
                <Formik
                    validationSchema={validationChema}
                    enableReinitialize
                    initialValues={productionRecord}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <MySelectInput options={producingProductOptions}  placeholder="Product" name="productId" />
                            <MySelectInput 
                                options={productStatusOptions} 
                                value = {productStatusOptions[0].value} 
                                placeholder="Product Status"  
                                name="productStatus"
                            />
                            <MyDateInput
                                placeholderText="production DateTime"
                                name='productionDateTime'
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            <Button
                                disabled={!isValid}
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