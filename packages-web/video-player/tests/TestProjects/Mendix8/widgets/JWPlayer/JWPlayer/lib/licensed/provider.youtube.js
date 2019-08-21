webpackJsonpjwplayer([3], {
    106: function(a, b, c) {
        var d, e;
        (d = [c(47), c(55), c(73), c(44), c(45), c(61), c(101), c(86), c(46)]),
            (e = function(a, b, c, d, e, f, g, h, i) {
                function j(j, m) {
                    function n() {
                        window.YT && window.YT.loaded ? ((I = window.YT), q()) : setTimeout(n, 100);
                    }
                    function o() {
                        k && (k.off(), (k = null));
                    }
                    function p() {
                        var a = K && K.parentNode;
                        return a ? a : (M || (window.jwplayer(j).onReady(q), (M = !0)), !1);
                    }
                    function q() {
                        I && p() && N && N.apply(H);
                    }
                    function r() {
                        if (J && J.getPlayerState) {
                            var a = J.getPlayerState();
                            null !== a && void 0 !== a && a !== Q && A({ data: a });
                            var b = I.PlayerState;
                            a === b.PLAYING ? t() : a === b.BUFFERING && u();
                        }
                    }
                    function s(a) {
                        return Math.round(10 * a) / 10;
                    }
                    function t() {
                        u(),
                            H.trigger(e.JWPLAYER_MEDIA_TIME, {
                                position: s(J.getCurrentTime()),
                                duration: J.getDuration()
                            });
                    }
                    function u() {
                        var a = 0;
                        J && J.getVideoLoadedFraction && (a = Math.round(100 * J.getVideoLoadedFraction())),
                            L !== a && ((L = a), H.trigger(e.JWPLAYER_MEDIA_BUFFER, { bufferPercent: a }));
                    }
                    function v() {
                        H.state !== f.IDLE &&
                            H.state !== f.COMPLETE &&
                            ((R = !0),
                            H.trigger(e.JWPLAYER_MEDIA_BEFORECOMPLETE),
                            H.setState(f.COMPLETE),
                            (R = !1),
                            H.trigger(e.JWPLAYER_MEDIA_COMPLETE));
                    }
                    function w() {
                        H.trigger(e.JWPLAYER_MEDIA_META, {
                            duration: J.getDuration(),
                            width: K.clientWidth,
                            height: K.clientHeight
                        });
                    }
                    function x() {
                        var a = arguments,
                            b = a.length - 1;
                        return function() {
                            for (var c = b, d = a[b].apply(this, arguments); c--; ) d = a[c].call(this, d);
                            return d;
                        };
                    }
                    function y(a, b) {
                        if (!a) throw "invalid Youtube ID";
                        var c = K.parentNode;
                        if (c) {
                            var e = {
                                height: "100%",
                                width: "100%",
                                videoId: a,
                                playerVars: d.extend(
                                    {
                                        html5: 1,
                                        autoplay: 0,
                                        controls: 0,
                                        showinfo: 0,
                                        rel: 0,
                                        modestbranding: 0,
                                        playsinline: 1,
                                        origin: location.protocol + "//" + location.hostname
                                    },
                                    b
                                ),
                                events: { onReady: z, onStateChange: A, onPlaybackQualityChange: B, onError: C }
                            };
                            H.setVisibility(!0), (J = new I.Player(K, e)), (K = J.getIframe()), (N = null);
                        }
                    }
                    function z() {
                        O && (O.apply(H), (O = null));
                    }
                    function A(b) {
                        var c = I.PlayerState;
                        switch ((Q = b.data)) {
                            case c.UNSTARTED:
                                return void (a.isAndroid() && J.playVideo());
                            case c.ENDED:
                                return void v();
                            case c.PLAYING:
                                return (
                                    d.isFunction(J.unloadModule) && J.unloadModule("captions"),
                                    (S = !1),
                                    w(),
                                    H.trigger(e.JWPLAYER_MEDIA_LEVELS, {
                                        levels: H.getQualityLevels(),
                                        currentQuality: H.getCurrentQuality()
                                    }),
                                    void H.setState(f.PLAYING)
                                );
                            case c.PAUSED:
                                return void H.setState(f.PAUSED);
                            case c.BUFFERING:
                                return void (H.seeking ? H.setState(f.LOADING) : H.setState(f.STALLED));
                            case c.CUED:
                                return H.setState(f.IDLE), void (a.isAndroid() && J.playVideo());
                        }
                    }
                    function B() {
                        Q !== I.PlayerState.ENDED && H.play(),
                            H.trigger(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                                currentQuality: H.getCurrentQuality(),
                                levels: H.getQualityLevels()
                            });
                    }
                    function C() {
                        H.trigger(e.JWPLAYER_MEDIA_ERROR, {
                            message: "Error loading YouTube: Video could not be played"
                        });
                    }
                    function D() {
                        l && H.setVisibility(!0);
                    }
                    function E() {
                        clearInterval(P),
                            J &&
                                J.stopVideo &&
                                a.tryCatch(function() {
                                    J.stopVideo(), J.clearVideo();
                                });
                    }
                    function F(b) {
                        O = null;
                        var c = b.sources[0].file,
                            d = a.youTubeID(c);
                        if ((H.volume(m.volume), H.mute(m.mute), H.setVisibility(!0), !I || !J))
                            return (
                                (N = function() {
                                    y(d);
                                }),
                                void n()
                            );
                        if (!J.getPlayerState) {
                            var e = function() {
                                H.load(b);
                            };
                            return void (O = O ? x(e, O) : e);
                        }
                        var f = J.getVideoData().video_id;
                        if (f !== d) {
                            S ? (E(), J.cueVideoById(d)) : J.loadVideoById(d);
                            var g = J.getPlayerState(),
                                h = I.PlayerState;
                            (g === h.UNSTARTED || g === h.CUED) && D();
                        } else J.getCurrentTime() > 0 && J.seekTo(0), w();
                    }
                    (this.state = f.IDLE), d.extend(this, i);
                    var G,
                        H = this,
                        I = window.YT,
                        J = null,
                        K = document.createElement("div"),
                        L = -1,
                        M = !1,
                        N = null,
                        O = null,
                        P = -1,
                        Q = -1,
                        R = !1,
                        S = l;
                    (this.setState = function(a) {
                        clearInterval(P),
                            a !== f.IDLE &&
                                a !== f.COMPLETE &&
                                ((P = setInterval(r, 250)),
                                a === f.PLAYING ? (this.seeking = !1) : (a === f.LOADING || a === f.STALLED) && u()),
                            h.setState.apply(this, arguments);
                    }),
                        !I &&
                            k &&
                            k.getStatus() === g.loaderstatus.NEW &&
                            (k.on(e.COMPLETE, n), k.on(e.ERROR, o), k.load()),
                        (K.id = j + "_youtube"),
                        (this.init = function(a) {
                            F(a);
                        }),
                        (this.destroy = function() {
                            this.remove(), this.off(), (G = K = I = H = null);
                        }),
                        (this.load = function(a) {
                            this.setState(f.LOADING), F(a), H.play();
                        }),
                        (this.stop = function() {
                            E(), this.setState(f.IDLE);
                        }),
                        (this.play = function() {
                            S || (J && J.playVideo ? J.playVideo() : (O = O ? x(this.play, O) : this.play));
                        }),
                        (this.pause = function() {
                            S || (J.pauseVideo && J.pauseVideo());
                        }),
                        (this.seek = function(a) {
                            S || (J.seekTo && ((this.seeking = !0), J.seekTo(a)));
                        }),
                        (this.volume = function(a) {
                            if (d.isNumber(a)) {
                                var b = Math.min(Math.max(0, a), 100);
                                J && J.getVolume && J.setVolume(b);
                            }
                        }),
                        (this.mute = function(b) {
                            var c = a.exists(b) ? !!b : !m.mute;
                            J && J.mute && (c ? J.mute() : J.unMute());
                        }),
                        (this.detachMedia = function() {
                            return null;
                        }),
                        (this.attachMedia = function() {
                            R && (this.setState(f.COMPLETE), this.trigger(e.JWPLAYER_MEDIA_COMPLETE), (R = !1));
                        }),
                        (this.setContainer = function(a) {
                            (G = a), a.appendChild(K), this.setVisibility(!0);
                        }),
                        (this.getContainer = function() {
                            return G;
                        }),
                        (this.remove = function() {
                            E(), K && G && G === K.parentNode && G.removeChild(K), (N = O = J = null);
                        }),
                        (this.setVisibility = function(a) {
                            (a = !!a),
                                a
                                    ? (b.style(K, { display: "block" }),
                                      b.style(G, { visibility: "visible", opacity: 1 }))
                                    : l || b.style(G, { opacity: 0 });
                        }),
                        (this.resize = function(a, b, d) {
                            return c.stretch(d, K, a, b, K.clientWidth, K.clientHeight);
                        }),
                        (this.checkComplete = function() {
                            return R;
                        }),
                        (this.getCurrentQuality = function() {
                            if (!J) return -1;
                            if (J.getAvailableQualityLevels) {
                                var a = J.getPlaybackQuality(),
                                    b = J.getAvailableQualityLevels();
                                return b.indexOf(a);
                            }
                            return -1;
                        }),
                        (this.getQualityLevels = function() {
                            if (J) {
                                if (!d.isFunction(J.getAvailableQualityLevels)) return [];
                                var a = J.getAvailableQualityLevels();
                                if (2 === a.length && d.contains(a, "auto")) return { label: d.without(a, "auto") };
                                var b = d.map(a, function(a) {
                                    return { label: a };
                                });
                                return b.reverse();
                            }
                        }),
                        (this.setCurrentQuality = function(a) {
                            if (J && J.getAvailableQualityLevels) {
                                var b = J.getAvailableQualityLevels();
                                if (b.length) {
                                    var c = b[b.length - a - 1];
                                    J.setPlaybackQuality(c);
                                }
                            }
                        }),
                        (this.getName = function() {
                            return { name: "youtube" };
                        });
                }
                var k = new g(window.location.protocol + "//www.youtube.com/iframe_api"),
                    l = a.isMobile();
                return (
                    (j.getName = function() {
                        return { name: "youtube" };
                    }),
                    {
                        register: function(a) {
                            a.api.registerProvider(j);
                        }
                    }
                );
            }.apply(b, d)),
            !(void 0 !== e && (a.exports = e));
    }
});
