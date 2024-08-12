import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInPut from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../app/stores/store";
import MaterialListItem from "../../activities/dashboard/Material/MaterialListItem";
import { Material } from "../../../../app/models/material";
import { observer } from 'mobx-react-lite'
import {v4 as uuid} from 'uuid';
import { router } from "../../../../app/router/route";


export default observer(function ProductForm() {
    const [adding, setAdding] = useState(false);
    const { materialStore ,productStore} = useStore();

    const [choseMaterial,setChoseMaterial] = useState<Material[]>([]);

    const { materials, loadMaterials } = materialStore;

    const {createProduct,updateProduct} = productStore;

    const [product, setProduct] = useState<Product>({
        id:"",
        name: '',
        description: '',
        choseMaterials: null,
        quantity:0,
        isProducing : false
    })
    const validateionSchema = Yup.object({
        name: Yup.string().required('The Product name is required'),
        description: Yup.string().required('The Product Description is required'),
    })

    useEffect(() => {
        loadMaterials()
    }, [])

    function handleFormSubmit(product: Product) {
        product = {
            ...product,
            choseMaterials : choseMaterial
        }
        if(product.id.length ==0) {
            let newProduct ={
                ...product,
                id : uuid(),
                quantity :0,
                isProducing : false
            };
            createProduct(newProduct).then(()=> router.navigate(`/products/${newProduct.id}`))
        } else {
            updateProduct(product).then(()=> router.navigate(`/products/${product.id}`))
        }
    }

    function handleAddMaterial(material: Material) {
        setChoseMaterial([...choseMaterial, material])
        materials.delete(material.id);
    }

    function handleRemoveMaterial(material:Material) {
        materials.set(material.id,material);
        setChoseMaterial(choseMaterial.filter(x => x.id != material.id));
    }

    return (

        <Segment clearing>
            <Header content='Product detail' sub color="teal" />
            <Formik
                validationSchema={validateionSchema}
                enableReinitialize
                initialValues={product}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInPut name="name" placeholder="Name" />
                        <MyTextArea rows={3} name="description" placeholder="Description" />
                        {choseMaterial.map(material => (
                            <MaterialListItem
                            key={material.id}
                            material={material}
                            handleAddMaterial={handleAddMaterial}
                            handleRemoveMaterial={handleRemoveMaterial}
                            contentButton="Delete"
                            colorButton= {false}
                        />
                        ))}
                        <Button
                            color="teal"
                            type="button"
                            onClick={() => setAdding(!adding)}
                            content='Add Materials'
                        />
                        
                        {adding &&
                            Array.from(materials.values()).map((material) => (
                                <MaterialListItem
                                    key={material.id}
                                    material={material}
                                    handleAddMaterial={handleAddMaterial}
                                    handleRemoveMaterial={() => handleRemoveMaterial}
                                    contentButton="Add"
                                    colorButton={true}
                                />
                            ))
                        }
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            floated="right"
                            positive
                            type="submit"
                            content='Submit'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>


    )
})

