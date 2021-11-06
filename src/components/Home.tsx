import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { ContainerCard } from "./card/ContainerCard";
import Button from "react-bootstrap/esm/Button";
import { Header } from "./Header";
import { Weather } from "./Weather";
import Masonry from 'react-masonry-css'
import { NormalView } from "./NormalView";
import { RssFeedDto } from "../schema";
import { useLocalStorageState } from "./useLocalStorage";

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
    const [viewMode, setViewMode] = useLocalStorageState("viewMode", VIEW_MODE.CARDS)
    const [allRSSItems, setAllRSSItems] = useState<Map<number, RssFeedDto[]>>(new Map());

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(loc => setLocation(loc))
        fetch('https://homepage-be.herokuapp.com/wakeup').then(r => console.log("told backend to stop snoozing: " + r.status));
    }, [])

    const onRssFeedAdded = useCallback((id: number, rss: RssFeedDto[]) => {
        setAllRSSItems(prev => new Map(prev.set(id, rss)))
    }, [])

    const onRssFeedDeleted = useCallback((id) => {
        setAllRSSItems(prev => new Map(Array.from(prev).filter(entry => entry[0] !== id)));
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
                <ContainerCard
                    onRSSFeedAdded={onRssFeedAdded}
                    onRSSFeedDeleted={onRssFeedDeleted}
                    key={id}
                    id={id} />
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

    return ( //TODO replace "Mode" button with an actual toggle
        <div>
            <Header />
            <Container fluid className={"d-flex flex-column"}>
                <div className="container-fluid p-5 text-light text-center">
                    <Container>
                        <Weather location={location} />
                        <h1 className="heading" style={{ color: "#212529" }}>Simply the best homepage in the world</h1>
                        {viewMode === VIEW_MODE.CARDS &&
                            <>
                                <Button className={"mx-1 my-2"} color={"primary"} onClick={addRow}>Add</Button>
                                <Button className={"my-2"} variant="outline-secondary" onClick={deleteRow}>Delete</Button>
                            </>
                        }
                        <br />
                        <Button className={"my-2"} variant="outline-secondary"
                            onClick={() =>
                                setViewMode(viewMode === VIEW_MODE.NORMAL ? VIEW_MODE.CARDS : VIEW_MODE.NORMAL)}>
                            Switch mode
                        </Button>
                    </Container>
                </div>
            </Container>
            <Container className={`py-3 ${viewMode === VIEW_MODE.CARDS && 'bg-light'} h-100`}>
                {viewMode === VIEW_MODE.CARDS
                    ? <Masonry
                        breakpointCols={3}
                        className="masonry-grid"
                        columnClassName="masonry-col">
                        {buildRows(rowCount)}
                    </Masonry>
                    : <NormalView rssItems={Array.from(allRSSItems.values())}/>}

            </Container>
        </div>
    )

}