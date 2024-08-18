import { Button, Grid, Header, Icon, Item, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";

export default function DetailUSer() {
    return(
        <Grid>
            <Grid.Column width={8} className="detailUser">
                <Item.Image circular size="medium" src="/public/assets/user.png"/>
            </Grid.Column>
            <Grid.Column width={8}>
                <SegmentGroup >
                    <Segment >                       
                        <Icon name="user"/>
                        <Header icon as="h4">
                            Fullname 
                        </Header>
                        <Item> Minh Tuan</Item>
                    </Segment>
                    <Segment >                       
                        <Icon name="birthday" />
                        <Header icon as="h4">
                            Date of Birth
                        </Header>
                        <Item> 18-2-2004</Item>
                    </Segment>
                    <Segment >                       
                        <Icon name="industry" />
                        <Header icon as="h4">
                            Line working
                        </Header>
                        <Item>Line 1</Item>
                    </Segment>
                    <Segment >                       
                        <Icon name="lock" />
                        <Header icon as="h4">
                            Role
                        </Header>
                        <Item>Admin</Item>
                    </Segment>
                </SegmentGroup>
                    
            </Grid.Column>
        </Grid>
    )
}