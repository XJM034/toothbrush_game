var f2 = Object.defineProperty;
var p2 = (e, t, s) => t in e ? f2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var _ = (e, t, s) => p2(e, typeof t != "symbol" ? t + "" : t, s);
var _t = typeof self < "u" ? self : {};
function pt() {
  throw Error("Invalid UTF8");
}
function hi(e, t) {
  return t = String.fromCharCode.apply(null, t), e == null ? t : e + t;
}
let ms, mn;
const m2 = typeof TextDecoder < "u";
let g2;
const y2 = typeof TextEncoder < "u";
function _o(e) {
  if (y2) e = (g2 || (g2 = new TextEncoder())).encode(e);
  else {
    let s = 0;
    const n = new Uint8Array(3 * e.length);
    for (let r = 0; r < e.length; r++) {
      var t = e.charCodeAt(r);
      if (t < 128) n[s++] = t;
      else {
        if (t < 2048) n[s++] = t >> 6 | 192;
        else {
          if (t >= 55296 && t <= 57343) {
            if (t <= 56319 && r < e.length) {
              const i = e.charCodeAt(++r);
              if (i >= 56320 && i <= 57343) {
                t = 1024 * (t - 55296) + i - 56320 + 65536, n[s++] = t >> 18 | 240, n[s++] = t >> 12 & 63 | 128, n[s++] = t >> 6 & 63 | 128, n[s++] = 63 & t | 128;
                continue;
              }
              r--;
            }
            t = 65533;
          }
          n[s++] = t >> 12 | 224, n[s++] = t >> 6 & 63 | 128;
        }
        n[s++] = 63 & t | 128;
      }
    }
    e = s === n.length ? n : n.subarray(0, s);
  }
  return e;
}
var Yn, Ts;
e: {
  for (var ci = ["CLOSURE_FLAGS"], gn = _t, yn = 0; yn < ci.length; yn++) if ((gn = gn[ci[yn]]) == null) {
    Ts = null;
    break e;
  }
  Ts = gn;
}
var is, ui = Ts && Ts[610401301];
Yn = ui != null && ui;
const li = _t.navigator;
function xn(e) {
  return !!Yn && !!is && is.brands.some((({ brand: t }) => t && t.indexOf(e) != -1));
}
function _e(e) {
  var t;
  return (t = _t.navigator) && (t = t.userAgent) || (t = ""), t.indexOf(e) != -1;
}
function nt() {
  return !!Yn && !!is && is.brands.length > 0;
}
function _n() {
  return nt() ? xn("Chromium") : (_e("Chrome") || _e("CriOS")) && !(!nt() && _e("Edge")) || _e("Silk");
}
function $n(e) {
  return $n[" "](e), e;
}
is = li && li.userAgentData || null, $n[" "] = function() {
};
var _2 = !nt() && (_e("Trident") || _e("MSIE"));
!_e("Android") || _n(), _n(), _e("Safari") && (_n() || !nt() && _e("Coast") || !nt() && _e("Opera") || !nt() && _e("Edge") || (nt() ? xn("Microsoft Edge") : _e("Edg/")) || nt() && xn("Opera"));
var wo = {}, es = null;
function w2(e) {
  const t = e.length;
  let s = 3 * t / 4;
  s % 3 ? s = Math.floor(s) : "=.".indexOf(e[t - 1]) != -1 && (s = "=.".indexOf(e[t - 2]) != -1 ? s - 2 : s - 1);
  const n = new Uint8Array(s);
  let r = 0;
  return (function(i, o) {
    function a(c) {
      for (; h < i.length; ) {
        const u = i.charAt(h++), l = es[u];
        if (l != null) return l;
        if (!/^[\s\xa0]*$/.test(u)) throw Error("Unknown base64 encoding at char: " + u);
      }
      return c;
    }
    bo();
    let h = 0;
    for (; ; ) {
      const c = a(-1), u = a(0), l = a(64), w = a(64);
      if (w === 64 && c === -1) break;
      o(c << 2 | u >> 4), l != 64 && (o(u << 4 & 240 | l >> 2), w != 64 && o(l << 6 & 192 | w));
    }
  })(e, (function(i) {
    n[r++] = i;
  })), r !== s ? n.subarray(0, r) : n;
}
function bo() {
  if (!es) {
    es = {};
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = ["+/=", "+/", "-_=", "-_.", "-_"];
    for (let s = 0; s < 5; s++) {
      const n = e.concat(t[s].split(""));
      wo[s] = n;
      for (let r = 0; r < n.length; r++) {
        const i = n[r];
        es[i] === void 0 && (es[i] = r);
      }
    }
  }
}
var vo = typeof Uint8Array < "u", Eo = !_2 && typeof btoa == "function";
function di(e) {
  if (!Eo) {
    var t;
    t === void 0 && (t = 0), bo(), t = wo[t];
    var s = Array(Math.floor(e.length / 3)), n = t[64] || "";
    let h = 0, c = 0;
    for (; h < e.length - 2; h += 3) {
      var r = e[h], i = e[h + 1], o = e[h + 2], a = t[r >> 2];
      r = t[(3 & r) << 4 | i >> 4], i = t[(15 & i) << 2 | o >> 6], o = t[63 & o], s[c++] = a + r + i + o;
    }
    switch (a = 0, o = n, e.length - h) {
      case 2:
        o = t[(15 & (a = e[h + 1])) << 2] || n;
      case 1:
        e = e[h], s[c] = t[e >> 2] + t[(3 & e) << 4 | a >> 4] + o + n;
    }
    return s.join("");
  }
  for (t = "", s = 0, n = e.length - 10240; s < n; ) t += String.fromCharCode.apply(null, e.subarray(s, s += 10240));
  return t += String.fromCharCode.apply(null, s ? e.subarray(s) : e), btoa(t);
}
const fi = /[-_.]/g, b2 = { "-": "+", _: "/", ".": "=" };
function v2(e) {
  return b2[e] || "";
}
function So(e) {
  if (!Eo) return w2(e);
  fi.test(e) && (e = e.replace(fi, v2)), e = atob(e);
  const t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++) t[s] = e.charCodeAt(s);
  return t;
}
function cs(e) {
  return vo && e != null && e instanceof Uint8Array;
}
var It = {};
function wt() {
  return E2 || (E2 = new We(null, It));
}
function qn(e) {
  Ao(It);
  var t = e.g;
  return (t = t == null || cs(t) ? t : typeof t == "string" ? So(t) : null) == null ? t : e.g = t;
}
var We = class {
  h() {
    return new Uint8Array(qn(this) || 0);
  }
  constructor(e, t) {
    if (Ao(t), this.g = e, e != null && e.length === 0) throw Error("ByteString should be constructed with non-empty values");
  }
};
let E2, S2;
function Ao(e) {
  if (e !== It) throw Error("illegal external caller");
}
function ko(e, t) {
  e.__closure__error__context__984382 || (e.__closure__error__context__984382 = {}), e.__closure__error__context__984382.severity = t;
}
function Mn(e) {
  return ko(e = Error(e), "warning"), e;
}
var Ns = typeof Symbol == "function" && typeof Symbol() == "symbol", A2 = /* @__PURE__ */ new Set();
function us(e, t, s = !1, n = !1) {
  return e = typeof Symbol == "function" && typeof Symbol() == "symbol" ? n && Symbol.for && e ? Symbol.for(e) : e != null ? Symbol(e) : Symbol() : t, s && A2.add(e), e;
}
var k2 = us("jas", void 0, !0, !0), pi = us(void 0, "0di"), wn = us(void 0, "2ex"), Zt = us(void 0, "1oa", !0), Ct = us(void 0, Symbol(), !0);
const g = Ns ? k2 : "Ga", To = { Ga: { value: 0, configurable: !0, writable: !0, enumerable: !1 } }, Fo = Object.defineProperties;
function Bs(e, t) {
  Ns || g in e || Fo(e, To), e[g] |= t;
}
function G(e, t) {
  Ns || g in e || Fo(e, To), e[g] = t;
}
function Ht(e) {
  return Bs(e, 34), e;
}
function T2(e, t) {
  G(t, -30975 & (0 | e));
}
function On(e, t) {
  G(t, -30941 & (34 | e));
}
function Jn() {
  return typeof BigInt == "function";
}
function re(e) {
  return Array.prototype.slice.call(e);
}
var Zn, ls = {}, Lo = {};
function mi(e) {
  return !(!e || typeof e != "object" || e.Ia !== Lo);
}
function Qn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && e.constructor === Object;
}
function er(e, t) {
  if (e != null) {
    if (typeof e == "string") e = e ? new We(e, It) : wt();
    else if (e.constructor !== We) if (cs(e)) e = e.length ? new We(new Uint8Array(e), It) : wt();
    else {
      if (!t) throw Error();
      e = void 0;
    }
  }
  return e;
}
function Fs(e) {
  return !(!Array.isArray(e) || e.length) && !!(1 & (0 | e[g]));
}
const gi = [];
function ct(e) {
  if (2 & e) throw Error();
}
G(gi, 55), Zn = Object.freeze(gi);
class Ls {
  constructor(t, s, n) {
    this.l = 0, this.g = t, this.h = s, this.m = n;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return { done: !1, value: this.h ? this.h.call(this.m, t) : t };
    }
    return { done: !0, value: void 0 };
  }
  [Symbol.iterator]() {
    return new Ls(this.g, this.h, this.m);
  }
}
function tr(e) {
  return Ct ? e[Ct] : void 0;
}
var F2 = Object.freeze({});
function Us(e) {
  return e.Qa = !0, e;
}
var L2 = Us(((e) => typeof e == "number")), yi = Us(((e) => typeof e == "string")), x2 = Us(((e) => typeof e == "boolean")), Gs = typeof _t.BigInt == "function" && typeof _t.BigInt(0) == "bigint", In = Us(((e) => Gs ? e >= O2 && e <= C2 : e[0] === "-" ? _i(e, M2) : _i(e, I2)));
const M2 = Number.MIN_SAFE_INTEGER.toString(), O2 = Gs ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, I2 = Number.MAX_SAFE_INTEGER.toString(), C2 = Gs ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function _i(e, t) {
  if (e.length > t.length) return !1;
  if (e.length < t.length || e === t) return !0;
  for (let s = 0; s < e.length; s++) {
    const n = e[s], r = t[s];
    if (n > r) return !1;
    if (n < r) return !0;
  }
}
const P2 = typeof Uint8Array.prototype.slice == "function";
let xo, T = 0, D = 0;
function wi(e) {
  const t = e >>> 0;
  T = t, D = (e - t) / 4294967296 >>> 0;
}
function Pt(e) {
  if (e < 0) {
    wi(-e);
    const [t, s] = ir(T, D);
    T = t >>> 0, D = s >>> 0;
  } else wi(e);
}
function sr(e) {
  const t = xo || (xo = new DataView(new ArrayBuffer(8)));
  t.setFloat32(0, +e, !0), D = 0, T = t.getUint32(0, !0);
}
function nr(e, t) {
  const s = 4294967296 * t + (e >>> 0);
  return Number.isSafeInteger(s) ? s : os(e, t);
}
function rr(e, t) {
  const s = 2147483648 & t;
  return s && (t = ~t >>> 0, (e = 1 + ~e >>> 0) == 0 && (t = t + 1 >>> 0)), typeof (e = nr(e, t)) == "number" ? s ? -e : e : s ? "-" + e : e;
}
function os(e, t) {
  if (e >>>= 0, (t >>>= 0) <= 2097151) var s = "" + (4294967296 * t + e);
  else Jn() ? s = "" + (BigInt(t) << BigInt(32) | BigInt(e)) : (e = (16777215 & e) + 6777216 * (s = 16777215 & (e >>> 24 | t << 8)) + 6710656 * (t = t >> 16 & 65535), s += 8147497 * t, t *= 2, e >= 1e7 && (s += e / 1e7 >>> 0, e %= 1e7), s >= 1e7 && (t += s / 1e7 >>> 0, s %= 1e7), s = t + bi(s) + bi(e));
  return s;
}
function bi(e) {
  return e = String(e), "0000000".slice(e.length) + e;
}
function Vs(e) {
  if (e.length < 16) Pt(Number(e));
  else if (Jn()) e = BigInt(e), T = Number(e & BigInt(4294967295)) >>> 0, D = Number(e >> BigInt(32) & BigInt(4294967295));
  else {
    const t = +(e[0] === "-");
    D = T = 0;
    const s = e.length;
    for (let n = t, r = (s - t) % 6 + t; r <= s; n = r, r += 6) {
      const i = Number(e.slice(n, r));
      D *= 1e6, T = 1e6 * T + i, T >= 4294967296 && (D += Math.trunc(T / 4294967296), D >>>= 0, T >>>= 0);
    }
    if (t) {
      const [n, r] = ir(T, D);
      T = n, D = r;
    }
  }
}
function ir(e, t) {
  return t = ~t, e ? e = 1 + ~e : t += 1, [e, t];
}
const or = typeof BigInt == "function" ? BigInt.asIntN : void 0, R2 = typeof BigInt == "function" ? BigInt.asUintN : void 0, Ft = Number.isSafeInteger, Hs = Number.isFinite, xs = Math.trunc;
function ut(e) {
  return e == null || typeof e == "number" ? e : e === "NaN" || e === "Infinity" || e === "-Infinity" ? Number(e) : void 0;
}
function Mo(e) {
  return e == null || typeof e == "boolean" ? e : typeof e == "number" ? !!e : void 0;
}
const D2 = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function js(e) {
  switch (typeof e) {
    case "bigint":
      return !0;
    case "number":
      return Hs(e);
    case "string":
      return D2.test(e);
    default:
      return !1;
  }
}
function jt(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return Hs(e) ? 0 | e : void 0;
}
function Oo(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return Hs(e) ? e >>> 0 : void 0;
}
function vi(e) {
  if (e[0] === "-") return !1;
  const t = e.length;
  return t < 20 || t === 20 && Number(e.substring(0, 6)) < 184467;
}
function ar(e) {
  return e = xs(e), Ft(e) || (Pt(e), e = rr(T, D)), e;
}
function hr(e) {
  var t = xs(Number(e));
  if (Ft(t)) return String(t);
  if ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), t = e.length, !(e[0] === "-" ? t < 20 || t === 20 && Number(e.substring(0, 7)) > -922337 : t < 19 || t === 19 && Number(e.substring(0, 6)) < 922337)) if (Vs(e), e = T, 2147483648 & (t = D)) if (Jn()) e = "" + (BigInt(0 | t) << BigInt(32) | BigInt(e >>> 0));
  else {
    const [s, n] = ir(e, t);
    e = "-" + os(s, n);
  }
  else e = os(e, t);
  return e;
}
function Ms(e) {
  return e == null ? e : typeof e == "bigint" ? (In(e) ? e = Number(e) : (e = or(64, e), e = In(e) ? Number(e) : String(e)), e) : js(e) ? typeof e == "number" ? ar(e) : hr(e) : void 0;
}
function N2(e) {
  if (e == null) return e;
  var t = typeof e;
  if (t === "bigint") return String(R2(64, e));
  if (js(e)) {
    if (t === "string") return t = xs(Number(e)), Ft(t) && t >= 0 ? e = String(t) : ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), vi(e) || (Vs(e), e = os(T, D))), e;
    if (t === "number") return (e = xs(e)) >= 0 && Ft(e) ? e : (function(s) {
      if (s < 0) {
        Pt(s);
        var n = os(T, D);
        return s = Number(n), Ft(s) ? s : n;
      }
      return vi(n = String(s)) ? n : (Pt(s), nr(T, D));
    })(e);
  }
}
function Io(e) {
  if (typeof e != "string") throw Error();
  return e;
}
function zt(e) {
  if (e != null && typeof e != "string") throw Error();
  return e;
}
function Rt(e) {
  return e == null || typeof e == "string" ? e : void 0;
}
function cr(e, t, s, n) {
  if (e != null && typeof e == "object" && e.W === ls) return e;
  if (!Array.isArray(e)) return s ? 2 & n ? ((e = t[pi]) || (Ht((e = new t()).u), e = t[pi] = e), t = e) : t = new t() : t = void 0, t;
  let r = s = 0 | e[g];
  return r === 0 && (r |= 32 & n), r |= 2 & n, r !== s && G(e, r), new t(e);
}
function B2(e, t, s) {
  if (t) e: {
    if (!js(t = e)) throw Mn("int64");
    switch (typeof t) {
      case "string":
        t = hr(t);
        break e;
      case "bigint":
        if (e = t = or(64, t), yi(e)) {
          if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e)) throw Error(String(e));
        } else if (L2(e) && !Number.isSafeInteger(e)) throw Error(String(e));
        t = Gs ? BigInt(t) : x2(t) ? t ? "1" : "0" : yi(t) ? t.trim() || "0" : String(t);
        break e;
      default:
        t = ar(t);
    }
  }
  else t = Ms(e);
  return typeof (s = (e = t) == null ? s ? 0 : void 0 : e) == "string" && Ft(t = +s) ? t : s;
}
const U2 = {};
let G2 = (function() {
  try {
    return $n(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
})();
class bn {
  constructor() {
    this.g = /* @__PURE__ */ new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, s) {
    return this.g.set(t, s), this.size = this.g.size, this;
  }
  delete(t) {
    return t = this.g.delete(t), this.size = this.g.size, t;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t) {
    return this.g.has(t);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t, s) {
    return this.g.forEach(t, s);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const V2 = G2 ? (Object.setPrototypeOf(bn.prototype, Map.prototype), Object.defineProperties(bn.prototype, { size: { value: 0, configurable: !0, enumerable: !0, writable: !0 } }), bn) : class extends Map {
  constructor() {
    super();
  }
};
function Ei(e) {
  return e;
}
function vn(e) {
  if (2 & e.L) throw Error("Cannot mutate an immutable Map");
}
var be = class extends V2 {
  constructor(e, t, s = Ei, n = Ei) {
    super();
    let r = 0 | e[g];
    r |= 64, G(e, r), this.L = r, this.S = t, this.R = s, this.Y = this.S ? H2 : n;
    for (let i = 0; i < e.length; i++) {
      const o = e[i], a = s(o[0], !1, !0);
      let h = o[1];
      t ? h === void 0 && (h = null) : h = n(o[1], !1, !0, void 0, void 0, r), super.set(a, h);
    }
  }
  na(e = Si) {
    if (this.size !== 0) return this.X(e);
  }
  X(e = Si) {
    const t = [], s = super.entries();
    for (var n; !(n = s.next()).done; ) (n = n.value)[0] = e(n[0]), n[1] = e(n[1]), t.push(n);
    return t;
  }
  clear() {
    vn(this), super.clear();
  }
  delete(e) {
    return vn(this), super.delete(this.R(e, !0, !1));
  }
  entries() {
    var e = this.ma();
    return new Ls(e, j2, this);
  }
  keys() {
    return this.Ha();
  }
  values() {
    var e = this.ma();
    return new Ls(e, be.prototype.get, this);
  }
  forEach(e, t) {
    super.forEach(((s, n) => {
      e.call(t, this.get(n), n, this);
    }));
  }
  set(e, t) {
    return vn(this), (e = this.R(e, !0, !1)) == null ? this : t == null ? (super.delete(e), this) : super.set(e, this.Y(t, !0, !0, this.S, !1, this.L));
  }
  Na(e) {
    const t = this.R(e[0], !1, !0);
    e = e[1], e = this.S ? e === void 0 ? null : e : this.Y(e, !1, !0, void 0, !1, this.L), super.set(t, e);
  }
  has(e) {
    return super.has(this.R(e, !1, !1));
  }
  get(e) {
    e = this.R(e, !1, !1);
    const t = super.get(e);
    if (t !== void 0) {
      var s = this.S;
      return s ? ((s = this.Y(t, !1, !0, s, this.ra, this.L)) !== t && super.set(e, s), s) : t;
    }
  }
  ma() {
    return Array.from(super.keys());
  }
  Ha() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function H2(e, t, s, n, r, i) {
  return e = cr(e, n, s, i), r && (e = Ws(e)), e;
}
function Si(e) {
  return e;
}
function j2(e) {
  return [e, this.get(e)];
}
let z2, Co, W2;
function Ai() {
  return z2 || (z2 = new be(Ht([]), void 0, void 0, void 0, U2));
}
function ur(e, t, s, n, r) {
  if (e != null) {
    if (Array.isArray(e)) e = Fs(e) ? void 0 : r && 2 & (0 | e[g]) ? e : lr(e, t, s, n !== void 0, r);
    else if (Qn(e)) {
      const i = {};
      for (let o in e) i[o] = ur(e[o], t, s, n, r);
      e = i;
    } else e = t(e, n);
    return e;
  }
}
function lr(e, t, s, n, r) {
  const i = n || s ? 0 | e[g] : 0, o = n ? !!(32 & i) : void 0;
  n = re(e);
  for (let a = 0; a < n.length; a++) n[a] = ur(n[a], t, s, o, r);
  return s && ((e = tr(e)) && (n[Ct] = re(e)), s(i, n)), n;
}
function X2(e) {
  return ur(e, Po, void 0, void 0, !1);
}
function Po(e) {
  return e.W === ls ? e.toJSON() : e instanceof be ? e.na(X2) : (function(t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "bigint":
        return In(t) ? Number(t) : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (Fs(t)) return;
        } else {
          if (cs(t)) return di(t);
          if (t instanceof We) {
            const s = t.g;
            return s == null ? "" : typeof s == "string" ? s : t.g = di(s);
          }
          if (t instanceof be) return t.na();
        }
    }
    return t;
  })(e);
}
function Ro(e) {
  return lr(e, Po, void 0, void 0, !1);
}
function it(e, t, s) {
  return e = Do(e, t[0], t[1], s ? 1 : 2), t !== Co && s && Bs(e, 16384), e;
}
function Do(e, t, s, n) {
  if (e == null) {
    var r = 96;
    s ? (e = [s], r |= 512) : e = [], t && (r = -33521665 & r | (1023 & t) << 15);
  } else {
    if (!Array.isArray(e)) throw Error("narr");
    if (2048 & (r = 0 | e[g])) throw Error("farr");
    if (64 & r) return e;
    if (n === 1 || n === 2 || (r |= 64), s && (r |= 512, s !== e[0])) throw Error("mid");
    e: {
      if (n = (s = e).length) {
        const i = n - 1;
        if (Qn(s[i])) {
          if ((t = i - (512 & (r |= 256) ? 0 : -1)) >= 1024) throw Error("pvtlmt");
          r = -33521665 & r | (1023 & t) << 15;
          break e;
        }
      }
      if (t) {
        if ((t = Math.max(t, n - (512 & r ? 0 : -1))) > 1024) throw Error("spvt");
        r = -33521665 & r | (1023 & t) << 15;
      }
    }
  }
  return G(e, r), e;
}
function Cn(e, t, s = On) {
  if (e != null) {
    if (vo && e instanceof Uint8Array) return t ? e : new Uint8Array(e);
    if (Array.isArray(e)) {
      var n = 0 | e[g];
      return 2 & n ? e : (t && (t = n === 0 || !!(32 & n) && !(64 & n || !(16 & n))), t ? (G(e, -12293 & (34 | n)), e) : lr(e, Cn, 4 & n ? On : s, !0, !0));
    }
    return e.W === ls ? e = 2 & (n = 0 | (s = e.u)[g]) ? e : new e.constructor(zs(s, n, !0)) : e instanceof be && !(2 & e.L) && (s = Ht(e.X(Cn)), e = new be(s, e.S, e.R, e.Y)), e;
  }
}
function zs(e, t, s) {
  const n = s || 2 & t ? On : T2, r = !!(32 & t);
  return e = (function(i, o, a) {
    const h = re(i);
    var c = h.length;
    const u = 256 & o ? h[c - 1] : void 0;
    for (c += u ? -1 : 0, o = 512 & o ? 1 : 0; o < c; o++) h[o] = a(h[o]);
    if (u) {
      o = h[o] = {};
      for (const l in u) o[l] = a(u[l]);
    }
    return (i = tr(i)) && (h[Ct] = re(i)), h;
  })(e, t, ((i) => Cn(i, r, n))), Bs(e, 32 | (s ? 2 : 0)), e;
}
function Ws(e) {
  const t = e.u, s = 0 | t[g];
  return 2 & s ? new e.constructor(zs(t, s, !1)) : e;
}
function Dt(e, t) {
  return qe(e = e.u, 0 | e[g], t);
}
function qe(e, t, s, n) {
  if (s === -1) return null;
  var r = s + (512 & t ? 0 : -1);
  const i = e.length - 1;
  return r >= i && 256 & t ? e[i][s] : n && 256 & t && (t = e[i][s]) != null ? (e[r] != null && wn != null && ((r = (e = S2 ?? (S2 = {}))[wn] || 0) >= 4 || (e[wn] = r + 1, ko(e = Error(), "incident"), (function(o) {
    _t.setTimeout((() => {
      throw o;
    }), 0);
  })(e))), t) : r <= i ? e[r] : void 0;
}
function F(e, t, s) {
  const n = e.u;
  let r = 0 | n[g];
  return ct(r), R(n, r, t, s), e;
}
function R(e, t, s, n) {
  const r = 512 & t ? 0 : -1, i = s + r;
  var o = e.length - 1;
  return i >= o && 256 & t ? (e[o][s] = n, t) : i <= o ? (e[i] = n, 256 & t && s in (e = e[o]) && delete e[s], t) : (n !== void 0 && (s >= (o = t >> 15 & 1023 || 536870912) ? n != null && (e[o + r] = { [s]: n }, G(e, t |= 256)) : e[i] = n), t);
}
function bs(e, t) {
  let s = 0 | (e = e.u)[g];
  const n = qe(e, s, t), r = ut(n);
  return r != null && r !== n && R(e, s, t, r), r;
}
function No(e) {
  let t = 0 | (e = e.u)[g];
  const s = qe(e, t, 1), n = er(s, !0);
  return n != null && n !== s && R(e, t, 1, n), n;
}
function mt() {
  return F2 === void 0 ? 2 : 4;
}
function gt(e, t, s, n, r) {
  const i = e.u, o = 2 & (e = 0 | i[g]) ? 1 : n;
  r = !!r;
  let a = 0 | (n = dr(i, e, t))[g];
  if (!(4 & a)) {
    4 & a && (n = re(n), a = Xe(a, e), e = R(i, e, t, n));
    let h = 0, c = 0;
    for (; h < n.length; h++) {
      const u = s(n[h]);
      u != null && (n[c++] = u);
    }
    c < h && (n.length = c), a = fr(a, e), s = -4097 & (20 | a), a = s &= -8193, G(n, a), 2 & a && Object.freeze(n);
  }
  return o === 1 || o === 4 && 32 & a ? He(a) || (r = a, a |= 2, a !== r && G(n, a), Object.freeze(n)) : (o === 2 && He(a) && (n = re(n), a = Xe(a, e), a = ot(a, e, r), G(n, a), e = R(i, e, t, n)), He(a) || (t = a, a = ot(a, e, r), a !== t && G(n, a))), n;
}
function dr(e, t, s, n) {
  return e = qe(e, t, s, n), Array.isArray(e) ? e : Zn;
}
function fr(e, t) {
  return e === 0 && (e = Xe(e, t)), 1 | e;
}
function He(e) {
  return !!(2 & e) && !!(4 & e) || !!(2048 & e);
}
function Bo(e) {
  e = re(e);
  for (let t = 0; t < e.length; t++) {
    const s = e[t] = re(e[t]);
    Array.isArray(s[1]) && (s[1] = Ht(s[1]));
  }
  return e;
}
function Pn(e, t, s, n) {
  let r = 0 | (e = e.u)[g];
  ct(r), R(e, r, t, (n === "0" ? Number(s) === 0 : s === n) ? void 0 : s);
}
function Wt(e, t, s, n, r) {
  ct(t);
  var i = !(!(64 & t) && 16384 & t);
  const o = (r = dr(e, t, s, r)) !== Zn;
  if (i || !o) {
    let a = i = o ? 0 | r[g] : 0;
    (!o || 2 & a || He(a) || 4 & a && !(32 & a)) && (r = re(r), a = Xe(a, t), t = R(e, t, s, r)), a = -13 & fr(a, t), a = ot(n ? -17 & a : 16 | a, t, !0), a !== i && G(r, a);
  }
  return r;
}
function En(e, t) {
  var s = Fa;
  return mr(pr(e = e.u), e, 0 | e[g], s) === t ? t : -1;
}
function pr(e) {
  if (Ns) return e[Zt] ?? (e[Zt] = /* @__PURE__ */ new Map());
  if (Zt in e) return e[Zt];
  const t = /* @__PURE__ */ new Map();
  return Object.defineProperty(e, Zt, { value: t }), t;
}
function Uo(e, t, s, n) {
  const r = pr(e), i = mr(r, e, t, s);
  return i !== n && (i && (t = R(e, t, i)), r.set(s, n)), t;
}
function mr(e, t, s, n) {
  let r = e.get(n);
  if (r != null) return r;
  r = 0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    qe(t, s, o) != null && (r !== 0 && (s = R(t, s, r)), r = o);
  }
  return e.set(n, r), r;
}
function gr(e, t, s, n) {
  let r, i = 0 | e[g];
  if ((n = qe(e, i, s, n)) != null && n.W === ls) return (t = Ws(n)) !== n && R(e, i, s, t), t.u;
  if (Array.isArray(n)) {
    const o = 0 | n[g];
    r = 2 & o ? it(zs(n, o, !1), t, !0) : 64 & o ? n : it(r, t, !0);
  } else r = it(void 0, t, !0);
  return r !== n && R(e, i, s, r), r;
}
function Go(e, t, s, n) {
  let r = 0 | (e = e.u)[g];
  return (t = cr(n = qe(e, r, s, n), t, !1, r)) !== n && t != null && R(e, r, s, t), t;
}
function E(e, t, s, n = !1) {
  if ((t = Go(e, t, s, n)) == null) return t;
  if (!(2 & (n = 0 | (e = e.u)[g]))) {
    const r = Ws(t);
    r !== t && R(e, n, s, t = r);
  }
  return t;
}
function Vo(e, t, s, n, r, i, o) {
  e = e.u;
  var a = !!(2 & t);
  const h = a ? 1 : r;
  i = !!i, o && (o = !a);
  var c = 0 | (r = dr(e, t, n))[g];
  if (!(a = !!(4 & c))) {
    var u = r, l = t;
    const w = !!(2 & (c = fr(c, t)));
    w && (l |= 2);
    let C = !w, Y = !0, J = 0, K = 0;
    for (; J < u.length; J++) {
      const te = cr(u[J], s, !1, l);
      if (te instanceof s) {
        if (!w) {
          const Oe = !!(2 & (0 | te.u[g]));
          C && (C = !Oe), Y && (Y = Oe);
        }
        u[K++] = te;
      }
    }
    K < J && (u.length = K), c |= 4, c = Y ? 16 | c : -17 & c, G(u, c = C ? 8 | c : -9 & c), w && Object.freeze(u);
  }
  if (o && !(8 & c || !r.length && (h === 1 || h === 4 && 32 & c))) {
    for (He(c) && (r = re(r), c = Xe(c, t), t = R(e, t, n, r)), s = r, o = c, u = 0; u < s.length; u++) (c = s[u]) !== (l = Ws(c)) && (s[u] = l);
    o |= 8, G(s, o = s.length ? -17 & o : 16 | o), c = o;
  }
  return h === 1 || h === 4 && 32 & c ? He(c) || (t = c, (c |= !r.length || 16 & c && (!a || 32 & c) ? 2 : 2048) !== t && G(r, c), Object.freeze(r)) : (h === 2 && He(c) && (G(r = re(r), c = ot(c = Xe(c, t), t, i)), t = R(e, t, n, r)), He(c) || (n = c, (c = ot(c, t, i)) !== n && G(r, c))), r;
}
function Ye(e, t, s) {
  const n = 0 | e.u[g];
  return Vo(e, n, t, s, mt(), !1, !(2 & n));
}
function y(e, t, s, n) {
  return n == null && (n = void 0), F(e, s, n);
}
function ss(e, t, s, n) {
  n == null && (n = void 0);
  e: {
    let r = 0 | (e = e.u)[g];
    if (ct(r), n == null) {
      const i = pr(e);
      if (mr(i, e, r, s) !== t) break e;
      i.set(s, 0);
    } else r = Uo(e, r, s, t);
    R(e, r, t, n);
  }
}
function Xe(e, t) {
  return -2049 & (e = 32 | (2 & t ? 2 | e : -3 & e));
}
function ot(e, t, s) {
  return 32 & t && s || (e &= -33), e;
}
function Os(e, t, s, n) {
  const r = 0 | e.u[g];
  ct(r), e = Vo(e, r, s, t, 2, !0), n = n ?? new s(), e.push(n), e[g] = 2 & (0 | n.u[g]) ? -9 & e[g] : -17 & e[g];
}
function we(e, t) {
  return jt(Dt(e, t));
}
function ve(e, t) {
  return Rt(Dt(e, t));
}
function B(e, t) {
  return bs(e, t) ?? 0;
}
function as(e, t, s) {
  if (s != null && typeof s != "boolean") throw e = typeof s, Error(`Expected boolean but got ${e != "object" ? e : s ? Array.isArray(s) ? "array" : e : "null"}: ${s}`);
  F(e, t, s);
}
function Be(e, t, s) {
  if (s != null) {
    if (typeof s != "number" || !Hs(s)) throw Mn("int32");
    s |= 0;
  }
  F(e, t, s);
}
function p(e, t, s) {
  if (s != null && typeof s != "number") throw Error(`Value of float/double field must be a number, found ${typeof s}: ${s}`);
  F(e, t, s);
}
function Is(e, t, s) {
  {
    const o = e.u;
    let a = 0 | o[g];
    if (ct(a), s == null) R(o, a, t);
    else {
      var n = e = 0 | s[g], r = He(e), i = r || Object.isFrozen(s);
      for (r || (e = 0), i || (s = re(s), n = 0, e = ot(e = Xe(e, a), a, !0), i = !1), e |= 21, r = 0; r < s.length; r++) {
        const h = s[r], c = Io(h);
        Object.is(h, c) || (i && (s = re(s), n = 0, e = ot(e = Xe(e, a), a, !0), i = !1), s[r] = c);
      }
      e !== n && (i && (s = re(s), e = ot(e = Xe(e, a), a, !0)), G(s, e)), R(o, a, t, s);
    }
  }
}
function Xs(e, t, s) {
  ct(0 | e.u[g]), gt(e, t, Rt, 2, !0).push(Io(s));
}
function Ho(e, t) {
  return Error(`Invalid wire type: ${e} (at position ${t})`);
}
function yr() {
  return Error("Failed to read varint, encoding is invalid.");
}
function jo(e, t) {
  return Error(`Tried to read past the end of the data ${t} > ${e}`);
}
function _r(e) {
  if (typeof e == "string") return { buffer: So(e), N: !1 };
  if (Array.isArray(e)) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === Uint8Array) return { buffer: e, N: !1 };
  if (e.constructor === ArrayBuffer) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === We) return { buffer: qn(e) || new Uint8Array(0), N: !0 };
  if (e instanceof Uint8Array) return { buffer: new Uint8Array(e.buffer, e.byteOffset, e.byteLength), N: !1 };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function wr(e, t) {
  let s, n = 0, r = 0, i = 0;
  const o = e.h;
  let a = e.g;
  do
    s = o[a++], n |= (127 & s) << i, i += 7;
  while (i < 32 && 128 & s);
  for (i > 32 && (r |= (127 & s) >> 4), i = 3; i < 32 && 128 & s; i += 7) s = o[a++], r |= (127 & s) << i;
  if (yt(e, a), s < 128) return t(n >>> 0, r >>> 0);
  throw yr();
}
function br(e) {
  let t = 0, s = e.g;
  const n = s + 10, r = e.h;
  for (; s < n; ) {
    const i = r[s++];
    if (t |= i, (128 & i) == 0) return yt(e, s), !!(127 & t);
  }
  throw yr();
}
function at(e) {
  const t = e.h;
  let s = e.g, n = t[s++], r = 127 & n;
  if (128 & n && (n = t[s++], r |= (127 & n) << 7, 128 & n && (n = t[s++], r |= (127 & n) << 14, 128 & n && (n = t[s++], r |= (127 & n) << 21, 128 & n && (n = t[s++], r |= n << 28, 128 & n && 128 & t[s++] && 128 & t[s++] && 128 & t[s++] && 128 & t[s++] && 128 & t[s++]))))) throw yr();
  return yt(e, s), r;
}
function $e(e) {
  return at(e) >>> 0;
}
function Rn(e) {
  var t = e.h;
  const s = e.g, n = t[s], r = t[s + 1], i = t[s + 2];
  return t = t[s + 3], yt(e, e.g + 4), (n << 0 | r << 8 | i << 16 | t << 24) >>> 0;
}
function Dn(e) {
  var t = Rn(e);
  e = 2 * (t >> 31) + 1;
  const s = t >>> 23 & 255;
  return t &= 8388607, s == 255 ? t ? NaN : e * (1 / 0) : s == 0 ? 1401298464324817e-60 * e * t : e * Math.pow(2, s - 150) * (t + 8388608);
}
function K2(e) {
  return at(e);
}
function Sn(e, t, { ba: s = !1 } = {}) {
  e.ba = s, t && (t = _r(t), e.h = t.buffer, e.m = t.N, e.j = 0, e.l = e.h.length, e.g = e.j);
}
function yt(e, t) {
  if (e.g = t, t > e.l) throw jo(e.l, t);
}
function zo(e, t) {
  if (t < 0) throw Error(`Tried to read a negative byte length: ${t}`);
  const s = e.g, n = s + t;
  if (n > e.l) throw jo(t, e.l - s);
  return e.g = n, s;
}
function Wo(e, t) {
  if (t == 0) return wt();
  var s = zo(e, t);
  return e.ba && e.m ? s = e.h.subarray(s, s + t) : (e = e.h, s = s === (t = s + t) ? new Uint8Array(0) : P2 ? e.slice(s, t) : new Uint8Array(e.subarray(s, t))), s.length == 0 ? wt() : new We(s, It);
}
be.prototype.toJSON = void 0, be.prototype.Ia = Lo;
var ki = [];
function Xo(e) {
  var t = e.g;
  if (t.g == t.l) return !1;
  e.l = e.g.g;
  var s = $e(e.g);
  if (t = s >>> 3, !((s &= 7) >= 0 && s <= 5)) throw Ho(s, e.l);
  if (t < 1) throw Error(`Invalid field number: ${t} (at position ${e.l})`);
  return e.m = t, e.h = s, !0;
}
function vs(e) {
  switch (e.h) {
    case 0:
      e.h != 0 ? vs(e) : br(e.g);
      break;
    case 1:
      yt(e = e.g, e.g + 8);
      break;
    case 2:
      if (e.h != 2) vs(e);
      else {
        var t = $e(e.g);
        yt(e = e.g, e.g + t);
      }
      break;
    case 5:
      yt(e = e.g, e.g + 4);
      break;
    case 3:
      for (t = e.m; ; ) {
        if (!Xo(e)) throw Error("Unmatched start-group tag: stream EOF");
        if (e.h == 4) {
          if (e.m != t) throw Error("Unmatched end-group tag");
          break;
        }
        vs(e);
      }
      break;
    default:
      throw Ho(e.h, e.l);
  }
}
function ds(e, t, s) {
  const n = e.g.l, r = $e(e.g), i = e.g.g + r;
  let o = i - n;
  if (o <= 0 && (e.g.l = i, s(t, e, void 0, void 0, void 0), o = i - e.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${r} bytes, instead read ${r - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return e.g.g = i, e.g.l = n, t;
}
function vr(e) {
  var t = $e(e.g), s = zo(e = e.g, t);
  if (e = e.h, m2) {
    var n, r = e;
    (n = mn) || (n = mn = new TextDecoder("utf-8", { fatal: !0 })), t = s + t, r = s === 0 && t === r.length ? r : r.subarray(s, t);
    try {
      var i = n.decode(r);
    } catch (a) {
      if (ms === void 0) {
        try {
          n.decode(new Uint8Array([128]));
        } catch {
        }
        try {
          n.decode(new Uint8Array([97])), ms = !0;
        } catch {
          ms = !1;
        }
      }
      throw !ms && (mn = void 0), a;
    }
  } else {
    t = (i = s) + t, s = [];
    let a, h = null;
    for (; i < t; ) {
      var o = e[i++];
      o < 128 ? s.push(o) : o < 224 ? i >= t ? pt() : (a = e[i++], o < 194 || (192 & a) != 128 ? (i--, pt()) : s.push((31 & o) << 6 | 63 & a)) : o < 240 ? i >= t - 1 ? pt() : (a = e[i++], (192 & a) != 128 || o === 224 && a < 160 || o === 237 && a >= 160 || (192 & (n = e[i++])) != 128 ? (i--, pt()) : s.push((15 & o) << 12 | (63 & a) << 6 | 63 & n)) : o <= 244 ? i >= t - 2 ? pt() : (a = e[i++], (192 & a) != 128 || a - 144 + (o << 28) >> 30 != 0 || (192 & (n = e[i++])) != 128 || (192 & (r = e[i++])) != 128 ? (i--, pt()) : (o = (7 & o) << 18 | (63 & a) << 12 | (63 & n) << 6 | 63 & r, o -= 65536, s.push(55296 + (o >> 10 & 1023), 56320 + (1023 & o)))) : pt(), s.length >= 8192 && (h = hi(h, s), s.length = 0);
    }
    i = hi(h, s);
  }
  return i;
}
function Ko(e) {
  const t = $e(e.g);
  return Wo(e.g, t);
}
function Ks(e, t, s) {
  var n = $e(e.g);
  for (n = e.g.g + n; e.g.g < n; ) s.push(t(e.g));
}
var gs = [];
function Y2(e) {
  return e;
}
let Lt;
function Fe(e, t, s) {
  t.g ? t.m(e, t.g, t.h, s) : t.m(e, t.h, s);
}
var f = class {
  constructor(e, t) {
    this.u = Do(e, t);
  }
  toJSON() {
    const e = !Lt;
    try {
      return e && (Lt = Ro), Yo(this);
    } finally {
      e && (Lt = void 0);
    }
  }
  l() {
    var e = M1;
    return e.g ? e.l(this, e.g, e.h, !0) : e.l(this, e.h, e.defaultValue, !0);
  }
  clone() {
    const e = this.u;
    return new this.constructor(zs(e, 0 | e[g], !1));
  }
  N() {
    return !!(2 & (0 | this.u[g]));
  }
};
function Yo(e) {
  var t = e.u;
  {
    t = (e = Lt(t)) !== t;
    let c = e.length;
    if (c) {
      var s = e[c - 1], n = Qn(s);
      n ? c-- : s = void 0;
      var r = e;
      if (n) {
        e: {
          var i, o = s, a = !1;
          if (o) for (let u in o) isNaN(+u) ? (i ?? (i = {}))[u] = o[u] : (n = o[u], Array.isArray(n) && (Fs(n) || mi(n) && n.size === 0) && (n = null), n == null && (a = !0), n != null && ((i ?? (i = {}))[u] = n));
          if (a || (i = o), i) for (let u in i) {
            a = i;
            break e;
          }
          a = null;
        }
        o = a == null ? s != null : a !== s;
      }
      for (; c > 0 && ((i = r[c - 1]) == null || Fs(i) || mi(i) && i.size === 0); c--) var h = !0;
      (r !== e || o || h) && (t ? (h || o || a) && (r.length = c) : r = Array.prototype.slice.call(r, 0, c), a && r.push(a)), h = r;
    } else h = e;
  }
  return h;
}
function Ti(e) {
  return e ? /^\d+$/.test(e) ? (Vs(e), new Nn(T, D)) : null : $2 || ($2 = new Nn(0, 0));
}
f.prototype.W = ls, f.prototype.toString = function() {
  try {
    return Lt = Y2, Yo(this).toString();
  } finally {
    Lt = void 0;
  }
};
var Nn = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let $2;
function Fi(e) {
  return e ? /^-?\d+$/.test(e) ? (Vs(e), new Bn(T, D)) : null : q2 || (q2 = new Bn(0, 0));
}
var Bn = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let q2;
function xt(e, t, s) {
  for (; s > 0 || t > 127; ) e.g.push(127 & t | 128), t = (t >>> 7 | s << 25) >>> 0, s >>>= 7;
  e.g.push(t);
}
function Xt(e, t) {
  for (; t > 127; ) e.g.push(127 & t | 128), t >>>= 7;
  e.g.push(t);
}
function Ys(e, t) {
  if (t >= 0) Xt(e, t);
  else {
    for (let s = 0; s < 9; s++) e.g.push(127 & t | 128), t >>= 7;
    e.g.push(1);
  }
}
function hs(e, t) {
  e.g.push(t >>> 0 & 255), e.g.push(t >>> 8 & 255), e.g.push(t >>> 16 & 255), e.g.push(t >>> 24 & 255);
}
function Nt(e, t) {
  t.length !== 0 && (e.l.push(t), e.h += t.length);
}
function le(e, t, s) {
  Xt(e.g, 8 * t + s);
}
function Er(e, t) {
  return le(e, t, 2), t = e.g.end(), Nt(e, t), t.push(e.h), t;
}
function Sr(e, t) {
  var s = t.pop();
  for (s = e.h + e.g.length() - s; s > 127; ) t.push(127 & s | 128), s >>>= 7, e.h++;
  t.push(s), e.h++;
}
function $s(e, t, s) {
  le(e, t, 2), Xt(e.g, s.length), Nt(e, e.g.end()), Nt(e, s);
}
function Cs(e, t, s, n) {
  s != null && (t = Er(e, t), n(s, e), Sr(e, t));
}
function Le() {
  const e = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(e, e.prototype), e;
}
var Ar = Le(), $o = Le(), kr = Le(), Tr = Le(), qo = Le(), Jo = Le(), Fr = Le(), Zo = Le(), Qo = Le(), Kt = class {
  constructor(e, t, s) {
    this.g = e, this.h = t, e = Ar, this.l = !!e && s === e || !1;
  }
};
function qs(e, t) {
  return new Kt(e, t, Ar);
}
function ea(e, t, s, n, r) {
  Cs(e, s, ra(t, n), r);
}
const J2 = qs((function(e, t, s, n, r) {
  return e.h === 2 && (ds(e, gr(t, n, s), r), !0);
}), ea), Z2 = qs((function(e, t, s, n, r) {
  return e.h === 2 && (ds(e, gr(t, n, s, !0), r), !0);
}), ea);
var Js = Symbol(), Lr = Symbol(), Li = Symbol(), xi = Symbol();
let ta, sa;
function bt(e, t, s, n) {
  var r = n[e];
  if (r) return r;
  (r = {}).Pa = n, r.V = (function(l) {
    switch (typeof l) {
      case "boolean":
        return Co || (Co = [0, void 0, !0]);
      case "number":
        return l > 0 ? void 0 : l === 0 ? W2 || (W2 = [0, void 0]) : [-l, void 0];
      case "string":
        return [0, l];
      case "object":
        return l;
    }
  })(n[0]);
  var i = n[1];
  let o = 1;
  i && i.constructor === Object && (r.ga = i, typeof (i = n[++o]) == "function" && (r.la = !0, ta ?? (ta = i), sa ?? (sa = n[o + 1]), i = n[o += 2]));
  const a = {};
  for (; i && Array.isArray(i) && i.length && typeof i[0] == "number" && i[0] > 0; ) {
    for (var h = 0; h < i.length; h++) a[i[h]] = i;
    i = n[++o];
  }
  for (h = 1; i !== void 0; ) {
    let l;
    typeof i == "number" && (h += i, i = n[++o]);
    var c = void 0;
    if (i instanceof Kt ? l = i : (l = J2, o--), l == null ? void 0 : l.l) {
      i = n[++o], c = n;
      var u = o;
      typeof i == "function" && (i = i(), c[u] = i), c = i;
    }
    for (u = h + 1, typeof (i = n[++o]) == "number" && i < 0 && (u -= i, i = n[++o]); h < u; h++) {
      const w = a[h];
      c ? s(r, h, l, c, w) : t(r, h, l, w);
    }
  }
  return n[e] = r;
}
function na(e) {
  return Array.isArray(e) ? e[0] instanceof Kt ? e : [Z2, e] : [e, void 0];
}
function ra(e, t) {
  return e instanceof f ? e.u : Array.isArray(e) ? it(e, t, !1) : void 0;
}
function xr(e, t, s, n) {
  const r = s.g;
  e[t] = n ? (i, o, a) => r(i, o, a, n) : r;
}
function Mr(e, t, s, n, r) {
  const i = s.g;
  let o, a;
  e[t] = (h, c, u) => i(h, c, u, a || (a = bt(Lr, xr, Mr, n).V), o || (o = Or(n)), r);
}
function Or(e) {
  let t = e[Li];
  if (t != null) return t;
  const s = bt(Lr, xr, Mr, e);
  return t = s.la ? (n, r) => ta(n, r, s) : (n, r) => {
    const i = 0 | n[g];
    for (; Xo(r) && r.h != 4; ) {
      var o = r.m, a = s[o];
      if (a == null) {
        var h = s.ga;
        h && (h = h[o]) && (h = Q2(h)) != null && (a = s[o] = h);
      }
      a != null && a(r, n, o) || (o = (a = r).l, vs(a), a.fa ? a = void 0 : (h = a.g.g - o, a.g.g = o, a = Wo(a.g, h)), o = n, a && ((h = o[Ct]) ? h.push(a) : o[Ct] = [a]));
    }
    return 16384 & i && Ht(n), !0;
  }, e[Li] = t;
}
function Q2(e) {
  const t = (e = na(e))[0].g;
  if (e = e[1]) {
    const s = Or(e), n = bt(Lr, xr, Mr, e).V;
    return (r, i, o) => t(r, i, o, n, s);
  }
  return t;
}
function Zs(e, t, s) {
  e[t] = s.h;
}
function Qs(e, t, s, n) {
  let r, i;
  const o = s.h;
  e[t] = (a, h, c) => o(a, h, c, i || (i = bt(Js, Zs, Qs, n).V), r || (r = ia(n)));
}
function ia(e) {
  let t = e[xi];
  if (!t) {
    const s = bt(Js, Zs, Qs, e);
    t = (n, r) => oa(n, r, s), e[xi] = t;
  }
  return t;
}
function oa(e, t, s) {
  for (var n = 0 | e[g], r = 512 & n ? 0 : -1, i = e.length, o = 512 & n ? 1 : 0, a = i + (256 & n ? -1 : 0); o < a; o++) {
    const h = e[o];
    if (h == null) continue;
    const c = o - r, u = Mi(s, c);
    u && u(t, h, c);
  }
  if (256 & n) {
    n = e[i - 1];
    for (const h in n) r = +h, Number.isNaN(r) || (i = n[r]) != null && (a = Mi(s, r)) && a(t, i, r);
  }
  if (e = tr(e)) for (Nt(t, t.g.end()), s = 0; s < e.length; s++) Nt(t, qn(e[s]) || new Uint8Array(0));
}
function Mi(e, t) {
  var s = e[t];
  if (s) return s;
  if ((s = e.ga) && (s = s[t])) {
    var n = (s = na(s))[0].h;
    if (s = s[1]) {
      const r = ia(s), i = bt(Js, Zs, Qs, s).V;
      s = e.la ? sa(i, r) : (o, a, h) => n(o, a, h, i, r);
    } else s = n;
    return e[t] = s;
  }
}
function Yt(e, t) {
  if (Array.isArray(t)) {
    var s = 0 | t[g];
    if (4 & s) return t;
    for (var n = 0, r = 0; n < t.length; n++) {
      const i = e(t[n]);
      i != null && (t[r++] = i);
    }
    return r < n && (t.length = r), G(t, -12289 & (5 | s)), 2 & s && Object.freeze(t), t;
  }
}
function Q(e, t, s) {
  return new Kt(e, t, s);
}
function $t(e, t, s) {
  return new Kt(e, t, s);
}
function ee(e, t, s) {
  R(e, 0 | e[g], t, s);
}
var e1 = qs((function(e, t, s, n, r) {
  return e.h === 2 && (e = ds(e, it([void 0, void 0], n, !0), r), ct(n = 0 | t[g]), (r = qe(t, n, s)) instanceof be ? (2 & r.L) != 0 ? ((r = r.X()).push(e), R(t, n, s, r)) : r.Na(e) : Array.isArray(r) ? (2 & (0 | r[g]) && R(t, n, s, r = Bo(r)), r.push(e)) : R(t, n, s, [e]), !0);
}), (function(e, t, s, n, r) {
  if (t instanceof be) t.forEach(((i, o) => {
    Cs(e, s, it([o, i], n, !1), r);
  }));
  else if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
    const o = t[i];
    Array.isArray(o) && Cs(e, s, it(o, n, !1), r);
  }
}));
function aa(e, t, s) {
  if (t = (function(n) {
    if (n == null) return n;
    const r = typeof n;
    if (r === "bigint") return String(or(64, n));
    if (js(n)) {
      if (r === "string") return hr(n);
      if (r === "number") return ar(n);
    }
  })(t), t != null && (typeof t == "string" && Fi(t), t != null))
    switch (le(e, s, 0), typeof t) {
      case "number":
        e = e.g, Pt(t), xt(e, T, D);
        break;
      case "bigint":
        s = BigInt.asUintN(64, t), s = new Bn(Number(s & BigInt(4294967295)), Number(s >> BigInt(32))), xt(e.g, s.h, s.g);
        break;
      default:
        s = Fi(t), xt(e.g, s.h, s.g);
    }
}
function ha(e, t, s) {
  (t = jt(t)) != null && t != null && (le(e, s, 0), Ys(e.g, t));
}
function ca(e, t, s) {
  (t = Mo(t)) != null && (le(e, s, 0), e.g.g.push(t ? 1 : 0));
}
function ua(e, t, s) {
  (t = Rt(t)) != null && $s(e, s, _o(t));
}
function la(e, t, s, n, r) {
  Cs(e, s, ra(t, n), r);
}
function da(e, t, s) {
  (t = t == null || typeof t == "string" || cs(t) || t instanceof We ? t : void 0) != null && $s(e, s, _r(t).buffer);
}
function fa(e, t, s) {
  return (e.h === 5 || e.h === 2) && (t = Wt(t, 0 | t[g], s, !1, !1), e.h == 2 ? Ks(e, Dn, t) : t.push(Dn(e.g)), !0);
}
var Ge = Q((function(e, t, s) {
  if (e.h !== 1) return !1;
  var n = e.g;
  e = Rn(n);
  const r = Rn(n);
  n = 2 * (r >> 31) + 1;
  const i = r >>> 20 & 2047;
  return e = 4294967296 * (1048575 & r) + e, ee(t, s, i == 2047 ? e ? NaN : n * (1 / 0) : i == 0 ? 5e-324 * n * e : n * Math.pow(2, i - 1075) * (e + 4503599627370496)), !0;
}), (function(e, t, s) {
  (t = ut(t)) != null && (le(e, s, 1), e = e.g, (s = xo || (xo = new DataView(new ArrayBuffer(8)))).setFloat64(0, +t, !0), T = s.getUint32(0, !0), D = s.getUint32(4, !0), hs(e, T), hs(e, D));
}), Le()), V = Q((function(e, t, s) {
  return e.h === 5 && (ee(t, s, Dn(e.g)), !0);
}), (function(e, t, s) {
  (t = ut(t)) != null && (le(e, s, 5), e = e.g, sr(t), hs(e, T));
}), Fr), t1 = $t(fa, (function(e, t, s) {
  if ((t = Yt(ut, t)) != null) for (let o = 0; o < t.length; o++) {
    var n = e, r = s, i = t[o];
    i != null && (le(n, r, 5), n = n.g, sr(i), hs(n, T));
  }
}), Fr), Ir = $t(fa, (function(e, t, s) {
  if ((t = Yt(ut, t)) != null && t.length) {
    le(e, s, 2), Xt(e.g, 4 * t.length);
    for (let n = 0; n < t.length; n++) s = e.g, sr(t[n]), hs(s, T);
  }
}), Fr), ht = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, wr(e.g, rr)), !0);
}), aa, Jo), An = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, (e = wr(e.g, rr)) === 0 ? void 0 : e), !0);
}), aa, Jo), s1 = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, wr(e.g, nr)), !0);
}), (function(e, t, s) {
  if ((t = N2(t)) != null && (typeof t == "string" && Ti(t), t != null))
    switch (le(e, s, 0), typeof t) {
      case "number":
        e = e.g, Pt(t), xt(e, T, D);
        break;
      case "bigint":
        s = BigInt.asUintN(64, t), s = new Nn(Number(s & BigInt(4294967295)), Number(s >> BigInt(32))), xt(e.g, s.h, s.g);
        break;
      default:
        s = Ti(t), xt(e.g, s.h, s.g);
    }
}), Le()), N = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, at(e.g)), !0);
}), ha, Tr), en = $t((function(e, t, s) {
  return (e.h === 0 || e.h === 2) && (t = Wt(t, 0 | t[g], s, !1, !1), e.h == 2 ? Ks(e, at, t) : t.push(at(e.g)), !0);
}), (function(e, t, s) {
  if ((t = Yt(jt, t)) != null && t.length) {
    s = Er(e, s);
    for (let n = 0; n < t.length; n++) Ys(e.g, t[n]);
    Sr(e, s);
  }
}), Tr), Tt = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, (e = at(e.g)) === 0 ? void 0 : e), !0);
}), ha, Tr), O = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, br(e.g)), !0);
}), ca, $o), Mt = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, (e = br(e.g)) === !1 ? void 0 : e), !0);
}), ca, $o), q = $t((function(e, t, s) {
  return e.h === 2 && (e = vr(e), Wt(t, 0 | t[g], s, !1).push(e), !0);
}), (function(e, t, s) {
  if ((t = Yt(Rt, t)) != null) for (let o = 0; o < t.length; o++) {
    var n = e, r = s, i = t[o];
    i != null && $s(n, r, _o(i));
  }
}), kr), rt = Q((function(e, t, s) {
  return e.h === 2 && (ee(t, s, (e = vr(e)) === "" ? void 0 : e), !0);
}), ua, kr), A = Q((function(e, t, s) {
  return e.h === 2 && (ee(t, s, vr(e)), !0);
}), ua, kr), z = (function(e, t, s = Ar) {
  return new Kt(e, t, s);
})((function(e, t, s, n, r) {
  return e.h === 2 && (n = it(void 0, n, !0), Wt(t, 0 | t[g], s, !0).push(n), ds(e, n, r), !0);
}), (function(e, t, s, n, r) {
  if (Array.isArray(t)) for (let i = 0; i < t.length; i++) la(e, t[i], s, n, r);
})), k = qs((function(e, t, s, n, r, i) {
  return e.h === 2 && (Uo(t, 0 | t[g], i, s), ds(e, t = gr(t, n, s), r), !0);
}), la), pa = Q((function(e, t, s) {
  return e.h === 2 && (ee(t, s, Ko(e)), !0);
}), da, Zo), n1 = $t((function(e, t, s) {
  return (e.h === 0 || e.h === 2) && (t = Wt(t, 0 | t[g], s, !1, !1), e.h == 2 ? Ks(e, $e, t) : t.push($e(e.g)), !0);
}), (function(e, t, s) {
  if ((t = Yt(Oo, t)) != null) for (let o = 0; o < t.length; o++) {
    var n = e, r = s, i = t[o];
    i != null && (le(n, r, 0), Xt(n.g, i));
  }
}), qo), r1 = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, (e = $e(e.g)) === 0 ? void 0 : e), !0);
}), (function(e, t, s) {
  (t = Oo(t)) != null && t != null && (le(e, s, 0), Xt(e.g, t));
}), qo), Ee = Q((function(e, t, s) {
  return e.h === 0 && (ee(t, s, at(e.g)), !0);
}), (function(e, t, s) {
  (t = jt(t)) != null && (t = parseInt(t, 10), le(e, s, 0), Ys(e.g, t));
}), Qo);
class i1 {
  constructor(t, s) {
    this.h = t, this.g = s, this.l = E, this.m = y, this.defaultValue = void 0;
  }
}
function xe(e, t) {
  return new i1(e, t);
}
function lt(e, t) {
  return (s, n) => {
    if (gs.length) {
      const i = gs.pop();
      i.o(n), Sn(i.g, s, n), s = i;
    } else s = new class {
      constructor(i, o) {
        if (ki.length) {
          const a = ki.pop();
          Sn(a, i, o), i = a;
        } else i = new class {
          constructor(a, h) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, Sn(this, a, h);
          }
          clear() {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, this.ba = !1;
          }
        }(i, o);
        this.g = i, this.l = this.g.g, this.h = this.m = -1, this.o(o);
      }
      o({ fa: i = !1 } = {}) {
        this.fa = i;
      }
    }(s, n);
    try {
      const i = new e(), o = i.u;
      Or(t)(o, s);
      var r = i;
    } finally {
      s.g.clear(), s.m = -1, s.h = -1, gs.length < 100 && gs.push(s);
    }
    return r;
  };
}
function tn(e) {
  return function() {
    const t = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const o = this.g;
            return this.g = [], o;
          }
        }();
      }
    }();
    oa(this.u, t, bt(Js, Zs, Qs, e)), Nt(t, t.g.end());
    const s = new Uint8Array(t.h), n = t.l, r = n.length;
    let i = 0;
    for (let o = 0; o < r; o++) {
      const a = n[o];
      s.set(a, i), i += a.length;
    }
    return t.l = [s], s;
  };
}
var Oi = class extends f {
  constructor(e) {
    super(e);
  }
}, Ii = [0, rt, Q((function(e, t, s) {
  return e.h === 2 && (ee(t, s, (e = Ko(e)) === wt() ? void 0 : e), !0);
}), (function(e, t, s) {
  if (t != null) {
    if (t instanceof f) {
      const n = t.Ra;
      return void (n && (t = n(t), t != null && $s(e, s, _r(t).buffer)));
    }
    if (Array.isArray(t)) return;
  }
  da(e, t, s);
}), Zo)];
let kn, Ci = globalThis.trustedTypes;
function Pi(e) {
  kn === void 0 && (kn = (function() {
    let s = null;
    if (!Ci) return s;
    try {
      const n = (r) => r;
      s = Ci.createPolicy("goog#html", { createHTML: n, createScript: n, createScriptURL: n });
    } catch {
    }
    return s;
  })());
  var t = kn;
  return new class {
    constructor(s) {
      this.g = s;
    }
    toString() {
      return this.g + "";
    }
  }(t ? t.createScriptURL(e) : e);
}
function o1(e, ...t) {
  if (t.length === 0) return Pi(e[0]);
  let s = e[0];
  for (let n = 0; n < t.length; n++) s += encodeURIComponent(t[n]) + e[n + 1];
  return Pi(s);
}
var ma = [0, N, Ee, O, -1, en, Ee, -1], a1 = class extends f {
  constructor(e) {
    super(e);
  }
}, ga = [0, O, A, O, Ee, -1, $t((function(e, t, s) {
  return (e.h === 0 || e.h === 2) && (t = Wt(t, 0 | t[g], s, !1, !1), e.h == 2 ? Ks(e, K2, t) : t.push(at(e.g)), !0);
}), (function(e, t, s) {
  if ((t = Yt(jt, t)) != null && t.length) {
    s = Er(e, s);
    for (let n = 0; n < t.length; n++) Ys(e.g, t[n]);
    Sr(e, s);
  }
}), Qo), A, -1, [0, O, -1], Ee, O, -1], ya = [0, A, -2], Ri = class extends f {
  constructor(e) {
    super(e);
  }
}, _a = [0], wa = [0, N, O, 1, O, -3], ue = class extends f {
  constructor(e) {
    super(e, 2);
  }
}, H = {};
H[336783863] = [0, A, O, -1, N, [0, [1, 2, 3, 4, 5, 6, 7, 8], k, _a, k, ga, k, ya, k, wa, k, ma, k, [0, A, -2], k, [0, A, Ee], k, [0, Ee, A]], [0, A], O, [0, [1, 3], [2, 4], k, [0, en], -1, k, [0, q], -1, z, [0, A, -1]], A];
var Di = [0, An, -1, Mt, -3, An, en, rt, Tt, An, -1, Mt, Tt, Mt, -2, rt];
function de(e, t) {
  Pn(e, 2, zt(t), "");
}
function L(e, t) {
  Xs(e, 3, t);
}
function v(e, t) {
  Xs(e, 4, t);
}
var Z = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 7, e);
  }
}, ns = [-1, {}], Ni = [0, A, 1, ns], Bi = [0, A, q, ns];
function fe(e, t) {
  Os(e, 1, Z, t);
}
function x(e, t) {
  Xs(e, 10, t);
}
function S(e, t) {
  Xs(e, 15, t);
}
var oe = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 1001, e);
  }
}, ba = [-500, z, [-500, rt, -1, q, -3, [-2, H, O], z, Ii, Tt, -1, Ni, Bi, z, [0, rt, Mt], rt, Di, Tt, q, 987, q], 4, z, [-500, A, -1, [-1, {}], 998, A], z, [-500, A, q, -1, [-2, {}, O], 997, q, -1], Tt, z, [-500, A, q, ns, 998, q], q, Tt, Ni, Bi, z, [0, rt, -1, ns], q, -2, Di, rt, -1, Mt, [0, Mt, r1], 978, ns, z, Ii];
oe.prototype.g = tn(ba);
var h1 = lt(oe, ba), c1 = class extends f {
  constructor(e) {
    super(e);
  }
}, va = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Ye(this, c1, 1);
  }
}, Ea = [0, z, [0, N, V, A, -1]], sn = lt(va, Ea), u1 = class extends f {
  constructor(e) {
    super(e);
  }
}, l1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Tn = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, u1, 2);
  }
  g() {
    return Ye(this, l1, 5);
  }
}, Sa = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, q, en, Ir, [0, Ee, [0, N, -3], [0, V, -3], [0, N, -1, [0, z, [0, N, -2]]], z, [0, V, -1, A, V]], A, -1, ht, z, [0, N, V], q, ht]), Aa = class extends f {
  constructor(e) {
    super(e);
  }
}, Ot = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, V, -4]]), ka = class extends f {
  constructor(e) {
    super(e);
  }
}, fs = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, V, -4]]), d1 = class extends f {
  constructor(e) {
    super(e);
  }
}, f1 = [0, N, -1, Ir, Ee], Ta = class extends f {
  constructor(e) {
    super(e);
  }
};
Ta.prototype.g = tn([0, V, -4, ht]);
var p1 = class extends f {
  constructor(e) {
    super(e);
  }
}, m1 = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, 1, N, A, Ea], ht]), Ui = class extends f {
  constructor(e) {
    super(e);
  }
}, g1 = class extends f {
  constructor(e) {
    super(e);
  }
  oa() {
    const e = No(this);
    return e ?? wt();
  }
}, y1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Fa = [1, 2], _1 = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, Fa, k, [0, Ir], k, [0, pa], N, A], ht]), Cr = class extends f {
  constructor(e) {
    super(e);
  }
}, La = [0, A, N, V, q, -1], Gi = class extends f {
  constructor(e) {
    super(e);
  }
}, w1 = [0, O, -1], Vi = class extends f {
  constructor(e) {
    super(e);
  }
}, Es = [1, 2, 3, 4, 5], Ps = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return No(this) != null;
  }
  h() {
    return ve(this, 2) != null;
  }
}, I = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Mo(Dt(this, 2)) ?? !1;
  }
}, xa = [0, pa, A, [0, N, ht, -1], [0, s1, ht]], U = [0, xa, O, [0, Es, k, wa, k, ga, k, ma, k, _a, k, ya], Ee], nn = class extends f {
  constructor(e) {
    super(e);
  }
}, Pr = [0, U, V, -1, N], b1 = xe(502141897, nn);
H[502141897] = Pr;
var v1 = lt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, [0, Ee, -1, t1, n1], f1]), Ma = class extends f {
  constructor(e) {
    super(e);
  }
}, Oa = class extends f {
  constructor(e) {
    super(e);
  }
}, Rr = [0, U, V, [0, U], O], Ia = [0, U, Pr, Rr, V, [0, [0, xa]]], E1 = xe(508968150, Oa);
H[508968150] = Ia, H[508968149] = Rr;
var Ca = class extends f {
  constructor(e) {
    super(e);
  }
}, S1 = xe(513916220, Ca);
H[513916220] = [0, U, Ia, N];
var At = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, Cr, 2);
  }
  g() {
    F(this, 2);
  }
}, Pa = [0, U, La];
H[478825465] = Pa;
var A1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Ra = class extends f {
  constructor(e) {
    super(e);
  }
}, Dr = class extends f {
  constructor(e) {
    super(e);
  }
}, Nr = class extends f {
  constructor(e) {
    super(e);
  }
}, Da = class extends f {
  constructor(e) {
    super(e);
  }
}, Hi = [0, U, [0, U], Pa, -1], Na = [0, U, V, N], Br = [0, U, V], Ba = [0, U, Na, Br, V], k1 = xe(479097054, Da);
H[479097054] = [0, U, Ba, Hi], H[463370452] = Hi, H[464864288] = Na;
var T1 = xe(462713202, Nr);
H[462713202] = Ba, H[474472470] = Br;
var F1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Ua = class extends f {
  constructor(e) {
    super(e);
  }
}, Ga = class extends f {
  constructor(e) {
    super(e);
  }
}, Va = class extends f {
  constructor(e) {
    super(e);
  }
}, Ur = [0, U, V, -1, N], Un = [0, U, V, O];
Va.prototype.g = tn([0, U, Br, [0, U], Pr, Rr, Ur, Un]);
var Ha = class extends f {
  constructor(e) {
    super(e);
  }
}, L1 = xe(456383383, Ha);
H[456383383] = [0, U, La];
var ja = class extends f {
  constructor(e) {
    super(e);
  }
}, x1 = xe(476348187, ja);
H[476348187] = [0, U, w1];
var za = class extends f {
  constructor(e) {
    super(e);
  }
}, ji = class extends f {
  constructor(e) {
    super(e);
  }
}, Wa = [0, Ee, -1], M1 = xe(458105876, class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    var e = this.u;
    const t = 0 | e[g], s = 2 & t;
    return e = (function(n, r, i) {
      var o = ji;
      const a = 2 & r;
      let h = !1;
      if (i == null) {
        if (a) return Ai();
        i = [];
      } else if (i.constructor === be) {
        if ((2 & i.L) == 0 || a) return i;
        i = i.X();
      } else Array.isArray(i) ? h = !!(2 & (0 | i[g])) : i = [];
      if (a) {
        if (!i.length) return Ai();
        h || (h = !0, Ht(i));
      } else h && (h = !1, i = Bo(i));
      return h || (64 & (0 | i[g]) ? i[g] &= -33 : 32 & r && Bs(i, 32)), R(n, r, 2, o = new be(i, o, B2, void 0)), o;
    })(e, t, qe(e, t, 2)), !s && ji && (e.ra = !0), e;
  }
});
H[458105876] = [0, Wa, e1, [!0, ht, [0, A, -1, q]]];
var Gr = class extends f {
  constructor(e) {
    super(e);
  }
}, Xa = xe(458105758, Gr);
H[458105758] = [0, U, A, Wa];
var Ka = class extends f {
  constructor(e) {
    super(e);
  }
}, O1 = xe(443442058, Ka);
H[443442058] = [0, U, A, N, V, q, -1, O, V], H[514774813] = Ur;
var Ya = class extends f {
  constructor(e) {
    super(e);
  }
}, I1 = xe(516587230, Ya);
function Gn(e, t) {
  return t = t ? t.clone() : new Cr(), e.displayNamesLocale !== void 0 ? F(t, 1, zt(e.displayNamesLocale)) : e.displayNamesLocale === void 0 && F(t, 1), e.maxResults !== void 0 ? Be(t, 2, e.maxResults) : "maxResults" in e && F(t, 2), e.scoreThreshold !== void 0 ? p(t, 3, e.scoreThreshold) : "scoreThreshold" in e && F(t, 3), e.categoryAllowlist !== void 0 ? Is(t, 4, e.categoryAllowlist) : "categoryAllowlist" in e && F(t, 4), e.categoryDenylist !== void 0 ? Is(t, 5, e.categoryDenylist) : "categoryDenylist" in e && F(t, 5), t;
}
function Vr(e, t = -1, s = "") {
  return { categories: e.map(((n) => ({ index: we(n, 1) ?? 0 ?? -1, score: B(n, 2) ?? 0, categoryName: ve(n, 3) ?? "" ?? "", displayName: ve(n, 4) ?? "" ?? "" }))), headIndex: t, headName: s };
}
function $a(e) {
  var o, a;
  var t = gt(e, 3, ut, mt()), s = gt(e, 2, jt, mt()), n = gt(e, 1, Rt, mt()), r = gt(e, 9, Rt, mt());
  const i = { categories: [], keypoints: [] };
  for (let h = 0; h < t.length; h++) i.categories.push({ score: t[h], index: s[h] ?? -1, categoryName: n[h] ?? "", displayName: r[h] ?? "" });
  if ((t = (o = E(e, Tn, 4)) == null ? void 0 : o.h()) && (i.boundingBox = { originX: we(t, 1) ?? 0, originY: we(t, 2) ?? 0, width: we(t, 3) ?? 0, height: we(t, 4) ?? 0, angle: 0 }), (a = E(e, Tn, 4)) == null ? void 0 : a.g().length) for (const h of E(e, Tn, 4).g()) i.keypoints.push({ x: bs(h, 1) ?? 0, y: bs(h, 2) ?? 0, score: bs(h, 4) ?? 0, label: ve(h, 3) ?? "" });
  return i;
}
function rn(e) {
  const t = [];
  for (const s of Ye(e, ka, 1)) t.push({ x: B(s, 1) ?? 0, y: B(s, 2) ?? 0, z: B(s, 3) ?? 0, visibility: B(s, 4) ?? 0 });
  return t;
}
function rs(e) {
  const t = [];
  for (const s of Ye(e, Aa, 1)) t.push({ x: B(s, 1) ?? 0, y: B(s, 2) ?? 0, z: B(s, 3) ?? 0, visibility: B(s, 4) ?? 0 });
  return t;
}
function zi(e) {
  return Array.from(e, ((t) => t > 127 ? t - 256 : t));
}
function Wi(e, t) {
  if (e.length !== t.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);
  let s = 0, n = 0, r = 0;
  for (let i = 0; i < e.length; i++) s += e[i] * t[i], n += e[i] * e[i], r += t[i] * t[i];
  if (n <= 0 || r <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return s / Math.sqrt(n * r);
}
let ys;
H[516587230] = [0, U, Ur, Un, V], H[518928384] = Un;
const C1 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function qa() {
  if (ys === void 0) try {
    await WebAssembly.instantiate(C1), ys = !0;
  } catch {
    ys = !1;
  }
  return ys;
}
async function Qt(e, t = o1``) {
  const s = await qa() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${t}/${e}_${s}.js`, wasmBinaryPath: `${t}/${e}_${s}.wasm` };
}
var st = class {
};
function Ja() {
  var e = navigator;
  return typeof OffscreenCanvas < "u" && (!(function(t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  })(e) || !!((e = e.userAgent.match(/Version\/([\d]+).*Safari/)) && e.length >= 1 && Number(e[1]) >= 17));
}
async function Xi(e) {
  if (typeof importScripts != "function") {
    const t = document.createElement("script");
    return t.src = e.toString(), t.crossOrigin = "anonymous", new Promise(((s, n) => {
      t.addEventListener("load", (() => {
        s();
      }), !1), t.addEventListener("error", ((r) => {
        n(r);
      }), !1), document.body.appendChild(t);
    }));
  }
  importScripts(e.toString());
}
function Za(e) {
  return e.videoWidth !== void 0 ? [e.videoWidth, e.videoHeight] : e.naturalWidth !== void 0 ? [e.naturalWidth, e.naturalHeight] : e.displayWidth !== void 0 ? [e.displayWidth, e.displayHeight] : [e.width, e.height];
}
function m(e, t, s) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), s(t = e.i.stringToNewUTF8(t)), e.i._free(t);
}
function Ki(e, t, s) {
  if (!e.i.canvas) throw Error("No OpenGL canvas configured.");
  if (s ? e.i._bindTextureToStream(s) : e.i._bindTextureToCanvas(), !(s = e.i.canvas.getContext("webgl2") || e.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  e.i.gpuOriginForWebTexturesIsBottomLeft && s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, !0), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, t), e.i.gpuOriginForWebTexturesIsBottomLeft && s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, !1);
  const [n, r] = Za(t);
  return !e.l || n === e.i.canvas.width && r === e.i.canvas.height || (e.i.canvas.width = n, e.i.canvas.height = r), [n, r];
}
function Yi(e, t, s) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const n = new Uint32Array(t.length);
  for (let r = 0; r < t.length; r++) n[r] = e.i.stringToNewUTF8(t[r]);
  t = e.i._malloc(4 * n.length), e.i.HEAPU32.set(n, t >> 2), s(t);
  for (const r of n) e.i._free(r);
  e.i._free(t);
}
function Pe(e, t, s) {
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = s;
}
function tt(e, t, s) {
  let n = [];
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = (r, i, o) => {
    i ? (s(n, o), n = []) : n.push(r);
  };
}
st.forVisionTasks = function(e) {
  return Qt("vision", e);
}, st.forTextTasks = function(e) {
  return Qt("text", e);
}, st.forGenAiExperimentalTasks = function(e) {
  return Qt("genai_experimental", e);
}, st.forGenAiTasks = function(e) {
  return Qt("genai", e);
}, st.forAudioTasks = function(e) {
  return Qt("audio", e);
}, st.isSimdSupported = function() {
  return qa();
};
async function P1(e, t, s, n) {
  return e = await (async (r, i, o, a, h) => {
    if (i && await Xi(i), !self.ModuleFactory || o && (await Xi(o), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && h && ((i = self.Module).locateFile = h.locateFile, h.mainScriptUrlOrBlob && (i.mainScriptUrlOrBlob = h.mainScriptUrlOrBlob)), h = await self.ModuleFactory(self.Module || h), self.ModuleFactory = self.Module = void 0, new r(h, a);
  })(e, s.wasmLoaderPath, s.assetLoaderPath, t, { locateFile: (r) => r.endsWith(".wasm") ? s.wasmBinaryPath.toString() : s.assetBinaryPath && r.endsWith(".data") ? s.assetBinaryPath.toString() : r }), await e.o(n), e;
}
function Fn(e, t) {
  const s = E(e.baseOptions, Ps, 1) || new Ps();
  typeof t == "string" ? (F(s, 2, zt(t)), F(s, 1)) : t instanceof Uint8Array && (F(s, 1, er(t, !1)), F(s, 2)), y(e.baseOptions, 0, 1, s);
}
function $i(e) {
  try {
    const t = e.G.length;
    if (t === 1) throw Error(e.G[0].message);
    if (t > 1) throw Error("Encountered multiple errors: " + e.G.map(((s) => s.message)).join(", "));
  } finally {
    e.G = [];
  }
}
function d(e, t) {
  e.B = Math.max(e.B, t);
}
function on(e, t) {
  e.A = new Z(), de(e.A, "PassThroughCalculator"), L(e.A, "free_memory"), v(e.A, "free_memory_unused_out"), x(t, "free_memory"), fe(t, e.A);
}
function Bt(e, t) {
  L(e.A, t), v(e.A, t + "_unused_out");
}
function an(e) {
  e.g.addBoolToStream(!0, "free_memory", e.B);
}
var Ss = class {
  constructor(e) {
    this.g = e, this.G = [], this.B = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(e, t = !0) {
    var s, n, r, i, o, a;
    if (t) {
      const h = e.baseOptions || {};
      if ((s = e.baseOptions) != null && s.modelAssetBuffer && ((n = e.baseOptions) != null && n.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!((r = E(this.baseOptions, Ps, 1)) != null && r.g() || (i = E(this.baseOptions, Ps, 1)) != null && i.h() || (o = e.baseOptions) != null && o.modelAssetBuffer || (a = e.baseOptions) != null && a.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if ((function(c, u) {
        let l = E(c.baseOptions, Vi, 3);
        if (!l) {
          var w = l = new Vi(), C = new Ri();
          ss(w, 4, Es, C);
        }
        "delegate" in u && (u.delegate === "GPU" ? (u = l, w = new a1(), ss(u, 2, Es, w)) : (u = l, w = new Ri(), ss(u, 4, Es, w))), y(c.baseOptions, 0, 3, l);
      })(this, h), h.modelAssetPath) return fetch(h.modelAssetPath.toString()).then(((c) => {
        if (c.ok) return c.arrayBuffer();
        throw Error(`Failed to fetch model: ${h.modelAssetPath} (${c.status})`);
      })).then(((c) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(c), !0, !1, !1), Fn(this, "/model.dat"), this.m(), this.I();
      }));
      if (h.modelAssetBuffer instanceof Uint8Array) Fn(this, h.modelAssetBuffer);
      else if (h.modelAssetBuffer) return (async function(c) {
        const u = [];
        for (var l = 0; ; ) {
          const { done: w, value: C } = await c.read();
          if (w) break;
          u.push(C), l += C.length;
        }
        if (u.length === 0) return new Uint8Array(0);
        if (u.length === 1) return u[0];
        c = new Uint8Array(l), l = 0;
        for (const w of u) c.set(w, l), l += w.length;
        return c;
      })(h.modelAssetBuffer).then(((c) => {
        Fn(this, c), this.m(), this.I();
      }));
    }
    return this.m(), this.I(), Promise.resolve();
  }
  I() {
  }
  da() {
    let e;
    if (this.g.da(((t) => {
      e = h1(t);
    })), !e) throw Error("Failed to retrieve CalculatorGraphConfig");
    return e;
  }
  setGraph(e, t) {
    this.g.attachErrorListener(((s, n) => {
      this.G.push(Error(n));
    })), this.g.La(), this.g.setGraph(e, t), this.A = void 0, $i(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), $i(this);
  }
  close() {
    this.A = void 0, this.g.closeGraph();
  }
};
function Ke(e, t) {
  if (!e) throw Error(`Unable to obtain required WebGL resource: ${t}`);
  return e;
}
Ss.prototype.close = Ss.prototype.close, (function(e, t) {
  e = e.split(".");
  var s, n = _t;
  for ((e[0] in n) || n.execScript === void 0 || n.execScript("var " + e[0]); e.length && (s = e.shift()); ) e.length || t === void 0 ? n = n[s] && n[s] !== Object.prototype[s] ? n[s] : n[s] = {} : n[s] = t;
})("TaskRunner", Ss);
class R1 {
  constructor(t, s, n, r) {
    this.g = t, this.h = s, this.m = n, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function qi(e, t, s) {
  const n = e.g;
  if (s = Ke(n.createShader(s), "Failed to create WebGL shader"), n.shaderSource(s, t), n.compileShader(s), !n.getShaderParameter(s, n.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${n.getShaderInfoLog(s)}`);
  return n.attachShader(e.h, s), s;
}
function Ji(e, t) {
  const s = e.g, n = Ke(s.createVertexArray(), "Failed to create vertex array");
  s.bindVertexArray(n);
  const r = Ke(s.createBuffer(), "Failed to create buffer");
  s.bindBuffer(s.ARRAY_BUFFER, r), s.enableVertexAttribArray(e.O), s.vertexAttribPointer(e.O, 2, s.FLOAT, !1, 0, 0), s.bufferData(s.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), s.STATIC_DRAW);
  const i = Ke(s.createBuffer(), "Failed to create buffer");
  return s.bindBuffer(s.ARRAY_BUFFER, i), s.enableVertexAttribArray(e.I), s.vertexAttribPointer(e.I, 2, s.FLOAT, !1, 0, 0), s.bufferData(s.ARRAY_BUFFER, new Float32Array(t ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), s.STATIC_DRAW), s.bindBuffer(s.ARRAY_BUFFER, null), s.bindVertexArray(null), new R1(s, n, r, i);
}
function Hr(e, t) {
  if (e.g) {
    if (t !== e.g) throw Error("Cannot change GL context once initialized");
  } else e.g = t;
}
function jr(e, t, s, n) {
  return Hr(e, t), e.h || (e.m(), e.C()), s ? (e.s || (e.s = Ji(e, !0)), s = e.s) : (e.v || (e.v = Ji(e, !1)), s = e.v), t.useProgram(e.h), s.bind(), e.l(), e = n(), s.g.bindVertexArray(null), e;
}
function hn(e, t, s) {
  return Hr(e, t), e = Ke(t.createTexture(), "Failed to create texture"), t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, s ?? t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s ?? t.LINEAR), t.bindTexture(t.TEXTURE_2D, null), e;
}
function cn(e, t, s) {
  Hr(e, t), e.A || (e.A = Ke(t.createFramebuffer(), "Failed to create framebuffe.")), t.bindFramebuffer(t.FRAMEBUFFER, e.A), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, s, 0);
}
function zr(e) {
  var t;
  (t = e.g) == null || t.bindFramebuffer(e.g.FRAMEBUFFER, null);
}
var Wr = class {
  G() {
    return `
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `;
  }
  m() {
    const e = this.g;
    if (this.h = Ke(e.createProgram(), "Failed to create WebGL program"), this.aa = qi(this, `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`, e.VERTEX_SHADER), this.Z = qi(this, this.G(), e.FRAGMENT_SHADER), e.linkProgram(this.h), !e.getProgramParameter(this.h, e.LINK_STATUS)) throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);
    this.O = e.getAttribLocation(this.h, "aVertex"), this.I = e.getAttribLocation(this.h, "aTex");
  }
  C() {
  }
  l() {
  }
  close() {
    if (this.h) {
      const e = this.g;
      e.deleteProgram(this.h), e.deleteShader(this.aa), e.deleteShader(this.Z);
    }
    this.A && this.g.deleteFramebuffer(this.A), this.v && this.v.close(), this.s && this.s.close();
  }
};
function Ve(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((s) => s instanceof Uint8Array));
    case 1:
      return e.g.find(((s) => s instanceof Float32Array));
    case 2:
      return e.g.find(((s) => typeof WebGLTexture < "u" && s instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function Vn(e) {
  var t = Ve(e, 1);
  if (!t) {
    if (t = Ve(e, 0)) t = new Float32Array(t).map(((n) => n / 255));
    else {
      t = new Float32Array(e.width * e.height);
      const n = Ut(e);
      var s = Xr(e);
      if (cn(s, n, Qa(e)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
        s = new Float32Array(e.width * e.height * 4), n.readPixels(0, 0, e.width, e.height, n.RGBA, n.FLOAT, s);
        for (let r = 0, i = 0; r < t.length; ++r, i += 4) t[r] = s[i];
      } else n.readPixels(0, 0, e.width, e.height, n.RED, n.FLOAT, t);
    }
    e.g.push(t);
  }
  return t;
}
function Qa(e) {
  let t = Ve(e, 2);
  if (!t) {
    const s = Ut(e);
    t = t2(e);
    const n = Vn(e), r = e2(e);
    s.texImage2D(s.TEXTURE_2D, 0, r, e.width, e.height, 0, s.RED, s.FLOAT, n), Hn(e);
  }
  return t;
}
function Ut(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ke(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function e2(e) {
  if (e = Ut(e), !_s) if (e.getExtension("EXT_color_buffer_float") && e.getExtension("OES_texture_float_linear") && e.getExtension("EXT_float_blend")) _s = e.R32F;
  else {
    if (!e.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    _s = e.R16F;
  }
  return _s;
}
function Xr(e) {
  return e.l || (e.l = new Wr()), e.l;
}
function t2(e) {
  const t = Ut(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let s = Ve(e, 2);
  return s || (s = hn(Xr(e), t, e.m ? t.LINEAR : t.NEAREST), e.g.push(s), e.j = !0), t.bindTexture(t.TEXTURE_2D, s), s;
}
function Hn(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
var _s, W = class {
  constructor(e, t, s, n, r, i, o) {
    this.g = e, this.m = t, this.j = s, this.canvas = n, this.l = r, this.width = i, this.height = o, this.j && --Zi === 0 && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
  }
  Fa() {
    return !!Ve(this, 0);
  }
  ja() {
    return !!Ve(this, 1);
  }
  P() {
    return !!Ve(this, 2);
  }
  ia() {
    return (t = Ve(e = this, 0)) || (t = Vn(e), t = new Uint8Array(t.map(((s) => 255 * s))), e.g.push(t)), t;
    var e, t;
  }
  ha() {
    return Vn(this);
  }
  M() {
    return Qa(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let s;
      if (t instanceof Uint8Array) s = new Uint8Array(t);
      else if (t instanceof Float32Array) s = new Float32Array(t);
      else {
        if (!(t instanceof WebGLTexture)) throw Error(`Type is not supported: ${t}`);
        {
          const n = Ut(this), r = Xr(this);
          n.activeTexture(n.TEXTURE1), s = hn(r, n, this.m ? n.LINEAR : n.NEAREST), n.bindTexture(n.TEXTURE_2D, s);
          const i = e2(this);
          n.texImage2D(n.TEXTURE_2D, 0, i, this.width, this.height, 0, n.RED, n.FLOAT, null), n.bindTexture(n.TEXTURE_2D, null), cn(r, n, s), jr(r, n, !1, (() => {
            t2(this), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.drawArrays(n.TRIANGLE_FAN, 0, 4), Hn(this);
          })), zr(r), Hn(this);
        }
      }
      e.push(s);
    }
    return new W(e, this.m, this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ut(this).deleteTexture(Ve(this, 2)), Zi = -1;
  }
};
W.prototype.close = W.prototype.close, W.prototype.clone = W.prototype.clone, W.prototype.getAsWebGLTexture = W.prototype.M, W.prototype.getAsFloat32Array = W.prototype.ha, W.prototype.getAsUint8Array = W.prototype.ia, W.prototype.hasWebGLTexture = W.prototype.P, W.prototype.hasFloat32Array = W.prototype.ja, W.prototype.hasUint8Array = W.prototype.Fa;
var Zi = 250;
function Ne(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((s) => s instanceof ImageData));
    case 1:
      return e.g.find(((s) => typeof ImageBitmap < "u" && s instanceof ImageBitmap));
    case 2:
      return e.g.find(((s) => typeof WebGLTexture < "u" && s instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function s2(e) {
  var t = Ne(e, 0);
  if (!t) {
    t = Gt(e);
    const s = un(e), n = new Uint8Array(e.width * e.height * 4);
    cn(s, t, As(e)), t.readPixels(0, 0, e.width, e.height, t.RGBA, t.UNSIGNED_BYTE, n), zr(s), t = new ImageData(new Uint8ClampedArray(n.buffer), e.width, e.height), e.g.push(t);
  }
  return t;
}
function As(e) {
  let t = Ne(e, 2);
  if (!t) {
    const s = Gt(e);
    t = ks(e);
    const n = Ne(e, 1) || s2(e);
    s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, n), ts(e);
  }
  return t;
}
function Gt(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ke(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function un(e) {
  return e.l || (e.l = new Wr()), e.l;
}
function ks(e) {
  const t = Gt(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let s = Ne(e, 2);
  return s || (s = hn(un(e), t), e.g.push(s), e.m = !0), t.bindTexture(t.TEXTURE_2D, s), s;
}
function ts(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
function Qi(e) {
  const t = Gt(e);
  return jr(un(e), t, !0, (() => (function(s, n) {
    const r = s.canvas;
    if (r.width === s.width && r.height === s.height) return n();
    const i = r.width, o = r.height;
    return r.width = s.width, r.height = s.height, s = n(), r.width = i, r.height = o, s;
  })(e, (() => {
    if (t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), !(e.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return e.canvas.transferToImageBitmap();
  }))));
}
var X = class {
  constructor(e, t, s, n, r, i, o) {
    this.g = e, this.j = t, this.m = s, this.canvas = n, this.l = r, this.width = i, this.height = o, (this.j || this.m) && --eo === 0 && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ea() {
    return !!Ne(this, 0);
  }
  ka() {
    return !!Ne(this, 1);
  }
  P() {
    return !!Ne(this, 2);
  }
  Ca() {
    return s2(this);
  }
  Ba() {
    var e = Ne(this, 1);
    return e || (As(this), ks(this), e = Qi(this), ts(this), this.g.push(e), this.j = !0), e;
  }
  M() {
    return As(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let s;
      if (t instanceof ImageData) s = new ImageData(t.data, this.width, this.height);
      else if (t instanceof WebGLTexture) {
        const n = Gt(this), r = un(this);
        n.activeTexture(n.TEXTURE1), s = hn(r, n), n.bindTexture(n.TEXTURE_2D, s), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.width, this.height, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.bindTexture(n.TEXTURE_2D, null), cn(r, n, s), jr(r, n, !1, (() => {
          ks(this), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.drawArrays(n.TRIANGLE_FAN, 0, 4), ts(this);
        })), zr(r), ts(this);
      } else {
        if (!(t instanceof ImageBitmap)) throw Error(`Type is not supported: ${t}`);
        As(this), ks(this), s = Qi(this), ts(this);
      }
      e.push(s);
    }
    return new X(e, this.ka(), this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ne(this, 1).close(), this.m && Gt(this).deleteTexture(Ne(this, 2)), eo = -1;
  }
};
X.prototype.close = X.prototype.close, X.prototype.clone = X.prototype.clone, X.prototype.getAsWebGLTexture = X.prototype.M, X.prototype.getAsImageBitmap = X.prototype.Ba, X.prototype.getAsImageData = X.prototype.Ca, X.prototype.hasWebGLTexture = X.prototype.P, X.prototype.hasImageBitmap = X.prototype.ka, X.prototype.hasImageData = X.prototype.Ea;
var eo = 250;
function Me(...e) {
  return e.map((([t, s]) => ({ start: t, end: s })));
}
const D1 = /* @__PURE__ */ (function(e) {
  return class extends e {
    La() {
      this.i._registerModelResourcesGraphService();
    }
  };
})((to = class {
  constructor(e, t) {
    this.l = !0, this.i = e, this.g = null, this.h = 0, this.m = typeof this.i._addIntToInputStream == "function", t !== void 0 ? this.i.canvas = t : Ja() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(e) {
    const t = await (await fetch(e)).arrayBuffer();
    e = !(e.endsWith(".pbtxt") || e.endsWith(".textproto")), this.setGraph(new Uint8Array(t), e);
  }
  setGraphFromString(e) {
    this.setGraph(new TextEncoder().encode(e), !1);
  }
  setGraph(e, t) {
    const s = e.length, n = this.i._malloc(s);
    this.i.HEAPU8.set(e, n), t ? this.i._changeBinaryGraph(s, n) : this.i._changeTextGraph(s, n), this.i._free(n);
  }
  configureAudio(e, t, s, n, r) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), m(this, n || "input_audio", ((i) => {
      m(this, r = r || "audio_header", ((o) => {
        this.i._configureAudio(i, o, e, t ?? 0, s);
      }));
    }));
  }
  setAutoResizeCanvas(e) {
    this.l = e;
  }
  setAutoRenderToScreen(e) {
    this.i._setAutoRenderToScreen(e);
  }
  setGpuBufferVerticalFlip(e) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = e;
  }
  da(e) {
    Pe(this, "__graph_config__", ((t) => {
      e(t);
    })), m(this, "__graph_config__", ((t) => {
      this.i._getGraphConfig(t, void 0);
    })), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(e) {
    this.i.errorListener = e;
  }
  attachEmptyPacketListener(e, t) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[e] = t;
  }
  addAudioToStream(e, t, s) {
    this.addAudioToStreamWithShape(e, 0, 0, t, s);
  }
  addAudioToStreamWithShape(e, t, s, n, r) {
    const i = 4 * e.length;
    this.h !== i && (this.g && this.i._free(this.g), this.g = this.i._malloc(i), this.h = i), this.i.HEAPF32.set(e, this.g / 4), m(this, n, ((o) => {
      this.i._addAudioToInputStream(this.g, t, s, o, r);
    }));
  }
  addGpuBufferToStream(e, t, s) {
    m(this, t, ((n) => {
      const [r, i] = Ki(this, e, n);
      this.i._addBoundTextureToStream(n, r, i, s);
    }));
  }
  addBoolToStream(e, t, s) {
    m(this, t, ((n) => {
      this.i._addBoolToInputStream(e, n, s);
    }));
  }
  addDoubleToStream(e, t, s) {
    m(this, t, ((n) => {
      this.i._addDoubleToInputStream(e, n, s);
    }));
  }
  addFloatToStream(e, t, s) {
    m(this, t, ((n) => {
      this.i._addFloatToInputStream(e, n, s);
    }));
  }
  addIntToStream(e, t, s) {
    m(this, t, ((n) => {
      this.i._addIntToInputStream(e, n, s);
    }));
  }
  addUintToStream(e, t, s) {
    m(this, t, ((n) => {
      this.i._addUintToInputStream(e, n, s);
    }));
  }
  addStringToStream(e, t, s) {
    m(this, t, ((n) => {
      m(this, e, ((r) => {
        this.i._addStringToInputStream(r, n, s);
      }));
    }));
  }
  addStringRecordToStream(e, t, s) {
    m(this, t, ((n) => {
      Yi(this, Object.keys(e), ((r) => {
        Yi(this, Object.values(e), ((i) => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(e).length, n, s);
        }));
      }));
    }));
  }
  addProtoToStream(e, t, s, n) {
    m(this, s, ((r) => {
      m(this, t, ((i) => {
        const o = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, o), this.i._addProtoToInputStream(o, e.length, i, r, n), this.i._free(o);
      }));
    }));
  }
  addEmptyPacketToStream(e, t) {
    m(this, e, ((s) => {
      this.i._addEmptyPacketToInputStream(s, t);
    }));
  }
  addBoolVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateBoolVector(e.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const i of e) this.i._addBoolVectorEntry(r, i);
      this.i._addBoolVectorToInputStream(r, n, s);
    }));
  }
  addDoubleVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateDoubleVector(e.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const i of e) this.i._addDoubleVectorEntry(r, i);
      this.i._addDoubleVectorToInputStream(r, n, s);
    }));
  }
  addFloatVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateFloatVector(e.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const i of e) this.i._addFloatVectorEntry(r, i);
      this.i._addFloatVectorToInputStream(r, n, s);
    }));
  }
  addIntVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateIntVector(e.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const i of e) this.i._addIntVectorEntry(r, i);
      this.i._addIntVectorToInputStream(r, n, s);
    }));
  }
  addUintVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateUintVector(e.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const i of e) this.i._addUintVectorEntry(r, i);
      this.i._addUintVectorToInputStream(r, n, s);
    }));
  }
  addStringVectorToStream(e, t, s) {
    m(this, t, ((n) => {
      const r = this.i._allocateStringVector(e.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const i of e) m(this, i, ((o) => {
        this.i._addStringVectorEntry(r, o);
      }));
      this.i._addStringVectorToInputStream(r, n, s);
    }));
  }
  addBoolToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      this.i._addBoolToInputSidePacket(e, s);
    }));
  }
  addDoubleToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      this.i._addDoubleToInputSidePacket(e, s);
    }));
  }
  addFloatToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      this.i._addFloatToInputSidePacket(e, s);
    }));
  }
  addIntToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      this.i._addIntToInputSidePacket(e, s);
    }));
  }
  addUintToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      this.i._addUintToInputSidePacket(e, s);
    }));
  }
  addStringToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      m(this, e, ((n) => {
        this.i._addStringToInputSidePacket(n, s);
      }));
    }));
  }
  addProtoToInputSidePacket(e, t, s) {
    m(this, s, ((n) => {
      m(this, t, ((r) => {
        const i = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, i), this.i._addProtoToInputSidePacket(i, e.length, r, n), this.i._free(i);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateBoolVector(e.length);
      if (!n) throw Error("Unable to allocate new bool vector on heap.");
      for (const r of e) this.i._addBoolVectorEntry(n, r);
      this.i._addBoolVectorToInputSidePacket(n, s);
    }));
  }
  addDoubleVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateDoubleVector(e.length);
      if (!n) throw Error("Unable to allocate new double vector on heap.");
      for (const r of e) this.i._addDoubleVectorEntry(n, r);
      this.i._addDoubleVectorToInputSidePacket(n, s);
    }));
  }
  addFloatVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateFloatVector(e.length);
      if (!n) throw Error("Unable to allocate new float vector on heap.");
      for (const r of e) this.i._addFloatVectorEntry(n, r);
      this.i._addFloatVectorToInputSidePacket(n, s);
    }));
  }
  addIntVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateIntVector(e.length);
      if (!n) throw Error("Unable to allocate new int vector on heap.");
      for (const r of e) this.i._addIntVectorEntry(n, r);
      this.i._addIntVectorToInputSidePacket(n, s);
    }));
  }
  addUintVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateUintVector(e.length);
      if (!n) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const r of e) this.i._addUintVectorEntry(n, r);
      this.i._addUintVectorToInputSidePacket(n, s);
    }));
  }
  addStringVectorToInputSidePacket(e, t) {
    m(this, t, ((s) => {
      const n = this.i._allocateStringVector(e.length);
      if (!n) throw Error("Unable to allocate new string vector on heap.");
      for (const r of e) m(this, r, ((i) => {
        this.i._addStringVectorEntry(n, i);
      }));
      this.i._addStringVectorToInputSidePacket(n, s);
    }));
  }
  attachBoolListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachBoolListener(s);
    }));
  }
  attachBoolVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachBoolVectorListener(s);
    }));
  }
  attachIntListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachIntListener(s);
    }));
  }
  attachIntVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachIntVectorListener(s);
    }));
  }
  attachUintListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachUintListener(s);
    }));
  }
  attachUintVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachUintVectorListener(s);
    }));
  }
  attachDoubleListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachDoubleListener(s);
    }));
  }
  attachDoubleVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachDoubleVectorListener(s);
    }));
  }
  attachFloatListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachFloatListener(s);
    }));
  }
  attachFloatVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachFloatVectorListener(s);
    }));
  }
  attachStringListener(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachStringListener(s);
    }));
  }
  attachStringVectorListener(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.i._attachStringVectorListener(s);
    }));
  }
  attachProtoListener(e, t, s) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachProtoListener(n, s || !1);
    }));
  }
  attachProtoVectorListener(e, t, s) {
    tt(this, e, t), m(this, e, ((n) => {
      this.i._attachProtoVectorListener(n, s || !1);
    }));
  }
  attachAudioListener(e, t, s) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Pe(this, e, ((n, r) => {
      n = new Float32Array(n.buffer, n.byteOffset, n.length / 4), t(n, r);
    })), m(this, e, ((n) => {
      this.i._attachAudioListener(n, s || !1);
    }));
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends to {
  get ea() {
    return this.i;
  }
  qa(e, t, s) {
    m(this, t, ((n) => {
      const [r, i] = Ki(this, e, n);
      this.ea._addBoundTextureAsImageToStream(n, r, i, s);
    }));
  }
  U(e, t) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.ea._attachImageListener(s);
    }));
  }
  ca(e, t) {
    tt(this, e, t), m(this, e, ((s) => {
      this.ea._attachImageVectorListener(s);
    }));
  }
}));
var to, Se = class extends D1 {
};
async function b(e, t, s) {
  return (async function(n, r, i, o) {
    return P1(n, r, i, o);
  })(e, s.canvas ?? (Ja() ? void 0 : document.createElement("canvas")), t, s);
}
function n2(e, t, s, n) {
  if (e.T) {
    const i = new Ta();
    if (s != null && s.regionOfInterest) {
      if (!e.pa) throw Error("This task doesn't support region-of-interest.");
      var r = s.regionOfInterest;
      if (r.left >= r.right || r.top >= r.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (r.left < 0 || r.top < 0 || r.right > 1 || r.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      p(i, 1, (r.left + r.right) / 2), p(i, 2, (r.top + r.bottom) / 2), p(i, 4, r.right - r.left), p(i, 3, r.bottom - r.top);
    } else p(i, 1, 0.5), p(i, 2, 0.5), p(i, 4, 1), p(i, 3, 1);
    if (s != null && s.rotationDegrees) {
      if ((s == null ? void 0 : s.rotationDegrees) % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (p(i, 5, -Math.PI * s.rotationDegrees / 180), (s == null ? void 0 : s.rotationDegrees) % 180 != 0) {
        const [o, a] = Za(t);
        s = B(i, 3) * a / o, r = B(i, 4) * o / a, p(i, 4, s), p(i, 3, r);
      }
    }
    e.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", e.T, n);
  }
  e.g.qa(t, e.aa, n ?? performance.now()), e.finishProcessing();
}
function Ae(e, t, s) {
  var n;
  if ((n = e.baseOptions) != null && n.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  n2(e, t, s, e.B + 1);
}
function Ue(e, t, s, n) {
  var r;
  if (!((r = e.baseOptions) != null && r.g())) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  n2(e, t, s, n);
}
function Vt(e, t, s, n) {
  var r = t.data;
  const i = t.width, o = i * (t = t.height);
  if ((r instanceof Uint8Array || r instanceof Float32Array) && r.length !== o) throw Error("Unsupported channel count: " + r.length / o);
  return e = new W([r], s, !1, e.g.i.canvas, e.O, i, t), n ? e.clone() : e;
}
var ie = class extends Ss {
  constructor(e, t, s, n) {
    super(e), this.g = e, this.aa = t, this.T = s, this.pa = n, this.O = new Wr();
  }
  l(e, t = !0) {
    if ("runningMode" in e && as(this.baseOptions, 2, !!e.runningMode && e.runningMode !== "IMAGE"), e.canvas !== void 0 && this.g.i.canvas !== e.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(e, t);
  }
  close() {
    this.O.close(), super.close();
  }
};
ie.prototype.close = ie.prototype.close;
var me = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect_in", !1), this.j = { detections: [] }, y(e = this.h = new nn(), 0, 1, t = new I()), p(this.h, 2, 0.5), p(this.h, 3, 0.3);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "minDetectionConfidence" in e && p(this.h, 2, e.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in e && p(this.h, 3, e.minSuppressionThreshold ?? 0.3), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Ae(this, e, t), this.j;
  }
  F(e, t, s) {
    return this.j = { detections: [] }, Ue(this, e, s, t), this.j;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect_in"), S(e, "detections");
    const t = new ue();
    Fe(t, b1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect_in"), v(s, "DETECTIONS:detections"), s.o(t), fe(e, s), this.g.attachProtoVectorListener("detections", ((n, r) => {
      for (const i of n) n = Sa(i), this.j.detections.push($a(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
me.prototype.detectForVideo = me.prototype.F, me.prototype.detect = me.prototype.D, me.prototype.setOptions = me.prototype.o, me.createFromModelPath = async function(e, t) {
  return b(me, e, { baseOptions: { modelAssetPath: t } });
}, me.createFromModelBuffer = function(e, t) {
  return b(me, e, { baseOptions: { modelAssetBuffer: t } });
}, me.createFromOptions = function(e, t) {
  return b(me, e, t);
};
var Kr = Me([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), Yr = Me([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), $r = Me([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), r2 = Me([474, 475], [475, 476], [476, 477], [477, 474]), qr = Me([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), Jr = Me([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), i2 = Me([469, 470], [470, 471], [471, 472], [472, 469]), Zr = Me([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), o2 = [...Kr, ...Yr, ...$r, ...qr, ...Jr, ...Zr], a2 = Me([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function so(e) {
  e.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var P = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, y(e = this.h = new Oa(), 0, 1, t = new I()), this.v = new Ma(), y(this.h, 0, 3, this.v), this.s = new nn(), y(this.h, 0, 2, this.s), Be(this.s, 4, 1), p(this.s, 2, 0.5), p(this.v, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numFaces" in e && Be(this.s, 4, e.numFaces ?? 1), "minFaceDetectionConfidence" in e && p(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in e && p(this.v, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in e && (this.outputFacialTransformationMatrixes = !!e.outputFacialTransformationMatrixes), this.l(e);
  }
  D(e, t) {
    return so(this), Ae(this, e, t), this.j;
  }
  F(e, t, s) {
    return so(this), Ue(this, e, s, t), this.j;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "face_landmarks");
    const t = new ue();
    Fe(t, E1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "NORM_LANDMARKS:face_landmarks"), s.o(t), fe(e, s), this.g.attachProtoVectorListener("face_landmarks", ((n, r) => {
      for (const i of n) n = fs(i), this.j.faceLandmarks.push(rn(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((n) => {
      d(this, n);
    })), this.outputFaceBlendshapes && (S(e, "blendshapes"), v(s, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((n, r) => {
      if (this.outputFaceBlendshapes) for (const i of n) n = sn(i), this.j.faceBlendshapes.push(Vr(n.g() ?? []));
      d(this, r);
    })), this.g.attachEmptyPacketListener("blendshapes", ((n) => {
      d(this, n);
    }))), this.outputFacialTransformationMatrixes && (S(e, "face_geometry"), v(s, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((n, r) => {
      if (this.outputFacialTransformationMatrixes) for (const i of n) (n = E(v1(i), d1, 2)) && this.j.facialTransformationMatrixes.push({ rows: we(n, 1) ?? 0 ?? 0, columns: we(n, 2) ?? 0 ?? 0, data: gt(n, 3, ut, mt()).slice() ?? [] });
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_geometry", ((n) => {
      d(this, n);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
P.prototype.detectForVideo = P.prototype.F, P.prototype.detect = P.prototype.D, P.prototype.setOptions = P.prototype.o, P.createFromModelPath = function(e, t) {
  return b(P, e, { baseOptions: { modelAssetPath: t } });
}, P.createFromModelBuffer = function(e, t) {
  return b(P, e, { baseOptions: { modelAssetBuffer: t } });
}, P.createFromOptions = function(e, t) {
  return b(P, e, t);
}, P.FACE_LANDMARKS_LIPS = Kr, P.FACE_LANDMARKS_LEFT_EYE = Yr, P.FACE_LANDMARKS_LEFT_EYEBROW = $r, P.FACE_LANDMARKS_LEFT_IRIS = r2, P.FACE_LANDMARKS_RIGHT_EYE = qr, P.FACE_LANDMARKS_RIGHT_EYEBROW = Jr, P.FACE_LANDMARKS_RIGHT_IRIS = i2, P.FACE_LANDMARKS_FACE_OVAL = Zr, P.FACE_LANDMARKS_CONTOURS = o2, P.FACE_LANDMARKS_TESSELATION = a2;
var Re = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !0), y(e = this.j = new Ca(), 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.j, I, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    return super.l(e);
  }
  Oa(e, t, s) {
    const n = typeof t != "function" ? t : {};
    if (this.h = typeof t == "function" ? t : s, Ae(this, e, n ?? {}), !this.h) return this.s;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "stylized_image");
    const t = new ue();
    Fe(t, S1, this.j);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "STYLIZED_IMAGE:stylized_image"), s.o(t), fe(e, s), this.g.U("stylized_image", ((n, r) => {
      var i = !this.h, o = n.data, a = n.width;
      const h = a * (n = n.height);
      if (o instanceof Uint8Array) if (o.length === 3 * h) {
        const c = new Uint8ClampedArray(4 * h);
        for (let u = 0; u < h; ++u) c[4 * u] = o[3 * u], c[4 * u + 1] = o[3 * u + 1], c[4 * u + 2] = o[3 * u + 2], c[4 * u + 3] = 255;
        o = new ImageData(c, a, n);
      } else {
        if (o.length !== 4 * h) throw Error("Unsupported channel count: " + o.length / h);
        o = new ImageData(new Uint8ClampedArray(o.buffer, o.byteOffset, o.length), a, n);
      }
      else if (!(o instanceof WebGLTexture)) throw Error(`Unsupported format: ${o.constructor.name}`);
      a = new X([o], !1, !1, this.g.i.canvas, this.O, a, n), this.s = i = i ? a.clone() : a, this.h && this.h(i), d(this, r);
    })), this.g.attachEmptyPacketListener("stylized_image", ((n) => {
      this.s = null, this.h && this.h(null), d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
Re.prototype.stylize = Re.prototype.Oa, Re.prototype.setOptions = Re.prototype.o, Re.createFromModelPath = function(e, t) {
  return b(Re, e, { baseOptions: { modelAssetPath: t } });
}, Re.createFromModelBuffer = function(e, t) {
  return b(Re, e, { baseOptions: { modelAssetBuffer: t } });
}, Re.createFromOptions = function(e, t) {
  return b(Re, e, t);
};
var Qr = Me([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function no(e) {
  e.gestures = [], e.landmarks = [], e.worldLandmarks = [], e.handedness = [];
}
function ro(e) {
  return e.gestures.length === 0 ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: e.gestures, landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handedness: e.handedness, handednesses: e.handedness };
}
function io(e, t = !0) {
  const s = [];
  for (const r of e) {
    var n = sn(r);
    e = [];
    for (const i of n.g()) n = t && we(i, 1) != null ? we(i, 1) ?? 0 : -1, e.push({ score: B(i, 2) ?? 0, index: n, categoryName: ve(i, 3) ?? "" ?? "", displayName: ve(i, 4) ?? "" ?? "" });
    s.push(e);
  }
  return s;
}
var ae = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.j = new Da(), 0, 1, t = new I()), this.s = new Nr(), y(this.j, 0, 2, this.s), this.C = new Dr(), y(this.s, 0, 3, this.C), this.v = new Ra(), y(this.s, 0, 2, this.v), this.h = new A1(), y(this.j, 0, 3, this.h), p(this.v, 2, 0.5), p(this.s, 4, 0.5), p(this.C, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, I, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    var r, i, o, a;
    if (Be(this.v, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && p(this.v, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.s, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && p(this.C, 2, e.minHandPresenceConfidence ?? 0.5), e.cannedGesturesClassifierOptions) {
      var t = new At(), s = t, n = Gn(e.cannedGesturesClassifierOptions, (r = E(this.h, At, 3)) == null ? void 0 : r.h());
      y(s, 0, 2, n), y(this.h, 0, 3, t);
    } else e.cannedGesturesClassifierOptions === void 0 && ((i = E(this.h, At, 3)) == null || i.g());
    return e.customGesturesClassifierOptions ? (y(s = t = new At(), 0, 2, n = Gn(e.customGesturesClassifierOptions, (o = E(this.h, At, 4)) == null ? void 0 : o.h())), y(this.h, 0, 4, t)) : e.customGesturesClassifierOptions === void 0 && ((a = E(this.h, At, 4)) == null || a.g()), this.l(e);
  }
  Ja(e, t) {
    return no(this), Ae(this, e, t), ro(this);
  }
  Ka(e, t, s) {
    return no(this), Ue(this, e, s, t), ro(this);
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "hand_gestures"), S(e, "hand_landmarks"), S(e, "world_hand_landmarks"), S(e, "handedness");
    const t = new ue();
    Fe(t, k1, this.j);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "HAND_GESTURES:hand_gestures"), v(s, "LANDMARKS:hand_landmarks"), v(s, "WORLD_LANDMARKS:world_hand_landmarks"), v(s, "HANDEDNESS:handedness"), s.o(t), fe(e, s), this.g.attachProtoVectorListener("hand_landmarks", ((n, r) => {
      for (const i of n) {
        n = fs(i);
        const o = [];
        for (const a of Ye(n, ka, 1)) o.push({ x: B(a, 1) ?? 0, y: B(a, 2) ?? 0, z: B(a, 3) ?? 0, visibility: B(a, 4) ?? 0 });
        this.landmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((n) => {
      d(this, n);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((n, r) => {
      for (const i of n) {
        n = Ot(i);
        const o = [];
        for (const a of Ye(n, Aa, 1)) o.push({ x: B(a, 1) ?? 0, y: B(a, 2) ?? 0, z: B(a, 3) ?? 0, visibility: B(a, 4) ?? 0 });
        this.worldLandmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((n) => {
      d(this, n);
    })), this.g.attachProtoVectorListener("hand_gestures", ((n, r) => {
      this.gestures.push(...io(n, !1)), d(this, r);
    })), this.g.attachEmptyPacketListener("hand_gestures", ((n) => {
      d(this, n);
    })), this.g.attachProtoVectorListener("handedness", ((n, r) => {
      this.handedness.push(...io(n)), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
function oo(e) {
  return { landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handednesses: e.handedness, handedness: e.handedness };
}
ae.prototype.recognizeForVideo = ae.prototype.Ka, ae.prototype.recognize = ae.prototype.Ja, ae.prototype.setOptions = ae.prototype.o, ae.createFromModelPath = function(e, t) {
  return b(ae, e, { baseOptions: { modelAssetPath: t } });
}, ae.createFromModelBuffer = function(e, t) {
  return b(ae, e, { baseOptions: { modelAssetBuffer: t } });
}, ae.createFromOptions = function(e, t) {
  return b(ae, e, t);
}, ae.HAND_CONNECTIONS = Qr;
var ne = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.h = new Nr(), 0, 1, t = new I()), this.s = new Dr(), y(this.h, 0, 3, this.s), this.j = new Ra(), y(this.h, 0, 2, this.j), Be(this.j, 3, 1), p(this.j, 2, 0.5), p(this.s, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numHands" in e && Be(this.j, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && p(this.j, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && p(this.s, 2, e.minHandPresenceConfidence ?? 0.5), this.l(e);
  }
  D(e, t) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ae(this, e, t), oo(this);
  }
  F(e, t, s) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ue(this, e, s, t), oo(this);
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "hand_landmarks"), S(e, "world_hand_landmarks"), S(e, "handedness");
    const t = new ue();
    Fe(t, T1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "LANDMARKS:hand_landmarks"), v(s, "WORLD_LANDMARKS:world_hand_landmarks"), v(s, "HANDEDNESS:handedness"), s.o(t), fe(e, s), this.g.attachProtoVectorListener("hand_landmarks", ((n, r) => {
      for (const i of n) n = fs(i), this.landmarks.push(rn(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((n) => {
      d(this, n);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((n, r) => {
      for (const i of n) n = Ot(i), this.worldLandmarks.push(rs(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((n) => {
      d(this, n);
    })), this.g.attachProtoVectorListener("handedness", ((n, r) => {
      var i = this.handedness, o = i.push;
      const a = [];
      for (const h of n) {
        n = sn(h);
        const c = [];
        for (const u of n.g()) c.push({ score: B(u, 2) ?? 0, index: we(u, 1) ?? 0 ?? -1, categoryName: ve(u, 3) ?? "" ?? "", displayName: ve(u, 4) ?? "" ?? "" });
        a.push(c);
      }
      o.call(i, ...a), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ne.prototype.detectForVideo = ne.prototype.F, ne.prototype.detect = ne.prototype.D, ne.prototype.setOptions = ne.prototype.o, ne.createFromModelPath = function(e, t) {
  return b(ne, e, { baseOptions: { modelAssetPath: t } });
}, ne.createFromModelBuffer = function(e, t) {
  return b(ne, e, { baseOptions: { modelAssetBuffer: t } });
}, ne.createFromOptions = function(e, t) {
  return b(ne, e, t);
}, ne.HAND_CONNECTIONS = Qr;
var h2 = Me([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function ao(e) {
  e.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function ho(e) {
  try {
    if (!e.C) return e.h;
    e.C(e.h);
  } finally {
    an(e);
  }
}
function ws(e, t) {
  e = fs(e), t.push(rn(e));
}
var M = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "input_frames_image", null, !1), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, y(e = this.j = new Va(), 0, 1, t = new I()), this.J = new Dr(), y(this.j, 0, 2, this.J), this.Z = new F1(), y(this.j, 0, 3, this.Z), this.s = new nn(), y(this.j, 0, 4, this.s), this.H = new Ma(), y(this.j, 0, 5, this.H), this.v = new Ua(), y(this.j, 0, 6, this.v), this.K = new Ga(), y(this.j, 0, 7, this.K), p(this.s, 2, 0.5), p(this.s, 3, 0.3), p(this.H, 2, 0.5), p(this.v, 2, 0.5), p(this.v, 3, 0.3), p(this.K, 2, 0.5), p(this.J, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, I, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    return "minFaceDetectionConfidence" in e && p(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in e && p(this.s, 3, e.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in e && p(this.H, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "minPoseDetectionConfidence" in e && p(this.v, 2, e.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in e && p(this.v, 3, e.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in e && p(this.K, 2, e.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in e && (this.outputPoseSegmentationMasks = !!e.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in e && p(this.J, 2, e.minHandLandmarksConfidence ?? 0.5), this.l(e);
  }
  D(e, t, s) {
    const n = typeof t != "function" ? t : {};
    return this.C = typeof t == "function" ? t : s, ao(this), Ae(this, e, n), ho(this);
  }
  F(e, t, s, n) {
    const r = typeof s != "function" ? s : {};
    return this.C = typeof s == "function" ? s : n, ao(this), Ue(this, e, r, t), ho(this);
  }
  m() {
    var e = new oe();
    x(e, "input_frames_image"), S(e, "pose_landmarks"), S(e, "pose_world_landmarks"), S(e, "face_landmarks"), S(e, "left_hand_landmarks"), S(e, "left_hand_world_landmarks"), S(e, "right_hand_landmarks"), S(e, "right_hand_world_landmarks");
    const t = new ue(), s = new Oi();
    Pn(s, 1, zt("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(r, i) {
      if (i != null) if (Array.isArray(i)) F(r, 2, Ro(i));
      else {
        if (!(typeof i == "string" || i instanceof We || cs(i))) throw Error("invalid value in Any.value field: " + i + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        Pn(r, 2, er(i, !1), wt());
      }
    })(s, this.j.g());
    const n = new Z();
    de(n, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Os(n, 8, Oi, s), L(n, "IMAGE:input_frames_image"), v(n, "POSE_LANDMARKS:pose_landmarks"), v(n, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), v(n, "FACE_LANDMARKS:face_landmarks"), v(n, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), v(n, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), v(n, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), v(n, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), n.o(t), fe(e, n), on(this, e), this.g.attachProtoListener("pose_landmarks", ((r, i) => {
      ws(r, this.h.poseLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("pose_world_landmarks", ((r, i) => {
      var o = this.h.poseWorldLandmarks;
      r = Ot(r), o.push(rs(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((r) => {
      d(this, r);
    })), this.outputPoseSegmentationMasks && (v(n, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), Bt(this, "pose_segmentation_mask"), this.g.U("pose_segmentation_mask", ((r, i) => {
      this.h.poseSegmentationMasks = [Vt(this, r, !0, !this.C)], d(this, i);
    })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((r) => {
      this.h.poseSegmentationMasks = [], d(this, r);
    }))), this.g.attachProtoListener("face_landmarks", ((r, i) => {
      ws(r, this.h.faceLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((r) => {
      d(this, r);
    })), this.outputFaceBlendshapes && (S(e, "extra_blendshapes"), v(n, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((r, i) => {
      var o = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (r = sn(r), o.push(Vr(r.g() ?? []))), d(this, i);
    })), this.g.attachEmptyPacketListener("extra_blendshapes", ((r) => {
      d(this, r);
    }))), this.g.attachProtoListener("left_hand_landmarks", ((r, i) => {
      ws(r, this.h.leftHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("left_hand_world_landmarks", ((r, i) => {
      var o = this.h.leftHandWorldLandmarks;
      r = Ot(r), o.push(rs(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_landmarks", ((r, i) => {
      ws(r, this.h.rightHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_world_landmarks", ((r, i) => {
      var o = this.h.rightHandWorldLandmarks;
      r = Ot(r), o.push(rs(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((r) => {
      d(this, r);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
M.prototype.detectForVideo = M.prototype.F, M.prototype.detect = M.prototype.D, M.prototype.setOptions = M.prototype.o, M.createFromModelPath = function(e, t) {
  return b(M, e, { baseOptions: { modelAssetPath: t } });
}, M.createFromModelBuffer = function(e, t) {
  return b(M, e, { baseOptions: { modelAssetBuffer: t } });
}, M.createFromOptions = function(e, t) {
  return b(M, e, t);
}, M.HAND_CONNECTIONS = Qr, M.POSE_CONNECTIONS = h2, M.FACE_LANDMARKS_LIPS = Kr, M.FACE_LANDMARKS_LEFT_EYE = Yr, M.FACE_LANDMARKS_LEFT_EYEBROW = $r, M.FACE_LANDMARKS_LEFT_IRIS = r2, M.FACE_LANDMARKS_RIGHT_EYE = qr, M.FACE_LANDMARKS_RIGHT_EYEBROW = Jr, M.FACE_LANDMARKS_RIGHT_IRIS = i2, M.FACE_LANDMARKS_FACE_OVAL = Zr, M.FACE_LANDMARKS_CONTOURS = o2, M.FACE_LANDMARKS_TESSELATION = a2;
var ge = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "input_image", "norm_rect", !0), this.j = { classifications: [] }, y(e = this.h = new Ha(), 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return y(this.h, 0, 2, Gn(e, E(this.h, Cr, 2))), this.l(e);
  }
  sa(e, t) {
    return this.j = { classifications: [] }, Ae(this, e, t), this.j;
  }
  ta(e, t, s) {
    return this.j = { classifications: [] }, Ue(this, e, s, t), this.j;
  }
  m() {
    var e = new oe();
    x(e, "input_image"), x(e, "norm_rect"), S(e, "classifications");
    const t = new ue();
    Fe(t, L1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), L(s, "IMAGE:input_image"), L(s, "NORM_RECT:norm_rect"), v(s, "CLASSIFICATIONS:classifications"), s.o(t), fe(e, s), this.g.attachProtoListener("classifications", ((n, r) => {
      this.j = (function(i) {
        const o = { classifications: Ye(i, p1, 1).map(((a) => {
          var h;
          return Vr(((h = E(a, va, 4)) == null ? void 0 : h.g()) ?? [], we(a, 2) ?? 0, ve(a, 3) ?? "");
        })) };
        return Ms(Dt(i, 2)) != null && (o.timestampMs = Ms(Dt(i, 2)) ?? 0), o;
      })(m1(n)), d(this, r);
    })), this.g.attachEmptyPacketListener("classifications", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ge.prototype.classifyForVideo = ge.prototype.ta, ge.prototype.classify = ge.prototype.sa, ge.prototype.setOptions = ge.prototype.o, ge.createFromModelPath = function(e, t) {
  return b(ge, e, { baseOptions: { modelAssetPath: t } });
}, ge.createFromModelBuffer = function(e, t) {
  return b(ge, e, { baseOptions: { modelAssetBuffer: t } });
}, ge.createFromOptions = function(e, t) {
  return b(ge, e, t);
};
var he = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !0), this.h = new ja(), this.embeddings = { embeddings: [] }, y(e = this.h, 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    var t = this.h, s = E(this.h, Gi, 2);
    return s = s ? s.clone() : new Gi(), e.l2Normalize !== void 0 ? as(s, 1, e.l2Normalize) : "l2Normalize" in e && F(s, 1), e.quantize !== void 0 ? as(s, 2, e.quantize) : "quantize" in e && F(s, 2), y(t, 0, 2, s), this.l(e);
  }
  za(e, t) {
    return Ae(this, e, t), this.embeddings;
  }
  Aa(e, t, s) {
    return Ue(this, e, s, t), this.embeddings;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "embeddings_out");
    const t = new ue();
    Fe(t, x1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "EMBEDDINGS:embeddings_out"), s.o(t), fe(e, s), this.g.attachProtoListener("embeddings_out", ((n, r) => {
      n = _1(n), this.embeddings = (function(i) {
        return { embeddings: Ye(i, y1, 1).map(((o) => {
          var h, c;
          const a = { headIndex: we(o, 3) ?? 0 ?? -1, headName: ve(o, 4) ?? "" ?? "" };
          if (Go(o, Ui, En(o, 1)) !== void 0) o = gt(o = E(o, Ui, En(o, 1)), 1, ut, mt()), a.floatEmbedding = o.slice();
          else {
            const u = new Uint8Array(0);
            a.quantizedEmbedding = ((c = (h = E(o, g1, En(o, 2))) == null ? void 0 : h.oa()) == null ? void 0 : c.h()) ?? u;
          }
          return a;
        })), timestampMs: Ms(Dt(i, 2)) ?? 0 };
      })(n), d(this, r);
    })), this.g.attachEmptyPacketListener("embeddings_out", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
he.cosineSimilarity = function(e, t) {
  if (e.floatEmbedding && t.floatEmbedding) e = Wi(e.floatEmbedding, t.floatEmbedding);
  else {
    if (!e.quantizedEmbedding || !t.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    e = Wi(zi(e.quantizedEmbedding), zi(t.quantizedEmbedding));
  }
  return e;
}, he.prototype.embedForVideo = he.prototype.Aa, he.prototype.embed = he.prototype.za, he.prototype.setOptions = he.prototype.o, he.createFromModelPath = function(e, t) {
  return b(he, e, { baseOptions: { modelAssetPath: t } });
}, he.createFromModelBuffer = function(e, t) {
  return b(he, e, { baseOptions: { modelAssetBuffer: t } });
}, he.createFromOptions = function(e, t) {
  return b(he, e, t);
};
var jn = class {
  constructor(e, t, s) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = s;
  }
  close() {
    var e, t;
    (e = this.confidenceMasks) == null || e.forEach(((s) => {
      s.close();
    })), (t = this.categoryMask) == null || t.close();
  }
};
function co(e) {
  e.categoryMask = void 0, e.confidenceMasks = void 0, e.qualityScores = void 0;
}
function uo(e) {
  try {
    const t = new jn(e.confidenceMasks, e.categoryMask, e.qualityScores);
    if (!e.j) return t;
    e.j(t);
  } finally {
    an(e);
  }
}
jn.prototype.close = jn.prototype.close;
var se = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.s = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Gr(), this.v = new za(), y(this.h, 0, 3, this.v), y(e = this.h, 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? F(this.h, 2, zt(e.displayNamesLocale)) : "displayNamesLocale" in e && F(this.h, 2), "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  I() {
    (function(e) {
      var s, n;
      const t = Ye(e.da(), Z, 1).filter(((r) => (ve(r, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
      if (e.s = [], t.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      t.length === 1 && (((n = (s = E(t[0], ue, 7)) == null ? void 0 : s.l()) == null ? void 0 : n.g()) ?? /* @__PURE__ */ new Map()).forEach(((r, i) => {
        e.s[Number(i)] = ve(r, 1) ?? "";
      }));
    })(this);
  }
  segment(e, t, s) {
    const n = typeof t != "function" ? t : {};
    return this.j = typeof t == "function" ? t : s, co(this), Ae(this, e, n), uo(this);
  }
  Ma(e, t, s, n) {
    const r = typeof s != "function" ? s : {};
    return this.j = typeof s == "function" ? s : n, co(this), Ue(this, e, r, t), uo(this);
  }
  Da() {
    return this.s;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect");
    const t = new ue();
    Fe(t, Xa, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), s.o(t), fe(e, s), on(this, e), this.outputConfidenceMasks && (S(e, "confidence_masks"), v(s, "CONFIDENCE_MASKS:confidence_masks"), Bt(this, "confidence_masks"), this.g.ca("confidence_masks", ((n, r) => {
      this.confidenceMasks = n.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((n) => {
      this.confidenceMasks = [], d(this, n);
    }))), this.outputCategoryMask && (S(e, "category_mask"), v(s, "CATEGORY_MASK:category_mask"), Bt(this, "category_mask"), this.g.U("category_mask", ((n, r) => {
      this.categoryMask = Vt(this, n, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((n) => {
      this.categoryMask = void 0, d(this, n);
    }))), S(e, "quality_scores"), v(s, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((n, r) => {
      this.qualityScores = n, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((n) => {
      this.categoryMask = void 0, d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
se.prototype.getLabels = se.prototype.Da, se.prototype.segmentForVideo = se.prototype.Ma, se.prototype.segment = se.prototype.segment, se.prototype.setOptions = se.prototype.o, se.createFromModelPath = function(e, t) {
  return b(se, e, { baseOptions: { modelAssetPath: t } });
}, se.createFromModelBuffer = function(e, t) {
  return b(se, e, { baseOptions: { modelAssetBuffer: t } });
}, se.createFromOptions = function(e, t) {
  return b(se, e, t);
};
var zn = class {
  constructor(e, t, s) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = s;
  }
  close() {
    var e, t;
    (e = this.confidenceMasks) == null || e.forEach(((s) => {
      s.close();
    })), (t = this.categoryMask) == null || t.close();
  }
};
zn.prototype.close = zn.prototype.close;
var N1 = class extends f {
  constructor(e) {
    super(e);
  }
}, kt = [0, N, -2], Rs = [0, Ge, -3, O, Ge, -1], lo = [0, Rs], fo = [0, Rs, N, -1], Ln = class extends f {
  constructor(e) {
    super(e);
  }
}, po = [0, Ge, -1, O], B1 = class extends f {
  constructor(e) {
    super(e);
  }
}, mo = class extends f {
  constructor(e) {
    super(e);
  }
}, Wn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], c2 = class extends f {
  constructor(e) {
    super(e);
  }
};
c2.prototype.g = tn([0, z, [0, Wn, k, Rs, k, [0, Rs, kt], k, lo, k, [0, lo, kt], k, po, k, [0, Ge, -3, O, Ee], k, [0, Ge, -3, O], k, [0, A, Ge, -2, O, N, O, -1, 2, Ge, kt], k, fo, k, [0, fo, kt], Ge, kt, A, k, [0, Ge, -3, O, kt, -1], k, [0, z, po]], A, [0, A, N, -1, O]]);
var De = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Gr(), this.s = new za(), y(this.h, 0, 3, this.s), y(e = this.h, 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  segment(e, t, s, n) {
    const r = typeof s != "function" ? s : {};
    this.j = typeof s == "function" ? s : n, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, s = this.B + 1, n = new c2();
    const i = new mo();
    var o = new N1();
    if (Be(o, 1, 255), y(i, 0, 12, o), t.keypoint && t.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (t.keypoint) {
      var a = new Ln();
      as(a, 3, !0), p(a, 1, t.keypoint.x), p(a, 2, t.keypoint.y), ss(i, 5, Wn, a);
    } else {
      if (!t.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a of (o = new B1(), t.scribble)) as(t = new Ln(), 3, !0), p(t, 1, a.x), p(t, 2, a.y), Os(o, 1, Ln, t);
      ss(i, 15, Wn, o);
    }
    Os(n, 1, mo, i), this.g.addProtoToStream(n.g(), "drishti.RenderData", "roi_in", s), Ae(this, e, r);
    e: {
      try {
        const c = new zn(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = c;
          break e;
        }
        this.j(c);
      } finally {
        an(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "roi_in"), x(e, "norm_rect_in");
    const t = new ue();
    Fe(t, Xa, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), L(s, "IMAGE:image_in"), L(s, "ROI:roi_in"), L(s, "NORM_RECT:norm_rect_in"), s.o(t), fe(e, s), on(this, e), this.outputConfidenceMasks && (S(e, "confidence_masks"), v(s, "CONFIDENCE_MASKS:confidence_masks"), Bt(this, "confidence_masks"), this.g.ca("confidence_masks", ((n, r) => {
      this.confidenceMasks = n.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((n) => {
      this.confidenceMasks = [], d(this, n);
    }))), this.outputCategoryMask && (S(e, "category_mask"), v(s, "CATEGORY_MASK:category_mask"), Bt(this, "category_mask"), this.g.U("category_mask", ((n, r) => {
      this.categoryMask = Vt(this, n, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((n) => {
      this.categoryMask = void 0, d(this, n);
    }))), S(e, "quality_scores"), v(s, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((n, r) => {
      this.qualityScores = n, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((n) => {
      this.categoryMask = void 0, d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
De.prototype.segment = De.prototype.segment, De.prototype.setOptions = De.prototype.o, De.createFromModelPath = function(e, t) {
  return b(De, e, { baseOptions: { modelAssetPath: t } });
}, De.createFromModelBuffer = function(e, t) {
  return b(De, e, { baseOptions: { modelAssetBuffer: t } });
}, De.createFromOptions = function(e, t) {
  return b(De, e, t);
};
var ye = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "input_frame_gpu", "norm_rect", !1), this.j = { detections: [] }, y(e = this.h = new Ka(), 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? F(this.h, 2, zt(e.displayNamesLocale)) : "displayNamesLocale" in e && F(this.h, 2), e.maxResults !== void 0 ? Be(this.h, 3, e.maxResults) : "maxResults" in e && F(this.h, 3), e.scoreThreshold !== void 0 ? p(this.h, 4, e.scoreThreshold) : "scoreThreshold" in e && F(this.h, 4), e.categoryAllowlist !== void 0 ? Is(this.h, 5, e.categoryAllowlist) : "categoryAllowlist" in e && F(this.h, 5), e.categoryDenylist !== void 0 ? Is(this.h, 6, e.categoryDenylist) : "categoryDenylist" in e && F(this.h, 6), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Ae(this, e, t), this.j;
  }
  F(e, t, s) {
    return this.j = { detections: [] }, Ue(this, e, s, t), this.j;
  }
  m() {
    var e = new oe();
    x(e, "input_frame_gpu"), x(e, "norm_rect"), S(e, "detections");
    const t = new ue();
    Fe(t, O1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.ObjectDetectorGraph"), L(s, "IMAGE:input_frame_gpu"), L(s, "NORM_RECT:norm_rect"), v(s, "DETECTIONS:detections"), s.o(t), fe(e, s), this.g.attachProtoVectorListener("detections", ((n, r) => {
      for (const i of n) n = Sa(i), this.j.detections.push($a(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((n) => {
      d(this, n);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ye.prototype.detectForVideo = ye.prototype.F, ye.prototype.detect = ye.prototype.D, ye.prototype.setOptions = ye.prototype.o, ye.createFromModelPath = async function(e, t) {
  return b(ye, e, { baseOptions: { modelAssetPath: t } });
}, ye.createFromModelBuffer = function(e, t) {
  return b(ye, e, { baseOptions: { modelAssetBuffer: t } });
}, ye.createFromOptions = function(e, t) {
  return b(ye, e, t);
};
var Xn = class {
  constructor(e, t, s) {
    this.landmarks = e, this.worldLandmarks = t, this.segmentationMasks = s;
  }
  close() {
    var e;
    (e = this.segmentationMasks) == null || e.forEach(((t) => {
      t.close();
    }));
  }
};
function go(e) {
  e.landmarks = [], e.worldLandmarks = [], e.segmentationMasks = void 0;
}
function yo(e) {
  try {
    const t = new Xn(e.landmarks, e.worldLandmarks, e.segmentationMasks);
    if (!e.s) return t;
    e.s(t);
  } finally {
    an(e);
  }
}
Xn.prototype.close = Xn.prototype.close;
var ce = class extends ie {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, y(e = this.h = new Ya(), 0, 1, t = new I()), this.v = new Ga(), y(this.h, 0, 3, this.v), this.j = new Ua(), y(this.h, 0, 2, this.j), Be(this.j, 4, 1), p(this.j, 2, 0.5), p(this.v, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numPoses" in e && Be(this.j, 4, e.numPoses ?? 1), "minPoseDetectionConfidence" in e && p(this.j, 2, e.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in e && p(this.v, 2, e.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in e && (this.outputSegmentationMasks = e.outputSegmentationMasks ?? !1), this.l(e);
  }
  D(e, t, s) {
    const n = typeof t != "function" ? t : {};
    return this.s = typeof t == "function" ? t : s, go(this), Ae(this, e, n), yo(this);
  }
  F(e, t, s, n) {
    const r = typeof s != "function" ? s : {};
    return this.s = typeof s == "function" ? s : n, go(this), Ue(this, e, r, t), yo(this);
  }
  m() {
    var e = new oe();
    x(e, "image_in"), x(e, "norm_rect"), S(e, "normalized_landmarks"), S(e, "world_landmarks"), S(e, "segmentation_masks");
    const t = new ue();
    Fe(t, I1, this.h);
    const s = new Z();
    de(s, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), L(s, "IMAGE:image_in"), L(s, "NORM_RECT:norm_rect"), v(s, "NORM_LANDMARKS:normalized_landmarks"), v(s, "WORLD_LANDMARKS:world_landmarks"), s.o(t), fe(e, s), on(this, e), this.g.attachProtoVectorListener("normalized_landmarks", ((n, r) => {
      this.landmarks = [];
      for (const i of n) n = fs(i), this.landmarks.push(rn(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("normalized_landmarks", ((n) => {
      this.landmarks = [], d(this, n);
    })), this.g.attachProtoVectorListener("world_landmarks", ((n, r) => {
      this.worldLandmarks = [];
      for (const i of n) n = Ot(i), this.worldLandmarks.push(rs(n));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_landmarks", ((n) => {
      this.worldLandmarks = [], d(this, n);
    })), this.outputSegmentationMasks && (v(s, "SEGMENTATION_MASK:segmentation_masks"), Bt(this, "segmentation_masks"), this.g.ca("segmentation_masks", ((n, r) => {
      this.segmentationMasks = n.map(((i) => Vt(this, i, !0, !this.s))), d(this, r);
    })), this.g.attachEmptyPacketListener("segmentation_masks", ((n) => {
      this.segmentationMasks = [], d(this, n);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ce.prototype.detectForVideo = ce.prototype.F, ce.prototype.detect = ce.prototype.D, ce.prototype.setOptions = ce.prototype.o, ce.createFromModelPath = function(e, t) {
  return b(ce, e, { baseOptions: { modelAssetPath: t } });
}, ce.createFromModelBuffer = function(e, t) {
  return b(ce, e, { baseOptions: { modelAssetBuffer: t } });
}, ce.createFromOptions = function(e, t) {
  return b(ce, e, t);
}, ce.POSE_CONNECTIONS = h2;
function Ds(e, t, s) {
  return e * (1 - s) + t * s;
}
function U1(e, t, s) {
  return {
    x: Ds(e.x, t.x, s),
    y: Ds(e.y, t.y, s)
  };
}
function je(e, t) {
  const s = t.x - e.x, n = t.y - e.y;
  return Math.sqrt(s * s + n * n);
}
function u2(e, t) {
  return Math.atan2(t.y - e.y, t.x - e.x);
}
function G1(e, t, s) {
  if (e.length < 264)
    return {
      center: { x: t / 2, y: s / 2 },
      scale: 1,
      rotation: 0
    };
  const i = e[33], o = e[263], a = (i.x + o.x) / 2, h = (i.y + o.y) / 2, c = {
    x: a * t,
    y: h * s
  }, l = je(
    { x: i.x * t, y: i.y * s },
    { x: o.x * t, y: o.y * s }
  ) / s * 3, w = u2(
    { x: i.x * t, y: i.y * s },
    { x: o.x * t, y: o.y * s }
  );
  return { center: c, scale: l, rotation: w };
}
function V1(e, t, s) {
  const c = {
    center: { x: t / 2, y: s / 2 },
    forehead: { x: t / 2, y: s / 3 },
    chin: { x: t / 2, y: s * 2 / 3 },
    eyeDistance: t * 0.2,
    faceHeight: s * 0.4,
    faceWidth: t * 0.3,
    rotation: 0
  };
  if (e.length < 468)
    return c;
  const u = e[33], l = e[263], w = e[10], C = e[152], Y = e[234], J = e[454], K = {
    x: (u.x + l.x) / 2 * t,
    y: (u.y + l.y) / 2 * s
  }, te = {
    x: w.x * t,
    y: w.y * s
  }, Oe = {
    x: C.x * t,
    y: C.y * s
  }, ke = je(
    { x: u.x * t, y: u.y * s },
    { x: l.x * t, y: l.y * s }
  ), Ie = je(te, Oe), dt = je(
    { x: Y.x * t, y: Y.y * s },
    { x: J.x * t, y: J.y * s }
  ), Je = u2(
    { x: u.x * t, y: u.y * s },
    { x: l.x * t, y: l.y * s }
  );
  return {
    center: K,
    forehead: te,
    chin: Oe,
    eyeDistance: ke,
    faceHeight: Ie,
    faceWidth: dt,
    rotation: Je
  };
}
const ze = {
  // WASM 路径（使用 CDN）
  wasmPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm",
  // 模型文件路径（本地 public 目录）
  models: {
    face: "/models/face_landmarker.task",
    hand: "/models/hand_landmarker.task"
  },
  // 模型初始化选项
  faceOptions: {
    numFaces: 1,
    // 只检测一张脸
    minFaceDetectionConfidence: 0.5,
    minFacePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputFaceBlendshapes: !0,
    // 输出 Blendshapes
    outputFacialTransformationMatrixes: !1
    // MVP 暂不用变换矩阵
  },
  handOptions: {
    numHands: 1,
    // 只检测一只手
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
  }
};
class H1 {
  constructor() {
    _(this, "faceLandmarker", null);
    _(this, "isInitialized", !1);
    _(this, "lastResult", null);
    // 平滑状态
    _(this, "smoothedCenter", { x: 0, y: 0 });
    _(this, "smoothedScale", 1);
    _(this, "smoothedRotation", 0);
    _(this, "smoothingAlpha", 0.3);
  }
  /**
   * 初始化 FaceLandmarker
   */
  async initialize(t, s, n) {
    try {
      console.log("[FaceTracker] 初始化中..."), n !== void 0 && (this.smoothingAlpha = n);
      const r = s || ze.wasmPath, i = await st.forVisionTasks(r);
      console.log("[FaceTracker] WASM 已加载");
      const o = {
        baseOptions: {
          modelAssetPath: t
        },
        runningMode: "VIDEO",
        ...ze.faceOptions
      };
      this.faceLandmarker = await P.createFromOptions(
        i,
        o
      ), console.log("[FaceTracker] FaceLandmarker 初始化完成"), this.isInitialized = !0;
    } catch (r) {
      throw console.error("[FaceTracker] 初始化失败:", r), r;
    }
  }
  /**
   * 检测视频帧中的人脸
   */
  detectForVideo(t, s) {
    if (!this.faceLandmarker || !this.isInitialized)
      return this.getEmptyResult(s);
    try {
      if (t.readyState < t.HAVE_CURRENT_DATA)
        return this.getEmptyResult(s);
      const n = this.faceLandmarker.detectForVideo(
        t,
        s
      );
      if (!n.faceLandmarks || n.faceLandmarks.length === 0)
        return this.getEmptyResult(s);
      const r = n.faceLandmarks[0], i = this.extractBlendshapes(n), o = t.videoWidth || 640, a = t.videoHeight || 480, h = G1(
        r,
        o,
        a
      );
      this.smoothedCenter = U1(
        this.smoothedCenter,
        h.center,
        this.smoothingAlpha
      ), this.smoothedScale = Ds(
        this.smoothedScale,
        h.scale,
        this.smoothingAlpha
      ), this.smoothedRotation = Ds(
        this.smoothedRotation,
        h.rotation,
        this.smoothingAlpha
      );
      const c = {
        landmarks: r,
        blendshapes: i,
        faceCenter: this.smoothedCenter,
        faceScale: this.smoothedScale,
        faceRotation: this.smoothedRotation,
        timestamp: s
      };
      return this.lastResult = c, c;
    } catch (n) {
      const r = n instanceof Error ? n.message : String(n);
      return console.error("[FaceTracker] 检测失败:", r, n), this.lastResult || this.getEmptyResult(s);
    }
  }
  /**
   * 从检测结果中提取 Blendshapes
   */
  extractBlendshapes(t) {
    if (!t.faceBlendshapes || t.faceBlendshapes.length === 0)
      return null;
    const s = /* @__PURE__ */ new Map();
    return t.faceBlendshapes[0].categories.forEach((r) => {
      s.set(r.categoryName, r.score);
    }), s;
  }
  /**
   * 获取空结果
   */
  getEmptyResult(t) {
    return {
      landmarks: null,
      blendshapes: null,
      faceCenter: this.smoothedCenter,
      faceScale: this.smoothedScale,
      faceRotation: this.smoothedRotation,
      timestamp: t
    };
  }
  /**
   * 重置状态
   */
  reset() {
    this.lastResult = null, this.smoothedCenter = { x: 0, y: 0 }, this.smoothedScale = 1, this.smoothedRotation = 0;
  }
  /**
   * 释放资源
   */
  dispose() {
    var t, s;
    this.faceLandmarker && ((s = (t = this.faceLandmarker).close) == null || s.call(t), this.faceLandmarker = null), this.isInitialized = !1;
  }
  isReady() {
    return this.isInitialized;
  }
}
class j1 {
  constructor() {
    _(this, "handLandmarker", null);
    _(this, "isInitialized", !1);
    _(this, "lastResult", null);
    // 稳定性追踪：连续检测到手的帧数
    _(this, "handDetectedFrames", 0);
    _(this, "minStableFrames", 3);
  }
  // 至少 3 帧才认为是稳定的
  /**
   * 初始化 HandLandmarker
   */
  async initialize(t, s) {
    try {
      console.log("[HandTracker] 初始化中...");
      const n = s || ze.wasmPath, r = await st.forVisionTasks(n);
      console.log("[HandTracker] WASM 已加载");
      const i = {
        baseOptions: {
          modelAssetPath: t
        },
        runningMode: "VIDEO",
        ...ze.handOptions
      };
      this.handLandmarker = await ne.createFromOptions(
        r,
        i
      ), console.log("[HandTracker] HandLandmarker 初始化完成"), this.isInitialized = !0;
    } catch (n) {
      throw console.error("[HandTracker] 初始化失败:", n), n;
    }
  }
  /**
   * 检测视频帧中的手部
   */
  detectForVideo(t, s) {
    var n, r;
    if (!this.handLandmarker || !this.isInitialized)
      return this.getEmptyResult(s);
    try {
      if (t.readyState < t.HAVE_CURRENT_DATA)
        return this.getEmptyResult(s);
      const i = this.handLandmarker.detectForVideo(
        t,
        s
      );
      if (!i.landmarks || i.landmarks.length === 0)
        return this.handDetectedFrames = 0, this.getEmptyResult(s);
      this.handDetectedFrames++;
      const o = i.landmarks[0], a = ((n = i.worldLandmarks) == null ? void 0 : n[0]) || null;
      let h = null;
      if (i.handedness && i.handedness.length > 0) {
        const u = i.handedness[0];
        u.displayName ? h = u.displayName : Array.isArray(u) && ((r = u[0]) != null && r.categoryName) && (h = u[0].categoryName);
      }
      const c = {
        landmarks: o,
        worldLandmarks: a,
        handedness: h,
        timestamp: s
      };
      return this.lastResult = c, c;
    } catch (i) {
      const o = i instanceof Error ? i.message : String(i);
      return console.error("[HandTracker] 检测失败:", o, i), this.handDetectedFrames = 0, this.lastResult || this.getEmptyResult(s);
    }
  }
  /**
   * 获取空结果
   */
  getEmptyResult(t) {
    return {
      landmarks: null,
      worldLandmarks: null,
      handedness: null,
      timestamp: t
    };
  }
  /**
   * 检查手部是否稳定检测到
   */
  isHandStable() {
    return this.handDetectedFrames >= this.minStableFrames;
  }
  /**
   * 获取连续检测到手的帧数
   */
  getHandDetectedFrames() {
    return this.handDetectedFrames;
  }
  /**
   * 重置状态
   */
  reset() {
    this.lastResult = null, this.handDetectedFrames = 0;
  }
  /**
   * 释放资源
   */
  dispose() {
    var t, s;
    this.handLandmarker && ((s = (t = this.handLandmarker).close) == null || s.call(t), this.handLandmarker = null), this.isInitialized = !1;
  }
  isReady() {
    return this.isInitialized;
  }
}
class z1 {
  // 需要 ~167ms (5 frames @ 30fps)
  constructor(t = 0.4, s = 0.05, n = 167, r = 30) {
    // 配置参数
    _(this, "jawOpenThreshold", 0.4);
    // jawOpen > 0.4 表示嘴巴打开（足以露出牙齿）
    _(this, "stableFrames", 0);
    // 需要连续保持打开的帧数
    _(this, "requiredStableFrames", 5);
    this.jawOpenThreshold = t, this.requiredStableFrames = Math.ceil(n / 1e3 * r);
  }
  /**
   * 检测露出牙齿的姿态（仅基于 jawOpen blendshape）
   */
  detect(t) {
    var c, u;
    const s = ((c = t.blendshapes) == null ? void 0 : c.get("jawOpen")) ?? 0, n = ((u = t.blendshapes) == null ? void 0 : u.get("mouthOpen")) ?? 0;
    s >= this.jawOpenThreshold ? this.stableFrames++ : this.stableFrames = 0;
    const i = this.stableFrames >= this.requiredStableFrames, o = Math.min(
      (s - this.jawOpenThreshold) / (1 - this.jawOpenThreshold),
      1
    ), a = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    ), h = Math.min(o * a, 1);
    return {
      isOpen: i,
      jawOpenScore: s,
      mouthOpenScore: n,
      confidence: h
    };
  }
  /**
   * 重置状态
   */
  reset() {
    this.stableFrames = 0;
  }
  /**
   * 获取稳定度（用于调试）
   */
  getStability() {
    return Math.min(this.stableFrames / this.requiredStableFrames, 1);
  }
  /**
   * 设置参数
   */
  setThresholds(t, s, n, r = 30) {
    this.jawOpenThreshold = t, this.requiredStableFrames = Math.ceil(n / 1e3 * r), this.reset();
  }
}
class W1 {
  // 各手指的基部点索引
  constructor(t = 3) {
    // 握拳检测参数 - 设计文档 5.3: "至少 4 根手指满足'卷曲'即可认为握拳"
    _(this, "curledFingerThreshold", 3);
    // 至少 3 根手指弯曲（稍微宽松一点）
    // 手部关键点索引（MediaPipe Hand Landmarker）
    // 0: 手腕
    // 1-4: 拇指 (MCP, PIP, DIP, TIP)
    // 5-8: 食指 (MCP, PIP, DIP, TIP)
    // 9-12: 中指 (MCP, PIP, DIP, TIP)
    // 13-16: 无名指 (MCP, PIP, DIP, TIP)
    // 17-20: 小指 (MCP, PIP, DIP, TIP)
    _(this, "fingerTipIndices", [4, 8, 12, 16, 20]);
    // 各手指的顶端点索引
    _(this, "fingerBaseIndices", [2, 6, 10, 14, 18]);
    this.curledFingerThreshold = t;
  }
  /**
   * 检测握拳状态
   * 设计文档 5.3: "至少 4 根手指满足'卷曲'即可认为握拳"
   * 注意：不需要稳定性检测，因为用户在晃动时手会自然不稳定
   */
  detect(t) {
    if (!t.landmarks || t.landmarks.length < 21)
      return {
        isFist: !1,
        curledFingersCount: 0,
        handSpread: 1,
        confidence: 0
      };
    const s = t.landmarks;
    let n = 0;
    for (let a = 0; a < 5; a++)
      this.isFingerCurled(
        s[this.fingerBaseIndices[a]],
        s[this.fingerTipIndices[a]],
        s[0]
        // 手腕作为参考点
      ) && n++;
    const r = this.calculateHandSpread(s), i = n >= this.curledFingerThreshold, o = n / 5;
    return {
      isFist: i,
      curledFingersCount: n,
      handSpread: r,
      confidence: o
    };
  }
  /**
   * 判断单根手指是否弯曲
   */
  isFingerCurled(t, s, n) {
    const r = je(t, s), i = je(n, t);
    return r < i * 0.4;
  }
  /**
   * 计算手部展开程度（0 = 完全握拳，1 = 完全张开）
   */
  calculateHandSpread(t) {
    const s = t[9];
    let n = 0;
    for (const a of this.fingerTipIndices)
      n += je(t[a], s);
    const r = n / this.fingerTipIndices.length, i = je(t[0], t[this.fingerTipIndices[1]]);
    return Math.min(r / (i * 0.5), 1);
  }
  /**
   * 重置状态（简化版本，无需稳定性追踪）
   */
  reset() {
  }
}
class X1 {
  constructor(t = 0.02, s = 500, n = 0.15, r = 133, i = 30) {
    // 摇晃检测参数
    _(this, "speedThreshold", 0.02);
    // 速度阈值（相对于视频尺寸）
    _(this, "highSpeedRatio", 0.15);
    // 需要有 15% 的时间在高速运动
    _(this, "stableFrames", 0);
    _(this, "requiredStableFrames", 4);
    // ~133ms @ 30fps
    // 速度历史记录（用于计算平均速度）
    _(this, "speedHistory", []);
    _(this, "maxHistorySize", 15);
    // 500ms @ 30fps ≈ 15 帧
    // 前一帧的手部位置
    _(this, "prevHandPos", null);
    this.speedThreshold = t, this.highSpeedRatio = n, this.maxHistorySize = Math.ceil(s / 1e3 * i), this.requiredStableFrames = Math.ceil(r / 1e3 * i);
  }
  /**
   * 检测摇晃状态
   */
  detect(t, s = 640, n = 480) {
    if (!t.landmarks || t.landmarks.length < 9)
      return {
        isShaking: !1,
        currentSpeed: 0,
        avgSpeed: 0,
        highSpeedRatio: 0,
        confidence: 0
      };
    const r = t.landmarks[9], i = {
      x: r.x * s,
      y: r.y * n
    };
    let o = 0;
    this.prevHandPos && (o = je(this.prevHandPos, i) / Math.sqrt(s * n)), this.prevHandPos = { ...i }, this.speedHistory.push(o), this.speedHistory.length > this.maxHistorySize && this.speedHistory.shift();
    const a = this.speedHistory.length > 0 ? this.speedHistory.reduce((K, te) => K + te, 0) / this.speedHistory.length : 0, h = this.speedHistory.filter(
      (K) => K > this.speedThreshold
    ).length, c = this.speedHistory.length > 0 ? h / this.speedHistory.length : 0;
    c > this.highSpeedRatio ? this.stableFrames++ : this.stableFrames = 0;
    const l = this.stableFrames >= this.requiredStableFrames, w = Math.min(
      o / (this.speedThreshold * 2),
      1
    ), C = Math.max(
      0,
      (c - this.highSpeedRatio) / (1 - this.highSpeedRatio)
    ), Y = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    ), J = Math.min(
      w * C * Y,
      1
    );
    return {
      isShaking: l,
      currentSpeed: o,
      avgSpeed: a,
      highSpeedRatio: c,
      confidence: J
    };
  }
  /**
   * 重置状态
   */
  reset() {
    this.stableFrames = 0, this.speedHistory = [], this.prevHandPos = null;
  }
  /**
   * 获取稳定度
   */
  getStability() {
    return Math.min(this.stableFrames / this.requiredStableFrames, 1);
  }
}
class K1 {
  // 设计文档 5.3: 800ms 滑窗
  constructor() {
    _(this, "teethGate");
    _(this, "fist");
    _(this, "shake");
    // 运动方向追踪
    _(this, "prevHandX", null);
    _(this, "prevHandY", null);
    _(this, "movementHistory", []);
    _(this, "maxMovementHistory", 15);
    // ~500ms @ 30fps
    // 刷牙动作状态机
    _(this, "lastTeethOpenTime", 0);
    _(this, "brushingStartTime", 0);
    _(this, "completionCount", 0);
    _(this, "teethConfirmed", !1);
    // 露牙已确认（锁定状态，设计文档要求）
    // 时间阈值（按照设计文档）
    _(this, "teethLockTimeout", 3e3);
    // 露牙锁定超时：3秒没露牙则解锁
    _(this, "minBrushingDuration", 800);
    this.teethGate = new z1(0.4, 0.05, 167, 30), this.fist = new W1(3), this.shake = new X1(0.02, 500, 0.15, 133, 30);
  }
  /**
   * 检测刷牙手势
   *
   * 设计文档流程（分步骤）:
   * 1. S3_PromptTeeth: 等待用户露出牙齿
   * 2. S4_TeethConfirmed: 露牙通过 → 锁定状态（避免闭嘴又退回）
   * 3. S5_PromptBrushGesture: 等待握拳+晃动
   * 4. S6_BrushGestureConfirmed: 动作通过 → 得分
   */
  detect(t, s = 640, n = 480) {
    const r = Date.now(), i = this.teethGate.detect(
      t.faceResult
    ), o = this.fist.detect(t.handResult), a = this.shake.detect(
      t.handResult,
      s,
      n
    ), h = this.updateBrushingDirection(
      t,
      s,
      n
    );
    let c = "waiting", u = !1;
    if (i.isOpen)
      this.lastTeethOpenTime = r, this.teethConfirmed = !0;
    else if (this.teethConfirmed) {
      const w = r - this.lastTeethOpenTime;
      w > this.teethLockTimeout && (console.log("[BrushGesture] 露牙超时解锁（", w, "ms 未露牙）"), this.teethConfirmed = !1, this.brushingStartTime = 0);
    }
    if (this.teethConfirmed) {
      c = "teeth_open";
      const w = o.isFist, C = a.isShaking;
      if (w && C)
        c = "fist_ready", this.brushingStartTime === 0 && (this.brushingStartTime = r, console.log("[BrushGesture] 检测到握拳+晃动，开始计时")), r - this.brushingStartTime >= this.minBrushingDuration && (c = "complete", this.completionCount++, console.log("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0);
      else if (this.brushingStartTime > 0) {
        const Y = r - this.brushingStartTime;
        Y >= this.minBrushingDuration ? (c = "complete", this.completionCount++, console.log("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0) : (console.log("[BrushGesture] 动作中断，已持续:", Y, "ms"), this.brushingStartTime = 0, c = "teeth_open");
      }
    } else
      c = "waiting";
    const l = this.calculateConfidence(
      i,
      o,
      a,
      c
    );
    return {
      isBrushing: u,
      teethGate: i,
      fist: o,
      shake: a,
      brushingDirection: h,
      confidence: l,
      stage: c
    };
  }
  /**
   * 更新刷牙方向
   */
  updateBrushingDirection(t, s, n) {
    if (!t.handResult.landmarks || t.handResult.landmarks.length < 9)
      return "none";
    const r = t.handResult.landmarks[9], i = r.x * s, o = r.y * n;
    if (this.prevHandX === null || this.prevHandY === null)
      return this.prevHandX = i, this.prevHandY = o, "none";
    const a = i - this.prevHandX, h = o - this.prevHandY;
    if (this.movementHistory.push({ dx: a, dy: h }), this.movementHistory.length > this.maxMovementHistory && this.movementHistory.shift(), this.prevHandX = i, this.prevHandY = o, this.movementHistory.length < 3)
      return "none";
    const c = this.movementHistory.slice(-10);
    let u = 0, l = 0;
    for (const C of c)
      u += Math.abs(C.dy), l += Math.abs(C.dx);
    const w = 5;
    return u > l && u > w ? "vertical" : l > u && l > w ? "horizontal" : "none";
  }
  /**
   * 计算总置信度
   */
  calculateConfidence(t, s, n, r) {
    const o = {
      waiting: {
        teeth: 0,
        fist: 0,
        shake: 0
      },
      teeth_open: {
        teeth: 0.8,
        fist: 0,
        shake: 0
      },
      fist_ready: {
        teeth: 0.3,
        fist: 0.7,
        shake: 0
      },
      brushing: {
        teeth: 0.2,
        fist: 0.3,
        shake: 0.5
      },
      complete: {
        teeth: 0.2,
        fist: 0.3,
        shake: 0.5
      }
    }[r];
    return Math.min(
      t.confidence * o.teeth + s.confidence * o.fist + n.confidence * o.shake,
      1
    );
  }
  /**
   * 重置状态
   */
  reset() {
    this.teethGate.reset(), this.fist.reset(), this.shake.reset(), this.lastTeethOpenTime = 0, this.brushingStartTime = 0, this.teethConfirmed = !1, this.movementHistory = [], this.prevHandX = null, this.prevHandY = null;
  }
  /**
   * 获取完成次数
   */
  getCompletionCount() {
    return this.completionCount;
  }
  /**
   * 重置完成计数
   */
  resetCompletionCount() {
    this.completionCount = 0;
  }
}
class Y1 {
  // 准确率奖励
  constructor(t = 6e4, s = 10) {
    _(this, "currentState", "init");
    _(this, "brushGesture");
    _(this, "gameStats", {
      score: 0,
      brushCount: 0,
      successCount: 0,
      totalBrushTime: 0,
      accuracy: 0
    });
    // 事件回调
    _(this, "eventListeners", /* @__PURE__ */ new Map());
    // 时间追踪
    _(this, "gameDuration", 6e4);
    // 60 秒游戏
    _(this, "gameStartTime", 0);
    _(this, "brushStartTime", 0);
    _(this, "successStateEnterTime", 0);
    // 进入 success 状态的时间
    // 配置
    _(this, "scorePerBrush", 10);
    // 每次刷牙 10 分
    _(this, "bonusForAccuracy", 5);
    this.brushGesture = new K1(), this.gameDuration = t, this.scorePerBrush = s;
  }
  /**
   * 初始化游戏
   */
  initialize() {
    this.currentState = "init", this.gameStartTime = Date.now(), this.successStateEnterTime = 0, this.gameStats = {
      score: 0,
      brushCount: 0,
      successCount: 0,
      totalBrushTime: 0,
      accuracy: 0
    }, this.brushGesture.reset(), this.brushGesture.resetCompletionCount(), this.emitEvent({
      type: "game_initialized",
      timestamp: this.gameStartTime
    });
  }
  /**
   * 更新游戏状态
   */
  update(t, s) {
    const n = Date.now();
    if (this.currentState !== "init" && n - this.gameStartTime > this.gameDuration) {
      this.endGame();
      return;
    }
    const r = this.brushGesture.detect(t);
    this.currentState === "playing" && console.log(
      "[GameStateMachine] Playing - Fist:",
      "isFist:",
      r.fist.isFist,
      "curled:",
      r.fist.curledFingersCount,
      "spread:",
      r.fist.handSpread.toFixed(2),
      "Shake:",
      "isShaking:",
      r.shake.isShaking,
      "speed:",
      r.shake.currentSpeed.toFixed(3),
      "ratio:",
      r.shake.highSpeedRatio.toFixed(2)
    ), this.updateState(r), this.updateStats(r);
  }
  /**
   * 更新游戏状态
   */
  updateState(t) {
    switch (this.currentState) {
      case "init":
        this.transitionTo("ready");
        break;
      case "ready":
        t.teethGate.isOpen && (this.transitionTo("playing"), this.emitEvent({
          type: "teeth_open_detected",
          timestamp: Date.now(),
          data: t.teethGate
        }));
        break;
      case "playing":
        t.stage === "brushing" ? (this.transitionTo("brushing"), this.brushStartTime = Date.now(), this.emitEvent({
          type: "brushing_started",
          timestamp: this.brushStartTime
        })) : t.stage === "complete" ? (this.handleBrushingComplete(t), this.transitionTo("success")) : t.stage === "waiting" && this.transitionTo("ready");
        break;
      case "brushing":
        t.stage === "complete" ? (this.handleBrushingComplete(t), this.transitionTo("success")) : t.isBrushing || this.transitionTo("ready");
        break;
      case "success":
        Date.now() - this.successStateEnterTime > 500 && (t.stage !== "waiting" ? (console.log("[GameStateMachine] success 状态 500ms 后，继续 playing"), this.transitionTo("playing")) : (console.log("[GameStateMachine] success 状态 500ms 后，露牙锁定超时，回到 ready"), this.transitionTo("ready")));
        break;
    }
  }
  /**
   * 处理刷牙完成
   */
  handleBrushingComplete(t) {
    const s = Date.now() - this.brushStartTime, n = t.confidence;
    let r = this.scorePerBrush;
    r += Math.floor(this.bonusForAccuracy * n), this.gameStats.successCount++, this.gameStats.totalBrushTime += s, this.gameStats.score += r, this.gameStats.accuracy = (this.gameStats.accuracy * (this.gameStats.successCount - 1) + n) / this.gameStats.successCount, this.emitEvent({
      type: "brush_success",
      timestamp: Date.now(),
      data: {
        points: r,
        brushDuration: s,
        accuracy: n,
        totalScore: this.gameStats.score
      }
    }), console.log(
      "[GameStateMachine] 成功检测刷牙动作！积分:",
      r,
      "，总积分:",
      this.gameStats.score
    );
  }
  /**
   * 更新统计信息
   */
  updateStats(t) {
    t.isBrushing && this.currentState;
  }
  /**
   * 状态转移
   */
  transitionTo(t) {
    if (this.currentState === t)
      return;
    const s = this.currentState;
    this.currentState = t, t === "success" && (this.successStateEnterTime = Date.now()), this.emitEvent({
      type: "state_changed",
      timestamp: Date.now(),
      data: { from: s, to: t }
    }), console.log(`[GameStateMachine] 状态转移: ${s} -> ${t}`);
  }
  /**
   * 结束游戏
   */
  endGame() {
    this.transitionTo("gameover"), this.emitEvent({
      type: "game_over",
      timestamp: Date.now(),
      data: this.gameStats
    }), console.log("[GameStateMachine] 游戏结束，最终统计:", this.gameStats);
  }
  /**
   * 监听事件
   */
  addEventListener(t, s) {
    this.eventListeners.has(t) || this.eventListeners.set(t, []), this.eventListeners.get(t).push(s);
  }
  /**
   * 移除事件监听
   */
  removeEventListener(t, s) {
    const n = this.eventListeners.get(t);
    if (n) {
      const r = n.indexOf(s);
      r > -1 && n.splice(r, 1);
    }
  }
  /**
   * 触发事件
   */
  emitEvent(t) {
    (this.eventListeners.get(t.type) || []).forEach((n) => n(t));
  }
  /**
   * 获取当前状态
   */
  getState() {
    return this.currentState;
  }
  /**
   * 获取游戏统计
   */
  getStats() {
    return { ...this.gameStats };
  }
  /**
   * 获取剩余时间（ms）
   */
  getRemainingTime() {
    if (!this.gameStartTime) return this.gameDuration;
    const t = Date.now() - this.gameStartTime;
    return Math.max(0, this.gameDuration - t);
  }
  /**
   * 获取进度百分比
   */
  getProgress() {
    const t = this.getRemainingTime();
    return Math.max(0, 100 - t / this.gameDuration * 100);
  }
}
class $1 {
  constructor() {
    _(this, "avatarImage", null);
    _(this, "isLoading", !1);
    _(this, "loadError", null);
  }
  /**
   * 加载头套图片
   */
  async loadAvatar(t) {
    if (!this.isLoading)
      return this.isLoading = !0, this.loadError = null, new Promise((s, n) => {
        const r = new Image();
        r.crossOrigin = "anonymous", r.onload = () => {
          this.avatarImage = r, this.isLoading = !1, console.log("[AvatarRenderer] 头套加载完成:", t, r.width, "x", r.height), s();
        }, r.onerror = () => {
          this.loadError = `Failed to load avatar: ${t}`, this.isLoading = !1, console.error("[AvatarRenderer] 头套加载失败:", this.loadError), n(new Error(this.loadError));
        }, r.src = t;
      });
  }
  /**
   * 在 Canvas 上渲染头套
   *
   * 头套定位逻辑：
   * 1. 根据人脸宽度计算头套缩放比例
   * 2. 头套的"脸洞"中心对准用户人脸中心
   * 3. 应用配置中的 anchorOffset 和 faceHoleOffset 微调位置
   * 4. 跟随头部旋转
   */
  render(t, s, n, r, i) {
    var ke, Ie, dt, Je;
    if (!this.avatarImage || !s.landmarks)
      return;
    const o = V1(
      s.landmarks,
      r,
      i
    ), a = o.faceWidth * 2.2 / this.avatarImage.width, h = n.scale || 1, c = a * h, u = this.avatarImage.width * c, l = this.avatarImage.height * c, w = (((ke = n.faceHoleOffset) == null ? void 0 : ke.x) || 0) * u, C = (((Ie = n.faceHoleOffset) == null ? void 0 : Ie.y) || 0) * l, Y = (((dt = n.anchorOffset) == null ? void 0 : dt.x) || 0) * u, J = (((Je = n.anchorOffset) == null ? void 0 : Je.y) || 0) * l, K = o.center.x - w + Y, te = o.center.y - C + J, Oe = o.rotation;
    t.save(), t.translate(K, te), t.rotate(Oe), t.drawImage(
      this.avatarImage,
      -u / 2,
      -l / 2,
      u,
      l
    ), t.restore();
  }
  /**
   * 获取加载状态
   */
  isReady() {
    return this.avatarImage !== null && !this.isLoading;
  }
  /**
   * 获取加载错误
   */
  getError() {
    return this.loadError;
  }
  /**
   * 释放资源
   */
  dispose() {
    this.avatarImage = null, this.loadError = null;
  }
}
const Kn = [
  {
    id: "owl",
    name: "🦉 猫头鹰",
    imgUrl: "SkinSet/owl.png",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  },
  {
    id: "cat",
    name: "🐱 猫咪",
    imgUrl: "SkinSet/cat.png",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  },
  {
    id: "dog",
    name: "🐶 小狗",
    imgUrl: "SkinSet/dog.png",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  },
  {
    id: "rabbit",
    name: "🐰 兔子",
    imgUrl: "SkinSet/rabbit.png",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  }
];
function q1(e, t) {
  if (e.avatarConfig)
    return e.avatarConfig;
  if (e.avatarUrl)
    return {
      id: "custom",
      name: "Custom Avatar",
      imgUrl: e.avatarUrl,
      faceHoleOffset: { x: 0, y: 0.25 },
      anchorOffset: { x: 0, y: -0.15 },
      scale: 1
    };
  const s = e.avatarId || "owl", n = Kn.find((i) => i.id === s) || Kn[0];
  let r = n.imgUrl;
  return !r.startsWith("http") && !r.startsWith("/") && !r.startsWith("data:") && (r = t + "/" + r), { ...n, imgUrl: r };
}
async function J1(e, t) {
  t == null || t("camera", 0.1);
  const s = {
    video: {
      facingMode: "user",
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: !1
  }, n = await navigator.mediaDevices.getUserMedia(s);
  return e.srcObject = n, t == null || t("camera", 0.5), new Promise((r, i) => {
    const o = setTimeout(() => {
      i(new Error("Camera timeout: video failed to load within 15 seconds"));
    }, 15e3);
    e.onloadedmetadata = () => {
      e.play().then(() => {
        clearTimeout(o), t == null || t("camera", 1), r(n);
      }).catch(i);
    }, e.onerror = () => {
      clearTimeout(o), i(new Error("Video element error"));
    };
  });
}
async function eh(e) {
  const { canvas: t, onState: s, onScore: n, onGameOver: r, onError: i, onProgress: o, debug: a = !1 } = e, h = e.basePath || window.location.origin, c = e.modelBasePath || window.location.origin, u = e.gameDurationMs || 6e4, l = e.enableCapture !== !1, w = e.captureCount || 6, C = e.onCapture;
  let Y = !0, J = !1, K = null, te = null;
  const Oe = [];
  let ke = [], Ie = 0, dt = 0;
  const Je = new H1(), ln = new j1(), Te = new Y1(u), dn = new $1();
  let j = e.video, ei = !1;
  j || (j = document.createElement("video"), j.setAttribute("playsinline", "true"), j.setAttribute("autoplay", "true"), j.muted = !0, j.style.display = "none", document.body.appendChild(j), ei = !0);
  const pe = t.getContext("2d");
  if (!pe)
    throw new Error("Failed to get 2D context from canvas");
  const ti = q1(e, h);
  let si = 0, fn = 0, ni = 0, ri = 0;
  const l2 = 1e3 / 20;
  let ii = 0, vt = null, pn = null;
  try {
    let Ze = function($) {
      if (!Y) return;
      fn++, $ - ri >= 1e3 && (ni = fn, fn = 0, ri = $);
      const Qe = $ - si;
      if (si = $, (t.width !== j.videoWidth || t.height !== j.videoHeight) && j.videoWidth > 0 && j.videoHeight > 0 && (t.width = j.videoWidth, t.height = j.videoHeight), pe.save(), pe.translate(t.width, 0), pe.scale(-1, 1), pe.drawImage(j, 0, 0, t.width, t.height), pe.restore(), !J && $ - ii >= l2) {
        ii = $, vt = Je.detectForVideo(j, $), pn = ln.detectForVideo(j, $);
        const et = {
          faceResult: vt,
          handResult: pn
        };
        Te.update(et, Qe);
      }
      if (vt && vt.landmarks && (pe.save(), pe.translate(t.width, 0), pe.scale(-1, 1), dn.render(pe, vt, ti, t.width, t.height), pe.restore()), l && Ie < ke.length) {
        const et = $ - dt, Et = ke[Ie];
        if (et >= Et) {
          try {
            let ft = t.width, qt = t.height;
            if (t.width > 800 || t.height > 800) {
              const Jt = 800 / Math.max(t.width, t.height);
              ft = Math.round(t.width * Jt), qt = Math.round(t.height * Jt);
            }
            const St = document.createElement("canvas");
            St.width = ft, St.height = qt;
            const ai = St.getContext("2d");
            if (ai) {
              ai.drawImage(t, 0, 0, ft, qt);
              const Jt = St.toDataURL("image/jpeg", 0.85);
              Oe.push(Jt), console.log(`[BrushGame] 抓拍 ${Ie + 1}/${w} @ ${(et / 1e3).toFixed(1)}s`), C == null || C(Jt, Ie);
            }
          } catch (Ce) {
            console.error("[BrushGame] 抓拍失败:", Ce);
          }
          Ie++;
        }
      }
      a && Z1(pe, t, vt, pn, ni, Te), K = requestAnimationFrame(Ze);
    };
    o == null || o("camera", 0), te = await J1(j, o), o == null || o("models", 0);
    const ps = c + ze.models.face, d2 = c + ze.models.hand;
    if (await Promise.all([
      Je.initialize(ps, ze.wasmPath),
      ln.initialize(d2, ze.wasmPath)
    ]), o == null || o("models", 1), o == null || o("avatar", 0), await dn.loadAvatar(ti.imgUrl), o == null || o("avatar", 1), Te.initialize(), Te.addEventListener("state_changed", ($) => {
      s == null || s(Te.getState(), $);
    }), Te.addEventListener("brush_success", ($) => {
      var Et;
      const Qe = Te.getStats(), et = ((Et = $.data) == null ? void 0 : Et.points) || 0;
      n == null || n(Qe, et);
    }), Te.addEventListener("game_over", ($) => {
      const Qe = $.data;
      r == null || r(Qe);
    }), l) {
      const Qe = u - 5e3, et = Qe - 3e3, Et = Math.max(5e3, et / (w + 1));
      ke = [];
      for (let Ce = 0; Ce < w; Ce++) {
        const ft = 3e3 + Et * (Ce + 1), qt = (Math.random() - 0.5) * 3e3, St = Math.max(3e3, Math.min(Qe, ft + qt));
        ke.push(St);
      }
      ke.sort((Ce, ft) => Ce - ft), console.log("[BrushGame] 抓拍调度:", ke.map((Ce) => (Ce / 1e3).toFixed(1) + "s"));
    }
    dt = performance.now(), o == null || o("ready", 1), K = requestAnimationFrame(Ze);
  } catch (Ze) {
    oi();
    const ps = Ze instanceof Error ? Ze : new Error(String(Ze));
    throw i == null || i(ps), ps;
  }
  function oi() {
    Y = !1, K !== null && cancelAnimationFrame(K), te && te.getTracks().forEach((Ze) => Ze.stop()), ei && j && j.remove(), Je.dispose(), ln.dispose(), dn.dispose();
  }
  return {
    stop: oi,
    getState: () => Te.getState(),
    getStats: () => Te.getStats(),
    getRemainingTime: () => Te.getRemainingTime(),
    pause: () => {
      J = !0;
    },
    resume: () => {
      J = !1;
    },
    getCapturedPhotos: () => [...Oe]
    // 返回副本
  };
}
function Z1(e, t, s, n, r, i) {
  e.save(), e.fillStyle = "rgba(0, 0, 0, 0.6)", e.fillRect(10, 10, 200, 120), e.fillStyle = "#fff", e.font = "12px monospace";
  const o = i.getState(), a = i.getStats(), h = Math.ceil(i.getRemainingTime() / 1e3);
  if (e.fillText(`FPS: ${r}`, 20, 30), e.fillText(`State: ${o}`, 20, 46), e.fillText(`Score: ${a.score}`, 20, 62), e.fillText(`Success: ${a.successCount}`, 20, 78), e.fillText(`Time: ${h}s`, 20, 94), e.fillText(`Face: ${s != null && s.landmarks ? "Yes" : "No"}`, 20, 110), e.fillText(`Hand: ${n != null && n.landmarks ? "Yes" : "No"}`, 120, 110), s != null && s.landmarks) {
    e.fillStyle = "rgba(0, 255, 0, 0.5)";
    for (const c of s.landmarks) {
      const u = (1 - c.x) * t.width, l = c.y * t.height;
      e.beginPath(), e.arc(u, l, 1, 0, Math.PI * 2), e.fill();
    }
  }
  if (n != null && n.landmarks) {
    e.fillStyle = "rgba(255, 255, 0, 0.8)";
    for (const c of n.landmarks) {
      const u = (1 - c.x) * t.width, l = c.y * t.height;
      e.beginPath(), e.arc(u, l, 3, 0, Math.PI * 2), e.fill();
    }
  }
  e.restore();
}
const th = {
  avatars: Kn,
  mediaPipe: ze
};
export {
  th as config,
  eh as start
};
