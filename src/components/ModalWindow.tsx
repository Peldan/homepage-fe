import { Modal } from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import {FormControl, InputGroup} from "react-bootstrap/esm";

export interface ModalWindowProps {
    title: string;
    onConfirm: (...args: any[]) => any;
    onClose: (...args: any[]) => any;
    isOpen: boolean;
}

export interface ModalWindowState {
    url: string
}

export class ModalWindow extends React.Component<ModalWindowProps, ModalWindowState>{

    constructor(props: ModalWindowProps) {
        super(props);
        this.state = {
            url: ""
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e: any){
        this.setState({url: e.target.value});
    }

    render(){
        return (
            <Modal show={this.props.isOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="basic-url">RSS URL</label>
                    <InputGroup className="mb-3">
                        <FormControl onChange={this.handleInput} id="basic-url" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="primary" onClick={() => this.props.onConfirm(this.state.url)}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}