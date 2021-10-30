import React from "react";
import { RssFeedDto } from "../../schema";
import { RSSItemCard } from "./RSSItemCard";

export const RSSItemCardList = ({ feed }: { feed: RssFeedDto[] }): JSX.Element => {
    return feed.length === 0 ? <h4 className={"alignMiddle"}>Add something!</h4>:<>
        {feed.map(({ url, description, imgUrl, title }) => {
            return (
                <RSSItemCard key={url} url={url} description={description} imgUrl={imgUrl} title={title} />
            )
        })}
    </>
}