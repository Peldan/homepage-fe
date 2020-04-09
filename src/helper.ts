import {REFRESH_INTERVAL} from "./constants";

export function shouldBeRefreshed(lastRefreshed: Date): boolean {
    if(!lastRefreshed){
        return true;
    }
    const fiveMinutesAgo = Date.now() - REFRESH_INTERVAL;
    return new Date(lastRefreshed).getMilliseconds() > fiveMinutesAgo;
}