import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Card, Pagination } from "react-bootstrap/esm/";
import { ModalWindow } from "../ModalWindow";
import { RssFeedDto } from "../../schema";
import { shouldBeRefreshed } from "../../helper";
import CardBody from "react-bootstrap/esm/Card";
import CardFooter from "react-bootstrap/esm/Card"
import Spinner from "react-bootstrap/esm/Spinner";
import { RSSItemCardList } from "./RSSItemCardList";
import { RSSPagination } from "../RSSPagination";
import { fetchRSS } from "../../service/rss-service";

export interface ContainerCardProps {
    id: number,
    onRSSFeedAdded: (id: number, rssFeed: RssFeedDto[]) => void,
    onRSSFeedDeleted: (id: number) => void,
}

interface PersistedState {
    RSSFeed: RssFeedDto[],
    lastUpdated: Date | undefined,
    url: string,
}

const getIndexForPage = (page: number, amountOfPages: number, amountOfItems: number) => {
    const div = Math.floor(amountOfItems / amountOfPages);
    const mod = amountOfItems % amountOfPages;
    let index: number;
    if (key >= (amountOfPages - mod)) {
        index = (div + 1) * (key - 1);
    } else {
        index = div * (key - 1);
    }
    return index;
}

export const ContainerCard = ({ id, onRSSFeedAdded, onRSSFeedDeleted }: ContainerCardProps) => {

    const [showModal, setShowModal] = useState(false);
    const [RSSFeed, setRSSFeed] = useState<RssFeedDto[]>([]);
    const [currentlyViewing, setCurrentlyViewing] = useState<RssFeedDto[]>([]);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
    const [url, setUrl] = useState("");
    const [fetching, setFetching] = useState(false);

    const isFirstRender = useRef(true);

    const getRSSFeed = useCallback((url: string) => {
        closeModal();
        setFetching(true);
        fetchRSS(url)
            .then((json: RssFeedDto[]) => {
                const now = new Date();
                setRSSFeed(json);
                setAmountOfPages(Math.ceil(json.length / 3));
                setLastUpdated(now);
                setUrl(url);
                setFetching(false);
                onRSSFeedAdded(id, json);
            })
    }, [onRSSFeedAdded, id]);

    const populatePage = useCallback((key: number) => {
        const index = getIndexForPage(key, amountOfPages, RSSFeed.length);
        try {
            setCurrentlyViewing(RSSFeed.slice(index, index + 3));
        } catch (Exception) {
            localStorage.clear();
        }
    }, [RSSFeed, amountOfPages]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        const toSave: PersistedState = {
            RSSFeed: RSSFeed,
            lastUpdated,
            url,
        };
        console.log("persisting to storage")
        localStorage.setItem(String(id), JSON.stringify(toSave));
        populatePage(1);
    }, [RSSFeed, lastUpdated, url, id, populatePage]);

    useEffect(() => {
        setAmountOfPages(Math.ceil(RSSFeed.length / 3));
    }, [RSSFeed]);

    useEffect(() => {
        populatePage(1);
    }, [amountOfPages, populatePage])

    useEffect(() => {
        const locallyStoredJson = localStorage.getItem(String(id));
        console.log("1")
        if (locallyStoredJson) {
            console.log("finns json")
            const savedState: PersistedState = JSON.parse(locallyStoredJson);
            console.log(JSON.stringify(savedState));
            if (savedState.lastUpdated && savedState.url && savedState.url.length > 5 && shouldBeRefreshed(savedState.lastUpdated)) {
                getRSSFeed(savedState.url);
            } else {
                setLastUpdated(savedState.lastUpdated);
                setRSSFeed(savedState.RSSFeed);
                setUrl(savedState.url);
            }
        }
    }, [id, getRSSFeed])

    const resetState = (): void => {
        setShowModal(false);
        setRSSFeed([]);
        setCurrentlyViewing([]);
        setLastUpdated(undefined);
        setUrl("");
        setFetching(false);
        onRSSFeedDeleted(id);
    }

    const openModal = (): void => {
        setShowModal(true);
    }

    const closeModal = (): void => {
        setShowModal(false);
    }

    const clearData = (): void => {
        resetState();
        localStorage.setItem(String(id), JSON.stringify({}));
    }

    return (
        <Card>
            <CardBody className="card-body column-content border-0">
                {fetching
                    ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <>
                        <ModalWindow title="Add RSS feed" isOpen={showModal} onClose={closeModal}
                            onConfirm={getRSSFeed} />
                        <RSSItemCardList feed={currentlyViewing} />
                    </>
                }
            </CardBody>
            <CardFooter className={"d-flex justify-content-between align-items-center border-0"}>
                <Pagination>
                    <RSSPagination amountOfPages={amountOfPages} onPageSelected={populatePage} />
                </Pagination>
                {currentlyViewing.length > 0 ?
                    <Button className={"mb-2"} variant="danger" size="sm"
                        onClick={clearData}>Empty</Button>
                    :
                    <Button className={"mb-2"} variant="light" size="sm"
                        onClick={openModal}>Add</Button>
                }
            </CardFooter>
        </Card>
    )
}