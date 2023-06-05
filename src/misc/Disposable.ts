export interface IDisposable {
    dispose: () => void;
}

export function using<TDisposable extends IDisposable, TReturn>(resource: TDisposable, func: (resource: TDisposable) => TReturn): TReturn {
    try {
        return func(resource);
    } finally {
        resource.dispose();
    }
}

export async function usingAsync<T extends IDisposable, TReturn>(resource: T, func: (resource: T) => Promise<TReturn>) : Promise<TReturn> {
    try {
        return await func(resource);
    } finally {
        resource.dispose();
    }
}