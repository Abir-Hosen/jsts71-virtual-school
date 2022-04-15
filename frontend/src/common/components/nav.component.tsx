import React from 'react';
import { Navbar, Nav, Dropdown } from 'rsuite';
import { Link } from "react-router-dom";
import { clearState } from '../redux/resources/authResources';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

function NavBar() {

    const dispatch = useDispatch()
    
  const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)

    const signOut = () => {
        dispatch(clearState())
    }

    return (
        <Navbar appearance="inverse" >
            <Navbar.Brand>Our App</Navbar.Brand>
            <Nav >
                <Nav.Item eventKey="1">
                    <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item eventKey="2"><Link to="/question">Create Question</Link></Nav.Item>
                <Nav.Item eventKey="3"><Link to="/exam">Take Exam</Link></Nav.Item>
            </Nav>
            <Nav pullRight>
                <Dropdown title={authInfo.userInfo?authInfo.userInfo.user_data.name:'no name found'} placement="bottomEnd">
                    <Dropdown.Item eventKey="4">{authInfo.userInfo?authInfo.userInfo.user_data.email:'no email found'}</Dropdown.Item>
                    <Dropdown.Item eventKey="5"><Link to="/profile/profile-name">View Profile</Link></Dropdown.Item>
                    <Dropdown.Item eventKey="6"><Link to="/sign-up">Sign Up</Link></Dropdown.Item>
                    <Dropdown.Item eventKey="7"><Link to="/sign-in">Sign In</Link></Dropdown.Item>
                    <Dropdown.Item eventKey="8" onClick={signOut}>Sign Out</Dropdown.Item>
                </Dropdown>
            </Nav>
        </Navbar>
    );
}

export default NavBar;
