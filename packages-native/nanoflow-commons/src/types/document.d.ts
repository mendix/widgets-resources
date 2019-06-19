interface Document {
    readonly location?: {
        readonly protocol?: string;
    };
}

declare let document: Document | undefined;
