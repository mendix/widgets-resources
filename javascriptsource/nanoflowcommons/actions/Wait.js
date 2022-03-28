/**
 * Wait for number of milliseconds before continuing nanoflow execution.
 * @param {Big} delay - The number of milliseconds to wait. This field is required.
 * @returns {Promise.<void>}
 */
async function Wait(delay) {
    // BEGIN USER CODE
    if (delay == null) {
        return Promise.reject(new Error("Input parameter 'delay' is required."));
    }
    return new Promise(resolve => {
        setTimeout(() => resolve(), Number(delay));
    });
    // END USER CODE
}

export { Wait };
