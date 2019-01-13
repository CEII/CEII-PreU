import React, {Component} from 'react';
import {layout as Layout} from "../components/Layout/Layout";
import Cursos from "./../containers/Cursos/Cursos";
import Login from "./Login/Login";
import Signup from "./Singup/Signup";
import Logout from "./Login/Logout";
import {Switch, Route} from "react-router-dom";

import './App.css';


class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/signup"} component={Signup}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/"} component={Cursos}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
