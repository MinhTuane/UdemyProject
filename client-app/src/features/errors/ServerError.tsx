import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function ServerError() {
    const {commonStore} = useStore();

    return (
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header sub as='h5' color='red' content={commonStore.error?.massage}/>
            {commonStore.error?.detail && (
                <Segment>
                    <Header as='h4' content='Stack trace' color="teal" />
                    <code style={{marginTop:10}}>{commonStore.error.detail}</code>
                </Segment>
            )}
        </Container>
    )
}