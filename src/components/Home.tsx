import React from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Container from "react-bootstrap/esm/Container";
import {ContentBox} from "./ContentBox";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import {Header} from "./Header";
import {Weather} from "./Weather";
import CardColumns from "react-bootstrap/esm/CardColumns";


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
        fetch('https://homepage-be.herokuapp.com/wakeup').then(r => console.log("told backend to stop snoozing: " + r.status));
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
                this.buildCols(3, i)
            )
        }
        return rows;
    }

    render() {
        const rows = this.buildRows(this.state.rowCount);
        return (
            <div>
                <Header/>
                <Container fluid className={"d-flex flex-column"}>
                    <Jumbotron className="text-center" fluid>
                        <Container>
                            <Weather location={this.state.location}/>
                            <h1 className="heading">Simply the best homepage in the world</h1>
                            <Button className={"mx-1 my-2"} color={"primary"} onClick={this.addRow}>Add</Button>
                            <Button className={"my-2"} variant="outline-secondary" onClick={this.deleteRow}>Delete</Button>
                        </Container>
                    </Jumbotron>
                </Container>
                <Container className="py-3 bg-light h-100">
                    <CardColumns>
                        {rows}
                    </CardColumns>
                </Container>
            </div>
        );
    }
}