import { Button, Item, Segment } from "semantic-ui-react";
import { Material } from "../../../../../app/models/material";
import { useState } from "react";
import { Input } from "reactstrap";

interface Props {
    material: Material,
    handleAddMaterial: (material: Material) => void,
    handleRemoveMaterial: (material : Material) => void,
    contentButton : string,
    colorButton : boolean,
}

export default function MaterialListItem({ material, handleAddMaterial, handleRemoveMaterial,contentButton ,colorButton}: Props) {
    const [isAdded, setIsAdded] = useState(false);
    const [quantity,setQuantity] = useState(null);
    const [weight,setWeight] =useState(null);

    const handleAdd = () => {
        handleAddMaterial(material)
        setIsAdded(!isAdded)
    }
    const handleRemove=()=> {
        handleRemoveMaterial(material)
        setIsAdded(!isAdded)
    }

    return (
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Header><b>Name : </b>{material.name}</Item.Header>
                    <Item.Content><b>Description : </b>{material.description}</Item.Content>
                    <Item.Content><b>Country : </b>{material.country} </Item.Content>
                    <Item.Content><b>Factory :</b>{material.factory}</Item.Content>
                    {material.quantity != null && (
                        <>
                            <Item.Content><b>Quantity : </b>{material.quantity}</Item.Content>
                            <Input name="quantity" placeholder="Quantity" style={{width:100}} type="number" min={1} value={material.quantity}/>
                        </>
                    )               
                    }
                    {material.weight != null && (
                        <>
                        <Item.Content><b>Weight : </b>{material.weight}</Item.Content>
                        <Input name="weight" placeholder="Weight" style={{width:100}} type="number" min={0} step={0.01} value={material.weight}/>
                        </>
                    )}

                    <Button
                        floated="right"
                        color={colorButton ? "green" : "red"}
                        onClick={colorButton ? handleAdd : handleRemove}
                        content={contentButton}
                    />

                </Item>
            </Item.Group>
        </Segment>
    )
}