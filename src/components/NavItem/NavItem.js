import React from 'react';
import PropTypes from "prop-types";
import {NavItem, NavLink} from "reactstrap";

export const navItem = (props) => {
    return (
        props.items.map((item)=>{
            return <NavItem key={item.name}>
                <NavLink href={item.reference}>{item.name}</NavLink>
            </NavItem>
        })
    );
};

navItem.propTypes={
    items:PropTypes.arrayOf(PropTypes.shape({
        reference:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired
    })).isRequired
};