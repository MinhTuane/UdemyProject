import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import {format} from 'date-fns'
import { useStore } from "../../../app/stores/store";
import { User } from "../../../app/models/user";

interface props {
    user: User;
}
export default function UserItem({ user }: props) {

    const { adminStore } = useStore();
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="mini" circular src='/assets/user.png' rounded/>
                        <Item.Content>
                            <Item.Header > 
                            {user.displayName}</Item.Header>
                            <Item.Extra>{user.id}</Item.Extra>
                            <Item.Description> {user.role} </Item.Description>
                            
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Button 
                as={Link}
                to={`/activities/${user.id}`}
                color="teal"
                floated='right'
                content='View'
                />
            </Segment>
        </Segment.Group>
    )
}