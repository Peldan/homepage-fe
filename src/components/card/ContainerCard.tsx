import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Card, Pagination } from "react-bootstrap/esm/";
import { ModalWindow } from "../ModalWindow";
import { RssFeedDto } from "../../schema";
import CardBody from "react-bootstrap/esm/Card";
import CardFooter from "react-bootstrap/esm/Card"
import Spinner from "react-bootstrap/esm/Spinner";
import { RSSItemCardList } from "./RSSItemCardList";
import { RSSPagination } from "../RSSPagination";
import { fetchRSS } from "../../service/rss-service";
import { useLocalStorageState } from "../useLocalStorage";

export interface ContainerCardProps {
    id: number,
    onRSSFeedAdded: (id: number, rssFeed: RssFeedDto[]) => void,
    onRSSFeedDeleted: (id: number) => void,
}

const getIndexForPage = (page: number, amountOfPages: number, amountOfItems: number) => {
    const div = Math.floor(amountOfItems / amountOfPages);
    const mod = amountOfItems % amountOfPages;
    let index: number;
    if (page >= (amountOfPages - mod)) {
        index = (div + 1) * (page - 1);
    } else {
        index = div * (page - 1);
    }
    return index;
}

export const ContainerCard = ({ id, onRSSFeedAdded, onRSSFeedDeleted }: ContainerCardProps) => {

    const [showModal, setShowModal] = useState(false);
    const [RSSFeed, setRSSFeed] = useLocalStorageState<RssFeedDto[]>(String(id), []);
    const [currentlyViewing, setCurrentlyViewing] = useState<RssFeedDto[]>([]);
    const [amountOfPages, setAmountOfPages] = useState(0);
    const [fetching, setFetching] = useState(false);

    const isFirstRender = useRef(true);

    const getRSSFeed = useCallback((url: string) => {
        closeModal();
        setFetching(true);
        fetchRSS(url)
            .then((json: RssFeedDto[]) => {
                setRSSFeed(json);
                setAmountOfPages(Math.ceil(json.length / 3));
                setFetching(false);
                onRSSFeedAdded(id, json);
            })
    }, [onRSSFeedAdded, setRSSFeed, id]);

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
        populatePage(1);
    }, [RSSFeed, populatePage]);

    useEffect(() => {
        setAmountOfPages(Math.ceil(RSSFeed.length / 3));
    }, [RSSFeed]);

    useEffect(() => {
        populatePage(1);
    }, [amountOfPages, populatePage])

    const resetState = (): void => {
        setShowModal(false);
        setRSSFeed([]);
        setCurrentlyViewing([]);
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
                <Pagination className="flex-wrap">
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