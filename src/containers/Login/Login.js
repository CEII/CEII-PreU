import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {loginForm as LoginForm} from "../../components/LoginForm/LoginForm";
import {Button, Form} from "reactstrap";
import style from "../../components/LoginForm/LoginForm.module.css";
import Header from "../Header/Header";


class Login extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            form: {
                carnet: "",
                secreto: ""
            }
        };
    }

    changeHandler(event) {
        event.preventDefault();
        const newForm = {...this.state.form};
        newForm[event.target.name] = event.target.value;
        this.setState({form: newForm})
    }

    submitHandler(event) {
        event.preventDefault();
        if (this.validFields()) {
            fetch("https://cursos-pre.herokuapp.com/sistema/estudiantes/login", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    ...this.state.form
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                localStorage.setItem("token", data.message);
                this.props.history.push("/");
            })
        } else {
            console.log("nop");
        }

    }

    validFields() {
        let isValid = true;
        for (let key in this.state.form) {
            isValid = isValid && this.state.form[key] !== "";
        }
        return isValid;
    }

    render() {
        return<>
            <Header type={0}/>
            <div className={"CenterContainer"}>
                <LoginForm data={this.state.form} change={this.changeHandler}/>
                <Button className={style.btn} onClick={this.submitHandler}>LOG IN</Button>
            </div>
            ;
        </>
    }
}

export default withRouter(Login);