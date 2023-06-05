import { useGlobalStore } from 'src/stores/global-store';
import { using, usingAsync } from './Disposable';

export function usingLoader<TReturn>(func: () => TReturn) {
    const loader = useGlobalStore().newLoader();
    return using(loader, func);
}

export function usingLoaderAsync<TReturn>(func: () => Promise<TReturn>) {
    const loader = useGlobalStore().newLoader();
    return usingAsync(loader, func);
}