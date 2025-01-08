import { Link } from 'react-router-dom'; // Import Link for navigation
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav from './SideNav';
import './NavMenu.css';
import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import CustomMenu from './CustomMenu';

const MainMenu = ({onShowDatabases, onShowFileLoader, onShowMetrics, onShowCRM}) => {
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-white border-bottom box-shadow mb-3" light>
            <Container>
                <NavbarBrand href="/">KRDC (&copy; 2023)</NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <SideNav customMenu={<CustomMenu />} />

                        <NavItem>
                            <NavLink onClick={onShowFileLoader} className="text-dark" >Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                href="#"
                                
                                className="text-dark"
                            >
                                Dashboard
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={onShowDatabases} className="text-dark" tag={Link}>Database</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" onClick={onShowCRM} className="text-dark" tag={Link}>CRM</NavLink>
                        </NavItem>
                       
                        <NavItem>
                            <NavLink href="/" onClick={onShowMetrics} className="text-dark" tag={Link}>Metrics/ Design</NavLink>
                        </NavItem>
                        
                        <NavItem>
                            <NavLink href="/"  className="text-dark">Help</NavLink>
                        </NavItem>

                        {/* Dropdown Combobox for Businesses */}
                        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle nav caret className="text-dark">
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#business1">Agency</DropdownItem>
                                <DropdownItem href="#business2">E.W. Group</DropdownItem>
                                <DropdownItem href="#business2">Tyger Audio</DropdownItem>
                                <DropdownItem href="#business3">DigitalBridge</DropdownItem>
                                <DropdownItem href="#business3">Jobs</DropdownItem>
                                {/* Add more businesses as needed */}
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default MainMenu;
