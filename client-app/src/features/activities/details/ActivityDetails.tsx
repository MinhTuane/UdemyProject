import {  Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {  useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useEffect } from "react";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfor from "./ActivityDetailInfor";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default observer( function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity : activity, loadActivity,loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id,loadActivity])
    
    if(!activity || loadingInitial) return<LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfor activity={activity}/>
                <ActivityDetailChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar/>
            </Grid.Column>
        </Grid>
    )
})