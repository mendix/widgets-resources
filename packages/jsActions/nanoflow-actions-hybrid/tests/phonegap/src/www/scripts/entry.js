var MxApp = require("@mendix/mendix-hybrid-app-base");

MxApp.onConfigReady(function (config) {
    // Perform any custom operations on the dojoConfig object here
});

MxApp.onClientReady(function (mx) {
    // Perform any custom operations on the Mendix client object here
});

// Uncomment this function if you would like to control when app updates are performed
/*
MxApp.onAppUpdateAvailable(function(updateCallback) {
    // This function is called when a new version of your Mendix app is available.
    // Invoke the callback to trigger the app update mechanism.
});
*/
