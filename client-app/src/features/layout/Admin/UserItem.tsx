import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { User } from "../../../app/models/user";

interface props {
    user: User;
}
export default function UserItem({ user }: props) {

    const { adminStore } = useStore();
    const {deleteUser,updateUser} =adminStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteUser(id);
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="small" circular src={ user.image || '/assets/user.png'} rounded/>
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
                to={`/editUser/${user.id}`}
                color="teal"
                floated='right'
                content='Edit'
                />
                <Button 
                as={Link}
                to={`/`}
                color="red"
                floated='right'
                content='Delete'
                />
            </Segment>
        </Segment.Group>
    )
}