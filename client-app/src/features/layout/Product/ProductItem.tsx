import { Button, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


interface Props {
    product: Product
}

export default observer( function ProductListItem({ product }: Props) {
    const{productStore: {deleteProduct}} = useStore();
    const [target, setTarget] = useState('');
    function handleDeleteEvent(productId : string,e : SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteProduct(productId);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="small" src='/assets/noImage.jpg' wrapped/>
                        <Item.Content>
                            <Item.Header>
                                {product.name}</Item.Header>
                            <Item.Description> {product.description} </Item.Description>
                            <Item.Content>Price : {product.price}</Item.Content>
                            <Item.Content>Quantity : {product.quantity}</Item.Content>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>

                <Button
                    as={Link}
                    to={`/manageProduct/${product.id}`}
                    color="teal"
                    floated='right'
                    content='Edit'
                />
                <Button
                    name={product.id}
                    disabled={target == product.id}
                    onClick={(e) => handleDeleteEvent(product.id,e)}
                    color="red"
                    floated="right"
                    content="Delete"
                />
            </Segment>
        </Segment.Group>
    )
});