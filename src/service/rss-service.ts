import { RssFeedDto } from "../schema";

export function fetchRSS(url: string): Promise<RssFeedDto[]> {
    return fetch('https://homepage-be.herokuapp.com/rss', {
            method: "POST",
            body: url
        }).then((res) => {
            return res.json() as Promise<RssFeedDto[]>;
        }).catch(error => {
            console.error(error);
            throw new Error(`Failed to fetch RSS from url ${url}`)
        })
}