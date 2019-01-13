import React from 'react';
import {Card, Button, CardHeader, CardBody, Row, Col} from 'reactstrap';
import style from "./CursosCard.module.css"
import PropTypes from "prop-types";

export const cursosCard = (props) => {
    const data = {...props.data};
    const text =
        <div>
            <p>Ponente: {data.ponente}</p>
            <p>Hora: {data.hora}</p>
            <p>Fecha: {data.fechaEvento}</p>
            <p>Salon: {data.salon}</p>
            <p>Cupos disponibles: {data.cupo - data.numeroInscritos}</p>
        </div>;
    return (
        <Col sm={"3"}>
            <Card outline color="secondary">
                <CardHeader tag={"h4"}>{data.nombre}</CardHeader>
                <CardBody>
                    {text}
                    <Button color="secondary" className={style.btn}
                            onClick={() => props.buttonClick()}>INSCRIPCION</Button>
                </CardBody>
            </Card>
        </Col>
    );
};

cursosCard.propTypes = {};