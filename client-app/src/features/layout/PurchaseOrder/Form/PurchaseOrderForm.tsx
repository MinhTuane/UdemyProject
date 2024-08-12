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
import {v4 as uuid} from 'uuid';

export default observer(function PurchaseOrderForm() {

    const { purchaseOrderStore, productStore, countryStore,companyStore } = useStore();
    const { loadPurchaseOrder, createPurchaseOrder, updatePurchaseOrder,loading } = purchaseOrderStore;
    const { loadProducts, productOptions, products,getProduct,updateProduct } = productStore;
    const { loadCountryNames, countryNames, countryOptions } = countryStore;
    const {companyOptions,companies,loadCompanies} = companyStore;

    useEffect(() => {
        if (products.size <= 1) loadProducts();
        if(companies.size <1) loadCompanies();
    }, [productStore, products.size,companies,loadCompanies])

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
        quantity: 0,
        isDelivered : false
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


    async function handleFormSubmit (purchaseOrder: PurchaseOrder) {
        if (purchaseOrder.id.length === 0) {
            var newPurchaseOrder = {
                ...purchaseOrder,
                id : uuid(),
                isDelivered : false
            }
            createPurchaseOrder(newPurchaseOrder).then(()=> {
                hanldeUpdateProduct(newPurchaseOrder.productId,newPurchaseOrder.quantity,0);
                router.navigate('/productLineDashBoard')
        });
                
        } else {
            var purchaseOd =  await loadPurchaseOrder(purchaseOrder.id);
            updatePurchaseOrder(purchaseOrder).then(()=> {
                hanldeUpdateProduct(purchaseOrder.productId,purchaseOrder.quantity,purchaseOd!.quantity);
                router.navigate('/productLineDashBoard')
            }
            );
        }
        
    }

    function hanldeUpdateProduct(id : string,newQuantity:number, preNumber : number) {
        var product = getProduct(id);
        if(product) {
            product = {
                ...product,
                quantity: product.quantity + newQuantity - preNumber
            }
            updateProduct(product);
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