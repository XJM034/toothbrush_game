var T2 = Object.defineProperty;
var F2 = (e, t, n) => t in e ? T2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var _ = (e, t, n) => F2(e, typeof t != "symbol" ? t + "" : t, n);
var bt = typeof self < "u" ? self : {};
function mt() {
  throw Error("Invalid UTF8");
}
function yi(e, t) {
  return t = String.fromCharCode.apply(null, t), e == null ? t : e + t;
}
let wn, bs;
const L2 = typeof TextDecoder < "u";
let x2;
const M2 = typeof TextEncoder < "u";
function xo(e) {
  if (M2) e = (x2 || (x2 = new TextEncoder())).encode(e);
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
var tr, Mn;
e: {
  for (var _i = ["CLOSURE_FLAGS"], vs = bt, Es = 0; Es < _i.length; Es++) if ((vs = vs[_i[Es]]) == null) {
    Mn = null;
    break e;
  }
  Mn = vs;
}
var un, wi = Mn && Mn[610401301];
tr = wi != null && wi;
const bi = bt.navigator;
function Ds(e) {
  return !!tr && !!un && un.brands.some((({ brand: t }) => t && t.indexOf(e) != -1));
}
function be(e) {
  var t;
  return (t = bt.navigator) && (t = t.userAgent) || (t = ""), t.indexOf(e) != -1;
}
function it() {
  return !!tr && !!un && un.brands.length > 0;
}
function As() {
  return it() ? Ds("Chromium") : (be("Chrome") || be("CriOS")) && !(!it() && be("Edge")) || be("Silk");
}
function nr(e) {
  return nr[" "](e), e;
}
un = bi && bi.userAgentData || null, nr[" "] = function() {
};
var C2 = !it() && (be("Trident") || be("MSIE"));
!be("Android") || As(), As(), be("Safari") && (As() || !it() && be("Coast") || !it() && be("Opera") || !it() && be("Edge") || (it() ? Ds("Microsoft Edge") : be("Edg/")) || it() && Ds("Opera"));
var Mo = {}, rn = null;
function I2(e) {
  const t = e.length;
  let n = 3 * t / 4;
  n % 3 ? n = Math.floor(n) : "=.".indexOf(e[t - 1]) != -1 && (n = "=.".indexOf(e[t - 2]) != -1 ? n - 2 : n - 1);
  const s = new Uint8Array(n);
  let r = 0;
  return (function(i, o) {
    function a(c) {
      for (; h < i.length; ) {
        const u = i.charAt(h++), l = rn[u];
        if (l != null) return l;
        if (!/^[\s\xa0]*$/.test(u)) throw Error("Unknown base64 encoding at char: " + u);
      }
      return c;
    }
    Co();
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
function Co() {
  if (!rn) {
    rn = {};
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = ["+/=", "+/", "-_=", "-_.", "-_"];
    for (let n = 0; n < 5; n++) {
      const s = e.concat(t[n].split(""));
      Mo[n] = s;
      for (let r = 0; r < s.length; r++) {
        const i = s[r];
        rn[i] === void 0 && (rn[i] = r);
      }
    }
  }
}
var Io = typeof Uint8Array < "u", Oo = !C2 && typeof btoa == "function";
function vi(e) {
  if (!Oo) {
    var t;
    t === void 0 && (t = 0), Co(), t = Mo[t];
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
const Ei = /[-_.]/g, O2 = { "-": "+", _: "/", ".": "=" };
function P2(e) {
  return O2[e] || "";
}
function Po(e) {
  if (!Oo) return I2(e);
  Ei.test(e) && (e = e.replace(Ei, P2)), e = atob(e);
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
  return t;
}
function pn(e) {
  return Io && e != null && e instanceof Uint8Array;
}
var Ot = {};
function vt() {
  return R2 || (R2 = new $e(null, Ot));
}
function sr(e) {
  Ro(Ot);
  var t = e.g;
  return (t = t == null || pn(t) ? t : typeof t == "string" ? Po(t) : null) == null ? t : e.g = t;
}
var $e = class {
  h() {
    return new Uint8Array(sr(this) || 0);
  }
  constructor(e, t) {
    if (Ro(t), this.g = e, e != null && e.length === 0) throw Error("ByteString should be constructed with non-empty values");
  }
};
let R2, D2;
function Ro(e) {
  if (e !== Ot) throw Error("illegal external caller");
}
function Do(e, t) {
  e.__closure__error__context__984382 || (e.__closure__error__context__984382 = {}), e.__closure__error__context__984382.severity = t;
}
function Bs(e) {
  return Do(e = Error(e), "warning"), e;
}
var Hn = typeof Symbol == "function" && typeof Symbol() == "symbol", B2 = /* @__PURE__ */ new Set();
function mn(e, t, n = !1, s = !1) {
  return e = typeof Symbol == "function" && typeof Symbol() == "symbol" ? s && Symbol.for && e ? Symbol.for(e) : e != null ? Symbol(e) : Symbol() : t, n && B2.add(e), e;
}
var N2 = mn("jas", void 0, !0, !0), Ai = mn(void 0, "0di"), ks = mn(void 0, "2ex"), nn = mn(void 0, "1oa", !0), Pt = mn(void 0, Symbol(), !0);
const g = Hn ? N2 : "Ga", Bo = { Ga: { value: 0, configurable: !0, writable: !0, enumerable: !1 } }, No = Object.defineProperties;
function Vn(e, t) {
  Hn || g in e || No(e, Bo), e[g] |= t;
}
function G(e, t) {
  Hn || g in e || No(e, Bo), e[g] = t;
}
function jt(e) {
  return Vn(e, 34), e;
}
function U2(e, t) {
  G(t, -30975 & (0 | e));
}
function Ns(e, t) {
  G(t, -30941 & (34 | e));
}
function rr() {
  return typeof BigInt == "function";
}
function ie(e) {
  return Array.prototype.slice.call(e);
}
var ir, gn = {}, Uo = {};
function ki(e) {
  return !(!e || typeof e != "object" || e.Ia !== Uo);
}
function or(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && e.constructor === Object;
}
function ar(e, t) {
  if (e != null) {
    if (typeof e == "string") e = e ? new $e(e, Ot) : vt();
    else if (e.constructor !== $e) if (pn(e)) e = e.length ? new $e(new Uint8Array(e), Ot) : vt();
    else {
      if (!t) throw Error();
      e = void 0;
    }
  }
  return e;
}
function Cn(e) {
  return !(!Array.isArray(e) || e.length) && !!(1 & (0 | e[g]));
}
const Si = [];
function lt(e) {
  if (2 & e) throw Error();
}
G(Si, 55), ir = Object.freeze(Si);
class In {
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
    return new In(this.g, this.h, this.m);
  }
}
function hr(e) {
  return Pt ? e[Pt] : void 0;
}
var G2 = Object.freeze({});
function jn(e) {
  return e.Qa = !0, e;
}
var H2 = jn(((e) => typeof e == "number")), Ti = jn(((e) => typeof e == "string")), V2 = jn(((e) => typeof e == "boolean")), zn = typeof bt.BigInt == "function" && typeof bt.BigInt(0) == "bigint", Us = jn(((e) => zn ? e >= z2 && e <= X2 : e[0] === "-" ? Fi(e, j2) : Fi(e, W2)));
const j2 = Number.MIN_SAFE_INTEGER.toString(), z2 = zn ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, W2 = Number.MAX_SAFE_INTEGER.toString(), X2 = zn ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function Fi(e, t) {
  if (e.length > t.length) return !1;
  if (e.length < t.length || e === t) return !0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n], r = t[n];
    if (s > r) return !1;
    if (s < r) return !0;
  }
}
const $2 = typeof Uint8Array.prototype.slice == "function";
let Go, T = 0, D = 0;
function Li(e) {
  const t = e >>> 0;
  T = t, D = (e - t) / 4294967296 >>> 0;
}
function Rt(e) {
  if (e < 0) {
    Li(-e);
    const [t, n] = dr(T, D);
    T = t >>> 0, D = n >>> 0;
  } else Li(e);
}
function cr(e) {
  const t = Go || (Go = new DataView(new ArrayBuffer(8)));
  t.setFloat32(0, +e, !0), D = 0, T = t.getUint32(0, !0);
}
function ur(e, t) {
  const n = 4294967296 * t + (e >>> 0);
  return Number.isSafeInteger(n) ? n : ln(e, t);
}
function lr(e, t) {
  const n = 2147483648 & t;
  return n && (t = ~t >>> 0, (e = 1 + ~e >>> 0) == 0 && (t = t + 1 >>> 0)), typeof (e = ur(e, t)) == "number" ? n ? -e : e : n ? "-" + e : e;
}
function ln(e, t) {
  if (e >>>= 0, (t >>>= 0) <= 2097151) var n = "" + (4294967296 * t + e);
  else rr() ? n = "" + (BigInt(t) << BigInt(32) | BigInt(e)) : (e = (16777215 & e) + 6777216 * (n = 16777215 & (e >>> 24 | t << 8)) + 6710656 * (t = t >> 16 & 65535), n += 8147497 * t, t *= 2, e >= 1e7 && (n += e / 1e7 >>> 0, e %= 1e7), n >= 1e7 && (t += n / 1e7 >>> 0, n %= 1e7), n = t + xi(n) + xi(e));
  return n;
}
function xi(e) {
  return e = String(e), "0000000".slice(e.length) + e;
}
function Wn(e) {
  if (e.length < 16) Rt(Number(e));
  else if (rr()) e = BigInt(e), T = Number(e & BigInt(4294967295)) >>> 0, D = Number(e >> BigInt(32) & BigInt(4294967295));
  else {
    const t = +(e[0] === "-");
    D = T = 0;
    const n = e.length;
    for (let s = t, r = (n - t) % 6 + t; r <= n; s = r, r += 6) {
      const i = Number(e.slice(s, r));
      D *= 1e6, T = 1e6 * T + i, T >= 4294967296 && (D += Math.trunc(T / 4294967296), D >>>= 0, T >>>= 0);
    }
    if (t) {
      const [s, r] = dr(T, D);
      T = s, D = r;
    }
  }
}
function dr(e, t) {
  return t = ~t, e ? e = 1 + ~e : t += 1, [e, t];
}
const fr = typeof BigInt == "function" ? BigInt.asIntN : void 0, K2 = typeof BigInt == "function" ? BigInt.asUintN : void 0, Lt = Number.isSafeInteger, Xn = Number.isFinite, On = Math.trunc;
function dt(e) {
  return e == null || typeof e == "number" ? e : e === "NaN" || e === "Infinity" || e === "-Infinity" ? Number(e) : void 0;
}
function Ho(e) {
  return e == null || typeof e == "boolean" ? e : typeof e == "number" ? !!e : void 0;
}
const Y2 = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function $n(e) {
  switch (typeof e) {
    case "bigint":
      return !0;
    case "number":
      return Xn(e);
    case "string":
      return Y2.test(e);
    default:
      return !1;
  }
}
function zt(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return Xn(e) ? 0 | e : void 0;
}
function Vo(e) {
  if (e == null) return e;
  if (typeof e == "string" && e) e = +e;
  else if (typeof e != "number") return;
  return Xn(e) ? e >>> 0 : void 0;
}
function Mi(e) {
  if (e[0] === "-") return !1;
  const t = e.length;
  return t < 20 || t === 20 && Number(e.substring(0, 6)) < 184467;
}
function pr(e) {
  return e = On(e), Lt(e) || (Rt(e), e = lr(T, D)), e;
}
function mr(e) {
  var t = On(Number(e));
  if (Lt(t)) return String(t);
  if ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), t = e.length, !(e[0] === "-" ? t < 20 || t === 20 && Number(e.substring(0, 7)) > -922337 : t < 19 || t === 19 && Number(e.substring(0, 6)) < 922337)) if (Wn(e), e = T, 2147483648 & (t = D)) if (rr()) e = "" + (BigInt(0 | t) << BigInt(32) | BigInt(e >>> 0));
  else {
    const [n, s] = dr(e, t);
    e = "-" + ln(n, s);
  }
  else e = ln(e, t);
  return e;
}
function Pn(e) {
  return e == null ? e : typeof e == "bigint" ? (Us(e) ? e = Number(e) : (e = fr(64, e), e = Us(e) ? Number(e) : String(e)), e) : $n(e) ? typeof e == "number" ? pr(e) : mr(e) : void 0;
}
function q2(e) {
  if (e == null) return e;
  var t = typeof e;
  if (t === "bigint") return String(K2(64, e));
  if ($n(e)) {
    if (t === "string") return t = On(Number(e)), Lt(t) && t >= 0 ? e = String(t) : ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), Mi(e) || (Wn(e), e = ln(T, D))), e;
    if (t === "number") return (e = On(e)) >= 0 && Lt(e) ? e : (function(n) {
      if (n < 0) {
        Rt(n);
        var s = ln(T, D);
        return n = Number(s), Lt(n) ? n : s;
      }
      return Mi(s = String(n)) ? s : (Rt(n), ur(T, D));
    })(e);
  }
}
function jo(e) {
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
function gr(e, t, n, s) {
  if (e != null && typeof e == "object" && e.W === gn) return e;
  if (!Array.isArray(e)) return n ? 2 & s ? ((e = t[Ai]) || (jt((e = new t()).u), e = t[Ai] = e), t = e) : t = new t() : t = void 0, t;
  let r = n = 0 | e[g];
  return r === 0 && (r |= 32 & s), r |= 2 & s, r !== n && G(e, r), new t(e);
}
function J2(e, t, n) {
  if (t) e: {
    if (!$n(t = e)) throw Bs("int64");
    switch (typeof t) {
      case "string":
        t = mr(t);
        break e;
      case "bigint":
        if (e = t = fr(64, t), Ti(e)) {
          if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e)) throw Error(String(e));
        } else if (H2(e) && !Number.isSafeInteger(e)) throw Error(String(e));
        t = zn ? BigInt(t) : V2(t) ? t ? "1" : "0" : Ti(t) ? t.trim() || "0" : String(t);
        break e;
      default:
        t = pr(t);
    }
  }
  else t = Pn(e);
  return typeof (n = (e = t) == null ? n ? 0 : void 0 : e) == "string" && Lt(t = +n) ? t : n;
}
const Q2 = {};
let Z2 = (function() {
  try {
    return nr(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
})();
class Ss {
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
const e1 = Z2 ? (Object.setPrototypeOf(Ss.prototype, Map.prototype), Object.defineProperties(Ss.prototype, { size: { value: 0, configurable: !0, enumerable: !0, writable: !0 } }), Ss) : class extends Map {
  constructor() {
    super();
  }
};
function Ci(e) {
  return e;
}
function Ts(e) {
  if (2 & e.L) throw Error("Cannot mutate an immutable Map");
}
var Ee = class extends e1 {
  constructor(e, t, n = Ci, s = Ci) {
    super();
    let r = 0 | e[g];
    r |= 64, G(e, r), this.L = r, this.S = t, this.R = n, this.Y = this.S ? t1 : s;
    for (let i = 0; i < e.length; i++) {
      const o = e[i], a = n(o[0], !1, !0);
      let h = o[1];
      t ? h === void 0 && (h = null) : h = s(o[1], !1, !0, void 0, void 0, r), super.set(a, h);
    }
  }
  na(e = Ii) {
    if (this.size !== 0) return this.X(e);
  }
  X(e = Ii) {
    const t = [], n = super.entries();
    for (var s; !(s = n.next()).done; ) (s = s.value)[0] = e(s[0]), s[1] = e(s[1]), t.push(s);
    return t;
  }
  clear() {
    Ts(this), super.clear();
  }
  delete(e) {
    return Ts(this), super.delete(this.R(e, !0, !1));
  }
  entries() {
    var e = this.ma();
    return new In(e, n1, this);
  }
  keys() {
    return this.Ha();
  }
  values() {
    var e = this.ma();
    return new In(e, Ee.prototype.get, this);
  }
  forEach(e, t) {
    super.forEach(((n, s) => {
      e.call(t, this.get(s), s, this);
    }));
  }
  set(e, t) {
    return Ts(this), (e = this.R(e, !0, !1)) == null ? this : t == null ? (super.delete(e), this) : super.set(e, this.Y(t, !0, !0, this.S, !1, this.L));
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
function t1(e, t, n, s, r, i) {
  return e = gr(e, s, n, i), r && (e = Yn(e)), e;
}
function Ii(e) {
  return e;
}
function n1(e) {
  return [e, this.get(e)];
}
let s1, zo, r1;
function Oi() {
  return s1 || (s1 = new Ee(jt([]), void 0, void 0, void 0, Q2));
}
function yr(e, t, n, s, r) {
  if (e != null) {
    if (Array.isArray(e)) e = Cn(e) ? void 0 : r && 2 & (0 | e[g]) ? e : _r(e, t, n, s !== void 0, r);
    else if (or(e)) {
      const i = {};
      for (let o in e) i[o] = yr(e[o], t, n, s, r);
      e = i;
    } else e = t(e, s);
    return e;
  }
}
function _r(e, t, n, s, r) {
  const i = s || n ? 0 | e[g] : 0, o = s ? !!(32 & i) : void 0;
  s = ie(e);
  for (let a = 0; a < s.length; a++) s[a] = yr(s[a], t, n, o, r);
  return n && ((e = hr(e)) && (s[Pt] = ie(e)), n(i, s)), s;
}
function i1(e) {
  return yr(e, Wo, void 0, void 0, !1);
}
function Wo(e) {
  return e.W === gn ? e.toJSON() : e instanceof Ee ? e.na(i1) : (function(t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "bigint":
        return Us(t) ? Number(t) : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (Cn(t)) return;
        } else {
          if (pn(t)) return vi(t);
          if (t instanceof $e) {
            const n = t.g;
            return n == null ? "" : typeof n == "string" ? n : t.g = vi(n);
          }
          if (t instanceof Ee) return t.na();
        }
    }
    return t;
  })(e);
}
function Xo(e) {
  return _r(e, Wo, void 0, void 0, !1);
}
function at(e, t, n) {
  return e = $o(e, t[0], t[1], n ? 1 : 2), t !== zo && n && Vn(e, 16384), e;
}
function $o(e, t, n, s) {
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
        if (or(n[i])) {
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
function Gs(e, t, n = Ns) {
  if (e != null) {
    if (Io && e instanceof Uint8Array) return t ? e : new Uint8Array(e);
    if (Array.isArray(e)) {
      var s = 0 | e[g];
      return 2 & s ? e : (t && (t = s === 0 || !!(32 & s) && !(64 & s || !(16 & s))), t ? (G(e, -12293 & (34 | s)), e) : _r(e, Gs, 4 & s ? Ns : n, !0, !0));
    }
    return e.W === gn ? e = 2 & (s = 0 | (n = e.u)[g]) ? e : new e.constructor(Kn(n, s, !0)) : e instanceof Ee && !(2 & e.L) && (n = jt(e.X(Gs)), e = new Ee(n, e.S, e.R, e.Y)), e;
  }
}
function Kn(e, t, n) {
  const s = n || 2 & t ? Ns : U2, r = !!(32 & t);
  return e = (function(i, o, a) {
    const h = ie(i);
    var c = h.length;
    const u = 256 & o ? h[c - 1] : void 0;
    for (c += u ? -1 : 0, o = 512 & o ? 1 : 0; o < c; o++) h[o] = a(h[o]);
    if (u) {
      o = h[o] = {};
      for (const l in u) o[l] = a(u[l]);
    }
    return (i = hr(i)) && (h[Pt] = ie(i)), h;
  })(e, t, ((i) => Gs(i, r, s))), Vn(e, 32 | (n ? 2 : 0)), e;
}
function Yn(e) {
  const t = e.u, n = 0 | t[g];
  return 2 & n ? new e.constructor(Kn(t, n, !1)) : e;
}
function Bt(e, t) {
  return Qe(e = e.u, 0 | e[g], t);
}
function Qe(e, t, n, s) {
  if (n === -1) return null;
  var r = n + (512 & t ? 0 : -1);
  const i = e.length - 1;
  return r >= i && 256 & t ? e[i][n] : s && 256 & t && (t = e[i][n]) != null ? (e[r] != null && ks != null && ((r = (e = D2 ?? (D2 = {}))[ks] || 0) >= 4 || (e[ks] = r + 1, Do(e = Error(), "incident"), (function(o) {
    bt.setTimeout((() => {
      throw o;
    }), 0);
  })(e))), t) : r <= i ? e[r] : void 0;
}
function F(e, t, n) {
  const s = e.u;
  let r = 0 | s[g];
  return lt(r), R(s, r, t, n), e;
}
function R(e, t, n, s) {
  const r = 512 & t ? 0 : -1, i = n + r;
  var o = e.length - 1;
  return i >= o && 256 & t ? (e[o][n] = s, t) : i <= o ? (e[i] = s, 256 & t && n in (e = e[o]) && delete e[n], t) : (s !== void 0 && (n >= (o = t >> 15 & 1023 || 536870912) ? s != null && (e[o + r] = { [n]: s }, G(e, t |= 256)) : e[i] = s), t);
}
function kn(e, t) {
  let n = 0 | (e = e.u)[g];
  const s = Qe(e, n, t), r = dt(s);
  return r != null && r !== s && R(e, n, t, r), r;
}
function Ko(e) {
  let t = 0 | (e = e.u)[g];
  const n = Qe(e, t, 1), s = ar(n, !0);
  return s != null && s !== n && R(e, t, 1, s), s;
}
function yt() {
  return G2 === void 0 ? 2 : 4;
}
function _t(e, t, n, s, r) {
  const i = e.u, o = 2 & (e = 0 | i[g]) ? 1 : s;
  r = !!r;
  let a = 0 | (s = wr(i, e, t))[g];
  if (!(4 & a)) {
    4 & a && (s = ie(s), a = Ke(a, e), e = R(i, e, t, s));
    let h = 0, c = 0;
    for (; h < s.length; h++) {
      const u = n(s[h]);
      u != null && (s[c++] = u);
    }
    c < h && (s.length = c), a = br(a, e), n = -4097 & (20 | a), a = n &= -8193, G(s, a), 2 & a && Object.freeze(s);
  }
  return o === 1 || o === 4 && 32 & a ? We(a) || (r = a, a |= 2, a !== r && G(s, a), Object.freeze(s)) : (o === 2 && We(a) && (s = ie(s), a = Ke(a, e), a = ht(a, e, r), G(s, a), e = R(i, e, t, s)), We(a) || (t = a, a = ht(a, e, r), a !== t && G(s, a))), s;
}
function wr(e, t, n, s) {
  return e = Qe(e, t, n, s), Array.isArray(e) ? e : ir;
}
function br(e, t) {
  return e === 0 && (e = Ke(e, t)), 1 | e;
}
function We(e) {
  return !!(2 & e) && !!(4 & e) || !!(2048 & e);
}
function Yo(e) {
  e = ie(e);
  for (let t = 0; t < e.length; t++) {
    const n = e[t] = ie(e[t]);
    Array.isArray(n[1]) && (n[1] = jt(n[1]));
  }
  return e;
}
function Hs(e, t, n, s) {
  let r = 0 | (e = e.u)[g];
  lt(r), R(e, r, t, (s === "0" ? Number(n) === 0 : n === s) ? void 0 : n);
}
function Xt(e, t, n, s, r) {
  lt(t);
  var i = !(!(64 & t) && 16384 & t);
  const o = (r = wr(e, t, n, r)) !== ir;
  if (i || !o) {
    let a = i = o ? 0 | r[g] : 0;
    (!o || 2 & a || We(a) || 4 & a && !(32 & a)) && (r = ie(r), a = Ke(a, t), t = R(e, t, n, r)), a = -13 & br(a, t), a = ht(s ? -17 & a : 16 | a, t, !0), a !== i && G(r, a);
  }
  return r;
}
function Fs(e, t) {
  var n = Na;
  return Er(vr(e = e.u), e, 0 | e[g], n) === t ? t : -1;
}
function vr(e) {
  if (Hn) return e[nn] ?? (e[nn] = /* @__PURE__ */ new Map());
  if (nn in e) return e[nn];
  const t = /* @__PURE__ */ new Map();
  return Object.defineProperty(e, nn, { value: t }), t;
}
function qo(e, t, n, s) {
  const r = vr(e), i = Er(r, e, t, n);
  return i !== s && (i && (t = R(e, t, i)), r.set(n, s)), t;
}
function Er(e, t, n, s) {
  let r = e.get(s);
  if (r != null) return r;
  r = 0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    Qe(t, n, o) != null && (r !== 0 && (n = R(t, n, r)), r = o);
  }
  return e.set(s, r), r;
}
function Ar(e, t, n, s) {
  let r, i = 0 | e[g];
  if ((s = Qe(e, i, n, s)) != null && s.W === gn) return (t = Yn(s)) !== s && R(e, i, n, t), t.u;
  if (Array.isArray(s)) {
    const o = 0 | s[g];
    r = 2 & o ? at(Kn(s, o, !1), t, !0) : 64 & o ? s : at(r, t, !0);
  } else r = at(void 0, t, !0);
  return r !== s && R(e, i, n, r), r;
}
function Jo(e, t, n, s) {
  let r = 0 | (e = e.u)[g];
  return (t = gr(s = Qe(e, r, n, s), t, !1, r)) !== s && t != null && R(e, r, n, t), t;
}
function E(e, t, n, s = !1) {
  if ((t = Jo(e, t, n, s)) == null) return t;
  if (!(2 & (s = 0 | (e = e.u)[g]))) {
    const r = Yn(t);
    r !== t && R(e, s, n, t = r);
  }
  return t;
}
function Qo(e, t, n, s, r, i, o) {
  e = e.u;
  var a = !!(2 & t);
  const h = a ? 1 : r;
  i = !!i, o && (o = !a);
  var c = 0 | (r = wr(e, t, s))[g];
  if (!(a = !!(4 & c))) {
    var u = r, l = t;
    const w = !!(2 & (c = br(c, t)));
    w && (l |= 2);
    let M = !w, X = !0, he = 0, Y = 0;
    for (; he < u.length; he++) {
      const ce = gr(u[he], n, !1, l);
      if (ce instanceof n) {
        if (!w) {
          const Fe = !!(2 & (0 | ce.u[g]));
          M && (M = !Fe), X && (X = Fe);
        }
        u[Y++] = ce;
      }
    }
    Y < he && (u.length = Y), c |= 4, c = X ? 16 | c : -17 & c, G(u, c = M ? 8 | c : -9 & c), w && Object.freeze(u);
  }
  if (o && !(8 & c || !r.length && (h === 1 || h === 4 && 32 & c))) {
    for (We(c) && (r = ie(r), c = Ke(c, t), t = R(e, t, s, r)), n = r, o = c, u = 0; u < n.length; u++) (c = n[u]) !== (l = Yn(c)) && (n[u] = l);
    o |= 8, G(n, o = n.length ? -17 & o : 16 | o), c = o;
  }
  return h === 1 || h === 4 && 32 & c ? We(c) || (t = c, (c |= !r.length || 16 & c && (!a || 32 & c) ? 2 : 2048) !== t && G(r, c), Object.freeze(r)) : (h === 2 && We(c) && (G(r = ie(r), c = ht(c = Ke(c, t), t, i)), t = R(e, t, s, r)), We(c) || (s = c, (c = ht(c, t, i)) !== s && G(r, c))), r;
}
function qe(e, t, n) {
  const s = 0 | e.u[g];
  return Qo(e, s, t, n, yt(), !1, !(2 & s));
}
function y(e, t, n, s) {
  return s == null && (s = void 0), F(e, n, s);
}
function an(e, t, n, s) {
  s == null && (s = void 0);
  e: {
    let r = 0 | (e = e.u)[g];
    if (lt(r), s == null) {
      const i = vr(e);
      if (Er(i, e, r, n) !== t) break e;
      i.set(n, 0);
    } else r = qo(e, r, n, t);
    R(e, r, t, s);
  }
}
function Ke(e, t) {
  return -2049 & (e = 32 | (2 & t ? 2 | e : -3 & e));
}
function ht(e, t, n) {
  return 32 & t && n || (e &= -33), e;
}
function Rn(e, t, n, s) {
  const r = 0 | e.u[g];
  lt(r), e = Qo(e, r, n, t, 2, !0), s = s ?? new n(), e.push(s), e[g] = 2 & (0 | s.u[g]) ? -9 & e[g] : -17 & e[g];
}
function ve(e, t) {
  return zt(Bt(e, t));
}
function Ae(e, t) {
  return Dt(Bt(e, t));
}
function N(e, t) {
  return kn(e, t) ?? 0;
}
function dn(e, t, n) {
  if (n != null && typeof n != "boolean") throw e = typeof n, Error(`Expected boolean but got ${e != "object" ? e : n ? Array.isArray(n) ? "array" : e : "null"}: ${n}`);
  F(e, t, n);
}
function Ue(e, t, n) {
  if (n != null) {
    if (typeof n != "number" || !Xn(n)) throw Bs("int32");
    n |= 0;
  }
  F(e, t, n);
}
function p(e, t, n) {
  if (n != null && typeof n != "number") throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  F(e, t, n);
}
function Dn(e, t, n) {
  {
    const o = e.u;
    let a = 0 | o[g];
    if (lt(a), n == null) R(o, a, t);
    else {
      var s = e = 0 | n[g], r = We(e), i = r || Object.isFrozen(n);
      for (r || (e = 0), i || (n = ie(n), s = 0, e = ht(e = Ke(e, a), a, !0), i = !1), e |= 21, r = 0; r < n.length; r++) {
        const h = n[r], c = jo(h);
        Object.is(h, c) || (i && (n = ie(n), s = 0, e = ht(e = Ke(e, a), a, !0), i = !1), n[r] = c);
      }
      e !== s && (i && (n = ie(n), e = ht(e = Ke(e, a), a, !0)), G(n, e)), R(o, a, t, n);
    }
  }
}
function qn(e, t, n) {
  lt(0 | e.u[g]), _t(e, t, Dt, 2, !0).push(jo(n));
}
function Zo(e, t) {
  return Error(`Invalid wire type: ${e} (at position ${t})`);
}
function kr() {
  return Error("Failed to read varint, encoding is invalid.");
}
function ea(e, t) {
  return Error(`Tried to read past the end of the data ${t} > ${e}`);
}
function Sr(e) {
  if (typeof e == "string") return { buffer: Po(e), N: !1 };
  if (Array.isArray(e)) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === Uint8Array) return { buffer: e, N: !1 };
  if (e.constructor === ArrayBuffer) return { buffer: new Uint8Array(e), N: !1 };
  if (e.constructor === $e) return { buffer: sr(e) || new Uint8Array(0), N: !0 };
  if (e instanceof Uint8Array) return { buffer: new Uint8Array(e.buffer, e.byteOffset, e.byteLength), N: !1 };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function Tr(e, t) {
  let n, s = 0, r = 0, i = 0;
  const o = e.h;
  let a = e.g;
  do
    n = o[a++], s |= (127 & n) << i, i += 7;
  while (i < 32 && 128 & n);
  for (i > 32 && (r |= (127 & n) >> 4), i = 3; i < 32 && 128 & n; i += 7) n = o[a++], r |= (127 & n) << i;
  if (wt(e, a), n < 128) return t(s >>> 0, r >>> 0);
  throw kr();
}
function Fr(e) {
  let t = 0, n = e.g;
  const s = n + 10, r = e.h;
  for (; n < s; ) {
    const i = r[n++];
    if (t |= i, (128 & i) == 0) return wt(e, n), !!(127 & t);
  }
  throw kr();
}
function ct(e) {
  const t = e.h;
  let n = e.g, s = t[n++], r = 127 & s;
  if (128 & s && (s = t[n++], r |= (127 & s) << 7, 128 & s && (s = t[n++], r |= (127 & s) << 14, 128 & s && (s = t[n++], r |= (127 & s) << 21, 128 & s && (s = t[n++], r |= s << 28, 128 & s && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++]))))) throw kr();
  return wt(e, n), r;
}
function Je(e) {
  return ct(e) >>> 0;
}
function Vs(e) {
  var t = e.h;
  const n = e.g, s = t[n], r = t[n + 1], i = t[n + 2];
  return t = t[n + 3], wt(e, e.g + 4), (s << 0 | r << 8 | i << 16 | t << 24) >>> 0;
}
function js(e) {
  var t = Vs(e);
  e = 2 * (t >> 31) + 1;
  const n = t >>> 23 & 255;
  return t &= 8388607, n == 255 ? t ? NaN : e * (1 / 0) : n == 0 ? 1401298464324817e-60 * e * t : e * Math.pow(2, n - 150) * (t + 8388608);
}
function o1(e) {
  return ct(e);
}
function Ls(e, t, { ba: n = !1 } = {}) {
  e.ba = n, t && (t = Sr(t), e.h = t.buffer, e.m = t.N, e.j = 0, e.l = e.h.length, e.g = e.j);
}
function wt(e, t) {
  if (e.g = t, t > e.l) throw ea(e.l, t);
}
function ta(e, t) {
  if (t < 0) throw Error(`Tried to read a negative byte length: ${t}`);
  const n = e.g, s = n + t;
  if (s > e.l) throw ea(t, e.l - n);
  return e.g = s, n;
}
function na(e, t) {
  if (t == 0) return vt();
  var n = ta(e, t);
  return e.ba && e.m ? n = e.h.subarray(n, n + t) : (e = e.h, n = n === (t = n + t) ? new Uint8Array(0) : $2 ? e.slice(n, t) : new Uint8Array(e.subarray(n, t))), n.length == 0 ? vt() : new $e(n, Ot);
}
Ee.prototype.toJSON = void 0, Ee.prototype.Ia = Uo;
var Pi = [];
function sa(e) {
  var t = e.g;
  if (t.g == t.l) return !1;
  e.l = e.g.g;
  var n = Je(e.g);
  if (t = n >>> 3, !((n &= 7) >= 0 && n <= 5)) throw Zo(n, e.l);
  if (t < 1) throw Error(`Invalid field number: ${t} (at position ${e.l})`);
  return e.m = t, e.h = n, !0;
}
function Sn(e) {
  switch (e.h) {
    case 0:
      e.h != 0 ? Sn(e) : Fr(e.g);
      break;
    case 1:
      wt(e = e.g, e.g + 8);
      break;
    case 2:
      if (e.h != 2) Sn(e);
      else {
        var t = Je(e.g);
        wt(e = e.g, e.g + t);
      }
      break;
    case 5:
      wt(e = e.g, e.g + 4);
      break;
    case 3:
      for (t = e.m; ; ) {
        if (!sa(e)) throw Error("Unmatched start-group tag: stream EOF");
        if (e.h == 4) {
          if (e.m != t) throw Error("Unmatched end-group tag");
          break;
        }
        Sn(e);
      }
      break;
    default:
      throw Zo(e.h, e.l);
  }
}
function yn(e, t, n) {
  const s = e.g.l, r = Je(e.g), i = e.g.g + r;
  let o = i - s;
  if (o <= 0 && (e.g.l = i, n(t, e, void 0, void 0, void 0), o = i - e.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${r} bytes, instead read ${r - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return e.g.g = i, e.g.l = s, t;
}
function Lr(e) {
  var t = Je(e.g), n = ta(e = e.g, t);
  if (e = e.h, L2) {
    var s, r = e;
    (s = bs) || (s = bs = new TextDecoder("utf-8", { fatal: !0 })), t = n + t, r = n === 0 && t === r.length ? r : r.subarray(n, t);
    try {
      var i = s.decode(r);
    } catch (a) {
      if (wn === void 0) {
        try {
          s.decode(new Uint8Array([128]));
        } catch {
        }
        try {
          s.decode(new Uint8Array([97])), wn = !0;
        } catch {
          wn = !1;
        }
      }
      throw !wn && (bs = void 0), a;
    }
  } else {
    t = (i = n) + t, n = [];
    let a, h = null;
    for (; i < t; ) {
      var o = e[i++];
      o < 128 ? n.push(o) : o < 224 ? i >= t ? mt() : (a = e[i++], o < 194 || (192 & a) != 128 ? (i--, mt()) : n.push((31 & o) << 6 | 63 & a)) : o < 240 ? i >= t - 1 ? mt() : (a = e[i++], (192 & a) != 128 || o === 224 && a < 160 || o === 237 && a >= 160 || (192 & (s = e[i++])) != 128 ? (i--, mt()) : n.push((15 & o) << 12 | (63 & a) << 6 | 63 & s)) : o <= 244 ? i >= t - 2 ? mt() : (a = e[i++], (192 & a) != 128 || a - 144 + (o << 28) >> 30 != 0 || (192 & (s = e[i++])) != 128 || (192 & (r = e[i++])) != 128 ? (i--, mt()) : (o = (7 & o) << 18 | (63 & a) << 12 | (63 & s) << 6 | 63 & r, o -= 65536, n.push(55296 + (o >> 10 & 1023), 56320 + (1023 & o)))) : mt(), n.length >= 8192 && (h = yi(h, n), n.length = 0);
    }
    i = yi(h, n);
  }
  return i;
}
function ra(e) {
  const t = Je(e.g);
  return na(e.g, t);
}
function Jn(e, t, n) {
  var s = Je(e.g);
  for (s = e.g.g + s; e.g.g < s; ) n.push(t(e.g));
}
var bn = [];
function a1(e) {
  return e;
}
let xt;
function Me(e, t, n) {
  t.g ? t.m(e, t.g, t.h, n) : t.m(e, t.h, n);
}
var f = class {
  constructor(e, t) {
    this.u = $o(e, t);
  }
  toJSON() {
    const e = !xt;
    try {
      return e && (xt = Xo), ia(this);
    } finally {
      e && (xt = void 0);
    }
  }
  l() {
    var e = j1;
    return e.g ? e.l(this, e.g, e.h, !0) : e.l(this, e.h, e.defaultValue, !0);
  }
  clone() {
    const e = this.u;
    return new this.constructor(Kn(e, 0 | e[g], !1));
  }
  N() {
    return !!(2 & (0 | this.u[g]));
  }
};
function ia(e) {
  var t = e.u;
  {
    t = (e = xt(t)) !== t;
    let c = e.length;
    if (c) {
      var n = e[c - 1], s = or(n);
      s ? c-- : n = void 0;
      var r = e;
      if (s) {
        e: {
          var i, o = n, a = !1;
          if (o) for (let u in o) isNaN(+u) ? (i ?? (i = {}))[u] = o[u] : (s = o[u], Array.isArray(s) && (Cn(s) || ki(s) && s.size === 0) && (s = null), s == null && (a = !0), s != null && ((i ?? (i = {}))[u] = s));
          if (a || (i = o), i) for (let u in i) {
            a = i;
            break e;
          }
          a = null;
        }
        o = a == null ? n != null : a !== n;
      }
      for (; c > 0 && ((i = r[c - 1]) == null || Cn(i) || ki(i) && i.size === 0); c--) var h = !0;
      (r !== e || o || h) && (t ? (h || o || a) && (r.length = c) : r = Array.prototype.slice.call(r, 0, c), a && r.push(a)), h = r;
    } else h = e;
  }
  return h;
}
function Ri(e) {
  return e ? /^\d+$/.test(e) ? (Wn(e), new zs(T, D)) : null : h1 || (h1 = new zs(0, 0));
}
f.prototype.W = gn, f.prototype.toString = function() {
  try {
    return xt = a1, ia(this).toString();
  } finally {
    xt = void 0;
  }
};
var zs = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let h1;
function Di(e) {
  return e ? /^-?\d+$/.test(e) ? (Wn(e), new Ws(T, D)) : null : c1 || (c1 = new Ws(0, 0));
}
var Ws = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let c1;
function Mt(e, t, n) {
  for (; n > 0 || t > 127; ) e.g.push(127 & t | 128), t = (t >>> 7 | n << 25) >>> 0, n >>>= 7;
  e.g.push(t);
}
function $t(e, t) {
  for (; t > 127; ) e.g.push(127 & t | 128), t >>>= 7;
  e.g.push(t);
}
function Qn(e, t) {
  if (t >= 0) $t(e, t);
  else {
    for (let n = 0; n < 9; n++) e.g.push(127 & t | 128), t >>= 7;
    e.g.push(1);
  }
}
function fn(e, t) {
  e.g.push(t >>> 0 & 255), e.g.push(t >>> 8 & 255), e.g.push(t >>> 16 & 255), e.g.push(t >>> 24 & 255);
}
function Nt(e, t) {
  t.length !== 0 && (e.l.push(t), e.h += t.length);
}
function pe(e, t, n) {
  $t(e.g, 8 * t + n);
}
function xr(e, t) {
  return pe(e, t, 2), t = e.g.end(), Nt(e, t), t.push(e.h), t;
}
function Mr(e, t) {
  var n = t.pop();
  for (n = e.h + e.g.length() - n; n > 127; ) t.push(127 & n | 128), n >>>= 7, e.h++;
  t.push(n), e.h++;
}
function Zn(e, t, n) {
  pe(e, t, 2), $t(e.g, n.length), Nt(e, e.g.end()), Nt(e, n);
}
function Bn(e, t, n, s) {
  n != null && (t = xr(e, t), s(n, e), Mr(e, t));
}
function Ce() {
  const e = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(e, e.prototype), e;
}
var Cr = Ce(), oa = Ce(), Ir = Ce(), Or = Ce(), aa = Ce(), ha = Ce(), Pr = Ce(), ca = Ce(), ua = Ce(), Kt = class {
  constructor(e, t, n) {
    this.g = e, this.h = t, e = Cr, this.l = !!e && n === e || !1;
  }
};
function es(e, t) {
  return new Kt(e, t, Cr);
}
function la(e, t, n, s, r) {
  Bn(e, n, ma(t, s), r);
}
const u1 = es((function(e, t, n, s, r) {
  return e.h === 2 && (yn(e, Ar(t, s, n), r), !0);
}), la), l1 = es((function(e, t, n, s, r) {
  return e.h === 2 && (yn(e, Ar(t, s, n, !0), r), !0);
}), la);
var ts = Symbol(), Rr = Symbol(), Bi = Symbol(), Ni = Symbol();
let da, fa;
function Et(e, t, n, s) {
  var r = s[e];
  if (r) return r;
  (r = {}).Pa = s, r.V = (function(l) {
    switch (typeof l) {
      case "boolean":
        return zo || (zo = [0, void 0, !0]);
      case "number":
        return l > 0 ? void 0 : l === 0 ? r1 || (r1 = [0, void 0]) : [-l, void 0];
      case "string":
        return [0, l];
      case "object":
        return l;
    }
  })(s[0]);
  var i = s[1];
  let o = 1;
  i && i.constructor === Object && (r.ga = i, typeof (i = s[++o]) == "function" && (r.la = !0, da ?? (da = i), fa ?? (fa = s[o + 1]), i = s[o += 2]));
  const a = {};
  for (; i && Array.isArray(i) && i.length && typeof i[0] == "number" && i[0] > 0; ) {
    for (var h = 0; h < i.length; h++) a[i[h]] = i;
    i = s[++o];
  }
  for (h = 1; i !== void 0; ) {
    let l;
    typeof i == "number" && (h += i, i = s[++o]);
    var c = void 0;
    if (i instanceof Kt ? l = i : (l = u1, o--), l == null ? void 0 : l.l) {
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
function pa(e) {
  return Array.isArray(e) ? e[0] instanceof Kt ? e : [l1, e] : [e, void 0];
}
function ma(e, t) {
  return e instanceof f ? e.u : Array.isArray(e) ? at(e, t, !1) : void 0;
}
function Dr(e, t, n, s) {
  const r = n.g;
  e[t] = s ? (i, o, a) => r(i, o, a, s) : r;
}
function Br(e, t, n, s, r) {
  const i = n.g;
  let o, a;
  e[t] = (h, c, u) => i(h, c, u, a || (a = Et(Rr, Dr, Br, s).V), o || (o = Nr(s)), r);
}
function Nr(e) {
  let t = e[Bi];
  if (t != null) return t;
  const n = Et(Rr, Dr, Br, e);
  return t = n.la ? (s, r) => da(s, r, n) : (s, r) => {
    const i = 0 | s[g];
    for (; sa(r) && r.h != 4; ) {
      var o = r.m, a = n[o];
      if (a == null) {
        var h = n.ga;
        h && (h = h[o]) && (h = d1(h)) != null && (a = n[o] = h);
      }
      a != null && a(r, s, o) || (o = (a = r).l, Sn(a), a.fa ? a = void 0 : (h = a.g.g - o, a.g.g = o, a = na(a.g, h)), o = s, a && ((h = o[Pt]) ? h.push(a) : o[Pt] = [a]));
    }
    return 16384 & i && jt(s), !0;
  }, e[Bi] = t;
}
function d1(e) {
  const t = (e = pa(e))[0].g;
  if (e = e[1]) {
    const n = Nr(e), s = Et(Rr, Dr, Br, e).V;
    return (r, i, o) => t(r, i, o, s, n);
  }
  return t;
}
function ns(e, t, n) {
  e[t] = n.h;
}
function ss(e, t, n, s) {
  let r, i;
  const o = n.h;
  e[t] = (a, h, c) => o(a, h, c, i || (i = Et(ts, ns, ss, s).V), r || (r = ga(s)));
}
function ga(e) {
  let t = e[Ni];
  if (!t) {
    const n = Et(ts, ns, ss, e);
    t = (s, r) => ya(s, r, n), e[Ni] = t;
  }
  return t;
}
function ya(e, t, n) {
  for (var s = 0 | e[g], r = 512 & s ? 0 : -1, i = e.length, o = 512 & s ? 1 : 0, a = i + (256 & s ? -1 : 0); o < a; o++) {
    const h = e[o];
    if (h == null) continue;
    const c = o - r, u = Ui(n, c);
    u && u(t, h, c);
  }
  if (256 & s) {
    s = e[i - 1];
    for (const h in s) r = +h, Number.isNaN(r) || (i = s[r]) != null && (a = Ui(n, r)) && a(t, i, r);
  }
  if (e = hr(e)) for (Nt(t, t.g.end()), n = 0; n < e.length; n++) Nt(t, sr(e[n]) || new Uint8Array(0));
}
function Ui(e, t) {
  var n = e[t];
  if (n) return n;
  if ((n = e.ga) && (n = n[t])) {
    var s = (n = pa(n))[0].h;
    if (n = n[1]) {
      const r = ga(n), i = Et(ts, ns, ss, n).V;
      n = e.la ? fa(i, r) : (o, a, h) => s(o, a, h, i, r);
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
function ee(e, t, n) {
  return new Kt(e, t, n);
}
function qt(e, t, n) {
  return new Kt(e, t, n);
}
function te(e, t, n) {
  R(e, 0 | e[g], t, n);
}
var f1 = es((function(e, t, n, s, r) {
  return e.h === 2 && (e = yn(e, at([void 0, void 0], s, !0), r), lt(s = 0 | t[g]), (r = Qe(t, s, n)) instanceof Ee ? (2 & r.L) != 0 ? ((r = r.X()).push(e), R(t, s, n, r)) : r.Na(e) : Array.isArray(r) ? (2 & (0 | r[g]) && R(t, s, n, r = Yo(r)), r.push(e)) : R(t, s, n, [e]), !0);
}), (function(e, t, n, s, r) {
  if (t instanceof Ee) t.forEach(((i, o) => {
    Bn(e, n, at([o, i], s, !1), r);
  }));
  else if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
    const o = t[i];
    Array.isArray(o) && Bn(e, n, at(o, s, !1), r);
  }
}));
function _a(e, t, n) {
  if (t = (function(s) {
    if (s == null) return s;
    const r = typeof s;
    if (r === "bigint") return String(fr(64, s));
    if ($n(s)) {
      if (r === "string") return mr(s);
      if (r === "number") return pr(s);
    }
  })(t), t != null && (typeof t == "string" && Di(t), t != null))
    switch (pe(e, n, 0), typeof t) {
      case "number":
        e = e.g, Rt(t), Mt(e, T, D);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new Ws(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), Mt(e.g, n.h, n.g);
        break;
      default:
        n = Di(t), Mt(e.g, n.h, n.g);
    }
}
function wa(e, t, n) {
  (t = zt(t)) != null && t != null && (pe(e, n, 0), Qn(e.g, t));
}
function ba(e, t, n) {
  (t = Ho(t)) != null && (pe(e, n, 0), e.g.g.push(t ? 1 : 0));
}
function va(e, t, n) {
  (t = Dt(t)) != null && Zn(e, n, xo(t));
}
function Ea(e, t, n, s, r) {
  Bn(e, n, ma(t, s), r);
}
function Aa(e, t, n) {
  (t = t == null || typeof t == "string" || pn(t) || t instanceof $e ? t : void 0) != null && Zn(e, n, Sr(t).buffer);
}
function ka(e, t, n) {
  return (e.h === 5 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Jn(e, js, t) : t.push(js(e.g)), !0);
}
var je = ee((function(e, t, n) {
  if (e.h !== 1) return !1;
  var s = e.g;
  e = Vs(s);
  const r = Vs(s);
  s = 2 * (r >> 31) + 1;
  const i = r >>> 20 & 2047;
  return e = 4294967296 * (1048575 & r) + e, te(t, n, i == 2047 ? e ? NaN : s * (1 / 0) : i == 0 ? 5e-324 * s * e : s * Math.pow(2, i - 1075) * (e + 4503599627370496)), !0;
}), (function(e, t, n) {
  (t = dt(t)) != null && (pe(e, n, 1), e = e.g, (n = Go || (Go = new DataView(new ArrayBuffer(8)))).setFloat64(0, +t, !0), T = n.getUint32(0, !0), D = n.getUint32(4, !0), fn(e, T), fn(e, D));
}), Ce()), H = ee((function(e, t, n) {
  return e.h === 5 && (te(t, n, js(e.g)), !0);
}), (function(e, t, n) {
  (t = dt(t)) != null && (pe(e, n, 5), e = e.g, cr(t), fn(e, T));
}), Pr), p1 = qt(ka, (function(e, t, n) {
  if ((t = Yt(dt, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (pe(s, r, 5), s = s.g, cr(i), fn(s, T));
  }
}), Pr), Ur = qt(ka, (function(e, t, n) {
  if ((t = Yt(dt, t)) != null && t.length) {
    pe(e, n, 2), $t(e.g, 4 * t.length);
    for (let s = 0; s < t.length; s++) n = e.g, cr(t[s]), fn(n, T);
  }
}), Pr), ut = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, Tr(e.g, lr)), !0);
}), _a, ha), xs = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, (e = Tr(e.g, lr)) === 0 ? void 0 : e), !0);
}), _a, ha), m1 = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, Tr(e.g, ur)), !0);
}), (function(e, t, n) {
  if ((t = q2(t)) != null && (typeof t == "string" && Ri(t), t != null))
    switch (pe(e, n, 0), typeof t) {
      case "number":
        e = e.g, Rt(t), Mt(e, T, D);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new zs(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), Mt(e.g, n.h, n.g);
        break;
      default:
        n = Ri(t), Mt(e.g, n.h, n.g);
    }
}), Ce()), B = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, ct(e.g)), !0);
}), wa, Or), rs = qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Jn(e, ct, t) : t.push(ct(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(zt, t)) != null && t.length) {
    n = xr(e, n);
    for (let s = 0; s < t.length; s++) Qn(e.g, t[s]);
    Mr(e, n);
  }
}), Or), Ft = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, (e = ct(e.g)) === 0 ? void 0 : e), !0);
}), wa, Or), I = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, Fr(e.g)), !0);
}), ba, oa), Ct = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, (e = Fr(e.g)) === !1 ? void 0 : e), !0);
}), ba, oa), Q = qt((function(e, t, n) {
  return e.h === 2 && (e = Lr(e), Xt(t, 0 | t[g], n, !1).push(e), !0);
}), (function(e, t, n) {
  if ((t = Yt(Dt, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && Zn(s, r, xo(i));
  }
}), Ir), ot = ee((function(e, t, n) {
  return e.h === 2 && (te(t, n, (e = Lr(e)) === "" ? void 0 : e), !0);
}), va, Ir), k = ee((function(e, t, n) {
  return e.h === 2 && (te(t, n, Lr(e)), !0);
}), va, Ir), z = (function(e, t, n = Cr) {
  return new Kt(e, t, n);
})((function(e, t, n, s, r) {
  return e.h === 2 && (s = at(void 0, s, !0), Xt(t, 0 | t[g], n, !0).push(s), yn(e, s, r), !0);
}), (function(e, t, n, s, r) {
  if (Array.isArray(t)) for (let i = 0; i < t.length; i++) Ea(e, t[i], n, s, r);
})), S = es((function(e, t, n, s, r, i) {
  return e.h === 2 && (qo(t, 0 | t[g], i, n), yn(e, t = Ar(t, s, n), r), !0);
}), Ea), Sa = ee((function(e, t, n) {
  return e.h === 2 && (te(t, n, ra(e)), !0);
}), Aa, ca), g1 = qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Jn(e, Je, t) : t.push(Je(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(Vo, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (pe(s, r, 0), $t(s.g, i));
  }
}), aa), y1 = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, (e = Je(e.g)) === 0 ? void 0 : e), !0);
}), (function(e, t, n) {
  (t = Vo(t)) != null && t != null && (pe(e, n, 0), $t(e.g, t));
}), aa), ke = ee((function(e, t, n) {
  return e.h === 0 && (te(t, n, ct(e.g)), !0);
}), (function(e, t, n) {
  (t = zt(t)) != null && (t = parseInt(t, 10), pe(e, n, 0), Qn(e.g, t));
}), ua);
class _1 {
  constructor(t, n) {
    this.h = t, this.g = n, this.l = E, this.m = y, this.defaultValue = void 0;
  }
}
function Ie(e, t) {
  return new _1(e, t);
}
function ft(e, t) {
  return (n, s) => {
    if (bn.length) {
      const i = bn.pop();
      i.o(s), Ls(i.g, n, s), n = i;
    } else n = new class {
      constructor(i, o) {
        if (Pi.length) {
          const a = Pi.pop();
          Ls(a, i, o), i = a;
        } else i = new class {
          constructor(a, h) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, Ls(this, a, h);
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
      Nr(t)(o, n);
      var r = i;
    } finally {
      n.g.clear(), n.m = -1, n.h = -1, bn.length < 100 && bn.push(n);
    }
    return r;
  };
}
function is(e) {
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
    ya(this.u, t, Et(ts, ns, ss, e)), Nt(t, t.g.end());
    const n = new Uint8Array(t.h), s = t.l, r = s.length;
    let i = 0;
    for (let o = 0; o < r; o++) {
      const a = s[o];
      n.set(a, i), i += a.length;
    }
    return t.l = [n], n;
  };
}
var Gi = class extends f {
  constructor(e) {
    super(e);
  }
}, Hi = [0, ot, ee((function(e, t, n) {
  return e.h === 2 && (te(t, n, (e = ra(e)) === vt() ? void 0 : e), !0);
}), (function(e, t, n) {
  if (t != null) {
    if (t instanceof f) {
      const s = t.Ra;
      return void (s && (t = s(t), t != null && Zn(e, n, Sr(t).buffer)));
    }
    if (Array.isArray(t)) return;
  }
  Aa(e, t, n);
}), ca)];
let Ms, Vi = globalThis.trustedTypes;
function ji(e) {
  Ms === void 0 && (Ms = (function() {
    let n = null;
    if (!Vi) return n;
    try {
      const s = (r) => r;
      n = Vi.createPolicy("goog#html", { createHTML: s, createScript: s, createScriptURL: s });
    } catch {
    }
    return n;
  })());
  var t = Ms;
  return new class {
    constructor(n) {
      this.g = n;
    }
    toString() {
      return this.g + "";
    }
  }(t ? t.createScriptURL(e) : e);
}
function w1(e, ...t) {
  if (t.length === 0) return ji(e[0]);
  let n = e[0];
  for (let s = 0; s < t.length; s++) n += encodeURIComponent(t[s]) + e[s + 1];
  return ji(n);
}
var Ta = [0, B, ke, I, -1, rs, ke, -1], b1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Fa = [0, I, k, I, ke, -1, qt((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Xt(t, 0 | t[g], n, !1, !1), e.h == 2 ? Jn(e, o1, t) : t.push(ct(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Yt(zt, t)) != null && t.length) {
    n = xr(e, n);
    for (let s = 0; s < t.length; s++) Qn(e.g, t[s]);
    Mr(e, n);
  }
}), ua), k, -1, [0, I, -1], ke, I, -1], La = [0, k, -2], zi = class extends f {
  constructor(e) {
    super(e);
  }
}, xa = [0], Ma = [0, B, I, 1, I, -3], fe = class extends f {
  constructor(e) {
    super(e, 2);
  }
}, V = {};
V[336783863] = [0, k, I, -1, B, [0, [1, 2, 3, 4, 5, 6, 7, 8], S, xa, S, Fa, S, La, S, Ma, S, Ta, S, [0, k, -2], S, [0, k, ke], S, [0, ke, k]], [0, k], I, [0, [1, 3], [2, 4], S, [0, rs], -1, S, [0, Q], -1, z, [0, k, -1]], k];
var Wi = [0, xs, -1, Ct, -3, xs, rs, ot, Ft, xs, -1, Ct, Ft, Ct, -2, ot];
function me(e, t) {
  Hs(e, 2, Wt(t), "");
}
function L(e, t) {
  qn(e, 3, t);
}
function v(e, t) {
  qn(e, 4, t);
}
var Z = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 7, e);
  }
}, hn = [-1, {}], Xi = [0, k, 1, hn], $i = [0, k, Q, hn];
function ge(e, t) {
  Rn(e, 1, Z, t);
}
function x(e, t) {
  qn(e, 10, t);
}
function A(e, t) {
  qn(e, 15, t);
}
var ae = class extends f {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return y(this, 0, 1001, e);
  }
}, Ca = [-500, z, [-500, ot, -1, Q, -3, [-2, V, I], z, Hi, Ft, -1, Xi, $i, z, [0, ot, Ct], ot, Wi, Ft, Q, 987, Q], 4, z, [-500, k, -1, [-1, {}], 998, k], z, [-500, k, Q, -1, [-2, {}, I], 997, Q, -1], Ft, z, [-500, k, Q, hn, 998, Q], Q, Ft, Xi, $i, z, [0, ot, -1, hn], Q, -2, Wi, ot, -1, Ct, [0, Ct, y1], 978, hn, z, Hi];
ae.prototype.g = is(Ca);
var v1 = ft(ae, Ca), E1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Ia = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return qe(this, E1, 1);
  }
}, Oa = [0, z, [0, B, H, k, -1]], os = ft(Ia, Oa), A1 = class extends f {
  constructor(e) {
    super(e);
  }
}, k1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Cs = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, A1, 2);
  }
  g() {
    return qe(this, k1, 5);
  }
}, Pa = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, Q, rs, Ur, [0, ke, [0, B, -3], [0, H, -3], [0, B, -1, [0, z, [0, B, -2]]], z, [0, H, -1, k, H]], k, -1, ut, z, [0, B, H], Q, ut]), Ra = class extends f {
  constructor(e) {
    super(e);
  }
}, It = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, H, -4]]), Da = class extends f {
  constructor(e) {
    super(e);
  }
}, _n = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, H, -4]]), S1 = class extends f {
  constructor(e) {
    super(e);
  }
}, T1 = [0, B, -1, Ur, ke], Ba = class extends f {
  constructor(e) {
    super(e);
  }
};
Ba.prototype.g = is([0, H, -4, ut]);
var F1 = class extends f {
  constructor(e) {
    super(e);
  }
}, L1 = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, 1, B, k, Oa], ut]), Ki = class extends f {
  constructor(e) {
    super(e);
  }
}, x1 = class extends f {
  constructor(e) {
    super(e);
  }
  oa() {
    const e = Ko(this);
    return e ?? vt();
  }
}, M1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Na = [1, 2], C1 = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, z, [0, Na, S, [0, Ur], S, [0, Sa], B, k], ut]), Gr = class extends f {
  constructor(e) {
    super(e);
  }
}, Ua = [0, k, B, H, Q, -1], Yi = class extends f {
  constructor(e) {
    super(e);
  }
}, I1 = [0, I, -1], qi = class extends f {
  constructor(e) {
    super(e);
  }
}, Tn = [1, 2, 3, 4, 5], Nn = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Ko(this) != null;
  }
  h() {
    return Ae(this, 2) != null;
  }
}, O = class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    return Ho(Bt(this, 2)) ?? !1;
  }
}, Ga = [0, Sa, k, [0, B, ut, -1], [0, m1, ut]], U = [0, Ga, I, [0, Tn, S, Ma, S, Fa, S, Ta, S, xa, S, La], ke], as = class extends f {
  constructor(e) {
    super(e);
  }
}, Hr = [0, U, H, -1, B], O1 = Ie(502141897, as);
V[502141897] = Hr;
var P1 = ft(class extends f {
  constructor(e) {
    super(e);
  }
}, [0, [0, ke, -1, p1, g1], T1]), Ha = class extends f {
  constructor(e) {
    super(e);
  }
}, Va = class extends f {
  constructor(e) {
    super(e);
  }
}, Vr = [0, U, H, [0, U], I], ja = [0, U, Hr, Vr, H, [0, [0, Ga]]], R1 = Ie(508968150, Va);
V[508968150] = ja, V[508968149] = Vr;
var za = class extends f {
  constructor(e) {
    super(e);
  }
}, D1 = Ie(513916220, za);
V[513916220] = [0, U, ja, B];
var St = class extends f {
  constructor(e) {
    super(e);
  }
  h() {
    return E(this, Gr, 2);
  }
  g() {
    F(this, 2);
  }
}, Wa = [0, U, Ua];
V[478825465] = Wa;
var B1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Xa = class extends f {
  constructor(e) {
    super(e);
  }
}, jr = class extends f {
  constructor(e) {
    super(e);
  }
}, zr = class extends f {
  constructor(e) {
    super(e);
  }
}, $a = class extends f {
  constructor(e) {
    super(e);
  }
}, Ji = [0, U, [0, U], Wa, -1], Ka = [0, U, H, B], Wr = [0, U, H], Ya = [0, U, Ka, Wr, H], N1 = Ie(479097054, $a);
V[479097054] = [0, U, Ya, Ji], V[463370452] = Ji, V[464864288] = Ka;
var U1 = Ie(462713202, zr);
V[462713202] = Ya, V[474472470] = Wr;
var G1 = class extends f {
  constructor(e) {
    super(e);
  }
}, qa = class extends f {
  constructor(e) {
    super(e);
  }
}, Ja = class extends f {
  constructor(e) {
    super(e);
  }
}, Qa = class extends f {
  constructor(e) {
    super(e);
  }
}, Xr = [0, U, H, -1, B], Xs = [0, U, H, I];
Qa.prototype.g = is([0, U, Wr, [0, U], Hr, Vr, Xr, Xs]);
var Za = class extends f {
  constructor(e) {
    super(e);
  }
}, H1 = Ie(456383383, Za);
V[456383383] = [0, U, Ua];
var e2 = class extends f {
  constructor(e) {
    super(e);
  }
}, V1 = Ie(476348187, e2);
V[476348187] = [0, U, I1];
var t2 = class extends f {
  constructor(e) {
    super(e);
  }
}, Qi = class extends f {
  constructor(e) {
    super(e);
  }
}, n2 = [0, ke, -1], j1 = Ie(458105876, class extends f {
  constructor(e) {
    super(e);
  }
  g() {
    var e = this.u;
    const t = 0 | e[g], n = 2 & t;
    return e = (function(s, r, i) {
      var o = Qi;
      const a = 2 & r;
      let h = !1;
      if (i == null) {
        if (a) return Oi();
        i = [];
      } else if (i.constructor === Ee) {
        if ((2 & i.L) == 0 || a) return i;
        i = i.X();
      } else Array.isArray(i) ? h = !!(2 & (0 | i[g])) : i = [];
      if (a) {
        if (!i.length) return Oi();
        h || (h = !0, jt(i));
      } else h && (h = !1, i = Yo(i));
      return h || (64 & (0 | i[g]) ? i[g] &= -33 : 32 & r && Vn(i, 32)), R(s, r, 2, o = new Ee(i, o, J2, void 0)), o;
    })(e, t, Qe(e, t, 2)), !n && Qi && (e.ra = !0), e;
  }
});
V[458105876] = [0, n2, f1, [!0, ut, [0, k, -1, Q]]];
var $r = class extends f {
  constructor(e) {
    super(e);
  }
}, s2 = Ie(458105758, $r);
V[458105758] = [0, U, k, n2];
var r2 = class extends f {
  constructor(e) {
    super(e);
  }
}, z1 = Ie(443442058, r2);
V[443442058] = [0, U, k, B, H, Q, -1, I, H], V[514774813] = Xr;
var i2 = class extends f {
  constructor(e) {
    super(e);
  }
}, W1 = Ie(516587230, i2);
function $s(e, t) {
  return t = t ? t.clone() : new Gr(), e.displayNamesLocale !== void 0 ? F(t, 1, Wt(e.displayNamesLocale)) : e.displayNamesLocale === void 0 && F(t, 1), e.maxResults !== void 0 ? Ue(t, 2, e.maxResults) : "maxResults" in e && F(t, 2), e.scoreThreshold !== void 0 ? p(t, 3, e.scoreThreshold) : "scoreThreshold" in e && F(t, 3), e.categoryAllowlist !== void 0 ? Dn(t, 4, e.categoryAllowlist) : "categoryAllowlist" in e && F(t, 4), e.categoryDenylist !== void 0 ? Dn(t, 5, e.categoryDenylist) : "categoryDenylist" in e && F(t, 5), t;
}
function Kr(e, t = -1, n = "") {
  return { categories: e.map(((s) => ({ index: ve(s, 1) ?? 0 ?? -1, score: N(s, 2) ?? 0, categoryName: Ae(s, 3) ?? "" ?? "", displayName: Ae(s, 4) ?? "" ?? "" }))), headIndex: t, headName: n };
}
function o2(e) {
  var o, a;
  var t = _t(e, 3, dt, yt()), n = _t(e, 2, zt, yt()), s = _t(e, 1, Dt, yt()), r = _t(e, 9, Dt, yt());
  const i = { categories: [], keypoints: [] };
  for (let h = 0; h < t.length; h++) i.categories.push({ score: t[h], index: n[h] ?? -1, categoryName: s[h] ?? "", displayName: r[h] ?? "" });
  if ((t = (o = E(e, Cs, 4)) == null ? void 0 : o.h()) && (i.boundingBox = { originX: ve(t, 1) ?? 0, originY: ve(t, 2) ?? 0, width: ve(t, 3) ?? 0, height: ve(t, 4) ?? 0, angle: 0 }), (a = E(e, Cs, 4)) == null ? void 0 : a.g().length) for (const h of E(e, Cs, 4).g()) i.keypoints.push({ x: kn(h, 1) ?? 0, y: kn(h, 2) ?? 0, score: kn(h, 4) ?? 0, label: Ae(h, 3) ?? "" });
  return i;
}
function hs(e) {
  const t = [];
  for (const n of qe(e, Da, 1)) t.push({ x: N(n, 1) ?? 0, y: N(n, 2) ?? 0, z: N(n, 3) ?? 0, visibility: N(n, 4) ?? 0 });
  return t;
}
function cn(e) {
  const t = [];
  for (const n of qe(e, Ra, 1)) t.push({ x: N(n, 1) ?? 0, y: N(n, 2) ?? 0, z: N(n, 3) ?? 0, visibility: N(n, 4) ?? 0 });
  return t;
}
function Zi(e) {
  return Array.from(e, ((t) => t > 127 ? t - 256 : t));
}
function eo(e, t) {
  if (e.length !== t.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);
  let n = 0, s = 0, r = 0;
  for (let i = 0; i < e.length; i++) n += e[i] * t[i], s += e[i] * e[i], r += t[i] * t[i];
  if (s <= 0 || r <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(s * r);
}
let vn;
V[516587230] = [0, U, Xr, Xs, H], V[518928384] = Xs;
const X1 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function a2() {
  if (vn === void 0) try {
    await WebAssembly.instantiate(X1), vn = !0;
  } catch {
    vn = !1;
  }
  return vn;
}
async function sn(e, t = w1``) {
  const n = await a2() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${t}/${e}_${n}.js`, wasmBinaryPath: `${t}/${e}_${n}.wasm` };
}
var gt = class {
};
function h2() {
  var e = navigator;
  return typeof OffscreenCanvas < "u" && (!(function(t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  })(e) || !!((e = e.userAgent.match(/Version\/([\d]+).*Safari/)) && e.length >= 1 && Number(e[1]) >= 17));
}
async function to(e) {
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
function c2(e) {
  return e.videoWidth !== void 0 ? [e.videoWidth, e.videoHeight] : e.naturalWidth !== void 0 ? [e.naturalWidth, e.naturalHeight] : e.displayWidth !== void 0 ? [e.displayWidth, e.displayHeight] : [e.width, e.height];
}
function m(e, t, n) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(t = e.i.stringToNewUTF8(t)), e.i._free(t);
}
function no(e, t, n) {
  if (!e.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? e.i._bindTextureToStream(n) : e.i._bindTextureToCanvas(), !(n = e.i.canvas.getContext("webgl2") || e.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t), e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [s, r] = c2(t);
  return !e.l || s === e.i.canvas.width && r === e.i.canvas.height || (e.i.canvas.width = s, e.i.canvas.height = r), [s, r];
}
function so(e, t, n) {
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
function rt(e, t, n) {
  let s = [];
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = (r, i, o) => {
    i ? (n(s, o), s = []) : s.push(r);
  };
}
gt.forVisionTasks = function(e) {
  return sn("vision", e);
}, gt.forTextTasks = function(e) {
  return sn("text", e);
}, gt.forGenAiExperimentalTasks = function(e) {
  return sn("genai_experimental", e);
}, gt.forGenAiTasks = function(e) {
  return sn("genai", e);
}, gt.forAudioTasks = function(e) {
  return sn("audio", e);
}, gt.isSimdSupported = function() {
  return a2();
};
async function $1(e, t, n, s) {
  return e = await (async (r, i, o, a, h) => {
    if (i && await to(i), !self.ModuleFactory || o && (await to(o), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && h && ((i = self.Module).locateFile = h.locateFile, h.mainScriptUrlOrBlob && (i.mainScriptUrlOrBlob = h.mainScriptUrlOrBlob)), h = await self.ModuleFactory(self.Module || h), self.ModuleFactory = self.Module = void 0, new r(h, a);
  })(e, n.wasmLoaderPath, n.assetLoaderPath, t, { locateFile: (r) => r.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && r.endsWith(".data") ? n.assetBinaryPath.toString() : r }), await e.o(s), e;
}
function Is(e, t) {
  const n = E(e.baseOptions, Nn, 1) || new Nn();
  typeof t == "string" ? (F(n, 2, Wt(t)), F(n, 1)) : t instanceof Uint8Array && (F(n, 1, ar(t, !1)), F(n, 2)), y(e.baseOptions, 0, 1, n);
}
function ro(e) {
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
function cs(e, t) {
  e.A = new Z(), me(e.A, "PassThroughCalculator"), L(e.A, "free_memory"), v(e.A, "free_memory_unused_out"), x(t, "free_memory"), ge(t, e.A);
}
function Ut(e, t) {
  L(e.A, t), v(e.A, t + "_unused_out");
}
function us(e) {
  e.g.addBoolToStream(!0, "free_memory", e.B);
}
var Fn = class {
  constructor(e) {
    this.g = e, this.G = [], this.B = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(e, t = !0) {
    var n, s, r, i, o, a;
    if (t) {
      const h = e.baseOptions || {};
      if ((n = e.baseOptions) != null && n.modelAssetBuffer && ((s = e.baseOptions) != null && s.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!((r = E(this.baseOptions, Nn, 1)) != null && r.g() || (i = E(this.baseOptions, Nn, 1)) != null && i.h() || (o = e.baseOptions) != null && o.modelAssetBuffer || (a = e.baseOptions) != null && a.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if ((function(c, u) {
        let l = E(c.baseOptions, qi, 3);
        if (!l) {
          var w = l = new qi(), M = new zi();
          an(w, 4, Tn, M);
        }
        "delegate" in u && (u.delegate === "GPU" ? (u = l, w = new b1(), an(u, 2, Tn, w)) : (u = l, w = new zi(), an(u, 4, Tn, w))), y(c.baseOptions, 0, 3, l);
      })(this, h), h.modelAssetPath) return fetch(h.modelAssetPath.toString()).then(((c) => {
        if (c.ok) return c.arrayBuffer();
        throw Error(`Failed to fetch model: ${h.modelAssetPath} (${c.status})`);
      })).then(((c) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(c), !0, !1, !1), Is(this, "/model.dat"), this.m(), this.I();
      }));
      if (h.modelAssetBuffer instanceof Uint8Array) Is(this, h.modelAssetBuffer);
      else if (h.modelAssetBuffer) return (async function(c) {
        const u = [];
        for (var l = 0; ; ) {
          const { done: w, value: M } = await c.read();
          if (w) break;
          u.push(M), l += M.length;
        }
        if (u.length === 0) return new Uint8Array(0);
        if (u.length === 1) return u[0];
        c = new Uint8Array(l), l = 0;
        for (const w of u) c.set(w, l), l += w.length;
        return c;
      })(h.modelAssetBuffer).then(((c) => {
        Is(this, c), this.m(), this.I();
      }));
    }
    return this.m(), this.I(), Promise.resolve();
  }
  I() {
  }
  da() {
    let e;
    if (this.g.da(((t) => {
      e = v1(t);
    })), !e) throw Error("Failed to retrieve CalculatorGraphConfig");
    return e;
  }
  setGraph(e, t) {
    this.g.attachErrorListener(((n, s) => {
      this.G.push(Error(s));
    })), this.g.La(), this.g.setGraph(e, t), this.A = void 0, ro(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), ro(this);
  }
  close() {
    this.A = void 0, this.g.closeGraph();
  }
};
function Ye(e, t) {
  if (!e) throw Error(`Unable to obtain required WebGL resource: ${t}`);
  return e;
}
Fn.prototype.close = Fn.prototype.close, (function(e, t) {
  e = e.split(".");
  var n, s = bt;
  for ((e[0] in s) || s.execScript === void 0 || s.execScript("var " + e[0]); e.length && (n = e.shift()); ) e.length || t === void 0 ? s = s[n] && s[n] !== Object.prototype[n] ? s[n] : s[n] = {} : s[n] = t;
})("TaskRunner", Fn);
class K1 {
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
function io(e, t, n) {
  const s = e.g;
  if (n = Ye(s.createShader(n), "Failed to create WebGL shader"), s.shaderSource(n, t), s.compileShader(n), !s.getShaderParameter(n, s.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${s.getShaderInfoLog(n)}`);
  return s.attachShader(e.h, n), n;
}
function oo(e, t) {
  const n = e.g, s = Ye(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(s);
  const r = Ye(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, r), n.enableVertexAttribArray(e.O), n.vertexAttribPointer(e.O, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const i = Ye(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(e.I), n.vertexAttribPointer(e.I, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(t ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new K1(n, s, r, i);
}
function Yr(e, t) {
  if (e.g) {
    if (t !== e.g) throw Error("Cannot change GL context once initialized");
  } else e.g = t;
}
function qr(e, t, n, s) {
  return Yr(e, t), e.h || (e.m(), e.C()), n ? (e.s || (e.s = oo(e, !0)), n = e.s) : (e.v || (e.v = oo(e, !1)), n = e.v), t.useProgram(e.h), n.bind(), e.l(), e = s(), n.g.bindVertexArray(null), e;
}
function ls(e, t, n) {
  return Yr(e, t), e = Ye(t.createTexture(), "Failed to create texture"), t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, n ?? t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, n ?? t.LINEAR), t.bindTexture(t.TEXTURE_2D, null), e;
}
function ds(e, t, n) {
  Yr(e, t), e.A || (e.A = Ye(t.createFramebuffer(), "Failed to create framebuffe.")), t.bindFramebuffer(t.FRAMEBUFFER, e.A), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, n, 0);
}
function Jr(e) {
  var t;
  (t = e.g) == null || t.bindFramebuffer(e.g.FRAMEBUFFER, null);
}
var Qr = class {
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
    if (this.h = Ye(e.createProgram(), "Failed to create WebGL program"), this.aa = io(this, `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`, e.VERTEX_SHADER), this.Z = io(this, this.G(), e.FRAGMENT_SHADER), e.linkProgram(this.h), !e.getProgramParameter(this.h, e.LINK_STATUS)) throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);
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
function ze(e, t) {
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
function Ks(e) {
  var t = ze(e, 1);
  if (!t) {
    if (t = ze(e, 0)) t = new Float32Array(t).map(((s) => s / 255));
    else {
      t = new Float32Array(e.width * e.height);
      const s = Gt(e);
      var n = Zr(e);
      if (ds(n, s, u2(e)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
        n = new Float32Array(e.width * e.height * 4), s.readPixels(0, 0, e.width, e.height, s.RGBA, s.FLOAT, n);
        for (let r = 0, i = 0; r < t.length; ++r, i += 4) t[r] = n[i];
      } else s.readPixels(0, 0, e.width, e.height, s.RED, s.FLOAT, t);
    }
    e.g.push(t);
  }
  return t;
}
function u2(e) {
  let t = ze(e, 2);
  if (!t) {
    const n = Gt(e);
    t = d2(e);
    const s = Ks(e), r = l2(e);
    n.texImage2D(n.TEXTURE_2D, 0, r, e.width, e.height, 0, n.RED, n.FLOAT, s), Ys(e);
  }
  return t;
}
function Gt(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ye(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function l2(e) {
  if (e = Gt(e), !En) if (e.getExtension("EXT_color_buffer_float") && e.getExtension("OES_texture_float_linear") && e.getExtension("EXT_float_blend")) En = e.R32F;
  else {
    if (!e.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    En = e.R16F;
  }
  return En;
}
function Zr(e) {
  return e.l || (e.l = new Qr()), e.l;
}
function d2(e) {
  const t = Gt(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = ze(e, 2);
  return n || (n = ls(Zr(e), t, e.m ? t.LINEAR : t.NEAREST), e.g.push(n), e.j = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function Ys(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
var En, $ = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.m = t, this.j = n, this.canvas = s, this.l = r, this.width = i, this.height = o, this.j && --ao === 0 && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
  }
  Fa() {
    return !!ze(this, 0);
  }
  ja() {
    return !!ze(this, 1);
  }
  P() {
    return !!ze(this, 2);
  }
  ia() {
    return (t = ze(e = this, 0)) || (t = Ks(e), t = new Uint8Array(t.map(((n) => 255 * n))), e.g.push(t)), t;
    var e, t;
  }
  ha() {
    return Ks(this);
  }
  M() {
    return u2(this);
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
          const s = Gt(this), r = Zr(this);
          s.activeTexture(s.TEXTURE1), n = ls(r, s, this.m ? s.LINEAR : s.NEAREST), s.bindTexture(s.TEXTURE_2D, n);
          const i = l2(this);
          s.texImage2D(s.TEXTURE_2D, 0, i, this.width, this.height, 0, s.RED, s.FLOAT, null), s.bindTexture(s.TEXTURE_2D, null), ds(r, s, n), qr(r, s, !1, (() => {
            d2(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), Ys(this);
          })), Jr(r), Ys(this);
        }
      }
      e.push(n);
    }
    return new $(e, this.m, this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Gt(this).deleteTexture(ze(this, 2)), ao = -1;
  }
};
$.prototype.close = $.prototype.close, $.prototype.clone = $.prototype.clone, $.prototype.getAsWebGLTexture = $.prototype.M, $.prototype.getAsFloat32Array = $.prototype.ha, $.prototype.getAsUint8Array = $.prototype.ia, $.prototype.hasWebGLTexture = $.prototype.P, $.prototype.hasFloat32Array = $.prototype.ja, $.prototype.hasUint8Array = $.prototype.Fa;
var ao = 250;
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
function f2(e) {
  var t = Be(e, 0);
  if (!t) {
    t = Ht(e);
    const n = fs(e), s = new Uint8Array(e.width * e.height * 4);
    ds(n, t, Ln(e)), t.readPixels(0, 0, e.width, e.height, t.RGBA, t.UNSIGNED_BYTE, s), Jr(n), t = new ImageData(new Uint8ClampedArray(s.buffer), e.width, e.height), e.g.push(t);
  }
  return t;
}
function Ln(e) {
  let t = Be(e, 2);
  if (!t) {
    const n = Ht(e);
    t = xn(e);
    const s = Be(e, 1) || f2(e);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, s), on(e);
  }
  return t;
}
function Ht(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = Ye(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function fs(e) {
  return e.l || (e.l = new Qr()), e.l;
}
function xn(e) {
  const t = Ht(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = Be(e, 2);
  return n || (n = ls(fs(e), t), e.g.push(n), e.m = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function on(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
function ho(e) {
  const t = Ht(e);
  return qr(fs(e), t, !0, (() => (function(n, s) {
    const r = n.canvas;
    if (r.width === n.width && r.height === n.height) return s();
    const i = r.width, o = r.height;
    return r.width = n.width, r.height = n.height, n = s(), r.width = i, r.height = o, n;
  })(e, (() => {
    if (t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), !(e.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return e.canvas.transferToImageBitmap();
  }))));
}
var K = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.j = t, this.m = n, this.canvas = s, this.l = r, this.width = i, this.height = o, (this.j || this.m) && --co === 0 && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
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
    return f2(this);
  }
  Ba() {
    var e = Be(this, 1);
    return e || (Ln(this), xn(this), e = ho(this), on(this), this.g.push(e), this.j = !0), e;
  }
  M() {
    return Ln(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let n;
      if (t instanceof ImageData) n = new ImageData(t.data, this.width, this.height);
      else if (t instanceof WebGLTexture) {
        const s = Ht(this), r = fs(this);
        s.activeTexture(s.TEXTURE1), n = ls(r, s), s.bindTexture(s.TEXTURE_2D, n), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, this.width, this.height, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.bindTexture(s.TEXTURE_2D, null), ds(r, s, n), qr(r, s, !1, (() => {
          xn(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), on(this);
        })), Jr(r), on(this);
      } else {
        if (!(t instanceof ImageBitmap)) throw Error(`Type is not supported: ${t}`);
        Ln(this), xn(this), n = ho(this), on(this);
      }
      e.push(n);
    }
    return new K(e, this.ka(), this.P(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Be(this, 1).close(), this.m && Ht(this).deleteTexture(Be(this, 2)), co = -1;
  }
};
K.prototype.close = K.prototype.close, K.prototype.clone = K.prototype.clone, K.prototype.getAsWebGLTexture = K.prototype.M, K.prototype.getAsImageBitmap = K.prototype.Ba, K.prototype.getAsImageData = K.prototype.Ca, K.prototype.hasWebGLTexture = K.prototype.P, K.prototype.hasImageBitmap = K.prototype.ka, K.prototype.hasImageData = K.prototype.Ea;
var co = 250;
function Oe(...e) {
  return e.map((([t, n]) => ({ start: t, end: n })));
}
const Y1 = /* @__PURE__ */ (function(e) {
  return class extends e {
    La() {
      this.i._registerModelResourcesGraphService();
    }
  };
})((uo = class {
  constructor(e, t) {
    this.l = !0, this.i = e, this.g = null, this.h = 0, this.m = typeof this.i._addIntToInputStream == "function", t !== void 0 ? this.i.canvas = t : h2() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
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
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), m(this, s || "input_audio", ((i) => {
      m(this, r = r || "audio_header", ((o) => {
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
  addAudioToStream(e, t, n) {
    this.addAudioToStreamWithShape(e, 0, 0, t, n);
  }
  addAudioToStreamWithShape(e, t, n, s, r) {
    const i = 4 * e.length;
    this.h !== i && (this.g && this.i._free(this.g), this.g = this.i._malloc(i), this.h = i), this.i.HEAPF32.set(e, this.g / 4), m(this, s, ((o) => {
      this.i._addAudioToInputStream(this.g, t, n, o, r);
    }));
  }
  addGpuBufferToStream(e, t, n) {
    m(this, t, ((s) => {
      const [r, i] = no(this, e, s);
      this.i._addBoundTextureToStream(s, r, i, n);
    }));
  }
  addBoolToStream(e, t, n) {
    m(this, t, ((s) => {
      this.i._addBoolToInputStream(e, s, n);
    }));
  }
  addDoubleToStream(e, t, n) {
    m(this, t, ((s) => {
      this.i._addDoubleToInputStream(e, s, n);
    }));
  }
  addFloatToStream(e, t, n) {
    m(this, t, ((s) => {
      this.i._addFloatToInputStream(e, s, n);
    }));
  }
  addIntToStream(e, t, n) {
    m(this, t, ((s) => {
      this.i._addIntToInputStream(e, s, n);
    }));
  }
  addUintToStream(e, t, n) {
    m(this, t, ((s) => {
      this.i._addUintToInputStream(e, s, n);
    }));
  }
  addStringToStream(e, t, n) {
    m(this, t, ((s) => {
      m(this, e, ((r) => {
        this.i._addStringToInputStream(r, s, n);
      }));
    }));
  }
  addStringRecordToStream(e, t, n) {
    m(this, t, ((s) => {
      so(this, Object.keys(e), ((r) => {
        so(this, Object.values(e), ((i) => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(e).length, s, n);
        }));
      }));
    }));
  }
  addProtoToStream(e, t, n, s) {
    m(this, n, ((r) => {
      m(this, t, ((i) => {
        const o = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, o), this.i._addProtoToInputStream(o, e.length, i, r, s), this.i._free(o);
      }));
    }));
  }
  addEmptyPacketToStream(e, t) {
    m(this, e, ((n) => {
      this.i._addEmptyPacketToInputStream(n, t);
    }));
  }
  addBoolVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateBoolVector(e.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const i of e) this.i._addBoolVectorEntry(r, i);
      this.i._addBoolVectorToInputStream(r, s, n);
    }));
  }
  addDoubleVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateDoubleVector(e.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const i of e) this.i._addDoubleVectorEntry(r, i);
      this.i._addDoubleVectorToInputStream(r, s, n);
    }));
  }
  addFloatVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateFloatVector(e.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const i of e) this.i._addFloatVectorEntry(r, i);
      this.i._addFloatVectorToInputStream(r, s, n);
    }));
  }
  addIntVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateIntVector(e.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const i of e) this.i._addIntVectorEntry(r, i);
      this.i._addIntVectorToInputStream(r, s, n);
    }));
  }
  addUintVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateUintVector(e.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const i of e) this.i._addUintVectorEntry(r, i);
      this.i._addUintVectorToInputStream(r, s, n);
    }));
  }
  addStringVectorToStream(e, t, n) {
    m(this, t, ((s) => {
      const r = this.i._allocateStringVector(e.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const i of e) m(this, i, ((o) => {
        this.i._addStringVectorEntry(r, o);
      }));
      this.i._addStringVectorToInputStream(r, s, n);
    }));
  }
  addBoolToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      this.i._addBoolToInputSidePacket(e, n);
    }));
  }
  addDoubleToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      this.i._addDoubleToInputSidePacket(e, n);
    }));
  }
  addFloatToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      this.i._addFloatToInputSidePacket(e, n);
    }));
  }
  addIntToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      this.i._addIntToInputSidePacket(e, n);
    }));
  }
  addUintToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      this.i._addUintToInputSidePacket(e, n);
    }));
  }
  addStringToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      m(this, e, ((s) => {
        this.i._addStringToInputSidePacket(s, n);
      }));
    }));
  }
  addProtoToInputSidePacket(e, t, n) {
    m(this, n, ((s) => {
      m(this, t, ((r) => {
        const i = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, i), this.i._addProtoToInputSidePacket(i, e.length, r, s), this.i._free(i);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateBoolVector(e.length);
      if (!s) throw Error("Unable to allocate new bool vector on heap.");
      for (const r of e) this.i._addBoolVectorEntry(s, r);
      this.i._addBoolVectorToInputSidePacket(s, n);
    }));
  }
  addDoubleVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateDoubleVector(e.length);
      if (!s) throw Error("Unable to allocate new double vector on heap.");
      for (const r of e) this.i._addDoubleVectorEntry(s, r);
      this.i._addDoubleVectorToInputSidePacket(s, n);
    }));
  }
  addFloatVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateFloatVector(e.length);
      if (!s) throw Error("Unable to allocate new float vector on heap.");
      for (const r of e) this.i._addFloatVectorEntry(s, r);
      this.i._addFloatVectorToInputSidePacket(s, n);
    }));
  }
  addIntVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateIntVector(e.length);
      if (!s) throw Error("Unable to allocate new int vector on heap.");
      for (const r of e) this.i._addIntVectorEntry(s, r);
      this.i._addIntVectorToInputSidePacket(s, n);
    }));
  }
  addUintVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateUintVector(e.length);
      if (!s) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const r of e) this.i._addUintVectorEntry(s, r);
      this.i._addUintVectorToInputSidePacket(s, n);
    }));
  }
  addStringVectorToInputSidePacket(e, t) {
    m(this, t, ((n) => {
      const s = this.i._allocateStringVector(e.length);
      if (!s) throw Error("Unable to allocate new string vector on heap.");
      for (const r of e) m(this, r, ((i) => {
        this.i._addStringVectorEntry(s, i);
      }));
      this.i._addStringVectorToInputSidePacket(s, n);
    }));
  }
  attachBoolListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachBoolListener(n);
    }));
  }
  attachBoolVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachBoolVectorListener(n);
    }));
  }
  attachIntListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachIntListener(n);
    }));
  }
  attachIntVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachIntVectorListener(n);
    }));
  }
  attachUintListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachUintListener(n);
    }));
  }
  attachUintVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachUintVectorListener(n);
    }));
  }
  attachDoubleListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachDoubleListener(n);
    }));
  }
  attachDoubleVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachDoubleVectorListener(n);
    }));
  }
  attachFloatListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachFloatListener(n);
    }));
  }
  attachFloatVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachFloatVectorListener(n);
    }));
  }
  attachStringListener(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.i._attachStringListener(n);
    }));
  }
  attachStringVectorListener(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.i._attachStringVectorListener(n);
    }));
  }
  attachProtoListener(e, t, n) {
    Pe(this, e, t), m(this, e, ((s) => {
      this.i._attachProtoListener(s, n || !1);
    }));
  }
  attachProtoVectorListener(e, t, n) {
    rt(this, e, t), m(this, e, ((s) => {
      this.i._attachProtoVectorListener(s, n || !1);
    }));
  }
  attachAudioListener(e, t, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Pe(this, e, ((s, r) => {
      s = new Float32Array(s.buffer, s.byteOffset, s.length / 4), t(s, r);
    })), m(this, e, ((s) => {
      this.i._attachAudioListener(s, n || !1);
    }));
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends uo {
  get ea() {
    return this.i;
  }
  qa(e, t, n) {
    m(this, t, ((s) => {
      const [r, i] = no(this, e, s);
      this.ea._addBoundTextureAsImageToStream(s, r, i, n);
    }));
  }
  U(e, t) {
    Pe(this, e, t), m(this, e, ((n) => {
      this.ea._attachImageListener(n);
    }));
  }
  ca(e, t) {
    rt(this, e, t), m(this, e, ((n) => {
      this.ea._attachImageVectorListener(n);
    }));
  }
}));
var uo, Se = class extends Y1 {
};
async function b(e, t, n) {
  return (async function(s, r, i, o) {
    return $1(s, r, i, o);
  })(e, n.canvas ?? (h2() ? void 0 : document.createElement("canvas")), t, n);
}
function p2(e, t, n, s) {
  if (e.T) {
    const i = new Ba();
    if (n != null && n.regionOfInterest) {
      if (!e.pa) throw Error("This task doesn't support region-of-interest.");
      var r = n.regionOfInterest;
      if (r.left >= r.right || r.top >= r.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (r.left < 0 || r.top < 0 || r.right > 1 || r.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      p(i, 1, (r.left + r.right) / 2), p(i, 2, (r.top + r.bottom) / 2), p(i, 4, r.right - r.left), p(i, 3, r.bottom - r.top);
    } else p(i, 1, 0.5), p(i, 2, 0.5), p(i, 4, 1), p(i, 3, 1);
    if (n != null && n.rotationDegrees) {
      if ((n == null ? void 0 : n.rotationDegrees) % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (p(i, 5, -Math.PI * n.rotationDegrees / 180), (n == null ? void 0 : n.rotationDegrees) % 180 != 0) {
        const [o, a] = c2(t);
        n = N(i, 3) * a / o, r = N(i, 4) * o / a, p(i, 4, n), p(i, 3, r);
      }
    }
    e.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", e.T, s);
  }
  e.g.qa(t, e.aa, s ?? performance.now()), e.finishProcessing();
}
function Te(e, t, n) {
  var s;
  if ((s = e.baseOptions) != null && s.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  p2(e, t, n, e.B + 1);
}
function Ge(e, t, n, s) {
  var r;
  if (!((r = e.baseOptions) != null && r.g())) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  p2(e, t, n, s);
}
function Vt(e, t, n, s) {
  var r = t.data;
  const i = t.width, o = i * (t = t.height);
  if ((r instanceof Uint8Array || r instanceof Float32Array) && r.length !== o) throw Error("Unsupported channel count: " + r.length / o);
  return e = new $([r], n, !1, e.g.i.canvas, e.O, i, t), s ? e.clone() : e;
}
var oe = class extends Fn {
  constructor(e, t, n, s) {
    super(e), this.g = e, this.aa = t, this.T = n, this.pa = s, this.O = new Qr();
  }
  l(e, t = !0) {
    if ("runningMode" in e && dn(this.baseOptions, 2, !!e.runningMode && e.runningMode !== "IMAGE"), e.canvas !== void 0 && this.g.i.canvas !== e.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(e, t);
  }
  close() {
    this.O.close(), super.close();
  }
};
oe.prototype.close = oe.prototype.close;
var ye = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect_in", !1), this.j = { detections: [] }, y(e = this.h = new as(), 0, 1, t = new O()), p(this.h, 2, 0.5), p(this.h, 3, 0.3);
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "minDetectionConfidence" in e && p(this.h, 2, e.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in e && p(this.h, 3, e.minSuppressionThreshold ?? 0.3), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Te(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect_in"), A(e, "detections");
    const t = new fe();
    Me(t, O1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect_in"), v(n, "DETECTIONS:detections"), n.o(t), ge(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = Pa(i), this.j.detections.push(o2(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      d(this, s);
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
var ei = Oe([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), ti = Oe([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), ni = Oe([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), m2 = Oe([474, 475], [475, 476], [476, 477], [477, 474]), si = Oe([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), ri = Oe([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), g2 = Oe([469, 470], [470, 471], [471, 472], [472, 469]), ii = Oe([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), y2 = [...ei, ...ti, ...ni, ...si, ...ri, ...ii], _2 = Oe([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function lo(e) {
  e.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var P = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, y(e = this.h = new Va(), 0, 1, t = new O()), this.v = new Ha(), y(this.h, 0, 3, this.v), this.s = new as(), y(this.h, 0, 2, this.s), Ue(this.s, 4, 1), p(this.s, 2, 0.5), p(this.v, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numFaces" in e && Ue(this.s, 4, e.numFaces ?? 1), "minFaceDetectionConfidence" in e && p(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in e && p(this.v, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in e && (this.outputFacialTransformationMatrixes = !!e.outputFacialTransformationMatrixes), this.l(e);
  }
  D(e, t) {
    return lo(this), Te(this, e, t), this.j;
  }
  F(e, t, n) {
    return lo(this), Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "face_landmarks");
    const t = new fe();
    Me(t, R1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "NORM_LANDMARKS:face_landmarks"), n.o(t), ge(e, n), this.g.attachProtoVectorListener("face_landmarks", ((s, r) => {
      for (const i of s) s = _n(i), this.j.faceLandmarks.push(hs(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((s) => {
      d(this, s);
    })), this.outputFaceBlendshapes && (A(e, "blendshapes"), v(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((s, r) => {
      if (this.outputFaceBlendshapes) for (const i of s) s = os(i), this.j.faceBlendshapes.push(Kr(s.g() ?? []));
      d(this, r);
    })), this.g.attachEmptyPacketListener("blendshapes", ((s) => {
      d(this, s);
    }))), this.outputFacialTransformationMatrixes && (A(e, "face_geometry"), v(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((s, r) => {
      if (this.outputFacialTransformationMatrixes) for (const i of s) (s = E(P1(i), S1, 2)) && this.j.facialTransformationMatrixes.push({ rows: ve(s, 1) ?? 0 ?? 0, columns: ve(s, 2) ?? 0 ?? 0, data: _t(s, 3, dt, yt()).slice() ?? [] });
      d(this, r);
    })), this.g.attachEmptyPacketListener("face_geometry", ((s) => {
      d(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
P.prototype.detectForVideo = P.prototype.F, P.prototype.detect = P.prototype.D, P.prototype.setOptions = P.prototype.o, P.createFromModelPath = function(e, t) {
  return b(P, e, { baseOptions: { modelAssetPath: t } });
}, P.createFromModelBuffer = function(e, t) {
  return b(P, e, { baseOptions: { modelAssetBuffer: t } });
}, P.createFromOptions = function(e, t) {
  return b(P, e, t);
}, P.FACE_LANDMARKS_LIPS = ei, P.FACE_LANDMARKS_LEFT_EYE = ti, P.FACE_LANDMARKS_LEFT_EYEBROW = ni, P.FACE_LANDMARKS_LEFT_IRIS = m2, P.FACE_LANDMARKS_RIGHT_EYE = si, P.FACE_LANDMARKS_RIGHT_EYEBROW = ri, P.FACE_LANDMARKS_RIGHT_IRIS = g2, P.FACE_LANDMARKS_FACE_OVAL = ii, P.FACE_LANDMARKS_CONTOURS = y2, P.FACE_LANDMARKS_TESSELATION = _2;
var Re = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !0), y(e = this.j = new za(), 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.j, O, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    return super.l(e);
  }
  Oa(e, t, n) {
    const s = typeof t != "function" ? t : {};
    if (this.h = typeof t == "function" ? t : n, Te(this, e, s ?? {}), !this.h) return this.s;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "stylized_image");
    const t = new fe();
    Me(t, D1, this.j);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "STYLIZED_IMAGE:stylized_image"), n.o(t), ge(e, n), this.g.U("stylized_image", ((s, r) => {
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
      a = new K([o], !1, !1, this.g.i.canvas, this.O, a, s), this.s = i = i ? a.clone() : a, this.h && this.h(i), d(this, r);
    })), this.g.attachEmptyPacketListener("stylized_image", ((s) => {
      this.s = null, this.h && this.h(null), d(this, s);
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
var oi = Oe([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function fo(e) {
  e.gestures = [], e.landmarks = [], e.worldLandmarks = [], e.handedness = [];
}
function po(e) {
  return e.gestures.length === 0 ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: e.gestures, landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handedness: e.handedness, handednesses: e.handedness };
}
function mo(e, t = !0) {
  const n = [];
  for (const r of e) {
    var s = os(r);
    e = [];
    for (const i of s.g()) s = t && ve(i, 1) != null ? ve(i, 1) ?? 0 : -1, e.push({ score: N(i, 2) ?? 0, index: s, categoryName: Ae(i, 3) ?? "" ?? "", displayName: Ae(i, 4) ?? "" ?? "" });
    n.push(e);
  }
  return n;
}
var ue = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.j = new $a(), 0, 1, t = new O()), this.s = new zr(), y(this.j, 0, 2, this.s), this.C = new jr(), y(this.s, 0, 3, this.C), this.v = new Xa(), y(this.s, 0, 2, this.v), this.h = new B1(), y(this.j, 0, 3, this.h), p(this.v, 2, 0.5), p(this.s, 4, 0.5), p(this.C, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, O, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    var r, i, o, a;
    if (Ue(this.v, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && p(this.v, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.s, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && p(this.C, 2, e.minHandPresenceConfidence ?? 0.5), e.cannedGesturesClassifierOptions) {
      var t = new St(), n = t, s = $s(e.cannedGesturesClassifierOptions, (r = E(this.h, St, 3)) == null ? void 0 : r.h());
      y(n, 0, 2, s), y(this.h, 0, 3, t);
    } else e.cannedGesturesClassifierOptions === void 0 && ((i = E(this.h, St, 3)) == null || i.g());
    return e.customGesturesClassifierOptions ? (y(n = t = new St(), 0, 2, s = $s(e.customGesturesClassifierOptions, (o = E(this.h, St, 4)) == null ? void 0 : o.h())), y(this.h, 0, 4, t)) : e.customGesturesClassifierOptions === void 0 && ((a = E(this.h, St, 4)) == null || a.g()), this.l(e);
  }
  Ja(e, t) {
    return fo(this), Te(this, e, t), po(this);
  }
  Ka(e, t, n) {
    return fo(this), Ge(this, e, n, t), po(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "hand_gestures"), A(e, "hand_landmarks"), A(e, "world_hand_landmarks"), A(e, "handedness");
    const t = new fe();
    Me(t, N1, this.j);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "HAND_GESTURES:hand_gestures"), v(n, "LANDMARKS:hand_landmarks"), v(n, "WORLD_LANDMARKS:world_hand_landmarks"), v(n, "HANDEDNESS:handedness"), n.o(t), ge(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = _n(i);
        const o = [];
        for (const a of qe(s, Da, 1)) o.push({ x: N(a, 1) ?? 0, y: N(a, 2) ?? 0, z: N(a, 3) ?? 0, visibility: N(a, 4) ?? 0 });
        this.landmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = It(i);
        const o = [];
        for (const a of qe(s, Ra, 1)) o.push({ x: N(a, 1) ?? 0, y: N(a, 2) ?? 0, z: N(a, 3) ?? 0, visibility: N(a, 4) ?? 0 });
        this.worldLandmarks.push(o);
      }
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("hand_gestures", ((s, r) => {
      this.gestures.push(...mo(s, !1)), d(this, r);
    })), this.g.attachEmptyPacketListener("hand_gestures", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      this.handedness.push(...mo(s)), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
function go(e) {
  return { landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handednesses: e.handedness, handedness: e.handedness };
}
ue.prototype.recognizeForVideo = ue.prototype.Ka, ue.prototype.recognize = ue.prototype.Ja, ue.prototype.setOptions = ue.prototype.o, ue.createFromModelPath = function(e, t) {
  return b(ue, e, { baseOptions: { modelAssetPath: t } });
}, ue.createFromModelBuffer = function(e, t) {
  return b(ue, e, { baseOptions: { modelAssetBuffer: t } });
}, ue.createFromOptions = function(e, t) {
  return b(ue, e, t);
}, ue.HAND_CONNECTIONS = oi;
var re = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], y(e = this.h = new zr(), 0, 1, t = new O()), this.s = new jr(), y(this.h, 0, 3, this.s), this.j = new Xa(), y(this.h, 0, 2, this.j), Ue(this.j, 3, 1), p(this.j, 2, 0.5), p(this.s, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numHands" in e && Ue(this.j, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && p(this.j, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && p(this.s, 2, e.minHandPresenceConfidence ?? 0.5), this.l(e);
  }
  D(e, t) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Te(this, e, t), go(this);
  }
  F(e, t, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ge(this, e, n, t), go(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "hand_landmarks"), A(e, "world_hand_landmarks"), A(e, "handedness");
    const t = new fe();
    Me(t, U1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "LANDMARKS:hand_landmarks"), v(n, "WORLD_LANDMARKS:world_hand_landmarks"), v(n, "HANDEDNESS:handedness"), n.o(t), ge(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) s = _n(i), this.landmarks.push(hs(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) s = It(i), this.worldLandmarks.push(cn(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      d(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      var i = this.handedness, o = i.push;
      const a = [];
      for (const h of s) {
        s = os(h);
        const c = [];
        for (const u of s.g()) c.push({ score: N(u, 2) ?? 0, index: ve(u, 1) ?? 0 ?? -1, categoryName: Ae(u, 3) ?? "" ?? "", displayName: Ae(u, 4) ?? "" ?? "" });
        a.push(c);
      }
      o.call(i, ...a), d(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
re.prototype.detectForVideo = re.prototype.F, re.prototype.detect = re.prototype.D, re.prototype.setOptions = re.prototype.o, re.createFromModelPath = function(e, t) {
  return b(re, e, { baseOptions: { modelAssetPath: t } });
}, re.createFromModelBuffer = function(e, t) {
  return b(re, e, { baseOptions: { modelAssetBuffer: t } });
}, re.createFromOptions = function(e, t) {
  return b(re, e, t);
}, re.HAND_CONNECTIONS = oi;
var w2 = Oe([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function yo(e) {
  e.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function _o(e) {
  try {
    if (!e.C) return e.h;
    e.C(e.h);
  } finally {
    us(e);
  }
}
function An(e, t) {
  e = _n(e), t.push(hs(e));
}
var C = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "input_frames_image", null, !1), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, y(e = this.j = new Qa(), 0, 1, t = new O()), this.J = new jr(), y(this.j, 0, 2, this.J), this.Z = new G1(), y(this.j, 0, 3, this.Z), this.s = new as(), y(this.j, 0, 4, this.s), this.H = new Ha(), y(this.j, 0, 5, this.H), this.v = new qa(), y(this.j, 0, 6, this.v), this.K = new Ja(), y(this.j, 0, 7, this.K), p(this.s, 2, 0.5), p(this.s, 3, 0.3), p(this.H, 2, 0.5), p(this.v, 2, 0.5), p(this.v, 3, 0.3), p(this.K, 2, 0.5), p(this.J, 2, 0.5);
  }
  get baseOptions() {
    return E(this.j, O, 1);
  }
  set baseOptions(e) {
    y(this.j, 0, 1, e);
  }
  o(e) {
    return "minFaceDetectionConfidence" in e && p(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in e && p(this.s, 3, e.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in e && p(this.H, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "minPoseDetectionConfidence" in e && p(this.v, 2, e.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in e && p(this.v, 3, e.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in e && p(this.K, 2, e.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in e && (this.outputPoseSegmentationMasks = !!e.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in e && p(this.J, 2, e.minHandLandmarksConfidence ?? 0.5), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.C = typeof t == "function" ? t : n, yo(this), Te(this, e, s), _o(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.C = typeof n == "function" ? n : s, yo(this), Ge(this, e, r, t), _o(this);
  }
  m() {
    var e = new ae();
    x(e, "input_frames_image"), A(e, "pose_landmarks"), A(e, "pose_world_landmarks"), A(e, "face_landmarks"), A(e, "left_hand_landmarks"), A(e, "left_hand_world_landmarks"), A(e, "right_hand_landmarks"), A(e, "right_hand_world_landmarks");
    const t = new fe(), n = new Gi();
    Hs(n, 1, Wt("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(r, i) {
      if (i != null) if (Array.isArray(i)) F(r, 2, Xo(i));
      else {
        if (!(typeof i == "string" || i instanceof $e || pn(i))) throw Error("invalid value in Any.value field: " + i + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        Hs(r, 2, ar(i, !1), vt());
      }
    })(n, this.j.g());
    const s = new Z();
    me(s, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Rn(s, 8, Gi, n), L(s, "IMAGE:input_frames_image"), v(s, "POSE_LANDMARKS:pose_landmarks"), v(s, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), v(s, "FACE_LANDMARKS:face_landmarks"), v(s, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), v(s, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), v(s, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), v(s, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), s.o(t), ge(e, s), cs(this, e), this.g.attachProtoListener("pose_landmarks", ((r, i) => {
      An(r, this.h.poseLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("pose_world_landmarks", ((r, i) => {
      var o = this.h.poseWorldLandmarks;
      r = It(r), o.push(cn(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((r) => {
      d(this, r);
    })), this.outputPoseSegmentationMasks && (v(s, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), Ut(this, "pose_segmentation_mask"), this.g.U("pose_segmentation_mask", ((r, i) => {
      this.h.poseSegmentationMasks = [Vt(this, r, !0, !this.C)], d(this, i);
    })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((r) => {
      this.h.poseSegmentationMasks = [], d(this, r);
    }))), this.g.attachProtoListener("face_landmarks", ((r, i) => {
      An(r, this.h.faceLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((r) => {
      d(this, r);
    })), this.outputFaceBlendshapes && (A(e, "extra_blendshapes"), v(s, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((r, i) => {
      var o = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (r = os(r), o.push(Kr(r.g() ?? []))), d(this, i);
    })), this.g.attachEmptyPacketListener("extra_blendshapes", ((r) => {
      d(this, r);
    }))), this.g.attachProtoListener("left_hand_landmarks", ((r, i) => {
      An(r, this.h.leftHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("left_hand_world_landmarks", ((r, i) => {
      var o = this.h.leftHandWorldLandmarks;
      r = It(r), o.push(cn(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_landmarks", ((r, i) => {
      An(r, this.h.rightHandLandmarks), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((r) => {
      d(this, r);
    })), this.g.attachProtoListener("right_hand_world_landmarks", ((r, i) => {
      var o = this.h.rightHandWorldLandmarks;
      r = It(r), o.push(cn(r)), d(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((r) => {
      d(this, r);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
C.prototype.detectForVideo = C.prototype.F, C.prototype.detect = C.prototype.D, C.prototype.setOptions = C.prototype.o, C.createFromModelPath = function(e, t) {
  return b(C, e, { baseOptions: { modelAssetPath: t } });
}, C.createFromModelBuffer = function(e, t) {
  return b(C, e, { baseOptions: { modelAssetBuffer: t } });
}, C.createFromOptions = function(e, t) {
  return b(C, e, t);
}, C.HAND_CONNECTIONS = oi, C.POSE_CONNECTIONS = w2, C.FACE_LANDMARKS_LIPS = ei, C.FACE_LANDMARKS_LEFT_EYE = ti, C.FACE_LANDMARKS_LEFT_EYEBROW = ni, C.FACE_LANDMARKS_LEFT_IRIS = m2, C.FACE_LANDMARKS_RIGHT_EYE = si, C.FACE_LANDMARKS_RIGHT_EYEBROW = ri, C.FACE_LANDMARKS_RIGHT_IRIS = g2, C.FACE_LANDMARKS_FACE_OVAL = ii, C.FACE_LANDMARKS_CONTOURS = y2, C.FACE_LANDMARKS_TESSELATION = _2;
var _e = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "input_image", "norm_rect", !0), this.j = { classifications: [] }, y(e = this.h = new Za(), 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return y(this.h, 0, 2, $s(e, E(this.h, Gr, 2))), this.l(e);
  }
  sa(e, t) {
    return this.j = { classifications: [] }, Te(this, e, t), this.j;
  }
  ta(e, t, n) {
    return this.j = { classifications: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "input_image"), x(e, "norm_rect"), A(e, "classifications");
    const t = new fe();
    Me(t, H1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), L(n, "IMAGE:input_image"), L(n, "NORM_RECT:norm_rect"), v(n, "CLASSIFICATIONS:classifications"), n.o(t), ge(e, n), this.g.attachProtoListener("classifications", ((s, r) => {
      this.j = (function(i) {
        const o = { classifications: qe(i, F1, 1).map(((a) => {
          var h;
          return Kr(((h = E(a, Ia, 4)) == null ? void 0 : h.g()) ?? [], ve(a, 2) ?? 0, Ae(a, 3) ?? "");
        })) };
        return Pn(Bt(i, 2)) != null && (o.timestampMs = Pn(Bt(i, 2)) ?? 0), o;
      })(L1(s)), d(this, r);
    })), this.g.attachEmptyPacketListener("classifications", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
_e.prototype.classifyForVideo = _e.prototype.ta, _e.prototype.classify = _e.prototype.sa, _e.prototype.setOptions = _e.prototype.o, _e.createFromModelPath = function(e, t) {
  return b(_e, e, { baseOptions: { modelAssetPath: t } });
}, _e.createFromModelBuffer = function(e, t) {
  return b(_e, e, { baseOptions: { modelAssetBuffer: t } });
}, _e.createFromOptions = function(e, t) {
  return b(_e, e, t);
};
var le = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !0), this.h = new e2(), this.embeddings = { embeddings: [] }, y(e = this.h, 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    var t = this.h, n = E(this.h, Yi, 2);
    return n = n ? n.clone() : new Yi(), e.l2Normalize !== void 0 ? dn(n, 1, e.l2Normalize) : "l2Normalize" in e && F(n, 1), e.quantize !== void 0 ? dn(n, 2, e.quantize) : "quantize" in e && F(n, 2), y(t, 0, 2, n), this.l(e);
  }
  za(e, t) {
    return Te(this, e, t), this.embeddings;
  }
  Aa(e, t, n) {
    return Ge(this, e, n, t), this.embeddings;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "embeddings_out");
    const t = new fe();
    Me(t, V1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "EMBEDDINGS:embeddings_out"), n.o(t), ge(e, n), this.g.attachProtoListener("embeddings_out", ((s, r) => {
      s = C1(s), this.embeddings = (function(i) {
        return { embeddings: qe(i, M1, 1).map(((o) => {
          var h, c;
          const a = { headIndex: ve(o, 3) ?? 0 ?? -1, headName: Ae(o, 4) ?? "" ?? "" };
          if (Jo(o, Ki, Fs(o, 1)) !== void 0) o = _t(o = E(o, Ki, Fs(o, 1)), 1, dt, yt()), a.floatEmbedding = o.slice();
          else {
            const u = new Uint8Array(0);
            a.quantizedEmbedding = ((c = (h = E(o, x1, Fs(o, 2))) == null ? void 0 : h.oa()) == null ? void 0 : c.h()) ?? u;
          }
          return a;
        })), timestampMs: Pn(Bt(i, 2)) ?? 0 };
      })(s), d(this, r);
    })), this.g.attachEmptyPacketListener("embeddings_out", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
le.cosineSimilarity = function(e, t) {
  if (e.floatEmbedding && t.floatEmbedding) e = eo(e.floatEmbedding, t.floatEmbedding);
  else {
    if (!e.quantizedEmbedding || !t.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    e = eo(Zi(e.quantizedEmbedding), Zi(t.quantizedEmbedding));
  }
  return e;
}, le.prototype.embedForVideo = le.prototype.Aa, le.prototype.embed = le.prototype.za, le.prototype.setOptions = le.prototype.o, le.createFromModelPath = function(e, t) {
  return b(le, e, { baseOptions: { modelAssetPath: t } });
}, le.createFromModelBuffer = function(e, t) {
  return b(le, e, { baseOptions: { modelAssetBuffer: t } });
}, le.createFromOptions = function(e, t) {
  return b(le, e, t);
};
var qs = class {
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
function wo(e) {
  e.categoryMask = void 0, e.confidenceMasks = void 0, e.qualityScores = void 0;
}
function bo(e) {
  try {
    const t = new qs(e.confidenceMasks, e.categoryMask, e.qualityScores);
    if (!e.j) return t;
    e.j(t);
  } finally {
    us(e);
  }
}
qs.prototype.close = qs.prototype.close;
var se = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.s = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new $r(), this.v = new t2(), y(this.h, 0, 3, this.v), y(e = this.h, 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.h, O, 1);
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
      const t = qe(e.da(), Z, 1).filter(((r) => (Ae(r, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
      if (e.s = [], t.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      t.length === 1 && (((s = (n = E(t[0], fe, 7)) == null ? void 0 : n.l()) == null ? void 0 : s.g()) ?? /* @__PURE__ */ new Map()).forEach(((r, i) => {
        e.s[Number(i)] = Ae(r, 1) ?? "";
      }));
    })(this);
  }
  segment(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.j = typeof t == "function" ? t : n, wo(this), Te(this, e, s), bo(this);
  }
  Ma(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.j = typeof n == "function" ? n : s, wo(this), Ge(this, e, r, t), bo(this);
  }
  Da() {
    return this.s;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect");
    const t = new fe();
    Me(t, s2, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), n.o(t), ge(e, n), cs(this, e), this.outputConfidenceMasks && (A(e, "confidence_masks"), v(n, "CONFIDENCE_MASKS:confidence_masks"), Ut(this, "confidence_masks"), this.g.ca("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], d(this, s);
    }))), this.outputCategoryMask && (A(e, "category_mask"), v(n, "CATEGORY_MASK:category_mask"), Ut(this, "category_mask"), this.g.U("category_mask", ((s, r) => {
      this.categoryMask = Vt(this, s, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, d(this, s);
    }))), A(e, "quality_scores"), v(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, d(this, s);
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
var Js = class {
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
Js.prototype.close = Js.prototype.close;
var q1 = class extends f {
  constructor(e) {
    super(e);
  }
}, Tt = [0, B, -2], Un = [0, je, -3, I, je, -1], vo = [0, Un], Eo = [0, Un, B, -1], Os = class extends f {
  constructor(e) {
    super(e);
  }
}, Ao = [0, je, -1, I], J1 = class extends f {
  constructor(e) {
    super(e);
  }
}, ko = class extends f {
  constructor(e) {
    super(e);
  }
}, Qs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], b2 = class extends f {
  constructor(e) {
    super(e);
  }
};
b2.prototype.g = is([0, z, [0, Qs, S, Un, S, [0, Un, Tt], S, vo, S, [0, vo, Tt], S, Ao, S, [0, je, -3, I, ke], S, [0, je, -3, I], S, [0, k, je, -2, I, B, I, -1, 2, je, Tt], S, Eo, S, [0, Eo, Tt], je, Tt, k, S, [0, je, -3, I, Tt, -1], S, [0, z, Ao]], k, [0, k, B, -1, I]]);
var De = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new $r(), this.s = new t2(), y(this.h, 0, 3, this.s), y(e = this.h, 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  segment(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    this.j = typeof n == "function" ? n : s, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.B + 1, s = new b2();
    const i = new ko();
    var o = new q1();
    if (Ue(o, 1, 255), y(i, 0, 12, o), t.keypoint && t.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (t.keypoint) {
      var a = new Os();
      dn(a, 3, !0), p(a, 1, t.keypoint.x), p(a, 2, t.keypoint.y), an(i, 5, Qs, a);
    } else {
      if (!t.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a of (o = new J1(), t.scribble)) dn(t = new Os(), 3, !0), p(t, 1, a.x), p(t, 2, a.y), Rn(o, 1, Os, t);
      an(i, 15, Qs, o);
    }
    Rn(s, 1, ko, i), this.g.addProtoToStream(s.g(), "drishti.RenderData", "roi_in", n), Te(this, e, r);
    e: {
      try {
        const c = new Js(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = c;
          break e;
        }
        this.j(c);
      } finally {
        us(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "roi_in"), x(e, "norm_rect_in");
    const t = new fe();
    Me(t, s2, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), L(n, "IMAGE:image_in"), L(n, "ROI:roi_in"), L(n, "NORM_RECT:norm_rect_in"), n.o(t), ge(e, n), cs(this, e), this.outputConfidenceMasks && (A(e, "confidence_masks"), v(n, "CONFIDENCE_MASKS:confidence_masks"), Ut(this, "confidence_masks"), this.g.ca("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Vt(this, i, !0, !this.j))), d(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], d(this, s);
    }))), this.outputCategoryMask && (A(e, "category_mask"), v(n, "CATEGORY_MASK:category_mask"), Ut(this, "category_mask"), this.g.U("category_mask", ((s, r) => {
      this.categoryMask = Vt(this, s, !1, !this.j), d(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, d(this, s);
    }))), A(e, "quality_scores"), v(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, d(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, d(this, s);
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
var we = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "input_frame_gpu", "norm_rect", !1), this.j = { detections: [] }, y(e = this.h = new r2(), 0, 1, t = new O());
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? F(this.h, 2, Wt(e.displayNamesLocale)) : "displayNamesLocale" in e && F(this.h, 2), e.maxResults !== void 0 ? Ue(this.h, 3, e.maxResults) : "maxResults" in e && F(this.h, 3), e.scoreThreshold !== void 0 ? p(this.h, 4, e.scoreThreshold) : "scoreThreshold" in e && F(this.h, 4), e.categoryAllowlist !== void 0 ? Dn(this.h, 5, e.categoryAllowlist) : "categoryAllowlist" in e && F(this.h, 5), e.categoryDenylist !== void 0 ? Dn(this.h, 6, e.categoryDenylist) : "categoryDenylist" in e && F(this.h, 6), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, Te(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ge(this, e, n, t), this.j;
  }
  m() {
    var e = new ae();
    x(e, "input_frame_gpu"), x(e, "norm_rect"), A(e, "detections");
    const t = new fe();
    Me(t, z1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), L(n, "IMAGE:input_frame_gpu"), L(n, "NORM_RECT:norm_rect"), v(n, "DETECTIONS:detections"), n.o(t), ge(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = Pa(i), this.j.detections.push(o2(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      d(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
we.prototype.detectForVideo = we.prototype.F, we.prototype.detect = we.prototype.D, we.prototype.setOptions = we.prototype.o, we.createFromModelPath = async function(e, t) {
  return b(we, e, { baseOptions: { modelAssetPath: t } });
}, we.createFromModelBuffer = function(e, t) {
  return b(we, e, { baseOptions: { modelAssetBuffer: t } });
}, we.createFromOptions = function(e, t) {
  return b(we, e, t);
};
var Zs = class {
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
function So(e) {
  e.landmarks = [], e.worldLandmarks = [], e.segmentationMasks = void 0;
}
function To(e) {
  try {
    const t = new Zs(e.landmarks, e.worldLandmarks, e.segmentationMasks);
    if (!e.s) return t;
    e.s(t);
  } finally {
    us(e);
  }
}
Zs.prototype.close = Zs.prototype.close;
var de = class extends oe {
  constructor(e, t) {
    super(new Se(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, y(e = this.h = new i2(), 0, 1, t = new O()), this.v = new Ja(), y(this.h, 0, 3, this.v), this.j = new qa(), y(this.h, 0, 2, this.j), Ue(this.j, 4, 1), p(this.j, 2, 0.5), p(this.v, 2, 0.5), p(this.h, 4, 0.5);
  }
  get baseOptions() {
    return E(this.h, O, 1);
  }
  set baseOptions(e) {
    y(this.h, 0, 1, e);
  }
  o(e) {
    return "numPoses" in e && Ue(this.j, 4, e.numPoses ?? 1), "minPoseDetectionConfidence" in e && p(this.j, 2, e.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && p(this.h, 4, e.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in e && p(this.v, 2, e.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in e && (this.outputSegmentationMasks = e.outputSegmentationMasks ?? !1), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.s = typeof t == "function" ? t : n, So(this), Te(this, e, s), To(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.s = typeof n == "function" ? n : s, So(this), Ge(this, e, r, t), To(this);
  }
  m() {
    var e = new ae();
    x(e, "image_in"), x(e, "norm_rect"), A(e, "normalized_landmarks"), A(e, "world_landmarks"), A(e, "segmentation_masks");
    const t = new fe();
    Me(t, W1, this.h);
    const n = new Z();
    me(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), L(n, "IMAGE:image_in"), L(n, "NORM_RECT:norm_rect"), v(n, "NORM_LANDMARKS:normalized_landmarks"), v(n, "WORLD_LANDMARKS:world_landmarks"), n.o(t), ge(e, n), cs(this, e), this.g.attachProtoVectorListener("normalized_landmarks", ((s, r) => {
      this.landmarks = [];
      for (const i of s) s = _n(i), this.landmarks.push(hs(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("normalized_landmarks", ((s) => {
      this.landmarks = [], d(this, s);
    })), this.g.attachProtoVectorListener("world_landmarks", ((s, r) => {
      this.worldLandmarks = [];
      for (const i of s) s = It(i), this.worldLandmarks.push(cn(s));
      d(this, r);
    })), this.g.attachEmptyPacketListener("world_landmarks", ((s) => {
      this.worldLandmarks = [], d(this, s);
    })), this.outputSegmentationMasks && (v(n, "SEGMENTATION_MASK:segmentation_masks"), Ut(this, "segmentation_masks"), this.g.ca("segmentation_masks", ((s, r) => {
      this.segmentationMasks = s.map(((i) => Vt(this, i, !0, !this.s))), d(this, r);
    })), this.g.attachEmptyPacketListener("segmentation_masks", ((s) => {
      this.segmentationMasks = [], d(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
de.prototype.detectForVideo = de.prototype.F, de.prototype.detect = de.prototype.D, de.prototype.setOptions = de.prototype.o, de.createFromModelPath = function(e, t) {
  return b(de, e, { baseOptions: { modelAssetPath: t } });
}, de.createFromModelBuffer = function(e, t) {
  return b(de, e, { baseOptions: { modelAssetBuffer: t } });
}, de.createFromOptions = function(e, t) {
  return b(de, e, t);
}, de.POSE_CONNECTIONS = w2;
function Gn(e, t, n) {
  return e * (1 - n) + t * n;
}
function Q1(e, t, n) {
  return {
    x: Gn(e.x, t.x, n),
    y: Gn(e.y, t.y, n)
  };
}
function Xe(e, t) {
  const n = t.x - e.x, s = t.y - e.y;
  return Math.sqrt(n * n + s * s);
}
function v2(e, t) {
  return Math.atan2(t.y - e.y, t.x - e.x);
}
function Z1(e, t, n) {
  if (e.length < 264)
    return {
      center: { x: t / 2, y: n / 2 },
      scale: 1,
      rotation: 0
    };
  const i = e[33], o = e[263], a = (i.x + o.x) / 2, h = (i.y + o.y) / 2, c = {
    x: a * t,
    y: h * n
  }, l = Xe(
    { x: i.x * t, y: i.y * n },
    { x: o.x * t, y: o.y * n }
  ) / n * 3, w = v2(
    { x: i.x * t, y: i.y * n },
    { x: o.x * t, y: o.y * n }
  );
  return { center: c, scale: l, rotation: w };
}
function eh(e, t, n) {
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
  const u = e[33], l = e[263], w = e[10], M = e[152], X = e[234], he = e[454], Y = {
    x: (u.x + l.x) / 2 * t,
    y: (u.y + l.y) / 2 * n
  }, ce = {
    x: w.x * t,
    y: w.y * n
  }, Fe = {
    x: M.x * t,
    y: M.y * n
  }, He = Xe(
    { x: u.x * t, y: u.y * n },
    { x: l.x * t, y: l.y * n }
  ), Ze = Xe(ce, Fe), pt = Xe(
    { x: X.x * t, y: X.y * n },
    { x: he.x * t, y: he.y * n }
  ), Le = v2(
    { x: u.x * t, y: u.y * n },
    { x: l.x * t, y: l.y * n }
  );
  return {
    center: Y,
    forehead: ce,
    chin: Fe,
    eyeDistance: He,
    faceHeight: Ze,
    faceWidth: pt,
    rotation: Le
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
}, Ps = /* @__PURE__ */ new Map();
async function E2(e) {
  const t = Ps.get(e);
  if (t)
    return t;
  const n = gt.forVisionTasks(e).catch((s) => {
    throw Ps.delete(e), s;
  });
  return Ps.set(e, n), n;
}
function th() {
  var e;
  if (typeof window > "u")
    return !1;
  if (window.__BRUSH_DEBUG__ === !0)
    return !0;
  try {
    return new URLSearchParams(window.location.search).get("debug") === "1" ? !0 : ((e = window.localStorage) == null ? void 0 : e.getItem("brushDebug")) === "1";
  } catch {
    return !1;
  }
}
function W(...e) {
  th() && console.log(...e);
}
class nh {
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
      W("[FaceTracker] 初始化中..."), s !== void 0 && (this.smoothingAlpha = s);
      const r = Fo(t), i = Fo(
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
          const h = await E2(a);
          W("[FaceTracker] WASM 已加载:", a);
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
              ), W("[FaceTracker] FaceLandmarker 初始化完成:", c), this.isInitialized = !0;
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
      const r = s.faceLandmarks[0], i = this.extractBlendshapes(s), o = t.videoWidth || 640, a = t.videoHeight || 480, h = Z1(
        r,
        o,
        a
      );
      this.smoothedCenter = Q1(
        this.smoothedCenter,
        h.center,
        this.smoothingAlpha
      ), this.smoothedScale = Gn(
        this.smoothedScale,
        h.scale,
        this.smoothingAlpha
      ), this.smoothedRotation = Gn(
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
function Fo(e, t = []) {
  const n = [];
  return e && (Array.isArray(e) ? n.push(...e) : n.push(e)), t && t.length > 0 && n.push(...t), Array.from(new Set(n.filter(Boolean)));
}
class sh {
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
      W("[HandTracker] 初始化中...");
      const s = Lo(t), r = Lo(
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
          const a = await E2(o);
          W("[HandTracker] WASM 已加载:", o);
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
              ), W("[HandTracker] HandLandmarker 初始化完成:", h), this.isInitialized = !0;
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
function Lo(e, t = []) {
  const n = [];
  return e && (Array.isArray(e) ? n.push(...e) : n.push(e)), t && t.length > 0 && n.push(...t), Array.from(new Set(n.filter(Boolean)));
}
class rh {
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
class ih {
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
    const r = Xe(t, n), i = Xe(s, t);
    return r < i * 0.55;
  }
  /**
   * 计算手部展开程度（0 = 完全握拳，1 = 完全张开）
   */
  calculateHandSpread(t) {
    const n = t[9];
    let s = 0;
    for (const a of this.fingerTipIndices)
      s += Xe(t[a], n);
    const r = s / this.fingerTipIndices.length, i = Xe(t[0], t[this.fingerTipIndices[1]]);
    return Math.min(r / (i * 0.5), 1);
  }
  /**
   * 重置状态（简化版本，无需稳定性追踪）
   */
  reset() {
  }
}
class oh {
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
    this.prevHandPos && (o = Xe(this.prevHandPos, i) / Math.sqrt(n * s)), this.prevHandPos = { ...i }, this.speedHistory.push(o), this.speedHistory.length > this.maxHistorySize && this.speedHistory.shift();
    const a = this.speedHistory.length > 0 ? this.speedHistory.reduce((Y, ce) => Y + ce, 0) / this.speedHistory.length : 0, h = this.speedHistory.filter(
      (Y) => Y > this.speedThreshold
    ).length, c = this.speedHistory.length > 0 ? h / this.speedHistory.length : 0;
    c > this.highSpeedRatio ? this.stableFrames++ : this.stableFrames = 0;
    const l = this.stableFrames >= this.requiredStableFrames, w = Math.min(
      o / (this.speedThreshold * 2),
      1
    ), M = Math.max(
      0,
      (c - this.highSpeedRatio) / (1 - this.highSpeedRatio)
    ), X = Math.min(
      this.stableFrames / this.requiredStableFrames,
      1
    ), he = Math.min(
      w * M * X,
      1
    );
    return {
      isShaking: l,
      currentSpeed: o,
      avgSpeed: a,
      highSpeedRatio: c,
      confidence: he
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
class ah {
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
    this.teethGate = new rh(0.4, 0.05, 167, 20), this.fist = new ih(2), this.shake = new oh(8e-3, 500, 0.06, 80, 20);
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
      const w = o.isFist, M = a.isShaking;
      if (w && M) {
        this.brushingStartTime === 0 && (this.brushingStartTime = r, W("[BrushGesture] 检测到握拳+晃动，开始计时"));
        const X = r - this.brushingStartTime;
        u = !0, c = "brushing", X >= this.minBrushingDuration && (c = "complete", this.completionCount++, W("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0);
      } else if (this.brushingStartTime > 0) {
        const X = r - this.brushingStartTime;
        X >= this.minBrushingDuration ? (c = "complete", this.completionCount++, W("[BrushGesture] ✅ 成功完成刷牙动作！次数:", this.completionCount), this.brushingStartTime = 0) : (W("[BrushGesture] 动作中断，已持续:", X, "ms"), this.brushingStartTime = 0, c = "teeth_open");
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
    for (const M of c)
      u += Math.abs(M.dy), l += Math.abs(M.dx);
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
class hh {
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
    this.brushGesture = new ah(), this.gameDuration = t, this.scorePerBrush = n;
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
    this.currentState === "playing" && W(
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
        Date.now() - this.successStateEnterTime > 500 && (t.stage !== "waiting" ? (W("[GameStateMachine] success 状态 500ms 后，继续 playing"), this.transitionTo("playing")) : (W("[GameStateMachine] success 状态 500ms 后，露牙锁定超时，回到 ready"), this.transitionTo("ready")));
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
    }), W(
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
    }), W(`[GameStateMachine] 状态转移: ${n} -> ${t}`);
  }
  /**
   * 结束游戏
   */
  endGame() {
    this.transitionTo("gameover"), this.emitEvent({
      type: "game_over",
      timestamp: Date.now(),
      data: this.gameStats
    }), W("[GameStateMachine] 游戏结束，最终统计:", this.gameStats);
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
class ch {
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
          this.avatarImage = r, this.isLoading = !1, W("[AvatarRenderer] 头套加载完成:", t, r.width, "x", r.height), n();
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
    var He, Ze, pt, Le;
    if (!this.avatarImage || !n.landmarks)
      return;
    const o = eh(
      n.landmarks,
      r,
      i
    ), a = o.faceWidth * 2.2 / this.avatarImage.width, h = s.scale || 1, c = a * h, u = this.avatarImage.width * c, l = this.avatarImage.height * c, w = (((He = s.faceHoleOffset) == null ? void 0 : He.x) || 0) * u, M = (((Ze = s.faceHoleOffset) == null ? void 0 : Ze.y) || 0) * l, X = (((pt = s.anchorOffset) == null ? void 0 : pt.x) || 0) * u, he = (((Le = s.anchorOffset) == null ? void 0 : Le.y) || 0) * l, Y = o.center.x - w + X, ce = o.center.y - M + he, Fe = o.rotation;
    t.save(), t.translate(Y, ce), t.rotate(Fe), t.drawImage(
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
const uh = 4, er = [
  {
    id: "owl",
    name: "🦉 猫头鹰",
    imgUrl: "SkinSet/owl.webp",
    faceHoleOffset: { x: 0, y: 0.3 },
    anchorOffset: { x: 0, y: -0.18 },
    scale: 0.75
  },
  {
    id: "cat",
    name: "🐱 猫咪",
    imgUrl: "SkinSet/cat.webp",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  },
  {
    id: "dog",
    name: "🐶 小狗",
    imgUrl: "SkinSet/dog.webp",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  },
  {
    id: "rabbit",
    name: "🐰 兔子",
    imgUrl: "SkinSet/rabbit.webp",
    faceHoleOffset: { x: 0, y: 0.25 },
    anchorOffset: { x: 0, y: -0.15 },
    scale: 1
  }
];
function lh(e, t) {
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
  const n = e.avatarId || "owl", s = er.find((i) => i.id === n) || er[0];
  let r = s.imgUrl;
  return !r.startsWith("http") && !r.startsWith("/") && !r.startsWith("data:") && (r = t + "/" + r), { ...s, imgUrl: r };
}
function dh(e, t) {
  if (/^https?:\/\//i.test(t)) return t;
  const n = e.replace(/\/$/, "");
  return t.startsWith("/") ? n + t : n + "/" + t;
}
function Rs(e, t) {
  const n = t.filter(Boolean).map((s) => dh(e, s));
  return Array.from(new Set(n));
}
async function fh(e, t) {
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
async function ph(e, t) {
  t == null || t("camera", 0.1);
  const s = await fh({
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
async function yh(e) {
  var mi, gi;
  const { canvas: t, avatarCanvas: n, onState: s, onScore: r, onGameOver: i, onError: o, onProgress: a, debug: h = !1 } = e, c = e.basePath || window.location.origin, u = e.modelBasePath || window.location.origin, l = e.gameDurationMs || 6e4, w = e.enableCapture !== !1, M = Math.max(0, Math.floor(e.captureCount ?? uh)), X = Math.max(320, e.captureMaxSize || 800), he = Math.min(0.95, Math.max(0.5, e.captureQuality ?? 0.85)), Y = e.onCapture;
  let ce = !0, Fe = !1, He = null, Ze = null;
  const pt = [];
  let Le = [], Jt = 0, ai = 0;
  const ps = new nh(), ms = new sh(), xe = new hh(l), gs = new ch();
  let j = e.video, hi = !1;
  j || (j = document.createElement("video"), j.setAttribute("playsinline", "true"), j.setAttribute("autoplay", "true"), j.muted = !0, j.style.display = "none", document.body.appendChild(j), hi = !0);
  const et = t.getContext("2d");
  if (!et)
    throw new Error("Failed to get 2D context from canvas");
  const ys = n ? n.getContext("2d") : null, Qt = !!(n && ys), ci = lh(e, c);
  let ui = 0, _s = 0, li = 0, di = 0;
  const A2 = 1e3 / 20;
  let fi = 0, At = null, ws = null;
  try {
    let tt = function(q) {
      if (!ce) return;
      _s++, q - di >= 1e3 && (li = _s, _s = 0, di = q);
      const nt = q - ui;
      if (ui = q, (t.width !== j.videoWidth || t.height !== j.videoHeight) && j.videoWidth > 0 && j.videoHeight > 0 && (t.width = j.videoWidth, t.height = j.videoHeight), Qt && ((n.width !== t.width || n.height !== t.height) && (n.width = t.width, n.height = t.height), ys.clearRect(0, 0, n.width, n.height)), et.save(), et.translate(t.width, 0), et.scale(-1, 1), et.drawImage(j, 0, 0, t.width, t.height), et.restore(), !Fe && q - fi >= A2) {
        fi = q, At = ps.detectForVideo(j, q), ws = ms.detectForVideo(j, q);
        const ne = {
          faceResult: At,
          handResult: ws
        };
        xe.update(ne, nt);
      }
      if (At && At.landmarks) {
        const ne = Qt ? ys : et, Ve = Qt ? n.width : t.width, J = Qt ? n.height : t.height;
        ne.save(), ne.translate(Ve, 0), ne.scale(-1, 1), gs.render(ne, At, ci, Ve, J), ne.restore();
      }
      if (w && Jt < Le.length) {
        const ne = q - ai, Ve = Le[Jt];
        if (ne >= Ve) {
          try {
            let J = t.width, st = t.height;
            if (t.width > X || t.height > X) {
              const tn = X / Math.max(t.width, t.height);
              J = Math.round(t.width * tn), st = Math.round(t.height * tn);
            }
            const kt = document.createElement("canvas");
            kt.width = J, kt.height = st;
            const en = kt.getContext("2d");
            if (en) {
              en.drawImage(t, 0, 0, J, st), Qt && en.drawImage(n, 0, 0, J, st);
              const tn = kt.toDataURL("image/jpeg", he);
              pt.push(tn), W(`[BrushGame] 抓拍 ${Jt + 1}/${M} @ ${(ne / 1e3).toFixed(1)}s`), Y == null || Y(tn, Jt);
            }
          } catch (J) {
            console.error("[BrushGame] 抓拍失败:", J);
          }
          Jt++;
        }
      }
      h && mh(et, t, At, ws, li, xe), He = requestAnimationFrame(tt);
    };
    a == null || a("camera", 0), Ze = await ph(j, a), a == null || a("models", 0);
    const Zt = Rs(u, Ne.wasmPaths), k2 = Rs(
      u,
      [Ne.models.face, ...((mi = Ne.models.fallback) == null ? void 0 : mi.face) || []]
    ), S2 = Rs(
      u,
      [Ne.models.hand, ...((gi = Ne.models.fallback) == null ? void 0 : gi.hand) || []]
    );
    if (await Promise.all([
      ps.initialize(k2, Zt),
      ms.initialize(S2, Zt)
    ]), a == null || a("models", 1), a == null || a("avatar", 0), await gs.loadAvatar(ci.imgUrl), a == null || a("avatar", 1), xe.initialize(), xe.addEventListener("state_changed", (q) => {
      s == null || s(xe.getState(), q);
    }), xe.addEventListener("brush_success", (q) => {
      var Ve;
      const nt = xe.getStats(), ne = ((Ve = q.data) == null ? void 0 : Ve.points) || 0;
      r == null || r(nt, ne);
    }), xe.addEventListener("game_over", (q) => {
      const nt = q.data;
      i == null || i(nt);
    }), w && M > 0) {
      const nt = l - 5e3, ne = nt - 3e3, Ve = Math.max(5e3, ne / (M + 1));
      Le = [];
      for (let J = 0; J < M; J++) {
        const st = 3e3 + Ve * (J + 1), kt = (Math.random() - 0.5) * 3e3, en = Math.max(3e3, Math.min(nt, st + kt));
        Le.push(en);
      }
      Le.sort((J, st) => J - st), W("[BrushGame] 抓拍调度:", Le.map((J) => (J / 1e3).toFixed(1) + "s"));
    }
    ai = performance.now(), a == null || a("ready", 1), He = requestAnimationFrame(tt);
  } catch (tt) {
    pi();
    const Zt = tt instanceof Error ? tt : new Error(String(tt));
    throw o == null || o(Zt), Zt;
  }
  function pi() {
    ce = !1, He !== null && cancelAnimationFrame(He), Ze && Ze.getTracks().forEach((tt) => tt.stop()), hi && j && j.remove(), ps.dispose(), ms.dispose(), gs.dispose();
  }
  return {
    stop: pi,
    getState: () => xe.getState(),
    getStats: () => xe.getStats(),
    getRemainingTime: () => xe.getRemainingTime(),
    pause: () => {
      Fe = !0;
    },
    resume: () => {
      Fe = !1;
    },
    getCapturedPhotos: () => [...pt]
    // 返回副本
  };
}
function mh(e, t, n, s, r, i) {
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
const _h = {
  avatars: er,
  mediaPipe: Ne
};
export {
  _h as config,
  yh as start
};
