import React, {Component} from 'react';
import {signupForm as SignupForm} from "../../components/SignupForm/SignupForm";
import {Button, Alert} from "reactstrap";
import {withRouter} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "./../Footer/Footer";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            form: {
                nombre: "",
                apellido: "",
                carnet: "",
                secreto: "",
                horario: "mañana"
            },
            passwordFocused: false,
            passwordValid: false,
            carnetValid: true,
            loading: false,
            message: "",
            formValid: {
                nombre: false,
                apellido: false,
                carnet: false,
                secreto: false,
                horario: true
            },
            alert: {
                message: "",
                show: false
            }
        };
    }

    changeHandler(event) {
        event.preventDefault();
        const newState = {...this.state.form};
        const newFormValid = {...this.state.formValid};
        const name = event.target.name;
        newState[name] = event.target.value;
        switch (name) {
            case "secreto":
                const passValid = this.checkPass(newState[name]);
                console.log(passValid);
                newFormValid[name] = passValid;
                this.setState({
                    form: newState,
                    passwordValid: passValid,
                    formValid: newFormValid
                });
                break;
            case "carnet":
                const carnetValid = this.checkCarnet(newState[name]);
                newFormValid[name] = carnetValid;
                this.setState({
                    form: newState,
                    formValid: newFormValid
                });
                break;
            case "horario":
                this.setState({
                    form: newState
                });
                break;
            case "nombre":
            case "apellido":
                newFormValid[name] = this.checkText(newState[name]);
                this.setState({
                    form: newState,
                    formValid: newFormValid
                });
                break;
            default :
                this.setState({
                    form: newState,
                });
                break;
        }
    }

    checkPass(pass) {
        const password = pass.trim();
        return password.length > 7;
    }

    checkCarnet(carnet) {
        return carnet.trim().length > 7;
    }

    checkText(text) {
        return text.trim().length > 0;
    }

    submitHandler(event) {
        event.preventDefault();
        let status = 0;
        let message = "";
        this.setState({loading: true});
        fetch(process.env.REACT_APP_API_PREFIX + "/sistema/estudiantes/",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    ...this.state.form
                })
            }
        ).then(response => {
            status = response.status;
            message = response.statusText;
            return response.json();
        }).then(data => {
            switch (status) {
                case 422:
                    this.setState({
                        carnetValid: false,
                        alert: {
                            message: data.message,
                            show: true
                        }
                    });
                    this.setState({loading: false});
                    break;
                case 201:
                    this.props.history.push("/login");
                    break;
                default:
                    console.log(message, status);
                    break;
            }
        });
    }

    onDismiss() {
        this.setState({
            alert: {
                show: false,
                message: ""
            }
        });
    }

    render() {
        let disable = true;
        for (let key in this.state.formValid) {
            disable = disable && this.state.formValid[key];
        }
        const button = this.state.loading ?
            <div className="spinner-grow Center" role="status">
                <span className="sr-only">Loading...</span>
            </div> :
            <Button
                className={"Center btn"}
                disabled={!disable}
                onClick={(event) => this.submitHandler(event)}
            >CREAR</Button>;

        return <>
            <Header type={0}/>
            <div className={"Floating"}>
                <Alert
                    color={"danger"}
                    isOpen={this.state.alert.show}
                    toggle={this.onDismiss}
                >
                    {this.state.alert.message}
                </Alert>
            </div>
            <SignupForm
                change={this.changeHandler}
                data={this.state.form}
                blur={this.onBlurHandler}
                valid={this.state.passwordValid}
                submit={this.submitHandler}
                carnet={this.state.carnetValid}
            />
            {button}
            <Footer type={1}/>
        </>;
    }
}

export default withRouter(Signup);