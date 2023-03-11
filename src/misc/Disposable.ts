export interface IDisposable {
    dispose: () => void;
}

export function using<T extends IDisposable>(resource: T, func: (resource: T) => void) {
    try {
        func(resource);
    } finally {
        resource.dispose();
    }
}

export async function usingAsync<T extends IDisposable>(resource: T, func: (resource: T) => Promise<void>) {
    try {
        await func(resource);
    } finally {
        resource.dispose();
    }
}