import React from 'react';
import {Card, Button, CardHeader, CardBody} from 'reactstrap';
import style from "./CursosCard.module.css"

export const cursosCard = (props) => {
    const data = {...props.data};
    const text =
        <div>
            <p>Ponente: {data.ponente}</p>
            <p>Hora: {data.hora}</p>
            <p>Fecha: {data.fechaEvento}</p>
            <p>Salon: {data.salon}</p>
            <p>Cupos disponibles: {data.cupo - data.numeroInscritos}/{data.cupo}</p>
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
                {data.active ? "DESINSCRIBIRSE" : "INSCRIBIRSE"}
            </Button>;
        } else {
            bottom = <Button color="secondary"
                             className={style.btn}
                             onClick={(event) => props.handler(event, data._id, data.numeroDia)}
            >
                {data.active ? "DESINSCRIBIRSE" : "INSCRIBIRSE"}
            </Button>;
        }
    }
    return (
        <Card tag={"div"} outline color="secondary">
            <CardHeader tag={"h4"}>{data.nombre}</CardHeader>
            <CardBody>
                {text}
                {bottom}
                {data.numeroDia===5?"Disponible si se ha asistido a almenos 2 cursos":""}
            </CardBody>
        </Card>
    );
};

cursosCard.propTypes = {};