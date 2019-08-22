// JWPlayer V1.1.1 Date : 2018-07-04T14:18:45
// Copyright: Flock of Birds International BV
// Licence: Apache License, Version 2.0

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/_base/array"
], function(a, b, c, d, e, f) {
    "use strict";
    return a("JWPlayer.widget.JWPlayer", [b], {
        templateString: f,
        videoUrlAttr: "",
        imageUrlAttr: "",
        videoFallbackUrlAttr: "",
        mimeType: "",
        mimeTypeFallback: "",
        skin: "glow",
        videoHeight: "270",
        videoWidth: "480",
        aspectRatio: "fixed",
        autoStart: !1,
        muteOnStart: !1,
        loopContent: !1,
        preload: !1,
        showControls: !0,
        licenseKey: "",
        onEventMF: "",
        playerEventEntity: "",
        playerEventRel: "",
        eventTypeAttr: "",
        eventPositionAttr: "",
        logoFile: "",
        logoLink: "",
        shareLinkAttr: "",
        shareHeading: "",
        shareSites: "",
        _handles: null,
        playerInstance: null,
        _contextObj: null,
        mapLogoPosition: [],
        autoLoad: !1,
        constructor: function() {
            (this._handles = []),
                (this.playerInstance = null),
                (this.mapLogoPosition.tr = "top-right"),
                (this.mapLogoPosition.tl = "top-left"),
                (this.mapLogoPosition.br = "bottom-right"),
                (this.mapLogoPosition.bl = "bottom-left");
        },
        postCreate: function() {
            logger.debug(this.id + ".postCreate"),
                mxui.dom.addCss(require.toUrl("JWPlayer/lib/licensed/skins/" + this.skin + ".css"));
            var a = mxui.dom.create("div", { id: this.id + "_player" });
            "" !== this.licenseKey
                ? require(["JWPlayer/lib/licensed/jwplayer"], c.hitch(this, function(b) {
                      this.domNode.appendChild(a),
                          (this.playerInstance = b(a)),
                          (this.playerInstance.key = this.licenseKey),
                          this._setupEvents(),
                          (window.jwplayer = b),
                          this.set("loaded", !0);
                  }))
                : require(["JWPlayer/lib/free/jwplayer"], c.hitch(this, function(b) {
                      this.domNode.appendChild(a),
                          (this.playerInstance = b(a)),
                          this._setupEvents(),
                          (window.jwplayer = b),
                          this.set("loaded", !0);
                  }));
        },
        update: function(a, b) {
            logger.debug(this.id + ".update"),
                (this._contextObj = a),
                this._resetSubscriptions(),
                this._updateRendering(),
                b();
        },
        uninitialize: function() {
            logger.debug(this.id + ".uninitialize"), this.playerInstance.remove();
        },
        _updateRendering: function() {
            if (
                (logger.debug(this.id + "._updateRendering"),
                this.playerInstance && "playing" === this.playerInstance.getState() && this._handleEvent("Stop"),
                null !== this._contextObj)
            ) {
                var a = this._getOptions();
                this.playerInstance.setup(a).onReady(
                    c.hitch(this, function() {
                        this.playerInstance.on(
                            "play",
                            c.hitch(this, function() {
                                this._handleEvent("Play");
                            })
                        ),
                            this.playerInstance.on(
                                "pause",
                                c.hitch(this, function() {
                                    this._handleEvent("Pause");
                                })
                            ),
                            this.playerInstance.on(
                                "complete",
                                c.hitch(this, function() {
                                    this._handleEvent("Complete");
                                })
                            ),
                            this.playerInstance.on(
                                "idle",
                                c.hitch(this, function() {
                                    this._handleEvent("Stop");
                                })
                            ),
                            this.playerInstance.on(
                                "seek",
                                c.hitch(this, function() {
                                    this._handleEvent("Stop");
                                })
                            ),
                            this.playerInstance.on(
                                "seeked",
                                c.hitch(this, function() {
                                    this._handleEvent("Play");
                                })
                            );
                    })
                ),
                    (this.playerInstance.mxObjId = this._contextObj.getGuid()),
                    d.set(this.domNode, "display", "");
            } else this.playerInstance && this.playerInstance.stop(), d.set(this.domNode, "display", "none");
        },
        _handleEvent: function(a) {
            logger.debug("Event :" + a + " pos:" + this.playerInstance.getPosition());
            var b = this.playerInstance.getPosition(),
                d = this.playerInstance.mxObjId;
            this.playerEventRel &&
                this.onEventMF &&
                mx.data.create({
                    entity: this.playerEventEntity,
                    callback: c.hitch(this, function(c) {
                        logger.debug(this.id + " Event object created on server"),
                            c.set(this.eventTypeAttr, a),
                            c.set(this.eventPositionAttr, b),
                            c.addReference(this.playerEventRel.split("/")[0], d),
                            this.executeEventMf(c);
                    }),
                    error: function(a) {
                        console.error(this.id + "an error occurred creating player event: " + a);
                    }
                });
        },
        executeEventMf: function(a) {
            logger.debug(this.id + ".executeEventMf " + this.onEventMF);
            var b = this;
            mx.data.action({
                params: { applyto: "selection", actionname: this.onEventMF, guids: [a.getGuid()] },
                store: { caller: this.mxform },
                callback: function() {
                    logger.debug(b.id + ".executeEventMf successfully");
                },
                error: function(a) {
                    console.error(b.id + ".executeEventMf with error ", a);
                }
            });
        },
        _getOptions: function() {
            logger.debug(this.id + "._getOptions");
            var a,
                b = require.toUrl("JWPlayer/lib/licensed/").split("?")[0],
                c = require.toUrl("JWPlayer/lib/licensed/jwplayer.flash.swf"),
                d = {
                    sources: [
                        { file: this._contextObj.get(this.videoUrlAttr), type: this.mimeType },
                        { file: this._contextObj.get(this.videoFallbackUrlAttr), type: this.mimeTypeFallback }
                    ],
                    preload: this.preload,
                    controls: this.showControls,
                    skin: { name: this.skin },
                    height: this.videoHeight,
                    width: "fixed" === this.aspectRatio ? this.videoWidth : this.videoWidth + "%",
                    image: this._contextObj.get(this.imageUrlAttr),
                    key: this.licenseKey,
                    androidhls: !0,
                    base: b,
                    flashplayer: c,
                    autostart: this.autoStart,
                    mute: this.muteOnStart,
                    repeat: this.loopContent,
                    primary: "html5"
                };
            return (
                "" !== this.logoFile && (d.logo = { file: this.logoFile, link: this.logoLink }),
                "" !== this.shareLinkAttr &&
                    ((a = this._contextObj.get(this.shareLinkAttr)),
                    a &&
                        (d.sharing = {
                            link: a,
                            heading: this.shareHeading,
                            sites: this.shareSites.replace(/ /g, "").split(",")
                        })),
                d
            );
        },
        _setupEvents: function() {
            this.connect(
                this.mxform,
                "onBeforeHide",
                c.hitch(this, function() {
                    this.playerInstance.pause(!0);
                })
            );
        },
        _resetSubscriptions: function() {
            this._handles &&
                (e.forEach(this._handles, function(a) {
                    mx.data.unsubscribe(a);
                }),
                (this._handles = [])),
                this._contextObj &&
                    (this._handles.push(
                        this.subscribe({
                            guid: this._contextObj.getGuid(),
                            callback: c.hitch(this, function(a) {
                                this._updateRendering();
                            })
                        })
                    ),
                    this._handles.push(
                        this.subscribe({
                            guid: this._contextObj.getGuid(),
                            attr: this.videoUrlAttr,
                            callback: c.hitch(this, function(a, b, c) {
                                this._updateRendering();
                            })
                        })
                    ));
        }
    });
}),
    require(["JWPlayer/widget/JWPlayer"]);
//# sourceMappingURL=JWPlayer.js.map
