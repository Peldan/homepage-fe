import {Modal} from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import {FormControl, InputGroup, Tab} from "react-bootstrap/esm";
import Tabs from "react-bootstrap/esm/Tabs";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import {RSS_PRESETS} from "../constants";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export interface ModalWindowProps {
    title: string;
    onConfirm: (...args: any[]) => any;
    onClose: (...args: any[]) => any;
    isOpen: boolean;
}

export interface ModalWindowState {
    url: string
}

export class ModalWindow extends React.Component<ModalWindowProps, ModalWindowState> {

    constructor(props: ModalWindowProps) {
        super(props);
        this.state = {
            url: ""
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e: any) {
        this.setState({url: e.target.value});
    }

    render() {

        const presets = RSS_PRESETS.map((preset, i) => {
            return (
                <DropdownItem key={i} onClick={() => this.props.onConfirm(preset.url)}>
                    {preset.title}
                </DropdownItem>
            )
        });

        return (
            <Modal show={this.props.isOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="preset" id="modal-tabs">
                        <Tab eventKey="preset" title="Preset">
                            <DropdownButton variant="primary" className="mt-4" id="dropdown-basic-button" title="Välj nyhetssida">
                                {presets}
                            </DropdownButton>
                        </Tab>
                        <Tab eventKey="custom" title="Custom">
                            <label className="mt-3" htmlFor="basic-url">RSS URL</label>
                            <InputGroup className="mb-3">
                                <FormControl onChange={this.handleInput} id="basic-url"/>
                            </InputGroup>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="primary" disabled={this.state.url.length > 5} onClick={() => this.props.onConfirm(this.state.url)}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}