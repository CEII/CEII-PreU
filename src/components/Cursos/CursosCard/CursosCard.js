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
    let bottom = null;
    if (data.loading) {
        bottom = <div className="spinner-grow Center" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    } else {
        if (props.canFry !== undefined) {
            console.log(data.numeroDia);
            bottom = <Button color="secondary"
                             className={style.btn}
                             disabled={!props.canFry}
                             onClick={(event) => props.handler(event, data._id, data.numeroDia)}
            >
                {data.active ? "Desinscribirse" : "Inscribirse"}
            </Button>;
        } else {
            bottom = <Button color="secondary"
                             className={style.btn}
                             onClick={(event) => props.handler(event, data._id, data.numeroDia)}
            >
                {data.active ? "Desinscribirse" : "Inscribirse"}
            </Button>;
        }
    }
    return (
        <Card outline color="secondary">
            <CardHeader tag={"h4"}>{data.nombre}</CardHeader>
            <CardBody>
                {text}
                {bottom}
            </CardBody>
        </Card>
    );
};

cursosCard.propTypes = {};