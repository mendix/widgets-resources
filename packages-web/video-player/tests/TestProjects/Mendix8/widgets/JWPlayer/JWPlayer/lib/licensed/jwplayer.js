!(function(a, b) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = b())
        : "function" == typeof define && define.amd
        ? define(b)
        : "object" == typeof exports
        ? (exports.jwplayer = b())
        : (a.jwplayer = b());
})(this, function() {
    return (function(a) {
        function b(c) {
            if (d[c]) return d[c].exports;
            var e = (d[c] = {
                exports: {},
                id: c,
                loaded: !1
            });
            return a[c].call(e.exports, e, e.exports, b), (e.loaded = !0), e.exports;
        }
        var c = window.webpackJsonpjwplayer;
        window.webpackJsonpjwplayer = function(d, f) {
            for (var g, h, i = 0, j = []; i < d.length; i++) (h = d[i]), e[h] && j.push.apply(j, e[h]), (e[h] = 0);
            for (g in f) a[g] = f[g];
            for (c && c(d, f); j.length; ) j.shift().call(null, b);
        };
        var d = {},
            e = {
                0: 0
            };
        return (
            (b.e = function(a, c) {
                if (0 === e[a]) return c.call(null, b);
                if (void 0 !== e[a]) e[a].push(c);
                else {
                    e[a] = [c];
                    var d = document.getElementsByTagName("head")[0],
                        f = document.createElement("script");
                    (f.type = "text/javascript"),
                        (f.charset = "utf-8"),
                        (f.async = !0),
                        (f.src =
                            b.p +
                            "" +
                            ({
                                1: "polyfills.promise",
                                2: "polyfills.base64",
                                3: "provider.youtube",
                                4: "provider.dashjs",
                                5: "provider.shaka",
                                6: "provider.cast"
                            }[a] || a) +
                            ".js"),
                        d.appendChild(f);
                }
            }),
            (b.m = a),
            (b.c = d),
            (b.p = ""),
            b(0)
        );
    })([
        function(a, b, c) {
            a.exports = c(39);
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        function(a, b, c) {
            var d, e;
            (d = [c(40), c(173), c(44)]),
                (e = function(a, b, c) {
                    return window.jwplayer ? window.jwplayer : c.extend(a, b);
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(41), c(47), c(167)]),
                (e = function(a, b) {
                    return (c.p = b.loadFrom()), a.selectPlayer;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(42), c(98), c(44)]),
                (e = function(a, b, c) {
                    var d = a.selectPlayer,
                        e = function() {
                            var a = d.apply(this, arguments);
                            return a
                                ? a
                                : {
                                      registerPlugin: function(a, c, d) {
                                          "jwpsrv" !== a && b.registerPlugin(a, c, d);
                                      }
                                  };
                        };
                    return c.extend(a, {
                        selectPlayer: e
                    });
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(43), c(44), c(86), c(84), c(80), c(98)]),
                (e = function(a, b, c, d, e, f) {
                    function g(a) {
                        var f = a.getName().name;
                        if (
                            !b.find(
                                e,
                                b.matches({
                                    name: f
                                })
                            )
                        ) {
                            if (!b.isFunction(a.supports))
                                throw {
                                    message: "Tried to register a provider with an invalid object"
                                };
                            e.unshift({
                                name: f,
                                supports: a.supports
                            });
                        }
                        var g = function() {};
                        (g.prototype = c), (a.prototype = new g()), (d[f] = a);
                    }
                    var h = [],
                        i = 0,
                        j = function(b) {
                            var c, d;
                            return (
                                b
                                    ? "string" == typeof b
                                        ? ((c = k(b)), c || (d = document.getElementById(b)))
                                        : "number" == typeof b
                                        ? (c = h[b])
                                        : b.nodeType && ((d = b), (c = k(d.id)))
                                    : (c = h[0]),
                                c
                                    ? c
                                    : d
                                    ? l(new a(d, m))
                                    : {
                                          registerPlugin: f.registerPlugin
                                      }
                            );
                        },
                        k = function(a) {
                            for (var b = 0; b < h.length; b++) if (h[b].id === a) return h[b];
                            return null;
                        },
                        l = function(a) {
                            return i++, (a.uniqueId = i), h.push(a), a;
                        },
                        m = function(a) {
                            for (var b = h.length; b--; )
                                if (h[b].uniqueId === a.uniqueId) {
                                    h.splice(b, 1);
                                    break;
                                }
                        },
                        n = {
                            selectPlayer: j,
                            registerProvider: g,
                            availableProviders: e,
                            registerPlugin: f.registerPlugin
                        };
                    return (j.api = n), n;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(45), c(61), c(46), c(47), c(60), c(50), c(44), c(62), c(164), c(165), c(166), c(59)]),
                (e = function(a, b, c, d, e, f, g, h, i, j, k, l) {
                    function m(a) {
                        d.addClass(a, "jw-tab-focus");
                    }

                    function n(a) {
                        d.removeClass(a, "jw-tab-focus");
                    }
                    var o = function(f, o) {
                        var p,
                            q = this,
                            r = !1,
                            s = {};
                        g.extend(this, c),
                            (this.utils = d),
                            (this._ = g),
                            (this.Events = c),
                            (this.version = l),
                            (this.trigger = function(a, b) {
                                return (
                                    (b = g.isObject(b) ? g.extend({}, b) : {}),
                                    (b.type = a),
                                    window.jwplayer && window.jwplayer.debug
                                        ? c.trigger.call(q, a, b)
                                        : c.triggerSafe.call(q, a, b)
                                );
                            }),
                            (this.dispatchEvent = this.trigger),
                            (this.removeEventListener = this.off.bind(this));
                        var t = function() {
                            (p = new h(f)),
                                i(q, p),
                                j(q, p),
                                p.on(a.JWPLAYER_PLAYLIST_ITEM, function() {
                                    s = {};
                                }),
                                p.on(a.JWPLAYER_MEDIA_META, function(a) {
                                    g.extend(s, a.metadata);
                                }),
                                p.on(a.JWPLAYER_VIEW_TAB_FOCUS, function(a) {
                                    a.hasFocus === !0 ? m(this.getContainer()) : n(this.getContainer());
                                }),
                                p.on(a.JWPLAYER_READY, function(a) {
                                    (r = !0), u.tick("ready"), (a.setupTime = u.between("setup", "ready"));
                                }),
                                p.on("all", q.trigger);
                        };
                        t(), k(this), (this.id = f.id);
                        var u = (this._qoe = new e());
                        u.tick("init");
                        var v = function() {
                            (r = !1), (s = {}), q.off(), p && p.off(), p && p.playerDestroy && p.playerDestroy();
                        };
                        return (
                            (this.getPlugin = function(a) {
                                return q.plugins && q.plugins[a];
                            }),
                            (this.addPlugin = function(a, b) {
                                (this.plugins = this.plugins || {}),
                                    (this.plugins[a] = b),
                                    this.onReady(b.addToPlayer),
                                    b.resize && this.onResize(b.resizeHandler);
                            }),
                            (this.setup = function(a) {
                                return (
                                    u.tick("setup"),
                                    v(),
                                    t(),
                                    d.foreach(a.events, function(a, b) {
                                        var c = q[a];
                                        "function" == typeof c && c.call(q, b);
                                    }),
                                    (a.id = q.id),
                                    p.setup(a, this),
                                    q
                                );
                            }),
                            (this.qoe = function() {
                                var b = p.getItemQoe(),
                                    c = u.between("setup", "ready"),
                                    d = b.between(a.JWPLAYER_MEDIA_PLAY_ATTEMPT, a.JWPLAYER_MEDIA_FIRST_FRAME);
                                return {
                                    setupTime: c,
                                    firstFrame: d,
                                    player: u.dump(),
                                    item: b.dump()
                                };
                            }),
                            (this.getContainer = function() {
                                return p.getContainer ? p.getContainer() : f;
                            }),
                            (this.getMeta = this.getItemMeta = function() {
                                return s;
                            }),
                            (this.getPlaylistItem = function(a) {
                                if (!d.exists(a)) return p._model.get("playlistItem");
                                var b = q.getPlaylist();
                                return b ? b[a] : null;
                            }),
                            (this.getRenderingMode = function() {
                                return "html5";
                            }),
                            (this.load = function(a) {
                                var b = this.getPlugin("vast") || this.getPlugin("googima");
                                return b && b.destroy(), p.load(a), q;
                            }),
                            (this.play = function(a) {
                                if (a === !0) return p.play(), q;
                                if (a === !1) return p.pause(), q;
                                switch ((a = q.getState())) {
                                    case b.PLAYING:
                                    case b.BUFFERING:
                                        p.pause();
                                        break;
                                    default:
                                        p.play();
                                }
                                return q;
                            }),
                            (this.pause = function(a) {
                                return g.isBoolean(a) ? this.play(!a) : this.play();
                            }),
                            (this.createInstream = function() {
                                return p.createInstream();
                            }),
                            (this.castToggle = function() {
                                p && p.castToggle && p.castToggle();
                            }),
                            (this.playAd = this.pauseAd = d.noop),
                            (this.remove = function() {
                                return o(q), q.trigger("remove"), v(), q;
                            }),
                            this
                        );
                    };
                    return o;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    var a = {},
                        b = Array.prototype,
                        c = Object.prototype,
                        d = Function.prototype,
                        e = b.slice,
                        f = b.concat,
                        g = c.toString,
                        h = c.hasOwnProperty,
                        i = b.map,
                        j = b.reduce,
                        k = b.forEach,
                        l = b.filter,
                        m = b.every,
                        n = b.some,
                        o = b.indexOf,
                        p = Array.isArray,
                        q = Object.keys,
                        r = d.bind,
                        s = function(a) {
                            return a instanceof s ? a : this instanceof s ? void 0 : new s(a);
                        },
                        t = (s.each = s.forEach = function(b, c, d) {
                            if (null == b) return b;
                            if (k && b.forEach === k) b.forEach(c, d);
                            else if (b.length === +b.length) {
                                for (var e = 0, f = b.length; f > e; e++) if (c.call(d, b[e], e, b) === a) return;
                            } else
                                for (var g = s.keys(b), e = 0, f = g.length; f > e; e++)
                                    if (c.call(d, b[g[e]], g[e], b) === a) return;
                            return b;
                        });
                    s.map = s.collect = function(a, b, c) {
                        var d = [];
                        return null == a
                            ? d
                            : i && a.map === i
                            ? a.map(b, c)
                            : (t(a, function(a, e, f) {
                                  d.push(b.call(c, a, e, f));
                              }),
                              d);
                    };
                    var u = "Reduce of empty array with no initial value";
                    (s.reduce = s.foldl = s.inject = function(a, b, c, d) {
                        var e = arguments.length > 2;
                        if ((null == a && (a = []), j && a.reduce === j))
                            return d && (b = s.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
                        if (
                            (t(a, function(a, f, g) {
                                e ? (c = b.call(d, c, a, f, g)) : ((c = a), (e = !0));
                            }),
                            !e)
                        )
                            throw new TypeError(u);
                        return c;
                    }),
                        (s.find = s.detect = function(a, b, c) {
                            var d;
                            return (
                                v(a, function(a, e, f) {
                                    return b.call(c, a, e, f) ? ((d = a), !0) : void 0;
                                }),
                                d
                            );
                        }),
                        (s.filter = s.select = function(a, b, c) {
                            var d = [];
                            return null == a
                                ? d
                                : l && a.filter === l
                                ? a.filter(b, c)
                                : (t(a, function(a, e, f) {
                                      b.call(c, a, e, f) && d.push(a);
                                  }),
                                  d);
                        }),
                        (s.reject = function(a, b, c) {
                            return s.filter(
                                a,
                                function(a, d, e) {
                                    return !b.call(c, a, d, e);
                                },
                                c
                            );
                        }),
                        (s.compact = function(a) {
                            return s.filter(a, s.identity);
                        }),
                        (s.every = s.all = function(b, c, d) {
                            c || (c = s.identity);
                            var e = !0;
                            return null == b
                                ? e
                                : m && b.every === m
                                ? b.every(c, d)
                                : (t(b, function(b, f, g) {
                                      return (e = e && c.call(d, b, f, g)) ? void 0 : a;
                                  }),
                                  !!e);
                        });
                    var v = (s.some = s.any = function(b, c, d) {
                        c || (c = s.identity);
                        var e = !1;
                        return null == b
                            ? e
                            : n && b.some === n
                            ? b.some(c, d)
                            : (t(b, function(b, f, g) {
                                  return e || (e = c.call(d, b, f, g)) ? a : void 0;
                              }),
                              !!e);
                    });
                    (s.size = function(a) {
                        return null == a ? 0 : a.length === +a.length ? a.length : s.keys(a).length;
                    }),
                        (s.after = function(a, b) {
                            return function() {
                                return --a < 1 ? b.apply(this, arguments) : void 0;
                            };
                        }),
                        (s.before = function(a, b) {
                            var c;
                            return function() {
                                return --a > 0 && (c = b.apply(this, arguments)), 1 >= a && (b = null), c;
                            };
                        });
                    var w = function(a) {
                        return null == a ? s.identity : s.isFunction(a) ? a : s.property(a);
                    };
                    s.sortedIndex = function(a, b, c, d) {
                        c = w(c);
                        for (var e = c.call(d, b), f = 0, g = a.length; g > f; ) {
                            var h = (f + g) >>> 1;
                            c.call(d, a[h]) < e ? (f = h + 1) : (g = h);
                        }
                        return f;
                    };
                    var v = (s.some = s.any = function(b, c, d) {
                        c || (c = s.identity);
                        var e = !1;
                        return null == b
                            ? e
                            : n && b.some === n
                            ? b.some(c, d)
                            : (t(b, function(b, f, g) {
                                  return e || (e = c.call(d, b, f, g)) ? a : void 0;
                              }),
                              !!e);
                    });
                    (s.contains = s.include = function(a, b) {
                        return null == a ? !1 : (a.length !== +a.length && (a = s.values(a)), s.indexOf(a, b) >= 0);
                    }),
                        (s.where = function(a, b) {
                            return s.filter(a, s.matches(b));
                        }),
                        (s.findWhere = function(a, b) {
                            return s.find(a, s.matches(b));
                        }),
                        (s.max = function(a, b, c) {
                            if (!b && s.isArray(a) && a[0] === +a[0] && a.length < 65535)
                                return Math.max.apply(Math, a);
                            var d = -(1 / 0),
                                e = -(1 / 0);
                            return (
                                t(a, function(a, f, g) {
                                    var h = b ? b.call(c, a, f, g) : a;
                                    h > e && ((d = a), (e = h));
                                }),
                                d
                            );
                        }),
                        (s.difference = function(a) {
                            var c = f.apply(b, e.call(arguments, 1));
                            return s.filter(a, function(a) {
                                return !s.contains(c, a);
                            });
                        }),
                        (s.without = function(a) {
                            return s.difference(a, e.call(arguments, 1));
                        }),
                        (s.indexOf = function(a, b, c) {
                            if (null == a) return -1;
                            var d = 0,
                                e = a.length;
                            if (c) {
                                if ("number" != typeof c) return (d = s.sortedIndex(a, b)), a[d] === b ? d : -1;
                                d = 0 > c ? Math.max(0, e + c) : c;
                            }
                            if (o && a.indexOf === o) return a.indexOf(b, c);
                            for (; e > d; d++) if (a[d] === b) return d;
                            return -1;
                        });
                    var x = function() {};
                    (s.bind = function(a, b) {
                        var c, d;
                        if (r && a.bind === r) return r.apply(a, e.call(arguments, 1));
                        if (!s.isFunction(a)) throw new TypeError();
                        return (
                            (c = e.call(arguments, 2)),
                            (d = function() {
                                if (!(this instanceof d)) return a.apply(b, c.concat(e.call(arguments)));
                                x.prototype = a.prototype;
                                var f = new x();
                                x.prototype = null;
                                var g = a.apply(f, c.concat(e.call(arguments)));
                                return Object(g) === g ? g : f;
                            })
                        );
                    }),
                        (s.partial = function(a) {
                            var b = e.call(arguments, 1);
                            return function() {
                                for (var c = 0, d = b.slice(), e = 0, f = d.length; f > e; e++)
                                    d[e] === s && (d[e] = arguments[c++]);
                                for (; c < arguments.length; ) d.push(arguments[c++]);
                                return a.apply(this, d);
                            };
                        }),
                        (s.once = s.partial(s.before, 2)),
                        (s.memoize = function(a, b) {
                            var c = {};
                            return (
                                b || (b = s.identity),
                                function() {
                                    var d = b.apply(this, arguments);
                                    return s.has(c, d) ? c[d] : (c[d] = a.apply(this, arguments));
                                }
                            );
                        }),
                        (s.delay = function(a, b) {
                            var c = e.call(arguments, 2);
                            return setTimeout(function() {
                                return a.apply(null, c);
                            }, b);
                        }),
                        (s.defer = function(a) {
                            return s.delay.apply(s, [a, 1].concat(e.call(arguments, 1)));
                        }),
                        (s.throttle = function(a, b, c) {
                            var d,
                                e,
                                f,
                                g = null,
                                h = 0;
                            c || (c = {});
                            var i = function() {
                                (h = c.leading === !1 ? 0 : s.now()), (g = null), (f = a.apply(d, e)), (d = e = null);
                            };
                            return function() {
                                var j = s.now();
                                h || c.leading !== !1 || (h = j);
                                var k = b - (j - h);
                                return (
                                    (d = this),
                                    (e = arguments),
                                    0 >= k
                                        ? (clearTimeout(g), (g = null), (h = j), (f = a.apply(d, e)), (d = e = null))
                                        : g || c.trailing === !1 || (g = setTimeout(i, k)),
                                    f
                                );
                            };
                        }),
                        (s.keys = function(a) {
                            if (!s.isObject(a)) return [];
                            if (q) return q(a);
                            var b = [];
                            for (var c in a) s.has(a, c) && b.push(c);
                            return b;
                        }),
                        (s.invert = function(a) {
                            for (var b = {}, c = s.keys(a), d = 0, e = c.length; e > d; d++) b[a[c[d]]] = c[d];
                            return b;
                        }),
                        (s.defaults = function(a) {
                            return (
                                t(e.call(arguments, 1), function(b) {
                                    if (b) for (var c in b) void 0 === a[c] && (a[c] = b[c]);
                                }),
                                a
                            );
                        }),
                        (s.extend = function(a) {
                            return (
                                t(e.call(arguments, 1), function(b) {
                                    if (b) for (var c in b) a[c] = b[c];
                                }),
                                a
                            );
                        }),
                        (s.pick = function(a) {
                            var c = {},
                                d = f.apply(b, e.call(arguments, 1));
                            return (
                                t(d, function(b) {
                                    b in a && (c[b] = a[b]);
                                }),
                                c
                            );
                        }),
                        (s.omit = function(a) {
                            var c = {},
                                d = f.apply(b, e.call(arguments, 1));
                            for (var g in a) s.contains(d, g) || (c[g] = a[g]);
                            return c;
                        }),
                        (s.clone = function(a) {
                            return s.isObject(a) ? (s.isArray(a) ? a.slice() : s.extend({}, a)) : a;
                        }),
                        (s.isArray =
                            p ||
                            function(a) {
                                return "[object Array]" == g.call(a);
                            }),
                        (s.isObject = function(a) {
                            return a === Object(a);
                        }),
                        t(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
                            s["is" + a] = function(b) {
                                return g.call(b) == "[object " + a + "]";
                            };
                        }),
                        s.isArguments(arguments) ||
                            (s.isArguments = function(a) {
                                return !(!a || !s.has(a, "callee"));
                            }),
                        (s.isFunction = function(a) {
                            return "function" == typeof a;
                        }),
                        (s.isFinite = function(a) {
                            return isFinite(a) && !isNaN(parseFloat(a));
                        }),
                        (s.isNaN = function(a) {
                            return s.isNumber(a) && a != +a;
                        }),
                        (s.isBoolean = function(a) {
                            return a === !0 || a === !1 || "[object Boolean]" == g.call(a);
                        }),
                        (s.isNull = function(a) {
                            return null === a;
                        }),
                        (s.isUndefined = function(a) {
                            return void 0 === a;
                        }),
                        (s.has = function(a, b) {
                            return h.call(a, b);
                        }),
                        (s.identity = function(a) {
                            return a;
                        }),
                        (s.constant = function(a) {
                            return function() {
                                return a;
                            };
                        }),
                        (s.property = function(a) {
                            return function(b) {
                                return b[a];
                            };
                        }),
                        (s.propertyOf = function(a) {
                            return null == a
                                ? function() {}
                                : function(b) {
                                      return a[b];
                                  };
                        }),
                        (s.matches = function(a) {
                            return function(b) {
                                if (b === a) return !0;
                                for (var c in a) if (a[c] !== b[c]) return !1;
                                return !0;
                            };
                        }),
                        (s.now =
                            Date.now ||
                            function() {
                                return new Date().getTime();
                            }),
                        (s.result = function(a, b) {
                            if (null == a) return void 0;
                            var c = a[b];
                            return s.isFunction(c) ? c.call(a) : c;
                        });
                    var y = 0;
                    return (
                        (s.uniqueId = function(a) {
                            var b = ++y + "";
                            return a ? a + b : b;
                        }),
                        s
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    var a = {
                            DRAG: "drag",
                            DRAG_START: "dragStart",
                            DRAG_END: "dragEnd",
                            CLICK: "click",
                            DOUBLE_CLICK: "doubleClick",
                            TAP: "tap",
                            DOUBLE_TAP: "doubleTap",
                            OVER: "over",
                            OUT: "out"
                        },
                        b = {
                            COMPLETE: "complete",
                            ERROR: "error",
                            JWPLAYER_AD_CLICK: "adClick",
                            JWPLAYER_AD_COMPANIONS: "adCompanions",
                            JWPLAYER_AD_COMPLETE: "adComplete",
                            JWPLAYER_AD_ERROR: "adError",
                            JWPLAYER_AD_IMPRESSION: "adImpression",
                            JWPLAYER_AD_META: "adMeta",
                            JWPLAYER_AD_PAUSE: "adPause",
                            JWPLAYER_AD_PLAY: "adPlay",
                            JWPLAYER_AD_SKIPPED: "adSkipped",
                            JWPLAYER_AD_TIME: "adTime",
                            JWPLAYER_CAST_AD_CHANGED: "castAdChanged",
                            JWPLAYER_MEDIA_COMPLETE: "complete",
                            JWPLAYER_READY: "ready",
                            JWPLAYER_MEDIA_SEEK: "seek",
                            JWPLAYER_MEDIA_BEFOREPLAY: "beforePlay",
                            JWPLAYER_MEDIA_BEFORECOMPLETE: "beforeComplete",
                            JWPLAYER_MEDIA_BUFFER_FULL: "bufferFull",
                            JWPLAYER_DISPLAY_CLICK: "displayClick",
                            JWPLAYER_PLAYLIST_COMPLETE: "playlistComplete",
                            JWPLAYER_CAST_SESSION: "cast",
                            JWPLAYER_MEDIA_ERROR: "mediaError",
                            JWPLAYER_MEDIA_FIRST_FRAME: "firstFrame",
                            JWPLAYER_MEDIA_PLAY_ATTEMPT: "playAttempt",
                            JWPLAYER_MEDIA_LOADED: "loaded",
                            JWPLAYER_MEDIA_SEEKED: "seeked",
                            JWPLAYER_SETUP_ERROR: "setupError",
                            JWPLAYER_ERROR: "error",
                            JWPLAYER_PLAYER_STATE: "state",
                            JWPLAYER_CAST_AVAILABLE: "castAvailable",
                            JWPLAYER_MEDIA_BUFFER: "bufferChange",
                            JWPLAYER_MEDIA_TIME: "time",
                            JWPLAYER_MEDIA_TYPE: "mediaType",
                            JWPLAYER_MEDIA_VOLUME: "volume",
                            JWPLAYER_MEDIA_MUTE: "mute",
                            JWPLAYER_MEDIA_META: "meta",
                            JWPLAYER_MEDIA_LEVELS: "levels",
                            JWPLAYER_MEDIA_LEVEL_CHANGED: "levelsChanged",
                            JWPLAYER_CONTROLS: "controls",
                            JWPLAYER_FULLSCREEN: "fullscreen",
                            JWPLAYER_RESIZE: "resize",
                            JWPLAYER_PLAYLIST_ITEM: "playlistItem",
                            JWPLAYER_PLAYLIST_LOADED: "playlist",
                            JWPLAYER_AUDIO_TRACKS: "audioTracks",
                            JWPLAYER_AUDIO_TRACK_CHANGED: "audioTrackChanged",
                            JWPLAYER_LOGO_CLICK: "logoClick",
                            JWPLAYER_CAPTIONS_LIST: "captionsList",
                            JWPLAYER_CAPTIONS_CHANGED: "captionsChanged",
                            JWPLAYER_PROVIDER_CHANGED: "providerChanged",
                            JWPLAYER_PROVIDER_FIRST_FRAME: "providerFirstFrame",
                            JWPLAYER_USER_ACTION: "userAction",
                            JWPLAYER_PROVIDER_CLICK: "providerClick",
                            JWPLAYER_VIEW_TAB_FOCUS: "tabFocus",
                            JWPLAYER_CONTROLBAR_DRAGGING: "scrubbing",
                            JWPLAYER_INSTREAM_CLICK: "instreamClick"
                        };
                    return (b.touchEvents = a), b;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = [],
                        c = b.slice,
                        d = {
                            on: function(a, b, c) {
                                if (!f(this, "on", a, [b, c]) || !b) return this;
                                this._events || (this._events = {});
                                var d = this._events[a] || (this._events[a] = []);
                                return (
                                    d.push({
                                        callback: b,
                                        context: c
                                    }),
                                    this
                                );
                            },
                            once: function(b, c, d) {
                                if (!f(this, "once", b, [c, d]) || !c) return this;
                                var e = this,
                                    g = a.once(function() {
                                        e.off(b, g), c.apply(this, arguments);
                                    });
                                return (g._callback = c), this.on(b, g, d);
                            },
                            off: function(b, c, d) {
                                var e, g, h, i, j, k, l, m;
                                if (!this._events || !f(this, "off", b, [c, d])) return this;
                                if (!b && !c && !d) return (this._events = void 0), this;
                                for (i = b ? [b] : a.keys(this._events), j = 0, k = i.length; k > j; j++)
                                    if (((b = i[j]), (h = this._events[b]))) {
                                        if (((this._events[b] = e = []), c || d))
                                            for (l = 0, m = h.length; m > l; l++)
                                                (g = h[l]),
                                                    ((c && c !== g.callback && c !== g.callback._callback) ||
                                                        (d && d !== g.context)) &&
                                                        e.push(g);
                                        e.length || delete this._events[b];
                                    }
                                return this;
                            },
                            trigger: function(a) {
                                if (!this._events) return this;
                                var b = c.call(arguments, 1);
                                if (!f(this, "trigger", a, b)) return this;
                                var d = this._events[a],
                                    e = this._events.all;
                                return d && g(d, b, this), e && g(e, arguments, this), this;
                            },
                            triggerSafe: function(a) {
                                if (!this._events) return this;
                                var b = c.call(arguments, 1);
                                if (!f(this, "trigger", a, b)) return this;
                                var d = this._events[a],
                                    e = this._events.all;
                                return d && h(d, b, this), e && h(e, arguments, this), this;
                            }
                        },
                        e = /\s+/,
                        f = function(a, b, c, d) {
                            if (!c) return !0;
                            if ("object" == typeof c) {
                                for (var f in c) a[b].apply(a, [f, c[f]].concat(d));
                                return !1;
                            }
                            if (e.test(c)) {
                                for (var g = c.split(e), h = 0, i = g.length; i > h; h++)
                                    a[b].apply(a, [g[h]].concat(d));
                                return !1;
                            }
                            return !0;
                        },
                        g = function(a, b, c) {
                            var d,
                                e = -1,
                                f = a.length,
                                g = b[0],
                                h = b[1],
                                i = b[2];
                            switch (b.length) {
                                case 0:
                                    for (; ++e < f; ) (d = a[e]).callback.call(d.context || c);
                                    return;
                                case 1:
                                    for (; ++e < f; ) (d = a[e]).callback.call(d.context || c, g);
                                    return;
                                case 2:
                                    for (; ++e < f; ) (d = a[e]).callback.call(d.context || c, g, h);
                                    return;
                                case 3:
                                    for (; ++e < f; ) (d = a[e]).callback.call(d.context || c, g, h, i);
                                    return;
                                default:
                                    for (; ++e < f; ) (d = a[e]).callback.apply(d.context || c, b);
                                    return;
                            }
                        },
                        h = function(a, b, c) {
                            for (var d, e = -1, f = a.length; ++e < f; )
                                try {
                                    (d = a[e]).callback.apply(d.context || c, b);
                                } catch (g) {}
                        };
                    return d;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51), c(44), c(52), c(53), c(55), c(48), c(56), c(49), c(57), c(50)]),
                (e = function(a, b, c, d, e, f, g, h, i, j) {
                    var k = {};
                    return (
                        (k.log = function() {
                            window.console &&
                                ("object" == typeof console.log
                                    ? console.log(Array.prototype.slice.call(arguments, 0))
                                    : console.log.apply(console, arguments));
                        }),
                        (k.between = function(a, b, c) {
                            return Math.max(Math.min(a, c), b);
                        }),
                        (k.foreach = function(a, b) {
                            var c, d;
                            for (c in a)
                                "function" === k.typeOf(a.hasOwnProperty)
                                    ? a.hasOwnProperty(c) && ((d = a[c]), b(c, d))
                                    : ((d = a[c]), b(c, d));
                        }),
                        (k.indexOf = b.indexOf),
                        (k.noop = function() {}),
                        (k.seconds = a.seconds),
                        (k.prefix = a.prefix),
                        (k.suffix = a.suffix),
                        b.extend(k, f, h, c, g, d, e, i, j),
                        k
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(49), c(50)]),
                (e = function(a, b, c) {
                    function d(a) {
                        return /^(?:(?:https?|file)\:)?\/\//.test(a);
                    }

                    function e(b) {
                        return a.some(b, function(a) {
                            return "parsererror" === a.nodeName;
                        });
                    }
                    var f = {};
                    return (
                        (f.getAbsolutePath = function(a, c) {
                            if ((b.exists(c) || (c = document.location.href), b.exists(a))) {
                                if (d(a)) return a;
                                var e,
                                    f = c.substring(0, c.indexOf("://") + 3),
                                    g = c.substring(f.length, c.indexOf("/", f.length + 1));
                                if (0 === a.indexOf("/")) e = a.split("/");
                                else {
                                    var h = c.split("?")[0];
                                    (h = h.substring(f.length + g.length + 1, h.lastIndexOf("/"))),
                                        (e = h.split("/").concat(a.split("/")));
                                }
                                for (var i = [], j = 0; j < e.length; j++)
                                    e[j] && b.exists(e[j]) && "." !== e[j] && (".." === e[j] ? i.pop() : i.push(e[j]));
                                return f + g + "/" + i.join("/");
                            }
                        }),
                        (f.getScriptPath = a.memoize(function(a) {
                            for (var b = document.getElementsByTagName("script"), c = 0; c < b.length; c++) {
                                var d = b[c].src;
                                if (d && d.indexOf(a) >= 0) return d.substr(0, d.indexOf(a));
                            }
                            return "";
                        })),
                        (f.parseXML = function(a) {
                            var b = null;
                            return (
                                c.tryCatch(function() {
                                    window.DOMParser
                                        ? ((b = new window.DOMParser().parseFromString(a, "text/xml")),
                                          (e(b.childNodes) || (b.childNodes && e(b.childNodes[0].childNodes))) &&
                                              (b = null))
                                        : ((b = new window.ActiveXObject("Microsoft.XMLDOM")),
                                          (b.async = "false"),
                                          b.loadXML(a));
                                }),
                                b
                            );
                        }),
                        (f.serialize = function(a) {
                            if (void 0 === a) return null;
                            if ("string" == typeof a && a.length < 6) {
                                var b = a.toLowerCase();
                                if ("true" === b) return !0;
                                if ("false" === b) return !1;
                                if (!isNaN(Number(a)) && !isNaN(parseFloat(a))) return Number(a);
                            }
                            return a;
                        }),
                        (f.parseDimension = function(a) {
                            return "string" == typeof a
                                ? "" === a
                                    ? 0
                                    : a.lastIndexOf("%") > -1
                                    ? a
                                    : parseInt(a.replace("px", ""), 10)
                                : a;
                        }),
                        (f.timeFormat = function(a, b) {
                            if (0 >= a && !b) return "00:00";
                            var c = 0 > a ? "-" : "";
                            a = Math.abs(a);
                            var d = Math.floor(a / 3600),
                                e = Math.floor((a - 3600 * d) / 60),
                                f = Math.floor(a % 60);
                            return c + (d ? d + ":" : "") + (10 > e ? "0" : "") + e + ":" + (10 > f ? "0" : "") + f;
                        }),
                        (f.adaptiveType = function(a) {
                            if (-1 !== a) {
                                var b = -120;
                                if (b >= a) return "DVR";
                                if (0 > a || a === 1 / 0) return "LIVE";
                            }
                            return "VOD";
                        }),
                        f
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = {};
                    return (
                        (b.exists = function(a) {
                            switch (typeof a) {
                                case "string":
                                    return a.length > 0;
                                case "object":
                                    return null !== a;
                                case "undefined":
                                    return !1;
                            }
                            return !0;
                        }),
                        (b.isHTTPS = function() {
                            return 0 === window.location.href.indexOf("https");
                        }),
                        (b.isRtmp = function(a, b) {
                            return 0 === a.indexOf("rtmp") || "rtmp" === b;
                        }),
                        (b.isYouTube = function(a, b) {
                            return "youtube" === b || /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(a);
                        }),
                        (b.youTubeID = function(a) {
                            var b = /v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(a);
                            return b
                                ? b
                                      .slice(1)
                                      .join("")
                                      .replace("?", "")
                                : "";
                        }),
                        (b.typeOf = function(b) {
                            if (null === b) return "null";
                            var c = typeof b;
                            return "object" === c && a.isArray(b) ? "array" : c;
                        }),
                        b
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    var a = function(a, c, d) {
                            if (((c = c || this), (d = d || []), window.jwplayer && window.jwplayer.debug))
                                return a.apply(c, d);
                            try {
                                return a.apply(c, d);
                            } catch (e) {
                                return new b(a.name, e);
                            }
                        },
                        b = function(a, b) {
                            (this.name = a), (this.message = b.message || b.toString()), (this.error = b);
                        };
                    return {
                        tryCatch: a,
                        Error: b
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    function b(a) {
                        return a.indexOf("(format=m3u8-") > -1 ? "m3u8" : !1;
                    }
                    var c = function(a) {
                            return a.replace(/^\s+|\s+$/g, "");
                        },
                        d = function(a, b, c) {
                            for (a = "" + a, c = c || "0"; a.length < b; ) a = c + a;
                            return a;
                        },
                        e = function(a, b) {
                            for (var c = 0; c < a.attributes.length; c++)
                                if (a.attributes[c].name && a.attributes[c].name.toLowerCase() === b.toLowerCase())
                                    return a.attributes[c].value.toString();
                            return "";
                        },
                        f = function(a) {
                            if (!a || "rtmp" === a.substr(0, 4)) return "";
                            var c = b(a);
                            return c
                                ? c
                                : ((a = a
                                      .substring(a.lastIndexOf("/") + 1, a.length)
                                      .split("?")[0]
                                      .split("#")[0]),
                                  a.lastIndexOf(".") > -1
                                      ? a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase()
                                      : void 0);
                        },
                        g = function(a) {
                            var b = parseInt(a / 3600),
                                c = parseInt(a / 60) % 60,
                                e = a % 60;
                            return d(b, 2) + ":" + d(c, 2) + ":" + d(e.toFixed(3), 6);
                        },
                        h = function(b) {
                            if (a.isNumber(b)) return b;
                            b = b.replace(",", ".");
                            var c = b.split(":"),
                                d = 0;
                            return (
                                "s" === b.slice(-1)
                                    ? (d = parseFloat(b))
                                    : "m" === b.slice(-1)
                                    ? (d = 60 * parseFloat(b))
                                    : "h" === b.slice(-1)
                                    ? (d = 3600 * parseFloat(b))
                                    : c.length > 1
                                    ? ((d = parseFloat(c[c.length - 1])),
                                      (d += 60 * parseFloat(c[c.length - 2])),
                                      3 === c.length && (d += 3600 * parseFloat(c[c.length - 3])))
                                    : (d = parseFloat(b)),
                                d
                            );
                        },
                        i = function(b, c) {
                            return a.map(b, function(a) {
                                return c + a;
                            });
                        },
                        j = function(b, c) {
                            return a.map(b, function(a) {
                                return a + c;
                            });
                        };
                    return {
                        trim: c,
                        pad: d,
                        xmlAttribute: e,
                        extension: f,
                        hms: g,
                        seconds: h,
                        suffix: j,
                        prefix: i
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(50)]),
                (e = function(a, b) {
                    function c(a) {
                        return function() {
                            return e(a);
                        };
                    }
                    var d = {},
                        e = a.memoize(function(a) {
                            var b = navigator.userAgent.toLowerCase();
                            return null !== b.match(a);
                        }),
                        f = (d.isInt = function(a) {
                            return parseFloat(a) % 1 === 0;
                        });
                    (d.isFlashSupported = function() {
                        var a = d.flashVersion();
                        return a && a >= 11.2;
                    }),
                        (d.isFF = c(/firefox/i)),
                        (d.isIPod = c(/iP(hone|od)/i)),
                        (d.isIPad = c(/iPad/i)),
                        (d.isSafari602 = c(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i)),
                        (d.isOSX = c(/Mac OS X/i)),
                        (d.isEdge = c(/\sedge\/\d+/i));
                    var g = (d.isIETrident = function(a) {
                            return d.isEdge()
                                ? !0
                                : a
                                ? ((a = parseFloat(a).toFixed(1)), e(new RegExp("trident/.+rv:\\s*" + a, "i")))
                                : e(/trident/i);
                        }),
                        h = (d.isMSIE = function(a) {
                            return a
                                ? ((a = parseFloat(a).toFixed(1)), e(new RegExp("msie\\s*" + a, "i")))
                                : e(/msie/i);
                        }),
                        i = c(/chrome/i);
                    (d.isChrome = function() {
                        return i() && !d.isEdge();
                    }),
                        (d.isIE = function(a) {
                            return a ? ((a = parseFloat(a).toFixed(1)), a >= 11 ? g(a) : h(a)) : h() || g();
                        }),
                        (d.isSafari = function() {
                            return e(/safari/i) && !e(/chrome/i) && !e(/chromium/i) && !e(/android/i);
                        });
                    var j = (d.isIOS = function(a) {
                        return e(a ? new RegExp("iP(hone|ad|od).+\\sOS\\s" + a, "i") : /iP(hone|ad|od)/i);
                    });
                    d.isAndroidNative = function(a) {
                        return k(a, !0);
                    };
                    var k = (d.isAndroid = function(a, b) {
                        return b && e(/chrome\/[123456789]/i) && !e(/chrome\/18/)
                            ? !1
                            : a
                            ? (f(a) && !/\./.test(a) && (a = "" + a + "."), e(new RegExp("Android\\s*" + a, "i")))
                            : e(/Android/i);
                    });
                    return (
                        (d.isMobile = function() {
                            return j() || k();
                        }),
                        (d.isIframe = function() {
                            return window.frameElement && "IFRAME" === window.frameElement.nodeName;
                        }),
                        (d.flashVersion = function() {
                            if (d.isAndroid()) return 0;
                            var a,
                                c = navigator.plugins;
                            if (c && ((a = c["Shockwave Flash"]), a && a.description))
                                return parseFloat(a.description.replace(/\D+(\d+\.?\d*).*/, "$1"));
                            if ("undefined" != typeof window.ActiveXObject) {
                                var e = b.tryCatch(function() {
                                    return (
                                        (a = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")),
                                        a
                                            ? parseFloat(
                                                  a
                                                      .GetVariable("$version")
                                                      .split(" ")[1]
                                                      .replace(/\s*,\s*/, ".")
                                              )
                                            : void 0
                                    );
                                });
                                return e instanceof b.Error ? 0 : e;
                            }
                            return 0;
                        }),
                        d
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51), c(44), c(54)]),
                (e = function(a, b, c) {
                    var d = {};
                    return (
                        (d.createElement = function(a) {
                            var b = document.createElement("div");
                            return (b.innerHTML = a), b.firstChild;
                        }),
                        (d.styleDimension = function(a) {
                            return a + (a.toString().indexOf("%") > 0 ? "" : "px");
                        }),
                        (d.classList = function(a) {
                            return a.classList ? a.classList : a.className.split(" ");
                        }),
                        (d.hasClass = c.hasClass),
                        (d.addClass = function(c, d) {
                            var e = b.isString(c.className) ? c.className.split(" ") : [],
                                f = b.isArray(d) ? d : d.split(" ");
                            b.each(f, function(a) {
                                b.contains(e, a) || e.push(a);
                            }),
                                (c.className = a.trim(e.join(" ")));
                        }),
                        (d.removeClass = function(c, d) {
                            var e = b.isString(c.className) ? c.className.split(" ") : [],
                                f = b.isArray(d) ? d : d.split(" ");
                            c.className = a.trim(b.difference(e, f).join(" "));
                        }),
                        (d.toggleClass = function(a, c, e) {
                            var f = d.hasClass(a, c);
                            (e = b.isBoolean(e) ? e : !f), e !== f && (e ? d.addClass(a, c) : d.removeClass(a, c));
                        }),
                        (d.emptyElement = function(a) {
                            for (; a.firstChild; ) a.removeChild(a.firstChild);
                        }),
                        (d.addStyleSheet = function(a) {
                            var b = document.createElement("link");
                            (b.rel = "stylesheet"),
                                (b.href = a),
                                document.getElementsByTagName("head")[0].appendChild(b);
                        }),
                        (d.empty = function(a) {
                            if (a) for (; a.childElementCount > 0; ) a.removeChild(a.children[0]);
                        }),
                        (d.bounds = function(a) {
                            var b = {
                                left: 0,
                                right: 0,
                                width: 0,
                                height: 0,
                                top: 0,
                                bottom: 0
                            };
                            if (!a || !document.body.contains(a)) return b;
                            if (a.getBoundingClientRect) {
                                var c = a.getBoundingClientRect(a),
                                    d = window.pageYOffset,
                                    e = window.pageXOffset;
                                if (!(c.width || c.height || c.left || c.top)) return b;
                                (b.left = c.left + e),
                                    (b.right = c.right + e),
                                    (b.top = c.top + d),
                                    (b.bottom = c.bottom + d),
                                    (b.width = c.right - c.left),
                                    (b.height = c.bottom - c.top);
                            } else {
                                (b.width = 0 | a.offsetWidth), (b.height = 0 | a.offsetHeight);
                                do (b.left += 0 | a.offsetLeft), (b.top += 0 | a.offsetTop);
                                while ((a = a.offsetParent));
                                (b.right = b.left + b.width), (b.bottom = b.top + b.height);
                            }
                            return b;
                        }),
                        d
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return {
                        hasClass: function(a, b) {
                            var c = " " + b + " ";
                            return (
                                1 === a.nodeType &&
                                (" " + a.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(c) >= 0
                            );
                        }
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51)]),
                (e = function(a) {
                    function b(a) {
                        a = a.split("-");
                        for (var b = 1; b < a.length; b++) a[b] = a[b].charAt(0).toUpperCase() + a[b].slice(1);
                        return a.join("");
                    }

                    function c(b, c, d) {
                        if ("" === c || void 0 === c || null === c) return "";
                        var e = d ? " !important" : "";
                        return "string" == typeof c && isNaN(c)
                            ? /png|gif|jpe?g/i.test(c) && c.indexOf("url") < 0
                                ? "url(" + c + ")"
                                : c + e
                            : 0 === c || "z-index" === b || "opacity" === b
                            ? "" + c + e
                            : /color/i.test(b)
                            ? "#" + a.pad(c.toString(16).replace(/^0x/i, ""), 6) + e
                            : Math.ceil(c) + "px" + e;
                    }
                    var d,
                        e = {},
                        f = function(a, b) {
                            d ||
                                ((d = document.createElement("style")),
                                (d.type = "text/css"),
                                document.getElementsByTagName("head")[0].appendChild(d));
                            var c = a + JSON.stringify(b).replace(/"/g, ""),
                                f = document.createTextNode(c);
                            e[a] && d.removeChild(e[a]), (e[a] = f), d.appendChild(f);
                        },
                        g = function(a, d) {
                            if (void 0 !== a && null !== a) {
                                void 0 === a.length && (a = [a]);
                                var e,
                                    f = {};
                                for (e in d) f[e] = c(e, d[e]);
                                for (var g = 0; g < a.length; g++) {
                                    var h,
                                        i = a[g];
                                    if (void 0 !== i && null !== i)
                                        for (e in f) (h = b(e)), i.style[h] !== f[e] && (i.style[h] = f[e]);
                                }
                            }
                        },
                        h = function(a) {
                            for (var b in e) b.indexOf(a) >= 0 && (d.removeChild(e[b]), delete e[b]);
                        },
                        i = function(a, b) {
                            var c = "transform",
                                d = {};
                            (b = b || ""),
                                (d[c] = b),
                                (d["-webkit-" + c] = b),
                                (d["-ms-" + c] = b),
                                (d["-moz-" + c] = b),
                                (d["-o-" + c] = b),
                                g(a, d);
                        },
                        j = function(a, b) {
                            var c = "rgb";
                            a
                                ? ((a = String(a).replace("#", "")),
                                  3 === a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]))
                                : (a = "000000");
                            var d = [
                                parseInt(a.substr(0, 2), 16),
                                parseInt(a.substr(2, 2), 16),
                                parseInt(a.substr(4, 2), 16)
                            ];
                            return (
                                void 0 !== b && 100 !== b && ((c += "a"), d.push(b / 100)), c + "(" + d.join(",") + ")"
                            );
                        };
                    return {
                        css: f,
                        style: g,
                        clearCss: h,
                        transform: i,
                        hexToRgba: j
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(49), c(48), c(50)]),
                (e = function(a, b, c, d) {
                    function e(a) {
                        return a && a.indexOf("://") >= 0 && a.split("/")[2] !== window.location.href.split("/")[2];
                    }

                    function f(a, b, c) {
                        return function() {
                            a("Error loading file", b, c);
                        };
                    }

                    function g(a, b, c, d, e) {
                        return function() {
                            if (4 === a.readyState)
                                switch (a.status) {
                                    case 200:
                                        h(a, b, c, d, e)();
                                        break;
                                    case 404:
                                        d("File not found", b, a);
                                }
                        };
                    }

                    function h(b, d, e, f, g) {
                        return function() {
                            var h, i;
                            if (g) e(b);
                            else {
                                try {
                                    if (
                                        ((h = b.responseXML),
                                        h &&
                                            ((i = h.firstChild), h.lastChild && "parsererror" === h.lastChild.nodeName))
                                    )
                                        return void (f && f("Invalid XML", d, b));
                                } catch (j) {}
                                if (h && i) return e(b);
                                var k = c.parseXML(b.responseText);
                                if (!k || !k.firstChild) return void (f && f(b.responseText ? "Invalid XML" : d, d, b));
                                (b = a.extend({}, b, {
                                    responseXML: k
                                })),
                                    e(b);
                            }
                        };
                    }
                    var i = {};
                    return (
                        (i.ajax = function(a, c, i, j) {
                            var k,
                                l = !1;
                            if (
                                (a.indexOf("#") > 0 && (a = a.replace(/#.*$/, "")),
                                e(a) && b.exists(window.XDomainRequest))
                            )
                                (k = new window.XDomainRequest()),
                                    (k.onload = h(k, a, c, i, j)),
                                    (k.ontimeout = k.onprogress = function() {}),
                                    (k.timeout = 5e3);
                            else {
                                if (!b.exists(window.XMLHttpRequest)) return i && i("", a, k), k;
                                (k = new window.XMLHttpRequest()), (k.onreadystatechange = g(k, a, c, i, j));
                            }
                            k.overrideMimeType && k.overrideMimeType("text/xml"), (k.onerror = f(i, a, k));
                            var m = d.tryCatch(function() {
                                k.open("GET", a, !0);
                            });
                            return (
                                m instanceof d.Error && (l = !0),
                                setTimeout(function() {
                                    if (l) return void (i && i(a, a, k));
                                    var b = d.tryCatch(function() {
                                        k.send();
                                    });
                                    b instanceof d.Error && i && i(a, a, k);
                                }, 0),
                                k
                            );
                        }),
                        i
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(58), c(44), c(49), c(48), c(59)]),
                (e = function(a, b, c, d, e) {
                    var f = {};
                    return (
                        (f.repo = b.memoize(function() {
                            var b = e.split("+")[0],
                                d = a.repo + b + "/";
                            return c.isHTTPS() ? d.replace(/^http:/, "https:") : d;
                        })),
                        (f.versionCheck = function(a) {
                            var b = ("0" + a).split(/\W/),
                                c = e.split(/\W/),
                                d = parseFloat(b[0]),
                                f = parseFloat(c[0]);
                            return d > f ? !1 : d === f && parseFloat("0" + b[1]) > parseFloat(c[1]) ? !1 : !0;
                        }),
                        (f.loadFrom = function() {
                            return f.repo();
                        }),
                        f
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return {
                        repo: "http://ssl.p.jwpcdn.com/player/v/",
                        SkinsIncluded: ["seven"],
                        SkinsLoadable: ["beelden", "bekle", "five", "glow", "roundster", "six", "stormtrooper", "vapor"]
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return "7.2.2+commercial_v7-2-2.67.commercial.3db9ea.jwplayer.98ee69.analytics.57b67d.vast.96ec8a.googima.97a01c.plugin-sharing.ab95e2.plugin-related.b70424.plugin-gapro.0374cd";
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = function() {
                        var b = {},
                            c = {},
                            d = {},
                            e = {};
                        return {
                            start: function(c) {
                                (b[c] = a.now()), (d[c] = d[c] + 1 || 1);
                            },
                            end: function(d) {
                                if (b[d]) {
                                    var e = a.now() - b[d];
                                    c[d] = c[d] + e || e;
                                }
                            },
                            dump: function() {
                                return {
                                    counts: d,
                                    sums: c,
                                    events: e
                                };
                            },
                            tick: function(b, c) {
                                e[b] = c || a.now();
                            },
                            between: function(a, b) {
                                return e[b] && e[a] ? e[b] - e[a] : -1;
                            }
                        };
                    };
                    return b;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return {
                        BUFFERING: "buffering",
                        IDLE: "idle",
                        COMPLETE: "complete",
                        PAUSED: "paused",
                        PLAYING: "playing",
                        ERROR: "error",
                        LOADING: "loading",
                        STALLED: "stalled"
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(63), c(81)]),
                (e = function(a, b) {
                    var d = a.prototype.setup;
                    return (
                        (a.prototype.setup = function() {
                            d.apply(this, arguments);
                            var a = this._model.get("edition"),
                                e = b(a),
                                f = this._model.get("cast"),
                                g = this;
                            e("casting") &&
                                f &&
                                f.appid &&
                                c.e(6, function(a) {
                                    var b = c(158);
                                    (g._castController = new b(g, g._model)),
                                        (g.castToggle = g._castController.castToggle.bind(g._castController));
                                });
                        }),
                        a
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [
                c(72),
                c(115),
                c(74),
                c(44),
                c(93),
                c(111),
                c(77),
                c(114),
                c(64),
                c(47),
                c(116),
                c(46),
                c(76),
                c(61),
                c(45),
                c(156)
            ]),
                (e = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
                    function q(a) {
                        return function() {
                            var b = Array.prototype.slice.call(arguments, 0);
                            this.eventsQueue.push([a, b]);
                        };
                    }

                    function r(a) {
                        return a === n.LOADING || a === n.STALLED ? n.BUFFERING : a;
                    }
                    var s = function(a) {
                        (this.originalContainer = this.currentContainer = a),
                            (this.eventsQueue = []),
                            d.extend(this, l),
                            (this._model = new g());
                    };
                    return (
                        (s.prototype = {
                            play: q("play"),
                            pause: q("pause"),
                            setVolume: q("setVolume"),
                            setMute: q("setMute"),
                            seek: q("seek"),
                            stop: q("stop"),
                            load: q("load"),
                            playlistNext: q("playlistNext"),
                            playlistPrev: q("playlistPrev"),
                            playlistItem: q("playlistItem"),
                            setFullscreen: q("setFullscreen"),
                            setCurrentCaptions: q("setCurrentCaptions"),
                            setCurrentQuality: q("setCurrentQuality"),
                            setup: function(g, l) {
                                function p() {
                                    V.mediaModel.on("change:state", function(a, b) {
                                        var c = r(b);
                                        V.set("state", c);
                                    });
                                }

                                function q() {
                                    (Y = null),
                                        D(V.get("item")),
                                        V.on("change:state", m, this),
                                        V.on("change:castState", function(a, b) {
                                            ba.trigger(o.JWPLAYER_CAST_SESSION, b);
                                        }),
                                        V.on("change:fullscreen", function(a, b) {
                                            ba.trigger(o.JWPLAYER_FULLSCREEN, {
                                                fullscreen: b
                                            });
                                        }),
                                        V.on("itemReady", function() {
                                            ba.trigger(o.JWPLAYER_PLAYLIST_ITEM, {
                                                index: V.get("item"),
                                                item: V.get("playlistItem")
                                            });
                                        }),
                                        V.on("change:playlist", function(a, b) {
                                            b.length &&
                                                ba.trigger(o.JWPLAYER_PLAYLIST_LOADED, {
                                                    playlist: b
                                                });
                                        }),
                                        V.on("change:volume", function(a, b) {
                                            ba.trigger(o.JWPLAYER_MEDIA_VOLUME, {
                                                volume: b
                                            });
                                        }),
                                        V.on("change:mute", function(a, b) {
                                            ba.trigger(o.JWPLAYER_MEDIA_MUTE, {
                                                mute: b
                                            });
                                        }),
                                        V.on("change:controls", function(a, b) {
                                            ba.trigger(o.JWPLAYER_CONTROLS, {
                                                controls: b
                                            });
                                        }),
                                        V.on("change:scrubbing", function(a, b) {
                                            b ? y() : w();
                                        }),
                                        V.on("change:captionsList", function(a, b) {
                                            ba.trigger(o.JWPLAYER_CAPTIONS_LIST, {
                                                tracks: b,
                                                track: Q()
                                            });
                                        }),
                                        V.mediaController.on("all", ba.trigger.bind(ba)),
                                        W.on("all", ba.trigger.bind(ba)),
                                        this.showView(W.element()),
                                        window.addEventListener("beforeunload", function() {
                                            T() || x(!0);
                                        }),
                                        d.defer(s);
                                }

                                function s() {
                                    for (
                                        ba.trigger(o.JWPLAYER_READY, {
                                            setupTime: 0
                                        }),
                                            ba.trigger(o.JWPLAYER_PLAYLIST_LOADED, {
                                                playlist: V.get("playlist")
                                            }),
                                            ba.trigger(o.JWPLAYER_PLAYLIST_ITEM, {
                                                index: V.get("item"),
                                                item: V.get("playlistItem")
                                            }),
                                            ba.trigger(o.JWPLAYER_CAPTIONS_LIST, {
                                                tracks: V.get("captionsList"),
                                                track: V.get("captionsIndex")
                                            }),
                                            V.get("autostart") && w();
                                        ba.eventsQueue.length > 0;

                                    ) {
                                        var a = ba.eventsQueue.shift(),
                                            b = a[0],
                                            c = a[1] || [];
                                        ba[b].apply(ba, c);
                                    }
                                }

                                function t(a) {
                                    switch (
                                        (V.get("state") === n.ERROR && V.set("state", n.IDLE),
                                        x(!0),
                                        V.get("autostart") && V.once("itemReady", w),
                                        typeof a)
                                    ) {
                                        case "string":
                                            u(a);
                                            break;
                                        case "object":
                                            var b = C(a);
                                            b && D(0);
                                            break;
                                        case "number":
                                            D(a);
                                    }
                                }

                                function u(a) {
                                    var b = new i();
                                    b.on(o.JWPLAYER_PLAYLIST_LOADED, function(a) {
                                        t(a.playlist);
                                    }),
                                        b.on(
                                            o.JWPLAYER_ERROR,
                                            function(a) {
                                                (a.message = "Error loading playlist: " + a.message),
                                                    this.triggerError(a);
                                            },
                                            this
                                        ),
                                        b.load(a);
                                }

                                function v() {
                                    var a = ba._instreamAdapter && ba._instreamAdapter.getState();
                                    return d.isString(a) ? a : V.get("state");
                                }

                                function w() {
                                    var a;
                                    if (V.get("state") !== n.ERROR) {
                                        var b = ba._instreamAdapter && ba._instreamAdapter.getState();
                                        if (d.isString(b)) return l.pauseAd(!1);
                                        if (
                                            (V.get("state") === n.COMPLETE && (x(!0), D(0)),
                                            !_ && ((_ = !0), ba.trigger(o.JWPLAYER_MEDIA_BEFOREPLAY, {}), (_ = !1), $))
                                        )
                                            return ($ = !1), void (Z = null);
                                        if (z()) {
                                            if (0 === V.get("playlist").length) return !1;
                                            a = j.tryCatch(function() {
                                                V.loadVideo();
                                            });
                                        } else
                                            V.get("state") === n.PAUSED &&
                                                (a = j.tryCatch(function() {
                                                    V.playVideo();
                                                }));
                                        return a instanceof j.Error ? (ba.triggerError(a), (Z = null), !1) : !0;
                                    }
                                }

                                function x(a) {
                                    V.off("itemReady", w);
                                    var b = !a;
                                    Z = null;
                                    var c = j.tryCatch(function() {
                                        V.stopVideo();
                                    }, ba);
                                    return c instanceof j.Error
                                        ? (ba.triggerError(c), !1)
                                        : (b && (aa = !0), _ && ($ = !0), !0);
                                }

                                function y() {
                                    Z = null;
                                    var a = ba._instreamAdapter && ba._instreamAdapter.getState();
                                    if (d.isString(a)) return l.pauseAd(!0);
                                    switch (V.get("state")) {
                                        case n.ERROR:
                                            return !1;
                                        case n.PLAYING:
                                        case n.BUFFERING:
                                            var b = j.tryCatch(function() {
                                                ca().pause();
                                            }, this);
                                            if (b instanceof j.Error) return ba.triggerError(b), !1;
                                            break;
                                        default:
                                            _ && ($ = !0);
                                    }
                                    return !0;
                                }

                                function z() {
                                    var a = V.get("state");
                                    return a === n.IDLE || a === n.COMPLETE || a === n.ERROR;
                                }

                                function A(a) {
                                    V.get("state") !== n.ERROR &&
                                        (V.get("scrubbing") || V.get("state") === n.PLAYING || w(!0), ca().seek(a));
                                }

                                function B(a) {
                                    x(!0), D(a), w();
                                }

                                function C(a) {
                                    var b = h(a);
                                    return (
                                        (b = h.filterPlaylist(
                                            b,
                                            V.getProviders(),
                                            V.get("androidhls"),
                                            V.get("drm"),
                                            V.get("preload")
                                        )),
                                        V.set("playlist", b),
                                        d.isArray(b) && 0 !== b.length
                                            ? !0
                                            : (ba.triggerError({
                                                  message: "Error loading playlist: No playable sources found"
                                              }),
                                              !1)
                                    );
                                }

                                function D(a) {
                                    var b = V.get("playlist");
                                    (a = (a + b.length) % b.length),
                                        V.set("item", a),
                                        V.set("playlistItem", b[a]),
                                        V.setActiveItem(b[a]);
                                }

                                function E() {
                                    B(V.get("item") - 1);
                                }

                                function F() {
                                    B(V.get("item") + 1);
                                }

                                function G() {
                                    if (z()) {
                                        if (aa) return void (aa = !1);
                                        Z = G;
                                        var a = V.get("item");
                                        return a === V.get("playlist").length - 1
                                            ? void (V.get("repeat")
                                                  ? F()
                                                  : (V.set("state", n.COMPLETE),
                                                    ba.trigger(o.JWPLAYER_PLAYLIST_COMPLETE, {})))
                                            : void F();
                                    }
                                }

                                function H(a) {
                                    ca().setCurrentQuality(a);
                                }

                                function I() {
                                    return ca() ? ca().getCurrentQuality() : -1;
                                }

                                function J() {
                                    return this._model ? this._model.getConfiguration() : void 0;
                                }

                                function K() {
                                    if (this._model.mediaModel) return this._model.mediaModel.get("visualQuality");
                                    var a = L();
                                    if (a) {
                                        var b = I(),
                                            c = a[b];
                                        if (c)
                                            return {
                                                level: d.extend(
                                                    {
                                                        index: b
                                                    },
                                                    c
                                                ),
                                                mode: "",
                                                reason: ""
                                            };
                                    }
                                    return null;
                                }

                                function L() {
                                    return ca() ? ca().getQualityLevels() : null;
                                }

                                function M(a) {
                                    ca().setCurrentAudioTrack(a);
                                }

                                function N() {
                                    return ca() ? ca().getCurrentAudioTrack() : -1;
                                }

                                function O() {
                                    return ca() ? ca().getAudioTracks() : null;
                                }

                                function P(a) {
                                    V.setVideoSubtitleTrack(a),
                                        ba.trigger(o.JWPLAYER_CAPTIONS_CHANGED, {
                                            tracks: R(),
                                            track: a
                                        });
                                }

                                function Q() {
                                    return X.getCurrentIndex();
                                }

                                function R() {
                                    return X.getCaptionsList();
                                }

                                function S() {
                                    var a = V.getVideo();
                                    if (a) {
                                        var b = a.detachMedia();
                                        if (b instanceof HTMLVideoElement) return b;
                                    }
                                    return null;
                                }

                                function T() {
                                    var a = V.getVideo();
                                    return a ? a.isCaster : !1;
                                }

                                function U(a) {
                                    var b = j.tryCatch(function() {
                                        V.getVideo().attachMedia(a);
                                    });
                                    return b instanceof j.Error
                                        ? void j.log("Error calling _attachMedia", b)
                                        : void ("function" == typeof Z && Z());
                                }
                                var V,
                                    W,
                                    X,
                                    Y,
                                    Z,
                                    $,
                                    _ = !1,
                                    aa = !1,
                                    ba = this,
                                    ca = function() {
                                        return V.getVideo();
                                    },
                                    da = new a(g);
                                (V = this._model.setup(da)),
                                    (W = this._view = new k(l, V)),
                                    (X = new f(l, V)),
                                    (Y = new e(l, V, W, C)),
                                    Y.on(o.JWPLAYER_READY, q, this),
                                    Y.on(o.JWPLAYER_SETUP_ERROR, this.setupError, this),
                                    V.mediaController.on(o.JWPLAYER_MEDIA_COMPLETE, function() {
                                        d.defer(G);
                                    }),
                                    V.mediaController.on(o.JWPLAYER_MEDIA_ERROR, this.triggerError, this),
                                    V.on(
                                        "change:flashBlocked",
                                        function(a, b) {
                                            if (!b) return void this._model.set("errorEvent", void 0);
                                            var c = !!a.get("flashThrottle"),
                                                d = {
                                                    message: c ? "Click to run Flash" : "Flash plugin failed to load"
                                                };
                                            this.trigger(o.JWPLAYER_ERROR, d), this._model.set("errorEvent", d);
                                        },
                                        this
                                    ),
                                    p(),
                                    V.on("change:mediaModel", p),
                                    (this.play = w),
                                    (this.pause = y),
                                    (this.seek = A),
                                    (this.stop = x),
                                    (this.load = t),
                                    (this.playlistNext = F),
                                    (this.playlistPrev = E),
                                    (this.playlistItem = B),
                                    (this.setCurrentCaptions = P),
                                    (this.setCurrentQuality = H),
                                    (this.detachMedia = S),
                                    (this.attachMedia = U),
                                    (this.getCurrentQuality = I),
                                    (this.getQualityLevels = L),
                                    (this.setCurrentAudioTrack = M),
                                    (this.getCurrentAudioTrack = N),
                                    (this.getAudioTracks = O),
                                    (this.getCurrentCaptions = Q),
                                    (this.getCaptionsList = R),
                                    (this.getVisualQuality = K),
                                    (this.getConfig = J),
                                    (this.getState = v),
                                    (this.setVolume = V.setVolume),
                                    (this.setMute = V.setMute),
                                    (this.getProvider = function() {
                                        return V.get("provider");
                                    }),
                                    (this.getWidth = function() {
                                        return V.get("containerWidth");
                                    }),
                                    (this.getHeight = function() {
                                        return V.get("containerHeight");
                                    }),
                                    (this.getContainer = function() {
                                        return this.currentContainer;
                                    }),
                                    (this.resize = W.resize),
                                    (this.getSafeRegion = W.getSafeRegion),
                                    (this.setCues = W.addCues),
                                    (this.setFullscreen = function(a) {
                                        d.isBoolean(a) || (a = !V.get("fullscreen")),
                                            V.set("fullscreen", a),
                                            this._instreamAdapter &&
                                                this._instreamAdapter._adModel &&
                                                this._instreamAdapter._adModel.set("fullscreen", a);
                                    }),
                                    (this.addButton = function(a, b, c, e, f) {
                                        var g = {
                                                img: a,
                                                tooltip: b,
                                                callback: c,
                                                id: e,
                                                btnClass: f
                                            },
                                            h = V.get("dock");
                                        (h = h ? h.slice(0) : []),
                                            (h = d.reject(
                                                h,
                                                d.matches({
                                                    id: g.id
                                                })
                                            )),
                                            h.push(g),
                                            V.set("dock", h);
                                    }),
                                    (this.removeButton = function(a) {
                                        var b = V.get("dock") || [];
                                        (b = d.reject(
                                            b,
                                            d.matches({
                                                id: a
                                            })
                                        )),
                                            V.set("dock", b);
                                    }),
                                    (this.checkBeforePlay = function() {
                                        return _;
                                    }),
                                    (this.getItemQoe = function() {
                                        return V._qoeItem;
                                    }),
                                    (this.setControls = function(a) {
                                        d.isBoolean(a) || (a = !V.get("controls")), V.set("controls", a);
                                        var b = V.getVideo();
                                        b && b.setControls(a);
                                    }),
                                    (this.playerDestroy = function() {
                                        this.stop(),
                                            this.showView(this.originalContainer),
                                            W && W.destroy(),
                                            V && V.destroy(),
                                            Y && (Y.destroy(), (Y = null));
                                    }),
                                    (this.isBeforePlay = this.checkBeforePlay),
                                    (this.isBeforeComplete = function() {
                                        return V.getVideo().checkComplete();
                                    }),
                                    (this.createInstream = function() {
                                        return (
                                            this.instreamDestroy(),
                                            (this._instreamAdapter = new c(this, V, W)),
                                            this._instreamAdapter
                                        );
                                    }),
                                    (this.skipAd = function() {
                                        this._instreamAdapter && this._instreamAdapter.skipAd();
                                    }),
                                    (this.instreamDestroy = function() {
                                        ba._instreamAdapter && ba._instreamAdapter.destroy();
                                    }),
                                    b(l, this),
                                    Y.start();
                            },
                            showView: function(a) {
                                (document.documentElement.contains(this.currentContainer) ||
                                    ((this.currentContainer = document.getElementById(this._model.get("id"))),
                                    this.currentContainer)) &&
                                    (this.currentContainer.parentElement &&
                                        this.currentContainer.parentElement.replaceChild(a, this.currentContainer),
                                    (this.currentContainer = a));
                            },
                            triggerError: function(a) {
                                this._model.set("errorEvent", a),
                                    this._model.set("state", n.ERROR),
                                    this._model.once(
                                        "change:state",
                                        function() {
                                            this._model.set("errorEvent", void 0);
                                        },
                                        this
                                    ),
                                    this.trigger(o.JWPLAYER_ERROR, a);
                            },
                            setupError: function(a) {
                                var b = a.message,
                                    c = j.createElement(p(this._model.get("id"), this._model.get("skin"), b)),
                                    e = this._model.get("width"),
                                    f = this._model.get("height");
                                j.style(c, {
                                    width: e.toString().indexOf("%") > 0 ? e : e + "px",
                                    height: f.toString().indexOf("%") > 0 ? f : f + "px"
                                }),
                                    this.showView(c);
                                var g = this;
                                d.defer(function() {
                                    g.trigger(o.JWPLAYER_SETUP_ERROR, {
                                        message: b
                                    });
                                });
                            }
                        }),
                        s
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(65), c(66), c(47), c(45), c(46), c(44)]),
                (e = function(a, b, c, d, e, f) {
                    var g = function() {
                        function g(e) {
                            var f = c.tryCatch(function() {
                                for (
                                    var c = e.responseXML.childNodes, f = "", g = 0;
                                    g < c.length && ((f = c[g]), 8 === f.nodeType);
                                    g++
                                );
                                if (("xml" === a.localName(f) && (f = f.nextSibling), "rss" !== a.localName(f)))
                                    return void i("Not a valid RSS feed");
                                var h = b.parse(f);
                                k.trigger(d.JWPLAYER_PLAYLIST_LOADED, {
                                    playlist: h
                                });
                            });
                            f instanceof c.Error && i();
                        }

                        function h(a) {
                            i(a.match(/invalid/i) ? "Not a valid RSS feed" : "");
                        }

                        function i(a) {
                            k.trigger(d.JWPLAYER_ERROR, {
                                message: a ? a : "Error loading file"
                            });
                        }
                        var j,
                            k = f.extend(this, e);
                        (this.load = function(a) {
                            j = c.ajax(a, g, h);
                        }),
                            (this.destroy = function() {
                                this.off(), (j = null);
                            });
                    };
                    return g;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51)]),
                (e = function(a) {
                    return {
                        localName: function(a) {
                            return a ? (a.localName ? a.localName : a.baseName ? a.baseName : "") : "";
                        },
                        textContent: function(b) {
                            return b ? (b.textContent ? a.trim(b.textContent) : b.text ? a.trim(b.text) : "") : "";
                        },
                        getChildNode: function(a, b) {
                            return a.childNodes[b];
                        },
                        numChildren: function(a) {
                            return a.childNodes ? a.childNodes.length : 0;
                        }
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51), c(65), c(67), c(68), c(69)]),
                (e = function(a, b, c, d, e) {
                    function f(b) {
                        for (var f = {}, h = 0; h < b.childNodes.length; h++) {
                            var i = b.childNodes[h],
                                k = j(i);
                            if (k)
                                switch (k.toLowerCase()) {
                                    case "enclosure":
                                        f.file = a.xmlAttribute(i, "url");
                                        break;
                                    case "title":
                                        f.title = g(i);
                                        break;
                                    case "guid":
                                        f.mediaid = g(i);
                                        break;
                                    case "pubdate":
                                        f.date = g(i);
                                        break;
                                    case "description":
                                        f.description = g(i);
                                        break;
                                    case "link":
                                        f.link = g(i);
                                        break;
                                    case "category":
                                        f.tags ? (f.tags += g(i)) : (f.tags = g(i));
                                }
                        }
                        return (f = d(b, f)), (f = c(b, f)), new e(f);
                    }
                    var g = b.textContent,
                        h = b.getChildNode,
                        i = b.numChildren,
                        j = b.localName,
                        k = {};
                    return (
                        (k.parse = function(a) {
                            for (var b = [], c = 0; c < i(a); c++) {
                                var d = h(a, c),
                                    e = j(d).toLowerCase();
                                if ("channel" === e)
                                    for (var g = 0; g < i(d); g++) {
                                        var k = h(d, g);
                                        "item" === j(k).toLowerCase() && b.push(f(k));
                                    }
                            }
                            return b;
                        }),
                        k
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(65), c(51), c(47)]),
                (e = function(a, b, c) {
                    var d = "jwplayer",
                        e = function(e, f) {
                            for (
                                var g = [],
                                    h = [],
                                    i = b.xmlAttribute,
                                    j = "default",
                                    k = "label",
                                    l = "file",
                                    m = "type",
                                    n = 0;
                                n < e.childNodes.length;
                                n++
                            ) {
                                var o = e.childNodes[n];
                                if (o.prefix === d) {
                                    var p = a.localName(o);
                                    "source" === p
                                        ? (delete f.sources,
                                          g.push({
                                              file: i(o, l),
                                              default: i(o, j),
                                              label: i(o, k),
                                              type: i(o, m)
                                          }))
                                        : "track" === p
                                        ? (delete f.tracks,
                                          h.push({
                                              file: i(o, l),
                                              default: i(o, j),
                                              kind: i(o, "kind"),
                                              label: i(o, k)
                                          }))
                                        : ((f[p] = c.serialize(a.textContent(o))),
                                          "file" === p && f.sources && delete f.sources);
                                }
                                f[l] || (f[l] = f.link);
                            }
                            if (g.length)
                                for (f.sources = [], n = 0; n < g.length; n++)
                                    g[n].file.length > 0 &&
                                        ((g[n][j] = "true" === g[n][j] ? !0 : !1),
                                        g[n].label.length || delete g[n].label,
                                        f.sources.push(g[n]));
                            if (h.length)
                                for (f.tracks = [], n = 0; n < h.length; n++)
                                    h[n].file.length > 0 &&
                                        ((h[n][j] = "true" === h[n][j] ? !0 : !1),
                                        (h[n].kind = h[n].kind.length ? h[n].kind : "captions"),
                                        h[n].label.length || delete h[n].label,
                                        f.tracks.push(h[n]));
                            return f;
                        };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(65), c(51), c(47)]),
                (e = function(a, b, c) {
                    var d = b.xmlAttribute,
                        e = a.localName,
                        f = a.textContent,
                        g = a.numChildren,
                        h = "media",
                        i = function(a, b) {
                            function j(a) {
                                var b = {
                                    zh: "Chinese",
                                    nl: "Dutch",
                                    en: "English",
                                    fr: "French",
                                    de: "German",
                                    it: "Italian",
                                    ja: "Japanese",
                                    pt: "Portuguese",
                                    ru: "Russian",
                                    es: "Spanish"
                                };
                                return b[a] ? b[a] : a;
                            }
                            var k,
                                l,
                                m = "tracks",
                                n = [];
                            for (l = 0; l < g(a); l++)
                                if (((k = a.childNodes[l]), k.prefix === h)) {
                                    if (!e(k)) continue;
                                    switch (e(k).toLowerCase()) {
                                        case "content":
                                            d(k, "duration") && (b.duration = c.seconds(d(k, "duration"))),
                                                g(k) > 0 && (b = i(k, b)),
                                                d(k, "url") &&
                                                    (b.sources || (b.sources = []),
                                                    b.sources.push({
                                                        file: d(k, "url"),
                                                        type: d(k, "type"),
                                                        width: d(k, "width"),
                                                        label: d(k, "label")
                                                    }));
                                            break;
                                        case "title":
                                            b.title = f(k);
                                            break;
                                        case "description":
                                            b.description = f(k);
                                            break;
                                        case "guid":
                                            b.mediaid = f(k);
                                            break;
                                        case "thumbnail":
                                            b.image || (b.image = d(k, "url"));
                                            break;
                                        case "player":
                                            break;
                                        case "group":
                                            i(k, b);
                                            break;
                                        case "subtitle":
                                            var o = {};
                                            (o.file = d(k, "url")),
                                                (o.kind = "captions"),
                                                d(k, "lang").length > 0 && (o.label = j(d(k, "lang"))),
                                                n.push(o);
                                    }
                                }
                            for (b.hasOwnProperty(m) || (b[m] = []), l = 0; l < n.length; l++) b[m].push(n[l]);
                            return b;
                        };
                    return i;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(70), c(71)]),
                (e = function(a, b, c) {
                    var d = {
                            sources: [],
                            tracks: []
                        },
                        e = function(e) {
                            (e = e || {}), a.isArray(e.tracks) || delete e.tracks;
                            var f = a.extend({}, d, e);
                            a.isObject(f.sources) && !a.isArray(f.sources) && (f.sources = [b(f.sources)]),
                                (a.isArray(f.sources) && 0 !== f.sources.length) ||
                                    (e.levels ? (f.sources = e.levels) : (f.sources = [b(e)]));
                            for (var g = 0; g < f.sources.length; g++) {
                                var h = f.sources[g];
                                if (h) {
                                    var i = h["default"];
                                    i ? (h["default"] = "true" === i.toString()) : (h["default"] = !1),
                                        f.sources[g].label || (f.sources[g].label = g.toString()),
                                        (f.sources[g] = b(f.sources[g]));
                                }
                            }
                            return (
                                (f.sources = a.compact(f.sources)),
                                a.isArray(f.tracks) || (f.tracks = []),
                                a.isArray(f.captions) && ((f.tracks = f.tracks.concat(f.captions)), delete f.captions),
                                (f.tracks = a.compact(a.map(f.tracks, c))),
                                f
                            );
                        };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(51), c(44)]),
                (e = function(a, b, c) {
                    var d = {
                            default: !1
                        },
                        e = function(e) {
                            if (e && e.file) {
                                var f = c.extend({}, d, e);
                                f.file = b.trim("" + f.file);
                                var g = /^[^\/]+\/(?:x-)?([^\/]+)$/;
                                if ((g.test(f.type) && (f.type = f.type.replace(g, "$1")), !f.type))
                                    if (a.isYouTube(f.file)) f.type = "youtube";
                                    else if (a.isRtmp(f.file)) f.type = "rtmp";
                                    else {
                                        var h = b.extension(f.file);
                                        f.type = h;
                                    }
                                if (f.type)
                                    return (
                                        "m3u8" === f.type && (f.type = "hls"),
                                        "smil" === f.type && (f.type = "rtmp"),
                                        "m4a" === f.type && (f.type = "aac"),
                                        c.each(f, function(a, b) {
                                            "" === a && delete f[b];
                                        }),
                                        f
                                    );
                            }
                        };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = {
                            kind: "captions",
                            default: !1
                        },
                        c = function(c) {
                            return c && c.file ? a.extend({}, b, c) : void 0;
                        };
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(73), c(44)]),
                (e = function(a, b, d) {
                    function e(b) {
                        d.each(b, function(c, d) {
                            b[d] = a.serialize(c);
                        });
                    }

                    function f(a) {
                        return a.slice && "px" === a.slice(-2) && (a = a.slice(0, -2)), a;
                    }

                    function g(b, c) {
                        if (-1 === c.toString().indexOf("%")) return 0;
                        if ("string" != typeof b || !a.exists(b)) return 0;
                        var d = b.indexOf(":");
                        if (-1 === d) return 0;
                        var e = parseFloat(b.substr(0, d)),
                            f = parseFloat(b.substr(d + 1));
                        return 0 >= e || 0 >= f ? 0 : (f / e) * 100 + "%";
                    }
                    var h = {
                            autostart: !1,
                            controls: !0,
                            displaytitle: !0,
                            displaydescription: !0,
                            mobilecontrols: !1,
                            repeat: !1,
                            castAvailable: !1,
                            skin: "seven",
                            stretching: b.UNIFORM,
                            mute: !1,
                            volume: 90,
                            width: 480,
                            height: 270
                        },
                        i = function(b) {
                            var i = d.extend({}, (window.jwplayer || {}).defaults, b);
                            e(i);
                            var j = d.extend({}, h, i);
                            if (
                                ("." === j.base && (j.base = a.getScriptPath("jwplayer.js")),
                                (j.base = (j.base || a.loadFrom()).replace(/\/?$/, "/")),
                                (c.p = j.base),
                                (j.width = f(j.width)),
                                (j.height = f(j.height)),
                                (j.flashplayer =
                                    j.flashplayer || a.getScriptPath("jwplayer.js") + "jwplayer.flash.swf"),
                                "http:" === window.location.protocol &&
                                    (j.flashplayer = j.flashplayer.replace("https", "http")),
                                (j.aspectratio = g(j.aspectratio, j.width)),
                                d.isObject(j.skin) &&
                                    ((j.skinUrl = j.skin.url),
                                    (j.skinColorInactive = j.skin.inactive),
                                    (j.skinColorActive = j.skin.active),
                                    (j.skinColorBackground = j.skin.background),
                                    (j.skin = d.isString(j.skin.name) ? j.skin.name : h.skin)),
                                d.isString(j.skin) &&
                                    j.skin.indexOf(".xml") > 0 &&
                                    (console.log("JW Player does not support XML skins, please update your config"),
                                    (j.skin = j.skin.replace(".xml", ""))),
                                j.aspectratio || delete j.aspectratio,
                                !j.playlist)
                            ) {
                                var k = d.pick(j, [
                                    "title",
                                    "description",
                                    "type",
                                    "mediaid",
                                    "image",
                                    "file",
                                    "sources",
                                    "tracks",
                                    "preload"
                                ]);
                                j.playlist = [k];
                            }
                            return j;
                        };
                    return i;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(47), c(55)]),
                (e = function(a, b, c) {
                    var d = {
                            NONE: "none",
                            FILL: "fill",
                            UNIFORM: "uniform",
                            EXACTFIT: "exactfit"
                        },
                        e = function(a, b, d, e, f) {
                            var g = "";
                            (b = b || 1),
                                (d = d || 1),
                                (e = 0 | e),
                                (f = 0 | f),
                                (1 !== b || 1 !== d) && (g = "scale(" + b + ", " + d + ")"),
                                (e || f) && (g && (g += " "), (g += "translate(" + e + "px, " + f + "px)")),
                                c.transform(a, g);
                        },
                        f = e,
                        g = function(e, g, h, i, j, k) {
                            if (!g) return !1;
                            if (!(h && i && j && k)) return !1;
                            e = e || d.UNIFORM;
                            var l = (2 * Math.ceil(h / 2)) / j,
                                m = (2 * Math.ceil(i / 2)) / k,
                                n = "video" === g.tagName.toLowerCase(),
                                o = !1,
                                p = "jw-stretch-" + e.toLowerCase(),
                                q = !1;
                            switch (e.toLowerCase()) {
                                case d.FILL:
                                    l > m ? (m = l) : (l = m), (o = !0);
                                    break;
                                case d.NONE:
                                    l = m = 1;
                                case d.EXACTFIT:
                                    o = !0;
                                    break;
                                case d.UNIFORM:
                                default:
                                    l > m
                                        ? ((j * m) / h > 0.95
                                              ? ((o = !0), (p = "jw-stretch-exactfit"))
                                              : ((j *= m), (k *= m)),
                                          (q = !0))
                                        : ((k * l) / i > 0.95
                                              ? ((o = !0), (p = "jw-stretch-exactfit"))
                                              : ((j *= l), (k *= l)),
                                          (q = !1)),
                                        o && ((l = (2 * Math.ceil(h / 2)) / j), (m = (2 * Math.ceil(i / 2)) / k));
                            }
                            if (n) {
                                var r = {
                                    left: "",
                                    right: "",
                                    width: "",
                                    height: ""
                                };
                                if (
                                    (o
                                        ? (j > h && (r.left = r.right = Math.ceil((h - j) / 2)),
                                          k > i && (r.top = r.bottom = Math.ceil((i - k) / 2)),
                                          (r.width = j),
                                          (r.height = k),
                                          f(g, l, m, 0, 0))
                                        : ((o = !1), c.transform(g)),
                                    b.isIOS(8) && o === !1)
                                ) {
                                    var s = {
                                        width: "auto",
                                        height: "auto"
                                    };
                                    e.toLowerCase() === d.UNIFORM && (s[q === !1 ? "width" : "height"] = "100%"),
                                        a.extend(r, s);
                                }
                                c.style(g, r);
                            } else
                                g.className =
                                    g.className.replace(/\s*jw\-stretch\-(none|exactfit|uniform|fill)/g, "") + " " + p;
                            return o;
                        };
                    return {
                        scale: e,
                        stretching: d,
                        stretch: g
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(75), c(92), c(45), c(61), c(47), c(46), c(44)]),
                (e = function(a, b, c, d, e, f, g) {
                    function h(c) {
                        var d = c.get("provider").name || "";
                        return d.indexOf("flash") >= 0 ? b : a;
                    }
                    var i = {
                            skipoffset: null,
                            tag: null
                        },
                        j = function(a, b, f) {
                            function j(a, b) {
                                (b = b || {}), u.tag && !b.tag && (b.tag = u.tag), this.trigger(a, b);
                            }

                            function k(a) {
                                s._adModel.set("duration", a.duration), s._adModel.set("position", a.position);
                            }

                            function l(a) {
                                if (m && t + 1 < m.length) {
                                    s._adModel.set("state", "buffering"), b.set("skipButton", !1), t++;
                                    var d,
                                        e = m[t];
                                    n && (d = n[t]), this.loadItem(e, d);
                                } else
                                    a.type === c.JWPLAYER_MEDIA_COMPLETE &&
                                        (j.call(this, a.type, a), this.trigger(c.JWPLAYER_PLAYLIST_COMPLETE, {})),
                                        this.destroy();
                            }
                            var m,
                                n,
                                o,
                                p,
                                q,
                                r = h(b),
                                s = new r(a, b),
                                t = 0,
                                u = {},
                                v = g.bind(function(a) {
                                    (a = a || {}),
                                        (a.hasControls = !!b.get("controls")),
                                        this.trigger(c.JWPLAYER_INSTREAM_CLICK, a),
                                        s &&
                                            s._adModel &&
                                            (s._adModel.get("state") === d.PAUSED
                                                ? a.hasControls && s.instreamPlay()
                                                : s.instreamPause());
                                }, this),
                                w = g.bind(function() {
                                    s &&
                                        s._adModel &&
                                        s._adModel.get("state") === d.PAUSED &&
                                        b.get("controls") &&
                                        (a.setFullscreen(), a.play());
                                }, this);
                            (this.type = "instream"),
                                (this.init = function() {
                                    (o = b.getVideo()),
                                        (p = b.get("position")),
                                        (q = b.get("playlist")[b.get("item")]),
                                        s.on("all", j, this),
                                        s.on(c.JWPLAYER_MEDIA_TIME, k, this),
                                        s.on(c.JWPLAYER_MEDIA_COMPLETE, l, this),
                                        s.init(),
                                        o.detachMedia(),
                                        b.mediaModel.set("state", d.BUFFERING),
                                        a.checkBeforePlay() || (0 === p && !o.checkComplete())
                                            ? ((p = 0), b.set("preInstreamState", "instream-preroll"))
                                            : (o && o.checkComplete()) || b.get("state") === d.COMPLETE
                                            ? b.set("preInstreamState", "instream-postroll")
                                            : b.set("preInstreamState", "instream-midroll");
                                    var g = b.get("state");
                                    return (
                                        (g === d.PLAYING || g === d.BUFFERING) && o.pause(),
                                        f.setupInstream(s._adModel),
                                        s._adModel.set("state", d.BUFFERING),
                                        f.clickHandler().setAlternateClickHandlers(e.noop, null),
                                        this.setText("Loading ad"),
                                        this
                                    );
                                }),
                                (this.loadItem = function(a, d) {
                                    if (e.isAndroid(2.3))
                                        return void this.trigger({
                                            type: c.JWPLAYER_ERROR,
                                            message: "Error loading instream: Cannot play instream on Android 2.3"
                                        });
                                    g.isArray(a) && ((m = a), (n = d), (a = m[t]), n && (d = n[t])),
                                        this.trigger(c.JWPLAYER_PLAYLIST_ITEM, {
                                            index: t,
                                            item: a
                                        }),
                                        (u = g.extend({}, i, d)),
                                        s.load(a),
                                        this.addClickHandler();
                                    var f = a.skipoffset || u.skipoffset;
                                    f &&
                                        (s._adModel.set("skipMessage", u.skipMessage),
                                        s._adModel.set("skipText", u.skipText),
                                        s._adModel.set("skipOffset", f),
                                        b.set("skipButton", !0));
                                }),
                                (this.play = function() {
                                    s.instreamPlay();
                                }),
                                (this.pause = function() {
                                    s.instreamPause();
                                }),
                                (this.hide = function() {
                                    s.hide();
                                }),
                                (this.addClickHandler = function() {
                                    f.clickHandler().setAlternateClickHandlers(v, w),
                                        s.on(c.JWPLAYER_MEDIA_META, this.metaHandler, this);
                                }),
                                (this.skipAd = function(a) {
                                    var b = c.JWPLAYER_AD_SKIPPED;
                                    this.trigger(b, a),
                                        l.call(this, {
                                            type: b
                                        });
                                }),
                                (this.metaHandler = function(a) {
                                    a.width && a.height && f.resizeMedia();
                                }),
                                (this.destroy = function() {
                                    if ((this.off(), b.set("skipButton", !1), s)) {
                                        f.clickHandler() && f.clickHandler().revertAlternateClickHandlers(),
                                            s.instreamDestroy(),
                                            f.destroyInstream(),
                                            (s = null),
                                            a.attachMedia();
                                        var c = b.get("preInstreamState");
                                        switch (c) {
                                            case "instream-preroll":
                                            case "instream-midroll":
                                                var h = g.extend({}, q);
                                                (h.starttime = p),
                                                    b.loadVideo(h),
                                                    e.isMobile() &&
                                                        b.mediaModel.get("state") === d.BUFFERING &&
                                                        o.setState(d.BUFFERING),
                                                    o.play();
                                                break;
                                            case "instream-postroll":
                                            case "instream-idle":
                                                o.stop();
                                        }
                                    }
                                }),
                                (this.getState = function() {
                                    return s && s._adModel ? s._adModel.get("state") : !1;
                                }),
                                (this.setText = function(a) {
                                    f.setAltText(a ? a : "");
                                }),
                                (this.hide = function() {
                                    f.useExternalControls();
                                });
                        };
                    return g.extend(j.prototype, f), j;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(46), c(76), c(45), c(61), c(77)]),
                (e = function(a, b, c, d, e, f) {
                    var g = function(g, h) {
                        function i() {
                            var b = m.getVideo();
                            if (n !== b) {
                                if (((n = b), !b)) return;
                                b.off(),
                                    b.on(
                                        "all",
                                        function(b, c) {
                                            (c = a.extend({}, c, {
                                                type: b
                                            })),
                                                this.trigger(b, c);
                                        },
                                        o
                                    ),
                                    b.on(d.JWPLAYER_MEDIA_BUFFER_FULL, l),
                                    b.on(d.JWPLAYER_PLAYER_STATE, j),
                                    b.attachMedia(),
                                    b.mute(h.get("mute")),
                                    b.volume(h.get("volume")),
                                    m.on("change:state", c, o);
                            }
                        }

                        function j(a) {
                            switch (a.newstate) {
                                case e.PLAYING:
                                    m.set("state", a.newstate);
                                    break;
                                case e.PAUSED:
                                    m.set("state", a.newstate);
                            }
                        }

                        function k(a) {
                            h.trigger(a.type, a),
                                o.trigger(d.JWPLAYER_FULLSCREEN, {
                                    fullscreen: a.jwstate
                                });
                        }

                        function l() {
                            m.getVideo().play();
                        }
                        var m,
                            n,
                            o = a.extend(this, b);
                        return (
                            g.on(
                                d.JWPLAYER_FULLSCREEN,
                                function(a) {
                                    this.trigger(d.JWPLAYER_FULLSCREEN, a);
                                },
                                o
                            ),
                            (this.init = function() {
                                (m = new f().setup({
                                    id: h.get("id"),
                                    volume: h.get("volume"),
                                    fullscreen: h.get("fullscreen"),
                                    mute: h.get("mute")
                                })),
                                    m.on("fullscreenchange", k),
                                    (this._adModel = m);
                            }),
                            (o.load = function(a) {
                                m.set("item", 0),
                                    m.set("playlistItem", a),
                                    m.setActiveItem(a),
                                    i(),
                                    m.off(d.JWPLAYER_ERROR),
                                    m.on(
                                        d.JWPLAYER_ERROR,
                                        function(a) {
                                            this.trigger(d.JWPLAYER_ERROR, a);
                                        },
                                        o
                                    ),
                                    m.loadVideo(a);
                            }),
                            (this.instreamDestroy = function() {
                                m &&
                                    (m.off(),
                                    this.off(),
                                    n && (n.detachMedia(), n.off(), n.destroy()),
                                    (m = null),
                                    g.off(null, null, this),
                                    (g = null));
                            }),
                            (o.instreamPlay = function() {
                                m.getVideo() && m.getVideo().play(!0);
                            }),
                            (o.instreamPause = function() {
                                m.getVideo() && m.getVideo().pause(!0);
                            }),
                            o
                        );
                    };
                    return g;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(61)]),
                (e = function(a) {
                    function b(b) {
                        return b === a.COMPLETE || b === a.ERROR ? a.IDLE : b;
                    }
                    return function(a, c, d) {
                        if (((c = b(c)), (d = b(d)), c !== d)) {
                            var e = c.replace(/(?:ing|d)$/, ""),
                                f = {
                                    type: e,
                                    newstate: c,
                                    oldstate: d,
                                    reason: a.mediaModel.get("state")
                                };
                            this.trigger(e, f);
                        }
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(78), c(89), c(90), c(44), c(46), c(91), c(45), c(61)]),
                (e = function(a, b, c, d, e, f, g, h, i) {
                    var j = ["volume", "mute", "captionLabel", "qualityLabel"],
                        k = function() {
                            function g(a, b) {
                                switch (a) {
                                    case "flashThrottle":
                                        var c = "resume" !== b.state;
                                        this.set("flashThrottle", c), this.set("flashBlocked", c);
                                        break;
                                    case "flashBlocked":
                                        return void this.set("flashBlocked", !0);
                                    case "flashUnblocked":
                                        return void this.set("flashBlocked", !1);
                                    case "volume":
                                    case "mute":
                                        return void this.set(a, b[a]);
                                    case h.JWPLAYER_MEDIA_TYPE:
                                        this.mediaModel.set("mediaType", b.mediaType);
                                        break;
                                    case h.JWPLAYER_PLAYER_STATE:
                                        return void this.mediaModel.set("state", b.newstate);
                                    case h.JWPLAYER_MEDIA_BUFFER:
                                        this.set("buffer", b.bufferPercent);
                                    case h.JWPLAYER_MEDIA_META:
                                        var d = b.duration;
                                        e.isNumber(d) && (this.mediaModel.set("duration", d), this.set("duration", d));
                                        break;
                                    case h.JWPLAYER_MEDIA_BUFFER_FULL:
                                        this.mediaModel.get("playAttempt")
                                            ? this.playVideo()
                                            : this.mediaModel.on(
                                                  "change:playAttempt",
                                                  function() {
                                                      this.playVideo();
                                                  },
                                                  this
                                              );
                                        break;
                                    case h.JWPLAYER_MEDIA_TIME:
                                        this.mediaModel.set("position", b.position),
                                            this.mediaModel.set("duration", b.duration),
                                            this.set("position", b.position),
                                            this.set("duration", b.duration);
                                        break;
                                    case h.JWPLAYER_PROVIDER_CHANGED:
                                        this.set("provider", m.getName());
                                        break;
                                    case h.JWPLAYER_MEDIA_LEVELS:
                                        this.setQualityLevel(b.currentQuality, b.levels),
                                            this.mediaModel.set("levels", b.levels);
                                        break;
                                    case h.JWPLAYER_MEDIA_LEVEL_CHANGED:
                                        this.setQualityLevel(b.currentQuality, b.levels),
                                            this.persistQualityLevel(b.currentQuality, b.levels);
                                        break;
                                    case h.JWPLAYER_AUDIO_TRACKS:
                                        this.setCurrentAudioTrack(b.currentTrack, b.tracks),
                                            this.mediaModel.set("audioTracks", b.tracks);
                                        break;
                                    case h.JWPLAYER_AUDIO_TRACK_CHANGED:
                                        this.setCurrentAudioTrack(b.currentTrack, b.tracks);
                                        break;
                                    case "visualQuality":
                                        var f = e.extend({}, b);
                                        this.mediaModel.set("visualQuality", f);
                                }
                                var g = e.extend({}, b, {
                                    type: a
                                });
                                this.mediaController.trigger(a, g);
                            }
                            var k,
                                m,
                                n = this,
                                o = a.noop;
                            (this.mediaController = e.extend({}, f)),
                                (this.mediaModel = new l()),
                                d.model(this),
                                this.set("mediaModel", this.mediaModel),
                                (this.setup = function(b) {
                                    var d = new c();
                                    return (
                                        d.track(j, this),
                                        e.extend(this.attributes, b, d.getAllItems(), {
                                            item: 0,
                                            state: i.IDLE,
                                            flashBlocked: !1,
                                            fullscreen: !1,
                                            compactUI: !1,
                                            scrubbing: !1,
                                            duration: 0,
                                            position: 0,
                                            buffer: 0
                                        }),
                                        a.isMobile() && !b.mobileSdk && this.set("autostart", !1),
                                        this.updateProviders(),
                                        this
                                    );
                                }),
                                (this.getConfiguration = function() {
                                    return e.omit(this.clone(), ["mediaModel"]);
                                }),
                                (this.updateProviders = function() {
                                    k = new b(this.getConfiguration());
                                }),
                                (this.setQualityLevel = function(a, b) {
                                    a > -1 &&
                                        b.length > 1 &&
                                        "youtube" !== m.getName().name &&
                                        this.mediaModel.set("currentLevel", parseInt(a));
                                }),
                                (this.persistQualityLevel = function(a, b) {
                                    var c = b[a] || {},
                                        d = c.label;
                                    this.set("qualityLabel", d);
                                }),
                                (this.setCurrentAudioTrack = function(a, b) {
                                    a > -1 && b.length > 1 && this.mediaModel.set("currentAudioTrack", parseInt(a));
                                }),
                                (this.onMediaContainer = function() {
                                    var a = this.get("mediaContainer");
                                    o.setContainer(a);
                                }),
                                (this.changeVideoProvider = function(a) {
                                    this.off("change:mediaContainer", this.onMediaContainer),
                                        m && (m.off(null, null, this), m.getContainer() && m.remove()),
                                        (o = new a(n.get("id"), n.getConfiguration()));
                                    var b = this.get("mediaContainer");
                                    b ? o.setContainer(b) : this.once("change:mediaContainer", this.onMediaContainer),
                                        this.set("provider", o.getName()),
                                        -1 === o.getName().name.indexOf("flash") &&
                                            (this.set("flashThrottle", void 0), this.set("flashBlocked", !1)),
                                        (m = o),
                                        m.volume(n.get("volume")),
                                        m.mute(n.get("mute")),
                                        m.on("all", g, this);
                                }),
                                (this.destroy = function() {
                                    m && (m.off(null, null, this), m.destroy());
                                }),
                                (this.getVideo = function() {
                                    return m;
                                }),
                                (this.setFullscreen = function(a) {
                                    (a = !!a), a !== n.get("fullscreen") && n.set("fullscreen", a);
                                }),
                                (this.chooseProvider = function(a) {
                                    return k.choose(a).provider;
                                }),
                                (this.setActiveItem = function(a) {
                                    this.mediaModel.off(),
                                        (this.mediaModel = new l()),
                                        this.set("mediaModel", this.mediaModel);
                                    var b = a && a.sources && a.sources[0];
                                    if (void 0 !== b) {
                                        var c = this.chooseProvider(b);
                                        if (!c) throw new Error("No suitable provider found");
                                        o instanceof c || n.changeVideoProvider(c),
                                            o.init && o.init(a),
                                            this.trigger("itemReady", a);
                                    }
                                }),
                                (this.getProviders = function() {
                                    return k;
                                }),
                                (this.resetProvider = function() {
                                    o = null;
                                }),
                                (this.setVolume = function(a) {
                                    (a = Math.round(a)), n.set("volume", a), m && m.volume(a);
                                    var b = 0 === a;
                                    b !== n.get("mute") && n.setMute(b);
                                }),
                                (this.setMute = function(b) {
                                    if ((a.exists(b) || (b = !n.get("mute")), n.set("mute", b), m && m.mute(b), !b)) {
                                        var c = Math.max(10, n.get("volume"));
                                        this.setVolume(c);
                                    }
                                }),
                                (this.loadVideo = function(a) {
                                    if (
                                        (this.mediaModel.set("playAttempt", !0),
                                        this.mediaController.trigger(h.JWPLAYER_MEDIA_PLAY_ATTEMPT),
                                        !a)
                                    ) {
                                        var b = this.get("item");
                                        a = this.get("playlist")[b];
                                    }
                                    this.set("position", a.starttime || 0),
                                        this.set("duration", a.duration || 0),
                                        m.load(a);
                                }),
                                (this.stopVideo = function() {
                                    m && m.stop();
                                }),
                                (this.playVideo = function() {
                                    m.play();
                                }),
                                (this.persistCaptionsTrack = function() {
                                    var a = this.get("captionsTrack");
                                    a ? this.set("captionLabel", a.label) : this.set("captionLabel", "Off");
                                }),
                                (this.setVideoSubtitleTrack = function(a) {
                                    this.set("captionsIndex", a),
                                        this.persistCaptionsTrack(),
                                        m.setSubtitlesTrack && m.setSubtitlesTrack(a);
                                });
                        },
                        l = (k.MediaModel = function() {
                            this.set("state", i.IDLE);
                        });
                    return e.extend(k.prototype, g), e.extend(l.prototype, g), k;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(79)]),
                (e = function(a) {
                    return (
                        (a.prototype.providerSupports = function(a, b) {
                            return a.supports(b, this.config.edition);
                        }),
                        a
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(80), c(84), c(44)]),
                (e = function(a, b, c) {
                    function d(b) {
                        (this.providers = a.slice()),
                            (this.config = b || {}),
                            "flash" === this.config.primary && f(this.providers, "html5", "flash");
                    }

                    function e(a, b) {
                        for (var c = 0; c < a.length; c++) if (a[c].name === b) return c;
                        return -1;
                    }

                    function f(a, b, c) {
                        var d = e(a, b),
                            f = e(a, c),
                            g = a[d];
                        (a[d] = a[f]), (a[f] = g);
                    }
                    return (
                        c.extend(d.prototype, {
                            providerSupports: function(a, b) {
                                return a.supports(b);
                            },
                            choose: function(a) {
                                a = c.isObject(a) ? a : {};
                                for (var d = this.providers.length, e = 0; d > e; e++) {
                                    var f = this.providers[e];
                                    if (this.providerSupports(f, a)) {
                                        var g = d - e - 1;
                                        return {
                                            priority: g,
                                            name: f.name,
                                            type: a.type,
                                            provider: b[f.name]
                                        };
                                    }
                                }
                                return null;
                            }
                        }),
                        d
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(81), c(44), c(82)]),
                (e = function(a, b, c, d) {
                    function e(c, d) {
                        var e = b(d);
                        if (!e("dash")) return !1;
                        if (c.drm && !e("drm")) return !1;
                        if (!window.MediaSource) return !1;
                        if (!a.isChrome() && !a.isEdge()) return !1;
                        var f = c.file || "";
                        return "dash" === c.type ||
                            "mpd" === c.type ||
                            f.indexOf(".mpd") > -1 ||
                            f.indexOf("mpd-time-csf") > -1
                            ? !0
                            : !1;
                    }
                    var f = c.find(
                            d,
                            c.matches({
                                name: "flash"
                            })
                        ),
                        g = f.supports;
                    return (
                        (f.supports = function(c, d) {
                            if (!a.isFlashSupported()) return !1;
                            var e = c && c.type;
                            if ("hls" === e || "m3u8" === e) {
                                var f = b(d);
                                return f("hls");
                            }
                            return g.apply(this, arguments);
                        }),
                        d.push({
                            name: "dashjs",
                            supports: c.constant(!1)
                        }),
                        d.push({
                            name: "shaka",
                            supports: e
                        }),
                        d
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = {
                            setup: ["free", "premium", "enterprise", "ads", "trial"],
                            "custom-rightclick": ["free", "premium", "enterprise", "ads", "trial"],
                            dash: ["premium", "enterprise", "ads", "trial"],
                            drm: ["enterprise", "ads", "trial"],
                            hls: ["premium", "ads", "enterprise", "trial"],
                            ads: ["ads", "trial"],
                            casting: ["premium", "enterprise", "ads", "trial"]
                        },
                        c = function(c) {
                            return function(d) {
                                return a.contains(b[d], c);
                            };
                        };
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(44), c(83)]),
                (e = function(a, b, c) {
                    function d(b) {
                        if ("hls" === b.type)
                            if (b.androidhls !== !1) {
                                var c = a.isAndroidNative;
                                if (c(2) || c(3) || c("4.0")) return !1;
                                if (a.isAndroid()) return !0;
                            } else if (a.isAndroid()) return !1;
                        return null;
                    }
                    var e = [
                        {
                            name: "youtube",
                            supports: function(b) {
                                return a.isYouTube(b.file, b.type);
                            }
                        },
                        {
                            name: "html5",
                            supports: function(b) {
                                var e = {
                                        aac: "audio/mp4",
                                        mp4: "video/mp4",
                                        f4v: "video/mp4",
                                        m4v: "video/mp4",
                                        mov: "video/mp4",
                                        mp3: "audio/mpeg",
                                        mpeg: "audio/mpeg",
                                        ogv: "video/ogg",
                                        ogg: "video/ogg",
                                        oga: "video/ogg",
                                        vorbis: "video/ogg",
                                        webm: "video/webm",
                                        f4a: "video/aac",
                                        m3u8: "application/vnd.apple.mpegurl",
                                        m3u: "application/vnd.apple.mpegurl",
                                        hls: "application/vnd.apple.mpegurl"
                                    },
                                    f = b.file,
                                    g = b.type,
                                    h = d(b);
                                if (null !== h) return h;
                                if (a.isRtmp(f, g)) return !1;
                                if (!e[g]) return !1;
                                if (c.canPlayType) {
                                    var i = c.canPlayType(e[g]);
                                    return !!i;
                                }
                                return !1;
                            }
                        },
                        {
                            name: "flash",
                            supports: function(c) {
                                var d = {
                                        flv: "video",
                                        f4v: "video",
                                        mov: "video",
                                        m4a: "video",
                                        m4v: "video",
                                        mp4: "video",
                                        aac: "video",
                                        f4a: "video",
                                        mp3: "sound",
                                        mpeg: "sound",
                                        smil: "rtmp"
                                    },
                                    e = b.keys(d);
                                if (!a.isFlashSupported()) return !1;
                                var f = c.file,
                                    g = c.type;
                                return a.isRtmp(f, g) ? !0 : b.contains(e, g);
                            }
                        }
                    ];
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return document.createElement("video");
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(85), c(87)]),
                (e = function(a, b) {
                    var c = {
                        html5: a,
                        flash: b
                    };
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(55), c(47), c(73), c(44), c(45), c(61), c(86), c(46)]),
                (e = function(a, b, c, d, e, f, g, h) {
                    function i(a, c) {
                        b.foreach(a, function(a, b) {
                            c.addEventListener(a, b, !1);
                        });
                    }

                    function j(a, c) {
                        b.foreach(a, function(a, b) {
                            c.removeEventListener(a, b, !1);
                        });
                    }

                    function k(a) {
                        if ("hls" === a.type)
                            if (a.androidhls !== !1) {
                                var c = b.isAndroidNative;
                                if (c(2) || c(3) || c("4.0")) return !1;
                                if (b.isAndroid()) return !0;
                            } else if (b.isAndroid()) return !1;
                        return null;
                    }

                    function l(l, u) {
                        function v(a) {
                            da.trigger("click", a);
                        }

                        function w() {
                            ja && (z(T(), aa, pa.duration), B(pa.duration));
                        }

                        function x() {
                            ja && z(T(), aa, _);
                        }

                        function y() {
                            m(ha),
                                (fa = !0),
                                ja &&
                                    (da.state === f.STALLED
                                        ? da.setState(f.PLAYING)
                                        : da.state === f.PLAYING && (ha = setTimeout(S, n)),
                                    B(pa.duration),
                                    A(pa.currentTime),
                                    z(T(), aa, _),
                                    da.state === f.PLAYING &&
                                        da.trigger(e.JWPLAYER_MEDIA_TIME, {
                                            position: aa,
                                            duration: _
                                        }));
                        }

                        function z(a, b, c) {
                            (a !== ia || c !== _) &&
                                ((ia = a),
                                da.trigger(e.JWPLAYER_MEDIA_BUFFER, {
                                    bufferPercent: 100 * a,
                                    position: b,
                                    duration: c
                                }));
                        }

                        function A(a) {
                            aa = a;
                        }

                        function B(a) {
                            (_ = a), ga > 0 && _ > ga && da.seek(ga);
                        }

                        function C() {
                            da.trigger(e.JWPLAYER_MEDIA_META, {
                                duration: pa.duration,
                                height: pa.videoHeight,
                                width: pa.videoWidth
                            }),
                                B(pa.duration);
                        }

                        function D() {
                            ja && ((fa = !0), F());
                        }

                        function E() {
                            ja && (pa.muted && ((pa.muted = !1), (pa.muted = !0)), C());
                        }

                        function F() {
                            ba || ((ba = !0), da.trigger(e.JWPLAYER_MEDIA_BUFFER_FULL));
                        }

                        function G() {
                            da.setState(f.PLAYING), da.trigger(e.JWPLAYER_PROVIDER_FIRST_FRAME, {});
                        }

                        function H() {
                            da.state !== f.COMPLETE && pa.currentTime !== pa.duration && da.setState(f.PAUSED);
                        }

                        function I() {
                            la ||
                                pa.paused ||
                                pa.ended ||
                                (da.state !== f.LOADING &&
                                    da.state !== f.ERROR &&
                                    (da.seeking || da.setState(f.STALLED)));
                        }

                        function J() {
                            ja &&
                                (b.log("Error playing media: %o %s", pa.error, pa.src || $.file),
                                da.trigger(e.JWPLAYER_MEDIA_ERROR, {
                                    message: "Error loading media: File could not be played"
                                }));
                        }

                        function K(a) {
                            var c;
                            return (
                                "array" === b.typeOf(a) &&
                                    a.length > 0 &&
                                    (c = d.map(a, function(a, b) {
                                        return {
                                            label: a.label || b
                                        };
                                    })),
                                c
                            );
                        }

                        function L(a) {
                            (ca = a), (ka = M(a));
                            var b = K(a);
                            b &&
                                da.trigger(e.JWPLAYER_MEDIA_LEVELS, {
                                    levels: b,
                                    currentQuality: ka
                                });
                        }

                        function M(a) {
                            var b = Math.max(0, ka),
                                c = u.qualityLabel;
                            if (a)
                                for (var d = 0; d < a.length; d++)
                                    if ((a[d]["default"] && (b = d), c && a[d].label === c)) return d;
                            return b;
                        }

                        function N() {
                            return p || q;
                        }

                        function O(a, c) {
                            ($ = ca[ka]), (ga = 0), m(ha);
                            var d = pa.src !== $.file;
                            d || N()
                                ? ((_ = c), P(), pa.load())
                                : (0 === a && 0 !== pa.currentTime && ((ga = -1), da.seek(a)), pa.play()),
                                (aa = pa.currentTime),
                                p && (F(), pa.paused || da.state === f.PLAYING || da.setState(f.LOADING)),
                                b.isIOS() && da.getFullScreen() && (pa.controls = !0),
                                a > 0 && da.seek(a);
                        }

                        function P() {
                            (fa = !1),
                                (ba = !1),
                                (la = k($)),
                                (pa.src = $.file),
                                $.preload && pa.setAttribute("preload", $.preload);
                        }

                        function Q() {
                            (da.seeking = !1), da.trigger(e.JWPLAYER_MEDIA_SEEKED);
                        }

                        function R() {
                            da.trigger("volume", {
                                volume: Math.round(100 * pa.volume)
                            }),
                                da.trigger("mute", {
                                    mute: pa.muted
                                });
                        }

                        function S() {
                            pa.currentTime === aa && I();
                        }

                        function T() {
                            var a = pa.buffered,
                                c = pa.duration;
                            return !a || 0 === a.length || 0 >= c || c === 1 / 0
                                ? 0
                                : b.between(a.end(a.length - 1) / c, 0, 1);
                        }

                        function U() {
                            if (ja && da.state !== f.IDLE && da.state !== f.COMPLETE) {
                                if ((m(ha), (ka = -1), (ma = !0), da.trigger(e.JWPLAYER_MEDIA_BEFORECOMPLETE), !ja))
                                    return;
                                V();
                            }
                        }

                        function V() {
                            m(ha), da.setState(f.COMPLETE), (ma = !1), da.trigger(e.JWPLAYER_MEDIA_COMPLETE);
                        }

                        function W(a) {
                            (na = !0), Y(a), b.isIOS() && (pa.controls = !1);
                        }

                        function X(a) {
                            (na = !1), Y(a), b.isIOS() && (pa.controls = !1);
                        }

                        function Y(a) {
                            da.trigger("fullscreenchange", {
                                target: a.target,
                                jwstate: na
                            });
                        }
                        (this.state = f.IDLE),
                            (this.seeking = !1),
                            d.extend(this, h),
                            (this.trigger = function(a, b) {
                                return ja ? h.trigger.call(this, a, b) : void 0;
                            }),
                            (this.setState = function(a) {
                                return ja ? g.setState.call(this, a) : void 0;
                            });
                        var Z,
                            $,
                            _,
                            aa,
                            ba,
                            ca,
                            da = this,
                            ea = {
                                click: v,
                                durationchange: w,
                                ended: U,
                                error: J,
                                loadedmetadata: E,
                                canplay: D,
                                playing: G,
                                progress: x,
                                pause: H,
                                seeked: Q,
                                timeupdate: y,
                                volumechange: R,
                                webkitbeginfullscreen: W,
                                webkitendfullscreen: X
                            },
                            fa = !1,
                            ga = 0,
                            ha = -1,
                            ia = -1,
                            ja = !0,
                            ka = -1,
                            la = null,
                            ma = !1,
                            na = !1,
                            oa = document.getElementById(l),
                            pa = oa ? oa.querySelector("video") : void 0;
                        (pa = pa || document.createElement("video")),
                            (pa.className = "jw-video jw-reset"),
                            i(ea, pa),
                            s || ((pa.controls = !0), (pa.controls = !1)),
                            pa.setAttribute("x-webkit-airplay", "allow"),
                            pa.setAttribute("webkit-playsinline", ""),
                            (this.stop = function() {
                                m(ha),
                                    ja &&
                                        (pa.removeAttribute("src"),
                                        o || pa.load(),
                                        b.isIETrident() && pa.pause(),
                                        (ka = -1),
                                        this.setState(f.IDLE));
                            }),
                            (this.destroy = function() {
                                j(ea, pa), this.remove(), this.off();
                            }),
                            (this.init = function(a) {
                                ja &&
                                    ((ca = a.sources),
                                    (ka = M(a.sources)),
                                    this.sendMediaType(a.sources),
                                    ($ = ca[ka]),
                                    (aa = a.starttime || 0),
                                    (_ = a.duration || 0),
                                    P(a));
                            }),
                            (this.load = function(a) {
                                ja &&
                                    (L(a.sources),
                                    this.sendMediaType(a.sources),
                                    p || da.setState(f.LOADING),
                                    O(a.starttime || 0, a.duration || 0));
                            }),
                            (this.play = function() {
                                return da.seeking
                                    ? (da.setState(f.LOADING), void da.once(e.JWPLAYER_MEDIA_SEEKED, da.play))
                                    : void pa.play();
                            }),
                            (this.pause = function() {
                                m(ha), pa.pause(), this.setState(f.PAUSED);
                            }),
                            (this.seek = function(a) {
                                if (ja)
                                    if (
                                        (0 === ga &&
                                            this.trigger(e.JWPLAYER_MEDIA_SEEK, {
                                                position: pa.currentTime,
                                                offset: a
                                            }),
                                        fa)
                                    ) {
                                        ga = 0;
                                        var c = b.tryCatch(function() {
                                            (da.seeking = !0), (pa.currentTime = a);
                                        });
                                        c instanceof b.Error && (ga = a);
                                    } else ga = a;
                            }),
                            (this.volume = function(a) {
                                (a = b.between(a / 100, 0, 1)), (pa.volume = a);
                            }),
                            (this.mute = function(a) {
                                pa.muted = !!a;
                            }),
                            (this.checkComplete = function() {
                                return ma;
                            }),
                            (this.detachMedia = function() {
                                return m(ha), (ja = !1), pa;
                            }),
                            (this.attachMedia = function(a) {
                                (ja = !0), a || (fa = !1), (this.seeking = !1), (pa.loop = !1), ma && V();
                            }),
                            (this.setContainer = function(a) {
                                (Z = a), a.appendChild(pa);
                            }),
                            (this.getContainer = function() {
                                return Z;
                            }),
                            (this.remove = function() {
                                pa && (pa.removeAttribute("src"), o || pa.load()),
                                    m(ha),
                                    (ka = -1),
                                    Z === pa.parentNode && Z.removeChild(pa);
                            }),
                            (this.setVisibility = function(b) {
                                (b = !!b),
                                    b || r
                                        ? a.style(Z, {
                                              visibility: "visible",
                                              opacity: 1
                                          })
                                        : a.style(Z, {
                                              visibility: "",
                                              opacity: 0
                                          });
                            }),
                            (this.resize = function(a, b, d) {
                                return c.stretch(d, pa, a, b, pa.videoWidth, pa.videoHeight);
                            }),
                            (this.setFullscreen = function(a) {
                                if ((a = !!a)) {
                                    var c = b.tryCatch(function() {
                                        var a = pa.webkitEnterFullscreen || pa.webkitEnterFullScreen;
                                        a && a.apply(pa);
                                    });
                                    return c instanceof b.Error ? !1 : da.getFullScreen();
                                }
                                var d = pa.webkitExitFullscreen || pa.webkitExitFullScreen;
                                return d && d.apply(pa), a;
                            }),
                            (da.getFullScreen = function() {
                                return na || !!pa.webkitDisplayingFullscreen;
                            }),
                            (this.setCurrentQuality = function(a) {
                                if (ka !== a && ((a = parseInt(a, 10)), a >= 0 && ca && ca.length > a)) {
                                    (ka = a),
                                        this.trigger(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                                            currentQuality: a,
                                            levels: K(ca)
                                        }),
                                        (u.qualityLabel = ca[a].label);
                                    var b = pa.currentTime || 0,
                                        c = pa.duration || 0;
                                    0 >= c && (c = _), da.setState(f.LOADING), O(b, c);
                                }
                            }),
                            (this.getCurrentQuality = function() {
                                return ka;
                            }),
                            (this.getQualityLevels = function() {
                                return K(ca);
                            }),
                            (this.getName = function() {
                                return {
                                    name: t
                                };
                            });
                    }
                    var m = window.clearTimeout,
                        n = 256,
                        o = b.isMSIE(),
                        p = b.isMobile(),
                        q = b.isSafari(),
                        r = b.isAndroidNative(),
                        s = b.isIOS(7),
                        t = "html5",
                        u = function() {};
                    return (u.prototype = g), (l.prototype = new u()), l;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(45), c(61), c(44)]),
                (e = function(a, b, c, d) {
                    var e = a.noop,
                        f = d.constant(!1),
                        g = {
                            supports: f,
                            play: e,
                            load: e,
                            stop: e,
                            volume: e,
                            mute: e,
                            seek: e,
                            resize: e,
                            remove: e,
                            destroy: e,
                            setVisibility: e,
                            setFullscreen: f,
                            getFullscreen: e,
                            getContainer: e,
                            setContainer: f,
                            getName: e,
                            getQualityLevels: e,
                            getCurrentQuality: e,
                            setCurrentQuality: e,
                            getAudioTracks: e,
                            getCurrentAudioTrack: e,
                            setCurrentAudioTrack: e,
                            checkComplete: e,
                            setControls: e,
                            attachMedia: e,
                            detachMedia: e,
                            setState: function(a) {
                                var d = this.state || c.IDLE;
                                (this.state = a),
                                    a !== d &&
                                        this.trigger(b.JWPLAYER_PLAYER_STATE, {
                                            newstate: a
                                        });
                            },
                            sendMediaType: function(a) {
                                var c = a[0].type,
                                    d = "oga" === c || "aac" === c || "mp3" === c || "mpeg" === c || "vorbis" === c;
                                this.trigger(b.JWPLAYER_MEDIA_TYPE, {
                                    mediaType: d ? "audio" : "video"
                                });
                            }
                        };
                    return g;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(44), c(45), c(61), c(88), c(86), c(46)]),
                (e = function(a, b, c, d, e, f, g) {
                    function h(a) {
                        return a + "_swf_" + j++;
                    }

                    function i(i, j) {
                        function k(a) {
                            if (B)
                                for (var b = 0; b < a.length; b++) {
                                    var c = a[b];
                                    if (c.bitrate) {
                                        var d = Math.round(c.bitrate / 1024);
                                        c.label = l(d);
                                    }
                                }
                        }

                        function l(a) {
                            var b = B[a];
                            if (!b) {
                                for (var c = 1 / 0, d = B.bitrates.length; d--; ) {
                                    var e = Math.abs(B.bitrates[d] - a);
                                    if (e > c) break;
                                    c = e;
                                }
                                (b = B.labels[B.bitrates[d + 1]]), (B[a] = b);
                            }
                            return b;
                        }

                        function m() {
                            var a = j.hlslabels;
                            if (!a) return null;
                            var b = {},
                                c = [];
                            for (var d in a) {
                                var e = parseFloat(d);
                                if (!isNaN(e)) {
                                    var f = Math.round(e);
                                    (b[f] = a[d]), c.push(f);
                                }
                            }
                            return 0 === c.length
                                ? null
                                : (c.sort(function(a, b) {
                                      return a - b;
                                  }),
                                  {
                                      labels: b,
                                      bitrates: c
                                  });
                        }
                        var n,
                            o,
                            p,
                            q = null,
                            r = -1,
                            s = !1,
                            t = -1,
                            u = null,
                            v = -1,
                            w = null,
                            x = !0,
                            y = !1,
                            z = function() {
                                return o && o.__ready;
                            },
                            A = function() {
                                o && o.triggerFlash.apply(o, arguments);
                            },
                            B = m();
                        b.extend(this, g, {
                            init: function(a) {
                                a.preload && "none" !== a.preload && !j.autostart && (q = a);
                            },
                            load: function(a) {
                                (q = a),
                                    (s = !1),
                                    this.setState(d.LOADING),
                                    A("load", a),
                                    this.sendMediaType(a.sources);
                            },
                            play: function() {
                                A("play");
                            },
                            pause: function() {
                                A("pause"), this.setState(d.PAUSED);
                            },
                            stop: function() {
                                A("stop"), (t = -1), (q = null), this.setState(d.IDLE);
                            },
                            seek: function(a) {
                                A("seek", a);
                            },
                            volume: function(a) {
                                if (b.isNumber(a)) {
                                    var c = Math.min(Math.max(0, a), 100);
                                    z() && A("volume", c);
                                }
                            },
                            mute: function(a) {
                                z() && A("mute", a);
                            },
                            setState: function() {
                                return f.setState.apply(this, arguments);
                            },
                            checkComplete: function() {
                                return s;
                            },
                            attachMedia: function() {
                                (x = !0),
                                    s && (this.setState(d.COMPLETE), this.trigger(c.JWPLAYER_MEDIA_COMPLETE), (s = !1));
                            },
                            detachMedia: function() {
                                return (x = !1), null;
                            },
                            getSwfObject: function(a) {
                                var b = a.getElementsByTagName("object")[0];
                                return b ? (b.off(null, null, this), b) : e.embed(j.flashplayer, a, h(i), j.wmode);
                            },
                            getContainer: function() {
                                return n;
                            },
                            setContainer: function(e) {
                                if (n !== e) {
                                    (n = e), (o = this.getSwfObject(e));
                                    var f = this;
                                    (r = setTimeout(function() {
                                        g.trigger.call(f, "flashBlocked");
                                    }, 4e3)),
                                        o.once(
                                            "embedded",
                                            function() {
                                                clearTimeout(r), g.trigger.call(f, "flashUnblocked");
                                            },
                                            this
                                        ),
                                        o.once(
                                            "ready",
                                            function() {
                                                clearTimeout(r),
                                                    o.once("pluginsLoaded", function() {
                                                        (o.queueCommands = !1),
                                                            A("setupCommandQueue", o.__commandQueue),
                                                            (o.__commandQueue = []);
                                                    });
                                                var d = b.extend(
                                                        {
                                                            watchThrottle: a.isChrome()
                                                        },
                                                        j
                                                    ),
                                                    e = o.triggerFlash("setup", d);
                                                e === o ? (o.__ready = !0) : this.trigger(c.JWPLAYER_MEDIA_ERROR, e),
                                                    q && A("init", q);
                                            },
                                            this
                                        );
                                    var h = [
                                            c.JWPLAYER_MEDIA_META,
                                            c.JWPLAYER_MEDIA_ERROR,
                                            c.JWPLAYER_MEDIA_SEEK,
                                            c.JWPLAYER_MEDIA_SEEKED,
                                            "subtitlesTracks",
                                            "subtitlesTrackChanged",
                                            "subtitlesTrackData"
                                        ],
                                        i = [c.JWPLAYER_MEDIA_BUFFER, c.JWPLAYER_MEDIA_TIME],
                                        l = [c.JWPLAYER_MEDIA_BUFFER_FULL];
                                    o.on(
                                        c.JWPLAYER_MEDIA_LEVELS,
                                        function(a) {
                                            k(a.levels),
                                                (t = a.currentQuality),
                                                (u = a.levels),
                                                this.trigger(a.type, a);
                                        },
                                        this
                                    ),
                                        o.on(
                                            c.JWPLAYER_MEDIA_LEVEL_CHANGED,
                                            function(a) {
                                                k(a.levels),
                                                    (t = a.currentQuality),
                                                    (u = a.levels),
                                                    this.trigger(a.type, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_AUDIO_TRACKS,
                                            function(a) {
                                                (v = a.currentTrack), (w = a.tracks), this.trigger(a.type, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_AUDIO_TRACK_CHANGED,
                                            function(a) {
                                                (v = a.currentTrack), (w = a.tracks), this.trigger(a.type, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_PLAYER_STATE,
                                            function(a) {
                                                var b = a.newstate;
                                                b !== d.IDLE && this.setState(b);
                                            },
                                            this
                                        ),
                                        o.on(
                                            i.join(" "),
                                            function(a) {
                                                "Infinity" === a.duration && (a.duration = 1 / 0),
                                                    this.trigger(a.type, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            h.join(" "),
                                            function(a) {
                                                this.trigger(a.type, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            l.join(" "),
                                            function(a) {
                                                this.trigger(a.type);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_MEDIA_BEFORECOMPLETE,
                                            function(a) {
                                                (s = !0), this.trigger(a.type), x === !0 && (s = !1);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_MEDIA_COMPLETE,
                                            function(a) {
                                                s || (this.setState(d.COMPLETE), this.trigger(a.type));
                                            },
                                            this
                                        ),
                                        o.on(
                                            "visualQuality",
                                            function(a) {
                                                (a.reason = a.reason || "api"),
                                                    this.trigger("visualQuality", a),
                                                    this.trigger(c.JWPLAYER_PROVIDER_FIRST_FRAME, {});
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_PROVIDER_CHANGED,
                                            function(a) {
                                                (p = a.message), this.trigger(c.JWPLAYER_PROVIDER_CHANGED, a);
                                            },
                                            this
                                        ),
                                        o.on(
                                            c.JWPLAYER_ERROR,
                                            function(b) {
                                                a.log("Error playing media: %o %s", b.code, b.message, b),
                                                    this.trigger(c.JWPLAYER_MEDIA_ERROR, b);
                                            },
                                            this
                                        ),
                                        a.isChrome() &&
                                            o.on(
                                                "throttle",
                                                function(a) {
                                                    clearTimeout(r),
                                                        "resume" === a.state
                                                            ? g.trigger.call(f, "flashThrottle", a)
                                                            : (r = setTimeout(function() {
                                                                  g.trigger.call(f, "flashThrottle", a);
                                                              }, 250));
                                                },
                                                this
                                            );
                                }
                            },
                            remove: function() {
                                (t = -1), (u = null), e.remove(o);
                            },
                            setVisibility: function(a) {
                                (a = !!a), (n.style.opacity = a ? 1 : 0);
                            },
                            resize: function(a, b, c) {
                                c && A("stretch", c);
                            },
                            setControls: function(a) {
                                A("setControls", a);
                            },
                            setFullscreen: function(a) {
                                (y = a), A("fullscreen", a);
                            },
                            getFullScreen: function() {
                                return y;
                            },
                            setCurrentQuality: function(a) {
                                A("setCurrentQuality", a);
                            },
                            getCurrentQuality: function() {
                                return t;
                            },
                            setSubtitlesTrack: function(a) {
                                A("setSubtitlesTrack", a);
                            },
                            getName: function() {
                                return p
                                    ? {
                                          name: "flash_" + p
                                      }
                                    : {
                                          name: "flash"
                                      };
                            },
                            getQualityLevels: function() {
                                return u || q.sources;
                            },
                            getAudioTracks: function() {
                                return w;
                            },
                            getCurrentAudioTrack: function() {
                                return v;
                            },
                            setCurrentAudioTrack: function(a) {
                                A("setCurrentAudioTrack", a);
                            },
                            destroy: function() {
                                this.remove(), o && (o.off(), (o = null)), (n = null), (q = null), this.off();
                            }
                        }),
                            (this.trigger = function(a, b) {
                                return x ? g.trigger.call(this, a, b) : void 0;
                            });
                    }
                    var j = 0,
                        k = function() {};
                    return (k.prototype = f), (i.prototype = new k()), i;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(46), c(44)]),
                (e = function(a, b, c) {
                    function d(a, b, c) {
                        var d = document.createElement("param");
                        d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d);
                    }

                    function e(e, f, h, i) {
                        var j;
                        if (((i = i || "opaque"), a.isMSIE())) {
                            var k = document.createElement("div");
                            f.appendChild(k),
                                (k.outerHTML =
                                    '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="' +
                                    h +
                                    '" name="' +
                                    h +
                                    '" tabindex="0"><param name="movie" value="' +
                                    e +
                                    '"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="' +
                                    i +
                                    '"><param name="bgcolor" value="' +
                                    g +
                                    '"><param name="menu" value="false"></object>');
                            for (var l = f.getElementsByTagName("object"), m = l.length; m--; )
                                l[m].id === h && (j = l[m]);
                        } else
                            (j = document.createElement("object")),
                                j.setAttribute("type", "application/x-shockwave-flash"),
                                j.setAttribute("data", e),
                                j.setAttribute("width", "100%"),
                                j.setAttribute("height", "100%"),
                                j.setAttribute("bgcolor", g),
                                j.setAttribute("id", h),
                                j.setAttribute("name", h),
                                d(j, "allowfullscreen", "true"),
                                d(j, "allowscriptaccess", "always"),
                                d(j, "wmode", i),
                                d(j, "menu", "false"),
                                f.appendChild(j, f);
                        return (
                            (j.className = "jw-swf jw-reset"),
                            (j.style.display = "block"),
                            (j.style.position = "absolute"),
                            (j.style.left = 0),
                            (j.style.right = 0),
                            (j.style.top = 0),
                            (j.style.bottom = 0),
                            c.extend(j, b),
                            (j.queueCommands = !0),
                            (j.triggerFlash = function(b) {
                                var c = this;
                                if (("setup" !== b && c.queueCommands) || !c.__externalCall) {
                                    for (var d = c.__commandQueue, e = d.length; e--; ) d[e][0] === b && d.splice(e, 1);
                                    return d.push(Array.prototype.slice.call(arguments)), c;
                                }
                                var f = Array.prototype.slice.call(arguments, 1),
                                    g = a.tryCatch(function() {
                                        if (f.length) {
                                            var a = JSON.stringify(f);
                                            c.__externalCall(b, a);
                                        } else c.__externalCall(b);
                                    });
                                return g instanceof a.Error && (console.error(b, g), "setup" === b)
                                    ? ((g.name = "Failed to setup flash"), g)
                                    : c;
                            }),
                            (j.__commandQueue = []),
                            j
                        );
                    }

                    function f(a) {
                        a && a.parentNode && ((a.style.display = "none"), a.parentNode.removeChild(a));
                    }
                    var g = "#000000";
                    return {
                        embed: e,
                        remove: f
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(47)]),
                (e = function(a, b) {
                    function c(a) {
                        return "jwplayer." + a;
                    }

                    function d() {
                        return a.reduce(
                            this.persistItems,
                            function(a, d) {
                                var e = j[c(d)];
                                return e && (a[d] = b.serialize(e)), a;
                            },
                            {}
                        );
                    }

                    function e(a, b) {
                        try {
                            j[c(a)] = b;
                        } catch (d) {
                            i && i.debug && console.error(d);
                        }
                    }

                    function f() {
                        a.each(this.persistItems, function(a) {
                            j.removeItem(c(a));
                        });
                    }

                    function g() {}

                    function h(b, c) {
                        (this.persistItems = b),
                            a.each(this.persistItems, function(a) {
                                c.on("change:" + a, function(b, c) {
                                    e(a, c);
                                });
                            });
                    }
                    var i = window.jwplayer,
                        j = window.localStorage || {
                            removeItem: b.noop
                        };
                    return (
                        a.extend(g.prototype, {
                            getAllItems: d,
                            track: h,
                            clear: f
                        }),
                        g
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(60), c(45), c(44)]),
                (e = function(a, b, c) {
                    function d(a) {
                        a.mediaController.off(b.JWPLAYER_MEDIA_PLAY_ATTEMPT, a._onPlayAttempt),
                            a.mediaController.off(b.JWPLAYER_PROVIDER_FIRST_FRAME, a._triggerFirstFrame),
                            a.mediaController.off(b.JWPLAYER_MEDIA_TIME, a._onTime);
                    }

                    function e(a) {
                        d(a),
                            (a._triggerFirstFrame = c.once(function() {
                                var c = a._qoeItem;
                                c.tick(b.JWPLAYER_MEDIA_FIRST_FRAME);
                                var e = c.between(b.JWPLAYER_MEDIA_PLAY_ATTEMPT, b.JWPLAYER_MEDIA_FIRST_FRAME);
                                a.mediaController.trigger(b.JWPLAYER_MEDIA_FIRST_FRAME, {
                                    loadTime: e
                                }),
                                    d(a);
                            })),
                            (a._onTime = g(a._triggerFirstFrame)),
                            (a._onPlayAttempt = function() {
                                a._qoeItem.tick(b.JWPLAYER_MEDIA_PLAY_ATTEMPT);
                            }),
                            a.mediaController.once(b.JWPLAYER_MEDIA_PLAY_ATTEMPT, a._onPlayAttempt),
                            a.mediaController.once(b.JWPLAYER_PROVIDER_FIRST_FRAME, a._triggerFirstFrame),
                            a.mediaController.on(b.JWPLAYER_MEDIA_TIME, a._onTime);
                    }

                    function f(c) {
                        function d(c, d, f) {
                            c._qoeItem && f && c._qoeItem.end(f.get("state")),
                                (c._qoeItem = new a()),
                                c._qoeItem.tick(b.JWPLAYER_PLAYLIST_ITEM),
                                c._qoeItem.start(d.get("state")),
                                e(c),
                                d.on("change:state", function(a, b, d) {
                                    c._qoeItem.end(d), c._qoeItem.start(b);
                                });
                        }
                        c.on("change:mediaModel", d);
                    }
                    var g = function(a) {
                        var b = Number.MIN_VALUE;
                        return function(c) {
                            c.position > b && a(), (b = c.position);
                        };
                    };
                    return {
                        model: f
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(46)]),
                (e = function(a, b) {
                    var c = a.extend(
                        {
                            get: function(a) {
                                return (this.attributes = this.attributes || {}), this.attributes[a];
                            },
                            set: function(a, b) {
                                if (((this.attributes = this.attributes || {}), this.attributes[a] !== b)) {
                                    var c = this.attributes[a];
                                    (this.attributes[a] = b), this.trigger("change:" + a, this, b, c);
                                }
                            },
                            clone: function() {
                                return a.clone(this.attributes);
                            }
                        },
                        b
                    );
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(46), c(77), c(76), c(45), c(61), c(47), c(44)]),
                (e = function(a, b, c, d, e, f, g) {
                    var h = function(a, d) {
                        (this.model = d),
                            (this._adModel = new b().setup({
                                id: d.get("id"),
                                volume: d.get("volume"),
                                fullscreen: d.get("fullscreen"),
                                mute: d.get("mute")
                            })),
                            this._adModel.on("change:state", c, this);
                        var e = a.getContainer();
                        (this.swf = e.querySelector("object")), (this.flashBlockedTimeout = -1);
                    };
                    return (
                        (h.prototype = g.extend(
                            {
                                init: function() {
                                    f.isChrome() &&
                                        this.swf.on(
                                            "throttle",
                                            function(a) {
                                                if ((clearTimeout(this.flashBlockedTimeout), "resume" === a.state))
                                                    this.instreamPlay();
                                                else {
                                                    var b = this;
                                                    this.flashBlockedTimeout = setTimeout(function() {
                                                        b.instreamPause();
                                                    }, 250);
                                                }
                                            },
                                            this
                                        ),
                                        this.swf
                                            .on(
                                                "instream:state",
                                                function(a) {
                                                    switch (a.newstate) {
                                                        case e.PLAYING:
                                                            this._adModel.set("state", a.newstate);
                                                            break;
                                                        case e.PAUSED:
                                                            this._adModel.set("state", a.newstate);
                                                    }
                                                },
                                                this
                                            )
                                            .on(
                                                "instream:time",
                                                function(a) {
                                                    this._adModel.set("position", a.position),
                                                        this._adModel.set("duration", a.duration),
                                                        this.trigger(d.JWPLAYER_MEDIA_TIME, a);
                                                },
                                                this
                                            )
                                            .on(
                                                "instream:complete",
                                                function(a) {
                                                    this.trigger(d.JWPLAYER_MEDIA_COMPLETE, a);
                                                },
                                                this
                                            )
                                            .on(
                                                "instream:error",
                                                function(a) {
                                                    this.trigger(d.JWPLAYER_MEDIA_ERROR, a);
                                                },
                                                this
                                            ),
                                        this.swf.triggerFlash("instream:init");
                                },
                                instreamDestroy: function() {
                                    this._adModel &&
                                        (this.off(),
                                        this.swf.off(null, null, this),
                                        this.swf.triggerFlash("instream:destroy"),
                                        (this.swf = null),
                                        this._adModel.off(),
                                        (this._adModel = null),
                                        (this.model = null));
                                },
                                load: function(a) {
                                    this.swf.triggerFlash("instream:load", a);
                                },
                                instreamPlay: function() {
                                    this.swf.triggerFlash("instream:play");
                                },
                                instreamPause: function() {
                                    this.swf.triggerFlash("instream:pause");
                                }
                            },
                            a
                        )),
                        h
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(94), c(46), c(44), c(45)]),
                (e = function(a, b, c, d) {
                    var e = function(b, e, f, g) {
                        function h() {
                            m("Setup Timeout Error", "Setup took longer than " + q + " seconds to complete.");
                        }

                        function i() {
                            c.each(p, function(a) {
                                a.complete !== !0 &&
                                    a.running !== !0 &&
                                    null !== b &&
                                    k(a.depends) &&
                                    ((a.running = !0), j(a));
                            });
                        }

                        function j(a) {
                            var c = function(b) {
                                (b = b || {}), l(a, b);
                            };
                            a.method(c, e, b, f, g);
                        }

                        function k(a) {
                            return c.all(a, function(a) {
                                return p[a].complete;
                            });
                        }

                        function l(a, b) {
                            "error" === b.type
                                ? m(b.msg, b.reason)
                                : "complete" === b.type
                                ? (clearTimeout(n), o.trigger(d.JWPLAYER_READY))
                                : ((a.complete = !0), i());
                        }

                        function m(a, b) {
                            clearTimeout(n),
                                o.trigger(d.JWPLAYER_SETUP_ERROR, {
                                    message: a + ": " + b
                                }),
                                o.destroy();
                        }
                        var n,
                            o = this,
                            p = a.getQueue(),
                            q = 30;
                        (this.start = function() {
                            (n = setTimeout(h, 1e3 * q)), i();
                        }),
                            (this.destroy = function() {
                                clearTimeout(n), this.off(), (p.length = 0), (b = null), (e = null), (f = null);
                            });
                    };
                    return (e.prototype = b), e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(95), c(81), c(80), c(44), c(47), c(97)]),
                (e = function(a, b, d, e, f, g) {
                    function h(a, b, c) {
                        if (b) {
                            var d = b.client;
                            delete b.client, /\.(js|swf)$/.test(d || "") || (d = f.repo() + c), (a[d] = b);
                        }
                    }

                    function i(a, c) {
                        var d = e.clone(c.get("plugins")) || {},
                            g = c.get("edition"),
                            i = b(g),
                            j = /\.(js|swf)$/,
                            k = f.repo(),
                            l = c.get("advertising");
                        i("ads") &&
                            l &&
                            (j.test(l.client) ? (d[l.client] = l) : (d[k + l.client + ".js"] = l), delete l.client);
                        var m = c.get("analytics");
                        e.isObject(m) || (m = {}),
                            h(d, m, "jwpsrv.js"),
                            h(d, c.get("ga"), "gapro.js"),
                            h(d, c.get("sharing"), "sharing.js"),
                            h(d, c.get("related"), "related.js"),
                            c.set("plugins", d),
                            a();
                    }

                    function j(b, c) {
                        var d = c.get("key") || (window.jwplayer && window.jwplayer.key),
                            e = new a(d),
                            f = e.edition();
                        c.set("key", d),
                            c.set("edition", f),
                            c.updateProviders(),
                            "invalid" === f
                                ? g.error(
                                      b,
                                      "Error setting up player",
                                      (void 0 === d ? "Missing" : "Invalid") + " license key"
                                  )
                                : b();
                    }

                    function k(a, b, d) {
                        "dashjs" === a
                            ? c.e(4, function(a) {
                                  var e = c(107);
                                  e.register(window.jwplayer), d.updateProviders(), b();
                              })
                            : c.e(5, function(a) {
                                  var e = c(109);
                                  e.register(window.jwplayer), d.updateProviders(), b();
                              });
                    }

                    function l(a, b) {
                        var c = b.get("playlist"),
                            f = b.get("edition"),
                            g = b.get("dash");
                        e.contains(["shaka", "dashjs"], g) || (g = "shaka");
                        var h = e.where(d, {
                                name: g
                            })[0].supports,
                            i = e.some(c, function(a) {
                                return h(a, f);
                            });
                        i ? k(g, a, b) : a();
                    }

                    function m() {
                        var a = g.getQueue();
                        return (
                            (a.LOAD_DASH = {
                                method: l,
                                depends: ["CHECK_KEY", "FILTER_PLAYLIST"]
                            }),
                            (a.CHECK_KEY = {
                                method: j,
                                depends: ["LOADED_POLYFILLS"]
                            }),
                            (a.FILTER_PLUGINS = {
                                method: i,
                                depends: ["CHECK_KEY"]
                            }),
                            a.FILTER_PLAYLIST.depends.push("CHECK_KEY"),
                            a.LOAD_PLUGINS.depends.push("FILTER_PLUGINS"),
                            a.SETUP_VIEW.depends.push("CHECK_KEY"),
                            a.SEND_READY.depends.push("LOAD_DASH"),
                            a
                        );
                    }
                    return {
                        getQueue: m
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(96), c(81)]),
                (e = function(a, b, c) {
                    var d = "invalid",
                        e = "RnXcsftYjWRDA^Uy",
                        f = function(f) {
                            function g(f) {
                                a.exists(f) || (f = "");
                                try {
                                    f = b.decrypt(f, e);
                                    var g = f.split("/");
                                    (h = g[0]), "pro" === h && (h = "premium");
                                    var k = c(h);
                                    if (g.length > 2 && k("setup")) {
                                        i = g[1];
                                        var l = parseInt(g[2]);
                                        l > 0 && ((j = new Date()), j.setTime(l));
                                    } else h = d;
                                } catch (m) {
                                    h = d;
                                }
                            }
                            var h, i, j;
                            (this.edition = function() {
                                return j && j.getTime() < new Date().getTime() ? d : h;
                            }),
                                (this.token = function() {
                                    return i;
                                }),
                                (this.expiration = function() {
                                    return j;
                                }),
                                g(f);
                        };
                    return f;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    var a = function(a) {
                            return window.atob(a);
                        },
                        b = function(a) {
                            return unescape(encodeURIComponent(a));
                        },
                        c = function(a) {
                            try {
                                return decodeURIComponent(escape(a));
                            } catch (b) {
                                return a;
                            }
                        },
                        d = function(a) {
                            for (var b = new Array(Math.ceil(a.length / 4)), c = 0; c < b.length; c++)
                                b[c] =
                                    a.charCodeAt(4 * c) +
                                    (a.charCodeAt(4 * c + 1) << 8) +
                                    (a.charCodeAt(4 * c + 2) << 16) +
                                    (a.charCodeAt(4 * c + 3) << 24);
                            return b;
                        },
                        e = function(a) {
                            for (var b = new Array(a.length), c = 0; c < a.length; c++)
                                b[c] = String.fromCharCode(
                                    255 & a[c],
                                    (a[c] >>> 8) & 255,
                                    (a[c] >>> 16) & 255,
                                    (a[c] >>> 24) & 255
                                );
                            return b.join("");
                        };
                    return {
                        decrypt: function(f, g) {
                            if (((f = String(f)), (g = String(g)), 0 == f.length)) return "";
                            for (
                                var h,
                                    i,
                                    j = d(a(f)),
                                    k = d(b(g).slice(0, 16)),
                                    l = j.length,
                                    m = j[l - 1],
                                    n = j[0],
                                    o = 2654435769,
                                    p = Math.floor(6 + 52 / l),
                                    q = p * o;
                                0 != q;

                            ) {
                                i = (q >>> 2) & 3;
                                for (var r = l - 1; r >= 0; r--)
                                    (m = j[r > 0 ? r - 1 : l - 1]),
                                        (h =
                                            (((m >>> 5) ^ (n << 2)) + ((n >>> 3) ^ (m << 4))) ^
                                            ((q ^ n) + (k[(3 & r) ^ i] ^ m))),
                                        (n = j[r] -= h);
                                q -= o;
                            }
                            var s = e(j);
                            return (s = s.replace(/\0+$/, "")), c(s);
                        }
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(98), c(64), c(101), c(58), c(44), c(47), c(45)]),
                (e = function(a, b, d, e, f, g, h) {
                    function i() {
                        var a = {
                            LOAD_PROMISE_POLYFILL: {
                                method: j,
                                depends: []
                            },
                            LOAD_BASE64_POLYFILL: {
                                method: k,
                                depends: []
                            },
                            LOADED_POLYFILLS: {
                                method: l,
                                depends: ["LOAD_PROMISE_POLYFILL", "LOAD_BASE64_POLYFILL"]
                            },
                            LOAD_PLUGINS: {
                                method: m,
                                depends: ["LOADED_POLYFILLS"]
                            },
                            INIT_PLUGINS: {
                                method: n,
                                depends: ["LOAD_PLUGINS", "SETUP_VIEW"]
                            },
                            LOAD_YOUTUBE: {
                                method: v,
                                depends: ["FILTER_PLAYLIST"]
                            },
                            LOAD_SKIN: {
                                method: u,
                                depends: ["LOADED_POLYFILLS"]
                            },
                            LOAD_PLAYLIST: {
                                method: p,
                                depends: ["LOADED_POLYFILLS"]
                            },
                            FILTER_PLAYLIST: {
                                method: q,
                                depends: ["LOAD_PLAYLIST"]
                            },
                            SETUP_VIEW: {
                                method: w,
                                depends: ["LOAD_SKIN"]
                            },
                            SEND_READY: {
                                method: x,
                                depends: ["INIT_PLUGINS", "LOAD_YOUTUBE", "SETUP_VIEW"]
                            }
                        };
                        return a;
                    }

                    function j(a) {
                        window.Promise
                            ? a()
                            : c.e(1, function(b) {
                                  c(104), a();
                              });
                    }

                    function k(a) {
                        window.btoa && window.atob
                            ? a()
                            : c.e(2, function(b) {
                                  c(105), a();
                              });
                    }

                    function l(a) {
                        a();
                    }

                    function m(b, c) {
                        (z = a.loadPlugins(c.get("id"), c.get("plugins"))),
                            z.on(h.COMPLETE, b),
                            z.on(h.ERROR, f.partial(o, b)),
                            z.load();
                    }

                    function n(a, b, c) {
                        z.setupPlugins(c, b), a();
                    }

                    function o(a, b) {
                        y(a, "Could not load plugin", b.message);
                    }

                    function p(a, c) {
                        var d = c.get("playlist");
                        f.isString(d)
                            ? ((A = new b()),
                              A.on(h.JWPLAYER_PLAYLIST_LOADED, function(b) {
                                  c.set("playlist", b.playlist), a();
                              }),
                              A.on(h.JWPLAYER_ERROR, f.partial(r, a)),
                              A.load(d))
                            : a();
                    }

                    function q(a, b, c, d, e) {
                        var f = b.get("playlist"),
                            g = e(f);
                        g ? a() : r(a);
                    }

                    function r(a, b) {
                        b && b.message
                            ? y(a, "Error loading playlist", b.message)
                            : y(a, "Error loading player", "No playable sources found");
                    }

                    function s(a, b) {
                        return f.contains(e.SkinsLoadable, a) ? b + "skins/" + a + ".css" : void 0;
                    }

                    function t(a) {
                        for (var b = document.styleSheets, c = 0, d = b.length; d > c; c++)
                            if (b[c].href === a) return !0;
                        return !1;
                    }

                    function u(a, b) {
                        var c = b.get("skin"),
                            g = b.get("skinUrl");
                        if (f.contains(e.SkinsIncluded, c)) return void a();
                        if ((g || (g = s(c, b.get("base"))), f.isString(g) && !t(g))) {
                            b.set("skin-loading", !0);
                            var i = !0,
                                j = new d(g, i);
                            j.addEventListener(h.COMPLETE, function() {
                                b.set("skin-loading", !1);
                            }),
                                j.addEventListener(h.ERROR, function() {
                                    b.set("skin", "seven"), b.set("skin-loading", !1);
                                }),
                                j.load();
                        }
                        f.defer(function() {
                            a();
                        });
                    }

                    function v(a, b) {
                        var d = b.get("playlist"),
                            e = f.some(d, function(a) {
                                var b = g.isYouTube(a.file, a.type);
                                if (b && !a.image) {
                                    var c = a.file,
                                        d = g.youTubeID(c);
                                    a.image = "//i.ytimg.com/vi/" + d + "/0.jpg";
                                }
                                return b;
                            });
                        e
                            ? c.e(3, function(b) {
                                  var d = c(106);
                                  d.register(window.jwplayer), a();
                              })
                            : a();
                    }

                    function w(a, b, c, d) {
                        d.setup(), a();
                    }

                    function x(a) {
                        a({
                            type: "complete"
                        });
                    }

                    function y(a, b, c) {
                        a({
                            type: "error",
                            msg: b,
                            reason: c
                        });
                    }
                    var z, A;
                    return {
                        getQueue: i,
                        error: y
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(99), c(102), c(103), c(100)]),
                (e = function(a, b, c, d) {
                    var e = {},
                        f = {},
                        g = function(c, d) {
                            return (f[c] = new a(new b(e), d)), f[c];
                        },
                        h = function(a, b, f, g) {
                            var h = d.getPluginName(a);
                            e[h] || (e[h] = new c(a)), e[h].registerPlugin(a, b, f, g);
                        };
                    return {
                        loadPlugins: g,
                        registerPlugin: h
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(100), c(47), c(45), c(46), c(44), c(101)]),
                (e = function(a, b, c, d, e, f) {
                    function g(a, b, c) {
                        return function() {
                            var d = a.getContainer().getElementsByClassName("jw-overlays")[0];
                            d &&
                                (d.appendChild(c), (c.left = d.style.left), (c.top = d.style.top), (b.displayArea = d));
                        };
                    }

                    function h(a) {
                        function b() {
                            var b = a.displayArea;
                            b && a.resize(b.clientWidth, b.clientHeight);
                        }
                        return function() {
                            b(), setTimeout(b, 400);
                        };
                    }
                    var i = function(i, j) {
                        function k() {
                            q || ((q = !0), (p = f.loaderstatus.COMPLETE), o.trigger(c.COMPLETE));
                        }

                        function l() {
                            if (!s && ((j && 0 !== e.keys(j).length) || k(), !q)) {
                                var d = i.getPlugins();
                                (n = e.after(r, k)),
                                    e.each(j, function(e, g) {
                                        var h = a.getPluginName(g),
                                            i = d[h],
                                            j = i.getJS(),
                                            k = i.getTarget(),
                                            l = i.getStatus();
                                        l !== f.loaderstatus.LOADING &&
                                            l !== f.loaderstatus.NEW &&
                                            (j &&
                                                !b.versionCheck(k) &&
                                                o.trigger(c.ERROR, {
                                                    message: "Incompatible player version"
                                                }),
                                            n());
                                    });
                            }
                        }

                        function m(a) {
                            if (!s) {
                                var d = "File not found";
                                a.url && b.log(d, a.url),
                                    this.off(),
                                    this.trigger(c.ERROR, {
                                        message: d
                                    }),
                                    l();
                            }
                        }
                        var n,
                            o = e.extend(this, d),
                            p = f.loaderstatus.NEW,
                            q = !1,
                            r = e.size(j),
                            s = !1;
                        (this.setupPlugins = function(c, d) {
                            var f = [],
                                j = i.getPlugins(),
                                k = d.get("plugins");
                            e.each(k, function(d, i) {
                                var l = a.getPluginName(i),
                                    m = j[l],
                                    n = m.getFlashPath(),
                                    o = m.getJS(),
                                    p = m.getURL();
                                if (n) {
                                    var q = e.extend(
                                        {
                                            name: l,
                                            swf: n,
                                            pluginmode: m.getPluginmode()
                                        },
                                        d
                                    );
                                    f.push(q);
                                }
                                var r = b.tryCatch(function() {
                                    if (o && k[p]) {
                                        var a = document.createElement("div");
                                        (a.id = c.id + "_" + l), (a.className = "jw-plugin jw-reset");
                                        var b = e.extend({}, k[p]),
                                            d = m.getNewInstance(c, b, a);
                                        (d.addToPlayer = g(c, d, a)), (d.resizeHandler = h(d)), c.addPlugin(l, d, a);
                                    }
                                });
                                r instanceof b.Error && b.log("ERROR: Failed to load " + l + ".");
                            }),
                                d.set("flashPlugins", f);
                        }),
                            (this.load = function() {
                                if (b.exists(j) && "object" !== b.typeOf(j)) return void l();
                                (p = f.loaderstatus.LOADING),
                                    e.each(j, function(a, d) {
                                        if (b.exists(d)) {
                                            var e = i.addPlugin(d);
                                            e.on(c.COMPLETE, l), e.on(c.ERROR, m);
                                        }
                                    });
                                var a = i.getPlugins();
                                e.each(a, function(a) {
                                    a.load();
                                }),
                                    l();
                            }),
                            (this.destroy = function() {
                                (s = !0), this.off();
                            }),
                            (this.getStatus = function() {
                                return p;
                            });
                    };
                    return i;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51)]),
                (e = function(a) {
                    var b = {},
                        c = (b.pluginPathType = {
                            ABSOLUTE: 0,
                            RELATIVE: 1,
                            CDN: 2
                        });
                    return (
                        (b.getPluginPathType = function(b) {
                            if ("string" == typeof b) {
                                b = b.split("?")[0];
                                var d = b.indexOf("://");
                                if (d > 0) return c.ABSOLUTE;
                                var e = b.indexOf("/"),
                                    f = a.extension(b);
                                return !(0 > d && 0 > e) || (f && isNaN(f)) ? c.RELATIVE : c.CDN;
                            }
                        }),
                        (b.getPluginName = function(a) {
                            return a.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2");
                        }),
                        (b.getPluginVersion = function(a) {
                            return a.replace(/[^-]*-?([^\.]*).*$/, "$1");
                        }),
                        b
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(45), c(46), c(44)]),
                (e = function(a, b, c) {
                    var d = {},
                        e = {
                            NEW: 0,
                            LOADING: 1,
                            ERROR: 2,
                            COMPLETE: 3
                        },
                        f = function(f, g) {
                            function h(b) {
                                (k = e.ERROR), j.trigger(a.ERROR, b);
                            }

                            function i(b) {
                                (k = e.COMPLETE), j.trigger(a.COMPLETE, b);
                            }
                            var j = c.extend(this, b),
                                k = e.NEW;
                            (this.addEventListener = this.on),
                                (this.removeEventListener = this.off),
                                (this.makeStyleLink = function(a) {
                                    var b = document.createElement("link");
                                    return (b.type = "text/css"), (b.rel = "stylesheet"), (b.href = a), b;
                                }),
                                (this.makeScriptTag = function(a) {
                                    var b = document.createElement("script");
                                    return (b.src = a), b;
                                }),
                                (this.makeTag = g ? this.makeStyleLink : this.makeScriptTag),
                                (this.load = function() {
                                    if (k === e.NEW) {
                                        var b = d[f];
                                        if (b && ((k = b.getStatus()), 2 > k))
                                            return b.on(a.ERROR, h), void b.on(a.COMPLETE, i);
                                        var c = document.getElementsByTagName("head")[0] || document.documentElement,
                                            j = this.makeTag(f),
                                            l = !1;
                                        (j.onload = j.onreadystatechange = function(a) {
                                            l ||
                                                (this.readyState &&
                                                    "loaded" !== this.readyState &&
                                                    "complete" !== this.readyState) ||
                                                ((l = !0),
                                                i(a),
                                                (j.onload = j.onreadystatechange = null),
                                                c && j.parentNode && !g && c.removeChild(j));
                                        }),
                                            (j.onerror = h),
                                            c.insertBefore(j, c.firstChild),
                                            (k = e.LOADING),
                                            (d[f] = this);
                                    }
                                }),
                                (this.getStatus = function() {
                                    return k;
                                });
                        };
                    return (f.loaderstatus = e), f;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(100), c(103)]),
                (e = function(a, b) {
                    var c = function(c) {
                        (this.addPlugin = function(d) {
                            var e = a.getPluginName(d);
                            return c[e] || (c[e] = new b(d)), c[e];
                        }),
                            (this.getPlugins = function() {
                                return c;
                            });
                    };
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(100), c(45), c(46), c(101), c(44)]),
                (e = function(a, b, c, d, e, f) {
                    var g = {
                            FLASH: 0,
                            JAVASCRIPT: 1,
                            HYBRID: 2
                        },
                        h = function(h) {
                            function i() {
                                switch (b.getPluginPathType(h)) {
                                    case b.pluginPathType.ABSOLUTE:
                                        return h;
                                    case b.pluginPathType.RELATIVE:
                                        return a.getAbsolutePath(h, window.location.href);
                                }
                            }

                            function j() {
                                f.defer(function() {
                                    (q = e.loaderstatus.COMPLETE), p.trigger(c.COMPLETE);
                                });
                            }

                            function k() {
                                (q = e.loaderstatus.ERROR),
                                    p.trigger(c.ERROR, {
                                        url: h
                                    });
                            }
                            var l,
                                m,
                                n,
                                o,
                                p = f.extend(this, d),
                                q = e.loaderstatus.NEW;
                            (this.load = function() {
                                if (q === e.loaderstatus.NEW) {
                                    if (h.lastIndexOf(".swf") > 0)
                                        return (l = h), (q = e.loaderstatus.COMPLETE), void p.trigger(c.COMPLETE);
                                    if (b.getPluginPathType(h) === b.pluginPathType.CDN)
                                        return (q = e.loaderstatus.COMPLETE), void p.trigger(c.COMPLETE);
                                    q = e.loaderstatus.LOADING;
                                    var a = new e(i());
                                    a.on(c.COMPLETE, j), a.on(c.ERROR, k), a.load();
                                }
                            }),
                                (this.registerPlugin = function(a, b, d, f) {
                                    o && (clearTimeout(o), (o = void 0)),
                                        (n = b),
                                        d && f
                                            ? ((l = f), (m = d))
                                            : "string" == typeof d
                                            ? (l = d)
                                            : "function" == typeof d
                                            ? (m = d)
                                            : d || f || (l = a),
                                        (q = e.loaderstatus.COMPLETE),
                                        p.trigger(c.COMPLETE);
                                }),
                                (this.getStatus = function() {
                                    return q;
                                }),
                                (this.getPluginName = function() {
                                    return b.getPluginName(h);
                                }),
                                (this.getFlashPath = function() {
                                    if (l)
                                        switch (b.getPluginPathType(l)) {
                                            case b.pluginPathType.ABSOLUTE:
                                                return l;
                                            case b.pluginPathType.RELATIVE:
                                                return h.lastIndexOf(".swf") > 0
                                                    ? a.getAbsolutePath(l, window.location.href)
                                                    : a.getAbsolutePath(l, i());
                                        }
                                    return null;
                                }),
                                (this.getJS = function() {
                                    return m;
                                }),
                                (this.getTarget = function() {
                                    return n;
                                }),
                                (this.getPluginmode = function() {
                                    return void 0 !== typeof l && void 0 !== typeof m
                                        ? g.HYBRID
                                        : void 0 !== typeof l
                                        ? g.FLASH
                                        : void 0 !== typeof m
                                        ? g.JAVASCRIPT
                                        : void 0;
                                }),
                                (this.getNewInstance = function(a, b, c) {
                                    return new m(a, b, c);
                                }),
                                (this.getURL = function() {
                                    return h;
                                });
                        };
                    return h;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        function(a, b, c) {
            var d, e;
            (d = [c(65), c(112), c(113), c(47)]),
                (e = function(a, b, c, d) {
                    var e = function(e, f) {
                        function g(a) {
                            d.log("CAPTIONS(" + a + ")");
                        }

                        function h(a, b) {
                            (p = []), (q = {}), (r = {}), (s = 0);
                            var c,
                                d,
                                e,
                                f = b.tracks;
                            for (e = 0; e < f.length; e++)
                                (c = f[e]),
                                    (d = c.kind.toLowerCase()),
                                    ("captions" === d || "subtitles" === d) && (c.file ? (j(c), k(c)) : c.data && j(c));
                            var g = n();
                            this.setCaptionsList(g), o();
                        }

                        function i(a, b) {
                            var c = null;
                            0 !== b && (c = p[b - 1]), a.set("captionsTrack", c);
                        }

                        function j(a) {
                            "number" != typeof a.id && (a.id = a.name || a.file || "cc" + p.length),
                                (a.data = a.data || []),
                                a.label || ((a.label = "Unknown CC"), s++, s > 1 && (a.label += " (" + s + ")")),
                                p.push(a),
                                (q[a.id] = a);
                        }

                        function k(a) {
                            d.ajax(
                                a.file,
                                function(b) {
                                    l(b, a);
                                },
                                m,
                                !0
                            );
                        }

                        function l(e, f) {
                            var h,
                                i = e.responseXML ? e.responseXML.firstChild : null;
                            if (i)
                                for ("xml" === a.localName(i) && (i = i.nextSibling); i.nodeType === i.COMMENT_NODE; )
                                    i = i.nextSibling;
                            (h =
                                i && "tt" === a.localName(i)
                                    ? d.tryCatch(function() {
                                          f.data = c(e.responseXML);
                                      })
                                    : d.tryCatch(function() {
                                          f.data = b(e.responseText);
                                      })),
                                h instanceof d.Error && g(h.message + ": " + f.file);
                        }

                        function m(a) {
                            g(a);
                        }

                        function n() {
                            for (
                                var a = [
                                        {
                                            id: "off",
                                            label: "Off"
                                        }
                                    ],
                                    b = 0;
                                b < p.length;
                                b++
                            )
                                a.push({
                                    id: p[b].id,
                                    label: p[b].label
                                });
                            return a;
                        }

                        function o() {
                            var a = 0,
                                b = f.get("captionLabel");
                            if ("Off" === b) return void f.set("captionsIndex", 0);
                            for (var c = 0; c < p.length; c++) {
                                var d = p[c];
                                if (b && b === d.label) {
                                    a = c + 1;
                                    break;
                                }
                                d["default"] || d.defaulttrack ? (a = c + 1) : d.autoselect;
                            }
                            f.set("captionsIndex", a);
                        }
                        f.on("change:playlistItem", h, this),
                            f.on("change:captionsIndex", i, this),
                            f.mediaController.on(
                                "subtitlesTracks",
                                function(a) {
                                    if (a.tracks.length) {
                                        f.mediaController.off("meta"), (p = []), (q = {}), (r = {}), (s = 0);
                                        for (var b = a.tracks || [], c = 0; c < b.length; c++) {
                                            var d = b[c];
                                            (d.id = d.name), (d.label = d.name || d.language), j(d);
                                        }
                                        var e = n();
                                        this.setCaptionsList(e), o();
                                    }
                                },
                                this
                            ),
                            f.mediaController.on(
                                "subtitlesTrackData",
                                function(a) {
                                    var b = q[a.name];
                                    if (b) {
                                        b.source = a.source;
                                        for (var c = a.captions || [], d = !1, e = 0; e < c.length; e++) {
                                            var f = c[e],
                                                g = a.name + "_" + f.begin + "_" + f.end;
                                            r[g] || ((r[g] = f), b.data.push(f), (d = !0));
                                        }
                                        d &&
                                            b.data.sort(function(a, b) {
                                                return a.begin - b.begin;
                                            });
                                    }
                                },
                                this
                            ),
                            f.mediaController.on(
                                "meta",
                                function(a) {
                                    var b = a.metadata;
                                    if (b && "textdata" === b.type) {
                                        var c = q[b.trackid];
                                        if (!c) {
                                            (c = {
                                                kind: "captions",
                                                id: b.trackid,
                                                data: []
                                            }),
                                                j(c);
                                            var d = n();
                                            this.setCaptionsList(d);
                                        }
                                        var e = a.position || f.get("position"),
                                            g = "" + Math.round(10 * e) + "_" + b.text,
                                            h = r[g];
                                        h ||
                                            ((h = {
                                                begin: e,
                                                text: b.text
                                            }),
                                            (r[g] = h),
                                            c.data.push(h));
                                    }
                                },
                                this
                            );
                        var p = [],
                            q = {},
                            r = {},
                            s = 0;
                        (this.getCurrentIndex = function() {
                            return f.get("captionsIndex");
                        }),
                            (this.getCaptionsList = function() {
                                return f.get("captionsList");
                            }),
                            (this.setCaptionsList = function(a) {
                                f.set("captionsList", a);
                            });
                    };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(51)]),
                (e = function(a, b) {
                    function c(a) {
                        var b = {},
                            c = a.split("\r\n");
                        1 === c.length && (c = a.split("\n"));
                        var e = 1;
                        if ((c[0].indexOf(" --> ") > 0 && (e = 0), c.length > e + 1 && c[e + 1])) {
                            var f = c[e],
                                g = f.indexOf(" --> ");
                            g > 0 &&
                                ((b.begin = d(f.substr(0, g))),
                                (b.end = d(f.substr(g + 5))),
                                (b.text = c.slice(e + 1).join("<br/>")));
                        }
                        return b;
                    }
                    var d = a.seconds;
                    return function(a) {
                        var d = [];
                        a = b.trim(a);
                        var e = a.split("\r\n\r\n");
                        1 === e.length && (e = a.split("\n\n"));
                        for (var f = 0; f < e.length; f++)
                            if ("WEBVTT" !== e[f]) {
                                var g = c(e[f]);
                                g.text && d.push(g);
                            }
                        if (!d.length) throw new Error("Invalid SRT file");
                        return d;
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(51)]),
                (e = function(a) {
                    function b(a) {
                        a || c();
                    }

                    function c() {
                        throw new Error("Invalid DFXP file");
                    }
                    var d = a.seconds;
                    return function(e) {
                        b(e);
                        var f = [],
                            g = e.getElementsByTagName("p");
                        b(g),
                            g.length ||
                                ((g = e.getElementsByTagName("tt:p")),
                                g.length || (g = e.getElementsByTagName("tts:p")));
                        for (var h = 0; h < g.length; h++) {
                            var i = g[h],
                                j = i.innerHTML || i.textContent || i.text || "",
                                k = a
                                    .trim(j)
                                    .replace(/>\s+</g, "><")
                                    .replace(/tts?:/g, "");
                            if (k) {
                                var l = i.getAttribute("begin"),
                                    m = i.getAttribute("dur"),
                                    n = i.getAttribute("end"),
                                    o = {
                                        begin: d(l),
                                        text: k
                                    };
                                n ? (o.end = d(n)) : m && (o.end = o.begin + d(m)), f.push(o);
                            }
                        }
                        return f.length || c(), f;
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(69), c(70), c(44), c(78)]),
                (e = function(a, b, c, d) {
                    function e(a, b) {
                        for (var c = 0; c < a.length; c++) {
                            var d = a[c],
                                e = b.choose(d);
                            if (e) return d.type;
                        }
                        return null;
                    }
                    var f = function(b) {
                        return (b = c.isArray(b) ? b : [b]), c.compact(c.map(b, a));
                    };
                    f.filterPlaylist = function(a, b, d, e, f) {
                        var i = [];
                        return (
                            c.each(a, function(a) {
                                (a = c.extend({}, a)),
                                    (a.allSources = g(a.sources, d, a.drm || e, a.preload || f)),
                                    (a.sources = h(a.allSources, b)),
                                    a.sources.length &&
                                        ((a.file = a.sources[0].file),
                                        (a.preload || f) && (a.preload = a.preload || f),
                                        i.push(a));
                            }),
                            i
                        );
                    };
                    var g = function(a, d, e, f) {
                            return c.compact(
                                c.map(a, function(a) {
                                    return c.isObject(a)
                                        ? (void 0 !== d && null !== d && (a.androidhls = d),
                                          (a.drm || e) && (a.drm = a.drm || e),
                                          (a.preload || f) && (a.preload = a.preload || f),
                                          b(a))
                                        : void 0;
                                })
                            );
                        },
                        h = function(a, b) {
                            (b && b.choose) ||
                                (b = new d({
                                    primary: b ? "flash" : null
                                }));
                            var f = e(a, b);
                            return c.where(a, {
                                type: f
                            });
                        };
                    return f;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    return function(a, b) {
                        a.getPlaylistIndex = a.getItem;
                        var c = {
                            jwPlay: b.play,
                            jwPause: b.pause,
                            jwSetMute: b.setMute,
                            jwLoad: b.load,
                            jwPlaylistItem: b.item,
                            jwGetAudioTracks: b.getAudioTracks,
                            jwDetachMedia: b.detachMedia,
                            jwAttachMedia: b.attachMedia,
                            jwAddEventListener: b.on,
                            jwRemoveEventListener: b.off,
                            jwStop: b.stop,
                            jwSeek: b.seek,
                            jwSetVolume: b.setVolume,
                            jwPlaylistNext: b.next,
                            jwPlaylistPrev: b.prev,
                            jwSetFullscreen: b.setFullscreen,
                            jwGetQualityLevels: b.getQualityLevels,
                            jwGetCurrentQuality: b.getCurrentQuality,
                            jwSetCurrentQuality: b.setCurrentQuality,
                            jwSetCurrentAudioTrack: b.setCurrentAudioTrack,
                            jwGetCurrentAudioTrack: b.getCurrentAudioTrack,
                            jwGetCaptionsList: b.getCaptionsList,
                            jwGetCurrentCaptions: b.getCurrentCaptions,
                            jwSetCurrentCaptions: b.setCurrentCaptions,
                            jwSetCues: b.setCues
                        };
                        a.callInternal = function(a) {
                            console.log("You are using the deprecated callInternal method for " + a);
                            var d = Array.prototype.slice.call(arguments, 1);
                            c[a].apply(b, d);
                        };
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(117), c(45), c(154)]),
                (e = function(a, b, c) {
                    var d = function(d, e) {
                        var f = new a(d, e),
                            g = f.setup;
                        return (
                            (f.setup = function() {
                                if ((g.call(this), "trial" === e.get("edition"))) {
                                    var a = document.createElement("div");
                                    (a.className = "jw-icon jw-watermark"), this.element().appendChild(a);
                                }
                                e.on("change:skipButton", this.onSkipButton, this),
                                    e.on("change:castActive change:playlistItem", this.showDisplayIconImage, this);
                            }),
                            (f.showDisplayIconImage = function(a) {
                                var b = a.get("castActive"),
                                    c = a.get("playlistItem"),
                                    d = f.controlsContainer().getElementsByClassName("jw-display-icon-container")[0];
                                b && c && c.image
                                    ? ((d.style.backgroundImage = 'url("' + c.image + '")'),
                                      (d.style.backgroundSize = "contain"))
                                    : ((d.style.backgroundImage = ""), (d.style.backgroundSize = ""));
                            }),
                            (f.onSkipButton = function(a, b) {
                                b
                                    ? this.addSkipButton()
                                    : this._skipButton && (this._skipButton.destroy(), (this._skipButton = null));
                            }),
                            (f.addSkipButton = function() {
                                (this._skipButton = new c(this.instreamModel)),
                                    this._skipButton.on(
                                        b.JWPLAYER_AD_SKIPPED,
                                        function() {
                                            this.api.skipAd();
                                        },
                                        this
                                    ),
                                    this.controlsContainer().appendChild(this._skipButton.element());
                            }),
                            f
                        );
                    };
                    return d;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [
                c(47),
                c(45),
                c(46),
                c(61),
                c(128),
                c(129),
                c(130),
                c(132),
                c(118),
                c(134),
                c(148),
                c(149),
                c(152),
                c(44),
                c(153)
            ]),
                (e = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
                    var p = a.style,
                        q = a.bounds,
                        r = a.isMobile(),
                        s = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
                        t = function(t, u) {
                            function v(b) {
                                var c = a.between(u.get("position") + b, 0, u.get("duration"));
                                t.seek(c);
                            }

                            function w(b) {
                                var c = a.between(u.get("volume") + b, 0, 100);
                                t.setVolume(c);
                            }

                            function x(a) {
                                return a.ctrlKey || a.metaKey ? !1 : u.get("controls") ? !0 : !1;
                            }

                            function y(a) {
                                if (!x(a)) return !0;
                                switch ((Fa || _(), a.keyCode)) {
                                    case 27:
                                        t.setFullscreen(!1);
                                        break;
                                    case 13:
                                    case 32:
                                        t.play();
                                        break;
                                    case 37:
                                        Fa || v(-5);
                                        break;
                                    case 39:
                                        Fa || v(5);
                                        break;
                                    case 38:
                                        w(10);
                                        break;
                                    case 40:
                                        w(-10);
                                        break;
                                    case 77:
                                        t.setMute();
                                        break;
                                    case 70:
                                        t.setFullscreen();
                                        break;
                                    default:
                                        if (a.keyCode >= 48 && a.keyCode <= 59) {
                                            var b = a.keyCode - 48,
                                                c = (b / 10) * u.get("duration");
                                            t.seek(c);
                                        }
                                }
                                return /13|32|37|38|39|40/.test(a.keyCode) ? (a.preventDefault(), !1) : void 0;
                            }

                            function z() {
                                (Ja = !0),
                                    Ka.trigger(b.JWPLAYER_VIEW_TAB_FOCUS, {
                                        hasFocus: !1
                                    });
                            }

                            function A() {
                                var a = !Ja;
                                (Ja = !1),
                                    a &&
                                        Ka.trigger(b.JWPLAYER_VIEW_TAB_FOCUS, {
                                            hasFocus: !0
                                        }),
                                    Fa || _();
                            }

                            function B() {
                                (Ja = !1),
                                    Ka.trigger(b.JWPLAYER_VIEW_TAB_FOCUS, {
                                        hasFocus: !1
                                    });
                            }

                            function C() {
                                var a = q(ha),
                                    c = Math.round(a.width),
                                    d = Math.round(a.height);
                                return (
                                    document.body.contains(ha)
                                        ? c &&
                                          d &&
                                          (c !== la || d !== ma) &&
                                          ((la = c),
                                          (ma = d),
                                          clearTimeout(Ha),
                                          (Ha = setTimeout(W, 50)),
                                          u.set("containerWidth", c),
                                          u.set("containerHeight", d),
                                          Ka.trigger(b.JWPLAYER_RESIZE, {
                                              width: c,
                                              height: d
                                          }))
                                        : (window.removeEventListener("resize", C),
                                          r && window.removeEventListener("orientationchange", C)),
                                    a
                                );
                            }

                            function D(b, c) {
                                (c = c || !1), a.toggleClass(ha, "jw-flag-casting", c);
                            }

                            function E(b, c) {
                                a.toggleClass(ha, "jw-flag-cast-available", c),
                                    a.toggleClass(ia, "jw-flag-cast-available", c);
                            }

                            function F(b, c, d) {
                                d && a.removeClass(ha, "jw-stretch-" + d), a.addClass(ha, "jw-stretch-" + c);
                            }

                            function G(b, c) {
                                a.toggleClass(ha, "jw-flag-compact-player", c);
                            }

                            function H(a) {
                                a &&
                                    !r &&
                                    (a.element().addEventListener("mousemove", K, !1),
                                    a.element().addEventListener("mouseout", L, !1));
                            }

                            function I() {
                                (u.get("state") !== d.IDLE &&
                                    u.get("state") !== d.COMPLETE &&
                                    u.get("state") !== d.PAUSED) ||
                                    !u.get("controls") ||
                                    t.play(),
                                    Ga ? $() : _();
                            }

                            function J(a) {
                                a.link
                                    ? (t.pause(!0), t.setFullscreen(!1), window.open(a.link, a.linktarget))
                                    : u.get("controls") && t.play();
                            }

                            function K() {
                                clearTimeout(Ca);
                            }

                            function L() {
                                _();
                            }

                            function M(a) {
                                Ka.trigger(a.type, a);
                            }

                            function N(b, c) {
                                c
                                    ? (xa && xa.destroy(), a.addClass(ha, "jw-flag-flash-blocked"))
                                    : (xa && xa.setup(u, ha, ha), a.removeClass(ha, "jw-flag-flash-blocked"));
                            }

                            function O() {
                                u.get("controls") && t.setFullscreen();
                            }

                            function P() {
                                (qa = new f(u, ja)),
                                    qa.on("click", function() {
                                        M({
                                            type: b.JWPLAYER_DISPLAY_CLICK
                                        }),
                                            u.get("controls") && t.play();
                                    }),
                                    qa.on("tap", function() {
                                        M({
                                            type: b.JWPLAYER_DISPLAY_CLICK
                                        }),
                                            I();
                                    }),
                                    qa.on("doubleClick", O);
                                var c = new g(u);
                                c.on("click", function() {
                                    M({
                                        type: b.JWPLAYER_DISPLAY_CLICK
                                    }),
                                        t.play();
                                }),
                                    c.on("tap", function() {
                                        M({
                                            type: b.JWPLAYER_DISPLAY_CLICK
                                        }),
                                            I();
                                    }),
                                    a.isChrome() &&
                                        c.el.addEventListener("mousedown", function() {
                                            var a = u.getVideo(),
                                                b = a && 0 === a.getName().name.indexOf("flash");
                                            if (b) {
                                                var d = function() {
                                                    document.removeEventListener("mouseup", d),
                                                        (c.el.style.pointerEvents = "auto");
                                                };
                                                (this.style.pointerEvents = "none"),
                                                    document.addEventListener("mouseup", d);
                                            }
                                        }),
                                    ia.appendChild(c.element()),
                                    (sa = new h(u)),
                                    (ta = new i(u)),
                                    ta.on(b.JWPLAYER_LOGO_CLICK, J);
                                var d = document.createElement("div");
                                (d.className = "jw-controls-right jw-reset"),
                                    u.get("logo") && d.appendChild(ta.element()),
                                    d.appendChild(sa.element()),
                                    ia.appendChild(d),
                                    (va = new e(u)),
                                    va.setup(u.get("captions")),
                                    ia.parentNode.insertBefore(va.element(), ua.element());
                                var k = u.get("height");
                                r && ("string" == typeof k || k >= 1.5 * Ea)
                                    ? a.addClass(ha, "jw-flag-touch")
                                    : ((xa = new l()), xa.setup(u, ha, ha)),
                                    (oa = new j(t, u)),
                                    oa.on(b.JWPLAYER_USER_ACTION, _),
                                    u.on("change:scrubbing", R),
                                    u.on("change:compactUI", G),
                                    ia.appendChild(oa.element()),
                                    (ha.onfocusin = A),
                                    (ha.onfocusout = B),
                                    ha.addEventListener("focus", A),
                                    ha.addEventListener("blur", B),
                                    ha.addEventListener("keydown", y),
                                    (ha.onmousedown = z);
                            }

                            function Q(b) {
                                return b.get("state") === d.PAUSED
                                    ? void b.once("change:state", Q)
                                    : void (b.get("scrubbing") === !1 && a.removeClass(ha, "jw-flag-dragging"));
                            }

                            function R(b, c) {
                                b.off("change:state", Q), c ? a.addClass(ha, "jw-flag-dragging") : Q(b);
                            }

                            function S(b, c, d) {
                                var e,
                                    f = ha.className;
                                (d = !!d),
                                    d &&
                                        ((f = f.replace(/\s*aspectMode/, "")),
                                        ha.className !== f && (ha.className = f),
                                        a.style(
                                            ha,
                                            {
                                                display: "block"
                                            },
                                            d
                                        )),
                                    a.exists(b) && a.exists(c) && (u.set("width", b), u.set("height", c)),
                                    (e = {
                                        width: b
                                    }),
                                    a.hasClass(ha, "jw-flag-aspect-mode") || (e.height = c),
                                    p(ha, e, !0),
                                    ta &&
                                        ta.offset(
                                            oa && ta.position().indexOf("bottom") >= 0 ? oa.element().clientHeight : 0
                                        ),
                                    T(c),
                                    W(b, c);
                            }

                            function T(b) {
                                if (((wa = U(b)), oa && !wa)) {
                                    var c = Fa ? na : u;
                                    ga(c, c.get("state"));
                                }
                                a.toggleClass(ha, "jw-flag-audio-player", wa);
                            }

                            function U(a) {
                                if (u.get("aspectratio")) return !1;
                                if (n.isString(a) && a.indexOf("%") > -1) return !1;
                                var b = n.isNumber(a) ? a : u.get("containerHeight");
                                return V(b);
                            }

                            function V(a) {
                                return a && Ea * (r ? 1.75 : 1) >= a;
                            }

                            function W(b, c) {
                                if (!b || isNaN(Number(b))) {
                                    if (!ja) return;
                                    b = ja.clientWidth;
                                }
                                if (!c || isNaN(Number(c))) {
                                    if (!ja) return;
                                    c = ja.clientHeight;
                                }
                                a.isMSIE(9) && document.all && !window.atob && (b = c = "100%");
                                var d = u.getVideo();
                                if (d) {
                                    var e = d.resize(b, c, u.get("stretching"));
                                    e && (clearTimeout(Ha), (Ha = setTimeout(W, 250))),
                                        va.resize(),
                                        oa.checkCompactMode(b);
                                }
                            }

                            function X() {
                                if (Ia) {
                                    var a =
                                        document.fullscreenElement ||
                                        document.webkitCurrentFullScreenElement ||
                                        document.mozFullScreenElement ||
                                        document.msFullscreenElement;
                                    return !(!a || a.id !== u.get("id"));
                                }
                                return Fa ? na.getVideo().getFullScreen() : u.getVideo().getFullScreen();
                            }

                            function Y(a) {
                                var b = u.get("fullscreen"),
                                    c = void 0 !== a.jwstate ? a.jwstate : X();
                                b !== c && u.set("fullscreen", c), clearTimeout(Ha), (Ha = setTimeout(W, 200));
                            }

                            function Z(b, c) {
                                a.removeClass(b, "jw-flag-fullscreen"),
                                    c
                                        ? (a.addClass(b, "jw-flag-fullscreen"),
                                          p(document.body, {
                                              "overflow-y": "hidden"
                                          }),
                                          _())
                                        : p(document.body, {
                                              "overflow-y": ""
                                          }),
                                    W();
                            }

                            function $() {
                                (Ga = !1),
                                    clearTimeout(Ca),
                                    oa.hideComponents(),
                                    a.addClass(ha, "jw-flag-user-inactive");
                            }

                            function _() {
                                Ga || (a.removeClass(ha, "jw-flag-user-inactive"), oa.checkCompactMode(ja.clientWidth)),
                                    (Ga = !0),
                                    clearTimeout(Ca),
                                    (Ca = setTimeout($, Da));
                            }

                            function aa() {
                                t.setFullscreen(!1);
                            }

                            function ba() {
                                ra && ra.setState(u.get("state")),
                                    ca(u, u.mediaModel.get("mediaType")),
                                    u.mediaModel.on("change:mediaType", ca, this);
                            }

                            function ca(b, c) {
                                var d = "audio" === c;
                                a.toggleClass(ha, "jw-flag-media-audio", d);
                            }

                            function da(b, c) {
                                var d = "LIVE" === a.adaptiveType(c);
                                a.toggleClass(ha, "jw-flag-live", d), Ka.setAltText(d ? "Live Broadcast" : "");
                            }

                            function ea(a, b) {
                                return b
                                    ? void (b.name ? ua.updateText(b.name, b.message) : ua.updateText(b.message, ""))
                                    : void ua.playlistItem(a, a.get("playlistItem"));
                            }

                            function fa() {
                                var a = u.getVideo();
                                return a ? a.isCaster : !1;
                            }

                            function ga(b, c) {
                                if (
                                    (a.removeClass(ha, "jw-state-" + ya),
                                    a.addClass(ha, "jw-state-" + c),
                                    (ya = c),
                                    fa())
                                )
                                    return void a.addClass(ja, "jw-media-show");
                                switch (c) {
                                    case d.PLAYING:
                                        W();
                                        break;
                                    case d.PAUSED:
                                        _();
                                }
                            }
                            var ha,
                                ia,
                                ja,
                                ka,
                                la,
                                ma,
                                na,
                                oa,
                                pa,
                                qa,
                                ra,
                                sa,
                                ta,
                                ua,
                                va,
                                wa,
                                xa,
                                ya,
                                za,
                                Aa,
                                Ba,
                                Ca = -1,
                                Da = r ? 4e3 : 2e3,
                                Ea = 40,
                                Fa = !1,
                                Ga = !1,
                                Ha = -1,
                                Ia = !1,
                                Ja = !1,
                                Ka = n.extend(this, c);
                            (this.model = u),
                                (this.api = t),
                                (ha = a.createElement(
                                    o({
                                        id: u.get("id")
                                    })
                                ));
                            var La = u.get("width"),
                                Ma = u.get("height");
                            p(ha, {
                                width: La.toString().indexOf("%") > 0 ? La : La + "px",
                                height: Ma.toString().indexOf("%") > 0 ? Ma : Ma + "px"
                            }),
                                (Aa =
                                    ha.requestFullscreen ||
                                    ha.webkitRequestFullscreen ||
                                    ha.webkitRequestFullScreen ||
                                    ha.mozRequestFullScreen ||
                                    ha.msRequestFullscreen),
                                (Ba =
                                    document.exitFullscreen ||
                                    document.webkitExitFullscreen ||
                                    document.webkitCancelFullScreen ||
                                    document.mozCancelFullScreen ||
                                    document.msExitFullscreen),
                                (Ia = Aa && Ba),
                                (this.onChangeSkin = function(b, c, d) {
                                    d && a.removeClass(ha, "jw-skin-" + d), c && a.addClass(ha, "jw-skin-" + c);
                                }),
                                (this.handleColorOverrides = function() {
                                    function b(b, d, e) {
                                        if (e) {
                                            b = a.prefix(b, "#" + c + " ");
                                            var f = {};
                                            (f[d] = e), a.css(b.join(", "), f);
                                        }
                                    }
                                    var c = u.get("id"),
                                        d = u.get("skinColorActive"),
                                        e = u.get("skinColorInactive"),
                                        f = u.get("skinColorBackground");
                                    b([".jw-toggle", ".jw-button-color:hover"], "color", d),
                                        b(
                                            [
                                                ".jw-active-option",
                                                ".jw-progress",
                                                ".jw-playlist-container .jw-option.jw-active-option",
                                                ".jw-playlist-container .jw-option:hover"
                                            ],
                                            "background",
                                            d
                                        ),
                                        b(
                                            [
                                                ".jw-text",
                                                ".jw-option",
                                                ".jw-button-color",
                                                ".jw-toggle.jw-off",
                                                ".jw-tooltip-title",
                                                ".jw-skip .jw-skip-icon",
                                                ".jw-playlist-container .jw-icon"
                                            ],
                                            "color",
                                            e
                                        ),
                                        b([".jw-cue", ".jw-knob"], "background", e),
                                        b([".jw-playlist-container .jw-option"], "border-bottom-color", e),
                                        b(
                                            [
                                                ".jw-background-color",
                                                ".jw-tooltip-title",
                                                ".jw-playlist",
                                                ".jw-playlist-container .jw-option"
                                            ],
                                            "background",
                                            f
                                        ),
                                        b([".jw-playlist-container ::-webkit-scrollbar"], "border-color", f);
                                }),
                                (this.setup = function() {
                                    this.handleColorOverrides(),
                                        u.get("skin-loading") === !0 &&
                                            (a.addClass(ha, "jw-flag-skin-loading"),
                                            u.once("change:skin-loading", function() {
                                                a.removeClass(ha, "jw-flag-skin-loading");
                                            })),
                                        this.onChangeSkin(u, u.get("skin"), ""),
                                        u.on("change:skin", this.onChangeSkin, this),
                                        (ja = ha.getElementsByClassName("jw-media")[0]),
                                        (ia = ha.getElementsByClassName("jw-controls")[0]),
                                        (ka = ha.getElementsByClassName("jw-aspect")[0]);
                                    var c = ha.getElementsByClassName("jw-preview")[0];
                                    (pa = new k(u)), pa.setup(c);
                                    var e = ha.getElementsByClassName("jw-title")[0];
                                    (ua = new m(u)),
                                        ua.setup(e),
                                        P(),
                                        _(),
                                        u.set("mediaContainer", ja),
                                        u.mediaController.on("fullscreenchange", Y);
                                    for (var f = s.length; f--; ) document.addEventListener(s[f], Y, !1);
                                    window.removeEventListener("resize", C),
                                        window.addEventListener("resize", C, !1),
                                        r &&
                                            (window.removeEventListener("orientationchange", C),
                                            window.addEventListener("orientationchange", C, !1)),
                                        u.on("change:errorEvent", ea),
                                        u.on("change:controls", Na),
                                        Na(u, u.get("controls")),
                                        u.on("change:state", ga),
                                        u.on("change:duration", da, this),
                                        u.on("change:flashBlocked", N),
                                        N(u, u.get("flashBlocked")),
                                        t.onPlaylistComplete(aa),
                                        t.onPlaylistItem(ba),
                                        u.on("change:castAvailable", E),
                                        E(u, u.get("castAvailable")),
                                        u.on("change:castActive", D),
                                        D(u, u.get("castActive")),
                                        u.get("stretching") && F(u, u.get("stretching")),
                                        u.on("change:stretching", F),
                                        ga(u, d.IDLE),
                                        u.on("change:fullscreen", Oa),
                                        r ||
                                            (qa.element().addEventListener("mouseout", _, !1),
                                            qa.element().addEventListener("mousemove", _, !1)),
                                        H(oa),
                                        H(ta),
                                        u.get("aspectratio") &&
                                            (a.addClass(ha, "jw-flag-aspect-mode"),
                                            a.style(ka, {
                                                "padding-top": u.get("aspectratio")
                                            })),
                                        t.on(b.JWPLAYER_READY, function() {
                                            C(), S(u.get("width"), u.get("height"));
                                        });
                                });
                            var Na = function(b, c) {
                                    if (c) {
                                        var d = Fa ? na.get("state") : u.get("state");
                                        ga(b, d);
                                    }
                                    c
                                        ? a.removeClass(ha, "jw-flag-controls-disabled")
                                        : a.addClass(ha, "jw-flag-controls-disabled");
                                },
                                Oa = function(b, c) {
                                    var d = u.getVideo();
                                    Ia
                                        ? (c ? Aa.apply(ha) : Ba.apply(document), Z(ha, c))
                                        : a.isIE()
                                        ? Z(ha, c)
                                        : (na && na.getVideo() && na.getVideo().setFullscreen(c), d.setFullscreen(c)),
                                        d && 0 === d.getName().name.indexOf("flash") && d.setFullscreen(c);
                                };
                            (this.resize = function(a, b) {
                                var c = !0;
                                S(a, b, c), C();
                            }),
                                (this.resizeMedia = W),
                                (this.reset = function() {
                                    document.contains(ha) && ha.parentNode.replaceChild(za, ha), a.emptyElement(ha);
                                }),
                                (this.setupInstream = function(b) {
                                    (this.instreamModel = na = b),
                                        na.on("change:controls", Na, this),
                                        na.on("change:state", ga, this),
                                        (Fa = !0),
                                        a.addClass(ha, "jw-flag-ads"),
                                        _();
                                }),
                                (this.setAltText = function(a) {
                                    oa.setAltText(a);
                                }),
                                (this.useExternalControls = function() {
                                    a.addClass(ha, "jw-flag-ads-hide-controls");
                                }),
                                (this.destroyInstream = function() {
                                    if (
                                        ((Fa = !1),
                                        na && (na.off(null, null, this), (na = null)),
                                        this.setAltText(""),
                                        a.removeClass(ha, "jw-flag-ads"),
                                        a.removeClass(ha, "jw-flag-ads-hide-controls"),
                                        u.getVideo)
                                    ) {
                                        var b = u.getVideo();
                                        b.setContainer(ja);
                                    }
                                    da(u, u.get("duration")), qa.revertAlternateClickHandlers();
                                }),
                                (this.addCues = function(a) {
                                    oa && oa.addCues(a);
                                }),
                                (this.clickHandler = function() {
                                    return qa;
                                }),
                                (this.controlsContainer = function() {
                                    return ia;
                                }),
                                (this.getContainer = this.element = function() {
                                    return ha;
                                }),
                                (this.getSafeRegion = function(b) {
                                    var c = {
                                            x: 0,
                                            y: 0,
                                            width: u.get("containerWidth") || 0,
                                            height: u.get("containerHeight") || 0
                                        },
                                        d = u.get("dock");
                                    return (
                                        d &&
                                            d.length &&
                                            u.get("controls") &&
                                            ((c.y = sa.element().clientHeight), (c.height -= c.y)),
                                        (b = b || !a.exists(b)),
                                        b && u.get("controls") && (c.height -= oa.element().clientHeight),
                                        c
                                    );
                                }),
                                (this.destroy = function() {
                                    window.removeEventListener("resize", C),
                                        window.removeEventListener("orientationchange", C);
                                    for (var b = s.length; b--; ) document.removeEventListener(s[b], Y, !1);
                                    u.mediaController && u.mediaController.off("fullscreenchange", Y),
                                        ha.removeEventListener("keydown", y, !1),
                                        xa && xa.destroy(),
                                        ra && (u.off("change:state", ra.statusDelegate), ra.destroy(), (ra = null)),
                                        ia &&
                                            (qa.element().removeEventListener("mousemove", _),
                                            qa.element().removeEventListener("mouseout", _)),
                                        Fa && this.destroyInstream(),
                                        a.clearCss("#" + u.get("id"));
                                });
                        };
                    return t;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(119), c(47), c(45), c(44), c(46), c(120)]),
                (e = function(a, b, c, d, e, f) {
                    var g = b.style,
                        h = {
                            linktarget: "_blank",
                            margin: 8,
                            hide: !1,
                            position: "top-right"
                        },
                        i = function(i) {
                            function j() {
                                (n = d.extend({}, h, p)), (n.hide = "true" === n.hide.toString()), k();
                            }

                            function k() {
                                if (
                                    ((m = b.createElement(
                                        f({
                                            file: n.file
                                        })
                                    )),
                                    n.file)
                                ) {
                                    if (
                                        (n.hide && b.addClass(m, "jw-hide"),
                                        n.position !== h.position || n.margin !== h.margin)
                                    ) {
                                        var c = /(\w+)-(\w+)/.exec(n.position),
                                            d = {
                                                top: "auto",
                                                right: "auto",
                                                bottom: "auto",
                                                left: "auto"
                                            };
                                        3 === c.length && ((d[c[1]] = n.margin), (d[c[2]] = n.margin), g(m, d));
                                    }
                                    var e = new a(m);
                                    e.on("click tap", l);
                                }
                            }

                            function l(a) {
                                b.exists(a) && a.stopPropagation && a.stopPropagation(),
                                    o.trigger(c.JWPLAYER_LOGO_CLICK, {
                                        link: n.link,
                                        linktarget: n.linktarget
                                    });
                            }
                            var m,
                                n,
                                o = this,
                                p = d.extend({}, i.get("logo"));
                            return (
                                d.extend(this, e),
                                (this.element = function() {
                                    return m;
                                }),
                                (this.offset = function(a) {
                                    g(m, {
                                        marginBottom: a
                                    });
                                }),
                                (this.position = function() {
                                    return n.position;
                                }),
                                (this.margin = function() {
                                    return parseInt(n.margin, 10);
                                }),
                                j(),
                                this
                            );
                        };
                    return i;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(46), c(45), c(44), c(47)]),
                (e = function(a, b, c, d) {
                    function e(a, b) {
                        return /touch/.test(a.type)
                            ? (a.originalEvent || a).changedTouches[0]["page" + b]
                            : a["page" + b];
                    }

                    function f(a) {
                        var b = a || window.event;
                        return a instanceof MouseEvent
                            ? "which" in b
                                ? 3 === b.which
                                : "button" in b
                                ? 2 === b.button
                                : !1
                            : !1;
                    }

                    function g(a, b, c) {
                        var d;
                        return (
                            (d =
                                b instanceof MouseEvent || (!b.touches && !b.changedTouches)
                                    ? b
                                    : b.touches && b.touches.length
                                    ? b.touches[0]
                                    : b.changedTouches[0]),
                            {
                                type: a,
                                target: b.target,
                                currentTarget: c,
                                pageX: d.pageX,
                                pageY: d.pageY
                            }
                        );
                    }

                    function h(a) {
                        (a instanceof MouseEvent || a instanceof window.TouchEvent) &&
                            (a.preventManipulation && a.preventManipulation(),
                            a.cancelable && a.preventDefault && a.preventDefault());
                    }
                    var i = !c.isUndefined(window.PointerEvent),
                        j = !i && d.isMobile(),
                        k = !i && !j,
                        l = d.isFF() && d.isOSX(),
                        m = function(a, d) {
                            function j(a) {
                                (k || (i && "touch" !== a.pointerType)) && q(b.touchEvents.OVER, a);
                            }

                            function m(c) {
                                (k ||
                                    (i &&
                                        "touch" !== c.pointerType &&
                                        !a.contains(document.elementFromPoint(c.x, c.y)))) &&
                                    q(b.touchEvents.OUT, c);
                            }

                            function n(b) {
                                (r = b.target),
                                    (v = e(b, "X")),
                                    (w = e(b, "Y")),
                                    f(b) ||
                                        (i
                                            ? b.isPrimary &&
                                              (d.preventScrolling && ((s = b.pointerId), a.setPointerCapture(s)),
                                              a.addEventListener("pointermove", o),
                                              a.addEventListener("pointerup", p),
                                              a.addEventListener("pointercancel", p))
                                            : k &&
                                              (document.addEventListener("mousemove", o),
                                              l && "object" === b.target.nodeName.toLowerCase()
                                                  ? a.addEventListener("click", p)
                                                  : document.addEventListener("mouseup", p)),
                                        r.addEventListener("touchmove", o),
                                        r.addEventListener("touchend", p),
                                        r.addEventListener("touchcancel", p));
                            }

                            function o(a) {
                                var c = b.touchEvents,
                                    f = 6;
                                if (u) q(c.DRAG, a);
                                else {
                                    var g = e(a, "X"),
                                        i = e(a, "Y"),
                                        j = g - v,
                                        k = i - w;
                                    j * j + k * k > f * f && (q(c.DRAG_START, a), (u = !0), q(c.DRAG, a));
                                }
                                d.preventScrolling && h(a);
                            }

                            function p(c) {
                                var e = b.touchEvents;
                                i
                                    ? (d.preventScrolling && a.releasePointerCapture(s),
                                      a.removeEventListener("pointermove", o),
                                      a.removeEventListener("pointercancel", p),
                                      a.removeEventListener("pointerup", p))
                                    : k &&
                                      (document.removeEventListener("mousemove", o),
                                      document.removeEventListener("mouseup", p)),
                                    r.removeEventListener("touchmove", o),
                                    r.removeEventListener("touchcancel", p),
                                    r.removeEventListener("touchend", p),
                                    u
                                        ? q(e.DRAG_END, c)
                                        : (d.directSelect && c.target !== a) ||
                                          (i && c instanceof window.PointerEvent
                                              ? "touch" === c.pointerType
                                                  ? q(e.TAP, c)
                                                  : q(e.CLICK, c)
                                              : k
                                              ? q(e.CLICK, c)
                                              : (q(e.TAP, c), h(c))),
                                    (r = null),
                                    (u = !1);
                            }

                            function q(a, e) {
                                var f;
                                if (d.enableDoubleTap && (a === b.touchEvents.CLICK || a === b.touchEvents.TAP))
                                    if (c.now() - x < y) {
                                        var h =
                                            a === b.touchEvents.CLICK
                                                ? b.touchEvents.DOUBLE_CLICK
                                                : b.touchEvents.DOUBLE_TAP;
                                        (f = g(h, e, t)), z.trigger(h, f), (x = 0);
                                    } else x = c.now();
                                (f = g(a, e, t)), z.trigger(a, f);
                            }
                            var r,
                                s,
                                t = a,
                                u = !1,
                                v = 0,
                                w = 0,
                                x = 0,
                                y = 300;
                            (d = d || {}),
                                i
                                    ? (a.addEventListener("pointerdown", n),
                                      d.useHover &&
                                          (a.addEventListener("pointerover", j), a.addEventListener("pointerout", m)))
                                    : k &&
                                      (a.addEventListener("mousedown", n),
                                      d.useHover &&
                                          (a.addEventListener("mouseover", j), a.addEventListener("mouseout", m))),
                                a.addEventListener("touchstart", n);
                            var z = this;
                            return (
                                (this.triggerEvent = q),
                                (this.destroy = function() {
                                    a.removeEventListener("touchstart", n),
                                        a.removeEventListener("mousedown", n),
                                        r &&
                                            (r.removeEventListener("touchmove", o),
                                            r.removeEventListener("touchcancel", p),
                                            r.removeEventListener("touchend", p)),
                                        i &&
                                            (d.preventScrolling && a.releasePointerCapture(s),
                                            a.removeEventListener("pointerdown", n),
                                            a.removeEventListener("pointermove", o),
                                            a.removeEventListener("pointercancel", p),
                                            a.removeEventListener("pointerup", p)),
                                        a.removeEventListener("click", p),
                                        document.removeEventListener("mousemove", o),
                                        document.removeEventListener("mouseup", p);
                                }),
                                this
                            );
                        };
                    return c.extend(m.prototype, a), m;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                1: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        'src="' +
                        h(
                            ((e = null != (e = b.file || (null != a ? a.file : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "file",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        '"'
                    );
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = '<div class="jw-logo jw-reset">\n    <img class="jw-logo-image" ';
                    return (
                        (e = b["if"].call(a, null != a ? a.file : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(1, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (f += e),
                        f + ">\n</div>"
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            a.exports = c(122);
        },
        function(a, b, c) {
            "use strict";
            var d = c(123),
                e = c(125)["default"],
                f = c(126)["default"],
                g = c(124),
                h = c(127),
                i = function() {
                    var a = new d.HandlebarsEnvironment();
                    return (
                        g.extend(a, d),
                        (a.SafeString = e),
                        (a.Exception = f),
                        (a.Utils = g),
                        (a.escapeExpression = g.escapeExpression),
                        (a.VM = h),
                        (a.template = function(b) {
                            return h.template(b, a);
                        }),
                        a
                    );
                },
                j = i();
            (j.create = i), (j["default"] = j), (b["default"] = j);
        },
        function(a, b, c) {
            "use strict";

            function d(a, b) {
                (this.helpers = a || {}), (this.partials = b || {}), e(this);
            }

            function e(a) {
                a.registerHelper("helperMissing", function() {
                    if (1 === arguments.length) return void 0;
                    throw new g("Missing helper: '" + arguments[arguments.length - 1].name + "'");
                }),
                    a.registerHelper("blockHelperMissing", function(b, c) {
                        var d = c.inverse,
                            e = c.fn;
                        if (b === !0) return e(this);
                        if (b === !1 || null == b) return d(this);
                        if (k(b)) return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this);
                        if (c.data && c.ids) {
                            var g = q(c.data);
                            (g.contextPath = f.appendContextPath(c.data.contextPath, c.name)),
                                (c = {
                                    data: g
                                });
                        }
                        return e(b, c);
                    }),
                    a.registerHelper("each", function(a, b) {
                        if (!b) throw new g("Must pass iterator to #each");
                        var c,
                            d,
                            e = b.fn,
                            h = b.inverse,
                            i = 0,
                            j = "";
                        if (
                            (b.data && b.ids && (d = f.appendContextPath(b.data.contextPath, b.ids[0]) + "."),
                            l(a) && (a = a.call(this)),
                            b.data && (c = q(b.data)),
                            a && "object" == typeof a)
                        )
                            if (k(a))
                                for (var m = a.length; m > i; i++)
                                    c &&
                                        ((c.index = i),
                                        (c.first = 0 === i),
                                        (c.last = i === a.length - 1),
                                        d && (c.contextPath = d + i)),
                                        (j += e(a[i], {
                                            data: c
                                        }));
                            else
                                for (var n in a)
                                    a.hasOwnProperty(n) &&
                                        (c &&
                                            ((c.key = n),
                                            (c.index = i),
                                            (c.first = 0 === i),
                                            d && (c.contextPath = d + n)),
                                        (j += e(a[n], {
                                            data: c
                                        })),
                                        i++);
                        return 0 === i && (j = h(this)), j;
                    }),
                    a.registerHelper("if", function(a, b) {
                        return (
                            l(a) && (a = a.call(this)),
                            (!b.hash.includeZero && !a) || f.isEmpty(a) ? b.inverse(this) : b.fn(this)
                        );
                    }),
                    a.registerHelper("unless", function(b, c) {
                        return a.helpers["if"].call(this, b, {
                            fn: c.inverse,
                            inverse: c.fn,
                            hash: c.hash
                        });
                    }),
                    a.registerHelper("with", function(a, b) {
                        l(a) && (a = a.call(this));
                        var c = b.fn;
                        if (f.isEmpty(a)) return b.inverse(this);
                        if (b.data && b.ids) {
                            var d = q(b.data);
                            (d.contextPath = f.appendContextPath(b.data.contextPath, b.ids[0])),
                                (b = {
                                    data: d
                                });
                        }
                        return c(a, b);
                    }),
                    a.registerHelper("log", function(b, c) {
                        var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                        a.log(d, b);
                    }),
                    a.registerHelper("lookup", function(a, b) {
                        return a && a[b];
                    });
            }
            var f = c(124),
                g = c(126)["default"],
                h = "2.0.0";
            b.VERSION = h;
            var i = 6;
            b.COMPILER_REVISION = i;
            var j = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1"
            };
            b.REVISION_CHANGES = j;
            var k = f.isArray,
                l = f.isFunction,
                m = f.toString,
                n = "[object Object]";
            (b.HandlebarsEnvironment = d),
                (d.prototype = {
                    constructor: d,
                    logger: o,
                    log: p,
                    registerHelper: function(a, b) {
                        if (m.call(a) === n) {
                            if (b) throw new g("Arg not supported with multiple helpers");
                            f.extend(this.helpers, a);
                        } else this.helpers[a] = b;
                    },
                    unregisterHelper: function(a) {
                        delete this.helpers[a];
                    },
                    registerPartial: function(a, b) {
                        m.call(a) === n ? f.extend(this.partials, a) : (this.partials[a] = b);
                    },
                    unregisterPartial: function(a) {
                        delete this.partials[a];
                    }
                });
            var o = {
                methodMap: {
                    0: "debug",
                    1: "info",
                    2: "warn",
                    3: "error"
                },
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 3,
                log: function(a, b) {
                    if (o.level <= a) {
                        var c = o.methodMap[a];
                        "undefined" != typeof console && console[c] && console[c].call(console, b);
                    }
                }
            };
            b.logger = o;
            var p = o.log;
            b.log = p;
            var q = function(a) {
                var b = f.extend({}, a);
                return (b._parent = a), b;
            };
            b.createFrame = q;
        },
        function(a, b, c) {
            "use strict";

            function d(a) {
                return j[a];
            }

            function e(a) {
                for (var b = 1; b < arguments.length; b++)
                    for (var c in arguments[b])
                        Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
                return a;
            }

            function f(a) {
                return a instanceof i
                    ? a.toString()
                    : null == a
                    ? ""
                    : a
                    ? ((a = "" + a), l.test(a) ? a.replace(k, d) : a)
                    : a + "";
            }

            function g(a) {
                return a || 0 === a ? (o(a) && 0 === a.length ? !0 : !1) : !0;
            }

            function h(a, b) {
                return (a ? a + "." : "") + b;
            }
            var i = c(125)["default"],
                j = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                k = /[&<>"'`]/g,
                l = /[&<>"'`]/;
            b.extend = e;
            var m = Object.prototype.toString;
            b.toString = m;
            var n = function(a) {
                return "function" == typeof a;
            };
            n(/x/) &&
                (n = function(a) {
                    return "function" == typeof a && "[object Function]" === m.call(a);
                });
            var n;
            b.isFunction = n;
            var o =
                Array.isArray ||
                function(a) {
                    return a && "object" == typeof a ? "[object Array]" === m.call(a) : !1;
                };
            (b.isArray = o), (b.escapeExpression = f), (b.isEmpty = g), (b.appendContextPath = h);
        },
        function(a, b) {
            "use strict";

            function c(a) {
                this.string = a;
            }
            (c.prototype.toString = function() {
                return "" + this.string;
            }),
                (b["default"] = c);
        },
        function(a, b) {
            "use strict";

            function c(a, b) {
                var c;
                b && b.firstLine && ((c = b.firstLine), (a += " - " + c + ":" + b.firstColumn));
                for (var e = Error.prototype.constructor.call(this, a), f = 0; f < d.length; f++) this[d[f]] = e[d[f]];
                c && ((this.lineNumber = c), (this.column = b.firstColumn));
            }
            var d = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
            (c.prototype = new Error()), (b["default"] = c);
        },
        function(a, b, c) {
            "use strict";

            function d(a) {
                var b = (a && a[0]) || 1,
                    c = l;
                if (b !== c) {
                    if (c > b) {
                        var d = m[c],
                            e = m[b];
                        throw new k(
                            "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                                d +
                                ") or downgrade your runtime to an older version (" +
                                e +
                                ")."
                        );
                    }
                    throw new k(
                        "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
                            a[1] +
                            ")."
                    );
                }
            }

            function e(a, b) {
                if (!b) throw new k("No environment passed to template");
                if (!a || !a.main) throw new k("Unknown template object: " + typeof a);
                b.VM.checkRevision(a.compiler);
                var c = function(c, d, e, f, g, h, i, l, m) {
                        g && (f = j.extend({}, f, g));
                        var n = b.VM.invokePartial.call(this, c, e, f, h, i, l, m);
                        if (null == n && b.compile) {
                            var o = {
                                helpers: h,
                                partials: i,
                                data: l,
                                depths: m
                            };
                            (i[e] = b.compile(
                                c,
                                {
                                    data: void 0 !== l,
                                    compat: a.compat
                                },
                                b
                            )),
                                (n = i[e](f, o));
                        }
                        if (null != n) {
                            if (d) {
                                for (var p = n.split("\n"), q = 0, r = p.length; r > q && (p[q] || q + 1 !== r); q++)
                                    p[q] = d + p[q];
                                n = p.join("\n");
                            }
                            return n;
                        }
                        throw new k("The partial " + e + " could not be compiled when running in runtime-only mode");
                    },
                    d = {
                        lookup: function(a, b) {
                            for (var c = a.length, d = 0; c > d; d++) if (a[d] && null != a[d][b]) return a[d][b];
                        },
                        lambda: function(a, b) {
                            return "function" == typeof a ? a.call(b) : a;
                        },
                        escapeExpression: j.escapeExpression,
                        invokePartial: c,
                        fn: function(b) {
                            return a[b];
                        },
                        programs: [],
                        program: function(a, b, c) {
                            var d = this.programs[a],
                                e = this.fn(a);
                            return b || c ? (d = f(this, a, e, b, c)) : d || (d = this.programs[a] = f(this, a, e)), d;
                        },
                        data: function(a, b) {
                            for (; a && b--; ) a = a._parent;
                            return a;
                        },
                        merge: function(a, b) {
                            var c = a || b;
                            return a && b && a !== b && (c = j.extend({}, b, a)), c;
                        },
                        noop: b.VM.noop,
                        compilerInfo: a.compiler
                    },
                    e = function(b, c) {
                        c = c || {};
                        var f = c.data;
                        e._setup(c), !c.partial && a.useData && (f = i(b, f));
                        var g;
                        return (
                            a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]),
                            a.main.call(d, b, d.helpers, d.partials, f, g)
                        );
                    };
                return (
                    (e.isTop = !0),
                    (e._setup = function(c) {
                        c.partial
                            ? ((d.helpers = c.helpers), (d.partials = c.partials))
                            : ((d.helpers = d.merge(c.helpers, b.helpers)),
                              a.usePartial && (d.partials = d.merge(c.partials, b.partials)));
                    }),
                    (e._child = function(b, c, e) {
                        if (a.useDepths && !e) throw new k("must pass parent depths");
                        return f(d, b, a[b], c, e);
                    }),
                    e
                );
            }

            function f(a, b, c, d, e) {
                var f = function(b, f) {
                    return (f = f || {}), c.call(a, b, a.helpers, a.partials, f.data || d, e && [b].concat(e));
                };
                return (f.program = b), (f.depth = e ? e.length : 0), f;
            }

            function g(a, b, c, d, e, f, g) {
                var h = {
                    partial: !0,
                    helpers: d,
                    partials: e,
                    data: f,
                    depths: g
                };
                if (void 0 === a) throw new k("The partial " + b + " could not be found");
                return a instanceof Function ? a(c, h) : void 0;
            }

            function h() {
                return "";
            }

            function i(a, b) {
                return (b && "root" in b) || ((b = b ? n(b) : {}), (b.root = a)), b;
            }
            var j = c(124),
                k = c(126)["default"],
                l = c(123).COMPILER_REVISION,
                m = c(123).REVISION_CHANGES,
                n = c(123).createFrame;
            (b.checkRevision = d), (b.template = e), (b.program = f), (b.invokePartial = g), (b.noop = h);
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(55), c(61), c(44)]),
                (e = function(a, b, c, d) {
                    var e = b.style,
                        f = {
                            back: !0,
                            fontSize: 15,
                            fontFamily: "Arial,sans-serif",
                            fontOpacity: 100,
                            color: "#FFF",
                            backgroundColor: "#000",
                            backgroundOpacity: 100,
                            edgeStyle: null,
                            windowColor: "#FFF",
                            windowOpacity: 0,
                            preprocessor: d.identity
                        },
                        g = function(g) {
                            function h(b) {
                                b = b || "";
                                var c = "jw-captions-window jw-reset";
                                b
                                    ? ((s.innerHTML = b), (r.className = c + " jw-captions-window-active"))
                                    : ((r.className = c), a.empty(s));
                            }

                            function i(a) {
                                (p = a), k(n, p);
                            }

                            function j(a, b) {
                                var c = a.source,
                                    e = b.metadata;
                                return c ? (e && d.isNumber(e[c]) ? e[c] : !1) : b.position;
                            }

                            function k(a, b) {
                                if (a && a.data && b) {
                                    var c = j(a, b);
                                    if (c !== !1) {
                                        var d = a.data;
                                        if (!(o >= 0 && l(d, o, c))) {
                                            for (var e = -1, f = 0; f < d.length; f++)
                                                if (l(d, f, c)) {
                                                    e = f;
                                                    break;
                                                }
                                            -1 === e ? h("") : e !== o && ((o = e), h(t.preprocessor(d[o].text)));
                                        }
                                    }
                                }
                            }

                            function l(a, b, c) {
                                return (
                                    a[b].begin <= c &&
                                    (!a[b].end || a[b].end >= c) &&
                                    (b === a.length - 1 || a[b + 1].begin >= c)
                                );
                            }

                            function m(a, c, d) {
                                var e = b.hexToRgba("#000000", d);
                                "dropshadow" === a
                                    ? (c.textShadow = "0 2px 1px " + e)
                                    : "raised" === a
                                    ? (c.textShadow = "0 0 5px " + e + ", 0 1px 5px " + e + ", 0 2px 5px " + e)
                                    : "depressed" === a
                                    ? (c.textShadow = "0 -2px 1px " + e)
                                    : "uniform" === a &&
                                      (c.textShadow =
                                          "-2px 0 1px " +
                                          e +
                                          ",2px 0 1px " +
                                          e +
                                          ",0 -2px 1px " +
                                          e +
                                          ",0 2px 1px " +
                                          e +
                                          ",-1px 1px 1px " +
                                          e +
                                          ",1px 1px 1px " +
                                          e +
                                          ",1px -1px 1px " +
                                          e +
                                          ",1px 1px 1px " +
                                          e);
                            }
                            var n,
                                o,
                                p,
                                q,
                                r,
                                s,
                                t = {};
                            (q = document.createElement("div")),
                                (q.className = "jw-captions jw-reset"),
                                (this.show = function() {
                                    q.className = "jw-captions jw-captions-enabled jw-reset";
                                }),
                                (this.hide = function() {
                                    q.className = "jw-captions jw-reset";
                                }),
                                (this.populate = function(a) {
                                    return (o = -1), (n = a), a ? void k(a, p) : void h("");
                                }),
                                (this.resize = function() {
                                    var a = q.clientWidth,
                                        b = Math.pow(a / 400, 0.6);
                                    if (b) {
                                        var c = t.fontSize * b;
                                        e(q, {
                                            fontSize: Math.round(c) + "px"
                                        });
                                    }
                                }),
                                (this.setup = function(a) {
                                    if (
                                        ((r = document.createElement("div")),
                                        (s = document.createElement("span")),
                                        (r.className = "jw-captions-window jw-reset"),
                                        (s.className = "jw-captions-text jw-reset"),
                                        (t = d.extend({}, f, a)),
                                        a)
                                    ) {
                                        var c = t.fontOpacity,
                                            h = t.windowOpacity,
                                            i = t.edgeStyle,
                                            j = t.backgroundColor,
                                            k = {},
                                            l = {
                                                color: b.hexToRgba(t.color, c),
                                                fontFamily: t.fontFamily,
                                                fontStyle: t.fontStyle,
                                                fontWeight: t.fontWeight,
                                                textDecoration: t.textDecoration
                                            };
                                        h && (k.backgroundColor = b.hexToRgba(t.windowColor, h)),
                                            m(i, l, c),
                                            t.back
                                                ? (l.backgroundColor = b.hexToRgba(j, t.backgroundOpacity))
                                                : null === i && m("uniform", l),
                                            e(r, k),
                                            e(s, l);
                                    }
                                    r.appendChild(s), q.appendChild(r), this.populate(g.get("captionsTrack"));
                                }),
                                (this.element = function() {
                                    return q;
                                }),
                                g.on(
                                    "change:playlistItem",
                                    function() {
                                        (p = null), (o = -1), h("");
                                    },
                                    this
                                ),
                                g.on(
                                    "change:captionsTrack",
                                    function(a, b) {
                                        this.populate(b);
                                    },
                                    this
                                ),
                                g.mediaController.on(
                                    "seek",
                                    function() {
                                        o = -1;
                                    },
                                    this
                                ),
                                g.mediaController.on("time seek", i, this),
                                g.mediaController.on(
                                    "subtitlesTrackData",
                                    function() {
                                        k(n, p);
                                    },
                                    this
                                ),
                                g.on(
                                    "change:state",
                                    function(a, b) {
                                        switch (b) {
                                            case c.IDLE:
                                            case c.ERROR:
                                            case c.COMPLETE:
                                                this.hide();
                                                break;
                                            default:
                                                this.show();
                                        }
                                    },
                                    this
                                );
                        };
                    return g;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(119), c(45), c(46), c(44)]),
                (e = function(a, b, c, d) {
                    var e = function(e, f) {
                        function g(a) {
                            return e.get("flashBlocked")
                                ? void 0
                                : j
                                ? void j(a)
                                : void m.trigger(a.type === b.touchEvents.CLICK ? "click" : "tap");
                        }

                        function h() {
                            return k ? void k() : void m.trigger("doubleClick");
                        }
                        var i, j, k;
                        d.extend(this, c),
                            (i = f),
                            (this.element = function() {
                                return i;
                            });
                        var l = new a(i, {
                            enableDoubleTap: !0
                        });
                        l.on("click tap", g), l.on("doubleClick doubleTap", h), (this.clickHandler = g);
                        var m = this;
                        (this.setAlternateClickHandlers = function(a, b) {
                            (j = a), (k = b || null);
                        }),
                            (this.revertAlternateClickHandlers = function() {
                                (j = null), (k = null);
                            });
                    };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(46), c(119), c(131), c(44)]),
                (e = function(a, b, c, d, e) {
                    var f = function(f) {
                        e.extend(this, b), (this.model = f), (this.el = a.createElement(d({})));
                        var g = this;
                        this.iconUI = new c(this.el).on("click tap", function(a) {
                            g.trigger(a.type);
                        });
                    };
                    return (
                        e.extend(f.prototype, {
                            element: function() {
                                return this.el;
                            }
                        }),
                        f
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    return '<div class="jw-display-icon-container jw-background-color jw-reset">\n    <div class="jw-icon jw-icon-display jw-button-color jw-reset"></div>\n</div>\n';
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(133), c(47), c(44), c(119)]),
                (e = function(a, b, c, d) {
                    var e = function(a) {
                        (this.model = a), this.setup(), this.model.on("change:dock", this.render, this);
                    };
                    return (
                        c.extend(e.prototype, {
                            setup: function() {
                                var c = this.model.get("dock"),
                                    e = this.click.bind(this),
                                    f = a(c);
                                (this.el = b.createElement(f)), new d(this.el).on("click tap", e);
                            },
                            getDockButton: function(a) {
                                return b.hasClass(a.target, "jw-dock-button")
                                    ? a.target
                                    : b.hasClass(a.target, "jw-dock-text")
                                    ? a.target.parentElement.parentElement
                                    : a.target.parentElement;
                            },
                            click: function(a) {
                                var b = this.getDockButton(a),
                                    d = b.getAttribute("button"),
                                    e = this.model.get("dock"),
                                    f = c.findWhere(e, {
                                        id: d
                                    });
                                f && f.callback && f.callback(a);
                            },
                            render: function() {
                                var c = this.model.get("dock"),
                                    d = a(c),
                                    e = b.createElement(d);
                                this.el.innerHTML = e.innerHTML;
                            },
                            element: function() {
                                return this.el;
                            }
                        }),
                        e
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                1: function(a, b, c, d) {
                    var e,
                        f,
                        g = "function",
                        h = b.helperMissing,
                        i = this.escapeExpression,
                        j = '    <div class="jw-dock-button jw-background-color jw-reset';
                    return (
                        (e = b["if"].call(a, null != a ? a.btnClass : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(2, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (j += e),
                        (j +=
                            '" button="' +
                            i(
                                ((f = null != (f = b.id || (null != a ? a.id : a)) ? f : h),
                                typeof f === g
                                    ? f.call(a, {
                                          name: "id",
                                          hash: {},
                                          data: d
                                      })
                                    : f)
                            ) +
                            '">\n        <div class="jw-icon jw-dock-image jw-reset" '),
                        (e = b["if"].call(a, null != a ? a.img : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(4, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (j += e),
                        (j += '></div>\n        <div class="jw-arrow jw-reset"></div>\n'),
                        (e = b["if"].call(a, null != a ? a.tooltip : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(6, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (j += e),
                        j + "    </div>\n"
                    );
                },
                2: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        " " +
                        h(
                            ((e = null != (e = b.btnClass || (null != a ? a.btnClass : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "btnClass",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        )
                    );
                },
                4: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        "style='background-image: url(\"" +
                        h(
                            ((e = null != (e = b.img || (null != a ? a.img : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "img",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        "\")'"
                    );
                },
                6: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        '        <div class="jw-overlay jw-background-color jw-reset">\n            <span class="jw-text jw-dock-text jw-reset">' +
                        h(
                            ((e = null != (e = b.tooltip || (null != a ? a.tooltip : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "tooltip",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        "</span>\n        </div>\n"
                    );
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = '<div class="jw-dock jw-reset">\n';
                    return (
                        (e = b.each.call(a, a, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (f += e),
                        f + "</div>"
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(44), c(46), c(119), c(136), c(135), c(142), c(144), c(146), c(147)]),
                (e = function(a, b, c, d, e, f, g, h, i, j) {
                    function k(a, b) {
                        var c = document.createElement("div");
                        return (
                            (c.className = "jw-icon jw-icon-inline jw-button-color jw-reset " + a),
                            (c.style.display = "none"),
                            b &&
                                new d(c).on("click tap", function() {
                                    b();
                                }),
                            {
                                element: function() {
                                    return c;
                                },
                                toggle: function(a) {
                                    a ? this.show() : this.hide();
                                },
                                show: function() {
                                    c.style.display = "";
                                },
                                hide: function() {
                                    c.style.display = "none";
                                }
                            }
                        );
                    }

                    function l(a) {
                        var b = document.createElement("span");
                        return (b.className = "jw-text jw-reset " + a), b;
                    }

                    function m(a) {
                        var b = new g(a);
                        return b;
                    }

                    function n(a, c) {
                        var d = document.createElement("div");
                        return (
                            (d.className = "jw-group jw-controlbar-" + a + "-group jw-reset"),
                            b.each(c, function(a) {
                                a.element && (a = a.element()), d.appendChild(a);
                            }),
                            d
                        );
                    }

                    function o(b, c) {
                        (this._api = b),
                            (this._model = c),
                            (this._isMobile = a.isMobile()),
                            (this._compactModeMaxSize = 400),
                            (this._maxCompactWidth = -1),
                            this.setup();
                    }
                    return (
                        b.extend(o.prototype, c, {
                            setup: function() {
                                this.build(), this.initialize();
                            },
                            build: function() {
                                var a,
                                    c,
                                    d,
                                    g,
                                    o = new f(this._model, this._api),
                                    p = new j("jw-icon-more");
                                this._model.get("visualplaylist") !== !1 && (a = new h("jw-icon-playlist")),
                                    this._isMobile ||
                                        ((g = k("jw-icon-volume", this._api.setMute)),
                                        (c = new e("jw-slider-volume", "horizontal")),
                                        (d = new i(this._model, "jw-icon-volume"))),
                                    (this.elements = {
                                        alt: l("jw-text-alt"),
                                        play: k("jw-icon-playback", this._api.play),
                                        prev: k("jw-icon-prev", this._api.playlistPrev),
                                        next: k("jw-icon-next", this._api.playlistNext),
                                        playlist: a,
                                        elapsed: l("jw-text-elapsed"),
                                        time: o,
                                        duration: l("jw-text-duration"),
                                        drawer: p,
                                        hd: m("jw-icon-hd"),
                                        cc: m("jw-icon-cc"),
                                        audiotracks: m("jw-icon-audio-tracks"),
                                        mute: g,
                                        volume: c,
                                        volumetooltip: d,
                                        cast: k("jw-icon-cast jw-off", this._api.castToggle),
                                        fullscreen: k("jw-icon-fullscreen", this._api.setFullscreen)
                                    }),
                                    (this.layout = {
                                        left: [
                                            this.elements.play,
                                            this.elements.prev,
                                            this.elements.playlist,
                                            this.elements.next,
                                            this.elements.elapsed
                                        ],
                                        center: [this.elements.time, this.elements.alt],
                                        right: [
                                            this.elements.duration,
                                            this.elements.hd,
                                            this.elements.cc,
                                            this.elements.audiotracks,
                                            this.elements.drawer,
                                            this.elements.mute,
                                            this.elements.cast,
                                            this.elements.volume,
                                            this.elements.volumetooltip,
                                            this.elements.fullscreen
                                        ],
                                        drawer: [this.elements.hd, this.elements.cc, this.elements.audiotracks]
                                    }),
                                    (this.menus = b.compact([
                                        this.elements.playlist,
                                        this.elements.hd,
                                        this.elements.cc,
                                        this.elements.audiotracks,
                                        this.elements.volumetooltip
                                    ])),
                                    (this.layout.left = b.compact(this.layout.left)),
                                    (this.layout.center = b.compact(this.layout.center)),
                                    (this.layout.right = b.compact(this.layout.right)),
                                    (this.layout.drawer = b.compact(this.layout.drawer)),
                                    (this.el = document.createElement("div")),
                                    (this.el.className = "jw-controlbar jw-background-color jw-reset"),
                                    (this.elements.left = n("left", this.layout.left)),
                                    (this.elements.center = n("center", this.layout.center)),
                                    (this.elements.right = n("right", this.layout.right)),
                                    this.el.appendChild(this.elements.left),
                                    this.el.appendChild(this.elements.center),
                                    this.el.appendChild(this.elements.right);
                            },
                            initialize: function() {
                                this.elements.play.show(),
                                    this.elements.fullscreen.show(),
                                    this.elements.mute && this.elements.mute.show(),
                                    this.onVolume(this._model, this._model.get("volume")),
                                    this.onPlaylist(this._model, this._model.get("playlist")),
                                    this.onPlaylistItem(this._model, this._model.get("playlistItem")),
                                    this.onMediaModel(this._model, this._model.get("mediaModel")),
                                    this.onCastAvailable(this._model, this._model.get("castAvailable")),
                                    this.onCastActive(this._model, this._model.get("castActive")),
                                    this.onCaptionsList(this._model, this._model.get("captionsList")),
                                    this._model.on("change:volume", this.onVolume, this),
                                    this._model.on("change:mute", this.onMute, this),
                                    this._model.on("change:playlist", this.onPlaylist, this),
                                    this._model.on("change:playlistItem", this.onPlaylistItem, this),
                                    this._model.on("change:mediaModel", this.onMediaModel, this),
                                    this._model.on("change:castAvailable", this.onCastAvailable, this),
                                    this._model.on("change:castActive", this.onCastActive, this),
                                    this._model.on("change:duration", this.onDuration, this),
                                    this._model.on("change:position", this.onElapsed, this),
                                    this._model.on("change:fullscreen", this.onFullscreen, this),
                                    this._model.on("change:captionsList", this.onCaptionsList, this),
                                    this._model.on("change:captionsIndex", this.onCaptionsIndex, this),
                                    this._model.on("change:compactUI", this.onCompactUI, this),
                                    this.elements.volume &&
                                        this.elements.volume.on(
                                            "update",
                                            function(a) {
                                                var b = a.percentage;
                                                this._api.setVolume(b);
                                            },
                                            this
                                        ),
                                    this.elements.volumetooltip &&
                                        (this.elements.volumetooltip.on(
                                            "update",
                                            function(a) {
                                                var b = a.percentage;
                                                this._api.setVolume(b);
                                            },
                                            this
                                        ),
                                        this.elements.volumetooltip.on(
                                            "toggleValue",
                                            function() {
                                                this._api.setMute();
                                            },
                                            this
                                        )),
                                    this.elements.playlist &&
                                        this.elements.playlist.on(
                                            "select",
                                            function(a) {
                                                this._model.once(
                                                    "itemReady",
                                                    function() {
                                                        this._api.play();
                                                    },
                                                    this
                                                ),
                                                    this._api.load(a);
                                            },
                                            this
                                        ),
                                    this.elements.hd.on(
                                        "select",
                                        function(a) {
                                            this._model.getVideo().setCurrentQuality(a);
                                        },
                                        this
                                    ),
                                    this.elements.hd.on(
                                        "toggleValue",
                                        function() {
                                            this._model
                                                .getVideo()
                                                .setCurrentQuality(
                                                    0 === this._model.getVideo().getCurrentQuality() ? 1 : 0
                                                );
                                        },
                                        this
                                    ),
                                    this.elements.cc.on(
                                        "select",
                                        function(a) {
                                            this._api.setCurrentCaptions(a);
                                        },
                                        this
                                    ),
                                    this.elements.cc.on(
                                        "toggleValue",
                                        function() {
                                            var a = this._model.get("captionsIndex");
                                            this._api.setCurrentCaptions(a ? 0 : 1);
                                        },
                                        this
                                    ),
                                    this.elements.audiotracks.on(
                                        "select",
                                        function(a) {
                                            this._model.getVideo().setCurrentAudioTrack(a);
                                        },
                                        this
                                    ),
                                    new d(this.elements.duration).on(
                                        "click tap",
                                        function() {
                                            "DVR" === a.adaptiveType(this._model.get("duration")) &&
                                                this._api.seek(-0.1);
                                        },
                                        this
                                    ),
                                    new d(this.el).on(
                                        "click tap drag",
                                        function() {
                                            this.trigger("userAction");
                                        },
                                        this
                                    ),
                                    this.elements.drawer.on(
                                        "open-drawer close-drawer",
                                        function(b, c) {
                                            a.toggleClass(this.el, "jw-drawer-expanded", c.isOpen),
                                                c.isOpen || this.closeMenus();
                                        },
                                        this
                                    ),
                                    b.each(
                                        this.menus,
                                        function(a) {
                                            a.on("open-tooltip", this.closeMenus, this);
                                        },
                                        this
                                    );
                            },
                            onCaptionsList: function(a, b) {
                                var c = a.get("captionsIndex");
                                this.elements.cc.setup(b, c), this.clearCompactMode();
                            },
                            onCaptionsIndex: function(a, b) {
                                this.elements.cc.selectItem(b);
                            },
                            onPlaylist: function(a, b) {
                                var c = b.length > 1;
                                this.elements.next.toggle(c),
                                    this.elements.prev.toggle(c),
                                    this.elements.playlist && this.elements.playlist.setup(b, a.get("item"));
                            },
                            onPlaylistItem: function(a) {
                                this.elements.time.updateBuffer(0),
                                    this.elements.time.render(0),
                                    (this.elements.duration.innerHTML = "00:00"),
                                    (this.elements.elapsed.innerHTML = "00:00"),
                                    this.clearCompactMode();
                                var b = a.get("item");
                                this.elements.playlist && this.elements.playlist.selectItem(b),
                                    this.elements.audiotracks.setup();
                            },
                            onMediaModel: function(c, d) {
                                d.on(
                                    "change:levels",
                                    function(a, b) {
                                        this.elements.hd.setup(b, a.get("currentLevel")), this.clearCompactMode();
                                    },
                                    this
                                ),
                                    d.on(
                                        "change:currentLevel",
                                        function(a, b) {
                                            this.elements.hd.selectItem(b);
                                        },
                                        this
                                    ),
                                    d.on(
                                        "change:audioTracks",
                                        function(a, c) {
                                            var d = b.map(c, function(a) {
                                                return {
                                                    label: a.name
                                                };
                                            });
                                            this.elements.audiotracks.setup(d, a.get("currentAudioTrack"), {
                                                toggle: !1
                                            }),
                                                this.clearCompactMode();
                                        },
                                        this
                                    ),
                                    d.on(
                                        "change:currentAudioTrack",
                                        function(a, b) {
                                            this.elements.audiotracks.selectItem(b);
                                        },
                                        this
                                    ),
                                    d.on(
                                        "change:state",
                                        function(b, c) {
                                            "complete" === c &&
                                                (this.elements.drawer.closeTooltip(),
                                                a.removeClass(this.el, "jw-drawer-expanded"));
                                        },
                                        this
                                    );
                            },
                            onVolume: function(a, b) {
                                this.renderVolume(a.get("mute"), b);
                            },
                            onMute: function(a, b) {
                                this.renderVolume(b, a.get("volume"));
                            },
                            renderVolume: function(b, c) {
                                this.elements.mute && a.toggleClass(this.elements.mute.element(), "jw-off", b),
                                    this.elements.volume && this.elements.volume.render(b ? 0 : c),
                                    this.elements.volumetooltip &&
                                        (this.elements.volumetooltip.volumeSlider.render(b ? 0 : c),
                                        a.toggleClass(this.elements.volumetooltip.element(), "jw-off", b));
                            },
                            onCastAvailable: function(a, b) {
                                this.elements.cast.toggle(b), this.clearCompactMode();
                            },
                            onCastActive: function(b, c) {
                                a.toggleClass(this.elements.cast.element(), "jw-off", !c);
                            },
                            onElapsed: function(b, c) {
                                var d,
                                    e = b.get("duration");
                                (d = "DVR" === a.adaptiveType(e) ? "-" + a.timeFormat(-e) : a.timeFormat(c)),
                                    (this.elements.elapsed.innerHTML = d);
                            },
                            onDuration: function(b, c) {
                                var d;
                                "DVR" === a.adaptiveType(c)
                                    ? ((d = "Live"), this.clearCompactMode())
                                    : (d = a.timeFormat(c)),
                                    (this.elements.duration.innerHTML = d);
                            },
                            onFullscreen: function(b, c) {
                                a.toggleClass(this.elements.fullscreen.element(), "jw-off", c);
                            },
                            element: function() {
                                return this.el;
                            },
                            getVisibleBounds: function() {
                                var b,
                                    c = this.el,
                                    d = getComputedStyle ? getComputedStyle(c) : c.currentStyle;
                                return "table" === d.display
                                    ? a.bounds(c)
                                    : ((c.style.visibility = "hidden"),
                                      (c.style.display = "table"),
                                      (b = a.bounds(c)),
                                      (c.style.visibility = c.style.display = ""),
                                      b);
                            },
                            setAltText: function(a) {
                                this.elements.alt.innerHTML = a;
                            },
                            addCues: function(a) {
                                this.elements.time &&
                                    (b.each(
                                        a,
                                        function(a) {
                                            this.elements.time.addCue(a);
                                        },
                                        this
                                    ),
                                    this.elements.time.drawCues());
                            },
                            closeMenus: function(a) {
                                b.each(this.menus, function(b) {
                                    (a && a.target === b.el) || b.closeTooltip(a);
                                });
                            },
                            hideComponents: function() {
                                this.closeMenus(),
                                    this.elements.drawer.closeTooltip(),
                                    a.removeClass(this.el, "jw-drawer-expanded");
                            },
                            clearCompactMode: function() {
                                (this._maxCompactWidth = -1),
                                    this._model.set("compactUI", !1),
                                    this._containerWidth && this.checkCompactMode(this._containerWidth);
                            },
                            setCompactModeBounds: function() {
                                if (this.element().offsetWidth > 0) {
                                    var b = this.elements.left.offsetWidth + this.elements.right.offsetWidth;
                                    if ("LIVE" === a.adaptiveType(this._model.get("duration")))
                                        this._maxCompactWidth = b + this.elements.alt.offsetWidth;
                                    else {
                                        var c =
                                                b +
                                                (this.elements.center.offsetWidth - this.elements.time.el.offsetWidth),
                                            d = 0.2;
                                        this._maxCompactWidth = c / (1 - d);
                                    }
                                }
                            },
                            checkCompactMode: function(a) {
                                -1 === this._maxCompactWidth && this.setCompactModeBounds(),
                                    (this._containerWidth = a),
                                    -1 !== this._maxCompactWidth &&
                                        (a >= this._compactModeMaxSize && a > this._maxCompactWidth
                                            ? this._model.set("compactUI", !1)
                                            : (a < this._compactModeMaxSize || a <= this._maxCompactWidth) &&
                                              this._model.set("compactUI", !0));
                            },
                            onCompactUI: function(c, d) {
                                a.removeClass(this.el, "jw-drawer-expanded"),
                                    this.elements.drawer.setup(this.layout.drawer, d),
                                    (!d || this.elements.drawer.activeContents.length < 2) &&
                                        b.each(
                                            this.layout.drawer,
                                            function(a) {
                                                this.elements.right.insertBefore(a.el, this.elements.drawer.el);
                                            },
                                            this
                                        );
                            }
                        }),
                        o
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(136), c(47), c(139), c(140), c(141)]),
                (e = function(a, b, c, d, e, f) {
                    var g = d.extend({
                            setup: function() {
                                (this.text = document.createElement("span")),
                                    (this.text.className = "jw-text jw-reset"),
                                    (this.img = document.createElement("div")),
                                    (this.img.className = "jw-reset");
                                var a = document.createElement("div");
                                (a.className = "jw-time-tip jw-background-color jw-reset"),
                                    a.appendChild(this.img),
                                    a.appendChild(this.text),
                                    c.removeClass(this.el, "jw-hidden"),
                                    this.addContent(a);
                            },
                            image: function(a) {
                                c.style(this.img, a);
                            },
                            update: function(a) {
                                this.text.innerHTML = a;
                            }
                        }),
                        h = b.extend({
                            constructor: function(c, d) {
                                (this._model = c),
                                    (this._api = d),
                                    (this.timeTip = new g("jw-tooltip-time")),
                                    this.timeTip.setup(),
                                    (this.cues = []),
                                    (this.seekThrottled = a.throttle(this.performSeek, 400)),
                                    this._model
                                        .on("change:playlistItem", this.onPlaylistItem, this)
                                        .on("change:position", this.onPosition, this)
                                        .on("change:duration", this.onDuration, this)
                                        .on("change:buffer", this.onBuffer, this),
                                    b.call(this, "jw-slider-time", "horizontal");
                            },
                            setup: function() {
                                b.prototype.setup.apply(this, arguments),
                                    this._model.get("playlistItem") &&
                                        this.onPlaylistItem(this._model, this._model.get("playlistItem")),
                                    this.elementRail.appendChild(this.timeTip.element()),
                                    this.el.addEventListener("mousemove", this.showTimeTooltip.bind(this), !1),
                                    this.el.addEventListener("mouseout", this.hideTimeTooltip.bind(this), !1);
                            },
                            update: function(c) {
                                this.activeCue && a.isNumber(this.activeCue.pct)
                                    ? (this.seekTo = this.activeCue.pct)
                                    : (this.seekTo = c),
                                    this.seekThrottled(),
                                    b.prototype.update.apply(this, arguments);
                            },
                            dragStart: function() {
                                this._model.set("scrubbing", !0), b.prototype.dragStart.apply(this, arguments);
                            },
                            dragEnd: function() {
                                b.prototype.dragEnd.apply(this, arguments), this._model.set("scrubbing", !1);
                            },
                            onSeeked: function() {
                                this._model.get("scrubbing") && this.performSeek();
                            },
                            onBuffer: function(a, b) {
                                this.updateBuffer(b);
                            },
                            onPosition: function(a, b) {
                                this.updateTime(b, a.get("duration"));
                            },
                            onDuration: function(a, b) {
                                this.updateTime(a.get("position"), b);
                            },
                            updateTime: function(a, b) {
                                var d = 0;
                                if (b) {
                                    var e = c.adaptiveType(b);
                                    "DVR" === e ? (d = ((b - a) / b) * 100) : "VOD" === e && (d = (a / b) * 100);
                                }
                                this.render(d);
                            },
                            onPlaylistItem: function(b, c) {
                                this.reset(), b.mediaModel.on("seeked", this.onSeeked, this);
                                var d = c.tracks;
                                a.each(
                                    d,
                                    function(a) {
                                        a && a.kind && "thumbnails" === a.kind.toLowerCase()
                                            ? this.loadThumbnails(a.file)
                                            : a &&
                                              a.kind &&
                                              "chapters" === a.kind.toLowerCase() &&
                                              this.loadChapters(a.file);
                                    },
                                    this
                                );
                            },
                            performSeek: function() {
                                var a,
                                    b = this._model.get("duration"),
                                    d = c.adaptiveType(b);
                                "LIVE" === d || 0 === b
                                    ? this._api.play()
                                    : "DVR" === d
                                    ? ((a = (1 - this.seekTo / 100) * b), this._api.seek(Math.min(a, -0.25)))
                                    : ((a = (this.seekTo / 100) * b), this._api.seek(Math.min(a, b - 0.25)));
                            },
                            showTimeTooltip: function(a) {
                                var b = this._model.get("duration");
                                if (0 !== b) {
                                    var d = c.bounds(this.elementRail),
                                        e = a.pageX ? a.pageX - d.left : a.x;
                                    e = c.between(e, 0, d.width);
                                    var f = e / d.width,
                                        g = b * f;
                                    0 > b && (g = b - g);
                                    var h;
                                    if (this.activeCue) h = this.activeCue.text;
                                    else {
                                        var i = !0;
                                        (h = c.timeFormat(g, i)), 0 > b && Math.abs(g) < 1 && (h = "Live");
                                    }
                                    this.timeTip.update(h),
                                        this.showThumbnail(g),
                                        c.addClass(this.timeTip.el, "jw-open"),
                                        (this.timeTip.el.style.left = 100 * f + "%");
                                }
                            },
                            hideTimeTooltip: function() {
                                c.removeClass(this.timeTip.el, "jw-open");
                            },
                            reset: function() {
                                this.resetChapters(), this.resetThumbnails();
                            }
                        });
                    return a.extend(h.prototype, e, f), h;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(137), c(119), c(138), c(47)]),
                (e = function(a, b, c, d) {
                    var e = a.extend({
                        constructor: function(a, b) {
                            (this.className = a + " jw-background-color jw-reset"),
                                (this.orientation = b),
                                (this.dragStartListener = this.dragStart.bind(this)),
                                (this.dragMoveListener = this.dragMove.bind(this)),
                                (this.dragEndListener = this.dragEnd.bind(this)),
                                (this.tapListener = this.tap.bind(this)),
                                this.setup();
                        },
                        setup: function() {
                            var a = {
                                default: this["default"],
                                className: this.className,
                                orientation: "jw-slider-" + this.orientation
                            };
                            (this.el = d.createElement(c(a))),
                                (this.elementRail = this.el.getElementsByClassName("jw-slider-container")[0]),
                                (this.elementBuffer = this.el.getElementsByClassName("jw-buffer")[0]),
                                (this.elementProgress = this.el.getElementsByClassName("jw-progress")[0]),
                                (this.elementThumb = this.el.getElementsByClassName("jw-knob")[0]),
                                (this.userInteract = new b(this.element(), {
                                    preventScrolling: !0
                                })),
                                this.userInteract.on("dragStart", this.dragStartListener),
                                this.userInteract.on("drag", this.dragMoveListener),
                                this.userInteract.on("dragEnd", this.dragEndListener),
                                this.userInteract.on("tap click", this.tapListener);
                        },
                        dragStart: function() {
                            this.trigger("dragStart"), (this.railBounds = d.bounds(this.elementRail));
                        },
                        dragEnd: function(a) {
                            this.dragMove(a), this.trigger("dragEnd");
                        },
                        dragMove: function(a) {
                            var b,
                                c,
                                e = (this.railBounds = this.railBounds ? this.railBounds : d.bounds(this.elementRail));
                            return (
                                "horizontal" === this.orientation
                                    ? ((b = a.pageX),
                                      (c =
                                          b < e.left
                                              ? 0
                                              : b > e.right
                                              ? 100
                                              : 100 * d.between((b - e.left) / e.width, 0, 1)))
                                    : ((b = a.pageY),
                                      (c =
                                          b >= e.bottom
                                              ? 0
                                              : b <= e.top
                                              ? 100
                                              : 100 * d.between((e.height - (b - e.top)) / e.height, 0, 1))),
                                this.render(c),
                                this.update(c),
                                !1
                            );
                        },
                        tap: function(a) {
                            (this.railBounds = d.bounds(this.elementRail)), this.dragMove(a);
                        },
                        update: function(a) {
                            this.trigger("update", {
                                percentage: a
                            });
                        },
                        render: function(a) {
                            (a = Math.max(0, Math.min(a, 100))),
                                "horizontal" === this.orientation
                                    ? ((this.elementThumb.style.left = a + "%"),
                                      (this.elementProgress.style.width = a + "%"))
                                    : ((this.elementThumb.style.bottom = a + "%"),
                                      (this.elementProgress.style.height = a + "%"));
                        },
                        updateBuffer: function(a) {
                            this.elementBuffer.style.width = a + "%";
                        },
                        element: function() {
                            return this.el;
                        }
                    });
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(46), c(44)]),
                (e = function(a, b) {
                    function c() {}
                    var d = function(a, c) {
                        var d,
                            e = this;
                        (d =
                            a && b.has(a, "constructor")
                                ? a.constructor
                                : function() {
                                      return e.apply(this, arguments);
                                  }),
                            b.extend(d, e, c);
                        var f = function() {
                            this.constructor = d;
                        };
                        return (
                            (f.prototype = e.prototype),
                            (d.prototype = new f()),
                            a && b.extend(d.prototype, a),
                            (d.__super__ = e.prototype),
                            d
                        );
                    };
                    return (c.extend = d), b.extend(c.prototype, a), c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        '<div class="' +
                        h(
                            ((e = null != (e = b.className || (null != a ? a.className : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "className",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        " " +
                        h(
                            ((e = null != (e = b.orientation || (null != a ? a.orientation : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "orientation",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        ' jw-reset">\n    <div class="jw-slider-container jw-reset">\n        <div class="jw-rail jw-reset"></div>\n        <div class="jw-buffer jw-reset"></div>\n        <div class="jw-progress jw-reset"></div>\n        <div class="jw-knob jw-reset"></div>\n    </div>\n</div>'
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(137), c(47)]),
                (e = function(a, b) {
                    var c = a.extend({
                        constructor: function(a) {
                            (this.el = document.createElement("div")),
                                (this.el.className =
                                    "jw-icon jw-icon-tooltip " + a + " jw-button-color jw-reset jw-hidden"),
                                (this.container = document.createElement("div")),
                                (this.container.className = "jw-overlay jw-reset"),
                                (this.openClass = "jw-open"),
                                (this.componentType = "tooltip"),
                                this.el.appendChild(this.container);
                        },
                        addContent: function(a) {
                            this.content && this.removeContent(), (this.content = a), this.container.appendChild(a);
                        },
                        removeContent: function() {
                            this.content && (this.container.removeChild(this.content), (this.content = null));
                        },
                        hasContent: function() {
                            return !!this.content;
                        },
                        element: function() {
                            return this.el;
                        },
                        openTooltip: function(a) {
                            this.trigger("open-" + this.componentType, a, {
                                isOpen: !0
                            }),
                                (this.isOpen = !0),
                                b.toggleClass(this.el, this.openClass, this.isOpen);
                        },
                        closeTooltip: function(a) {
                            this.trigger("close-" + this.componentType, a, {
                                isOpen: !1
                            }),
                                (this.isOpen = !1),
                                b.toggleClass(this.el, this.openClass, this.isOpen);
                        },
                        toggleOpenState: function(a) {
                            this.isOpen ? this.closeTooltip(a) : this.openTooltip(a);
                        }
                    });
                    return c;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(47), c(112)]),
                (e = function(a, b, c) {
                    function d(a, b) {
                        (this.time = a),
                            (this.text = b),
                            (this.el = document.createElement("div")),
                            (this.el.className = "jw-cue jw-reset");
                    }
                    a.extend(d.prototype, {
                        align: function(a) {
                            if ("%" === this.time.toString().slice(-1)) this.pct = this.time;
                            else {
                                var b = (this.time / a) * 100;
                                this.pct = b + "%";
                            }
                            this.el.style.left = this.pct;
                        }
                    });
                    var e = {
                        loadChapters: function(a) {
                            b.ajax(a, this.chaptersLoaded.bind(this), this.chaptersFailed, !0);
                        },
                        chaptersLoaded: function(b) {
                            var d = c(b.responseText);
                            a.isArray(d) && (a.each(d, this.addCue, this), this.drawCues());
                        },
                        chaptersFailed: function() {},
                        addCue: function(a) {
                            this.cues.push(new d(a.begin, a.text));
                        },
                        drawCues: function() {
                            var b = this._model.mediaModel.get("duration");
                            if (!b || 0 >= b)
                                return void this._model.mediaModel.once("change:duration", this.drawCues, this);
                            var c = this;
                            a.each(this.cues, function(a) {
                                a.align(b),
                                    a.el.addEventListener("mouseover", function() {
                                        c.activeCue = a;
                                    }),
                                    a.el.addEventListener("mouseout", function() {
                                        c.activeCue = null;
                                    }),
                                    c.elementRail.appendChild(a.el);
                            });
                        },
                        resetChapters: function() {
                            a.each(
                                this.cues,
                                function(a) {
                                    a.el.parentNode && a.el.parentNode.removeChild(a.el);
                                },
                                this
                            ),
                                (this.cues = []);
                        }
                    };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(47), c(112)]),
                (e = function(a, b, c) {
                    function d(a) {
                        (this.begin = a.begin), (this.end = a.end), (this.img = a.text);
                    }
                    var e = {
                        loadThumbnails: function(a) {
                            a &&
                                ((this.vttPath = a
                                    .split("?")[0]
                                    .split("/")
                                    .slice(0, -1)
                                    .join("/")),
                                (this.individualImage = null),
                                b.ajax(a, this.thumbnailsLoaded.bind(this), this.thumbnailsFailed.bind(this), !0));
                        },
                        thumbnailsLoaded: function(b) {
                            var e = c(b.responseText);
                            a.isArray(e) &&
                                (a.each(
                                    e,
                                    function(a) {
                                        this.thumbnails.push(new d(a));
                                    },
                                    this
                                ),
                                this.drawCues());
                        },
                        thumbnailsFailed: function() {},
                        chooseThumbnail: function(b) {
                            var c = a.sortedIndex(
                                this.thumbnails,
                                {
                                    end: b
                                },
                                a.property("end")
                            );
                            c >= this.thumbnails.length && (c = this.thumbnails.length - 1);
                            var d = this.thumbnails[c].img;
                            return d.indexOf("://") < 0 && (d = this.vttPath ? this.vttPath + "/" + d : d), d;
                        },
                        loadThumbnail: function(b) {
                            var c = this.chooseThumbnail(b),
                                d = {
                                    display: "block",
                                    margin: "0 auto",
                                    backgroundPosition: "0 0"
                                },
                                e = c.indexOf("#xywh");
                            if (e > 0)
                                try {
                                    var f = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(c);
                                    (c = f[1]),
                                        (d.backgroundPosition = -1 * f[2] + "px " + -1 * f[3] + "px"),
                                        (d.width = f[4]),
                                        (d.height = f[5]);
                                } catch (g) {
                                    return;
                                }
                            else
                                this.individualImage ||
                                    ((this.individualImage = new Image()),
                                    (this.individualImage.onload = a.bind(function() {
                                        (this.individualImage.onload = null),
                                            this.timeTip.image({
                                                width: this.individualImage.width,
                                                height: this.individualImage.height
                                            });
                                    }, this)),
                                    (this.individualImage.src = c));
                            return (d.backgroundImage = 'url("' + c + '")'), d;
                        },
                        showThumbnail: function(a) {
                            this.thumbnails.length < 1 || this.timeTip.image(this.loadThumbnail(a));
                        },
                        resetThumbnails: function() {
                            this.timeTip.image({
                                backgroundImage: "",
                                width: 0,
                                height: 0
                            }),
                                (this.thumbnails = []);
                        }
                    };
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(139), c(47), c(44), c(119), c(143)]),
                (e = function(a, b, c, d, e) {
                    var f = a.extend({
                        setup: function(a, f, g) {
                            this.iconUI ||
                                ((this.iconUI = new d(this.el, {
                                    useHover: !0,
                                    directSelect: !0
                                })),
                                (this.toggleValueListener = this.toggleValue.bind(this)),
                                (this.toggleOpenStateListener = this.toggleOpenState.bind(this)),
                                (this.openTooltipListener = this.openTooltip.bind(this)),
                                (this.closeTooltipListener = this.closeTooltip.bind(this)),
                                (this.selectListener = this.select.bind(this))),
                                this.reset(),
                                (a = c.isArray(a) ? a : []),
                                b.toggleClass(this.el, "jw-hidden", a.length < 2);
                            var h = a.length > 2 || (2 === a.length && g && g.toggle === !1),
                                i = !h && 2 === a.length;
                            if (
                                (b.toggleClass(this.el, "jw-toggle", i),
                                b.toggleClass(this.el, "jw-button-color", !i),
                                (this.isActive = h || i),
                                h)
                            ) {
                                b.removeClass(this.el, "jw-off"),
                                    this.iconUI
                                        .on("tap", this.toggleOpenStateListener)
                                        .on("over", this.openTooltipListener)
                                        .on("out", this.closeTooltipListener);
                                var j = e(a),
                                    k = b.createElement(j);
                                this.addContent(k),
                                    (this.contentUI = new d(this.content).on("click tap", this.selectListener));
                            } else i && this.iconUI.on("click tap", this.toggleValueListener);
                            this.selectItem(f);
                        },
                        toggleValue: function() {
                            this.trigger("toggleValue");
                        },
                        select: function(a) {
                            if (a.target.parentElement === this.content) {
                                var d = b.classList(a.target),
                                    e = c.find(d, function(a) {
                                        return 0 === a.indexOf("jw-item");
                                    });
                                e && (this.trigger("select", parseInt(e.split("-")[2])), this.closeTooltipListener());
                            }
                        },
                        selectItem: function(a) {
                            if (this.content)
                                for (var c = 0; c < this.content.children.length; c++)
                                    b.toggleClass(this.content.children[c], "jw-active-option", a === c);
                            else b.toggleClass(this.el, "jw-off", 0 === a);
                        },
                        reset: function() {
                            b.addClass(this.el, "jw-off"),
                                this.iconUI.off(),
                                this.contentUI && this.contentUI.off().destroy(),
                                this.removeContent();
                        }
                    });
                    return f;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                1: function(a, b, c, d) {
                    var e = this.lambda,
                        f = this.escapeExpression;
                    return (
                        "        <li class='jw-text jw-option jw-item-" +
                        f(e(d && d.index, a)) +
                        " jw-reset'>" +
                        f(e(null != a ? a.label : a, a)) +
                        "</li>\n"
                    );
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = '<ul class="jw-menu jw-background-color jw-reset">\n';
                    return (
                        (e = b.each.call(a, a, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (f += e),
                        f + "</ul>"
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(44), c(139), c(119), c(145)]),
                (e = function(a, b, c, d, e) {
                    var f = c.extend({
                        setup: function(c, e) {
                            if (
                                (this.iconUI ||
                                    ((this.iconUI = new d(this.el, {
                                        useHover: !0
                                    })),
                                    (this.toggleOpenStateListener = this.toggleOpenState.bind(this)),
                                    (this.openTooltipListener = this.openTooltip.bind(this)),
                                    (this.closeTooltipListener = this.closeTooltip.bind(this)),
                                    (this.selectListener = this.onSelect.bind(this))),
                                this.reset(),
                                (c = b.isArray(c) ? c : []),
                                a.toggleClass(this.el, "jw-hidden", c.length < 2),
                                c.length >= 2)
                            ) {
                                this.iconUI = new d(this.el, {
                                    useHover: !0
                                })
                                    .on("tap", this.toggleOpenStateListener)
                                    .on("over", this.openTooltipListener)
                                    .on("out", this.closeTooltipListener);
                                var f = this.menuTemplate(c, e),
                                    g = a.createElement(f);
                                this.addContent(g),
                                    (this.contentUI = new d(this.content)),
                                    this.contentUI.on("click tap", this.selectListener);
                            }
                            this.originalList = c;
                        },
                        menuTemplate: function(a, c) {
                            var d = b.map(a, function(a, b) {
                                return {
                                    active: b === c,
                                    label: b + 1 + ".",
                                    title: a.title
                                };
                            });
                            return e(d);
                        },
                        onSelect: function(c) {
                            var d = c.target;
                            if ("UL" !== d.tagName) {
                                "LI" !== d.tagName && (d = d.parentElement);
                                var e = a.classList(d),
                                    f = b.find(e, function(a) {
                                        return 0 === a.indexOf("jw-item");
                                    });
                                f && (this.trigger("select", parseInt(f.split("-")[2])), this.closeTooltip());
                            }
                        },
                        selectItem: function(a) {
                            this.setup(this.originalList, a);
                        },
                        reset: function() {
                            this.iconUI.off(), this.contentUI && this.contentUI.off().destroy(), this.removeContent();
                        }
                    });
                    return f;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                1: function(a, b, c, d) {
                    var e,
                        f = "";
                    return (
                        (e = b["if"].call(a, null != a ? a.active : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(2, d),
                            inverse: this.program(4, d),
                            data: d
                        })),
                        null != e && (f += e),
                        f
                    );
                },
                2: function(a, b, c, d) {
                    var e = this.lambda,
                        f = this.escapeExpression;
                    return (
                        "                <li class='jw-option jw-text jw-active-option jw-item-" +
                        f(e(d && d.index, a)) +
                        ' jw-reset\'>\n                    <span class="jw-label jw-reset"><span class="jw-icon jw-icon-play jw-reset"></span></span>\n                    <span class="jw-name jw-reset">' +
                        f(e(null != a ? a.title : a, a)) +
                        "</span>\n                </li>\n"
                    );
                },
                4: function(a, b, c, d) {
                    var e = this.lambda,
                        f = this.escapeExpression;
                    return (
                        "                <li class='jw-option jw-text jw-item-" +
                        f(e(d && d.index, a)) +
                        ' jw-reset\'>\n                    <span class="jw-label jw-reset">' +
                        f(e(null != a ? a.label : a, a)) +
                        '</span>\n                    <span class="jw-name jw-reset">' +
                        f(e(null != a ? a.title : a, a)) +
                        "</span>\n                </li>\n"
                    );
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f =
                            '<div class="jw-menu jw-playlist-container jw-background-color jw-reset">\n\n    <div class="jw-tooltip-title jw-reset">\n        <span class="jw-icon jw-icon-inline jw-icon-playlist jw-reset"></span>\n        <span class="jw-text jw-reset">PLAYLIST</span>\n    </div>\n\n    <ul class="jw-playlist jw-reset">\n';
                    return (
                        (e = b.each.call(a, a, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (f += e),
                        f + "    </ul>\n</div>"
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(139), c(136), c(119), c(47)]),
                (e = function(a, b, c, d) {
                    var e = a.extend({
                        constructor: function(e, f) {
                            (this._model = e),
                                a.call(this, f),
                                (this.volumeSlider = new b("jw-slider-volume jw-volume-tip", "vertical")),
                                this.addContent(this.volumeSlider.element()),
                                this.volumeSlider.on(
                                    "update",
                                    function(a) {
                                        this.trigger("update", a);
                                    },
                                    this
                                ),
                                d.removeClass(this.el, "jw-hidden"),
                                new c(this.el, {
                                    useHover: !0,
                                    directSelect: !0
                                })
                                    .on("click", this.toggleValue, this)
                                    .on("tap", this.toggleOpenState, this)
                                    .on("over", this.openTooltip, this)
                                    .on("out", this.closeTooltip, this),
                                this._model.on("change:volume", this.onVolume, this);
                        },
                        toggleValue: function() {
                            this.trigger("toggleValue");
                        }
                    });
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(139), c(47), c(44), c(119)]),
                (e = function(a, b, c, d) {
                    var e = a.extend({
                        constructor: function(b) {
                            a.call(this, b),
                                (this.container.className = "jw-overlay-horizontal jw-reset"),
                                (this.openClass = "jw-open-drawer"),
                                (this.componentType = "drawer");
                        },
                        setup: function(a, e) {
                            this.iconUI ||
                                ((this.iconUI = new d(this.el, {
                                    useHover: !0,
                                    directSelect: !0
                                })),
                                (this.toggleOpenStateListener = this.toggleOpenState.bind(this)),
                                (this.openTooltipListener = this.openTooltip.bind(this)),
                                (this.closeTooltipListener = this.closeTooltip.bind(this))),
                                this.reset(),
                                (a = c.isArray(a) ? a : []),
                                (this.activeContents = c.filter(a, function(a) {
                                    return a.isActive;
                                })),
                                b.toggleClass(this.el, "jw-hidden", !e || this.activeContents.length < 2),
                                e &&
                                    this.activeContents.length > 1 &&
                                    (b.removeClass(this.el, "jw-off"),
                                    this.iconUI
                                        .on("tap", this.toggleOpenStateListener)
                                        .on("over", this.openTooltipListener)
                                        .on("out", this.closeTooltipListener),
                                    c.each(
                                        a,
                                        function(a) {
                                            this.container.appendChild(a.el);
                                        },
                                        this
                                    ));
                        },
                        reset: function() {
                            b.addClass(this.el, "jw-off"),
                                this.iconUI.off(),
                                this.contentUI && this.contentUI.off().destroy(),
                                this.removeContent();
                        }
                    });
                    return e;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = function(a) {
                        (this.model = a), this.model.on("change:playlistItem", this.loadImage, this);
                    };
                    return (
                        a.extend(b.prototype, {
                            setup: function(a) {
                                (this.el = a),
                                    this.model.get("playlistItem") &&
                                        this.loadImage(this.model, this.model.get("playlistItem"));
                            },
                            loadImage: function(b, c) {
                                var d = c.image;
                                a.isString(d)
                                    ? ((d = encodeURI(d)), (this.el.style.backgroundImage = 'url("' + d + '")'))
                                    : (this.el.style.backgroundImage = "");
                            },
                            element: function() {
                                return this.el;
                            }
                        }),
                        b
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(81), c(150), c(44), c(59)]),
                (e = function(a, b, c, d) {
                    function e(a) {
                        return "pro" === a
                            ? "p"
                            : "premium" === a
                            ? "r"
                            : "enterprise" === a
                            ? "e"
                            : "ads" === a
                            ? "a"
                            : "f";
                    }
                    var f = function() {};
                    return (
                        c.extend(f.prototype, b.prototype, {
                            buildArray: function() {
                                var c = b.prototype.buildArray.apply(this, arguments),
                                    f = this.model.get("edition"),
                                    g = "//jwplayer.com/learn-more/?m=h&e=" + e(f) + "&v=" + d;
                                c.items[0].link = g;
                                var h = a(f);
                                if (!h("custom-rightclick")) return c;
                                if (this.model.get("abouttext")) {
                                    (c.items[0].showLogo = !1), c.items.push(c.items.shift());
                                    var i = {
                                        title: this.model.get("abouttext"),
                                        link: this.model.get("aboutlink") || g
                                    };
                                    c.items.unshift(i);
                                }
                                return c;
                            }
                        }),
                        f
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(151), c(44), c(119), c(59)]),
                (e = function(a, b, c, d, e) {
                    var f = function() {};
                    return (
                        c.extend(f.prototype, {
                            buildArray: function() {
                                var b = e.split("+"),
                                    c = b[0],
                                    d = {
                                        items: [
                                            {
                                                title: "Powered by JW Player " + c,
                                                featured: !0,
                                                showLogo: !0,
                                                link: "//jwplayer.com/learn-more/?m=h&e=o&v=" + e
                                            }
                                        ]
                                    },
                                    f = c.indexOf("-") > 0,
                                    g = b[1];
                                if (f && g) {
                                    var h = g.split(".");
                                    d.items.push({
                                        title: "build: (" + h[0] + "." + h[1] + ")",
                                        link: "#"
                                    });
                                }
                                var i = this.model.get("provider").name;
                                if (i.indexOf("flash") >= 0) {
                                    var j = "Flash Version " + a.flashVersion();
                                    d.items.push({
                                        title: j,
                                        link: "http://www.adobe.com/software/flash/about/"
                                    });
                                }
                                return d;
                            },
                            buildMenu: function() {
                                var c = this.buildArray();
                                return a.createElement(b(c));
                            },
                            updateHtml: function() {
                                this.el.innerHTML = this.buildMenu().innerHTML;
                            },
                            rightClick: function(a) {
                                return (
                                    this.lazySetup(),
                                    this.mouseOverContext ? !1 : (this.hideMenu(), this.showMenu(a), !1)
                                );
                            },
                            getOffset: function(a) {
                                for (
                                    var b = a.target, c = a.offsetX || a.layerX, d = a.offsetY || a.layerY;
                                    b !== this.playerElement;

                                )
                                    (c += b.offsetLeft), (d += b.offsetTop), (b = b.parentNode);
                                return {
                                    x: c,
                                    y: d
                                };
                            },
                            showMenu: function(b) {
                                var c = this.getOffset(b);
                                return (
                                    (this.el.style.left = c.x + "px"),
                                    (this.el.style.top = c.y + "px"),
                                    a.addClass(this.playerElement, "jw-flag-rightclick-open"),
                                    a.addClass(this.el, "jw-open"),
                                    !1
                                );
                            },
                            hideMenu: function() {
                                this.mouseOverContext ||
                                    (a.removeClass(this.playerElement, "jw-flag-rightclick-open"),
                                    a.removeClass(this.el, "jw-open"));
                            },
                            lazySetup: function() {
                                this.el ||
                                    ((this.el = this.buildMenu()),
                                    this.layer.appendChild(this.el),
                                    (this.hideMenuHandler = this.hideMenu.bind(this)),
                                    this.addOffListener(this.playerElement),
                                    this.addOffListener(document),
                                    this.model.on("change:provider", this.updateHtml, this),
                                    (this.elementUI = new d(this.el, {
                                        useHover: !0
                                    })
                                        .on(
                                            "over",
                                            function() {
                                                this.mouseOverContext = !0;
                                            },
                                            this
                                        )
                                        .on(
                                            "out",
                                            function() {
                                                this.mouseOverContext = !1;
                                            },
                                            this
                                        )));
                            },
                            setup: function(a, b, c) {
                                (this.playerElement = b),
                                    (this.model = a),
                                    (this.mouseOverContext = !1),
                                    (this.layer = c),
                                    (b.oncontextmenu = this.rightClick.bind(this));
                            },
                            addOffListener: function(a) {
                                a.addEventListener("mousedown", this.hideMenuHandler),
                                    a.addEventListener("touchstart", this.hideMenuHandler),
                                    a.addEventListener("pointerdown", this.hideMenuHandler);
                            },
                            removeOffListener: function(a) {
                                a.removeEventListener("mousedown", this.hideMenuHandler),
                                    a.removeEventListener("touchstart", this.hideMenuHandler),
                                    a.removeEventListener("pointerdown", this.hideMenuHandler);
                            },
                            destroy: function() {
                                this.el &&
                                    (this.hideMenu(),
                                    this.elementUI.off(),
                                    this.removeOffListener(this.playerElement),
                                    this.removeOffListener(document),
                                    (this.hideMenuHandler = null),
                                    (this.el = null)),
                                    this.playerElement &&
                                        ((this.playerElement.oncontextmenu = null), (this.playerElement = null)),
                                    this.model &&
                                        (this.model.off("change:provider", this.updateHtml), (this.model = null));
                            }
                        }),
                        f
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                1: function(a, b, c, d) {
                    var e,
                        f,
                        g = "function",
                        h = b.helperMissing,
                        i = this.escapeExpression,
                        j = '        <li class="jw-reset';
                    return (
                        (e = b["if"].call(a, null != a ? a.featured : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(2, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (j += e),
                        (j +=
                            '">\n            <a href="' +
                            i(
                                ((f = null != (f = b.link || (null != a ? a.link : a)) ? f : h),
                                typeof f === g
                                    ? f.call(a, {
                                          name: "link",
                                          hash: {},
                                          data: d
                                      })
                                    : f)
                            ) +
                            '" class="jw-reset" target="_top">\n'),
                        (e = b["if"].call(a, null != a ? a.showLogo : a, {
                            name: "if",
                            hash: {},
                            fn: this.program(4, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (j += e),
                        j +
                            "                " +
                            i(
                                ((f = null != (f = b.title || (null != a ? a.title : a)) ? f : h),
                                typeof f === g
                                    ? f.call(a, {
                                          name: "title",
                                          hash: {},
                                          data: d
                                      })
                                    : f)
                            ) +
                            "\n            </a>\n        </li>\n"
                    );
                },
                2: function(a, b, c, d) {
                    return " jw-featured";
                },
                4: function(a, b, c, d) {
                    return '                <span class="jw-icon jw-rightclick-logo jw-reset"></span>\n';
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = '<div class="jw-rightclick jw-reset">\n    <ul class="jw-reset">\n';
                    return (
                        (e = b.each.call(a, null != a ? a.items : a, {
                            name: "each",
                            hash: {},
                            fn: this.program(1, d),
                            inverse: this.noop,
                            data: d
                        })),
                        null != e && (f += e),
                        f + "    </ul>\n</div>"
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    var b = function(a) {
                        (this.model = a), this.model.on("change:playlistItem", this.playlistItem, this);
                    };
                    return (
                        a.extend(b.prototype, {
                            hide: function() {
                                this.el.style.display = "none";
                            },
                            show: function() {
                                this.el.style.display = "";
                            },
                            setup: function(a) {
                                this.el = a;
                                var b = this.el.getElementsByTagName("div");
                                (this.title = b[0]),
                                    (this.description = b[1]),
                                    this.model.get("playlistItem") &&
                                        this.playlistItem(this.model, this.model.get("playlistItem"));
                            },
                            playlistItem: function(a, b) {
                                if (a.get("displaytitle") || a.get("displaydescription")) {
                                    var c = "",
                                        d = "";
                                    b.title && a.get("displaytitle") && (c = b.title),
                                        b.description && a.get("displaydescription") && (d = b.description),
                                        this.updateText(c, d);
                                } else this.hide();
                            },
                            updateText: function(a, b) {
                                (this.title.innerHTML = a),
                                    (this.description.innerHTML = b),
                                    this.title.firstChild || this.description.firstChild ? this.show() : this.hide();
                            },
                            element: function() {
                                return this.el;
                            }
                        }),
                        b
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        '<div id="' +
                        h(
                            ((e = null != (e = b.id || (null != a ? a.id : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "id",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        '" class="jwplayer jw-reset" tabindex="0">\n    <div class="jw-aspect jw-reset"></div>\n    <div class="jw-media jw-reset"></div>\n    <div class="jw-preview jw-reset"></div>\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset"></div>\n        <div class="jw-title-secondary jw-reset"></div>\n    </div>\n    <div class="jw-overlays jw-reset"></div>\n    <div class="jw-controls jw-reset"></div>\n</div>'
                    );
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(47), c(45), c(119), c(46), c(44), c(155)]),
                (e = function(a, b, c, d, e, f) {
                    var g = function(a) {
                        (this.model = a), this.setup();
                    };
                    return (
                        e.extend(g.prototype, d, {
                            setup: function() {
                                this.destroy(),
                                    (this.skipMessage = this.model.get("skipText")),
                                    (this.skipMessageCountdown = this.model.get("skipMessage")),
                                    this.setWaitTime(this.model.get("skipOffset"));
                                var b = f();
                                (this.el = a.createElement(b)),
                                    (this.skiptext = this.el.getElementsByClassName("jw-skiptext")[0]),
                                    (this.skipAdOnce = e.once(this.skipAd.bind(this))),
                                    new c(this.el).on(
                                        "click tap",
                                        e.bind(function() {
                                            this.skippable && this.skipAdOnce();
                                        }, this)
                                    ),
                                    this.model.on("change:duration", this.onChangeDuration, this),
                                    this.model.on("change:position", this.onChangePosition, this),
                                    this.onChangeDuration(this.model, this.model.get("duration")),
                                    this.onChangePosition(this.model, this.model.get("position"));
                            },
                            updateMessage: function(a) {
                                this.skiptext.innerHTML = a;
                            },
                            updateCountdown: function(a) {
                                this.updateMessage(
                                    this.skipMessageCountdown.replace(/xx/gi, Math.ceil(this.waitTime - a))
                                );
                            },
                            onChangeDuration: function(b, c) {
                                if (c) {
                                    if (this.waitPercentage) {
                                        if (!c) return;
                                        (this.itemDuration = c),
                                            this.setWaitTime(this.waitPercentage),
                                            delete this.waitPercentage;
                                    }
                                    a.removeClass(this.el, "jw-hidden");
                                }
                            },
                            onChangePosition: function(b, c) {
                                this.waitTime - c > 0
                                    ? this.updateCountdown(c)
                                    : (this.updateMessage(this.skipMessage),
                                      (this.skippable = !0),
                                      a.addClass(this.el, "jw-skippable"));
                            },
                            element: function() {
                                return this.el;
                            },
                            setWaitTime: function(b) {
                                if (e.isString(b) && "%" === b.slice(-1)) {
                                    var c = parseFloat(b);
                                    return void (this.itemDuration && !isNaN(c)
                                        ? (this.waitTime = (this.itemDuration * c) / 100)
                                        : (this.waitPercentage = b));
                                }
                                e.isNumber(b)
                                    ? (this.waitTime = b)
                                    : "string" === a.typeOf(b)
                                    ? (this.waitTime = a.seconds(b))
                                    : isNaN(Number(b))
                                    ? (this.waitTime = 0)
                                    : (this.waitTime = Number(b));
                            },
                            skipAd: function() {
                                this.trigger(b.JWPLAYER_AD_SKIPPED);
                            },
                            destroy: function() {
                                this.el &&
                                    (this.el.removeEventListener("click", this.skipAdOnce),
                                    this.el.parentElement && this.el.parentElement.removeChild(this.el)),
                                    delete this.skippable,
                                    delete this.itemDuration,
                                    delete this.waitPercentage;
                            }
                        }),
                        g
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    return '<div class="jw-skip jw-background-color jw-hidden jw-reset">\n    <span class="jw-text jw-skiptext jw-reset"></span>\n    <span class="jw-icon-inline jw-skip-icon jw-reset"></span>\n</div>';
                },
                useData: !0
            });
        },
        function(a, b, c) {
            var d, e;
            (d = [c(157)]),
                (e = function(a) {
                    function b(b, c, d, e) {
                        return a({
                            id: b,
                            skin: c,
                            title: d,
                            body: e
                        });
                    }
                    return b;
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(121);
            a.exports = (d["default"] || d).template({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(a, b, c, d) {
                    var e,
                        f = "function",
                        g = b.helperMissing,
                        h = this.escapeExpression;
                    return (
                        '<div id="' +
                        h(
                            ((e = null != (e = b.id || (null != a ? a.id : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "id",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        '"class="jw-skin-' +
                        h(
                            ((e = null != (e = b.skin || (null != a ? a.skin : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "skin",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        ' jw-error jw-reset">\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset">' +
                        h(
                            ((e = null != (e = b.title || (null != a ? a.title : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "title",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        '</div>\n        <div class="jw-title-secondary jw-reset">' +
                        h(
                            ((e = null != (e = b.body || (null != a ? a.body : a)) ? e : g),
                            typeof e === f
                                ? e.call(a, {
                                      name: "body",
                                      hash: {},
                                      data: d
                                  })
                                : e)
                        ) +
                        '</div>\n    </div>\n\n    <div class="jw-icon-container jw-reset">\n        <div class="jw-display-icon-container jw-background-color jw-reset">\n            <div class="jw-icon jw-icon-display jw-reset"></div>\n        </div>\n    </div>\n</div>\n'
                    );
                },
                useData: !0
            });
        },
        ,
        ,
        ,
        function(a, b, c) {
            var d, e;
            (d = []),
                (e = function() {
                    var a = window.chrome,
                        b = {};
                    return (
                        (b.NS = "urn:x-cast:com.longtailvideo.jwplayer"),
                        (b.debug = !1),
                        (b.availability = null),
                        (b.available = function(c) {
                            c = c || b.availability;
                            var d = "available";
                            return (
                                a &&
                                    a.cast &&
                                    a.cast.ReceiverAvailability &&
                                    (d = a.cast.ReceiverAvailability.AVAILABLE),
                                c === d
                            );
                        }),
                        (b.log = function() {
                            if (b.debug) {
                                var a = Array.prototype.slice.call(arguments, 0);
                                console.log.apply(console, a);
                            }
                        }),
                        (b.error = function() {
                            var a = Array.prototype.slice.call(arguments, 0);
                            console.error.apply(console, a);
                        }),
                        b
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        ,
        ,
        function(a, b, c) {
            var d, e;
            (d = [c(98), c(44)]),
                (e = function(a, b) {
                    return function(c, d) {
                        var e = [
                            "seek",
                            "skipAd",
                            "stop",
                            "playlistNext",
                            "playlistPrev",
                            "playlistItem",
                            "resize",
                            "addButton",
                            "removeButton",
                            "registerPlugin",
                            "attachMedia"
                        ];
                        b.each(e, function(a) {
                            c[a] = function() {
                                return d[a].apply(d, arguments), c;
                            };
                        }),
                            (c.registerPlugin = a.registerPlugin);
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44)]),
                (e = function(a) {
                    return function(b, c) {
                        var d = [
                            "buffer",
                            "controls",
                            "position",
                            "duration",
                            "fullscreen",
                            "volume",
                            "mute",
                            "item",
                            "stretching",
                            "playlist"
                        ];
                        a.each(d, function(a) {
                            var d = a.slice(0, 1).toUpperCase() + a.slice(1);
                            b["get" + d] = function() {
                                return c._model.get(a);
                            };
                        });
                        var e = [
                                "getAudioTracks",
                                "getCaptionsList",
                                "getWidth",
                                "getHeight",
                                "getCurrentAudioTrack",
                                "setCurrentAudioTrack",
                                "getCurrentCaptions",
                                "setCurrentCaptions",
                                "getCurrentQuality",
                                "setCurrentQuality",
                                "getQualityLevels",
                                "getVisualQuality",
                                "getConfig",
                                "getState",
                                "getSafeRegion",
                                "isBeforeComplete",
                                "isBeforePlay",
                                "getProvider",
                                "detachMedia"
                            ],
                            f = ["setControls", "setFullscreen", "setVolume", "setMute", "setCues"];
                        a.each(e, function(a) {
                            b[a] = function() {
                                return c[a] ? c[a].apply(c, arguments) : null;
                            };
                        }),
                            a.each(f, function(a) {
                                b[a] = function() {
                                    return c[a].apply(c, arguments), b;
                                };
                            });
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d, e;
            (d = [c(44), c(45)]),
                (e = function(a, b) {
                    return function(c) {
                        var d = {
                                onBufferChange: b.JWPLAYER_MEDIA_BUFFER,
                                onBufferFull: b.JWPLAYER_MEDIA_BUFFER_FULL,
                                onError: b.JWPLAYER_ERROR,
                                onSetupError: b.JWPLAYER_SETUP_ERROR,
                                onFullscreen: b.JWPLAYER_FULLSCREEN,
                                onMeta: b.JWPLAYER_MEDIA_META,
                                onMute: b.JWPLAYER_MEDIA_MUTE,
                                onPlaylist: b.JWPLAYER_PLAYLIST_LOADED,
                                onPlaylistItem: b.JWPLAYER_PLAYLIST_ITEM,
                                onPlaylistComplete: b.JWPLAYER_PLAYLIST_COMPLETE,
                                onReady: b.JWPLAYER_READY,
                                onResize: b.JWPLAYER_RESIZE,
                                onComplete: b.JWPLAYER_MEDIA_COMPLETE,
                                onSeek: b.JWPLAYER_MEDIA_SEEK,
                                onTime: b.JWPLAYER_MEDIA_TIME,
                                onVolume: b.JWPLAYER_MEDIA_VOLUME,
                                onBeforePlay: b.JWPLAYER_MEDIA_BEFOREPLAY,
                                onBeforeComplete: b.JWPLAYER_MEDIA_BEFORECOMPLETE,
                                onDisplayClick: b.JWPLAYER_DISPLAY_CLICK,
                                onControls: b.JWPLAYER_CONTROLS,
                                onQualityLevels: b.JWPLAYER_MEDIA_LEVELS,
                                onQualityChange: b.JWPLAYER_MEDIA_LEVEL_CHANGED,
                                onCaptionsList: b.JWPLAYER_CAPTIONS_LIST,
                                onCaptionsChange: b.JWPLAYER_CAPTIONS_CHANGED,
                                onAdError: b.JWPLAYER_AD_ERROR,
                                onAdClick: b.JWPLAYER_AD_CLICK,
                                onAdImpression: b.JWPLAYER_AD_IMPRESSION,
                                onAdTime: b.JWPLAYER_AD_TIME,
                                onAdComplete: b.JWPLAYER_AD_COMPLETE,
                                onAdCompanions: b.JWPLAYER_AD_COMPANIONS,
                                onAdSkipped: b.JWPLAYER_AD_SKIPPED,
                                onAdPlay: b.JWPLAYER_AD_PLAY,
                                onAdPause: b.JWPLAYER_AD_PAUSE,
                                onAdMeta: b.JWPLAYER_AD_META,
                                onCast: b.JWPLAYER_CAST_SESSION,
                                onAudioTrackChange: b.JWPLAYER_AUDIO_TRACK_CHANGED,
                                onAudioTracks: b.JWPLAYER_AUDIO_TRACKS
                            },
                            e = {
                                onBuffer: "buffer",
                                onPause: "pause",
                                onPlay: "play",
                                onIdle: "idle"
                            };
                        a.each(e, function(b, d) {
                            c[d] = a.partial(c.on, b, a);
                        }),
                            a.each(d, function(b, d) {
                                c[d] = a.partial(c.on, b, a);
                            });
                    };
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        },
        function(a, b, c) {
            var d = c(168);
            "string" == typeof d && (d = [[a.id, d, ""]]);
            c(172)(d, {});
            d.locals && (a.exports = d.locals);
        },
        function(a, b, c) {
            (b = a.exports = c(169)()),
                b.push([
                    a.id,
                    ".jw-reset{color:inherit;background-color:transparent;padding:0;margin:0;float:none;font-family:Arial,Helvetica,sans-serif;font-size:1em;line-height:1em;list-style:none;text-align:left;text-transform:none;vertical-align:baseline;border:0;direction:ltr;font-variant:inherit;font-stretch:inherit;-webkit-tap-highlight-color:rgba(255,255,255,0)}@font-face{font-family:'jw-icons';src:url(" +
                        c(170) +
                        ") format('woff'),url(" +
                        c(171) +
                        ') format(\'truetype\');font-weight:normal;font-style:normal}.jw-icon-inline,.jw-icon-tooltip,.jw-icon-display,.jw-controlbar .jw-menu .jw-option:before{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-icon-audio-tracks:before{content:"\\e600"}.jw-icon-buffer:before{content:"\\e601"}.jw-icon-cast:before{content:"\\e603"}.jw-icon-cast.jw-off:before{content:"\\e602"}.jw-icon-cc:before{content:"\\e605"}.jw-icon-cue:before{content:"\\e606"}.jw-icon-menu-bullet:before{content:"\\e606"}.jw-icon-error:before{content:"\\e607"}.jw-icon-fullscreen:before{content:"\\e608"}.jw-icon-fullscreen.jw-off:before{content:"\\e613"}.jw-icon-hd:before{content:"\\e60a"}.jw-watermark:before,.jw-rightclick-logo:before{content:"\\e60b"}.jw-icon-next:before{content:"\\e60c"}.jw-icon-pause:before{content:"\\e60d"}.jw-icon-play:before{content:"\\e60e"}.jw-icon-prev:before{content:"\\e60f"}.jw-icon-replay:before{content:"\\e610"}.jw-icon-volume:before{content:"\\e612"}.jw-icon-volume.jw-off:before{content:"\\e611"}.jw-icon-more:before{content:"\\e614"}.jw-icon-close:before{content:"\\e615"}.jw-icon-playlist:before{content:"\\e616"}.jwplayer{width:100%;font-size:16px;position:relative;display:block;min-height:0;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;background-color:#000;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jwplayer *{box-sizing:inherit}.jwplayer.jw-flag-aspect-mode{height:auto !important}.jwplayer.jw-flag-aspect-mode .jw-aspect{display:block}.jwplayer .jw-aspect{display:none}.jwplayer:focus,.jwplayer .jw-swf{outline:none}.jwplayer:hover .jw-display-icon-container{background-color:#333;background:#333;background-size:#333}.jw-media,.jw-preview,.jw-overlays,.jw-controls{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jw-media{overflow:hidden;cursor:pointer}.jw-overlays{cursor:auto}.jw-media.jw-media-show{visibility:visible;opacity:1}.jw-media video{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:auto;background:transparent}.jw-media video::-webkit-media-controls-start-playback-button{display:none}.jw-controls.jw-controls-disabled{display:none}.jw-controls .jw-controls-right{position:absolute;top:0;right:0}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:normal;color:white;text-align:center;font-variant:normal;font-stretch:normal}.jw-plugin{position:absolute;bottom:2.5em}.jw-plugin .jw-banner{max-width:100%;opacity:0;cursor:pointer;position:absolute;margin:auto auto 0 auto;left:0;right:0;bottom:0;display:block}.jw-cast-screen{width:100%;height:100%}.jw-instream{position:absolute;top:0;right:0;bottom:0;left:0;display:none}.jw-icon-playback:before{content:"\\e60e"}.jw-tab-focus:focus{outline:solid 2px #0b7ef4}.jw-preview,.jw-captions,.jw-title,.jw-overlays,.jw-controls{pointer-events:none}.jw-overlays>div,.jw-media,.jw-controlbar,.jw-dock,.jw-logo,.jw-skip,.jw-display-icon-container{pointer-events:all}.jw-click{position:absolute;width:100%;height:100%}.jw-preview{position:absolute;display:none;opacity:1;visibility:visible;width:100%;height:100%;background:#000 no-repeat 50% 50%}.jwplayer .jw-preview,.jw-error .jw-preview,.jw-stretch-uniform .jw-preview{background-size:contain}.jw-stretch-none .jw-preview{background-size:auto auto}.jw-stretch-fill .jw-preview{background-size:cover}.jw-stretch-exactfit .jw-preview{background-size:100% 100%}.jw-display-icon-container{position:relative;top:50%;display:table;height:3.5em;width:3.5em;margin:-1.75em auto 0;cursor:pointer}.jw-display-icon-container .jw-icon-display{position:relative;display:table-cell;text-align:center;vertical-align:middle !important;background-position:50% 50%;background-repeat:no-repeat;font-size:2em}.jw-flag-audio-player .jw-display-icon-container,.jw-flag-dragging .jw-display-icon-container{display:none}.jw-icon{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-controlbar{display:table;position:absolute;right:0;left:0;bottom:0;height:2em;padding:0 .25em}.jw-controlbar .jw-hidden{display:none}.jw-controlbar.jw-drawer-expanded .jw-controlbar-left-group,.jw-controlbar.jw-drawer-expanded .jw-controlbar-center-group{opacity:0}.jw-background-color{background-color:#414040}.jw-group{display:table-cell}.jw-controlbar-center-group{width:100%;padding:0 .25em}.jw-controlbar-center-group .jw-slider-time,.jw-controlbar-center-group .jw-text-alt{padding:0}.jw-controlbar-center-group .jw-text-alt{display:none}.jw-controlbar-left-group,.jw-controlbar-right-group{white-space:nowrap}.jw-knob:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-icon-display:hover,.jw-option:before:hover{color:#eee}.jw-icon-inline,.jw-icon-tooltip,.jw-slider-horizontal,.jw-text-elapsed,.jw-text-duration{display:inline-block;height:2em;position:relative;line-height:2em;vertical-align:middle;cursor:pointer}.jw-icon-inline,.jw-icon-tooltip{min-width:1.25em;text-align:center}.jw-icon-playback{min-width:2.25em}.jw-icon-volume{min-width:1.75em;text-align:left}.jw-time-tip{line-height:1em;pointer-events:none}.jw-icon-inline:after,.jw-icon-tooltip:after{width:100%;height:100%;font-size:1em}.jw-icon-cast{display:none}.jw-slider-volume.jw-slider-horizontal,.jw-icon-inline.jw-icon-volume{display:none}.jw-dock{margin:.75em;display:block;opacity:1;clear:right}.jw-dock:after{content:\'\';clear:both;display:block}.jw-dock-button{cursor:pointer;float:right;position:relative;width:2.5em;height:2.5em;margin:.5em}.jw-dock-button .jw-arrow{display:none;position:absolute;bottom:-0.2em;width:.5em;height:.2em;left:50%;margin-left:-0.25em}.jw-dock-button .jw-overlay{display:none;position:absolute;top:2.5em;right:0;margin-top:.25em;padding:.5em;white-space:nowrap}.jw-dock-button:hover .jw-overlay,.jw-dock-button:hover .jw-arrow{display:block}.jw-dock-image{width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;opacity:.75}.jw-title{display:none;position:absolute;top:0;width:100%;font-size:.875em;height:8em;background:-webkit-linear-gradient(top, #000 0, #000 18%, rgba(0,0,0,0) 100%);background:linear-gradient(to bottom, #000 0, #000 18%, rgba(0,0,0,0) 100%)}.jw-title-primary,.jw-title-secondary{padding:.75em 1.5em;min-height:2.5em;width:75%;color:white;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.jw-title-primary{font-weight:bold}.jw-title-secondary{margin-top:-0.5em}.jw-slider-container{display:inline-block;height:1em;position:relative;-ms-touch-action:none;touch-action:none}.jw-rail,.jw-buffer,.jw-progress{position:absolute;cursor:pointer}.jw-progress{background-color:#fff}.jw-rail{background-color:#aaa}.jw-buffer{background-color:#202020}.jw-cue,.jw-knob{position:absolute;cursor:pointer}.jw-cue{background-color:#fff;width:.1em;height:.4em}.jw-knob{background-color:#aaa;width:.4em;height:.4em}.jw-slider-horizontal{width:4em;height:1em}.jw-slider-horizontal.jw-slider-volume{margin-right:5px}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress{width:100%;height:.4em}.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-buffer{width:0}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-slider-container{width:100%}.jw-slider-horizontal .jw-knob{left:0;margin-left:-0.325em}.jw-slider-vertical{width:.75em;height:4em;bottom:0;position:absolute;padding:1em}.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress{bottom:0;height:100%}.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-buffer{height:0}.jw-slider-vertical .jw-slider-container,.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-progress{bottom:0;width:.75em;height:100%;left:0;right:0;margin:0 auto}.jw-slider-vertical .jw-slider-container{height:4em;position:relative}.jw-slider-vertical .jw-knob{bottom:0;left:0;right:0;margin:0 auto}.jw-slider-time{right:0;left:0;width:100%}.jw-tooltip-time{position:absolute}.jw-slider-volume .jw-buffer{display:none}.jw-captions{position:absolute;display:none;margin:0 auto;width:100%;left:0;bottom:3em;right:0;max-width:90%;text-align:center}.jw-captions.jw-captions-enabled{display:block}.jw-captions-window{display:none;padding:.25em;border-radius:.25em}.jw-captions-window.jw-captions-window-active{display:inline-block}.jw-captions-text{display:inline-block;color:white;background-color:black;word-wrap:break-word;white-space:pre-line;font-style:normal;font-weight:normal;text-align:center;text-decoration:none;line-height:1.3em;padding:.1em .8em}.jw-rightclick{display:none;position:absolute;white-space:nowrap}.jw-rightclick.jw-open{display:block}.jw-rightclick ul{list-style:none;font-weight:bold;border-radius:.15em;margin:0;border:1px solid #444;padding-left:0}.jw-rightclick .jw-rightclick-logo{font-size:2em;color:#ff0147;vertical-align:middle;padding-right:.3em;margin-right:.3em;border-right:1px solid #444}.jw-rightclick li{background-color:#000;border-bottom:1px solid #444}.jw-rightclick a{color:#fff;text-decoration:none;padding:1em;display:block;font-size:.6875em}.jw-rightclick li:last-child{border-bottom:none}.jw-rightclick li:hover{background-color:#1a1a1a;cursor:pointer}.jw-rightclick .jw-featured{background-color:#252525;vertical-align:middle}.jw-rightclick .jw-featured a{color:#777}.jw-logo{float:right;padding:.75em;cursor:pointer;pointer-events:all}.jw-logo .jw-flag-audio-player{display:none}.jw-watermark{position:absolute;top:50%;left:0;right:0;bottom:0;text-align:center;font-size:14em;color:#eee;opacity:.33;pointer-events:none}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;visibility:visible}.jw-icon-tooltip.jw-hidden{display:none}.jw-overlay-horizontal{display:none}.jw-icon-tooltip.jw-open-drawer:before{display:none}.jw-icon-tooltip.jw-open-drawer .jw-overlay-horizontal{opacity:1;display:inline-block;vertical-align:top}.jw-overlay:before{position:absolute;top:0;bottom:0;left:-50%;width:100%;background-color:rgba(0,0,0,0);content:" "}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-time-tip,.jw-volume-tip,.jw-menu{position:relative;left:-50%;border:solid 1px #000;margin:0}.jw-volume-tip{width:100%;height:100%;display:block}.jw-time-tip{text-align:center;font-family:inherit;color:#aaa;bottom:1em;border:solid 4px #000}.jw-time-tip .jw-text{line-height:1em}.jw-controlbar .jw-overlay{margin:0;position:absolute;bottom:2em;left:50%;opacity:0;visibility:hidden}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;color:#aaa;padding:0 .5em;font-size:.8em}.jw-controlbar .jw-option:hover,.jw-controlbar .jw-option:before:hover{color:#eee}.jw-controlbar .jw-option:before{padding-right:.125em}.jw-playlist-container ::-webkit-scrollbar-track{background-color:#333;border-radius:10px}.jw-playlist-container ::-webkit-scrollbar{width:5px;border:10px solid black;border-bottom:0;border-top:0}.jw-playlist-container ::-webkit-scrollbar-thumb{background-color:white;border-radius:5px}.jw-tooltip-title{border-bottom:1px solid #444;text-align:left;padding-left:.7em}.jw-playlist{max-height:11em;min-height:4.5em;overflow-x:hidden;overflow-y:scroll;width:calc(100% - 4px)}.jw-playlist .jw-option{height:3em;margin-right:5px;color:white;padding-left:1em;font-size:.8em}.jw-playlist .jw-label,.jw-playlist .jw-name{display:inline-block;line-height:3em;text-align:left;overflow:hidden;white-space:nowrap}.jw-playlist .jw-label{width:1em}.jw-playlist .jw-name{width:11em}.jw-skip{cursor:default;position:absolute;float:right;display:inline-block;right:.75em;bottom:3em}.jw-skip.jw-skippable{cursor:pointer}.jw-skip.jw-hidden{visibility:hidden}.jw-skip .jw-skip-icon{display:none;margin-left:-0.75em}.jw-skip .jw-skip-icon:before{content:"\\e60c"}.jw-skip .jw-text,.jw-skip .jw-skip-icon{color:#aaa;vertical-align:middle;line-height:1.5em;font-size:.7em}.jw-skip.jw-skippable:hover{cursor:pointer}.jw-skip.jw-skippable:hover .jw-text,.jw-skip.jw-skippable:hover .jw-skip-icon{color:#eee}.jw-skip.jw-skippable .jw-skip-icon{display:inline;margin:0}.jwplayer.jw-state-playing.jw-flag-casting .jw-display-icon-container,.jwplayer.jw-state-paused.jw-flag-casting .jw-display-icon-container{display:table}.jwplayer.jw-flag-casting .jw-display-icon-container{border-radius:0;top:8em;padding:2em 5em;border:1px solid white}.jwplayer.jw-flag-casting .jw-display-icon-container .jw-icon{font-size:3em}.jwplayer.jw-flag-casting.jw-state-complete .jw-preview{display:none}.jw-cast{position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:auto;background-position:50% 50%}.jw-cast-label{position:absolute;left:10px;right:10px;bottom:50%;margin-bottom:100px;text-align:center}.jw-cast-name{color:#ccc}.jw-state-idle .jw-preview{display:block}.jw-state-idle .jw-icon-display:before{content:"\\e60e"}.jw-state-idle .jw-controlbar{display:none}.jw-state-idle .jw-captions{display:none}.jw-state-idle .jw-title{display:block}.jwplayer.jw-state-playing .jw-display-icon-container{display:none}.jwplayer.jw-state-playing .jw-display-icon-container .jw-icon-display:before{content:"\\e60d"}.jwplayer.jw-state-playing .jw-icon-playback:before{content:"\\e60d"}.jwplayer.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-state-paused .jw-display-icon-container .jw-icon-display:before{content:"\\e60e"}.jwplayer.jw-state-paused .jw-icon-playback:before{content:"\\e60e"}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display:before{content:"\\e601"}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-buffering .jw-icon-playback:before{content:"\\e60d"}.jwplayer.jw-state-complete .jw-preview{display:block}.jwplayer.jw-state-complete .jw-display-icon-container .jw-icon-display:before{content:"\\e610"}.jwplayer.jw-state-complete .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-complete .jw-icon-playback:before{content:"\\e60e"}.jwplayer.jw-state-complete .jw-captions{display:none}body .jw-error .jw-title,.jwplayer.jw-state-error .jw-title{display:block}body .jw-error .jw-title .jw-title-primary,.jwplayer.jw-state-error .jw-title .jw-title-primary{white-space:normal}body .jw-error .jw-preview,.jwplayer.jw-state-error .jw-preview{display:block}body .jw-error .jw-controlbar,.jwplayer.jw-state-error .jw-controlbar{display:none}body .jw-error .jw-captions,.jwplayer.jw-state-error .jw-captions{display:none}body .jw-error:hover .jw-display-icon-container,.jwplayer.jw-state-error:hover .jw-display-icon-container{cursor:default;color:#fff;background:#000}body .jw-error .jw-icon-display,.jwplayer.jw-state-error .jw-icon-display{cursor:default;font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}body .jw-error .jw-icon-display:before,.jwplayer.jw-state-error .jw-icon-display:before{content:"\\e607"}body .jw-error .jw-icon-display:hover,.jwplayer.jw-state-error .jw-icon-display:hover{color:#fff}body .jw-error{font-size:16px;background-color:#000;color:#eee;width:100%;height:100%;display:table;opacity:1;position:relative}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jwplayer.jw-flag-cast-available .jw-controlbar{display:table}.jwplayer.jw-flag-cast-available .jw-icon-cast{display:inline-block}.jwplayer.jw-flag-skin-loading .jw-captions,.jwplayer.jw-flag-skin-loading .jw-controls,.jwplayer.jw-flag-skin-loading .jw-title{display:none}.jwplayer.jw-flag-fullscreen{width:100% !important;height:100% !important;top:0;right:0;bottom:0;left:0;z-index:1000;margin:0;position:fixed}.jwplayer.jw-flag-fullscreen.jw-flag-user-inactive{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:inline}.jw-flag-user-inactive.jw-state-playing .jw-controlbar,.jw-flag-user-inactive.jw-state-playing .jw-dock{display:none}.jw-flag-user-inactive.jw-state-playing .jw-logo.jw-hide{display:none}.jw-flag-user-inactive.jw-state-playing .jw-plugin,.jw-flag-user-inactive.jw-state-playing .jw-captions{bottom:.5em}.jwplayer.jw-flag-media-audio .jw-controlbar{display:table}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-preview,.jwplayer.jw-flag-ads .jw-dock{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-text,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-horizontal{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-playback,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-fullscreen{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:inline}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-ads .jw-logo{display:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none !important}.jwplayer.jw-flag-ads.jw-flag-touch .jw-controlbar{display:table}.jwplayer.jw-flag-overlay-open .jw-title{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}.jw-flag-controls-disabled .jw-controls{visibility:hidden}.jw-flag-controls-disabled .jw-logo{visibility:visible}.jw-flag-controls-disabled .jw-media{cursor:auto}body .jwplayer.jw-flag-flash-blocked .jw-title{display:block}body .jwplayer.jw-flag-flash-blocked .jw-controls,body .jwplayer.jw-flag-flash-blocked .jw-overlays,body .jwplayer.jw-flag-flash-blocked .jw-preview{display:none}.jw-flag-touch .jw-controlbar,.jw-flag-touch .jw-skip,.jw-flag-touch .jw-plugin{font-size:1.5em}.jw-flag-touch .jw-captions{bottom:4.25em}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{display:inline}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{content:"\\e615"}.jw-flag-touch .jw-display-icon-container{pointer-events:none}.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:table}.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display-icon-container{display:none}.jw-flag-compact-player .jw-icon-playlist,.jw-flag-compact-player .jw-icon-next,.jw-flag-compact-player .jw-icon-prev,.jw-flag-compact-player .jw-text-elapsed,.jw-flag-compact-player .jw-text-duration{display:none}.jw-flag-audio-player{background-color:transparent}.jw-flag-audio-player .jw-media{visibility:hidden}.jw-flag-audio-player .jw-media object{width:1px;height:1px}.jw-flag-audio-player .jw-controlbar{display:table;bottom:0;margin:0;width:100%;min-width:100%;opacity:1}.jw-flag-audio-player .jw-controlbar .jw-icon-fullscreen{display:none}.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip{display:none}.jw-flag-audio-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jw-flag-audio-player .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar{display:table;left:0}.jwplayer.jw-flag-audio-player .jw-controlbar{height:auto}.jwplayer.jw-flag-audio-player .jw-preview{display:none}.jwplayer.jw-flag-audio-player .jw-display-icon-container{display:none}.jw-skin-seven .jw-background-color{background:#000}.jw-skin-seven .jw-controlbar{border-top:#333 1px solid;height:2.5em}.jw-skin-seven .jw-group{vertical-align:middle}.jw-skin-seven .jw-playlist{background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container{left:-43%;background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container .jw-option{border-bottom:1px solid #444}.jw-skin-seven .jw-playlist-container .jw-option:hover,.jw-skin-seven .jw-playlist-container .jw-option.jw-active-option{background-color:black}.jw-skin-seven .jw-playlist-container .jw-option:hover .jw-label{color:#ff0046}.jw-skin-seven .jw-playlist-container .jw-icon-playlist{margin-left:0}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play{color:#ff0046}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play:before{padding-left:0}.jw-skin-seven .jw-tooltip-title{background-color:#000;color:#fff}.jw-skin-seven .jw-text{color:#fff}.jw-skin-seven .jw-button-color{color:#fff}.jw-skin-seven .jw-button-color:hover{color:#ff0046}.jw-skin-seven .jw-toggle{color:#ff0046}.jw-skin-seven .jw-toggle.jw-off{color:#fff}.jw-skin-seven .jw-controlbar .jw-icon:before,.jw-skin-seven .jw-text-elapsed,.jw-skin-seven .jw-text-duration{padding:0 .7em}.jw-skin-seven .jw-controlbar .jw-icon-prev:before{padding-right:.25em}.jw-skin-seven .jw-controlbar .jw-icon-playlist:before{padding:0 .45em}.jw-skin-seven .jw-controlbar .jw-icon-next:before{padding-left:.25em}.jw-skin-seven .jw-icon-prev,.jw-skin-seven .jw-icon-next{font-size:.7em}.jw-skin-seven .jw-icon-prev:before{border-left:1px solid #666}.jw-skin-seven .jw-icon-next:before{border-right:1px solid #666}.jw-skin-seven .jw-icon-display{color:#fff}.jw-skin-seven .jw-icon-display:before{padding-left:0}.jw-skin-seven .jw-display-icon-container{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-rail{background-color:#384154;box-shadow:none}.jw-skin-seven .jw-buffer{background-color:#666f82}.jw-skin-seven .jw-progress{background:#ff0046}.jw-skin-seven .jw-knob{width:.6em;height:.6em;background-color:#fff;box-shadow:0 0 0 1px #000;border-radius:1em}.jw-skin-seven .jw-slider-horizontal .jw-slider-container{height:.95em}.jw-skin-seven .jw-slider-horizontal .jw-rail,.jw-skin-seven .jw-slider-horizontal .jw-buffer,.jw-skin-seven .jw-slider-horizontal .jw-progress{height:.2em;border-radius:0}.jw-skin-seven .jw-slider-horizontal .jw-knob{top:-0.2em}.jw-skin-seven .jw-slider-horizontal .jw-cue{top:-0.05em;width:.3em;height:.3em;background-color:#fff;border-radius:50%}.jw-skin-seven .jw-slider-vertical .jw-rail,.jw-skin-seven .jw-slider-vertical .jw-buffer,.jw-skin-seven .jw-slider-vertical .jw-progress{width:.2em}.jw-skin-seven .jw-volume-tip{width:100%;left:-45%;padding-bottom:.7em}.jw-skin-seven .jw-text-duration{color:#666f82}.jw-skin-seven .jw-controlbar-right-group .jw-icon-tooltip:before,.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:before{border-left:1px solid #666}.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:first-child:before{border:none}.jw-skin-seven .jw-dock .jw-dock-button{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-dock .jw-overlay{border-radius:2.5em}.jw-skin-seven .jw-icon-tooltip .jw-active-option{background-color:#ff0046;color:#fff}.jw-skin-seven .jw-icon-volume{min-width:2.6em}.jw-skin-seven .jw-time-tip,.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip,.jw-skin-seven .jw-skip{border:1px solid #333}.jw-skin-seven .jw-time-tip{padding:.2em;bottom:1.3em}.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip{bottom:.24em}.jw-skin-seven .jw-skip{padding:.4em;border-radius:1.75em}.jw-skin-seven .jw-skip .jw-text,.jw-skin-seven .jw-skip .jw-icon-inline{color:#fff;line-height:1.75em}.jw-skin-seven .jw-skip.jw-skippable:hover .jw-text,.jw-skin-seven .jw-skip.jw-skippable:hover .jw-icon-inline{color:#ff0046}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon:before,.jw-skin-seven.jw-flag-touch .jw-text-elapsed,.jw-skin-seven.jw-flag-touch .jw-text-duration{padding:0 .35em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-prev:before{padding:0 .125em 0 .7em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-next:before{padding:0 .7em 0 .125em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-playlist:before{padding:0 .225em}',
                    ""
                ]);
        },
        function(a, b) {
            a.exports = function() {
                var a = [];
                return (
                    (a.toString = function() {
                        for (var a = [], b = 0; b < this.length; b++) {
                            var c = this[b];
                            c[2] ? a.push("@media " + c[2] + "{" + c[1] + "}") : a.push(c[1]);
                        }
                        return a.join("");
                    }),
                    (a.i = function(b, c) {
                        "string" == typeof b && (b = [[null, b, ""]]);
                        for (var d = {}, e = 0; e < this.length; e++) {
                            var f = this[e][0];
                            "number" == typeof f && (d[f] = !0);
                        }
                        for (e = 0; e < b.length; e++) {
                            var g = b[e];
                            ("number" == typeof g[0] && d[g[0]]) ||
                                (c && !g[2] ? (g[2] = c) : c && (g[2] = "(" + g[2] + ") and (" + c + ")"), a.push(g));
                        }
                    }),
                    a
                );
            };
        },
        function(a, b) {
            a.exports =
                "data:application/font-woff;base64,d09GRgABAAAAABQ4AAsAAAAAE+wAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxID2WNtYXAAAAFoAAAAVAAAAFQaVsydZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAD3AAAA9wKJaoQ2hlYWQAABE0AAAANgAAADYIhqKNaGhlYQAAEWwAAAAkAAAAJAmCBdxobXR4AAARkAAAAGwAAABscmAHPWxvY2EAABH8AAAAOAAAADg2EDnwbWF4cAAAEjQAAAAgAAAAIAAiANFuYW1lAAASVAAAAcIAAAHCwZOZtHBvc3QAABQYAAAAIAAAACAAAwAAAAMEmQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA5hYDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOYW//3//wAAAAAAIOYA//3//wAB/+MaBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAABABgAAAFoAOAADoAPwBEAEkAACUVIi4CNTQ2Ny4BNTQ+AjMyHgIVFAYHHgEVFA4CIxEyFhc+ATU0LgIjIg4CFRQWFz4BMxExARUhNSEXFSE1IRcVITUhAUAuUj0jCgoKCkZ6o11do3pGCgoKCiM9Ui4qSh4BAjpmiE1NiGY6AQIeSioCVQIL/fWWAXX+i0oBK/7VHh4jPVIuGS4VH0MiXaN6RkZ6o10iQx8VLhkuUj0jAcAdGQ0bDk2IZjo6ZohNDhsNGR3+XgNilZXglZXglZUAAAABAEAAAAPAA4AAIQAAExQeAjMyPgI1MxQOAiMiLgI1ND4CMxUiDgIVMYs6ZohNTYhmOktGeqNdXaN6RkZ6o11NiGY6AcBNiGY6OmaITV2jekZGeqNdXaN6Rks6ZohNAAAEAEAAAATAA4AADgAcACoAMQAAJS4BJyERIREuAScRIREhByMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAn8DBQQCDPxGCysLBDz9v1NaCERrjE9irINTCLVbByc6Sio9a1I1CLaBL0YMQgsoCgLB/ukDCgIBSPzCQk6HaEIIWAhQgKdgKUg5JgdYBzRRZzx9C0QuAAAAAAUAQAAABMADgAAOABkAJwA1ADwAACUuASchESERLgEnESERIQE1IREhLgMnMQEjLgMnNR4DFzErAS4DJzUeAxcxKwE1HgEXMQKAAgYFAg38QAwqCgRA/cD+gANA/iAYRVlsPgEtWghFa4xPYq2DUgmzWgcnO0oqPGpSNgm6gDBEDEAMKAwCwP7tAggDAUb8wAHQ8P3APWdUQRf98E2IaEIHWghQgKhgKUg4JgdaCDVRZzt9DEMuAAAEAEAAAAXAA4AABAAJAGcAxQAANxEhESEBIREhEQU+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzEhPgE3PgEzMhYXHgEXHgEXHgEXIy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNzMOAQcOAQcOAQcOASMiJicuAScuAScuATU0Njc+ATcxQAWA+oAFNvsUBOz8Iw4hExQsGBIhEA8cDQwUCAgLAlsBBQUECgYHDggIEAkQGgsLEgcHCgMDAwMDAwoHBxILCxoQFiEMDA8DWgIJBwgTDQwcERAkFBgsFBMhDg0VBwcHBwcHFQ0Bug0hFBMsGREhEBAcDAwVCAgKAloCBQQECwYGDggIEQgQGwsLEgcHCgMDAwMDAwoHBxILCxsQFSIMDA4DWwIJCAcUDAwdEBEkExksExQhDQ4UBwcICAcHFA4AA4D8gAM1/RYC6tcQGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPEBgICQkFBQUPCgoYDw4hEwkOBwcMBQUIAwMCBgYGEQoKGA0NHA4NGg0NFwoKEQYGBg0NDiIWFCQREBwLCxIGBgYJCAkXDw8kFBQsFxgtFRQkDwAAAAADAEAAAAXAA4AAEABvAM4AACUhIiY1ETQ2MyEyFhURFAYjAT4BNz4BNz4BMzIWFx4BFx4BFx4BFzMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATc+ATc+ATcjDgEHDgEjIiYnLgEnLgEnLgE1NDY3OQEhPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5AQUs+6g9V1c9BFg9V1c9/JoDCgcGEgsLGxAJEAgIDgYHCgQEBgFaAgoICBQNDBwQDyESGCwUEyEODRUHBwcHBwcVDQ4hExQrGRQkEBAdDAwUCAcJAloDDwwMIhUQGwsLEgYHCgMEAwMEAbkDCgcHEgsLGxAIEQgHDwYGCwQEBQFbAgoICBUMDBwQECERGSwTFCENDhQHBwgIBwcUDg0hFBMsGRMkERAdDAwUBwgJAlsDDgwNIRUQGwsLEgcHCgMDAwMDAFc+AlY+V1c+/ao+VwH0DRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQ0YCgsQBgYGAgMDCAUFDAcHDgkTIQ4PGAoKDgYFBQkJCBgQDyQUFS0YFywUFCQPDxcJCAkGBgYSCwscEBEkFBYiDg0NBgYGEQoKFw0NGg4OGw0AAAABAOAAoAMgAuAAFAAAARQOAiMiLgI1ND4CMzIeAhUDIC1OaTw8aU4tLU5pPDxpTi0BwDxpTi0tTmk8PGlOLS1OaTwAAAMAQAAQBEADkAADABAAHwAANwkBISUyNjU0JiMiBhUUFjMTNCYjIgYVERQWMzI2NRFAAgACAPwAAgAOFRUODhUVDiMVDg4VFQ4OFRADgPyAcBYQDxgWERAWAeYPGBYR/tcPGBYRASkAAgBAAAADwAOAAAcADwAANxEXNxcHFyEBIREnByc3J0CAsI2wgP5zAfMBjYCwjbCAAAGNgLCNsIADgP5zgLCNsIAAAAAFAEAAAAXAA4AABAAJABYAMwBPAAA3ESERIQEhESERATM1MxEjNSMVIxEzFSUeARceARceARUUBgcOAQcOAQcOASsBETMeARcxBxEzMjY3PgE3PgE3PgE1NCYnLgEnLgEnLgErAUAFgPqABTb7FATs/FS2YGC2ZGQCXBQeDg8UBwcJBgcHEwwMIRMTLBuwsBYqE6BHCRcJChIIBw0FBQUEAwINBwcTDAwgETcAA4D8gAM2/RcC6f7Arf5AwMABwK2dBxQODyIWFTAbGC4TFiIPDhgKCQcBwAIHB0P+5gQDAg0HBxcMDCETER0PDhgKCQ8EBQUABAA9AAAFwAOAABAAHQA7AFkAACUhIiY1ETQ2MyEyFhURFAYjASMVIzUjETM1MxUzEQUuAScuAScuASsBETMyNjc+ATc+ATc+ATUuASc5AQcOAQcOASsBETMyFhceARceARceARUUBgcOAQc5AQUq+6k+WFg+BFc+WFg+/bNgs2Rks2ABsAcXDA4fExMnFrCwGywTEx4PDBMHBwYCCAl3CBIKCRQMRzcTHgwMEwcHCwQDBAUFBQ0HAFg+AlQ+WFg+/aw+WAKdra3+QMDAAcB9FiIODxQHBwb+QAkHCRgPDiUTFiwYHTAW4ggNAgMEAR8EBQUPCgoYDw4fERMfDwwXBwAAAAABAEMABgOgA3oAjwAAExQiNScwJic0JicuAQcOARUcARUeARceATc+ATc+ATE2MhUwFAcUFhceARceATMyNjc+ATc+ATc+AzE2MhUwDgIVFBYXHgEXFjY3PgE3PgE3PgE3PgM3PAE1NCYnJgYHDgMxBiI1MDwCNTQmJyYGBw4BBw4DMQYiNTAmJy4BJyYGBw4BMRWQBgQIBAgCBQ4KBwkDFgcHIQ8QDwcHNgUEAwMHBQsJChcMBQ0FBwsHDBMICR8cFQUFAwQDCAUHFRERJBEMEwgJEgUOGQwGMjgvBAkHDBYEAz1IPAQFLyQRIhEQFgoGIiUcBQUEAgMYKCcmCgcsAboFBQwYDwUKBwUEAgMNBwcLBxRrDhENBwggDxOTCgqdMBM1EQwTCAcFBAIFCgcPIw4UQ0IxCgpTc3glEyMREBgIBwEKBxUKESUQJ00mE6/JrA8FBgIHDQMECAkGla2PCQk1VGYxNTsHAgUKChwQC2BqVQoKehYfTwUDRx8TkAMAAAAAAgBGAAAENgOAAAQACAAAJREzESMJAhEDxnBw/IADgPyAAAOA/IADgP5A/kADgAAAAgCAAAADgAOAAAQACQAAJREhESEBIREhEQKAAQD/AP4AAQD/AAADgPyAA4D8gAOAAAAAAAEAgAAABAADgAADAAAJAREBBAD8gAOAAcD+QAOA/kAAAgBKAAAEOgOAAAQACAAANxEjETMJAhG6cHADgPyAA4AAA4D8gAOA/kD+QAOAAAAAAQBDACADQwOgACkAAAEeARUUDgIjIi4CNTQ+AjM1DQE1Ig4CFRQeAjMyPgI1NCYnNwMNGhw8aYxPT4xoPT1ojE8BQP7APGlOLS1OaTw8aU4tFhNTAmMrYzVPjGg9PWiMT0+MaD2ArbOALU5pPDxpTi0tTmk8KUsfMAAAAAEAQABmAiADEwAGAAATETMlESUjQM0BE/7tzQEzARPN/VPNAAQAQAAABJADgAAXACsAOgBBAAAlJz4DNTQuAic3HgMVFA4CBzEvAT4BNTQmJzceAxUOAwcxJz4BNTQmJzceARUUBgcnBREzJRElIwPaKiY+KxcXKz4mKipDMBkZMEMqpCk5REQ5KSE0JBQBFCQzIcMiKCgiKiYwMCYq/c3NARP+7c0AIyheaXI8PHFpXikjK2ZyfEFBfHJmK4MjNZFUVJE1Ix5IUFgvL1lRRx2zFkgpK0YVIxxcNDVZHykDARPN/VPNAAACAEAAAAPDA4AABwAPAAABFyERFzcXBwEHJzcnIREnAypw/qlwl3mZ/iaWepZwAVdtAnNwAVdwlnqT/iOWepZw/qpsAAMAQAETBcACYAAMABkAJgAAARQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUhFAYjIiY1NDYzMhYVAY1iRUVhYUVFYgIWYUVFYmJFRWECHWFFRWJiRUVhAbpFYmJFRWFhRUViYkVFYWFFRWJiRUVhYUUAAAAAAQBmACYDmgNaACAAAAEXFhQHBiIvAQcGIicmND8BJyY0NzYyHwE3NjIXFhQPAQKj9yQkJGMd9vYkYx0kJPf3JCQkYx329iRjHSQk9wHA9iRjHSQk9/ckJCRjHfb2JGMdJCT39yQkJGMd9gAABgBEAAQDvAN8AAQACQAOABMAGAAdAAABIRUhNREhFSE1ESEVITUBMxUjNREzFSM1ETMVIzUBpwIV/esCFf3rAhX96/6dsrKysrKyA3xZWf6dWVn+nVlZAsaysv6dsrL+nbKyAAEAAAABGZqh06s/Xw889QALBAAAAAAA0dQiKwAAAADR1CIrAAAAAAXAA6AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABgAAAAAABcAAAQAAAAAAAAAAAAAAAAAAABsEAAAAAAAAAAAAAAACAAAABgAAYAQAAEAFAABABQAAQAYAAEAGAABABAAA4ASAAEAEAABABgAAQAYAAD0D4ABDBIAARgQAAIAEAACABIAASgOAAEMEwABABMAAQAQAAEAGAABABAAAZgQAAEQAAAAAAAoAFAAeAIgAuAEEAWAChgOyA9QECAQqBKQFJgXoBgAGGgYqBkIGgAaSBvQHFgdQB4YHuAABAAAAGwDPAAYAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADAAAAAEAAAAAAAIABwCNAAEAAAAAAAMADABFAAEAAAAAAAQADACiAAEAAAAAAAUACwAkAAEAAAAAAAYADABpAAEAAAAAAAoAGgDGAAMAAQQJAAEAGAAMAAMAAQQJAAIADgCUAAMAAQQJAAMAGABRAAMAAQQJAAQAGACuAAMAAQQJAAUAFgAvAAMAAQQJAAYAGAB1AAMAAQQJAAoANADganctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjEAVgBlAHIAcwBpAG8AbgAgADEALgAxanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
        },
        function(a, b) {
            a.exports =
                "data:application/octet-stream;base64,AAEAAAALAIAAAwAwT1MvMg8SA9kAAAC8AAAAYGNtYXAaVsydAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZiiWqEMAAAF4AAAPcGhlYWQIhqKNAAAQ6AAAADZoaGVhCYIF3AAAESAAAAAkaG10eHJgBz0AABFEAAAAbGxvY2E2EDnwAAARsAAAADhtYXhwACIA0QAAEegAAAAgbmFtZcGTmbQAABIIAAABwnBvc3QAAwAAAAATzAAAACAAAwSZAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmFgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg5hb//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAEAGAAAAWgA4AAOgA/AEQASQAAJRUiLgI1NDY3LgE1ND4CMzIeAhUUBgceARUUDgIjETIWFz4BNTQuAiMiDgIVFBYXPgEzETEBFSE1IRcVITUhFxUhNSEBQC5SPSMKCgoKRnqjXV2jekYKCgoKIz1SLipKHgECOmaITU2IZjoBAh5KKgJVAgv99ZYBdf6LSgEr/tUeHiM9Ui4ZLhUfQyJdo3pGRnqjXSJDHxUuGS5SPSMBwB0ZDRsOTYhmOjpmiE0OGw0ZHf5eA2KVleCVleCVlQAAAAEAQAAAA8ADgAAhAAATFB4CMzI+AjUzFA4CIyIuAjU0PgIzFSIOAhUxizpmiE1NiGY6S0Z6o11do3pGRnqjXU2IZjoBwE2IZjo6ZohNXaN6RkZ6o11do3pGSzpmiE0AAAQAQAAABMADgAAOABwAKgAxAAAlLgEnIREhES4BJxEhESEHIy4DJzUeAxcxKwEuAyc1HgMXMSsBNR4BFzECfwMFBAIM/EYLKwsEPP2/U1oIRGuMT2Ksg1MItVsHJzpKKj1rUjUItoEvRgxCCygKAsH+6QMKAgFI/MJCTodoQghYCFCAp2ApSDkmB1gHNFFnPH0LRC4AAAAABQBAAAAEwAOAAA4AGQAnADUAPAAAJS4BJyERIREuAScRIREhATUhESEuAycxASMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAoACBgUCDfxADCoKBED9wP6AA0D+IBhFWWw+AS1aCEVrjE9irYNSCbNaByc7Sio8alI2CbqAMEQMQAwoDALA/u0CCAMBRvzAAdDw/cA9Z1RBF/3wTYhoQgdaCFCAqGApSDgmB1oINVFnO30MQy4AAAQAQAAABcADgAAEAAkAZwDFAAA3ESERIQEhESERBT4BNz4BMzIWFx4BFx4BFx4BFyMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATczDgEHDgEHDgEHDgEjIiYnLgEnLgEnLgE1NDY3PgE3MSE+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzFABYD6gAU2+xQE7PwjDiETFCwYEiEQDxwNDBQICAsCWwEFBQQKBgcOCAgQCRAaCwsSBwcKAwMDAwMDCgcHEgsLGhAWIQwMDwNaAgkHCBMNDBwRECQUGCwUEyEODRUHBwcHBwcVDQG6DSEUEywZESEQEBwMDBUICAoCWgIFBAQLBgYOCAgRCBAbCwsSBwcKAwMDAwMDCgcHEgsLGxAVIgwMDgNbAgkIBxQMDB0QESQTGSwTFCENDhQHBwgIBwcUDgADgPyAAzX9FgLq1xAYCAkJBQUFDwoKGA8OIRMJDgcHDAUFCAMDAgYGBhEKChgNDRwODRoNDRcKChEGBgYNDQ4iFhQkERAcCwsSBgYGCQgJFw8PJBQULBcYLRUUJA8QGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPAAAAAAMAQAAABcADgAAQAG8AzgAAJSEiJjURNDYzITIWFREUBiMBPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5ASE+ATc+ATc+ATMyFhceARceARceARczLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3PgE3PgE3Iw4BBw4BIyImJy4BJy4BJy4BNTQ2NzkBBSz7qD1XVz0EWD1XVz38mgMKBwYSCwsbEAkQCAgOBgcKBAQGAVoCCggIFA0MHBAPIRIYLBQTIQ4NFQcHBwcHBxUNDiETFCsZFCQQEB0MDBQIBwkCWgMPDAwiFRAbCwsSBgcKAwQDAwQBuQMKBwcSCwsbEAgRCAcPBgYLBAQFAVsCCggIFQwMHBAQIREZLBMUIQ0OFAcHCAgHBxQODSEUEywZEyQREB0MDBQHCAkCWwMODA0hFRAbCwsSBwcKAwMDAwMAVz4CVj5XVz79qj5XAfQNGAoLEAYGBgIDAwgFBQwHBw4JEyEODxgKCg4GBQUJCQgYEA8kFBUtGBcsFBQkDw8XCQgJBgYGEgsLHBARJBQWIg4NDQYGBhEKChcNDRoODhsNDRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQAAAAEA4ACgAyAC4AAUAAABFA4CIyIuAjU0PgIzMh4CFQMgLU5pPDxpTi0tTmk8PGlOLQHAPGlOLS1OaTw8aU4tLU5pPAAAAwBAABAEQAOQAAMAEAAfAAA3CQEhJTI2NTQmIyIGFRQWMxM0JiMiBhURFBYzMjY1EUACAAIA/AACAA4VFQ4OFRUOIxUODhUVDg4VEAOA/IBwFhAPGBYREBYB5g8YFhH+1w8YFhEBKQACAEAAAAPAA4AABwAPAAA3ERc3FwcXIQEhEScHJzcnQICwjbCA/nMB8wGNgLCNsIAAAY2AsI2wgAOA/nOAsI2wgAAAAAUAQAAABcADgAAEAAkAFgAzAE8AADcRIREhASERIREBMzUzESM1IxUjETMVJR4BFx4BFx4BFRQGBw4BBw4BBw4BKwERMx4BFzEHETMyNjc+ATc+ATc+ATU0JicuAScuAScuASsBQAWA+oAFNvsUBOz8VLZgYLZkZAJcFB4ODxQHBwkGBwcTDAwhExMsG7CwFioToEcJFwkKEggHDQUFBQQDAg0HBxMMDCARNwADgPyAAzb9FwLp/sCt/kDAwAHArZ0HFA4PIhYVMBsYLhMWIg8OGAoJBwHAAgcHQ/7mBAMCDQcHFwwMIRMRHQ8OGAoJDwQFBQAEAD0AAAXAA4AAEAAdADsAWQAAJSEiJjURNDYzITIWFREUBiMBIxUjNSMRMzUzFTMRBS4BJy4BJy4BKwERMzI2Nz4BNz4BNz4BNS4BJzkBBw4BBw4BKwERMzIWFx4BFx4BFx4BFRQGBw4BBzkBBSr7qT5YWD4EVz5YWD79s2CzZGSzYAGwBxcMDh8TEycWsLAbLBMTHg8MEwcHBgIICXcIEgoJFAxHNxMeDAwTBwcLBAMEBQUFDQcAWD4CVD5YWD79rD5YAp2trf5AwMABwH0WIg4PFAcHBv5ACQcJGA8OJRMWLBgdMBbiCA0CAwQBHwQFBQ8KChgPDh8REx8PDBcHAAAAAAEAQwAGA6ADegCPAAATFCI1JzAmJzQmJy4BBw4BFRwBFR4BFx4BNz4BNz4BMTYyFTAUBxQWFx4BFx4BMzI2Nz4BNz4BNz4DMTYyFTAOAhUUFhceARcWNjc+ATc+ATc+ATc+Azc8ATU0JicmBgcOAzEGIjUwPAI1NCYnJgYHDgEHDgMxBiI1MCYnLgEnJgYHDgExFZAGBAgECAIFDgoHCQMWBwchDxAPBwc2BQQDAwcFCwkKFwwFDQUHCwcMEwgJHxwVBQUDBAMIBQcVEREkEQwTCAkSBQ4ZDAYyOC8ECQcMFgQDPUg8BAUvJBEiERAWCgYiJRwFBQQCAxgoJyYKBywBugUFDBgPBQoHBQQCAw0HBwsHFGsOEQ0HCCAPE5MKCp0wEzURDBMIBwUEAgUKBw8jDhRDQjEKClNzeCUTIxEQGAgHAQoHFQoRJRAnTSYTr8msDwUGAgcNAwQICQaVrY8JCTVUZjE1OwcCBQoKHBALYGpVCgp6Fh9PBQNHHxOQAwAAAAACAEYAAAQ2A4AABAAIAAAlETMRIwkCEQPGcHD8gAOA/IAAA4D8gAOA/kD+QAOAAAACAIAAAAOAA4AABAAJAAAlESERIQEhESERAoABAP8A/gABAP8AAAOA/IADgPyAA4AAAAAAAQCAAAAEAAOAAAMAAAkBEQEEAPyAA4ABwP5AA4D+QAACAEoAAAQ6A4AABAAIAAA3ESMRMwkCEbpwcAOA/IADgAADgPyAA4D+QP5AA4AAAAABAEMAIANDA6AAKQAAAR4BFRQOAiMiLgI1ND4CMzUNATUiDgIVFB4CMzI+AjU0Jic3Aw0aHDxpjE9PjGg9PWiMTwFA/sA8aU4tLU5pPDxpTi0WE1MCYytjNU+MaD09aIxPT4xoPYCts4AtTmk8PGlOLS1OaTwpSx8wAAAAAQBAAGYCIAMTAAYAABMRMyURJSNAzQET/u3NATMBE839U80ABABAAAAEkAOAABcAKwA6AEEAACUnPgM1NC4CJzceAxUUDgIHMS8BPgE1NCYnNx4DFQ4DBzEnPgE1NCYnNx4BFRQGBycFETMlESUjA9oqJj4rFxcrPiYqKkMwGRkwQyqkKTlERDkpITQkFAEUJDMhwyIoKCIqJjAwJir9zc0BE/7tzQAjKF5pcjw8cWleKSMrZnJ8QUF8cmYrgyM1kVRUkTUjHkhQWC8vWVFHHbMWSCkrRhUjHFw0NVkfKQMBE839U80AAAIAQAAAA8MDgAAHAA8AAAEXIREXNxcHAQcnNychEScDKnD+qXCXeZn+JpZ6lnABV20Cc3ABV3CWepP+I5Z6lnD+qmwAAwBAARMFwAJgAAwAGQAmAAABFAYjIiY1NDYzMhYVIRQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUBjWJFRWFhRUViAhZhRUViYkVFYQIdYUVFYmJFRWEBukViYkVFYWFFRWJiRUVhYUVFYmJFRWFhRQAAAAABAGYAJgOaA1oAIAAAARcWFAcGIi8BBwYiJyY0PwEnJjQ3NjIfATc2MhcWFA8BAqP3JCQkYx329iRjHSQk9/ckJCRjHfb2JGMdJCT3AcD2JGMdJCT39yQkJGMd9vYkYx0kJPf3JCQkYx32AAAGAEQABAO8A3wABAAJAA4AEwAYAB0AAAEhFSE1ESEVITURIRUhNQEzFSM1ETMVIzURMxUjNQGnAhX96wIV/esCFf3r/p2ysrKysrIDfFlZ/p1ZWf6dWVkCxrKy/p2ysv6dsrIAAQAAAAEZmqHTqz9fDzz1AAsEAAAAAADR1CIrAAAAANHUIisAAAAABcADoAAAAAgAAgAAAAAAAAABAAADwP/AAAAGAAAAAAAFwAABAAAAAAAAAAAAAAAAAAAAGwQAAAAAAAAAAAAAAAIAAAAGAABgBAAAQAUAAEAFAABABgAAQAYAAEAEAADgBIAAQAQAAEAGAABABgAAPQPgAEMEgABGBAAAgAQAAIAEgABKA4AAQwTAAEAEwABABAAAQAYAAEAEAABmBAAARAAAAAAACgAUAB4AiAC4AQQBYAKGA7ID1AQIBCoEpAUmBegGAAYaBioGQgaABpIG9AcWB1AHhge4AAEAAAAbAM8ABgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAMAAAAAQAAAAAAAgAHAI0AAQAAAAAAAwAMAEUAAQAAAAAABAAMAKIAAQAAAAAABQALACQAAQAAAAAABgAMAGkAAQAAAAAACgAaAMYAAwABBAkAAQAYAAwAAwABBAkAAgAOAJQAAwABBAkAAwAYAFEAAwABBAkABAAYAK4AAwABBAkABQAWAC8AAwABBAkABgAYAHUAAwABBAkACgA0AOBqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNWZXJzaW9uIDEuMQBWAGUAcgBzAGkAbwBuACAAMQAuADFqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNSZWd1bGFyAFIAZQBnAHUAbABhAHJqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNGb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        },
        function(a, b, c) {
            function d(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                        e = l[d.id];
                    if (e) {
                        e.refs++;
                        for (var f = 0; f < e.parts.length; f++) e.parts[f](d.parts[f]);
                        for (; f < d.parts.length; f++) e.parts.push(h(d.parts[f], b));
                    } else {
                        for (var g = [], f = 0; f < d.parts.length; f++) g.push(h(d.parts[f], b));
                        l[d.id] = {
                            id: d.id,
                            refs: 1,
                            parts: g
                        };
                    }
                }
            }

            function e(a) {
                for (var b = [], c = {}, d = 0; d < a.length; d++) {
                    var e = a[d],
                        f = e[0],
                        g = e[1],
                        h = e[2],
                        i = e[3],
                        j = {
                            css: g,
                            media: h,
                            sourceMap: i
                        };
                    c[f]
                        ? c[f].parts.push(j)
                        : b.push(
                              (c[f] = {
                                  id: f,
                                  parts: [j]
                              })
                          );
                }
                return b;
            }

            function f() {
                var a = document.createElement("style"),
                    b = o();
                return (a.type = "text/css"), b.appendChild(a), a;
            }

            function g() {
                var a = document.createElement("link"),
                    b = o();
                return (a.rel = "stylesheet"), b.appendChild(a), a;
            }

            function h(a, b) {
                var c, d, e;
                if (b.singleton) {
                    var h = q++;
                    (c = p || (p = f())), (d = i.bind(null, c, h, !1)), (e = i.bind(null, c, h, !0));
                } else
                    a.sourceMap &&
                    "function" == typeof URL &&
                    "function" == typeof URL.createObjectURL &&
                    "function" == typeof URL.revokeObjectURL &&
                    "function" == typeof Blob &&
                    "function" == typeof btoa
                        ? ((c = g()),
                          (d = k.bind(null, c)),
                          (e = function() {
                              c.parentNode.removeChild(c), c.href && URL.revokeObjectURL(c.href);
                          }))
                        : ((c = f()),
                          (d = j.bind(null, c)),
                          (e = function() {
                              c.parentNode.removeChild(c);
                          }));
                return (
                    d(a),
                    function(b) {
                        if (b) {
                            if (b.css === a.css && b.media === a.media && b.sourceMap === a.sourceMap) return;
                            d((a = b));
                        } else e();
                    }
                );
            }

            function i(a, b, c, d) {
                var e = c ? "" : d.css;
                if (a.styleSheet) a.styleSheet.cssText = r(b, e);
                else {
                    var f = document.createTextNode(e),
                        g = a.childNodes;
                    g[b] && a.removeChild(g[b]), g.length ? a.insertBefore(f, g[b]) : a.appendChild(f);
                }
            }

            function j(a, b) {
                var c = b.css,
                    d = b.media;
                b.sourceMap;
                if ((d && a.setAttribute("media", d), a.styleSheet)) a.styleSheet.cssText = c;
                else {
                    for (; a.firstChild; ) a.removeChild(a.firstChild);
                    a.appendChild(document.createTextNode(c));
                }
            }

            function k(a, b) {
                var c = b.css,
                    d = (b.media, b.sourceMap);
                d &&
                    (c +=
                        "\n/*# sourceMappingURL=data:application/json;base64," +
                        btoa(unescape(encodeURIComponent(JSON.stringify(d)))) +
                        " */");
                var e = new Blob([c], {
                        type: "text/css"
                    }),
                    f = a.href;
                (a.href = URL.createObjectURL(e)), f && URL.revokeObjectURL(f);
            }
            var l = {},
                m = function(a) {
                    var b;
                    return function() {
                        return "undefined" == typeof b && (b = a.apply(this, arguments)), b;
                    };
                },
                n = m(function() {
                    return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
                }),
                o = m(function() {
                    return document.head || document.getElementsByTagName("head")[0];
                }),
                p = null,
                q = 0;
            a.exports = function(a, b) {
                (b = b || {}), "undefined" == typeof b.singleton && (b.singleton = n());
                var c = e(a);
                return (
                    d(c, b),
                    function(a) {
                        for (var f = [], g = 0; g < c.length; g++) {
                            var h = c[g],
                                i = l[h.id];
                            i.refs--, f.push(i);
                        }
                        if (a) {
                            var j = e(a);
                            d(j, b);
                        }
                        for (var g = 0; g < f.length; g++) {
                            var i = f[g];
                            if (0 === i.refs) {
                                for (var k = 0; k < i.parts.length; k++) i.parts[k]();
                                delete l[i.id];
                            }
                        }
                    }
                );
            };
            var r = (function() {
                var a = [];
                return function(b, c) {
                    return (a[b] = c), a.filter(Boolean).join("\n");
                };
            })();
        },
        function(a, b, c) {
            var d, e;
            (d = [
                c(41),
                c(44),
                c(59),
                c(47),
                c(89),
                c(51),
                c(119),
                c(95),
                c(101),
                c(96),
                c(83),
                c(45),
                c(61),
                c(114),
                c(69),
                c(161),
                c(66),
                c(98)
            ]),
                (e = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
                    var s = {};
                    return (
                        (s.api = a),
                        (s._ = b),
                        (s.version = c),
                        (s.utils = b.extend(d, f, {
                            canCast: p.available,
                            key: h,
                            extend: b.extend,
                            scriptloader: i,
                            rssparser: q,
                            tea: j,
                            UI: g
                        })),
                        (s.utils.css.style = s.utils.style),
                        (s.vid = k),
                        (s.events = b.extend({}, l, {
                            state: m
                        })),
                        (s.playlist = b.extend({}, n, {
                            item: o
                        })),
                        (s.plugins = r),
                        (s.cast = p),
                        s
                    );
                }.apply(b, d)),
                !(void 0 !== e && (a.exports = e));
        }
    ]);
});
