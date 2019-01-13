import React, {Component} from 'react';
import {signupForm as SignupForm} from "../../components/SignupForm/SignupForm";
import {Button} from "reactstrap";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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
            carnetValid:true,
            loading: false,
            alert: {
                message: "",
                show: false
            }
        };
    }

    changeHandler(event) {
        event.preventDefault();
        const newState = {...this.state.form};
        switch (event.target.name) {
            case "secreto":
                newState[event.target.name] = event.target.value;
                const color = this.checkPass(newState[event.target.name]);
                this.setState({form: newState, passwordValid: color});
            default :
                newState[event.target.name] = event.target.value;
                this.setState({form: newState});
        }
    }

    checkPass(pass) {
        const password = pass.trim();
        return password.length > 7;
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({loading: true});
        let canFetch = true;
        let status = 0;
        for (let value in this.state.form) {
            canFetch = canFetch && this.state.form[value] !== "";
        }
        if (canFetch) {
            fetch("http://localhost:5000/sistema/estudiantes/", {
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
                if(status===422){
                    this.setState({
                        carnetValid:false
                    });
                }else{
                    return response.json();
                }
            }).then((data) => {
                console.log(data);
            }).finally(()=>this.setState({loading:false}));
        } else {

        }
    }

    render() {
        const button = this.state.loading ?
            <div className="spinner-grow Center" role="status">
                <span className="sr-only">Loading...</span>
            </div> :
            <Button className={"Center"} onClick={(event) => this.submitHandler(event)}>Submit</Button>;
        return <div>
            <SignupForm
                change={this.changeHandler}
                data={this.state.form}
                blur={this.onBlurHandler}
                valid={this.state.passwordValid}
                submit={this.submitHandler}
                carnet={this.state.carnetValid}
            />
            {button}
        </div>;
    }
}

export default Signup