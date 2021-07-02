import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    NavbarBrand,
    UncontrolledDropdown
} from 'reactstrap';
import '../../css/header.css';
import { logout } from '../../redux/authActionCreators';

const Header = () => {
    const dispatch = useDispatch();

    return (<Navbar className='navigation' color="dark" light expand="md">
        <Container>
            <NavbarBrand href="/">
                <img src="/brandLogo.png" alt="Logo" />
            </NavbarBrand>

            <UncontrolledDropdown>
                <DropdownToggle className="text-white" nav caret>
                    <img
                        src="/avatar.png"
                        className="rounded-circle border border-white"
                        alt="avatar"
                    />
                </DropdownToggle>

                <DropdownMenu className="mr-2 py-1" right>
                    <DropdownItem className="py-1">
                        <Link to="/">Link if necessary</Link>
                    </DropdownItem>
                    <DropdownItem className="py-0" divider />

                    <DropdownItem onClick={()=>dispatch(logout())} className="py-1">
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Container>
    </Navbar>)
}
export default Header;