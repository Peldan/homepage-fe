import {REFRESH_INTERVAL} from "./constants";

export function shouldBeRefreshed(lastRefreshed: Date): boolean {
    if(!lastRefreshed){
        return true;
    }
    return new Date(lastRefreshed).getMilliseconds() - Date.now() > REFRESH_INTERVAL;
}

// stored 13:00
// 13:06 - 5 = 13:01