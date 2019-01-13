import React from 'react';
import {Button, Container, Form, FormGroup, Input, Label, FormText} from "reactstrap";

export const loginForm = (props) => {
    const form={...props.form};
    return (
        <Container className={"justify-content-center"}>
            <h2>Log In</h2>
            <br/>
            <Form className="form">
                <FormGroup>
                    <Label for={"carnet"}>Carnet</Label>
                    <Input
                        type="number"
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
                    <Label for="password">Password</Label>
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