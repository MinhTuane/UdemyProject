import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import {format} from 'date-fns'

interface props {
    activity: Activity;
}
export default function ActivtityListItem({ activity }: props) {

    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="medium" circular src='/assets/user.png' rounded/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}> 
                            {activity.title}</Item.Header>
                            <Item.Description> Host </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(activity.date!,'dd MMM yyyy h:m aa')}
                    <Icon name="marker"/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendee
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                <Button 
                as={Link}
                to={`/activities/${activity.id}`}
                color="teal"
                floated='right'
                content='View'
                />
            </Segment>
        </Segment.Group>
    )
}