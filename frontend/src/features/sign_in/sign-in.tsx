import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonToolbar, Form } from 'rsuite';
import { signIn } from '../../common/redux/resources/authResources';

function SignIn() {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    console.log(username, password)

    const submit = () => {

        let payload= {
            "user_name": username,
            "password": password
        }
        dispatch(signIn(payload))

    }

    return (
        <>
            <Form fluid style={{width:"500px", justifyContent:"center", margin:"auto"}}>
                <Form.Group controlId="name-1">
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control name="name" onChange={(e:any)=>setUsername(e)}/>
                    <Form.HelpText>Required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="password-1">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" onChange={(e:any)=>setPassword(e)}/>
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={submit}>Submit</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </>
    );
}

export default SignIn;
