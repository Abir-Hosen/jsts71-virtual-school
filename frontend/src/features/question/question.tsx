import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, Form, Input, SelectPicker, Divider, PanelGroup, Panel, List } from 'rsuite';
import { fetchTeacherCourses } from '../../common/redux/resources/courseResources';
import { fetchCourseQuestion, fetchTeachersQuestion, saveQuestion } from '../../common/redux/resources/questionResources';

function Question() {

    const dispatch = useDispatch()

    const [question, setQuestion] = useState('')
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const [answer, setAnswer] = useState('')
    const [course, setCourse] = useState('')

    const courseInfo = useSelector((state: RootStateOrAny) => state.courseInfo)
    const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)
    const questionInfo = useSelector((state: RootStateOrAny) => state.questionInfo)

    useEffect(() => {
        dispatch(fetchTeacherCourses(authInfo.userInfo ? authInfo.userInfo.user_data.id : 0))
        dispatch(fetchTeachersQuestion(authInfo.userInfo ? authInfo.userInfo.user_data.id : 0))
        dispatch(fetchCourseQuestion(1))
    }, [])


    const submit = () => {
        question === "" || optionOne === "" || optionTwo === "" || course === "" ? window.alert('Set question properly ') : console.log('ok')
        let payload = {
            "question": question,
            "options": { option_one: optionOne, option_two: optionTwo, },
            "teacher": authInfo.userInfo ? authInfo.userInfo.user_data.id : 0,
            "course": { id: course },
            "answer": answer
        }
        dispatch(saveQuestion(payload))

    }

    const columns = [
        {
            name: 'Id',
            selector: (row: any) => row.id,
        },
        {
            name: 'Name',
            selector: (row: any) => row.question,
        },
        {
            name: 'Options',
            selector: (row: any) =>
                <List>
                    <List.Item>i. &nbsp; &nbsp;{row.options.option_one}</List.Item>
                    <List.Item>ii. &nbsp; {row.options.option_two}</List.Item>
                </List>
        },
        {
            name: 'Answer',
            selector: (row: any) => row.answer
        },
    ]

    return (
        <>
            <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>

                <Form.Group controlId="Option one">
                    <Form.ControlLabel>Select Course</Form.ControlLabel>
                    <SelectPicker onChange={(e: any) => setCourse(e)} placeholder="Select Course" data={courseInfo.selectTeacherCourse ? courseInfo.selectTeacherCourse : []} style={{ width: 500 }} />
                </Form.Group>
                <Form.Group controlId="textarea">
                    <Form.ControlLabel>Question</Form.ControlLabel>
                    <Input rows={5} name="textarea" onChange={(e: any) => setQuestion(e)} as="textarea" />
                    {/* <Form.Control rows={5} name="textarea" accepter={Textarea} /> */}
                </Form.Group>
                <Form.Group controlId="Option one">
                    <Form.Control name="Option one" onChange={(e: any) => setOptionOne(e)} placeholder="Option one" />
                </Form.Group>
                <Form.Group controlId="Option Two">
                    <Form.Control name="Option two" onChange={(e: any) => setOptionTwo(e)} placeholder="Option two" />
                </Form.Group>
                <Form.Group controlId="Answer">
                    <Form.Control name="Answer" onChange={(e: any) => setAnswer(e)} placeholder="Answer" />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={submit}>Submit</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
            <Divider />
            <h3>Questions</h3><br />
            <PanelGroup accordion bordered>
                <Panel header="My Questions" defaultExpanded>

                    <DataTable
                        columns={columns}
                        data={questionInfo.allQuestion ? questionInfo.allQuestion : []}
                    />
                </Panel>
            </PanelGroup>
        </>
    );
}

export default Question;
