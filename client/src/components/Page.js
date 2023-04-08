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
import * as cheerio from 'cheerio';

class Page extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitCheck = this.handleSubmitCheck.bind(this);

        this.inputRef = React.createRef();

        this.state = {
            wasValidated: false,//была ли сделена валидация
            formValid: false,//валтдна ли форма
            // validatedMessages: [],
            appId: "",
            checkUrl: "",
            websocketUrls: [],
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
        // input.value = null;
        return input.value;
        // console.log(this.state.checkUrl);
    }

    checkValidityForm(form) {
        this.setState({
            wasValidated: true,
        });

        if (form.checkValidity() === false) {
            this.setState({
                formValid: false,
            });
            return false;

        } else {
            this.setState({
                formValid: true,
            });
            this.setState({
                wasValidated: false,
            });
            return true;
        }

    }

    getLinks(url) {
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                // Load the HTML in Cheerio
                const $ = cheerio.load(html);

                // Select all anchor tags from the page
                const links = $("a")

                // Loop over all the anchor tags
                links.each((index, value) => {
                    // Print the text from the tags and the associated href
                    console.log($(value).text(), " => ", $(value).attr("href"));
                })
            })
            .catch(function (err) {
                console.log('Failed to fetch page: ', err);
            });
    }

    //Start 
    handleSubmitCheck(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        let isVal = this.checkValidityForm(form);
        if (isVal === false) {
            console.log("this.state.formValid === false", this.state.formValid);
            return;
        }

        this.setCheckUrl();
        // console.log("fds", this.state.checkUrl);

        this.ws = new WebSocket(SOCKET_SERVER_ENDPOINT);

        // const checkUrl = this.state.checkUrl;
        const checkUrl = this.setCheckUrl();


        console.log("checkUrl", this.setCheckUrl());
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

        // let validatedMessageBlock;
        // if (this.state.validated === false) {
        //     validatedMessageBlock = <div>{this.state.validatedMessages.map((m) => m)}</div>;
        // }

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
                        <Form noValidate validated={this.state.wasValidated} onSubmit={this.handleSubmitCheck}>
                            <Form.Group className="mb-3" controlId="checkUrl">
                                <Form.Label>Url website</Form.Label>
                                <Form.Control
                                    ref={this.inputRef}
                                    type="url"
                                    placeholder="Enter url here ..."
                                    required
                                />
                                {/* {validatedMessageBlock} */}
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid url.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Ok.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
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