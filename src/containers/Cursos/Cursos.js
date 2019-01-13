import React, {Component} from 'react';
import style from "./Cursos.module.css";
import {cursosWrapper as CursosWrapper} from "../../components/Cursos/CursosWrapper/CursosWrapper";

import {withRouter} from "react-router-dom";

class Cursos extends Component {
    constructor(props) {
        super(props);
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
        this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
        this.state = {
            data: [],
            canFry:false
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

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    onButtonClickHandler(event, id) {
        let status = 0;
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
        fetch("https://cursos-pre.herokuapp.com/sistema/estudiantes/reservar/" + id, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            status = response.status;
            return response.json();
        }).then(data => {
            if (status !== 409) {
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
            }else{
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
                    data: data
                });
            }
        }).catch(error => console.log(error));
    }

    getCourses(){
        let status=null;
        fetch("https://cursos-pre.herokuapp.com/sistema/cursos", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(data => {
            status = data.status;
            return data.json()
        }).then(data => {
            const fetchedData = data.cursos.map((element) => {
                return {...element}
            });
            this.getPersonalCourses(fetchedData)
        }).catch(error => {
            if (status === 401) {
                this.props.history.push("/login");
            }
        });
    }
    getPersonalCourses(fetchedData){
        fetch("https://cursos-pre.herokuapp.com/sistema/estudiantes/personal", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            const dataMod = fetchedData.map((element) => {
                return {
                    ...element,
                    active: data.cursosInscritos.includes(element._id),
                    loading: false
                };
            });
            this.setState({data: dataMod, canFry:data.cursosInscritos.length>=3});
        }).catch(error => console.log(error));
    }

    render() {
        console.log(this.state.data);
        return <div className={style.body}>
            <CursosWrapper
                cursos={this.state.data}
                handler={this.onButtonClickHandler}
                canFry={this.state.canFry}
            />
        </div>;
    }
}

export default withRouter(Cursos)