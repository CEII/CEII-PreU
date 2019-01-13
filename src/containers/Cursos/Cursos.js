import React, {Component} from 'react';
import style from "./Cursos.module.css";
import {cursosWrapper as CursosWrapper} from "../../components/Cursos/CursosWrapper/CursosWrapper";
import {Alert} from "reactstrap";

import {withRouter} from "react-router-dom";
import Header from "../Header/Header";

class Cursos extends Component {
    constructor(props) {
        super(props);
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            data: [],
            canFry: false,
            loading: true,
            asistidos: 0,
            alert: {
                alertVisible: false,
                text: "",
                type: ""
            }
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token !== null) {
            this.getCourses();
        } else {
            this.props.history.push("/login");
        }
    }

    onButtonClickHandler(event, id, numeroDia) {
        let status = 0;
        let alertText = "";
        const data = [...this.state.data];
        data.map((element) => {
            if (element._id === id) {
                element.loading = true;
            }
            return {
                element
            };
        });
        this.setState({
            data: data
        });
        if((this.state.canFry&&numeroDia===5)||numeroDia!==5){
            fetch("https://cursos-pre.herokuapp.com/sistema/estudiantes/reservar/" + id, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                status = response.status;
                alertText = response.statusText;
                console.log(response);
                return response.json();
            }).then(data => {
                switch (status) {
                    case 409:
                        const data = [...this.state.data];
                        data.map((element) => {
                            if (element._id === id) {
                                element.loading = false;
                            }
                            return {
                                element
                            };
                        });
                        this.setState({
                            data: data,
                            alert: {
                                alertVisible: true,
                                message: "Conflicto con el horario de dos cursos",
                                type: "danger"
                            }
                        });
                        break;
                    case 401:
                        localStorage.clear();
                        this.props.history.push("/login");
                        break;
                    case 500:
                        this.setState({
                            data: data,
                            alert: {
                                alertVisible: true,
                                message: "Error interno, intentalo mas tarde",
                                type: "danger"
                            }
                        });
                        break;
                    default:
                        this.getCourses();
                        const newData = [...this.state.data];
                        newData.map((element) => {
                            const isThis = element._id === id;
                            element.active = isThis ? !element.active : element.active;
                            element.loading = false;
                            return {
                                ...element
                            }
                        });
                        this.setState({
                            data: newData
                        });
                }
            }).catch(error => console.log(error));
        }else{
            console.log("Hola");
            this.setState({
                data: data,
                alert: {
                    alertVisible: true,
                    message: "Intentaste hackeranos prro >:v",
                    type: "danger"
                }
            });
        }

    }

    getCourses() {
        let status = null;
        fetch("https://cursos-pre.herokuapp.com/sistema/cursos", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(data => {
            status = data.status;
            return data.json()
        }).then(data => {
            switch (status) {
                case 401:
                    localStorage.clear();
                    this.props.history.push("/login");
                    break;
                case 503:
                    this.setState({
                        alert: {
                            alertVisible: true,
                            message: "Error interno, intentalo mas tarde",
                            type: "danger"
                        }
                    });
                    break;
                default:
                    const fetchedData = data.cursos.map((element) => {
                        return {...element}
                    });
                    this.getPersonalCourses(fetchedData);
            }

        }).catch(error => {
            if (status === 401) {
                this.props.history.push("/login");
            }
        });
    }

    getPersonalCourses(fetchedData) {
        let status = null;
        fetch("https://cursos-pre.herokuapp.com/sistema/estudiantes/personal", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            status = response.status;
            return response.json()
        }).then(data => {
            switch (status) {
                case 401:
                    localStorage.clear();
                    this.props.history.push("/login");
                    break;
            }
            const dataMod = fetchedData.map((element) => {
                return {
                    ...element,
                    active: data.cursosInscritos.includes(element._id),
                    loading: false
                };
            });
            this.setState({data: dataMod, canFry: data.cursosAsistidos.length >= 3});
        }).catch(error => console.log(error));
    }

    onDismiss() {
        this.setState({
            alert: {
                alertVisible: false,
                text: "",
                type: ""
            }
        });
    }

    render() {
        return <>
            <Header type={1}/>
            <div className={style.body}>
                <Alert color={this.state.alert.type} isOpen={this.state.alert.alertVisible} toggle={this.onDismiss}>
                    {this.state.alert.message}
                </Alert>
                <CursosWrapper
                    cursos={this.state.data}
                    handler={this.onButtonClickHandler}
                    canFry={this.state.canFry}
                />
            </div>
        </>;

    }
}

export default withRouter(Cursos)