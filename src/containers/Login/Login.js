import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";
import Footer from "./../Footer/Footer";
import {loginForm as LoginForm} from "../../components/LoginForm/LoginForm";
import {Button, Alert} from "reactstrap";
import style from "../../components/LoginForm/LoginForm.module.css";
import Header from "../Header/Header";


class Login extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            form: {
                carnet: "",
                secreto: ""
            },
            alert: {
                visible: false,
                text: "",
                type: ""
            },
            loading: false
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
        let status = 0;
        if (this.validFields()) {
            this.setState({
                loading: true
            });
            fetch(process.env.REACT_APP_API_PREFIX + "/sistema/estudiantes/login", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    ...this.state.form
                })
            }).then(response => {
                status = response.status;
                return response.json();
            }).then(data => {
                if (status !== 401) {
                    localStorage.setItem("token", data.message);
                    this.props.history.push("/");
                } else {
                    this.setState({
                        alert: {
                            visible: true,
                            text: "Usuario no encontrado",
                            type: "danger"
                        },
                        loading: false
                    });
                }
            });
        } else {
            console.log("nop");
        }

    }

    validFields() {
        let isValid = true;
        for (let key in this.state.form) {
            if (key === "secreto") {
                isValid = isValid && this.state.form[key].trim().length > 7;
            } else {
                isValid = isValid && this.state.form[key].trim().length > 0;
            }
        }
        return isValid;
    }

    onDismiss() {
        this.setState({
            alert: {
                visible: false,
                text: "",
                type: ""
            }
        });
    }

    render() {
        const buttom = this.state.loading ?
            <div className="spinner-grow Center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            : <Button className={style.btn + " btn"} onClick={this.submitHandler} disabled={!this.validFields()}>INICIAR
                SESIÓN</Button>

        return <>
            <Header type={0}/>
            <div className={"Floating"}>
                <Alert color={this.state.alert.type} isOpen={this.state.alert.visible} toggle={this.onDismiss}>
                    {this.state.alert.text}
                </Alert>
            </div>
            <div className={"CenterContainer"}>
                <LoginForm data={this.state.form} change={this.changeHandler}/>
                {buttom}
                <p style={{textAlign: "center"}}>¿No te has registrado? Da click<Link to={"/signup"}> aquí</Link></p>
                <p style={{textAlign: "center"}}>¿Tienes problemas para acceder a tu cuenta? Envia un correo al 00178616@uca.edu.sv
                </p>
            </div>
            <Footer type={0}/>
        </>
    }
}

export default withRouter(Login);
