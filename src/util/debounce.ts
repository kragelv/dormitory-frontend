type CancelFunc = () => void;

interface IDeferred {
    promise: Promise<void> | null;
    cancel: CancelFunc;
}

function deferred(ms: number): IDeferred {
    let cancel!: CancelFunc;
    const promise = new Promise<void>((resolve, reject) => {
        cancel = reject;
        setTimeout(resolve, ms);
    });
    return { promise, cancel };
}

type Func = (...args: any[]) => any;

export default function createDebounce<F extends Func>(task: F, ms: number) : [(...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>, CancelFunc] {
    let defer: IDeferred = {
        promise: null,
        cancel: () => void 0
    };
    return [
        async (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
            try {
                defer.cancel();
                defer = deferred(ms);
                await defer.promise;
            }
            finally {
                return await task(...args);
            }
        },
        defer.cancel
    ];
}
