import React from "react";
import {Button, Pagination, Row, Image} from "react-bootstrap/esm/";
import {ModalWindow} from "./ModalWindow";
import {RssFeedDto} from "../schema";
import Col from "react-bootstrap/esm/Col";
import {REFRESH_INTERVAL} from "../constants";
import {shouldBeRefreshed} from "../helper";

export interface ContentBoxState {
    showModal: boolean;
    rssFeed: RssFeedDto[];
    currentlyViewing: RssFeedDto[];
    amountOfPages: number;
    activePage: number;
    lastUpdated: Date | undefined;
    url: string;
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
        url: ""
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
    }

    getRSSFeed(url: string) {
        this.closeModal();
        fetch('https://homepage-be.herokuapp.com/rss', {
            method: "POST",
            body: url
        }).then((res) => {
            return res.json();
        }).then((json: RssFeedDto[]) => {
            const now = new Date();
            this.setState({rssFeed: json, amountOfPages: Math.ceil(json.length / 3), lastUpdated: now, url: url}, () => {
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
            if(savedState.lastUpdated && savedState.url && shouldBeRefreshed(savedState.lastUpdated)){
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
        this.setState({currentlyViewing: this.state.rssFeed.slice(index, index + 3), activePage: key});
    }

    render() {
        const rss = this.state.currentlyViewing.map((dto) => {
            return (
                <Row key={dto.url}>
                    <h1 className="heading"><a href={dto.url}>{dto.title}</a></h1>
                    <Image src={dto.imgUrl} fluid rounded/>
                    <p>{dto.description}</p>
                </Row>
            )
        });

        let pages = [];
        for (let i = 1; i <= this.state.amountOfPages; i++) {
            pages.push(
                <Pagination.Item key={i} active={this.state.activePage === i} onClick={() => this.populatePage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        return (
            <Col xs={3} md={3} className={"box-shadow mx-5"}>
                <div className="column-content">
                    <ModalWindow title="Add RSS feed" isOpen={this.state.showModal} onClose={this.closeModal}
                                 onConfirm={this.getRSSFeed}/>
                    {rss.length > 0 ? rss : <h1 className="heading">Empty :(</h1>}
                    <div className="d-flex justify-content-between align-items-center">
                        <Pagination>{pages}</Pagination>
                        {rss.length > 0 ?
                            <Button className={"mb-2"} variant="danger" size="sm" onClick={this.clearData}>-</Button>
                            :
                            <Button className={"mb-2"} variant="primary" size="sm" onClick={this.openModal}>+</Button>
                        }
                    </div>
                </div>
            </Col>
        )
    }
}