module.exports = {
    "test-runner": "jest",
    "runner-config": `${__dirname}/jest.detox.config.js`,
    configurations: {
        "ios.simulator": {
            binaryPath: process.env.TEST_NATIVE_APP,
            type: "ios.simulator",
            device: {
                type: "iPhone 11 Pro Max"
            }
        }
    }
};
