webpackJsonpjwplayer([2], {
    105: function(a, b, c) {
        var d, e;
        (d = []),
            (e = function() {
                function a(a) {
                    this.message = a;
                }
                var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                (a.prototype = new Error()),
                    (a.prototype.name = "InvalidCharacterError"),
                    window.btoa ||
                        (window.btoa = function(c) {
                            for (
                                var d, e, f = String(c), g = 0, h = b, i = "";
                                f.charAt(0 | g) || ((h = "="), g % 1);
                                i += h.charAt(63 & (d >> (8 - (g % 1) * 8)))
                            ) {
                                if (((e = f.charCodeAt((g += 0.75))), e > 255))
                                    throw new a(
                                        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
                                    );
                                d = (d << 8) | e;
                            }
                            return i;
                        }),
                    window.atob ||
                        (window.atob = function(c) {
                            var d = String(c).replace(/=+$/, "");
                            if (d.length % 4 == 1)
                                throw new a("'atob' failed: The string to be decoded is not correctly encoded.");
                            for (
                                var e, f, g = 0, h = 0, i = "";
                                (f = d.charAt(h++));
                                ~f && ((e = g % 4 ? 64 * e + f : f), g++ % 4)
                                    ? (i += String.fromCharCode(255 & (e >> ((-2 * g) & 6))))
                                    : 0
                            )
                                f = b.indexOf(f);
                            return i;
                        });
            }.apply(b, d)),
            !(void 0 !== e && (a.exports = e));
    }
});
