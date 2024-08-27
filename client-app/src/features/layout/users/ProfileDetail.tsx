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
    const getBirthYear = (dateOfBirth:Date) => {
        if (!dateOfBirth) return 'N/A';
    
        const date = new Date(dateOfBirth);
    
        return date.toLocaleDateString();
      };
    
      return (
        <Segment.Group>
          <Segment>Role: {user?.role || 'N/A'}</Segment>
          <Segment>Date Of Birth: {getBirthYear(user?.dateOfBirth!)}</Segment>
          <Segment>Line Id: {user?.productLineId || 'N/A'}</Segment>
        </Segment.Group>
      );
})