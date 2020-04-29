const {spawnSync} = require('child_process');

describe("Generating command line tests", function() {
    const expectedOutput = "Running MX Widget Tools script:";
    beforeAll(() => {
        spawnSync('npm', ['link']);
    });

    describe("Commands for Hybrid and Web apps", () => {

        it(`Testing start:server command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:server"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:server"`);
        });

        it(`Testing start:ts command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:ts"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:ts"`);
        });

        it(`Testing start:js command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:js"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:js"`);
        });

        it(`Testing build:ts command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["build:ts"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "build:ts"`);
        });

        it(`Testing build:js command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["build:js"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "build:js"`);
        });

        it(`Testing start:ts command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:ts"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:ts"`);
        });

        it(`Testing dev:js command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["dev:js"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "dev:js"`);
        });

        it(`Testing dev:ts command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["dev:ts"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "dev:ts"`);
        });

        it(`Testing release:js command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["release:js"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "release:js"`);
        });

        it(`Testing test:unit command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["test:unit"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "test:unit"`);
        });
    });

    describe("Commands for Native apps", () => {
        it(`Testing start:ts:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:ts:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:ts:native"`);
        });

        it(`Testing start:js:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:js:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:js:native"`);
        });

        it(`Testing build:ts:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["build:ts:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "build:ts:native"`);
        });

        it(`Testing build:js:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["build:js:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "build:js:native"`);
        });

        it(`Testing start:ts:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["start:ts:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "start:ts:native"`);
        });

        it(`Testing dev:js:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["dev:js:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "dev:js:native"`);
        });

        it(`Testing dev:ts:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["dev:ts:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "dev:ts:native"`);
        });

        it(`Testing release:js:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["release:js:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "release:js:native"`);
        });

        it(`Testing test:unit:native command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["test:unit:native"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "test:unit:native"`);
        });
    });

    describe("Testing generic commands", () => {
        it(`Testing lint command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["lint"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "lint"`);
        });

        it(`Testing lint:fix command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["lint:fix"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "lint:fix"`);
        });

        it(`Testing format command`, function() {
            const proc = spawnSync('pluggable-widgets-tools', ["format"]);
            expect(proc.stdout).not.toBeNull();
            expect(proc.stdout.toString()).toContain(`${expectedOutput} "format"`);
        });
    });
});
