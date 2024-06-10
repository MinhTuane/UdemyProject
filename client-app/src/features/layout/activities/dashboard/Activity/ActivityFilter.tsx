import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilter() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%',marginTop:25 }}>
                <Header icon='filter' attached color="teal" content='Filters' />
                <Menu.Item content='All activities' />
                <Menu.Item content='Im going' />
                <Menu.Item content='dsadasd' />
            </Menu>
            <Header/>
            <Calendar/>
        </>
    )
}