import React from 'react';
import {Container, FormGroup, Input} from "reactstrap";
import {cursosCard as CursosCard} from "./../CursosCard/CursosCard";
import style from "./CursosWrapper.module.css";

export const cursosWrapper = (props) => {
    return (
        <Container>
            <h3 style={{textAlign: "center"}}>Lunes</h3>
            <FormGroup>
                <Input
                    type="select"
                    name="1"
                    id="horario"
                    className={style.DropB}
                    onChange={props.change}
                >
                    <option value={"mañana"}>Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
            </FormGroup>
            <hr/>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 1 && element.horario === props.horario[1]);
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}
                                       className={"justify-content-center"}/>;
                })}
            </div>
            <h3 style={{textAlign: "center", marginTop: "2em"}}>Martes</h3>
            <FormGroup>
                <Input
                    type="select"
                    name="2"
                    id="horario"
                    className={style.DropB}
                    onChange={props.change}
                >
                    <option value={"mañana"}>Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
            </FormGroup>
            <hr/>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 2 && element.horario === props.horario[2])
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign: "center", marginTop: "2em"}}>Miercoles</h3>
            <FormGroup>
                <Input
                    type="select"
                    name="3"
                    id="horario"
                    className={style.DropB}
                    onChange={props.change}
                >
                    <option value={"mañana"}>Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
            </FormGroup>
            <hr/>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 3 && element.horario === props.horario[3])
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign: "center", marginTop: "2em"}}>Jueves</h3>
            <FormGroup>
                <Input
                    type="select"
                    name="4"
                    id="horario"
                    className={style.DropB}
                    onChange={props.change}
                >
                    <option value={"mañana"}>Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
            </FormGroup>
            <hr/>
            <div className={style.Wrapper}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 4 && element.horario === props.horario[4])
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler}/>;
                })}
            </div>
            <h3 style={{textAlign: "center", marginTop: "2em"}}>Viernes</h3>
            <FormGroup>
                <Input
                    type="select"
                    name="5"
                    id="horario"
                    className={style.DropB}
                    onChange={props.change}
                >
                    <option value={"mañana"}>Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
            </FormGroup>
            <hr/>
            <div className={style.WrapperW}>
                {props.cursos.filter((element) => {
                    return (element.numeroDia === 5 && element.horario === props.horario[5])
                }).map((element) => {
                    return <CursosCard key={element._id} data={element} handler={props.handler} canFry={props.canFry}/>;
                })}
            </div>
        </Container>
    );
};