import { Item, Segment } from "semantic-ui-react";
import { ProductLine } from "../../../../app/models/productLine"
import { Product } from "../../../../app/models/product";

interface Props {
    productLine: ProductLine;
}

export default function ProductLineListItem({productLine} : Props ) {
    return(
        <Segment.Group>
            <Segment>
                <Item.Content>
                    <Item.Header>
                        {productLine.title}
                    </Item.Header>
                    <Item.Extra>{productLine.status}</Item.Extra>
                </Item.Content>
            </Segment>
            <Segment>
                <Item.Content>
                    <Item.Header>
                      
                    </Item.Header>
                </Item.Content>
            </Segment>
        </Segment.Group>
    )
}