import { Grid} from "semantic-ui-react";
import ProfileHeader from "./ProfileHead";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";

export default observer( function Profile() {
  const {username} = useParams<{username : string}>();

  const{profileStore} = useStore();
  const {loadProfile,loadingProfile,profile} = profileStore;

  useEffect(() => {
    if(username) loadProfile(username);
  },[loadProfile,username])

  return(
    <Grid>
        <Grid.Column width={16}>
          {profile && 
            <>
              <ProfileHeader profile={profile}/> 
              <ProfileContent profile={profile}/>
            </>
          }
        </Grid.Column>
    </Grid>
)
});
