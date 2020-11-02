interface Item<T> {
    getPromise: () => Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export class PromiseQueue<T> {
    private readonly queue: Array<Item<T>> = [];
    private running = false;

    add(getPromise: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push({
                getPromise,
                resolve,
                reject
            });

            this.next();
        });
    }

    private next(): void {
        if (this.running || this.queue.length === 0) {
            return;
        }

        this.running = true;
        const item = this.queue.shift()!;

        item.getPromise()
            .then(result => {
                item.resolve(result);
                this.running = false;
                this.next();
            })
            .catch(reason => {
                item.reject(reason);
                this.running = false;
                this.next();
            });
    }
}
