import React, {useState} from 'react';
import {logout} from '../../redux/authActionCreators';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
    } from 'reactstrap';
import '../../css/header.css';

const mapDispatchToProps=dispatch=>({
    logout: ()=>dispatch(logout())
});

const Header = props => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <Navbar color="dark" light expand="md">
        <Container>
            <NavbarBrand href="/"><img src='/brandLogo.png' alt='Logo'/></NavbarBrand>

            <NavbarToggler className='bg-white px-1 py-0' onClick={() => setIsOpen(!isOpen)} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="text-white menu" navbar>
                    <NavItem>
                        <Link className='text-white nav-link' to='/'>Components</Link>
                    </NavItem>

                    <UncontrolledDropdown nav>
                        <DropdownToggle className='text-white' nav caret>
                            <img src='/avatar.png' className='rounded-circle border border-white' alt='avatar'/>
                        </DropdownToggle>

                        <DropdownMenu className='mr-2 py-1' right>
                            <DropdownItem className='py-1'>
                                Option 1
                            </DropdownItem>
                            <DropdownItem className='py-0' divider />
                            <DropdownItem onClick={props.logout} className='py-1'>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Container>
    </Navbar>)
}
export default connect(null, mapDispatchToProps)(Header);