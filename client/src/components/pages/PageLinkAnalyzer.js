// Main page
import React, { Component } from 'react';
import { SOCKET_SERVER_ENDPOINT } from '../../config/app';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import * as cheerio from 'cheerio';
import { connect } from 'react-redux';
import {
    setCheckUrl,
    // setBaseUrl, 
    pushUrl,
    serverError,
    clearUrls,
    startPopulateUrls,
    endPopulateUrls
} from '../../store/actions/urlActions';
import Alert from 'react-bootstrap/Alert';

import {
    POPULATE_URLS_STARTING,
    POPULATE_URLS_ENDING
} from '../../store/actions/events';

import Spinner from 'react-bootstrap/Spinner';

class PageLinkAnalyzer extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitCheck = this.handleSubmitCheck.bind(this);

        this.inputRef = React.createRef();

        this.state = {
            wasValidated: false,//была ли сделена валидация
            formValid: false,//валтдна ли форма
            // validatedMessages: [],
            appId: "",
            // checkUrl: "",
            // websocketUrls: [],
        };
    }

    componentDidMount() {
        this.props.clearUrls();
        this.setState({
            appId: (Math.random() + 1).toString(36).substring(7),
        });
    }

    //Input set number change hendler
    setCheckUrl() {
        const input = this.inputRef.current;
        const url = input.value;

        // var pathArray = url.split( '/' );
        // var protocol = pathArray[0];
        // var host = pathArray[2];
        // var baseUrl = protocol + '//' + host;
        this.props.clearUrls();
        this.props.setCheckUrlAction(url);
        // this.props.setBaseUrlAction(baseUrl);//redux
        // input.value = null;
        return url;
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

    //Start 
    handleSubmitCheck(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        let isVal = this.checkValidityForm(form);
        if (isVal === false) {
            // console.log("this.state.formValid === false", this.state.formValid);
            return;
        }

        this.ws = new WebSocket(SOCKET_SERVER_ENDPOINT);

        // const checkUrl = this.state.checkUrl;
        const checkUrl = this.setCheckUrl();
        // console.log("checkUrl", this.setCheckUrl());
        const appId = this.state.appId;

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({ event: "onCheckUrl", payload: { appId, checkUrl } }));
            console.log("Connection WebSocket Open!");
        };

        this.ws.onclose = () => {
            console.log("Подключение окончено");
        };

        // conn.onmessage = e => setMessages([...messages,JSON.parse(e.data)])
        this.ws.onmessage = (event) => {
            let json = JSON.parse(event.data);
            let links = json.result;
            let error = json.error;
            if (error !== undefined) {
                this.props.serverError(error);
                console.log(error);
            } else {
                const map = new Map(Object.entries(links));
                this.props.startPopulateUrls();

                const mp = (map, props) => {
                    new Promise(function (resolve, reject) {
                        map.forEach((value, key, map) => {
                            let params = {
                                href: value.href
                            };
                            props.pushUrl(params);
                        });
                        // resolve();
                        return setTimeout(resolve, 2000);
                    })
                        .then(() => {
                            props.endPopulateUrls();
                        });
                }

                mp(map, this.props);



                // map.forEach((value, key, map) => {
                //     let params = {
                //         href: value.href
                //     };
                //     this.props.pushUrl(params);
                // });
                // this.props.endPopulateUrls();
                // map.forEach((value, key, map) => {
                //     let params = {
                //         href: value.href
                //     };
                //     this.props.pushUrl(params);
                // });
                // this.props.endPopulateUrls();

                // this.props.setUrls(Array.from(links));
                // console.log(Array.from(links));

                // if(links.length > 0){

                // const map = new Map(Object.entries(json));
                // map.forEach((value, key, map) => {
                //     // console.log(value.href);
                //     this.props.checkUrlAction(value.href);
                // });
                // }
            }

            // console.log(json.length);
            // console.log(json);
            this.ws.close();
        }

        this.ws.onerror = (event) => {
            console.log("WS Error", event);
        };
    }

    render() {
        console.log(this.props.loading);
        // this.props.urlReduxState.urls.map((currentValue, index, arr) => ( console.log(currentValue) ));
        return (

            <Container fluid>
                <Row>
                    <Col><h1>Check links in webpage</h1></Col>
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
                                {
                                    this.props.loading ?
                                        <><Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                            <span> Loading...</span></>
                                        :
                                        <span> Check</span>
                                }

                            </Button>
                        </Form>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        {this.props.loading ?
                            <Spinner variant="success" animation="border" role="status"  style={{ width: "4rem", height: "4rem" }} className="position-absolute top-50 start-50">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : ""}
                        {
                            this.props.urlReduxState.serverError === null
                                ?
                                this.props.countUrls > 0 ?
                                    <>
                                        <h5 className="mt-3">Faunded {this.props.countUrls} links in url: <i>{this.props.urlReduxState.checkUrl} </i></h5>
                                        <Table striped bordered hover size="sm" className="mt-3">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Url</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.urlReduxState.urls.map((currentValue, index, arr) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>"{currentValue.href}"</td>
                                                        <td>status</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                    </>
                                    : this.props.onPopulateUrlsEnded ?
                                        <Alert variant='info'>
                                            Urls not found on this page: {this.props.urlReduxState.checkUrl}
                                        </Alert>
                                        : <></>

                                :
                                <Alert variant='danger'>
                                    {this.props.urlReduxState.serverError}
                                </Alert>

                        }
                    </Col>
                </Row>


            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        urlReduxState: state.urlReducer,
        countUrls: state.urlReducer.urlsCount,
        onPopulateUrlsStarted: state.urlReducer.onPopulateUrls === POPULATE_URLS_STARTING,
        onPopulateUrlsEnded: state.urlReducer.onPopulateUrls === POPULATE_URLS_ENDING,
        loading: state.urlReducer.loading,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pushUrl: url => {
            dispatch(pushUrl(url));
        },
        serverError: e => {
            dispatch(serverError(e));
        },
        // checkUrlAction: url => {
        //     dispatch(checkUrl(url));
        // },
        // setBaseUrlAction: url => {
        //     dispatch(setBaseUrl(url));
        // }, 
        setCheckUrlAction: url => {
            dispatch(setCheckUrl(url));
        },
        clearUrls: () => {
            dispatch(clearUrls());
        },
        startPopulateUrls: () => {
            dispatch(startPopulateUrls());
        },
        endPopulateUrls: () => {
            dispatch(endPopulateUrls());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageLinkAnalyzer);
// export default PageLinkAnalyzer;