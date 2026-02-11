var E2 = Object.defineProperty;
var A2 = (e, t, n) => t in e ? E2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var _ = (e, t, n) => A2(e, typeof t != "symbol" ? t + "" : t, n);
var wt = typeof self < "u" ? self : {};
function pt() {
  throw Error("Invalid UTF8");
}
function mi(e, t) {
  return t = String.fromCharCode.apply(null, t), e == null ? t : e + t;
}
let yn, ws;
const k2 = typeof TextDecoder < "u";
let S2;
const T2 = typeof TextEncoder < "u";
function To(e) {
  if (T2) e = (S2 || (S2 = new TextEncoder())).encode(e);
  else {
    let n = 0;
    const s = new Uint8Array(3 * e.length);
    for (let r = 0; r < e.length; r++) {
      var t = e.charCodeAt(r);
      if (t < 128) s[n++] = t;
      else {
        if (t < 2048) s[n++] = t >> 6 | 192;
        else {
          if (t >= 55296 && t <= 57343) {
            if (t <= 56319 && r < e.length) {
              const i = e.charCodeAt(++r);
              if (i >= 56320 && i <= 57343) {
                t = 1024 * (t - 55296) + i - 56320 + 65536, s[n++] = t >> 18 | 240, s[n++] = t >> 12 & 63 | 128, s[n++] = t >> 6 & 63 | 128, s[n++] = 63 & t | 128;
                continue;
              }
              r--;
            }
            t = 65533;
          }
          s[n++] = t >> 12 | 224, s[n++] = t >> 6 & 63 | 128;
        }
        s[n++] = 63 & t | 128;
      }
    }
    e = n === s.length ? s : s.subarray(0, n);
  }
  return e;
}
var Qs, Ln;
e: {
  for (var pi = ["CLOSURE_FLAGS"], vs = wt, bs = 0; bs < pi.length; bs++) if ((vs = vs[pi[bs]]) == null) {
    Ln = null;
    break e;
  }
  Ln = vs;
}
var hn, gi = Ln && Ln[610401301];
Qs = gi != null && gi;
const yi = wt.navigator;
function Ps(e) {
  return !!Qs && !!hn && hn.brands.some((({ brand: t }) => t && t.indexOf(e) != -1));
}
function we(e) {
  var t;
  return (t = wt.navigator) && (t = t.userAgent) || (t = ""), t.indexOf(e) != -1;
}
function rt() {
  return !!Qs && !!hn && hn.brands.length > 0;
}
function Es() {
  return rt() ? Ps("Chromium") : (we("Chrome") || we("CriOS")) && !(!rt() && we("Edge")) || we("Silk");
}
function er(e) {
  return er[" "](e), e;
}
hn = yi && yi.userAgentData || null, er[" "] = function() {
};
var F2 = !rt() && (we("Trident") || we("MSIE"));
!we("Android") || Es(), Es(), we("Safari") && (Es() || !rt() && we("Coast") || !rt() && we("Opera") || !rt() && we("Edge") || (rt() ? Ps("Microsoft Edge") : we("Edg/")) || rt() && Ps("Opera"));
var Fo = {}, nn = null;
function L2(e) {
  const t = e.length;
  let n = 3 * t / 4;
  n % 3 ? n = Math.floor(n) : "=.".indexOf(e[t - 1]) != -1 && (n = "=.".indexOf(e[t - 2]) != -1 ? n - 2 : n - 1);
  const s = new Uint8Array(n);
  let r = 0;
  return (function(i, o) {
    function a(c) {
      for (; h < i.length; ) {
        const u = i.charAt(h++), l = nn[u];
        if (l != null) return l;
        if (!/^[\s\xa0]*$/.test(u)) throw Error("Unknown base64 encoding at char: " + u);
      }
      return c;
    }
    Lo();
    let h = 0;
    for (; ; ) {
      const c = a(-1), u = a(0), l = a(64), w = a(64);
      if (w === 64 && c === -1) break;
      o(c << 2 | u >> 4), l != 64 && (o(u << 4 & 240 | l >> 2), w != 64 && o(l << 6 & 192 | w));
    }
  })(e, (function(i) {
    s[r++] = i;
  })), r !== n ? s.subarray(0, r) : s;
}
function Lo() {
  if (!nn) {
    nn = {};
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = ["+/=", "+/", "-_=", "-_.", "-_"];
    for (let n = 0; n < 5; n++) {
      const s = e.concat(t[n].split(""));
      Fo[n] = s;
      for (let r = 0; r < s.length; r++) {
        const i = s[r];
        nn[i] === void 0 && (nn[i] = r);
      }
    }
  }
}
var xo = typeof Uint8Array < "u", Mo = !F2 && typeof btoa == "function";
function _i(e) {
  if (!Mo) {
    var t;
    t === void 0 && (t = 0), Lo(), t = Fo[t];
    var n = Array(Math.floor(e.length / 3)), s = t[64] || "";
    let h = 0, c = 0;
    for (; h < e.length - 2; h += 3) {
      var r = e[h], i = e[h + 1], o = e[h + 2], a = t[r >> 2];
      r = t[(3 & r) << 4 | i >> 4], i = t[(15 & i) << 2 | o >> 6], o = t[63 & o], n[c++] = a + r + i + o;
    }
    switch (a = 0, o = s, e.length - h) {
      case 2:
        o = t[(15 & (a = e[h + 1])) << 2] || s;
      case 1:
        e = e[h], n[c] = t[e >> 2] + t[(3 & e) << 4 | a >> 4] + o + s;
    }
    return n.join("");
  }
  for (t = "", n = 0, s = e.length - 10240; n < s; ) t += String.fromCharCode.apply(null, e.subarray(n, n += 10240));
  return t += String.fromCharCode.apply(null, n ? e.subarray(n) : e), btoa(t);
}
const wi = /[-_.]/g, x2 = { "-": "+", _: "/", ".": "=" };
function M2(e) {
  return x2[e] || "";
}
function Co(e) {
  if (!Mo) return L2(e);
  wi.test(e) && (e = e.replace(wi, M2)), e = atob(e);
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
  return t;
}
function dn(e) {
  return xo && e != null && e instanceof Uint8Array;
}
var Ot = {};
function vt() {
  return C2 || (C2 = new Xe(null, Ot));
}
function tr(e) {
  Io(Ot);
  var t = e.g;
  return (t = t == null || dn(t) ? t : typeof t == "string" ? Co(t) : null) == null ? t : e.g = t;
}
var Xe = class {
  h() {
    return new Uint8Array(tr(this) || 0);
  }
  constructor(e, t) {
    if (Io(t), this.g = e, e != null && e.length === 0) throw Error("ByteString should be constructed with non-empty values");
  }
};
let C2, I2;
function Io(e) {
  if (e !== Ot) throw Error("illegal external caller");
}
function Oo(e, t) {
  e.__closure__error__context__984382 || (e.__closure__error__context__984382 = {}), e.__closure__error__context__984382.severity = t;
}
function Rs(e) {
  return Oo(e = Error(e), "warning"), e;
}
var Un = typeof Symbol == "function" && typeof Symbol() == "symbol", O2 = /* @__PURE__ */ new Set();
function fn(e, t, n = !1, s = !1) {
  return e = typeof Symbol == "function" && typeof Symbol() == "symbol" ? s && Symbol.for && e ? Symbol.for(e) : e != null ? Symbol(e) : Symbol() : t, n && O2.add(e), e;
}
var P2 = fn("jas", void 0, !0, !0), vi = fn(void 0, "0di"), As = fn(void 0, "2ex"), en = fn(void 0, "1oa", !0), Pt = fn(void 0, Symbol(), !0);
const g = Un ? P2 : "Ga", Po = { Ga: { value: 0, configurable: !0, writable: !0, enumerable: !1 } }, Ro = Object.defineProperties;
function Gn(e, t) {
  Un || g in e || Ro(e, Po), e[g] |= t;
}
function G(e, t) {
  Un || g in e || Ro(e, Po), e[g] = t;
}
function jt(e) {
  return Gn(e, 34), e;
}
function R2(e, t) {
  G(t, -30975 & (0 | e));
}
function Ds(e, t) {
  G(t, -30941 & (34 | e));
}
function nr() {
  return typeof BigInt == "function";
}
function ie(e) {
  return Array.prototype.slice.call(e);
}
var sr, mn = {}, Do = {};
function bi(e) {
  return !(!e || typeof e != "object" || e.Ia !== Do);
}
function rr(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && e.constructor === Object;
}
function ir(e, t) {
  if (e != null) {
    if (typeof e == "string") e = e ? new Xe(e, Ot) : vt();
    else if (e.constructor !== Xe) if (dn(e)) e = e.length ? new Xe(new Uint8Array(e), Ot) : vt();
    else {
      if (!t) throw Error();
      e = void 0;
    }
  }
  return e;
}
function xn(e) {
  return !(!Array.isArray(e) || e.length) && !!(1 & (0 | e[g]));
}
const Ei = [];
function ut(e) {
  if (2 & e) throw Error();
}
G(Ei, 55), sr = Object.freeze(Ei);
class Mn {
  constructor(t, n, s) {
    this.l = 0, this.g = t, this.h = n, this.m = s;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return { done: !1, value: this.h ? this.h.call(this.m, t) : t };
    }
    return { done: !0, value: void 0 };
  }
  [Symbol.iterator]() {
    return new Mn(this.g, this.h, this.m);
  }
}
function or(e) {
  return Pt ? e[Pt] : void 0;
}
var D2 = Object.freeze({});
function Hn(e) {
  return e.Qa = !0, e;
}
var B2 = Hn(((e) => typeof e == "number")), Ai = Hn(((e) => typeof e == "string")), N2 = Hn(((e) => typeof e == "boolean")), Vn = typeof wt.BigInt == "function" && typeof wt.BigInt(0) == "bigint", Bs = Hn(((e) => Vn ? e >= G2 && e <= V2 : e[0] === "-" ? ki(e, U2) : ki(e, H2)));
const U2 = Number.MIN_SAFE_INTEGER.toString(), G2 = Vn ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, H2 = Number.MAX_SAFE_INTEGER.toString(), V2 = Vn ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function ki(e, t) {
  if (e.length > t.length) return !1;
  if (e.length < t.length || e === t) return !0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n], r = t[n];
    if (s > r) return !1;
    if (s < r) return !0;
  }
}
const j2 = typeof Uint8Array.prototype.slice == "function";
let Bo, T = 0, D = 0;
function Si(e) {
  const t = e >>> 0;
  T = t, D = (e - t) / 4294967296 >>> 0;
}
function Rt(e) {
  if (e < 0) {
    Si(-e);
    const [t, n] = ur(T, D);
    T = t >>> 0, D = n >>> 0;
  } else Si(e);
}
function ar(e) {
  const t = Bo || (Bo = new DataView(new ArrayBuffer(8)));
  t.setFloat32(0, +e, !0), D = 0, T = t.getUint32(0, !0);
}
function hr(e, t) {
  const n = 4294967296 * t + (e >>> 0);
  return Number.isSafeInteger(n) ? n : cn(e, t);
}
function cr(e, t) {
  const n = 2147483648 & t;
  return n && (t = ~t >>> 0, (e = 1 + ~e >>> 0) == 0 && (t = t + 1 >>> 0)), typeof (e = hr(e, t)) == "number" ? n ? -e : e : n ? "-" + e : e;
}
function cn(e, t) {
  if (e >>>= 0, (t >>>= 0) <= 2097151) var n = "" + (4294967296 * t + e);
  else nr() ? n = "" + (BigInt(t) << BigInt(32) | BigInt(e)) : (e = (16777215 & e) + 6777216 * (n = 16777215 & (e >>> 24 | t << 8)) + 6710656 * (t = t >> 16 & 65535), n += 8147497 * t, t *= 2, e >= 1e7 && (n += e / 1e7 >>> 0, e %= 1e7), n >= 1e7 && (t += n / 1e7 >>> 0, n %= 1e7), n = t + Ti(n) + Ti(e));
  return n;
}
function Ti(e) {
  return e = String(e), "0000000".slice(e.length) + e;
}
function jn(e) {
  if (e.length < 16) Rt(Number(e));
  else if (nr()) e = BigInt(e), T = Number(e & BigInt(4294967295)) >>> 0, D = Number(e >> BigInt(32) & BigInt(4294967295));
  else {
    const t = +(e[0] === "-");
    D = T = 0;
    const n = e.length;
    for (let s = t, r = (n - t) % 6 + t; r <= n; s = r, r += 6) {
      const i = Number(e.slice(s, r));
      D *= 1e6, T = 1e6 * T + i, T >= 4294967296 && (D += Math.trunc(T / 4294967296), D >>>= 0, T >>>= 0);
    }
    if (t) {
      const [s, r] = ur(T, D);
      T = s, D = r;
    }
  }
}
function ur(e, t) {
  return t = ~t, e ? e = 1 + ~e : t += 1, [e, t];
}
const lr = typeof BigInt == "function" ? BigInt.asIntN : void 0, z2 = typeof BigInt == "function" ? BigInt.asUintN : void 0, Lt = Number.isSafeInteger, zn = Number.isFinite, Cn = Math.trunc;
function lt(e) {
  return e == null || typeof e == "number" ? e : e === "NaN" || e === "Infinity" || e === "-Infinity" ? Number(e) : void 0;
}
function No(e) {
  return e == null || typeof e == "boolean" ? e : typeof e == "number" ? !!e : void 0;
}
const W2 = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Wn(e) {
  switch (typeof e) {
    case "bigint":
      return !0;
    case "number":
      return zn(e);
    case "string":
      return W2.test(e);
    default:
      return !1;
  }
}
function zt(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return zn(e) ? 0 | e : void 0;
}
function Uo(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return zn(e) ? e >>> 0 : void 0;
}
function Fi(e) {
  if (e[0] === "-") return !1;
  const t = e.length;
  return t < 20 || t === 20 && Number(e.substring(0, 6)) < 184467;
}
function dr(e) {
  return e = Cn(e), Lt(e) || (Rt(e), e = cr(T, D)), e;
}
function fr(e) {
  var t = Cn(Number(e));
  if (Lt(t)) return String(t);
  if ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), t = e.length, !(e[0] === "-" ? t < 20 || t === 20 && Number(e.substring(0, 7)) > -922337 : t < 19 || t === 19 && Number(e.substring(0, 6)) < 922337)) if (jn(e), e = T, 2147483648 & (t = D)) if (nr()) e = "" + (BigInt(0 | t) << BigInt(32) | BigInt(e >>> 0));
  else {
    const [n, s] = ur(e, t);
    e = "-" + cn(n, s);
  }
  else e = cn(e, t);
  return e;
}
function In(e) {
  return e == null ? e : typeof e == "bigint" ? (Bs(e) ? e = Number(e) : (e = lr(64, e), e = Bs(e) ? Number(e) : String(e)), e) : Wn(e) ? typeof e == "number" ? dr(e) : fr(e) : void 0;
}
function X2(e) {
  if (e == null) return e;
  var t = typeof e;
  if (t === "bigint") return String(z2(64, e));
  if (Wn(e)) {
    if (t === "string") return t = Cn(Number(e)), Lt(t) && t >= 0 ? e = String(t) : ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), Fi(e) || (jn(e), e = cn(T, D))), e;
    if (t === "number") return (e = Cn(e)) >= 0 && Lt(e) ? e : (function(n) {
      if (n < 0) {
        Rt(n);
        var s = cn(T, D);
        return n = Number(s), Lt(n) ? n : s;
      }
      return Fi(s = String(n)) ? s : (Rt(n), hr(T, D));
    })(e);
  }
}
function Go(e) {
  if (typeof e != "string") throw Error();
  return e;
}
function Wt(e) {
  if (e != null && typeof e != "string") throw Error();
  return e;
}
function Dt(e) {
  return e == null || typeof e == "string" ? e : void 0;
}
function mr(e, t, n, s) {
  if (e != null && typeof e == "object" && e.W === mn) return e;
  if (!Array.isArray(e)) return n ? 2 & s ? ((e = t[vi]) || (jt((e = new t()).u), e = t[vi] = e), t = e) : t = new t() : t = void 0, t;
  let r = n = 0 | e[g];
  return r === 0 && (r |= 32 & s), r |= 2 & s, r !== n && G(e, r), new t(e);
}
function $2(e, t, n) {
  if (t) e: {
    if (!Wn(t = e)) throw Rs("int64");
    switch (typeof t) {
      case "string":
        t = fr(t);
        break e;
      case "bigint":
        if (e = t = lr(64, t), Ai(e)) {
          if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e)) throw Error(String(e));
        } else if (B2(e) && !Number.isSafeInteger(e)) throw Error(String(e));
        t = Vn ? BigInt(t) : N2(t) ? t ? "1" : "0" : Ai(t) ? t.trim() || "0" : String(t);
        break e;
      default:
        t = dr(t);
    }
  }
  else t = In(e);
  return typeof (n = (e = t) == null ? n ? 0 : void 0 : e) == "string" && Lt(t = +n) ? t : n;
}
const K2 = {};
let Y2 = (function() {
  try {
    return er(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
})();
class ks {
  constructor() {
    this.g = /* @__PURE__ */ new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, n) {
    return this.g.set(t, n), this.size = this.g.size, this;
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
  forEach(t, n) {
    return this.g.forEach(t, n);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const q2 = Y2 ? (Object.setPrototypeOf(ks.prototype, Map.prototype), Object.defineProperties(ks.prototype, { size: { value: 0, configurable: !0, enumerable: !0, writable: !0 } }), ks) : class extends Map {
  constructor() {
    super();
  }
};
function Li(e) {
  return e;
}
function Ss(e) {
  if (2 & e.L) throw Error("Cannot mutate an immutable Map");
}
var be = class extends q2 {
  constructor(e, t, n = Li, s = Li) {
    super();
    let r = 0 | e[g];
    r |= 64, G(e, r), this.L = r, this.S = t, this.R = n, this.Y = this.S ? J2 : s;
    for (let i = 0; i < e.length; i++) {
      const o = e[i], a = n(o[0], !1, !0);
      let h = o[1];
      t ? h === void 0 && (h = null) : h = s(o[1], !1, !0, void 0, void 0, r), super.set(a, h);
    }
  }
  na(e = xi) {
    if (this.size !== 0) return this.X(e);
  }
  X(e = xi) {
    const t = [], n = super.entries();
    for (var s; !(s = n.next()).done; ) (s = s.value)[0] = e(s[0]), s[1] = e(s[1]), t.push(s);
    return t;
  }
  clear() {
    Ss(this), super.clear();
  }
  delete(e) {
    return Ss(this), super.delete(this.R(e, !0, !1));
  }
  entries() {
    var e = this.ma();
    return new Mn(e, Z2, this);
  }
  keys() {
    return this.Ha();
  }
  values() {
    var e = this.ma();
    return new Mn(e, be.prototype.get, this);
  }
  forEach(e, t) {
    super.forEach(((n, s) => {
      e.call(t, this.get(s), s, this);
    }));
  }
  set(e, t) {
    return Ss(this), (e = this.R(e, !0, !1)) == null ? this : t == null ? (super.delete(e), this) : super.set(e, this.Y(t, !0, !0, this.S, !1, this.L));
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
      var n = this.S;
      return n ? ((n = this.Y(t, !1, !0, n, this.ra, this.L)) !== t && super.set(e, n), n) : t;
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
function J2(e, t, n, s, r, i) {
  return e = mr(e, s, n, i), r && (e = $n(e)), e;
}
function xi(e) {
  return e;
}
function Z2(e) {
  return [e, this.get(e)];
}
let Q2, Ho, e1;
function Mi() {
  return Q2 || (Q2 = new be(jt([]), void 0, void 0, void 0, K2));
}
function pr(e, t, n, s, r) {
  if (e != null) {
    if (Array.isArray(e)) e = xn(e) ? void 0 : r && 2 & (0 | e[g]) ? e : gr(e, t, n, s !== void 0, r);
    else if (rr(e)) {
      const i = {};
      for (let o in e) i[o] = pr(e[o], t, n, s, r);
      e = i;
    } else e = t(e, s);
    return e;
  }
}
function gr(e, t, n, s, r) {
  const i = s || n ? 0 | e[g] : 0, o = s ? !!(32 & i) : void 0;
  s = ie(e);
  for (let a = 0; a < s.length; a++) s[a] = pr(s[a], t, n, o, r);
  return n && ((e = or(e)) && (s[Pt] = ie(e)), n(i, s)), s;
}
function t1(e) {
  return pr(e, Vo, void 0, void 0, !1);
}
function Vo(e) {
  return e.W === mn ? e.toJSON() : e instanceof be ? e.na(t1) : (function(t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "bigint":
        return Bs(t) ? Number(t) : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (xn(t)) return;
        } else {
          if (dn(t)) return _i(t);
          if (t instanceof Xe) {
            const n = t.g;
            return n == null ? "" : typeof n == "string" ? n : t.g = _i(n);
          }
          if (t instanceof be) return t.na();
        }
    }
    return t;
  })(e);
}
function jo(e) {
  return gr(e, Vo, void 0, void 0, !1);
}
function ot(e, t, n) {
  return e = zo(e, t[0], t[1], n ? 1 : 2), t !== Ho && n && Gn(e, 16384), e;
}
function zo(e, t, n, s) {
  if (e == null) {
    var r = 96;
    n ? (e = [n], r |= 512) : e = [], t && (r = -33521665 & r | (1023 & t) << 15);
  } else {
    if (!Array.isArray(e)) throw Error("narr");
    if (2048 & (r = 0 | e[g])) throw Error("farr");
    if (64 & r) return e;
    if (s === 1 || s === 2 || (r |= 64), n && (r |= 512, n !== e[0])) throw Error("mid");
    e: {
      if (s = (n = e).length) {
        const i = s - 1;
        if (rr(n[i])) {
          if ((t = i - (512 & (r |= 256) ? 0 : -1)) >= 1024) throw Error("pvtlmt");
          r = -33521665 & r | (1023 & t) << 15;
          break e;
        }
      }
      if (t) {
        if ((t = Math.max(t, s - (512 & r ? 0 : -1))) > 1024) throw Error("spvt");
        r = -33521665 & r | (1023 & t) << 15;
      }
    }
  }
  return G(e, r), e;
}
function Ns(e, t, n = Ds) {
  if (e != null) {
    if (xo && e instanceof Uint8Array) return t ? e : new Uint8Array(e);
    if (Array.isArray(e)) {
      var s = 0 | e[g];
      return 2 & s ? e : (t && (t = s === 0 || !!(32 & s) && !(64 & s || !(16 & s))), t ? (G(e, -12293 & (34 | s)), e) : gr(e, Ns, 4 & s ? Ds : n, !0, !0));
    }
    return e.W === mn ? e = 2 & (s = 0 | (n = e.u)[g]) ? e : new e.constructor(Xn(n, s, !0)) : e instanceof be && !(2 & e.L) && (n = jt(e.X(Ns)), e = new be(n, e.S, e.R, e.Y)), e;
  }
}
function Xn(e, t, n) {
  const s = n || 2 & t ? Ds : R2, r = !!(32 & t);
  return e = (function(i, o, a) {
    const h = ie(i);
    var c = h.length;
    const u = 256 & o ? h[c - 1] : void 0;
    for (c += u ? -1 : 0, o = 512 & o ? 1 : 0; o < c; o++) h[o] = a(h[o]);
    if (u) {
      o = h[o] = {};
      for (const l in u) o[l] = a(u[l]);
    }
    return (i = or(i)) && (h[Pt] = ie(i)), h;
  })(e, t, ((i) => Ns(i, r, s))), Gn(e, 32 | (n ? 2 : 0)), e;
}
function $n(e) {
  const t = e.u, n = 0 | t[g];
  return 2 & n ? new e.constructor(Xn(t, n, !1)) : e;
}
function Bt(e, t) {
  return Je(e = e.u, 0 | e[g], t);
}
function Je(e, t, n, s) {
  if (n === -1) return null;
  var r = n + (512 & t ? 0 : -1);
  const i = e.length - 1;
  return r >= i && 256 & t ? e[i][n] : s && 256 & t && (t = e[i][n]) != null ? (e[r] != null && As != null && ((r = (e = I2 ?? (I2 = {}))[As] || 0) >= 4 || (e[As] = r + 1, Oo(e = Error(), "incident"), (function(o) {
    wt.setTimeout((() => {
      throw o;
    }), 0);
  })(e))), t) : r <= i ? e[r] : void 0;
}
function F(e, t, n) {
  const s = e.u;
  let r = 0 | s[g];
  return ut(r), R(s, r, t, n), e;
}
function R(e, t, n, s) {
  const r = 512 & t ? 0 : -1, i = n + r;
  var o = e.length - 1;
  return i >= o && 256 & t ? (e[o][n] = s, t) : i <= o ? (e[i] = s, 256 & t && n in (e = e[o]) && delete e[n], t) : (s !== void 0 && (n >= (o = t >> 15 & 1023 || 536870912) ? s != null && (e[o + r] = { [n]: s }, G(e, t |= 256)) : e[i] = s), t);
}
function En(e, t) {
  let n = 0 | (e = e.u)[g];
  const s = Je(e, n, t), r = lt(s);
  return r != null && r !== s && R(e, n, t, r), r;
}
function Wo(e) {
  let t = 0 | (e = e.u)[g];
  const n = Je(e, t, 1), s = ir(n, !0);
  return s != null && s !== n && R(e, t, 1, s), s;
}
function gt() {
  return D2 === void 0 ? 2 : 4;
}
function yt(e, t, n, s, r) {
  const i = e.u, o = 2 & (e = 0 | i[g]) ? 1 : s;
  r = !!r;
  let a = 0 | (s = yr(i, e, t))[g];
  if (!(4 & a)) {
    4 & a && (s = ie(s), a = $e(a, e), e = R(i, e, t, s));
    let h = 0, c = 0;
    for (; h < s.length; h++) {
      const u = n(s[h]);
      u != null && (s[c++] = u);
    }
    c < h && (s.length = c), a = _r(a, e), n = -4097 & (20 | a), a = n &= -8193, G(s, a), 2 & a && Object.freeze(s);
  }
  return o === 1 || o === 4 && 32 & a ? ze(a) || (r = a, a |= 2, a !== r && G(s, a), Object.freeze(s)) : (o === 2 && ze(a) && (s = ie(s), a = $e(a, e), a = at(a, e, r), G(s, a), e = R(i, e, t, s)), ze(a) || (t = a, a = at(a, e, r), a !== t && G(s, a))), s;
}
function yr(e, t, n, s) {
  return e = Je(e, t, n, s), Array.isArray(e) ? e : sr;
}
function _r(e, t) {
  return e === 0 && (e = $e(e, t)), 1 | e;
}
function ze(e) {
  return !!(2 & e) && !!(4 & e) || !!(2048 & e);
}
function Xo(e) {
  e = ie(e);
  for (let t = 0; t < e.length; t++) {
    const n = e[t] = ie(e[t]);
    Array.isArray(n[1]) && (n[1] = jt(n[1]));
  }
  return e;
}
function Us(e, t, n, s) {
  let r = 0 | (e = e.u)[g];
  ut(r), R(e, r, t, (s === "0" ? Number(n) === 0 : n === s) ? void 0 : n);
}
function Xt(e, t, n, s, r) {
  ut(t);
  var i = !(!(64 & t) && 16384 & t);
  const o = (r = yr(e, t, n, r)) !== sr;
  if (i || !o) {
    let a = i = o ? 0 | r[g] : 0;
    (!o || 2 & a || ze(a) || 4 & a && !(32 & a)) && (r = ie(r), a = $e(a, t), t = R(e, t, n, r)), a = -13 & _r(a, t), a = at(s ? -17 & a : 16 | a, t, !0), a !== i && G(r, a);
  }
  return r;
}
function Ts(e, t) {
  var n = Ra;
  return vr(wr(e = e.u), e, 0 | e[g], n) === t ? t : -1;
}
function wr(e) {
  if (Un) return e[en] ?? (e[en] = /* @__PURE__ */ new Map());
  if (en in e) return e[en];
  const t = /* @__PURE__ */ new Map();
  return Object.defineProperty(e, en, { value: t }), t;
}
function $o(e, t, n, s) {
  const r = wr(e), i = vr(r, e, t, n);
  return i !== s && (i && (t = R(e, t, i)), r.set(n, s)), t;
}
function vr(e, t, n, s) {
  let r = e.get(s);
  if (r != null) return r;
  r = 0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    Je(t, n, o) != null && (r !== 0 && (n = R(t, n, r)), r = o);
  }
  return e.set(s, r), r;
}
function br(e, t, n, s) {
  let r, i = 0 | e[g];
  if ((s = Je(e, i, n, s)) != null && s.W === mn) return (t = $n(s)) !== s && R(e, i, n, t), t.u;
  if (Array.isArray(s)) {
    const o = 0 | s[g];
    r = 2 & o ? ot(Xn(s, o, !1), t, !0) : 64 & o ? s : ot(r, t, !0);
  } else r = ot(void 0, t, !0);
  return r !== s && R(e, i, n, r), r;
}
function Ko(e, t, n, s) {
  let r = 0 | (e = e.u)[g];
  return (t = mr(s = Je(e, r, n, s), t, !1, r)) !== s && t != null && R(e, r, n, t), t;
}
function E(e, t, n, s = !1) {
  if ((t = Ko(e, t, n, s)) == null) return t;
  if (!(2 & (s = 0 | (e = e.u)[g]))) {
    const r = $n(t);
    r !== t && R(e, s, n, t = r);
  }
  return t;
}
function Yo(e, t, n, s, r, i, o) {
  e = e.u;
  var a = !!(2 & t);
  const h = a ? 1 : r;
  i = !!i, o && (o = !a);
  var c = 0 | (r = yr(e, t, s))[g];
  if (!(a = !!(4 & c))) {
    var u = r, l = t;
    const w = !!(2 & (c = _r(c, t)));
    w && (l |= 2);
    let O = !w, $ = !0, te = 0, K = 0;
    for (; te < u.length; te++) {
      const J = mr(u[te], n, !1, l);
      if (J instanceof n) {
        if (!w) {
          const Te = !!(2 & (0 | J.u[g]));
          O && (O = !Te), $ && ($ = Te);
        }
        u[K++] = J;
      }
    }
    K < te && (u.length = K), c |= 4, c = $ ? 16 | c : -17 & c, G(u, c = O ? 8 | c : -9 & c), w && Object.freeze(u);
  }
  if (o && !(8 & c || !r.length && (h === 1 || h === 4 && 32 & c))) {
    for (ze(c) && (r = ie(r), c = $e(c, t), t = R(e, t, s, r)), n = r, o = c, u = 0; u < n.length; u++) (c = n[u]) !== (l = $n(c)) && (n[u] = l);
    o |= 8, G(n, o = n.length ? -17 & o : 16 | o), c = o;
  }
  return h === 1 || h === 4 && 32 & c ? ze(c) || (t = c, (c |= !r.length || 16 & c && (!a || 32 & c) ? 2 : 2048) !== t && G(r, c), Object.freeze(r)) : (h === 2 && ze(c) && (G(r = ie(r), c = at(c = $e(c, t), t, i)), t = R(e, t, s, r)), ze(c) || (s = c, (c = at(c, t, i)) !== s && G(r, c))), r;
}
function Ye(e, t, n) {
  const s = 0 | e.u[g];
  return Yo(e, s, t, n, gt(), !1, !(2 & s));
}
function y(e, t, n, s) {
  return s == null && (s = void 0), F(e, n, s);
}
function rn(e, t, n, s) {
  s == null && (s = void 0);
  e: {
    let r = 0 | (e = e.u)[g];
    if (ut(r), s == null) {
      const i = wr(e);
      if (vr(i, e, r, n) !== t) break e;
      i.set(n, 0);
    } else r = $o(e, r, n, t);
    R(e, r, t, s);
  }
}
function $e(e, t) {
  return -2049 & (e = 32 | (2 & t ? 2 | e : -3 & e));
}
function at(e, t, n) {
  return 32 & t && n || (e &= -33), e;
}
function On(e, t, n, s) {
  const r = 0 | e.u[g];
  ut(r), e = Yo(e, r, n, t, 2, !0), s = s ?? new n(), e.push(s), e[g] = 2 & (0 | s.u[g]) ? -9 & e[g] : -17 & e[g];
}
function ve(e, t) {
  return zt(Bt(e, t));
}
function Ee(e, t) {
  return Dt(Bt(e, t));
}
function N(e, t) {
  return En(e, t) ?? 0;
}
function un(e, t, n) {
  if (n != null && typeof n != "boolean") throw e = typeof n, Error(`Expected boolean but got ${e != "object" ? e : n ? Array.isArray(n) ? "array" : e : "null"}: ${n}`);
  F(e, t, n);
}
function Ue(e, t, n) {
  if (n != null) {
    if (typeof n != "number" || !zn(n)) throw Rs("int32");
    n |= 0;
  }
  F(e, t, n);
}
function m(e, t, n) {
  if (n != null && typeof n != "number") throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  F(e, t, n);
}
function Pn(e, t, n) {
  {
    const o = e.u;
    let a = 0 | o[g];
    if (ut(a), n == null) R(o, a, t);
    else {
      var s = e = 0 | n[g], r = ze(e), i = r || Object.isFrozen(n);
      for (r || (e = 0), i || (n = ie(n), s = 0, e = at(e = $e(e, a), a, !0), i = !1), e |= 21, r = 0; r < n.length; r++) {
        const h = n[r], c = Go(h);
        Object.is(h, c) || (i && (n = ie(n), s = 0, e = at(e = $e(e, a), a, !0), i = !1), n[r] = c);
      }
      e !== s && (i && (n = ie(n), e = at(e = $e(e, a), a, !0)), G(n, e)), R(o, a, t, n);
    }
  }
}
function Kn(e, t, n) {
  ut(0 | e.u[g]), yt(e, t, Dt, 2, !0).push(Go(n));
}
function qo(e, t) {
  return Error(`Invalid wire type: ${e} (at position ${t})`);
}
function Er() {
  return Error("Failed to read varint, encoding is invalid.");
}
function Jo(e, t) {
  return Error(`Tried to read past the end of the data ${t} > ${e}`);
}
function Ar(e) {
  if (typeof e == "string") return { buffer: Co(e), N: !1 };
  if (Array.isArray(e)) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === Uint8Array) return { buffer: e, N: !1 };
  if (e.constructor === ArrayBuffer) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === Xe) return { buffer: tr(e) || new Uint8Array(0), N: !0 };
  if (e instanceof Uint8Array) return { buffer: new Uint8Array(e.buffer, e.byteOffset, e.byteLength), N: !1 };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function kr(e, t) {
  let n, s = 0, r = 0, i = 0;
  const o = e.h;
  let a = e.g;
  do
    n = o[a++], s |= (127 & n) << i, i += 7;
  while (i < 32 && 128 & n);
  for (i > 32 && (r |= (127 & n) >> 4), i = 3; i < 32 && 128 & n; i += 7) n = o[a++], r |= (127 & n) << i;
  if (_t(e, a), n < 128) return t(s >>> 0, r >>> 0);
  throw Er();
}
function Sr(e) {
  let t = 0, n = e.g;
  const s = n + 10, r = e.h;
  for (; n < s; ) {
    const i = r[n++];
    if (t |= i, (128 & i) == 0) return _t(e, n), !!(127 & t);
  }
  throw Er();
}
function ht(e) {
  const t = e.h;
  let n = e.g, s = t[n++], r = 127 & s;
  if (128 & s && (s = t[n++], r |= (127 & s) << 7, 128 & s && (s = t[n++], r |= (127 & s) << 14, 128 & s && (s = t[n++], r |= (127 & s) << 21, 128 & s && (s = t[n++], r |= s << 28, 128 & s && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++]))))) throw Er();
  return _t(e, n), r;
}
function qe(e) {
  return ht(e) >>> 0;
}
function Gs(e) {
  var t = e.h;
  const n = e.g, s = t[n], r = t[n + 1], i = t[n + 2];
  return t = t[n + 3], _t(e, e.g + 4), (s << 0 | r << 8 | i << 16 | t << 24) >>> 0;
}
function Hs(e) {
  var t = Gs(e);
  e = 2 * (t >> 31) + 1;
  const n = t >>> 23 & 255;
  return t &= 8388607, n == 255 ? t ? NaN : e * (1 / 0) : n == 0 ? 1401298464324817e-60 * e * t : e * Math.pow(2, n - 150) * (t + 8388608);
}
function n1(e) {
  return ht(e);
}
function Fs(e, t, { ba: n = !1 } = {}) {
  e.ba = n, t && (t = Ar(t), e.h = t.buffer, e.m = t.N, e.j = 0, e.l = e.h.length, e.g = e.j);
}
function _t(e, t) {
  if (e.g = t, t > e.l) throw Jo(e.l, t);
}
function Zo(e, t) {
  if (t < 0) throw Error(`Tried to read a negative byte length: ${t}`);
  const n = e.g, s = n + t;
  if (s > e.l) throw Jo(t, e.l - n);
  return e.g = s, n;
}
function Qo(e, t) {
  if (t == 0) return vt();
  var n = Zo(e, t);
  return e.ba && e.m ? n = e.h.subarray(n, n + t) : (e = e.h, n = n === (t = n + t) ? new Uint8Array(0) : j2 ? e.slice(n, t) : new Uint8Array(e.subarray(n, t))), n.length == 0 ? vt() : new Xe(n, Ot);
}
be.prototype.toJSON = void 0, be.prototype.Ia = Do;
var Ci = [];
function ea(e) {
  var t = e.g;
  if (t.g == t.l) return !1;
  e.l = e.g.g;
  var n = qe(e.g);
  if (t = n >>> 3, !((n &= 7) >= 0 && n <= 5)) throw qo(n, e.l);
  if (t < 1) throw Error(`Invalid field number: ${t} (at position ${e.l})`);
  return e.m = t, e.h = n, !0;
}
function An(e) {
  switch (e.h) {
    case 0:
      e.h != 0 ? An(e) : Sr(e.g);
      break;
    case 1:
      _t(e = e.g, e.g + 8);
      break;
    case 2:
      if (e.h != 2) An(e);
      else {
        var t = qe(e.g);
        _t(e = e.g, e.g + t);
      }
      break;
    case 5:
      _t(e = e.g, e.g + 4);
      break;
    case 3:
      for (t = e.m; ; ) {
        if (!ea(e)) throw Error("Unmatched start-group tag: stream EOF");
        if (e.h == 4) {
          if (e.m != t) throw Error("Unmatched end-group tag");
          break;
        }
        An(e);
      }
      break;
    default:
      throw qo(e.h, e.l);
  }
}
function pn(e, t, n) {
  const s = e.g.l, r = qe(e.g), i = e.g.g + r;
  let o = i - s;
  if (o <= 0 && (e.g.l = i, n(t, e, void 0, void 0, void 0), o = i - e.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${r} bytes, instead read ${r - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return e.g.g = i, e.g.l = s, t;
}
function Tr(e) {
  var t = qe(e.g), n = Zo(e = e.g, t);
  if (e = e.h, k2) {
    var s, r = e;
    (s = ws) || (s = ws = new TextDecoder("utf-8", { fatal: !0 })), t = n + t, r = n === 0 && t === r.length ? r : r.subarray(n, t);
    try {
      var i = s.decode(r);
    } catch (a) {
      if (yn === void 0) {
        try {
          s.decode(new Uint8Array([128]));
        } catch {
        }
        try {
          s.decode(new Uint8Array([97])), yn = !0;
        } catch {
          yn = !1;
        }
      }
      throw !yn && (ws = void 0), a;
    }
  } else {
    t = (i = n) + t, n = [];
    let a, h = null;
    for (; i < t; ) {
      var o = e[i++];
      o < 128 ? n.push(o) : o < 224 ? i >= t ? pt() : (a = e[i++], o < 194 || (192 & a) != 128 ? (i--, pt()) : n.push((31 & o) << 6 | 63 & a)) : o < 240 ? i >= t - 1 ? pt() : (a = e[i++], (192 & a) != 128 || o === 224 && a < 160 || o === 237 && a >= 160 || (192 & (s = e[i++])) != 128 ? (i--, pt()) : n.push((15 & o) << 12 | (63 & a) << 6 | 63 & s)) : o <= 244 ? i >= t - 2 ? pt() : (a = e[i++], (192 & a) != 128 || a - 144 + (o << 28) >> 30 != 0 || (192 & (s = e[i++])) != 128 || (192 & (r = e[i++])) != 128 ? (i--, pt()) : (o = (7 & o) << 18 | (63 & a) << 12 | (63 & s) << 6 | 63 & r, o -= 65536, n.push(55296 + (o >> 10 & 1023), 56320 + (1023 & o)))) : pt(), n.length >= 8192 && (h = mi(h, n), n.length = 0);
    }
    i = mi(h, n);
  }
  return i;
}
function ta(e) {
  const t = qe(e.g);
  return Qo(e.g, t);
}
function Yn(e, t, n) {
  var s = qe(e.g);
  for (s = e.g.g + s; e.g.g < s; ) n.push(t(e.g));
}
var _n = [];
function s1(e) {
  return e;
}
let xt;
function xe(e, t, n) {
  t.g ? t.m(e, t.g, t.h, n) : t.m(e, t.h, n);
}
var f = class {
  constructor(e, t) {
    this.u = zo(e, t);
  }
  toJSON() {
    const e = !xt;
    try {
      return e && (xt = jo), na(this);
    } finally {
      e && (xt = void 0);
    }
  }
  l() {
    var e = U1;
    return e.g ? e.l(this, e.g, e.h, !0) : e.l(this, e.h, e.defaultValue, !0);
  }
  clone() {
    const e = this.u;
    return new this.constructor(Xn(e, 0 | e[g], !1));
  }
  N() {
    return !!(2 & (0 | this.u[g]));
  }
};
function na(e) {
  var t = e.u;
  {
    t = (e = xt(t)) !== t;
    let c = e.length;
    if (c) {
      var n = e[c - 1], s = rr(n);
      s ? c-- : n = void 0;
      var r = e;
      if (s) {
        e: {
          var i, o = n, a = !1;
          if (o) for (let u in o) isNaN(+u) ? (i ?? (i = {}))[u] = o[u] : (s = o[u], Array.isArray(s) && (xn(s) || bi(s) && s.size === 0) && (s = null), s == null && (a = !0), s != null && ((i ?? (i = {}))[u] = s));
          if (a || (i = o), i) for (let u in i) {
            a = i;
            break e;
          }
          a = null;
        }
        o = a == null ? n != null : a !== n;
      }
      for (; c > 0 && ((i = r[c - 1]) == null || xn(i) || bi(i) && i.size === 0); c--) var h = !0;
      (r !== e || o || h) && (t ? (h || o || a) && (r.length = c) : r = Array.prototype.slice.call(r, 0, c), a && r.push(a)), h = r;
    } else h = e;
  }
  return h;
}
function Ii(e) {
  return e ? /^\d+$/.test(e) ? (jn(e), new Vs(T, D)) : null : r1 || (r1 = new Vs(0, 0));
}
f.prototype.W = mn, f.prototype.toString = function() {
  try {
    return xt = s1, na(this).toString();
  } finally {
    xt = void 0;
  }
};
var Vs = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let r1;
function Oi(e) {
  return e ? /^-?\d+$/.test(e) ? (jn(e), new js(T, D)) : null : i1 || (i1 = new js(0, 0));
}
var js = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let i1;
function Mt(e, t, n) {
  for (; n > 0 || t > 127; ) e.g.push(127 & t | 128), t = (t >>> 7 | n << 25) >>> 0, n >>>= 7;
  e.g.push(t);
}
function $t(e, t) {
  for (; t > 127; ) e.g.push(127 & t | 128), t >>>= 7;
  e.g.push(t);
}
function qn(e, t) {
  if (t >= 0) $t(e, t);
  else {
    for (let n = 0; n < 9; n++) e.g.push(127 & t | 128), t >>= 7;
    e.g.push(1);
  }
}
function ln(e, t) {
  e.g.push(t >>> 0 & 255), e.g.push(t >>> 8 & 255), e.g.push(t >>> 16 & 255), e.g.push(t >>> 24 & 255);
}
function Nt(e, t) {
  t.length !== 0 && (e.l.push(t), e.h += t.length);
}
function de(e, t, n) {
  $t(e.g, 8 * t + n);
}
function Fr(e, t) {
  return de(e, t, 2), t = e.g.end(), Nt(e, t), t.push(e.h), t;
}
function Lr(e, t) {
  var n = t.pop();
  for (n = e.h + e.g.length() - n; n > 127; ) t.push(127 & n | 128), n >>>= 7, e.h++;
  t.push(n), e.h++;
}
function Jn(e, t, n) {
  de(e, t, 2), $t(e.g, n.length), Nt(e, e.g.end()), Nt(e, n);
}
function Rn(e, t, n, s) {
  n != null && (t = Fr(e, t), s(n, e), Lr(e, t));
}
function Me() {
  const e = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(e, e.prototype), e;
}
var xr = Me(), sa = Me(), Mr = Me(), Cr = Me(), ra = Me(), ia = Me(), Ir = Me(), oa = Me(), aa = Me(), Kt = class {
  constructor(e, t, n) {
    this.g = e, this.h = t, e = xr, this.l = !!e && n === e || !1;
  }
};
function Zn(e, t) {
  return new Kt(e, t, xr);
}
function ha(e, t, n, s, r) {
  Rn(e, n, da(t, s), r);
}
const o1 = Zn((function(e, t, n, s, r) {
  return e.h === 2 && (pn(e, br(t, s, n), r), !0);
}), ha), a1 = Zn((function(e, t, n, s, r) {
  return e.h === 2 && (pn(e, br(t, s, n, !0), r), !0);
}), ha);
var Qn = Symbol(), Or = Symbol(), Pi = Symbol(), Ri = Symbol();
let ca, ua;
function bt(e, t, n, s) {
  var r = s[e];
  if (r) return r;
  (r = {}).Pa = s, r.V = (function(l) {
    switch (typeof l) {
      case "boolean":
        return Ho || (Ho = [0, void 0, !0]);
      case "number":
        return l > 0 ? void 0 : l === 0 ? e1 || (e1 = [0, void 0]) : [-l, void 0];
      case "string":
        return [0, l];
      case "object":
        return l;
    }
  })(s[0]);
  var i = s[1];
  let o = 1;
  i && i.constructor === Object && (r.ga = i, typeof (i = s[++o]) == "function" && (r.la = !0, ca ?? (ca = i), ua ?? (ua = s[o + 1]), i = s[o += 2]));
  const a = {};
  for (; i && Array.isArray(i) && i.length && typeof i[0] == "number" && i[0] > 0; ) {
    for (var h = 0; h < i.length; h++) a[i[h]] = i;
    i = s[++o];
  }
  for (h = 1; i !== void 0; ) {
    let l;
    typeof i == "number" && (h += i, i = s[++o]);
    var c = void 0;
    if (i instanceof Kt ? l = i : (l = o1, o--), l == null ? void 0 : l.l) {
      i = s[++o], c = s;
      var u = o;
      typeof i == "function" && (i = i(), c[u] = i), c = i;
    }
    for (u = h + 1, typeof (i = s[++o]) == "number" && i < 0 && (u -= i, i = s[++o]); h < u; h++) {
      const w = a[h];
      c ? n(r, h, l, c, w) : t(r, h, l, w);
    }
  }
  return s[e] = r;
}
function la(e) {
  return Array.isArray(e) ? e[0] instanceof Kt ? e : [a1, e] : [e, void 0];
}
function da(e, t) {
  return e instanceof f ? e.u : Array.isArray(e) ? ot(e, t, !1) : void 0;
}
function Pr(e, t, n, s) {
  const r = n.g;
  e[t] = s ? (i, o, a) => r(i, o, a, s) : r;
}
function Rr(e, t, n, s, r) {
  const i = n.g;
  let o, a;
  e[t] = (h, c, u) => i(h, c, u, a || (a = bt(Or, Pr, Rr, s).V), o || (o = Dr(s)), r);
}
function Dr(e) {
  let t = e[Pi];
  if (t != null) return t;
  const n = bt(Or, Pr, Rr, e);
  return t = n.la ? (s, r) => ca(s, r, n) : (s, r) => {
    const i = 0 | s[g];
    for (; ea(r) && r.h != 4; ) {
      var o = r.m, a = n[o];
      if (a == null) {
        var h = n.ga;
        h && (h = h[o]) && (h = h1(h)) != null && (a = n[o] = h);
      }
      a != null && a(r, s, o) || (o = (a = r).l, An(a), a.fa ? a = void 0 : (h = a.g.g - o, a.g.g = o, a = Qo(a.g, h)), o = s, a && ((h = o[Pt]) ? h.push(a) : o[Pt] = [a]));
    }
    return 16384 & i && jt(s), !0;
  }, e[Pi] = t;
}
function h1(e) {
  const t = (e = la(e))[0].g;
  if (e = e[1]) {
    const n = Dr(e), s = bt(Or, Pr, Rr, e).V;
    return (r, i, o) => t(r, i, o, s, n);
  }
  return t;
}
function es(e, t, n) {
  e[t] = n.h;
}
function ts(e, t, n, s) {
  let r, i;
  const o = n.h;
  e[t] = (a, h, c) => o(a, h, c, i || (i = bt(Qn, es, ts, s).V), r || (r = fa(s)));
}
function fa(e) {
  let t = e[Ri];
  if (!t) {
    const n = bt(Qn, es, ts, e);
    t = (s, r) => ma(s, r, n), e[Ri] = t;
  }
  return t;
}
function ma(e, t, n) {
  for (var s = 0 | e[g], r = 512 & s ? 0 : -1, i = e.length, o = 512 & s ? 1 : 0, a = i + (256 & s ? -1 : 0); o < a; o++) {
    const h = e[o];
    if (h == null) continue;
    const c = o - r, u = Di(n, c);
    u && u(t, h, c);
  }
  if (256 & s) {
    s = e[i - 1];
    for (const h in s) r = +h, Number.isNaN(r) || (i = s[r]) != null && (a = Di(n, r)) && a(t, i, r);
  }
  if (e = or(e)) for (Nt(t, t.g.end()), n = 0; n < e.length; n++) Nt(t, tr(e[n]) || new Uint8Array(0));
}
function Di(e, t) {
  var n = e[t];
  if (n) return n;
  if ((n = e.ga) && (n = n[t])) {
    var s = (n = la(n))[0].h;
    if (n = n[1]) {
      const r = fa(n), i = bt(Qn, es, ts, n).V;
      n = e.la ? ua(i, r) : (o, a, h) => s(o, a, h, i, r);
    } else n = s;
    return e[t] = n;
  }
}
function Yt(e, t) {
  if (Array.isArray(t)) {
    var n = 0 | t[g];
    if (4 & n) return t;
    for (var s = 0, r = 0; s < t.length; s++) {
      const i = e(t[s]);
      i != null && (t[r++] = i);
    }
    return r < s && (t.length = r), G(t, -12289 & (5 | n)), 2 & n && Object.freeze(t), t;
  }
}
function Q(e, t, n) {
  return new Kt(e, t, n);
}
function qt(e, t, n) {
  return new Kt(e, t, n);
}
function ee(e, t, n) {
  R(e, 0 | e[g], t, n);
}
var c1 = Zn((function(e, t, n, s, r) {
  return e.h === 2 && (e = pn(e, ot([void 0, void 0], s, !0), r), ut(s = 0 | t[g]), (r = Je(t, s, n)) instanceof be ? (2 & r.L) != 0 ? ((r = r.X()).push(e), R(t, s, n, r)) : r.Na(e) : Array.isArray(r) ? (2 & (0 | r[g]) && R(t, s, n, r = Xo(r)), r.push(e)) : R(t, s, n, [e]), !0);
}), (function(e, t, n, s, r) {
  if (t instanceof be) t.forEach(((i, o) => {
    Rn(e, n, ot([o, i], s, !1), r);
  }));
  else if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
    const o = t[i];
    Array.isArray(o) && Rn(e, n, ot(o, s, !1), r);
  }
}));
function pa(e, t, n) {
  if (t = (function(s) {
    if (s == null) return s;
    const r = typeof s;
    if (r === "bigint") return String(lr(64, s));
    if (Wn(s)) {
      if (r === "string") return fr(s);
      if (r === "number") return dr(s);
    }
  })(t), t != null && (typeof t == "string" && Oi(t), t != null))
    switch (de(e, n, 0), typeof t) {
      case "number":
        e = e.g, Rt(t), Mt(e, T, D);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new js(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), Mt(e.g, n.h, n.g);
        break;
      default:
        n = Oi(t), Mt(e.g, n.h, n.g);
    }
}
function ga(e, t, n) {
  (t = zt(t)) != null && t != null && (de(e, n, 0), qn(e.g, t));
}
function ya(e, t, n) {
  (t = No(t)) != null && (de(e, n, 0), e.g.g.push(t ? 1 : 0));
}
function _a(e, t, n) {
  (t = Dt(t)) != null && Jn(e, n, To(t));
}
function wa(e, t, n, s, r) {
  Rn(e, n, da(t, s), r);
}
function va(e, t, n) {
  (t = t == null || typeof t == "string" || dn(t) || t instanceof Xe ? t : void 0) != null && Jn(e, n, Ar(t).buffer);
}
function ba(e, t, n) {
  return (e.h === 5 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Yn(e, Hs, t) : t.push(Hs(e.g)), !0);
}
var Ve = Q((function(e, t, n) {
  if (e.h !== 1) return !1;
  var s = e.g;
  e = Gs(s);
  const r = Gs(s);
  s = 2 * (r >> 31) + 1;
  const i = r >>> 20 & 2047;
  return e = 4294967296 * (1048575 & r) + e, ee(t, n, i == 2047 ? e ? NaN : s * (1 / 0) : i == 0 ? 5e-324 * s * e : s * Math.pow(2, i - 1075) * (e + 4503599627370496)), !0;
}), (function(e, t, n) {
  (t = lt(t)) != null && (de(e, n, 1), e = e.g, (n = Bo || (Bo = new DataView(new ArrayBuffer(8)))).setFloat64(0, +t, !0), T = n.getUint32(0, !0), D = n.getUint32(4, !0), ln(e, T), ln(e, D));
}), Me()), H = Q((function(e, t, n) {
  return e.h === 5 && (ee(t, n, Hs(e.g)), !0);
}), (function(e, t, n) {
  (t = lt(t)) != null && (de(e, n, 5), e = e.g, ar(t), ln(e, T));
}), Ir), u1 = qt(ba, (function(e, t, n) {
  if ((t = Yt(lt, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (de(s, r, 5), s = s.g, ar(i), ln(s, T));
  }
}), Ir), Br = qt(ba, (function(e, t, n) {
  if ((t = Yt(lt, t)) != null && t.length) {
    de(e, n, 2), $t(e.g, 4 * t.length);
    for (let s = 0; s < t.length; s++) n = e.g, ar(t[s]), ln(n, T);
  }
}), Ir), ct = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, kr(e.g, cr)), !0);
}), pa, ia), Ls = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, (e = kr(e.g, cr)) === 0 ? void 0 : e), !0);
}), pa, ia), l1 = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, kr(e.g, hr)), !0);
}), (function(e, t, n) {
  if ((t = X2(t)) != null && (typeof t == "string" && Ii(t), t != null))
    switch (de(e, n, 0), typeof t) {
      case "number":
        e = e.g, Rt(t), Mt(e, T, D);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new Vs(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), Mt(e.g, n.h, n.g);
        break;
      default:
        n = Ii(t), Mt(e.g, n.h, n.g);
    }
}), Me()), B = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, ht(e.g)), !0);
}), ga, Cr), ns = qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Yn(e, ht, t) : t.push(ht(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(zt, t)) != null && t.length) {
    n = Fr(e, n);
    for (let s = 0; s < t.length; s++) qn(e.g, t[s]);
    Lr(e, n);
  }
}), Cr), Ft = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, (e = ht(e.g)) === 0 ? void 0 : e), !0);
}), ga, Cr), C = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, Sr(e.g)), !0);
}), ya, sa), Ct = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, (e = Sr(e.g)) === !1 ? void 0 : e), !0);
}), ya, sa), q = qt((function(e, t, n) {
  return e.h === 2 && (e = Tr(e), Xt(t, 0 | t[g], n, !1).push(e), !0);
}), (function(e, t, n) {
  if ((t = Yt(Dt, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && Jn(s, r, To(i));
  }
}), Mr), it = Q((function(e, t, n) {
  return e.h === 2 && (ee(t, n, (e = Tr(e)) === "" ? void 0 : e), !0);
}), _a, Mr), k = Q((function(e, t, n) {
  return e.h === 2 && (ee(t, n, Tr(e)), !0);
}), _a, Mr), z = (function(e, t, n = xr) {
  return new Kt(e, t, n);
})((function(e, t, n, s, r) {
  return e.h === 2 && (s = ot(void 0, s, !0), Xt(t, 0 | t[g], n, !0).push(s), pn(e, s, r), !0);
}), (function(e, t, n, s, r) {
  if (Array.isArray(t)) for (let i = 0; i < t.length; i++) wa(e, t[i], n, s, r);
})), S = Zn((function(e, t, n, s, r, i) {
  return e.h === 2 && ($o(t, 0 | t[g], i, n), pn(e, t = br(t, s, n), r), !0);
}), wa), Ea = Q((function(e, t, n) {
  return e.h === 2 && (ee(t, n, ta(e)), !0);
}), va, oa), d1 = qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Yn(e, qe, t) : t.push(qe(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(Uo, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (de(s, r, 0), $t(s.g, i));
  }
}), ra), f1 = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, (e = qe(e.g)) === 0 ? void 0 : e), !0);
}), (function(e, t, n) {
  (t = Uo(t)) != null && t != null && (de(e, n, 0), $t(e.g, t));
}), ra), Ae = Q((function(e, t, n) {
  return e.h === 0 && (ee(t, n, ht(e.g)), !0);
}), (function(e, t, n) {
  (t = zt(t)) != null && (t = parseInt(t, 10), de(e, n, 0), qn(e.g, t));
}), aa);
class m1 {
  constructor(t, n) {
    this.h = t, this.g = n, this.l = E, this.m = y, this.defaultValue = void 0;
  }
}
function Ce(e, t) {
  return new m1(e, t);
}
function dt(e, t) {
  return (n, s) => {
    if (_n.length) {
      const i = _n.pop();
      i.o(s), Fs(i.g, n, s), n = i;
    } else n = new class {
      constructor(i, o) {
        if (Ci.length) {
          const a = Ci.pop();
          Fs(a, i, o), i = a;
        } else i = new class {
          constructor(a, h) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, Fs(this, a, h);
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
    }(n, s);
    try {
      const i = new e(), o = i.u;
      Dr(t)(o, n);
      var r = i;
    } finally {
      n.g.clear(), n.m = -1, n.h = -1, _n.length < 100 && _n.push(n);
    }
    return r;
  };
}
function ss(e) {
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
    ma(this.u, t, bt(Qn, es, ts, e)), Nt(t, t.g.end());
    const n = new Uint8Array(t.h), s = t.l, r = s.length;
    let i = 0;
    for (let o = 0; o < r; o++) {
      const a = s[o];
      n.set(a, i), i += a.length;
    }
    return t.l = [n], n;
  };
}
var Bi = class extends f {
  constructor(e) {
    super(e);
  }
}, Ni = [0, it, Q((function(e, t, n) {
  return e.h === 2 && (ee(t, n, (e = ta(e)) === vt() ? void 0 : e), !0);
}), (function(e, t, n) {
  if (t != null) {
    if (t instanceof f) {
      const s = t.Ra;
      return void (s && (t = s(t), t != null && Jn(e, n, Ar(t).buffer)));
    }
    if (Array.isArray(t)) return;
  }
  va(e, t, n);
}), oa)];
let xs, Ui = globalThis.trustedTypes;
function Gi(e) {
  xs === void 0 && (xs = (function() {
    let n = null;
    if (!Ui) return n;
    try {
      const s = (r) => r;
      n = Ui.createPolicy("goog#html", { createHTML: s, createScript: s, createScriptURL: s });
    } catch {
    }
    return n;
  })());
  var t = xs;
  return new class {
    constructor(n) {
      this.g = n;
    }
    toString() {
      return this.g + "";
    }
  }(t ? t.createScriptURL(e) : e);
}
function p1(e, ...t) {
  if (t.length === 0) return Gi(e[0]);
  let n = e[0];
  for (let s = 0; s < t.length; s++) n += encodeURIComponent(t[s]) + e[s + 1];
  return Gi(n);
}
var Aa = [0, B, Ae, C, -1, ns, Ae, -1], g1 = class extends f {
  constructor(e) {
    super(e);
  }
}, ka = [0, C, k, C, Ae, -1, qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Yn(e, n1, t) : t.push(ht(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(zt, t)) != null && t.length) {
    n = Fr(e, n);
    for (let s = 0; s < t.length; s++) qn(e.g, t[s]);
    Lr(e, n);
  }
}), aa), k, -1, [0, C, -1], Ae, C, -1], Sa = [0, k, -2], Hi = class extends f {
  constructor(e) {
    super(e);
  }
}, Ta = [0], Fa = [0, B, C, 1, C, -3], le = class extends f {
  constructor(e) {
    super(e, 2);
  }
}, V = {};
V[336783863] = [0, k, C, -1, B, [0, [1, 2, 3, 4, 5, 6, 7, 8], S, Ta, S, ka, S, Sa, S, Fa, S, Aa, S, [0, k, -2], S, [0, k, Ae], S, [0, Ae, k]], [0, k], C, [0, [1, 3], [2, 4], S, [0, ns], -1, S, [0, q], -1, z, [0, k, -1]], k];
var Vi = [0, Ls, -1, Ct, -3, Ls, ns, it, Ft, Ls, -1, Ct, Ft, Ct, -2, it];
function fe(e, t) {
  Us(e, 2, Wt(t), "");
}
function L(e, t) {
  Kn(e, 3, t);
}
function b(e, t) {
  Kn(e, 4, t);
}
var Z = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 7, e);
  }
}, on = [-1, {}], ji = [0, k, 1, on], zi = [0, k, q, on];
function me(e, t) {
  On(e, 1, Z, t);
}
function x(e, t) {
  Kn(e, 10, t);
}
function A(e, t) {
  Kn(e, 15, t);
}
var ae = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 1001, e);
  }
}, La = [-500, z, [-500, it, -1, q, -3, [-2, V, C], z, Ni, Ft, -1, ji, zi, z, [0, it, Ct], it, Vi, Ft, q, 987, q], 4, z, [-500, k, -1, [-1, {}], 998, k], z, [-500, k, q, -1, [-2, {}, C], 997, q, -1], Ft, z, [-500, k, q, on, 998, q], q, Ft, ji, zi, z, [0, it, -1, on], q, -2, Vi, it, -1, Ct, [0, Ct, f1], 978, on, z, Ni];
ae.prototype.g = ss(La);
var y1 = dt(ae, La), _1 = class extends f {
  constructor(e) {
    super(e);
  }
}, xa = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Ye(this, _1, 1);
  }
}, Ma = [0, z, [0, B, H, k, -1]], rs = dt(xa, Ma), w1 = class extends f {
  constructor(e) {
    super(e);
  }
}, v1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Ms = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, w1, 2);
  }
  g() {
    return Ye(this, v1, 5);
  }
}, Ca = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, q, ns, Br, [0, Ae, [0, B, -3], [0, H, -3], [0, B, -1, [0, z, [0, B, -2]]], z, [0, H, -1, k, H]], k, -1, ct, z, [0, B, H], q, ct]), Ia = class extends f {
  constructor(e) {
    super(e);
  }
}, It = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, H, -4]]), Oa = class extends f {
  constructor(e) {
    super(e);
  }
}, gn = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, H, -4]]), b1 = class extends f {
  constructor(e) {
    super(e);
  }
}, E1 = [0, B, -1, Br, Ae], Pa = class extends f {
  constructor(e) {
    super(e);
  }
};
Pa.prototype.g = ss([0, H, -4, ct]);
var A1 = class extends f {
  constructor(e) {
    super(e);
  }
}, k1 = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, 1, B, k, Ma], ct]), Wi = class extends f {
  constructor(e) {
    super(e);
  }
}, S1 = class extends f {
  constructor(e) {
    super(e);
  }
  oa() {
    const e = Wo(this);
    return e ?? vt();
  }
}, T1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Ra = [1, 2], F1 = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, Ra, S, [0, Br], S, [0, Ea], B, k], ct]), Nr = class extends f {
  constructor(e) {
    super(e);
  }
}, Da = [0, k, B, H, q, -1], Xi = class extends f {
  constructor(e) {
    super(e);
  }
}, L1 = [0, C, -1], $i = class extends f {
  constructor(e) {
    super(e);
  }
}, kn = [1, 2, 3, 4, 5], Dn = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Wo(this) != null;
  }
  h() {
    return Ee(this, 2) != null;
  }
}, I = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return No(Bt(this, 2)) ?? !1;
  }
}, Ba = [0, Ea, k, [0, B, ct, -1], [0, l1, ct]], U = [0, Ba, C, [0, kn, S, Fa, S, ka, S, Aa, S, Ta, S, Sa], Ae], is = class extends f {
  constructor(e) {
    super(e);
  }
}, Ur = [0, U, H, -1, B], x1 = Ce(502141897, is);
V[502141897] = Ur;
var M1 = dt(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, [0, Ae, -1, u1, d1], E1]), Na = class extends f {
  constructor(e) {
    super(e);
  }
}, Ua = class extends f {
  constructor(e) {
    super(e);
  }
}, Gr = [0, U, H, [0, U], C], Ga = [0, U, Ur, Gr, H, [0, [0, Ba]]], C1 = Ce(508968150, Ua);
V[508968150] = Ga, V[508968149] = Gr;
var Ha = class extends f {
  constructor(e) {
    super(e);
  }
}, I1 = Ce(513916220, Ha);
V[513916220] = [0, U, Ga, B];
var St = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, Nr, 2);
  }
  g() {
    F(this, 2);
  }
}, Va = [0, U, Da];
V[478825465] = Va;
var O1 = class extends f {
  constructor(e) {
    super(e);
  }
}, ja = class extends f {
  constructor(e) {
    super(e);
  }
}, Hr = class extends f {
  constructor(e) {
    super(e);
  }
}, Vr = class extends f {
  constructor(e) {
    super(e);
  }
}, za = class extends f {
  constructor(e) {
    super(e);
  }
}, Ki = [0, U, [0, U], Va, -1], Wa = [0, U, H, B], jr = [0, U, H], Xa = [0, U, Wa, jr, H], P1 = Ce(479097054, za);
V[479097054] = [0, U, Xa, Ki], V[463370452] = Ki, V[464864288] = Wa;
var R1 = Ce(462713202, Vr);
V[462713202] = Xa, V[474472470] = jr;
var D1 = class extends f {
  constructor(e) {
    super(e);
  }
}, $a = class extends f {
  constructor(e) {
    super(e);
  }
}, Ka = class extends f {
  constructor(e) {
    super(e);
  }
}, Ya = class extends f {
  constructor(e) {
    super(e);
  }
}, zr = [0, U, H, -1, B], zs = [0, U, H, C];
Ya.prototype.g = ss([0, U, jr, [0, U], Ur, Gr, zr, zs]);
var qa = class extends f {
  constructor(e) {
    super(e);
  }
}, B1 = Ce(456383383, qa);
V[456383383] = [0, U, Da];
var Ja = class extends f {
  constructor(e) {
    super(e);
  }
}, N1 = Ce(476348187, Ja);
V[476348187] = [0, U, L1];
var Za = class extends f {
  constructor(e) {
    super(e);
  }
}, Yi = class extends f {
  constructor(e) {
    super(e);
  }
}, Qa = [0, Ae, -1], U1 = Ce(458105876, class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    var e = this.u;
    const t = 0 | e[g], n = 2 & t;
    return e = (function(s, r, i) {
      var o = Yi;
      const a = 2 & r;
      let h = !1;
      if (i == null) {
        if (a) return Mi();
        i = [];
      } else if (i.constructor === be) {
        if ((2 & i.L) == 0 || a) return i;
        i = i.X();
      } else Array.isArray(i) ? h = !!(2 & (0 | i[g])) : i = [];
      if (a) {
        if (!i.length) return Mi();
        h || (h = !0, jt(i));
      } else h && (h = !1, i = Xo(i));
      return h || (64 & (0 | i[g]) ? i[g] &= -33 : 32 & r && Gn(i, 32)), R(s, r, 2, o = new be(i, o, $2, void 0)), o;
    })(e, t, Je(e, t, 2)), !n && Yi && (e.ra = !0), e;
  }
});
V[458105876] = [0, Qa, c1, [!0, ct, [0, k, -1, q]]];
var Wr = class extends f {
  constructor(e) {
    super(e);
  }
}, e2 = Ce(458105758, Wr);
V[458105758] = [0, U, k, Qa];
var t2 = class extends f {
  constructor(e) {
    super(e);
  }
}, G1 = Ce(443442058, t2);
V[443442058] = [0, U, k, B, H, q, -1, C, H], V[514774813] = zr;
var n2 = class extends f {
  constructor(e) {
    super(e);
  }
}, H1 = Ce(516587230, n2);
function Ws(e, t) {
  return t = t ? t.clone() : new Nr(), e.displayNamesLocale !== void 0 ? F(t, 1, Wt(e.displayNamesLocale)) : e.displayNamesLocale === void 0 && F(t, 1), e.maxResults !== void 0 ? Ue(t, 2, e.maxResults) : "maxResults" in e && F(t, 2), e.scoreThreshold !== void 0 ? m(t, 3, e.scoreThreshold) : "scoreThreshold" in e && F(t, 3), e.categoryAllowlist !== void 0 ? Pn(t, 4, e.categoryAllowlist) : "categoryAllowlist" in e && F(t, 4), e.categoryDenylist !== void 0 ? Pn(t, 5, e.categoryDenylist) : "categoryDenylist" in e && F(t, 5), t;
}
function Xr(e, t = -1, n = "") {
  return { categories: e.map(((s) => ({ index: ve(s, 1) ?? 0 ?? -1, score: N(s, 2) ?? 0, categoryName: Ee(s, 3) ?? "" ?? "", displayName: Ee(s, 4) ?? "" ?? "" }))), headIndex: t, headName: n };
}
function s2(e) {
  var o, a;
  var t = yt(e, 3, lt, gt()), n = yt(e, 2, zt, gt()), s = yt(e, 1, Dt, gt()), r = yt(e, 9, Dt, gt());
  const i = { categories: [], keypoints: [] };
  for (let h = 0; h < t.length; h++) i.categories.push({ score: t[h], index: n[h] ?? -1, categoryName: s[h] ?? "", displayName: r[h] ?? "" });
  if ((t = (o = E(e, Ms, 4)) == null ? void 0 : o.h()) && (i.boundingBox = { originX: ve(t, 1) ?? 0, originY: ve(t, 2) ?? 0, width: ve(t, 3) ?? 0, height: ve(t, 4) ?? 0, angle: 0 }), (a = E(e, Ms, 4)) == null ? void 0 : a.g().length) for (const h of E(e, Ms, 4).g()) i.keypoints.push({ x: En(h, 1) ?? 0, y: En(h, 2) ?? 0, score: En(h, 4) ?? 0, label: Ee(h, 3) ?? "" });
  return i;
}
function os(e) {
  const t = [];
  for (const n of Ye(e, Oa, 1)) t.push({ x: N(n, 1) ?? 0, y: N(n, 2) ?? 0, z: N(n, 3) ?? 0, visibility: N(n, 4) ?? 0 });
  return t;
}
function an(e) {
  const t = [];
  for (const n of Ye(e, Ia, 1)) t.push({ x: N(n, 1) ?? 0, y: N(n, 2) ?? 0, z: N(n, 3) ?? 0, visibility: N(n, 4) ?? 0 });
  return t;
}
function qi(e) {
  return Array.from(e, ((t) => t > 127 ? t - 256 : t));
}
function Ji(e, t) {
  if (e.length !== t.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);
  let n = 0, s = 0, r = 0;
  for (let i = 0; i < e.length; i++) n += e[i] * t[i], s += e[i] * e[i], r += t[i] * t[i];
  if (s <= 0 || r <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(s * r);
}
let wn;
V[516587230] = [0, U, zr, zs, H], V[518928384] = zs;
const V1 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function r2() {
  if (wn === void 0) try {
    await WebAssembly.instantiate(V1), wn = !0;
  } catch {
    wn = !1;
  }
  return wn;
}
async function tn(e, t = p1``) {
  const n = await r2() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${t}/${e}_${n}.js`, wasmBinaryPath: `${t}/${e}_${n}.wasm` };
}
var st = class {
};
function i2() {
  var e = navigator;
  return typeof OffscreenCanvas < "u" && (!(function(t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  })(e) || !!((e = e.userAgent.match(/Version\/([\d]+).*Safari/)) && e.length >= 1 && Number(e[1]) >= 17));
}
async function Zi(e) {
  if (typeof importScripts != "function") {
    const t = document.createElement("script");
    return t.src = e.toString(), t.crossOrigin = "anonymous", new Promise(((n, s) => {
      t.addEventListener("load", (() => {
        n();
      }), !1), t.addEventListener("error", ((r) => {
        s(r);
      }), !1), document.body.appendChild(t);
    }));
  }
  importScripts(e.toString());
}
function o2(e) {
  return e.videoWidth !== void 0 ? [e.videoWidth, e.videoHeight] : e.naturalWidth !== void 0 ? [e.naturalWidth, e.naturalHeight] : e.displayWidth !== void 0 ? [e.displayWidth, e.displayHeight] : [e.width, e.height];
}
function p(e, t, n) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(t = e.i.stringToNewUTF8(t)), e.i._free(t);
}
function Qi(e, t, n) {
  if (!e.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? e.i._bindTextureToStream(n) : e.i._bindTextureToCanvas(), !(n = e.i.canvas.getContext("webgl2") || e.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t), e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [s, r] = o2(t);
  return !e.l || s === e.i.canvas.width && r === e.i.canvas.height || (e.i.canvas.width = s, e.i.canvas.height = r), [s, r];
}
function eo(e, t, n) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const s = new Uint32Array(t.length);
  for (let r = 0; r < t.length; r++) s[r] = e.i.stringToNewUTF8(t[r]);
  t = e.i._malloc(4 * s.length), e.i.HEAPU32.set(s, t >> 2), n(t);
  for (const r of s) e.i._free(r);
  e.i._free(t);
}
function Pe(e, t, n) {
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = n;
}
function nt(e, t, n) {
  let s = [];
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = (r, i, o) => {
    i ? (n(s, o), s = []) : s.push(r);
  };
}
st.forVisionTasks = function(e) {
  return tn("vision", e);
}, st.forTextTasks = function(e) {
  return tn("text", e);
}, st.forGenAiExperimentalTasks = function(e) {
  return tn("genai_experimental", e);
}, st.forGenAiTasks = function(e) {
  return tn("genai", e);
}, st.forAudioTasks = function(e) {
  return tn("audio", e);
}, st.isSimdSupported = function() {
  return r2();
};
async function j1(e, t, n, s) {
  return e = await (async (r, i, o, a, h) => {
    if (i && await Zi(i), !self.ModuleFactory || o && (await Zi(o), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && h && ((i = self.Module).locateFile = h.locateFile, h.mainScriptUrlOrBlob && (i.mainScriptUrlOrBlob = h.mainScriptUrlOrBlob)), h = await self.ModuleFactory(self.Module || h), self.ModuleFactory = self.Module = void 0, new r(h, a);
  })(e, n.wasmLoaderPath, n.assetLoaderPath, t, { locateFile: (r) => r.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && r.endsWith(".data") ? n.assetBinaryPath.toString() : r }), await e.o(s), e;
}
function Cs(e, t) {
  const n = E(e.baseOptions, Dn, 1) || new Dn();
  typeof t == "string" ? (F(n, 2, Wt(t)), F(n, 1)) : t instanceof Uint8Array && (F(n, 1, ir(t, !1)), F(n, 2)), y(e.baseOptions, 0, 1, n);
}
function to(e) {
  try {
    const t = e.G.length;
    if (t === 1) throw Error(e.G[0].message);
    if (t > 1) throw Error("Encountered multiple errors: " + e.G.map(((n) => n.message)).join(", "));
  } finally {
    e.G = [];
  }
}
function d(e, t) {
  e.B = Math.max(e.B, t);
}
function as(e, t) {
  e.A = new Z(), fe(e.A, "PassThroughCalculator"), L(e.A, "free_memory"), b(e.A, "free_memory_unused_out"), x(t, "free_memory"), me(t, e.A);
}
function Ut(e, t) {
  L(e.A, t), b(e.A, t + "_unused_out");
}
function hs(e) {
  e.g.addBoolToStream(!0, "free_memory", e.B);
}
var Sn = class {
  constructor(e) {
    this.g = e, this.G = [], this.B = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(e, t = !0) {
    var n, s, r, i, o, a;
    if (t) {
      const h = e.baseOptions || {};
      if ((n = e.baseOptions) != null && n.modelAssetBuffer && ((s = e.baseOptions) != null && s.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!((r = E(this.baseOptions, Dn, 1)) != null && r.g() || (i = E(this.baseOptions, Dn, 1)) != null && i.h() || (o = e.baseOptions) != null && o.modelAssetBuffer || (a = e.baseOptions) != null && a.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if ((function(c, u) {
        let l = E(c.baseOptions, $i, 3);
        if (!l) {
          var w = l = new $i(), O = new Hi();
          rn(w, 4, kn, O);
        }
        "delegate" in u && (u.delegate === "GPU" ? (u = l, w = new g1(), rn(u, 2, kn, w)) : (u = l, w = new Hi(), rn(u, 4, kn, w))), y(c.baseOptions, 0, 3, l);
      })(this, h), h.modelAssetPath) return fetch(h.modelAssetPath.toString()).then(((c) => {
        if (c.ok) return c.arrayBuffer();
        throw Error(`Failed to fetch model: ${h.modelAssetPath} (${c.status})`);
      })).then(((c) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(c), !0, !1, !1), Cs(this, "/model.dat"), this.m(), this.I();
      }));
      if (h.modelAssetBuffer instanceof Uint8Array) Cs(this, h.modelAssetBuffer);
      else if (h.modelAssetBuffer) return (async function(c) {
        const u = [];
        for (var l = 0; ; ) {
          const { done: w, value: O } = await c.read();
          if (w) break;
          u.push(O), l += O.length;
        }
        if (u.length === 0) return new Uint8Array(0);
        if (u.length === 1) return u[0];
        c = new Uint8Array(l), l = 0;
        for (const w of u) c.set(w, l), l += w.length;
        return c;
      })(h.modelAssetBuffer).then(((c) => {
        Cs(this, c), this.m(), this.I();
      }));
    }
    return this.m(), this.I(), Promise.resolve();
  }
  I() {
  }
  da() {
    let e;
    if (this.g.da(((t) => {
      e = y1(t);
    })), !e) throw Error("Failed to retrieve CalculatorGraphConfig");
    return e;
  }
  setGraph(e, t) {
    this.g.attachErrorListener(((n, s) => {
      this.G.push(Error(s));
    })), this.g.La(), this.g.setGraph(e, t), this.A = void 0, to(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), to(this);
  }
  close() {
    this.A = void 0, this.g.closeGraph();
  }
};
function Ke(e, t) {
  if (!e) throw Error(`Unable to obtain required WebGL resource: ${t}`);
  return e;
}
Sn.prototype.close = Sn.prototype.close, (function(e, t) {
  e = e.split(".");
  var n, s = wt;
  for ((e[0] in s) || s.execScript === void 0 || s.execScript("var " + e[0]); e.length && (n = e.shift()); ) e.length || t === void 0 ? s = s[n] && s[n] !== Object.prototype[n] ? s[n] : s[n] = {} : s[n] = t;
})("TaskRunner", Sn);
class z1 {
  constructor(t, n, s, r) {
    this.g = t, this.h = n, this.m = s, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function no(e, t, n) {
  const s = e.g;
  if (n = Ke(s.createShader(n), "Failed to create WebGL shader"), s.shaderSource(n, t), s.compileShader(n), !s.getShaderParameter(n, s.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${s.getShaderInfoLog(n)}`);
  return s.attachShader(e.h, n), n;
}
function so(e, t) {
  const n = e.g, s = Ke(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(s);
  const r = Ke(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, r), n.enableVertexAttribArray(e.O), n.vertexAttribPointer(e.O, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const i = Ke(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(e.I), n.vertexAttribPointer(e.I, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(t ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new z1(n, s, r, i);
}
function $r(e, t) {
  if (e.g) {
    if (t !== e.g) throw Error("Cannot change GL context once initialized");
  } else e.g = t;
}
function Kr(e, t, n, s) {
  return $r(e, t), e.h || (e.m(), e.C()), n ? (e.s || (e.s = so(e, !0)), n = e.s) : (e.v || (e.v = so(e, !1)), n = e.v), t.useProgram(e.h), n.bind(), e.l(), e = s(), n.g.bindVertexArray(null), e;
}
function cs(e, t, n) {
  return $r(e, t), e = Ke(t.createTexture(), "Failed to create texture"), t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, n ?? t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, n ?? t.LINEAR), t.bindTexture(t.TEXTURE_2D, null), e;
}
function us(e, t, n) {
  $r(e, t), e.A || (e.A = Ke(t.createFramebuffer(), "Failed to create framebuffe.")), t.bindFramebuffer(t.FRAMEBUFFER, e.A), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, n, 0);
}
function Yr(e) {
  var t;
  (t = e.g) == null || t.bindFramebuffer(e.g.FRAMEBUFFER, null);
}
var qr = class {
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
    if (this.h = Ke(e.createProgram(), "Failed to create WebGL program"), this.aa = no(this, `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`, e.VERTEX_SHADER), this.Z = no(this, this.G(), e.FRAGMENT_SHADER), e.linkProgram(this.h), !e.getProgramParameter(this.h, e.LINK_STATUS)) throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);
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
function je(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((n) => n instanceof Uint8Array));
    case 1:
      return e.g.find(((n) => n instanceof Float32Array));
    case 2:
      return e.g.find(((n) => typeof WebGLTexture < "u" && n instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function Xs(e) {
  var t = je(e, 1);
  if (!t) {
    if (t = je(e, 0)) t = new Float32Array(t).map(((s) => s / 255));
    else {
      t = new Float32Array(e.width * e.height);
      const s = Gt(e);
      var n = Jr(e);
      if (us(n, s, a2(e)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
        n = new Float32Array(e.width * e.height * 4), s.readPixels(0, 0, e.width, e.height, s.RGBA, s.FLOAT, n);
        for (let r = 0, i = 0; r < t.length; ++r, i += 4) t[r] = n[i];
      } else s.readPixels(0, 0, e.width, e.height, s.RED, s.FLOAT, t);
    }
    e.g.push(t);
  }
  return t;
}
function a2(e) {
  let t = je(e, 2);
  if (!t) {
    const n = Gt(e);
    t = c2(e);
    const s = Xs(e), r = h2(e);
    n.texImage2D(n.TEXTURE_2D, 0, r, e.width, e.height, 0, n.RED, n.FLOAT, s), $s(e);
  }
  return t;
}
function Gt(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ke(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function h2(e) {
  if (e = Gt(e), !vn) if (e.getExtension("EXT_color_buffer_float") && e.getExtension("OES_texture_float_linear") && e.getExtension("EXT_float_blend")) vn = e.R32F;
  else {
    if (!e.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    vn = e.R16F;
  }
  return vn;
}
function Jr(e) {
  return e.l || (e.l = new qr()), e.l;
}
function c2(e) {
  const t = Gt(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = je(e, 2);
  return n || (n = cs(Jr(e), t, e.m ? t.LINEAR : t.NEAREST), e.g.push(n), e.j = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function $s(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
var vn, W = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.m = t, this.j = n, this.canvas = s, this.l = r, this.width = i, this.height = o, this.j && --ro === 0 && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
  }
  Fa() {
    return !!je(this, 0);
  }
  ja() {
    return !!je(this, 1);
  }
  P() {
    return !!je(this, 2);
  }
  ia() {
    return (t = je(e = this, 0)) || (t = Xs(e), t = new Uint8Array(t.map(((n) => 255 * n))), e.g.push(t)), t;
    var e, t;
  }
  ha() {
    return Xs(this);
  }
  M() {
    return a2(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let n;
      if (t instanceof Uint8Array) n = new Uint8Array(t);
      else if (t instanceof Float32Array) n = new Float32Array(t);
      else {
        if (!(t instanceof WebGLTexture)) throw Error(`Type is not supported: ${t}`);
        {
          const s = Gt(this), r = Jr(this);
          s.activeTexture(s.TEXTURE1), n = cs(r, s, this.m ? s.LINEAR : s.NEAREST), s.bindTexture(s.TEXTURE_2D, n);
          const i = h2(this);
          s.texImage2D(s.TEXTURE_2D, 0, i, this.width, this.height, 0, s.RED, s.FLOAT, null), s.bindTexture(s.TEXTURE_2D, null), us(r, s, n), Kr(r, s, !1, (() => {
            c2(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), $s(this);
          })), Yr(r), $s(this);
        }
      }
      e.push(n);
    }
    return new W(e, this.m, this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Gt(this).deleteTexture(je(this, 2)), ro = -1;
  }
};
W.prototype.close = W.prototype.close, W.prototype.clone = W.prototype.clone, W.prototype.getAsWebGLTexture = W.prototype.M, W.prototype.getAsFloat32Array = W.prototype.ha, W.prototype.getAsUint8Array = W.prototype.ia, W.prototype.hasWebGLTexture = W.prototype.P, W.prototype.hasFloat32Array = W.prototype.ja, W.prototype.hasUint8Array = W.prototype.Fa;
var ro = 250;
function Be(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((n) => n instanceof ImageData));
    case 1:
      return e.g.find(((n) => typeof ImageBitmap < "u" && n instanceof ImageBitmap));
    case 2:
      return e.g.find(((n) => typeof WebGLTexture < "u" && n instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function u2(e) {
  var t = Be(e, 0);
  if (!t) {
    t = Ht(e);
    const n = ls(e), s = new Uint8Array(e.width * e.height * 4);
    us(n, t, Tn(e)), t.readPixels(0, 0, e.width, e.height, t.RGBA, t.UNSIGNED_BYTE, s), Yr(n), t = new ImageData(new Uint8ClampedArray(s.buffer), e.width, e.height), e.g.push(t);
  }
  return t;
}
function Tn(e) {
  let t = Be(e, 2);
  if (!t) {
    const n = Ht(e);
    t = Fn(e);
    const s = Be(e, 1) || u2(e);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, s), sn(e);
  }
  return t;
}
function Ht(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ke(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function ls(e) {
  return e.l || (e.l = new qr()), e.l;
}
function Fn(e) {
  const t = Ht(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = Be(e, 2);
  return n || (n = cs(ls(e), t), e.g.push(n), e.m = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function sn(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
function io(e) {
  const t = Ht(e);
  return Kr(ls(e), t, !0, (() => (function(n, s) {
    const r = n.canvas;
    if (r.width === n.width && r.height === n.height) return s();
    const i = r.width, o = r.height;
    return r.width = n.width, r.height = n.height, n = s(), r.width = i, r.height = o, n;
  })(e, (() => {
    if (t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), !(e.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return e.canvas.transferToImageBitmap();
  }))));
}
var X = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.j = t, this.m = n, this.canvas = s, this.l = r, this.width = i, this.height = o, (this.j || this.m) && --oo === 0 && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ea() {
    return !!Be(this, 0);
  }
  ka() {
    return !!Be(this, 1);
  }
  P() {
    return !!Be(this, 2);
  }
  Ca() {
    return u2(this);
  }
  Ba() {
    var e = Be(this, 1);
    return e || (Tn(this), Fn(this), e = io(this), sn(this), this.g.push(e), this.j = !0), e;
  }
  M() {
    return Tn(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let n;
      if (t instanceof ImageData) n = new ImageData(t.data, this.width, this.height);
      else if (t instanceof WebGLTexture) {
        const s = Ht(this), r = ls(this);
        s.activeTexture(s.TEXTURE1), n = cs(r, s), s.bindTexture(s.TEXTURE_2D, n), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, this.width, this.height, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.bindTexture(s.TEXTURE_2D, null), us(r, s, n), Kr(r, s, !1, (() => {
          Fn(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), sn(this);
        })), Yr(r), sn(this);
      } else {
        if (!(t instanceof ImageBitmap)) throw Error(`Type is not supported: ${t}`);
        Tn(this), Fn(this), n = io(this), sn(this);
      }
      e.push(n);
    }
    return new X(e, this.ka(), this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Be(this, 1).close(), this.m && Ht(this).deleteTexture(Be(this, 2)), oo = -1;
  }
};
X.prototype.close = X.prototype.close, X.prototype.clone = X.prototype.clone, X.prototype.getAsWebGLTexture = X.prototype.M, X.prototype.getAsImageBitmap = X.prototype.Ba, X.prototype.getAsImageData = X.prototype.Ca, X.prototype.hasWebGLTexture = X.prototype.P, X.prototype.hasImageBitmap = X.prototype.ka, X.prototype.hasImageData = X.prototype.Ea;
var oo = 250;
function Ie(...e) {
  return e.map((([t, n]) => ({ start: t, end: n })));
}
const W1 = /* @__PURE__ */ (function(e) {
  return class extends e {
    La() {
      this.i._registerModelResourcesGraphService();
    }
  };
})((ao = class {
  constructor(e, t) {
    this.l = !0, this.i = e, this.g = null, this.h = 0, this.m = typeof this.i._addIntToInputStream == "function", t !== void 0 ? this.i.canvas = t : i2() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(e) {
    const t = await (await fetch(e)).arrayBuffer();
    e = !(e.endsWith(".pbtxt") || e.endsWith(".textproto")), this.setGraph(new Uint8Array(t), e);
  }
  setGraphFromString(e) {
    this.setGraph(new TextEncoder().encode(e), !1);
  }
  setGraph(e, t) {
    const n = e.length, s = this.i._malloc(n);
    this.i.HEAPU8.set(e, s), t ? this.i._changeBinaryGraph(n, s) : this.i._changeTextGraph(n, s), this.i._free(s);
  }
  configureAudio(e, t, n, s, r) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), p(this, s || "input_audio", ((i) => {
      p(this, r = r || "audio_header", ((o) => {
        this.i._configureAudio(i, o, e, t ?? 0, n);
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
    })), p(this, "__graph_config__", ((t) => {
      this.i._getGraphConfig(t, void 0);
    })), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(e) {
    this.i.errorListener = e;
  }
  attachEmptyPacketListener(e, t) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[e] = t;
  }
  addAudioToStream(e, t, n) {
    this.addAudioToStreamWithShape(e, 0, 0, t, n);
  }
  addAudioToStreamWithShape(e, t, n, s, r) {
    const i = 4 * e.length;
    this.h !== i && (this.g && this.i._free(this.g), this.g = this.i._malloc(i), this.h = i), this.i.HEAPF32.set(e, this.g / 4), p(this, s, ((o) => {
      this.i._addAudioToInputStream(this.g, t, n, o, r);
    }));
  }
  addGpuBufferToStream(e, t, n) {
    p(this, t, ((s) => {
      const [r, i] = Qi(this, e, s);
      this.i._addBoundTextureToStream(s, r, i, n);
    }));
  }
  addBoolToStream(e, t, n) {
    p(this, t, ((s) => {
      this.i._addBoolToInputStream(e, s, n);
    }));
  }
  addDoubleToStream(e, t, n) {
    p(this, t, ((s) => {
      this.i._addDoubleToInputStream(e, s, n);
    }));
  }
  addFloatToStream(e, t, n) {
    p(this, t, ((s) => {
      this.i._addFloatToInputStream(e, s, n);
    }));
  }
  addIntToStream(e, t, n) {
    p(this, t, ((s) => {
      this.i._addIntToInputStream(e, s, n);
    }));
  }
  addUintToStream(e, t, n) {
    p(this, t, ((s) => {
      this.i._addUintToInputStream(e, s, n);
    }));
  }
  addStringToStream(e, t, n) {
    p(this, t, ((s) => {
      p(this, e, ((r) => {
        this.i._addStringToInputStream(r, s, n);
      }));
    }));
  }
  addStringRecordToStream(e, t, n) {
    p(this, t, ((s) => {
      eo(this, Object.keys(e), ((r) => {
        eo(this, Object.values(e), ((i) => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(e).length, s, n);
        }));
      }));
    }));
  }
  addProtoToStream(e, t, n, s) {
    p(this, n, ((r) => {
      p(this, t, ((i) => {
        const o = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, o), this.i._addProtoToInputStream(o, e.length, i, r, s), this.i._free(o);
      }));
    }));
  }
  addEmptyPacketToStream(e, t) {
    p(this, e, ((n) => {
      this.i._addEmptyPacketToInputStream(n, t);
    }));
  }
  addBoolVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateBoolVector(e.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const i of e) this.i._addBoolVectorEntry(r, i);
      this.i._addBoolVectorToInputStream(r, s, n);
    }));
  }
  addDoubleVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateDoubleVector(e.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const i of e) this.i._addDoubleVectorEntry(r, i);
      this.i._addDoubleVectorToInputStream(r, s, n);
    }));
  }
  addFloatVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateFloatVector(e.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const i of e) this.i._addFloatVectorEntry(r, i);
      this.i._addFloatVectorToInputStream(r, s, n);
    }));
  }
  addIntVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateIntVector(e.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const i of e) this.i._addIntVectorEntry(r, i);
      this.i._addIntVectorToInputStream(r, s, n);
    }));
  }
  addUintVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateUintVector(e.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const i of e) this.i._addUintVectorEntry(r, i);
      this.i._addUintVectorToInputStream(r, s, n);
    }));
  }
  addStringVectorToStream(e, t, n) {
    p(this, t, ((s) => {
      const r = this.i._allocateStringVector(e.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const i of e) p(this, i, ((o) => {
        this.i._addStringVectorEntry(r, o);
      }));
      this.i._addStringVectorToInputStream(r, s, n);
    }));
  }
  addBoolToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      this.i._addBoolToInputSidePacket(e, n);
    }));
  }
  addDoubleToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      this.i._addDoubleToInputSidePacket(e, n);
    }));
  }
  addFloatToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      this.i._addFloatToInputSidePacket(e, n);
    }));
  }
  addIntToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      this.i._addIntToInputSidePacket(e, n);
    }));
  }
  addUintToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      this.i._addUintToInputSidePacket(e, n);
    }));
  }
  addStringToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      p(this, e, ((s) => {
        this.i._addStringToInputSidePacket(s, n);
      }));
    }));
  }
  addProtoToInputSidePacket(e, t, n) {
    p(this, n, ((s) => {
      p(this, t, ((r) => {
        const i = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, i), this.i._addProtoToInputSidePacket(i, e.length, r, s), this.i._free(i);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateBoolVector(e.length);
      if (!s) throw Error("Unable to allocate new bool vector on heap.");
      for (const r of e) this.i._addBoolVectorEntry(s, r);
      this.i._addBoolVectorToInputSidePacket(s, n);
    }));
  }
  addDoubleVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateDoubleVector(e.length);
      if (!s) throw Error("Unable to allocate new double vector on heap.");
      for (const r of e) this.i._addDoubleVectorEntry(s, r);
      this.i._addDoubleVectorToInputSidePacket(s, n);
    }));
  }
  addFloatVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateFloatVector(e.length);
      if (!s) throw Error("Unable to allocate new float vector on heap.");
      for (const r of e) this.i._addFloatVectorEntry(s, r);
      this.i._addFloatVectorToInputSidePacket(s, n);
    }));
  }
  addIntVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateIntVector(e.length);
      if (!s) throw Error("Unable to allocate new int vector on heap.");
      for (const r of e) this.i._addIntVectorEntry(s, r);
      this.i._addIntVectorToInputSidePacket(s, n);
    }));
  }
  addUintVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateUintVector(e.length);
      if (!s) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const r of e) this.i._addUintVectorEntry(s, r);
      this.i._addUintVectorToInputSidePacket(s, n);
    }));
  }
  addStringVectorToInputSidePacket(e, t) {
    p(this, t, ((n) => {
      const s = this.i._allocateStringVector(e.length);
      if (!s) throw Error("Unable to allocate new string vector on heap.");
      for (const r of e) p(this, r, ((i) => {
        this.i._addStringVectorEntry(s, i);
      }));
      this.i._addStringVectorToInputSidePacket(s, n);
    }));
  }
  attachBoolListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachBoolListener(n);
    }));
  }
  attachBoolVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachBoolVectorListener(n);
    }));
  }
  attachIntListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachIntListener(n);
    }));
  }
  attachIntVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachIntVectorListener(n);
    }));
  }
  attachUintListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachUintListener(n);
    }));
  }
  attachUintVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachUintVectorListener(n);
    }));
  }
  attachDoubleListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachDoubleListener(n);
    }));
  }
  attachDoubleVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachDoubleVectorListener(n);
    }));
  }
  attachFloatListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachFloatListener(n);
    }));
  }
  attachFloatVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachFloatVectorListener(n);
    }));
  }
  attachStringListener(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.i._attachStringListener(n);
    }));
  }
  attachStringVectorListener(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.i._attachStringVectorListener(n);
    }));
  }
  attachProtoListener(e, t, n) {
    Pe(this, e, t), p(this, e, ((s) => {
      this.i._attachProtoListener(s, n || !1);
    }));
  }
  attachProtoVectorListener(e, t, n) {
    nt(this, e, t), p(this, e, ((s) => {
      this.i._attachProtoVectorListener(s, n || !1);
    }));
  }
  attachAudioListener(e, t, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Pe(this, e, ((s, r) => {
      s = new Float32Array(s.buffer, s.byteOffset, s.length / 4), t(s, r);
    })), p(this, e, ((s) => {
      this.i._attachAudioListener(s, n || !1);
    }));
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends ao {
  get ea() {
    return this.i;
  }
  qa(e, t, n) {
    p(this, t, ((s) => {
      const [r, i] = Qi(this, e, s);
      this.ea._addBoundTextureAsImageToStream(s, r, i, n);
    }));
  }
  U(e, t) {
    Pe(this, e, t), p(this, e, ((n) => {
      this.ea._attachImageListener(n);
    }));
  }
  ca(e, t) {
    nt(this, e, t), p(this, e, ((n) => {
      this.ea._attachImageVectorListener(n);
    }));
  }
}));
var ao, ke = class extends W1 {
};
async function v(e, t, n) {
  return (async function(s, r, i, o) {
    return j1(s, r, i, o);
  })(e, n.canvas ?? (i2() ? void 0 : document.createElement("canvas")), t, n);
}
function l2(e, t, n, s) {
  if (e.T) {
    const i = new Pa();
    if (n != null && n.regionOfInterest) {
      if (!e.pa) throw Error("This task doesn't support region-of-interest.");
      var r = n.regionOfInterest;
      if (r.left >= r.right || r.top >= r.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (r.left < 0 || r.top < 0 || r.right > 1 || r.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      m(i, 1, (r.left + r.right) / 2), m(i, 2, (r.top + r.bottom) / 2), m(i, 4, r.right - r.left), m(i, 3, r.bottom - r.top);
    } else m(i, 1, 0.5), m(i, 2, 0.5), m(i, 4, 1), m(i, 3, 1);
    if (n != null && n.rotationDegrees) {
      if ((n == null ? void 0 : n.rotationDegrees) % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (m(i, 5, -Math.PI * n.rotationDegrees / 180), (n == null ? void 0 : n.rotationDegrees) % 180 != 0) {
        const [o, a] = o2(t);
        n = N(i, 3) * a / o, r = N(i, 4) * o / a, m(i, 4, n), m(i, 3, r);
      }
    }
    e.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", e.T, s);
  }
  e.g.qa(t, e.aa, s ?? performance.now()), e.finishProcessing();
}
function Se(e, t, n) {
  var s;
  if ((s = e.baseOptions) != null && s.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  l2(e, t, n, e.B + 1);
}
function Ge(e, t, n, s) {
  var r;
  if (!((r = e.baseOptions) != null && r.g())) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  l2(e, t, n, s);
}
function Vt(e, t, n, s) {
  var r = t.data;
  const i = t.width, o = i * (t = t.height);
  if ((r instanceof Uint8Array || r instanceof Float32Array) && r.length !== o) throw Error("Unsupported channel count: " + r.length / o);
  return e = new W([r], n, !1, e.g.i.canvas, e.O, i, t), s ? e.clone() : e;
}
var oe = class extends Sn {
  constructor(e, t, n, s) {
    super(e), this.g = e, this.aa = t, this.T = n, this.pa = s, this.O = new qr();
  }
  l(e, t = !0) {
    if ("runningMode" in e && un(this.baseOptions, 2, !!e.runningMode && e.runningMode !== "IMAGE"), e.canvas !== void 0 && this.g.i.canvas !== e.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(e, t);
  }
  close() {
    this.O.close(), super.close();
  }
};
oe.prototype.close = oe.prototype.close;
var ge = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect_in", !1), this.j = { detections: [] }, y(e = this.h = new is(), 0, 1, t = new I()), m(this.h, 2, 0.5), m(this.h, 3, 0.3);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "minDetectionConfidence" in e && m(this.h, 2, e.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in e && m(this.h, 3, e.minSuppressionThreshold ?? 0.3), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Se(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect_in"), A(e, "detections");
    const t = new le();
    xe(t, x1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect_in"), b(n, "DETECTIONS:detections"), n.o(t), me(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = Ca(i), this.j.detections.push(s2(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ge.prototype.detectForVideo = ge.prototype.F, ge.prototype.detect = ge.prototype.D, ge.prototype.setOptions = ge.prototype.o, ge.createFromModelPath = async function(e, t) {
  return v(ge, e, { baseOptions: { modelAssetPath: t } });
}, ge.createFromModelBuffer = function(e, t) {
  return v(ge, e, { baseOptions: { modelAssetBuffer: t } });
}, ge.createFromOptions = function(e, t) {
  return v(ge, e, t);
};
var Zr = Ie([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), Qr = Ie([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), ei = Ie([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), d2 = Ie([474, 475], [475, 476], [476, 477], [477, 474]), ti = Ie([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), ni = Ie([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), f2 = Ie([469, 470], [470, 471], [471, 472], [472, 469]), si = Ie([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), m2 = [...Zr, ...Qr, ...ei, ...ti, ...ni, ...si], p2 = Ie([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function ho(e) {
  e.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var P = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !1), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, y(e = this.h = new Ua(), 0, 1, t = new I()), this.v = new Na(), y(this.h, 0, 3, this.v), this.s = new is(), y(this.h, 0, 2, this.s), Ue(this.s, 4, 1), m(this.s, 2, 0.5), m(this.v, 2, 0.5), m(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numFaces" in e && Ue(this.s, 4, e.numFaces ?? 1), "minFaceDetectionConfidence" in e && m(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && m(this.h, 4, e.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in e && m(this.v, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in e && (this.outputFacialTransformationMatrixes = !!e.outputFacialTransformationMatrixes), this.l(e);
  }
  D(e, t) {
    return ho(this), Se(this, e, t), this.j;
  }
  F(e, t, n) {
    return ho(this), Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "face_landmarks");
    const t = new le();
    xe(t, C1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "NORM_LANDMARKS:face_landmarks"), n.o(t), me(e, n), this.g.attachProtoVectorListener("face_landmarks", ((s, r) => {
      for (const i of s) s = gn(i), this.j.faceLandmarks.push(os(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((s) => {
      d(this, s);
    })), this.outputFaceBlendshapes && (A(e, "blendshapes"), b(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((s, r) => {
      if (this.outputFaceBlendshapes) for (const i of s) s = rs(i), this.j.faceBlendshapes.push(Xr(s.g() ?? []));
      d(this, r);
    })), this.g.attachEmptyPacketListener("blendshapes", ((s) => {
      d(this, s);
    }))), this.outputFacialTransformationMatrixes && (A(e, "face_geometry"), b(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((s, r) => {
      if (this.outputFacialTransformationMatrixes) for (const i of s) (s = E(M1(i), b1, 2)) && this.j.facialTransformationMatrixes.push({ rows: ve(s, 1) ?? 0 ?? 0, columns: ve(s, 2) ?? 0 ?? 0, data: yt(s, 3, lt, gt()).slice() ?? [] });
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_geometry", ((s) => {
      d(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
P.prototype.detectForVideo = P.prototype.F, P.prototype.detect = P.prototype.D, P.prototype.setOptions = P.prototype.o, P.createFromModelPath = function(e, t) {
  return v(P, e, { baseOptions: { modelAssetPath: t } });
}, P.createFromModelBuffer = function(e, t) {
  return v(P, e, { baseOptions: { modelAssetBuffer: t } });
}, P.createFromOptions = function(e, t) {
  return v(P, e, t);
}, P.FACE_LANDMARKS_LIPS = Zr, P.FACE_LANDMARKS_LEFT_EYE = Qr, P.FACE_LANDMARKS_LEFT_EYEBROW = ei, P.FACE_LANDMARKS_LEFT_IRIS = d2, P.FACE_LANDMARKS_RIGHT_EYE = ti, P.FACE_LANDMARKS_RIGHT_EYEBROW = ni, P.FACE_LANDMARKS_RIGHT_IRIS = f2, P.FACE_LANDMARKS_FACE_OVAL = si, P.FACE_LANDMARKS_CONTOURS = m2, P.FACE_LANDMARKS_TESSELATION = p2;
var Re = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !0), y(e = this.j = new Ha(), 0, 1, t = new I());
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
  Oa(e, t, n) {
    const s = typeof t != "function" ? t : {};
    if (this.h = typeof t == "function" ? t : n, Se(this, e, s ?? {}), !this.h) return this.s;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "stylized_image");
    const t = new le();
    xe(t, I1, this.j);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "STYLIZED_IMAGE:stylized_image"), n.o(t), me(e, n), this.g.U("stylized_image", ((s, r) => {
      var i = !this.h, o = s.data, a = s.width;
      const h = a * (s = s.height);
      if (o instanceof Uint8Array) if (o.length === 3 * h) {
        const c = new Uint8ClampedArray(4 * h);
        for (let u = 0; u < h; ++u) c[4 * u] = o[3 * u], c[4 * u + 1] = o[3 * u + 1], c[4 * u + 2] = o[3 * u + 2], c[4 * u + 3] = 255;
        o = new ImageData(c, a, s);
      } else {
        if (o.length !== 4 * h) throw Error("Unsupported channel count: " + o.length / h);
        o = new ImageData(new Uint8ClampedArray(o.buffer, o.byteOffset, o.length), a, s);
      }
      else if (!(o instanceof WebGLTexture)) throw Error(`Unsupported format: ${o.constructor.name}`);
      a = new X([o], !1, !1, this.g.i.canvas, this.O, a, s), this.s = i = i ? a.clone() : a, this.h && this.h(i), d(this, r);
    })), this.g.attachEmptyPacketListener("stylized_image", ((s) => {
      this.s = null, this.h && this.h(null), d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
Re.prototype.stylize = Re.prototype.Oa, Re.prototype.setOptions = Re.prototype.o, Re.createFromModelPath = function(e, t) {
  return v(Re, e, { baseOptions: { modelAssetPath: t } });
}, Re.createFromModelBuffer = function(e, t) {
  return v(Re, e, { baseOptions: { modelAssetBuffer: t } });
}, Re.createFromOptions = function(e, t) {
  return v(Re, e, t);
};
var ri = Ie([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function co(e) {
  e.gestures = [], e.landmarks = [], e.worldLandmarks = [], e.handedness = [];
}
function uo(e) {
  return e.gestures.length === 0 ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: e.gestures, landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handedness: e.handedness, handednesses: e.handedness };
}
function lo(e, t = !0) {
  const n = [];
  for (const r of e) {
    var s = rs(r);
    e = [];
    for (const i of s.g()) s = t && ve(i, 1) != null ? ve(i, 1) ?? 0 : -1, e.push({ score: N(i, 2) ?? 0, index: s, categoryName: Ee(i, 3) ?? "" ?? "", displayName: Ee(i, 4) ?? "" ?? "" });
    n.push(e);
  }
  return n;
}
var he = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.j = new za(), 0, 1, t = new I()), this.s = new Vr(), y(this.j, 0, 2, this.s), this.C = new Hr(), y(this.s, 0, 3, this.C), this.v = new ja(), y(this.s, 0, 2, this.v), this.h = new O1(), y(this.j, 0, 3, this.h), m(this.v, 2, 0.5), m(this.s, 4, 0.5), m(this.C, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, I, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    var r, i, o, a;
    if (Ue(this.v, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && m(this.v, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && m(this.s, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && m(this.C, 2, e.minHandPresenceConfidence ?? 0.5), e.cannedGesturesClassifierOptions) {
      var t = new St(), n = t, s = Ws(e.cannedGesturesClassifierOptions, (r = E(this.h, St, 3)) == null ? void 0 : r.h());
      y(n, 0, 2, s), y(this.h, 0, 3, t);
    } else e.cannedGesturesClassifierOptions === void 0 && ((i = E(this.h, St, 3)) == null || i.g());
    return e.customGesturesClassifierOptions ? (y(n = t = new St(), 0, 2, s = Ws(e.customGesturesClassifierOptions, (o = E(this.h, St, 4)) == null ? void 0 : o.h())), y(this.h, 0, 4, t)) : e.customGesturesClassifierOptions === void 0 && ((a = E(this.h, St, 4)) == null || a.g()), this.l(e);
  }
  Ja(e, t) {
    return co(this), Se(this, e, t), uo(this);
  }
  Ka(e, t, n) {
    return co(this), Ge(this, e, n, t), uo(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "hand_gestures"), A(e, "hand_landmarks"), A(e, "world_hand_landmarks"), A(e, "handedness");
    const t = new le();
    xe(t, P1, this.j);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "HAND_GESTURES:hand_gestures"), b(n, "LANDMARKS:hand_landmarks"), b(n, "WORLD_LANDMARKS:world_hand_landmarks"), b(n, "HANDEDNESS:handedness"), n.o(t), me(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = gn(i);
        const o = [];
        for (const a of Ye(s, Oa, 1)) o.push({ x: N(a, 1) ?? 0, y: N(a, 2) ?? 0, z: N(a, 3) ?? 0, visibility: N(a, 4) ?? 0 });
        this.landmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = It(i);
        const o = [];
        for (const a of Ye(s, Ia, 1)) o.push({ x: N(a, 1) ?? 0, y: N(a, 2) ?? 0, z: N(a, 3) ?? 0, visibility: N(a, 4) ?? 0 });
        this.worldLandmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("hand_gestures", ((s, r) => {
      this.gestures.push(...lo(s, !1)), d(this, r);
    })), this.g.attachEmptyPacketListener("hand_gestures", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      this.handedness.push(...lo(s)), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
function fo(e) {
  return { landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handednesses: e.handedness, handedness: e.handedness };
}
he.prototype.recognizeForVideo = he.prototype.Ka, he.prototype.recognize = he.prototype.Ja, he.prototype.setOptions = he.prototype.o, he.createFromModelPath = function(e, t) {
  return v(he, e, { baseOptions: { modelAssetPath: t } });
}, he.createFromModelBuffer = function(e, t) {
  return v(he, e, { baseOptions: { modelAssetBuffer: t } });
}, he.createFromOptions = function(e, t) {
  return v(he, e, t);
}, he.HAND_CONNECTIONS = ri;
var re = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.h = new Vr(), 0, 1, t = new I()), this.s = new Hr(), y(this.h, 0, 3, this.s), this.j = new ja(), y(this.h, 0, 2, this.j), Ue(this.j, 3, 1), m(this.j, 2, 0.5), m(this.s, 2, 0.5), m(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numHands" in e && Ue(this.j, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && m(this.j, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && m(this.h, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && m(this.s, 2, e.minHandPresenceConfidence ?? 0.5), this.l(e);
  }
  D(e, t) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Se(this, e, t), fo(this);
  }
  F(e, t, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ge(this, e, n, t), fo(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "hand_landmarks"), A(e, "world_hand_landmarks"), A(e, "handedness");
    const t = new le();
    xe(t, R1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "LANDMARKS:hand_landmarks"), b(n, "WORLD_LANDMARKS:world_hand_landmarks"), b(n, "HANDEDNESS:handedness"), n.o(t), me(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) s = gn(i), this.landmarks.push(os(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) s = It(i), this.worldLandmarks.push(an(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      var i = this.handedness, o = i.push;
      const a = [];
      for (const h of s) {
        s = rs(h);
        const c = [];
        for (const u of s.g()) c.push({ score: N(u, 2) ?? 0, index: ve(u, 1) ?? 0 ?? -1, categoryName: Ee(u, 3) ?? "" ?? "", displayName: Ee(u, 4) ?? "" ?? "" });
        a.push(c);
      }
      o.call(i, ...a), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
re.prototype.detectForVideo = re.prototype.F, re.prototype.detect = re.prototype.D, re.prototype.setOptions = re.prototype.o, re.createFromModelPath = function(e, t) {
  return v(re, e, { baseOptions: { modelAssetPath: t } });
}, re.createFromModelBuffer = function(e, t) {
  return v(re, e, { baseOptions: { modelAssetBuffer: t } });
}, re.createFromOptions = function(e, t) {
  return v(re, e, t);
}, re.HAND_CONNECTIONS = ri;
var g2 = Ie([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function mo(e) {
  e.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function po(e) {
  try {
    if (!e.C) return e.h;
    e.C(e.h);
  } finally {
    hs(e);
  }
}
function bn(e, t) {
  e = gn(e), t.push(os(e));
}
var M = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "input_frames_image", null, !1), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, y(e = this.j = new Ya(), 0, 1, t = new I()), this.J = new Hr(), y(this.j, 0, 2, this.J), this.Z = new D1(), y(this.j, 0, 3, this.Z), this.s = new is(), y(this.j, 0, 4, this.s), this.H = new Na(), y(this.j, 0, 5, this.H), this.v = new $a(), y(this.j, 0, 6, this.v), this.K = new Ka(), y(this.j, 0, 7, this.K), m(this.s, 2, 0.5), m(this.s, 3, 0.3), m(this.H, 2, 0.5), m(this.v, 2, 0.5), m(this.v, 3, 0.3), m(this.K, 2, 0.5), m(this.J, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, I, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    return "minFaceDetectionConfidence" in e && m(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in e && m(this.s, 3, e.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in e && m(this.H, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "minPoseDetectionConfidence" in e && m(this.v, 2, e.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in e && m(this.v, 3, e.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in e && m(this.K, 2, e.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in e && (this.outputPoseSegmentationMasks = !!e.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in e && m(this.J, 2, e.minHandLandmarksConfidence ?? 0.5), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.C = typeof t == "function" ? t : n, mo(this), Se(this, e, s), po(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.C = typeof n == "function" ? n : s, mo(this), Ge(this, e, r, t), po(this);
  }
  m() {
    var e = new ae();
    x(e, "input_frames_image"), A(e, "pose_landmarks"), A(e, "pose_world_landmarks"), A(e, "face_landmarks"), A(e, "left_hand_landmarks"), A(e, "left_hand_world_landmarks"), A(e, "right_hand_landmarks"), A(e, "right_hand_world_landmarks");
    const t = new le(), n = new Bi();
    Us(n, 1, Wt("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(r, i) {
      if (i != null) if (Array.isArray(i)) F(r, 2, jo(i));
      else {
        if (!(typeof i == "string" || i instanceof Xe || dn(i))) throw Error("invalid value in Any.value field: " + i + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        Us(r, 2, ir(i, !1), vt());
      }
    })(n, this.j.g());
    const s = new Z();
    fe(s, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), On(s, 8, Bi, n), L(s, "IMAGE:input_frames_image"), b(s, "POSE_LANDMARKS:pose_landmarks"), b(s, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), b(s, "FACE_LANDMARKS:face_landmarks"), b(s, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), b(s, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), b(s, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), b(s, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), s.o(t), me(e, s), as(this, e), this.g.attachProtoListener("pose_landmarks", ((r, i) => {
      bn(r, this.h.poseLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("pose_world_landmarks", ((r, i) => {
      var o = this.h.poseWorldLandmarks;
      r = It(r), o.push(an(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((r) => {
      d(this, r);
    })), this.outputPoseSegmentationMasks && (b(s, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), Ut(this, "pose_segmentation_mask"), this.g.U("pose_segmentation_mask", ((r, i) => {
      this.h.poseSegmentationMasks = [Vt(this, r, !0, !this.C)], d(this, i);
    })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((r) => {
      this.h.poseSegmentationMasks = [], d(this, r);
    }))), this.g.attachProtoListener("face_landmarks", ((r, i) => {
      bn(r, this.h.faceLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((r) => {
      d(this, r);
    })), this.outputFaceBlendshapes && (A(e, "extra_blendshapes"), b(s, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((r, i) => {
      var o = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (r = rs(r), o.push(Xr(r.g() ?? []))), d(this, i);
    })), this.g.attachEmptyPacketListener("extra_blendshapes", ((r) => {
      d(this, r);
    }))), this.g.attachProtoListener("left_hand_landmarks", ((r, i) => {
      bn(r, this.h.leftHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("left_hand_world_landmarks", ((r, i) => {
      var o = this.h.leftHandWorldLandmarks;
      r = It(r), o.push(an(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_landmarks", ((r, i) => {
      bn(r, this.h.rightHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_world_landmarks", ((r, i) => {
      var o = this.h.rightHandWorldLandmarks;
      r = It(r), o.push(an(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((r) => {
      d(this, r);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
M.prototype.detectForVideo = M.prototype.F, M.prototype.detect = M.prototype.D, M.prototype.setOptions = M.prototype.o, M.createFromModelPath = function(e, t) {
  return v(M, e, { baseOptions: { modelAssetPath: t } });
}, M.createFromModelBuffer = function(e, t) {
  return v(M, e, { baseOptions: { modelAssetBuffer: t } });
}, M.createFromOptions = function(e, t) {
  return v(M, e, t);
}, M.HAND_CONNECTIONS = ri, M.POSE_CONNECTIONS = g2, M.FACE_LANDMARKS_LIPS = Zr, M.FACE_LANDMARKS_LEFT_EYE = Qr, M.FACE_LANDMARKS_LEFT_EYEBROW = ei, M.FACE_LANDMARKS_LEFT_IRIS = d2, M.FACE_LANDMARKS_RIGHT_EYE = ti, M.FACE_LANDMARKS_RIGHT_EYEBROW = ni, M.FACE_LANDMARKS_RIGHT_IRIS = f2, M.FACE_LANDMARKS_FACE_OVAL = si, M.FACE_LANDMARKS_CONTOURS = m2, M.FACE_LANDMARKS_TESSELATION = p2;
var ye = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "input_image", "norm_rect", !0), this.j = { classifications: [] }, y(e = this.h = new qa(), 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return y(this.h, 0, 2, Ws(e, E(this.h, Nr, 2))), this.l(e);
  }
  sa(e, t) {
    return this.j = { classifications: [] }, Se(this, e, t), this.j;
  }
  ta(e, t, n) {
    return this.j = { classifications: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "input_image"), x(e, "norm_rect"), A(e, "classifications");
    const t = new le();
    xe(t, B1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), L(n, "IMAGE:input_image"), L(n, "NORM_RECT:norm_rect"), b(n, "CLASSIFICATIONS:classifications"), n.o(t), me(e, n), this.g.attachProtoListener("classifications", ((s, r) => {
      this.j = (function(i) {
        const o = { classifications: Ye(i, A1, 1).map(((a) => {
          var h;
          return Xr(((h = E(a, xa, 4)) == null ? void 0 : h.g()) ?? [], ve(a, 2) ?? 0, Ee(a, 3) ?? "");
        })) };
        return In(Bt(i, 2)) != null && (o.timestampMs = In(Bt(i, 2)) ?? 0), o;
      })(k1(s)), d(this, r);
    })), this.g.attachEmptyPacketListener("classifications", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ye.prototype.classifyForVideo = ye.prototype.ta, ye.prototype.classify = ye.prototype.sa, ye.prototype.setOptions = ye.prototype.o, ye.createFromModelPath = function(e, t) {
  return v(ye, e, { baseOptions: { modelAssetPath: t } });
}, ye.createFromModelBuffer = function(e, t) {
  return v(ye, e, { baseOptions: { modelAssetBuffer: t } });
}, ye.createFromOptions = function(e, t) {
  return v(ye, e, t);
};
var ce = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !0), this.h = new Ja(), this.embeddings = { embeddings: [] }, y(e = this.h, 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    var t = this.h, n = E(this.h, Xi, 2);
    return n = n ? n.clone() : new Xi(), e.l2Normalize !== void 0 ? un(n, 1, e.l2Normalize) : "l2Normalize" in e && F(n, 1), e.quantize !== void 0 ? un(n, 2, e.quantize) : "quantize" in e && F(n, 2), y(t, 0, 2, n), this.l(e);
  }
  za(e, t) {
    return Se(this, e, t), this.embeddings;
  }
  Aa(e, t, n) {
    return Ge(this, e, n, t), this.embeddings;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "embeddings_out");
    const t = new le();
    xe(t, N1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "EMBEDDINGS:embeddings_out"), n.o(t), me(e, n), this.g.attachProtoListener("embeddings_out", ((s, r) => {
      s = F1(s), this.embeddings = (function(i) {
        return { embeddings: Ye(i, T1, 1).map(((o) => {
          var h, c;
          const a = { headIndex: ve(o, 3) ?? 0 ?? -1, headName: Ee(o, 4) ?? "" ?? "" };
          if (Ko(o, Wi, Ts(o, 1)) !== void 0) o = yt(o = E(o, Wi, Ts(o, 1)), 1, lt, gt()), a.floatEmbedding = o.slice();
          else {
            const u = new Uint8Array(0);
            a.quantizedEmbedding = ((c = (h = E(o, S1, Ts(o, 2))) == null ? void 0 : h.oa()) == null ? void 0 : c.h()) ?? u;
          }
          return a;
        })), timestampMs: In(Bt(i, 2)) ?? 0 };
      })(s), d(this, r);
    })), this.g.attachEmptyPacketListener("embeddings_out", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ce.cosineSimilarity = function(e, t) {
  if (e.floatEmbedding && t.floatEmbedding) e = Ji(e.floatEmbedding, t.floatEmbedding);
  else {
    if (!e.quantizedEmbedding || !t.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    e = Ji(qi(e.quantizedEmbedding), qi(t.quantizedEmbedding));
  }
  return e;
}, ce.prototype.embedForVideo = ce.prototype.Aa, ce.prototype.embed = ce.prototype.za, ce.prototype.setOptions = ce.prototype.o, ce.createFromModelPath = function(e, t) {
  return v(ce, e, { baseOptions: { modelAssetPath: t } });
}, ce.createFromModelBuffer = function(e, t) {
  return v(ce, e, { baseOptions: { modelAssetBuffer: t } });
}, ce.createFromOptions = function(e, t) {
  return v(ce, e, t);
};
var Ks = class {
  constructor(e, t, n) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = n;
  }
  close() {
    var e, t;
    (e = this.confidenceMasks) == null || e.forEach(((n) => {
      n.close();
    })), (t = this.categoryMask) == null || t.close();
  }
};
function go(e) {
  e.categoryMask = void 0, e.confidenceMasks = void 0, e.qualityScores = void 0;
}
function yo(e) {
  try {
    const t = new Ks(e.confidenceMasks, e.categoryMask, e.qualityScores);
    if (!e.j) return t;
    e.j(t);
  } finally {
    hs(e);
  }
}
Ks.prototype.close = Ks.prototype.close;
var se = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !1), this.s = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Wr(), this.v = new Za(), y(this.h, 0, 3, this.v), y(e = this.h, 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? F(this.h, 2, Wt(e.displayNamesLocale)) : "displayNamesLocale" in e && F(this.h, 2), "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  I() {
    (function(e) {
      var n, s;
      const t = Ye(e.da(), Z, 1).filter(((r) => (Ee(r, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
      if (e.s = [], t.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      t.length === 1 && (((s = (n = E(t[0], le, 7)) == null ? void 0 : n.l()) == null ? void 0 : s.g()) ?? /* @__PURE__ */ new Map()).forEach(((r, i) => {
        e.s[Number(i)] = Ee(r, 1) ?? "";
      }));
    })(this);
  }
  segment(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.j = typeof t == "function" ? t : n, go(this), Se(this, e, s), yo(this);
  }
  Ma(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.j = typeof n == "function" ? n : s, go(this), Ge(this, e, r, t), yo(this);
  }
  Da() {
    return this.s;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect");
    const t = new le();
    xe(t, e2, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), n.o(t), me(e, n), as(this, e), this.outputConfidenceMasks && (A(e, "confidence_masks"), b(n, "CONFIDENCE_MASKS:confidence_masks"), Ut(this, "confidence_masks"), this.g.ca("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], d(this, s);
    }))), this.outputCategoryMask && (A(e, "category_mask"), b(n, "CATEGORY_MASK:category_mask"), Ut(this, "category_mask"), this.g.U("category_mask", ((s, r) => {
      this.categoryMask = Vt(this, s, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, d(this, s);
    }))), A(e, "quality_scores"), b(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
se.prototype.getLabels = se.prototype.Da, se.prototype.segmentForVideo = se.prototype.Ma, se.prototype.segment = se.prototype.segment, se.prototype.setOptions = se.prototype.o, se.createFromModelPath = function(e, t) {
  return v(se, e, { baseOptions: { modelAssetPath: t } });
}, se.createFromModelBuffer = function(e, t) {
  return v(se, e, { baseOptions: { modelAssetBuffer: t } });
}, se.createFromOptions = function(e, t) {
  return v(se, e, t);
};
var Ys = class {
  constructor(e, t, n) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = n;
  }
  close() {
    var e, t;
    (e = this.confidenceMasks) == null || e.forEach(((n) => {
      n.close();
    })), (t = this.categoryMask) == null || t.close();
  }
};
Ys.prototype.close = Ys.prototype.close;
var X1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Tt = [0, B, -2], Bn = [0, Ve, -3, C, Ve, -1], _o = [0, Bn], wo = [0, Bn, B, -1], Is = class extends f {
  constructor(e) {
    super(e);
  }
}, vo = [0, Ve, -1, C], $1 = class extends f {
  constructor(e) {
    super(e);
  }
}, bo = class extends f {
  constructor(e) {
    super(e);
  }
}, qs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], y2 = class extends f {
  constructor(e) {
    super(e);
  }
};
y2.prototype.g = ss([0, z, [0, qs, S, Bn, S, [0, Bn, Tt], S, _o, S, [0, _o, Tt], S, vo, S, [0, Ve, -3, C, Ae], S, [0, Ve, -3, C], S, [0, k, Ve, -2, C, B, C, -1, 2, Ve, Tt], S, wo, S, [0, wo, Tt], Ve, Tt, k, S, [0, Ve, -3, C, Tt, -1], S, [0, z, vo]], k, [0, k, B, -1, C]]);
var De = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Wr(), this.s = new Za(), y(this.h, 0, 3, this.s), y(e = this.h, 0, 1, t = new I());
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
  segment(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    this.j = typeof n == "function" ? n : s, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.B + 1, s = new y2();
    const i = new bo();
    var o = new X1();
    if (Ue(o, 1, 255), y(i, 0, 12, o), t.keypoint && t.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (t.keypoint) {
      var a = new Is();
      un(a, 3, !0), m(a, 1, t.keypoint.x), m(a, 2, t.keypoint.y), rn(i, 5, qs, a);
    } else {
      if (!t.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a of (o = new $1(), t.scribble)) un(t = new Is(), 3, !0), m(t, 1, a.x), m(t, 2, a.y), On(o, 1, Is, t);
      rn(i, 15, qs, o);
    }
    On(s, 1, bo, i), this.g.addProtoToStream(s.g(), "drishti.RenderData", "roi_in", n), Se(this, e, r);
    e: {
      try {
        const c = new Ys(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = c;
          break e;
        }
        this.j(c);
      } finally {
        hs(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "roi_in"), x(e, "norm_rect_in");
    const t = new le();
    xe(t, e2, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), L(n, "IMAGE:image_in"), L(n, "ROI:roi_in"), L(n, "NORM_RECT:norm_rect_in"), n.o(t), me(e, n), as(this, e), this.outputConfidenceMasks && (A(e, "confidence_masks"), b(n, "CONFIDENCE_MASKS:confidence_masks"), Ut(this, "confidence_masks"), this.g.ca("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], d(this, s);
    }))), this.outputCategoryMask && (A(e, "category_mask"), b(n, "CATEGORY_MASK:category_mask"), Ut(this, "category_mask"), this.g.U("category_mask", ((s, r) => {
      this.categoryMask = Vt(this, s, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, d(this, s);
    }))), A(e, "quality_scores"), b(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
De.prototype.segment = De.prototype.segment, De.prototype.setOptions = De.prototype.o, De.createFromModelPath = function(e, t) {
  return v(De, e, { baseOptions: { modelAssetPath: t } });
}, De.createFromModelBuffer = function(e, t) {
  return v(De, e, { baseOptions: { modelAssetBuffer: t } });
}, De.createFromOptions = function(e, t) {
  return v(De, e, t);
};
var _e = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "input_frame_gpu", "norm_rect", !1), this.j = { detections: [] }, y(e = this.h = new t2(), 0, 1, t = new I());
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? F(this.h, 2, Wt(e.displayNamesLocale)) : "displayNamesLocale" in e && F(this.h, 2), e.maxResults !== void 0 ? Ue(this.h, 3, e.maxResults) : "maxResults" in e && F(this.h, 3), e.scoreThreshold !== void 0 ? m(this.h, 4, e.scoreThreshold) : "scoreThreshold" in e && F(this.h, 4), e.categoryAllowlist !== void 0 ? Pn(this.h, 5, e.categoryAllowlist) : "categoryAllowlist" in e && F(this.h, 5), e.categoryDenylist !== void 0 ? Pn(this.h, 6, e.categoryDenylist) : "categoryDenylist" in e && F(this.h, 6), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Se(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "input_frame_gpu"), x(e, "norm_rect"), A(e, "detections");
    const t = new le();
    xe(t, G1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), L(n, "IMAGE:input_frame_gpu"), L(n, "NORM_RECT:norm_rect"), b(n, "DETECTIONS:detections"), n.o(t), me(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = Ca(i), this.j.detections.push(s2(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
_e.prototype.detectForVideo = _e.prototype.F, _e.prototype.detect = _e.prototype.D, _e.prototype.setOptions = _e.prototype.o, _e.createFromModelPath = async function(e, t) {
  return v(_e, e, { baseOptions: { modelAssetPath: t } });
}, _e.createFromModelBuffer = function(e, t) {
  return v(_e, e, { baseOptions: { modelAssetBuffer: t } });
}, _e.createFromOptions = function(e, t) {
  return v(_e, e, t);
};
var Js = class {
  constructor(e, t, n) {
    this.landmarks = e, this.worldLandmarks = t, this.segmentationMasks = n;
  }
  close() {
    var e;
    (e = this.segmentationMasks) == null || e.forEach(((t) => {
      t.close();
    }));
  }
};
function Eo(e) {
  e.landmarks = [], e.worldLandmarks = [], e.segmentationMasks = void 0;
}
function Ao(e) {
  try {
    const t = new Js(e.landmarks, e.worldLandmarks, e.segmentationMasks);
    if (!e.s) return t;
    e.s(t);
  } finally {
    hs(e);
  }
}
Js.prototype.close = Js.prototype.close;
var ue = class extends oe {
  constructor(e, t) {
    super(new ke(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, y(e = this.h = new n2(), 0, 1, t = new I()), this.v = new Ka(), y(this.h, 0, 3, this.v), this.j = new $a(), y(this.h, 0, 2, this.j), Ue(this.j, 4, 1), m(this.j, 2, 0.5), m(this.v, 2, 0.5), m(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, I, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numPoses" in e && Ue(this.j, 4, e.numPoses ?? 1), "minPoseDetectionConfidence" in e && m(this.j, 2, e.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && m(this.h, 4, e.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in e && m(this.v, 2, e.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in e && (this.outputSegmentationMasks = e.outputSegmentationMasks ?? !1), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.s = typeof t == "function" ? t : n, Eo(this), Se(this, e, s), Ao(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.s = typeof n == "function" ? n : s, Eo(this), Ge(this, e, r, t), Ao(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "normalized_landmarks"), A(e, "world_landmarks"), A(e, "segmentation_masks");
    const t = new le();
    xe(t, H1, this.h);
    const n = new Z();
    fe(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), b(n, "NORM_LANDMARKS:normalized_landmarks"), b(n, "WORLD_LANDMARKS:world_landmarks"), n.o(t), me(e, n), as(this, e), this.g.attachProtoVectorListener("normalized_landmarks", ((s, r) => {
      this.landmarks = [];
      for (const i of s) s = gn(i), this.landmarks.push(os(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("normalized_landmarks", ((s) => {
      this.landmarks = [], d(this, s);
    })), this.g.attachProtoVectorListener("world_landmarks", ((s, r) => {
      this.worldLandmarks = [];
      for (const i of s) s = It(i), this.worldLandmarks.push(an(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_landmarks", ((s) => {
      this.worldLandmarks = [], d(this, s);
    })), this.outputSegmentationMasks && (b(n, "SEGMENTATION_MASK:segmentation_masks"), Ut(this, "segmentation_masks"), this.g.ca("segmentation_masks", ((s, r) => {
      this.segmentationMasks = s.map(((i) => Vt(this, i, !0, !this.s))), d(this, r);
    })), this.g.attachEmptyPacketListener("segmentation_masks", ((s) => {
      this.segmentationMasks = [], d(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ue.prototype.detectForVideo = ue.prototype.F, ue.prototype.detect = ue.prototype.D, ue.prototype.setOptions = ue.prototype.o, ue.createFromModelPath = function(e, t) {
  return v(ue, e, { baseOptions: { modelAssetPath: t } });
}, ue.createFromModelBuffer = function(e, t) {
  return v(ue, e, { baseOptions: { modelAssetBuffer: t } });
}, ue.createFromOptions = function(e, t) {
  return v(ue, e, t);
}, ue.POSE_CONNECTIONS = g2;
function Nn(e, t, n) {
  return e * (1 - n) + t * n;
}
function K1(e, t, n) {
  return {
    x: Nn(e.x, t.x, n),
    y: Nn(e.y, t.y, n)
  };
}
function We(e, t) {
  const n = t.x - e.x, s = t.y - e.y;
  return Math.sqrt(n * n + s * s);
}
function _2(e, t) {
  return Math.atan2(t.y - e.y, t.x - e.x);
}
function Y1(e, t, n) {
  if (e.length < 264)
    return {
      center: { x: t / 2, y: n / 2 },
      scale: 1,
      rotation: 0
    };
  const i = e[33], o = e[263], a = (i.x + o.x) / 2, h = (i.y + o.y) / 2, c = {
    x: a * t,
    y: h * n
  }, l = We(
    { x: i.x * t, y: i.y * n },
    { x: o.x * t, y: o.y * n }
  ) / n * 3, w = _2(
    { x: i.x * t, y: i.y * n },
    { x: o.x * t, y: o.y * n }
  );
  return { center: c, scale: l, rotation: w };
}
function q1(e, t, n) {
  const c = {
    center: { x: t / 2, y: n / 2 },
    forehead: { x: t / 2, y: n / 3 },
    chin: { x: t / 2, y: n * 2 / 3 },
    eyeDistance: t * 0.2,
    faceHeight: n * 0.4,
    faceWidth: t * 0.3,
    rotation: 0
  };
  if (e.length < 468)
    return c;
  const u = e[33], l = e[263], w = e[10], O = e[152], $ = e[234], te = e[454], K = {
    x: (u.x + l.x) / 2 * t,
    y: (u.y + l.y) / 2 * n
  }, J = {
    x: w.x * t,
    y: w.y * n
  }, Te = {
    x: O.x * t,
    y: O.y * n
  }, ft = We(
    { x: u.x * t, y: u.y * n },
    { x: l.x * t, y: l.y * n }
  ), Fe = We(J, Te), Oe = We(
    { x: $.x * t, y: $.y * n },
    { x: te.x * t, y: te.y * n }
  ), mt = _2(
    { x: u.x * t, y: u.y * n },
    { x: l.x * t, y: l.y * n }
  );
  return {
    center: K,
    forehead: J,
    chin: Te,
    eyeDistance: ft,
    faceHeight: Fe,
    faceWidth: Oe,
    rotation: mt
  };
}
const Ne = {
  // WASM 路径优先级：本地 -> CDN 兜底
  // 本地路径会在 runtime 中与 modelBasePath 拼接
  wasmPaths: [
    "mediapipe/wasm",
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm"
  ],
  // 模型文件路径（本地 public 目录优先，CDN 兜底）
  models: {
    face: "models/face_landmarker.task",
    hand: "models/hand_landmarker.task",
    fallback: {
      face: [
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        "https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/face_landmarker/data/face_landmarker.task"
      ],
      hand: [
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        "https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/hand_landmarker/data/hand_landmarker.task"
      ]
    }
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
class J1 {
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
  async initialize(t, n, s) {
    try {
      console.log("[FaceTracker] 初始化中..."), s !== void 0 && (this.smoothingAlpha = s);
      const r = ko(t), i = ko(
        n,
        Array.isArray(n) ? [] : Ne.wasmPaths
      );
      if (i.length === 0)
        throw new Error("[FaceTracker] 无可用 WASM 路径");
      if (r.length === 0)
        throw new Error("[FaceTracker] 无可用模型路径");
      let o = null;
      for (const a of i)
        try {
          const h = await st.forVisionTasks(a);
          console.log("[FaceTracker] WASM 已加载:", a);
          for (const c of r)
            try {
              const u = {
                baseOptions: {
                  modelAssetPath: c
                },
                runningMode: "VIDEO",
                ...Ne.faceOptions
              };
              this.faceLandmarker = await P.createFromOptions(
                h,
                u
              ), console.log("[FaceTracker] FaceLandmarker 初始化完成:", c), this.isInitialized = !0;
              return;
            } catch (u) {
              o = u, console.warn("[FaceTracker] 模型加载失败，尝试下一个:", c, u);
            }
        } catch (h) {
          o = h, console.warn("[FaceTracker] WASM 加载失败，尝试下一个:", a, h);
        }
      throw o || new Error("[FaceTracker] 初始化失败");
    } catch (r) {
      throw console.error("[FaceTracker] 初始化失败:", r), r;
    }
  }
  /**
   * 检测视频帧中的人脸
   */
  detectForVideo(t, n) {
    if (!this.faceLandmarker || !this.isInitialized)
      return this.getEmptyResult(n);
    try {
      if (t.readyState < t.HAVE_CURRENT_DATA)
        return this.getEmptyResult(n);
      const s = this.faceLandmarker.detectForVideo(
        t,
        n
      );
      if (!s.faceLandmarks || s.faceLandmarks.length === 0)
        return this.getEmptyResult(n);
      const r = s.faceLandmarks[0], i = this.extractBlendshapes(s), o = t.videoWidth || 640, a = t.videoHeight || 480, h = Y1(
        r,
        o,
        a
      );
      this.smoothedCenter = K1(
        this.smoothedCenter,
        h.center,
        this.smoothingAlpha
      ), this.smoothedScale = Nn(
        this.smoothedScale,
        h.scale,
        this.smoothingAlpha
      ), this.smoothedRotation = Nn(
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
        timestamp: n
      };
      return this.lastResult = c, c;
    } catch (s) {
      const r = s instanceof Error ? s.message : String(s);
      return console.error("[FaceTracker] 检测失败:", r, s), this.lastResult || this.getEmptyResult(n);
    }
  }
  /**
   * 从检测结果中提取 Blendshapes
   */
  extractBlendshapes(t) {
    if (!t.faceBlendshapes || t.faceBlendshapes.length === 0)
      return null;
    const n = /* @__PURE__ */ new Map();
    return t.faceBlendshapes[0].categories.forEach((r) => {
      n.set(r.categoryName, r.score);
    }), n;
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
    var t, n;
    this.faceLandmarker && ((n = (t = this.faceLandmarker).close) == null || n.call(t), this.faceLandmarker = null), this.isInitialized = !1;
  }
  isReady() {
    return this.isInitialized;
  }
}
function ko(e, t = []) {
  const n = [];
  return e && (Array.isArray(e) ? n.push(...e) : n.push(e)), t && t.length > 0 && n.push(...t), Array.from(new Set(n.filter(Boolean)));
}
class Z1 {
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
  async initialize(t, n) {
    try {
      console.log("[HandTracker] 初始化中...");
      const s = So(t), r = So(
        n,
        Array.isArray(n) ? [] : Ne.wasmPaths
      );
      if (r.length === 0)
        throw new Error("[HandTracker] 无可用 WASM 路径");
      if (s.length === 0)
        throw new Error("[HandTracker] 无可用模型路径");
      let i = null;
      for (const o of r)
        try {
          const a = await st.forVisionTasks(o);
          console.log("[HandTracker] WASM 已加载:", o);
          for (const h of s)
            try {
              const c = {
                baseOptions: {
                  modelAssetPath: h
                },
                runningMode: "VIDEO",
                ...Ne.handOptions
              };
              this.handLandmarker = await re.createFromOptions(
                a,
                c
              ), console.log("[HandTracker] HandLandmarker 初始化完成:", h), this.isInitialized = !0;
              return;
            } catch (c) {
              i = c, console.warn("[HandTracker] 模型加载失败，尝试下一个:", h, c);
            }
        } catch (a) {
          i = a, console.warn("[HandTracker] WASM 加载失败，尝试下一个:", o, a);
        }
      throw i || new Error("[HandTracker] 初始化失败");
    } catch (s) {
      throw console.error("[HandTracker] 初始化失败:", s), s;
    }
  }
  /**
   * 检测视频帧中的手部
   */
  detectForVideo(t, n) {
    var s, r;
    if (!this.handLandmarker || !this.isInitialized)
      return this.getEmptyResult(n);
    try {
      if (t.readyState < t.HAVE_CURRENT_DATA)
        return this.getEmptyResult(n);
      const i = this.handLandmarker.detectForVideo(
        t,
        n
      );
      if (!i.landmarks || i.landmarks.length === 0)
        return this.handDetectedFrames = 0, this.getEmptyResult(n);
      this.handDetectedFrames++;
      const o = i.landmarks[0], a = ((s = i.worldLandmarks) == null ? void 0 : s[0]) || null;
      let h = null;
      if (i.handedness && i.handedness.length > 0) {
        const u = i.handedness[0];
        u.displayName ? h = u.displayName : Array.isArray(u) && ((r = u[0]) != null && r.categoryName) && (h = u[0].categoryName);
      }
      const c = {
        landmarks: o,
        worldLandmarks: a,
        handedness: h,
        timestamp: n
      };
      return this.lastResult = c, c;
    } catch (i) {
      const o = i instanceof Error ? i.message : String(i);
      return console.error("[HandTracker] 检测失败:", o, i), this.handDetectedFrames = 0, this.lastResult || this.getEmptyResult(n);
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
    var t, n;
    this.handLandmarker && ((n = (t = this.handLandmarker).close) == null || n.call(t), this.handLandmarker = null), this.isInitialized = !1;
  }
  isReady() {
    return this.isInitialized;
  }
}
function So(e, t = []) {
  const n = [];
  return e && (Array.isArray(e) ? n.push(...e) : n.push(e)), t && t.length > 0 && n.push(...t), Array.from(new Set(n.filter(Boolean)));
}
class Q1 {
  // 需要 ~167ms (5 frames @ 30fps)
  constructor(t = 0.4, n = 0.05, s = 167, r = 30) {
    // 配置参数
    _(this, "jawOpenThreshold", 0.4);
    // jawOpen > 0.4 表示嘴巴打开（足以露出牙齿）
    _(this, "stableFrames", 0);
    // 需要连续保持打开的帧数
    _(this, "requiredStableFrames", 5);
    this.jawOpenThreshold = t, this.requiredStableFrames = Math.ceil(s / 1e3 * r);
  }
  /**
   * 检测露出牙齿的姿态（仅基于 jawOpen blendshape）
   */
  detect(t) {
    var c, u;
    const n = ((c = t.blendshapes) == null ? void 0 : c.get("jawOpen")) ?? 0, s = ((u = t.blendshapes) == null ? void 0 : u.get("mouthOpen")) ?? 0;
    n >= this.jawOpenThreshold ? this.stableFrames++ : this.stableFrames = 0;
    const i = this.stableFrames >= this.requiredStableFrames, o = Math.min(
      (n - this.jawOpenThreshold) / (1 - this.jawOpenThreshold),
      1
    ), a = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    ), h = Math.min(o * a, 1);
    return {
      isOpen: i,
      jawOpenScore: n,
      mouthOpenScore: s,
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
  setThresholds(t, n, s, r = 30) {
    this.jawOpenThreshold = t, this.requiredStableFrames = Math.ceil(s / 1e3 * r), this.reset();
  }
}
class eh {
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
    const n = t.landmarks;
    let s = 0;
    for (let a = 0; a < 5; a++)
      this.isFingerCurled(
        n[this.fingerBaseIndices[a]],
        n[this.fingerTipIndices[a]],
        n[0]
        // 手腕作为参考点
      ) && s++;
    const r = this.calculateHandSpread(n), i = s >= this.curledFingerThreshold, o = s / 5;
    return {
      isFist: i,
      curledFingersCount: s,
      handSpread: r,
      confidence: o
    };
  }
  /**
   * 判断单根手指是否弯曲（幼儿友好：阈值放宽）
   */
  isFingerCurled(t, n, s) {
    const r = We(t, n), i = We(s, t);
    return r < i * 0.55;
  }
  /**
   * 计算手部展开程度（0 = 完全握拳，1 = 完全张开）
   */
  calculateHandSpread(t) {
    const n = t[9];
    let s = 0;
    for (const a of this.fingerTipIndices)
      s += We(t[a], n);
    const r = s / this.fingerTipIndices.length, i = We(t[0], t[this.fingerTipIndices[1]]);
    return Math.min(r / (i * 0.5), 1);
  }
  /**
   * 重置状态（简化版本，无需稳定性追踪）
   */
  reset() {
  }
}
class th {
  constructor(t = 0.02, n = 500, s = 0.15, r = 133, i = 30) {
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
    this.speedThreshold = t, this.highSpeedRatio = s, this.maxHistorySize = Math.ceil(n / 1e3 * i), this.requiredStableFrames = Math.ceil(r / 1e3 * i);
  }
  /**
   * 检测摇晃状态
   */
  detect(t, n = 640, s = 480) {
    if (!t.landmarks || t.landmarks.length < 9)
      return {
        isShaking: !1,
        currentSpeed: 0,
        avgSpeed: 0,
        highSpeedRatio: 0,
        confidence: 0
      };
    const r = t.landmarks[9], i = {
      x: r.x * n,
      y: r.y * s
    };
    let o = 0;
    this.prevHandPos && (o = We(this.prevHandPos, i) / Math.sqrt(n * s)), this.prevHandPos = { ...i }, this.speedHistory.push(o), this.speedHistory.length > this.maxHistorySize && this.speedHistory.shift();
    const a = this.speedHistory.length > 0 ? this.speedHistory.reduce((K, J) => K + J, 0) / this.speedHistory.length : 0, h = this.speedHistory.filter(
      (K) => K > this.speedThreshold
    ).length, c = this.speedHistory.length > 0 ? h / this.speedHistory.length : 0;
    c > this.highSpeedRatio ? this.stableFrames++ : this.stableFrames = 0;
    const l = this.stableFrames >= this.requiredStableFrames, w = Math.min(
      o / (this.speedThreshold * 2),
      1
    ), O = Math.max(
      0,
      (c - this.highSpeedRatio) / (1 - this.highSpeedRatio)
    ), $ = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    ), te = Math.min(
      w * O * $,
      1
    );
    return {
      isShaking: l,
      currentSpeed: o,
      avgSpeed: a,
      highSpeedRatio: c,
      confidence: te
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
class nh {
  // 幼儿友好：300ms 即可完成（原 800ms）
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
    _(this, "brushingStartTime", 0);
    _(this, "completionCount", 0);
    _(this, "teethConfirmed", !1);
    // 露牙已确认（锁定状态，设计文档要求）
    // 时间阈值（幼儿友好优化）
    _(this, "minBrushingDuration", 300);
    this.teethGate = new Q1(0.4, 0.05, 167, 30), this.fist = new eh(2), this.shake = new th(8e-3, 500, 0.06, 80, 30);
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
  detect(t, n = 640, s = 480) {
    const r = Date.now(), i = this.teethGate.detect(
      t.faceResult
    ), o = this.fist.detect(t.handResult), a = this.shake.detect(
      t.handResult,
      n,
      s
    ), h = this.updateBrushingDirection(
      t,
      n,
      s
    );
    let c = "waiting", u = !1;
    if (i.isOpen && (this.teethConfirmed = !0), this.teethConfirmed) {
      c = "teeth_open";
      const w = o.isFist, O = a.isShaking;
      if (w && O)
        c = "fist_ready", this.brushingStartTime === 0 && (this.brushingStartTime = r, console.log("[BrushGesture] 检测到握拳+晃动，开始计时")), r - this.brushingStartTime >= this.minBrushingDuration && (c = "complete", this.completionCount++, console.log("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0);
      else if (this.brushingStartTime > 0) {
        const $ = r - this.brushingStartTime;
        $ >= this.minBrushingDuration ? (c = "complete", this.completionCount++, console.log("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0) : (console.log("[BrushGesture] 动作中断，已持续:", $, "ms"), this.brushingStartTime = 0, c = "teeth_open");
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
  updateBrushingDirection(t, n, s) {
    if (!t.handResult.landmarks || t.handResult.landmarks.length < 9)
      return "none";
    const r = t.handResult.landmarks[9], i = r.x * n, o = r.y * s;
    if (this.prevHandX === null || this.prevHandY === null)
      return this.prevHandX = i, this.prevHandY = o, "none";
    const a = i - this.prevHandX, h = o - this.prevHandY;
    if (this.movementHistory.push({ dx: a, dy: h }), this.movementHistory.length > this.maxMovementHistory && this.movementHistory.shift(), this.prevHandX = i, this.prevHandY = o, this.movementHistory.length < 3)
      return "none";
    const c = this.movementHistory.slice(-10);
    let u = 0, l = 0;
    for (const O of c)
      u += Math.abs(O.dy), l += Math.abs(O.dx);
    const w = 5;
    return u > l && u > w ? "vertical" : l > u && l > w ? "horizontal" : "none";
  }
  /**
   * 计算总置信度
   */
  calculateConfidence(t, n, s, r) {
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
      t.confidence * o.teeth + n.confidence * o.fist + s.confidence * o.shake,
      1
    );
  }
  /**
   * 重置状态
   */
  reset() {
    this.teethGate.reset(), this.fist.reset(), this.shake.reset(), this.brushingStartTime = 0, this.teethConfirmed = !1, this.movementHistory = [], this.prevHandX = null, this.prevHandY = null;
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
class sh {
  // 准确率奖励
  constructor(t = 6e4, n = 10) {
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
    this.brushGesture = new nh(), this.gameDuration = t, this.scorePerBrush = n;
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
  update(t, n) {
    const s = Date.now();
    if (this.currentState !== "init" && s - this.gameStartTime > this.gameDuration) {
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
    const n = Date.now() - this.brushStartTime, s = t.confidence;
    let r = this.scorePerBrush;
    r += Math.floor(this.bonusForAccuracy * s), this.gameStats.successCount++, this.gameStats.totalBrushTime += n, this.gameStats.score += r, this.gameStats.accuracy = (this.gameStats.accuracy * (this.gameStats.successCount - 1) + s) / this.gameStats.successCount, this.emitEvent({
      type: "brush_success",
      timestamp: Date.now(),
      data: {
        points: r,
        brushDuration: n,
        accuracy: s,
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
    const n = this.currentState;
    this.currentState = t, t === "success" && (this.successStateEnterTime = Date.now()), this.emitEvent({
      type: "state_changed",
      timestamp: Date.now(),
      data: { from: n, to: t }
    }), console.log(`[GameStateMachine] 状态转移: ${n} -> ${t}`);
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
  addEventListener(t, n) {
    this.eventListeners.has(t) || this.eventListeners.set(t, []), this.eventListeners.get(t).push(n);
  }
  /**
   * 移除事件监听
   */
  removeEventListener(t, n) {
    const s = this.eventListeners.get(t);
    if (s) {
      const r = s.indexOf(n);
      r > -1 && s.splice(r, 1);
    }
  }
  /**
   * 触发事件
   */
  emitEvent(t) {
    (this.eventListeners.get(t.type) || []).forEach((s) => s(t));
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
class rh {
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
      return this.isLoading = !0, this.loadError = null, new Promise((n, s) => {
        const r = new Image();
        r.crossOrigin = "anonymous", r.onload = () => {
          this.avatarImage = r, this.isLoading = !1, console.log("[AvatarRenderer] 头套加载完成:", t, r.width, "x", r.height), n();
        }, r.onerror = () => {
          this.loadError = `Failed to load avatar: ${t}`, this.isLoading = !1, console.error("[AvatarRenderer] 头套加载失败:", this.loadError), s(new Error(this.loadError));
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
  render(t, n, s, r, i) {
    var ft, Fe, Oe, mt;
    if (!this.avatarImage || !n.landmarks)
      return;
    const o = q1(
      n.landmarks,
      r,
      i
    ), a = o.faceWidth * 2.2 / this.avatarImage.width, h = s.scale || 1, c = a * h, u = this.avatarImage.width * c, l = this.avatarImage.height * c, w = (((ft = s.faceHoleOffset) == null ? void 0 : ft.x) || 0) * u, O = (((Fe = s.faceHoleOffset) == null ? void 0 : Fe.y) || 0) * l, $ = (((Oe = s.anchorOffset) == null ? void 0 : Oe.x) || 0) * u, te = (((mt = s.anchorOffset) == null ? void 0 : mt.y) || 0) * l, K = o.center.x - w + $, J = o.center.y - O + te, Te = o.rotation;
    t.save(), t.translate(K, J), t.rotate(Te), t.drawImage(
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
const Zs = [
  {
    id: "owl",
    name: "🦉 猫头鹰",
    imgUrl: "SkinSet/owl.png",
    faceHoleOffset: { x: 0, y: 0.3 },
    anchorOffset: { x: 0, y: -0.18 },
    scale: 0.75
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
function ih(e, t) {
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
  const n = e.avatarId || "owl", s = Zs.find((i) => i.id === n) || Zs[0];
  let r = s.imgUrl;
  return !r.startsWith("http") && !r.startsWith("/") && !r.startsWith("data:") && (r = t + "/" + r), { ...s, imgUrl: r };
}
function oh(e, t) {
  if (/^https?:\/\//i.test(t)) return t;
  const n = e.replace(/\/$/, "");
  return t.startsWith("/") ? n + t : n + "/" + t;
}
function Os(e, t) {
  const n = t.filter(Boolean).map((s) => oh(e, s));
  return Array.from(new Set(n));
}
async function ah(e, t) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    throw new Error("Camera API not available. Use a secure (https) context.");
  return new Promise((n, s) => {
    let r = !1;
    const i = setTimeout(() => {
      r || (r = !0, s(new Error("Camera permission timeout")));
    }, t);
    navigator.mediaDevices.getUserMedia(e).then((o) => {
      if (r) {
        o.getTracks().forEach((a) => a.stop());
        return;
      }
      r = !0, clearTimeout(i), n(o);
    }).catch((o) => {
      r || (r = !0, clearTimeout(i), s(o));
    });
  });
}
async function hh(e, t) {
  t == null || t("camera", 0.1);
  const s = await ah({
    video: {
      facingMode: "user",
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: !1
  }, 15e3);
  return e.srcObject = s, t == null || t("camera", 0.5), new Promise((r, i) => {
    const o = setTimeout(() => {
      i(new Error("Camera timeout: video failed to load within 15 seconds"));
    }, 15e3);
    e.onloadedmetadata = () => {
      e.play().then(() => {
        clearTimeout(o), t == null || t("camera", 1), r(s);
      }).catch(i);
    }, e.onerror = () => {
      clearTimeout(o), i(new Error("Video element error"));
    };
  });
}
async function lh(e) {
  var di, fi;
  const { canvas: t, avatarCanvas: n, onState: s, onScore: r, onGameOver: i, onError: o, onProgress: a, debug: h = !1 } = e, c = e.basePath || window.location.origin, u = e.modelBasePath || window.location.origin, l = e.gameDurationMs || 6e4, w = e.enableCapture !== !1, O = e.captureCount || 6, $ = e.onCapture;
  let te = !0, K = !1, J = null, Te = null;
  const ft = [];
  let Fe = [], Oe = 0, mt = 0;
  const ds = new J1(), fs = new Z1(), Le = new sh(l), ms = new rh();
  let j = e.video, ii = !1;
  j || (j = document.createElement("video"), j.setAttribute("playsinline", "true"), j.setAttribute("autoplay", "true"), j.muted = !0, j.style.display = "none", document.body.appendChild(j), ii = !0);
  const Ze = t.getContext("2d");
  if (!Ze)
    throw new Error("Failed to get 2D context from canvas");
  const ps = n ? n.getContext("2d") : null, Jt = !!(n && ps), oi = ih(e, c);
  let ai = 0, gs = 0, hi = 0, ci = 0;
  const w2 = 1e3 / 20;
  let ui = 0, Et = null, ys = null;
  try {
    let Qe = function(Y) {
      if (!te) return;
      gs++, Y - ci >= 1e3 && (hi = gs, gs = 0, ci = Y);
      const et = Y - ai;
      if (ai = Y, (t.width !== j.videoWidth || t.height !== j.videoHeight) && j.videoWidth > 0 && j.videoHeight > 0 && (t.width = j.videoWidth, t.height = j.videoHeight), Jt && ((n.width !== t.width || n.height !== t.height) && (n.width = t.width, n.height = t.height), ps.clearRect(0, 0, n.width, n.height)), Ze.save(), Ze.translate(t.width, 0), Ze.scale(-1, 1), Ze.drawImage(j, 0, 0, t.width, t.height), Ze.restore(), !K && Y - ui >= w2) {
        ui = Y, Et = ds.detectForVideo(j, Y), ys = fs.detectForVideo(j, Y);
        const ne = {
          faceResult: Et,
          handResult: ys
        };
        Le.update(ne, et);
      }
      if (Et && Et.landmarks) {
        const ne = Jt ? ps : Ze, He = Jt ? n.width : t.width, pe = Jt ? n.height : t.height;
        ne.save(), ne.translate(He, 0), ne.scale(-1, 1), ms.render(ne, Et, oi, He, pe), ne.restore();
      }
      if (w && Oe < Fe.length) {
        const ne = Y - mt, He = Fe[Oe];
        if (ne >= He) {
          try {
            let tt = t.width, At = t.height;
            if (t.width > 800 || t.height > 800) {
              const Qt = 800 / Math.max(t.width, t.height);
              tt = Math.round(t.width * Qt), At = Math.round(t.height * Qt);
            }
            const kt = document.createElement("canvas");
            kt.width = tt, kt.height = At;
            const _s = kt.getContext("2d");
            if (_s) {
              _s.drawImage(t, 0, 0, tt, At), Jt && _s.drawImage(n, 0, 0, tt, At);
              const Qt = kt.toDataURL("image/jpeg", 0.85);
              ft.push(Qt), console.log(`[BrushGame] 抓拍 ${Oe + 1}/${O} @ ${(ne / 1e3).toFixed(1)}s`), $ == null || $(Qt, Oe);
            }
          } catch (pe) {
            console.error("[BrushGame] 抓拍失败:", pe);
          }
          Oe++;
        }
      }
      h && ch(Ze, t, Et, ys, hi, Le), J = requestAnimationFrame(Qe);
    };
    a == null || a("camera", 0), Te = await hh(j, a), a == null || a("models", 0);
    const Zt = Os(u, Ne.wasmPaths), v2 = Os(
      u,
      [Ne.models.face, ...((di = Ne.models.fallback) == null ? void 0 : di.face) || []]
    ), b2 = Os(
      u,
      [Ne.models.hand, ...((fi = Ne.models.fallback) == null ? void 0 : fi.hand) || []]
    );
    if (await Promise.all([
      ds.initialize(v2, Zt),
      fs.initialize(b2, Zt)
    ]), a == null || a("models", 1), a == null || a("avatar", 0), await ms.loadAvatar(oi.imgUrl), a == null || a("avatar", 1), Le.initialize(), Le.addEventListener("state_changed", (Y) => {
      s == null || s(Le.getState(), Y);
    }), Le.addEventListener("brush_success", (Y) => {
      var He;
      const et = Le.getStats(), ne = ((He = Y.data) == null ? void 0 : He.points) || 0;
      r == null || r(et, ne);
    }), Le.addEventListener("game_over", (Y) => {
      const et = Y.data;
      i == null || i(et);
    }), w) {
      const et = l - 5e3, ne = et - 3e3, He = Math.max(5e3, ne / (O + 1));
      Fe = [];
      for (let pe = 0; pe < O; pe++) {
        const tt = 3e3 + He * (pe + 1), At = (Math.random() - 0.5) * 3e3, kt = Math.max(3e3, Math.min(et, tt + At));
        Fe.push(kt);
      }
      Fe.sort((pe, tt) => pe - tt), console.log("[BrushGame] 抓拍调度:", Fe.map((pe) => (pe / 1e3).toFixed(1) + "s"));
    }
    mt = performance.now(), a == null || a("ready", 1), J = requestAnimationFrame(Qe);
  } catch (Qe) {
    li();
    const Zt = Qe instanceof Error ? Qe : new Error(String(Qe));
    throw o == null || o(Zt), Zt;
  }
  function li() {
    te = !1, J !== null && cancelAnimationFrame(J), Te && Te.getTracks().forEach((Qe) => Qe.stop()), ii && j && j.remove(), ds.dispose(), fs.dispose(), ms.dispose();
  }
  return {
    stop: li,
    getState: () => Le.getState(),
    getStats: () => Le.getStats(),
    getRemainingTime: () => Le.getRemainingTime(),
    pause: () => {
      K = !0;
    },
    resume: () => {
      K = !1;
    },
    getCapturedPhotos: () => [...ft]
    // 返回副本
  };
}
function ch(e, t, n, s, r, i) {
  e.save(), e.fillStyle = "rgba(0, 0, 0, 0.6)", e.fillRect(10, 10, 200, 120), e.fillStyle = "#fff", e.font = "12px monospace";
  const o = i.getState(), a = i.getStats(), h = Math.ceil(i.getRemainingTime() / 1e3);
  if (e.fillText(`FPS: ${r}`, 20, 30), e.fillText(`State: ${o}`, 20, 46), e.fillText(`Score: ${a.score}`, 20, 62), e.fillText(`Success: ${a.successCount}`, 20, 78), e.fillText(`Time: ${h}s`, 20, 94), e.fillText(`Face: ${n != null && n.landmarks ? "Yes" : "No"}`, 20, 110), e.fillText(`Hand: ${s != null && s.landmarks ? "Yes" : "No"}`, 120, 110), n != null && n.landmarks) {
    e.fillStyle = "rgba(0, 255, 0, 0.5)";
    for (const c of n.landmarks) {
      const u = (1 - c.x) * t.width, l = c.y * t.height;
      e.beginPath(), e.arc(u, l, 1, 0, Math.PI * 2), e.fill();
    }
  }
  if (s != null && s.landmarks) {
    e.fillStyle = "rgba(255, 255, 0, 0.8)";
    for (const c of s.landmarks) {
      const u = (1 - c.x) * t.width, l = c.y * t.height;
      e.beginPath(), e.arc(u, l, 3, 0, Math.PI * 2), e.fill();
    }
  }
  e.restore();
}
const dh = {
  avatars: Zs,
  mediaPipe: Ne
};
export {
  dh as config,
  lh as start
};
