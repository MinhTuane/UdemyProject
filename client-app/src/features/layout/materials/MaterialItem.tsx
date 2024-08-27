import { Button, Item, Segment } from "semantic-ui-react";
import { Input } from "reactstrap";
import { Material } from "../../../app/models/material";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";

interface Props {
    material: Material,
}

export default function MaterialItem({ material}: Props) {
    const{materialStore: {deleteMaterial}} = useStore();
    const [target, setTarget] = useState('');
    function handleDeleteEvent(Id : string,e : SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteMaterial(Id);
    }
    const getBirthYear = (dateOfBirth:Date) => {
        if (!dateOfBirth) return 'N/A';
    
        const date = new Date(dateOfBirth);
    
        return date.toLocaleDateString();
      };
    return (
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Header><b>Name : </b>{material.name}</Item.Header>
                    <Item.Content><b>Description : </b>{material.description}</Item.Content>
                    <Item.Content><b>Country : </b>{material.country} </Item.Content>
                    <Item.Content><b>Factory :</b>{material.factory}</Item.Content>
                    <Item.Content><b>Price :</b>{material.price}</Item.Content>
                    <Item.Content><b>Date :</b>{getBirthYear(material.date!)}</Item.Content>
                    {material.quantity && (
                        <Item.Content><b>Quantity :</b>{material.quantity}</Item.Content>
                    )}
                    {material.weight && (
                        <Item.Content><b>Quantity :</b>{material.weight}</Item.Content>
                    )}
                    
                    <Button
                    as={Link}
                    to={`/manageMaterial/${material.id}`}
                    color="teal"
                    floated='right'
                    content='Edit'
                />
                <Button
                    name={material.id}
                    disabled={target == material.id}
                    onClick={(e) => handleDeleteEvent(material.id,e)}
                    color="red"
                    floated="right"
                    content="Delete"
                    />


                </Item>
            </Item.Group>
        </Segment>
    )
}