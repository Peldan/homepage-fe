import React from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Container from "react-bootstrap/esm/Container";
import {ContentBox} from "./ContentBox";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import {Header} from "./Header";
import {Weather} from "./Weather";


export interface HomeState {
    rowCount: number;
    location: Position | undefined
}

function defaultState(): HomeState {
    return {
        rowCount: 1,
        location: undefined
    }
}

export class Home extends React.Component<{}, HomeState> {

    constructor() {
        super({});
        this.state = defaultState();
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((loc) => {
            this.setState({location: loc});
        });
    }

    addRow() {
        this.setState({rowCount: this.state.rowCount + 1});
    }

    deleteRow() {
        this.setState({rowCount: this.state.rowCount - 1});
    }

    buildCols(count: number, row: number) {
        let cols = [];
        for (let i = 1; i <= count; i++) {
            cols.push(
                <ContentBox id={row * i}/>
            )
        }
        return cols;
    }

    buildRows(count: number) {
        let rows = [];
        for (let i = 1; i <= count; i++) {
            rows.push(
                <Row key={i} className={"justify-content-center"}>
                    {this.buildCols(3, i)}
                </Row>
            )
        }
        return rows;
    }

    render() {
        const rows = this.buildRows(this.state.rowCount);
        return (
            <div>
                <Header/>
                <Container>
                    <Jumbotron className="text-center" fluid>
                        <Container>
                            <Weather location={this.state.location}/>
                            <h1 className="heading">Simply the best homepage in the world</h1>
                            <Button className={"mx-1 my-2"} color={"primary"} onClick={this.addRow}>Add row</Button>
                            <Button className={"my-2"} variant="outline-secondary" onClick={this.deleteRow}>Delete
                                row</Button>
                        </Container>
                    </Jumbotron>
                </Container>
                <div className="rsscontainer py-5 bg-light">
                    {rows}
                </div>
            </div>
        );
    }
}