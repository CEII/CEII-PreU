import React from 'react';
import {FormFeedback, Button, FormText, Form, FormGroup, Input, Label} from 'reactstrap';

export const signupForm = (props) => {
    const color=props.valid?"success":"danger";
    return (
        <Form>
            <h2>Registrate</h2>
            <FormGroup>
                <Label>Nombre</Label>
                <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingresa tu nombre"
                    onChange={props.change}
                    value={props.data["nombre"]}
                />
            </FormGroup>
            <FormGroup>
                <Label>Apellido</Label>
                <Input
                    type="text"
                    name="apellido"
                    id="apellido"
                    placeholder="Ingresa tu apellido"
                    onChange={props.change}
                />
            </FormGroup>
            <FormGroup>
                <Label>Carnet</Label>
                <Input
                    type="number"
                    name="carnet"
                    id="carnet"
                    placeholder="Ingresa tu carnet"
                    onChange={props.change}
                    invalid={!props.carnet}
                />
                <FormFeedback>Este carnet ya ha sido utilizado</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Contraseña</Label>
                <Input
                    type="password"
                    name="secreto"
                    id="password"
                    bsSize={"lg"}
                    placeholder={"Ingresa una contraseña"}
                    onChange={props.change}
                    onBlur={props.blur}
                    value={props.data["secreto"]}
                >
                </Input>
                <FormText color={color}>
                    Minimo 8 caracteres
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label>Horario</Label>
                <Input
                    type="select"
                    name="horario"
                    id="horario"
                    onChange={props.change}
                >
                    <option value={"mañana"} >Mañana</option>
                    <option value={"tarde"}>Tarde</option>
                </Input>
                <FormText color="muted">
                    Horario en el que deseas inscribir los cursos a impartir
                </FormText>
            </FormGroup>
        </Form>
    );
};