import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Navbar, Nav, Dropdown, Form, ButtonToolbar, Button, Divider } from 'rsuite';
import { fetchAllCourse, saveCourse, takeCourse } from '../redux/resources/courseResources';

function SideNav() {

    const dispatch = useDispatch()

    const courseInfo = useSelector((state: RootStateOrAny) => state.courseInfo)
    const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)

    const [coursename, setCoursename] = useState('')

    useEffect(() => {
        dispatch(fetchAllCourse())
    }, [courseInfo.added])

    const addCourse = () => {
        let payload = {
            "teacher": authInfo.userInfo ? authInfo.userInfo.user_data.id : null,
            "name": coursename,
        }
        dispatch(saveCourse(payload))
    }

    const takeCourses = (id:any) => {
        let payload = {
            "id": id,
            "student": authInfo.userInfo ? [authInfo.userInfo.user_data.id] : null,
        }
        dispatch(takeCourse(payload))
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
                <Button color="green" appearance="subtle" onClick={() => takeCourses(row.id)}>Take</Button>
            </ButtonToolbar>,
        },
    ];

    return (
        <div style={{ paddingLeft: "1vw" }}>
            <Form fluid>
                <Form.Group controlId="course-1">
                    <Form.ControlLabel>Course Name</Form.ControlLabel>
                    <Form.Control name="course" onChange={(e: any) => setCoursename(e)} />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button color="green" appearance="ghost" onClick={addCourse}>Add Course</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form >
            <Divider />
            <DataTable
                title="All Courses"
                columns={columns}
                data={courseInfo.allCourse ? courseInfo.allCourse : []}
            />
        </div>
    );
}

export default SideNav;
