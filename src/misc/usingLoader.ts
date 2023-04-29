import { useGlobalStore } from 'src/stores/global-store';
import { using, usingAsync } from './Disposable';

export function usingLoader(func: () => void) {
    const loader = useGlobalStore().newLoader();
    return using(loader, func);
}

export function usingLoaderAsync(func: () => Promise<void>) {
    const loader = useGlobalStore().newLoader();
    return usingAsync(loader, func);
}