/*! @sentry/browser 5.7.1 (821435f5) | https://github.com/getsentry/sentry-javascript */
var Sentry = (function (n) {
  var t = function (n, r) {
    return (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (n, t) {
          n.__proto__ = t;
        }) ||
      function (n, t) {
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
      })(n, r);
  };
  function r(n, r) {
    function e() {
      this.constructor = n;
    }
    t(n, r),
      (n.prototype =
        null === r ? Object.create(r) : ((e.prototype = r.prototype), new e()));
  }
  var e = function () {
    return (e =
      Object.assign ||
      function (n) {
        for (var t, r = 1, e = arguments.length; r < e; r++)
          for (var i in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
        return n;
      }).apply(this, arguments);
  };
  function i(n, t) {
    var r = "function" == typeof Symbol && n[Symbol.iterator];
    if (!r) return n;
    var e,
      i,
      o = r.call(n),
      u = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(e = o.next()).done; )
        u.push(e.value);
    } catch (n) {
      i = { error: n };
    } finally {
      try {
        e && !e.done && (r = o.return) && r.call(o);
      } finally {
        if (i) throw i.error;
      }
    }
    return u;
  }
  function o() {
    for (var n = [], t = 0; t < arguments.length; t++)
      n = n.concat(i(arguments[t]));
    return n;
  }
  var u, c, s;
  !(function (n) {
    (n[(n.None = 0)] = "None"),
      (n[(n.Error = 1)] = "Error"),
      (n[(n.Debug = 2)] = "Debug"),
      (n[(n.Verbose = 3)] = "Verbose");
  })(u || (u = {})),
    ((c = n.Severity || (n.Severity = {})).Fatal = "fatal"),
    (c.Error = "error"),
    (c.Warning = "warning"),
    (c.Log = "log"),
    (c.Info = "info"),
    (c.Debug = "debug"),
    (c.Critical = "critical"),
    (function (n) {
      n.fromString = function (t) {
        switch (t) {
          case "debug":
            return n.Debug;
          case "info":
            return n.Info;
          case "warn":
          case "warning":
            return n.Warning;
          case "error":
            return n.Error;
          case "fatal":
            return n.Fatal;
          case "critical":
            return n.Critical;
          case "log":
          default:
            return n.Log;
        }
      };
    })(n.Severity || (n.Severity = {})),
    ((s = n.Status || (n.Status = {})).Unknown = "unknown"),
    (s.Skipped = "skipped"),
    (s.Success = "success"),
    (s.RateLimit = "rate_limit"),
    (s.Invalid = "invalid"),
    (s.Failed = "failed"),
    (function (n) {
      n.fromHttpCode = function (t) {
        return t >= 200 && t < 300
          ? n.Success
          : 429 === t
          ? n.RateLimit
          : t >= 400 && t < 500
          ? n.Invalid
          : t >= 500
          ? n.Failed
          : n.Unknown;
      };
    })(n.Status || (n.Status = {}));
  var a =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (n, t) {
          return (n.__proto__ = t), n;
        }
      : function (n, t) {
          for (var r in t) n.hasOwnProperty(r) || (n[r] = t[r]);
          return n;
        });
  var f = (function (n) {
    function t(t) {
      var r = this.constructor,
        e = n.call(this, t) || this;
      return (
        (e.message = t),
        (e.name = r.prototype.constructor.name),
        a(e, r.prototype),
        e
      );
    }
    return r(t, n), t;
  })(Error);
  function h(n) {
    switch (Object.prototype.toString.call(n)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return n instanceof Error;
    }
  }
  function v(n) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(n);
  }
  function l(n) {
    return "[object DOMError]" === Object.prototype.toString.call(n);
  }
  function d(n) {
    return "[object String]" === Object.prototype.toString.call(n);
  }
  function p(n) {
    return null === n || ("object" != typeof n && "function" != typeof n);
  }
  function y(n) {
    return "[object Object]" === Object.prototype.toString.call(n);
  }
  function m(n) {
    return "undefined" != typeof Event && n instanceof Event;
  }
  function w(n) {
    return "undefined" != typeof Element && n instanceof Element;
  }
  function b(n) {
    return Boolean(n && n.then && "function" == typeof n.then);
  }
  function g() {
    return (
      "[object process]" ===
      Object.prototype.toString.call(
        "undefined" != typeof process ? process : 0
      )
    );
  }
  var E = {};
  function x() {
    return g()
      ? global
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : E;
  }
  function j() {
    var n = x(),
      t = n.crypto || n.msCrypto;
    if (void 0 !== t && t.getRandomValues) {
      var r = new Uint16Array(8);
      t.getRandomValues(r),
        (r[3] = (4095 & r[3]) | 16384),
        (r[4] = (16383 & r[4]) | 32768);
      var e = function (n) {
        for (var t = n.toString(16); t.length < 4; ) t = "0" + t;
        return t;
      };
      return (
        e(r[0]) +
        e(r[1]) +
        e(r[2]) +
        e(r[3]) +
        e(r[4]) +
        e(r[5]) +
        e(r[6]) +
        e(r[7])
      );
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (n) {
      var t = (16 * Math.random()) | 0;
      return ("x" === n ? t : (3 & t) | 8).toString(16);
    });
  }
  function _(n) {
    if (!n) return {};
    var t = n.match(
      /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!t) return {};
    var r = t[6] || "",
      e = t[8] || "";
    return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + r + e };
  }
  function S(n) {
    if (n.message) return n.message;
    if (n.exception && n.exception.values && n.exception.values[0]) {
      var t = n.exception.values[0];
      return t.type && t.value
        ? t.type + ": " + t.value
        : t.type || t.value || n.event_id || "<unknown>";
    }
    return n.event_id || "<unknown>";
  }
  function O(n) {
    var t = x();
    if (!("console" in t)) return n();
    var r = t.console,
      e = {};
    ["debug", "info", "warn", "error", "log", "assert"].forEach(function (n) {
      n in t.console &&
        r[n].__sentry__ &&
        ((e[n] = r[n].__sentry_wrapped__), (r[n] = r[n].__sentry_original__));
    });
    var i = n();
    return (
      Object.keys(e).forEach(function (n) {
        r[n] = e[n];
      }),
      i
    );
  }
  function k(n, t, r) {
    (n.exception = n.exception || {}),
      (n.exception.values = n.exception.values || []),
      (n.exception.values[0] = n.exception.values[0] || {}),
      (n.exception.values[0].value = n.exception.values[0].value || t || ""),
      (n.exception.values[0].type = n.exception.values[0].type || r || "Error");
  }
  function T(n, t) {
    void 0 === t && (t = {});
    try {
      (n.exception.values[0].mechanism = n.exception.values[0].mechanism || {}),
        Object.keys(t).forEach(function (r) {
          n.exception.values[0].mechanism[r] = t[r];
        });
    } catch (n) {}
  }
  function R() {
    try {
      return document.location.href;
    } catch (n) {
      return "";
    }
  }
  function D(n) {
    try {
      for (
        var t = n, r = [], e = 0, i = 0, o = " > ".length, u = void 0;
        t &&
        e++ < 5 &&
        !(
          "html" === (u = I(t)) ||
          (e > 1 && i + r.length * o + u.length >= 80)
        );

      )
        r.push(u), (i += u.length), (t = t.parentNode);
      return r.reverse().join(" > ");
    } catch (n) {
      return "<unknown>";
    }
  }
  function I(n) {
    var t,
      r,
      e,
      i,
      o,
      u = [];
    if (!n || !n.tagName) return "";
    if (
      (u.push(n.tagName.toLowerCase()),
      n.id && u.push("#" + n.id),
      (t = n.className) && d(t))
    )
      for (r = t.split(/\s+/), o = 0; o < r.length; o++) u.push("." + r[o]);
    var c = ["type", "name", "title", "alt"];
    for (o = 0; o < c.length; o++)
      (e = c[o]), (i = n.getAttribute(e)) && u.push("[" + e + '="' + i + '"]');
    return u.join("");
  }
  var C = x(),
    N = "Sentry Logger ",
    M = (function () {
      function n() {
        this.t = !1;
      }
      return (
        (n.prototype.disable = function () {
          this.t = !1;
        }),
        (n.prototype.enable = function () {
          this.t = !0;
        }),
        (n.prototype.log = function () {
          for (var n = [], t = 0; t < arguments.length; t++)
            n[t] = arguments[t];
          this.t &&
            O(function () {
              C.console.log(N + "[Log]: " + n.join(" "));
            });
        }),
        (n.prototype.warn = function () {
          for (var n = [], t = 0; t < arguments.length; t++)
            n[t] = arguments[t];
          this.t &&
            O(function () {
              C.console.warn(N + "[Warn]: " + n.join(" "));
            });
        }),
        (n.prototype.error = function () {
          for (var n = [], t = 0; t < arguments.length; t++)
            n[t] = arguments[t];
          this.t &&
            O(function () {
              C.console.error(N + "[Error]: " + n.join(" "));
            });
        }),
        n
      );
    })();
  C.__SENTRY__ = C.__SENTRY__ || {};
  var U,
    A = C.__SENTRY__.logger || (C.__SENTRY__.logger = new M()),
    L = (function () {
      function n() {
        (this.i = "function" == typeof WeakSet),
          (this.o = this.i ? new WeakSet() : []);
      }
      return (
        (n.prototype.memoize = function (n) {
          if (this.i) return !!this.o.has(n) || (this.o.add(n), !1);
          for (var t = 0; t < this.o.length; t++) {
            if (this.o[t] === n) return !0;
          }
          return this.o.push(n), !1;
        }),
        (n.prototype.unmemoize = function (n) {
          if (this.i) this.o.delete(n);
          else
            for (var t = 0; t < this.o.length; t++)
              if (this.o[t] === n) {
                this.o.splice(t, 1);
                break;
              }
        }),
        n
      );
    })();
  function q(n, t) {
    return (
      void 0 === t && (t = 0),
      "string" != typeof n || 0 === t
        ? n
        : n.length <= t
        ? n
        : n.substr(0, t) + "..."
    );
  }
  function F(n, t) {
    if (!Array.isArray(n)) return "";
    for (var r = [], e = 0; e < n.length; e++) {
      var i = n[e];
      try {
        r.push(String(i));
      } catch (n) {
        r.push("[value cannot be serialized]");
      }
    }
    return r.join(t);
  }
  function H(n, t) {
    return (
      (r = t),
      "[object RegExp]" === Object.prototype.toString.call(r)
        ? t.test(n)
        : "string" == typeof t && -1 !== n.indexOf(t)
    );
    var r;
  }
  function P(n, t, r) {
    if (t in n) {
      var e = n[t],
        i = r(e);
      if ("function" == typeof i)
        try {
          (i.prototype = i.prototype || {}),
            Object.defineProperties(i, {
              __sentry__: { enumerable: !1, value: !0 },
              __sentry_original__: { enumerable: !1, value: e },
              __sentry_wrapped__: { enumerable: !1, value: i },
            });
        } catch (n) {}
      n[t] = i;
    }
  }
  function W(n) {
    if (h(n)) {
      var t = n,
        r = { message: t.message, name: t.name, stack: t.stack };
      for (var e in t)
        Object.prototype.hasOwnProperty.call(t, e) && (r[e] = t[e]);
      return r;
    }
    if (m(n)) {
      var i = {};
      i.type = n.type;
      try {
        i.target = w(n.target)
          ? D(n.target)
          : Object.prototype.toString.call(n.target);
      } catch (n) {
        i.target = "<unknown>";
      }
      try {
        i.currentTarget = w(n.currentTarget)
          ? D(n.currentTarget)
          : Object.prototype.toString.call(n.currentTarget);
      } catch (n) {
        i.currentTarget = "<unknown>";
      }
      for (var e in ("undefined" != typeof CustomEvent &&
        n instanceof CustomEvent &&
        (i.detail = n.detail),
      n))
        Object.prototype.hasOwnProperty.call(n, e) && (i[e] = n[e]);
      return i;
    }
    return n;
  }
  function B(n) {
    return (function (n) {
      return ~-encodeURI(n).split(/%..|./).length;
    })(JSON.stringify(n));
  }
  function $(n, t, r) {
    void 0 === t && (t = 3), void 0 === r && (r = 102400);
    var e = J(n, t);
    return B(e) > r ? $(n, t - 1, r) : e;
  }
  function X(n, t) {
    return "domain" === t && "object" == typeof n && n.u
      ? "[Domain]"
      : "domainEmitter" === t
      ? "[DomainEmitter]"
      : "undefined" != typeof global && n === global
      ? "[Global]"
      : "undefined" != typeof window && n === window
      ? "[Window]"
      : "undefined" != typeof document && n === document
      ? "[Document]"
      : y((r = n)) &&
        "nativeEvent" in r &&
        "preventDefault" in r &&
        "stopPropagation" in r
      ? "[SyntheticEvent]"
      : "number" == typeof n && n != n
      ? "[NaN]"
      : void 0 === n
      ? "[undefined]"
      : "function" == typeof n
      ? "[Function: " + (n.name || "<unknown-function-name>") + "]"
      : n;
    var r;
  }
  function G(n, t, r, e) {
    if ((void 0 === r && (r = 1 / 0), void 0 === e && (e = new L()), 0 === r))
      return (function (n) {
        var t = Object.prototype.toString.call(n);
        if ("string" == typeof n) return n;
        if ("[object Object]" === t) return "[Object]";
        if ("[object Array]" === t) return "[Array]";
        var r = X(n);
        return p(r) ? r : t;
      })(t);
    if (null != t && "function" == typeof t.toJSON) return t.toJSON();
    var i = X(t, n);
    if (p(i)) return i;
    var o = W(t),
      u = Array.isArray(t) ? [] : {};
    if (e.memoize(t)) return "[Circular ~]";
    for (var c in o)
      Object.prototype.hasOwnProperty.call(o, c) &&
        (u[c] = G(c, o[c], r - 1, e));
    return e.unmemoize(t), u;
  }
  function J(n, t) {
    try {
      return JSON.parse(
        JSON.stringify(n, function (n, r) {
          return G(n, r, t);
        })
      );
    } catch (n) {
      return "**non-serializable**";
    }
  }
  function z(n, t) {
    void 0 === t && (t = 40);
    var r = Object.keys(W(n));
    if ((r.sort(), !r.length)) return "[object has no keys]";
    if (r[0].length >= t) return q(r[0], t);
    for (var e = r.length; e > 0; e--) {
      var i = r.slice(0, e).join(", ");
      if (!(i.length > t)) return e === r.length ? i : q(i, t);
    }
    return "";
  }
  !(function (n) {
    (n.PENDING = "PENDING"),
      (n.RESOLVED = "RESOLVED"),
      (n.REJECTED = "REJECTED");
  })(U || (U = {}));
  var V = (function () {
      function n(n) {
        var t = this;
        (this.s = U.PENDING),
          (this.h = []),
          (this.v = function (n) {
            t.l(U.RESOLVED, n);
          }),
          (this.p = function (n) {
            t.l(U.REJECTED, n);
          }),
          (this.l = function (n, r) {
            t.s === U.PENDING &&
              (b(r) ? r.then(t.v, t.p) : ((t.s = n), (t.m = r), t.g()));
          }),
          (this.j = function (n) {
            (t.h = t.h.concat(n)), t.g();
          }),
          (this.g = function () {
            t.s !== U.PENDING &&
              (t.s === U.REJECTED
                ? t.h.forEach(function (n) {
                    n.onrejected && n.onrejected(t.m);
                  })
                : t.h.forEach(function (n) {
                    n.onfulfilled && n.onfulfilled(t.m);
                  }),
              (t.h = []));
          });
        try {
          n(this.v, this.p);
        } catch (n) {
          this.p(n);
        }
      }
      return (
        (n.prototype.toString = function () {
          return "[object SyncPromise]";
        }),
        (n.resolve = function (t) {
          return new n(function (n) {
            n(t);
          });
        }),
        (n.reject = function (t) {
          return new n(function (n, r) {
            r(t);
          });
        }),
        (n.all = function (t) {
          return new n(function (r, e) {
            if (Array.isArray(t))
              if (0 !== t.length) {
                var i = t.length,
                  o = [];
                t.forEach(function (t, u) {
                  n.resolve(t)
                    .then(function (n) {
                      (o[u] = n), 0 === (i -= 1) && r(o);
                    })
                    .then(null, e);
                });
              } else r([]);
            else e(new TypeError("Promise.all requires an array as input."));
          });
        }),
        (n.prototype.then = function (t, r) {
          var e = this;
          return new n(function (n, i) {
            e.j({
              onfulfilled: function (r) {
                if (t)
                  try {
                    return void n(t(r));
                  } catch (n) {
                    return void i(n);
                  }
                else n(r);
              },
              onrejected: function (t) {
                if (r)
                  try {
                    return void n(r(t));
                  } catch (n) {
                    return void i(n);
                  }
                else i(t);
              },
            });
          });
        }),
        (n.prototype.catch = function (n) {
          return this.then(function (n) {
            return n;
          }, n);
        }),
        (n.prototype.finally = function (t) {
          var r = this;
          return new n(function (n, e) {
            var i, o;
            return r
              .then(
                function (n) {
                  (o = !1), (i = n), t && t();
                },
                function (n) {
                  (o = !0), (i = n), t && t();
                }
              )
              .then(function () {
                o ? e(i) : n(i);
              });
          });
        }),
        n
      );
    })(),
    K = (function () {
      function n(n) {
        (this._ = n), (this.S = []);
      }
      return (
        (n.prototype.isReady = function () {
          return void 0 === this._ || this.length() < this._;
        }),
        (n.prototype.add = function (n) {
          var t = this;
          return this.isReady()
            ? (-1 === this.S.indexOf(n) && this.S.push(n),
              n
                .then(function () {
                  return t.remove(n);
                })
                .then(null, function () {
                  return t.remove(n).then(null, function () {});
                }),
              n)
            : V.reject(
                new f("Not adding Promise due to buffer limit reached.")
              );
        }),
        (n.prototype.remove = function (n) {
          return this.S.splice(this.S.indexOf(n), 1)[0];
        }),
        (n.prototype.length = function () {
          return this.S.length;
        }),
        (n.prototype.drain = function (n) {
          var t = this;
          return new V(function (r) {
            var e = setTimeout(function () {
              n && n > 0 && r(!1);
            }, n);
            V.all(t.S)
              .then(function () {
                clearTimeout(e), r(!0);
              })
              .then(null, function () {
                r(!0);
              });
          });
        }),
        n
      );
    })();
  function Q() {
    if (!("fetch" in x())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (n) {
      return !1;
    }
  }
  function Y() {
    if (!Q()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (n) {
      return !1;
    }
  }
  var Z = /^[ \t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \t]*$/,
    nn = (function () {
      function n(n, t, r, e) {
        void 0 === n && (n = j()),
          void 0 === t && (t = j().substring(16)),
          (this.O = n),
          (this.k = t),
          (this.T = r),
          (this.R = e);
      }
      return (
        (n.prototype.setParent = function (n) {
          return (this.R = n), this;
        }),
        (n.prototype.setSampled = function (n) {
          return (this.T = n), this;
        }),
        (n.fromTraceparent = function (t) {
          var r = t.match(Z);
          if (r) {
            var e = void 0;
            "1" === r[3] ? (e = !0) : "0" === r[3] && (e = !1);
            var i = new n(r[1], r[2], e);
            return new n(r[1], void 0, e, i);
          }
        }),
        (n.prototype.toTraceparent = function () {
          var n = "";
          return (
            !0 === this.T ? (n = "-1") : !1 === this.T && (n = "-0"),
            this.O + "-" + this.k + n
          );
        }),
        (n.prototype.toJSON = function () {
          return {
            parent: (this.R && this.R.toJSON()) || void 0,
            sampled: this.T,
            span_id: this.k,
            trace_id: this.O,
          };
        }),
        n
      );
    })(),
    tn = (function () {
      function n() {
        (this.D = !1),
          (this.I = []),
          (this.C = []),
          (this.N = []),
          (this.M = {}),
          (this.U = {}),
          (this.A = {}),
          (this.L = {});
      }
      return (
        (n.prototype.addScopeListener = function (n) {
          this.I.push(n);
        }),
        (n.prototype.addEventProcessor = function (n) {
          return this.C.push(n), this;
        }),
        (n.prototype.q = function () {
          var n = this;
          this.D ||
            ((this.D = !0),
            setTimeout(function () {
              n.I.forEach(function (t) {
                t(n);
              }),
                (n.D = !1);
            }));
        }),
        (n.prototype.F = function (n, t, r, i) {
          var o = this;
          return (
            void 0 === i && (i = 0),
            new V(function (u, c) {
              var s = n[i];
              if (null === t || "function" != typeof s) u(t);
              else {
                var a = s(e({}, t), r);
                b(a)
                  ? a
                      .then(function (t) {
                        return o.F(n, t, r, i + 1).then(u);
                      })
                      .then(null, c)
                  : o
                      .F(n, a, r, i + 1)
                      .then(u)
                      .then(null, c);
              }
            })
          );
        }),
        (n.prototype.setUser = function (n) {
          return (this.M = J(n)), this.q(), this;
        }),
        (n.prototype.setTags = function (n) {
          return (this.U = e({}, this.U, J(n))), this.q(), this;
        }),
        (n.prototype.setTag = function (n, t) {
          var r;
          return (
            (this.U = e({}, this.U, (((r = {})[n] = J(t)), r))), this.q(), this
          );
        }),
        (n.prototype.setExtras = function (n) {
          return (this.A = e({}, this.A, J(n))), this.q(), this;
        }),
        (n.prototype.setExtra = function (n, t) {
          var r;
          return (
            (this.A = e({}, this.A, (((r = {})[n] = J(t)), r))), this.q(), this
          );
        }),
        (n.prototype.setFingerprint = function (n) {
          return (this.H = J(n)), this.q(), this;
        }),
        (n.prototype.setLevel = function (n) {
          return (this.P = J(n)), this.q(), this;
        }),
        (n.prototype.setTransaction = function (n) {
          return (this.W = n), this.q(), this;
        }),
        (n.prototype.setContext = function (n, t) {
          return (this.L[n] = t ? J(t) : void 0), this.q(), this;
        }),
        (n.prototype.setSpan = function (n) {
          return (this.B = n), this.q(), this;
        }),
        (n.prototype.startSpan = function (n) {
          var t = new nn();
          return t.setParent(n), this.setSpan(t), t;
        }),
        (n.prototype.getSpan = function () {
          return this.B;
        }),
        (n.clone = function (t) {
          var r = new n();
          return (
            t &&
              ((r.N = o(t.N)),
              (r.U = e({}, t.U)),
              (r.A = e({}, t.A)),
              (r.L = e({}, t.L)),
              (r.M = t.M),
              (r.P = t.P),
              (r.B = t.B),
              (r.W = t.W),
              (r.H = t.H),
              (r.C = o(t.C))),
            r
          );
        }),
        (n.prototype.clear = function () {
          return (
            (this.N = []),
            (this.U = {}),
            (this.A = {}),
            (this.M = {}),
            (this.L = {}),
            (this.P = void 0),
            (this.W = void 0),
            (this.H = void 0),
            (this.B = void 0),
            this.q(),
            this
          );
        }),
        (n.prototype.addBreadcrumb = function (n, t) {
          var r = new Date().getTime() / 1e3,
            i = e({ timestamp: r }, n);
          return (
            (this.N =
              void 0 !== t && t >= 0
                ? o(this.N, [J(i)]).slice(-t)
                : o(this.N, [J(i)])),
            this.q(),
            this
          );
        }),
        (n.prototype.clearBreadcrumbs = function () {
          return (this.N = []), this.q(), this;
        }),
        (n.prototype.$ = function (n) {
          (n.fingerprint = n.fingerprint
            ? Array.isArray(n.fingerprint)
              ? n.fingerprint
              : [n.fingerprint]
            : []),
            this.H && (n.fingerprint = n.fingerprint.concat(this.H)),
            n.fingerprint && !n.fingerprint.length && delete n.fingerprint;
        }),
        (n.prototype.applyToEvent = function (n, t) {
          return (
            this.A &&
              Object.keys(this.A).length &&
              (n.extra = e({}, this.A, n.extra)),
            this.U &&
              Object.keys(this.U).length &&
              (n.tags = e({}, this.U, n.tags)),
            this.M &&
              Object.keys(this.M).length &&
              (n.user = e({}, this.M, n.user)),
            this.L &&
              Object.keys(this.L).length &&
              (n.contexts = e({}, this.L, n.contexts)),
            this.P && (n.level = this.P),
            this.W && (n.transaction = this.W),
            this.B &&
              ((n.contexts = n.contexts || {}), (n.contexts.trace = this.B)),
            this.$(n),
            (n.breadcrumbs = o(n.breadcrumbs || [], this.N)),
            (n.breadcrumbs = n.breadcrumbs.length > 0 ? n.breadcrumbs : void 0),
            this.F(o(rn(), this.C), n, t)
          );
        }),
        n
      );
    })();
  function rn() {
    var n = x();
    return (
      (n.__SENTRY__ = n.__SENTRY__ || {}),
      (n.__SENTRY__.globalEventProcessors =
        n.__SENTRY__.globalEventProcessors || []),
      n.__SENTRY__.globalEventProcessors
    );
  }
  function en(n) {
    rn().push(n);
  }
  var on = 3,
    un = (function () {
      function n(n, t, r) {
        void 0 === t && (t = new tn()),
          void 0 === r && (r = on),
          (this.X = r),
          (this.G = []),
          this.G.push({ client: n, scope: t });
      }
      return (
        (n.prototype.J = function (n) {
          for (var t, r = [], e = 1; e < arguments.length; e++)
            r[e - 1] = arguments[e];
          var i = this.getStackTop();
          i &&
            i.client &&
            i.client[n] &&
            (t = i.client)[n].apply(t, o(r, [i.scope]));
        }),
        (n.prototype.isOlderThan = function (n) {
          return this.X < n;
        }),
        (n.prototype.bindClient = function (n) {
          this.getStackTop().client = n;
        }),
        (n.prototype.pushScope = function () {
          var n = this.getStack(),
            t = n.length > 0 ? n[n.length - 1].scope : void 0,
            r = tn.clone(t);
          return (
            this.getStack().push({ client: this.getClient(), scope: r }), r
          );
        }),
        (n.prototype.popScope = function () {
          return void 0 !== this.getStack().pop();
        }),
        (n.prototype.withScope = function (n) {
          var t = this.pushScope();
          try {
            n(t);
          } finally {
            this.popScope();
          }
        }),
        (n.prototype.getClient = function () {
          return this.getStackTop().client;
        }),
        (n.prototype.getScope = function () {
          return this.getStackTop().scope;
        }),
        (n.prototype.getStack = function () {
          return this.G;
        }),
        (n.prototype.getStackTop = function () {
          return this.G[this.G.length - 1];
        }),
        (n.prototype.captureException = function (n, t) {
          var r = (this.V = j()),
            i = t;
          if (!t) {
            var o = void 0;
            try {
              throw new Error("Sentry syntheticException");
            } catch (n) {
              o = n;
            }
            i = { originalException: n, syntheticException: o };
          }
          return this.J("captureException", n, e({}, i, { event_id: r })), r;
        }),
        (n.prototype.captureMessage = function (n, t, r) {
          var i = (this.V = j()),
            o = r;
          if (!r) {
            var u = void 0;
            try {
              throw new Error(n);
            } catch (n) {
              u = n;
            }
            o = { originalException: n, syntheticException: u };
          }
          return this.J("captureMessage", n, t, e({}, o, { event_id: i })), i;
        }),
        (n.prototype.captureEvent = function (n, t) {
          var r = (this.V = j());
          return this.J("captureEvent", n, e({}, t, { event_id: r })), r;
        }),
        (n.prototype.lastEventId = function () {
          return this.V;
        }),
        (n.prototype.addBreadcrumb = function (n, t) {
          var r = this.getStackTop();
          if (r.scope && r.client) {
            var i = (r.client.getOptions && r.client.getOptions()) || {},
              o = i.beforeBreadcrumb,
              u = void 0 === o ? null : o,
              c = i.maxBreadcrumbs,
              s = void 0 === c ? 30 : c;
            if (!(s <= 0)) {
              var a = new Date().getTime() / 1e3,
                f = e({ timestamp: a }, n),
                h = u
                  ? O(function () {
                      return u(f, t);
                    })
                  : f;
              null !== h && r.scope.addBreadcrumb(h, Math.min(s, 100));
            }
          }
        }),
        (n.prototype.setUser = function (n) {
          var t = this.getStackTop();
          t.scope && t.scope.setUser(n);
        }),
        (n.prototype.setTags = function (n) {
          var t = this.getStackTop();
          t.scope && t.scope.setTags(n);
        }),
        (n.prototype.setExtras = function (n) {
          var t = this.getStackTop();
          t.scope && t.scope.setExtras(n);
        }),
        (n.prototype.setTag = function (n, t) {
          var r = this.getStackTop();
          r.scope && r.scope.setTag(n, t);
        }),
        (n.prototype.setExtra = function (n, t) {
          var r = this.getStackTop();
          r.scope && r.scope.setExtra(n, t);
        }),
        (n.prototype.setContext = function (n, t) {
          var r = this.getStackTop();
          r.scope && r.scope.setContext(n, t);
        }),
        (n.prototype.configureScope = function (n) {
          var t = this.getStackTop();
          t.scope && t.client && n(t.scope);
        }),
        (n.prototype.run = function (n) {
          var t = sn(this);
          try {
            n(this);
          } finally {
            sn(t);
          }
        }),
        (n.prototype.getIntegration = function (n) {
          var t = this.getClient();
          if (!t) return null;
          try {
            return t.getIntegration(n);
          } catch (t) {
            return (
              A.warn(
                "Cannot retrieve integration " + n.id + " from the current Hub"
              ),
              null
            );
          }
        }),
        (n.prototype.traceHeaders = function () {
          var n = this.getStackTop();
          if (n.scope && n.client) {
            var t = n.scope.getSpan();
            if (t) return { "sentry-trace": t.toTraceparent() };
          }
          return {};
        }),
        n
      );
    })();
  function cn() {
    var n = x();
    return (n.__SENTRY__ = n.__SENTRY__ || { hub: void 0 }), n;
  }
  function sn(n) {
    var t = cn(),
      r = hn(t);
    return vn(t, n), r;
  }
  function an() {
    var n = cn();
    return (
      (fn(n) && !hn(n).isOlderThan(on)) || vn(n, new un()),
      g()
        ? (function (n) {
            try {
              var t = ((i = module), (o = "domain"), i.require(o)),
                r = t.active;
              if (!r) return hn(n);
              if (!fn(r) || hn(r).isOlderThan(on)) {
                var e = hn(n).getStackTop();
                vn(r, new un(e.client, tn.clone(e.scope)));
              }
              return hn(r);
            } catch (t) {
              return hn(n);
            }
            var i, o;
          })(n)
        : hn(n)
    );
  }
  function fn(n) {
    return !!(n && n.__SENTRY__ && n.__SENTRY__.hub);
  }
  function hn(n) {
    return n && n.__SENTRY__ && n.__SENTRY__.hub
      ? n.__SENTRY__.hub
      : ((n.__SENTRY__ = n.__SENTRY__ || {}),
        (n.__SENTRY__.hub = new un()),
        n.__SENTRY__.hub);
  }
  function vn(n, t) {
    return (
      !!n && ((n.__SENTRY__ = n.__SENTRY__ || {}), (n.__SENTRY__.hub = t), !0)
    );
  }
  function ln(n) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    var e = an();
    if (e && e[n]) return e[n].apply(e, o(t));
    throw new Error(
      "No hub defined or " +
        n +
        " was not found on the hub, please open a bug report."
    );
  }
  function captureException(n) {
    var t;
    try {
      throw new Error("Sentry syntheticException");
    } catch (n) {
      t = n;
    }
    return ln("captureException", n, {
      originalException: n,
      syntheticException: t,
    });
  }
  function dn(n) {
    ln("withScope", n);
  }
  var pn = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/,
    yn = (function () {
      function n(n) {
        "string" == typeof n ? this.K(n) : this.Y(n), this.Z();
      }
      return (
        (n.prototype.toString = function (n) {
          void 0 === n && (n = !1);
          var t = this,
            r = t.host,
            e = t.path,
            i = t.pass,
            o = t.port,
            u = t.projectId;
          return (
            t.protocol +
            "://" +
            t.user +
            (n && i ? ":" + i : "") +
            "@" +
            r +
            (o ? ":" + o : "") +
            "/" +
            (e ? e + "/" : e) +
            u
          );
        }),
        (n.prototype.K = function (n) {
          var t = pn.exec(n);
          if (!t) throw new f("Invalid Dsn");
          var r = i(t.slice(1), 6),
            e = r[0],
            o = r[1],
            u = r[2],
            c = void 0 === u ? "" : u,
            s = r[3],
            a = r[4],
            h = void 0 === a ? "" : a,
            v = "",
            l = r[5],
            d = l.split("/");
          d.length > 1 && ((v = d.slice(0, -1).join("/")), (l = d.pop())),
            this.Y({
              host: s,
              pass: c,
              path: v,
              projectId: l,
              port: h,
              protocol: e,
              user: o,
            });
        }),
        (n.prototype.Y = function (n) {
          (this.protocol = n.protocol),
            (this.user = n.user),
            (this.pass = n.pass || ""),
            (this.host = n.host),
            (this.port = n.port || ""),
            (this.path = n.path || ""),
            (this.projectId = n.projectId);
        }),
        (n.prototype.Z = function () {
          var n = this;
          if (
            (["protocol", "user", "host", "projectId"].forEach(function (t) {
              if (!n[t]) throw new f("Invalid Dsn");
            }),
            "http" !== this.protocol && "https" !== this.protocol)
          )
            throw new f("Invalid Dsn");
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new f("Invalid Dsn");
        }),
        n
      );
    })(),
    mn = (function () {
      function n(n) {
        (this.dsn = n), (this.nn = new yn(n));
      }
      return (
        (n.prototype.getDsn = function () {
          return this.nn;
        }),
        (n.prototype.getStoreEndpoint = function () {
          return "" + this.tn() + this.getStoreEndpointPath();
        }),
        (n.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
          var n,
            t = { sentry_key: this.nn.user, sentry_version: "7" };
          return (
            this.getStoreEndpoint() +
            "?" +
            ((n = t),
            Object.keys(n)
              .map(function (t) {
                return encodeURIComponent(t) + "=" + encodeURIComponent(n[t]);
              })
              .join("&"))
          );
        }),
        (n.prototype.tn = function () {
          var n = this.nn,
            t = n.protocol ? n.protocol + ":" : "",
            r = n.port ? ":" + n.port : "";
          return t + "//" + n.host + r;
        }),
        (n.prototype.getStoreEndpointPath = function () {
          var n = this.nn;
          return (
            (n.path ? "/" + n.path : "") + "/api/" + n.projectId + "/store/"
          );
        }),
        (n.prototype.getRequestHeaders = function (n, t) {
          var r = this.nn,
            e = ["Sentry sentry_version=7"];
          return (
            e.push("sentry_timestamp=" + new Date().getTime()),
            e.push("sentry_client=" + n + "/" + t),
            e.push("sentry_key=" + r.user),
            r.pass && e.push("sentry_secret=" + r.pass),
            {
              "Content-Type": "application/json",
              "X-Sentry-Auth": e.join(", "),
            }
          );
        }),
        (n.prototype.getReportDialogEndpoint = function (n) {
          void 0 === n && (n = {});
          var t = this.nn,
            r =
              this.tn() +
              (t.path ? "/" + t.path : "") +
              "/api/embed/error-page/",
            e = [];
          for (var i in (e.push("dsn=" + t.toString()), n))
            if ("user" === i) {
              if (!n.user) continue;
              n.user.name && e.push("name=" + encodeURIComponent(n.user.name)),
                n.user.email &&
                  e.push("email=" + encodeURIComponent(n.user.email));
            } else
              e.push(encodeURIComponent(i) + "=" + encodeURIComponent(n[i]));
          return e.length ? r + "?" + e.join("&") : r;
        }),
        n
      );
    })(),
    wn = [];
  function bn(n) {
    var t = {};
    return (
      (function (n) {
        var t = (n.defaultIntegrations && o(n.defaultIntegrations)) || [],
          r = n.integrations,
          e = [];
        if (Array.isArray(r)) {
          var i = r.map(function (n) {
              return n.name;
            }),
            u = [];
          t.forEach(function (n) {
            -1 === i.indexOf(n.name) &&
              -1 === u.indexOf(n.name) &&
              (e.push(n), u.push(n.name));
          }),
            r.forEach(function (n) {
              -1 === u.indexOf(n.name) && (e.push(n), u.push(n.name));
            });
        } else {
          if ("function" != typeof r) return o(t);
          (e = r(t)), (e = Array.isArray(e) ? e : [e]);
        }
        return e;
      })(n).forEach(function (n) {
        (t[n.name] = n),
          (function (n) {
            -1 === wn.indexOf(n.name) &&
              (n.setupOnce(en, an),
              wn.push(n.name),
              A.log("Integration installed: " + n.name));
          })(n);
      }),
      t
    );
  }
  var gn,
    En = (function () {
      function n(n, t) {
        (this.rn = {}),
          (this.en = !1),
          (this.in = new n(t)),
          (this.on = t),
          t.dsn && (this.un = new yn(t.dsn)),
          this.cn() && (this.rn = bn(this.on));
      }
      return (
        (n.prototype.captureException = function (n, t, r) {
          var e = this,
            i = t && t.event_id;
          return (
            (this.en = !0),
            this.sn()
              .eventFromException(n, t)
              .then(function (n) {
                return e.an(n, t, r);
              })
              .then(function (n) {
                (i = n && n.event_id), (e.en = !1);
              })
              .then(null, function (n) {
                A.error(n), (e.en = !1);
              }),
            i
          );
        }),
        (n.prototype.captureMessage = function (n, t, r, e) {
          var i = this,
            o = r && r.event_id;
          return (
            (this.en = !0),
            (p(n)
              ? this.sn().eventFromMessage("" + n, t, r)
              : this.sn().eventFromException(n, r)
            )
              .then(function (n) {
                return i.an(n, r, e);
              })
              .then(function (n) {
                (o = n && n.event_id), (i.en = !1);
              })
              .then(null, function (n) {
                A.error(n), (i.en = !1);
              }),
            o
          );
        }),
        (n.prototype.captureEvent = function (n, t, r) {
          var e = this,
            i = t && t.event_id;
          return (
            (this.en = !0),
            this.an(n, t, r)
              .then(function (n) {
                (i = n && n.event_id), (e.en = !1);
              })
              .then(null, function (n) {
                A.error(n), (e.en = !1);
              }),
            i
          );
        }),
        (n.prototype.getDsn = function () {
          return this.un;
        }),
        (n.prototype.getOptions = function () {
          return this.on;
        }),
        (n.prototype.flush = function (n) {
          var t = this;
          return this.fn(n).then(function (r) {
            return (
              clearInterval(r.interval),
              t
                .sn()
                .getTransport()
                .close(n)
                .then(function (n) {
                  return r.ready && n;
                })
            );
          });
        }),
        (n.prototype.close = function (n) {
          var t = this;
          return this.flush(n).then(function (n) {
            return (t.getOptions().enabled = !1), n;
          });
        }),
        (n.prototype.getIntegrations = function () {
          return this.rn || {};
        }),
        (n.prototype.getIntegration = function (n) {
          try {
            return this.rn[n.id] || null;
          } catch (t) {
            return (
              A.warn(
                "Cannot retrieve integration " +
                  n.id +
                  " from the current Client"
              ),
              null
            );
          }
        }),
        (n.prototype.fn = function (n) {
          var t = this;
          return new V(function (r) {
            var e = 0,
              i = 0;
            clearInterval(i),
              (i = setInterval(function () {
                t.en
                  ? ((e += 1), n && e >= n && r({ interval: i, ready: !1 }))
                  : r({ interval: i, ready: !0 });
              }, 1));
          });
        }),
        (n.prototype.sn = function () {
          return this.in;
        }),
        (n.prototype.cn = function () {
          return !1 !== this.getOptions().enabled && void 0 !== this.un;
        }),
        (n.prototype.hn = function (n, t, r) {
          var i = this.getOptions(),
            o = i.environment,
            u = i.release,
            c = i.dist,
            s = i.maxValueLength,
            a = void 0 === s ? 250 : s,
            f = e({}, n);
          void 0 === f.environment && void 0 !== o && (f.environment = o),
            void 0 === f.release && void 0 !== u && (f.release = u),
            void 0 === f.dist && void 0 !== c && (f.dist = c),
            f.message && (f.message = q(f.message, a));
          var h = f.exception && f.exception.values && f.exception.values[0];
          h && h.value && (h.value = q(h.value, a));
          var v = f.request;
          v && v.url && (v.url = q(v.url, a)),
            void 0 === f.event_id && (f.event_id = j()),
            this.vn(f.sdk);
          var l = V.resolve(f);
          return t && (l = t.applyToEvent(f, r)), l;
        }),
        (n.prototype.vn = function (n) {
          var t = Object.keys(this.rn);
          n && t.length > 0 && (n.integrations = t);
        }),
        (n.prototype.an = function (n, t, r) {
          var e = this,
            i = this.getOptions(),
            o = i.beforeSend,
            u = i.sampleRate;
          return this.cn()
            ? "number" == typeof u && Math.random() > u
              ? V.reject("This event has been sampled, will not send event.")
              : new V(function (i, u) {
                  e.hn(n, r, t)
                    .then(function (n) {
                      if (null !== n) {
                        var r = n;
                        try {
                          if ((t && t.data && !0 === t.data.__sentry__) || !o)
                            return e.sn().sendEvent(r), void i(r);
                          var c = o(n, t);
                          if (void 0 === c)
                            A.error(
                              "`beforeSend` method has to return `null` or a valid event."
                            );
                          else if (b(c)) e.ln(c, i, u);
                          else {
                            if (null === (r = c))
                              return (
                                A.log(
                                  "`beforeSend` returned `null`, will not send event."
                                ),
                                void i(null)
                              );
                            e.sn().sendEvent(r), i(r);
                          }
                        } catch (n) {
                          e.captureException(n, {
                            data: { __sentry__: !0 },
                            originalException: n,
                          }),
                            u(
                              "`beforeSend` threw an error, will not send event."
                            );
                        }
                      } else u("An event processor returned null, will not send event.");
                    })
                    .then(null, function () {
                      u("`beforeSend` threw an error, will not send event.");
                    });
                })
            : V.reject("SDK not enabled, will not send event.");
        }),
        (n.prototype.ln = function (n, t, r) {
          var e = this;
          n.then(function (n) {
            null !== n
              ? (e.sn().sendEvent(n), t(n))
              : r("`beforeSend` returned `null`, will not send event.");
          }).then(null, function (n) {
            r("beforeSend rejected with " + n);
          });
        }),
        n
      );
    })(),
    xn = (function () {
      function t() {}
      return (
        (t.prototype.sendEvent = function (t) {
          return V.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: n.Status.Skipped,
          });
        }),
        (t.prototype.close = function (n) {
          return V.resolve(!0);
        }),
        t
      );
    })(),
    jn = (function () {
      function n(n) {
        (this.on = n),
          this.on.dsn ||
            A.warn("No DSN provided, backend will not do anything."),
          (this.dn = this.pn());
      }
      return (
        (n.prototype.pn = function () {
          return new xn();
        }),
        (n.prototype.eventFromException = function (n, t) {
          throw new f("Backend has to implement `eventFromException` method");
        }),
        (n.prototype.eventFromMessage = function (n, t, r) {
          throw new f("Backend has to implement `eventFromMessage` method");
        }),
        (n.prototype.sendEvent = function (n) {
          this.dn.sendEvent(n).then(null, function (n) {
            A.error("Error while sending event: " + n);
          });
        }),
        (n.prototype.getTransport = function () {
          return this.dn;
        }),
        n
      );
    })();
  var _n = (function () {
      function n() {
        this.name = n.id;
      }
      return (
        (n.prototype.setupOnce = function () {
          (gn = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var n = [], t = 0; t < arguments.length; t++)
                n[t] = arguments[t];
              var r = this.__sentry__ ? this.__sentry_original__ : this;
              return gn.apply(r, n);
            });
        }),
        (n.id = "FunctionToString"),
        n
      );
    })(),
    Sn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    On = (function () {
      function n(t) {
        void 0 === t && (t = {}), (this.on = t), (this.name = n.id);
      }
      return (
        (n.prototype.setupOnce = function () {
          en(function (t) {
            var r = an();
            if (!r) return t;
            var e = r.getIntegration(n);
            if (e) {
              var i = r.getClient(),
                o = i ? i.getOptions() : {},
                u = e.yn(o);
              if (e.mn(t, u)) return null;
            }
            return t;
          });
        }),
        (n.prototype.mn = function (n, t) {
          return this.wn(n, t)
            ? (A.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  S(n)
              ),
              !0)
            : this.bn(n, t)
            ? (A.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  S(n)
              ),
              !0)
            : this.gn(n, t)
            ? (A.warn(
                "Event dropped due to being matched by `blacklistUrls` option.\nEvent: " +
                  S(n) +
                  ".\nUrl: " +
                  this.En(n)
              ),
              !0)
            : !this.xn(n, t) &&
              (A.warn(
                "Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " +
                  S(n) +
                  ".\nUrl: " +
                  this.En(n)
              ),
              !0);
        }),
        (n.prototype.wn = function (n, t) {
          if ((void 0 === t && (t = {}), !t.ignoreInternal)) return !1;
          try {
            return "SentryError" === n.exception.values[0].type;
          } catch (n) {
            return !1;
          }
        }),
        (n.prototype.bn = function (n, t) {
          return (
            void 0 === t && (t = {}),
            !(!t.ignoreErrors || !t.ignoreErrors.length) &&
              this.jn(n).some(function (n) {
                return t.ignoreErrors.some(function (t) {
                  return H(n, t);
                });
              })
          );
        }),
        (n.prototype.gn = function (n, t) {
          if (
            (void 0 === t && (t = {}),
            !t.blacklistUrls || !t.blacklistUrls.length)
          )
            return !1;
          var r = this.En(n);
          return (
            !!r &&
            t.blacklistUrls.some(function (n) {
              return H(r, n);
            })
          );
        }),
        (n.prototype.xn = function (n, t) {
          if (
            (void 0 === t && (t = {}),
            !t.whitelistUrls || !t.whitelistUrls.length)
          )
            return !0;
          var r = this.En(n);
          return (
            !r ||
            t.whitelistUrls.some(function (n) {
              return H(r, n);
            })
          );
        }),
        (n.prototype.yn = function (n) {
          return (
            void 0 === n && (n = {}),
            {
              blacklistUrls: o(
                this.on.blacklistUrls || [],
                n.blacklistUrls || []
              ),
              ignoreErrors: o(
                this.on.ignoreErrors || [],
                n.ignoreErrors || [],
                Sn
              ),
              ignoreInternal:
                void 0 === this.on.ignoreInternal || this.on.ignoreInternal,
              whitelistUrls: o(
                this.on.whitelistUrls || [],
                n.whitelistUrls || []
              ),
            }
          );
        }),
        (n.prototype.jn = function (n) {
          if (n.message) return [n.message];
          if (n.exception)
            try {
              var t = n.exception.values[0],
                r = t.type,
                e = t.value;
              return ["" + e, r + ": " + e];
            } catch (t) {
              return A.error("Cannot extract message for event " + S(n)), [];
            }
          return [];
        }),
        (n.prototype.En = function (n) {
          try {
            if (n.stacktrace) {
              var t = n.stacktrace.frames;
              return t[t.length - 1].filename;
            }
            if (n.exception) {
              var r = n.exception.values[0].stacktrace.frames;
              return r[r.length - 1].filename;
            }
            return null;
          } catch (t) {
            return A.error("Cannot extract url for event " + S(n)), null;
          }
        }),
        (n.id = "InboundFilters"),
        n
      );
    })(),
    kn = Object.freeze({ FunctionToString: _n, InboundFilters: On }),
    Tn = "?",
    Rn =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    Dn =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    In =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    Cn = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    Nn = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  function Mn(n) {
    var t = null,
      r = n && n.framesToPop;
    try {
      if (
        (t = (function (n) {
          if (!n || !n.stacktrace) return null;
          for (
            var t,
              r = n.stacktrace,
              e = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
              i =
                / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,
              o = r.split("\n"),
              u = [],
              c = 0;
            c < o.length;
            c += 2
          ) {
            var s = null;
            (t = e.exec(o[c]))
              ? (s = {
                  url: t[2],
                  func: t[3],
                  args: [],
                  line: +t[1],
                  column: null,
                })
              : (t = i.exec(o[c])) &&
                (s = {
                  url: t[6],
                  func: t[3] || t[4],
                  args: t[5] ? t[5].split(",") : [],
                  line: +t[1],
                  column: +t[2],
                }),
              s && (!s.func && s.line && (s.func = Tn), u.push(s));
          }
          if (!u.length) return null;
          return { message: An(n), name: n.name, stack: u };
        })(n))
      )
        return Un(t, r);
    } catch (n) {}
    try {
      if (
        (t = (function (n) {
          if (!n || !n.stack) return null;
          for (
            var t, r, e, i = [], o = n.stack.split("\n"), u = 0;
            u < o.length;
            ++u
          ) {
            if ((r = Rn.exec(o[u]))) {
              var c = r[2] && 0 === r[2].indexOf("native");
              r[2] &&
                0 === r[2].indexOf("eval") &&
                (t = Nn.exec(r[2])) &&
                ((r[2] = t[1]), (r[3] = t[2]), (r[4] = t[3])),
                (e = {
                  url: r[2],
                  func: r[1] || Tn,
                  args: c ? [r[2]] : [],
                  line: r[3] ? +r[3] : null,
                  column: r[4] ? +r[4] : null,
                });
            } else if ((r = In.exec(o[u])))
              e = {
                url: r[2],
                func: r[1] || Tn,
                args: [],
                line: +r[3],
                column: r[4] ? +r[4] : null,
              };
            else {
              if (!(r = Dn.exec(o[u]))) continue;
              r[3] && r[3].indexOf(" > eval") > -1 && (t = Cn.exec(r[3]))
                ? ((r[1] = r[1] || "eval"),
                  (r[3] = t[1]),
                  (r[4] = t[2]),
                  (r[5] = ""))
                : 0 !== u ||
                  r[5] ||
                  void 0 === n.columnNumber ||
                  (i[0].column = n.columnNumber + 1),
                (e = {
                  url: r[3],
                  func: r[1] || Tn,
                  args: r[2] ? r[2].split(",") : [],
                  line: r[4] ? +r[4] : null,
                  column: r[5] ? +r[5] : null,
                });
            }
            !e.func && e.line && (e.func = Tn), i.push(e);
          }
          if (!i.length) return null;
          return { message: An(n), name: n.name, stack: i };
        })(n))
      )
        return Un(t, r);
    } catch (n) {}
    return { message: An(n), name: n && n.name, stack: [], failed: !0 };
  }
  function Un(n, t) {
    try {
      return e({}, n, { stack: n.stack.slice(t) });
    } catch (t) {
      return n;
    }
  }
  function An(n) {
    var t = n && n.message;
    return t
      ? t.error && "string" == typeof t.error.message
        ? t.error.message
        : t
      : "No error message";
  }
  var Ln = 50;
  function qn(n) {
    var t = Hn(n.stack),
      r = { type: n.name, value: n.message };
    return (
      t && t.length && (r.stacktrace = { frames: t }),
      void 0 === r.type &&
        "" === r.value &&
        (r.value = "Unrecoverable error caught"),
      r
    );
  }
  function Fn(n) {
    return { exception: { values: [qn(n)] } };
  }
  function Hn(n) {
    if (!n || !n.length) return [];
    var t = n,
      r = t[0].func || "",
      e = t[t.length - 1].func || "";
    return (
      (-1 === r.indexOf("captureMessage") &&
        -1 === r.indexOf("captureException")) ||
        (t = t.slice(1)),
      -1 !== e.indexOf("sentryWrapped") && (t = t.slice(0, -1)),
      t
        .map(function (n) {
          return {
            colno: null === n.column ? void 0 : n.column,
            filename: n.url || t[0].url,
            function: n.func || "?",
            in_app: !0,
            lineno: null === n.line ? void 0 : n.line,
          };
        })
        .slice(0, Ln)
        .reverse()
    );
  }
  function Pn(n, t, r) {
    var e, i;
    if ((void 0 === r && (r = {}), v(n) && n.error))
      return (e = Fn(Mn((n = n.error))));
    if (
      l(n) ||
      ((i = n), "[object DOMException]" === Object.prototype.toString.call(i))
    ) {
      var o = n,
        u = o.name || (l(o) ? "DOMError" : "DOMException"),
        c = o.message ? u + ": " + o.message : u;
      return k((e = Wn(c, t, r)), c), e;
    }
    return h(n)
      ? (e = Fn(Mn(n)))
      : y(n) || m(n)
      ? (T(
          (e = (function (n, t, r) {
            var e = {
              exception: {
                values: [
                  {
                    type: m(n)
                      ? n.constructor.name
                      : r
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (r ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      z(n),
                  },
                ],
              },
              extra: { __serialized__: $(n) },
            };
            if (t) {
              var i = Hn(Mn(t).stack);
              e.stacktrace = { frames: i };
            }
            return e;
          })(n, t, r.rejection)),
          { synthetic: !0 }
        ),
        e)
      : (k((e = Wn(n, t, r)), "" + n, void 0), T(e, { synthetic: !0 }), e);
  }
  function Wn(n, t, r) {
    void 0 === r && (r = {});
    var e = { message: n };
    if (r.attachStacktrace && t) {
      var i = Hn(Mn(t).stack);
      e.stacktrace = { frames: i };
    }
    return e;
  }
  var Bn,
    $n,
    Xn = (function () {
      function n(n) {
        (this.options = n),
          (this.S = new K(30)),
          (this.url = new mn(
            this.options.dsn
          ).getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (n.prototype.sendEvent = function (n) {
          throw new f("Transport Class has to implement `sendEvent` method");
        }),
        (n.prototype.close = function (n) {
          return this.S.drain(n);
        }),
        n
      );
    })(),
    Gn = x(),
    Jn = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        r(e, t),
        (e.prototype.sendEvent = function (t) {
          var r = {
            body: JSON.stringify(t),
            method: "POST",
            referrerPolicy: Y() ? "origin" : "",
          };
          return this.S.add(
            Gn.fetch(this.url, r).then(function (t) {
              return { status: n.Status.fromHttpCode(t.status) };
            })
          );
        }),
        e
      );
    })(Xn),
    zn = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        r(e, t),
        (e.prototype.sendEvent = function (t) {
          var r = this;
          return this.S.add(
            new V(function (e, i) {
              var o = new XMLHttpRequest();
              (o.onreadystatechange = function () {
                4 === o.readyState &&
                  (200 === o.status &&
                    e({ status: n.Status.fromHttpCode(o.status) }),
                  i(o));
              }),
                o.open("POST", r.url),
                o.send(JSON.stringify(t));
            })
          );
        }),
        e
      );
    })(Xn),
    Vn = Object.freeze({
      BaseTransport: Xn,
      FetchTransport: Jn,
      XHRTransport: zn,
    }),
    Kn = (function (t) {
      function i() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        r(i, t),
        (i.prototype.pn = function () {
          if (!this.on.dsn) return t.prototype.pn.call(this);
          var n = e({}, this.on.transportOptions, { dsn: this.on.dsn });
          return this.on.transport
            ? new this.on.transport(n)
            : Q()
            ? new Jn(n)
            : new zn(n);
        }),
        (i.prototype.eventFromException = function (t, r) {
          var e = Pn(t, (r && r.syntheticException) || void 0, {
            attachStacktrace: this.on.attachStacktrace,
          });
          return (
            T(e, { handled: !0, type: "generic" }),
            (e.level = n.Severity.Error),
            r && r.event_id && (e.event_id = r.event_id),
            V.resolve(e)
          );
        }),
        (i.prototype.eventFromMessage = function (t, r, e) {
          void 0 === r && (r = n.Severity.Info);
          var i = Wn(t, (e && e.syntheticException) || void 0, {
            attachStacktrace: this.on.attachStacktrace,
          });
          return (
            (i.level = r),
            e && e.event_id && (i.event_id = e.event_id),
            V.resolve(i)
          );
        }),
        i
      );
    })(jn),
    Qn = "sentry.javascript.browser",
    Yn = (function (n) {
      function t(t) {
        return void 0 === t && (t = {}), n.call(this, Kn, t) || this;
      }
      return (
        r(t, n),
        (t.prototype.hn = function (t, r, i) {
          return (
            (t.platform = t.platform || "javascript"),
            (t.sdk = e({}, t.sdk, {
              name: Qn,
              packages: o((t.sdk && t.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: "5.7.1" },
              ]),
              version: "5.7.1",
            })),
            n.prototype.hn.call(this, t, r, i)
          );
        }),
        (t.prototype.showReportDialog = function (n) {
          void 0 === n && (n = {});
          var t = x().document;
          if (t)
            if (this.cn()) {
              var r = n.dsn || this.getDsn();
              if (n.eventId)
                if (r) {
                  var e = t.createElement("script");
                  (e.async = !0),
                    (e.src = new mn(r).getReportDialogEndpoint(n)),
                    n.onLoad && (e.onload = n.onLoad),
                    (t.head || t.body).appendChild(e);
                } else A.error("Missing `Dsn` option in showReportDialog call");
              else A.error("Missing `eventId` option in showReportDialog call");
            } else
              A.error(
                "Trying to call showReportDialog with Sentry Client is disabled"
              );
        }),
        t
      );
    })(En),
    Zn = 1e3,
    nt = 0;
  function tt() {
    return nt > 0;
  }
  function rt(n, t, r) {
    if ((void 0 === t && (t = {}), "function" != typeof n)) return n;
    try {
      if (n.__sentry__) return n;
      if (n.__sentry_wrapped__) return n.__sentry_wrapped__;
    } catch (t) {
      return n;
    }
    var sentryWrapped = function () {
      r && "function" == typeof r && r.apply(this, arguments);
      var i = Array.prototype.slice.call(arguments);
      try {
        var o = i.map(function (n) {
          return rt(n, t);
        });
        return n.handleEvent ? n.handleEvent.apply(this, o) : n.apply(this, o);
      } catch (n) {
        throw (
          ((nt += 1),
          setTimeout(function () {
            nt -= 1;
          }),
          dn(function (r) {
            r.addEventProcessor(function (n) {
              var r = e({}, n);
              return (
                t.mechanism && (k(r, void 0, void 0), T(r, t.mechanism)),
                (r.extra = e({}, r.extra, { arguments: J(i, 3) })),
                r
              );
            }),
              captureException(n);
          }),
          n)
        );
      }
    };
    try {
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (sentryWrapped[i] = n[i]);
    } catch (n) {}
    (n.prototype = n.prototype || {}),
      (sentryWrapped.prototype = n.prototype),
      Object.defineProperty(n, "__sentry_wrapped__", {
        enumerable: !1,
        value: sentryWrapped,
      }),
      Object.defineProperties(sentryWrapped, {
        __sentry__: { enumerable: !1, value: !0 },
        __sentry_original__: { enumerable: !1, value: n },
      });
    try {
      Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable &&
        Object.defineProperty(sentryWrapped, "name", {
          get: function () {
            return n.name;
          },
        });
    } catch (n) {}
    return sentryWrapped;
  }
  var et = 0;
  function it(n, t) {
    return (
      void 0 === t && (t = !1),
      function (r) {
        if (((Bn = void 0), r && $n !== r)) {
          $n = r;
          var e = function () {
            var t;
            try {
              t = r.target ? D(r.target) : D(r);
            } catch (n) {
              t = "<unknown>";
            }
            0 !== t.length &&
              an().addBreadcrumb(
                { category: "ui." + n, message: t },
                { event: r, name: n }
              );
          };
          et && clearTimeout(et), t ? (et = setTimeout(e)) : e();
        }
      }
    );
  }
  function ot() {
    return function (n) {
      var t;
      try {
        t = n.target;
      } catch (n) {
        return;
      }
      var r = t && t.tagName;
      r &&
        ("INPUT" === r || "TEXTAREA" === r || t.isContentEditable) &&
        (Bn || it("input")(n),
        clearTimeout(Bn),
        (Bn = setTimeout(function () {
          Bn = void 0;
        }, Zn)));
    };
  }
  var ut = (function () {
      function t(n) {
        (this.name = t.id),
          (this._n = x()),
          (this.Sn = null),
          (this.On = null),
          (this.kn = !1),
          (this.Tn = !1),
          (this.on = e({ onerror: !0, onunhandledrejection: !0 }, n));
      }
      return (
        (t.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this.on.onerror &&
              (A.log("Global Handler attached: onerror"), this.Rn()),
            this.on.onunhandledrejection &&
              (A.log("Global Handler attached: onunhandledrejection"),
              this.Dn());
        }),
        (t.prototype.Rn = function () {
          if (!this.kn) {
            var n = this;
            (this.Sn = this._n.onerror),
              (this._n.onerror = function (r, e, i, o, u) {
                var c = an(),
                  s = c.getIntegration(t),
                  a = u && !0 === u.__sentry_own_request__;
                if (!s || tt() || a)
                  return !!n.Sn && n.Sn.apply(this, arguments);
                var f = c.getClient(),
                  h = p(u)
                    ? n.In(r, e, i, o)
                    : n.Cn(
                        Pn(u, void 0, {
                          attachStacktrace:
                            f && f.getOptions().attachStacktrace,
                          rejection: !1,
                        }),
                        e,
                        i,
                        o
                      );
                return (
                  T(h, { handled: !1, type: "onerror" }),
                  c.captureEvent(h, { originalException: u }),
                  !!n.Sn && n.Sn.apply(this, arguments)
                );
              }),
              (this.kn = !0);
          }
        }),
        (t.prototype.Dn = function () {
          if (!this.Tn) {
            var r = this;
            (this.On = this._n.onunhandledrejection),
              (this._n.onunhandledrejection = function (e) {
                var i = e;
                try {
                  i = e && "reason" in e ? e.reason : e;
                } catch (n) {}
                var o = an(),
                  u = o.getIntegration(t),
                  c = i && !0 === i.__sentry_own_request__;
                if (!u || tt() || c)
                  return !!r.On && r.On.apply(this, arguments);
                var s = o.getClient(),
                  a = p(i)
                    ? r.Nn(i)
                    : Pn(i, void 0, {
                        attachStacktrace: s && s.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                return (
                  (a.level = n.Severity.Error),
                  T(a, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(a, { originalException: i }),
                  !!r.On && r.On.apply(this, arguments)
                );
              }),
              (this.Tn = !0);
          }
        }),
        (t.prototype.In = function (n, t, r, e) {
          var i,
            o = v(n) ? n.message : n;
          if (d(o)) {
            var u = o.match(
              /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i
            );
            u && ((i = u[1]), (o = u[2]));
          }
          var c = { exception: { values: [{ type: i || "Error", value: o }] } };
          return this.Cn(c, t, r, e);
        }),
        (t.prototype.Nn = function (n) {
          return {
            exception: {
              values: [
                {
                  type: "UnhandledRejection",
                  value:
                    "Non-Error promise rejection captured with value: " + n,
                },
              ],
            },
          };
        }),
        (t.prototype.Cn = function (n, t, r, e) {
          return (
            (n.exception = n.exception || {}),
            (n.exception.values = n.exception.values || []),
            (n.exception.values[0] = n.exception.values[0] || {}),
            (n.exception.values[0].stacktrace =
              n.exception.values[0].stacktrace || {}),
            (n.exception.values[0].stacktrace.frames =
              n.exception.values[0].stacktrace.frames || []),
            0 === n.exception.values[0].stacktrace.frames.length &&
              n.exception.values[0].stacktrace.frames.push({
                colno: e,
                filename: t || R(),
                function: "?",
                in_app: !0,
                lineno: r,
              }),
            n
          );
        }),
        (t.id = "GlobalHandlers"),
        t
      );
    })(),
    ct = (function () {
      function n() {
        (this.Mn = 0), (this.name = n.id);
      }
      return (
        (n.prototype.Un = function (n) {
          return function () {
            for (var t = [], r = 0; r < arguments.length; r++)
              t[r] = arguments[r];
            var e = t[0];
            return (
              (t[0] = rt(e, {
                mechanism: {
                  data: { function: st(n) },
                  handled: !0,
                  type: "instrument",
                },
              })),
              n.apply(this, t)
            );
          };
        }),
        (n.prototype.An = function (n) {
          return function (t) {
            return n(
              rt(t, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: st(n) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (n.prototype.Ln = function (n) {
          var t = x(),
            r = t[n] && t[n].prototype;
          r &&
            r.hasOwnProperty &&
            r.hasOwnProperty("addEventListener") &&
            (P(r, "addEventListener", function (t) {
              return function (r, e, i) {
                try {
                  "function" == typeof e.handleEvent &&
                    (e.handleEvent = rt(e.handleEvent.bind(e), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: st(e),
                          target: n,
                        },
                        handled: !0,
                        type: "instrument",
                      },
                    }));
                } catch (n) {}
                return t.call(
                  this,
                  r,
                  rt(e, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: st(e),
                        target: n,
                      },
                      handled: !0,
                      type: "instrument",
                    },
                  }),
                  i
                );
              };
            }),
            P(r, "removeEventListener", function (n) {
              return function (t, r, e) {
                var i = r;
                try {
                  i = i && (i.__sentry_wrapped__ || i);
                } catch (n) {}
                return n.call(this, t, i, e);
              };
            }));
        }),
        (n.prototype.setupOnce = function () {
          this.Mn = this.Mn;
          var n = x();
          P(n, "setTimeout", this.Un.bind(this)),
            P(n, "setInterval", this.Un.bind(this)),
            P(n, "requestAnimationFrame", this.An.bind(this)),
            [
              "EventTarget",
              "Window",
              "Node",
              "ApplicationCache",
              "AudioTrackList",
              "ChannelMergerNode",
              "CryptoOperation",
              "EventSource",
              "FileReader",
              "HTMLUnknownElement",
              "IDBDatabase",
              "IDBRequest",
              "IDBTransaction",
              "KeyOperation",
              "MediaController",
              "MessagePort",
              "ModalWindow",
              "Notification",
              "SVGElementInstance",
              "Screen",
              "TextTrack",
              "TextTrackCue",
              "TextTrackList",
              "WebSocket",
              "WebSocketWorker",
              "Worker",
              "XMLHttpRequest",
              "XMLHttpRequestEventTarget",
              "XMLHttpRequestUpload",
            ].forEach(this.Ln.bind(this));
        }),
        (n.id = "TryCatch"),
        n
      );
    })();
  function st(n) {
    try {
      return (n && n.name) || "<anonymous>";
    } catch (n) {
      return "<anonymous>";
    }
  }
  var at,
    ft = x(),
    ht = (function () {
      function t(n) {
        (this.name = t.id),
          (this.on = e(
            {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
            },
            n
          ));
      }
      return (
        (t.prototype.qn = function () {
          "console" in ft &&
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (r) {
                r in ft.console &&
                  P(ft.console, r, function (e) {
                    return function () {
                      for (var i = [], o = 0; o < arguments.length; o++)
                        i[o] = arguments[o];
                      var u = {
                        category: "console",
                        data: {
                          extra: { arguments: J(i, 3) },
                          logger: "console",
                        },
                        level: n.Severity.fromString(r),
                        message: F(i, " "),
                      };
                      "assert" === r
                        ? !1 === i[0] &&
                          ((u.message =
                            "Assertion failed: " +
                            (F(i.slice(1), " ") || "console.assert")),
                          (u.data.extra.arguments = J(i.slice(1), 3)),
                          t.addBreadcrumb(u, { input: i, level: r }))
                        : t.addBreadcrumb(u, { input: i, level: r }),
                        e && Function.prototype.apply.call(e, ft.console, i);
                    };
                  });
              }
            );
        }),
        (t.prototype.Fn = function () {
          "document" in ft &&
            (ft.document.addEventListener("click", it("click"), !1),
            ft.document.addEventListener("keypress", ot(), !1),
            ["EventTarget", "Node"].forEach(function (n) {
              var t = ft[n] && ft[n].prototype;
              t &&
                t.hasOwnProperty &&
                t.hasOwnProperty("addEventListener") &&
                (P(t, "addEventListener", function (n) {
                  return function (t, r, e) {
                    return (
                      r && r.handleEvent
                        ? ("click" === t &&
                            P(r, "handleEvent", function (n) {
                              return function (t) {
                                return it("click")(t), n.call(this, t);
                              };
                            }),
                          "keypress" === t &&
                            P(r, "handleEvent", function (n) {
                              return function (t) {
                                return ot()(t), n.call(this, t);
                              };
                            }))
                        : ("click" === t && it("click", !0)(this),
                          "keypress" === t && ot()(this)),
                      n.call(this, t, r, e)
                    );
                  };
                }),
                P(t, "removeEventListener", function (n) {
                  return function (t, r, e) {
                    var i = r;
                    try {
                      i = i && (i.__sentry_wrapped__ || i);
                    } catch (n) {}
                    return n.call(this, t, i, e);
                  };
                }));
            }));
        }),
        (t.prototype.Hn = function () {
          (function () {
            if (!Q()) return !1;
            var n = function (n) {
                return -1 !== n.toString().indexOf("native");
              },
              t = x(),
              r = null,
              e = t.document;
            if (e) {
              var i = e.createElement("iframe");
              i.hidden = !0;
              try {
                e.head.appendChild(i),
                  i.contentWindow &&
                    i.contentWindow.fetch &&
                    (r = n(i.contentWindow.fetch)),
                  e.head.removeChild(i);
              } catch (n) {
                A.warn(
                  "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                  n
                );
              }
            }
            return null === r && (r = n(t.fetch)), r;
          })() &&
            P(ft, "fetch", function (r) {
              return function () {
                for (var e = [], i = 0; i < arguments.length; i++)
                  e[i] = arguments[i];
                var o,
                  u = e[0],
                  c = "GET";
                "string" == typeof u
                  ? (o = u)
                  : "Request" in ft && u instanceof Request
                  ? ((o = u.url), u.method && (c = u.method))
                  : (o = String(u)),
                  e[1] && e[1].method && (c = e[1].method);
                var s = an().getClient(),
                  a = s && s.getDsn();
                if (a) {
                  var f = new mn(a).getStoreEndpoint();
                  if (f && -1 !== o.indexOf(f))
                    return (
                      "POST" === c && e[1] && e[1].body && vt(e[1].body),
                      r.apply(ft, e)
                    );
                }
                var h = { method: d(c) ? c.toUpperCase() : c, url: o };
                return r
                  .apply(ft, e)
                  .then(function (n) {
                    return (
                      (h.status_code = n.status),
                      t.addBreadcrumb(
                        { category: "fetch", data: h, type: "http" },
                        { input: e, response: n }
                      ),
                      n
                    );
                  })
                  .then(null, function (r) {
                    throw (
                      (t.addBreadcrumb(
                        {
                          category: "fetch",
                          data: h,
                          level: n.Severity.Error,
                          type: "http",
                        },
                        { error: r, input: e }
                      ),
                      r)
                    );
                  });
              };
            });
        }),
        (t.prototype.Pn = function () {
          var n = this;
          if (
            ((r = x()),
            (e = r.chrome),
            (i = e && e.app && e.app.runtime),
            (o =
              "history" in r &&
              !!r.history.pushState &&
              !!r.history.replaceState),
            !i && o)
          ) {
            var r,
              e,
              i,
              o,
              u = function (n, r) {
                var e = _(ft.location.href),
                  i = _(r),
                  o = _(n);
                o.path || (o = e),
                  (at = r),
                  e.protocol === i.protocol &&
                    e.host === i.host &&
                    (r = i.relative),
                  e.protocol === o.protocol &&
                    e.host === o.host &&
                    (n = o.relative),
                  t.addBreadcrumb({
                    category: "navigation",
                    data: { from: n, to: r },
                  });
              },
              c = ft.onpopstate;
            (ft.onpopstate = function () {
              for (var t = [], r = 0; r < arguments.length; r++)
                t[r] = arguments[r];
              var e = ft.location.href;
              if ((u(at, e), c)) return c.apply(n, t);
            }),
              P(ft.history, "pushState", s),
              P(ft.history, "replaceState", s);
          }
          function s(n) {
            return function () {
              for (var t = [], r = 0; r < arguments.length; r++)
                t[r] = arguments[r];
              var e = t.length > 2 ? t[2] : void 0;
              return e && u(at, String(e)), n.apply(this, t);
            };
          }
        }),
        (t.prototype.Wn = function () {
          if ("XMLHttpRequest" in ft) {
            var n = XMLHttpRequest.prototype;
            P(n, "open", function (n) {
              return function () {
                for (var t = [], r = 0; r < arguments.length; r++)
                  t[r] = arguments[r];
                var e = t[1];
                this.__sentry_xhr__ = {
                  method: d(t[0]) ? t[0].toUpperCase() : t[0],
                  url: t[1],
                };
                var i = an().getClient(),
                  o = i && i.getDsn();
                if (o) {
                  var u = new mn(o).getStoreEndpoint();
                  d(e) &&
                    u &&
                    -1 !== e.indexOf(u) &&
                    (this.__sentry_own_request__ = !0);
                }
                return n.apply(this, t);
              };
            }),
              P(n, "send", function (n) {
                return function () {
                  for (var r = [], e = 0; e < arguments.length; e++)
                    r[e] = arguments[e];
                  var i = this;
                  function o() {
                    if (4 === i.readyState) {
                      if (i.__sentry_own_request__) return;
                      try {
                        i.__sentry_xhr__ &&
                          (i.__sentry_xhr__.status_code = i.status);
                      } catch (n) {}
                      t.addBreadcrumb(
                        {
                          category: "xhr",
                          data: i.__sentry_xhr__,
                          type: "http",
                        },
                        { xhr: i }
                      );
                    }
                  }
                  i.__sentry_own_request__ && vt(r[0]);
                  return (
                    ["onload", "onerror", "onprogress"].forEach(function (n) {
                      !(function (n, t) {
                        n in t &&
                          "function" == typeof t[n] &&
                          P(t, n, function (t) {
                            return rt(t, {
                              mechanism: {
                                data: {
                                  function: n,
                                  handler: (t && t.name) || "<anonymous>",
                                },
                                handled: !0,
                                type: "instrument",
                              },
                            });
                          });
                      })(n, i);
                    }),
                    "onreadystatechange" in i &&
                    "function" == typeof i.onreadystatechange
                      ? P(i, "onreadystatechange", function (n) {
                          return rt(
                            n,
                            {
                              mechanism: {
                                data: {
                                  function: "onreadystatechange",
                                  handler: (n && n.name) || "<anonymous>",
                                },
                                handled: !0,
                                type: "instrument",
                              },
                            },
                            o
                          );
                        })
                      : (i.onreadystatechange = o),
                    n.apply(this, r)
                  );
                };
              });
          }
        }),
        (t.addBreadcrumb = function (n, r) {
          an().getIntegration(t) && an().addBreadcrumb(n, r);
        }),
        (t.prototype.setupOnce = function () {
          this.on.console && this.qn(),
            this.on.dom && this.Fn(),
            this.on.xhr && this.Wn(),
            this.on.fetch && this.Hn(),
            this.on.history && this.Pn();
        }),
        (t.id = "Breadcrumbs"),
        t
      );
    })();
  function vt(t) {
    try {
      var r = JSON.parse(t);
      ht.addBreadcrumb(
        {
          category: "sentry",
          event_id: r.event_id,
          level: r.level || n.Severity.fromString("error"),
          message: S(r),
        },
        { event: r }
      );
    } catch (n) {
      A.error("Error while adding sentry type breadcrumb");
    }
  }
  var lt = "cause",
    dt = 5,
    pt = (function () {
      function n(t) {
        void 0 === t && (t = {}),
          (this.name = n.id),
          (this.Bn = t.key || lt),
          (this._ = t.limit || dt);
      }
      return (
        (n.prototype.setupOnce = function () {
          en(function (t, r) {
            var e = an().getIntegration(n);
            return e ? e.$n(t, r) : t;
          });
        }),
        (n.prototype.$n = function (n, t) {
          if (
            !(
              n.exception &&
              n.exception.values &&
              t &&
              t.originalException instanceof Error
            )
          )
            return n;
          var r = this.Xn(t.originalException, this.Bn);
          return (n.exception.values = o(r, n.exception.values)), n;
        }),
        (n.prototype.Xn = function (n, t, r) {
          if (
            (void 0 === r && (r = []),
            !(n[t] instanceof Error) || r.length + 1 >= this._)
          )
            return r;
          var e = qn(Mn(n[t]));
          return this.Xn(n[t], t, o([e], r));
        }),
        (n.id = "LinkedErrors"),
        n
      );
    })(),
    yt = x(),
    mt = (function () {
      function n() {
        this.name = n.id;
      }
      return (
        (n.prototype.setupOnce = function () {
          en(function (t) {
            if (an().getIntegration(n)) {
              if (!yt.navigator || !yt.location) return t;
              var r = t.request || {};
              return (
                (r.url = r.url || yt.location.href),
                (r.headers = r.headers || {}),
                (r.headers["User-Agent"] = yt.navigator.userAgent),
                e({}, t, { request: r })
              );
            }
            return t;
          });
        }),
        (n.id = "UserAgent"),
        n
      );
    })(),
    wt = Object.freeze({
      GlobalHandlers: ut,
      TryCatch: ct,
      Breadcrumbs: ht,
      LinkedErrors: pt,
      UserAgent: mt,
    }),
    bt = [new On(), new _n(), new ct(), new ht(), new ut(), new pt(), new mt()];
  var gt = {},
    Et = x();
  Et.Sentry && Et.Sentry.Integrations && (gt = Et.Sentry.Integrations);
  var xt = e({}, gt, kn, wt);
  return (
    (n.BrowserClient = Yn),
    (n.Hub = un),
    (n.Integrations = xt),
    (n.SDK_NAME = Qn),
    (n.SDK_VERSION = "5.7.1"),
    (n.Scope = tn),
    (n.Span = nn),
    (n.Transports = Vn),
    (n.addBreadcrumb = function (n) {
      ln("addBreadcrumb", n);
    }),
    (n.addGlobalEventProcessor = en),
    (n.captureEvent = function (n) {
      return ln("captureEvent", n);
    }),
    (n.captureException = captureException),
    (n.captureMessage = function (n, t) {
      var r;
      try {
        throw new Error(n);
      } catch (n) {
        r = n;
      }
      return ln("captureMessage", n, t, {
        originalException: n,
        syntheticException: r,
      });
    }),
    (n.close = function (n) {
      var t = an().getClient();
      return t ? t.close(n) : V.reject(!1);
    }),
    (n.configureScope = function (n) {
      ln("configureScope", n);
    }),
    (n.defaultIntegrations = bt),
    (n.flush = function (n) {
      var t = an().getClient();
      return t ? t.flush(n) : V.reject(!1);
    }),
    (n.forceLoad = function () {}),
    (n.getCurrentHub = an),
    (n.getHubFromCarrier = hn),
    (n.init = function (n) {
      if (
        (void 0 === n && (n = {}),
        void 0 === n.defaultIntegrations && (n.defaultIntegrations = bt),
        void 0 === n.release)
      ) {
        var t = x();
        t.SENTRY_RELEASE &&
          t.SENTRY_RELEASE.id &&
          (n.release = t.SENTRY_RELEASE.id);
      }
      !(function (n, t) {
        !0 === t.debug && A.enable(), an().bindClient(new n(t));
      })(Yn, n);
    }),
    (n.lastEventId = function () {
      return an().lastEventId();
    }),
    (n.onLoad = function (n) {
      n();
    }),
    (n.setContext = function (n, t) {
      ln("setContext", n, t);
    }),
    (n.setExtra = function (n, t) {
      ln("setExtra", n, t);
    }),
    (n.setExtras = function (n) {
      ln("setExtras", n);
    }),
    (n.setTag = function (n, t) {
      ln("setTag", n, t);
    }),
    (n.setTags = function (n) {
      ln("setTags", n);
    }),
    (n.setUser = function (n) {
      ln("setUser", n);
    }),
    (n.showReportDialog = function (n) {
      void 0 === n && (n = {}), n.eventId || (n.eventId = an().lastEventId());
      var t = an().getClient();
      t && t.showReportDialog(n);
    }),
    (n.withScope = dn),
    (n.wrap = function (n) {
      return rt(n)();
    }),
    n
  );
})({});
//# sourceMappingURL=bundle.min.js.map
