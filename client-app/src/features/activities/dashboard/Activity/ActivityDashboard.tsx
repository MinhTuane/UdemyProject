import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import ActivityFilter from "./ActivityFilter";
import 'react-calendar/dist/Calendar.css';

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const {loadActivities,activitiesRegister} = activityStore;
    useEffect(() => {
        if(activitiesRegister.size <=1) loadActivities();
    }, [activityStore,activitiesRegister.size])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilter/>
            </Grid.Column>
        </Grid>
    )
}
)