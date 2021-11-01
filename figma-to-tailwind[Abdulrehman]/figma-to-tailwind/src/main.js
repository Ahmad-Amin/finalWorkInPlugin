(() => {
  var e = {
      915: (e, t, n) => {
        const { borderRadiusMap: i, borderWidthMap: a } = n(774);
        e.exports = {
          getBorderRadiusClass: function (e) {
            let t = e.topLeftRadius,
              n = e.topRightRadius,
              a = e.bottomRightRadius,
              l = e.bottomLeftRadius;
            return t || n || a || l
              ? t == n && t == a && t == l
                ? t > "24"
                  ? "rounded-full"
                  : `rounded${i[t]}`
                : `border-tl${i[t]} border-tr${i[n]} border-br${i[a]} border-bl${i[l]}`
              : "";
          },
          getBorderWidthClass: function (e) {
            return e.strokes && 0 != e.strokes.length
              ? `border${a[e.strokeWeight]}`
              : "";
          },
        };
      },
      609: (e, t, n) => {
        const {
            colorMap: i,
            pixelToTailwind: a,
            fontPixelToTailwind: l,
            fontWeightMap: r,
            fractionalPixelHaystack: s,
          } = n(774),
          { RGBToHex: o } = n(19),
          { boxShadowMap: d } = n(523),
          c = (e) => {
            if (e.width <= 384) return "";
            let t, n, i, l;
            return (
              e.parent && (t = e.parent.width),
              (n = e.width),
              (i = 100 * (n / t).toFixed(2)),
              (i = s.reduce((e, t) =>
                Math.abs(e - i) < Math.abs(t - i) ? e : t
              )),
              (i += "%"),
              (l = a[i] ? `w-${a[i]}` : "w-full"),
              l
            );
          };
        e.exports = {
          getBGColor: function (e) {
            let t, n;
            if ("GROUP" != e.type) {
              if (!e.fills) return "";
              if (e.fills.length > 0)
                return (
                  (t = e.fills[0].color),
                  (n = JSON.stringify(t)),
                  `bg-${i[o(t)]}`
                );
            }
            return "";
          },
          getFractionalWidth: c,
          getWidth: function (e) {
            let t = Math.round(e.width, 1);
            return t > 384 ? c(e) : t <= 384 && a[t] ? `w-${a[t]} ` : "";
          },
          getHeight: function (e) {
            let t = Math.round(e.height, 1);
            return t > 384 ? "" : t <= 384 && a[t] ? `h-${a[t]} ` : "";
          },
          getLayout: function (e) {
            let t = "",
              n = e.layoutMode;
            return n
              ? ((t =
                  "VERTICAL" == n
                    ? "flex flex-col items-center justify-center"
                    : "flex items-center justify-center"),
                t)
              : "";
          },
          textClasses: function (e) {
            let t, n;
            e.fills.length > 0 &&
              ((t = e.fills[0].color), (n = JSON.stringify(t)));
            let s,
              d = e.fontSize;
            e.fontName && (s = e.fontName.style ? e.fontName.style : "");
            let c = "";
            switch (e.textAlignHorizontal) {
              case "LEFT":
                c = "text-left";
                break;
              case "CENTER":
                c = "text-center";
                break;
              case "RIGHT":
                c = "text-right";
                break;
              default:
                c = "";
            }
            let g = e.lineHeight.value,
              m = a[g];
            return `text-${i[o(t)]} ${l[d]} ${r[s]} ${c} leading-${m}`;
          },
          getPadding: function (e) {
            let t, n;
            return (
              e && e.parent.children[1] && (t = e.parent.children[1].x - e.x),
              e.parent.children[1] && e && (n = e.parent.children[1].y - e.y),
              `px-${a[t] ? a[t] : ""} py-${a[n] ? a[n] : ""}`
            );
          },
          getMargin: function (e) {
            e.parent.chilren.length;
          },
          getBoxShadow: function (e) {
            let t = [];
            e.effects &&
              e.effects.forEach((e, n) => {
                "DROP_SHADOW" == e.type && t.push(e);
              });
            let n = "",
              i = "";
            return (
              t.forEach((e) => {
                let t = e.offset.x,
                  a = e.offset.y,
                  l = e.spread,
                  r = e.radius,
                  s = Math.round(100 * e.color.a, 1) / 100;
                (n = `${t}_${a}_${r}_${l}_${s}`),
                  Object.keys(d).includes(n) && (i = d[n]);
              }),
              i
            );
          },
        };
      },
      865: (e, t, n) => {
        const { flexMap: i, justifyMap: a, alignMap: l } = n(536),
          { pixelToTailwind: r } = n(774);
        e.exports = {
          getValues: function (e) {
            let t = e.layoutMode,
              n = e.primaryAxisAlignItems,
              i = e.counterAxisAlignItems,
              a = e.paddingLeft,
              l = e.paddingRight,
              r = e.paddingTop,
              s = e.paddingBottom,
              o = e.itemSpacing;
            return {
              isFrame: "FRAME" == e.type || "COMPONENT" == e.type,
              mode: t,
              justify: n,
              align: i,
              paddingTop: r,
              paddingRight: l,
              paddingBottom: s,
              paddingLeft: a,
              spacing: o,
            };
          },
          getTailWindClasses: function (e) {
            const t = i[e.mode],
              n = a[e.justify],
              s = l[e.align],
              o = r[e.paddingLeft],
              d = r[e.paddingRight],
              c = r[e.paddingTop],
              g = r[e.paddingBottom];
            return (
              r[e.spacing],
              e.mode,
              e.isFrame
                ? `${t || ""} ${n} ${s} pt-${c} pr-${d} pb-${g} pl-${o}`
                : ""
            );
          },
          getSpacingFromParent: function (e) {
            if (e.parent && e.parent.children.length > 1) {
              if (
                e.parent.children.indexOf(e) == e.parent.children.length - 1 &&
                e.parent.children.length > 1
              )
                return "";
              let t;
              return "SPACE_BETWEEN" == e.parent.primaryAxisAlignItems
                ? ""
                : "VERTICAL" == e.parent.layoutMode
                ? ((t = e.parent.itemSpacing), `mb-${r[t]}`)
                : "HORIZONTAL" == e.parent.layoutMode
                ? ((t = e.parent.itemSpacing), `mr-${r[t]}`)
                : "";
            }
            return "";
          },
        };
      },
      523: (e) => {
        e.exports = {
          boxShadowMap: {
            "0_1_2_0_0.07": "shadow-sm",
            "0_1_3_0_0.1": "shadow",
            "0_4_6_-1_0.1": "shadow-md",
            "0_10_15_-3_0.1": "shadow-lg",
            "0_20_25_-5_0.1": "shadow-xl",
            "0_25_50_-12_0.25": "shadow-2xl",
          },
        };
      },
      536: (e) => {
        e.exports = {
          flexMap: { HORIZONTAL: "flex flex-row", VERTICAL: "flex flex-col" },
          justifyMap: {
            MIN: "justify-start",
            MAX: "justify-end",
            CENTER: "justify-center",
            SPACE_BETWEEN: "justify-between",
          },
          alignMap: {
            MIN: "items-start",
            MAX: "items-end",
            CENTER: "items-center",
          },
        };
      },
      774: (e) => {
        e.exports = {
          colorMap: {
            "#FFFFFF": "white",
            "#000000": "black",
            "#F9FAFB": "gray-50",
            "#F3F4F6": "gray-100",
            "#E5E7EB": "gray-200",
            "#D1D5DB": "gray-300",
            "#9CA3AF": "gray-400",
            "#6B7280": "gray-500",
            "#4B5563": "gray-600",
            "#374151": "gray-700",
            "#1F2937": "gray-800",
            "#111827": "gray-900",
            "#FEF2F2": "red-50",
            "#FEE2E2": "red-100",
            "#FECACA": "red-200",
            "#FCA5A5": "red-300",
            "#F87171": "red-400",
            "#EF4444": "red-500",
            "#DC2626": "red-600",
            "#B91C1C": "red-700",
            "#991B1B": "red-800",
            "#7F1D1D": "red-900",
            "#FFFBEB": "yellow-50",
            "#FEF3C7": "yellow-100",
            "#FDE68A": "yellow-200",
            "#FCD34D": "yellow-300",
            "#FBBF24": "yellow-400",
            "#F59E0B": "yellow-500",
            "#D97706": "yellow-600",
            "#B45309": "yellow-700",
            "#92400E": "yellow-800",
            "#78350F": "yellow-900",
            "#ECFDF5": "green-50",
            "#D1FAE5": "green-100",
            "#A7F3D0": "green-200",
            "#6EE7B7": "green-300",
            "#34D399": "green-400",
            "#10B981": "green-500",
            "#059669": "green-600",
            "#047857": "green-700",
            "#065F46": "green-800",
            "#064E3B": "green-900",
            "#EFF6FF": "blue-50",
            "#DBEAFE": "blue-100",
            "#BFDBFE": "blue-200",
            "#93C5FD": "blue-300",
            "#60A5FA": "blue-400",
            "#3B82F6": "blue-500",
            "#2563EB": "blue-600",
            "#1D4ED8": "blue-700",
            "#1E40AF": "blue-800",
            "#1E3A8A": "blue-900",
            "#EEF2FF": "indigo-50",
            "#E0E7FF": "indigo-100",
            "#C7D2FE": "indigo-200",
            "#A5B4FC": "indigo-300",
            "#818CF8": "indigo-400",
            "#6366F1": "indigo-500",
            "#4F46E5": "indigo-600",
            "#4338CA": "indigo-700",
            "#3730A3": "indigo-800",
            "#312E81": "indigo-900",
            "#F5F3FF": "purple-50",
            "#EDE9FE": "purple-100",
            "#DDD6FE": "purple-200",
            "#C4B5FD": "purple-300",
            "#A78BFA": "purple-400",
            "#8B5CF6": "purple-500",
            "#7C3AED": "purple-600",
            "#6D28D9": "purple-700",
            "#5B21B6": "purple-800",
            "#4C1D95": "purple-900",
            "#FDF2F8": "pink-50",
            "#FCE7F3": "pink-100",
            "#FBCFE8": "pink-200",
            "#F9A8D4": "pink-300",
            "#F472B6": "pink-400",
            "#EC4899": "pink-500",
            "#DB2777": "pink-600",
            "#BE185D": "pink-700",
            "#9D174D": "pink-800",
            "#831843": "pink-900",
          },
          pixelToTailwind: {
            0: "0",
            1: "px",
            4: "1",
            6: "1.5",
            8: "2",
            10: "2.5",
            12: "3",
            14: "3.5",
            16: "4",
            20: "5",
            24: "6",
            28: "7",
            32: "8",
            36: "9",
            40: "10",
            44: "11",
            48: "12",
            56: "14",
            64: "16",
            80: "20",
            96: "24",
            112: "28",
            128: "32",
            144: "36",
            160: "40",
            176: "44",
            192: "48",
            208: "52",
            224: "56",
            240: "60",
            256: "64",
            272: "68",
            288: "72",
            304: "76",
            320: "80",
            336: "84",
            352: "88",
            368: "92",
            384: "96",
            "50%": "1/2",
            "33.33%": "1/3",
            "66.66%": "2/3",
            "25%": "1/4",
            "50%": "2/4",
            "75%": "3/4",
            "20%": "1/5",
            "40%": "2/5",
            "60%": "3/5",
            "80%": "4/5",
            "16.66%": "1/6",
            "33.33%": "2/6",
            "50%": "3/6",
            "66.66%": "4/6",
            "83.33%": "5/6",
            "8.33%": "1/12",
            "16.66%": "2/12",
            "25%": "3/12",
            "33.33%": "4/12",
            "41.66%": "5/12",
            "50%": "6/12",
            "58.33%": "7/12",
            "66.66%": "8/12",
            "75%": "9/12",
            "83.33%": "10/12",
            "91.66%": "11/12",
            "95%:": "full",
            screen: "screen",
          },
          fontWeightMap: {
            Thin: "font-thin",
            "Extra Light": "font-extralight",
            Light: "font-light",
            Regular: "font-regular",
            Medium: "font-medium",
            SemiBold: "font-semibold",
            Bold: "font-bold",
            "Extra Bold": "font-extrabold",
            Black: "font-black",
          },
          fontPixelToTailwind: {
            12: "text-xs",
            14: "text-sm",
            16: "text-base",
            18: "text-lg",
            20: "text-xl",
            24: "text-2xl",
            30: "text-3xl",
            36: "text-4xl",
            48: "text-5xl",
            60: "text-6xl",
            72: "text-7xl",
            96: "text-8xl",
            128: "text-9xl",
          },
          borderRadiusMap: {
            0: "-none",
            2: "-sm",
            4: "",
            6: "-md",
            8: "-lg",
            12: "-xl",
            16: "-2xl",
            24: "-3xl",
            9999: "-full",
          },
          borderWidthMap: { 0: "-0", 2: "-2", 4: "-4", 8: "-8", 1: "" },
          fractionalPixelHaystack: [
            "8.33",
            "16.66",
            "25",
            "33.33",
            "41.66",
            "50",
            "58.33",
            "66.66",
            "75",
            "83.33",
            "91.66",
            "95",
          ],
        };
      },
      378: (e) => {
        let t = {},
          n = {},
          i = {};
        function a(e, t) {
          if (!t) return {};
          let n = {};
          return (
            Object.keys(e).forEach((i) => {
              i == t.id ? ((n.key = i), (n.classes = e[i])) : a(e[i]);
            }),
            n
          );
        }
        e.exports = {
          addBreakpointsClasses: function (e) {
            const n = a(t, e);
            let i,
              l,
              r,
              s,
              o,
              d = n.key,
              c = n.classes;
            c &&
              ((i = c.sm
                .split(" ")
                .map((e) => ("" == e || " " == e ? "" : `sm:${e}`))
                .join(" ")),
              (l = c.md
                .split(" ")
                .map((e) => ("" == e || " " == e ? "" : `md:${e}`))
                .join(" ")),
              (r = c.lg
                .split(" ")
                .map((e) => ("" == e || " " == e ? "" : `lg:${e}`))
                .join(" ")),
              (s = c.xl
                .split(" ")
                .map((e) => ("" == e || " " == e ? "" : `xl:${e}`))
                .join(" ")),
              (o = c._2xl
                .split(" ")
                .map((e) => ("" == e || " " == e ? "" : `2xl:${e}`))
                .join(" ")));
            let g = i + " " + l + " " + r + " " + s + " " + o;
            if (d) {
              if (e.name.includes("(")) {
                let t = e.name.split(""),
                  n = t.slice(t.indexOf("(") + 1, t.indexOf(")")).length;
                t.splice(t.indexOf("(") + 1, n);
                let i = t.join("").replace(")", `${g})`);
                e.name = i;
              } else e.name += `(${g})`;
              return g;
            }
            return e.name.includes("(") || (e.name += ""), "";
          },
          addCustomClasses: function (e) {
            const t = a(n, e),
              i = t.classes;
            if (t.key) {
              if (e.name.includes("[")) {
                let t = e.name.split(""),
                  n = t.slice(t.indexOf("[") + 1, t.indexOf("]")).length;
                t.splice(t.indexOf("[") + 1, n);
                let a = t.join("").replace("]", `${i}]`);
                e.name = a;
              } else
                e.name.includes("(")
                  ? (e.name += `[${i}]`)
                  : (e.name += `()[${i}]`);
              return i;
            }
            return e.name.includes("[") || (e.name += ""), "";
          },
          addTagName: function (e) {
            const t = a(i, e),
              n = t.classes;
            if (t.key) {
              if (e.name.includes("{")) {
                let t = e.name.split(""),
                  i = t.slice(t.indexOf("{") + 1, t.indexOf("}")).length;
                t.splice(t.indexOf("{") + 1, i);
                let a = t.join("").replace("}", `${n}}`);
                e.name = a;
              } else
                e.name.includes("(")
                  ? e.name.includes("[")
                    ? (e.name += `{${n}}`)
                    : (e.name += `[]{${n}}`)
                  : (e.name += `()[]{${n}}`);
              return n;
            }
            return e.name.includes("{") || (e.name += ""), "";
          },

          iter: a,
          changedBreakpoints: t,
          addedCustomClasses: n,
          addedTagName: i,
        };
      },
      19: (e) => {
        e.exports = {
          RGBToHex: function (e) {
            if (e) {
              let t = e.r,
                n = e.g,
                i = e.b;
              return (
                (t = Math.round(255 * e.r)),
                (n = Math.round(255 * e.g)),
                (i = Math.round(255 * e.b)),
                (t = t.toString(16)),
                (n = n.toString(16)),
                (i = i.toString(16)),
                1 == t.length && (t = "0" + t),
                1 == n.length && (n = "0" + n),
                1 == i.length && (i = "0" + i),
                `#${t.toUpperCase() + n.toUpperCase() + i.toUpperCase()}`
              );
            }
          },
        };
      },
    },
    t = {};
  function n(i) {
    var a = t[i];
    if (void 0 !== a) return a.exports;
    var l = (t[i] = { exports: {} });
    return e[i](l, l.exports, n), l.exports;
  }
  (() => {
    const { flexMap: e, justifyMap: t, alignMap: i } = n(536),
      { getValues: a, getTailWindClasses: l, getSpacingFromParent: r } = n(865),
      {
        addBreakpointsClasses: s,
        addCustomClasses: o,
        addTagName: d,
        iter: c,
        changedBreakpoints: g,
        addedCustomClasses: m,
        addedTagName: f,
      } = n(378),
      { getBorderRadiusClass: p, getBorderWidthClass: u } = n(915),
      {
        getBGColor: x,
        getFractionalWidth: h,
        getWidth: $,
        getHeight: F,
        getLayout: E,
        textClasses: y,
        getPadding: b,
        getMargin: C,
        getBoxShadow: B,
      } = n(609);
    let O,
      k = [],
      D = "";
    function M(e) {
      let t,
        n = e.split(" ");
      n.forEach((e, t) => {
        let i = e.split("-").reverse()[0];
        ("undefined" != i && "0" !== i) || (n[t] = "");
      });
      for (let e = 0; e < n; e++);
      return (t = n.join(" ")), t;
    }
    function w(e, t) {
      if (((O = !1), !e)) return;
      let n, i, c;
      (n = e.name), (i = e.parent ? e.parent.name : null);
      let g = "";
      for (var m = 0; m < t; m++) g += "#";
      let f = "";
      if (e.children) {
        c = e.children;
        const n = a(e),
          i = l(n);
        if ("img" == e.name.split("-")[1]) {
          let t = e.height,
            n = e.width;
          return (
            (f = `${s(e)} ${o(e)} ${B(e)}`),
            void (D += `${g}<img class='${M(
              f
            )}' src='https://via.placeholder.com/${n}x${t}'@ />\n`)
          );
        }
        (f = `${s(e)} ${o(e)} ${$(e)} ${F(e)} ${x(e)} ${i} ${u(e)} ${p(e)} ${r(
          e
        )} ${B(e)}`),
          (D += `${g}<${d(e) ? d(e) : "div"} class='${M(f)}'>\n`),
          c.forEach((e) => {
            "bg" == e.name.split("-")[1] && (O = !0);
          });
        let m = O ? t + 2 : t + 1;
        return (
          c.forEach((e) => {
            w(e, m);
          }),
          c.forEach((e) => {
            "bg" == e.name.split("-")[1] && (O = !0);
          }),
          c.every((e) => {
            if ("bg" == e.name.split("-")[1])
              return (D += `${g + "#"}</${d(e) ? d(e) : "div"}>\n`), !1;
          }),
          void (D += `${g}</${d(e) ? d(e) : "div"}>\n`)
        );
      }
      if ("img" == e.name.split("-")[1]) {
        let t = e.height,
          n = e.width;
        (f = `${s(e)} ${o(e)} ${B(e)}`),
          (D += `${g}<img class='${M(
            f
          )}' src='https://via.placeholder.com/${n}x${t}' />\n`);
      } else if ("RECTANGLE" == e.type && "bg" == e.name.split("-")[1]) {
        let t = g
          .split("")
          .splice(0, g.length - 1)
          .join("");
        (f = `${s(e)} ${o(e)} ${x(e)} ${F(e)} ${$(e)} ${E(e)} ${u(e)} ${p(
          e
        )} ${r(e)} ${B(e)}`),
          (D += `${t}<${d(e) ? d(e) : "div"} class='${M(f)}'>\n`);
      } else
        "RECTANGLE" == e.type
          ? ((f = `${s(e)} ${o(e)} ${x(e)} ${$(e)} ${F(e)} ${E(e)} ${u(e)} ${p(
              e
            )} ${r(e)} ${B(e)}`),
            (D += `${g}<${d(e) ? d(e) : "div"} class='${M(f)}'></div>\n`))
          : "TEXT" == e.type &&
            (e.characters
              ? ((f = `${s(e)} ${o(e)} ${y(e)} ${r(e)} ${B(e)}`),
                (D += `${g}<${d(e) ? d(e) : "p"} class='${M(f)}'>${e.characters
                  .split("\n")
                  .join("&lt/br&gt")}</${d(e) ? d(e) : "p"}>\n`))
              : ((f = `${s(e)} ${o(e)} ${y(e)} ${r(e)} ${B(e)}`),
                (D += `${g}<${d(e) ? d(e) : "p"} class='${M(f)}'></${
                  d(e) ? d(e) : "p"
                }>\n`)));
    }
    function P(e) {
      return w(e, 0), D;
    }
    function A(e) {
      k.push(e);
      let t = e.children;
      t &&
        t.forEach((e) => {
          A(e);
        });
    }
    figma.on("run", () => {
      const e = figma.currentPage;
      let t;
      D = "";
      let n,
        i,
        a,
        l,
        r,
        s,
        o,
        d,
        p,
        u,
        x = figma.currentPage.selection[0];
      if (
        (x || (x = e.children[0]),
        (n = x.id),
        A(e.children[0]),
        k.forEach((e) => {
          if (e.name.indexOf("(") > -1) {
            i = e.name.slice(e.name.indexOf("(") + 1, e.name.indexOf(")"));
            let t = i.split(" ");
            (a = { sm: "", md: "", lg: "", xl: "", _2xl: "" }),
              t.forEach((e) => {
                let t = e.split(":"),
                  n = t[0],
                  i = t[1];
                switch (n) {
                  case "sm":
                    a.sm += a.sm ? (a.sm += i) : i;
                    break;
                  case "md":
                    a.md += i;
                    break;
                  case "lg":
                    a.lg += i;
                    break;
                  case "xl":
                    a.xl += i;
                    break;
                  case "2xl":
                    a._2xl += i;
                }
              }),
              (l = a),
              (g[e.id] = a);
          }
          e.name.indexOf("[") > -1 &&
            ((r = e.name.slice(e.name.indexOf("[") + 1, e.name.indexOf("]"))),
            (m[e.id] = r),
            (s = r)),
            e.name.indexOf("{") > -1 &&
              ((d = e.name.slice(e.name.indexOf("{") + 1, e.name.indexOf("}"))),
              (f[e.id] = d),
              (p = d));
        }),
        x.name.indexOf("(") > -1)
      ) {
        i = x.name.slice(x.name.indexOf("(") + 1, x.name.indexOf(")"));
        let e = i.split(" ");
        (a = { sm: "", md: "", lg: "", xl: "", _2xl: "" }),
          e.forEach((e) => {
            let t = e.split(":"),
              n = t[0],
              i = t[1];
            switch (n) {
              case "sm":
                a.sm += a.sm ? (a.sm += i) : i;
                break;
              case "md":
                a.md += i;
                break;
              case "lg":
                a.lg += i;
                break;
              case "xl":
                a.xl += i;
                break;
              case "2xl":
                a._2xl += i;
            }
          }),
          (l = a),
          (g[n] = a);
      } else
        (a = c(
          g,
          figma.currentPage.selection[0] ? figma.currentPage.selection[0] : {}
        )),
          (l = a.classes);
      x.name.indexOf("[") > -1
        ? ((r = x.name.slice(x.name.indexOf("[") + 1, x.name.indexOf("]"))),
          (m[n] = r),
          (s = r))
        : ((o = c(
            m,
            figma.currentPage.selection[0] ? figma.currentPage.selection[0] : {}
          )),
          (s = o.customClasses)),
        x.name.indexOf("{") > -1
          ? ((d = x.name.slice(x.name.indexOf("{") + 1, x.name.indexOf("}"))),
            (f[n] = d),
            (p = d))
          : ((u = c(
              f,
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : {}
            )),
            (p = u.tagName)),
        (t = P(x || e.children[0])),
        figma.ui.postMessage({
          code: t,
          selectedItemID: n,
          breakpoints: l,
          customClasses: s,
          tagName: p,
        });
    }),
      figma.on("selectionchange", () => {
        const e = figma.currentPage;
        let t;
        (k = []), (D = "");
        let n,
          i,
          a,
          l,
          r,
          s,
          o,
          d,
          p,
          u,
          x = figma.currentPage.selection[0];
        if ((x || (x = e.children[0]), (n = x.id), x.name.indexOf("(") > -1)) {
          i = x.name.slice(x.name.indexOf("(") + 1, x.name.indexOf(")"));
          let e = i.split(" ");
          (a = { sm: "", md: "", lg: "", xl: "", _2xl: "" }),
            e.forEach((e) => {
              let t = e.split(":"),
                n = t[0],
                i = t[1];
              switch (n) {
                case "sm":
                  a.sm += a.sm ? (a.sm += i) : i;
                  break;
                case "md":
                  a.md += i;
                  break;
                case "lg":
                  a.lg += i;
                  break;
                case "xl":
                  a.xl += i;
                  break;
                case "2xl":
                  a._2xl += i;
              }
            }),
            (l = a),
            (g[n] = a);
        } else
          (a = c(
            g,
            figma.currentPage.selection[0] ? figma.currentPage.selection[0] : {}
          )),
            (l = a.classes);
        x.name.indexOf("[") > -1
          ? ((r = x.name.slice(x.name.indexOf("[") + 1, x.name.indexOf("]"))),
            (m[n] = r),
            (s = r))
          : ((o = c(
              m,
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : {}
            )),
            (s = o.customClasses)),
          x.name.indexOf("{") > -1
            ? ((d = x.name.slice(x.name.indexOf("{") + 1, x.name.indexOf("}"))),
              (f[n] = d),
              (p = d))
            : ((u = c(
                f,
                figma.currentPage.selection[0]
                  ? figma.currentPage.selection[0]
                  : {}
              )),
              (p = u.tagName)),
          (t = P(x || e.children[0])),
          figma.ui.postMessage({
            code: t,
            selectedItemID: n,
            breakpoints: l,
            customClasses: s,
            tagName: p,
          });
      }),
      figma.showUI(__html__, {
        width: 648,
        height: 700,
        title: "Figma to Tailwind",
        // position: "center",
      }),
      (figma.ui.onmessage = (e) => {
        if ("breakpoints" == e.category) {
          let t = e.nodeID,
            n = e.classes;
          (g[t] = n), (D = "");
          let i = P(
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : figma.currentPage.children[0]
            ),
            a = c(
              g,
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : {}
            ).classes;
          figma.ui.postMessage({ code: i, selectedItemID: t, breakpoints: a });
        } else if ("customClasses" == e.category) {
          let t = e.nodeID,
            n = e.customClasses;
          (m[t] = n), (D = "");
          let i = P(
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : figma.currentPage.children[0]
            ),
            a = c(
              m,
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : {}
            ).classes;
          figma.ui.postMessage({
            code: i,
            selectedItemID: t,
            customClasses: a,
          });
        } else if ("tagName" == e.category) {
          let t = e.nodeID,
            n = e.tagName;
          (f[t] = n), (D = "");
          let i = P(
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : figma.currentPage.children[0]
            ),
            a = c(
              f,
              figma.currentPage.selection[0]
                ? figma.currentPage.selection[0]
                : {}
            ).classes;
          figma.ui.postMessage({ code: i, selectedItemID: t, tagName: a });
        } else if ("previewCode" == e.category) {
          // console.log("click", e.code);
          console.log(figma.currentPage.selection);
          let width = figma.currentPage.selection[0].width;
          let height = figma.currentPage.selection[0].height;
          console.log(width, height);
          // let wp = (width / 100) * 50;
          // width = width + wp;
          // height = height + (height / 100) * 20;
          console.log(width, height);
          console.log(figma.viewport.bounds);
          // figma.ui.resize(Math.round(width), Math.round(height));
          figma.ui.resize(
            Math.round(figma.viewport.bounds.width),
            Math.round(figma.viewport.bounds.height)
          );
          // figma.ui.postMessage({ code: code });
        } else if ("closePreview" == e.category) {
          figma.ui.resize(648, 700);
        }
      });
  })();
})();
