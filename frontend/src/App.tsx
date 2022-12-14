import React, { useEffect } from 'react';
import './App.scss';
import 'rsuite/dist/rsuite.min.css'

import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { Routes, Route, useNavigate } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import NavBar from './common/components/nav.component';
import SideNav from './common/components/sidenav.component';
import Dashboard from './features/dashboard/dashboard';
import Profile from './features/profile/profile';
import SignUp from './features/sign_up/sign-up';
import SignIn from './features/sign_in/sign-in';
import Exam from './features/exam/exam';
import Question from './features/question/question';
import { validateToken } from './common/redux/resources/authResources';

function App(props: any) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)


  useEffect(() => {
    let token = authInfo.userInfo == null ? 'no token' : authInfo.userInfo.valid == true ? authInfo.userInfo.Bearer : 'no token'
    dispatch(validateToken({ token: token }))
  }, [])

  useEffect(() => {
    authInfo.userInfo == null ? navigate('/sign-in') : authInfo.userInfo.valid ? navigate('/') : navigate('/sign-in')
  }, [authInfo])

  return (
    <div className="show-container">
      <Container>
        <Header>
          <NavBar />
        </Header>
        <Container>
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {authInfo.role !== 'none' ?
                <Route path="/profile/:profile-name" element={<Profile />} /> : ''}
              {authInfo.role === 'teacher' ?
                <Route path="/question" element={<Question />} /> : ''}
              {authInfo.role === 'student' ?
                <Route path="/exam" element={<Exam />} /> : ''}
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Routes>
          </Content>
          <Sidebar style={{ width: "30vw" }}>
            <SideNav />
          </Sidebar>
        </Container>
        <Footer>powered by @ Abir Hosen Ashik</Footer>
      </Container>
    </div>
  );
}

export default App;
