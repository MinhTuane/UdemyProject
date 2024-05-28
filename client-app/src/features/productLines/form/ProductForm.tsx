import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Item, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInPut from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Product } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";
import MaterialListItem from "../../activities/dashboard/Material/MaterialListItem";
import { Material } from "../../../app/models/material";
import { observer } from 'mobx-react-lite'


export default observer(function ProductForm() {
    const [adding, setAdding] = useState(false);
    const { materialStore } = useStore();

    const [choseMaterial,setChoseMaterial] = useState<Material[]>([]);

    const { materialRegister, loadMaterials } = materialStore;
    const [isAdding, setIsAdding] = useState(false);

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        materials: null
    })
    const validateionSchema = Yup.object({
        name: Yup.string().required('The Product name is required'),
        description: Yup.string().required('The Product Description is required'),
    })

    useEffect(() => {
        loadMaterials()
    }, [])

    function handleFormSubmit(product: Product) {

    }

    function handleAddMaterial(material: Material) {
        setIsAdding(true);
        setChoseMaterial([...choseMaterial, material])
        materialRegister.delete(material.id);
        setIsAdding(false);
    }

    function handleRemoveMaterial(material:Material) {
        setIsAdding(true)
        materialRegister.set(material.id,material);
        setChoseMaterial(choseMaterial.filter(x => x.id != material.id));
        setIsAdding(false)
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
                            handleAddMaterial={() => handleAddMaterial}
                            handleRemoveMaterial={() => handleRemoveMaterial}
                        />
                        ))}
                        <Button
                            color="teal"
                            onClick={() => setAdding(!adding)}
                            content='Add Materials'
                        />
                        
                        {adding &&
                            Array.from(materialRegister.values()).map((material) => (
                                <MaterialListItem
                                    key={material.id}
                                    material={material}
                                    handleAddMaterial={() => handleAddMaterial}
                                    handleRemoveMaterial={() => handleRemoveMaterial}
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

