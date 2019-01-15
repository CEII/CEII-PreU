import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        localStorage.clear();
        this.props.history.push("/login");
    }

    render() {
        return <div></div>;
    }
}

export default withRouter(Logout);