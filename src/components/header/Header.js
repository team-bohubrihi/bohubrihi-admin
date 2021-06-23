/* eslint-disable  */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import '../../css/header.css';
import { logout } from '../../redux/authActionCreators';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <Navbar color="dark" light expand="md">
            <Container>
                <NavbarBrand href="/">
                    <img src="/brandLogo.png" alt="Logo" />
                </NavbarBrand>

                <NavbarToggler className="bg-white px-1 py-0" onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="text-white menu" navbar>
                        <NavItem>
                            <Link className="text-white nav-link" to="/">
                                Components
                            </Link>
                        </NavItem>

                        <UncontrolledDropdown nav>
                            <DropdownToggle className="text-white" nav caret>
                                <img
                                    src="/avatar.png"
                                    className="rounded-circle border border-white"
                                    alt="avatar"
                                />
                            </DropdownToggle>

                            <DropdownMenu className="mr-2 py-1" right>
                                <DropdownItem className="py-1">
                                    <Link to="/courses">Courses</Link>
                                </DropdownItem>
                                <DropdownItem className="py-0" divider />

                                <DropdownItem onClick={()=>dispatch(logout())} className="py-1">
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;
