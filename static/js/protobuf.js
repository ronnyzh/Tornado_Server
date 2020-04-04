!
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = t() : (e.dcodeIO = e.dcodeIO || {}).Long = t()
}(this, function() {
    "use strict";

    function e(e, t, i) {
        this.low = 0 | e, this.high = 0 | t, this.unsigned = !! i
    }
    function t(e) {
        return (e && e.__isLong__) === !0
    }
    function i(e, t) {
        var i, r, s;
        return t ? (e >>>= 0, (s = e >= 0 && 256 > e) && (r = a[e]) ? r : (i = n(e, 0 > (0 | e) ? -1 : 0, !0), s && (a[e] = i), i)) : (e |= 0, (s = e >= -128 && 128 > e) && (r = f[e]) ? r : (i = n(e, 0 > e ? -1 : 0, !1), s && (f[e] = i), i))
    }
    function r(e, t) {
        if (isNaN(e) || !isFinite(e)) return t ? E : y;
        if (t) {
            if (0 > e) return E;
            if (e >= p) return T
        } else {
            if (-d >= e) return S;
            if (e + 1 >= d) return b
        }
        return 0 > e ? r(-e, t).neg() : n(e % c | 0, e / c | 0, t)
    }
    function n(t, i, r) {
        return new e(t, i, r)
    }
    function s(e, t, i) {
        if (0 === e.length) throw Error("empty string");
        if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return y;
        if ("number" == typeof t ? (i = t, t = !1) : t = !! t, i = i || 10, 2 > i || i > 36) throw RangeError("radix");
        var n;
        if ((n = e.indexOf("-")) > 0) throw Error("interior hyphen");
        if (0 === n) return s(e.substring(1), t, i).neg();
        for (var o = r(h(i, 8)), f = y, a = 0; a < e.length; a += 8) {
            var l = Math.min(8, e.length - a),
                u = parseInt(e.substring(a, a + l), i);
            if (8 > l) {
                var c = r(h(i, l));
                f = f.mul(c).add(r(u))
            } else f = f.mul(o), f = f.add(r(u))
        }
        return f.unsigned = t, f
    }
    function o(t) {
        return t instanceof e ? t : "number" == typeof t ? r(t) : "string" == typeof t ? s(t) : n(t.low, t.high, t.unsigned)
    }
    e.prototype.__isLong__, Object.defineProperty(e.prototype, "__isLong__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    }), e.isLong = t;
    var f = {},
        a = {};
    e.fromInt = i, e.fromNumber = r, e.fromBits = n;
    var h = Math.pow;
    e.fromString = s, e.fromValue = o;
    var l = 65536,
        u = 1 << 24,
        c = l * l,
        p = c * c,
        d = p / 2,
        g = i(u),
        y = i(0);
    e.ZERO = y;
    var E = i(0, !0);
    e.UZERO = E;
    var w = i(1);
    e.ONE = w;
    var v = i(1, !0);
    e.UONE = v;
    var m = i(-1);
    e.NEG_ONE = m;
    var b = n(-1, 2147483647, !1);
    e.MAX_VALUE = b;
    var T = n(-1, -1, !0);
    e.MAX_UNSIGNED_VALUE = T;
    var S = n(0, -2147483648, !1);
    e.MIN_VALUE = S;
    var I = e.prototype;
    return I.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }, I.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * c + (this.low >>> 0) : this.high * c + (this.low >>> 0)
    }, I.toString = function(e) {
        if (e = e || 10, 2 > e || e > 36) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(S)) {
                var t = r(e),
                    i = this.div(t),
                    n = i.mul(t).sub(this);
                return i.toString(e) + n.toInt().toString(e)
            }
            return "-" + this.neg().toString(e)
        }
        for (var s = r(h(e, 6), this.unsigned), o = this, f = "";;) {
            var a = o.div(s),
                l = o.sub(a.mul(s)).toInt() >>> 0,
                u = l.toString(e);
            if (o = a, o.isZero()) return u + f;
            for (; u.length < 6;) u = "0" + u;
            f = "" + u + f
        }
    }, I.getHighBits = function() {
        return this.high
    }, I.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }, I.getLowBits = function() {
        return this.low
    }, I.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }, I.getNumBitsAbs = function() {
        if (this.isNegative()) return this.eq(S) ? 64 : this.neg().getNumBitsAbs();
        for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--);
        return 0 != this.high ? t + 33 : t + 1
    }, I.isZero = function() {
        return 0 === this.high && 0 === this.low
    }, I.isNegative = function() {
        return !this.unsigned && this.high < 0
    }, I.isPositive = function() {
        return this.unsigned || this.high >= 0
    }, I.isOdd = function() {
        return 1 === (1 & this.low)
    }, I.isEven = function() {
        return 0 === (1 & this.low)
    }, I.equals = function(e) {
        return t(e) || (e = o(e)), this.unsigned !== e.unsigned && this.high >>> 31 === 1 && e.high >>> 31 === 1 ? !1 : this.high === e.high && this.low === e.low
    }, I.eq = I.equals, I.notEquals = function(e) {
        return !this.eq(e)
    }, I.neq = I.notEquals, I.lessThan = function(e) {
        return this.comp(e) < 0
    }, I.lt = I.lessThan, I.lessThanOrEqual = function(e) {
        return this.comp(e) <= 0
    }, I.lte = I.lessThanOrEqual, I.greaterThan = function(e) {
        return this.comp(e) > 0
    }, I.gt = I.greaterThan, I.greaterThanOrEqual = function(e) {
        return this.comp(e) >= 0
    }, I.gte = I.greaterThanOrEqual, I.compare = function(e) {
        if (t(e) || (e = o(e)), this.eq(e)) return 0;
        var i = this.isNegative(),
            r = e.isNegative();
        return i && !r ? -1 : !i && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
    }, I.comp = I.compare, I.negate = function() {
        return !this.unsigned && this.eq(S) ? S : this.not().add(w)
    }, I.neg = I.negate, I.add = function(e) {
        t(e) || (e = o(e));
        var i = this.high >>> 16,
            r = 65535 & this.high,
            s = this.low >>> 16,
            f = 65535 & this.low,
            a = e.high >>> 16,
            h = 65535 & e.high,
            l = e.low >>> 16,
            u = 65535 & e.low,
            c = 0,
            p = 0,
            d = 0,
            g = 0;
        return g += f + u, d += g >>> 16, g &= 65535, d += s + l, p += d >>> 16, d &= 65535, p += r + h, c += p >>> 16, p &= 65535, c += i + a, c &= 65535, n(d << 16 | g, c << 16 | p, this.unsigned)
    }, I.subtract = function(e) {
        return t(e) || (e = o(e)), this.add(e.neg())
    }, I.sub = I.subtract, I.multiply = function(e) {
        if (this.isZero()) return y;
        if (t(e) || (e = o(e)), e.isZero()) return y;
        if (this.eq(S)) return e.isOdd() ? S : y;
        if (e.eq(S)) return this.isOdd() ? S : y;
        if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
        if (e.isNegative()) return this.mul(e.neg()).neg();
        if (this.lt(g) && e.lt(g)) return r(this.toNumber() * e.toNumber(), this.unsigned);
        var i = this.high >>> 16,
            s = 65535 & this.high,
            f = this.low >>> 16,
            a = 65535 & this.low,
            h = e.high >>> 16,
            l = 65535 & e.high,
            u = e.low >>> 16,
            c = 65535 & e.low,
            p = 0,
            d = 0,
            E = 0,
            w = 0;
        return w += a * c, E += w >>> 16, w &= 65535, E += f * c, d += E >>> 16, E &= 65535, E += a * u, d += E >>> 16, E &= 65535, d += s * c, p += d >>> 16, d &= 65535, d += f * u, p += d >>> 16, d &= 65535, d += a * l, p += d >>> 16, d &= 65535, p += i * c + s * u + f * l + a * h, p &= 65535, n(E << 16 | w, p << 16 | d, this.unsigned)
    }, I.mul = I.multiply, I.divide = function(e) {
        if (t(e) || (e = o(e)), e.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? E : y;
        var i, n, s;
        if (this.unsigned) {
            if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return E;
            if (e.gt(this.shru(1))) return v;
            s = E
        } else {
            if (this.eq(S)) {
                if (e.eq(w) || e.eq(m)) return S;
                if (e.eq(S)) return w;
                var f = this.shr(1);
                return i = f.div(e).shl(1), i.eq(y) ? e.isNegative() ? w : m : (n = this.sub(e.mul(i)), s = i.add(n.div(e)))
            }
            if (e.eq(S)) return this.unsigned ? E : y;
            if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
            if (e.isNegative()) return this.div(e.neg()).neg();
            s = y
        }
        for (n = this; n.gte(e);) {
            i = Math.max(1, Math.floor(n.toNumber() / e.toNumber()));
            for (var a = Math.ceil(Math.log(i) / Math.LN2), l = 48 >= a ? 1 : h(2, a - 48), u = r(i), c = u.mul(e); c.isNegative() || c.gt(n);) i -= l, u = r(i, this.unsigned), c = u.mul(e);
            u.isZero() && (u = w), s = s.add(u), n = n.sub(c)
        }
        return s
    }, I.div = I.divide, I.modulo = function(e) {
        return t(e) || (e = o(e)), this.sub(this.div(e).mul(e))
    }, I.mod = I.modulo, I.not = function() {
        return n(~this.low, ~this.high, this.unsigned)
    }, I.and = function(e) {
        return t(e) || (e = o(e)), n(this.low & e.low, this.high & e.high, this.unsigned)
    }, I.or = function(e) {
        return t(e) || (e = o(e)), n(this.low | e.low, this.high | e.high, this.unsigned)
    }, I.xor = function(e) {
        return t(e) || (e = o(e)), n(this.low ^ e.low, this.high ^ e.high, this.unsigned)
    }, I.shiftLeft = function(e) {
        return t(e) && (e = e.toInt()), 0 === (e &= 63) ? this : 32 > e ? n(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : n(0, this.low << e - 32, this.unsigned)
    }, I.shl = I.shiftLeft, I.shiftRight = function(e) {
        return t(e) && (e = e.toInt()), 0 === (e &= 63) ? this : 32 > e ? n(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : n(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }, I.shr = I.shiftRight, I.shiftRightUnsigned = function(e) {
        if (t(e) && (e = e.toInt()), e &= 63, 0 === e) return this;
        var i = this.high;
        if (32 > e) {
            var r = this.low;
            return n(r >>> e | i << 32 - e, i >>> e, this.unsigned)
        }
        return 32 === e ? n(i, 0, this.unsigned) : n(i >>> e - 32, 0, this.unsigned)
    }, I.shru = I.shiftRightUnsigned, I.toSigned = function() {
        return this.unsigned ? n(this.low, this.high, !1) : this
    }, I.toUnsigned = function() {
        return this.unsigned ? this : n(this.low, this.high, !0)
    }, I.toBytes = function(e) {
        return e ? this.toBytesLE() : this.toBytesBE()
    }, I.toBytesLE = function() {
        var e = this.high,
            t = this.low;
        return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255]
    }, I.toBytesBE = function() {
        var e = this.high,
            t = this.low;
        return [e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
    }, e
}), function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = t() : (e.dcodeIO = e.dcodeIO || {}).Long = t()
}(this, function() {
    function e(e, t, i) {
        this.low = 0 | e, this.high = 0 | t, this.unsigned = !! i
    }
    function t(e) {
        return !0 === (e && e.__isLong__)
    }
    function i(e, t) {
        var i, r;
        if (t) {
            if (e >>>= 0, (r = e >= 0 && 256 > e) && (i = a[e])) return i;
            i = n(e, 0 > (0 | e) ? -1 : 0, !0), r && (a[e] = i)
        } else {
            if (e |= 0, (r = e >= -128 && 128 > e) && (i = f[e])) return i;
            i = n(e, 0 > e ? -1 : 0, !1), r && (f[e] = i)
        }
        return i
    }
    function r(e, t) {
        if (isNaN(e) || !isFinite(e)) return t ? d : p;
        if (t) {
            if (0 > e) return d;
            if (e >= l) return v
        } else {
            if (-u >= e) return m;
            if (e + 1 >= u) return w
        }
        return 0 > e ? r(-e, t).neg() : n(e % 4294967296 | 0, e / 4294967296 | 0, t)
    }
    function n(t, i, r) {
        return new e(t, i, r)
    }
    function s(e, t, i) {
        if (0 === e.length) throw Error("empty string");
        if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return p;
        if ("number" == typeof t ? (i = t, t = !1) : t = !! t, i = i || 10, 2 > i || i > 36) throw RangeError("radix");
        var n;
        if (0 < (n = e.indexOf("-"))) throw Error("interior hyphen");
        if (0 === n) return s(e.substring(1), t, i).neg();
        n = r(h(i, 8));
        for (var o = p, f = 0; f < e.length; f += 8) {
            var a = Math.min(8, e.length - f),
                l = parseInt(e.substring(f, f + a), i);
            8 > a ? (a = r(h(i, a)), o = o.mul(a).add(r(l))) : (o = o.mul(n), o = o.add(r(l)))
        }
        return o.unsigned = t, o
    }
    function o(t) {
        return t instanceof e ? t : "number" == typeof t ? r(t) : "string" == typeof t ? s(t) : n(t.low, t.high, t.unsigned)
    }
    Object.defineProperty(e.prototype, "__isLong__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    }), e.isLong = t;
    var f = {},
        a = {};
    e.fromInt = i, e.fromNumber = r, e.fromBits = n;
    var h = Math.pow;
    e.fromString = s, e.fromValue = o;
    var l = 0x10000000000000000,
        u = l / 2,
        c = i(16777216),
        p = i(0);
    e.ZERO = p;
    var d = i(0, !0);
    e.UZERO = d;
    var g = i(1);
    e.ONE = g;
    var y = i(1, !0);
    e.UONE = y;
    var E = i(-1);
    e.NEG_ONE = E;
    var w = n(-1, 2147483647, !1);
    e.MAX_VALUE = w;
    var v = n(-1, -1, !0);
    e.MAX_UNSIGNED_VALUE = v;
    var m = n(0, -2147483648, !1);
    e.MIN_VALUE = m;
    var b = e.prototype;
    return b.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }, b.toNumber = function() {
        return this.unsigned ? 4294967296 * (this.high >>> 0) + (this.low >>> 0) : 4294967296 * this.high + (this.low >>> 0)
    }, b.toString = function(e) {
        if (e = e || 10, 2 > e || e > 36) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(m)) {
                var t = r(e),
                    i = this.div(t),
                    t = i.mul(t).sub(this);
                return i.toString(e) + t.toInt().toString(e)
            }
            return "-" + this.neg().toString(e)
        }
        for (var i = r(h(e, 6), this.unsigned), t = this, n = "";;) {
            var s = t.div(i),
                o = (t.sub(s.mul(i)).toInt() >>> 0).toString(e),
                t = s;
            if (t.isZero()) return o + n;
            for (; 6 > o.length;) o = "0" + o;
            n = "" + o + n
        }
    }, b.getHighBits = function() {
        return this.high
    }, b.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }, b.getLowBits = function() {
        return this.low
    }, b.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }, b.getNumBitsAbs = function() {
        if (this.isNegative()) return this.eq(m) ? 64 : this.neg().getNumBitsAbs();
        for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--);
        return 0 != this.high ? t + 33 : t + 1
    }, b.isZero = function() {
        return 0 === this.high && 0 === this.low
    }, b.isNegative = function() {
        return !this.unsigned && 0 > this.high
    }, b.isPositive = function() {
        return this.unsigned || 0 <= this.high
    }, b.isOdd = function() {
        return 1 === (1 & this.low)
    }, b.isEven = function() {
        return 0 === (1 & this.low)
    }, b.equals = function(e) {
        return t(e) || (e = o(e)), this.unsigned !== e.unsigned && 1 === this.high >>> 31 && 1 === e.high >>> 31 ? !1 : this.high === e.high && this.low === e.low
    }, b.eq = b.equals, b.notEquals = function(e) {
        return !this.eq(e)
    }, b.neq = b.notEquals, b.lessThan = function(e) {
        return 0 > this.comp(e)
    }, b.lt = b.lessThan, b.lessThanOrEqual = function(e) {
        return 0 >= this.comp(e)
    }, b.lte = b.lessThanOrEqual, b.greaterThan = function(e) {
        return 0 < this.comp(e)
    }, b.gt = b.greaterThan, b.greaterThanOrEqual = function(e) {
        return 0 <= this.comp(e)
    }, b.gte = b.greaterThanOrEqual, b.compare = function(e) {
        if (t(e) || (e = o(e)), this.eq(e)) return 0;
        var i = this.isNegative(),
            r = e.isNegative();
        return i && !r ? -1 : !i && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
    }, b.comp = b.compare, b.negate = function() {
        return !this.unsigned && this.eq(m) ? m : this.not().add(g)
    }, b.neg = b.negate, b.add = function(e) {
        t(e) || (e = o(e));
        var i, r = this.high >>> 16,
            s = 65535 & this.high,
            f = this.low >>> 16,
            a = e.high >>> 16,
            h = 65535 & e.high,
            l = e.low >>> 16;
        return i = 0 + ((65535 & this.low) + (65535 & e.low)), e = 0 + (i >>> 16), e += f + l, f = 0 + (e >>> 16), f += s + h, s = 0 + (f >>> 16), s = s + (r + a) & 65535, n((65535 & e) << 16 | 65535 & i, s << 16 | 65535 & f, this.unsigned)
    }, b.subtract = function(e) {
        return t(e) || (e = o(e)), this.add(e.neg())
    }, b.sub = b.subtract, b.multiply = function(e) {
        if (this.isZero()) return p;
        if (t(e) || (e = o(e)), e.isZero()) return p;
        if (this.eq(m)) return e.isOdd() ? m : p;
        if (e.eq(m)) return this.isOdd() ? m : p;
        if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
        if (e.isNegative()) return this.mul(e.neg()).neg();
        if (this.lt(c) && e.lt(c)) return r(this.toNumber() * e.toNumber(), this.unsigned);
        var i = this.high >>> 16,
            s = 65535 & this.high,
            f = this.low >>> 16,
            a = 65535 & this.low,
            h = e.high >>> 16,
            l = 65535 & e.high,
            u = e.low >>> 16;
        e = 65535 & e.low;
        var d, g, y, E;
        return E = 0 + a * e, y = 0 + (E >>> 16), y += f * e, g = 0 + (y >>> 16), y = (65535 & y) + a * u, g += y >>> 16, y &= 65535, g += s * e, d = 0 + (g >>> 16), g = (65535 & g) + f * u, d += g >>> 16, g &= 65535, g += a * l, d += g >>> 16, g &= 65535, d = d + (i * e + s * u + f * l + a * h) & 65535, n(y << 16 | 65535 & E, d << 16 | g, this.unsigned)
    }, b.mul = b.multiply, b.divide = function(e) {
        if (t(e) || (e = o(e)), e.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? d : p;
        var i, n, s;
        if (this.unsigned) {
            if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return d;
            if (e.gt(this.shru(1))) return y;
            s = d
        } else {
            if (this.eq(m)) return e.eq(g) || e.eq(E) ? m : e.eq(m) ? g : (i = this.shr(1).div(e).shl(1), i.eq(p) ? e.isNegative() ? g : E : (n = this.sub(e.mul(i)), s = i.add(n.div(e))));
            if (e.eq(m)) return this.unsigned ? d : p;
            if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
            if (e.isNegative()) return this.div(e.neg()).neg();
            s = p
        }
        for (n = this; n.gte(e);) {
            i = Math.max(1, Math.floor(n.toNumber() / e.toNumber()));
            for (var f = Math.ceil(Math.log(i) / Math.LN2), f = 48 >= f ? 1 : h(2, f - 48), a = r(i), l = a.mul(e); l.isNegative() || l.gt(n);) i -= f, a = r(i, this.unsigned), l = a.mul(e);
            a.isZero() && (a = g), s = s.add(a), n = n.sub(l)
        }
        return s
    }, b.div = b.divide, b.modulo = function(e) {
        return t(e) || (e = o(e)), this.sub(this.div(e).mul(e))
    }, b.mod = b.modulo, b.not = function() {
        return n(~this.low, ~this.high, this.unsigned)
    }, b.and = function(e) {
        return t(e) || (e = o(e)), n(this.low & e.low, this.high & e.high, this.unsigned)
    }, b.or = function(e) {
        return t(e) || (e = o(e)), n(this.low | e.low, this.high | e.high, this.unsigned)
    }, b.xor = function(e) {
        return t(e) || (e = o(e)), n(this.low ^ e.low, this.high ^ e.high, this.unsigned)
    }, b.shiftLeft = function(e) {
        return t(e) && (e = e.toInt()), 0 === (e &= 63) ? this : 32 > e ? n(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : n(0, this.low << e - 32, this.unsigned)
    }, b.shl = b.shiftLeft, b.shiftRight = function(e) {
        return t(e) && (e = e.toInt()), 0 === (e &= 63) ? this : 32 > e ? n(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : n(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned)
    }, b.shr = b.shiftRight, b.shiftRightUnsigned = function(e) {
        if (t(e) && (e = e.toInt()), e &= 63, 0 === e) return this;
        var i = this.high;
        return 32 > e ? n(this.low >>> e | i << 32 - e, i >>> e, this.unsigned) : 32 === e ? n(i, 0, this.unsigned) : n(i >>> e - 32, 0, this.unsigned)
    }, b.shru = b.shiftRightUnsigned, b.toSigned = function() {
        return this.unsigned ? n(this.low, this.high, !1) : this
    }, b.toUnsigned = function() {
        return this.unsigned ? this : n(this.low, this.high, !0)
    }, b.toBytes = function(e) {
        return e ? this.toBytesLE() : this.toBytesBE()
    }, b.toBytesLE = function() {
        var e = this.high,
            t = this.low;
        return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255]
    }, b.toBytesBE = function() {
        var e = this.high,
            t = this.low;
        return [e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
    }, e
}), function(e, t) {
    "function" == typeof define && define.amd ? define(["long"], t) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = function() {
        var e;
        try {
            e = require("long")
        } catch (i) {}
        return t(e)
    }() : (e.dcodeIO = e.dcodeIO || {}).ByteBuffer = t(e.dcodeIO.Long)
}(this, function(e) {
    "use strict";

    function t(e) {
        var t = 0;
        return function() {
            return t < e.length ? e.charCodeAt(t++) : null
        }
    }
    function i() {
        var e = [],
            t = [];
        return function() {
            return 0 === arguments.length ? t.join("") + a.apply(String, e) : (e.length + arguments.length > 1024 && (t.push(a.apply(String, e)), e.length = 0), void Array.prototype.push.apply(e, arguments))
        }
    }
    function r(e, t, i, r, n) {
        var s, o, f = 8 * n - r - 1,
            a = (1 << f) - 1,
            h = a >> 1,
            l = -7,
            u = i ? n - 1 : 0,
            c = i ? -1 : 1,
            p = e[t + u];
        for (u += c, s = p & (1 << -l) - 1, p >>= -l, l += f; l > 0; s = 256 * s + e[t + u], u += c, l -= 8);
        for (o = s & (1 << -l) - 1, s >>= -l, l += r; l > 0; o = 256 * o + e[t + u], u += c, l -= 8);
        if (0 === s) s = 1 - h;
        else {
            if (s === a) return o ? 0 / 0 : (p ? -1 : 1) * (1 / 0);
            o += Math.pow(2, r), s -= h
        }
        return (p ? -1 : 1) * o * Math.pow(2, s - r)
    }
    function n(e, t, i, r, n, s) {
        var o, f, a, h = 8 * s - n - 1,
            l = (1 << h) - 1,
            u = l >> 1,
            c = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : s - 1,
            d = r ? 1 : -1,
            g = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (f = isNaN(t) ? 1 : 0, o = l) : (o = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -o)) < 1 && (o--, a *= 2), t += o + u >= 1 ? c / a : c * Math.pow(2, 1 - u), t * a >= 2 && (o++, a /= 2), o + u >= l ? (f = 0, o = l) : o + u >= 1 ? (f = (t * a - 1) * Math.pow(2, n), o += u) : (f = t * Math.pow(2, u - 1) * Math.pow(2, n), o = 0)); n >= 8; e[i + p] = 255 & f, p += d, f /= 256, n -= 8);
        for (o = o << n | f, h += n; h > 0; e[i + p] = 255 & o, p += d, o /= 256, h -= 8);
        e[i + p - d] |= 128 * g
    }
    var s = function(e, t, i) {
            if ("undefined" == typeof e && (e = s.DEFAULT_CAPACITY), "undefined" == typeof t && (t = s.DEFAULT_ENDIAN), "undefined" == typeof i && (i = s.DEFAULT_NOASSERT), !i) {
                if (e = 0 | e, 0 > e) throw RangeError("Illegal capacity");
                t = !! t, i = !! i
            }
            this.buffer = 0 === e ? f : new ArrayBuffer(e), this.view = 0 === e ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = e, this.littleEndian = t, this.noAssert = i
        };
    s.VERSION = "5.0.1", s.LITTLE_ENDIAN = !0, s.BIG_ENDIAN = !1, s.DEFAULT_CAPACITY = 16, s.DEFAULT_ENDIAN = s.BIG_ENDIAN, s.DEFAULT_NOASSERT = !1, s.Long = e || null;
    var o = s.prototype;
    o.__isByteBuffer__, Object.defineProperty(o, "__isByteBuffer__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    });
    var f = new ArrayBuffer(0),
        a = String.fromCharCode;
    s.accessor = function() {
        return Uint8Array
    }, s.allocate = function(e, t, i) {
        return new s(e, t, i)
    }, s.concat = function(e, t, i, r) {
        ("boolean" == typeof t || "string" != typeof t) && (r = i, i = t, t = void 0);
        for (var n, o = 0, f = 0, a = e.length; a > f; ++f) s.isByteBuffer(e[f]) || (e[f] = s.wrap(e[f], t)), n = e[f].limit - e[f].offset, n > 0 && (o += n);
        if (0 === o) return new s(0, i, r);
        var h, l = new s(o, i, r);
        for (f = 0; a > f;) h = e[f++], n = h.limit - h.offset, 0 >= n || (l.view.set(h.view.subarray(h.offset, h.limit), l.offset), l.offset += n);
        return l.limit = l.offset, l.offset = 0, l
    }, s.isByteBuffer = function(e) {
        return (e && e.__isByteBuffer__) === !0
    }, s.type = function() {
        return ArrayBuffer
    }, s.wrap = function(e, t, i, r) {
        if ("string" != typeof t && (r = i, i = t, t = void 0), "string" == typeof e) switch ("undefined" == typeof t && (t = "utf8"), t) {
        case "base64":
            return s.fromBase64(e, i);
        case "hex":
            return s.fromHex(e, i);
        case "binary":
            return s.fromBinary(e, i);
        case "utf8":
            return s.fromUTF8(e, i);
        case "debug":
            return s.fromDebug(e, i);
        default:
            throw Error("Unsupported encoding: " + t)
        }
        if (null === e || "object" != typeof e) throw TypeError("Illegal buffer");
        var n;
        if (s.isByteBuffer(e)) return n = o.clone.call(e), n.markedOffset = -1, n;
        if (e instanceof Uint8Array) n = new s(0, i, r), e.length > 0 && (n.buffer = e.buffer, n.offset = e.byteOffset, n.limit = e.byteOffset + e.byteLength, n.view = new Uint8Array(e.buffer));
        else if (e instanceof ArrayBuffer) n = new s(0, i, r), e.byteLength > 0 && (n.buffer = e, n.offset = 0, n.limit = e.byteLength, n.view = e.byteLength > 0 ? new Uint8Array(e) : null);
        else {
            if ("[object Array]" !== Object.prototype.toString.call(e)) throw TypeError("Illegal buffer");
            n = new s(e.length, i, r), n.limit = e.length;
            for (var f = 0; f < e.length; ++f) n.view[f] = e[f]
        }
        return n
    }, o.writeBitSet = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if (!(e instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        var r, n = t,
            s = e.length,
            o = s >> 3,
            f = 0;
        for (t += this.writeVarint32(s, t); o--;) r = 1 & !! e[f++] | (1 & !! e[f++]) << 1 | (1 & !! e[f++]) << 2 | (1 & !! e[f++]) << 3 | (1 & !! e[f++]) << 4 | (1 & !! e[f++]) << 5 | (1 & !! e[f++]) << 6 | (1 & !! e[f++]) << 7, this.writeByte(r, t++);
        if (s > f) {
            var a = 0;
            for (r = 0; s > f;) r |= (1 & !! e[f++]) << a++;
            this.writeByte(r, t++)
        }
        return i ? (this.offset = t, this) : t - n
    }, o.readBitSet = function(e) {
        var t = "undefined" == typeof e;
        t && (e = this.offset);
        var i, r = this.readVarint32(e),
            n = r.value,
            s = n >> 3,
            o = 0,
            f = [];
        for (e += r.length; s--;) i = this.readByte(e++), f[o++] = !! (1 & i), f[o++] = !! (2 & i), f[o++] = !! (4 & i), f[o++] = !! (8 & i), f[o++] = !! (16 & i), f[o++] = !! (32 & i), f[o++] = !! (64 & i), f[o++] = !! (128 & i);
        if (n > o) {
            var a = 0;
            for (i = this.readByte(e++); n > o;) f[o++] = !! (i >> a++ & 1)
        }
        return t && (this.offset = e), f
    }, o.readBytes = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+" + e + ") <= " + this.buffer.byteLength)
        }
        var r = this.slice(t, t + e);
        return i && (this.offset += e), r
    }, o.writeBytes = o.append, o.writeInt8 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 1;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 1, this.view[t] = e, i && (this.offset += 1), this
    }, o.writeByte = o.writeInt8, o.readInt8 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i = this.view[e];
        return 128 === (128 & i) && (i = -(255 - i + 1)), t && (this.offset += 1), i
    }, o.readByte = o.readInt8, o.writeUint8 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 1;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 1, this.view[t] = e, i && (this.offset += 1), this
    }, o.writeUInt8 = o.writeUint8, o.readUint8 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i = this.view[e];
        return t && (this.offset += 1), i
    }, o.readUInt8 = o.readUint8, o.writeInt16 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 2;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this
    }, o.writeShort = o.writeInt16, o.readInt16 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e], i |= this.view[e + 1] << 8) : (i = this.view[e] << 8, i |= this.view[e + 1]), 32768 === (32768 & i) && (i = -(65535 - i + 1)), t && (this.offset += 2), i
    }, o.readShort = o.readInt16, o.writeUint16 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 2;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this
    }, o.writeUInt16 = o.writeUint16, o.readUint16 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e], i |= this.view[e + 1] << 8) : (i = this.view[e] << 8, i |= this.view[e + 1]), t && (this.offset += 2), i
    }, o.readUInt16 = o.readUint16, o.writeInt32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 4, this.littleEndian ? (this.view[t + 3] = e >>> 24 & 255, this.view[t + 2] = e >>> 16 & 255, this.view[t + 1] = e >>> 8 & 255, this.view[t] = 255 & e) : (this.view[t] = e >>> 24 & 255, this.view[t + 1] = e >>> 16 & 255, this.view[t + 2] = e >>> 8 & 255, this.view[t + 3] = 255 & e), i && (this.offset += 4), this
    }, o.writeInt = o.writeInt32, o.readInt32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], i += this.view[e + 3] << 24 >>> 0) : (i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], i += this.view[e] << 24 >>> 0), i |= 0, t && (this.offset += 4), i
    }, o.readInt = o.readInt32, o.writeUint32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 4, this.littleEndian ? (this.view[t + 3] = e >>> 24 & 255, this.view[t + 2] = e >>> 16 & 255, this.view[t + 1] = e >>> 8 & 255, this.view[t] = 255 & e) : (this.view[t] = e >>> 24 & 255, this.view[t + 1] = e >>> 16 & 255, this.view[t + 2] = e >>> 8 & 255, this.view[t + 3] = 255 & e), i && (this.offset += 4), this
    }, o.writeUInt32 = o.writeUint32, o.readUint32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], i += this.view[e + 3] << 24 >>> 0) : (i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], i += this.view[e] << 24 >>> 0), t && (this.offset += 4), i
    }, o.readUInt32 = o.readUint32, e && (o.writeInt64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), i += 8;
        var n = this.buffer.byteLength;
        i > n && this.resize((n *= 2) > i ? n : i), i -= 8;
        var s = t.low,
            o = t.high;
        return this.littleEndian ? (this.view[i + 3] = s >>> 24 & 255, this.view[i + 2] = s >>> 16 & 255, this.view[i + 1] = s >>> 8 & 255, this.view[i] = 255 & s, i += 4, this.view[i + 3] = o >>> 24 & 255, this.view[i + 2] = o >>> 16 & 255, this.view[i + 1] = o >>> 8 & 255, this.view[i] = 255 & o) : (this.view[i] = o >>> 24 & 255, this.view[i + 1] = o >>> 16 & 255, this.view[i + 2] = o >>> 8 & 255, this.view[i + 3] = 255 & o, i += 4, this.view[i] = s >>> 24 & 255, this.view[i + 1] = s >>> 16 & 255, this.view[i + 2] = s >>> 8 & 255, this.view[i + 3] = 255 & s), r && (this.offset += 8), this
    }, o.writeLong = o.writeInt64, o.readInt64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
        }
        var r = 0,
            n = 0;
        this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, r |= this.view[t], r += this.view[t + 3] << 24 >>> 0, t += 4, n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0) : (n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0, t += 4, r = this.view[t + 1] << 16, r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0);
        var s = new e(r, n, !1);
        return i && (this.offset += 8), s
    }, o.readLong = o.readInt64, o.writeUint64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), i += 8;
        var n = this.buffer.byteLength;
        i > n && this.resize((n *= 2) > i ? n : i), i -= 8;
        var s = t.low,
            o = t.high;
        return this.littleEndian ? (this.view[i + 3] = s >>> 24 & 255, this.view[i + 2] = s >>> 16 & 255, this.view[i + 1] = s >>> 8 & 255, this.view[i] = 255 & s, i += 4, this.view[i + 3] = o >>> 24 & 255, this.view[i + 2] = o >>> 16 & 255, this.view[i + 1] = o >>> 8 & 255, this.view[i] = 255 & o) : (this.view[i] = o >>> 24 & 255, this.view[i + 1] = o >>> 16 & 255, this.view[i + 2] = o >>> 8 & 255, this.view[i + 3] = 255 & o, i += 4, this.view[i] = s >>> 24 & 255, this.view[i + 1] = s >>> 16 & 255, this.view[i + 2] = s >>> 8 & 255, this.view[i + 3] = 255 & s), r && (this.offset += 8), this
    }, o.writeUInt64 = o.writeUint64, o.readUint64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
        }
        var r = 0,
            n = 0;
        this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, r |= this.view[t], r += this.view[t + 3] << 24 >>> 0, t += 4, n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0) : (n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0, t += 4, r = this.view[t + 1] << 16, r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0);
        var s = new e(r, n, !0);
        return i && (this.offset += 8), s
    }, o.readUInt64 = o.readUint64), o.writeFloat32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 4, n(this.view, e, t, this.littleEndian, 23, 4), i && (this.offset += 4), this
    }, o.writeFloat = o.writeFloat32, o.readFloat32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = r(this.view, e, this.littleEndian, 23, 4);
        return t && (this.offset += 4), i
    }, o.readFloat = o.readFloat32, o.writeFloat64 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 8;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 8, n(this.view, e, t, this.littleEndian, 52, 8), i && (this.offset += 8), this
    }, o.writeDouble = o.writeFloat64, o.readFloat64 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength)
        }
        var i = r(this.view, e, this.littleEndian, 52, 8);
        return t && (this.offset += 8), i
    }, o.readDouble = o.readFloat64, s.MAX_VARINT32_BYTES = 5, s.calculateVarint32 = function(e) {
        return e >>>= 0, 128 > e ? 1 : 16384 > e ? 2 : 1 << 21 > e ? 3 : 1 << 28 > e ? 4 : 5
    }, s.zigZagEncode32 = function(e) {
        return ((e |= 0) << 1 ^ e >> 31) >>> 0
    }, s.zigZagDecode32 = function(e) {
        return e >>> 1 ^ -(1 & e) | 0
    }, o.writeVarint32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        var r, n = s.calculateVarint32(e);
        t += n;
        var o = this.buffer.byteLength;
        for (t > o && this.resize((o *= 2) > t ? o : t), t -= n, e >>>= 0; e >= 128;) r = 127 & e | 128, this.view[t++] = r, e >>>= 7;
        return this.view[t++] = e, i ? (this.offset = t, this) : n
    }, o.writeVarint32ZigZag = function(e, t) {
        return this.writeVarint32(s.zigZagEncode32(e), t)
    }, o.readVarint32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i, r = 0,
            n = 0;
        do {
            if (!this.noAssert && e > this.limit) {
                var s = Error("Truncated");
                throw s.truncated = !0, s
            }
            i = this.view[e++], 5 > r && (n |= (127 & i) << 7 * r), ++r
        } while (0 !== (128 & i));
        return n |= 0, t ? (this.offset = e, n) : {
            value: n,
            length: r
        }
    }, o.readVarint32ZigZag = function(e) {
        var t = this.readVarint32(e);
        return "object" == typeof t ? t.value = s.zigZagDecode32(t.value) : t = s.zigZagDecode32(t), t
    }, e && (s.MAX_VARINT64_BYTES = 10, s.calculateVarint64 = function(t) {
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t));
        var i = t.toInt() >>> 0,
            r = t.shiftRightUnsigned(28).toInt() >>> 0,
            n = t.shiftRightUnsigned(56).toInt() >>> 0;
        return 0 == n ? 0 == r ? 16384 > i ? 128 > i ? 1 : 2 : 1 << 21 > i ? 3 : 4 : 16384 > r ? 128 > r ? 5 : 6 : 1 << 21 > r ? 7 : 8 : 128 > n ? 9 : 10
    }, s.zigZagEncode64 = function(t) {
        return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : t.unsigned !== !1 && (t = t.toSigned()), t.shiftLeft(1).xor(t.shiftRight(63)).toUnsigned()
    }, s.zigZagDecode64 = function(t) {
        return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : t.unsigned !== !1 && (t = t.toSigned()), t.shiftRightUnsigned(1).xor(t.and(e.ONE).toSigned().negate()).toSigned()
    }, o.writeVarint64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : t.unsigned !== !1 && (t = t.toSigned());
        var n = s.calculateVarint64(t),
            o = t.toInt() >>> 0,
            f = t.shiftRightUnsigned(28).toInt() >>> 0,
            a = t.shiftRightUnsigned(56).toInt() >>> 0;
        i += n;
        var h = this.buffer.byteLength;
        switch (i > h && this.resize((h *= 2) > i ? h : i), i -= n, n) {
        case 10:
            this.view[i + 9] = a >>> 7 & 1;
        case 9:
            this.view[i + 8] = 9 !== n ? 128 | a : 127 & a;
        case 8:
            this.view[i + 7] = 8 !== n ? f >>> 21 | 128 : f >>> 21 & 127;
        case 7:
            this.view[i + 6] = 7 !== n ? f >>> 14 | 128 : f >>> 14 & 127;
        case 6:
            this.view[i + 5] = 6 !== n ? f >>> 7 | 128 : f >>> 7 & 127;
        case 5:
            this.view[i + 4] = 5 !== n ? 128 | f : 127 & f;
        case 4:
            this.view[i + 3] = 4 !== n ? o >>> 21 | 128 : o >>> 21 & 127;
        case 3:
            this.view[i + 2] = 3 !== n ? o >>> 14 | 128 : o >>> 14 & 127;
        case 2:
            this.view[i + 1] = 2 !== n ? o >>> 7 | 128 : o >>> 7 & 127;
        case 1:
            this.view[i] = 1 !== n ? 128 | o : 127 & o
        }
        return r ? (this.offset += n, this) : n
    }, o.writeVarint64ZigZag = function(e, t) {
        return this.writeVarint64(s.zigZagEncode64(e), t)
    }, o.readVarint64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength)
        }
        var r = t,
            n = 0,
            s = 0,
            o = 0,
            f = 0;
        if (f = this.view[t++], n = 127 & f, 128 & f && (f = this.view[t++], n |= (127 & f) << 7, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], n |= (127 & f) << 14, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], n |= (127 & f) << 21, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s = 127 & f, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 7, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 14, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 21, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], o = 127 & f, (128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], o |= (127 & f) << 7, 128 & f || this.noAssert && "undefined" == typeof f)))))))))) throw Error("Buffer overrun");
        var a = e.fromBits(n | s << 28, s >>> 4 | o << 24, !1);
        return i ? (this.offset = t, a) : {
            value: a,
            length: t - r
        }
    }, o.readVarint64ZigZag = function(t) {
        var i = this.readVarint64(t);
        return i && i.value instanceof e ? i.value = s.zigZagDecode64(i.value) : i = s.zigZagDecode64(i), i
    }), o.writeCString = function(e, i) {
        var r = "undefined" == typeof i;
        r && (i = this.offset);
        var n, s = e.length;
        if (!this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            for (n = 0; s > n; ++n) if (0 === e.charCodeAt(n)) throw RangeError("Illegal str: Contains NULL-characters");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        s = l.calculateUTF16asUTF8(t(e))[1], i += s + 1;
        var o = this.buffer.byteLength;
        return i > o && this.resize((o *= 2) > i ? o : i), i -= s + 1, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), this.view[i++] = 0, r ? (this.offset = i, this) : s
    }, o.readCString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var r, n = e,
            s = -1;
        return l.decodeUTF8toUTF16(function() {
            if (0 === s) return null;
            if (e >= this.limit) throw RangeError("Illegal range: Truncated data, " + e + " < " + this.limit);
            return s = this.view[e++], 0 === s ? null : s
        }.bind(this), r = i(), !0), t ? (this.offset = e, r()) : {
            string: r(),
            length: e - n
        }
    }, o.writeIString = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, s = i;
        n = l.calculateUTF16asUTF8(t(e), this.noAssert)[1], i += 4 + n;
        var o = this.buffer.byteLength;
        if (i > o && this.resize((o *= 2) > i ? o : i), i -= 4 + n, this.littleEndian ? (this.view[i + 3] = n >>> 24 & 255, this.view[i + 2] = n >>> 16 & 255, this.view[i + 1] = n >>> 8 & 255, this.view[i] = 255 & n) : (this.view[i] = n >>> 24 & 255, this.view[i + 1] = n >>> 16 & 255, this.view[i + 2] = n >>> 8 & 255, this.view[i + 3] = 255 & n), i += 4, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), i !== s + 4 + n) throw RangeError("Illegal range: Truncated data, " + i + " == " + (i + 4 + n));
        return r ? (this.offset = i, this) : i - s
    }, o.readIString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = e,
            r = this.readUint32(e),
            n = this.readUTF8String(r, s.METRICS_BYTES, e += 4);
        return e += n.length, t ? (this.offset = e, n.string) : {
            string: n.string,
            length: e - i
        }
    }, s.METRICS_CHARS = "c", s.METRICS_BYTES = "b", o.writeUTF8String = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, s = i;
        n = l.calculateUTF16asUTF8(t(e))[1], i += n;
        var o = this.buffer.byteLength;
        return i > o && this.resize((o *= 2) > i ? o : i), i -= n, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), r ? (this.offset = i, this) : i - s
    }, o.writeString = o.writeUTF8String, s.calculateUTF8Chars = function(e) {
        return l.calculateUTF16asUTF8(t(e))[0]
    }, s.calculateUTF8Bytes = function(e) {
        return l.calculateUTF16asUTF8(t(e))[1]
    }, s.calculateString = s.calculateUTF8Bytes, o.readUTF8String = function(e, t, r) {
        "number" == typeof t && (r = t, t = void 0);
        var n = "undefined" == typeof r;
        if (n && (r = this.offset), "undefined" == typeof t && (t = s.METRICS_CHARS), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal length: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
        }
        var o, f = 0,
            a = r;
        if (t === s.METRICS_CHARS) {
            if (o = i(), l.decodeUTF8(function() {
                return e > f && r < this.limit ? this.view[r++] : null
            }.bind(this), function(e) {
                ++f, l.UTF8toUTF16(e, o)
            }), f !== e) throw RangeError("Illegal range: Truncated data, " + f + " == " + e);
            return n ? (this.offset = r, o()) : {
                string: o(),
                length: r - a
            }
        }
        if (t === s.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
                if (r >>>= 0, 0 > r || r + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+" + e + ") <= " + this.buffer.byteLength)
            }
            var h = r + e;
            if (l.decodeUTF8toUTF16(function() {
                return h > r ? this.view[r++] : null
            }.bind(this), o = i(), this.noAssert), r !== h) throw RangeError("Illegal range: Truncated data, " + r + " == " + h);
            return n ? (this.offset = r, o()) : {
                string: o(),
                length: r - a
            }
        }
        throw TypeError("Unsupported metrics: " + t)
    }, o.readString = o.readUTF8String, o.writeVString = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, o, f = i;
        n = l.calculateUTF16asUTF8(t(e), this.noAssert)[1], o = s.calculateVarint32(n), i += o + n;
        var a = this.buffer.byteLength;
        if (i > a && this.resize((a *= 2) > i ? a : i), i -= o + n, i += this.writeVarint32(n, i), l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), i !== f + n + o) throw RangeError("Illegal range: Truncated data, " + i + " == " + (i + n + o));
        return r ? (this.offset = i, this) : i - f
    }, o.readVString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i = e,
            r = this.readVarint32(e),
            n = this.readUTF8String(r.value, s.METRICS_BYTES, e += r.length);
        return e += n.length, t ? (this.offset = e, n.string) : {
            string: n.string,
            length: e - i
        }
    }, o.append = function(e, t, i) {
        ("number" == typeof t || "string" != typeof t) && (i = t, t = void 0);
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        e instanceof s || (e = s.wrap(e, t));
        var n = e.limit - e.offset;
        if (0 >= n) return this;
        i += n;
        var o = this.buffer.byteLength;
        return i > o && this.resize((o *= 2) > i ? o : i), i -= n, this.view.set(e.view.subarray(e.offset, e.limit), i), e.offset += n, r && (this.offset += n), this
    }, o.appendTo = function(e, t) {
        return e.append(this, t), this
    }, o.assert = function(e) {
        return this.noAssert = !e, this
    }, o.capacity = function() {
        return this.buffer.byteLength
    }, o.clear = function() {
        return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this
    }, o.clone = function(e) {
        var t = new s(0, this.littleEndian, this.noAssert);
        return e ? (t.buffer = new ArrayBuffer(this.buffer.byteLength), t.view = new Uint8Array(t.buffer)) : (t.buffer = this.buffer, t.view = this.view), t.offset = this.offset, t.markedOffset = this.markedOffset, t.limit = this.limit, t
    }, o.compact = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        if (0 === e && t === this.buffer.byteLength) return this;
        var i = t - e;
        if (0 === i) return this.buffer = f, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = 0, this;
        var r = new ArrayBuffer(i),
            n = new Uint8Array(r);
        return n.set(this.view.subarray(e, t)), this.buffer = r, this.view = n, this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = i, this
    }, o.copy = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        if (e === t) return new s(0, this.littleEndian, this.noAssert);
        var i = t - e,
            r = new s(i, this.littleEndian, this.noAssert);
        return r.offset = 0, r.limit = i, r.markedOffset >= 0 && (r.markedOffset -= e), this.copyTo(r, 0, e, t), r
    }, o.copyTo = function(e, t, i, r) {
        var n, o;
        if (!this.noAssert && !s.isByteBuffer(e)) throw TypeError("Illegal target: Not a ByteBuffer");
        if (t = (o = "undefined" == typeof t) ? e.offset : 0 | t, i = (n = "undefined" == typeof i) ? this.offset : 0 | i, r = "undefined" == typeof r ? this.limit : 0 | r, 0 > t || t > e.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + t + " <= " + e.buffer.byteLength);
        if (0 > i || r > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + i + " <= " + this.buffer.byteLength);
        var f = r - i;
        return 0 === f ? e : (e.ensureCapacity(t + f), e.view.set(this.view.subarray(i, r), t), n && (this.offset += f), o && (e.offset += f), this)
    }, o.ensureCapacity = function(e) {
        var t = this.buffer.byteLength;
        return e > t ? this.resize((t *= 2) > e ? t : e) : this
    }, o.fill = function(e, t, i) {
        var r = "undefined" == typeof t;
        if (r && (t = this.offset), "string" == typeof e && e.length > 0 && (e = e.charCodeAt(0)), "undefined" == typeof t && (t = this.offset), "undefined" == typeof i && (i = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof i || i % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (i >>>= 0, 0 > t || t > i || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength)
        }
        if (t >= i) return this;
        for (; i > t;) this.view[t++] = e;
        return r && (this.offset = t), this
    }, o.flip = function() {
        return this.limit = this.offset, this.offset = 0, this
    }, o.mark = function(e) {
        if (e = "undefined" == typeof e ? this.offset : e, !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength)
        }
        return this.markedOffset = e, this
    }, o.order = function(e) {
        if (!this.noAssert && "boolean" != typeof e) throw TypeError("Illegal littleEndian: Not a boolean");
        return this.littleEndian = !! e, this
    }, o.LE = function(e) {
        return this.littleEndian = "undefined" != typeof e ? !! e : !0, this
    }, o.BE = function(e) {
        return this.littleEndian = "undefined" != typeof e ? !e : !1, this
    }, o.prepend = function(e, t, i) {
        ("number" == typeof t || "string" != typeof t) && (i = t, t = void 0);
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        e instanceof s || (e = s.wrap(e, t));
        var n = e.limit - e.offset;
        if (0 >= n) return this;
        var o = n - i;
        if (o > 0) {
            var f = new ArrayBuffer(this.buffer.byteLength + o),
                a = new Uint8Array(f);
            a.set(this.view.subarray(i, this.buffer.byteLength), n), this.buffer = f, this.view = a, this.offset += o, this.markedOffset >= 0 && (this.markedOffset += o), this.limit += o, i += o
        } else {
            new Uint8Array(this.buffer)
        }
        return this.view.set(e.view.subarray(e.offset, e.limit), i - n), e.offset = e.limit, r && (this.offset -= n), this
    }, o.prependTo = function(e, t) {
        return e.prepend(this, t), this
    }, o.printDebug = function(e) {
        "function" != typeof e && (e = console.log.bind(console)), e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
    }, o.remaining = function() {
        return this.limit - this.offset
    }, o.reset = function() {
        return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this
    }, o.resize = function(e) {
        if (!this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal capacity: " + e + " (not an integer)");
            if (e |= 0, 0 > e) throw RangeError("Illegal capacity: 0 <= " + e)
        }
        if (this.buffer.byteLength < e) {
            var t = new ArrayBuffer(e),
                i = new Uint8Array(t);
            i.set(this.view), this.buffer = t, this.view = i
        }
        return this
    }, o.reverse = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        return e === t ? this : (Array.prototype.reverse.call(this.view.subarray(e, t)), this)
    }, o.skip = function(e) {
        if (!this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal length: " + e + " (not an integer)");
            e |= 0
        }
        var t = this.offset + e;
        if (!this.noAssert && (0 > t || t > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);
        return this.offset = t, this
    }, o.slice = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        var i = this.clone();
        return i.offset = e, i.limit = t, i
    }, o.toBuffer = function(e) {
        var t = this.offset,
            i = this.limit;
        if (!this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
            if (t >>>= 0, "number" != typeof i || i % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
            if (i >>>= 0, 0 > t || t > i || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength)
        }
        if (!e && 0 === t && i === this.buffer.byteLength) return this.buffer;
        if (t === i) return f;
        var r = new ArrayBuffer(i - t);
        return new Uint8Array(r).set(new Uint8Array(this.buffer).subarray(t, i), 0), r
    }, o.toArrayBuffer = o.toBuffer, o.toString = function(e, t, i) {
        if ("undefined" == typeof e) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        switch ("number" == typeof e && (e = "utf8", t = e, i = t), e) {
        case "utf8":
            return this.toUTF8(t, i);
        case "base64":
            return this.toBase64(t, i);
        case "hex":
            return this.toHex(t, i);
        case "binary":
            return this.toBinary(t, i);
        case "debug":
            return this.toDebug();
        case "columns":
            return this.toColumns();
        default:
            throw Error("Unsupported encoding: " + e)
        }
    };
    var h = function() {
            "use strict";
            for (var e = {}, t = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], i = [], r = 0, n = t.length; n > r; ++r) i[t[r]] = r;
            return e.encode = function(e, i) {
                for (var r, n; null !== (r = e());) i(t[r >> 2 & 63]), n = (3 & r) << 4, null !== (r = e()) ? (n |= r >> 4 & 15, i(t[63 & (n | r >> 4 & 15)]), n = (15 & r) << 2, null !== (r = e()) ? (i(t[63 & (n | r >> 6 & 3)]), i(t[63 & r])) : (i(t[63 & n]), i(61))) : (i(t[63 & n]), i(61), i(61))
            }, e.decode = function(e, t) {
                function r(e) {
                    throw Error("Illegal character code: " + e)
                }
                for (var n, s, o; null !== (n = e());) if (s = i[n], "undefined" == typeof s && r(n), null !== (n = e()) && (o = i[n], "undefined" == typeof o && r(n), t(s << 2 >>> 0 | (48 & o) >> 4), null !== (n = e()))) {
                    if (s = i[n], "undefined" == typeof s) {
                        if (61 === n) break;
                        r(n)
                    }
                    if (t((15 & o) << 4 >>> 0 | (60 & s) >> 2), null !== (n = e())) {
                        if (o = i[n], "undefined" == typeof o) {
                            if (61 === n) break;
                            r(n)
                        }
                        t((3 & s) << 6 >>> 0 | o)
                    }
                }
            }, e.test = function(e) {
                return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e)
            }, e
        }();
    o.toBase64 = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), e = 0 | e, t = 0 | t, 0 > e || t > this.capacity || e > t) throw RangeError("begin, end");
        var r;
        return h.encode(function() {
            return t > e ? this.view[e++] : null
        }.bind(this), r = i()), r()
    }, s.fromBase64 = function(e, i) {
        if ("string" != typeof e) throw TypeError("str");
        var r = new s(e.length / 4 * 3, i),
            n = 0;
        return h.decode(t(e), function(e) {
            r.view[n++] = e
        }), r.limit = n, r
    }, s.btoa = function(e) {
        return s.fromBinary(e).toBase64()
    }, s.atob = function(e) {
        return s.fromBase64(e).toBinary()
    }, o.toBinary = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), e |= 0, t |= 0, 0 > e || t > this.capacity() || e > t) throw RangeError("begin, end");
        if (e === t) return "";
        for (var i = [], r = []; t > e;) i.push(this.view[e++]), i.length >= 1024 && (r.push(String.fromCharCode.apply(String, i)), i = []);
        return r.join("") + String.fromCharCode.apply(String, i)
    }, s.fromBinary = function(e, t) {
        if ("string" != typeof e) throw TypeError("str");
        for (var i, r = 0, n = e.length, o = new s(n, t); n > r;) {
            if (i = e.charCodeAt(r), i > 255) throw RangeError("illegal char code: " + i);
            o.view[r++] = i
        }
        return o.limit = n, o
    }, o.toDebug = function(e) {
        for (var t, i = -1, r = this.buffer.byteLength, n = "", s = "", o = ""; r > i;) {
            if (-1 !== i && (t = this.view[i], n += 16 > t ? "0" + t.toString(16).toUpperCase() : t.toString(16).toUpperCase(), e && (s += t > 32 && 127 > t ? String.fromCharCode(t) : ".")), ++i, e && i > 0 && i % 16 === 0 && i !== r) {
                for (; n.length < 51;) n += " ";
                o += n + s + "\n", n = s = ""
            }
            n += i === this.offset && i === this.limit ? i === this.markedOffset ? "!" : "|" : i === this.offset ? i === this.markedOffset ? "[" : "<" : i === this.limit ? i === this.markedOffset ? "]" : ">" : i === this.markedOffset ? "'" : e || 0 !== i && i !== r ? " " : ""
        }
        if (e && " " !== n) {
            for (; n.length < 51;) n += " ";
            o += n + s + "\n"
        }
        return e ? o : n
    }, s.fromDebug = function(e, t, i) {
        for (var r, n, o = e.length, f = new s((o + 1) / 3 | 0, t, i), a = 0, h = 0, l = !1, u = !1, c = !1, p = !1, d = !1; o > a;) {
            switch (r = e.charAt(a++)) {
            case "!":
                if (!i) {
                    if (u || c || p) {
                        d = !0;
                        break
                    }
                    u = c = p = !0
                }
                f.offset = f.markedOffset = f.limit = h, l = !1;
                break;
            case "|":
                if (!i) {
                    if (u || p) {
                        d = !0;
                        break
                    }
                    u = p = !0
                }
                f.offset = f.limit = h, l = !1;
                break;
            case "[":
                if (!i) {
                    if (u || c) {
                        d = !0;
                        break
                    }
                    u = c = !0
                }
                f.offset = f.markedOffset = h, l = !1;
                break;
            case "<":
                if (!i) {
                    if (u) {
                        d = !0;
                        break
                    }
                    u = !0
                }
                f.offset = h, l = !1;
                break;
            case "]":
                if (!i) {
                    if (p || c) {
                        d = !0;
                        break
                    }
                    p = c = !0
                }
                f.limit = f.markedOffset = h, l = !1;
                break;
            case ">":
                if (!i) {
                    if (p) {
                        d = !0;
                        break
                    }
                    p = !0
                }
                f.limit = h, l = !1;
                break;
            case "'":
                if (!i) {
                    if (c) {
                        d = !0;
                        break
                    }
                    c = !0
                }
                f.markedOffset = h, l = !1;
                break;
            case " ":
                l = !1;
                break;
            default:
                if (!i && l) {
                    d = !0;
                    break
                }
                if (n = parseInt(r + e.charAt(a++), 16), !i && (isNaN(n) || 0 > n || n > 255)) throw TypeError("Illegal str: Not a debug encoded string");
                f.view[h++] = n, l = !0
            }
            if (d) throw TypeError("Illegal str: Invalid symbol at " + a)
        }
        if (!i) {
            if (!u || !p) throw TypeError("Illegal str: Missing offset or limit");
            if (h < f.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + h + " < " + o)
        }
        return f
    }, o.toHex = function(e, t) {
        if (e = "undefined" == typeof e ? this.offset : e, t = "undefined" == typeof t ? this.limit : t, !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        for (var i, r = new Array(t - e); t > e;) i = this.view[e++], 16 > i ? r.push("0", i.toString(16)) : r.push(i.toString(16));
        return r.join("")
    }, s.fromHex = function(e, t, i) {
        if (!i) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if (e.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2")
        }
        for (var r, n = e.length, o = new s(n / 2 | 0, t), f = 0, a = 0; n > f; f += 2) {
            if (r = parseInt(e.substring(f, f + 2), 16), !i && (!isFinite(r) || 0 > r || r > 255)) throw TypeError("Illegal str: Contains non-hex characters");
            o.view[a++] = r
        }
        return o.limit = a, o
    };
    var l = function() {
            "use strict";
            var e = {};
            return e.MAX_CODEPOINT = 1114111, e.encodeUTF8 = function(e, t) {
                var i = null;
                for ("number" == typeof e && (i = e, e = function() {
                    return null
                }); null !== i || null !== (i = e());) 128 > i ? t(127 & i) : 2048 > i ? (t(i >> 6 & 31 | 192), t(63 & i | 128)) : 65536 > i ? (t(i >> 12 & 15 | 224), t(i >> 6 & 63 | 128), t(63 & i | 128)) : (t(i >> 18 & 7 | 240), t(i >> 12 & 63 | 128), t(i >> 6 & 63 | 128), t(63 & i | 128)), i = null
            }, e.decodeUTF8 = function(e, t) {
                for (var i, r, n, s, o = function(e) {
                        e = e.slice(0, e.indexOf(null));
                        var t = Error(e.toString());
                        throw t.name = "TruncatedError", t.bytes = e, t
                    }; null !== (i = e());) if (0 === (128 & i)) t(i);
                else if (192 === (224 & i)) null === (r = e()) && o([i, r]), t((31 & i) << 6 | 63 & r);
                else if (224 === (240 & i))(null === (r = e()) || null === (n = e())) && o([i, r, n]), t((15 & i) << 12 | (63 & r) << 6 | 63 & n);
                else {
                    if (240 !== (248 & i)) throw RangeError("Illegal starting byte: " + i);
                    (null === (r = e()) || null === (n = e()) || null === (s = e())) && o([i, r, n, s]), t((7 & i) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & s)
                }
            }, e.UTF16toUTF8 = function(e, t) {
                for (var i, r = null;;) {
                    if (null === (i = null !== r ? r : e())) break;
                    i >= 55296 && 57343 >= i && null !== (r = e()) && r >= 56320 && 57343 >= r ? (t(1024 * (i - 55296) + r - 56320 + 65536), r = null) : t(i)
                }
                null !== r && t(r)
            }, e.UTF8toUTF16 = function(e, t) {
                var i = null;
                for ("number" == typeof e && (i = e, e = function() {
                    return null
                }); null !== i || null !== (i = e());) 65535 >= i ? t(i) : (i -= 65536, t((i >> 10) + 55296), t(i % 1024 + 56320)), i = null
            }, e.encodeUTF16toUTF8 = function(t, i) {
                e.UTF16toUTF8(t, function(t) {
                    e.encodeUTF8(t, i)
                })
            }, e.decodeUTF8toUTF16 = function(t, i) {
                e.decodeUTF8(t, function(t) {
                    e.UTF8toUTF16(t, i)
                })
            }, e.calculateCodePoint = function(e) {
                return 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
            }, e.calculateUTF8 = function(e) {
                for (var t, i = 0; null !== (t = e());) i += 128 > t ? 1 : 2048 > t ? 2 : 65536 > t ? 3 : 4;
                return i
            }, e.calculateUTF16asUTF8 = function(t) {
                var i = 0,
                    r = 0;
                return e.UTF16toUTF8(t, function(e) {
                    ++i, r += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
                }), [i, r]
            }, e
        }();
    return o.toUTF8 = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || t % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        var r;
        try {
            l.decodeUTF8toUTF16(function() {
                return t > e ? this.view[e++] : null
            }.bind(this), r = i())
        } catch (n) {
            if (e !== t) throw RangeError("Illegal range: Truncated data, " + e + " != " + t)
        }
        return r()
    }, s.fromUTF8 = function(e, i, r) {
        if (!r && "string" != typeof e) throw TypeError("Illegal str: Not a string");
        var n = new s(l.calculateUTF16asUTF8(t(e), !0)[1], i, r),
            o = 0;
        return l.encodeUTF16toUTF8(t(e), function(e) {
            n.view[o++] = e
        }), n.limit = o, n
    }, s
}), function(e, t) {
    if ("function" == typeof define && define.amd) define(["long"], t);
    else if ("function" == typeof require && "object" == typeof module && module && module.exports) {
        var i, r = module;
        try {
            i = require("long")
        } catch (n) {}
        i = t(i), r.exports = i
    } else(e.dcodeIO = e.dcodeIO || {}).ByteBuffer = t(e.dcodeIO.Long)
}(this, function(e) {
    function t(e) {
        var t = 0;
        return function() {
            return t < e.length ? e.charCodeAt(t++) : null
        }
    }
    function i() {
        var e = [],
            t = [];
        return function() {
            return 0 === arguments.length ? t.join("") + a.apply(String, e) : (1024 < e.length + arguments.length && (t.push(a.apply(String, e)), e.length = 0), void Array.prototype.push.apply(e, arguments))
        }
    }
    function r(e, t, i, r, n) {
        var s;
        s = 8 * n - r - 1;
        var o = (1 << s) - 1,
            f = o >> 1,
            a = -7;
        n = i ? n - 1 : 0;
        var h = i ? -1 : 1,
            l = e[t + n];
        for (n += h, i = l & (1 << -a) - 1, l >>= -a, a += s; a > 0; i = 256 * i + e[t + n], n += h, a -= 8);
        for (s = i & (1 << -a) - 1, i >>= -a, a += r; a > 0; s = 256 * s + e[t + n], n += h, a -= 8);
        if (0 === i) i = 1 - f;
        else {
            if (i === o) return s ? 0 / 0 : 1 / 0 * (l ? -1 : 1);
            s += Math.pow(2, r), i -= f
        }
        return (l ? -1 : 1) * s * Math.pow(2, i - r)
    }
    function n(e, t, i, r, n, s) {
        var o, f = 8 * s - n - 1,
            a = (1 << f) - 1,
            h = a >> 1,
            l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        s = r ? 0 : s - 1;
        var u = r ? 1 : -1,
            c = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (t = isNaN(t) ? 1 : 0, r = a) : (r = Math.floor(Math.log(t) / Math.LN2), 1 > t * (o = Math.pow(2, -r)) && (r--, o *= 2), t = r + h >= 1 ? t + l / o : t + l * Math.pow(2, 1 - h), t * o >= 2 && (r++, o /= 2), r + h >= a ? (t = 0, r = a) : r + h >= 1 ? (t = (t * o - 1) * Math.pow(2, n), r += h) : (t = t * Math.pow(2, h - 1) * Math.pow(2, n), r = 0)); n >= 8; e[i + s] = 255 & t, s += u, t /= 256, n -= 8);
        for (r = r << n | t, f += n; f > 0; e[i + s] = 255 & r, s += u, r /= 256, f -= 8);
        e[i + s - u] |= 128 * c
    }
    var s = function(e, t, i) {
            if ("undefined" == typeof e && (e = s.DEFAULT_CAPACITY), "undefined" == typeof t && (t = s.DEFAULT_ENDIAN), "undefined" == typeof i && (i = s.DEFAULT_NOASSERT), !i) {
                if (e |= 0, 0 > e) throw RangeError("Illegal capacity");
                t = !! t, i = !! i
            }
            this.buffer = 0 === e ? f : new ArrayBuffer(e), this.view = 0 === e ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = e, this.littleEndian = t, this.noAssert = i
        };
    s.VERSION = "5.0.1", s.LITTLE_ENDIAN = !0, s.BIG_ENDIAN = !1, s.DEFAULT_CAPACITY = 16, s.DEFAULT_ENDIAN = s.BIG_ENDIAN, s.DEFAULT_NOASSERT = !1, s.Long = e || null;
    var o = s.prototype;
    Object.defineProperty(o, "__isByteBuffer__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    });
    var f = new ArrayBuffer(0),
        a = String.fromCharCode;
    s.accessor = function() {
        return Uint8Array
    }, s.allocate = function(e, t, i) {
        return new s(e, t, i)
    }, s.concat = function(e, t, i, r) {
        ("boolean" == typeof t || "string" != typeof t) && (r = i, i = t, t = void 0);
        for (var n, o = 0, f = 0, a = e.length; a > f; ++f) s.isByteBuffer(e[f]) || (e[f] = s.wrap(e[f], t)), n = e[f].limit - e[f].offset, n > 0 && (o += n);
        if (0 === o) return new s(0, i, r);
        for (t = new s(o, i, r), f = 0; a > f;) i = e[f++], n = i.limit - i.offset, 0 >= n || (t.view.set(i.view.subarray(i.offset, i.limit), t.offset), t.offset += n);
        return t.limit = t.offset, t.offset = 0, t
    }, s.isByteBuffer = function(e) {
        return !0 === (e && e.__isByteBuffer__)
    }, s.type = function() {
        return ArrayBuffer
    }, s.wrap = function(e, t, i, r) {
        if ("string" != typeof t && (r = i, i = t, t = void 0), "string" == typeof e) switch ("undefined" == typeof t && (t = "utf8"), t) {
        case "base64":
            return s.fromBase64(e, i);
        case "hex":
            return s.fromHex(e, i);
        case "binary":
            return s.fromBinary(e, i);
        case "utf8":
            return s.fromUTF8(e, i);
        case "debug":
            return s.fromDebug(e, i);
        default:
            throw Error("Unsupported encoding: " + t)
        }
        if (null === e || "object" != typeof e) throw TypeError("Illegal buffer");
        if (s.isByteBuffer(e)) return t = o.clone.call(e), t.markedOffset = -1, t;
        if (e instanceof Uint8Array) t = new s(0, i, r), 0 < e.length && (t.buffer = e.buffer, t.offset = e.byteOffset, t.limit = e.byteOffset + e.byteLength, t.view = new Uint8Array(e.buffer));
        else if (e instanceof ArrayBuffer) t = new s(0, i, r), 0 < e.byteLength && (t.buffer = e, t.offset = 0, t.limit = e.byteLength, t.view = 0 < e.byteLength ? new Uint8Array(e) : null);
        else {
            if ("[object Array]" !== Object.prototype.toString.call(e)) throw TypeError("Illegal buffer");
            for (t = new s(e.length, i, r), t.limit = e.length, i = 0; i < e.length; ++i) t.view[i] = e[i]
        }
        return t
    }, o.writeBitSet = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if (!(e instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        var r, n = t,
            s = e.length,
            o = s >> 3,
            f = 0;
        for (t += this.writeVarint32(s, t); o--;) r = 1 & !! e[f++] | (1 & !! e[f++]) << 1 | (1 & !! e[f++]) << 2 | (1 & !! e[f++]) << 3 | (1 & !! e[f++]) << 4 | (1 & !! e[f++]) << 5 | (1 & !! e[f++]) << 6 | (1 & !! e[f++]) << 7, this.writeByte(r, t++);
        if (s > f) {
            for (r = o = 0; s > f;) r |= (1 & !! e[f++]) << o++;
            this.writeByte(r, t++)
        }
        return i ? (this.offset = t, this) : t - n
    }, o.readBitSet = function(e) {
        var t = "undefined" == typeof e;
        t && (e = this.offset);
        var i = this.readVarint32(e),
            r = i.value,
            n = r >> 3,
            s = 0,
            o = [];
        for (e += i.length; n--;) i = this.readByte(e++), o[s++] = !! (1 & i), o[s++] = !! (2 & i), o[s++] = !! (4 & i), o[s++] = !! (8 & i), o[s++] = !! (16 & i), o[s++] = !! (32 & i), o[s++] = !! (64 & i), o[s++] = !! (128 & i);
        if (r > s) for (n = 0, i = this.readByte(e++); r > s;) o[s++] = !! (i >> n++ & 1);
        return t && (this.offset = e), o
    }, o.readBytes = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+" + e + ") <= " + this.buffer.byteLength)
        }
        var r = this.slice(t, t + e);
        return i && (this.offset += e), r
    }, o.writeBytes = o.append, o.writeInt8 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 1;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), this.view[t - 1] = e, i && (this.offset += 1), this
    }, o.writeByte = o.writeInt8, o.readInt8 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        return e = this.view[e], 128 === (128 & e) && (e = -(255 - e + 1)), t && (this.offset += 1), e
    }, o.readByte = o.readInt8, o.writeUint8 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 1;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), this.view[t - 1] = e, i && (this.offset += 1), this
    }, o.writeUInt8 = o.writeUint8, o.readUint8 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        return e = this.view[e], t && (this.offset += 1), e
    }, o.readUInt8 = o.readUint8, o.writeInt16 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 2;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this
    }, o.writeShort = o.writeInt16, o.readInt16 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e], i |= this.view[e + 1] << 8) : (i = this.view[e] << 8, i |= this.view[e + 1]), 32768 === (32768 & i) && (i = -(65535 - i + 1)), t && (this.offset += 2), i
    }, o.readShort = o.readInt16, o.writeUint16 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 2;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this
    }, o.writeUInt16 = o.writeUint16, o.readUint16 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e], i |= this.view[e + 1] << 8) : (i = this.view[e] << 8, i |= this.view[e + 1]), t && (this.offset += 2), i
    }, o.readUInt16 = o.readUint16, o.writeInt32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 4, this.littleEndian ? (this.view[t + 3] = e >>> 24 & 255, this.view[t + 2] = e >>> 16 & 255, this.view[t + 1] = e >>> 8 & 255, this.view[t] = 255 & e) : (this.view[t] = e >>> 24 & 255, this.view[t + 1] = e >>> 16 & 255, this.view[t + 2] = e >>> 8 & 255, this.view[t + 3] = 255 & e), i && (this.offset += 4), this
    }, o.writeInt = o.writeInt32, o.readInt32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], i += this.view[e + 3] << 24 >>> 0) : (i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], i += this.view[e] << 24 >>> 0), t && (this.offset += 4), 0 | i
    }, o.readInt = o.readInt32, o.writeUint32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), t -= 4, this.littleEndian ? (this.view[t + 3] = e >>> 24 & 255, this.view[t + 2] = e >>> 16 & 255, this.view[t + 1] = e >>> 8 & 255, this.view[t] = 255 & e) : (this.view[t] = e >>> 24 & 255, this.view[t + 1] = e >>> 16 & 255, this.view[t + 2] = e >>> 8 & 255, this.view[t + 3] = 255 & e), i && (this.offset += 4), this
    }, o.writeUInt32 = o.writeUint32, o.readUint32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = 0;
        return this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], i += this.view[e + 3] << 24 >>> 0) : (i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], i += this.view[e] << 24 >>> 0), t && (this.offset += 4), i
    }, o.readUInt32 = o.readUint32, e && (o.writeInt64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), i += 8;
        var n = this.buffer.byteLength;
        i > n && this.resize((n *= 2) > i ? n : i), i -= 8;
        var n = t.low,
            s = t.high;
        return this.littleEndian ? (this.view[i + 3] = n >>> 24 & 255, this.view[i + 2] = n >>> 16 & 255, this.view[i + 1] = n >>> 8 & 255, this.view[i] = 255 & n, i += 4, this.view[i + 3] = s >>> 24 & 255, this.view[i + 2] = s >>> 16 & 255, this.view[i + 1] = s >>> 8 & 255, this.view[i] = 255 & s) : (this.view[i] = s >>> 24 & 255, this.view[i + 1] = s >>> 16 & 255, this.view[i + 2] = s >>> 8 & 255, this.view[i + 3] = 255 & s, i += 4, this.view[i] = n >>> 24 & 255, this.view[i + 1] = n >>> 16 & 255, this.view[i + 2] = n >>> 8 & 255, this.view[i + 3] = 255 & n), r && (this.offset += 8), this
    }, o.writeLong = o.writeInt64, o.readInt64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
        }
        var r = 0,
            n = 0;
        return this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, r |= this.view[t], r += this.view[t + 3] << 24 >>> 0, t += 4, n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0) : (n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0, t += 4, r = this.view[t + 1] << 16, r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0), t = new e(r, n, !1), i && (this.offset += 8), t
    }, o.readLong = o.readInt64, o.writeUint64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), i += 8;
        var n = this.buffer.byteLength;
        i > n && this.resize((n *= 2) > i ? n : i), i -= 8;
        var n = t.low,
            s = t.high;
        return this.littleEndian ? (this.view[i + 3] = n >>> 24 & 255, this.view[i + 2] = n >>> 16 & 255, this.view[i + 1] = n >>> 8 & 255, this.view[i] = 255 & n, i += 4, this.view[i + 3] = s >>> 24 & 255, this.view[i + 2] = s >>> 16 & 255, this.view[i + 1] = s >>> 8 & 255, this.view[i] = 255 & s) : (this.view[i] = s >>> 24 & 255, this.view[i + 1] = s >>> 16 & 255, this.view[i + 2] = s >>> 8 & 255, this.view[i + 3] = 255 & s, i += 4, this.view[i] = n >>> 24 & 255, this.view[i + 1] = n >>> 16 & 255, this.view[i + 2] = n >>> 8 & 255, this.view[i + 3] = 255 & n), r && (this.offset += 8), this
    }, o.writeUInt64 = o.writeUint64, o.readUint64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength)
        }
        var r = 0,
            n = 0;
        return this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, r |= this.view[t], r += this.view[t + 3] << 24 >>> 0, t += 4, n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0) : (n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0, t += 4, r = this.view[t + 1] << 16, r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0), t = new e(r, n, !0), i && (this.offset += 8), t
    }, o.readUInt64 = o.readUint64), o.writeFloat32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 4;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), n(this.view, e, t - 4, this.littleEndian, 23, 4), i && (this.offset += 4), this
    }, o.writeFloat = o.writeFloat32, o.readFloat32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        return e = r(this.view, e, this.littleEndian, 23, 4), t && (this.offset += 4), e
    }, o.readFloat = o.readFloat32, o.writeFloat64 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        t += 8;
        var r = this.buffer.byteLength;
        return t > r && this.resize((r *= 2) > t ? r : t), n(this.view, e, t - 8, this.littleEndian, 52, 8), i && (this.offset += 8), this
    }, o.writeDouble = o.writeFloat64, o.readFloat64 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength)
        }
        return e = r(this.view, e, this.littleEndian, 52, 8), t && (this.offset += 8), e
    }, o.readDouble = o.readFloat64, s.MAX_VARINT32_BYTES = 5, s.calculateVarint32 = function(e) {
        return e >>>= 0, 128 > e ? 1 : 16384 > e ? 2 : 2097152 > e ? 3 : 268435456 > e ? 4 : 5
    }, s.zigZagEncode32 = function(e) {
        return ((e |= 0) << 1 ^ e >> 31) >>> 0
    }, s.zigZagDecode32 = function(e) {
        return e >>> 1 ^ -(1 & e) | 0
    }, o.writeVarint32 = function(e, t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength)
        }
        var r, n = s.calculateVarint32(e);
        for (t += n, r = this.buffer.byteLength, t > r && this.resize((r *= 2) > t ? r : t), t -= n, e >>>= 0; e >= 128;) r = 127 & e | 128, this.view[t++] = r, e >>>= 7;
        return this.view[t++] = e, i ? (this.offset = t, this) : n
    }, o.writeVarint32ZigZag = function(e, t) {
        return this.writeVarint32(s.zigZagEncode32(e), t)
    }, o.readVarint32 = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i, r = 0,
            n = 0;
        do {
            if (!this.noAssert && e > this.limit) throw e = Error("Truncated"), e.truncated = !0, e;
            i = this.view[e++], 5 > r && (n |= (127 & i) << 7 * r), ++r
        } while (0 !== (128 & i));
        return n |= 0, t ? (this.offset = e, n) : {
            value: n,
            length: r
        }
    }, o.readVarint32ZigZag = function(e) {
        return e = this.readVarint32(e), "object" == typeof e ? e.value = s.zigZagDecode32(e.value) : e = s.zigZagDecode32(e), e
    }, e && (s.MAX_VARINT64_BYTES = 10, s.calculateVarint64 = function(t) {
        "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t));
        var i = t.toInt() >>> 0,
            r = t.shiftRightUnsigned(28).toInt() >>> 0;
        return t = t.shiftRightUnsigned(56).toInt() >>> 0, 0 == t ? 0 == r ? 16384 > i ? 128 > i ? 1 : 2 : 2097152 > i ? 3 : 4 : 16384 > r ? 128 > r ? 5 : 6 : 2097152 > r ? 7 : 8 : 128 > t ? 9 : 10
    }, s.zigZagEncode64 = function(t) {
        return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned()), t.shiftLeft(1).xor(t.shiftRight(63)).toUnsigned()
    }, s.zigZagDecode64 = function(t) {
        return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned()), t.shiftRightUnsigned(1).xor(t.and(e.ONE).toSigned().negate()).toSigned()
    }, o.writeVarint64 = function(t, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" == typeof t) t = e.fromNumber(t);
            else if ("string" == typeof t) t = e.fromString(t);
            else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned());
        var n = s.calculateVarint64(t),
            o = t.toInt() >>> 0,
            f = t.shiftRightUnsigned(28).toInt() >>> 0,
            a = t.shiftRightUnsigned(56).toInt() >>> 0;
        i += n;
        var h = this.buffer.byteLength;
        switch (i > h && this.resize((h *= 2) > i ? h : i), i -= n, n) {
        case 10:
            this.view[i + 9] = a >>> 7 & 1;
        case 9:
            this.view[i + 8] = 9 !== n ? 128 | a : 127 & a;
        case 8:
            this.view[i + 7] = 8 !== n ? f >>> 21 | 128 : f >>> 21 & 127;
        case 7:
            this.view[i + 6] = 7 !== n ? f >>> 14 | 128 : f >>> 14 & 127;
        case 6:
            this.view[i + 5] = 6 !== n ? f >>> 7 | 128 : f >>> 7 & 127;
        case 5:
            this.view[i + 4] = 5 !== n ? 128 | f : 127 & f;
        case 4:
            this.view[i + 3] = 4 !== n ? o >>> 21 | 128 : o >>> 21 & 127;
        case 3:
            this.view[i + 2] = 3 !== n ? o >>> 14 | 128 : o >>> 14 & 127;
        case 2:
            this.view[i + 1] = 2 !== n ? o >>> 7 | 128 : o >>> 7 & 127;
        case 1:
            this.view[i] = 1 !== n ? 128 | o : 127 & o
        }
        return r ? (this.offset += n, this) : n
    }, o.writeVarint64ZigZag = function(e, t) {
        return this.writeVarint64(s.zigZagEncode64(e), t)
    }, o.readVarint64 = function(t) {
        var i = "undefined" == typeof t;
        if (i && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength)
        }
        var r = t,
            n = 0,
            s = 0,
            o = 0,
            f = 0,
            f = this.view[t++],
            n = 127 & f;
        if (128 & f && (f = this.view[t++], n |= (127 & f) << 7, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], n |= (127 & f) << 14, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], n |= (127 & f) << 21, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s = 127 & f, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 7, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 14, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], s |= (127 & f) << 21, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], o = 127 & f, 128 & f || this.noAssert && "undefined" == typeof f) && (f = this.view[t++], o |= (127 & f) << 7, 128 & f || this.noAssert && "undefined" == typeof f)) throw Error("Buffer overrun");
        return n = e.fromBits(n | s << 28, s >>> 4 | o << 24, !1), i ? (this.offset = t, n) : {
            value: n,
            length: t - r
        }
    }, o.readVarint64ZigZag = function(t) {
        return (t = this.readVarint64(t)) && t.value instanceof e ? t.value = s.zigZagDecode64(t.value) : t = s.zigZagDecode64(t), t
    }), o.writeCString = function(e, i) {
        var r = "undefined" == typeof i;
        r && (i = this.offset);
        var n, s = e.length;
        if (!this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            for (n = 0; s > n; ++n) if (0 === e.charCodeAt(n)) throw RangeError("Illegal str: Contains NULL-characters");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        return s = l.calculateUTF16asUTF8(t(e))[1], i += s + 1, n = this.buffer.byteLength, i > n && this.resize((n *= 2) > i ? n : i), i -= s + 1, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), this.view[i++] = 0, r ? (this.offset = i, this) : s
    }, o.readCString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var r, n = e,
            s = -1;
        return l.decodeUTF8toUTF16(function() {
            if (0 === s) return null;
            if (e >= this.limit) throw RangeError("Illegal range: Truncated data, " + e + " < " + this.limit);
            return s = this.view[e++], 0 === s ? null : s
        }.bind(this), r = i(), !0), t ? (this.offset = e, r()) : {
            string: r(),
            length: e - n
        }
    }, o.writeIString = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, s = i;
        n = l.calculateUTF16asUTF8(t(e), this.noAssert)[1], i += 4 + n;
        var o = this.buffer.byteLength;
        if (i > o && this.resize((o *= 2) > i ? o : i), i -= 4 + n, this.littleEndian ? (this.view[i + 3] = n >>> 24 & 255, this.view[i + 2] = n >>> 16 & 255, this.view[i + 1] = n >>> 8 & 255, this.view[i] = 255 & n) : (this.view[i] = n >>> 24 & 255, this.view[i + 1] = n >>> 16 & 255, this.view[i + 2] = n >>> 8 & 255, this.view[i + 3] = 255 & n), i += 4, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), i !== s + 4 + n) throw RangeError("Illegal range: Truncated data, " + i + " == " + (i + 4 + n));
        return r ? (this.offset = i, this) : i - s
    }, o.readIString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength)
        }
        var i = e,
            r = this.readUint32(e),
            r = this.readUTF8String(r, s.METRICS_BYTES, e += 4);
        return e += r.length, t ? (this.offset = e, r.string) : {
            string: r.string,
            length: e - i
        }
    }, s.METRICS_CHARS = "c", s.METRICS_BYTES = "b", o.writeUTF8String = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, s = i;
        n = l.calculateUTF16asUTF8(t(e))[1], i += n;
        var o = this.buffer.byteLength;
        return i > o && this.resize((o *= 2) > i ? o : i), i -= n, l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), r ? (this.offset = i, this) : i - s
    }, o.writeString = o.writeUTF8String, s.calculateUTF8Chars = function(e) {
        return l.calculateUTF16asUTF8(t(e))[0]
    }, s.calculateUTF8Bytes = function(e) {
        return l.calculateUTF16asUTF8(t(e))[1]
    }, s.calculateString = s.calculateUTF8Bytes, o.readUTF8String = function(e, t, r) {
        "number" == typeof t && (r = t, t = void 0);
        var n = "undefined" == typeof r;
        if (n && (r = this.offset), "undefined" == typeof t && (t = s.METRICS_CHARS), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal length: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof r || 0 !== r % 1) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength)
        }
        var o, f = 0,
            a = r;
        if (t === s.METRICS_CHARS) {
            if (o = i(), l.decodeUTF8(function() {
                return e > f && r < this.limit ? this.view[r++] : null
            }.bind(this), function(e) {
                ++f, l.UTF8toUTF16(e, o)
            }), f !== e) throw RangeError("Illegal range: Truncated data, " + f + " == " + e);
            return n ? (this.offset = r, o()) : {
                string: o(),
                length: r - a
            }
        }
        if (t === s.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" != typeof r || 0 !== r % 1) throw TypeError("Illegal offset: " + r + " (not an integer)");
                if (r >>>= 0, 0 > r || r + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+" + e + ") <= " + this.buffer.byteLength)
            }
            var h = r + e;
            if (l.decodeUTF8toUTF16(function() {
                return h > r ? this.view[r++] : null
            }.bind(this), o = i(), this.noAssert), r !== h) throw RangeError("Illegal range: Truncated data, " + r + " == " + h);
            return n ? (this.offset = r, o()) : {
                string: o(),
                length: r - a
            }
        }
        throw TypeError("Unsupported metrics: " + t)
    }, o.readString = o.readUTF8String, o.writeVString = function(e, i) {
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        var n, o, f = i;
        n = l.calculateUTF16asUTF8(t(e), this.noAssert)[1], o = s.calculateVarint32(n), i += o + n;
        var a = this.buffer.byteLength;
        if (i > a && this.resize((a *= 2) > i ? a : i), i -= o + n, i += this.writeVarint32(n, i), l.encodeUTF16toUTF8(t(e), function(e) {
            this.view[i++] = e
        }.bind(this)), i !== f + n + o) throw RangeError("Illegal range: Truncated data, " + i + " == " + (i + n + o));
        return r ? (this.offset = i, this) : i - f
    }, o.readVString = function(e) {
        var t = "undefined" == typeof e;
        if (t && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength)
        }
        var i = e,
            r = this.readVarint32(e),
            r = this.readUTF8String(r.value, s.METRICS_BYTES, e += r.length);
        return e += r.length, t ? (this.offset = e, r.string) : {
            string: r.string,
            length: e - i
        }
    }, o.append = function(e, t, i) {
        ("number" == typeof t || "string" != typeof t) && (i = t, t = void 0);
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        if (e instanceof s || (e = s.wrap(e, t)), t = e.limit - e.offset, 0 >= t) return this;
        i += t;
        var n = this.buffer.byteLength;
        return i > n && this.resize((n *= 2) > i ? n : i), i -= t, this.view.set(e.view.subarray(e.offset, e.limit), i), e.offset += t, r && (this.offset += t), this
    }, o.appendTo = function(e, t) {
        return e.append(this, t), this
    }, o.assert = function(e) {
        return this.noAssert = !e, this
    }, o.capacity = function() {
        return this.buffer.byteLength
    }, o.clear = function() {
        return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this
    }, o.clone = function(e) {
        var t = new s(0, this.littleEndian, this.noAssert);
        return e ? (t.buffer = new ArrayBuffer(this.buffer.byteLength), t.view = new Uint8Array(t.buffer)) : (t.buffer = this.buffer, t.view = this.view), t.offset = this.offset, t.markedOffset = this.markedOffset, t.limit = this.limit, t
    }, o.compact = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        if (0 === e && t === this.buffer.byteLength) return this;
        var i = t - e;
        if (0 === i) return this.buffer = f, this.view = null, 0 <= this.markedOffset && (this.markedOffset -= e), this.limit = this.offset = 0, this;
        var r = new ArrayBuffer(i),
            n = new Uint8Array(r);
        return n.set(this.view.subarray(e, t)), this.buffer = r, this.view = n, 0 <= this.markedOffset && (this.markedOffset -= e), this.offset = 0, this.limit = i, this
    }, o.copy = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        if (e === t) return new s(0, this.littleEndian, this.noAssert);
        var i = t - e,
            r = new s(i, this.littleEndian, this.noAssert);
        return r.offset = 0, r.limit = i, 0 <= r.markedOffset && (r.markedOffset -= e), this.copyTo(r, 0, e, t), r
    }, o.copyTo = function(e, t, i, r) {
        var n, o;
        if (!this.noAssert && !s.isByteBuffer(e)) throw TypeError("Illegal target: Not a ByteBuffer");
        if (t = (o = "undefined" == typeof t) ? e.offset : 0 | t, i = (n = "undefined" == typeof i) ? this.offset : 0 | i, r = "undefined" == typeof r ? this.limit : 0 | r, 0 > t || t > e.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + t + " <= " + e.buffer.byteLength);
        if (0 > i || r > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + i + " <= " + this.buffer.byteLength);
        var f = r - i;
        return 0 === f ? e : (e.ensureCapacity(t + f), e.view.set(this.view.subarray(i, r), t), n && (this.offset += f), o && (e.offset += f), this)
    }, o.ensureCapacity = function(e) {
        var t = this.buffer.byteLength;
        return e > t ? this.resize((t *= 2) > e ? t : e) : this
    }, o.fill = function(e, t, i) {
        var r = "undefined" == typeof t;
        if (r && (t = this.offset), "string" == typeof e && 0 < e.length && (e = e.charCodeAt(0)), "undefined" == typeof t && (t = this.offset), "undefined" == typeof i && (i = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal value: " + e + " (not an integer)");
            if (e |= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof i || 0 !== i % 1) throw TypeError("Illegal end: Not an integer");
            if (i >>>= 0, 0 > t || t > i || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength)
        }
        if (t >= i) return this;
        for (; i > t;) this.view[t++] = e;
        return r && (this.offset = t), this
    }, o.flip = function() {
        return this.limit = this.offset, this.offset = 0, this
    }, o.mark = function(e) {
        if (e = "undefined" == typeof e ? this.offset : e, !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength)
        }
        return this.markedOffset = e, this
    }, o.order = function(e) {
        if (!this.noAssert && "boolean" != typeof e) throw TypeError("Illegal littleEndian: Not a boolean");
        return this.littleEndian = !! e, this
    }, o.LE = function(e) {
        return this.littleEndian = "undefined" != typeof e ? !! e : !0, this
    }, o.BE = function(e) {
        return this.littleEndian = "undefined" != typeof e ? !e : !1, this
    }, o.prepend = function(e, t, i) {
        ("number" == typeof t || "string" != typeof t) && (i = t, t = void 0);
        var r = "undefined" == typeof i;
        if (r && (i = this.offset), !this.noAssert) {
            if ("number" != typeof i || 0 !== i % 1) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength)
        }
        if (e instanceof s || (e = s.wrap(e, t)), t = e.limit - e.offset, 0 >= t) return this;
        var n = t - i;
        if (n > 0) {
            var o = new ArrayBuffer(this.buffer.byteLength + n),
                f = new Uint8Array(o);
            f.set(this.view.subarray(i, this.buffer.byteLength), t), this.buffer = o, this.view = f, this.offset += n, 0 <= this.markedOffset && (this.markedOffset += n), this.limit += n, i += n
        } else new Uint8Array(this.buffer);
        return this.view.set(e.view.subarray(e.offset, e.limit), i - t), e.offset = e.limit, r && (this.offset -= t), this
    }, o.prependTo = function(e, t) {
        return e.prepend(this, t), this
    }, o.printDebug = function(e) {
        "function" != typeof e && (e = console.log.bind(console)), e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
    }, o.remaining = function() {
        return this.limit - this.offset
    }, o.reset = function() {
        return 0 <= this.markedOffset ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this
    }, o.resize = function(e) {
        if (!this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal capacity: " + e + " (not an integer)");
            if (e |= 0, 0 > e) throw RangeError("Illegal capacity: 0 <= " + e)
        }
        if (this.buffer.byteLength < e) {
            e = new ArrayBuffer(e);
            var t = new Uint8Array(e);
            t.set(this.view), this.buffer = e, this.view = t
        }
        return this
    }, o.reverse = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        return e === t ? this : (Array.prototype.reverse.call(this.view.subarray(e, t)), this)
    }, o.skip = function(e) {
        if (!this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal length: " + e + " (not an integer)");
            e |= 0
        }
        var t = this.offset + e;
        if (!this.noAssert && (0 > t || t > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);
        return this.offset = t, this
    }, o.slice = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        var i = this.clone();
        return i.offset = e, i.limit = t, i
    }, o.toBuffer = function(e) {
        var t = this.offset,
            i = this.limit;
        if (!this.noAssert) {
            if ("number" != typeof t || 0 !== t % 1) throw TypeError("Illegal offset: Not an integer");
            if (t >>>= 0, "number" != typeof i || 0 !== i % 1) throw TypeError("Illegal limit: Not an integer");
            if (i >>>= 0, 0 > t || t > i || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength)
        }
        return e || 0 !== t || i !== this.buffer.byteLength ? t === i ? f : (e = new ArrayBuffer(i - t), new Uint8Array(e).set(new Uint8Array(this.buffer).subarray(t, i), 0), e) : this.buffer
    }, o.toArrayBuffer = o.toBuffer, o.toString = function(e, t, i) {
        if ("undefined" == typeof e) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        switch ("number" == typeof e && (i = t = e = "utf8"), e) {
        case "utf8":
            return this.toUTF8(t, i);
        case "base64":
            return this.toBase64(t, i);
        case "hex":
            return this.toHex(t, i);
        case "binary":
            return this.toBinary(t, i);
        case "debug":
            return this.toDebug();
        case "columns":
            return this.toColumns();
        default:
            throw Error("Unsupported encoding: " + e)
        }
    };
    var h = function() {
            for (var e = {}, t = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], i = [], r = 0, n = t.length; n > r; ++r) i[t[r]] = r;
            return e.encode = function(e, i) {
                for (var r, n; null !== (r = e());) i(t[r >> 2 & 63]), n = (3 & r) << 4, null !== (r = e()) ? (n |= r >> 4 & 15, i(t[63 & (n | r >> 4 & 15)]), n = (15 & r) << 2, null !== (r = e()) ? (i(t[63 & (n | r >> 6 & 3)]), i(t[63 & r])) : (i(t[63 & n]), i(61))) : (i(t[63 & n]), i(61), i(61))
            }, e.decode = function(e, t) {
                function r(e) {
                    throw Error("Illegal character code: " + e)
                }
                for (var n, s, o; null !== (n = e());) if (s = i[n], "undefined" == typeof s && r(n), null !== (n = e()) && (o = i[n], "undefined" == typeof o && r(n), t(s << 2 >>> 0 | (48 & o) >> 4), null !== (n = e()))) {
                    if (s = i[n], "undefined" == typeof s) {
                        if (61 === n) break;
                        r(n)
                    }
                    if (t((15 & o) << 4 >>> 0 | (60 & s) >> 2), null !== (n = e())) {
                        if (o = i[n], "undefined" == typeof o) {
                            if (61 === n) break;
                            r(n)
                        }
                        t((3 & s) << 6 >>> 0 | o)
                    }
                }
            }, e.test = function(e) {
                return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e)
            }, e
        }();
    o.toBase64 = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), e |= 0, t |= 0, 0 > e || t > this.capacity || e > t) throw RangeError("begin, end");
        var r;
        return h.encode(function() {
            return t > e ? this.view[e++] : null
        }.bind(this), r = i()), r()
    }, s.fromBase64 = function(e, i) {
        if ("string" != typeof e) throw TypeError("str");
        var r = new s(e.length / 4 * 3, i),
            n = 0;
        return h.decode(t(e), function(e) {
            r.view[n++] = e
        }), r.limit = n, r
    }, s.btoa = function(e) {
        return s.fromBinary(e).toBase64()
    }, s.atob = function(e) {
        return s.fromBase64(e).toBinary()
    }, o.toBinary = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), e |= 0, t |= 0, 0 > e || t > this.capacity() || e > t) throw RangeError("begin, end");
        if (e === t) return "";
        for (var i = [], r = []; t > e;) i.push(this.view[e++]), 1024 <= i.length && (r.push(String.fromCharCode.apply(String, i)), i = []);
        return r.join("") + String.fromCharCode.apply(String, i)
    }, s.fromBinary = function(e, t) {
        if ("string" != typeof e) throw TypeError("str");
        for (var i, r = 0, n = e.length, o = new s(n, t); n > r;) {
            if (i = e.charCodeAt(r), i > 255) throw RangeError("illegal char code: " + i);
            o.view[r++] = i
        }
        return o.limit = n, o
    }, o.toDebug = function(e) {
        for (var t, i = -1, r = this.buffer.byteLength, n = "", s = "", o = ""; r > i;) {
            if (-1 !== i && (t = this.view[i], n = 16 > t ? n + ("0" + t.toString(16).toUpperCase()) : n + t.toString(16).toUpperCase(), e && (s += t > 32 && 127 > t ? String.fromCharCode(t) : ".")), ++i, e && i > 0 && 0 === i % 16 && i !== r) {
                for (; 51 > n.length;) n += " ";
                o += n + s + "\n", n = s = ""
            }
            n = i === this.offset && i === this.limit ? n + (i === this.markedOffset ? "!" : "|") : i === this.offset ? n + (i === this.markedOffset ? "[" : "<") : i === this.limit ? n + (i === this.markedOffset ? "]" : ">") : n + (i === this.markedOffset ? "'" : e || 0 !== i && i !== r ? " " : "")
        }
        if (e && " " !== n) {
            for (; 51 > n.length;) n += " ";
            o += n + s + "\n"
        }
        return e ? o : n
    }, s.fromDebug = function(e, t, i) {
        var r = e.length;
        t = new s((r + 1) / 3 | 0, t, i);
        for (var n, o = 0, f = 0, a = !1, h = !1, l = !1, u = !1, c = !1; r > o;) {
            switch (n = e.charAt(o++)) {
            case "!":
                if (!i) {
                    if (h || l || u) {
                        c = !0;
                        break
                    }
                    h = l = u = !0
                }
                t.offset = t.markedOffset = t.limit = f, a = !1;
                break;
            case "|":
                if (!i) {
                    if (h || u) {
                        c = !0;
                        break
                    }
                    h = u = !0
                }
                t.offset = t.limit = f, a = !1;
                break;
            case "[":
                if (!i) {
                    if (h || l) {
                        c = !0;
                        break
                    }
                    h = l = !0
                }
                t.offset = t.markedOffset = f, a = !1;
                break;
            case "<":
                if (!i) {
                    if (h) {
                        c = !0;
                        break
                    }
                    h = !0
                }
                t.offset = f, a = !1;
                break;
            case "]":
                if (!i) {
                    if (u || l) {
                        c = !0;
                        break
                    }
                    u = l = !0
                }
                t.limit = t.markedOffset = f, a = !1;
                break;
            case ">":
                if (!i) {
                    if (u) {
                        c = !0;
                        break
                    }
                    u = !0
                }
                t.limit = f, a = !1;
                break;
            case "'":
                if (!i) {
                    if (l) {
                        c = !0;
                        break
                    }
                    l = !0
                }
                t.markedOffset = f, a = !1;
                break;
            case " ":
                a = !1;
                break;
            default:
                if (!i && a) {
                    c = !0;
                    break
                }
                if (n = parseInt(n + e.charAt(o++), 16), !i && (isNaN(n) || 0 > n || n > 255)) throw TypeError("Illegal str: Not a debug encoded string");
                t.view[f++] = n, a = !0
            }
            if (c) throw TypeError("Illegal str: Invalid symbol at " + o)
        }
        if (!i) {
            if (!h || !u) throw TypeError("Illegal str: Missing offset or limit");
            if (f < t.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + f + " < " + r)
        }
        return t
    }, o.toHex = function(e, t) {
        if (e = "undefined" == typeof e ? this.offset : e, t = "undefined" == typeof t ? this.limit : t, !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        for (var i, r = Array(t - e); t > e;) i = this.view[e++], 16 > i ? r.push("0", i.toString(16)) : r.push(i.toString(16));
        return r.join("")
    }, s.fromHex = function(e, t, i) {
        if (!i) {
            if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
            if (0 !== e.length % 2) throw TypeError("Illegal str: Length not a multiple of 2")
        }
        var r = e.length;
        t = new s(r / 2 | 0, t);
        for (var n, o = 0, f = 0; r > o; o += 2) {
            if (n = parseInt(e.substring(o, o + 2), 16), !i && (!isFinite(n) || 0 > n || n > 255)) throw TypeError("Illegal str: Contains non-hex characters");
            t.view[f++] = n
        }
        return t.limit = f, t
    };
    var l = function() {
            var e = {
                MAX_CODEPOINT: 1114111,
                encodeUTF8: function(e, t) {
                    var i = null;
                    for ("number" == typeof e && (i = e, e = function() {
                        return null
                    }); null !== i || null !== (i = e());) 128 > i ? t(127 & i) : (2048 > i ? t(i >> 6 & 31 | 192) : (65536 > i ? t(i >> 12 & 15 | 224) : (t(i >> 18 & 7 | 240), t(i >> 12 & 63 | 128)), t(i >> 6 & 63 | 128)), t(63 & i | 128)), i = null
                },
                decodeUTF8: function(e, t) {
                    for (var i, r, n, s, o = function(e) {
                            e = e.slice(0, e.indexOf(null));
                            var t = Error(e.toString());
                            throw t.name = "TruncatedError", t.bytes = e, t
                        }; null !== (i = e());) if (0 === (128 & i)) t(i);
                    else if (192 === (224 & i)) null === (r = e()) && o([i, r]), t((31 & i) << 6 | 63 & r);
                    else if (224 === (240 & i)) null !== (r = e()) && null !== (n = e()) || o([i, r, n]), t((15 & i) << 12 | (63 & r) << 6 | 63 & n);
                    else {
                        if (240 !== (248 & i)) throw RangeError("Illegal starting byte: " + i);
                        null !== (r = e()) && null !== (n = e()) && null !== (s = e()) || o([i, r, n, s]), t((7 & i) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & s)
                    }
                },
                UTF16toUTF8: function(e, t) {
                    for (var i, r = null; null !== (i = null !== r ? r : e());) i >= 55296 && 57343 >= i && null !== (r = e()) && r >= 56320 && 57343 >= r ? (t(1024 * (i - 55296) + r - 56320 + 65536), r = null) : t(i);
                    null !== r && t(r)
                },
                UTF8toUTF16: function(e, t) {
                    var i = null;
                    for ("number" == typeof e && (i = e, e = function() {
                        return null
                    }); null !== i || null !== (i = e());) 65535 >= i ? t(i) : (i -= 65536, t((i >> 10) + 55296), t(i % 1024 + 56320)), i = null
                },
                encodeUTF16toUTF8: function(t, i) {
                    e.UTF16toUTF8(t, function(t) {
                        e.encodeUTF8(t, i)
                    })
                },
                decodeUTF8toUTF16: function(t, i) {
                    e.decodeUTF8(t, function(t) {
                        e.UTF8toUTF16(t, i)
                    })
                },
                calculateCodePoint: function(e) {
                    return 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
                },
                calculateUTF8: function(e) {
                    for (var t, i = 0; null !== (t = e());) i += 128 > t ? 1 : 2048 > t ? 2 : 65536 > t ? 3 : 4;
                    return i
                },
                calculateUTF16asUTF8: function(t) {
                    var i = 0,
                        r = 0;
                    return e.UTF16toUTF8(t, function(e) {
                        ++i, r += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4
                    }), [i, r]
                }
            };
            return e
        }();
    return o.toUTF8 = function(e, t) {
        if ("undefined" == typeof e && (e = this.offset), "undefined" == typeof t && (t = this.limit), !this.noAssert) {
            if ("number" != typeof e || 0 !== e % 1) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof t || 0 !== t % 1) throw TypeError("Illegal end: Not an integer");
            if (t >>>= 0, 0 > e || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength)
        }
        var r;
        try {
            l.decodeUTF8toUTF16(function() {
                return t > e ? this.view[e++] : null
            }.bind(this), r = i())
        } catch (n) {
            if (e !== t) throw RangeError("Illegal range: Truncated data, " + e + " != " + t)
        }
        return r()
    }, s.fromUTF8 = function(e, i, r) {
        if (!r && "string" != typeof e) throw TypeError("Illegal str: Not a string");
        var n = new s(l.calculateUTF16asUTF8(t(e), !0)[1], i, r),
            o = 0;
        return l.encodeUTF16toUTF8(t(e), function(e) {
            n.view[o++] = e
        }), n.limit = o, n
    }, s
}), function(e, t) {
    "function" == typeof define && define.amd ? define(["bytebuffer"], t) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = t(require("bytebuffer"), !0) : (e.dcodeIO = e.dcodeIO || {}).ProtoBuf = t(e.dcodeIO.ByteBuffer)
}(this, function(e, t) {
    "use strict";
    var i = {};
    return i.ByteBuffer = e, i.Long = e.Long || null, i.VERSION = "5.0.1", i.WIRE_TYPES = {}, i.WIRE_TYPES.VARINT = 0, i.WIRE_TYPES.BITS64 = 1, i.WIRE_TYPES.LDELIM = 2, i.WIRE_TYPES.STARTGROUP = 3, i.WIRE_TYPES.ENDGROUP = 4, i.WIRE_TYPES.BITS32 = 5, i.PACKABLE_WIRE_TYPES = [i.WIRE_TYPES.VARINT, i.WIRE_TYPES.BITS64, i.WIRE_TYPES.BITS32], i.TYPES = {
        int32: {
            name: "int32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        uint32: {
            name: "uint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        sint32: {
            name: "sint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        int64: {
            name: "int64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        uint64: {
            name: "uint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sint64: {
            name: "sint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        bool: {
            name: "bool",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: !1
        },
        "double": {
            name: "double",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: 0
        },
        string: {
            name: "string",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: ""
        },
        bytes: {
            name: "bytes",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        fixed32: {
            name: "fixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        sfixed32: {
            name: "sfixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        fixed64: {
            name: "fixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sfixed64: {
            name: "sfixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        "float": {
            name: "float",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "enum": {
            name: "enum",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        message: {
            name: "message",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        group: {
            name: "group",
            wireType: i.WIRE_TYPES.STARTGROUP,
            defaultValue: null
        }
    }, i.MAP_KEY_TYPES = [i.TYPES.int32, i.TYPES.sint32, i.TYPES.sfixed32, i.TYPES.uint32, i.TYPES.fixed32, i.TYPES.int64, i.TYPES.sint64, i.TYPES.sfixed64, i.TYPES.uint64, i.TYPES.fixed64, i.TYPES.bool, i.TYPES.string, i.TYPES.bytes], i.ID_MIN = 1, i.ID_MAX = 536870911, i.convertFieldsToCamelCase = !1, i.populateAccessors = !0, i.populateDefaults = !0, i.Util = function() {
        "use strict";
        var e = {};
        return e.IS_NODE = !("object" != typeof process || process + "" != "[object process]" || process.browser), e.XHR = function() {
            for (var e = [function() {
                return new XMLHttpRequest
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }], t = null, i = 0; i < e.length; i++) {
                try {
                    t = e[i]()
                } catch (r) {
                    continue
                }
                break
            }
            if (!t) throw Error("XMLHttpRequest is not supported");
            return t
        }, e.fetch = function(t, i) {
            if (i && "function" != typeof i && (i = null), e.IS_NODE) {
                var r = require("fs");
                if (i) r.readFile(t, function(e, t) {
                    i(e ? null : "" + t)
                });
                else try {
                    return r.readFileSync(t)
                } catch (n) {
                    return null
                }
            } else {
                var s = e.XHR();
                if (s.open("GET", t, i ? !0 : !1), s.setRequestHeader("Accept", "text/plain"), "function" == typeof s.overrideMimeType && s.overrideMimeType("text/plain"), !i) return s.send(null), 200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null;
                if (s.onreadystatechange = function() {
                    4 == s.readyState && i(200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null)
                }, 4 == s.readyState) return;
                s.send(null)
            }
        }, e.toCamelCase = function(e) {
            return e.replace(/_([a-zA-Z])/g, function(e, t) {
                return t.toUpperCase()
            })
        }, e
    }(), i.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
    }, i.DotProto = function(e, t) {
        "use strict";

        function i(e, i) {
            var r = -1,
                n = 1;
            if ("-" == e.charAt(0) && (n = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) r = parseInt(e);
            else if (t.NUMBER_HEX.test(e)) r = parseInt(e.substring(2), 16);
            else {
                if (!t.NUMBER_OCT.test(e)) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
                r = parseInt(e.substring(1), 8)
            }
            if (r = n * r | 0, !i && 0 > r) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
            return r
        }
        function r(e) {
            var i = 1;
            if ("-" == e.charAt(0) && (i = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) return i * parseInt(e, 10);
            if (t.NUMBER_HEX.test(e)) return i * parseInt(e.substring(2), 16);
            if (t.NUMBER_OCT.test(e)) return i * parseInt(e.substring(1), 8);
            if ("inf" === e) return i * (1 / 0);
            if ("nan" === e) return 0 / 0;
            if (t.NUMBER_FLT.test(e)) return i * parseFloat(e);
            throw Error("illegal number value: " + (0 > i ? "-" : "") + e)
        }
        function n(e, t, i) {
            "undefined" == typeof e[t] ? e[t] = i : (Array.isArray(e[t]) || (e[t] = [e[t]]), e[t].push(i))
        }
        var s = {},
            o = function(e) {
                this.source = e + "", this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null
            },
            f = o.prototype;
        f._readString = function() {
            var e = '"' === this._stringOpen ? t.STRING_DQ : t.STRING_SQ;
            e.lastIndex = this.index - 1;
            var i = e.exec(this.source);
            if (!i) throw Error("unterminated string");
            return this.index = e.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, i[1]
        }, f.next = function() {
            if (this.stack.length > 0) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var e, i, r;
            do {
                for (e = !1; t.WHITESPACE.test(r = this.source.charAt(this.index));) if ("\n" === r && ++this.line, ++this.index === this.source.length) return null;
                if ("/" === this.source.charAt(this.index)) if (++this.index, "/" === this.source.charAt(this.index)) {
                    for (;
                    "\n" !== this.source.charAt(++this.index);) if (this.index == this.source.length) return null;
                    ++this.index, ++this.line, e = !0
                } else {
                    if ("*" !== (r = this.source.charAt(this.index))) return "/";
                    do {
                        if ("\n" === r && ++this.line, ++this.index === this.source.length) return null;
                        i = r, r = this.source.charAt(this.index)
                    } while ("*" !== i || "/" !== r);
                    ++this.index, e = !0
                }
            } while (e);
            if (this.index === this.source.length) return null;
            var n = this.index;
            t.DELIM.lastIndex = 0;
            var s = t.DELIM.test(this.source.charAt(n++));
            if (!s) for (; n < this.source.length && !t.DELIM.test(this.source.charAt(n));)++n;
            var o = this.source.substring(this.index, this.index = n);
            return ('"' === o || "'" === o) && (this._stringOpen = o), o
        }, f.peek = function() {
            if (0 === this.stack.length) {
                var e = this.next();
                if (null === e) return null;
                this.stack.push(e)
            }
            return this.stack[0]
        }, f.skip = function(e) {
            var t = this.next();
            if (t !== e) throw Error("illegal '" + t + "', '" + e + "' expected")
        }, f.omit = function(e) {
            return this.peek() === e ? (this.next(), !0) : !1
        }, f.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
        }, s.Tokenizer = o;
        var a = function(e) {
                this.tn = new o(e), this.proto3 = !1
            },
            h = a.prototype;
        return h.parse = function() {
            var e, i, r = {
                name: "[ROOT]",
                "package": null,
                messages: [],
                enums: [],
                imports: [],
                options: {},
                services: []
            },
                n = !0;
            try {
                for (; e = this.tn.next();) switch (e) {
                case "package":
                    if (!n || null !== r["package"]) throw Error("unexpected 'package'");
                    if (e = this.tn.next(), !t.TYPEREF.test(e)) throw Error("illegal package name: " + e);
                    this.tn.skip(";"), r["package"] = e;
                    break;
                case "import":
                    if (!n) throw Error("unexpected 'import'");
                    e = this.tn.peek(), ("public" === e || (i = "weak" === e)) && this.tn.next(), e = this._readString(), this.tn.skip(";"), i || r.imports.push(e);
                    break;
                case "syntax":
                    if (!n) throw Error("unexpected 'syntax'");
                    this.tn.skip("="), "proto3" === (r.syntax = this._readString()) && (this.proto3 = !0), this.tn.skip(";");
                    break;
                case "message":
                    this._parseMessage(r, null), n = !1;
                    break;
                case "enum":
                    this._parseEnum(r), n = !1;
                    break;
                case "option":
                    this._parseOption(r);
                    break;
                case "service":
                    this._parseService(r);
                    break;
                case "extend":
                    this._parseExtend(r);
                    break;
                default:
                    throw Error("unexpected '" + e + "'")
                }
            } catch (s) {
                throw s.message = "Parse error at line " + this.tn.line + ": " + s.message, s
            }
            return delete r.name, r
        }, a.parse = function(e) {
            return new a(e).parse()
        }, h._readString = function() {
            var e, t, i = "";
            do {
                if (t = this.tn.next(), "'" !== t && '"' !== t) throw Error("illegal string delimiter: " + t);
                i += this.tn.next(), this.tn.skip(t), e = this.tn.peek()
            } while ('"' === e || '"' === e);
            return i
        }, h._readValue = function(e) {
            var i = this.tn.peek();
            if ('"' === i || "'" === i) return this._readString();
            if (this.tn.next(), t.NUMBER.test(i)) return r(i);
            if (t.BOOL.test(i)) return "true" === i.toLowerCase();
            if (e && t.TYPEREF.test(i)) return i;
            throw Error("illegal value: " + i)
        }, h._parseOption = function(e, i) {
            var r = this.tn.next(),
                n = !1;
            if ("(" === r && (n = !0, r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal option name: " + r);
            var s = r;
            n && (this.tn.skip(")"), s = "(" + s + ")", r = this.tn.peek(), t.FQTYPEREF.test(r) && (s += r, this.tn.next())), this.tn.skip("="), this._parseOptionValue(e, s), i || this.tn.skip(";")
        }, h._parseOptionValue = function(e, i) {
            var r = this.tn.peek();
            if ("{" !== r) n(e.options, i, this._readValue(!0));
            else for (this.tn.skip("{");
            "}" !== (r = this.tn.next());) {
                if (!t.NAME.test(r)) throw Error("illegal option name: " + i + "." + r);
                this.tn.omit(":") ? n(e.options, i + "." + r, this._readValue(!0)) : this._parseOptionValue(e, i + "." + r)
            }
        }, h._parseService = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal service name at line " + this.tn.line + ": " + i);
            var r = i,
                n = {
                    name: r,
                    rpc: {},
                    options: {}
                };
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) if ("option" === i) this._parseOption(n);
            else {
                if ("rpc" !== i) throw Error("illegal service token: " + i);
                this._parseServiceRPC(n)
            }
            this.tn.omit(";"), e.services.push(n)
        }, h._parseServiceRPC = function(e) {
            var i = "rpc",
                r = this.tn.next();
            if (!t.NAME.test(r)) throw Error("illegal rpc service method name: " + r);
            var n = r,
                s = {
                    request: null,
                    response: null,
                    request_stream: !1,
                    response_stream: !1,
                    options: {}
                };
            if (this.tn.skip("("), r = this.tn.next(), "stream" === r.toLowerCase() && (s.request_stream = !0, r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal rpc service request type: " + r);
            if (s.request = r, this.tn.skip(")"), r = this.tn.next(), "returns" !== r.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + r);
            if (this.tn.skip("("), r = this.tn.next(), "stream" === r.toLowerCase() && (s.response_stream = !0, r = this.tn.next()), s.response = r, this.tn.skip(")"), r = this.tn.peek(), "{" === r) {
                for (this.tn.next();
                "}" !== (r = this.tn.next());) {
                    if ("option" !== r) throw Error("illegal rpc service token: " + r);
                    this._parseOption(s)
                }
                this.tn.omit(";")
            } else this.tn.skip(";");
            "undefined" == typeof e[i] && (e[i] = {}), e[i][n] = s
        }, h._parseMessage = function(e, r) {
            var n = !! r,
                s = this.tn.next(),
                o = {
                    name: "",
                    fields: [],
                    enums: [],
                    messages: [],
                    options: {},
                    services: [],
                    oneofs: {}
                };
            if (!t.NAME.test(s)) throw Error("illegal " + (n ? "group" : "message") + " name: " + s);
            for (o.name = s, n && (this.tn.skip("="), r.id = i(this.tn.next()), o.isGroup = !0), s = this.tn.peek(), "[" === s && r && this._parseFieldOptions(r), this.tn.skip("{");
            "}" !== (s = this.tn.next());) if (t.RULE.test(s)) this._parseMessageField(o, s);
            else if ("oneof" === s) this._parseMessageOneOf(o);
            else if ("enum" === s) this._parseEnum(o);
            else if ("message" === s) this._parseMessage(o);
            else if ("option" === s) this._parseOption(o);
            else if ("service" === s) this._parseService(o);
            else if ("extensions" === s) o.hasOwnProperty("extensions") ? o.extensions = o.extensions.concat(this._parseExtensionRanges()) : o.extensions = this._parseExtensionRanges();
            else if ("reserved" === s) this._parseIgnored();
            else if ("extend" === s) this._parseExtend(o);
            else {
                if (!t.TYPEREF.test(s)) throw Error("illegal message token: " + s);
                if (!this.proto3) throw Error("illegal field rule: " + s);
                this._parseMessageField(o, "optional", s)
            }
            return this.tn.omit(";"), e.messages.push(o), o
        }, h._parseIgnored = function() {
            for (;
            ";" !== this.tn.peek();) this.tn.next();
            this.tn.skip(";")
        }, h._parseMessageField = function(e, r, n) {
            if (!t.RULE.test(r)) throw Error("illegal message field rule: " + r);
            var s, o = {
                rule: r,
                type: "",
                name: "",
                options: {},
                id: 0
            };
            if ("map" === r) {
                if (n) throw Error("illegal type: " + n);
                if (this.tn.skip("<"), s = this.tn.next(), !t.TYPE.test(s) && !t.TYPEREF.test(s)) throw Error("illegal message field type: " + s);
                if (o.keytype = s, this.tn.skip(","), s = this.tn.next(), !t.TYPE.test(s) && !t.TYPEREF.test(s)) throw Error("illegal message field: " + s);
                if (o.type = s, this.tn.skip(">"), s = this.tn.next(), !t.NAME.test(s)) throw Error("illegal message field name: " + s);
                o.name = s, this.tn.skip("="), o.id = i(this.tn.next()), s = this.tn.peek(), "[" === s && this._parseFieldOptions(o), this.tn.skip(";")
            } else if (n = "undefined" != typeof n ? n : this.tn.next(), "group" === n) {
                var f = this._parseMessage(e, o);
                if (!/^[A-Z]/.test(f.name)) throw Error("illegal group name: " + f.name);
                o.type = f.name, o.name = f.name.toLowerCase(), this.tn.omit(";")
            } else {
                if (!t.TYPE.test(n) && !t.TYPEREF.test(n)) throw Error("illegal message field type: " + n);
                if (o.type = n, s = this.tn.next(), !t.NAME.test(s)) throw Error("illegal message field name: " + s);
                o.name = s, this.tn.skip("="), o.id = i(this.tn.next()), s = this.tn.peek(), "[" === s && this._parseFieldOptions(o), this.tn.skip(";")
            }
            return e.fields.push(o), o
        }, h._parseMessageOneOf = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal oneof name: " + i);
            var r, n = i,
                s = [];
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) r = this._parseMessageField(e, "optional", i), r.oneof = n, s.push(r.id);
            this.tn.omit(";"), e.oneofs[n] = s
        }, h._parseFieldOptions = function(e) {
            this.tn.skip("[");
            for (var t, i = !0;
            "]" !== (t = this.tn.peek());) i || this.tn.skip(","), this._parseOption(e, !0), i = !1;
            this.tn.next()
        }, h._parseEnum = function(e) {
            var r = {
                name: "",
                values: [],
                options: {}
            },
                n = this.tn.next();
            if (!t.NAME.test(n)) throw Error("illegal name: " + n);
            for (r.name = n, this.tn.skip("{");
            "}" !== (n = this.tn.next());) if ("option" === n) this._parseOption(r);
            else {
                if (!t.NAME.test(n)) throw Error("illegal name: " + n);
                this.tn.skip("=");
                var s = {
                    name: n,
                    id: i(this.tn.next(), !0)
                };
                n = this.tn.peek(), "[" === n && this._parseFieldOptions({
                    options: {}
                }), this.tn.skip(";"), r.values.push(s)
            }
            this.tn.omit(";"), e.enums.push(r)
        }, h._parseExtensionRanges = function() {
            var t, i, n, s = [];
            do {
                for (i = [];;) {
                    switch (t = this.tn.next()) {
                    case "min":
                        n = e.ID_MIN;
                        break;
                    case "max":
                        n = e.ID_MAX;
                        break;
                    default:
                        n = r(t)
                    }
                    if (i.push(n), 2 === i.length) break;
                    if ("to" !== this.tn.peek()) {
                        i.push(n);
                        break
                    }
                    this.tn.next()
                }
                s.push(i)
            } while (this.tn.omit(","));
            return this.tn.skip(";"), s
        }, h._parseExtend = function(e) {
            var i = this.tn.next();
            if (!t.TYPEREF.test(i)) throw Error("illegal extend reference: " + i);
            var r = {
                ref: i,
                fields: []
            };
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) if (t.RULE.test(i)) this._parseMessageField(r, i);
            else {
                if (!t.TYPEREF.test(i)) throw Error("illegal extend token: " + i);
                if (!this.proto3) throw Error("illegal field rule: " + i);
                this._parseMessageField(r, "optional", i)
            }
            return this.tn.omit(";"), e.messages.push(r), r
        }, h.toString = function() {
            return "Parser at line " + this.tn.line
        }, s.Parser = a, s
    }(i, i.Lang), i.Reflect = function(t) {
        "use strict";

        function i(i) {
            if ("string" == typeof i && (i = t.TYPES[i]), "undefined" == typeof i.defaultValue) throw Error("default value for type " + i.name + " is not supported");
            return i == t.TYPES.bytes ? new e(0) : i.defaultValue
        }
        function r(e, i) {
            if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low === e.low && e.high === e.high) return new t.Long(e.low, e.high, "undefined" == typeof i ? e.unsigned : i);
            if ("string" == typeof e) return t.Long.fromString(e, i || !1, 10);
            if ("number" == typeof e) return t.Long.fromNumber(e, i || !1);
            throw Error("not convertible to Long")
        }
        function n(e, i) {
            var r = i.readVarint32(),
                s = 7 & r,
                o = r >>> 3;
            switch (s) {
            case t.WIRE_TYPES.VARINT:
                do r = i.readUint8();
                while (128 === (128 & r));
                break;
            case t.WIRE_TYPES.BITS64:
                i.offset += 8;
                break;
            case t.WIRE_TYPES.LDELIM:
                r = i.readVarint32(), i.offset += r;
                break;
            case t.WIRE_TYPES.STARTGROUP:
                n(o, i);
                break;
            case t.WIRE_TYPES.ENDGROUP:
                if (o === e) return !1;
                throw Error("Illegal GROUPEND after unknown group: " + o + " (" + e + " expected)");
            case t.WIRE_TYPES.BITS32:
                i.offset += 4;
                break;
            default:
                throw Error("Illegal wire type in unknown group " + e + ": " + s)
            }
            return !0
        }
        var s = {},
            o = function(e, t, i) {
                this.builder = e, this.parent = t, this.name = i, this.className
            },
            f = o.prototype;
        f.fqn = function() {
            for (var e = this.name, t = this;;) {
                if (t = t.parent, null == t) break;
                e = t.name + "." + e
            }
            return e
        }, f.toString = function(e) {
            return (e ? this.className + " " : "") + this.fqn()
        }, f.build = function() {
            throw Error(this.toString(!0) + " cannot be built directly")
        }, s.T = o;
        var a = function(e, t, i, r, n) {
                o.call(this, e, t, i), this.className = "Namespace", this.children = [], this.options = r || {}, this.syntax = n || "proto2"
            },
            h = a.prototype = Object.create(o.prototype);
        h.getChildren = function(e) {
            if (e = e || null, null == e) return this.children.slice();
            for (var t = [], i = 0, r = this.children.length; r > i; ++i) this.children[i] instanceof e && t.push(this.children[i]);
            return t
        }, h.addChild = function(e) {
            var t;
            if (t = this.getChild(e.name)) if (t instanceof c.Field && t.name !== t.originalName && null === this.getChild(t.originalName)) t.name = t.originalName;
            else {
                if (!(e instanceof c.Field && e.name !== e.originalName && null === this.getChild(e.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);
                e.name = e.originalName
            }
            this.children.push(e)
        }, h.getChild = function(e) {
            for (var t = "number" == typeof e ? "id" : "name", i = 0, r = this.children.length; r > i; ++i) if (this.children[i][t] === e) return this.children[i];
            return null
        }, h.resolve = function(e, t) {
            var i = "string" == typeof e ? e.split(".") : e,
                r = this,
                n = 0;
            if ("" === i[n]) {
                for (; null !== r.parent;) r = r.parent;
                n++
            }
            var o;
            do {
                do {
                    if (!(r instanceof s.Namespace)) {
                        r = null;
                        break
                    }
                    if (o = r.getChild(i[n]), !o || !(o instanceof s.T) || t && !(o instanceof s.Namespace)) {
                        r = null;
                        break
                    }
                    r = o, n++
                } while (n < i.length);
                if (null != r) break;
                if (null !== this.parent) return this.parent.resolve(e, t)
            } while (null != r);
            return r
        }, h.qn = function(e) {
            var t = [],
                i = e;
            do t.unshift(i.name), i = i.parent;
            while (null !== i);
            for (var r = 1; r <= t.length; r++) {
                var n = t.slice(t.length - r);
                if (e === this.resolve(n, e instanceof s.Namespace)) return n.join(".")
            }
            return e.fqn()
        }, h.build = function() {
            for (var e, t = {}, i = this.children, r = 0, n = i.length; n > r; ++r) e = i[r], e instanceof a && (t[e.name] = e.build());
            return Object.defineProperty && Object.defineProperty(t, "$options", {
                value: this.buildOpt()
            }), t
        }, h.buildOpt = function() {
            for (var e = {}, t = Object.keys(this.options), i = 0, r = t.length; r > i; ++i) {
                var n = t[i],
                    s = this.options[t[i]];
                e[n] = s
            }
            return e
        }, h.getOption = function(e) {
            return "undefined" == typeof e ? this.options : "undefined" != typeof this.options[e] ? this.options[e] : null
        }, s.Namespace = a;
        var l = function(e, i, r, n, s) {
                if (this.type = e, this.resolvedType = i, this.isMapKey = r, this.syntax = n, this.name = s, r && t.MAP_KEY_TYPES.indexOf(e) < 0) throw Error("Invalid map key type: " + e.name)
            },
            u = l.prototype;
        l.defaultFieldValue = i, u.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element"
        }, u.verifyValue = function(i) {
            function n(e, t) {
                throw Error("Illegal value for " + s.toString(!0) + " of type " + s.type.name + ": " + e + " (" + t + ")")
            }
            var s = this;
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
                return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), i > 4294967295 ? 0 | i : i;
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), 0 > i ? i >>> 0 : i;
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
                if (t.Long) try {
                    return r(i, !1)
                } catch (o) {
                    n(typeof i, o.message)
                } else n(typeof i, "requires Long.js");
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                if (t.Long) try {
                    return r(i, !0)
                } catch (o) {
                    n(typeof i, o.message)
                } else n(typeof i, "requires Long.js");
            case t.TYPES.bool:
                return "boolean" != typeof i && n(typeof i, "not a boolean"), i;
            case t.TYPES["float"]:
            case t.TYPES["double"]:
                return "number" != typeof i && n(typeof i, "not a number"), i;
            case t.TYPES.string:
                return "string" == typeof i || i && i instanceof String || n(typeof i, "not a string"), "" + i;
            case t.TYPES.bytes:
                return e.isByteBuffer(i) ? i : e.wrap(i, "base64");
            case t.TYPES["enum"]:
                var f = this.resolvedType.getChildren(t.Reflect.Enum.Value);
                for (h = 0; h < f.length; h++) {
                    if (f[h].name == i) return f[h].id;
                    if (f[h].id == i) return f[h].id
                }
                if ("proto3" === this.syntax) return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), (i > 4294967295 || 0 > i) && n(typeof i, "not in range for uint32"), i;
                n(i, "not a valid enum value");
            case t.TYPES.group:
            case t.TYPES.message:
                if (i && "object" == typeof i || n(typeof i, "object expected"), i instanceof this.resolvedType.clazz) return i;
                if (i instanceof t.Builder.Message) {
                    var a = {};
                    for (var h in i) i.hasOwnProperty(h) && (a[h] = i[h]);
                    i = a
                }
                return new this.resolvedType.clazz(i)
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + i + " (undefined type " + this.type + ")")
        }, u.calculateLength = function(i, r) {
            if (null === r) return 0;
            var n;
            switch (this.type) {
            case t.TYPES.int32:
                return 0 > r ? e.calculateVarint64(r) : e.calculateVarint32(r);
            case t.TYPES.uint32:
                return e.calculateVarint32(r);
            case t.TYPES.sint32:
                return e.calculateVarint32(e.zigZagEncode32(r));
            case t.TYPES.fixed32:
            case t.TYPES.sfixed32:
            case t.TYPES["float"]:
                return 4;
            case t.TYPES.int64:
            case t.TYPES.uint64:
                return e.calculateVarint64(r);
            case t.TYPES.sint64:
                return e.calculateVarint64(e.zigZagEncode64(r));
            case t.TYPES.fixed64:
            case t.TYPES.sfixed64:
                return 8;
            case t.TYPES.bool:
                return 1;
            case t.TYPES["enum"]:
                return e.calculateVarint32(r);
            case t.TYPES["double"]:
                return 8;
            case t.TYPES.string:
                return n = e.calculateUTF8Bytes(r), e.calculateVarint32(n) + n;
            case t.TYPES.bytes:
                if (r.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                return e.calculateVarint32(r.remaining()) + r.remaining();
            case t.TYPES.message:
                return n = this.resolvedType.calculate(r), e.calculateVarint32(n) + n;
            case t.TYPES.group:
                return n = this.resolvedType.calculate(r), n + e.calculateVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP)
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)")
        }, u.encodeValue = function(i, r, n) {
            if (null === r) return n;
            switch (this.type) {
            case t.TYPES.int32:
                0 > r ? n.writeVarint64(r) : n.writeVarint32(r);
                break;
            case t.TYPES.uint32:
                n.writeVarint32(r);
                break;
            case t.TYPES.sint32:
                n.writeVarint32ZigZag(r);
                break;
            case t.TYPES.fixed32:
                n.writeUint32(r);
                break;
            case t.TYPES.sfixed32:
                n.writeInt32(r);
                break;
            case t.TYPES.int64:
            case t.TYPES.uint64:
                n.writeVarint64(r);
                break;
            case t.TYPES.sint64:
                n.writeVarint64ZigZag(r);
                break;
            case t.TYPES.fixed64:
                n.writeUint64(r);
                break;
            case t.TYPES.sfixed64:
                n.writeInt64(r);
                break;
            case t.TYPES.bool:
                "string" == typeof r ? n.writeVarint32("false" === r.toLowerCase() ? 0 : !! r) : n.writeVarint32(r ? 1 : 0);
                break;
            case t.TYPES["enum"]:
                n.writeVarint32(r);
                break;
            case t.TYPES["float"]:
                n.writeFloat32(r);
                break;
            case t.TYPES["double"]:
                n.writeFloat64(r);
                break;
            case t.TYPES.string:
                n.writeVString(r);
                break;
            case t.TYPES.bytes:
                if (r.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                var s = r.offset;
                n.writeVarint32(r.remaining()), n.append(r), r.offset = s;
                break;
            case t.TYPES.message:
                var o = (new e).LE();
                this.resolvedType.encode(r, o), n.writeVarint32(o.offset), n.append(o.flip());
                break;
            case t.TYPES.group:
                this.resolvedType.encode(r, n), n.writeVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP);
                break;
            default:
                throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)")
            }
            return n
        }, u.decode = function(e, i, r) {
            if (i != this.type.wireType) throw Error("Unexpected wire type for element");
            var n, s;
            switch (this.type) {
            case t.TYPES.int32:
                return 0 | e.readVarint32();
            case t.TYPES.uint32:
                return e.readVarint32() >>> 0;
            case t.TYPES.sint32:
                return 0 | e.readVarint32ZigZag();
            case t.TYPES.fixed32:
                return e.readUint32() >>> 0;
            case t.TYPES.sfixed32:
                return 0 | e.readInt32();
            case t.TYPES.int64:
                return e.readVarint64();
            case t.TYPES.uint64:
                return e.readVarint64().toUnsigned();
            case t.TYPES.sint64:
                return e.readVarint64ZigZag();
            case t.TYPES.fixed64:
                return e.readUint64();
            case t.TYPES.sfixed64:
                return e.readInt64();
            case t.TYPES.bool:
                return !!e.readVarint32();
            case t.TYPES["enum"]:
                return e.readVarint32();
            case t.TYPES["float"]:
                return e.readFloat();
            case t.TYPES["double"]:
                return e.readDouble();
            case t.TYPES.string:
                return e.readVString();
            case t.TYPES.bytes:
                if (s = e.readVarint32(), e.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + e.remaining());
                return n = e.clone(), n.limit = n.offset + s, e.offset += s, n;
            case t.TYPES.message:
                return s = e.readVarint32(), this.resolvedType.decode(e, s);
            case t.TYPES.group:
                return this.resolvedType.decode(e, -1, r)
            }
            throw Error("[INTERNAL] Illegal decode type")
        }, u.valueFromString = function(i) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return this.verifyValue(parseInt(i));
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                return this.verifyValue(i);
            case t.TYPES.bool:
                return "true" === i;
            case t.TYPES.string:
                return this.verifyValue(i);
            case t.TYPES.bytes:
                return e.fromBinary(i)
            }
        }, u.valueToString = function(e) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === t.TYPES.bytes ? e.toString("binary") : e.toString()
        }, s.Element = l;
        var c = function(e, t, i, r, n, s) {
                a.call(this, e, t, i, r, s), this.className = "Message", this.extensions = void 0, this.clazz = null, this.isGroup = !! n, this._fields = null, this._fieldsById = null, this._fieldsByName = null
            },
            p = c.prototype = Object.create(a.prototype);
        p.build = function(i) {
            if (this.clazz && !i) return this.clazz;
            var r = function(t, i) {
                    function r(i, n, s, o) {
                        if (null === i || "object" != typeof i) {
                            if (o && o instanceof t.Reflect.Enum) {
                                var f = t.Reflect.Enum.getName(o.object, i);
                                if (null !== f) return f
                            }
                            return i
                        }
                        if (e.isByteBuffer(i)) return n ? i.toBase64() : i.toBuffer();
                        if (t.Long.isLong(i)) return s ? i.toString() : t.Long.fromValue(i);
                        var a;
                        if (Array.isArray(i)) return a = [], i.forEach(function(e, t) {
                            a[t] = r(e, n, s, o)
                        }), a;
                        if (a = {}, i instanceof t.Map) {
                            for (var h = i.entries(), l = h.next(); !l.done; l = h.next()) a[i.keyElem.valueToString(l.value[0])] = r(l.value[1], n, s, i.valueElem.resolvedType);
                            return a
                        }
                        var u = i.$type,
                            c = void 0;
                        for (var p in i) i.hasOwnProperty(p) && (u && (c = u.getChild(p)) ? a[p] = r(i[p], n, s, c.resolvedType) : a[p] = r(i[p], n, s));
                        return a
                    }
                    var n = i.getChildren(t.Reflect.Message.Field),
                        s = i.getChildren(t.Reflect.Message.OneOf),
                        o = function(r, f) {
                            t.Builder.Message.call(this);
                            for (var a = 0, h = s.length; h > a; ++a) this[s[a].name] = null;
                            for (a = 0, h = n.length; h > a; ++a) {
                                var l = n[a];
                                this[l.name] = l.repeated ? [] : l.map ? new t.Map(l) : null, !l.required && "proto3" !== i.syntax || null === l.defaultValue || (this[l.name] = l.defaultValue)
                            }
                            if (arguments.length > 0) {
                                var u;
                                if (1 !== arguments.length || null === r || "object" != typeof r || !("function" != typeof r.encode || r instanceof o) || Array.isArray(r) || r instanceof t.Map || e.isByteBuffer(r) || r instanceof ArrayBuffer || t.Long && r instanceof t.Long) for (a = 0, h = arguments.length; h > a; ++a)"undefined" != typeof(u = arguments[a]) && this.$set(n[a].name, u);
                                else this.$set(r)
                            }
                        },
                        f = o.prototype = Object.create(t.Builder.Message.prototype);
                    f.add = function(e, r, n) {
                        var s = i._fieldsByName[e];
                        if (!n) {
                            if (!s) throw Error(this + "#" + e + " is undefined");
                            if (!(s instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + s.toString(!0));
                            if (!s.repeated) throw Error(this + "#" + e + " is not a repeated field");
                            r = s.verifyValue(r, !0)
                        }
                        return null === this[e] && (this[e] = []), this[e].push(r), this
                    }, f.$add = f.add, f.set = function(e, r, n) {
                        if (e && "object" == typeof e) {
                            n = r;
                            for (var s in e) e.hasOwnProperty(s) && "undefined" != typeof(r = e[s]) && this.$set(s, r, n);
                            return this
                        }
                        var o = i._fieldsByName[e];
                        if (n) this[e] = r;
                        else {
                            if (!o) throw Error(this + "#" + e + " is not a field: undefined");
                            if (!(o instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + o.toString(!0));
                            this[o.name] = r = o.verifyValue(r)
                        }
                        if (o && o.oneof) {
                            var f = this[o.oneof.name];
                            null !== r ? (null !== f && f !== o.name && (this[f] = null), this[o.oneof.name] = o.name) : f === e && (this[o.oneof.name] = null)
                        }
                        return this
                    }, f.$set = f.set, f.get = function(e, r) {
                        if (r) return this[e];
                        var n = i._fieldsByName[e];
                        if (!(n && n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: undefined");
                        if (!(n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + n.toString(!0));
                        return this[n.name]
                    }, f.$get = f.get;
                    for (var a = 0; a < n.length; a++) {
                        var h = n[a];
                        h instanceof t.Reflect.Message.ExtensionField || i.builder.options.populateAccessors &&
                        function(e) {
                            var t = e.originalName.replace(/(_[a-zA-Z])/g, function(e) {
                                return e.toUpperCase().replace("_", "")
                            });
                            t = t.substring(0, 1).toUpperCase() + t.substring(1);
                            var r = e.originalName.replace(/([A-Z])/g, function(e) {
                                return "_" + e
                            }),
                                n = function(t, i) {
                                    return this[e.name] = i ? t : e.verifyValue(t), this
                                },
                                s = function() {
                                    return this[e.name]
                                };
                            null === i.getChild("set" + t) && (f["set" + t] = n), null === i.getChild("set_" + r) && (f["set_" + r] = n), null === i.getChild("get" + t) && (f["get" + t] = s), null === i.getChild("get_" + r) && (f["get_" + r] = s)
                        }(h)
                    }
                    f.encode = function(t, r) {
                        "boolean" == typeof t && (r = t, t = void 0);
                        var n = !1;
                        t || (t = new e, n = !0);
                        var s = t.littleEndian;
                        try {
                            return i.encode(this, t.LE(), r), (n ? t.flip() : t).LE(s)
                        } catch (o) {
                            throw t.LE(s), o
                        }
                    }, o.encode = function(e, t, i) {
                        return new o(e).encode(t, i)
                    }, f.calculate = function() {
                        return i.calculate(this)
                    }, f.encodeDelimited = function(t, r) {
                        var n = !1;
                        t || (t = new e, n = !0);
                        var s = (new e).LE();
                        return i.encode(this, s, r).flip(), t.writeVarint32(s.remaining()), t.append(s), n ? t.flip() : t
                    }, f.encodeAB = function() {
                        try {
                            return this.encode().toArrayBuffer()
                        } catch (e) {
                            throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()), e
                        }
                    }, f.toArrayBuffer = f.encodeAB, f.encodeNB = function() {
                        try {
                            return this.encode().toBuffer()
                        } catch (e) {
                            throw e.encoded && (e.encoded = e.encoded.toBuffer()), e
                        }
                    }, f.toBuffer = f.encodeNB, f.encode64 = function() {
                        try {
                            return this.encode().toBase64()
                        } catch (e) {
                            throw e.encoded && (e.encoded = e.encoded.toBase64()), e
                        }
                    }, f.toBase64 = f.encode64, f.encodeHex = function() {
                        try {
                            return this.encode().toHex()
                        } catch (e) {
                            throw e.encoded && (e.encoded = e.encoded.toHex()), e
                        }
                    }, f.toHex = f.encodeHex, f.toRaw = function(e, t) {
                        return r(this, !! e, !! t, this.$type)
                    }, f.encodeJSON = function() {
                        return JSON.stringify(r(this, !0, !0, this.$type))
                    }, o.decode = function(t, r, n) {
                        "string" == typeof r && (n = r, r = -1), "string" == typeof t ? t = e.wrap(t, n ? n : "base64") : e.isByteBuffer(t) || (t = e.wrap(t));
                        var s = t.littleEndian;
                        try {
                            var o = i.decode(t.LE(), r);
                            return t.LE(s), o
                        } catch (f) {
                            throw t.LE(s), f
                        }
                    }, o.decodeDelimited = function(t, r) {
                        if ("string" == typeof t ? t = e.wrap(t, r ? r : "base64") : e.isByteBuffer(t) || (t = e.wrap(t)), t.remaining() < 1) return null;
                        var n = t.offset,
                            s = t.readVarint32();
                        if (t.remaining() < s) return t.offset = n, null;
                        try {
                            var o = i.decode(t.slice(t.offset, t.offset + s).LE());
                            return t.offset += s, o
                        } catch (f) {
                            throw t.offset += s, f
                        }
                    }, o.decode64 = function(e) {
                        return o.decode(e, "base64")
                    }, o.decodeHex = function(e) {
                        return o.decode(e, "hex")
                    }, o.decodeJSON = function(e) {
                        return new o(JSON.parse(e))
                    }, f.toString = function() {
                        return i.toString()
                    };
                    return Object.defineProperty && (Object.defineProperty(o, "$options", {
                        value: i.buildOpt()
                    }), Object.defineProperty(f, "$options", {
                        value: o.$options
                    }), Object.defineProperty(o, "$type", {
                        value: i
                    }), Object.defineProperty(f, "$type", {
                        value: i
                    })), o
                }(t, this);
            this._fields = [], this._fieldsById = {}, this._fieldsByName = {};
            for (var n, s = 0, o = this.children.length; o > s; s++) if (n = this.children[s], n instanceof w || n instanceof c || n instanceof T) {
                if (r.hasOwnProperty(n.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + n.toString(!0) + " cannot override static property '" + n.name + "'");
                r[n.name] = n.build()
            } else if (n instanceof c.Field) n.build(), this._fields.push(n), this._fieldsById[n.id] = n, this._fieldsByName[n.name] = n;
            else if (!(n instanceof c.OneOf || n instanceof b)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[s].toString(!0));
            return this.clazz = r
        }, p.encode = function(e, t, i) {
            for (var r, n, s = null, o = 0, f = this._fields.length; f > o; ++o) r = this._fields[o], n = e[r.name], r.required && null === n ? null === s && (s = r) : r.encode(i ? n : r.verifyValue(n), t, e);
            if (null !== s) {
                var a = Error("Missing at least one required field for " + this.toString(!0) + ": " + s);
                throw a.encoded = t, a
            }
            return t
        }, p.calculate = function(e) {
            for (var t, i, r = 0, n = 0, s = this._fields.length; s > n; ++n) {
                if (t = this._fields[n], i = e[t.name], t.required && null === i) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + t);
                r += t.calculate(i, e)
            }
            return r
        }, p.decode = function(e, i, r) {
            "number" != typeof i && (i = -1);
            for (var s, o, f, a, h = e.offset, l = new this.clazz; e.offset < h + i || -1 === i && e.remaining() > 0;) {
                if (s = e.readVarint32(), o = 7 & s, f = s >>> 3, o === t.WIRE_TYPES.ENDGROUP) {
                    if (f !== r) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + f + " (" + (r ? r + " expected" : "not a group") + ")");
                    break
                }
                if (a = this._fieldsById[f]) {
                    if (a.repeated && !a.options.packed) l[a.name].push(a.decode(o, e));
                    else if (a.map) {
                        var u = a.decode(o, e);
                        l[a.name].set(u[0], u[1])
                    } else if (l[a.name] = a.decode(o, e), a.oneof) {
                        var c = l[a.oneof.name];
                        null !== c && c !== a.name && (l[c] = null), l[a.oneof.name] = a.name
                    }
                } else switch (o) {
                case t.WIRE_TYPES.VARINT:
                    e.readVarint32();
                    break;
                case t.WIRE_TYPES.BITS32:
                    e.offset += 4;
                    break;
                case t.WIRE_TYPES.BITS64:
                    e.offset += 8;
                    break;
                case t.WIRE_TYPES.LDELIM:
                    var p = e.readVarint32();
                    e.offset += p;
                    break;
                case t.WIRE_TYPES.STARTGROUP:
                    for (; n(f, e););
                    break;
                default:
                    throw Error("Illegal wire type for unknown field " + f + " in " + this.toString(!0) + "#decode: " + o)
                }
            }
            for (var d = 0, g = this._fields.length; g > d; ++d) if (a = this._fields[d], null === l[a.name]) if ("proto3" === this.syntax) l[a.name] = a.defaultValue;
            else {
                if (a.required) {
                    var y = Error("Missing at least one required field for " + this.toString(!0) + ": " + a.name);
                    throw y.decoded = l, y
                }
                t.populateDefaults && null !== a.defaultValue && (l[a.name] = a.defaultValue)
            }
            return l
        }, s.Message = c;
        var d = function(e, i, r, n, s, f, a, h, l, u) {
                o.call(this, e, i, f), this.className = "Message.Field", this.required = "required" === r, this.repeated = "repeated" === r, this.map = "map" === r, this.keyType = n || null, this.type = s, this.resolvedType = null, this.id = a, this.options = h || {}, this.defaultValue = null, this.oneof = l || null, this.syntax = u || "proto2", this.originalName = this.name, this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof c.ExtensionField || (this.name = t.Util.toCamelCase(this.name))
            },
            g = d.prototype = Object.create(o.prototype);
        g.build = function() {
            this.element = new l(this.type, this.resolvedType, !1, this.syntax, this.name), this.map && (this.keyElement = new l(this.keyType, void 0, !0, this.syntax, this.name)), "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = l.defaultFieldValue(this.type)
        }, g.verifyValue = function(e, i) {
            function r(e, t) {
                throw Error("Illegal value for " + n.toString(!0) + " of type " + n.type.name + ": " + e + " (" + t + ")")
            }
            i = i || !1;
            var n = this;
            if (null === e) return this.required && r(typeof e, "required"), "proto3" === this.syntax && this.type !== t.TYPES.message && r(typeof e, "proto3 field without field presence cannot be null"), null;
            var s;
            if (this.repeated && !i) {
                Array.isArray(e) || (e = [e]);
                var o = [];
                for (s = 0; s < e.length; s++) o.push(this.element.verifyValue(e[s]));
                return o
            }
            return this.map && !i ? e instanceof t.Map ? e : (e instanceof Object || r(typeof e, "expected ProtoBuf.Map or raw object for map field"), new t.Map(this, e)) : (!this.repeated && Array.isArray(e) && r(typeof e, "no array expected"), this.element.verifyValue(e))
        }, g.hasWirePresence = function(e, i) {
            if ("proto3" !== this.syntax) return null !== e;
            if (this.oneof && i[this.oneof.name] === this.name) return !0;
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return 0 !== e;
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                return 0 !== e.low || 0 !== e.high;
            case t.TYPES.bool:
                return e;
            case t.TYPES["float"]:
            case t.TYPES["double"]:
                return 0 !== e;
            case t.TYPES.string:
                return e.length > 0;
            case t.TYPES.bytes:
                return e.remaining() > 0;
            case t.TYPES["enum"]:
                return 0 !== e;
            case t.TYPES.message:
                return null !== e;
            default:
                return !0
            }
        }, g.encode = function(i, r, n) {
            if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return r;
            try {
                if (this.repeated) {
                    var s;
                    if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.ensureCapacity(r.offset += 1);
                        var o = r.offset;
                        for (s = 0; s < i.length; s++) this.element.encodeValue(this.id, i[s], r);
                        var f = r.offset - o,
                            a = e.calculateVarint32(f);
                        if (a > 1) {
                            var h = r.slice(o, r.offset);
                            o += a - 1, r.offset = o, r.append(h)
                        }
                        r.writeVarint32(f, o - a)
                    } else for (s = 0; s < i.length; s++) r.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, i[s], r)
                } else this.map ? i.forEach(function(i, n, s) {
                    var o = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, n) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i);
                    r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.writeVarint32(o), r.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, n, r), r.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, i, r)
                }, this) : this.hasWirePresence(i, n) && (r.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, i, r))
            } catch (l) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + l + ")")
            }
            return r
        }, g.calculate = function(i, r) {
            if (i = this.verifyValue(i), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return 0;
            var n = 0;
            try {
                if (this.repeated) {
                    var s, o;
                    if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        for (n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), o = 0, s = 0; s < i.length; s++) o += this.element.calculateLength(this.id, i[s]);
                        n += e.calculateVarint32(o), n += o
                    } else for (s = 0; s < i.length; s++) n += e.calculateVarint32(this.id << 3 | this.type.wireType), n += this.element.calculateLength(this.id, i[s])
                } else this.map ? i.forEach(function(i, r, s) {
                    var o = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, r) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i);
                    n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), n += e.calculateVarint32(o), n += o
                }, this) : this.hasWirePresence(i, r) && (n += e.calculateVarint32(this.id << 3 | this.type.wireType), n += this.element.calculateLength(this.id, i))
            } catch (f) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + f + ")")
            }
            return n
        }, g.decode = function(e, i, r) {
            var n, s, o = !this.map && e == this.type.wireType || !r && this.repeated && this.options.packed && e == t.WIRE_TYPES.LDELIM || this.map && e == t.WIRE_TYPES.LDELIM;
            if (!o) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + e + " (" + this.type.wireType + " expected)");
            if (e == t.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !r) {
                s = i.readVarint32(), s = i.offset + s;
                for (var f = []; i.offset < s;) f.push(this.decode(this.type.wireType, i, !0));
                return f
            }
            if (this.map) {
                var a = l.defaultFieldValue(this.keyType);
                if (n = l.defaultFieldValue(this.type), s = i.readVarint32(), i.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + i.remaining());
                var h = i.clone();
                for (h.limit = h.offset + s, i.offset += s; h.remaining() > 0;) {
                    var u = h.readVarint32();
                    e = 7 & u;
                    var c = u >>> 3;
                    if (1 === c) a = this.keyElement.decode(h, e, c);
                    else {
                        if (2 !== c) throw Error("Unexpected tag in map field key/value submessage");
                        n = this.element.decode(h, e, c)
                    }
                }
                return [a, n]
            }
            return this.element.decode(i, e, this.id)
        }, s.Message.Field = d;
        var y = function(e, t, i, r, n, s, o) {
                d.call(this, e, t, i, null, r, n, s, o), this.extension
            };
        y.prototype = Object.create(d.prototype), s.Message.ExtensionField = y;
        var E = function(e, t, i) {
                o.call(this, e, t, i), this.fields = []
            };
        s.Message.OneOf = E;
        var w = function(e, t, i, r, n) {
                a.call(this, e, t, i, r, n), this.className = "Enum", this.object = null
            };
        w.getName = function(e, t) {
            for (var i, r = Object.keys(e), n = 0; n < r.length; ++n) if (e[i = r[n]] === t) return i;
            return null
        };
        var v = w.prototype = Object.create(a.prototype);
        v.build = function(e) {
            if (this.object && !e) return this.object;
            for (var i = new t.Builder.Enum, r = this.getChildren(w.Value), n = 0, s = r.length; s > n; ++n) i[r[n].name] = r[n].id;
            return Object.defineProperty && Object.defineProperty(i, "$options", {
                value: this.buildOpt(),
                enumerable: !1
            }), this.object = i
        }, s.Enum = w;
        var m = function(e, t, i, r) {
                o.call(this, e, t, i), this.className = "Enum.Value", this.id = r
            };
        m.prototype = Object.create(o.prototype), s.Enum.Value = m;
        var b = function(e, t, i, r) {
                o.call(this, e, t, i), this.field = r
            };
        b.prototype = Object.create(o.prototype), s.Extension = b;
        var T = function(e, t, i, r) {
                a.call(this, e, t, i, r), this.className = "Service", this.clazz = null
            },
            S = T.prototype = Object.create(a.prototype);
        S.build = function(i) {
            return this.clazz && !i ? this.clazz : this.clazz = function(t, i) {
                for (var r = function(e) {
                        t.Builder.Service.call(this), this.rpcImpl = e ||
                        function(e, t, i) {
                            setTimeout(i.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
                        }
                    }, n = r.prototype = Object.create(t.Builder.Service.prototype), s = i.getChildren(t.Reflect.Service.RPCMethod), o = 0; o < s.length; o++)!
                function(t) {
                    n[t.name] = function(r, n) {
                        try {
                            try {
                                r = t.resolvedRequestType.clazz.decode(e.wrap(r))
                            } catch (s) {
                                if (!(s instanceof TypeError)) throw s
                            }
                            if (null === r || "object" != typeof r) throw Error("Illegal arguments");
                            r instanceof t.resolvedRequestType.clazz || (r = new t.resolvedRequestType.clazz(r)), this.rpcImpl(t.fqn(), r, function(e, r) {
                                if (e) return void n(e);
                                null === r && (r = "");
                                try {
                                    r = t.resolvedResponseType.clazz.decode(r)
                                } catch (s) {}
                                return r && r instanceof t.resolvedResponseType.clazz ? void n(null, r) : void n(Error("Illegal response type received in service method " + i.name + "#" + t.name))
                            })
                        } catch (s) {
                            setTimeout(n.bind(this, s), 0)
                        }
                    }, r[t.name] = function(e, i, n) {
                        new r(e)[t.name](i, n)
                    }, Object.defineProperty && (Object.defineProperty(r[t.name], "$options", {
                        value: t.buildOpt()
                    }), Object.defineProperty(n[t.name], "$options", {
                        value: r[t.name].$options
                    }))
                }(s[o]);
                return Object.defineProperty && (Object.defineProperty(r, "$options", {
                    value: i.buildOpt()
                }), Object.defineProperty(n, "$options", {
                    value: r.$options
                }), Object.defineProperty(r, "$type", {
                    value: i
                }), Object.defineProperty(n, "$type", {
                    value: i
                })), r
            }(t, this)
        }, s.Service = T;
        var I = function(e, t, i, r) {
                o.call(this, e, t, i), this.className = "Service.Method", this.options = r || {}
            },
            P = I.prototype = Object.create(o.prototype);
        P.buildOpt = h.buildOpt, s.Service.Method = I;
        var R = function(e, t, i, r, n, s, o, f) {
                I.call(this, e, t, i, f), this.className = "Service.RPCMethod", this.requestName = r, this.responseName = n, this.requestStream = s, this.responseStream = o, this.resolvedRequestType = null, this.resolvedResponseType = null
            };
        return R.prototype = Object.create(I.prototype), s.Service.RPCMethod = R, s
    }(i), i.Builder = function(e, t, i) {
        "use strict";

        function r(e) {
            e.messages && e.messages.forEach(function(t) {
                t.syntax = e.syntax, r(t)
            }), e.enums && e.enums.forEach(function(t) {
                t.syntax = e.syntax
            })
        }
        var n = function(e) {
                this.ns = new i.Namespace(this, null, ""), this.ptr = this.ns, this.resolved = !1, this.result = null, this.files = {}, this.importRoot = null, this.options = e || {}
            },
            s = n.prototype;
        return n.isMessage = function(e) {
            return "string" != typeof e.name ? !1 : "undefined" != typeof e.values || "undefined" != typeof e.rpc ? !1 : !0
        }, n.isMessageField = function(e) {
            return "string" != typeof e.rule || "string" != typeof e.name || "string" != typeof e.type || "undefined" == typeof e.id ? !1 : !0
        }, n.isEnum = function(e) {
            return "string" != typeof e.name ? !1 : "undefined" != typeof e.values && Array.isArray(e.values) && 0 !== e.values.length ? !0 : !1
        }, n.isService = function(e) {
            return "string" == typeof e.name && "object" == typeof e.rpc && e.rpc ? !0 : !1
        }, n.isExtend = function(e) {
            return "string" != typeof e.ref ? !1 : !0
        }, s.reset = function() {
            return this.ptr = this.ns, this
        }, s.define = function(e) {
            if ("string" != typeof e || !t.TYPEREF.test(e)) throw Error("illegal namespace: " + e);
            return e.split(".").forEach(function(e) {
                var t = this.ptr.getChild(e);
                null === t && this.ptr.addChild(t = new i.Namespace(this, this.ptr, e)), this.ptr = t
            }, this), this
        }, s.create = function(t) {
            if (!t) return this;
            if (Array.isArray(t)) {
                if (0 === t.length) return this;
                t = t.slice()
            } else t = [t];
            for (var r = [t]; r.length > 0;) {
                if (t = r.pop(), !Array.isArray(t)) throw Error("not a valid namespace: " + JSON.stringify(t));
                for (; t.length > 0;) {
                    var s = t.shift();
                    if (n.isMessage(s)) {
                        var o = new i.Message(this, this.ptr, s.name, s.options, s.isGroup, s.syntax),
                            f = {};
                        s.oneofs && Object.keys(s.oneofs).forEach(function(e) {
                            o.addChild(f[e] = new i.Message.OneOf(this, o, e))
                        }, this), s.fields && s.fields.forEach(function(e) {
                            if (null !== o.getChild(0 | e.id)) throw Error("duplicate or invalid field id in " + o.name + ": " + e.id);
                            if (e.options && "object" != typeof e.options) throw Error("illegal field options in " + o.name + "#" + e.name);
                            var t = null;
                            if ("string" == typeof e.oneof && !(t = f[e.oneof])) throw Error("illegal oneof in " + o.name + "#" + e.name + ": " + e.oneof);
                            e = new i.Message.Field(this, o, e.rule, e.keytype, e.type, e.name, e.id, e.options, t, s.syntax), t && t.fields.push(e), o.addChild(e)
                        }, this);
                        var a = [];
                        if (s.enums && s.enums.forEach(function(e) {
                            a.push(e)
                        }), s.messages && s.messages.forEach(function(e) {
                            a.push(e)
                        }), s.services && s.services.forEach(function(e) {
                            a.push(e)
                        }), s.extensions && ("number" == typeof s.extensions[0] ? o.extensions = [s.extensions] : o.extensions = s.extensions), this.ptr.addChild(o), a.length > 0) {
                            r.push(t), t = a, a = null, this.ptr = o, o = null;
                            continue
                        }
                        a = null
                    } else if (n.isEnum(s)) o = new i.Enum(this, this.ptr, s.name, s.options, s.syntax), s.values.forEach(function(e) {
                        o.addChild(new i.Enum.Value(this, o, e.name, e.id))
                    }, this), this.ptr.addChild(o);
                    else if (n.isService(s)) o = new i.Service(this, this.ptr, s.name, s.options), Object.keys(s.rpc).forEach(function(e) {
                        var t = s.rpc[e];
                        o.addChild(new i.Service.RPCMethod(this, o, e, t.request, t.response, !! t.request_stream, !! t.response_stream, t.options))
                    }, this), this.ptr.addChild(o);
                    else {
                        if (!n.isExtend(s)) throw Error("not a valid definition: " + JSON.stringify(s));
                        if (o = this.ptr.resolve(s.ref, !0)) s.fields.forEach(function(t) {
                            if (null !== o.getChild(0 | t.id)) throw Error("duplicate extended field id in " + o.name + ": " + t.id);
                            if (o.extensions) {
                                var r = !1;
                                if (o.extensions.forEach(function(e) {
                                    t.id >= e[0] && t.id <= e[1] && (r = !0)
                                }), !r) throw Error("illegal extended field id in " + o.name + ": " + t.id + " (not within valid ranges)")
                            }
                            var n = t.name;
                            this.options.convertFieldsToCamelCase && (n = e.Util.toCamelCase(n));
                            var s = new i.Message.ExtensionField(this, o, t.rule, t.type, this.ptr.fqn() + "." + n, t.id, t.options),
                                f = new i.Extension(this, this.ptr, t.name, s);
                            s.extension = f, this.ptr.addChild(f), o.addChild(s)
                        }, this);
                        else if (!/\.?google\.protobuf\./.test(s.ref)) throw Error("extended message " + s.ref + " is not defined")
                    }
                    s = null, o = null
                }
                t = null, this.ptr = this.ptr.parent
            }
            return this.resolved = !1, this.result = null, this
        }, s["import"] = function(t, i) {
            var n = "/";
            if ("string" == typeof i) {
                if (e.Util.IS_NODE && (i = require("path").resolve(i)), this.files[i] === !0) return this.reset();
                this.files[i] = !0
            } else if ("object" == typeof i) {
                var s = i.root;
                e.Util.IS_NODE && (s = require("path").resolve(s)), (s.indexOf("\\") >= 0 || i.file.indexOf("\\") >= 0) && (n = "\\");
                var o = s + n + i.file;
                if (this.files[o] === !0) return this.reset();
                this.files[o] = !0
            }
            if (t.imports && t.imports.length > 0) {
                var f, a = !1;
                "object" == typeof i ? (this.importRoot = i.root, a = !0, f = this.importRoot, i = i.file, (f.indexOf("\\") >= 0 || i.indexOf("\\") >= 0) && (n = "\\")) : "string" == typeof i ? this.importRoot ? f = this.importRoot : i.indexOf("/") >= 0 ? (f = i.replace(/\/[^\/]*$/, ""), "" === f && (f = "/")) : i.indexOf("\\") >= 0 ? (f = i.replace(/\\[^\\]*$/, ""), n = "\\") : f = "." : f = null;
                for (var h = 0; h < t.imports.length; h++) if ("string" == typeof t.imports[h]) {
                    if (!f) throw Error("cannot determine import root");
                    var l = t.imports[h];
                    if ("google/protobuf/descriptor.proto" === l) continue;
                    if (l = f + n + l, this.files[l] === !0) continue;
                    /\.proto$/i.test(l) && !e.DotProto && (l = l.replace(/\.proto$/, ".json"));
                    var u = e.Util.fetch(l);
                    if (null === u) throw Error("failed to import '" + l + "' in '" + i + "': file not found");
                    /\.json$/i.test(l) ? this["import"](JSON.parse(u + ""), l) : this["import"](e.DotProto.Parser.parse(u), l)
                } else i ? /\.(\w+)$/.test(i) ? this["import"](t.imports[h], i.replace(/^(.+)\.(\w+)$/, function(e, t, i) {
                    return t + "_import" + h + "." + i
                })) : this["import"](t.imports[h], i + "_import" + h) : this["import"](t.imports[h]);
                a && (this.importRoot = null)
            }
            t["package"] && this.define(t["package"]), t.syntax && r(t);
            var c = this.ptr;
            return t.options && Object.keys(t.options).forEach(function(e) {
                c.options[e] = t.options[e]
            }), t.messages && (this.create(t.messages), this.ptr = c), t.enums && (this.create(t.enums), this.ptr = c), t.services && (this.create(t.services), this.ptr = c), t["extends"] && this.create(t["extends"]), this.reset()
        }, s.resolveAll = function() {
            var r;
            if (null == this.ptr || "object" == typeof this.ptr.type) return this;
            if (this.ptr instanceof i.Namespace) this.ptr.children.forEach(function(e) {
                this.ptr = e, this.resolveAll()
            }, this);
            else if (this.ptr instanceof i.Message.Field) {
                if (t.TYPE.test(this.ptr.type)) this.ptr.type = e.TYPES[this.ptr.type];
                else {
                    if (!t.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (r = (this.ptr instanceof i.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0), !r) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (this.ptr.resolvedType = r, r instanceof i.Enum) {
                        if (this.ptr.type = e.TYPES["enum"], "proto3" === this.ptr.syntax && "proto3" !== r.syntax) throw Error("proto3 message cannot reference proto2 enum")
                    } else {
                        if (!(r instanceof i.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.type = r.isGroup ? e.TYPES.group : e.TYPES.message
                    }
                }
                if (this.ptr.map) {
                    if (!t.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
                    this.ptr.keyType = e.TYPES[this.ptr.keyType]
                }
            } else if (this.ptr instanceof e.Reflect.Service.Method) {
                if (!(this.ptr instanceof e.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
                if (r = this.ptr.parent.resolve(this.ptr.requestName, !0), !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                if (this.ptr.resolvedRequestType = r, r = this.ptr.parent.resolve(this.ptr.responseName, !0), !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                this.ptr.resolvedResponseType = r
            } else if (!(this.ptr instanceof e.Reflect.Message.OneOf || this.ptr instanceof e.Reflect.Extension || this.ptr instanceof e.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
            return this.reset()
        }, s.build = function(e) {
            if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), null === this.result && (this.result = this.ns.build()), !e) return this.result;
            for (var t = "string" == typeof e ? e.split(".") : e, i = this.result, r = 0; r < t.length; r++) {
                if (!i[t[r]]) {
                    i = null;
                    break
                }
                i = i[t[r]]
            }
            return i
        }, s.lookup = function(e, t) {
            return e ? this.ns.resolve(e, t) : this.ns
        }, s.toString = function() {
            return "Builder"
        }, n.Message = function() {}, n.Enum = function() {}, n.Service = function() {}, n
    }(i, i.Lang, i.Reflect), i.Map = function(e, t) {
        "use strict";

        function i(e) {
            var t = 0;
            return {
                next: function() {
                    return t < e.length ? {
                        done: !1,
                        value: e[t++]
                    } : {
                        done: !0
                    }
                }
            }
        }
        var r = function(e, i) {
                if (!e.map) throw Error("field is not a map");
                if (this.field = e, this.keyElem = new t.Element(e.keyType, null, !0, e.syntax), this.valueElem = new t.Element(e.type, e.resolvedType, !1, e.syntax), this.map = {}, Object.defineProperty(this, "size", {
                    get: function() {
                        return Object.keys(this.map).length
                    }
                }), i) for (var r = Object.keys(i), n = 0; n < r.length; n++) {
                    var s = this.keyElem.valueFromString(r[n]),
                        o = this.valueElem.verifyValue(i[r[n]]);
                    this.map[this.keyElem.valueToString(s)] = {
                        key: s,
                        value: o
                    }
                }
            },
            n = r.prototype;
        return n.clear = function() {
            this.map = {}
        }, n["delete"] = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e)),
                i = t in this.map;
            return delete this.map[t], i
        }, n.entries = function() {
            for (var e, t = [], r = Object.keys(this.map), n = 0; n < r.length; n++) t.push([(e = this.map[r[n]]).key, e.value]);
            return i(t)
        }, n.keys = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].key);
            return i(e)
        }, n.values = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].value);
            return i(e)
        }, n.forEach = function(e, t) {
            for (var i, r = Object.keys(this.map), n = 0; n < r.length; n++) e.call(t, (i = this.map[r[n]]).value, i.key, this)
        }, n.set = function(e, t) {
            var i = this.keyElem.verifyValue(e),
                r = this.valueElem.verifyValue(t);
            return this.map[this.keyElem.valueToString(i)] = {
                key: i,
                value: r
            }, this
        }, n.get = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
            if (t in this.map) return this.map[t].value
        }, n.has = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
            return t in this.map
        }, r
    }(i, i.Reflect), i.loadProto = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, t = void 0), i.loadJson(i.DotProto.Parser.parse(e), t, r)
    }, i.protoFromString = i.loadProto, i.loadProtoFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) return void t(Error("Failed to fetch file"));
            try {
                t(null, i.loadProto(n, r, e))
            } catch (s) {
                t(s)
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadProto(n, r, e)
    }, i.protoFromFile = i.loadProtoFile, i.newBuilder = function(e) {
        return e = e || {}, "undefined" == typeof e.convertFieldsToCamelCase && (e.convertFieldsToCamelCase = i.convertFieldsToCamelCase), "undefined" == typeof e.populateAccessors && (e.populateAccessors = i.populateAccessors), new i.Builder(e)
    }, i.loadJson = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, t = null), t && "object" == typeof t || (t = i.newBuilder()), "string" == typeof e && (e = JSON.parse(e)), t["import"](e, r), t.resolveAll(), t
    }, i.loadJsonFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) return void t(Error("Failed to fetch file"));
            try {
                t(null, i.loadJson(JSON.parse(n), r, e))
            } catch (s) {
                t(s)
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadJson(JSON.parse(n), r, e)
    }, i
}), function(e, t) {
    "function" == typeof define && define.amd ? define(["bytebuffer"], t) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = t(require("bytebuffer"), !0) : (e.dcodeIO = e.dcodeIO || {}).ProtoBuf = t(e.dcodeIO.ByteBuffer)
}(this, function(e, t) {
    var i = {};
    return i.ByteBuffer = e, i.Long = e.Long || null, i.VERSION = "5.0.1", i.WIRE_TYPES = {}, i.WIRE_TYPES.VARINT = 0, i.WIRE_TYPES.BITS64 = 1, i.WIRE_TYPES.LDELIM = 2, i.WIRE_TYPES.STARTGROUP = 3, i.WIRE_TYPES.ENDGROUP = 4, i.WIRE_TYPES.BITS32 = 5, i.PACKABLE_WIRE_TYPES = [i.WIRE_TYPES.VARINT, i.WIRE_TYPES.BITS64, i.WIRE_TYPES.BITS32], i.TYPES = {
        int32: {
            name: "int32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        uint32: {
            name: "uint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        sint32: {
            name: "sint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        int64: {
            name: "int64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        uint64: {
            name: "uint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sint64: {
            name: "sint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        bool: {
            name: "bool",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: !1
        },
        "double": {
            name: "double",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: 0
        },
        string: {
            name: "string",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: ""
        },
        bytes: {
            name: "bytes",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        fixed32: {
            name: "fixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        sfixed32: {
            name: "sfixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        fixed64: {
            name: "fixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sfixed64: {
            name: "sfixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        "float": {
            name: "float",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "enum": {
            name: "enum",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        message: {
            name: "message",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        group: {
            name: "group",
            wireType: i.WIRE_TYPES.STARTGROUP,
            defaultValue: null
        }
    }, i.MAP_KEY_TYPES = [i.TYPES.int32, i.TYPES.sint32, i.TYPES.sfixed32, i.TYPES.uint32, i.TYPES.fixed32, i.TYPES.int64, i.TYPES.sint64, i.TYPES.sfixed64, i.TYPES.uint64, i.TYPES.fixed64, i.TYPES.bool, i.TYPES.string, i.TYPES.bytes], i.ID_MIN = 1, i.ID_MAX = 536870911, i.convertFieldsToCamelCase = !1, i.populateAccessors = !0, i.populateDefaults = !0, i.Util = function() {
        var e = {};
        return e.IS_NODE = !("object" != typeof process || "[object process]" != process + "" || process.browser), e.XHR = function() {
            for (var e = [function() {
                return new XMLHttpRequest
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }], t = null, i = 0; i < e.length; i++) {
                try {
                    t = e[i]()
                } catch (r) {
                    continue
                }
                break
            }
            if (!t) throw Error("XMLHttpRequest is not supported");
            return t
        }, e.fetch = function(t, i) {
            if (i && "function" != typeof i && (i = null), e.IS_NODE) {
                var r = require("fs");
                if (i) r.readFile(t, function(e, t) {
                    i(e ? null : "" + t)
                });
                else try {
                    return r.readFileSync(t)
                } catch (n) {
                    return null
                }
            } else {
                var s = e.XHR();
                if (s.open("GET", t, i ? !0 : !1), s.setRequestHeader("Accept", "text/plain"), "function" == typeof s.overrideMimeType && s.overrideMimeType("text/plain"), !i) return s.send(null), 200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null;
                s.onreadystatechange = function() {
                    4 == s.readyState && i(200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null)
                }, 4 != s.readyState && s.send(null)
            }
        }, e.toCamelCase = function(e) {
            return e.replace(/_([a-zA-Z])/g, function(e, t) {
                return t.toUpperCase()
            })
        }, e
    }(), i.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
    }, i.DotProto = function(e, t) {
        function i(e, i) {
            var r = -1,
                n = 1;
            if ("-" == e.charAt(0) && (n = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) r = parseInt(e);
            else if (t.NUMBER_HEX.test(e)) r = parseInt(e.substring(2), 16);
            else {
                if (!t.NUMBER_OCT.test(e)) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
                r = parseInt(e.substring(1), 8)
            }
            if (r = n * r | 0, !i && 0 > r) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
            return r
        }
        function r(e) {
            var i = 1;
            if ("-" == e.charAt(0) && (i = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) return i * parseInt(e, 10);
            if (t.NUMBER_HEX.test(e)) return i * parseInt(e.substring(2), 16);
            if (t.NUMBER_OCT.test(e)) return i * parseInt(e.substring(1), 8);
            if ("inf" === e) return 1 / 0 * i;
            if ("nan" === e) return 0 / 0;
            if (t.NUMBER_FLT.test(e)) return i * parseFloat(e);
            throw Error("illegal number value: " + (0 > i ? "-" : "") + e)
        }
        function n(e, t, i) {
            "undefined" == typeof e[t] ? e[t] = i : (Array.isArray(e[t]) || (e[t] = [e[t]]), e[t].push(i))
        }
        var s = {},
            o = function(e) {
                this.source = e + "", this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null
            },
            f = o.prototype;
        f._readString = function() {
            var e = '"' === this._stringOpen ? t.STRING_DQ : t.STRING_SQ;
            e.lastIndex = this.index - 1;
            var i = e.exec(this.source);
            if (!i) throw Error("unterminated string");
            return this.index = e.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, i[1]
        }, f.next = function() {
            if (0 < this.stack.length) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var e, i;
            do {
                for (e = !1; t.WHITESPACE.test(i = this.source.charAt(this.index));) if ("\n" === i && ++this.line, ++this.index === this.source.length) return null;
                if ("/" === this.source.charAt(this.index)) if (++this.index, "/" === this.source.charAt(this.index)) {
                    for (;
                    "\n" !== this.source.charAt(++this.index);) if (this.index == this.source.length) return null;
                    ++this.index, ++this.line, e = !0
                } else {
                    if ("*" !== (i = this.source.charAt(this.index))) return "/";
                    do {
                        if ("\n" === i && ++this.line, ++this.index === this.source.length) return null;
                        e = i, i = this.source.charAt(this.index)
                    } while ("*" !== e || "/" !== i);
                    ++this.index, e = !0
                }
            } while (e);
            if (this.index === this.source.length) return null;
            if (i = this.index, t.DELIM.lastIndex = 0, !t.DELIM.test(this.source.charAt(i++))) for (; i < this.source.length && !t.DELIM.test(this.source.charAt(i));)++i;
            return i = this.source.substring(this.index, this.index = i), ('"' === i || "'" === i) && (this._stringOpen = i), i
        }, f.peek = function() {
            if (0 === this.stack.length) {
                var e = this.next();
                if (null === e) return null;
                this.stack.push(e)
            }
            return this.stack[0]
        }, f.skip = function(e) {
            var t = this.next();
            if (t !== e) throw Error("illegal '" + t + "', '" + e + "' expected")
        }, f.omit = function(e) {
            return this.peek() === e ? (this.next(), !0) : !1
        }, f.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
        }, s.Tokenizer = o;
        var a = function(e) {
                this.tn = new o(e), this.proto3 = !1
            },
            f = a.prototype;
        return f.parse = function() {
            var e, i, r = {
                name: "[ROOT]",
                "package": null,
                messages: [],
                enums: [],
                imports: [],
                options: {},
                services: []
            },
                n = !0;
            try {
                for (; e = this.tn.next();) switch (e) {
                case "package":
                    if (!n || null !== r["package"]) throw Error("unexpected 'package'");
                    if (e = this.tn.next(), !t.TYPEREF.test(e)) throw Error("illegal package name: " + e);
                    this.tn.skip(";"), r["package"] = e;
                    break;
                case "import":
                    if (!n) throw Error("unexpected 'import'");
                    e = this.tn.peek(), ("public" === e || (i = "weak" === e)) && this.tn.next(), e = this._readString(), this.tn.skip(";"), i || r.imports.push(e);
                    break;
                case "syntax":
                    if (!n) throw Error("unexpected 'syntax'");
                    this.tn.skip("="), "proto3" === (r.syntax = this._readString()) && (this.proto3 = !0), this.tn.skip(";");
                    break;
                case "message":
                    this._parseMessage(r, null), n = !1;
                    break;
                case "enum":
                    this._parseEnum(r), n = !1;
                    break;
                case "option":
                    this._parseOption(r);
                    break;
                case "service":
                    this._parseService(r);
                    break;
                case "extend":
                    this._parseExtend(r);
                    break;
                default:
                    throw Error("unexpected '" + e + "'")
                }
            } catch (s) {
                throw s.message = "Parse error at line " + this.tn.line + ": " + s.message, s
            }
            return delete r.name, r
        }, a.parse = function(e) {
            return new a(e).parse()
        }, f._readString = function() {
            var e, t = "";
            do {
                if (e = this.tn.next(), "'" !== e && '"' !== e) throw Error("illegal string delimiter: " + e);
                t += this.tn.next(), this.tn.skip(e), e = this.tn.peek()
            } while ('"' === e || '"' === e);
            return t
        }, f._readValue = function(e) {
            var i = this.tn.peek();
            if ('"' === i || "'" === i) return this._readString();
            if (this.tn.next(), t.NUMBER.test(i)) return r(i);
            if (t.BOOL.test(i)) return "true" === i.toLowerCase();
            if (e && t.TYPEREF.test(i)) return i;
            throw Error("illegal value: " + i)
        }, f._parseOption = function(e, i) {
            var r = this.tn.next(),
                n = !1;
            if ("(" === r && (n = !0, r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal option name: " + r);
            var s = r;
            n && (this.tn.skip(")"), s = "(" + s + ")", r = this.tn.peek(), t.FQTYPEREF.test(r) && (s += r, this.tn.next())), this.tn.skip("="), this._parseOptionValue(e, s), i || this.tn.skip(";")
        }, f._parseOptionValue = function(e, i) {
            var r = this.tn.peek();
            if ("{" !== r) n(e.options, i, this._readValue(!0));
            else for (this.tn.skip("{");
            "}" !== (r = this.tn.next());) {
                if (!t.NAME.test(r)) throw Error("illegal option name: " + i + "." + r);
                this.tn.omit(":") ? n(e.options, i + "." + r, this._readValue(!0)) : this._parseOptionValue(e, i + "." + r)
            }
        }, f._parseService = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal service name at line " + this.tn.line + ": " + i);
            var r = {
                name: i,
                rpc: {},
                options: {}
            };
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) if ("option" === i) this._parseOption(r);
            else {
                if ("rpc" !== i) throw Error("illegal service token: " + i);
                this._parseServiceRPC(r)
            }
            this.tn.omit(";"), e.services.push(r)
        }, f._parseServiceRPC = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal rpc service method name: " + i);
            var r = i,
                n = {
                    request: null,
                    response: null,
                    request_stream: !1,
                    response_stream: !1,
                    options: {}
                };
            if (this.tn.skip("("), i = this.tn.next(), "stream" === i.toLowerCase() && (n.request_stream = !0, i = this.tn.next()), !t.TYPEREF.test(i)) throw Error("illegal rpc service request type: " + i);
            if (n.request = i, this.tn.skip(")"), i = this.tn.next(), "returns" !== i.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + i);
            if (this.tn.skip("("), i = this.tn.next(), "stream" === i.toLowerCase() && (n.response_stream = !0, i = this.tn.next()), n.response = i, this.tn.skip(")"), i = this.tn.peek(), "{" === i) {
                for (this.tn.next();
                "}" !== (i = this.tn.next());) {
                    if ("option" !== i) throw Error("illegal rpc service token: " + i);
                    this._parseOption(n)
                }
                this.tn.omit(";")
            } else this.tn.skip(";");
            "undefined" == typeof e.rpc && (e.rpc = {}), e.rpc[r] = n
        }, f._parseMessage = function(e, r) {
            var n = !! r,
                s = this.tn.next(),
                o = {
                    name: "",
                    fields: [],
                    enums: [],
                    messages: [],
                    options: {},
                    services: [],
                    oneofs: {}
                };
            if (!t.NAME.test(s)) throw Error("illegal " + (n ? "group" : "message") + " name: " + s);
            for (o.name = s, n && (this.tn.skip("="), r.id = i(this.tn.next()), o.isGroup = !0), s = this.tn.peek(), "[" === s && r && this._parseFieldOptions(r), this.tn.skip("{");
            "}" !== (s = this.tn.next());) if (t.RULE.test(s)) this._parseMessageField(o, s);
            else if ("oneof" === s) this._parseMessageOneOf(o);
            else if ("enum" === s) this._parseEnum(o);
            else if ("message" === s) this._parseMessage(o);
            else if ("option" === s) this._parseOption(o);
            else if ("service" === s) this._parseService(o);
            else if ("extensions" === s) o.hasOwnProperty("extensions") ? o.extensions = o.extensions.concat(this._parseExtensionRanges()) : o.extensions = this._parseExtensionRanges();
            else if ("reserved" === s) this._parseIgnored();
            else if ("extend" === s) this._parseExtend(o);
            else {
                if (!t.TYPEREF.test(s)) throw Error("illegal message token: " + s);
                if (!this.proto3) throw Error("illegal field rule: " + s);
                this._parseMessageField(o, "optional", s)
            }
            return this.tn.omit(";"), e.messages.push(o), o
        }, f._parseIgnored = function() {
            for (;
            ";" !== this.tn.peek();) this.tn.next();
            this.tn.skip(";")
        }, f._parseMessageField = function(e, r, n) {
            if (!t.RULE.test(r)) throw Error("illegal message field rule: " + r);
            var s = {
                rule: r,
                type: "",
                name: "",
                options: {},
                id: 0
            };
            if ("map" === r) {
                if (n) throw Error("illegal type: " + n);
                if (this.tn.skip("<"), r = this.tn.next(), !t.TYPE.test(r) && !t.TYPEREF.test(r)) throw Error("illegal message field type: " + r);
                if (s.keytype = r, this.tn.skip(","), r = this.tn.next(), !t.TYPE.test(r) && !t.TYPEREF.test(r)) throw Error("illegal message field: " + r);
                if (s.type = r, this.tn.skip(">"), r = this.tn.next(), !t.NAME.test(r)) throw Error("illegal message field name: " + r);
                s.name = r, this.tn.skip("="), s.id = i(this.tn.next()), r = this.tn.peek(), "[" === r && this._parseFieldOptions(s), this.tn.skip(";")
            } else if (n = "undefined" != typeof n ? n : this.tn.next(), "group" === n) {
                if (r = this._parseMessage(e, s), !/^[A-Z]/.test(r.name)) throw Error("illegal group name: " + r.name);
                s.type = r.name, s.name = r.name.toLowerCase(), this.tn.omit(";")
            } else {
                if (!t.TYPE.test(n) && !t.TYPEREF.test(n)) throw Error("illegal message field type: " + n);
                if (s.type = n, r = this.tn.next(), !t.NAME.test(r)) throw Error("illegal message field name: " + r);
                s.name = r, this.tn.skip("="), s.id = i(this.tn.next()), r = this.tn.peek(), "[" === r && this._parseFieldOptions(s), this.tn.skip(";")
            }
            return e.fields.push(s), s
        }, f._parseMessageOneOf = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal oneof name: " + i);
            var r = i,
                n = [];
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) i = this._parseMessageField(e, "optional", i), i.oneof = r, n.push(i.id);
            this.tn.omit(";"), e.oneofs[r] = n
        }, f._parseFieldOptions = function(e) {
            this.tn.skip("[");
            for (var t = !0;
            "]" !== this.tn.peek();) t || this.tn.skip(","), this._parseOption(e, !0), t = !1;
            this.tn.next()
        }, f._parseEnum = function(e) {
            var r = {
                name: "",
                values: [],
                options: {}
            },
                n = this.tn.next();
            if (!t.NAME.test(n)) throw Error("illegal name: " + n);
            for (r.name = n, this.tn.skip("{");
            "}" !== (n = this.tn.next());) if ("option" === n) this._parseOption(r);
            else {
                if (!t.NAME.test(n)) throw Error("illegal name: " + n);
                this.tn.skip("=");
                var s = {
                    name: n,
                    id: i(this.tn.next(), !0)
                },
                    n = this.tn.peek();
                "[" === n && this._parseFieldOptions({
                    options: {}
                }), this.tn.skip(";"), r.values.push(s)
            }
            this.tn.omit(";"), e.enums.push(r)
        }, f._parseExtensionRanges = function() {
            var t, i, n = [];
            do {
                for (i = [];;) {
                    switch (t = this.tn.next()) {
                    case "min":
                        t = e.ID_MIN;
                        break;
                    case "max":
                        t = e.ID_MAX;
                        break;
                    default:
                        t = r(t)
                    }
                    if (i.push(t), 2 === i.length) break;
                    if ("to" !== this.tn.peek()) {
                        i.push(t);
                        break
                    }
                    this.tn.next()
                }
                n.push(i)
            } while (this.tn.omit(","));
            return this.tn.skip(";"), n
        }, f._parseExtend = function(e) {
            var i = this.tn.next();
            if (!t.TYPEREF.test(i)) throw Error("illegal extend reference: " + i);
            var r = {
                ref: i,
                fields: []
            };
            for (this.tn.skip("{");
            "}" !== (i = this.tn.next());) if (t.RULE.test(i)) this._parseMessageField(r, i);
            else {
                if (!t.TYPEREF.test(i)) throw Error("illegal extend token: " + i);
                if (!this.proto3) throw Error("illegal field rule: " + i);
                this._parseMessageField(r, "optional", i)
            }
            return this.tn.omit(";"), e.messages.push(r), r
        }, f.toString = function() {
            return "Parser at line " + this.tn.line
        }, s.Parser = a, s
    }(i, i.Lang), i.Reflect = function(t) {
        function i(e, i) {
            if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low === e.low && e.high === e.high) return new t.Long(e.low, e.high, "undefined" == typeof i ? e.unsigned : i);
            if ("string" == typeof e) return t.Long.fromString(e, i || !1, 10);
            if ("number" == typeof e) return t.Long.fromNumber(e, i || !1);
            throw Error("not convertible to Long")
        }
        function r(e, i) {
            var n = i.readVarint32(),
                s = 7 & n,
                n = n >>> 3;
            switch (s) {
            case t.WIRE_TYPES.VARINT:
                do n = i.readUint8();
                while (128 === (128 & n));
                break;
            case t.WIRE_TYPES.BITS64:
                i.offset += 8;
                break;
            case t.WIRE_TYPES.LDELIM:
                n = i.readVarint32(), i.offset += n;
                break;
            case t.WIRE_TYPES.STARTGROUP:
                r(n, i);
                break;
            case t.WIRE_TYPES.ENDGROUP:
                if (n === e) return !1;
                throw Error("Illegal GROUPEND after unknown group: " + n + " (" + e + " expected)");
            case t.WIRE_TYPES.BITS32:
                i.offset += 4;
                break;
            default:
                throw Error("Illegal wire type in unknown group " + e + ": " + s)
            }
            return !0
        }
        var n = {},
            s = function(e, t, i) {
                this.builder = e, this.parent = t, this.name = i
            },
            o = s.prototype;
        o.fqn = function() {
            for (var e = this.name, t = this;;) {
                if (t = t.parent, null == t) break;
                e = t.name + "." + e
            }
            return e
        }, o.toString = function(e) {
            return (e ? this.className + " " : "") + this.fqn()
        }, o.build = function() {
            throw Error(this.toString(!0) + " cannot be built directly")
        }, n.T = s;
        var f = function(e, t, i, r, n) {
                s.call(this, e, t, i), this.className = "Namespace", this.children = [], this.options = r || {}, this.syntax = n || "proto2"
            },
            o = f.prototype = Object.create(s.prototype);
        o.getChildren = function(e) {
            if (e = e || null, null == e) return this.children.slice();
            for (var t = [], i = 0, r = this.children.length; r > i; ++i) this.children[i] instanceof e && t.push(this.children[i]);
            return t
        }, o.addChild = function(e) {
            var t;
            if (t = this.getChild(e.name)) if (t instanceof l.Field && t.name !== t.originalName && null === this.getChild(t.originalName)) t.name = t.originalName;
            else {
                if (!(e instanceof l.Field && e.name !== e.originalName && null === this.getChild(e.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);
                e.name = e.originalName
            }
            this.children.push(e)
        }, o.getChild = function(e) {
            for (var t = "number" == typeof e ? "id" : "name", i = 0, r = this.children.length; r > i; ++i) if (this.children[i][t] === e) return this.children[i];
            return null
        }, o.resolve = function(e, t) {
            var i = "string" == typeof e ? e.split(".") : e,
                r = this,
                s = 0;
            if ("" === i[s]) {
                for (; null !== r.parent;) r = r.parent;
                s++
            }
            do {
                do {
                    if (!(r instanceof n.Namespace)) {
                        r = null;
                        break
                    }
                    if (r = r.getChild(i[s]), !(r && r instanceof n.T) || t && !(r instanceof n.Namespace)) {
                        r = null;
                        break
                    }
                    s++
                } while (s < i.length);
                if (null != r) break;
                if (null !== this.parent) return this.parent.resolve(e, t)
            } while (null != r);
            return r
        }, o.qn = function(e) {
            var t = [],
                i = e;
            do t.unshift(i.name), i = i.parent;
            while (null !== i);
            for (i = 1; i <= t.length; i++) {
                var r = t.slice(t.length - i);
                if (e === this.resolve(r, e instanceof n.Namespace)) return r.join(".")
            }
            return e.fqn()
        }, o.build = function() {
            for (var e, t = {}, i = this.children, r = 0, n = i.length; n > r; ++r) e = i[r], e instanceof f && (t[e.name] = e.build());
            return Object.defineProperty && Object.defineProperty(t, "$options", {
                value: this.buildOpt()
            }), t
        }, o.buildOpt = function() {
            for (var e = {}, t = Object.keys(this.options), i = 0, r = t.length; r > i; ++i) e[t[i]] = this.options[t[i]];
            return e
        }, o.getOption = function(e) {
            return "undefined" == typeof e ? this.options : "undefined" != typeof this.options[e] ? this.options[e] : null
        }, n.Namespace = f;
        var a = function(e, i, r, n, s) {
                if (this.type = e, this.resolvedType = i, this.isMapKey = r, this.syntax = n, this.name = s, r && 0 > t.MAP_KEY_TYPES.indexOf(e)) throw Error("Invalid map key type: " + e.name)
            },
            h = a.prototype;
        a.defaultFieldValue = function(i) {
            if ("string" == typeof i && (i = t.TYPES[i]), "undefined" == typeof i.defaultValue) throw Error("default value for type " + i.name + " is not supported");
            return i == t.TYPES.bytes ? new e(0) : i.defaultValue
        }, h.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element"
        }, h.verifyValue = function(r) {
            function n(e, t) {
                throw Error("Illegal value for " + s.toString(!0) + " of type " + s.type.name + ": " + e + " (" + t + ")")
            }
            var s = this;
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
                return ("number" != typeof r || r === r && 0 !== r % 1) && n(typeof r, "not an integer"), r > 4294967295 ? 0 | r : r;
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return ("number" != typeof r || r === r && 0 !== r % 1) && n(typeof r, "not an integer"), 0 > r ? r >>> 0 : r;
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
                if (t.Long) try {
                    return i(r, !1)
                } catch (o) {
                    n(typeof r, o.message)
                } else n(typeof r, "requires Long.js");
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                if (t.Long) try {
                    return i(r, !0)
                } catch (f) {
                    n(typeof r, f.message)
                } else n(typeof r, "requires Long.js");
            case t.TYPES.bool:
                return "boolean" != typeof r && n(typeof r, "not a boolean"), r;
            case t.TYPES["float"]:
            case t.TYPES["double"]:
                return "number" != typeof r && n(typeof r, "not a number"), r;
            case t.TYPES.string:
                return "string" == typeof r || r && r instanceof String || n(typeof r, "not a string"), "" + r;
            case t.TYPES.bytes:
                return e.isByteBuffer(r) ? r : e.wrap(r, "base64");
            case t.TYPES["enum"]:
                for (var a = this.resolvedType.getChildren(t.Reflect.Enum.Value), h = 0; h < a.length; h++) if (a[h].name == r || a[h].id == r) return a[h].id;
                if ("proto3" === this.syntax) return ("number" != typeof r || r === r && 0 !== r % 1) && n(typeof r, "not an integer"), (r > 4294967295 || 0 > r) && n(typeof r, "not in range for uint32"), r;
                n(r, "not a valid enum value");
            case t.TYPES.group:
            case t.TYPES.message:
                if (r && "object" == typeof r || n(typeof r, "object expected"), r instanceof this.resolvedType.clazz) return r;
                if (r instanceof t.Builder.Message) {
                    var h, a = {};
                    for (h in r) r.hasOwnProperty(h) && (a[h] = r[h]);
                    r = a
                }
                return new this.resolvedType.clazz(r)
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + r + " (undefined type " + this.type + ")")
        }, h.calculateLength = function(i, r) {
            if (null === r) return 0;
            var n;
            switch (this.type) {
            case t.TYPES.int32:
                return 0 > r ? e.calculateVarint64(r) : e.calculateVarint32(r);
            case t.TYPES.uint32:
                return e.calculateVarint32(r);
            case t.TYPES.sint32:
                return e.calculateVarint32(e.zigZagEncode32(r));
            case t.TYPES.fixed32:
            case t.TYPES.sfixed32:
            case t.TYPES["float"]:
                return 4;
            case t.TYPES.int64:
            case t.TYPES.uint64:
                return e.calculateVarint64(r);
            case t.TYPES.sint64:
                return e.calculateVarint64(e.zigZagEncode64(r));
            case t.TYPES.fixed64:
            case t.TYPES.sfixed64:
                return 8;
            case t.TYPES.bool:
                return 1;
            case t.TYPES["enum"]:
                return e.calculateVarint32(r);
            case t.TYPES["double"]:
                return 8;
            case t.TYPES.string:
                return n = e.calculateUTF8Bytes(r), e.calculateVarint32(n) + n;
            case t.TYPES.bytes:
                if (0 > r.remaining()) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                return e.calculateVarint32(r.remaining()) + r.remaining();
            case t.TYPES.message:
                return n = this.resolvedType.calculate(r), e.calculateVarint32(n) + n;
            case t.TYPES.group:
                return n = this.resolvedType.calculate(r), n + e.calculateVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP)
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)")
        }, h.encodeValue = function(i, r, n) {
            if (null === r) return n;
            switch (this.type) {
            case t.TYPES.int32:
                0 > r ? n.writeVarint64(r) : n.writeVarint32(r);
                break;
            case t.TYPES.uint32:
                n.writeVarint32(r);
                break;
            case t.TYPES.sint32:
                n.writeVarint32ZigZag(r);
                break;
            case t.TYPES.fixed32:
                n.writeUint32(r);
                break;
            case t.TYPES.sfixed32:
                n.writeInt32(r);
                break;
            case t.TYPES.int64:
            case t.TYPES.uint64:
                n.writeVarint64(r);
                break;
            case t.TYPES.sint64:
                n.writeVarint64ZigZag(r);
                break;
            case t.TYPES.fixed64:
                n.writeUint64(r);
                break;
            case t.TYPES.sfixed64:
                n.writeInt64(r);
                break;
            case t.TYPES.bool:
                "string" == typeof r ? n.writeVarint32("false" === r.toLowerCase() ? 0 : !! r) : n.writeVarint32(r ? 1 : 0);
                break;
            case t.TYPES["enum"]:
                n.writeVarint32(r);
                break;
            case t.TYPES["float"]:
                n.writeFloat32(r);
                break;
            case t.TYPES["double"]:
                n.writeFloat64(r);
                break;
            case t.TYPES.string:
                n.writeVString(r);
                break;
            case t.TYPES.bytes:
                if (0 > r.remaining()) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                i = r.offset, n.writeVarint32(r.remaining()), n.append(r), r.offset = i;
                break;
            case t.TYPES.message:
                i = (new e).LE(), this.resolvedType.encode(r, i), n.writeVarint32(i.offset), n.append(i.flip());
                break;
            case t.TYPES.group:
                this.resolvedType.encode(r, n), n.writeVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP);
                break;
            default:
                throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)")
            }
            return n
        }, h.decode = function(e, i, r) {
            if (i != this.type.wireType) throw Error("Unexpected wire type for element");
            switch (this.type) {
            case t.TYPES.int32:
                return 0 | e.readVarint32();
            case t.TYPES.uint32:
                return e.readVarint32() >>> 0;
            case t.TYPES.sint32:
                return 0 | e.readVarint32ZigZag();
            case t.TYPES.fixed32:
                return e.readUint32() >>> 0;
            case t.TYPES.sfixed32:
                return 0 | e.readInt32();
            case t.TYPES.int64:
                return e.readVarint64();
            case t.TYPES.uint64:
                return e.readVarint64().toUnsigned();
            case t.TYPES.sint64:
                return e.readVarint64ZigZag();
            case t.TYPES.fixed64:
                return e.readUint64();
            case t.TYPES.sfixed64:
                return e.readInt64();
            case t.TYPES.bool:
                return !!e.readVarint32();
            case t.TYPES["enum"]:
                return e.readVarint32();
            case t.TYPES["float"]:
                return e.readFloat();
            case t.TYPES["double"]:
                return e.readDouble();
            case t.TYPES.string:
                return e.readVString();
            case t.TYPES.bytes:
                if (r = e.readVarint32(), e.remaining() < r) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + r + " required but got only " + e.remaining());
                return i = e.clone(), i.limit = i.offset + r, e.offset += r, i;
            case t.TYPES.message:
                return r = e.readVarint32(), this.resolvedType.decode(e, r);
            case t.TYPES.group:
                return this.resolvedType.decode(e, -1, r)
            }
            throw Error("[INTERNAL] Illegal decode type")
        }, h.valueFromString = function(i) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return this.verifyValue(parseInt(i));
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                return this.verifyValue(i);
            case t.TYPES.bool:
                return "true" === i;
            case t.TYPES.string:
                return this.verifyValue(i);
            case t.TYPES.bytes:
                return e.fromBinary(i)
            }
        }, h.valueToString = function(e) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === t.TYPES.bytes ? e.toString("binary") : e.toString()
        }, n.Element = a;
        var l = function(e, t, i, r, n, s) {
                f.call(this, e, t, i, r, s), this.className = "Message", this.extensions = void 0, this.clazz = null, this.isGroup = !! n, this._fieldsByName = this._fieldsById = this._fields = null
            },
            h = l.prototype = Object.create(f.prototype);
        h.build = function(i) {
            if (this.clazz && !i) return this.clazz;
            i = function(t, i) {
                function r(i, n, s, o) {
                    if (null === i || "object" != typeof i) {
                        if (o && o instanceof t.Reflect.Enum) {
                            var f = t.Reflect.Enum.getName(o.object, i);
                            if (null !== f) return f
                        }
                        return i
                    }
                    if (e.isByteBuffer(i)) return n ? i.toBase64() : i.toBuffer();
                    if (t.Long.isLong(i)) return s ? i.toString() : t.Long.fromValue(i);
                    var a;
                    if (Array.isArray(i)) return a = [], i.forEach(function(e, t) {
                        a[t] = r(e, n, s, o)
                    }), a;
                    if (a = {}, i instanceof t.Map) {
                        for (var f = i.entries(), h = f.next(); !h.done; h = f.next()) a[i.keyElem.valueToString(h.value[0])] = r(h.value[1], n, s, i.valueElem.resolvedType);
                        return a
                    }
                    var l, f = i.$type,
                        h = void 0;
                    for (l in i) i.hasOwnProperty(l) && (f && (h = f.getChild(l)) ? a[l] = r(i[l], n, s, h.resolvedType) : a[l] = r(i[l], n, s));
                    return a
                }
                var n = i.getChildren(t.Reflect.Message.Field),
                    s = i.getChildren(t.Reflect.Message.OneOf),
                    o = function(r, f) {
                        t.Builder.Message.call(this);
                        for (var a = 0, h = s.length; h > a; ++a) this[s[a].name] = null;
                        for (a = 0, h = n.length; h > a; ++a) {
                            var l = n[a];
                            this[l.name] = l.repeated ? [] : l.map ? new t.Map(l) : null, !l.required && "proto3" !== i.syntax || null === l.defaultValue || (this[l.name] = l.defaultValue)
                        }
                        if (0 < arguments.length) if (1 !== arguments.length || null === r || "object" != typeof r || !("function" != typeof r.encode || r instanceof o) || Array.isArray(r) || r instanceof t.Map || e.isByteBuffer(r) || r instanceof ArrayBuffer || t.Long && r instanceof t.Long) for (a = 0, h = arguments.length; h > a; ++a)"undefined" != typeof(l = arguments[a]) && this.$set(n[a].name, l);
                        else this.$set(r)
                    },
                    f = o.prototype = Object.create(t.Builder.Message.prototype);
                f.add = function(e, r, n) {
                    var s = i._fieldsByName[e];
                    if (!n) {
                        if (!s) throw Error(this + "#" + e + " is undefined");
                        if (!(s instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + s.toString(!0));
                        if (!s.repeated) throw Error(this + "#" + e + " is not a repeated field");
                        r = s.verifyValue(r, !0)
                    }
                    return null === this[e] && (this[e] = []), this[e].push(r), this
                }, f.$add = f.add, f.set = function(e, r, n) {
                    if (e && "object" == typeof e) {
                        n = r;
                        for (var s in e) e.hasOwnProperty(s) && "undefined" != typeof(r = e[s]) && this.$set(s, r, n);
                        return this
                    }
                    if (s = i._fieldsByName[e], n) this[e] = r;
                    else {
                        if (!s) throw Error(this + "#" + e + " is not a field: undefined");
                        if (!(s instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + s.toString(!0));
                        this[s.name] = r = s.verifyValue(r)
                    }
                    return s && s.oneof && (n = this[s.oneof.name], null !== r ? (null !== n && n !== s.name && (this[n] = null), this[s.oneof.name] = s.name) : n === e && (this[s.oneof.name] = null)), this
                }, f.$set = f.set, f.get = function(e, r) {
                    if (r) return this[e];
                    var n = i._fieldsByName[e];
                    if (!(n && n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: undefined");
                    if (!(n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + n.toString(!0));
                    return this[n.name]
                }, f.$get = f.get;
                for (var a = 0; a < n.length; a++) {
                    var h = n[a];
                    h instanceof t.Reflect.Message.ExtensionField || i.builder.options.populateAccessors &&
                    function(e) {
                        var t = e.originalName.replace(/(_[a-zA-Z])/g, function(e) {
                            return e.toUpperCase().replace("_", "")
                        }),
                            t = t.substring(0, 1).toUpperCase() + t.substring(1),
                            r = e.originalName.replace(/([A-Z])/g, function(e) {
                                return "_" + e
                            }),
                            n = function(t, i) {
                                return this[e.name] = i ? t : e.verifyValue(t), this
                            },
                            s = function() {
                                return this[e.name]
                            };
                        null === i.getChild("set" + t) && (f["set" + t] = n), null === i.getChild("set_" + r) && (f["set_" + r] = n), null === i.getChild("get" + t) && (f["get" + t] = s), null === i.getChild("get_" + r) && (f["get_" + r] = s)
                    }(h)
                }
                return f.encode = function(t, r) {
                    "boolean" == typeof t && (r = t, t = void 0);
                    var n = !1;
                    t || (t = new e, n = !0);
                    var s = t.littleEndian;
                    try {
                        return i.encode(this, t.LE(), r), (n ? t.flip() : t).LE(s)
                    } catch (o) {
                        throw t.LE(s), o
                    }
                }, o.encode = function(e, t, i) {
                    return new o(e).encode(t, i)
                }, f.calculate = function() {
                    return i.calculate(this)
                }, f.encodeDelimited = function(t, r) {
                    var n = !1;
                    t || (t = new e, n = !0);
                    var s = (new e).LE();
                    return i.encode(this, s, r).flip(), t.writeVarint32(s.remaining()), t.append(s), n ? t.flip() : t
                }, f.encodeAB = function() {
                    try {
                        return this.encode().toArrayBuffer()
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()), e
                    }
                }, f.toArrayBuffer = f.encodeAB, f.encodeNB = function() {
                    try {
                        return this.encode().toBuffer()
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toBuffer()), e
                    }
                }, f.toBuffer = f.encodeNB, f.encode64 = function() {
                    try {
                        return this.encode().toBase64()
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toBase64()), e
                    }
                }, f.toBase64 = f.encode64, f.encodeHex = function() {
                    try {
                        return this.encode().toHex()
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toHex()), e
                    }
                }, f.toHex = f.encodeHex, f.toRaw = function(e, t) {
                    return r(this, !! e, !! t, this.$type)
                }, f.encodeJSON = function() {
                    return JSON.stringify(r(this, !0, !0, this.$type))
                }, o.decode = function(t, r, n) {
                    "string" == typeof r && (n = r, r = -1), "string" == typeof t ? t = e.wrap(t, n ? n : "base64") : e.isByteBuffer(t) || (t = e.wrap(t)), n = t.littleEndian;
                    try {
                        var s = i.decode(t.LE(), r);
                        return t.LE(n), s
                    } catch (o) {
                        throw t.LE(n), o
                    }
                }, o.decodeDelimited = function(t, r) {
                    if ("string" == typeof t ? t = e.wrap(t, r ? r : "base64") : e.isByteBuffer(t) || (t = e.wrap(t)), 1 > t.remaining()) return null;
                    var n = t.offset,
                        s = t.readVarint32();
                    if (t.remaining() < s) return t.offset = n, null;
                    try {
                        var o = i.decode(t.slice(t.offset, t.offset + s).LE());
                        return t.offset += s, o
                    } catch (f) {
                        throw t.offset += s, f
                    }
                }, o.decode64 = function(e) {
                    return o.decode(e, "base64")
                }, o.decodeHex = function(e) {
                    return o.decode(e, "hex")
                }, o.decodeJSON = function(e) {
                    return new o(JSON.parse(e))
                }, f.toString = function() {
                    return i.toString()
                }, Object.defineProperty && (Object.defineProperty(o, "$options", {
                    value: i.buildOpt()
                }), Object.defineProperty(f, "$options", {
                    value: o.$options
                }), Object.defineProperty(o, "$type", {
                    value: i
                }), Object.defineProperty(f, "$type", {
                    value: i
                })), o
            }(t, this), this._fields = [], this._fieldsById = {}, this._fieldsByName = {};
            for (var r, n = 0, s = this.children.length; s > n; n++) if (r = this.children[n], r instanceof c || r instanceof l || r instanceof d) {
                if (i.hasOwnProperty(r.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + r.toString(!0) + " cannot override static property '" + r.name + "'");
                i[r.name] = r.build()
            } else if (r instanceof l.Field) r.build(), this._fields.push(r), this._fieldsById[r.id] = r, this._fieldsByName[r.name] = r;
            else if (!(r instanceof l.OneOf || r instanceof p)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[n].toString(!0));
            return this.clazz = i
        }, h.encode = function(e, t, i) {
            for (var r, n, s = null, o = 0, f = this._fields.length; f > o; ++o) r = this._fields[o], n = e[r.name], r.required && null === n ? null === s && (s = r) : r.encode(i ? n : r.verifyValue(n), t, e);
            if (null !== s) throw e = Error("Missing at least one required field for " + this.toString(!0) + ": " + s), e.encoded = t, e;
            return t
        }, h.calculate = function(e) {
            for (var t, i, r = 0, n = 0, s = this._fields.length; s > n; ++n) {
                if (t = this._fields[n], i = e[t.name], t.required && null === i) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + t);
                r += t.calculate(i, e)
            }
            return r
        }, h.decode = function(e, i, n) {
            "number" != typeof i && (i = -1);
            for (var s, o, f, a = e.offset, h = new this.clazz; e.offset < a + i || -1 === i && 0 < e.remaining();) {
                if (s = e.readVarint32(), o = 7 & s, f = s >>> 3, o === t.WIRE_TYPES.ENDGROUP) {
                    if (f !== n) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + f + " (" + (n ? n + " expected" : "not a group") + ")");
                    break
                }
                if (s = this._fieldsById[f]) s.repeated && !s.options.packed ? h[s.name].push(s.decode(o, e)) : s.map ? (o = s.decode(o, e), h[s.name].set(o[0], o[1])) : (h[s.name] = s.decode(o, e), s.oneof && (o = h[s.oneof.name], null !== o && o !== s.name && (h[o] = null), h[s.oneof.name] = s.name));
                else switch (o) {
                case t.WIRE_TYPES.VARINT:
                    e.readVarint32();
                    break;
                case t.WIRE_TYPES.BITS32:
                    e.offset += 4;
                    break;
                case t.WIRE_TYPES.BITS64:
                    e.offset += 8;
                    break;
                case t.WIRE_TYPES.LDELIM:
                    s = e.readVarint32(), e.offset += s;
                    break;
                case t.WIRE_TYPES.STARTGROUP:
                    for (; r(f, e););
                    break;
                default:
                    throw Error("Illegal wire type for unknown field " + f + " in " + this.toString(!0) + "#decode: " + o)
                }
            }
            for (e = 0, i = this._fields.length; i > e; ++e) if (s = this._fields[e], null === h[s.name]) if ("proto3" === this.syntax) h[s.name] = s.defaultValue;
            else {
                if (s.required) throw e = Error("Missing at least one required field for " + this.toString(!0) + ": " + s.name), e.decoded = h, e;
                t.populateDefaults && null !== s.defaultValue && (h[s.name] = s.defaultValue)
            }
            return h
        }, n.Message = l;
        var u = function(e, i, r, n, o, f, a, h, u, c) {
                s.call(this, e, i, f), this.className = "Message.Field", this.required = "required" === r, this.repeated = "repeated" === r, this.map = "map" === r, this.keyType = n || null, this.type = o, this.resolvedType = null, this.id = a, this.options = h || {}, this.defaultValue = null, this.oneof = u || null, this.syntax = c || "proto2", this.originalName = this.name, this.keyElement = this.element = null, !this.builder.options.convertFieldsToCamelCase || this instanceof l.ExtensionField || (this.name = t.Util.toCamelCase(this.name))
            },
            h = u.prototype = Object.create(s.prototype);
        h.build = function() {
            this.element = new a(this.type, this.resolvedType, !1, this.syntax, this.name), this.map && (this.keyElement = new a(this.keyType, void 0, !0, this.syntax, this.name)), "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = a.defaultFieldValue(this.type)
        }, h.verifyValue = function(e, i) {
            function r(e, t) {
                throw Error("Illegal value for " + n.toString(!0) + " of type " + n.type.name + ": " + e + " (" + t + ")")
            }
            i = i || !1;
            var n = this;
            if (null === e) return this.required && r(typeof e, "required"), "proto3" === this.syntax && this.type !== t.TYPES.message && r(typeof e, "proto3 field without field presence cannot be null"), null;
            var s;
            if (this.repeated && !i) {
                Array.isArray(e) || (e = [e]);
                var o = [];
                for (s = 0; s < e.length; s++) o.push(this.element.verifyValue(e[s]));
                return o
            }
            return this.map && !i ? e instanceof t.Map ? e : (e instanceof Object || r(typeof e, "expected ProtoBuf.Map or raw object for map field"), new t.Map(this, e)) : (!this.repeated && Array.isArray(e) && r(typeof e, "no array expected"), this.element.verifyValue(e))
        }, h.hasWirePresence = function(e, i) {
            if ("proto3" !== this.syntax) return null !== e;
            if (this.oneof && i[this.oneof.name] === this.name) return !0;
            switch (this.type) {
            case t.TYPES.int32:
            case t.TYPES.sint32:
            case t.TYPES.sfixed32:
            case t.TYPES.uint32:
            case t.TYPES.fixed32:
                return 0 !== e;
            case t.TYPES.int64:
            case t.TYPES.sint64:
            case t.TYPES.sfixed64:
            case t.TYPES.uint64:
            case t.TYPES.fixed64:
                return 0 !== e.low || 0 !== e.high;
            case t.TYPES.bool:
                return e;
            case t.TYPES["float"]:
            case t.TYPES["double"]:
                return 0 !== e;
            case t.TYPES.string:
                return 0 < e.length;
            case t.TYPES.bytes:
                return 0 < e.remaining();
            case t.TYPES["enum"]:
                return 0 !== e;
            case t.TYPES.message:
                return null !== e;
            default:
                return !0
            }
        }, h.encode = function(i, r, n) {
            if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return r;
            try {
                if (this.repeated) {
                    var s;
                    if (this.options.packed && 0 <= t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                        r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.ensureCapacity(r.offset += 1);
                        var o = r.offset;
                        for (s = 0; s < i.length; s++) this.element.encodeValue(this.id, i[s], r);
                        var f = r.offset - o,
                            a = e.calculateVarint32(f);
                        if (a > 1) {
                            var h = r.slice(o, r.offset),
                                o = o + (a - 1);
                            r.offset = o, r.append(h)
                        }
                        r.writeVarint32(f, o - a)
                    } else for (s = 0; s < i.length; s++) r.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, i[s], r)
                } else this.map ? i.forEach(function(i, n, s) {
                    s = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, n) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i), r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.writeVarint32(s), r.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, n, r), r.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, i, r)
                }, this) : this.hasWirePresence(i, n) && (r.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, i, r))
            } catch (l) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + l + ")")
            }
            return r
        }, h.calculate = function(i, r) {
            if (i = this.verifyValue(i), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return 0;
            var n = 0;
            try {
                if (this.repeated) {
                    var s, o;
                    if (this.options.packed && 0 <= t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
                        for (n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), s = o = 0; s < i.length; s++) o += this.element.calculateLength(this.id, i[s]);
                        n += e.calculateVarint32(o), n += o
                    } else for (s = 0; s < i.length; s++) n += e.calculateVarint32(this.id << 3 | this.type.wireType), n += this.element.calculateLength(this.id, i[s])
                } else this.map ? i.forEach(function(i, r, s) {
                    i = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, r) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i), n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), n += e.calculateVarint32(i), n += i
                }, this) : this.hasWirePresence(i, r) && (n += e.calculateVarint32(this.id << 3 | this.type.wireType), n += this.element.calculateLength(this.id, i))
            } catch (f) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + f + ")")
            }
            return n
        }, h.decode = function(e, i, r) {
            if (!(!this.map && e == this.type.wireType || !r && this.repeated && this.options.packed && e == t.WIRE_TYPES.LDELIM || this.map && e == t.WIRE_TYPES.LDELIM)) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + e + " (" + this.type.wireType + " expected)");
            if (e == t.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && 0 <= t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) && !r) {
                for (e = i.readVarint32(), e = i.offset + e, r = []; i.offset < e;) r.push(this.decode(this.type.wireType, i, !0));
                return r
            }
            if (this.map) {
                var n = a.defaultFieldValue(this.keyType);
                if (r = a.defaultFieldValue(this.type), e = i.readVarint32(), i.remaining() < e) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + e + " required but got only " + i.remaining());
                var s = i.clone();
                for (s.limit = s.offset + e, i.offset += e; 0 < s.remaining();) if (i = s.readVarint32(), e = 7 & i, i >>>= 3, 1 === i) n = this.keyElement.decode(s, e, i);
                else {
                    if (2 !== i) throw Error("Unexpected tag in map field key/value submessage");
                    r = this.element.decode(s, e, i)
                }
                return [n, r]
            }
            return this.element.decode(i, e, this.id)
        }, n.Message.Field = u, h = function(e, t, i, r, n, s, o) {
            u.call(this, e, t, i, null, r, n, s, o)
        }, h.prototype = Object.create(u.prototype), n.Message.ExtensionField = h, n.Message.OneOf = function(e, t, i) {
            s.call(this, e, t, i), this.fields = []
        };
        var c = function(e, t, i, r, n) {
                f.call(this, e, t, i, r, n), this.className = "Enum", this.object = null
            };
        c.getName = function(e, t) {
            for (var i, r = Object.keys(e), n = 0; n < r.length; ++n) if (e[i = r[n]] === t) return i;
            return null
        }, (c.prototype = Object.create(f.prototype)).build = function(e) {
            if (this.object && !e) return this.object;
            e = new t.Builder.Enum;
            for (var i = this.getChildren(c.Value), r = 0, n = i.length; n > r; ++r) e[i[r].name] = i[r].id;
            return Object.defineProperty && Object.defineProperty(e, "$options", {
                value: this.buildOpt(),
                enumerable: !1
            }), this.object = e
        }, n.Enum = c, h = function(e, t, i, r) {
            s.call(this, e, t, i), this.className = "Enum.Value", this.id = r
        }, h.prototype = Object.create(s.prototype), n.Enum.Value = h;
        var p = function(e, t, i, r) {
                s.call(this, e, t, i), this.field = r
            };
        p.prototype = Object.create(s.prototype), n.Extension = p;
        var d = function(e, t, i, r) {
                f.call(this, e, t, i, r), this.className = "Service", this.clazz = null
            };
        (d.prototype = Object.create(f.prototype)).build = function(i) {
            return this.clazz && !i ? this.clazz : this.clazz = function(t, i) {
                for (var r = function(e) {
                        t.Builder.Service.call(this), this.rpcImpl = e ||
                        function(e, t, i) {
                            setTimeout(i.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
                        }
                    }, n = r.prototype = Object.create(t.Builder.Service.prototype), s = i.getChildren(t.Reflect.Service.RPCMethod), o = 0; o < s.length; o++)(function(t) {
                    n[t.name] = function(r, n) {
                        try {
                            try {
                                r = t.resolvedRequestType.clazz.decode(e.wrap(r))
                            } catch (s) {
                                if (!(s instanceof TypeError)) throw s
                            }
                            if (null === r || "object" != typeof r) throw Error("Illegal arguments");
                            r instanceof t.resolvedRequestType.clazz || (r = new t.resolvedRequestType.clazz(r)), this.rpcImpl(t.fqn(), r, function(e, r) {
                                if (e) n(e);
                                else {
                                    null === r && (r = "");
                                    try {
                                        r = t.resolvedResponseType.clazz.decode(r)
                                    } catch (s) {}
                                    r && r instanceof t.resolvedResponseType.clazz ? n(null, r) : n(Error("Illegal response type received in service method " + i.name + "#" + t.name))
                                }
                            })
                        } catch (o) {
                            setTimeout(n.bind(this, o), 0)
                        }
                    }, r[t.name] = function(e, i, n) {
                        new r(e)[t.name](i, n)
                    }, Object.defineProperty && (Object.defineProperty(r[t.name], "$options", {
                        value: t.buildOpt()
                    }), Object.defineProperty(n[t.name], "$options", {
                        value: r[t.name].$options
                    }))
                })(s[o]);
                return Object.defineProperty && (Object.defineProperty(r, "$options", {
                    value: i.buildOpt()
                }), Object.defineProperty(n, "$options", {
                    value: r.$options
                }), Object.defineProperty(r, "$type", {
                    value: i
                }), Object.defineProperty(n, "$type", {
                    value: i
                })), r
            }(t, this)
        }, n.Service = d;
        var g = function(e, t, i, r) {
                s.call(this, e, t, i), this.className = "Service.Method", this.options = r || {}
            };
        return (g.prototype = Object.create(s.prototype)).buildOpt = o.buildOpt, n.Service.Method = g, o = function(e, t, i, r, n, s, o, f) {
            g.call(this, e, t, i, f), this.className = "Service.RPCMethod", this.requestName = r, this.responseName = n, this.requestStream = s, this.responseStream = o, this.resolvedResponseType = this.resolvedRequestType = null
        }, o.prototype = Object.create(g.prototype), n.Service.RPCMethod = o, n
    }(i), i.Builder = function(e, t, i) {
        function r(e) {
            e.messages && e.messages.forEach(function(t) {
                t.syntax = e.syntax, r(t)
            }), e.enums && e.enums.forEach(function(t) {
                t.syntax = e.syntax
            })
        }
        var n = function(e) {
                this.ptr = this.ns = new i.Namespace(this, null, ""), this.resolved = !1, this.result = null, this.files = {}, this.importRoot = null, this.options = e || {}
            },
            s = n.prototype;
        return n.isMessage = function(e) {
            return "string" != typeof e.name || "undefined" != typeof e.values || "undefined" != typeof e.rpc ? !1 : !0
        }, n.isMessageField = function(e) {
            return "string" != typeof e.rule || "string" != typeof e.name || "string" != typeof e.type || "undefined" == typeof e.id ? !1 : !0
        }, n.isEnum = function(e) {
            return "string" == typeof e.name && "undefined" != typeof e.values && Array.isArray(e.values) && 0 !== e.values.length ? !0 : !1
        }, n.isService = function(e) {
            return "string" == typeof e.name && "object" == typeof e.rpc && e.rpc ? !0 : !1
        }, n.isExtend = function(e) {
            return "string" != typeof e.ref ? !1 : !0
        }, s.reset = function() {
            return this.ptr = this.ns, this
        }, s.define = function(e) {
            if ("string" != typeof e || !t.TYPEREF.test(e)) throw Error("illegal namespace: " + e);
            return e.split(".").forEach(function(e) {
                var t = this.ptr.getChild(e);
                null === t && this.ptr.addChild(t = new i.Namespace(this, this.ptr, e)), this.ptr = t
            }, this), this
        }, s.create = function(t) {
            if (!t) return this;
            if (Array.isArray(t)) {
                if (0 === t.length) return this;
                t = t.slice()
            } else t = [t];
            for (var r = [t]; 0 < r.length;) {
                if (t = r.pop(), !Array.isArray(t)) throw Error("not a valid namespace: " + JSON.stringify(t));
                for (; 0 < t.length;) {
                    var s = t.shift();
                    if (n.isMessage(s)) {
                        var o = new i.Message(this, this.ptr, s.name, s.options, s.isGroup, s.syntax),
                            f = {};
                        s.oneofs && Object.keys(s.oneofs).forEach(function(e) {
                            o.addChild(f[e] = new i.Message.OneOf(this, o, e))
                        }, this), s.fields && s.fields.forEach(function(e) {
                            if (null !== o.getChild(0 | e.id)) throw Error("duplicate or invalid field id in " + o.name + ": " + e.id);
                            if (e.options && "object" != typeof e.options) throw Error("illegal field options in " + o.name + "#" + e.name);
                            var t = null;
                            if ("string" == typeof e.oneof && !(t = f[e.oneof])) throw Error("illegal oneof in " + o.name + "#" + e.name + ": " + e.oneof);
                            e = new i.Message.Field(this, o, e.rule, e.keytype, e.type, e.name, e.id, e.options, t, s.syntax), t && t.fields.push(e), o.addChild(e)
                        }, this);
                        var a = [];
                        if (s.enums && s.enums.forEach(function(e) {
                            a.push(e)
                        }), s.messages && s.messages.forEach(function(e) {
                            a.push(e)
                        }), s.services && s.services.forEach(function(e) {
                            a.push(e)
                        }), s.extensions && (o.extensions = "number" == typeof s.extensions[0] ? [s.extensions] : s.extensions), this.ptr.addChild(o), 0 < a.length) {
                            r.push(t), t = a, a = null, this.ptr = o, o = null;
                            continue
                        }
                        a = null
                    } else if (n.isEnum(s)) o = new i.Enum(this, this.ptr, s.name, s.options, s.syntax), s.values.forEach(function(e) {
                        o.addChild(new i.Enum.Value(this, o, e.name, e.id))
                    }, this), this.ptr.addChild(o);
                    else if (n.isService(s)) o = new i.Service(this, this.ptr, s.name, s.options), Object.keys(s.rpc).forEach(function(e) {
                        var t = s.rpc[e];
                        o.addChild(new i.Service.RPCMethod(this, o, e, t.request, t.response, !! t.request_stream, !! t.response_stream, t.options))
                    }, this), this.ptr.addChild(o);
                    else {
                        if (!n.isExtend(s)) throw Error("not a valid definition: " + JSON.stringify(s));
                        if (o = this.ptr.resolve(s.ref, !0)) s.fields.forEach(function(t) {
                            if (null !== o.getChild(0 | t.id)) throw Error("duplicate extended field id in " + o.name + ": " + t.id);
                            if (o.extensions) {
                                var r = !1;
                                if (o.extensions.forEach(function(e) {
                                    t.id >= e[0] && t.id <= e[1] && (r = !0)
                                }), !r) throw Error("illegal extended field id in " + o.name + ": " + t.id + " (not within valid ranges)")
                            }
                            var n = t.name;
                            this.options.convertFieldsToCamelCase && (n = e.Util.toCamelCase(n));
                            var n = new i.Message.ExtensionField(this, o, t.rule, t.type, this.ptr.fqn() + "." + n, t.id, t.options),
                                s = new i.Extension(this, this.ptr, t.name, n);
                            n.extension = s, this.ptr.addChild(s), o.addChild(n)
                        }, this);
                        else if (!/\.?google\.protobuf\./.test(s.ref)) throw Error("extended message " + s.ref + " is not defined")
                    }
                    o = s = null
                }
                t = null, this.ptr = this.ptr.parent
            }
            return this.resolved = !1, this.result = null, this
        }, s["import"] = function(t, i) {
            var n = "/";
            if ("string" == typeof i) {
                if (e.Util.IS_NODE && (i = require("path").resolve(i)), !0 === this.files[i]) return this.reset();
                this.files[i] = !0
            } else if ("object" == typeof i) {
                var s = i.root;
                if (e.Util.IS_NODE && (s = require("path").resolve(s)), (0 <= s.indexOf("\\") || 0 <= i.file.indexOf("\\")) && (n = "\\"), s = s + n + i.file, !0 === this.files[s]) return this.reset();
                this.files[s] = !0
            }
            if (t.imports && 0 < t.imports.length) {
                var o = !1;
                "object" == typeof i ? (this.importRoot = i.root, o = !0, s = this.importRoot, i = i.file, (0 <= s.indexOf("\\") || 0 <= i.indexOf("\\")) && (n = "\\")) : "string" == typeof i ? this.importRoot ? s = this.importRoot : 0 <= i.indexOf("/") ? (s = i.replace(/\/[^\/]*$/, ""), "" === s && (s = "/")) : 0 <= i.indexOf("\\") ? (s = i.replace(/\\[^\\]*$/, ""), n = "\\") : s = "." : s = null;
                for (var f = 0; f < t.imports.length; f++) if ("string" == typeof t.imports[f]) {
                    if (!s) throw Error("cannot determine import root");
                    var a = t.imports[f];
                    if ("google/protobuf/descriptor.proto" !== a && (a = s + n + a, !0 !== this.files[a])) {
                        /\.proto$/i.test(a) && !e.DotProto && (a = a.replace(/\.proto$/, ".json"));
                        var h = e.Util.fetch(a);
                        if (null === h) throw Error("failed to import '" + a + "' in '" + i + "': file not found");
                        /\.json$/i.test(a) ? this["import"](JSON.parse(h + ""), a) : this["import"](e.DotProto.Parser.parse(h), a)
                    }
                } else i ? /\.(\w+)$/.test(i) ? this["import"](t.imports[f], i.replace(/^(.+)\.(\w+)$/, function(e, t, i) {
                    return t + "_import" + f + "." + i
                })) : this["import"](t.imports[f], i + "_import" + f) : this["import"](t.imports[f]);
                o && (this.importRoot = null)
            }
            t["package"] && this.define(t["package"]), t.syntax && r(t);
            var l = this.ptr;
            return t.options && Object.keys(t.options).forEach(function(e) {
                l.options[e] = t.options[e]
            }), t.messages && (this.create(t.messages), this.ptr = l), t.enums && (this.create(t.enums), this.ptr = l), t.services && (this.create(t.services), this.ptr = l), t["extends"] && this.create(t["extends"]), this.reset()
        }, s.resolveAll = function() {
            var r;
            if (null == this.ptr || "object" == typeof this.ptr.type) return this;
            if (this.ptr instanceof i.Namespace) this.ptr.children.forEach(function(e) {
                this.ptr = e, this.resolveAll()
            }, this);
            else if (this.ptr instanceof i.Message.Field) {
                if (t.TYPE.test(this.ptr.type)) this.ptr.type = e.TYPES[this.ptr.type];
                else {
                    if (!t.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (r = (this.ptr instanceof i.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0), !r) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (this.ptr.resolvedType = r, r instanceof i.Enum) {
                        if (this.ptr.type = e.TYPES["enum"], "proto3" === this.ptr.syntax && "proto3" !== r.syntax) throw Error("proto3 message cannot reference proto2 enum")
                    } else {
                        if (!(r instanceof i.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.type = r.isGroup ? e.TYPES.group : e.TYPES.message
                    }
                }
                if (this.ptr.map) {
                    if (!t.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
                    this.ptr.keyType = e.TYPES[this.ptr.keyType]
                }
            } else if (this.ptr instanceof e.Reflect.Service.Method) {
                if (!(this.ptr instanceof e.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
                if (r = this.ptr.parent.resolve(this.ptr.requestName, !0), !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                if (this.ptr.resolvedRequestType = r, r = this.ptr.parent.resolve(this.ptr.responseName, !0), !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                this.ptr.resolvedResponseType = r
            } else if (!(this.ptr instanceof e.Reflect.Message.OneOf || this.ptr instanceof e.Reflect.Extension || this.ptr instanceof e.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
            return this.reset()
        }, s.build = function(e) {
            if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), null === this.result && (this.result = this.ns.build()), !e) return this.result;
            e = "string" == typeof e ? e.split(".") : e;
            for (var t = this.result, i = 0; i < e.length; i++) {
                if (!t[e[i]]) {
                    t = null;
                    break
                }
                t = t[e[i]]
            }
            return t
        }, s.lookup = function(e, t) {
            return e ? this.ns.resolve(e, t) : this.ns
        }, s.toString = function() {
            return "Builder"
        }, n.Message = function() {}, n.Enum = function() {}, n.Service = function() {}, n
    }(i, i.Lang, i.Reflect), i.Map = function(e, t) {
        function i(e) {
            var t = 0;
            return {
                next: function() {
                    return t < e.length ? {
                        done: !1,
                        value: e[t++]
                    } : {
                        done: !0
                    }
                }
            }
        }
        var r = function(e, i) {
                if (!e.map) throw Error("field is not a map");
                if (this.field = e, this.keyElem = new t.Element(e.keyType, null, !0, e.syntax), this.valueElem = new t.Element(e.type, e.resolvedType, !1, e.syntax), this.map = {}, Object.defineProperty(this, "size", {
                    get: function() {
                        return Object.keys(this.map).length
                    }
                }), i) for (var r = Object.keys(i), n = 0; n < r.length; n++) {
                    var s = this.keyElem.valueFromString(r[n]),
                        o = this.valueElem.verifyValue(i[r[n]]);
                    this.map[this.keyElem.valueToString(s)] = {
                        key: s,
                        value: o
                    }
                }
            },
            n = r.prototype;
        return n.clear = function() {
            this.map = {}
        }, n["delete"] = function(e) {
            e = this.keyElem.valueToString(this.keyElem.verifyValue(e));
            var t = e in this.map;
            return delete this.map[e], t
        }, n.entries = function() {
            for (var e, t = [], r = Object.keys(this.map), n = 0; n < r.length; n++) t.push([(e = this.map[r[n]]).key, e.value]);
            return i(t)
        }, n.keys = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].key);
            return i(e)
        }, n.values = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].value);
            return i(e)
        }, n.forEach = function(e, t) {
            for (var i, r = Object.keys(this.map), n = 0; n < r.length; n++) e.call(t, (i = this.map[r[n]]).value, i.key, this)
        }, n.set = function(e, t) {
            var i = this.keyElem.verifyValue(e),
                r = this.valueElem.verifyValue(t);
            return this.map[this.keyElem.valueToString(i)] = {
                key: i,
                value: r
            }, this
        }, n.get = function(e) {
            return e = this.keyElem.valueToString(this.keyElem.verifyValue(e)), e in this.map ? this.map[e].value : void 0
        }, n.has = function(e) {
            return this.keyElem.valueToString(this.keyElem.verifyValue(e)) in this.map
        }, r
    }(i, i.Reflect), i.loadProto = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, t = void 0), i.loadJson(i.DotProto.Parser.parse(e), t, r)
    }, i.protoFromString = i.loadProto, i.loadProtoFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) t(Error("Failed to fetch file"));
            else try {
                t(null, i.loadProto(n, r, e))
            } catch (s) {
                t(s)
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadProto(n, r, e)
    }, i.protoFromFile = i.loadProtoFile, i.newBuilder = function(e) {
        return e = e || {}, "undefined" == typeof e.convertFieldsToCamelCase && (e.convertFieldsToCamelCase = i.convertFieldsToCamelCase), "undefined" == typeof e.populateAccessors && (e.populateAccessors = i.populateAccessors), new i.Builder(e)
    }, i.loadJson = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, t = null), t && "object" == typeof t || (t = i.newBuilder()), "string" == typeof e && (e = JSON.parse(e)), t["import"](e, r), t.resolveAll(), t
    }, i.loadJsonFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) t(Error("Failed to fetch file"));
            else try {
                t(null, i.loadJson(JSON.parse(n), r, e))
            } catch (s) {
                t(s)
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadJson(JSON.parse(n), r, e)
    }, i
});
var Inote = {};
Inote.JSTool = function(options) {
    this.options = options || {}
};
Inote.JSTool.prototype = {
    _name: 'Javascript工具',
    _history: {
        'v1.0': ['2011-01-18', 'javascript工具上线'],
        'v1.1': ['2012-03-23', '增加混淆功能'],
        'v1.2': ['2012-07-21', '升级美化功能引擎'],
        'v1.3': ['2014-03-01', '升级解密功能，支持eval,window.eval,window["eval"]等的解密'],
        'v1.4': ['2014-08-05', '升级混淆功能引擎'],
        'v1.5': ['2014-08-09', '升级js压缩引擎'],
        'v1.6': ['2015-04-11', '升级js混淆引擎'],
        'v1.7': ['2017-02-12', '升级js混淆引擎']
    },
    options: {},
    getName: function() {
        return this._name
    },
    getHistory: function() {
        return this._history
    }
};
var jstool = new Inote.JSTool();