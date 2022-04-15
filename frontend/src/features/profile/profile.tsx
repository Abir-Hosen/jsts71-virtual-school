import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, FlexboxGrid, Form, List, Panel, PanelGroup } from 'rsuite';
import { fetchUserCourses } from '../../common/redux/resources/courseResources';
import { updatePassword, updateUser } from '../../common/redux/resources/userResources';

function Profile() {


    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const courseInfo = useSelector((state: RootStateOrAny) => state.courseInfo)
    const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)

    useEffect(() => {
        dispatch(fetchUserCourses(authInfo.userInfo ? authInfo.userInfo.user_data.id : 0))
        setName(courseInfo.userCourse ? courseInfo.userCourse.name : 'No Name')
    }, [courseInfo.added])


    const removeCourses = (id: any) => {
        let payload = {
            "course_id": id,
            "user_id": 1
        }
        // dispatch(takeCourse(payload))
    }

    const submit = () => {
        name === "" ? window.alert('Enter Name') : console.log('ok')
        let payload = {
            "id": courseInfo.userCourse ? courseInfo.userCourse.id : 0,
            "name": name
        }
        dispatch(updateUser(payload))
    }

    const change = () => {
        password === "" || newPassword === "" || confirmPassword === "" ? window.alert('Please enter password') : newPassword != confirmPassword ? window.alert('Password doesn\'t match!') : newPassword.length < 4 ? window.alert('password should be minimum 4 charecter') : console.log('ok')
        let payload = {
            "id": courseInfo.userCourse ? courseInfo.userCourse.id : 0,
            "password": password,
            "new_password": newPassword
        }
        dispatch(updatePassword(payload))
    }

    const columns = [
        {
            name: 'Id',
            selector: (row: any) => row.id,
        },
        {
            name: 'Name',
            selector: (row: any) => row.name,
        },
        {
            name: 'Action',
            selector: (row: any) => <ButtonToolbar>
                <Button color="red" appearance="subtle" onClick={() => removeCourses(row.id)}>Remove Course</Button>
            </ButtonToolbar>,
        },
    ];

    return (
        <>
            <PanelGroup accordion bordered>
                <Panel header="User Details" defaultExpanded>
                    <List sortable>
                        <List.Item>
                            <FlexboxGrid>
                                <FlexboxGrid.Item colspan={6}>
                                    Name
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    :
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    {courseInfo.userCourse ? courseInfo.userCourse.name : 'No Name'}
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                        <List.Item>
                            <FlexboxGrid>
                                <FlexboxGrid.Item colspan={6}>
                                    User Name
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    :
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    {courseInfo.userCourse ? courseInfo.userCourse.user_name : 'No user name'}
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                        <List.Item>
                            <FlexboxGrid>
                                <FlexboxGrid.Item colspan={6}>
                                    Email
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    :
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={6}>
                                    {courseInfo.userCourse ? courseInfo.userCourse.email : 'No email'}
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    </List>
                </Panel>
                {authInfo.role === 'student' ?
                    <Panel header="User Courses">
                        <DataTable
                            columns={columns}
                            data={courseInfo.userCourse ? courseInfo.userCourse.courses : []}
                        />
                    </Panel> : ''}
                <Panel header="Update User Info">
                    <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>
                        <Form.Group controlId="name-1">
                            <Form.ControlLabel>Name</Form.ControlLabel>
                            <Form.Control name="name" value={name} onChange={(e: any) => setName(e)} />
                            <Form.HelpText>Required</Form.HelpText>
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={submit}>Update</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>

                <Panel header="Update Password">
                    <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>
                        <Form.Group controlId="password-1">
                            <Form.ControlLabel>Old Password</Form.ControlLabel>
                            <Form.Control name="password" type="password" autoComplete="off" onChange={(e: any) => setPassword(e)} />
                        </Form.Group>
                        <Form.Group controlId="password-2">
                            <Form.ControlLabel>New Password</Form.ControlLabel>
                            <Form.Control name="password" type="password" autoComplete="off" onChange={(e: any) => setNewPassword(e)} />
                        </Form.Group>
                        <Form.Group controlId="password-3">
                            <Form.ControlLabel>Confirm New Password</Form.ControlLabel>
                            <Form.Control name="password" type="password" autoComplete="off" onChange={(e: any) => setConfirmPassword(e)} />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={change}>Change Password</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>
            </PanelGroup>
        </>
    );
}

export default Profile;
