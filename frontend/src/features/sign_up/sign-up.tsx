import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonToolbar, FlexboxGrid, Form } from 'rsuite';
import { saveUser } from '../../common/redux/resources/userResources';

function SignUp() {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        let payload = {
            "name": name,
            "email": email,
            "user_name": username,
            "password": password
        }
        name === "" || password === "" || username === "" || email === "" ?
            window.alert('Fill the form properly') : password.length < 4 ?
                window.alert('password should be minimum 4 charecter')
                : dispatch(saveUser(payload)); window.alert('Alert ms not seted! check network log user created or not!');



    }


    return (
        <>
            <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>
                <Form.Group controlId="Name-1">
                    <Form.ControlLabel>Name</Form.ControlLabel>
                    <Form.Control name="name" onChange={(e: any) => setName(e)} />
                </Form.Group>

                <Form.Group controlId="UserName-2">
                    <Form.ControlLabel>User Name</Form.ControlLabel>
                    <Form.Control name="user name" onChange={(e: any) => setUsername(e)} />
                </Form.Group>

                <Form.Group controlId="Name-1">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" onChange={(e: any) => setEmail(e)} />
                </Form.Group>

                <Form.Group controlId="Name-1">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type='password' onChange={(e: any) => setPassword(e)} />
                </Form.Group>

                <ButtonToolbar >
                    <Button appearance="primary" onClick={submit}>
                        Sign Up
                    </Button>
                </ButtonToolbar>
            </Form>
        </>
    );
}

export default SignUp;
