import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Container from "react-bootstrap/esm/Container";
import { ContainerCard } from "./card/ContainerCard";
import Button from "react-bootstrap/esm/Button";
import { Header } from "./Header";
import { Weather } from "./Weather";
import CardColumns from "react-bootstrap/esm/CardColumns";


export interface HomeState {
    rowCount: number;
    location: GeolocationPosition | undefined
}

enum VIEW_MODE {
    CARDS,
    NORMAL
}

export const Home = (): JSX.Element => {
    const [rowCount, setRowCount] = useState(1);
    const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined);
    const [viewMode, setViewMode] = useState(VIEW_MODE.NORMAL);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(loc => setLocation(loc))
        fetch('https://homepage-be.herokuapp.com/wakeup').then(r => console.log("told backend to stop snoozing: " + r.status));
    }, [])

    const buildRows = (rowCount: number) => {
        let rows = [];
        for (let i = 1; i <= rowCount; i++) {
            rows.push(
                buildCols(3, i)
            )
        }
        return rows;
    }

    const buildCols = (colCount: number, row: number) => {
        let cols = [];
        for (let i = 1; i <= colCount; i++) {
            const id = row * i;
            cols.push(
                <ContainerCard key={id} id={id} />
            )
        }
        return cols;
    }

    const addRow = () => {
        setRowCount(rowCount + 1);
    }

    const deleteRow = () => {
        if (rowCount > 0) {
            setRowCount(rowCount - 1);
        }
    }


    return (
        <div>
            <Header />
            <Container fluid className={"d-flex flex-column"}>
                <Jumbotron className="text-center" fluid>
                    <Container>
                        <Weather location={location} />
                        <h1 className="heading">Simply the best homepage in the world</h1>
                        <Button className={"mx-1 my-2"} color={"primary"} onClick={addRow}>Add</Button>
                        <Button className={"my-2"} variant="outline-secondary" onClick={deleteRow}>Delete</Button>
                    </Container>
                </Jumbotron>
            </Container>
            <Container className="py-3 bg-light h-100">
                <CardColumns>
                    {
                       buildRows(rowCount)
                    }
                </CardColumns>
            </Container>
        </div>
    )

}