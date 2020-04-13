import {REFRESH_INTERVAL} from "./constants";

export function shouldBeRefreshed(lastRefreshed: Date): boolean {
    if(!lastRefreshed){
        return true;
    }
    return Date.now() - (new Date(lastRefreshed)).getMilliseconds() >= REFRESH_INTERVAL;
}
