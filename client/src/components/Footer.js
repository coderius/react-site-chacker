import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Copyright from './Copyright';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Copyright>
                            All rights reserved | link <a href="https://github.com/coderius/react-site-chacker">github.com/coderius/react-site-chacker</a>
                        </Copyright>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Footer;