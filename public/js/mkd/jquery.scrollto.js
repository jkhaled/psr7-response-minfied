(function (c) {
    var a = c.scrollTo = function (f, e, d) {
        c(window).scrollTo(f, e, d)
    };
    a.defaults = {axis: "xy", duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1, limit: true};
    a.window = function (d) {
        return c(window)._scrollable()
    };
    c.fn._scrollable = function () {
        return this.map(function () {
            var e = this, d = !e.nodeName || c.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!d) {
                return e
            }
            var f = (e.contentWindow || e).document || e.ownerDocument || e;
            return /webkit/i.test(navigator.userAgent) || f.compatMode == "BackCompat" ? f.body : f.documentElement
        })
    };
    c.fn.scrollTo = function (f, e, d) {
        if (typeof e == "object") {
            d = e;
            e = 0
        }
        if (typeof d == "function") {
            d = {onAfter: d}
        }
        if (f == "max") {
            f = 9000000000
        }
        d = c.extend({}, a.defaults, d);
        e = e || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            e /= 2
        }
        d.offset = b(d.offset);
        d.over = b(d.over);
        return this._scrollable().each(function () {
            if (f == null) {
                return
            }
            var l = this, j = c(l), k = f, i, g = {}, m = j.is("html,body");
            switch (typeof k) {
                case"number":
                case"string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                        k = b(k);
                        break
                    }
                    k = c(k, this);
                    if (!k.length) {
                        return
                    }
                case"object":
                    if (k.is || k.style) {
                        i = (k = c(k)).offset()
                    }
            }
            c.each(d.axis.split(""), function (q, r) {
                var s = r == "x" ? "Left" : "Top", u = s.toLowerCase(), p = "scroll" + s, o = l[p], n = a.max(l, r);
                if (i) {
                    g[p] = i[u] + (m ? 0 : o - j.offset()[u]);
                    if (d.margin) {
                        g[p] -= parseInt(k.css("margin" + s)) || 0;
                        g[p] -= parseInt(k.css("border" + s + "Width")) || 0
                    }
                    g[p] += d.offset[u] || 0;
                    if (d.over[u]) {
                        g[p] += k[r == "x" ? "width" : "height"]() * d.over[u]
                    }
                } else {
                    var t = k[u];
                    g[p] = t.slice && t.slice(-1) == "%" ? parseFloat(t) / 100 * n : t
                }
                if (d.limit && /^\d+$/.test(g[p])) {
                    g[p] = g[p] <= 0 ? 0 : Math.min(g[p], n)
                }
                if (!q && d.queue) {
                    if (o != g[p]) {
                        h(d.onAfterFirst)
                    }
                    delete g[p]
                }
            });
            h(d.onAfter);
            function h(n) {
                j.animate(g, e, d.easing, n && function () {
                        n.call(this, f, d)
                    })
            }
        }).end()
    };
    a.max = function (j, i) {
        var h = i == "x" ? "Width" : "Height", e = "scroll" + h;
        if (!c(j).is("html,body")) {
            return j[e] - c(j)[h.toLowerCase()]()
        }
        var g = "client" + h, f = j.ownerDocument.documentElement, d = j.ownerDocument.body;
        return Math.max(f[e], d[e]) - Math.min(f[g], d[g])
    };
    function b(d) {
        return typeof d == "object" ? d : {top: d, left: d}
    }
})(jQuery);