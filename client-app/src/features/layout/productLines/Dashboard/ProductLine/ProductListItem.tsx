import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../../../app/models/product";
import { useStore } from "../../../../../app/stores/store";

interface Props {
    product: Product
}

export default function ProductListItem({ product }: Props) {
    const {productLineStore,productStore} = useStore();
    const {choosingLine,updateProductLine} = productLineStore;
    const {updateProduct} = productStore;

    function HandleSelectProduct() {
        const productLine ={
            ...choosingLine!,
            productId : product.id,
            status : 'On going'
        }
        updateProductLine(productLine);
        const newProduct = {
            ...product,
            isProducing : true
        }
        updateProduct(newProduct);
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
                    type="button"
                    color="teal"
                    floated='right'
                    onClick={HandleSelectProduct}
                    content='Select'
                />
            </Segment>
        </Segment.Group>
    )
}