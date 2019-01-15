import React from 'react';
import {Container, Form, FormGroup, Input, Label} from "reactstrap";

export const loginForm = (props) => {
    const form = {...props.form};
    return (
        <Container className={"justify-content-center"}>
            <h2>Iniciar Sesión</h2>
            <br/>
            <Form className="form">
                <FormGroup>
                    <Label for={"carnet"}>Carnet</Label>
                    <Input
                        type="text"
                        name="carnet"
                        id="carnet"
                        bsSize={"lg"}
                        placeholder="Ingresa tu carnet"
                        value={form.carnet}
                        onChange={props.change}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Contaseña</Label>
                    <Input
                        type="password"
                        name="secreto"
                        id="password"
                        bsSize={"lg"}
                        placeholder="Ingresa tu contraseña"
                        onChange={props.change}
                        value={form.secreto}
                    />
                </FormGroup>
            </Form>
        </Container>
    );
};