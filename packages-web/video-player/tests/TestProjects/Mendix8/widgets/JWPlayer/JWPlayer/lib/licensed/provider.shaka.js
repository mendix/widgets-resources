webpackJsonpjwplayer([5], {
    109: function(a, b, c) {
        var d, e;
        (d = [c(81), c(44), c(55), c(61), c(45), c(46), c(110)]),
            (e = function(a, b, c, d, e, f, g) {
                function h(a) {
                    var b = a / 1e3;
                    return Math.floor(b).toLocaleString() + " kbps";
                }
                function i(a) {
                    function i() {
                        R && this.state === d.LOADING && this.setState(d.PLAYING);
                    }
                    function j(a, b) {
                        switch (b.schemeIdUri) {
                            case "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":
                            case "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":
                                var c = "com.widevine.alpha",
                                    d = a.widevine.url;
                                return (
                                    d ||
                                        (console.log(
                                            "No licensing server specified for widevine. Defaulting to proxy."
                                        ),
                                        (d = "http://widevine-proxy.appspot.com/proxy")),
                                    new g.player.DrmSchemeInfo(c, d, !1, null, null)
                                );
                            default:
                                return console.log("Unrecognized scheme: " + b.schemeIdUri), null;
                        }
                    }
                    function k(a) {
                        console.error(a);
                        var b = "Unknown playback error";
                        Q.trigger(e.JWPLAYER_MEDIA_ERROR, { message: "Error playing file:" + b });
                    }
                    function l() {
                        return this.levels;
                    }
                    function m() {
                        return this.currentQuality;
                    }
                    function n(a) {
                        var b = new g.player.Player(a);
                        return b.addEventListener("error", k), b;
                    }
                    function o(a) {
                        R && a.preload && "none" !== a.preload && ((O = a), q(a));
                    }
                    function p(a) {
                        R && (this.setState(d.LOADING), O !== a && ((O = a), q(a)));
                    }
                    function q(a) {
                        var c = a.sources[0].file,
                            d = a.sources[0].drm || {},
                            e = a.starttime,
                            f = new g.util.EWMABandwidthEstimator(),
                            h = b.partial(j, d),
                            i = new g.player.DashVideoSource(c, h, f),
                            k = P.load(i);
                        k.then(r.bind(Q)),
                            e &&
                                k.then(
                                    function() {
                                        this.seek(e);
                                    }.bind(Q)
                                );
                    }
                    function r() {
                        if (R) {
                            Q.trigger(e.JWPLAYER_MEDIA_BUFFER_FULL);
                            var a = P.getVideoTracks();
                            a.length > 1 &&
                                ((this.currentQuality = 0),
                                (this.levels = b.map(a, function(a) {
                                    return { label: h(a.bandwidth), level_id: a.id };
                                })),
                                this.levels.unshift({ label: "Auto", level_id: "auto" }),
                                Q.trigger(e.JWPLAYER_MEDIA_LEVELS, {
                                    levels: this.levels,
                                    currentQuality: this.currentQuality
                                }));
                        }
                    }
                    function s() {
                        return P.isLive() ? 1 / 0 : N.duration;
                    }
                    function t() {
                        R &&
                            Q.trigger(e.JWPLAYER_MEDIA_META, {
                                duration: s(),
                                height: N.videoHeight,
                                width: N.videoWidth
                            });
                    }
                    function u() {
                        Q.setState(d.COMPLETE), (S = !1), Q.trigger(e.JWPLAYER_MEDIA_COMPLETE);
                    }
                    function v(a, b) {
                        return R ? f.trigger.call(this, a, b) : void 0;
                    }
                    function w() {
                        var a = N;
                        (R = !1), P.destroy(), (N = a);
                    }
                    function x() {
                        (R = !0), (P = n(N)), S && u();
                    }
                    function y() {
                        return S;
                    }
                    function z(a) {
                        N.muted = a;
                    }
                    function A() {
                        N.pause(), this.setState(d.PAUSED);
                    }
                    function B() {
                        N.play(), this.setState(d.BUFFERING), this.setVisibility(!0);
                    }
                    function C(a) {
                        (N.currentTime = a),
                            this.trigger(e.JWPLAYER_MEDIA_SEEK, { position: N.currentTime, offset: a });
                    }
                    function D(a) {
                        (a = !!a),
                            a
                                ? c.style(L, { visibility: "visible", opacity: 1 })
                                : c.style(L, { visibility: "", opacity: 0 });
                    }
                    function E() {
                        P.unload(), L === N.parentNode && L.removeChild(N);
                    }
                    function F() {
                        N.pause(), this.setState(d.IDLE);
                    }
                    function G(a) {
                        (L = a), L.appendChild(N);
                    }
                    function H() {
                        return L;
                    }
                    function I(a) {
                        if (((a = parseInt(a, 10)), !(this.currentQuality === a || 0 > a || a >= this.levels.length))) {
                            if (0 === a) P.configure({ enableAdaptation: !0 });
                            else {
                                var b = this.levels[a].level_id;
                                P.configure({ enableAdaptation: !1 }), this.setState(d.LOADING), P.selectVideoTrack(b);
                            }
                            (this.currentQuality = a),
                                this.trigger(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                                    currentQuality: this.currentQuality,
                                    levels: this.levels
                                });
                        }
                    }
                    function J() {
                        if (R) {
                            var a = N.currentTime;
                            if (
                                (Math.abs(a - this.position) < 1 && Q.state === d.BUFFERING && Q.setState(d.PLAYING),
                                (this.position = a),
                                Q.trigger(e.JWPLAYER_MEDIA_TIME, { position: a, duration: s(), quality: 1 }),
                                a > N.duration - 0.1 && N.duration > 1)
                            ) {
                                if (((S = !0), Q.trigger(e.JWPLAYER_MEDIA_BEFORECOMPLETE), !R)) return;
                                u();
                            }
                        }
                    }
                    function K(a) {
                        N.volume = a / 100;
                    }
                    var L,
                        M = document.getElementById(a),
                        N = M ? M.querySelector("video") : void 0;
                    N = N || document.createElement("video");
                    var O,
                        P = n(N),
                        Q = this,
                        R = !0,
                        S = !1;
                    (this.position = 0),
                        (this.levels = []),
                        (this.currentQuality = -1),
                        b.extend(this, f, {
                            init: o,
                            load: p,
                            mute: z,
                            pause: A,
                            getQualityLevels: l.bind(this),
                            getCurrentQuality: m.bind(this),
                            play: B,
                            seek: C,
                            remove: E,
                            setContainer: G,
                            getContainer: H,
                            setCurrentQuality: I.bind(this),
                            setVisibility: D,
                            stop: F,
                            volume: K,
                            trigger: v,
                            attachMedia: x,
                            detachMedia: w,
                            checkComplete: y,
                            supportsFullscreen: b.constant(!0),
                            getName: b.constant({ name: "shaka" })
                        }),
                        N.addEventListener("loadedmetadata", t.bind(this)),
                        N.addEventListener("timeupdate", J.bind(this)),
                        N.addEventListener("playing", i.bind(this));
                }
                return (
                    g.polyfill.installAll(),
                    (i.getName = b.constant({ name: "shaka" })),
                    {
                        register: function(a) {
                            a.api.registerProvider(i);
                        }
                    }
                );
            }.apply(b, d)),
            !(void 0 !== e && (a.exports = e));
    },
    110: function(a, b, c) {
        var d;
        !(function() {
            var e = {};
            (function(a) {
                function b(a, b) {
                    var c = a.split("."),
                        d = Be;
                    c[0] in d || !d.execScript || d.execScript("var " + c[0]);
                    for (var e; c.length && (e = c.shift()); )
                        c.length || void 0 === b ? (d = d[e] ? d[e] : (d[e] = {})) : (d[e] = b);
                }
                function c(a, b) {
                    function c() {}
                    (c.prototype = b.prototype),
                        (a.Ob = b.prototype),
                        (a.prototype = new c()),
                        (a.prototype.constructor = a),
                        (a.Mb = function(a, c, d) {
                            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
                        });
                }
                function d() {}
                function e(a) {
                    var b = console[a];
                    b
                        ? b.bind ||
                          (console[a] = function() {
                              b.apply(console, arguments);
                          })
                        : (console[a] = function() {});
                }
                function f(a) {
                    De[a] = { na: Ce(), end: NaN };
                }
                function g(a) {
                    (a = De[a]) && (a.end = Ce());
                }
                function h(a) {
                    return (a = De[a]) && a.end ? a.end - a.na : NaN;
                }
                function i(a, b, c) {
                    (this.id = a), (this.bandwidth = b || 0), (this.lang = c || "unknown"), (this.active = !1);
                }
                function j() {
                    this.minBandwidth = this.maxBandwidth = this.maxWidth = this.maxHeight = null;
                }
                function k() {
                    (this.fontSize = "100%"),
                        (this.fontColor = Ee),
                        (this.fontOpacity = Ge),
                        (this.backgroundColor = Fe),
                        (this.backgroundOpacity = Ge),
                        (this.fontEdge = He);
                }
                function l(a) {
                    var b = [];
                    b.push("font-size: " + a.fontSize),
                        b.push("color: " + m(a.fontColor, a.fontOpacity)),
                        b.push("background-color: " + m(a.backgroundColor, a.backgroundOpacity));
                    for (var c = [], d = 0; d < a.fontEdge.length; ++d) {
                        var e = a.fontEdge[d].slice(3, 6);
                        c.push(m(a.fontEdge[d].slice(0, 3), a.fontOpacity) + " " + e.join("px ") + "px");
                    }
                    return b.push("text-shadow: " + c.join(",")), b.join("; ");
                }
                function m(a, b) {
                    return "rgba(" + a.concat(b).join(",") + ")";
                }
                function n(a, b) {
                    (this.id = a), (this.lang = b || "unknown"), (this.enabled = this.active = !1);
                }
                function o(a, b, c, d) {
                    (this.id = a),
                        (this.bandwidth = b || 0),
                        (this.width = c || 0),
                        (this.height = d || 0),
                        (this.active = !1);
                }
                function p(a, b) {
                    var c = a.width * a.height,
                        d = b.width * b.height;
                    return d > c ? -1 : c > d ? 1 : a.bandwidth < b.bandwidth ? -1 : a.bandwidth > b.bandwidth ? 1 : 0;
                }
                function q() {
                    var b = "CustomEvent" in a;
                    if (b)
                        try {
                            new CustomEvent("");
                        } catch (c) {
                            b = !1;
                        }
                    b || (a.CustomEvent = r);
                }
                function r(a, b) {
                    var c = document.createEvent("CustomEvent"),
                        d = b || { bubbles: !1, cancelable: !1, detail: null };
                    return c.initCustomEvent(a, !!d.bubbles, !!d.cancelable, d.detail), c;
                }
                function s() {
                    var a = Element.prototype;
                    (a.requestFullscreen =
                        a.requestFullscreen ||
                        a.mozRequestFullScreen ||
                        a.msRequestFullscreen ||
                        a.webkitRequestFullscreen),
                        (a = Document.prototype),
                        (a.exitFullscreen =
                            a.exitFullscreen || a.mozCancelFullScreen || a.msExitFullscreen || a.webkitExitFullscreen),
                        "fullscreenElement" in document ||
                            Object.defineProperty(document, "fullscreenElement", {
                                get: function() {
                                    return (
                                        document.mozFullScreenElement ||
                                        document.msFullscreenElement ||
                                        document.webkitFullscreenElement
                                    );
                                }
                            }),
                        document.addEventListener("webkitfullscreenchange", t),
                        document.addEventListener("webkitfullscreenerror", t),
                        document.addEventListener("mozfullscreenchange", t),
                        document.addEventListener("mozfullscreenerror", t),
                        document.addEventListener("MSFullscreenChange", t),
                        document.addEventListener("MSFullscreenError", t);
                }
                function t(a) {
                    var b = a.type.replace(/^(webkit|moz|MS)/, "").toLowerCase(),
                        b = new Event(b, a);
                    a.target.dispatchEvent(b);
                }
                function u() {
                    return Promise.reject(Error("The key system specified is not supported."));
                }
                function v(a) {
                    return null == a ? Promise.resolve() : Promise.reject(Error("MediaKeys not supported."));
                }
                function w() {
                    throw new TypeError("Illegal constructor.");
                }
                function x() {
                    throw new TypeError("Illegal constructor.");
                }
                function y() {
                    var a = HTMLVideoElement.prototype;
                    !a.getVideoPlaybackQuality && "webkitDroppedFrameCount" in a && (a.getVideoPlaybackQuality = z);
                }
                function z() {
                    return {
                        droppedVideoFrames: this.webkitDroppedFrameCount,
                        totalVideoFrames: this.webkitDecodedFrameCount,
                        corruptedVideoFrames: 0,
                        creationTime: NaN,
                        totalFrameDelay: 0
                    };
                }
                function A(a, b) {
                    for (var c = {}, d = 0; d < a.length; ++d) {
                        var e = b ? b(a[d]) : a[d].toString();
                        c[e] = a[d];
                    }
                    var f,
                        d = [];
                    for (f in c) d.push(c[f]);
                    return d;
                }
                function B() {
                    return Date.now() + Je;
                }
                function C(a) {
                    (this.b = a), (this.c = 0 == Ke), (this.a = 0);
                }
                function D(a) {
                    return a.a < a.b.byteLength;
                }
                function E(a) {
                    var b = a.b.getUint8(a.a);
                    return (a.a += 1), b;
                }
                function F(a) {
                    var b = a.b.getUint32(a.a, a.c);
                    return (a.a += 4), b;
                }
                function G(a) {
                    var b, c;
                    if (
                        (a.c
                            ? ((b = a.b.getUint32(a.a, !0)), (c = a.b.getUint32(a.a + 4, !0)))
                            : ((c = a.b.getUint32(a.a, !1)), (b = a.b.getUint32(a.a + 4, !1))),
                        c > 2097151)
                    )
                        throw new RangeError("DataViewReader: Overflow reading 64-bit value.");
                    return (a.a += 8), c * Math.pow(2, 32) + b;
                }
                function H(a) {
                    if (a.a + 16 > a.b.byteLength) throw new RangeError("DataViewReader: Read past end of DataView.");
                    var b = new Uint8Array(a.b.buffer, a.a, 16);
                    return (a.a += 16), b;
                }
                function I(a, b) {
                    if (a.a + b > a.b.byteLength) throw new RangeError("DataViewReader: Skip past end of DataView.");
                    a.a += b;
                }
                function J(a) {
                    (this.b = a),
                        (this.a = new C(a)),
                        Ie ||
                            (Ie = [
                                new Uint8Array([255]),
                                new Uint8Array([127, 255]),
                                new Uint8Array([63, 255, 255]),
                                new Uint8Array([31, 255, 255, 255]),
                                new Uint8Array([15, 255, 255, 255, 255]),
                                new Uint8Array([7, 255, 255, 255, 255, 255]),
                                new Uint8Array([3, 255, 255, 255, 255, 255, 255]),
                                new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])
                            ]);
                }
                function K(a) {
                    var b;
                    if (((b = L(a)), 7 < b.length))
                        throw new RangeError("EbmlParser: EBML ID must be at most 7 bytes.");
                    for (var c = 0, d = 0; d < b.length; d++) c = 256 * c + b[d];
                    (b = c), (c = L(a));
                    a: {
                        for (d = 0; d < Ie.length; d++)
                            if (Ra(c, Ie[d])) {
                                d = !0;
                                break a;
                            }
                        d = !1;
                    }
                    if (d) throw new RangeError("EbmlParser: Element cannot contain dynamically sized data.");
                    if (8 == c.length && 224 & c[1])
                        throw new RangeError("EbmlParser: Variable sized integer value must be at most 53 bits.");
                    for (var d = c[0] & ((1 << (8 - c.length)) - 1), e = 1; e < c.length; e++) d = 256 * d + c[e];
                    return (
                        (c = d),
                        (c = a.a.a + c <= a.b.byteLength ? c : a.b.byteLength - a.a.a),
                        (d = new DataView(a.b.buffer, a.b.byteOffset + a.a.a, c)),
                        I(a.a, c),
                        new M(b, d)
                    );
                }
                function L(a) {
                    var b,
                        c = E(a.a);
                    for (b = 1; 8 >= b && !(c & (1 << (8 - b))); b++);
                    if (b > 8) throw new RangeError("EbmlParser: Variable sized integer must fit within 8 bytes.");
                    var d = new Uint8Array(b);
                    for (d[0] = c, c = 1; b > c; c++) d[c] = E(a.a);
                    return d;
                }
                function M(a, b) {
                    (this.id = a), (this.a = b);
                }
                function N(a) {
                    if (8 < a.a.byteLength) throw new RangeError("EbmlElement: Unsigned integer has too many bytes.");
                    if (8 == a.a.byteLength && 224 & a.a.getUint8(0))
                        throw new RangeError("EbmlParser: Unsigned integer must be at most 53 bits.");
                    for (var b = 0, c = 0; c < a.a.byteLength; c++) var d = a.a.getUint8(c), b = 256 * b + d;
                    return b;
                }
                function O(a) {
                    (this.c = Math.exp(Math.log(0.5) / a)), (this.a = this.b = 0);
                }
                function P(a) {
                    return a.b / (1 - Math.pow(a.c, a.a));
                }
                function Q(a) {
                    var b,
                        c = new CustomEvent(a.type, { detail: a.detail, bubbles: !!a.bubbles });
                    for (b in a) b in c || (c[b] = a[b]);
                    return c;
                }
                function R(a) {
                    return new CustomEvent("error", { detail: a, bubbles: !0 });
                }
                function S(a, b, c) {
                    return (
                        T(b),
                        T(c),
                        c == b || (a >= Me && c == b.split("-")[0]) || (a >= Ne && c.split("-")[0] == b.split("-")[0])
                            ? !0
                            : !1
                    );
                }
                function T(a) {
                    a = a.toLowerCase().split("-");
                    var b = Oe[a[0]];
                    return b && (a[0] = b), a.join("-");
                }
                function U(a) {
                    return Object.keys(a).map(function(b) {
                        return a[b];
                    });
                }
                function V(a, b) {
                    var c = X(a, b, "number");
                    if (null == c) return null;
                    if (isNaN(c) || c == Number.NEGATIVE_INFINITY || c == Number.POSITIVE_INFINITY)
                        throw new RangeError("'" + b + "' must be finite.");
                    if (0 > c) throw new RangeError("'" + b + "' must be >= 0");
                    return c;
                }
                function W(a, b) {
                    return X(a, b, "string");
                }
                function X(a, b, c) {
                    if (((a = a[b]), null == a)) return null;
                    if (typeof a != c) throw new TypeError("'" + b + "' must be a " + c + ".");
                    return a;
                }
                function Y(a, b, c) {
                    if (((a = a[b]), null == a)) return null;
                    if (!(a instanceof c)) throw new TypeError("'" + b + "' must be an instance of " + c.name + ".");
                    return a;
                }
                function Z() {
                    this.a = {};
                }
                function $(a) {
                    var b,
                        c = [];
                    for (b in a.a) c.push.apply(c, a.a[b]);
                    return c;
                }
                function _(a, b, c) {
                    if ((a = a.a[b])) for (b = 0; b < a.length; ++b) a[b] == c && (a.splice(b, 1), --b);
                }
                function aa(a) {
                    var b,
                        c = [];
                    for (b in a.a) c.push(b);
                    return c;
                }
                function ba() {
                    this.a = new Z();
                }
                function ca(a, b, c, d) {
                    (b = new ea(b, c, d)), a.a.push(c, b);
                }
                function da(a) {
                    for (var b = $(a.a), c = 0; c < b.length; ++c) b[c].sa();
                    a.a.a = {};
                }
                function ea(a, b, c) {
                    (this.target = a), (this.type = b), (this.a = c), this.target.addEventListener(b, c, !1);
                }
                function fa(a) {
                    (this.xa = new Z()), (this.v = a);
                }
                function ga(a, b) {
                    b.currentTarget = a;
                    for (var c = a.xa.get(b.type) || [], d = 0; d < c.length; ++d) {
                        var e = c[d];
                        try {
                            e.handleEvent ? e.handleEvent(b) : e.call(a, b);
                        } catch (f) {}
                    }
                    return a.v && b.bubbles && ga(a.v, b), b.defaultPrevented;
                }
                function ha() {
                    fa.call(this, null), (this.a = new O(3)), (this.c = new O(10)), (this.b = 0);
                }
                function ia() {
                    var a,
                        b,
                        c = new Promise(function(c, d) {
                            (a = c), (b = d);
                        });
                    return (c.resolve = a), (c.reject = b), (c.destroy = ia.prototype.destroy), c;
                }
                function ja(a) {
                    return a.split("").reduce(function(a, b, c) {
                        return a + (c && 0 == c % 4 ? " " + b : b);
                    });
                }
                function ka() {
                    (this.g = new ia()), (this.f = !1), (this.a = null), (this.b = []), (this.c = null);
                }
                function la(a, b) {
                    if (a.f) throw Error("Cannot append to a running task!");
                    a.b.push(b);
                }
                function ma(a, b) {
                    var c,
                        d = a.b[0](b);
                    d ? ((c = d[0]), (a.c = d[1])) : ((c = Promise.resolve()), (a.c = null)),
                        c
                            .then(
                                oa(a, function(a) {
                                    this.a
                                        ? ((this.b = []), (this.c = null), na(this))
                                        : (this.b.shift(),
                                          this.b.length ? ma(this, a) : (this.g.resolve(a), (this.c = null)));
                                })
                            )
                            ["catch"](
                                oa(a, function(a) {
                                    (this.b = []), (this.c = null), this.a ? na(this) : this.g.reject(a);
                                })
                            );
                }
                function na(b) {
                    var c = Error("Task aborted.");
                    (c.type = "aborted"),
                        b.g.reject(c),
                        a.setTimeout(
                            function() {
                                this.a.resolve(), (this.a = null);
                            }.bind(b),
                            5
                        );
                }
                function oa(a, b) {
                    return b.bind(a);
                }
                function pa(a, b, c) {
                    MediaSource.isTypeSupported(b),
                        (b = a.addSourceBuffer(b)),
                        (this.j = a),
                        (this.c = b),
                        (this.v = c),
                        (this.h = new ba()),
                        (this.b = []),
                        (this.o = 0),
                        (this.f = this.a = null),
                        (this.l = 0),
                        ca(this.h, this.c, "updateend", this.w.bind(this));
                }
                function qa(a, b) {
                    for (var c = a.c.buffered, d = 0; d < c.length; ++d) {
                        var e = c.start(d) - Pe,
                            f = c.end(d) + Pe;
                        if (b >= e && f >= b) return c.end(d) - b;
                    }
                    return 0;
                }
                function ra(a, b, c, d) {
                    if (a.a)
                        return (
                            (a = Error("Cannot fetch (" + a.i + "): previous operation not complete.")),
                            (a.type = "stream"),
                            Promise.reject(a)
                        );
                    (a.a = new ka()),
                        c != a.c.timestampOffset && (a.c.timestampOffset = c),
                        d &&
                            la(
                                a.a,
                                function() {
                                    return [wa(this, d), this.g.bind(this)];
                                }.bind(a)
                            ),
                        la(
                            a.a,
                            function() {
                                var a = b.a ? b.a - b.b : 1,
                                    c = new ac();
                                return (
                                    (c.a = 3),
                                    (c.h = 1e3 * a),
                                    (c.c = 1e3 * this.l),
                                    [ic(b.url, c, this.v), gc.prototype.g.bind(b.url)]
                                );
                            }.bind(a)
                        ),
                        la(
                            a.a,
                            oa(a, function(a) {
                                return this.v.getBandwidth(), [wa(this, a), this.g.bind(this)];
                            })
                        );
                    var e = 0 == a.c.buffered.length && 0 == a.b.length,
                        f = null;
                    return (
                        la(
                            a.a,
                            function() {
                                if (0 == this.c.buffered.length) {
                                    var a = Error("Failed to buffer segment (" + this.i + ").");
                                    return (a.type = "stream"), [Promise.reject(a)];
                                }
                                e && ((a = b.b), (f = this.c.buffered.start(0) - a)),
                                    (a = tc(this.b, b.b)),
                                    a >= 0 ? this.b.splice(a + 1, 0, b) : this.b.push(b);
                            }.bind(a)
                        ),
                        va(a).then(
                            function() {
                                return Promise.resolve(f);
                            }.bind(a)
                        )
                    );
                }
                function sa(a) {
                    return a.a
                        ? ((a = Error("Cannot clear (" + a.i + "): previous operation not complete.")),
                          (a.type = "stream"),
                          Promise.reject(a))
                        : ((a.a = new ka()),
                          la(
                              a.a,
                              function() {
                                  var a;
                                  a: if (0 == this.c.buffered.length) a = Promise.resolve();
                                  else {
                                      try {
                                          this.c.remove(0, Number.POSITIVE_INFINITY);
                                      } catch (b) {
                                          a = Promise.reject(b);
                                          break a;
                                      }
                                      (this.b = []), (a = this.f = new ia());
                                  }
                                  return [a, this.g.bind(this)];
                              }.bind(a)
                          ),
                          va(a));
                }
                function ta(a, b) {
                    if (a.a) {
                        var c = Error("Cannot clearAfter (" + a.i + "): previous operation not complete.");
                        return (c.type = "stream"), Promise.reject(c);
                    }
                    return (
                        (a.a = new ka()),
                        la(
                            a.a,
                            function() {
                                return [xa(this, b), this.g.bind(this)];
                            }.bind(a)
                        ),
                        va(a)
                    );
                }
                function ua(a) {
                    return (
                        a.a
                            ? ((a = a.a),
                              a.a
                                  ? (a = a.a)
                                  : a.f
                                  ? (a.c && a.c(), (a.a = new ia()), (a = a.a))
                                  : ((a.f = !0), (a = Promise.resolve())))
                            : (a = Promise.resolve()),
                        a
                    );
                }
                function va(a) {
                    return (
                        a.a.start(),
                        a.a.g
                            .then(
                                oa(a, function() {
                                    this.a = null;
                                })
                            )
                            ["catch"](
                                oa(a, function(a) {
                                    return (this.a = null), Promise.reject(a);
                                })
                            )
                    );
                }
                function wa(a, b) {
                    try {
                        a.c.appendBuffer(b);
                    } catch (c) {
                        return Promise.reject(c);
                    }
                    return (a.f = new ia()), a.f;
                }
                function xa(a, b) {
                    if (0 == a.c.buffered.length) return Promise.resolve();
                    var c = tc(a.b, b);
                    if (-1 == c || c == a.b.length - 1) return Promise.resolve();
                    try {
                        a.c.remove(a.b[c + 1].b, Number.POSITIVE_INFINITY);
                    } catch (d) {
                        return Promise.reject(d);
                    }
                    return (a.b = a.b.slice(0, c + 1)), (a.f = new ia()), a.f;
                }
                function ya(a, b) {
                    fa.call(this, b), (this.a = null), (this.h = a);
                }
                function za(b) {
                    if (!a.indexedDB)
                        return (
                            (b = Error("Persistant storage requires IndexedDB support.")),
                            (b.type = "storage"),
                            Promise.reject(b)
                        );
                    if (b.a)
                        return (
                            (b = Error("A database connection is already open.")),
                            (b.type = "storage"),
                            Promise.reject(b)
                        );
                    var c = new ia(),
                        d = a.indexedDB.open("content_database", 1);
                    return (
                        (d.onupgradeneeded = oa(b, function(a) {
                            (this.a = a.target.result),
                                Ba(this, "group_store", { keyPath: "group_id" }),
                                Ba(this, "stream_index_store", { keyPath: "stream_id" }),
                                (a = Ba(this, "content_store", { autoIncrement: "true" })),
                                a.createIndex("segment", ["stream_id", "segment_id"], { unique: !0 }),
                                a.createIndex("stream", "stream_id", { unique: !1 });
                        })),
                        (d.onsuccess = oa(b, function(a) {
                            (this.a = a.target.result), c.resolve();
                        })),
                        (d.onerror = function() {
                            c.reject(d.error);
                        }),
                        c
                    );
                }
                function Aa(a) {
                    a.a && (a.a.close(), (a.a = null));
                }
                function Ba(a, b, c) {
                    return a.a.objectStoreNames.contains(b) && a.a.deleteObjectStore(b), a.a.createObjectStore(b, c);
                }
                function Ca(a) {
                    return Fa(a, "content_store");
                }
                function Da(a) {
                    return Fa(a, "stream_index_store");
                }
                function Ea(a) {
                    return Fa(a, "group_store");
                }
                function Fa(a, b) {
                    return a.a.transaction([b], a.h).objectStore(b);
                }
                function Ga(a, b) {
                    var c = new ia(),
                        d = a.get(b);
                    return (
                        (d.onerror = function() {
                            c.reject(d.error);
                        }),
                        (d.onsuccess = function() {
                            if (d.result) c.resolve(d.result);
                            else {
                                var a = Error("Item not found.");
                                (a.type = "storage"), c.reject(a);
                            }
                        }),
                        c
                    );
                }
                function Ha() {
                    ya.call(this, "readonly", null);
                }
                function Ia(a) {
                    var b = new ia(),
                        c = [],
                        d = Ea(a).openCursor();
                    return (
                        (d.onerror = function() {
                            b.reject(d.error);
                        }),
                        (d.onsuccess = function(a) {
                            (a = a.target.result) ? (c.push(a.key), a["continue"]()) : b.resolve(c);
                        }),
                        b
                    );
                }
                function Ja(a, b) {
                    return Ga(Ea(a), b).then(
                        oa(a, function(a) {
                            return (
                                (a.session_ids = A(a.session_ids)),
                                a.hasOwnProperty("duration") || a.hasOwnProperty("key_system")
                                    ? Promise.resolve(a)
                                    : Ka(this, a.stream_ids[0]).then(function(b) {
                                          return (
                                              (a.duration = b.duration),
                                              (a.key_system = b.key_system),
                                              (a.license_server = b.license_server),
                                              (a.with_credentials = b.with_credentials),
                                              (a.distinctive_identifier = b.distinctive_identifier),
                                              (a.audio_robustness = b.audio_robustness),
                                              (a.video_robustness = b.video_robustness),
                                              Promise.resolve(a)
                                          );
                                      })
                            );
                        })
                    );
                }
                function Ka(a, b) {
                    return Ga(Da(a), b);
                }
                function La(a, b, c) {
                    return Ga(Ca(a).index("segment"), [b, c]).then(function(a) {
                        return Promise.resolve(a.content);
                    });
                }
                function Ma(a) {
                    return String.fromCharCode.apply(null, a);
                }
                function Na(a) {
                    for (var b = new Uint8Array(a.length), c = 0; c < a.length; ++c) b[c] = a.charCodeAt(c);
                    return b;
                }
                function Oa(b, c) {
                    var d = void 0 == c ? !0 : c,
                        e = a
                            .btoa(Ma(b))
                            .replace(/\+/g, "-")
                            .replace(/\//g, "_");
                    return d ? e : e.replace(/=*$/, "");
                }
                function Pa(b) {
                    return Na(a.atob(b.replace(/-/g, "+").replace(/_/g, "/")));
                }
                function Qa(a) {
                    for (var b = "", c = 0; c < a.length; ++c) {
                        var d = a[c].toString(16);
                        1 == d.length && (d = "0" + d), (b += d);
                    }
                    return b;
                }
                function Ra(a, b) {
                    if (!a && !b) return !0;
                    if (!a || !b || a.length != b.length) return !1;
                    for (var c = 0; c < a.length; ++c) if (a[c] != b[c]) return !1;
                    return !0;
                }
                function Sa() {
                    (this.j = this.a = ""),
                        (this.l = !1),
                        (this.i = this.h = null),
                        (this.o = this.g = !1),
                        (this.v = this.f = ""),
                        (this.c = null),
                        (this.b = []);
                }
                function Ta(a) {
                    var b = new Sa();
                    if (!a) return b;
                    var c = W(a, "keySystem");
                    if (null == c) throw Error("'keySystem' cannot be null.");
                    b.a = c;
                    var d = W(a, "licenseServerUrl");
                    if (null != d) b.j = d;
                    else if (c)
                        throw Error("For encrypted streaming content, 'licenseServerUrl' cannot be null or empty.");
                    if (
                        ((c = X(a, "withCredentials", "boolean")),
                        null != c && (b.l = c),
                        (c = Y(a, "licensePostProcessor", Function)),
                        null != c && (b.h = c),
                        (c = Y(a, "licensePreProcessor", Function)),
                        null != c && (b.i = c),
                        (c = X(a, "distinctiveIdentifierRequired", "boolean")),
                        null != c && (b.g = c),
                        (c = X(a, "persistentStateRequired", "boolean")),
                        null != c && (b.o = c),
                        (c = W(a, "audioRobustness")),
                        null != c && (b.f = c),
                        (c = W(a, "videoRobustness")),
                        null != c && (b.v = c),
                        (c = Y(a, "serverCertificate", Uint8Array)),
                        null != c && (b.c = c),
                        (c = Y(a, "initData", Object)))
                    ) {
                        if (((a = Y(c, "initData", Uint8Array)), null == a))
                            throw Error("'initData.initData' cannot be null.");
                        if (((c = W(c, "initDataType")), null == c))
                            throw Error("'initData.initDataType' cannot be null.");
                        b.b.push({ initData: new Uint8Array(a.buffer), initDataType: c });
                    }
                    return b;
                }
                function Ua(a, b) {
                    var c = a.b.concat(
                        b.map(function(a) {
                            return { initData: new Uint8Array(a.initData.buffer), initDataType: a.initDataType };
                        })
                    );
                    a.b = A(c, function(a) {
                        return Array.prototype.join.apply(a.initData) + "," + a.initDataType;
                    });
                }
                function Va(a, b, c, d, e, f, g, h, i, j, k) {
                    (this.g = a),
                        (this.j = b),
                        (this.o = c),
                        (this.a = []),
                        (this.h = e || null),
                        (this.i = f || null),
                        (this.f = g == Qe),
                        (this.v = h == Re),
                        (this.c = i || ""),
                        (this.l = j || ""),
                        (this.b = k || null),
                        d && this.a.push(d);
                }
                function Wa(a, b) {
                    try {
                        var c = new Ya(a, b);
                        return Promise.resolve(c);
                    } catch (d) {
                        return Promise.reject(d);
                    }
                }
                function Xa(a) {
                    var b = this.mediaKeys;
                    return (
                        b && b != a && $a(b, null),
                        delete this.mediaKeys,
                        (this.mediaKeys = a) && $a(a, this),
                        Promise.resolve()
                    );
                }
                function Ya(a, b) {
                    this.a = this.keySystem = a;
                    var c = !0;
                    "org.w3.clearkey" == a && ((this.a = "webkit-org.w3.clearkey"), (c = !1));
                    var d,
                        e = !1;
                    (d = document.getElementsByTagName("video")),
                        (d = d.length ? d[0] : document.createElement("video"));
                    for (var f = 0; f < b.length; ++f) {
                        var g = b[f],
                            h = {
                                audioCapabilities: [],
                                videoCapabilities: [],
                                persistentState: "optional",
                                distinctiveIdentifier: "optional",
                                initDataTypes: g.initDataTypes,
                                sessionTypes: ["temporary"]
                            },
                            i = !1;
                        if (g.audioCapabilities)
                            for (var j = 0; j < g.audioCapabilities.length; ++j) {
                                var k = g.audioCapabilities[j];
                                k.contentType &&
                                    ((i = !0),
                                    d.canPlayType(k.contentType.split(";")[0], this.a) &&
                                        (h.audioCapabilities.push(k), (e = !0)));
                            }
                        if (g.videoCapabilities)
                            for (j = 0; j < g.videoCapabilities.length; ++j)
                                (k = g.videoCapabilities[j]),
                                    k.contentType &&
                                        ((i = !0),
                                        d.canPlayType(k.contentType, this.a) &&
                                            (h.videoCapabilities.push(k), (e = !0)));
                        if (
                            (i || (e = d.canPlayType("video/mp4", this.a) || d.canPlayType("video/webm", this.a)),
                            "required" == g.persistentState &&
                                (c
                                    ? ((h.persistentState = "required"), (h.sessionTypes = ["persistent-license"]))
                                    : (e = !1)),
                            e)
                        )
                            return void (this.b = h);
                    }
                    throw Error("None of the requested configurations were supported.");
                }
                function Za(a) {
                    (this.g = a), (this.b = null), (this.a = new ba()), (this.c = []), (this.f = {});
                }
                function $a(a, b) {
                    (a.b = b),
                        da(a.a),
                        b &&
                            (ca(a.a, b, "webkitneedkey", a.Bb.bind(a)),
                            ca(a.a, b, "webkitkeymessage", a.Ab.bind(a)),
                            ca(a.a, b, "webkitkeyadded", a.yb.bind(a)),
                            ca(a.a, b, "webkitkeyerror", a.zb.bind(a)));
                }
                function _a(a, b) {
                    var c = a.f[b];
                    return c ? c : (c = a.c.shift()) ? ((c.sessionId = b), (a.f[b] = c)) : null;
                }
                function ab(a, b, c) {
                    fa.call(this, null),
                        (this.f = a),
                        (this.h = !1),
                        (this.a = this.b = null),
                        (this.c = b),
                        (this.g = c),
                        (this.sessionId = ""),
                        (this.expiration = NaN),
                        (this.closed = new ia()),
                        (this.keyStatuses = new eb());
                }
                function bb(a, b, c) {
                    if (a.h) return Promise.reject(Error("The session is already initialized."));
                    a.h = !0;
                    var d;
                    try {
                        if ("persistent-license" == a.g)
                            if (c) d = Na("LOAD_SESSION|" + c);
                            else {
                                var e = new Uint8Array(b);
                                d = Na("PERSISTENT|" + Ma(e));
                            }
                        else d = new Uint8Array(b);
                    } catch (f) {
                        return Promise.reject(f);
                    }
                    a.b = new ia();
                    try {
                        a.f.webkitGenerateKeyRequest(a.c, d);
                    } catch (g) {
                        if ("InvalidStateError" != g.name) return (a.b = null), Promise.reject(g);
                        setTimeout(
                            function() {
                                try {
                                    this.f.webkitGenerateKeyRequest(this.c, d);
                                } catch (a) {
                                    this.b.reject(a), (this.b = null);
                                }
                            }.bind(a),
                            10
                        );
                    }
                    return a.b;
                }
                function cb(a, b) {
                    var c = a.keyStatuses;
                    (c.size = void 0 == b ? 0 : 1),
                        (c.a = b),
                        (c = Q({ type: "keystatuseschange" })),
                        a.dispatchEvent(c);
                }
                function db(a) {
                    (this.b = a), (this.a = 0);
                }
                function eb() {
                    (this.size = 0), (this.a = void 0);
                }
                function fb() {
                    (Navigator.prototype.requestMediaKeySystemAccess &&
                        MediaKeySystemAccess.prototype.getConfiguration) ||
                        (HTMLMediaElement.prototype.webkitGenerateKeyRequest
                            ? ((Se = new Uint8Array([0])),
                              (Navigator.prototype.requestMediaKeySystemAccess = Wa),
                              delete HTMLMediaElement.prototype.mediaKeys,
                              (HTMLMediaElement.prototype.mediaKeys = null),
                              (HTMLMediaElement.prototype.setMediaKeys = Xa),
                              (a.MediaKeys = Za),
                              (a.MediaKeySystemAccess = Ya))
                            : ((Navigator.prototype.requestMediaKeySystemAccess = u),
                              delete HTMLMediaElement.prototype.mediaKeys,
                              (HTMLMediaElement.prototype.mediaKeys = null),
                              (HTMLMediaElement.prototype.setMediaKeys = v),
                              (a.MediaKeys = w),
                              (a.MediaKeySystemAccess = x)));
                }
                function gb(a) {
                    (this.systemIds = []), (this.cencKeyIds = []), (a = new C(new DataView(a.buffer)));
                    try {
                        for (; D(a); ) {
                            var b = a.a,
                                c = F(a),
                                d = F(a);
                            if ((1 == c ? (c = G(a)) : 0 == c && (c = a.b.byteLength - b), 1886614376 != d))
                                I(a, c - (a.a - b));
                            else {
                                var e = E(a);
                                if (e > 1) I(a, c - (a.a - b));
                                else {
                                    I(a, 3);
                                    var f = Qa(H(a)),
                                        g = [];
                                    if (e > 0)
                                        for (var h = F(a), i = 0; h > i; ++i) {
                                            var j = Qa(H(a));
                                            g.push(j);
                                        }
                                    var k = F(a);
                                    I(a, k),
                                        this.cencKeyIds.push.apply(this.cencKeyIds, g),
                                        this.systemIds.push(f),
                                        a.a != b + c && I(a, c - (a.a - b));
                                }
                            }
                        }
                    } catch (l) {}
                }
                function hb(a) {
                    var b;
                    a instanceof hb
                        ? (ib(this, a.R),
                          (this.aa = a.aa),
                          (this.P = a.P),
                          jb(this, a.fa),
                          (this.N = a.N),
                          kb(this, a.a.clone()),
                          (this.$ = a.$))
                        : a && (b = String(a).match(Te))
                        ? (ib(this, b[1] || "", !0),
                          (this.aa = lb(b[2] || "")),
                          (this.P = lb(b[3] || "", !0)),
                          jb(this, b[4]),
                          (this.N = lb(b[5] || "", !0)),
                          kb(this, b[6] || "", !0),
                          (this.$ = lb(b[7] || "")))
                        : (this.a = new ob(null));
                }
                function ib(a, b, c) {
                    (a.R = c ? lb(b, !0) : b), a.R && (a.R = a.R.replace(/:$/, ""));
                }
                function jb(a, b) {
                    if (b) {
                        if (((b = Number(b)), isNaN(b) || 0 > b)) throw Error("Bad port number " + b);
                        a.fa = b;
                    } else a.fa = null;
                }
                function kb(a, b, c) {
                    b instanceof ob ? (a.a = b) : (c || (b = mb(b, Xe)), (a.a = new ob(b)));
                }
                function lb(a, b) {
                    return a ? (b ? decodeURI(a) : decodeURIComponent(a)) : "";
                }
                function mb(a, b, c) {
                    return "string" == typeof a
                        ? ((a = encodeURI(a).replace(b, nb)), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a)
                        : null;
                }
                function nb(a) {
                    return (a = a.charCodeAt(0)), "%" + ((a >> 4) & 15).toString(16) + (15 & a).toString(16);
                }
                function ob(a) {
                    this.b = a || null;
                }
                function pb(a, b, c) {
                    if (!a.a && ((a.a = {}), (a.c = 0), a.b))
                        for (var d = a.b.split("&"), e = 0; e < d.length; e++) {
                            var f = d[e].indexOf("="),
                                g = null,
                                h = null;
                            f >= 0 ? ((g = d[e].substring(0, f)), (h = d[e].substring(f + 1))) : (g = d[e]),
                                (g = decodeURIComponent(g.replace(/\+/g, " "))),
                                (h = h || ""),
                                pb(a, g, decodeURIComponent(h.replace(/\+/g, " ")));
                        }
                    (a.b = null), (d = a.a.hasOwnProperty(b) && a.a[b]) || (a.a[b] = d = []), d.push(c), a.c++;
                }
                function qb() {
                    (this.id = this.url = null),
                        (this.type = "static"),
                        (this.c = this.j = this.s = null),
                        (this.h = 5),
                        (this.f = this.b = this.g = null),
                        (this.i = 1),
                        (this.a = []);
                }
                function rb() {
                    (this.g = this.f = this.c = this.s = this.a = this.start = this.id = null), (this.b = []);
                }
                function sb() {
                    (this.i = this.b = this.height = this.width = this.contentType = this.lang = this.group = this.id = null),
                        (this.c = !1),
                        (this.h = this.g = this.f = this.s = null),
                        (this.j = []),
                        (this.a = []);
                }
                function tb() {
                    this.value = null;
                }
                function ub() {
                    this.contentType = this.lang = this.id = null;
                }
                function vb() {
                    (this.a = this.b = this.g = this.s = this.h = this.f = this.height = this.width = this.bandwidth = this.lang = this.id = null),
                        (this.c = []);
                }
                function wb() {
                    (this.value = this.schemeIdUri = this.b = null), (this.children = []), (this.a = this.pssh = null);
                }
                function xb() {
                    this.parsedPssh = this.psshBox = null;
                }
                function yb() {
                    this.url = null;
                }
                function zb() {
                    this.url = null;
                }
                function Ab() {
                    (this.s = null), (this.g = 1), (this.c = this.b = this.a = this.f = null);
                }
                function Bb() {
                    this.a = this.url = null;
                }
                function Cb() {
                    this.a = this.url = null;
                }
                function Db() {
                    (this.s = null),
                        (this.f = 1),
                        (this.b = this.g = null),
                        (this.i = 1),
                        (this.h = null),
                        (this.a = []),
                        (this.c = null);
                }
                function Eb() {
                    this.a = this.b = null;
                }
                function Fb() {
                    (this.b = 1), (this.a = this.i = null), (this.j = 1), (this.c = this.g = this.f = this.h = null);
                }
                function Gb() {
                    this.a = [];
                }
                function Hb() {
                    this.c = this.a = this.b = null;
                }
                function Ib(a, b) {
                    (this.na = a), (this.end = b);
                }
                function Jb(a) {
                    for (var b = [], c = 0; c < a.b.length; ++c) {
                        var d = a.b[c];
                        null != d.group && (b[d.group] = !0);
                    }
                    for (c = 0; c < a.b.length; ++c)
                        if (((d = a.b[c]), null == d.group)) {
                            for (var e = 1; 1 == b[e]; ) ++e;
                            (b[e] = !0), (d.group = e);
                        }
                }
                function Kb(a, b) {
                    if (!b || 0 === b.length) return a;
                    for (var c = [], d = 0; d < b.length; d++) {
                        var e = b[d].url;
                        null == a || 0 === a.length ? c.push(new hb(e)) : ((e = Lb(a.slice(0, 1), e)), c.push(e[0]));
                    }
                    return c;
                }
                function Lb(a, b) {
                    if (!b) return a;
                    var c = new hb(b);
                    return a
                        ? a.map(function(a) {
                              return a.resolve(c);
                          })
                        : [c];
                }
                function Mb(a, b, c) {
                    var d = Sb(c);
                    return (b = Ob(b, c.constructor.TAG_NAME)) && d.parse(a, b), d;
                }
                function Nb(a, b, c) {
                    var d = null;
                    return (b = Ob(b, c.TAG_NAME)) && ((d = new c()), d.parse(a, b)), d;
                }
                function Ob(a, b) {
                    for (var c = null, d = 0; d < a.childNodes.length; d++)
                        if (a.childNodes[d].tagName == b) {
                            if (c) return null;
                            c = a.childNodes[d];
                        }
                    return c;
                }
                function Pb(a, b, c) {
                    for (var d = [], e = 0; e < b.childNodes.length; e++)
                        if (b.childNodes[e].tagName == c.TAG_NAME) {
                            var f = new c();
                            f.parse.call(f, a, b.childNodes[e]), d.push(f);
                        }
                    return d;
                }
                function Qb(a) {
                    return (a = a.firstChild), a.nodeType != Node.TEXT_NODE ? null : a.nodeValue;
                }
                function Rb(a) {
                    return a
                        ? a.map(function(a) {
                              return a.clone();
                          })
                        : null;
                }
                function Sb(a) {
                    return a ? a.clone() : null;
                }
                function Tb(a, b, c, d) {
                    return (a = c(a.getAttribute(b))), null != a ? a : void 0 !== d ? d : null;
                }
                function Ub(a) {
                    return a ? ((a = Date.parse(a)), isNaN(a) ? null : Math.floor(a / 1e3)) : null;
                }
                function Vb(b) {
                    if (!b) return null;
                    var c = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(
                        b
                    );
                    if (!c) return null;
                    b = 0;
                    var d = Zb(c[1]);
                    return (
                        d && (b += 31536e3 * d),
                        (d = Zb(c[2])) && (b += 2592e3 * d),
                        (d = Zb(c[3])) && (b += 86400 * d),
                        (d = Zb(c[4])) && (b += 3600 * d),
                        (d = Zb(c[5])) && (b += 60 * d),
                        (c = a.parseFloat(c[6])),
                        (c = isNaN(c) ? null : c) && (b += c),
                        b
                    );
                }
                function Wb(a) {
                    var b = /([0-9]+)-([0-9]+)/.exec(a);
                    return b
                        ? ((a = Zb(b[1])), null == a ? null : ((b = Zb(b[2])), null == b ? null : new Ib(a, b)))
                        : null;
                }
                function Xb(b) {
                    return (b = a.parseInt(b, 10)), isNaN(b) ? null : b;
                }
                function Yb(b) {
                    return (b = a.parseInt(b, 10)), b > 0 ? b : null;
                }
                function Zb(b) {
                    return (b = a.parseInt(b, 10)), b >= 0 ? b : null;
                }
                function $b(a) {
                    return a;
                }
                function _b(a, b) {
                    (this.url = a),
                        (this.b = b || new ac()),
                        (this.g = this.i = this.h = 0),
                        (this.a = null),
                        (this.c = new ia()),
                        (this.f = null);
                }
                function ac() {
                    (this.body = null),
                        (this.a = 1),
                        (this.h = 1e3),
                        (this.c = 0),
                        (this.method = "GET"),
                        (this.f = "arraybuffer"),
                        (this.b = {}),
                        (this.g = this.i = !1);
                }
                function bc(a) {
                    cc(a), (a.b.body = null), a.c.destroy(), (a.c = null), (a.f = null);
                }
                function cc(a) {
                    a.a &&
                        ((a.a.onload = null),
                        (a.a.onreadystatechange = null),
                        (a.a.onerror = null),
                        (a.a.ontimeout = null)),
                        (a.a = null);
                }
                function dc(a) {
                    var b = a.url.split("/"),
                        c = parseInt(b[2], 10),
                        d = parseInt(b[3], 10),
                        e = new Ha();
                    return za(e)
                        .then(function() {
                            return La(e, c, d);
                        })
                        .then(
                            oa(a, function(a) {
                                var b = JSON.parse(JSON.stringify(new XMLHttpRequest()));
                                return (b.response = a), (a = this.c), a.resolve(b), Aa(e), bc(this), a;
                            })
                        )
                        ["catch"](
                            oa(a, function(a) {
                                return Aa(e), bc(this), Promise.reject(a);
                            })
                        );
                }
                function ec(a, b, c) {
                    return (
                        (b = Error(b)),
                        (b.type = c),
                        (b.status = a.a.status),
                        (b.url = a.url),
                        (b.method = a.b.method),
                        (b.body = a.b.body),
                        (b.Lb = a.a),
                        b
                    );
                }
                function fc(b) {
                    cc(b), a.setTimeout(b.bb.bind(b), b.g * (1 + 0.5 * (2 * Math.random() - 1))), (b.g *= 2);
                }
                function gc(a, b, c, d) {
                    (this.c = b),
                        (this.f = c || 0),
                        (this.h = null != d ? d : null),
                        (this.b = this.a = null),
                        (this.i = a);
                }
                function hc(a, b) {
                    return a && 0 !== a.length
                        ? a.map(function(a) {
                              return a.resolve(b);
                          })
                        : [b];
                }
                function ic(a, b, c) {
                    return a.a
                        ? a.a
                        : ((b = b || new ac()),
                          (a.f || a.h) && (b.b.Range = "bytes=" + (a.f + "-" + (null != a.h ? a.h : ""))),
                          (a.a = jc(a, 0, b, c)),
                          a.a);
                }
                function jc(a, b, c, d) {
                    var e = a.c[b].toString();
                    return (
                        a.i && (e = a.i(e, c.b) || e),
                        (a.b = new _b(e, c)),
                        d && (a.b.f = d),
                        (e = a.b.bb().then(
                            oa(a, function(a) {
                                return (this.b = this.a = null), Promise.resolve(a.response);
                            })
                        )),
                        (e = e["catch"](
                            oa(a, function(a) {
                                return this.a && b + 1 < this.c.length
                                    ? (this.a = jc(this, b + 1, c, d))
                                    : ((this.a = this.b = null), Promise.reject(a));
                            })
                        ))
                    );
                }
                function kc(a, b) {
                    (this.a = new ac()),
                        (this.a.f = "text"),
                        (this.a.a = 3),
                        (this.a.c = 1e3 * (null != b ? b : 0)),
                        (this.a.g = !0),
                        (this.b = a);
                }
                function lc(a) {
                    var b = a.b;
                    return ic(b, a.a).then(function(a) {
                        var c;
                        return (
                            (c = b.c),
                            (c = (a = new DOMParser().parseFromString(a, "text/xml")) ? Nb({ s: c }, a, qb) : null)
                                ? Promise.resolve(c)
                                : ((c = Error("MPD parse failure.")), (c.type = "dash"), Promise.reject(c))
                        );
                    });
                }
                function mc(a, b, c, d) {
                    for (var e = b.a, f = [], g = 0; d > g; ++g) {
                        var h = g + c,
                            i = (h - 1) * e.a,
                            j = i / e.b,
                            i = (i + e.a) / e.b,
                            h = nc(a, b, h - 1 + e.j, (h - 1) * e.a);
                        if (!h) return null;
                        f.push(new rc(j, i, h));
                    }
                    return f;
                }
                function nc(a, b, c, d) {
                    if (!b.a) return null;
                    var e = b.a.h;
                    return e
                        ? (c = oc(e, b.id, c, b.bandwidth, d))
                            ? ((b = hc(b.s, c)), new gc(a, b, 0, null))
                            : null
                        : b.s
                        ? new gc(a, b.s, 0, null)
                        : null;
                }
                function oc(b, c, d, e, f) {
                    var g = { RepresentationID: c, Number: d, Bandwidth: e, Time: f };
                    b = b.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)d)?\$/g, function(b, c, d) {
                        if ("$$" == b) return "$";
                        var e = g[c];
                        return null == e
                            ? b
                            : ("RepresentationID" == c && d && (d = void 0),
                              (b = e.toString()),
                              (d = a.parseInt(d, 10) || 1),
                              (d = Math.max(0, d - b.length)),
                              Array(d + 1).join("0") + b);
                    });
                    try {
                        return new hb(b);
                    } catch (h) {
                        if (h instanceof URIError) return null;
                        throw h;
                    }
                }
                function pc(a, b, c) {
                    var d = 0;
                    (b *= c), (a = a.a), (c = []);
                    for (var e = 0; e < a.length && a[e].a; ++e) {
                        var f = a[e].b,
                            f = null != f ? f : d,
                            g = a[e].c || 0;
                        0 > g &&
                            ((g = a[e].a),
                            (g =
                                e + 1 === a.length
                                    ? Math.ceil((a[0].b + b - f) / g) - 1
                                    : Math.ceil((a[e + 1].b - f) / g) - 1)),
                            0 < c.length && f != d && (c[c.length - 1].end = f);
                        for (var h = 0; g >= h; ++h) (d = f + a[e].a), c.push({ start: f, end: d }), (f = d);
                    }
                    return c;
                }
                function qc(a) {
                    this.a = a;
                }
                function rc(a, b, c) {
                    (this.b = a), (this.a = b), (this.url = c);
                }
                function sc(a, b, c) {
                    return new rc(b, c, a.url);
                }
                function tc(a, b) {
                    for (var c = a.length - 1; c >= 0; --c) {
                        var d = a[c];
                        if (b >= d.b && (null == d.a || b < d.a)) return c;
                    }
                    return -1;
                }
                function uc(a, b) {
                    return a.map(function(a) {
                        return sc(a, a.b + b, null != a.a ? a.a + b : null);
                    });
                }
                function vc() {}
                function wc(a) {
                    (this.u = a), (this.g = 0);
                }
                function xc(a) {
                    if (0 == a.u.length) throw new RangeError("SegmentIndex: There is no first SegmentReference.");
                    return a.u[0];
                }
                function yc(a) {
                    if (0 == a.u.length) throw new RangeError("SegmentIndex: There is no last SegmentReference.");
                    return a.u[a.u.length - 1];
                }
                function zc(a, b) {
                    if ((a.g != b.g && (b = new wc(uc(b.u, a.g - b.g))), 0 == a.length())) a.u = b.u.slice(0);
                    else if (0 != b.length() && null != yc(a).a && !(null != yc(b).a && yc(b).a < yc(a).a)) {
                        if (yc(a).a <= xc(b).b)
                            var c = sc(yc(a), yc(a).b, xc(b).b),
                                c = a.u.slice(0, -1).concat([c]);
                        else {
                            var d;
                            for (d = 0; d < a.u.length && !(a.u[d].a >= xc(b).b); ++d);
                            a.u[d].b < xc(b).b
                                ? ((c = sc(a.u[d], a.u[d].b, xc(b).b)), (c = a.u.slice(0, d).concat([c])))
                                : (xc(a).b > xc(b).b || xc(b), (c = a.u.slice(0, d)));
                        }
                        a.u = c.concat(b.u);
                    }
                }
                function Ac(a, b, c, d) {
                    wc.call(this, a),
                        (this.f = b),
                        (this.o = c),
                        (this.v = d),
                        (this.c = this.j = this.a = null),
                        Bc(this);
                }
                function Bc(a) {
                    if (0 != a.length()) {
                        a.length();
                        var b = null != yc(a).a ? yc(a).a : yc(a).b;
                        if (a.f.b > a.v) a.a = b;
                        else {
                            var c = a.v - (a.f.b + a.o.start);
                            0 > c ? (a.a = b) : c < Math.max(yc(a).b, yc(a).a || 0) ? (yc(a), (a.a = b)) : (a.a = c);
                        }
                        (a.j = yc(a).b), (a.c = xc(a).b);
                    }
                }
                function Cc(a, b) {
                    if ((Dc(a, b), null == a.a || null == a.j || null == a.c)) return { start: 0, end: 0 };
                    var c = b - a.v,
                        d = a.a + c;
                    return (
                        null != a.f.f && ((d = d - a.c - a.f.f), d > 0 && (a.c += d)),
                        (c = a.j + c),
                        (c = 0 < a.length() ? (null != yc(a).a ? Math.min(c, yc(a).a) : c) : a.c),
                        (c = Math.max(c, a.c)),
                        { start: a.c, end: c }
                    );
                }
                function Dc(a, b) {
                    if (null != a.f.f)
                        if (null == a.a) a.length();
                        else {
                            for (var c = a.a + (b - a.v), d = 0, e = 0; e < a.u.length; ++e) {
                                var f = null;
                                if (
                                    (e < a.u.length - 1
                                        ? (f = a.u[e + 1].a)
                                        : ((f = a.u[e]), (f = null != f.a ? f.a + (f.a - f.b) : null)),
                                    !(null != f && f < c - a.f.f))
                                )
                                    break;
                                ++d;
                            }
                            d > 0 && a.u.splice(0, d);
                        }
                }
                function Ec(a, b, c, d, e) {
                    var f,
                        g = 1,
                        h = 0;
                    if (a.b > d) f = null;
                    else {
                        var i = a.i || 0,
                            j = a.f || 0;
                        (f = c.a), (f = f.a / f.b);
                        var k = d - (a.b + b.start);
                        0 > k
                            ? (f = null)
                            : ((j = k - 2 * f - j),
                              0 > j && (j = 0),
                              (j = Math.ceil(j / f) * f),
                              (k -= f),
                              0 > k
                                  ? (f = null)
                                  : ((i = Math.floor(k / f) * f - i),
                                    0 > i && (i = 0),
                                    (i = Math.floor(i / f) * f),
                                    (f = { Na: j / f + 1, current: (i >= j ? i : j) / f + 1 })));
                    }
                    if ((f && ((g = f.Na), (h = f.current - f.Na + 1)), (g = mc(e, c, g, h)), null == g))
                        throw ((a = Error("Failed to generate SegmentReferences.")), (a.type = "stream"), a);
                    Ac.call(this, g, a, b, d),
                        (this.l = c),
                        (this.i = this.b = 0 < this.length() ? a.b + b.start + yc(this).a : null),
                        (this.h = f ? f.current + 1 : null),
                        (this.w = e);
                }
                function Fc(a, b) {
                    if (null != a.b && null != a.i && null != a.h) {
                        var c = a.l.a,
                            c = c.a / c.b,
                            d = Math.floor((a.i + (b - a.v) - a.b) / c);
                        if (0 != d) {
                            var e = mc(a.w, a.l, a.h, d);
                            Array.prototype.push.apply(a.u, uc(e, a.g)), (a.b += d * c), (a.h += d);
                        }
                    }
                }
                function Gc(a, b, c, d, e) {
                    (this.f = a), (this.b = b), (this.c = c), (this.h = d), (this.a = null), (this.g = e);
                }
                function Hc(a, b, c, d, e) {
                    (this.c = a), (this.b = b), (this.g = c), (this.a = null), (this.h = d), (this.f = e);
                }
                function Ic(a, b, c, d, e) {
                    (this.b = a), (this.c = b), (this.f = c), (this.h = d), (this.a = null), (this.g = e);
                }
                function Jc(a) {
                    (this.b = a), (this.a = null);
                }
                function Kc() {
                    (this.A = Ze++),
                        (this.id = this.C = this.F = null),
                        (this.c = 0),
                        (this.height = this.width = this.bandwidth = null),
                        (this.b = this.a = ""),
                        (this.f = []),
                        (this.L = !1),
                        (this.J = !0);
                }
                function Lc(a) {
                    var b = a.a || "";
                    return a.b && (b += '; codecs="' + a.b + '"'), b;
                }
                function Mc() {
                    (this.A = $e++),
                        (this.id = null),
                        (this.contentType = this.lang = ""),
                        (this.b = !1),
                        (this.m = []),
                        (this.a = []);
                }
                function Nc(a) {
                    for (var b = [], c = 0; c < a.a.length; ++c) {
                        var d = new Qc();
                        (d.id = a.A),
                            (d.a = a.a[c]),
                            (d.contentType = a.contentType),
                            (d.b = a.m.length ? Lc(a.m[0]) : ""),
                            b.push(d);
                    }
                    return b;
                }
                function Oc() {
                    (this.id = null), (this.start = 0), (this.b = null), (this.a = []);
                }
                function Pc() {
                    (this.b = !1), (this.g = this.f = null), (this.c = 0), (this.a = []);
                }
                function Qc() {
                    (this.id = 0), (this.a = null), (this.b = this.contentType = "");
                }
                function Rc(a, b, c, d, e) {
                    fa.call(this, a),
                        (this.c = b),
                        (this.a = new pa(c, d, e)),
                        (this.B = this.D = this.b = null),
                        (this.I = !1),
                        (this.g = null),
                        (this.l = !1),
                        (this.i = null),
                        (this.o = !1),
                        (this.h = new ia()),
                        (this.j = this.f = !1),
                        (this.K = 0),
                        (this.w = 15),
                        (this.G = !1);
                }
                function Sc(a, b, c) {
                    a.b &&
                        !a.l &&
                        ((a.l = !0),
                        Yc(a),
                        ua(a.a)
                            .then(
                                oa(a, function() {
                                    var a = this.c.currentTime;
                                    return !b && 0 < qa(this.a, a) && 0 <= tc(this.a.b, a)
                                        ? Promise.resolve()
                                        : c
                                        ? ta(this.a, this.c.currentTime + c)
                                        : ((this.G = !0), sa(this.a));
                                })
                            )
                            .then(
                                oa(a, function() {
                                    (this.l = !1), Xc(this, 0);
                                })
                            )
                            ["catch"](
                                oa(a, function(a) {
                                    (this.l = !1), this.f ? ((a = R(a)), this.dispatchEvent(a)) : this.h.reject(a);
                                })
                            ));
                }
                function Tc(a, b, c) {
                    a = a.a;
                    var d = a.b.length;
                    return (
                        (a = d > 0 ? a.b[d - 1] : null),
                        null != a ? (null != a.a ? c.ia(a.a) : null) : c.ia(b) || (c.length() ? yc(c) : null)
                    );
                }
                function Uc(a) {
                    if (!a.o && null != a.i) {
                        a.o = !0;
                        var b = a.a,
                            c = a.i,
                            d = c - b.o;
                        0 != d && ((b.b = uc(b.b, d)), (b.o = c)), a.h.resolve(a.i);
                    }
                }
                function Vc(a, b) {
                    var c;
                    (c = b.a.split("/")[0]),
                        (c = Q({
                            type: "adaptation",
                            bubbles: !0,
                            contentType: c,
                            size: "video" != c ? null : { width: b.width, height: b.height },
                            bandwidth: b.bandwidth
                        })),
                        a.dispatchEvent(c);
                }
                function Wc(a) {
                    var b = Q({ type: "ended" });
                    a.dispatchEvent(b);
                }
                function Xc(b, c) {
                    b.g = a.setTimeout(b.xb.bind(b), c);
                }
                function Yc(b) {
                    null != b.g && (a.clearTimeout(b.g), (b.g = null));
                }
                function Zc(a) {
                    (this.b = a), (this.a = null);
                }
                function $c(a, b) {
                    fa.call(this, a),
                        (this.b = b),
                        (this.h = !0),
                        (this.g = this.f = null),
                        (this.c = new ia()),
                        (this.a = null);
                }
                function _c() {}
                function ad(a, b, c, d, e, f, g) {
                    (this.g = a),
                        (this.j = b),
                        (this.f = c),
                        (this.a = d),
                        (this.c = e),
                        (this.v = f),
                        (this.i = this.b = null),
                        (this.h = g);
                }
                function bd(a) {
                    this.a = a;
                }
                function cd(a, b, c) {
                    for (var d = B() / 1e3, e = 0; e < b.a.length; ++e)
                        for (var f = b.a[e], g = 0; g < f.b.length; ++g) {
                            var h = f.b[g];
                            if ("text" != h.contentType)
                                for (var i = 0; i < h.a.length; ++i) {
                                    var j = h.a[i],
                                        k = 0,
                                        k = k + (j.g ? 1 : 0),
                                        k = k + (j.b ? 1 : 0),
                                        k = k + (j.a ? 1 : 0);
                                    0 == k
                                        ? (h.a.splice(i, 1), --i)
                                        : 1 != k && (j.g ? ((j.b = null), (j.a = null)) : j.b && (j.a = null));
                                }
                        }
                    for (dd(b), e = 0; e < b.a.length; ++e)
                        for (f = b.a[e], g = 0; g < f.b.length; ++g) {
                            for (i = h = f.b[g], j = null, k = 0; k < i.a.length; ++k) {
                                var l = i.a[k].f || "";
                                j ? l != j && (i.a.splice(k, 1), --k) : (j = l);
                            }
                            0 == h.a.length && (f.b.splice(g, 1), --g);
                        }
                    for (
                        "dynamic" == b.type && null == b.b && (b.b = d),
                            e = new Pc(),
                            "dynamic" == b.type && ((e.b = !0), (e.f = b.g), (e.g = new gc(c, b.j || b.url))),
                            e.c = b.h || 5,
                            f = 0;
                        f < b.a.length && ((g = b.a[f]), null != g.start);
                        ++f
                    )
                        (g = ed(a, b, g, d, c)), e.a.push(g);
                    return e;
                }
                function dd(a) {
                    if (a.a.length) {
                        null == a.a[0].start && (a.a[0].start = 0);
                        var b = function(a) {
                            return 0 == a || !!a;
                        };
                        "dynamic" == a.type && (a.c = null),
                            b(a.c) && 1 == a.a.length && !b(a.a[0].a) && (a.a[0].a = a.c);
                        for (var c = 0, d = !0, e = 0; e < a.a.length; ++e) {
                            var f = a.a[e - 1],
                                g = a.a[e],
                                h = a.a[e + 1] || { start: a.c };
                            !b(g.start) && f && b(f.start) && b(f.a) && (g.start = f.start + f.a),
                                !b(g.a) && b(h.start) && (g.a = h.start - g.start),
                                null != g.start && null != g.a ? (c += g.a) : (d = !1);
                        }
                        b(a.c) ||
                            ((e = a.a[a.a.length - 1]),
                            d
                                ? (a.c = c)
                                : b(e.start) && b(e.a)
                                ? (a.c = e.start + e.a)
                                : "dynamic" != a.type && (a.c = c));
                    }
                }
                function ed(a, b, c, d, e) {
                    var f = new Oc();
                    (f.id = c.id), (f.start = c.start), (f.b = c.a);
                    var g = new Z();
                    c.b.forEach(function(a) {
                        g.push(a.contentType || "", a);
                    });
                    for (var h = aa(g), i = 0; i < h.length; ++i) {
                        var j = new Z();
                        g.get(h[i]).forEach(function(a) {
                            j.push(a.group, a);
                        });
                        for (var k = aa(j), l = 0; l < k.length; ++l) {
                            var m = new Z();
                            j.get(k[l]).forEach(function(a) {
                                m.push(a.lang, a);
                            });
                            for (var n = aa(m), o = 0; o < n.length; ++o) {
                                var p = m.get(n[o]),
                                    p = fd(a, b, c, p, d, e);
                                f.a.push(p);
                            }
                        }
                    }
                    return f;
                }
                function fd(a, b, c, e, f, g) {
                    d(
                        e.every(function(a) {
                            return (
                                a.group == e[0].group &&
                                (a.lang || "") == (e[0].lang || "") &&
                                (a.contentType || "") == (e[0].contentType || "")
                            );
                        })
                    );
                    var h = new Mc(),
                        i = e.filter(function(a) {
                            return null != a.id;
                        });
                    i.length == e.length &&
                        (h.id = i
                            .map(function(a) {
                                return a.id;
                            })
                            .sort()
                            .reduce(function(a, b) {
                                return a + "," + b;
                            })),
                        (h.lang = e[0].lang || ""),
                        (h.contentType = e[0].contentType || ""),
                        (h.b = e.some(function(a) {
                            return a.c;
                        }));
                    for (var i = {}, j = 0; j < e.length; ++j)
                        for (var k = e[j], l = 0; l < k.a.length; ++l) {
                            var m = k.a[l],
                                n = id(a, m),
                                o = h.a.slice(0);
                            hd(n, o),
                                (0 == o.length && 0 < h.a.length) ||
                                    !(m = kd(b, c, m, f, g)) ||
                                    (h.m.push(m), (h.a = o), (i[m.A] = k));
                        }
                    if (
                        h.a.some(function(a) {
                            return "" == a.a;
                        })
                    )
                        return (
                            h.m.forEach(function(a) {
                                a.L = !0;
                            }),
                            h
                        );
                    for (a = gd(e), j = 0; j < h.m.length; ++j) (m = h.m[j]), (k = i[m.A]), k == a && (m.L = !0);
                    return h;
                }
                function gd(a) {
                    for (var b = null, c = null, d = 0; d < a.length; ++d)
                        for (var e = a[d], f = 0; f < e.a.length; ++f) {
                            var g = e.a[f],
                                g = (g.width || 1) * (g.height || 1) * (g.bandwidth || 1);
                            (null == b || b > g) && ((b = g), (c = e));
                        }
                    return c;
                }
                function hd(a, b) {
                    if (0 == b.length) Array.prototype.push.apply(b, a);
                    else
                        for (var c = 0; c < b.length; ++c) {
                            for (var d = !1, e = 0; e < a.length; ++e) {
                                var f = b[c],
                                    g = a[e];
                                if (
                                    f.a == g.a &&
                                    f.j == g.j &&
                                    f.l == g.l &&
                                    f.h == g.h &&
                                    f.i == g.i &&
                                    f.g == g.g &&
                                    f.o == g.o &&
                                    f.f == g.f &&
                                    f.v == g.v &&
                                    Ra(f.c, g.c)
                                ) {
                                    d = !0;
                                    break;
                                }
                            }
                            d || (b.splice(c, 1), --c);
                        }
                }
                function id(a, b) {
                    var c = [];
                    if (0 == b.c.length) c.push(new Sa());
                    else if (a.a) for (var d = 0; d < b.c.length; ++d) c.push.apply(c, jd(a, b.c[d]));
                    return c;
                }
                function jd(a, b) {
                    var c = [];
                    if (2 == a.a.length) {
                        var d = a.a(b.schemeIdUri, b.b);
                        if (!(d && d instanceof Array)) return [];
                        for (var e = 0; e < d.length; ++e) {
                            var f = Ta(d[e]);
                            0 == f.b.length &&
                                b.pssh &&
                                b.pssh.psshBox &&
                                Ua(f, [{ initData: b.pssh.psshBox, initDataType: "cenc" }]),
                                c.push(f);
                        }
                    } else {
                        if (((d = a.a(b)), !(d && d instanceof Va))) return [];
                        (e = new Sa()),
                            (e.a = d.g),
                            (e.j = d.j),
                            (e.l = d.o),
                            (e.h = d.h),
                            (e.i = d.i),
                            (e.g = d.f),
                            (e.o = d.v),
                            (e.f = d.c),
                            (e.v = d.l),
                            (e.c = d.b ? new Uint8Array(d.b.buffer) : null),
                            Ua(e, d.a),
                            c.push(e);
                    }
                    return c;
                }
                function kd(a, b, c, d, e) {
                    if (!c.s || 0 === c.s.length) return null;
                    var f = null,
                        g = 1,
                        h = 0;
                    if (c.g)
                        (f = c.f.split("/")[1]),
                            "mp4" != f && "webm" != f
                                ? (f = null)
                                : ((g = c.g),
                                  ("webm" != f || g.c) && (g.a || (g.b && g.b.a))
                                      ? ((h = g.b),
                                        h || ((h = new Bb()), (h.url = c.s), (h.a = g.a ? g.a.clone() : null)),
                                        (h = md(h, e)),
                                        (g = g.c ? md(g.c, e) : null),
                                        (a = new ad(a, b, f, h, g, d, e)),
                                        (b = new qc(g)),
                                        (d = new Kc()),
                                        (d.F = a),
                                        (d.C = b),
                                        (f = d))
                                      : (f = null)),
                            (g = c.g.g),
                            (h = c.g.f);
                    else if (c.b)
                        (f = c.b),
                            !f.b && !f.c && 1 < f.a.length
                                ? (f = null)
                                : f.b || b.a || f.c || 1 != f.a.length
                                ? f.c && 0 === f.c.a.length
                                    ? (f = null)
                                    : ((f = f.h ? md(f.h, e) : null),
                                      (a = new Hc(a, b, c, d, e)),
                                      (b = new qc(f)),
                                      (d = new Kc()),
                                      (d.F = a),
                                      (d.C = b),
                                      (f = d))
                                : (f = null),
                            (g = c.b.f),
                            (h = c.b.g);
                    else if (c.a) {
                        a: if (
                            ((f = c.a),
                            (g = 0 + (f.f ? 1 : 0)),
                            (g += f.c ? 1 : 0),
                            (g += f.a ? 1 : 0),
                            0 == g
                                ? (g = !1)
                                : (1 != g && (f.f ? ((f.c = null), (f.a = null)) : f.c && (f.a = null)), (g = !0)),
                            g)
                        ) {
                            if (((g = null), f.g && ((g = (f = c.a.g) ? ld(c, f, Cb) : null), !g))) {
                                f = null;
                                break a;
                            }
                            (f = g ? md(g, e) : null),
                                (g = c.a),
                                g.f
                                    ? ((g = c.f.split("/")[1]),
                                      "mp4" != g && "webm" != g
                                          ? (a = null)
                                          : ("webm" != g || f) &&
                                            nc(e, c, 1, 0) &&
                                            (h = (h = c.a.f) ? ld(c, h, Bb) : null)
                                          ? ((h = md(h, e)), (a = new ad(a, b, g, h, f, d, e)))
                                          : (a = null))
                                    : (a = g.h
                                          ? g.c
                                              ? new Ic(a, b, c, d, e)
                                              : g.a
                                              ? "dynamic" != a.type && null == b.a
                                                  ? null
                                                  : new Gc(a, b, c, d, e)
                                              : null
                                          : null),
                                a ? ((b = new qc(f)), (d = new Kc()), (d.F = a), (d.C = b), (f = d)) : (f = null);
                        } else f = null;
                        (g = c.a.b), (h = c.a.i);
                    } else "text" == c.f.split("/")[0] && ((f = new Kc()), (f.F = new Zc(new gc(e, c.s))));
                    if (!f) return null;
                    for (
                        f.id = c.id,
                            h && (f.c = (-1 * h) / g),
                            f.bandwidth = c.bandwidth,
                            f.width = c.width,
                            f.height = c.height,
                            f.a = c.f || "",
                            f.b = c.h || "",
                            a = 0;
                        a < c.c.length;
                        ++a
                    )
                        (b = c.c[a]), b.a && f.f.push(b.a);
                    return f;
                }
                function ld(a, b, c) {
                    return (b = oc(b, a.id, null, a.bandwidth, null)) ? ((c = new c()), (c.url = hc(a.s, b)), c) : null;
                }
                function md(a, b) {
                    var c = a.url,
                        d = 0,
                        e = null;
                    return a.a && ((d = a.a.na), (e = a.a.end)), new gc(b, c, d, e);
                }
                function nd() {
                    (this.streamStats = null),
                        (this.droppedFrames = this.decodedFrames = NaN),
                        (this.bufferingTime = this.playTime = this.estimatedBandwidth = 0),
                        (this.playbackLatency = NaN),
                        (this.bufferingHistory = []),
                        (this.bandwidthHistory = []),
                        (this.streamHistory = []);
                }
                function od(a, b) {
                    var c = new pd(b);
                    a.streamHistory.push(new qd(c)), (c.videoHeight || !a.streamStats) && (a.streamStats = c);
                }
                function pd(a) {
                    (this.videoWidth = a.width),
                        (this.videoHeight = a.height),
                        (this.videoMimeType = a.a),
                        (this.videoBandwidth = a.bandwidth);
                }
                function qd(a) {
                    (this.timestamp = B() / 1e3), (this.value = a);
                }
                function rd(a, b) {
                    ya.call(this, "readwrite", b), (this.j = a), (this.b = 0);
                }
                function sd(a, b, c, d, e) {
                    for (
                        var f = [],
                            g = [],
                            h = 0,
                            i = 0,
                            j = [],
                            k = b.map(function(a) {
                                return a.F.create();
                            }),
                            k = Promise.all(k),
                            l = b.map(function(a) {
                                return a.C.create();
                            }),
                            l = Promise.all(l),
                            k = Promise.all([k, l]).then(function(a) {
                                (f = a[0]),
                                    (g = a[1]),
                                    (h = f.reduce(function(a, b) {
                                        return a + b.length();
                                    }, 0));
                            }),
                            l = 0;
                        l < b.length;
                        ++l
                    )
                        (k = k.then(
                            function(a) {
                                return ud(this, b[a], f[a], g[a], h, i);
                            }.bind(a, l)
                        )),
                            (k = k.then(
                                function(a, b) {
                                    (i += f[a].length()), j.push(b);
                                }.bind(a, l)
                            ));
                    return k
                        .then(
                            oa(a, function() {
                                return vd(Ea(this));
                            })
                        )
                        .then(
                            oa(a, function(a) {
                                var b = new ia();
                                c = A(c);
                                var f = {
                                        group_id: a,
                                        stream_ids: j,
                                        session_ids: c,
                                        duration: d,
                                        key_system: e.a,
                                        license_server: e.j,
                                        with_credentials: e.l,
                                        distinctive_identifier: e.g,
                                        audio_robustness: e.f,
                                        video_robustness: e.v
                                    },
                                    g = Ea(this).put(f);
                                return (
                                    (g.onsuccess = function() {
                                        b.resolve(a);
                                    }),
                                    (g.onerror = function() {
                                        b.reject(g.error);
                                    }),
                                    b
                                );
                            })
                        );
                }
                function td(a, b) {
                    return Ga(Ea(a), b).then(
                        oa(a, function(a) {
                            var c,
                                d = [];
                            for (c in a.stream_ids) d.push(xd(this, a.stream_ids[c]));
                            return (a = Ea(this)), d.push(a["delete"](b)), Promise.all(d);
                        })
                    );
                }
                function ud(a, b, c, d, e, f) {
                    var g = [vd(Da(a)), vd(Ca(a).index("stream"))],
                        g = Promise.all(g).then(
                            oa(a, function(a) {
                                return {
                                    qa: Math.max(a[0], a[1]),
                                    ga: new ArrayBuffer(0),
                                    Da: 0,
                                    u: [],
                                    za: null,
                                    Jb: e,
                                    Ua: f
                                };
                            })
                        ),
                        g = g.then(a.f.bind(a, c));
                    return (g = g.then(a.g.bind(a, b, d)));
                }
                function vd(a) {
                    var b = new ia(),
                        c = a.openCursor(null, "prev");
                    return (
                        (c.onsuccess = function(a) {
                            a.target.result ? b.resolve(a.target.result.key + 1) : b.resolve(0);
                        }),
                        (c.onerror = function() {
                            b.reject(c.error);
                        }),
                        b
                    );
                }
                function wd(a, b) {
                    var c = new Uint8Array(a.byteLength + b.byteLength);
                    return c.set(new Uint8Array(a), 0), c.set(new Uint8Array(b), a.byteLength), c.buffer;
                }
                function xd(a, b) {
                    var c = new ia(),
                        d = Da(a)["delete"](b);
                    d.onerror = function() {
                        c.reject(d.error);
                    };
                    var e = Ca(a);
                    return (
                        (e.index("stream").openKeyCursor(IDBKeyRange.only(b)).onsuccess = function(a) {
                            (a = a.target.result) && (e["delete"](a.primaryKey), a["continue"]());
                        }),
                        (e.transaction.oncomplete = function() {
                            c.resolve();
                        }),
                        c
                    );
                }
                function yd(a, b, c, d, e, f) {
                    (this.b = new gc(null, [new hb(a)])),
                        (this.a = new ac()),
                        (this.a.body = b),
                        (this.a.method = c),
                        (this.a.a = 3),
                        (this.a.i = d),
                        (this.a.c = 1e3 * (null != f ? f : 0)),
                        (a = e || {});
                    for (var g in a) this.a.b[g] = a[g];
                }
                function zd(a) {
                    return ic(a.b, a.a).then(function(a) {
                        return Promise.resolve(new Uint8Array(a));
                    });
                }
                function Ad(a, b, c) {
                    fa.call(this, a),
                        (this.g = b),
                        (this.b = c),
                        (this.a = this.h = null),
                        (this.l = new ba()),
                        (this.j = {}),
                        (this.f = []),
                        (this.o = 0),
                        (this.c = new ia()),
                        (this.i = null),
                        (this.w = 0);
                }
                function Bd(b, c) {
                    return (
                        null == b.i &&
                            (b.i = a.setTimeout(
                                function() {
                                    var a = Error("Timeout waiting for sessions.");
                                    (a.type = "storage"), this.c.reject(a);
                                }.bind(b),
                                c
                            )),
                        b.c
                    );
                }
                function Cd(a) {
                    return Promise.all(
                        a.f.map(function(a) {
                            return a.remove();
                        })
                    );
                }
                function Dd(a, b, c) {
                    for (var d in b)
                        c = c["catch"](
                            function(a, b) {
                                return navigator.requestMediaKeySystemAccess(a, [b]);
                            }.bind(null, d, b[d])
                        );
                    return (
                        a.b.ea() &&
                            (c = c["catch"](function() {
                                throw Error(
                                    "Either none of the requested key systems are supported or none of the requested key systems support persistent state."
                                );
                            })),
                        c
                    );
                }
                function Ed() {
                    var a = Error("EmeManager destroyed");
                    return (a.type = "destroy"), Promise.reject(a);
                }
                function Fd(a) {
                    for (var b = a.b.va(), c = 0; c < b.length; ++c) {
                        var d = Gd(a),
                            e = d.load(b[c]);
                        a.f.push(d),
                            e
                                .then(
                                    oa(a, function() {
                                        this.o++, this.o >= this.f.length && this.c.resolve();
                                    })
                                )
                                ["catch"](
                                    oa(a, function(a) {
                                        (a = R(a)), this.dispatchEvent(a);
                                    })
                                );
                    }
                }
                function Gd(a) {
                    var b = null;
                    if (a.b.ea())
                        try {
                            b = a.h.createSession("persistent-license");
                        } catch (c) {
                            throw Error("Persistent licenses are not supported by this key system or platform.");
                        }
                    else b = a.h.createSession();
                    return ca(a.l, b, "message", a.sb.bind(a)), ca(a.l, b, "keystatuseschange", a.kb.bind(a)), b;
                }
                function Hd(a, b, c, d) {
                    (d = Id(c, d)),
                        zd(new yd(d.url, d.body, d.method, c.l, d.headers, a.w))
                            .then(
                                oa(a, function(a) {
                                    return c.h && (a = c.h(a)), b.update(a);
                                })
                            )
                            .then(
                                oa(a, function() {
                                    var a = Q({ type: "sessionReady", detail: b });
                                    this.dispatchEvent(a), this.o++, this.o >= this.f.length && this.c.resolve();
                                })
                            )
                            ["catch"](
                                oa(a, function(a) {
                                    (a.Nb = b), (a = R(a)), this.dispatchEvent(a);
                                })
                            );
                }
                function Id(a, b) {
                    var c = { url: a.j, body: b.slice(0), method: "POST", headers: {} };
                    if (!a.i) return c;
                    if ((a.i(c), (c.url = W(c, "url")), null == c.url)) throw Error("'url' cannot be null.");
                    if (!(c.body instanceof ArrayBuffer || "string" == typeof c.body || null == c.body))
                        throw new TypeError("'body' must be an ArrayBuffer, a string, or null.");
                    if (((c.method = W(c, "method")), "GET" != c.method && "POST" != c.method))
                        throw Error("'method' must be either 'GET' or 'POST'.");
                    if (((c.headers = Y(c, "headers", Object)), null == c.headers))
                        throw Error("'headers' cannot be null.");
                    return c;
                }
                function Jd(a) {
                    fa.call(this, null),
                        (this.a = a),
                        (this.b = null),
                        (this.f = new ba()),
                        (this.j = this.l = null),
                        (this.H = 0),
                        (this.B = null),
                        (this.i = !1),
                        (this.g = new nd()),
                        (this.c = {
                            enableAdaptation: !0,
                            streamBufferSize: 15,
                            licenseRequestTimeout: 0,
                            mpdRequestTimeout: 0,
                            segmentRequestTimeout: 0,
                            preferredLanguage: "en",
                            restrictions: new j()
                        }),
                        (this.o = 1),
                        (this.D = null);
                }
                function Kd(b) {
                    return "text/vtt" == b ? !!a.VTTCue : MediaSource.isTypeSupported(b);
                }
                function Ld() {
                    var a = Error("Player destroyed");
                    return (a.type = "destroy"), Promise.reject(a);
                }
                function Md(b) {
                    b.j && (a.clearTimeout(b.j), (b.j = null));
                }
                function Nd(b) {
                    Od(b), (b.B = a.setTimeout(b.Y.bind(b), 100));
                }
                function Od(b) {
                    b.B && (a.clearTimeout(b.B), (b.B = null));
                }
                function Pd(a) {
                    g("buffering");
                    var b = a.g;
                    (b.bufferingTime += h("buffering") / 1e3), (a.i = !1), a.dispatchEvent(Q({ type: "bufferingEnd" }));
                }
                function Qd(a) {
                    for (var b = 0; b < a.length; ++b)
                        for (var c = a[b], d = 0; d < c.a.length; ++d) {
                            for (var e = c.a[d], f = e, g = 0; g < f.m.length; ++g)
                                Kd(Lc(f.m[g])) || (f.m.splice(g, 1), --g);
                            0 == e.m.length && (c.a.splice(d, 1), --d);
                        }
                }
                function Rd(a) {
                    for (var b = 0; b < a.length; ++b) for (var c = a[b], d = 0; d < c.a.length; ++d) c.a[d].m.sort(Sd);
                }
                function Sd(a, b) {
                    var c = a.bandwidth || Number.MAX_VALUE,
                        d = b.bandwidth || Number.MAX_VALUE;
                    return d > c ? -1 : c > d ? 1 : 0;
                }
                function Td(a) {
                    this.a = a;
                }
                function Ud(a, b) {
                    var c = Vd(b),
                        d = Vd(a.a);
                    return Promise.all([c, d]).then(
                        oa(a, function(a) {
                            var c = a[0];
                            a = a[1];
                            var d = this.a.a;
                            return (
                                Qd(d),
                                Rd(d),
                                (b.f = this.a.f),
                                (b.g = this.a.g ? this.a.g.clone() : null),
                                (b.c = this.a.c),
                                (d = []),
                                Wd(b, this.a, c, a, d),
                                (c = b.a),
                                Qd(c),
                                Rd(c),
                                Promise.resolve(d)
                            );
                        })
                    );
                }
                function Vd(a) {
                    function b(a, b) {
                        return a.concat(b);
                    }
                    var c = a.a
                        .map(function(a) {
                            return a.a;
                        })
                        .reduce(b, [])
                        .map(function(a) {
                            return a.m;
                        })
                        .reduce(b, []);
                    return (
                        (a = c.map(function(a) {
                            return a.F.create();
                        })),
                        Promise.all(a).then(function(a) {
                            for (var b = {}, d = 0; d < c.length; ++d) b[c[d].A] = a[d];
                            return Promise.resolve(b);
                        })
                    );
                }
                function Wd(a, b, c, d, e) {
                    var f = new Z();
                    a.a.forEach(function(a, b) {
                        f.push(a.id || "" + b, a);
                    });
                    var g = new Z();
                    for (
                        b.a.forEach(function(a, b) {
                            g.push(a.id || "" + b, a);
                        }),
                            a = aa(f),
                            b = 0;
                        b < a.length;
                        ++b
                    ) {
                        var h = a[b],
                            i = f.get(h);
                        1 < i.length ||
                            ((h = g.get(h)) &&
                                0 != h.length &&
                                1 == h.length &&
                                (Xd(i[0], h[0], c, d, e), (i[0].b = h[0].b)));
                    }
                }
                function Xd(a, b, c, d, e) {
                    var f = new Z();
                    a.a.forEach(function(a, b) {
                        f.push(a.id || "" + b, a);
                    });
                    var g = new Z();
                    for (
                        b.a.forEach(function(a, b) {
                            g.push(a.id || "" + b, a);
                        }),
                            a = aa(f),
                            b = 0;
                        b < a.length;
                        ++b
                    ) {
                        var h = a[b],
                            i = f.get(h);
                        1 < i.length || ((h = g.get(h)) && 0 != h.length && 1 == h.length && Yd(i[0], h[0], c, d, e));
                    }
                }
                function Yd(a, b, c, d, e) {
                    var f = new Z();
                    a.m.forEach(function(a, b) {
                        f.push(a.id || "" + b, a);
                    });
                    var g = new Z();
                    b.m.forEach(function(a, b) {
                        g.push(a.id || "" + b, a);
                    }),
                        (b = {});
                    for (var h = aa(f), i = 0; i < h.length; ++i) {
                        var j = h[i];
                        b[j] = j;
                        var k = f.get(j);
                        1 < k.length ||
                            ((j = g.get(j)) && 0 != j.length
                                ? 1 == j.length &&
                                  (Zd(k[0], j[0], c, d), (k[0].C = j[0].C), (j[0].C = null), (k[0].c = j[0].c))
                                : (e.push(k[0]), a.m.splice(a.m.indexOf(k[0]), 1)));
                    }
                    for (h = aa(g), i = 0; i < h.length; ++i)
                        (j = h[i]), b[j] || ((b[j] = j), (j = g.get(j)), a.m.push(j[0]));
                }
                function Zd(a, b, c, d) {
                    (a = c[a.A]), (b = d[b.A]), a.length(), a.Ca(b) && a.length();
                }
                function $d() {
                    (this.a = this.b = null),
                        (this.f = new ba()),
                        (this.c = Number.POSITIVE_INFINITY),
                        (this.i = !0),
                        (this.g = !1);
                }
                function _d(a) {
                    var b = a.a.ja();
                    if (0 == b.length) return null;
                    b.sort(p);
                    var c;
                    a: {
                        c = a.a.pa();
                        for (var d = 0; d < c.length; ++d)
                            if (c[d].active) {
                                c = c[d];
                                break a;
                            }
                        c = null;
                    }
                    (c = c ? c.bandwidth : 0), (a = a.b.getBandwidth());
                    for (var d = b[0], e = 0; e < b.length; ++e) {
                        var f = b[e],
                            g = e + 1 < b.length ? b[e + 1] : { bandwidth: Number.POSITIVE_INFINITY };
                        if (
                            f.bandwidth &&
                            ((g = (g.bandwidth + c) / 0.85),
                            a >= (f.bandwidth + c) / 0.95 && g >= a && ((d = f), d.active))
                        )
                            break;
                    }
                    return d;
                }
                function ae(a, b, c) {
                    fa.call(this, null), (this.f = a), (this.c = b), (this.b = Ta(c)), (this.a = null);
                }
                function be(a, b, c) {
                    fa.call(this, null),
                        (this.a = a),
                        (this.X = b),
                        (this.i = new ba()),
                        (this.g = new MediaSource()),
                        (this.f = null),
                        (this.ba = 0),
                        (this.b = new Z()),
                        (this.G = c),
                        this.G.initialize(b, this),
                        (this.D = !1),
                        (this.H = "en"),
                        (this.da = !1),
                        (this.K = null),
                        (this.w = new ia()),
                        (this.h = new j()),
                        (this.B = null),
                        (this.ua = 1),
                        (this.c = {}),
                        (this.ca = new ia()),
                        (this.V = 0),
                        (this.ta = !1),
                        (this.o = {}),
                        (this.Y = this.W = this.Z = null),
                        (this.S = {});
                }
                function ce(a, b) {
                    var c = b.a.split("/")[0],
                        d = a.c[c];
                    if (d && d.oa() == b) {
                        var e = a.b.get(b.a.split("/")[0]),
                            f = e
                                .map(function(a) {
                                    return a.m;
                                })
                                .reduce(function(a, b) {
                                    return a.concat(b);
                                }, [])
                                .filter(function(a) {
                                    return a.L && a.J;
                                });
                        if (0 == f.length) return void e.push(b);
                        a.o[c].Ia == b && delete a.o[c], d.ra(f[0], !0), b.destroy();
                    }
                    b.destroy();
                }
                function de(a) {
                    if (a.h) {
                        for (var b = !1, c = 0; c < a.a.a.length; ++c)
                            for (var d = a.a.a[c], e = 0; e < d.a.length; ++e) {
                                var f = d.a[e];
                                if ("video" == f.contentType)
                                    for (var g = 0; g < f.m.length; ++g) {
                                        var h = f.m[g],
                                            i = h.J;
                                        (h.J = !0),
                                            a.h.maxWidth && h.width > a.h.maxWidth && (h.J = !1),
                                            a.h.maxHeight && h.height > a.h.maxHeight && (h.J = !1),
                                            a.h.maxBandwidth && h.bandwidth > a.h.maxBandwidth && (h.J = !1),
                                            a.h.minBandwidth && h.bandwidth < a.h.minBandwidth && (h.J = !1),
                                            i != h.J && (b = !0);
                                    }
                            }
                        0 != $(a.b).length &&
                            b &&
                            (ee(a),
                            0 < a.ja().length ||
                                ((b = Error("The application has restricted all video tracks!")),
                                (b.type = "app"),
                                (b = R(b)),
                                a.dispatchEvent(b)));
                    }
                }
                function ee(a) {
                    var b = Q({ type: "trackschanged", bubbles: !0 });
                    a.dispatchEvent(b);
                }
                function fe(a, b, c, d, e) {
                    if (!a.b.a.hasOwnProperty(b) || !a.c[b]) return !1;
                    for (var f = a.b.get(b), g = 0; g < f.length; ++g)
                        for (var h = f[g], i = 0; i < h.m.length; ++i) {
                            var j = h.m[i];
                            if (j.A == c)
                                return j.L && j.J
                                    ? "text" == b || a.ta
                                        ? (od(a.K, j), a.c[b].ra(j, d, e), !0)
                                        : ((c = a.o[b]),
                                          (a.o[b] = {
                                              Ia: j,
                                              La: (null != c && c.La) || d,
                                              Ma: (null != c && c.Ma) || e
                                          }),
                                          !0)
                                    : !1;
                        }
                    return !1;
                }
                function ge(a, b) {
                    for (var c = 0; 2 >= c; ++c)
                        for (var d = 0; d < b.length; ++d) {
                            var e = b[d];
                            if (S(c, a.H, e.lang)) return b.splice(d, 1), void b.splice(0, 0, e);
                        }
                    for (d = 0; d < b.length; ++d)
                        if (((e = b[d]), e.b)) {
                            b.splice(d, 1), b.splice(0, 0, e);
                            break;
                        }
                }
                function he(a) {
                    for (var b = [], c = ["audio", "video", "text"], d = 0; d < c.length; ++d) {
                        var e = c[d];
                        a.b.a.hasOwnProperty(e) && b.push(a.b.get(e)[0]);
                    }
                    for (var f = ie(a, b), d = 0; d < c.length; ++d)
                        if (((e = c[d]), a.b.a.hasOwnProperty(e) && !f[e]))
                            return (
                                (a = Error(
                                    "Unable to select an initial " +
                                        e +
                                        " stream: all " +
                                        e +
                                        " streams have been restricted (by the application or by the key system)."
                                )),
                                (a.type = "stream"),
                                Promise.reject(a)
                            );
                    return (
                        (b = U(f).map(function(a) {
                            return a.F.create();
                        })),
                        Promise.all(b)
                            .then(
                                oa(a, function(a) {
                                    return a.every(function(a) {
                                        return a.length();
                                    }) && (a = re(this, a))
                                        ? je(this, f)
                                            ? (this.G.start(), le(this, f, a), Promise.resolve())
                                            : ((a = Error("Failed to create Stream objects.")),
                                              (a.type = "stream"),
                                              Promise.reject(a))
                                        : ((a = Error("Some streams are not available.")),
                                          (a.type = "stream"),
                                          Promise.reject(a));
                                })
                            )
                            ["catch"](
                                oa(a, function(a) {
                                    return "aborted" != a.type
                                        ? (Object.keys(this.c),
                                          this.a.b ? (se(this, 0), Promise.resolve()) : Promise.reject(a))
                                        : void 0;
                                })
                            )
                    );
                }
                function ie(a, b) {
                    for (var c = {}, d = 0; d < b.length; ++d) {
                        var e = b[d],
                            f = null;
                        if ("video" == e.contentType) {
                            var g = a.G.getInitialVideoTrackId();
                            if (null == g) continue;
                            if (
                                ((f = e.m.filter(function(a) {
                                    return a.A == g;
                                })),
                                0 == f.length)
                            )
                                continue;
                            f = f[0];
                        } else if ("audio" == e.contentType) {
                            if (
                                ((f = e.m.filter(function(a) {
                                    return a.L && a.J;
                                })),
                                0 == f.length)
                            )
                                continue;
                            f = e.m[Math.floor(f.length / 2)];
                        } else 0 < e.m.length && (f = e.m[0]);
                        c[e.contentType] = f;
                    }
                    return c;
                }
                function je(a, b) {
                    var c,
                        d = {};
                    for (c in b) {
                        var e = b[c],
                            e = "text" == c ? new $c(a, a.f) : ke(a, e);
                        if (!e)
                            return (
                                U(d).forEach(function(a) {
                                    a.destroy();
                                }),
                                !1
                            );
                        d[c] = e;
                    }
                    return (a.c = d), !0;
                }
                function ke(a, b) {
                    var c = new Rc(a, a.f, a.g, Lc(b), a.X);
                    return c.H(a.S), c;
                }
                function le(a, b, c) {
                    (a.ua = a.f.playbackRate), (a.f.playbackRate = 0), ne(a, c);
                    var d;
                    (d = a.a.b ? c.end : a.Y && a.Y <= c.end && a.Y >= c.start ? a.Y : c.start),
                        ca(a.i, a.f, "seeking", a.rb.bind(a)),
                        a.f.currentTime != d && ((a.f.currentTime = d), (a.B = d)),
                        oe(a, c.start, c.end),
                        (c = []);
                    for (var e in a.c) {
                        (d = a.c[e]), c.push(d.cb(a.ca)), ca(a.i, d, "ended", a.tb.bind(a));
                        var f = b[e];
                        od(a.K, f), d.ra(f, !1);
                    }
                    Promise.all(c)
                        .then(a.ib.bind(a))
                        ["catch"](
                            oa(a, function(a) {
                                "destroy" != a.type && ((a = R(a)), this.dispatchEvent(a));
                            })
                        ),
                        a.Ga(a.da);
                }
                function me(a, b, c) {
                    (b = re(a, b)) && (ne(a, b), oe(a, b.start, b.end)),
                        0 != c ? ((c = a.f.currentTime + c), (a.f.currentTime = c), (a.B = c)) : (c = a.f.currentTime),
                        a.a.b && b && ((a.V = b.end - c), (a.V = Math.max(a.V, 0))),
                        (a.f.playbackRate = a.ua),
                        a.a.b && null != a.a.f && se(a, a.V),
                        te(a),
                        a.ca.resolve();
                }
                function ne(a, b) {
                    if (a.a.b) isNaN(a.g.duration) && (a.g.duration = b.end + 2592e3);
                    else if (isNaN(a.g.duration) || b.end > a.g.duration) {
                        a.g.duration = b.end;
                        for (var c = 0; c < a.g.sourceBuffers.length; ++c) a.g.sourceBuffers[c].appendWindowEnd = b.end;
                    }
                }
                function oe(a, b, c) {
                    (b = Q({ type: "seekrangechanged", bubbles: !0, start: b, end: c })), a.dispatchEvent(b);
                }
                function pe(a, b, c, d) {
                    return b >= c - 0.01 ? !1 : ((a.f.currentTime = Math.min(c + (a.a.b ? a.a.c : 0), d)), !0);
                }
                function qe(a) {
                    return U(a.c)
                        .map(function(a) {
                            return a.Pa();
                        })
                        .filter(function(a) {
                            return null != a;
                        });
                }
                function re(a, b) {
                    for (var c = 0, d = Number.POSITIVE_INFINITY, e = 0; e < b.length; ++e) {
                        var f = b[e].Ba(),
                            c = Math.max(c, f.start);
                        null != f.end && (d = Math.min(d, f.end));
                    }
                    if (d == Number.POSITIVE_INFINITY) {
                        if (((d = a.a.a[0]), !d.b)) return null;
                        d = (d.start || 0) + d.b;
                    }
                    return a.a.b && (d = Math.max(d - (a.a.c + a.V), c)), c > d ? null : { start: c, end: d };
                }
                function se(b, c) {
                    if (null != b.a.f) {
                        var d = Math.max(b.a.f, 3),
                            d = Math.max(d - c, 0);
                        b.Z = a.setTimeout(b.vb.bind(b), 1e3 * d);
                    }
                }
                function te(b) {
                    b.a.b && (b.W = a.setTimeout(b.wb.bind(b), 1e3));
                }
                function ue(a) {
                    for (var b in a.c) a.c[b].H(a.S);
                }
                function ve(a, b, c, d) {
                    c || (c = new ha()),
                        d || (d = new $d()),
                        be.call(this, null, c, d),
                        (this.ka = a),
                        (this.M = b),
                        (this.l = []),
                        (this.O = []),
                        (this.T = []),
                        (this.j = null);
                }
                function we(a, b, c) {
                    b || (b = new ha()),
                        c || (c = new $d()),
                        be.call(this, null, b, c),
                        (this.T = a),
                        (this.M = []),
                        (this.timeoutMs = 3e4),
                        (this.l = {}),
                        (this.j = this.O = null);
                }
                function xe(a, b, c, d) {
                    var e = new rd(a.X, a);
                    return (
                        null != a.l.segmentRequestTimeout && (e.b = Number(a.l.segmentRequestTimeout)),
                        za(e)
                            .then(
                                oa(a, function() {
                                    return sd(e, b, this.M, d, c);
                                })
                            )
                            .then(function(a) {
                                return Aa(e), Promise.resolve(a);
                            })
                            ["catch"](function(a) {
                                return Aa(e), Promise.reject(a);
                            })
                    );
                }
                function ye(a) {
                    var b = new rd(null, null);
                    return za(b)
                        .then(
                            oa(a, function() {
                                return td(b, this.T);
                            })
                        )
                        .then(function() {
                            return Aa(b), Promise.resolve();
                        })
                        ["catch"](function(a) {
                            return Aa(b), Promise.reject(a);
                        });
                }
                function ze(b) {
                    var c = document.createElement("video");
                    c.src = a.URL.createObjectURL(b.g);
                    var d = new Ad(null, c, b);
                    return (
                        null != b.l.licenseRequestTimeout && (d.w = Number(b.l.licenseRequestTimeout)),
                        b
                            .U()
                            .then(function() {
                                return d.initialize();
                            })
                            .then(
                                oa(b, function() {
                                    return Bd(d, this.timeoutMs);
                                })
                            )
                            .then(function() {
                                return Cd(d);
                            })
                            .then(
                                oa(b, function() {
                                    return d.destroy(), this.destroy(), Promise.resolve();
                                })
                            )
                            ["catch"](
                                oa(b, function(a) {
                                    return d.destroy(), this.destroy(), Promise.reject(a);
                                })
                            )
                    );
                }
                var Ae,
                    Be = this;
                e("error"), e("warn"), e("info"), e("log"), e("debug");
                var Ce = a.performance && a.performance.now ? a.performance.now.bind(a.performance) : Date.now,
                    De = {};
                b("shaka.player.AudioTrack.compare", function(a, b) {
                    return a.lang < b.lang
                        ? -1
                        : a.lang > b.lang
                        ? 1
                        : a.bandwidth < b.bandwidth
                        ? -1
                        : a.bandwidth > b.bandwidth
                        ? 1
                        : 0;
                }),
                    (j.prototype.clone = function() {
                        var a = new j();
                        return (
                            (a.maxHeight = this.maxHeight),
                            (a.maxWidth = this.maxWidth),
                            (a.maxBandwidth = this.maxBandwidth),
                            (a.minBandwidth = this.minBandwidth),
                            a
                        );
                    }),
                    b("shaka.player.TextStyle", k),
                    (k.prototype.a = function() {
                        var b = a.localStorage.getItem("ShakaPlayerTextStyle");
                        if (b) {
                            var c;
                            try {
                                c = JSON.parse(b);
                            } catch (d) {
                                return;
                            }
                            if (c && "object" == typeof c) {
                                var e,
                                    b = c;
                                for (e in b) e in this && (this[e] = b[e]);
                            }
                        }
                    }),
                    (k.prototype.load = k.prototype.a),
                    (k.prototype.b = function() {
                        a.localStorage.setItem("ShakaPlayerTextStyle", JSON.stringify(this));
                    }),
                    (k.prototype.store = k.prototype.b);
                var Ee = [255, 255, 255],
                    Fe = [0, 0, 0];
                k.StandardColors = {
                    WHITE: Ee,
                    BLACK: Fe,
                    RED: [255, 0, 0],
                    GREEN: [0, 255, 0],
                    BLUE: [0, 0, 255],
                    YELLOW: [255, 255, 0],
                    MAGENTA: [255, 0, 255],
                    CYAN: [0, 255, 255]
                };
                var Ge = 1;
                k.StandardOpacities = { OPAQUE: Ge, SEMI_HIGH: 0.75, SEMI_LOW: 0.25, TRANSPARENT: 0 };
                var He = [];
                (k.EdgeStyles = {
                    NONE: He,
                    RAISED: [[34, 34, 34, 1, 1, 0], [34, 34, 34, 2, 2, 0], [34, 34, 34, 3, 3, 0]],
                    DEPRESSED: [
                        [204, 204, 204, 1, 1, 0],
                        [204, 204, 204, 0, 1, 0],
                        [34, 34, 34, -1, -1, 0],
                        [34, 34, 34, 0, -1, 0]
                    ],
                    UNIFORM: [
                        [34, 34, 34, 0, 0, 4],
                        [34, 34, 34, 0, 0, 4],
                        [34, 34, 34, 0, 0, 4],
                        [34, 34, 34, 0, 0, 4]
                    ],
                    DROP: [[34, 34, 34, 2, 2, 3], [34, 34, 34, 2, 2, 4], [34, 34, 34, 2, 2, 5]]
                }),
                    b("shaka.player.TextTrack.compare", function(a, b) {
                        return a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0;
                    }),
                    b("shaka.player.VideoTrack.compare", p),
                    b("shaka.polyfill.CustomEvent.install", q),
                    b("shaka.polyfill.Fullscreen.install", s),
                    (w.prototype.createSession = function() {}),
                    (w.prototype.setServerCertificate = function() {}),
                    (x.prototype.getConfiguration = function() {}),
                    (x.prototype.createMediaKeys = function() {}),
                    b("shaka.polyfill.VideoPlaybackQuality.install", y);
                var Ie,
                    Je = 0,
                    Ke = 1,
                    Le = {
                        "output-restricted": "The required output protection is not available.",
                        "output-not-allowed": "The required output protection is not available.",
                        expired: "The decryption key has expired.",
                        "internal-error": "The key system has encountered an unspecified error."
                    };
                O.prototype.sample = function(a, b) {
                    var c = Math.pow(this.c, a);
                    (this.b = b * (1 - c) + c * this.b), (this.a += a);
                };
                var Me = 1,
                    Ne = 2,
                    Oe = {
                        aar: "aa",
                        abk: "ab",
                        afr: "af",
                        aka: "ak",
                        alb: "sq",
                        amh: "am",
                        ara: "ar",
                        arg: "an",
                        arm: "hy",
                        asm: "as",
                        ava: "av",
                        ave: "ae",
                        aym: "ay",
                        aze: "az",
                        bak: "ba",
                        bam: "bm",
                        baq: "eu",
                        bel: "be",
                        ben: "bn",
                        bih: "bh",
                        bis: "bi",
                        bod: "bo",
                        bos: "bs",
                        bre: "br",
                        bul: "bg",
                        bur: "my",
                        cat: "ca",
                        ces: "cs",
                        cha: "ch",
                        che: "ce",
                        chi: "zh",
                        chu: "cu",
                        chv: "cv",
                        cor: "kw",
                        cos: "co",
                        cre: "cr",
                        cym: "cy",
                        cze: "cs",
                        dan: "da",
                        deu: "de",
                        div: "dv",
                        dut: "nl",
                        dzo: "dz",
                        ell: "el",
                        eng: "en",
                        epo: "eo",
                        est: "et",
                        eus: "eu",
                        ewe: "ee",
                        fao: "fo",
                        fas: "fa",
                        fij: "fj",
                        fin: "fi",
                        fra: "fr",
                        fre: "fr",
                        fry: "fy",
                        ful: "ff",
                        geo: "ka",
                        ger: "de",
                        gla: "gd",
                        gle: "ga",
                        glg: "gl",
                        glv: "gv",
                        gre: "el",
                        grn: "gn",
                        guj: "gu",
                        hat: "ht",
                        hau: "ha",
                        heb: "he",
                        her: "hz",
                        hin: "hi",
                        hmo: "ho",
                        hrv: "hr",
                        hun: "hu",
                        hye: "hy",
                        ibo: "ig",
                        ice: "is",
                        ido: "io",
                        iii: "ii",
                        iku: "iu",
                        ile: "ie",
                        ina: "ia",
                        ind: "id",
                        ipk: "ik",
                        isl: "is",
                        ita: "it",
                        jav: "jv",
                        jpn: "ja",
                        kal: "kl",
                        kan: "kn",
                        kas: "ks",
                        kat: "ka",
                        kau: "kr",
                        kaz: "kk",
                        khm: "km",
                        kik: "ki",
                        kin: "rw",
                        kir: "ky",
                        kom: "kv",
                        kon: "kg",
                        kor: "ko",
                        kua: "kj",
                        kur: "ku",
                        lao: "lo",
                        lat: "la",
                        lav: "lv",
                        lim: "li",
                        lin: "ln",
                        lit: "lt",
                        ltz: "lb",
                        lub: "lu",
                        lug: "lg",
                        mac: "mk",
                        mah: "mh",
                        mal: "ml",
                        mao: "mi",
                        mar: "mr",
                        may: "ms",
                        mkd: "mk",
                        mlg: "mg",
                        mlt: "mt",
                        mon: "mn",
                        mri: "mi",
                        msa: "ms",
                        mya: "my",
                        nau: "na",
                        nav: "nv",
                        nbl: "nr",
                        nde: "nd",
                        ndo: "ng",
                        nep: "ne",
                        nld: "nl",
                        nno: "nn",
                        nob: "nb",
                        nor: "no",
                        nya: "ny",
                        oci: "oc",
                        oji: "oj",
                        ori: "or",
                        orm: "om",
                        oss: "os",
                        pan: "pa",
                        per: "fa",
                        pli: "pi",
                        pol: "pl",
                        por: "pt",
                        pus: "ps",
                        que: "qu",
                        roh: "rm",
                        ron: "ro",
                        rum: "ro",
                        run: "rn",
                        rus: "ru",
                        sag: "sg",
                        san: "sa",
                        sin: "si",
                        slk: "sk",
                        slo: "sk",
                        slv: "sl",
                        sme: "se",
                        smo: "sm",
                        sna: "sn",
                        snd: "sd",
                        som: "so",
                        sot: "st",
                        spa: "es",
                        sqi: "sq",
                        srd: "sc",
                        srp: "sr",
                        ssw: "ss",
                        sun: "su",
                        swa: "sw",
                        swe: "sv",
                        tah: "ty",
                        tam: "ta",
                        tat: "tt",
                        tel: "te",
                        tgk: "tg",
                        tgl: "tl",
                        tha: "th",
                        tib: "bo",
                        tir: "ti",
                        ton: "to",
                        tsn: "tn",
                        tso: "ts",
                        tuk: "tk",
                        tur: "tr",
                        twi: "tw",
                        uig: "ug",
                        ukr: "uk",
                        urd: "ur",
                        uzb: "uz",
                        ven: "ve",
                        vie: "vi",
                        vol: "vo",
                        wel: "cy",
                        wln: "wa",
                        wol: "wo",
                        xho: "xh",
                        yid: "yi",
                        yor: "yo",
                        zha: "za",
                        zho: "zh",
                        zul: "zu"
                    };
                (Z.prototype.push = function(a, b) {
                    this.a.hasOwnProperty(a) ? this.a[a].push(b) : (this.a[a] = [b]);
                }),
                    (Z.prototype.get = function(a) {
                        return (a = this.a[a]) ? a.slice() : null;
                    }),
                    (ba.prototype.destroy = function() {
                        da(this), (this.a = null);
                    }),
                    (ba.prototype.sa = function(a, b) {
                        for (var c = this.a.get(b) || [], d = 0; d < c.length; ++d) {
                            var e = c[d];
                            e.target == a && (e.sa(), _(this.a, b, e));
                        }
                    }),
                    (ea.prototype.sa = function() {
                        this.target &&
                            (this.target.removeEventListener(this.type, this.a, !1), (this.a = this.target = null));
                    }),
                    b("shaka.util.FakeEventTarget", fa),
                    (fa.prototype.addEventListener = function(a, b, c) {
                        c || this.xa.push(a, b);
                    }),
                    (fa.prototype.removeEventListener = function(a, b, c) {
                        c || _(this.xa, a, b);
                    }),
                    (fa.prototype.dispatchEvent = function(a) {
                        return (
                            delete a.srcElement,
                            delete a.target,
                            delete a.currentTarget,
                            Object.defineProperties(a, {
                                srcElement: { value: null, writable: !0 },
                                target: { value: this, writable: !0 },
                                currentTarget: { value: null, writable: !0 }
                            }),
                            ga(this, a)
                        );
                    }),
                    c(ha, fa),
                    b("shaka.util.EWMABandwidthEstimator", ha),
                    (ha.prototype.sample = function(a, b) {
                        if (!(65536 > b)) {
                            a = Math.max(a, 50);
                            var c = (8e3 * b) / a,
                                d = a / 1e3;
                            this.a.sample(d, c),
                                this.c.sample(d, c),
                                this.dispatchEvent(Q({ type: "bandwidth" })),
                                (this.b = Date.now());
                        }
                    }),
                    (ha.prototype.getBandwidth = function() {
                        return 0.5 > this.a.a ? 5e5 : Math.min(P(this.a), P(this.c));
                    }),
                    (ha.prototype.getDataAge = function() {
                        return (Date.now() - this.b) / 1e3;
                    }),
                    (ha.prototype.supportsCaching = function() {
                        return !1;
                    }),
                    (ia.prototype.destroy = function() {
                        this["catch"](function() {});
                        var a = Error("Destroyed!");
                        (a.type = "destroy"), this.reject(a);
                    }),
                    (ka.prototype.start = function() {
                        if (this.f) throw Error("Task already started!");
                        (this.f = !0), this.b.unshift(function() {}), ma(this, void 0);
                    }),
                    (ka.prototype.end = function() {
                        this.b.splice(1);
                    });
                var Pe = 1 / 60;
                (pa.prototype.destroy = function() {
                    ua(this)["catch"](function() {}),
                        this.f && this.f.destroy(),
                        (this.b = this.a = this.f = null),
                        this.h.destroy(),
                        (this.j = this.c = this.h = null);
                }),
                    (pa.prototype.g = function() {
                        "open" == this.j.readyState && this.c.abort();
                    }),
                    (pa.prototype.w = function() {
                        this.f.resolve(), (this.f = null);
                    }),
                    c(ya, fa),
                    c(Ha, ya),
                    b("shaka.util.Uint8ArrayUtils.toString", Ma),
                    b("shaka.util.Uint8ArrayUtils.fromString", Na),
                    b("shaka.util.Uint8ArrayUtils.toBase64", Oa),
                    b("shaka.util.Uint8ArrayUtils.fromBase64", Pa),
                    b("shaka.util.Uint8ArrayUtils.fromHex", function(b) {
                        for (var c = new Uint8Array(b.length / 2), d = 0; d < b.length; d += 2)
                            c[d / 2] = a.parseInt(b.substr(d, 2), 16);
                        return c;
                    }),
                    b("shaka.util.Uint8ArrayUtils.toHex", Qa),
                    b("shaka.player.DrmSchemeInfo", Va);
                var Qe = 1;
                Va.DistinctiveIdentifier = { OPTIONAL: 0, REQUIRED: Qe };
                var Re = 1;
                (Va.PersistentState = { OPTIONAL: 0, REQUIRED: Re }),
                    (Va.createUnencrypted = function() {
                        return new Va("", "", !1, null);
                    }),
                    (Ya.prototype.createMediaKeys = function() {
                        var a = new Za(this.a);
                        return Promise.resolve(a);
                    }),
                    (Ya.prototype.getConfiguration = function() {
                        return this.b;
                    }),
                    (Ae = Za.prototype),
                    (Ae.createSession = function(a) {
                        var b = a || "temporary";
                        if ("temporary" != b && "persistent-license" != b)
                            throw new TypeError("Session type " + a + " is unsupported on this platform.");
                        return (
                            (a = this.b || document.createElement("video")),
                            a.src || (a.src = "about:blank"),
                            (b = new ab(a, this.g, b)),
                            this.c.push(b),
                            b
                        );
                    }),
                    (Ae.setServerCertificate = function() {
                        return Promise.reject(Error("setServerCertificate not supported on this platform."));
                    }),
                    (Ae.Bb = function(a) {
                        (a = Q({ type: "encrypted", initDataType: "webm", initData: a.initData })),
                            this.b.dispatchEvent(a);
                    }),
                    (Ae.Ab = function(a) {
                        var b = _a(this, a.sessionId);
                        b &&
                            ((a = Q({
                                type: "message",
                                messageType: void 0 == b.keyStatuses.a ? "licenserequest" : "licenserenewal",
                                message: a.message
                            })),
                            b.b && (b.b.resolve(), (b.b = null)),
                            b.dispatchEvent(a));
                    }),
                    (Ae.yb = function(a) {
                        (a = _a(this, a.sessionId)) && (cb(a, "usable"), a.a && a.a.resolve(), (a.a = null));
                    }),
                    (Ae.zb = function(a) {
                        var b = _a(this, a.sessionId);
                        if (b) {
                            var c = Error("EME v0.1b key error");
                            (c.errorCode = a.errorCode),
                                (c.errorCode.systemCode = a.systemCode),
                                !a.sessionId && b.b
                                    ? ((c.method = "generateRequest"),
                                      45 == a.systemCode && (c.message = "Unsupported session type."),
                                      b.b.reject(c),
                                      (b.b = null))
                                    : a.sessionId && b.a
                                    ? ((c.method = "update"), b.a.reject(c), (b.a = null))
                                    : ((c = a.systemCode),
                                      a.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT
                                          ? cb(b, "output-restricted")
                                          : 1 == c
                                          ? cb(b, "expired")
                                          : cb(b, "internal-error"));
                        }
                    }),
                    c(ab, fa),
                    (Ae = ab.prototype),
                    (Ae.Ja = function(a, b) {
                        if (this.a) this.a.then(this.Ja.bind(this, a, b))["catch"](this.Ja.bind(this, a, b));
                        else {
                            this.a = a;
                            var c, d;
                            "webkit-org.w3.clearkey" == this.c
                                ? ((c = Ma(new Uint8Array(b))),
                                  (d = JSON.parse(c)),
                                  "oct" != d.keys[0].kty &&
                                      (this.a.reject(Error("Response is not a valid JSON Web Key Set.")),
                                      (this.a = null)),
                                  (c = Pa(d.keys[0].k)),
                                  (d = Pa(d.keys[0].kid)))
                                : ((c = new Uint8Array(b)), (d = null));
                            try {
                                this.f.webkitAddKey(this.c, c, d, this.sessionId);
                            } catch (e) {
                                this.a.reject(e), (this.a = null);
                            }
                        }
                    }),
                    (Ae.generateRequest = function(a, b) {
                        return bb(this, b, null);
                    }),
                    (Ae.load = function(a) {
                        return "persistent-license" == this.g
                            ? bb(this, null, a)
                            : Promise.reject(Error("Not a persistent session."));
                    }),
                    (Ae.update = function(a) {
                        var b = new ia();
                        return this.Ja(b, a), b;
                    }),
                    (Ae.close = function() {
                        if ("persistent-license" != this.g) {
                            if (!this.sessionId)
                                return this.closed.reject(Error("The session is not callable.")), this.closed;
                            this.f.webkitCancelKeyRequest(this.c, this.sessionId);
                        }
                        return this.closed.resolve(), this.closed;
                    }),
                    (Ae.remove = function() {
                        return "persistent-license" != this.g
                            ? Promise.reject(Error("Not a persistent session."))
                            : this.close();
                    }),
                    (db.prototype.next = function() {
                        return this.a >= this.b.length
                            ? { value: void 0, done: !0 }
                            : { value: this.b[this.a++], done: !1 };
                    });
                var Se;
                (Ae = eb.prototype),
                    (Ae.entries = function() {
                        var a = Se,
                            b = [];
                        return this.a && b.push([a, this.a]), new db(b);
                    }),
                    (Ae.forEach = function(a) {
                        this.a && a(this.a);
                    }),
                    (Ae.get = function(a) {
                        return this.has(a) ? this.a : void 0;
                    }),
                    (Ae.has = function(a) {
                        var b = Se;
                        return this.a && Ra(new Uint8Array(a), b) ? !0 : !1;
                    }),
                    (Ae.keys = function() {
                        var a = Se,
                            b = [];
                        return this.a && b.push(a), new db(b);
                    }),
                    (Ae.values = function() {
                        var a = [];
                        return this.a && a.push(this.a), new db(a);
                    }),
                    b("shaka.polyfill.MediaKeys.install", fb),
                    b("shaka.polyfill.installAll", function() {
                        q(), s(), fb(), y();
                    });
                var Te = /^(?:([^:\/?#.]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/#?]*?)(?::([0-9]+))?(?=[\/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
                (Ae = hb.prototype),
                    (Ae.R = ""),
                    (Ae.aa = ""),
                    (Ae.P = ""),
                    (Ae.fa = null),
                    (Ae.N = ""),
                    (Ae.$ = ""),
                    (Ae.toString = function() {
                        var a = [],
                            b = this.R;
                        if ((b && a.push(mb(b, Ue, !0), ":"), (b = this.P))) {
                            a.push("//");
                            var c = this.aa;
                            c && a.push(mb(c, Ue, !0), "@"),
                                a.push(encodeURIComponent(b).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
                                (b = this.fa),
                                null != b && a.push(":", String(b));
                        }
                        return (
                            (b = this.N) &&
                                (this.P && "/" != b.charAt(0) && a.push("/"),
                                a.push(mb(b, "/" == b.charAt(0) ? We : Ve, !0))),
                            (b = this.a.toString()) && a.push("?", b),
                            (b = this.$) && a.push("#", mb(b, Ye)),
                            a.join("")
                        );
                    }),
                    (Ae.resolve = function(a) {
                        var b = this.clone();
                        "data" === b.R && (b = new hb());
                        var c = !!a.R;
                        c ? ib(b, a.R) : (c = !!a.aa),
                            c ? (b.aa = a.aa) : (c = !!a.P),
                            c ? (b.P = a.P) : (c = null != a.fa);
                        var d = a.N;
                        if (c) jb(b, a.fa);
                        else if ((c = !!a.N)) {
                            if ("/" != d.charAt(0))
                                if (this.P && !this.N) d = "/" + d;
                                else {
                                    var e = b.N.lastIndexOf("/");
                                    -1 != e && (d = b.N.substr(0, e + 1) + d);
                                }
                            if (".." == d || "." == d) d = "";
                            else if (-1 != d.indexOf("./") || -1 != d.indexOf("/.")) {
                                for (
                                    var e = 0 == d.lastIndexOf("/", 0), d = d.split("/"), f = [], g = 0;
                                    g < d.length;

                                ) {
                                    var h = d[g++];
                                    "." == h
                                        ? e && g == d.length && f.push("")
                                        : ".." == h
                                        ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
                                          e && g == d.length && f.push(""))
                                        : (f.push(h), (e = !0));
                                }
                                d = f.join("/");
                            }
                        }
                        return (
                            c ? (b.N = d) : (c = "" !== a.a.toString()),
                            c ? kb(b, a.a.clone()) : (c = !!a.$),
                            c && (b.$ = a.$),
                            b
                        );
                    }),
                    (Ae.clone = function() {
                        return new hb(this);
                    });
                var Ue = /[#\/\?@]/g,
                    Ve = /[\#\?:]/g,
                    We = /[\#\?]/g,
                    Xe = /[\#\?@]/g,
                    Ye = /#/g;
                (ob.prototype.a = null),
                    (ob.prototype.c = null),
                    (ob.prototype.toString = function() {
                        if (this.b) return this.b;
                        if (!this.a) return "";
                        var a,
                            b = [];
                        for (a in this.a)
                            for (var c = encodeURIComponent(a), d = this.a[a], e = 0; e < d.length; e++) {
                                var f = c;
                                "" !== d[e] && (f += "=" + encodeURIComponent(d[e])), b.push(f);
                            }
                        return (this.b = b.join("&"));
                    }),
                    (ob.prototype.clone = function() {
                        var a = new ob();
                        if (((a.b = this.b), this.a)) {
                            var b,
                                c = {};
                            for (b in this.a) c[b] = this.a[b].concat();
                            (a.a = c), (a.c = this.c);
                        }
                        return a;
                    }),
                    (Ab.prototype.clone = function() {
                        var a = new Ab();
                        return (
                            (a.s = Rb(this.s)),
                            (a.g = this.g),
                            (a.f = this.f),
                            (a.a = Sb(this.a)),
                            (a.b = Sb(this.b)),
                            (a.c = Sb(this.c)),
                            a
                        );
                    }),
                    (Bb.prototype.clone = function() {
                        var a = new Bb();
                        return (a.url = Rb(this.url)), (a.a = Sb(this.a)), a;
                    }),
                    (Cb.prototype.clone = function() {
                        var a = new Cb();
                        return (a.url = Rb(this.url)), (a.a = Sb(this.a)), a;
                    }),
                    (Db.prototype.clone = function() {
                        var a = new Db();
                        return (
                            (a.s = Rb(this.s)),
                            (a.f = this.f),
                            (a.g = this.g),
                            (a.b = this.b),
                            (a.i = this.i),
                            (a.h = Sb(this.h)),
                            (a.a = Rb(this.a) || []),
                            (a.c = Sb(this.c)),
                            a
                        );
                    }),
                    (Eb.prototype.clone = function() {
                        var a = new Eb();
                        return (a.b = Rb(this.b)), (a.a = Sb(this.a)), a;
                    }),
                    (Fb.prototype.clone = function() {
                        var a = new Fb();
                        return (
                            (a.b = this.b),
                            (a.i = this.i),
                            (a.a = this.a),
                            (a.j = this.j),
                            (a.h = this.h),
                            (a.f = this.f),
                            (a.g = this.g),
                            (a.c = Sb(this.c)),
                            a
                        );
                    }),
                    (Gb.prototype.clone = function() {
                        var a = new Gb();
                        return (a.a = Rb(this.a) || []), a;
                    }),
                    (Hb.prototype.clone = function() {
                        var a = new Hb();
                        return (a.b = this.b), (a.a = this.a), (a.c = this.c), a;
                    }),
                    (Ib.prototype.clone = function() {
                        return new Ib(this.na, this.end);
                    }),
                    (qb.TAG_NAME = "MPD"),
                    (rb.TAG_NAME = "Period"),
                    (sb.TAG_NAME = "AdaptationSet"),
                    (tb.TAG_NAME = "Role"),
                    (ub.TAG_NAME = "ContentComponent"),
                    (vb.TAG_NAME = "Representation"),
                    (wb.TAG_NAME = "ContentProtection"),
                    (xb.TAG_NAME = "cenc:pssh"),
                    (yb.TAG_NAME = "BaseURL"),
                    (zb.TAG_NAME = "Location"),
                    (Ab.TAG_NAME = "SegmentBase"),
                    (Bb.TAG_NAME = "RepresentationIndex"),
                    (Cb.TAG_NAME = "Initialization"),
                    (Db.TAG_NAME = "SegmentList"),
                    (Eb.TAG_NAME = "SegmentURL"),
                    (Fb.TAG_NAME = "SegmentTemplate"),
                    (Gb.TAG_NAME = "SegmentTimeline"),
                    (Hb.TAG_NAME = "S"),
                    (qb.prototype.parse = function(a, b) {
                        (this.url = a.s),
                            (this.id = Tb(b, "id", $b)),
                            (this.type = Tb(b, "type", $b) || "static"),
                            (this.c = Tb(b, "mediaPresentationDuration", Vb)),
                            (this.h = Tb(b, "minBufferTime", Vb, this.h)),
                            (this.g = Tb(b, "minimumUpdatePeriod", Vb, this.g)),
                            (this.b = Tb(b, "availabilityStartTime", Ub, this.b)),
                            (this.f = Tb(b, "timeShiftBufferDepth", Vb, this.f)),
                            (this.i = Tb(b, "suggestedPresentationDelay", Vb, this.i));
                        var c = a.s,
                            d = Pb(this, b, yb);
                        (this.s = Kb(c, d)),
                            (d = Nb(this, b, zb)) && (this.j = Lb(c, d.url)),
                            (this.a = Pb(this, b, rb));
                    }),
                    (rb.prototype.parse = function(a, b) {
                        (this.id = Tb(b, "id", $b)),
                            (this.start = Tb(b, "start", Vb)),
                            (this.a = Tb(b, "duration", Vb));
                        var c = Pb(this, b, yb);
                        (this.s = Kb(a.s, c)),
                            (this.c = Nb(this, b, Ab)),
                            (this.f = Nb(this, b, Db)),
                            (this.g = Nb(this, b, Fb)),
                            (this.b = Pb(this, b, sb)),
                            Jb(this);
                    }),
                    (sb.prototype.parse = function(a, b) {
                        var c = Nb(this, b, ub) || {},
                            d = Nb(this, b, tb);
                        (this.id = Tb(b, "id", $b)),
                            (this.group = Tb(b, "group", Zb)),
                            (this.lang = Tb(b, "lang", $b, c.lang)),
                            (this.contentType = Tb(b, "contentType", $b, c.contentType)),
                            (this.width = Tb(b, "width", Yb)),
                            (this.height = Tb(b, "height", Yb)),
                            (this.b = Tb(b, "mimeType", $b)),
                            (this.i = Tb(b, "codecs", $b)),
                            (this.c = d && "main" == d.value),
                            this.lang && (this.lang = T(this.lang)),
                            (c = Pb(this, b, yb)),
                            (this.s = Kb(a.s, c)),
                            (this.j = Pb(this, b, wb)),
                            !this.contentType && this.b && (this.contentType = this.b.split("/")[0]),
                            (this.f = a.c ? Mb(this, b, a.c) : Nb(this, b, Ab)),
                            (this.g = a.f ? Mb(this, b, a.f) : Nb(this, b, Db)),
                            (this.h = a.g ? Mb(this, b, a.g) : Nb(this, b, Fb)),
                            (this.a = Pb(this, b, vb)),
                            !this.b &&
                                this.a.length &&
                                ((this.b = this.a[0].f),
                                !this.contentType && this.b && (this.contentType = this.b.split("/")[0]));
                    }),
                    (tb.prototype.parse = function(a, b) {
                        this.value = Tb(b, "value", $b);
                    }),
                    (ub.prototype.parse = function(a, b) {
                        (this.id = Tb(b, "id", $b)),
                            (this.lang = Tb(b, "lang", $b)),
                            (this.contentType = Tb(b, "contentType", $b)),
                            this.lang && (this.lang = T(this.lang));
                    }),
                    (vb.prototype.parse = function(a, b) {
                        (this.id = Tb(b, "id", $b)),
                            (this.bandwidth = Tb(b, "bandwidth", Yb)),
                            (this.width = Tb(b, "width", Yb, a.width)),
                            (this.height = Tb(b, "height", Yb, a.height)),
                            (this.f = Tb(b, "mimeType", $b, a.b)),
                            (this.h = Tb(b, "codecs", $b, a.i)),
                            (this.lang = a.lang);
                        var c = Pb(this, b, yb);
                        (this.s = Kb(a.s, c)),
                            (this.c = Pb(this, b, wb)),
                            (this.g = a.f ? Mb(this, b, a.f) : Nb(this, b, Ab)),
                            (this.b = a.g ? Mb(this, b, a.g) : Nb(this, b, Db)),
                            (this.a = a.h ? Mb(this, b, a.h) : Nb(this, b, Fb)),
                            0 == this.c.length && (this.c = a.j);
                    }),
                    (wb.prototype.parse = function(a, b) {
                        (this.b = b), (this.schemeIdUri = Tb(b, "schemeIdUri", $b)), (this.value = Tb(b, "value", $b));
                        var c = Tb(b, "cenc:default_KID", $b);
                        c && (this.a = c.replace(/[-]/g, "")),
                            (this.pssh = Nb(this, b, xb)),
                            (this.children = Array.prototype.slice.call(b.childNodes));
                    }),
                    (xb.prototype.parse = function(a, b) {
                        var c = Qb(b);
                        if (c) {
                            this.psshBox = Pa(c);
                            try {
                                this.parsedPssh = new gb(this.psshBox);
                            } catch (d) {
                                if (!(d instanceof RangeError)) throw d;
                            }
                        }
                    }),
                    (yb.prototype.parse = function(a, b) {
                        this.url = Qb(b);
                    }),
                    (zb.prototype.parse = function(a, b) {
                        this.url = Qb(b);
                    }),
                    (Ab.prototype.parse = function(a, b) {
                        (this.s = a.s || this.s),
                            (this.g = Tb(b, "timescale", Yb, this.g)),
                            (this.f = Tb(b, "presentationTimeOffset", Zb, this.f)),
                            (this.a = Tb(b, "indexRange", Wb, this.a)),
                            (this.b = Nb(this, b, Bb) || this.b),
                            (this.c = Nb(this, b, Cb) || this.c);
                    }),
                    (Bb.prototype.parse = function(a, b) {
                        var c = Tb(b, "sourceURL", $b);
                        (this.url = Lb(a.s, c)), (this.a = Tb(b, "range", Wb, Sb(a.a)));
                    }),
                    (Cb.prototype.parse = function(a, b) {
                        var c = Tb(b, "sourceURL", $b);
                        (this.url = Lb(a.s, c)), (this.a = Tb(b, "range", Wb));
                    }),
                    (Db.prototype.parse = function(a, b) {
                        (this.s = a.s || this.s),
                            (this.f = Tb(b, "timescale", Yb, this.f)),
                            (this.g = Tb(b, "presentationTimeOffset", Zb, this.g)),
                            (this.b = Tb(b, "duration", Yb, this.b)),
                            (this.i = Tb(b, "startNumber", Zb, this.i)),
                            (this.h = Nb(this, b, Cb) || this.h);
                        var c = Pb(this, b, Eb);
                        (this.a = c && 0 < c.length ? c : this.a), (this.c = Nb(this, b, Gb) || this.c);
                    }),
                    (Eb.prototype.parse = function(a, b) {
                        var c = Tb(b, "media", $b);
                        (this.b = Lb(a.s, c)), (this.a = Tb(b, "mediaRange", Wb));
                    }),
                    (Fb.prototype.parse = function(a, b) {
                        (this.b = Tb(b, "timescale", Yb, this.b)),
                            (this.i = Tb(b, "presentationTimeOffset", Zb, this.i)),
                            (this.a = Tb(b, "duration", Yb, this.a)),
                            (this.j = Tb(b, "startNumber", Zb, this.j)),
                            (this.h = Tb(b, "media", $b, this.h)),
                            (this.f = Tb(b, "index", $b, this.f)),
                            (this.g = Tb(b, "initialization", $b, this.g)),
                            (this.c = Nb(this, b, Gb) || this.c);
                    }),
                    (Gb.prototype.parse = function(a, b) {
                        this.a = Pb(this, b, Hb);
                    }),
                    (Hb.prototype.parse = function(a, b) {
                        (this.b = Tb(b, "t", Zb)), (this.a = Tb(b, "d", Zb)), (this.c = Tb(b, "r", Xb));
                    }),
                    (Ae = _b.prototype),
                    (Ae.bb = function() {
                        if (this.a) return this.c;
                        if (0 == this.url.lastIndexOf("data:", 0)) {
                            var b = this.url
                                    .split(":")[1]
                                    .split(";")
                                    .pop()
                                    .split(","),
                                c = b.pop(),
                                c =
                                    "base64" == b.pop()
                                        ? a.atob(c.replace(/-/g, "+").replace(/_/g, "/"))
                                        : a.decodeURIComponent(c);
                            return (
                                "arraybuffer" == this.b.f && (c = Na(c).buffer),
                                (b = JSON.parse(JSON.stringify(new XMLHttpRequest()))),
                                (b.response = c),
                                (b.responseText = c.toString()),
                                (c = this.c),
                                c.resolve(b),
                                bc(this),
                                c
                            );
                        }
                        if (0 == this.url.lastIndexOf("idb:", 0)) return dc(this);
                        this.h++,
                            (this.i = Date.now()),
                            this.g || (this.g = this.b.h),
                            (this.a = new XMLHttpRequest()),
                            (b = this.url),
                            ((this.f && !this.f.supportsCaching()) || this.b.g) &&
                                ((b = new hb(b)), pb(b.a, "_", Date.now()), (b = b.toString())),
                            this.a.open(this.b.method, b, !0),
                            (this.a.responseType = this.b.f),
                            (this.a.timeout = this.b.c),
                            (this.a.withCredentials = this.b.i),
                            (this.a.onload = this.lb.bind(this)),
                            this.b.g && (this.a.onreadystatechange = this.pb.bind(this)),
                            (this.a.onerror = this.Hb.bind(this)),
                            (this.a.ontimeout = this.ub.bind(this));
                        for (c in this.b.b) this.a.setRequestHeader(c, this.b.b[c]);
                        return this.a.send(this.b.body), this.c;
                    }),
                    (Ae.lb = function(a) {
                        this.f && this.f.sample(Date.now() - this.i, a.loaded),
                            200 <= this.a.status && 299 >= this.a.status
                                ? (this.c.resolve(this.a), bc(this))
                                : this.h < this.b.a
                                ? fc(this)
                                : ((a = ec(this, "HTTP error.", "net")), this.c.reject(a), bc(this));
                    }),
                    (Ae.pb = function() {
                        if (this.a.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
                            var a = Date.parse(this.a.getResponseHeader("Date"));
                            a && (Je = a - Date.now());
                        }
                    }),
                    (Ae.Hb = function() {
                        var a = ec(this, "Network failure.", "net");
                        this.c.reject(a), bc(this);
                    }),
                    (Ae.ub = function() {
                        if (this.h < this.b.a) fc(this);
                        else {
                            var a = ec(this, "Request timed out.", "net");
                            this.c.reject(a), bc(this);
                        }
                    }),
                    (gc.prototype.g = function() {
                        if (this.b) {
                            this.a = null;
                            var a = this.b;
                            if (a.a && a.a.readyState != XMLHttpRequest.DONE) {
                                a.a.abort();
                                var b = ec(a, "Request aborted.", "aborted");
                                a.c.reject(b), bc(a);
                            }
                            this.b = null;
                        }
                    }),
                    (gc.prototype.clone = function() {
                        return new gc(
                            this.i,
                            this.c.map(function(a) {
                                return a.clone();
                            }),
                            this.f,
                            this.h
                        );
                    }),
                    (gc.prototype.toString = function() {
                        return this.c[0].toString();
                    }),
                    (qc.prototype.destroy = function() {
                        this.a && (this.a.g(), (this.a = null));
                    }),
                    (qc.prototype.create = function() {
                        return this.a ? ic(this.a) : Promise.resolve(null);
                    }),
                    (vc.prototype.parse = function(a, b, c, d) {
                        var e = null;
                        try {
                            a: {
                                var f = [],
                                    g = new C(a),
                                    h = F(g);
                                if (1936286840 != F(g)) e = null;
                                else {
                                    1 == h && (h = G(g));
                                    var i = E(g);
                                    I(g, 3), I(g, 4);
                                    var j = F(g);
                                    if (0 == j) e = null;
                                    else {
                                        var k, l;
                                        0 == i ? ((k = F(g)), (l = F(g))) : ((k = G(g)), (l = G(g))), I(g, 2);
                                        var m = g.b.getUint16(g.a, g.c);
                                        for (g.a += 2, a = k, b = b + h + l, h = 0; m > h; h++) {
                                            var n = F(g);
                                            l = (2147483648 & n) >>> 31;
                                            var i = 2147483647 & n,
                                                o = F(g);
                                            if ((F(g), 1 == l)) {
                                                e = null;
                                                break a;
                                            }
                                            var p = new gc(d, c, b, b + i - 1);
                                            f.push(new rc(a / j, (a + o) / j, p)), (a += o), (b += i);
                                        }
                                        e = f;
                                    }
                                }
                            }
                        } catch (q) {
                            if (!(q instanceof RangeError)) throw q;
                        }
                        return e;
                    }),
                    (wc.prototype.destroy = function() {
                        this.u = null;
                    }),
                    (Ae = wc.prototype),
                    (Ae.length = function() {
                        return this.u.length;
                    }),
                    (Ae.get = function(a) {
                        if (0 > a || a >= this.u.length)
                            throw new RangeError("SegmentIndex: The specified index is out of range.");
                        return this.u[a];
                    }),
                    (Ae.ia = function(a) {
                        return (a = tc(this.u, a)), a >= 0 ? this.u[a] : null;
                    }),
                    (Ae.Ca = function(a) {
                        return zc(this, a), !0;
                    }),
                    (Ae.ha = function(a) {
                        var b = a - this.g;
                        return 0 == b ? 0 : ((this.u = uc(this.u, b)), (this.g = a), b);
                    }),
                    (Ae.Ba = function() {
                        return 0 < this.length() ? { start: xc(this).b, end: yc(this).a } : { start: 0, end: 0 };
                    }),
                    c(Ac, wc),
                    (Ac.prototype.destroy = function() {
                        (this.o = this.f = null), wc.prototype.destroy.call(this);
                    }),
                    (Ac.prototype.ia = function(a) {
                        return Dc(this, B() / 1e3), wc.prototype.ia.call(this, a);
                    }),
                    (Ac.prototype.Ca = function(a) {
                        return zc(this, a), null == this.a && Bc(this), !0;
                    }),
                    (Ac.prototype.ha = function(a) {
                        return (
                            (a = wc.prototype.ha.call(this, a)),
                            null != this.a && ((this.j += a), (this.c += a), this.j > this.a && (this.a += a)),
                            a
                        );
                    }),
                    (Ac.prototype.Ba = function() {
                        return Cc(this, B() / 1e3);
                    }),
                    c(Ec, Ac),
                    (Ec.prototype.destroy = function() {
                        (this.w = this.l = null), Ac.prototype.destroy.call(this);
                    }),
                    (Ec.prototype.ia = function(a) {
                        var b = B() / 1e3;
                        return Fc(this, b), Dc(this, b), wc.prototype.ia.call(this, a);
                    }),
                    (Ec.prototype.Ca = function(a) {
                        return null == this.b && a instanceof Ec && null != a.b
                            ? ((this.b = a.b),
                              (this.i = a.i),
                              (this.h = a.h),
                              zc(this, a),
                              Fc(this, B() / 1e3),
                              Bc(this),
                              !0)
                            : !1;
                    }),
                    (Ec.prototype.ha = function(a) {
                        return (a = Ac.prototype.ha.call(this, a)), null != this.b && ((this.b += a), (this.i += a)), a;
                    }),
                    (Ec.prototype.Ba = function() {
                        var a = B() / 1e3;
                        return Fc(this, a), Cc(this, a);
                    }),
                    (Gc.prototype.destroy = function() {
                        (this.g = this.c = this.b = this.f = null), this.a && (this.a.destroy(), (this.a = null));
                    }),
                    (Gc.prototype.create = function() {
                        if (this.a) return Promise.resolve(this.a);
                        if ("dynamic" == this.f.type)
                            try {
                                this.a = new Ec(this.f, this.b, this.c, this.h, this.g);
                            } catch (a) {
                                return Promise.reject(a);
                            }
                        else {
                            var b;
                            if (((b = this.c.a), (b = mc(this.g, this.c, 1, Math.ceil(this.b.a / (b.a / b.b)))))) {
                                if (0 < b.length) {
                                    var c = b[b.length - 1];
                                    b[b.length - 1] = sc(c, c.b, this.b.a);
                                }
                                b = new wc(b);
                            } else b = null;
                            if (((this.a = b), !this.a))
                                return (
                                    (b = Error("Failed to generate SegmentReferences")),
                                    (b.type = "stream"),
                                    Promise.reject(b)
                                );
                        }
                        return Promise.resolve(this.a);
                    }),
                    (Hc.prototype.destroy = function() {
                        (this.f = this.g = this.b = this.c = null), this.a && (this.a.destroy(), (this.a = null));
                    }),
                    (Hc.prototype.create = function() {
                        if (this.a) return Promise.resolve(this.a);
                        var a = this.g.b,
                            b = [];
                        a.c && (b = pc(a.c, a.f || 1, this.b.a || 0));
                        var c = 0;
                        a.b && a.i ? (c = a.b * a.i) : 0 < b.length && (c = b[0].start - (a.g || 0));
                        var d = a.a.length;
                        0 < b.length && b.length != a.a.length && (d = Math.min(b.length, a.a.length));
                        for (var e = [], f = 0; d > f; ++f) {
                            var g = a.a[f],
                                h = c / a.f,
                                i = null,
                                j = null;
                            a.b
                                ? ((i = c + a.b), (j = i / a.f))
                                : 0 < b.length
                                ? ((i = b[f].end - (a.g || 0)), (j = i / a.f))
                                : ((j = h + this.b.a), (i = j * a.f));
                            var c = i,
                                i = 0,
                                k = null;
                            g.a && ((i = g.a.na), (k = g.a.end)), e.push(new rc(h, j, new gc(this.f, g.b, i, k)));
                        }
                        return (
                            "dynamic" == this.c.type
                                ? (this.a = new Ac(e, this.c, this.b, this.h))
                                : (this.a = new wc(e)),
                            Promise.resolve(this.a)
                        );
                    }),
                    (Ic.prototype.destroy = function() {
                        (this.g = this.f = this.c = this.b = null), this.a && (this.a.destroy(), (this.a = null));
                    }),
                    (Ic.prototype.create = function() {
                        if (this.a) return Promise.resolve(this.a);
                        for (var a = this.f.a, b = pc(a.c, a.b || 1, this.c.a || 0), c = [], d = 0; d < b.length; ++d) {
                            var e = b[d].start,
                                f = e / a.b,
                                g = b[d].end / a.b,
                                e = nc(this.g, this.f, d + a.j, e);
                            if (!e)
                                return (
                                    (a = Error("Failed to generate media URL.")), (a.type = "dash"), Promise.reject(a)
                                );
                            var h = (a.i || 0) / a.b;
                            c.push(new rc(f - h, g - h, e));
                        }
                        return (
                            "dynamic" == this.b.type
                                ? (this.a = new Ac(c, this.b, this.c, this.h))
                                : (this.a = new wc(c)),
                            Promise.resolve(this.a)
                        );
                    }),
                    (Jc.prototype.destroy = function() {
                        (this.b = null), this.a && (this.a.destroy(), (this.a = null));
                    }),
                    (Jc.prototype.create = function() {
                        if (this.a) return Promise.resolve(this.a);
                        for (var a = [], b = 0; b < this.b.length; ++b) {
                            var c = this.b[b];
                            a.push(new rc(c.start_time, c.end_time, new gc(null, [new hb(c.url)], c.start_byte, null)));
                        }
                        return (this.b = null), (this.a = new wc(a)), Promise.resolve(this.a);
                    });
                var Ze = 0;
                Kc.prototype.destroy = function() {
                    this.F && (this.F.destroy(), (this.F = null)), this.C && (this.C.destroy(), (this.C = null));
                };
                var $e = 0;
                (Mc.prototype.destroy = function() {
                    for (var a = 0; a < this.m.length; ++a) this.m[a].destroy();
                    this.a = this.m = null;
                }),
                    (Oc.prototype.destroy = function() {
                        for (var a = 0; a < this.a.length; ++a) this.a[a].destroy();
                        this.a = null;
                    }),
                    (Pc.prototype.destroy = function() {
                        for (var a = 0; a < this.a.length; ++a) this.a[a].destroy();
                        this.a = null;
                    }),
                    c(Rc, fa),
                    (Rc.prototype.H = function(a) {
                        null != a.initialStreamBufferSize && (this.K = Number(a.initialStreamBufferSize)),
                            null != a.streamBufferSize && (this.w = Number(a.streamBufferSize)),
                            null != a.segmentRequestTimeout && (this.a.l = Number(a.segmentRequestTimeout));
                    }),
                    (Rc.prototype.destroy = function() {
                        Yc(this),
                            this.h.destroy(),
                            (this.b = this.h = null),
                            this.a.destroy(),
                            (this.v = this.c = this.a = null);
                    }),
                    (Ae = Rc.prototype),
                    (Ae.oa = function() {
                        return this.b;
                    }),
                    (Ae.Pa = function() {
                        return this.D;
                    }),
                    (Ae.cb = function(a) {
                        return (
                            this.f ||
                                a
                                    .then(
                                        function() {
                                            (this.f = !0), this.g || Xc(this, 0);
                                        }.bind(this)
                                    )
                                    ["catch"](function() {}),
                            this.h
                        );
                    }),
                    (Ae.Qa = function() {
                        return this.j;
                    }),
                    (Ae.ra = function(a, b, c) {
                        if (a != this.b) {
                            var d = [a.F.create(), a.C.create()];
                            Promise.all(d)
                                .then(
                                    oa(this, function(d) {
                                        if (this.c) {
                                            var e = this.b;
                                            (this.b = a),
                                                (this.D = d[0]),
                                                (this.B = d[1]),
                                                (this.I = !0),
                                                this.l || (e ? b && Sc(this, !0, c) : Xc(this, 0));
                                        }
                                    })
                                )
                                ["catch"](
                                    oa(this, function(a) {
                                        "aborted" != a.type &&
                                            (this.f ? ((a = R(a)), this.dispatchEvent(a)) : this.h.reject(a));
                                    })
                                );
                        }
                    }),
                    (Ae.Va = function() {
                        return Sc(this, !1);
                    }),
                    (Ae.wa = function() {}),
                    (Ae.Aa = function() {
                        return !0;
                    }),
                    (Ae.Fa = function() {
                        return this.o ? this.w : Math.min(this.K, this.w);
                    }),
                    (Ae.xb = function() {
                        if (this.o && !this.f) this.g = null;
                        else {
                            var a;
                            if (((a = this.f && !this.j) && (a = 1 < this.a.c.buffered.length ? !0 : !1), a))
                                Sc(this, !0);
                            else {
                                (this.g = null), (a = this.b);
                                var b = this.D,
                                    c = this.c.currentTime;
                                qa(this.a, this.o ? c : c + (this.i || 0)) >= this.Fa()
                                    ? (Uc(this), Xc(this, 1e3 / (Math.abs(this.c.playbackRate) || 1)))
                                    : (b = Tc(this, c, b))
                                    ? ((b = ra(this.a, b, a.c, this.B)),
                                      (this.B = null),
                                      this.I && ((this.I = !1), Vc(this, a)),
                                      (this.j = !1),
                                      b
                                          .then(
                                              oa(this, function(a) {
                                                  null == this.i && (this.i = a),
                                                      this.G &&
                                                          0 < qa(this.a, c) &&
                                                          ((this.G = !1), (this.c.currentTime += 0.001)),
                                                      Xc(this, 0);
                                              })
                                          )
                                          ["catch"](
                                              oa(this, function(a) {
                                                  if ("aborted" != a.type) {
                                                      var b = [0, 404, 410];
                                                      "net" == a.type &&
                                                          -1 != b.indexOf(a.Lb.status) &&
                                                          this.b &&
                                                          Xc(this, 5e3),
                                                          (a = R(a)),
                                                          this.dispatchEvent(a);
                                                  }
                                              })
                                          ))
                                    : (Uc(this), this.f && !this.j && ((this.j = !0), Wc(this)), Xc(this, 1e3));
                            }
                        }
                    }),
                    (Zc.prototype.destroy = function() {
                        this.a && (this.a.destroy(), (this.a = null));
                    }),
                    (Zc.prototype.create = function() {
                        if (this.a) return Promise.resolve(this.a);
                        var a = new rc(0, null, this.b);
                        return (this.a = new wc([a])), Promise.resolve(this.a);
                    }),
                    c($c, fa),
                    ($c.prototype.H = function() {}),
                    ($c.prototype.destroy = function() {
                        this.a && this.b.removeChild(this.a),
                            this.c.destroy(),
                            (this.v = this.b = this.f = this.g = this.a = this.c = null);
                    }),
                    (Ae = $c.prototype),
                    (Ae.oa = function() {
                        return this.f;
                    }),
                    (Ae.Pa = function() {
                        return this.g;
                    }),
                    (Ae.cb = function() {
                        return this.c;
                    }),
                    (Ae.Qa = function() {
                        return !0;
                    }),
                    (Ae.ra = function(a) {
                        a.F.create().then(
                            oa(this, function(b) {
                                if (this.b) {
                                    if (0 == b.length()) return Promise.reject(Error("No subtitles URL available."));
                                    var c = this.f;
                                    (this.f = a), (this.g = b), (b = xc(b).url.c[0].toString());
                                    var d = this.Aa();
                                    this.a && (this.wa(!1), this.b.removeChild(this.a)),
                                        (this.a = document.createElement("track")),
                                        this.b.appendChild(this.a),
                                        (this.a.src = b),
                                        this.wa(d),
                                        (b = Q({
                                            type: "adaptation",
                                            bubbles: !0,
                                            contentType: "text",
                                            size: null,
                                            bandwidth: a.bandwidth
                                        })),
                                        this.dispatchEvent(b),
                                        c || this.c.resolve(0);
                                }
                            })
                        );
                    }),
                    (Ae.Va = function() {}),
                    (Ae.wa = function(a) {
                        (this.h = a), this.a && (this.a.track.mode = a ? "showing" : "disabled");
                    }),
                    (Ae.Aa = function() {
                        return this.h;
                    }),
                    (Ae.Fa = function() {
                        return 0;
                    }),
                    (_c.prototype.parse = function(a, b, c, d) {
                        var e = null;
                        try {
                            var f,
                                g = new J(b);
                            if (440786851 != K(g).id) f = null;
                            else {
                                var h = K(g);
                                if (408125543 != h.id) f = null;
                                else {
                                    var i,
                                        j = h.a.byteOffset,
                                        k = new J(h.a);
                                    for (b = null; D(k.a); ) {
                                        var l = K(k);
                                        if (357149030 == l.id) {
                                            b = l;
                                            break;
                                        }
                                    }
                                    if (b) {
                                        for (var m = new J(b.a), k = 1e6; D(m.a); ) {
                                            var n = K(m);
                                            if (2807729 == n.id) {
                                                k = N(n);
                                                break;
                                            }
                                        }
                                        i = k / 1e9;
                                    } else i = null;
                                    f = i ? { Db: j, Ib: i } : null;
                                }
                            }
                            if (f) {
                                var o = K(new J(a));
                                if (475249515 != o.id) e = null;
                                else {
                                    var p = f.Db,
                                        q = f.Ib;
                                    a = [];
                                    var r = new J(o.a);
                                    for (f = o = -1; D(r.a); ) {
                                        var s = K(r);
                                        if (187 == s.id) {
                                            var t,
                                                u = new J(s.a),
                                                v = K(u);
                                            if (179 != v.id) t = null;
                                            else {
                                                var w = N(v),
                                                    x = K(u);
                                                if (183 != x.id) t = null;
                                                else {
                                                    for (var y = new J(x.a), j = 0; D(y.a); ) {
                                                        var z = K(y);
                                                        if (241 == z.id) {
                                                            j = N(z);
                                                            break;
                                                        }
                                                    }
                                                    t = { Kb: w, Cb: j };
                                                }
                                            }
                                            if (t) {
                                                var A = q * t.Kb,
                                                    B = p + t.Cb;
                                                if (o >= 0) {
                                                    var C = new gc(d, c, f, B - 1);
                                                    a.push(new rc(o, A, C));
                                                }
                                                (o = A), (f = B);
                                            }
                                        }
                                    }
                                    o >= 0 && ((C = new gc(d, c, f, null)), a.push(new rc(o, null, C))), (e = a);
                                }
                            } else e = null;
                        } catch (E) {
                            if (!(E instanceof RangeError)) throw E;
                        }
                        return e;
                    }),
                    (ad.prototype.destroy = function() {
                        (this.h = this.j = this.g = null),
                            this.a.g(),
                            (this.a = null),
                            this.c && (this.c.g(), (this.c = null)),
                            this.i && (this.i.destroy(), (this.i = null)),
                            (this.b = null);
                    }),
                    (ad.prototype.create = function() {
                        if (this.b) return this.b;
                        var a = [ic(this.a)];
                        return (
                            "webm" == this.f && a.push(ic(this.c)),
                            (this.b = Promise.all(a).then(
                                oa(this, function(a) {
                                    var b = a[0];
                                    a = a[1] || null;
                                    var c = null;
                                    if (
                                        ("mp4" == this.f
                                            ? ((c = new vc()),
                                              (c = c.parse(new DataView(b), this.a.f, this.a.c, this.h)))
                                            : "webm" == this.f &&
                                              ((c = new _c()),
                                              (c = c.parse(new DataView(b), new DataView(a), this.a.c, this.h))),
                                        !c)
                                    )
                                        return (
                                            (b = Error(
                                                "Failed to parse SegmentReferences from " +
                                                    this.a.toString() +
                                                    " (or one of its fallbacks)."
                                            )),
                                            (b.type = "stream"),
                                            Promise.reject(b)
                                        );
                                    var d;
                                    return (
                                        (d = "dynamic" == this.g.type ? new Ac(c, this.g, this.j, this.v) : new wc(c)),
                                        Promise.resolve(d)
                                    );
                                })
                            ))
                        );
                    }),
                    c(rd, ya),
                    (rd.prototype.g = function(a, b, c) {
                        var d = new ia();
                        a = { stream_id: c.qa, mime_type: a.a, codecs: a.b, init_segment: b, references: c.u };
                        var e = Da(this).put(a);
                        return (
                            (e.onsuccess = function() {
                                d.resolve(c.qa);
                            }),
                            (e.onerror = function() {
                                d.reject(e.error);
                            }),
                            d
                        );
                    }),
                    (rd.prototype.f = function(a, b) {
                        for (var c = Promise.resolve(), d = 0; d < a.length(); ++d)
                            var e = a.get(d),
                                f = d == a.length() - 1,
                                f = this.c.bind(this, e, b, f),
                                c = c.then(this.i.bind(this, e)),
                                c = c.then(f);
                        return c
                            .then(function() {
                                return Promise.resolve(b);
                            })
                            ["catch"](
                                oa(this, function(a) {
                                    return xd(this, b.qa), Promise.reject(a);
                                })
                            );
                    }),
                    (rd.prototype.c = function(a, b, c, d) {
                        var e = new ia();
                        0 == b.ga.byteLength && (b.za = a), (b.ga = wd(b.ga, d)), b.Ua++;
                        var f = Q({ type: "progress", detail: (b.Ua / b.Jb) * 100, bubbles: !0 });
                        if (1048576 <= b.ga.byteLength || c) {
                            c = { stream_id: b.qa, segment_id: b.Da, content: b.ga };
                            var g = Ca(this).put(c);
                            b.u.push({
                                start_time: b.za.b,
                                start_byte: b.za.url.f,
                                end_time: a.a,
                                url: "idb://" + b.qa + "/" + b.Da
                            }),
                                b.Da++,
                                (b.ga = new ArrayBuffer(0)),
                                (g.onerror = function() {
                                    e.reject(g.error);
                                }),
                                (g.onsuccess = oa(this, function() {
                                    this.dispatchEvent(f), e.resolve();
                                }));
                        } else this.dispatchEvent(f), e.resolve();
                        return e;
                    }),
                    (rd.prototype.i = function(a) {
                        var b = new ac();
                        return (b.c = 1e3 * this.b), ic(a.url, b, this.j);
                    }),
                    c(Ad, fa),
                    (Ad.prototype.destroy = function() {
                        this.v = null;
                        for (var b = 0; b < this.f.length; ++b) this.f[b].close()["catch"](function() {});
                        (this.f = []),
                            (this.j = this.a = this.h = null),
                            this.c.destroy(),
                            (this.c = null),
                            this.l.destroy(),
                            (this.l = null),
                            this.i && (a.clearTimeout(this.i), (this.i = null)),
                            (this.g = this.b = null);
                    }),
                    (Ad.prototype.initialize = function() {
                        for (var a = new Z(), b = this.b.Oa(), c = 0; c < b.length; ++c) {
                            var d = b[c];
                            d.a.a || (d.b && !Kd(d.b)) || a.push(d.contentType, d);
                        }
                        for (var c = {}, d = !1, e = 0; e < b.length; ++e) {
                            var f = b[e];
                            if (f.a.a && !a.a.hasOwnProperty(f.contentType)) {
                                var g = f.a.a,
                                    h = c[g];
                                if (
                                    (h ||
                                        ((h = f.a),
                                        (h = {
                                            audioCapabilities: void 0,
                                            videoCapabilities: void 0,
                                            initDataTypes: void 0,
                                            distinctiveIdentifier: h.g ? "required" : "optional",
                                            persistentState: h.o || this.b.ea() ? "required" : "optional",
                                            sessionTypes: [this.b.ea() ? "persistent-license" : "temporary"]
                                        }),
                                        (c[g] = h)),
                                    f.b && ((g = f.contentType + "Capabilities"), g in h))
                                ) {
                                    (d = !0), h[g] || (h[g] = []);
                                    var i;
                                    "audio" == f.contentType ? (i = f.a.f) : "video" == f.contentType && (i = f.a.v),
                                        h[g].push({ contentType: f.b, robustness: i });
                                }
                            }
                        }
                        if (!d) {
                            if (!b.length) throw ((a = Error("No DrmInfo exists!")), (a.type = "drm"), a);
                            this.a = b[0].a;
                        }
                        return 0 == Object.keys(c).length
                            ? (this.b.Ea(a), this.c.resolve(), Promise.resolve())
                            : ((i = new ia()),
                              (c = Dd(this, c, i)),
                              (c = c.then(this.hb.bind(this, b, a))),
                              (c = c.then(this.Eb.bind(this))),
                              i.reject(null),
                              c);
                    }),
                    (Ae = Ad.prototype),
                    (Ae.hb = function(a, b, c) {
                        if (!this.g) return Ed();
                        for (
                            var d = c.keySystem, e = c.getConfiguration(), f = ["audio", "video"], g = 0;
                            g < f.length;
                            ++g
                        ) {
                            var h = f[g];
                            if (!b.a.hasOwnProperty(h)) {
                                var i = e[h + "Capabilities"];
                                if (i && i.length) {
                                    for (var i = i[0], j = [], k = {}, l = 0; l < a.length; ++l) {
                                        var m = a[l];
                                        if (m.a.a == d && m.b == i.contentType && !(m.id in k)) {
                                            j.push(m), (k[m.id] = !0);
                                            var n;
                                            if (this.a) {
                                                n = this.a;
                                                var m = m.a,
                                                    o = new Sa();
                                                (o.a = n.a),
                                                    (o.j = n.j),
                                                    (o.l = n.l),
                                                    (o.h = n.h),
                                                    (o.i = n.i),
                                                    (o.g = n.g),
                                                    (o.o = n.o),
                                                    (o.f = n.f),
                                                    (o.v = n.v),
                                                    (o.c = n.c ? new Uint8Array(n.c.buffer) : null),
                                                    Ua(o, n.b),
                                                    Ua(o, m.b),
                                                    (n = o);
                                            } else n = m.a;
                                            this.a = n;
                                        }
                                    }
                                    b.a[h] = j;
                                }
                            }
                        }
                        return this.b.Ea(b), c.createMediaKeys();
                    }),
                    (Ae.Eb = function(a) {
                        return this.g
                            ? ((this.h = a),
                              this.g
                                  .setMediaKeys(this.h)
                                  .then(
                                      oa(this, function() {
                                          return this.g
                                              ? this.a.c
                                                  ? this.h.setServerCertificate(this.a.c)
                                                  : Promise.resolve()
                                              : Ed();
                                      })
                                  )
                                  .then(
                                      oa(this, function() {
                                          if (!this.g) return Ed();
                                          if (0 < this.b.va().length) Fd(this);
                                          else {
                                              for (var a = 0; a < this.a.b.length; ++a) {
                                                  var b = this.a.b[a];
                                                  this.Ra({
                                                      type: "encrypted",
                                                      initDataType: b.initDataType,
                                                      initData: b.initData
                                                  });
                                              }
                                              0 == this.a.b.length &&
                                                  ca(this.l, this.g, "encrypted", this.Ra.bind(this));
                                          }
                                      })
                                  ))
                            : Ed();
                    }),
                    (Ae.Ra = function(a) {
                        var b = new Uint8Array(a.initData),
                            c = Array.prototype.join.apply(b);
                        if (!this.j[c]) {
                            try {
                                var d = Gd(this);
                            } catch (e) {
                                return (d = R(e)), this.dispatchEvent(d), void this.c.reject(e);
                            }
                            (a = d.generateRequest(a.initDataType, a.initData)),
                                (this.j[c] = !0),
                                a["catch"](
                                    oa(this, function(a) {
                                        if (this.j) {
                                            this.j[c] = !1;
                                            var b = R(a);
                                            this.dispatchEvent(b), this.c.reject(a);
                                        }
                                    })
                                ),
                                this.f.push(d);
                        }
                    }),
                    (Ae.sb = function(a) {
                        Hd(this, a.target, this.a, a.message);
                    }),
                    (Ae.kb = function(a) {
                        a = a.target.keyStatuses;
                        for (var b = {}, c = a.keys(), d = c.next(); !d.done; d = c.next()) {
                            var e = Qa(new Uint8Array(d.value)),
                                d = a.get(d.value);
                            b[e] = d;
                        }
                        this.b.Sa(b);
                    }),
                    c(Jd, fa),
                    b("shaka.player.Player", Jd),
                    (Jd.version = "v1.5.1"),
                    (Jd.isBrowserSupported = function() {
                        return !!(
                            a.MediaSource &&
                            a.MediaKeys &&
                            a.navigator &&
                            a.navigator.requestMediaKeySystemAccess &&
                            a.MediaKeySystemAccess &&
                            a.MediaKeySystemAccess.prototype.getConfiguration &&
                            a.Promise &&
                            Element.prototype.requestFullscreen &&
                            document.exitFullscreen &&
                            "fullscreenElement" in document &&
                            a.Uint8Array
                        );
                    }),
                    (Jd.isTypeSupported = Kd),
                    (Jd.setTextStyle = function(a) {
                        var b = document.getElementById("ShakaPlayerTextStyle");
                        for (
                            b ||
                                ((b = document.createElement("style")),
                                (b.id = "ShakaPlayerTextStyle"),
                                document.head.appendChild(b)),
                                b = b.sheet;
                            b.cssRules.length;

                        )
                            b.deleteRule(0);
                        b.insertRule("::cue { " + l(a) + " }", 0);
                    }),
                    (Jd.prototype.destroy = function() {
                        return this.w()
                            .then(
                                oa(this, function() {
                                    this.f.destroy(), (this.a = this.f = null);
                                })
                            )
                            ["catch"](function() {});
                    }),
                    (Jd.prototype.destroy = Jd.prototype.destroy),
                    (Jd.prototype.w = function() {
                        if (!this.b) return Promise.resolve();
                        this.i && Pd(this),
                            this.a.pause(),
                            da(this.f),
                            Od(this),
                            Md(this),
                            this.l && (this.l.destroy(), (this.l = null)),
                            (this.a.src = "");
                        var a = this.a.setMediaKeys(null);
                        return this.b && (this.b.destroy(), (this.b = null)), (this.i = !1), (this.g = new nd()), a;
                    }),
                    (Jd.prototype.unload = Jd.prototype.w),
                    (Jd.prototype.ma = function(a) {
                        var b = this.w();
                        return (
                            this.a.autoplay && (f("load"), ca(this.f, this.a, "timeupdate", this.jb.bind(this))),
                            a.I(this.c),
                            a.$a(this.D),
                            (this.D = null),
                            (b = b.then(
                                oa(this, function() {
                                    return a.U();
                                })
                            )),
                            b["catch"](
                                oa(this, function(b) {
                                    return a.destroy(), Promise.reject(b);
                                })
                            ),
                            b
                                .then(
                                    oa(this, function() {
                                        return this.a
                                            ? ((this.b = a),
                                              ca(this.f, this.b, "seekrangechanged", this.qb.bind(this)),
                                              (this.l = new Ad(this, this.a, this.b)),
                                              this.l.initialize())
                                            : Ld();
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        return this.a
                                            ? (ca(this.f, this.a, "error", this.Fb.bind(this)),
                                              ca(this.f, this.a, "playing", this.ob.bind(this)),
                                              ca(this.f, this.a, "pause", this.nb.bind(this)),
                                              this.b.Ka(this, this.a))
                                            : Ld();
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        return this.a ? void Nd(this) : Ld();
                                    })
                                )
                                ["catch"](
                                    oa(this, function(a) {
                                        if (!this.a) return Ld();
                                        if ("destroy" != a.type) {
                                            var b = R(a);
                                            this.dispatchEvent(b);
                                        }
                                        return this.w().then(function() {
                                            return Promise.reject(a);
                                        });
                                    })
                                )
                        );
                    }),
                    (Jd.prototype.load = Jd.prototype.ma),
                    (Ae = Jd.prototype),
                    (Ae.jb = function() {
                        g("load"), (this.g.playbackLatency = h("load") / 1e3), this.f.sa(this.a, "timeupdate");
                    }),
                    (Ae.Fb = function() {
                        if (this.a.error) {
                            var a = this.a.error.code;
                            a != MediaError.MEDIA_ERR_ABORTED &&
                                ((a = Error(_e[a] || "Unknown playback error.")),
                                (a.type = "playback"),
                                (a = R(a)),
                                this.dispatchEvent(a));
                        }
                    }),
                    (Ae.ob = function() {
                        f("playing"),
                            !this.j &&
                                0 > this.o &&
                                ((this.a.playbackRate = 0), this.G(this.a.currentTime, Date.now(), this.o)),
                            this.i && Pd(this);
                    }),
                    (Ae.nb = function() {
                        g("playing");
                        var a = h("playing");
                        if (!isNaN(a)) {
                            var b = this.g;
                            b.playTime += a / 1e3;
                        }
                        Md(this);
                    }),
                    (Ae.qb = function(a) {
                        this.H = a.start;
                    }),
                    (Ae.ab = function() {
                        if (!this.a.paused) {
                            g("playing");
                            var a = h("playing");
                            if (!isNaN(a)) {
                                var b = this.g;
                                (b.playTime += a / 1e3), f("playing");
                            }
                        }
                        return (
                            (a = this.g),
                            (b = this.a),
                            b.getVideoPlaybackQuality &&
                                ((b = b.getVideoPlaybackQuality()),
                                (a.decodedFrames = b.totalVideoFrames),
                                (a.droppedFrames = b.droppedVideoFrames)),
                            this.g
                        );
                    }),
                    (Jd.prototype.getStats = Jd.prototype.ab),
                    (Jd.prototype.la = function() {
                        return this.b ? this.b.ja() : [];
                    }),
                    (Jd.prototype.getVideoTracks = Jd.prototype.la),
                    (Jd.prototype.ta = function() {
                        return this.b ? this.b.pa() : [];
                    }),
                    (Jd.prototype.getAudioTracks = Jd.prototype.ta),
                    (Jd.prototype.ka = function() {
                        return this.b ? this.b.Ha() : [];
                    }),
                    (Jd.prototype.getTextTracks = Jd.prototype.ka),
                    (Jd.prototype.selectVideoTrack = function(a, b) {
                        return this.b ? this.b.selectVideoTrack(a, void 0 == b ? !0 : b) : !1;
                    }),
                    (Jd.prototype.selectVideoTrack = Jd.prototype.selectVideoTrack),
                    (Jd.prototype.ya = function(a, b) {
                        return this.b ? this.b.Ya(a, void 0 == b ? !0 : b) : !1;
                    }),
                    (Jd.prototype.selectAudioTrack = Jd.prototype.ya),
                    (Jd.prototype.fb = function(a) {
                        return this.b ? this.b.Za(a, !1) : !1;
                    }),
                    (Jd.prototype.selectTextTrack = Jd.prototype.fb),
                    (Jd.prototype.T = function(a) {
                        this.b && this.b.Ga(a);
                    }),
                    (Jd.prototype.enableTextTrack = Jd.prototype.T),
                    (Jd.prototype.K = function(a) {
                        this.h({ enableAdaptation: a });
                    }),
                    (Jd.prototype.enableAdaptation = Jd.prototype.K),
                    (Jd.prototype.S = function() {
                        return this.c.enableAdaptation;
                    }),
                    (Jd.prototype.getAdaptationEnabled = Jd.prototype.S),
                    (Jd.prototype.da = function(a) {
                        this.h({ streamBufferSize: a });
                    }),
                    (Jd.prototype.setStreamBufferSize = Jd.prototype.da),
                    (Jd.prototype.X = function() {
                        return Number(this.c.streamBufferSize);
                    }),
                    (Jd.prototype.getStreamBufferSize = Jd.prototype.X),
                    (Jd.prototype.gb = function(a) {
                        this.h({ licenseRequestTimeout: a / 1e3 });
                    }),
                    (Jd.prototype.setLicenseRequestTimeout = Jd.prototype.gb),
                    (Jd.prototype.Z = function(a) {
                        this.h({ mpdRequestTimeout: a / 1e3 });
                    }),
                    (Jd.prototype.setMpdRequestTimeout = Jd.prototype.Z),
                    (Jd.prototype.M = function(a) {
                        this.h({ segmentRequestTimeout: a / 1e3 });
                    }),
                    (Jd.prototype.setRangeRequestTimeout = Jd.prototype.M),
                    (Jd.prototype.ca = function(a) {
                        this.h({ preferredLanguage: a });
                    }),
                    (Jd.prototype.setPreferredLanguage = Jd.prototype.ca),
                    (Jd.prototype.ba = function(a) {
                        Md(this),
                            a >= 0
                                ? (this.a.playbackRate = a)
                                : this.a.paused ||
                                  ((this.a.playbackRate = 0), this.G(this.a.currentTime, Date.now(), a)),
                            (this.o = a);
                    }),
                    (Jd.prototype.setPlaybackRate = Jd.prototype.ba),
                    (Jd.prototype.V = function() {
                        return this.o;
                    }),
                    (Jd.prototype.getPlaybackRate = Jd.prototype.V),
                    (Jd.prototype.O = function(a) {
                        this.h({ restrictions: a });
                    }),
                    (Jd.prototype.setRestrictions = Jd.prototype.O),
                    (Jd.prototype.W = function() {
                        return this.c.restrictions.clone();
                    }),
                    (Jd.prototype.getRestrictions = Jd.prototype.W),
                    (Jd.prototype.eb = function(a) {
                        this.D = a;
                    }),
                    (Jd.prototype.setPlaybackStartTime = Jd.prototype.eb),
                    (Jd.prototype.I = function() {
                        return this.b ? this.b.Xa() : !1;
                    }),
                    (Jd.prototype.isLive = Jd.prototype.I),
                    (Jd.prototype.h = function(a) {
                        if (a) {
                            var b = X(a, "enableAdaptation", "boolean");
                            null != b && (this.c.enableAdaptation = b),
                                (b = V(a, "streamBufferSize")),
                                null != b && (this.c.streamBufferSize = b),
                                (b = V(a, "licenseRequestTimeout")),
                                null != b && (this.c.licenseRequestTimeout = b),
                                (b = V(a, "mpdRequestTimeout")),
                                null != b && (this.c.mpdRequestTimeout = b),
                                (b = V(a, "segmentRequestTimeout")),
                                null != b && (this.c.segmentRequestTimeout = b),
                                (b = W(a, "preferredLanguage")),
                                null != b && (this.c.preferredLanguage = b),
                                (a = Y(a, "restrictions", j)),
                                null != a && (this.c.restrictions = a.clone()),
                                this.b && this.b.I(this.c);
                        }
                    }),
                    (Jd.prototype.configure = Jd.prototype.h),
                    (Jd.prototype.ua = function() {
                        return this.c;
                    }),
                    (Jd.prototype.getConfiguration = Jd.prototype.ua),
                    (Jd.prototype.G = function(b, c, d) {
                        this.j = null;
                        var e = ((Date.now() - c) / 1e3) * d;
                        this.a.currentTime < this.H + (this.I() ? 1 : 0.05)
                            ? this.a.pause()
                            : ((e = Math.max(this.H, b + e)),
                              (this.a.currentTime = e),
                              (this.j = a.setTimeout(this.G.bind(this, b, c, d), 250)));
                    }),
                    (Jd.prototype.Y = function() {
                        if ((Nd(this), !this.a.ended && !this.a.seeking)) {
                            var a = this.a.buffered,
                                b = a.length ? a.end(a.length - 1) : 0,
                                a = Math.max(b - this.a.currentTime, 0);
                            if (this.i) (b = this.b.Wa()), a > b && (Pd(this), this.a.play());
                            else {
                                var c = this.a.duration,
                                    c = isNaN(c) ? 0 : Math.max(c - 0.05, 0),
                                    b = b >= c || this.a.currentTime >= c;
                                !this.a.paused &&
                                    !b &&
                                    0.2 > a &&
                                    ((this.i = !0),
                                    this.a.pause(),
                                    this.g.bufferingHistory.push(B() / 1e3),
                                    f("buffering"),
                                    this.dispatchEvent(Q({ type: "bufferingStart" })));
                            }
                        }
                    });
                var _e = {
                    2: "A network failure occured while loading media content.",
                    3: "The browser failed to decode the media content.",
                    4: "The browser does not support the media content."
                };
                (Td.prototype.destroy = function() {
                    this.a.destroy(), (this.a = null);
                }),
                    b("shaka.media.SimpleAbrManager", $d),
                    ($d.prototype.destroy = function() {
                        this.f.destroy(), (this.a = this.b = this.f = null);
                    }),
                    ($d.prototype.initialize = function(a, b) {
                        this.b || this.a || ((this.b = a), (this.a = b));
                    }),
                    ($d.prototype.start = function() {
                        this.b &&
                            this.a &&
                            !this.g &&
                            ((this.c = Date.now() + 4e3),
                            ca(this.f, this.b, "bandwidth", this.v.bind(this)),
                            ca(this.f, this.a, "adaptation", this.j.bind(this)),
                            ca(this.f, this.a, "trackschanged", this.h.bind(this)),
                            (this.g = !0));
                    }),
                    ($d.prototype.enable = function(a) {
                        this.i = a;
                    }),
                    ($d.prototype.getInitialVideoTrackId = function() {
                        if (!this.b || !this.a) return null;
                        var a = _d(this);
                        return a ? a.id : null;
                    }),
                    ($d.prototype.selectVideoTrack = function(a, b, c) {
                        this.g && this.a.selectVideoTrack(a.id, b, c);
                    }),
                    ($d.prototype.v = function() {
                        Date.now() < this.c || this.h();
                    }),
                    ($d.prototype.h = function() {
                        if (this.i) {
                            var a = _d(this);
                            if (a) {
                                if (a.active) return void (this.c = Date.now() + 3e3);
                                this.selectVideoTrack(a, !1);
                            }
                            this.c = Number.POSITIVE_INFINITY;
                        }
                    }),
                    ($d.prototype.j = function() {
                        this.c == Number.POSITIVE_INFINITY && (this.c = Date.now() + 3e4);
                    }),
                    c(ae, fa),
                    b("shaka.player.HttpVideoSource", ae),
                    (ae.prototype.I = function() {}),
                    (ae.prototype.destroy = function() {
                        this.a && (this.a.parentElement.removeChild(this.a), (this.a = null)), (this.v = this.b = null);
                    }),
                    (Ae = ae.prototype),
                    (Ae.Ka = function(a, b) {
                        this.v = a;
                        var c = b.mediaKeys;
                        return (
                            (b.src = this.f),
                            (c = b.setMediaKeys(c)),
                            this.c &&
                                ((this.a = document.createElement("track")),
                                (this.a.src = this.c),
                                b.appendChild(this.a),
                                (this.a.track.mode = "showing")),
                            c
                        );
                    }),
                    (Ae.U = function() {
                        return Promise.resolve();
                    }),
                    (Ae.ja = function() {
                        return [];
                    }),
                    (Ae.pa = function() {
                        return [];
                    }),
                    (Ae.Ha = function() {
                        return [];
                    }),
                    (Ae.Wa = function() {
                        return 5;
                    }),
                    (Ae.Oa = function() {
                        var a = new Qc();
                        return (a.a = this.b), [a];
                    }),
                    (Ae.Ea = function() {}),
                    (ae.prototype.selectVideoTrack = function() {
                        return !1;
                    }),
                    (Ae = ae.prototype),
                    (Ae.Ya = function() {
                        return !1;
                    }),
                    (Ae.Za = function() {
                        return !1;
                    }),
                    (Ae.Ga = function(a) {
                        this.a && (this.a.track.mode = a ? "showing" : "disabled");
                    }),
                    (Ae.$a = function() {}),
                    (Ae.va = function() {
                        return [];
                    }),
                    (Ae.ea = function() {
                        return !1;
                    }),
                    (Ae.Xa = function() {
                        return !1;
                    }),
                    (Ae.Sa = function(a) {
                        for (var b in a) {
                            var c = a[b],
                                d = Le[c] || null;
                            if (d) {
                                var e = ja(b),
                                    d = Error("Key " + e + " is not usable. " + d);
                                (d.type = "drm"), (d.code = c), (c = R(d)), this.dispatchEvent(c);
                            }
                        }
                    }),
                    c(be, fa),
                    b("shaka.player.StreamVideoSource", be),
                    (be.prototype.I = function(a) {
                        null != a.streamBufferSize && (this.S.streamBufferSize = a.streamBufferSize),
                            null != a.segmentRequestTimeout && (this.S.segmentRequestTimeout = a.segmentRequestTimeout),
                            ue(this),
                            null != a.enableAdaptation && this.G.enable(Boolean(a.enableAdaptation)),
                            null != a.mpdRequestTimeout && (this.ba = Number(a.mpdRequestTimeout)),
                            null != a.preferredLanguage && (this.H = T(String(a.preferredLanguage))),
                            null != a.restrictions && ((this.h = a.restrictions), this.D && de(this));
                    }),
                    (be.prototype.destroy = function() {
                        this.w.destroy(),
                            this.ca.destroy(),
                            (this.ca = this.w = null),
                            this.W && (a.clearTimeout(this.W), (this.W = null)),
                            this.Z && (a.clearTimeout(this.Z), (this.Z = null)),
                            (this.o = null),
                            this.i.destroy(),
                            (this.i = null),
                            U(this.c).forEach(function(a) {
                                a.destroy();
                            }),
                            (this.b = this.c = null),
                            this.a && (this.a.destroy(), (this.a = null)),
                            this.G.destroy(),
                            (this.v = this.h = this.K = this.f = this.g = this.X = this.G = null);
                    }),
                    (Ae = be.prototype),
                    (Ae.Ka = function(b, c) {
                        if (!this.D) {
                            var d = Error("Cannot call attach() right now.");
                            return (d.type = "app"), Promise.reject(d);
                        }
                        return (
                            (this.v = b),
                            (this.f = c),
                            (this.K = b.ab()),
                            ca(this.i, this.g, "sourceopen", this.mb.bind(this)),
                            ca(this.i, this.X, "bandwidth", this.Gb.bind(this)),
                            (d = this.f.mediaKeys),
                            (this.f.src = a.URL.createObjectURL(this.g)),
                            (d = this.f.setMediaKeys(d)),
                            Promise.all([this.w, d])
                        );
                    }),
                    (Ae.U = function() {
                        if (this.D) {
                            var a = Error("Cannot call load() right now.");
                            return (a.type = "app"), Promise.reject(a);
                        }
                        return this.a && 0 != this.a.a.length
                            ? ((a = this.a.a),
                              Qd(a),
                              Rd(a),
                              0 == this.a.a.length || 0 == this.a.a[0].a.length
                                  ? ((a = Error(
                                        "The manifest specifies content that cannot be displayed on this browser/platform."
                                    )),
                                    (a.type = "stream"),
                                    Promise.reject(a))
                                  : ((this.D = !0),
                                    (this.S.initialStreamBufferSize = this.a.c),
                                    ue(this),
                                    de(this),
                                    Promise.resolve()))
                            : ((a = Error("The manifest does not specify any content.")),
                              (a.type = "stream"),
                              Promise.reject(a));
                    }),
                    (Ae.vb = function() {
                        var a = Date.now(),
                            b = (this.Z = null);
                        this.Ta(this.a.g)
                            .then(
                                oa(this, function(a) {
                                    return (b = new Td(a)), Ud(b, this.a);
                                })
                            )
                            .then(
                                oa(this, function(c) {
                                    b.destroy(), (b = null);
                                    for (var d = 0; d < c.length; ++d) ce(this, c[d]);
                                    (this.S.initialStreamBufferSize = this.a.c),
                                        ue(this),
                                        de(this),
                                        0 == Object.keys(this.c).length ? he(this) : se(this, (Date.now() - a) / 1e3);
                                })
                            )
                            ["catch"](
                                oa(this, function(a) {
                                    b && (b.destroy(), (b = null)),
                                        "aborted" != a.type &&
                                            ((a = R(a)), this.dispatchEvent(a), this.a && se(this, 0));
                                })
                            );
                    }),
                    (Ae.Ta = function() {
                        return Promise.reject("Cannot update manifest with this VideoSource implementation.");
                    }),
                    (Ae.ja = function() {
                        if (!this.b.a.hasOwnProperty("video")) return [];
                        for (
                            var a = this.c.video,
                                a = (a = a ? a.oa() : null) ? a.A : 0,
                                b = [],
                                c = this.b.get("video"),
                                d = 0;
                            d < c.length;
                            ++d
                        )
                            for (var e = c[d], f = 0; f < e.m.length; ++f) {
                                var g = e.m[f];
                                if (g.L && g.J) {
                                    var h = g.A,
                                        g = new o(h, g.bandwidth, g.width, g.height);
                                    h == a && (g.active = !0), b.push(g);
                                }
                            }
                        return b;
                    }),
                    (be.prototype.getVideoTracks = be.prototype.ja),
                    (be.prototype.pa = function() {
                        if (!this.b.a.hasOwnProperty("audio")) return [];
                        for (
                            var a = this.c.audio,
                                a = (a = a ? a.oa() : null) ? a.A : 0,
                                b = [],
                                c = this.b.get("audio"),
                                d = 0;
                            d < c.length;
                            ++d
                        )
                            for (var e = c[d], f = e.lang, g = 0; g < e.m.length; ++g) {
                                var h = e.m[g];
                                if (h.L && h.J) {
                                    var j = h.A,
                                        h = new i(j, h.bandwidth, f);
                                    j == a && (h.active = !0), b.push(h);
                                }
                            }
                        return b;
                    }),
                    (be.prototype.getAudioTracks = be.prototype.pa),
                    (be.prototype.Ha = function() {
                        if (!this.b.a.hasOwnProperty("text")) return [];
                        for (
                            var a = this.c.text,
                                b = a ? a.oa() : null,
                                b = b ? b.A : 0,
                                c = [],
                                d = this.b.get("text"),
                                e = 0;
                            e < d.length;
                            ++e
                        )
                            for (var f = d[e], g = f.lang, h = 0; h < f.m.length; ++h) {
                                var i = f.m[h].A,
                                    j = new n(i, g);
                                i == b && ((j.active = !0), (j.enabled = a.Aa())), c.push(j);
                            }
                        return c;
                    }),
                    (be.prototype.getTextTracks = be.prototype.Ha),
                    (be.prototype.Wa = function() {
                        var a,
                            b = null;
                        for (a in this.c) {
                            var c = this.c[a].Fa();
                            c > 0 && (b = null != b ? Math.min(b, c) : c);
                        }
                        return b || 0;
                    }),
                    (be.prototype.Oa = function() {
                        var a;
                        if (this.D) {
                            a = this.a.a[0];
                            for (var b = [], c = 0; c < a.a.length; ++c) b.push.apply(b, Nc(a.a[c]));
                            a = b;
                        } else a = [];
                        return a;
                    }),
                    (be.prototype.Ea = function(a) {
                        if (this.D) {
                            for (var b = {}, c = this.a.a[0], d = 0; d < c.a.length; ++d) {
                                var e = c.a[d];
                                b[e.A] = e;
                            }
                            for (this.b.a = {}, c = aa(a), d = 0; d < c.length; ++d) {
                                var e = c[d],
                                    f = a.get(e);
                                if ("video" == e) {
                                    var g = f[0].id;
                                    this.b.push(e, b[g]);
                                } else if ("audio" == e)
                                    for (var g = f[0].b.split(";")[0], h = 0; h < f.length; ++h) {
                                        var i = f[h];
                                        i.b.split(";")[0] == g && this.b.push(e, b[i.id]);
                                    }
                                else for (h = 0; h < f.length; ++h) (g = f[h].id), this.b.push(e, b[g]);
                            }
                            (this.da = !0),
                                (a = this.b.get("audio")) &&
                                    (ge(this, a),
                                    (this.b.a.audio = a),
                                    (a = a[0].lang || this.H),
                                    S(2, this.H, a) && (this.da = !1)),
                                (a = this.b.get("text")) &&
                                    (ge(this, a),
                                    (this.b.a.text = a),
                                    (a = a[0].lang || this.H),
                                    S(2, this.H, a) || (this.da = !1));
                        }
                    }),
                    (be.prototype.selectVideoTrack = function(a, b, c) {
                        return fe(this, "video", a, b, c);
                    }),
                    (Ae = be.prototype),
                    (Ae.Ya = function(a, b) {
                        return fe(this, "audio", a, b);
                    }),
                    (Ae.Za = function(a, b) {
                        return fe(this, "text", a, b);
                    }),
                    (Ae.Ga = function(a) {
                        var b = this.c.text;
                        b && b.wa(a);
                    }),
                    (Ae.$a = function(a) {
                        this.Y = a;
                    }),
                    (Ae.va = function() {
                        return [];
                    }),
                    (Ae.ea = function() {
                        return !1;
                    }),
                    (Ae.Xa = function() {
                        return this.a ? this.a.b : !1;
                    }),
                    (Ae.Sa = function(a) {
                        for (var b, c = !1, d = new Z(), e = $(this.b), f = 0; f < e.length; ++f)
                            for (var g = e[f], h = 0; h < g.m.length; ++h) {
                                var i = g.m[h];
                                i.f.forEach(function(a) {
                                    d.push(a, i);
                                });
                            }
                        for (b in a)
                            if (((e = Le[a[b]] || null), (g = d.get(b))))
                                for (f = 0; f < g.length; ++f) (i = g[f]), (h = i.L), (i.L = !e), h != i.L && (c = !0);
                            else ja(b);
                        c &&
                            (ee(this),
                            (b = this.pa()),
                            (a = this.ja()),
                            (b = this.b.a.hasOwnProperty("audio") && 0 == b.length),
                            (a = this.b.a.hasOwnProperty("video") && 0 == a.length),
                            b || a) &&
                            ((a = Error(
                                "The key system has restricted all " +
                                    (b && a ? "audio and video tracks." : b ? "audio tracks." : "video tracks.")
                            )),
                            (a.type = "drm"),
                            (a = R(a)),
                            this.dispatchEvent(a));
                    }),
                    (Ae.mb = function() {
                        this.i.sa(this.g, "sourceopen"),
                            he(this)
                                .then(
                                    oa(this, function() {
                                        this.w && this.w.resolve();
                                    })
                                )
                                ["catch"](
                                    oa(this, function(a) {
                                        this.w && this.w.reject(a);
                                    })
                                );
                    }),
                    (Ae.ib = function(a) {
                        d(a && a.length == Object.keys(this.c).length);
                        for (var b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, e = 0; e < a.length; ++e)
                            var f = a[e], b = Math.min(b, f), c = Math.max(c, f);
                        for (a = qe(this), e = 0; e < a.length; ++e) a[e].ha(c);
                        me(this, a, c),
                            (e = $(this.b)
                                .map(function(a) {
                                    return a.m;
                                })
                                .reduce(function(a, b) {
                                    return a.concat(b);
                                }, [])
                                .map(function(a) {
                                    var b = [a.F.create()];
                                    return a.C && b.push(a.C.create()), Promise.all(b);
                                })),
                            Promise.all(e)
                                .then(
                                    oa(this, function(a) {
                                        for (var b = 0; b < a.length; ++b) a[b][0].ha(c);
                                        this.ta = !0;
                                        for (var d in this.o)
                                            (a = this.o[d]), (b = this.c[d]), od(this.K, a.Ia), b.ra(a.Ia, a.La, a.Ma);
                                        this.o = {};
                                    })
                                )
                                ["catch"](
                                    oa(this, function(a) {
                                        "aborted" != a.type && ((a = R(a)), this.dispatchEvent(a));
                                    })
                                );
                    }),
                    (Ae.wb = function() {
                        (this.W = null), te(this);
                        var a = re(this, qe(this));
                        a && (oe(this, a.start, a.end), this.f.paused || pe(this, this.f.currentTime, a.start, a.end));
                    }),
                    (Ae.rb = function() {
                        var a = this.f.currentTime;
                        if (null != this.B) {
                            if (a >= this.B - 0.01 && a <= this.B + 0.01) return void (this.B = null);
                            this.B = null;
                        }
                        var b = re(this, qe(this));
                        if (b) {
                            var c = b.end;
                            if (
                                ((b = pe(this, a, b.start, c)) ||
                                    (c + 0.01 >= a ? (b = !1) : ((this.f.currentTime = c), (b = !0))),
                                !b)
                            )
                                for (var d in this.c) this.c[d].Va();
                        }
                    }),
                    (Ae.tb = function() {
                        if (!this.a.b) {
                            for (var a in this.c) if (!this.c[a].Qa()) return;
                            this.g.endOfStream();
                        }
                    }),
                    (Ae.Gb = function() {
                        var a = this.K,
                            b = this.X.getBandwidth();
                        (a.estimatedBandwidth = b), a.bandwidthHistory.push(new qd(b));
                    }),
                    c(ve, be),
                    b("shaka.player.DashVideoSource", ve),
                    (ve.prototype.la = function(a, b, c) {
                        this.l.push(a), this.O.push(b || ""), this.T.push(c || "");
                    }),
                    (ve.prototype.addExternalCaptions = ve.prototype.la),
                    (ve.prototype.ma = function(a) {
                        this.j = a;
                    }),
                    (ve.prototype.setNetworkCallback = ve.prototype.ma),
                    (ve.prototype.destroy = function() {
                        (this.j = this.M = null), be.prototype.destroy.call(this);
                    }),
                    (ve.prototype.U = function() {
                        var a = new gc(this.j, [new hb(this.ka)]);
                        return lc(new kc(a, this.ba)).then(
                            oa(this, function(a) {
                                for (var b = 0; b < this.l.length; b++) {
                                    var c = a,
                                        d = this.l[b],
                                        e = this.O[b],
                                        f = this.T[b];
                                    if (0 !== c.a.length) {
                                        var g = new sb();
                                        (g.contentType = "text"),
                                            (g.lang = e || "en"),
                                            (g.c = !0),
                                            (e = new vb()),
                                            (e.bandwidth = 0),
                                            (e.f = f || "text/vtt"),
                                            (e.s = [new hb(d)]),
                                            g.a.push(e),
                                            c.a[0].b.push(g),
                                            Jb(c.a[0]);
                                    }
                                }
                                return (this.a = cd(new bd(this.M), a, this.j)), be.prototype.U.call(this);
                            })
                        );
                    }),
                    (ve.prototype.Ta = function(a) {
                        return lc(new kc(a, this.ba)).then(
                            oa(this, function(a) {
                                return (a = cd(new bd(this.M), a, this.j)), Promise.resolve(a);
                            })
                        );
                    }),
                    c(we, be),
                    b("shaka.player.OfflineVideoSource", we),
                    (we.prototype.I = function(a) {
                        null != a.licenseRequestTimeout && (this.l.licenseRequestTimeout = a.licenseRequestTimeout),
                            null != a.segmentRequestTimeout && (this.l.segmentRequestTimeout = a.segmentRequestTimeout),
                            be.prototype.I.call(this, a);
                    }),
                    b("shaka.player.OfflineVideoSource.retrieveGroupIds", function() {
                        var a = new Ha(),
                            b = za(a).then(function() {
                                return Ia(a);
                            });
                        return (
                            b
                                .then(function() {
                                    Aa(a);
                                })
                                ["catch"](function() {
                                    Aa(a);
                                }),
                            b
                        );
                    }),
                    (we.prototype.ya = function(b, c, d, e) {
                        var f,
                            g = null,
                            h = {},
                            i = [];
                        return (
                            (b = new gc(this.O, [new hb(b)])),
                            lc(new kc(b, this.ba))
                                .then(
                                    oa(this, function(a) {
                                        return (
                                            (this.a = cd(new bd(d), a, this.O)),
                                            this.a.b
                                                ? ((a = Error("Unable to store live streams offline.")),
                                                  (a.type = "app"),
                                                  Promise.reject(a))
                                                : (this.I({ preferredLanguage: c }), be.prototype.U.call(this))
                                        );
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        var b = document.createElement("video");
                                        return (
                                            (b.src = a.URL.createObjectURL(this.g)),
                                            (f = new Ad(null, b, this)),
                                            null != this.l.licenseRequestTimeout &&
                                                (f.w = Number(this.l.licenseRequestTimeout)),
                                            ca(this.i, f, "sessionReady", this.ka.bind(this)),
                                            ca(this.i, f, "error", function(a) {
                                                g = a;
                                            }),
                                            f.initialize()
                                        );
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        for (var a = $(this.b), b = 0; b < a.length; ++b)
                                            for (var c = a[b], d = 0; d < c.m.length; ++d) {
                                                var f = c.m[d];
                                                h[f.A] = f;
                                            }
                                        return e();
                                    })
                                )
                                .then(
                                    oa(this, function(a) {
                                        for (var b = 0; b < a.length; ++b) {
                                            var c = a[b],
                                                d = h[c];
                                            if (!d) return Promise.reject(Error("Invalid stream ID chosen: " + c));
                                            i.push(d);
                                        }
                                        var e = ["audio", "video"];
                                        return (
                                            (i = i.filter(function(a) {
                                                return 0 > e.indexOf(a.a.split("/")[0]) ? !1 : !0;
                                            })),
                                            (a = i.map(function(a) {
                                                return a.C.create();
                                            })),
                                            Promise.all(a)
                                        );
                                    })
                                )
                                .then(
                                    oa(this, function(a) {
                                        for (var b = i, c = [], d = 0; d < b.length; ++d)
                                            try {
                                                c[d] = this.g.addSourceBuffer(Lc(b[d]));
                                            } catch (e) {}
                                        if (b.length != c.length)
                                            (a = Error("Error initializing streams.")),
                                                (a.type = "storage"),
                                                (a = Promise.reject(a));
                                        else {
                                            for (d = 0; d < a.length; ++d) (b = a[d]) && c[d].appendBuffer(b);
                                            a = Promise.resolve();
                                        }
                                        return a;
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        return Bd(f, this.timeoutMs);
                                    })
                                )
                                .then(
                                    oa(this, function() {
                                        return g ? Promise.reject(g) : xe(this, i, f.a, this.a.a[0].b);
                                    })
                                )
                                .then(
                                    oa(this, function(a) {
                                        return (this.T = a), g ? (ye(this), Promise.reject(g)) : Promise.resolve(a);
                                    })
                                )
                        );
                    }),
                    b("shaka.player.OfflineVideoSource.prototype.store", we.prototype.ya),
                    (we.prototype.ma = function(a) {
                        this.O = a;
                    }),
                    (we.prototype.setNetworkCallback = we.prototype.ma),
                    (we.prototype.ka = function(a) {
                        this.M.push(a.detail.sessionId);
                    }),
                    (we.prototype.U = function() {
                        var a,
                            b,
                            c = new Ha();
                        return za(c)
                            .then(
                                oa(this, function() {
                                    return Ja(c, this.T);
                                })
                            )
                            .then(
                                oa(this, function(d) {
                                    var e = [];
                                    (this.M = d.session_ids),
                                        (a = d.duration),
                                        (b = {
                                            keySystem: d.key_system,
                                            distinctiveIdentifierRequired: d.distinctive_identifier,
                                            persistentStorageRequired: !0,
                                            audioRobustness: d.audio_robustness,
                                            videoRobustness: d.video_robustness,
                                            withCredentials: d.with_credentials,
                                            licenseServerUrl: d.license_server
                                        });
                                    for (var f = 0; f < d.stream_ids.length; ++f) e.push(Ka(c, d.stream_ids[f]));
                                    return Promise.all(e);
                                })
                            )
                            .then(
                                oa(this, function(c) {
                                    var d = a,
                                        e = b,
                                        f = new Pc();
                                    f.c = 5;
                                    for (var g = new Oc(), h = 0; h < c.length; ++h) {
                                        var i = c[h],
                                            j = new Kc(),
                                            k = new Jc(i.references),
                                            l = new Uint8Array(i.init_segment),
                                            l = new hb("data:application/octet-stream;base64," + Oa(l)),
                                            l = new qc(new gc(this.O, [l], 0, null));
                                        (j.F = k),
                                            (j.C = l),
                                            (j.a = i.mime_type),
                                            (j.b = i.codecs),
                                            (j.L = !0),
                                            this.j &&
                                                (null != this.j.licenseServerUrl &&
                                                    (e.licenseServerUrl = this.j.licenseServerUrl),
                                                null != this.j.withCredentials &&
                                                    (e.withCredentials = this.j.withCredentials),
                                                (e.licensePostProcessor = this.j.licensePostProcessor),
                                                (e.licensePreProcessor = this.j.licensePreProcessor),
                                                (e.serverCertificate = this.j.serverCertificate)),
                                            (i = Ta(e)),
                                            (k = new Mc()),
                                            k.m.push(j),
                                            k.a.push(i),
                                            (k.contentType = j.a.split("/")[0]),
                                            g.a.push(k),
                                            (g.b = d);
                                    }
                                    return f.a.push(g), (this.a = f), be.prototype.U.call(this);
                                })
                            )
                            .then(function() {
                                return Aa(c), Promise.resolve();
                            })
                            ["catch"](function(a) {
                                return Aa(c), Promise.reject(a);
                            });
                    }),
                    (we.prototype.la = function(a, b) {
                        a &&
                            (this.j = {
                                licenseServerUrl: a.licenseServerUrl,
                                withCredentials: a.withCredentials,
                                serverCertificate: a.serverCertificate,
                                licensePreProcessor: a.licensePreProcessor,
                                licensePostProcessor: a.licensePostProcessor
                            });
                        var c = null;
                        return ze(this)
                            ["catch"](function(a) {
                                return b ? ((c = a), Promise.resolve()) : Promise.reject(a);
                            })
                            .then(
                                oa(this, function() {
                                    return ye(this);
                                })
                            )
                            .then(function() {
                                return Promise.resolve(c);
                            });
                    }),
                    (we.prototype.deleteGroup = we.prototype.la),
                    (we.prototype.va = function() {
                        return this.M;
                    }),
                    (we.prototype.ea = function() {
                        return !0;
                    });
            }.bind(e, this)(),
                "undefined" != typeof a && a.exports
                    ? (a.exports = e.shaka)
                    : ((d = function() {
                          return e.shaka;
                      }.call(b, c, b, a)),
                      !(void 0 !== d && (a.exports = d))));
        })();
    }
});
