import { useEffect, useState } from "react";

let incrementalId = 0;

/**
 * A custom hook to create a "unique" id based on an incremental counter that is updated
 * every time the component is mounted.
 */
export const useIncrementalId = (): { id: number } => {
    const [id] = useState(incrementalId);

    useEffect(() => {
        incrementalId = incrementalId + 1;
    }, []);

    return { id };
};
