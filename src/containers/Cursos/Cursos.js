import React, {Component} from 'react';
import style from "./Cursos.module.css";
import {cursosCard as CursosCard} from "../../components/CursosCard/CursosCard";

class Cursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/sistema/cursos")
            .then(data=>{return data.json()})
            .then(data=>{
                const fetchecData=data.cursos.map((element)=>{
                   return {...element}
                });
                this.setState({data:fetchecData});
            })
            .catch(error=>console.log(error));
    }

    render() {
        return <div className={style.body}>
            {this.state.data.map((item)=>{
                return <CursosCard data={item} key={item._id}/>
            })}
        </div>;
    }
}

export default Cursos