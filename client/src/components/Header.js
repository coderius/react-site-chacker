import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from './Logo';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      
        <Row>
          <Col>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#/">
                <Logo>
                  <span className="text-warning ms-4">Website SEO Tools</span>
                </Logo>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#/">Home</Nav.Link>
                  <Nav.Link href="#/page-link-analyzer">Page link analyzer</Nav.Link>
                  <Nav.Link href="#/website-link-analyzer">Website link analyzer</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      



    )
  }
}


export default Header;