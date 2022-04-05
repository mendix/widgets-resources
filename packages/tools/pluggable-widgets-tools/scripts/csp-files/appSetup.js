window.dojoConfig = {
    isDebug: false,
    useCustomLogger: true,
    async: true,
    baseUrl: "mxclientsystem/dojo/",
    cacheBust: "{{cachebust}}",
    rtlRedirect: "index-rtl.html",
    has: {
        "csp-restrictions": true
    },
    blankGif: "mxclientsystem/dojo/resources/blank.gif"
};

if (!document.cookie || !document.cookie.match(/(^|;)originURI=/gi))
    document.cookie = "originURI=/login.html" + (window.location.protocol === "https:" ? ";SameSite=None;Secure" : "");
