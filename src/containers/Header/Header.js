import React, {Component} from 'react';
import {navBar as NavBar} from "../../components/NavBar/NavBar";

class Header extends Component {
    constructor(props) {
        super(props);
        this.openHandler = this.openHandler.bind(this);
        this.state = {
            isOpen: false
        };
    }

    openHandler() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        let item = [];
        if (this.props.type === 0) {
            item = [{name: "Login", reference: "/login"},
                {name: "Sign up", reference: "/signup"}];
        } else {
            item = [{name: "Logout", reference: "/logout"}];
        }
        return <header>
            <NavBar isOpen={this.state.isOpen} openHandler={this.openHandler} items={item}/>
        </header>;
    }
}

export default Header