import { client } from "$services/redis";
import { pageCacheKey } from "$services/keys";

const cachedRoutes = new Set<string>([
    '/about', '/privace','/auth/signin','/auth/signout'
])

export const getCachedPage = (route: string) => {

    return cachedRoutes.has(route) ? client.get(pageCacheKey(route)) : null
};

export const setCachedPage = (route: string, page: string) => {
    if(cachedRoutes.has(route)){
        return client.set(pageCacheKey(route), page, {
            EX: 2
        })
    }
};
