import { Button, Container, Menu, Image, Dropdown, MenuItem } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore()
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='activities' name="Activities" />
                <Menu.Item as={NavLink} to='productLineDashBoard' name="Product Line"/>
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    Create
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={'createActivity'} positive content='Create Activity'/>
                            <Dropdown.Item as={NavLink} to='createPurchaseOrder' positive content='Create Purchase Order'/>
                            <Dropdown.Item as={NavLink} to='createProduct' positive content='Create Product'/>
                            <Dropdown.Item as={NavLink} to='createMaterial' positive content='Create Material'/>
                            <Dropdown.Item as={NavLink} to='addProduct' positive content='Add Product'/>
                            <Dropdown.Item as={NavLink} to='createCompany' positive content='Create Company'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayname}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>

                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})
