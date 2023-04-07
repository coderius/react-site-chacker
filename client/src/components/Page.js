// Main page
import React, { Component } from 'react';
import { SOCKET_SERVER_ENDPOINT } from '../config/app';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

class Page extends Component {

    constructor(props) {
        super(props);

        this.hendlerClickCheck = this.hendlerClickCheck.bind(this);

        this.inputRef = React.createRef();

        this.state = {
            appId: "",
            checkUrl: "",
            urls: [],
        };
    }

    componentDidMount() {
        this.setState({
            appId: (Math.random() + 1).toString(36).substring(7),
        });
    }

    //Input set number change hendler
    setCheckUrl() {
        const input = this.inputRef.current;
        this.setState({
            checkUrl: input.value
        });
        input.value = null;
        // console.log(this.state.checkUrl);
    }


    //Start 
    hendlerClickCheck(e) {
        e.preventDefault();
        this.setCheckUrl();

        this.ws = new WebSocket(SOCKET_SERVER_ENDPOINT);

        const checkUrl = this.state.checkUrl;
        const appId = this.state.appId;
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({ event: "check-url", payload: { appId, checkUrl } }));
            console.log("Connection WebSocket Open!");
        };

        this.ws.onclose = () => {
            alert("Подключение окончено");
        };

        // conn.onmessage = e => setMessages([...messages,JSON.parse(e.data)])
        this.ws.onmessage = (event) => {
            console.log(event.data);
        }

        this.ws.onerror = (event) => {
            console.log("WS Error", event);
        };
    }

    render() {

        return (

            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Check url</Breadcrumb.Item>
                </Breadcrumb>


                <Row>
                    <Col><h1>Check website links</h1></Col>
                </Row>

                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Url website</Form.Label>
                                <Form.Control ref={this.inputRef} type="text" placeholder="Enter url here ..." />
                            </Form.Group>
                            <Button onClick={this.hendlerClickCheck} variant="primary" type="submit">
                                Check
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <h5 className="mt-3">Result for url: <i>{this.state.checkUrl}</i></h5>
                        <Table striped bordered hover size="sm" className="mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Url</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>


            </Container>
        )
    }
}


export default Page;