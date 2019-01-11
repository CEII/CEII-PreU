import React from 'react';
import PropTypes from "prop-types";
import {navItem as NavItem} from "../NavItem/NavItem";

import {Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

export const navBar = (props) => {
    console.log(props.items);
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">CEII</NavbarBrand>
            <NavbarToggler onClick={props.openHandler} />
            <Collapse isOpen={props.isOpen} navbar>
                {/*<Nav className="ml-auto" navbar>
                    <NavItem items={props.items}/>
                </Nav>*/}
            </Collapse>
        </Navbar>
    );
};

navBar.propTypes={
    isOpen:PropTypes.bool.isRequired,
    openHandler:PropTypes.func.isRequired,
    items:PropTypes.arrayOf(PropTypes.shape({
        reference:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired
    })).isRequired
};