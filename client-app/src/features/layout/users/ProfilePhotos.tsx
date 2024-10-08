import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Photo } from "../../../app/models/user";

interface Props {
    profile : Profile
}

export default observer( function ProfilePhotos({profile} : Props) {
    const {profileStore: {isCurrentUser,uploadPhoto,uploading, loading ,setMainPhoto,deletePhoto }} = useStore();
    const [target,setTarget] = useState('');
    const [addPhotoMode,SetAddPhotoMode] = useState(false);

    function handlePhotoUpload(file : Blob) {
        uploadPhoto(file).then(() => SetAddPhotoMode(false))
    }

    function handleSetMainPhoto(photo : Photo, e :SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo,e : SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button floated="right" basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => SetAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading = {uploading}/>          
                    ) : (
                        <Card.Group itemsPerRow={4}>
                            {profile.photos?.map(photo => (
                                <Card>
                                <Image src={photo.url}/>
                                {isCurrentUser && (
                                    <Button.Group fluid widths={2}>
                                        <Button 
                                        basic 
                                        color="green" 
                                        content='Main'
                                        name={'main'+ photo.id}
                                        disabled = {photo.isMain}
                                        loading={target === 'main'+photo.id && loading}
                                        onClick={e=>handleSetMainPhoto(photo,e)}
                                        />
                                        <Button 
                                        basic 
                                        color="red" 
                                        icon='trash' 
                                        loading={target === photo.id && loading}
                                        onClick={(e) => handleDeletePhoto(photo,e)}
                                        disabled={photo.isMain}
                                        name={photo.id}
                                        />
                                    </Button.Group>
                                )}
                            </Card>
                            ))}          
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>          
        </Tab.Pane>
    )
})