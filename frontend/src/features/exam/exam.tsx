import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Button, Col, Divider, Form, List, Panel, PanelGroup, Radio, RadioGroup, Row, SelectPicker } from 'rsuite';
import { fetchUserCourses } from '../../common/redux/resources/courseResources';
import { fetchCourseQuestion } from '../../common/redux/resources/questionResources';



interface answerT {
    id: number;
    selected: string;
    answer: string;
    correct: boolean,
}

interface Result {
    total: number,
    obtain: number
}

function Exam() {


    const dispatch = useDispatch()
    const [course, setCourse] = useState('')
    const [value, setValue] = useState<answerT[]>([])
    const [result, setResult] = useState<Result>()
    const [showResult, setShowResult] = useState(false)
    const [startExam, setStartExam] = useState(false)

    const courseInfo = useSelector((state: RootStateOrAny) => state.courseInfo)
    const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)
    const questionInfo = useSelector((state: RootStateOrAny) => state.questionInfo)

    useEffect(() => {
        dispatch(fetchUserCourses(authInfo.userInfo ? authInfo.userInfo.user_data.id : 0))
    }, [courseInfo.added])

    useEffect(() => {
        dispatch(fetchCourseQuestion(course))
    }, [course])

    const answerValue = async (row: any, secleted: string) => {
        let answer: answerT = {
            id: row.id,
            selected: secleted,
            answer: row.answer,
            correct: secleted === row.answer,
        }

        let data = value
        let found = _.find(value, { id: row.id })
        if (found) {
            data = await _.filter(data, (x: any) => { return x.id !== row.id })
            data.push(answer)
        } else await data.push(answer)
        await setValue(data)
    }

    console.log(value)

    const columns = [
        {
            name: 'Id',
            selector: (row: any) => row.id,
        },
        {
            name: 'Question',
            selector: (row: any) => row.question,
        },
        {
            name: 'Options',
            selector: (row: any) =>
                <List>
                    <List.Item><Radio checked={row.options.option_one === _.find(value, { id: row.id })?.selected} onClick={() => answerValue(row, row.options.option_one)}>i. &nbsp; &nbsp;{"_" + row.id + "_" + row.options.option_one}</Radio></List.Item>
                    <List.Item><Radio checked={row.options.option_two === _.find(value, { id: row.id })?.selected} onClick={() => answerValue(row, row.options.option_two)}>ii. &nbsp; {row.options.option_two}</Radio></List.Item>
                </List>
        }
    ]

    const submitAnswer = () => {
        setStartExam(!startExam)
        let total: number = questionInfo.courseQuestions ? questionInfo.courseQuestions.length : 0
        let obtain = _.filter(value, { correct: true })
        setResult({ total: total, obtain: obtain.length })
        setShowResult(true)

    }

    return (
        <>
            <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>

                <Form.Group controlId="Option">
                    <Form.ControlLabel>Select Course</Form.ControlLabel>
                    <SelectPicker onChange={(e: any) => setCourse(e)} placeholder="Select Course" data={courseInfo.examCourses ? courseInfo.examCourses : []} style={{ width: 500 }} />
                </Form.Group>

                <Form.Group controlId="button">
                    <Button color="green" appearance="ghost" onClick={() => { setStartExam(!startExam); setShowResult(false) }} disabled={course === ''}>
                        Start Exam
                    </Button>
                </Form.Group>
            </Form>
            <div hidden={!showResult}>
            <Divider />
                <Row className="show-grid" style={{ width: "500px", justifyContent: "center", margin: "auto" }}>
                <h3>Results</h3><br />
                </Row>
                <Row className="show-grid" style={{ width: "500px", justifyContent: "center", margin: "20px auto", border: '1px solid green', borderRadius:'5px', padding:'10px' }}>
                    <Col xs={6}>Total: {(result?result.total:0)*10}</Col>
                    <Col xs={6}>Obtain: {(result?result.obtain:0)*10}</Col>
                    <Col xs={6}>Percentage: {(result?result.obtain/result.total:0)*100}</Col>
                    <Col xs={6}>Status: {(result?result.obtain/result.total:0)<.4?'Failed':'Passed'}</Col>
                </Row>
            </div>
            <div hidden={!startExam}>
                <Divider />
                <h3>Examination</h3><br />
                <PanelGroup accordion bordered>
                    <Panel header="Questions" defaultExpanded>

                        <DataTable
                            columns={columns}
                            data={questionInfo.courseQuestions ? questionInfo.courseQuestions : []}
                        />
                    </Panel>

                    <Form fluid style={{ width: "500px", justifyContent: "center", margin: "auto" }}>
                        <Form.Group controlId="button">
                            <Button block color="green" appearance="ghost" onClick={submitAnswer} disabled={course === ''}>
                                Submit Answer
                            </Button>
                        </Form.Group>
                    </Form>
                </PanelGroup>

            </div>

        </>
    );


}

export default Exam;