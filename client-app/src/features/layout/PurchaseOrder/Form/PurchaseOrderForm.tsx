import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { PurchaseOrder } from "../../../../app/models/purchaseOrder";
import { useParams } from "react-router";
import { useStore } from "../../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../../app/common/form/MySelectInput";
import MyTextInPut from "../../../../app/common/form/MyTextInput";
import MyDateInput from "../../../../app/common/form/MyDateInput";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { router } from "../../../../app/router/route";

export default observer(function PurchaseOrderForm() {

    const { purchaseOrderStore, productStore, countryStore,companyStore } = useStore();
    const { loadPurchaseOrder, createPurchaseOrder, updatePurchaseOrder,loading } = purchaseOrderStore;
    const { loadProducts, productOptions, products } = productStore;
    const { loadCountryNames, countryNames, countryOptions } = countryStore;
    const {companyOptions} = companyStore;

    useEffect(() => {
        if (products.size <= 1) loadProducts();
    }, [productStore, products.size])

    useEffect(() => {
        if (countryNames.length <= 1) loadCountryNames()
        console.log(countryNames);

    }, [countryStore, countryNames.length])

    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>({
        id: "",
        contractDate: new Date(),
        companyId: "",
        exportCountry: 'Vietnam',
        exportDate: null,
        productId: "",
        quantity: 0
    })

    const validationChema = Yup.object({
        contractDate: Yup.string().required(),
        companyId: Yup.string().required(),
        exportCountry: Yup.string().required(),
        exportDate: Yup.string().required(),
        quantity: Yup.number().moreThan(0),
        productId: Yup.string().required(),
    })

    const { id } = useParams();

    useEffect(() => {
        if (id) loadPurchaseOrder(id).then(purchase => setPurchaseOrder(purchase!))
    })

    function handleFormSubmit(purchaseOrder: PurchaseOrder) {
        

        if (purchaseOrder.id.length === 0) {
            createPurchaseOrder(purchaseOrder).then(()=> router.navigate('/productLineDashBoard'));
        } else {
            updatePurchaseOrder(purchaseOrder).then(()=> router.navigate('/productLineDashBoard'));
        }
        
    }

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationChema}
                enableReinitialize
                initialValues={purchaseOrder}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Header content='Product to produce' sub color="teal" />
                        <MySelectInput options={productOptions} placeholder="Product" name="productId" />
                        <Header content='Company' sub color="teal" />
                        <MySelectInput options={companyOptions} placeholder="Company" name="companyId" />
                        <Header content='Quantity of the Order' sub color="teal" />
                        <MyTextInPut placeholder="Quantity" name="quantity" type="number" />
                        <Header content='Date sign Contract' sub color="teal" />
                        <MyDateInput
                            placeholderText="Contract Date"
                            name='contractDate'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Country Export' sub color="teal" />
                        <MySelectInput options={countryOptions} name="exportCountry" />
                        <Header content='Export Date' sub color="teal" />
                        <MyDateInput
                            placeholderText="Export Date"
                            name='exportDate'
                        
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
                        <Button as={Link} to='/productLineDashBoard' floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})