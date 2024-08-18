import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Segment } from "semantic-ui-react";



export default observer( function ProfileDetail() {
    const {userStore} = useStore();

    const {getUser,user} = userStore;

    useEffect(()=> {
        if(user) getUser();
    },[user,getUser])
    return (
        <Segment.Group>
            <Segment>Role : {user?.role}</Segment>
            <Segment>Date Of Birth : {user?.dateOfBirth}</Segment>
            <Segment>Line Id : {user?.productLineId}</Segment>
        </Segment.Group>
    )
})