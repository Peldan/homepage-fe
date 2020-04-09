import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/esm/Container";
import Collapse from "react-bootstrap/esm/Collapse";
import React from "react";

export class Header extends React.Component<any, any> {
    render() {
        return (
            <header>
                <Navbar bg="dark">
                    <a className="navbar-brand" href="#">⌂</a>
                </Navbar>
            </header>
        );
    }
}