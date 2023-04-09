//Copyright
import React, { Component } from 'react';


class Copyright extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                © {new Date().getFullYear()} {this.props.children}
            </>
        )
    }
}


export default Copyright;