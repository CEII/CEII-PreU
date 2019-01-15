import React from 'react';
import PropTypes from "prop-types";
import {navItem as NavItem} from "../NavItem/NavItem";
import style from "./NavBar.module.css";


import {Navbar,
    NavbarToggler,
    Collapse,
    Nav,
} from "reactstrap";

export const navBar = (props) => {
    return (
        <Navbar dark expand="md" className={style["Nav-bar"]} >
            <a className="navbar-brand" href="/">
                <img src={"/preu/icon.png"} width="30" height="30"
                     className="d-inline-block align-top" alt="icono del CEII"/>
                    CEII
            </a>
            <NavbarToggler onClick={props.openHandler} />
            <Collapse isOpen={props.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem items={props.items}/>
                </Nav>
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