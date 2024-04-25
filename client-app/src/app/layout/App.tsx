import axios from "axios";
import { useEffect, useState } from "react";
import { Header,List } from "semantic-ui-react";
import { Activity } from "./app/models/activity";


function App() {
    const [activities,setActivities] = useState<Activity[]>([]);

    useEffect(()=> {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(res => {
            setActivities(res.data)
        })
    },[])
    return(
        <div>
            <Header as='h2' icon='users' content='Reactivities'/>
            <List>
                
            </List>
        </div>
    )
}
export default App;