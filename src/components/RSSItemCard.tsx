import React from "react"
import { Card, CardImg } from "react-bootstrap/esm/";

export const RSSItemCard = ({ url, title, description, imgUrl }: { url: string, title: string, description: string, imgUrl: string }) => {
    return (
        <Card key={url} className={"border-0"}>
            <h1 className="heading"><a href={url}>{title}</a></h1>
            <CardImg src={imgUrl} />
            <p>{description}</p>
        </Card>
    )
}