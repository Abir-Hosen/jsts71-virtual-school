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

function App(props: any) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)

  useEffect(() => {
    authInfo.userInfo == null? navigate('/sign-in'): navigate('/')
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
              <Route path="/profile/:profile-name" element={<Profile />} />
              <Route path="/question" element={<Question />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Routes>
          </Content>
          <Sidebar style={{width:"30vw"}}>
            <SideNav />
          </Sidebar>
        </Container>
        <Footer>powered by @ Abir Hosen Ashik</Footer>
      </Container>
    </div>
  );
}

export default App;
