import React from "react";
import {Button, Card, Pagination} from "react-bootstrap/esm/";
import {ModalWindow} from "./ModalWindow";
import {RssFeedDto} from "../schema";
import {shouldBeRefreshed} from "../helper";
import CardBody from "react-bootstrap/esm/Card";
import CardFooter from "react-bootstrap/esm/Card"
import CardImg from "react-bootstrap/esm/CardImg";
import Spinner from "react-bootstrap/esm/Spinner";


export interface ContentBoxState {
    showModal: boolean;
    rssFeed: RssFeedDto[];
    currentlyViewing: RssFeedDto[];
    amountOfPages: number;
    activePage: number;
    lastUpdated: Date | undefined;
    url: string;
    fetching: boolean;
}


export interface ContentBoxProps {
    id: number,
}


function defaultState(): ContentBoxState {
    return {
        showModal: false,
        rssFeed: [],
        currentlyViewing: [],
        amountOfPages: 0,
        activePage: 1,
        lastUpdated: undefined,
        url: "",
        fetching: false
    }
}


export class ContentBox extends React.Component<ContentBoxProps, ContentBoxState> {

    constructor(props: ContentBoxProps) {
        super(props);
        this.state = defaultState();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.clearData = this.clearData.bind(this);
        this.getRSSFeed = this.getRSSFeed.bind(this);
        this.populatePage = this.populatePage.bind(this);
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    clearData() {
        this.setState(defaultState());
        localStorage.setItem(String(this.props.id), JSON.stringify({}));
    }

    getRSSFeed(url: string) {
        this.closeModal();
        this.setState({fetching: true});
        fetch('https://homepage-be.herokuapp.com/rss', {
            method: "POST",
            body: url
        }).then((res) => {
            return res.json();
        }).then((json: RssFeedDto[]) => {
            const now = new Date();
            this.setState({
                rssFeed: json,
                amountOfPages: Math.ceil(json.length / 3),
                lastUpdated: now,
                url: url,
                fetching: false
            }, () => {
                const toSave: Partial<ContentBoxState> = {
                    rssFeed: json,
                    lastUpdated: now,
                    url: url
                };
                localStorage.setItem(String(this.props.id), JSON.stringify(toSave));
                this.populatePage(1);
            })
        })
    }

    componentDidMount() {
        const locallyStoredJson = localStorage.getItem(String(this.props.id));
        if (locallyStoredJson) {
            const savedState: Partial<ContentBoxState> = JSON.parse(locallyStoredJson);
            console.log(savedState);
            if (savedState.lastUpdated && savedState.url && savedState.url.length > 5 && shouldBeRefreshed(savedState.lastUpdated)) {
                this.getRSSFeed(savedState.url);
            } else {
                this.setState(prevState => ({
                    ...prevState, ...savedState,
                }), () => {
                    this.setState({amountOfPages: Math.ceil(this.state.rssFeed.length / 3)}, () => {
                        this.populatePage(1);
                    });
                });
            }
        }
    }

    populatePage(key: number) {
        const div = Math.floor(this.state.rssFeed.length / this.state.amountOfPages);
        const mod = this.state.rssFeed.length % this.state.amountOfPages;
        let index: number;
        if (key >= (this.state.amountOfPages - mod)) {
            index = (div + 1) * (key - 1);
        } else {
            index = div * (key - 1);
        }
        console.log(this.state.rssFeed);
        try {
            this.setState({currentlyViewing: this.state.rssFeed.slice(index, index + 3), activePage: key});
        } catch (Exception){
            localStorage.clear();
        }
    }

    render() {
        const rss = this.state.currentlyViewing.map((dto) => {
            return (
                <Card key={dto.url} className={"border-0"}>
                    <h1 className="heading"><a href={dto.url}>{dto.title}</a></h1>
                    <CardImg src={dto.imgUrl}/>
                    <p>{dto.description}</p>
                </Card>
            )
        });

        let pages = [];
        for (let i = 1; i <= this.state.amountOfPages; i++) {
            pages.push(
                <Pagination.Item variant="dark" key={i} active={this.state.activePage === i}
                                 onClick={() => this.populatePage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        return (
            <Card>
                <CardBody className="card-body column-content border-0">
                    {this.state.fetching
                        ?
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        :
                        <>
                            <ModalWindow title="Add RSS feed" isOpen={this.state.showModal} onClose={this.closeModal}
                                         onConfirm={this.getRSSFeed}/>
                            {rss.length > 0 ? rss : <h1 className="heading">Empty :(</h1>}
                        </>
                    }
                </CardBody>
                <CardFooter className={"d-flex justify-content-between align-items-center border-0"}>
                    <Pagination>{pages}</Pagination>
                    {rss.length > 0 ?
                        <Button className={"mb-2"} variant="danger" size="sm"
                                onClick={this.clearData}>Empty</Button>
                        :
                        <Button className={"mb-2"} variant="light" size="sm"
                                onClick={this.openModal}>Add</Button>
                    }
                </CardFooter>
            </Card>
        )
    }
}