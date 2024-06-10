import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";

interface Props {
    product : Product
}

export default function ProductListItem({product} : Props) {
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header> 
                            {product.name}</Item.Header>
                            <Item.Description> Host </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {}
                    <Icon name="marker"/> {}
                </span>
            </Segment>
            <Segment secondary>
                Attendee
            </Segment>
            <Segment clearing>
                <span>
                    {product.description}
                </span>
                {/* <Button 
                as={Link}
                to={`/activities/${activity.id}`}
                color="teal"
                floated='right'
                content='View'
                /> */}
            </Segment>
        </Segment.Group>
    )
}