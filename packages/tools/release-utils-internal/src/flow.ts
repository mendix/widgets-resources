const steplogFnKey = Symbol("key for logger fn");
const stepCountKey = Symbol("key for counter");

const state = {};

function createLogFn(): (...args: any[]) => void {
    return (...args: any[]): void => {
        console.info(`> Step ${state[stepCountKey]}:`, ...args);
    };
}

function resetLogCount(): void {
    state[stepCountKey] = 0;
}

function resetLogFn(): void {
    state[steplogFnKey] = createLogFn();
}

function incStep(): void {
    state[stepCountKey] += 1;
}

function clear(): void {
    delete state[steplogFnKey];
    delete state[stepCountKey];
}

function setup(): void {
    resetLogFn();
    resetLogCount();
}

function teardown(): void {
    clear();
}

function log(...args: any[]): void {
    const currentLogFn: (...args: any[]) => void = state[steplogFnKey];

    if (typeof currentLogFn === "function") {
        currentLogFn(...args);
    } else {
        console.warn("Can't find steplog fn in global scope. Did you forgot to run `start()`?");
        console.info(...args);
    }
}

// This function will create `locked` var in closure to
function createRunStep(): (stepName: string, step: () => Promise<void>) => Promise<void> {
    let locked = false;
    return async (stepName, step) => {
        if (locked) {
            console.warn("WARN: Steps shound not run other steps, pleause run setps in a sequence");
        } else {
            locked = true;
        }
        incStep();
        log(stepName);
        await step();
        locked = false;
    };
}

export const runStep = createRunStep();

export async function runFlow(flowName: string, steps: () => Promise<void>): Promise<void> {
    setup();
    console.info(`> Run flow - ${flowName}`);
    console.info("");
    await steps();
    console.info(`> Flow execution done.`);
    teardown();
}
