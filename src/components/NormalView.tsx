import React from "react";
import Stack from 'react-bootstrap/Stack'
import { RssFeedDto } from "../schema";
import { RSSItemCard } from "./card/RSSItemCard";

export const NormalView = ({ rssItems }: { rssItems: RssFeedDto[][] }) => {
  return (
    <Stack gap={3} style={{ width: "50%" }}>
      {rssItems.map(arr =>
        <div className="bg-light border">
          {arr.map(rssItem =>
            <RSSItemCard url={rssItem.url} title={rssItem.title}
              description={rssItem.description} imgUrl={rssItem.imgUrl} />)}
        </div>)}
    </Stack>
  );
}