export const REFRESH_INTERVAL = 1000 * 60 * 5; //5 minutes

export interface RSS_PRESET {
    title: string,
    url: string
}

export const RSS_PRESETS: RSS_PRESET[] = [
    {title: "Aftonbladet", url: "http://www.aftonbladet.se/rss.xml"},
    {title: "Expressen", url: "https://feeds.expressen.se/nyheter/"},
    {title: "SVT Nyheter", url: "http://www.svt.se/nyheter/rss.xml"},
    {title: "SvD", url: "http://www.svd.se/?service=rss"},
    {title: "Dagens Industri", url: "https://digital.di.se/rss"},
];