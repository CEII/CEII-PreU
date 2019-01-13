import React from 'react';
import {Container} from "reactstrap";
import {cursosCard as CursosCard} from "./../CursosCard/CursosCard";
import style from "./CursosWrapper.module.css";

export const cursosWrapper = (props) => {
    return (
        <Container>
            <h3 style={{textAlign:"center"}}>Lunes</h3>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 1)
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign:"center", marginTop:"2em"}}>Martes</h3>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 2)
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign:"center", marginTop:"2em"}}>Miercoles</h3>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 3)
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign:"center", marginTop:"2em"}}>Jueves</h3>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 4)
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign:"center", marginTop:"2em"}}>Viernes</h3>
            <div className={style.WrapperW}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 5)
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler} canFry={props.canFry}/>;
                })}
            </div>
        </Container>
    );
};