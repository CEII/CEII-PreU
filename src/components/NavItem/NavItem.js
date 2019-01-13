import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

import {NavItem} from "reactstrap";

export const navItem = (props) => {
    return (
        props.items.map((item)=>{
            return <NavItem key={item.name}>
                <NavLink
                    to={item.reference}
                    className={"nav-link"}
                    activeClassName={"active"}
                >{item.name}</NavLink>
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