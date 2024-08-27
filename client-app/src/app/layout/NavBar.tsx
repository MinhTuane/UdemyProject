import { Button, Container, Menu, Image, Dropdown, MenuItem } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Register from "../../features/layout/Admin/Register";

export default observer(function NavBar() {
    const { userStore: { user, logout }, modalStore } = useStore()
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Line Production
                </Menu.Item>
                <Menu.Item as={NavLink} to='productLineDashBoard' name="Product Line" />
                {user?.role === 'Manager' && (
                    <>
                        <Menu.Item>
                            Create
                            <Dropdown>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to='createPurchaseOrder' positive content='Create Purchase Order' />
                                    <Dropdown.Item as={NavLink} to='createProduct' positive content='Create Product' />
                                    <Dropdown.Item as={NavLink} to='createMaterial' positive content='Create Material' />
                                    <Dropdown.Item as={NavLink} to='addProduct' positive content='Add Product' />
                                    <Dropdown.Item as={NavLink} to='createCompany' positive content='Create Company' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item>
                            Manage
                            <Dropdown>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to='createPurchaseOrder' positive content='Create Purchase Order' />
                                    <Dropdown.Item as={NavLink} to='products' positive content='List Product' />
                                    <Dropdown.Item as={NavLink} to='materials' positive content='List Material' />
                                    <Dropdown.Item as={NavLink} to='addProduct' positive content='Add Product' />
                                    <Dropdown.Item as={NavLink} to='manageUsers' positive content='Manage Users' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                )}
                {user?.role === 'Admin' && (
                    <Menu.Item>
                        Admin
                        <Dropdown>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Button} onClick={() => modalStore.openModal(<Register />)} positive content='Register' />
                                <Dropdown.Item as={NavLink} to='attendenceCheckForm' positive content='Attendence Check' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
                <Menu.Item position="right">
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
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
