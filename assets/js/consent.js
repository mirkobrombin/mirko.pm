var cookieconsent = function (e) {
    var n = {};

    function o(t) {
        if (n[t]) return n[t].exports;
        var i = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    return o.m = e, o.c = n, o.d = function (e, n, t) {
        o.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: t
        })
    }, o.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.t = function (e, n) {
        if (1 & n && (e = o(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (o.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var i in e) o.d(t, i, function (n) {
                return e[n]
            }.bind(null, i));
        return t
    }, o.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return o.d(n, "a", n), n
    }, o.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, o.p = "", o(o.s = 27)
}([function (e, n, o) {
    "use strict";
    e.exports = function (e) {
        var n = [];
        return n.toString = function () {
            return this.map(function (n) {
                var o = function (e, n) {
                    var o = e[1] || "",
                        t = e[3];
                    if (!t) return o;
                    if (n && "function" == typeof btoa) {
                        var i = (r = t, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"),
                            a = t.sources.map(function (e) {
                                return "/*# sourceURL=" + t.sourceRoot + e + " */"
                            });
                        return [o].concat(a).concat([i]).join("\n")
                    }
                    var r;
                    return [o].join("\n")
                }(n, e);
                return n[2] ? "@media " + n[2] + "{" + o + "}" : o
            }).join("")
        }, n.i = function (e, o) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var t = {}, i = 0; i < this.length; i++) {
                var a = this[i][0];
                null != a && (t[a] = !0)
            }
            for (i = 0; i < e.length; i++) {
                var r = e[i];
                null != r[0] && t[r[0]] || (o && !r[2] ? r[2] = o : o && (r[2] = "(" + r[2] + ") and (" + o + ")"), n.push(r))
            }
        }, n
    }
}, function (e, n, o) {
    var t, i, a = {},
        r = (t = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === i && (i = t.apply(this, arguments)), i
        }),
        s = function (e) {
            var n = {};
            return function (e, o) {
                if ("function" == typeof e) return e();
                if (void 0 === n[e]) {
                    var t = function (e, n) {
                        return n ? n.querySelector(e) : document.querySelector(e)
                    }.call(this, e, o);
                    if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                        t = t.contentDocument.head
                    } catch (e) {
                        t = null
                    }
                    n[e] = t
                }
                return n[e]
            }
        }(),
        c = null,
        l = 0,
        p = [],
        d = o(20);

    function u(e, n) {
        for (var o = 0; o < e.length; o++) {
            var t = e[o],
                i = a[t.id];
            if (i) {
                i.refs++;
                for (var r = 0; r < i.parts.length; r++) i.parts[r](t.parts[r]);
                for (; r < t.parts.length; r++) i.parts.push(h(t.parts[r], n))
            } else {
                var s = [];
                for (r = 0; r < t.parts.length; r++) s.push(h(t.parts[r], n));
                a[t.id] = {
                    id: t.id,
                    refs: 1,
                    parts: s
                }
            }
        }
    }

    function m(e, n) {
        for (var o = [], t = {}, i = 0; i < e.length; i++) {
            var a = e[i],
                r = n.base ? a[0] + n.base : a[0],
                s = {
                    css: a[1],
                    media: a[2],
                    sourceMap: a[3]
                };
            t[r] ? t[r].parts.push(s) : o.push(t[r] = {
                id: r,
                parts: [s]
            })
        }
        return o
    }

    function k(e, n) {
        var o = s(e.insertInto);
        if (!o) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var t = p[p.length - 1];
        if ("top" === e.insertAt) t ? t.nextSibling ? o.insertBefore(n, t.nextSibling) : o.appendChild(n) : o.insertBefore(n, o.firstChild), p.push(n);
        else if ("bottom" === e.insertAt) o.appendChild(n);
        else {
            if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var i = s(e.insertAt.before, o);
            o.insertBefore(n, i)
        }
    }

    function f(e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e);
        var n = p.indexOf(e);
        n >= 0 && p.splice(n, 1)
    }

    function g(e) {
        var n = document.createElement("style");
        if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
            var t = function () {
                0;
                return o.nc
            }();
            t && (e.attrs.nonce = t)
        }
        return v(n, e.attrs), k(e, n), n
    }

    function v(e, n) {
        Object.keys(n).forEach(function (o) {
            e.setAttribute(o, n[o])
        })
    }

    function h(e, n) {
        var o, t, i, a;
        if (n.transform && e.css) {
            if (!(a = "function" == typeof n.transform ? n.transform(e.css) : n.transform.default(e.css))) return function () {};
            e.css = a
        }
        if (n.singleton) {
            var r = l++;
            o = c || (c = g(n)), t = y.bind(null, o, r, !1), i = y.bind(null, o, r, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = function (e) {
            var n = document.createElement("link");
            return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", v(n, e.attrs), k(e, n), n
        }(n), t = function (e, n, o) {
            var t = o.css,
                i = o.sourceMap,
                a = void 0 === n.convertToAbsoluteUrls && i;
            (n.convertToAbsoluteUrls || a) && (t = d(t));
            i && (t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            var r = new Blob([t], {
                    type: "text/css"
                }),
                s = e.href;
            e.href = URL.createObjectURL(r), s && URL.revokeObjectURL(s)
        }.bind(null, o, n), i = function () {
            f(o), o.href && URL.revokeObjectURL(o.href)
        }) : (o = g(n), t = function (e, n) {
            var o = n.css,
                t = n.media;
            t && e.setAttribute("media", t);
            if (e.styleSheet) e.styleSheet.cssText = o;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(o))
            }
        }.bind(null, o), i = function () {
            f(o)
        });
        return t(e),
            function (n) {
                if (n) {
                    if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap) return;
                    t(e = n)
                } else i()
            }
    }
    e.exports = function (e, n) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (n = n || {}).attrs = "object" == typeof n.attrs ? n.attrs : {}, n.singleton || "boolean" == typeof n.singleton || (n.singleton = r()), n.insertInto || (n.insertInto = "head"), n.insertAt || (n.insertAt = "bottom");
        var o = m(e, n);
        return u(o, n),
            function (e) {
                for (var t = [], i = 0; i < o.length; i++) {
                    var r = o[i];
                    (s = a[r.id]).refs--, t.push(s)
                }
                e && u(m(e, n), n);
                for (i = 0; i < t.length; i++) {
                    var s;
                    if (0 === (s = t[i]).refs) {
                        for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                        delete a[s.id]
                    }
                }
            }
    };
    var _, b = (_ = [], function (e, n) {
        return _[e] = n, _.filter(Boolean).join("\n")
    });

    function y(e, n, o, t) {
        var i = o ? "" : t.css;
        if (e.styleSheet) e.styleSheet.cssText = b(n, i);
        else {
            var a = document.createTextNode(i),
                r = e.childNodes;
            r[n] && e.removeChild(r[n]), r.length ? e.insertBefore(a, r[n]) : e.appendChild(a)
        }
    }
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Active","always_active":"Always active","change_settings":"Change my preferences","find_out_more":"<p>To find out more, please visit our <a href=\'%s\' target=\'_blank\'>Cookies Policy</a>.</p>","i_agree_text":"I agree","inactive":"Inactive","ok_text":"OK","text":"We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.<br/>","title":"We use cookies"},"level_functionality":{"content":"<p>These cookies are used to provide you with a more personalized experience on our website and to remember choices you make when you use our website.</p><p>For example, we may use functionality cookies to remember your language preferences or remember your login details.</p>","title":"Functionality cookies"},"level_strictly_necessary":{"content":"<p>These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website.</p><p>Without these cookies, we cannot provide you certain services on our website.</p>","title":"Strictly necessary cookies"},"level_targeting":{"content":"<p>These cookies are used to show advertising that is likely to be of interest to you based on your browsing habits.</p><p>These cookies, as served by our content and/or advertising providers, may combine information they collected from our website with other information they have independently collected relating to your web browser\'s activities across their network of websites.</p><p>If you choose to remove or disable these targeting or advertising cookies, you will still see adverts but they may not be relevant to you.</p>","title":"Targeting and advertising cookies"},"level_tracking":{"content":"<p>These cookies are used to collect information to analyze the traffic to our website and how visitors are using our website.</p><p>For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website site for you.</p><p>The information collected through these tracking and performance cookies do not identify any individual visitor.</p>","title":"Tracking and performance cookies"},"preference_center":{"save":"Save my preferences","title":"Cookies Preferences Center"},"preference_center_menu_and_content":{"more_information_content":"<h1>More information</h1><p>For any queries in relation to our policy on cookies and your choices, please contact us.</p>","more_information_title":"More information","your_privacy_content":"<h1>Your privacy is important to us</h1>\\n<p>Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).</p><p>You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.</p>","your_privacy_title":"Your privacy"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktiv","always_active":"Immer aktiv","change_settings":"Einstellungen à¤ndern","find_out_more":"<p>Details finden Sie in unserer <a href=\'%s\' target=\'_blank\'>Datenschutzerklà¤rung</a>.</p>","i_agree_text":"Alle akzeptieren","inactive":"Inaktiv","ok_text":"OK","text":"Diese Website verwendet Cookies und Targeting Technologien um Ihnen ein besseres Internet-Erlebnis zu ermà¶glichen und die Werbung, die Sie sehen, besser an Ihre Bedà¼rfnisse anzupassen. Diese Technologien nutzen wir auàŸerdem um Ergebnisse zu messen, um zu verstehen, woher unsere Besucher kommen oder um unsere Website weiter zu entwickeln. Durch das Surfen auf unserer Website stimmen Sie der Verwendung von Cookies und anderen Tracking-Technologien zu.<br/>","title":"Ihre Privatsphà¤re ist uns wichtig"},"level_functionality":{"content":"<p>Diese Cookies werden verwendet, um Ihnen ein persà¶nlicheres Erlebnis auf unserer Website zu ermà¶glichen und um sich an Ihre Entscheidungen zu erinnern, die Sie bei der Nutzung unserer Website getroffen haben.</p><p>Beispielsweise kà¶nnen wir Funktions-Cookies verwenden, um Ihre Spracheinstellungen oder Ihre Anmeldedaten zu speichern.</p>","title":"Funktions Cookies"},"level_strictly_necessary":{"content":"<p>Diese Cookies sind fà¼r die Bereitstellung von Diensten, die à¼ber unsere Website verfà¼gbar sind, und fà¼r die Verwendung bestimmter Funktionen unserer Website von wesentlicher Bedeutung.</p><p>Ohne diese Cookies kà¶nnen wir Ihnen bestimmte Dienste auf unserer Website nicht zur Verfà¼gung stellen.</p>","title":"Technisch notwendige Cookies"},"level_targeting":{"content":"<p>Diese Cookies werden genutzt, um Werbung anzuzeigen, die Sie aufgrund Ihrer Surfgewohnheiten wahrscheinlich interessieren wird.</p><p>Diese Cookies, die von unseren Inhalten und / oder Werbeanbietern bereitgestellt werden, kà¶nnen Informationen, die sie von unserer Website gesammelt haben, mit anderen Informationen kombinieren, welche sie durch Aktività¤ten Ihres Webbrowsers in Ihrem Netzwerk von Websites gesammelt haben.</p><p>Wenn Sie diese Targeting- oder Werbe-Cookies entfernen oder deaktivieren, werden weiterhin Anzeigen angezeigt. Diese sind fà¼r Sie jedoch mà¶glicherweise nicht relevant.</p>","title":"Targeting und Werbung Cookies"},"level_tracking":{"content":"<p>Diese Cookies werden zum Sammeln von Informationen verwendet, um den Verkehr auf unserer Website und die Nutzung unserer Website durch Besucher zu analysieren.<p><p>Diese Cookies kà¶nnen beispielsweise nachverfolgen, wie lange Sie auf der Website verweilen oder welche Seiten Sie besuchen. So kà¶nnen wir verstehen, wie wir unsere Website fà¼r Sie verbessern kà¶nnen.</p><p>Die durch diese Tracking- und Performance-Cookies gesammelten Informationen identifizieren keinen einzelnen Besucher.</p>","title":"Tracking und Performance Cookies"},"preference_center":{"save":"Einstellungen speichern","title":"Cookie Einstellungen"},"preference_center_menu_and_content":{"more_information_content":"<h1>Mehr Informationen</h1><p>Bei Fragen in Bezug auf unseren Umgang mit Cookies und Ihrer Privatsphà¤re kontaktieren Sie uns bitte.</p>","more_information_title":"Mehr Informationen","your_privacy_content":"<h1>Ihre Privatsphà¤re ist uns wichtig</h1>\\n<p>Cookies sind sehr kleine Textdateien, die auf Ihrem Rechner gespeichert werden, wenn Sie eine Website besuchen. Wir verwenden Cookies fà¼r eine Reihe von Auswertungen, um damit Ihren Besuch auf unserer Website kontinuierlich zu verbessern zu kà¶nnen (z. B. damit Ihnen Ihre Login-Daten erhalten bleiben).</p><p>Sie kà¶nnen Ihre Einstellungen à¤ndern und verschiedenen Arten von Cookies erlauben, auf Ihrem Rechner gespeichert zu werden, wà¤hrend Sie unsere Webseite besuchen. Sie kà¶nnen auf Ihrem Rechner gespeicherte Cookies ebenso weitgehend wieder entfernen. Bitte bedenken Sie aber, dass dadurch Teile unserer Website mà¶glicherweise nicht mehr in der gedachten Art und Weise nutzbar sind.</p>","your_privacy_title":"Ihre Privatsphà¤re"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Actif","always_active":"Toujours activà©","change_settings":"Changer mes prà©fà©rences","find_out_more":"<p>Pour en savoir plus, merci de consulter notre <a href=\'%s\' target=\'_blank\'>Politique sur les cookies</a>.</p>","i_agree_text":"J\'accepte","inactive":"Inactif","ok_text":"OK","text":"Nous utilisons des cookies et d\'autres technologies de suivi pour amà©liorer votre expà©rience de navigation sur notre site, pour vous montrer un contenu personnalisà© et des publicità©s ciblà©es, pour analyser le trafic de notre site et pour comprendre la provenance de nos visiteurs. En naviguant sur notre site Web, vous consentez à  notre utilisation de cookies et d\'autres technologies de suivi.<br/>","title":"Nous utilisons des cookies"},"level_functionality":{"content":"<p>Ces cookies servent à  vous offrir une expà©rience plus personnalisà©e sur notre site Web et à  mà©moriser les choix que vous faites lorsque vous utilisez notre site Web.</p><p>Par exemple, nous pouvons utiliser des cookies de fonctionnalità© pour mà©moriser vos prà©fà©rences de langue ou vos identifiants de connexion.</p>","title":"Cookies de Fonctionnalità©"},"level_strictly_necessary":{"content":"<p>Ces cookies sont essentiels pour vous fournir les services disponibles sur notre site Web et vous permettre dâ€™utiliser certaines fonctionnalità©s de notre site Web.</p><p>Sans ces cookies, nous ne pouvons pas vous fournir certains services sur notre site Web.</p>","title":"Cookies strictement nà©cessaires"},"level_targeting":{"content":"<p>Ces cookies sont utilisà©s pour afficher des publicità©s susceptibles de vous intà©resser en fonction de vos habitudes de navigation.</p><p>Ces cookies, tels que servis par nos fournisseurs de contenu et / ou de publicità©, peuvent associer des informations qu\'ils ont collectà©es sur notre site Web à  d\'autres informations qu\'ils ont collectà©es de manière indà©pendante et concernant les actività©s du votre navigateur Web sur son rà©seau de sites Web.</p><p>Si vous choisissez de supprimer ou de dà©sactiver ces cookies de ciblage ou de publicità©, vous verrez toujours des annonces, mais elles risquent de ne pas àªtre pertinentes.</p>","title":"Cookies de ciblage et de publicità©"},"level_tracking":{"content":"<p>Ces cookies sont utilisà©s pour collecter des informations permettant d\'analyser le trafic sur notre site et la manière dont les visiteurs utilisent notre site.</p><p>Par exemple, ces cookies peuvent suivre des choses telles que le temps que vous passez sur le site Web ou les pages que vous visitez, ce qui nous aide à  comprendre comment nous pouvons amà©liorer notre site Web pour vous.</p><p>Les informations collectà©es via ces cookies de suivi et de performance n\' identifient aucun visiteur en particulier.</p>","title":"Cookies de suivi et de performance"},"preference_center":{"save":"Sauvegarder mes prà©fà©rences","title":"Espace de Prà©fà©rences des Cookies"},"preference_center_menu_and_content":{"more_information_content":"<h1>Plus d\'information</h1><p>Pour toute question relative à  notre politique en matière de cookies et à  vos choix, veuillez nous contacter.</p>","more_information_title":"Plus d\'information","your_privacy_content":"<h1>Votre confidentialità© est importante pour nous</h1>\\n<p>Les cookies sont de très petits fichiers texte qui sont stockà©s sur votre ordinateur lorsque vous visitez un site Web. Nous utilisons des cookies à  diverses fins et pour amà©liorer votre expà©rience en ligne sur notre site Web (par exemple, pour mà©moriser les informations de connexion de votre compte).</p><p>Vous pouvez modifier vos prà©fà©rences et refuser l\'enregistrement de certains types de cookies sur votre ordinateur lors de la navigation sur notre site. Vous pouvez à©galement supprimer les cookies dà©jà  stockà©s sur votre ordinateur, mais gardez à  l\'esprit que leur suppression peut vous empàªcher d\'utiliser des à©là©ments de notre site Web.</p>","your_privacy_title":"Votre confidentialità©"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Activo","always_active":"Siempre activo","change_settings":"Cambia mi preferencias","find_out_more":"<p>Para saber mà¡s, visita nuestra pà¡gina sobre la <a href=\'%s\' target=\'_blank\'>Polà­tica de Cookies</a>, por favor.</p>","i_agree_text":"Estoy de acuerdo","inactive":"Inactivo","ok_text":"OK","text":"Usamos cookies y otras tecnicas de rastreo para mejorar tu experiencia de navegacià³n en nuestra web, para mostrarte contenidos personalizados y anuncios adecuados, para analizar el trà¡fico en nuestra web y para comprender de donde llegan nuestros visitantes. Navegando en nuestra web tu aceptas el uso de cookies y de otras tecnicas de rastreo.<br/>","title":"Utilizamos cookies"},"level_functionality":{"content":"<p>Estos cookies son utilizados para proveerte una mà¡s personalizada experiencia en nuestra web y para recordar tu elecciones en nuestro sitio web.</p><p>Por ejemplo, podemos utilizar cookies de funcionalidad para recordar tu preferencias de idioma o tus detalles de acceso.</p>","title":"Cookies de funcionalidad"},"level_strictly_necessary":{"content":"<p>Estos cookies son esenciales para proveerte los servicios disponibles en nuestra web y para permitirte de utilizar algunas caracterà­sticas de nuestra web.</p><p>Sin estos cookies, no podemos proveer algunos servicios de nuestro sitio web.</p>","title":"Cookies estrictamente necesarias"},"level_targeting":{"content":"<p>Estos cookies son utilizados para enseà±arte anuncios que pueden ser interesantes sobre la base de tus costumbres de navegacià³n.</p><p>Estos cookies, como servidos por nuestros proveedores de contenido y/o de publicidad, puede combinar la informacià³n que ellos recogieron de nuestro sitio web con otra informacià³n recopilada por ellos en relacià³n con las actividades de su navegador web a travà©s de su red de sitios web.</p><p>Si tu eliges de cancelar o inhabilitar los cookies de seguimiento y publicidad, seguirà¡s viendo anuncios pero estos podrà­an no ser de tu interà©s.</p>","title":"Cookies de seguimiento y publicidad"},"level_tracking":{"content":"<p>Estos cookies  son utilizados para recopilar informacià³n para analizar el trà¡fico en nuestra web y la forma en que los usuarios utilizan nuestra web.</p><p>Por ejemplo, estos cookies pueden recopilar datos como cuanto tiempo llevas navegado en nuestro sitio web o que pà¡ginas visitas, cosa que nos ayuda a comprender cà³mo podemos mejorar nuestra web para ti.</p><p>La informacià³n recopilada con estos cookies de rastreo y rendimiento no identifiquen a ningàºn visitante individual.</p>","title":"Cookies de rastreo y rendimiento"},"preference_center":{"save":"Guardar mi preferencias","title":"Centro de Preferencias de Cookies"},"preference_center_menu_and_content":{"more_information_content":"<h1>Mà¡s informacià³n</h1><p>Para cualquier pregunta en relacià³n con nuestra polà­tica de cookies y tus preferencias, contacta con nosotros, por favor.</p>","more_information_title":"Mà¡s informacià³n","your_privacy_content":"<h1>Tu privacidad es importante para nosotros</h1>\\n<p>Los cookies son muy pequeà±os archivos de texto almacenados en tu ordenador cuando visitas nuestra web. Utilizamos cookies para diferentes objetivos y para mejorar tu experiencia en line en nuestro sitio web (por ejemplo, para recordar tu detalles de acceso).</p><p>Puedes cambiar tu preferencias y rechazar que algunos tipos de cookies sean almacenados en tu ordenador mientras està¡s navegando en nuestra web. Puedes tambià©n cancelar cualquier cookie ya almacenado en tu ordenador, pero recuerda que cancelar los cookies puede impedirte de utilizar algunas partes de nuestra web.</p>","your_privacy_title":"Tu privacidad"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Attivo","always_active":"Sempre attivo","change_settings":"Cambia le mie impostazioni","find_out_more":"<p>Per saperne di più, visita per favore la nostra pagina sulla <a href=\'%s\' target=\'_blank\'>Politica dei Cookies</a>.</p>","i_agree_text":"Accetto","inactive":"Inattivo","ok_text":"OK","text":"Noi usiamo i cookies e altre tecniche di tracciamento (Matomo) per migliorare la tua esperienza di navigazione nel nostro sito, per analizzare il traffico sul nostro sito, e per capire da dove arrivano i nostri visitatori. Navigando nel nostro sito web, tu accetti il nostro utilizzo dei cookies e di altre tecniche di tracciamento.<br/>","title":"Noi usiamo i cookies"},"level_functionality":{"content":"<p>Questi cookies sono utilizzati per offrirti unâ€™esperienza più personalizzata nel nostro sito e per ricordare le scelte che hai fatto mentre usavi il nostro sito.</p><p>Per esempio, possiamo usare cookies funzionali per memorizzare le tue preferenze sulla lingua o i tuoi dettagli di accesso.</p>","title":"Cookies funzionali"},"level_strictly_necessary":{"content":"<p>Questi cookies sono essenziali per fornirti i servizi disponibili nel nostro sito e per renderti disponibili alcune funzionalità  del nostro sito web.</p><p>Senza questi cookies, non possiamo fornirti alcuni servizi del nostro sito.</p>","title":"Cookies strettamente necessari"},"level_targeting":{"content":"<p>Questi cookies sono usati per mostrare annunci pubblicitari che possano verosimilmente essere di tuo interesse in base alle tue abitudini di navigazione.</p><p>Questi cookies, cosà­ come forniti dai nostri fornitori di  contenuti o annunci pubblicitari, possono combinare le informazioni che raccolgono dal nostro sito web con quelle che hanno indipendentemente raccolto in relazione allâ€™attività  del tuo browser attraverso la loro rete di siti web.</p><p>Se scegli di rimuovere o disabilitare questo tipo di cookies di targeting e pubblicità , vedrai ancora annunci pubblicitari ma potrebbero essere irrilevanti per te.</p>","title":"Cookies di targeting e pubblicità "},"level_tracking":{"content":"<p>Questi cookies sono utilizzati per raccogliere informazioni per analizzare il traffico verso il nostro sito e il modo in cui i visitatori utilizzano il nostro sito.</p><p>Per esempio, questi cookies possono tracciare cose come quanto a lungo ti fermi nel nostro sito o le pagine che visiti, cosa che ci aiuta a capire come possiamo migliorare il nostro sito per te.</p><p>Le informazioni raccolte attraverso questi cookies di tracciamento e performance non identificano alcun visitatore individuale.</p>","title":"Cookies di tracciamento e prestazione"},"preference_center":{"save":"Salva le mie impostazioni","title":"Centro Preferenze sui Cookies"},"preference_center_menu_and_content":{"more_information_content":"<h1>Più informazioni</h1><p>Per qualsiasi domanda relativa alla nostra politica sui cookies e le tue scelte, per favore contattaci.</p>","more_information_title":"Più informazioni","your_privacy_content":"<h1>La tua privacy è importante per noi</h1>\\n<p>I cookies sono dei piccolissimi file di testo che vengono memorizzati nel tuo computer quando visiti un sito web. Noi usiamo i cookies per una varietà  di scopi e per migliorare la tua esperienza online nel nostro sito web (per esempio, per ricordare i tuoi dettagli di accesso).</p><p>Tu puoi cambiare le tue impostazioni e rifiutare che alcuni tipi di cookies vengano memorizzati sul tuo computer mentre stai navigando nel nostro sito web. Puoi anche rimuovere qualsiasi cookie già  memorizzato nel tuo computer, ma ricorda che cancellare i cookies può impedirti di utilizzare alcune parti del nostro sito.</p>","your_privacy_title":"La tua privacy"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Ativo","always_active":"Sempre ativo","change_settings":"Alterar as minhas preferàªncias","find_out_more":"<p>Para obter mais detalhes, por favor consulte a nossa<a href=\'%s\' target=\'_blank\'>Polà­tica de Cookies</a>.</p>","i_agree_text":"Concordo","inactive":"Inativo","ok_text":"OK","text":"Utilizamos cookies e outras tecnologias de medià§à£o para melhorar a sua experiàªncia de navegaà§à£o no nosso site, de forma a mostrar conteàºdo personalizado, anàºncios direcionados, analisar o trà¡fego do site e entender de onde vàªm os visitantes. Ao navegar no nosso site, concorda com o uso de cookies e outras tecnologias de medià§à£o.<br/>","title":"O nosso site usa cookies"},"level_functionality":{"content":"<p>Estes cookies sà£o usados â€‹â€‹para fornecer uma experiàªncia mais personalizada no nosso site e para lembrar as escolhas que faz ao usar o nosso site.</p><p>Por exemplo, podemos usar cookies de funcionalidade para se lembrar das suas preferàªncias de idioma e/ ou os seus detalhes de login.</p>","title":"Cookies de funcionalidade"},"level_strictly_necessary":{"content":"<p>Estes cookies sà£o essenciais para fornecer servià§os disponà­veis no nosso site e permitir que possa usar determinados recursos no nosso site.</p><p>Sem estes cookies, nà£o podemos fornecer certos servià§os no nosso site.</p>","title":"Cookies estritamente necessà¡rios"},"level_targeting":{"content":"<p>Estes cookies sà£o usados â€‹â€‹para mostrar publicidade que provavelmente lhe pode interessar com base nos seus hà¡bitos e comportamentos de navegaà§à£o.</p><p>Estes cookies, servidos pelo nosso conteàºdo e/ ou fornecedores de publicidade, podem combinar as informaà§àµes coletadas no nosso site com outras informaà§àµes coletadas independentemente relacionadas com as atividades na rede de sites do seu navegador.</p><p>Se optar por remover ou desativar estes cookies de segmentaà§à£o ou publicidade, ainda verà¡ anàºncios, mas estes poderà£o nà£o ser relevantes para si.</p>","title":"Cookies de segmentaà§à£o e publicidade"},"level_tracking":{"content":"<p>Estes cookies sà£o usados â€‹â€‹para coletar informaà§àµes para analisar o trà¡fego no nosso site e entender como à© que os visitantes està£o a usar o nosso site.</p><p>Por exemplo, estes cookies podem medir fatores como o tempo despendido no site ou as pà¡ginas visitadas, isto vai permitir entender como podemos melhorar o nosso site para os utilizadores.</p><p>As informaà§àµes coletadas por meio destes cookies de medià§à£o e desempenho nà£o identificam nenhum visitante individual.</p>","title":"Cookies de medià§à£o e desempenho"},"preference_center":{"save":"Guardar as minhas preferàªncias","title":"Centro de preferàªncias de cookies"},"preference_center_menu_and_content":{"more_information_content":"<h1>Mais Informaà§àµes</h1><p>Para qualquer dàºvida sobre a nossa polà­tica de cookies e as suas opà§àµes, entre em contato connosco.</p>","more_information_title":"Mais Informaà§àµes","your_privacy_content":"<h1>A sua privacidade à© importante para nà³s.</h1>\\n<p>Cookies sà£o pequenos arquivos de texto que sà£o armazenados no seu computador quando visita um site. Utilizamos cookies para diversos fins e para aprimorar sua experiàªncia no nosso site (por exemplo, para se lembrar dos detalhes de login da sua conta).</p><p>Pode alterar as suas preferàªncias e recusar o armazenamento de certos tipos de cookies no seu computador enquanto navega no nosso site. Pode tambà©m remover todos os cookies jà¡ armazenados no seu computador, mas lembre-se de que a exclusà£o de cookies pode impedir o uso de determinadas à¡reas no nosso site.</p>","your_privacy_title":"A sua privacidade"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktà­v","always_active":"Mindig aktà­v","change_settings":"Beà¡llà­tà¡sok megvà¡ltoztatà¡sa","find_out_more":"<p>Ha tà¶bbet szeretne megtudni, kà©rjà¼k, keresse fel a <a href=\'%s\' target=\'_blank\'>sà¼tikre vonatkozà³ irà¡nyelveinket</a>.</p>","i_agree_text":"Elfogadom","inactive":"Inaktà­v","ok_text":"OK","text":"Az oldal sà¼tiket à©s egyà©b nyomkà¶vetÅ‘ technolà³già¡kat alkalmaz, hogy javà­tsa a bà¶ngà©szà©si à©lmà©nyà©t, azzal hogy szemà©lyre szabott tartalmakat à©s cà©lzott hirdetà©seket jelenà­t meg, à©s elemzi a weboldalunk forgalmà¡t, hogy megtudjuk honnan à©rkeztek a là¡togatà³ink. Weboldalunk bà¶ngà©szà©sà©vel hozzà¡jà¡rul a sà¼tik à©s mà¡s nyomkà¶vetÅ‘ technolà³già¡k hasznà¡latà¡hoz.<br/>","title":"Az oldal sà¼tiket hasznà¡l"},"level_functionality":{"content":"<p>Ezeket a sà¼tiket arra hasznà¡ljuk, hogy szemà©lyre szabottabb à©lmà©nyt nyàºjtsunk weboldalunkon, à©s hogy az oldal rà¶gzà­tse a webhelyà¼nk hasznà¡lata sorà¡n tett dà¶ntà©seket.</p><p>Pà©ldà¡ul arra hasznà¡lhatunk funkcionà¡lis sà¼tiket, hogy emlà©kezzà¼nk a nyelvi beà¡llà­tà¡sokra, vagy a bejelentkezà©si adataira.</p>","title":"Funkcionà¡lis sà¼tik"},"level_strictly_necessary":{"content":"<p>Ezek a sà¼tik elengedhetetlenek a weboldalunkon elà©rhetÅ‘ szolgà¡ltatà¡sok nyàºjtà¡sà¡hoz, valamint weboldalunk bizonyos funkcià³inak hasznà¡latà¡hoz.</p><p>A feltà©tlenà¼l szà¼ksà©ges sà¼tik hasznà¡lata nà©lkà¼l weboldalunkon nem tudunk bizonyos szolgà¡ltatà¡sokat nyàºjtani à–nnek.</p>","title":"Feltà©tlenà¼l szà¼ksà©ges sà¼tik"},"level_targeting":{"content":"<p>Ezeket a sà¼tiket olyan hirdetà©sek megjelenà­tà©sà©re hasznà¡ljuk, amelyek valà³szà­nÅ±leg à©rdekli à–nt a bà¶ngà©szà©si szokà¡sai alapjà¡n.</p><p>Ezek a sà¼tik, amelyeket a tartalom à©s / vagy a reklà¡mszolgà¡ltatà³k szolgà¡ltatnak, egyesà­thetik a weboldalunktà³l gyÅ±jtà¶tt informà¡cià³kat mà¡s informà¡cià³kkal, amelyeket à¶nà¡llà³an à¶sszegyÅ±jtà¶ttek az à–n bà¶ngà©szÅ‘jà©nek tevà©kenysà©geivel kapcsolatban a webhely-hà¡là³zaton keresztà¼l.</p><p>Ha à–n àºgy dà¶nt, hogy eltà¡volà­tja vagy letiltja ezeket a cà©lirà¡nyos vagy hirdetà©si sà¼tiket, akkor is là¡tni fogja a hirdetà©seket, de lehet, hogy nem lesznek relevà¡nsak az à–n szà¡mà¡ra.</p>","title":"Cà©lirà¡nyos à©s hirdetà©si sà¼tik"},"level_tracking":{"content":"<p>Ezeket a sà¼tiket arra hasznà¡ljuk, hogy informà¡cià³kat gyÅ±jtsà¼nk weboldalunk forgalmà¡rà³l à©s là¡togatà³irà³l, webhelyà¼nk hasznà¡latà¡nak elemzà©sà©hez.</p><p>Pà©ldà¡ul ezek a sà¼tik nyomon kà¶vethetik a webhelyen tà¶ltà¶tt idÅ‘t vagy a meglà¡togatott oldalakat, amely segà­t megà©rteni, hogyan javà­thatjuk webhelyà¼nket az à–n nagyobb megelà©gedettsà©gà©re.</p><p>Ezekkel a nyomkà¶vetÅ‘ à©s teljesà­tmà©nnyel kapcsolatos sà¼tikkel à¶sszegyÅ±jtà¶tt informà¡cià³k egyetlen szemà©lyt sem azonosà­tanak.</p>","title":"Kà¶vetà©si à©s teljesà­tmà©nnyel kapcsolatos sà¼tik"},"preference_center":{"save":"Beà¡llà­tà¡sok mentà©se","title":"Sà¼tikre beà¡llà­tà¡si kà¶zpont"},"preference_center_menu_and_content":{"more_information_content":"<h1>Egyà©b informà¡cià³k</h1><p>A sà¼tikre vonatkozà³ irà¡nyelveinkkel à©s az à–n và¡lasztà¡sà¡val kapcsolatosan felmerà¼lÅ‘ bà¡rmilyen kà©rdà©sà©vel keressen meg bennà¼nket.</p>","more_information_title":"Egyà©b informà¡cià³k","your_privacy_content":"<h1>Az à¶n adatainak và©delem fontos szà¡munkra</h1>\\n<p>A sà¼tik egà©szen kicsi szà¶veges fà¡jlok, amelyeket a szà¡mà­tà³gà©pà©n tà¡rolnak, amikor meglà¡togat egy weboldalt. Sà¼tiket hasznà¡lunk kà¼là¶nfà©le cà©lokra, à©s weboldalunkon az online à©lmà©ny fokozà¡sa à©rdekà©ben (pà©ldà¡ul a fià³kjà¡nak bejelentkezà©si adatainak megjegyzà©sà©re).</p><p>Webhelyà¼nk bà¶ngà©szà©se kà¶zben megvà¡ltoztathatja a beà¡llà­tà¡sait, à©s elutasà­thatja a szà¡mà­tà³gà©pà©n tà¡rolni kà­và¡nt bizonyos tà­pusàº sà¼tik hasznà¡latà¡t. A szà¡mà­tà³gà©pen mà¡r tà¡rolt sà¼tiket eltà¡volà­thatja, de ne feledje, hogy a sà¼tik tà¶rlà©se megakadà¡lyozhatja weboldalunk egyes rà©szeinek hasznà¡latà¡t.</p>","your_privacy_title":"Az à¶n adatai và©delme"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktivno","always_active":"Uvijek aktivno","change_settings":"Promjeni moje postavke","find_out_more":"<p>Da bi saznali viÅ¡e, posjetite naÅ¡a <a href=\'%s\' target=\'_blank\'>Pravila o kolaÄiÄ‡ima</a>.</p>","i_agree_text":"SlaÅ¾em se","inactive":"Neaktivno","ok_text":"OK","text":"Koristimo kolaÄiÄ‡e i druge tehnologije praÄ‡enja da bismo poboljÅ¡ali vaÅ¡e korisniÄko iskustvo na naÅ¡oj web stranici, kako bismo vam prikazali personalizirani sadrÅ¾aj i ciljane oglase, analizirali promet na naÅ¡oj web stranici i razumjeli odakle dolaze naÅ¡i posjetitelji. Pregledavanjem naÅ¡e web stranice pristajete na naÅ¡u upotrebu kolaÄiÄ‡a i drugih tehnologija praÄ‡enja.<br/>","title":"Mi koristimo kolaÄiÄ‡e"},"level_functionality":{"content":"<p>Ovi se kolaÄiÄ‡i koriste kako bi vam pruÅ¾ili personalizirano korisniÄko iskustvo na naÅ¡oj web stranici i za pamÄ‡enje izbora koje napravite kada koristite naÅ¡u web stranicu.</p><p>Na primjer, moÅ¾emo koristiti kolaÄiÄ‡e funkcionalnosti da bismo zapamtili vaÅ¡e jeziÄne postavke ili upamtili vaÅ¡e podatke za prijavu.</p>","title":"KolaÄiÄ‡i funkcionalnosti"},"level_strictly_necessary":{"content":"<p>Ovi su kolaÄiÄ‡i neophodni za pruÅ¾anje usluga dostupnih putem naÅ¡e web stranice i omoguÄ‡avanje koriÅ¡tenja odreÄ‘enih znaÄajki naÅ¡e web stranice.</p><p>Bez ovih kolaÄiÄ‡a ne moÅ¾emo vam pruÅ¾iti odreÄ‘ene usluge na naÅ¡oj web stranici.</p>","title":"Strogo potrebni kolaÄiÄ‡i"},"level_targeting":{"content":"<p>Ovi se kolaÄiÄ‡i koriste za prikazivanje oglasa koji bi vas mogli zanimati na temelju vaÅ¡ih navika pregledavanja web stranica.</p><p>Ovi kolaÄiÄ‡i, posluÅ¾eni od naÅ¡ih pruÅ¾atelja sadrÅ¾aja i / ili oglaÅ¡avanja, mogu kombinirati podatke koje su prikupili s naÅ¡e web stranice s drugim podacima koje su neovisno prikupili, a odnose se na aktivnosti vaÅ¡eg web preglednika kroz njihovu mreÅ¾u web stranica.</p><p>Ako odluÄite ukloniti ili onemoguÄ‡iti ove kolaÄiÄ‡e za ciljano oglaÅ¡avanje, i dalje Ä‡ete vidjeti oglase, ali oni moÅ¾da nisu relevantni za vas.</p>","title":"KolaÄiÄ‡i za ciljano oglaÅ¡avanje"},"level_tracking":{"content":"<p>Ovi se kolaÄiÄ‡i koriste za prikupljanje podataka za analizu prometa na naÅ¡oj web stranici i za informaciju kako posjetitelji koriste naÅ¡u web stranicu.</p><p>Na primjer, ti kolaÄiÄ‡i mogu pratiti stvari poput dugovanja na web stranici ili stranicama koje posjetite Å¡to nam pomaÅ¾e da shvatimo kako moÅ¾emo poboljÅ¡ati vaÅ¡e korisniÄko iskustvo na naÅ¡oj web stranici.</p><p>Informacije prikupljene ovim praÄ‡enjem i kolaÄiÄ‡i izvedbe ne identificiraju nijednog pojedinaÄnog posjetitelja.</p>","title":"KolaÄiÄ‡i za praÄ‡enje i performanse"},"preference_center":{"save":"Spremi moje postavke","title":"Centar za postavke kolaÄiÄ‡a"},"preference_center_menu_and_content":{"more_information_content":"<h1>ViÅ¡e informacija</h1><p>Za sve upite vezane uz naÅ¡a pravila o kolaÄiÄ‡ima i vaÅ¡im izborima, molimo da nas kontaktirate.</p>","more_information_title":"ViÅ¡e informacija","your_privacy_content":"<h1>VaÅ¡a privatnost nam je vaÅ¾na</h1>\\n<p>KolaÄiÄ‡i su vrlo male tekstualne datoteke koje se pohranjuju na vaÅ¡em raÄunalu kada posjetite web stranicu. Mi koristimo kolaÄiÄ‡e za razliÄite svrhe i za poboljÅ¡anje vaÅ¡eg mreÅ¾nog iskustva na naÅ¡oj web stranici (na primjer, za pamÄ‡enje podataka za prijavu na vaÅ¡ korisniÄki raÄun).</p><p>MoÅ¾ete promijeniti svoje postavke i odbiti odreÄ‘ene vrste kolaÄiÄ‡a koji Ä‡e se pohraniti na vaÅ¡em raÄunalu tijekom pregledavanja naÅ¡e web stranice. TakoÄ‘er moÅ¾ete ukloniti sve kolaÄiÄ‡e koji su veÄ‡ pohranjeni na vaÅ¡em raÄunalu, ali imajte na umu da vas brisanje kolaÄiÄ‡a moÅ¾e sprijeÄiti da koristite dijelove naÅ¡e web stranice.</p>","your_privacy_title":"VaÅ¡a privatnost"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktiv","always_active":"Altid aktiv","change_settings":"Skift indstillinger","find_out_more":"<p>For at finde ud af mere, sà¥ là¦s venligst vores <a href=\'%s\' target=\'_blank\'>Cookie politik</a>.</p>","i_agree_text":"Jeg accepterer","inactive":"Inaktiv","ok_text":"OK","text":"Vi bruger cookies og andre tracking teknologier for at forbedre din oplevelse pà¥ vores website, til at vise personaliseret indhold, mà¥lrettede annoncer og til at forstà¥ hvor vores besà¸gende kommer fra. Du samtykker til brugen af vores cookies og andre tracking teknologier hvis du fortsà¦tter med at bruge vores website.\\n<br/>","title":"Vi bruger cookies"},"level_functionality":{"content":"<p>Disse cookies anvendes for at kunne give dig en personaliseret oplevelse af vores hjemmeside, og for at kunne huske valg du har truffet.</p><p>Eksempelvis kan vi bruge funktions cookies til at huske sprog-indstillinger eller dine login informationer.</p>","title":"Funktions cookies"},"level_strictly_necessary":{"content":"<p>Disse Cookies er essentielle for at du kan bruge vores hjemmeside.</p><p>Uden disse cookies kan vi ikke garantere vores hjemmeside virker ordentligt.</p>","title":"Nà¸dvendige cookies"},"level_targeting":{"content":"<p>Disse cookies anvendes for at kunne vise annoncer, som sandsynligvis er interessante for dig, baseret pà¥ dine browser profil.</p><p>Disse cookies, som sà¦ttes af vores indhold og/eller annoncepartnere, kan kombinere information fra flere hjemmesider i hele det netvà¦rk som partnerne styrer.</p><p>Hvis du deaktiverer denne indstilling vil du fortsat se reklamer, men de vil ikke là¦ngere và¦re mà¥lrettet til dig.</p>","title":"Mà¥lretning og annoncecookies"},"level_tracking":{"content":"<p>Disse cookies anvendes til at analysere besà¸g pà¥ vores hjemmeside, og hvordan du bruger vores hjemmeside.</p><p>Eksempelvis kan vi tracke hvor lang tid du bruger hjemmesiden, eller hvilke sider du kigger pà¥. Det hjà¦lper os til at forstà¥ hvordan vi kan forbedre hjemmesiden.</p><p>Informationerne kan ikke identificere dig som individ og er derfor anonyme.</p>","title":"Tracking og performance cookies"},"preference_center":{"save":"Gem mine indstillinger","title":"Cookie indstillinger"},"preference_center_menu_and_content":{"more_information_content":"<h1>Mere information</h1><p>Har du spà¸rgsmà¥l vedr. vores cookiepolitik og dine valgmuligheder, sà¥ kontakt os venligst.</p>","more_information_title":"Mere information","your_privacy_content":"<h1>Dit privatliv er vigtigt for os</h1>\\n<p>Cookies er en lille tekstfil, som gemmes pà¥ din computer, nà¥r du besà¸ger et website. Vi bruger cookies til en rà¦kke formà¥l, og for at forbedre din oplevelse pà¥ vores website (eksempelvis for at huske dine login oplysninger).</p><p>Du kan à¦ndre dine indstillinger og afvise forskellige typer cookies, som gemmes pà¥ din computer, nà¥r du besà¸ger vores website. Du kan ogsà¥ fjerne cookies som allerede er gemt pà¥ din computer, men bemà¦rk venligst at sletning af cookies kan betyde der er dele af hjemmesiden som ikke virker.</p>","your_privacy_title":"Dit privatliv"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Active","always_active":"àŽntotdeauna active","change_settings":"Vreau sÄƒ schimb setÄƒrile","find_out_more":"<p>Pentru a afla mai multe, te rugÄƒm sÄƒ citeÈ™ti <a href=\'%s\' target=\'_blank\'>Politica noastrÄƒ de Cookie-uri</a>.</p>","i_agree_text":"Sunt de acord","inactive":"Inactive","ok_text":"OK","text":"Folosim cookie-uri È™i alte tehnologii de urmÄƒrire pentru a à®mbunÄƒtÄƒÈ›i experienÈ›a ta de navigare pe website-ul nostru, pentru afiÈ™a conÈ›inut È™i reclame personalizate, pentru a analiza traficul de pe website-ul nostru È™i pentru a à®nÈ›elege de unde vin vizitatorii noÈ™tri. Navigà¢nd pe website-ul nostru, eÈ™ti de acord cu utilizarea cookie-urilor, cà¢t È™i a altor metode de urmÄƒrire folosite.<br/>","title":"Folosim cookie-uri"},"level_functionality":{"content":"<p>Aceste cookie-uri sunt folosite pentru a-È›i asigura o experienÈ›Äƒ personalizatÄƒ pe website-ul nostru È™i pentru salvarea alegerilor pe care le faci cà¢nd foloseÈ™ti website-ul nostru.</p><p>De exemplu, putem folosi cookie-uri funcÈ›ionale pentru a salva preferinÈ›ele tale legate de limba website-ului nostru sau datele de logare.</p>","title":"Cookie-uri funcÈ›ionale"},"level_strictly_necessary":{"content":"<p>Aceste cookie-uri sunt esenÈ›iale pentru a putea beneficia de serviciile disponibile pe website-ul nostru.</p><p>FÄƒrÄƒ aceste cookie-uri nu poÈ›i folosi anumite funcÈ›ionalitÄƒÈ›i ale website-ului nostru.</p>","title":"Cookie-uri strict necesare"},"level_targeting":{"content":"<p>Aceste cookie-uri sunt folosite pentru a-È›i afiÈ™a reclame cà¢t mai pe interesul tÄƒu, à®n funcÈ›ie de obiceiurile tale de navigare.</p><p>Aceste cookie-uri, aÈ™a cum sunt afiÈ™ate de furnizori noÈ™tri de conÈ›inut È™i/sau publicitate, pot combina informaÈ›ii de pe website-ul nostru cu alte informaÈ›ii pe care furnizori noÈ™tri le-au colectat à®n mod independent cu privire la activitatea ta à®n reÈ›eaua lor de website-uri.</p><p>DacÄƒ alegi sÄƒ È™tergi sau sÄƒ dezactivezi aceste cookie-uri tot vei vedea reclame, dar se poate ca aceste reclame sÄƒ nu fie relevante pentru tine.</p>","title":"Cookie-uri pentru marketing È™i publicitate"},"level_tracking":{"content":"<p>Acest tip de cookie-uri sunt folosite pentru a colecta informaÈ›ii à®n vederea analizÄƒrii traficului pe website-ul nostru È™i modul à®n care vizitatorii noÈ™tri folosesc website-ul.</p><p>De exemplu, aceste cookie-uri pot urmÄƒri cà¢t timp petreci pe website sau paginile pe care le vizitezi, ceea ce ne ajutÄƒ sÄƒ à®nÈ›elegem cum putem à®mbunÄƒtÄƒÈ›i website-ul pentru tine.</p><p>InformaÈ›iile astfel colectate nu identificÄƒ individual vizitatorii.</p>","title":"Cookie-uri de analizÄƒ È™i performanÈ›Äƒ"},"preference_center":{"save":"SalveazÄƒ","title":"PreferinÈ›e pentru Cookie-uri"},"preference_center_menu_and_content":{"more_information_content":"<h1>Mai multe informaÈ›ii</h1><p>Pentru mai multe informaÈ›ii cu privire la politica noastrÄƒ de cookie-uri È™i preferinÈ›ele tale, te rugÄƒm sÄƒ ne contactezi.</p>","more_information_title":"Mai multe informaÈ›ii","your_privacy_content":"<h1>ConfidenÈ›ialitatea ta este importantÄƒ pentru noi</h1>\\n<p>Cookie-urile sunt fiÈ™iere text foarte mici ce sunt salvate à®n browser-ul tÄƒu atunci cà¢nd vizitezi un website. Folosim cookie-uri pentru mai multe scopuri, dar È™i pentru a à®È›i oferi cea mai bunÄƒ experienÈ›Äƒ de utilizare posibilÄƒ (de exemplu, sÄƒ reÈ›inem datele tale de logare à®n cont).</p><p>àŽÈ›i poÈ›i modifica preferinÈ›ele È™i poÈ›i refuza ca anumite tipuri de cookie-uri sÄƒ nu fie salvate à®n browser à®n timp ce navigezi pe website-ul nostru. Deasemenea poÈ›i È™terge cookie-urile salvate deja à®n browser, dar reÈ›ine cÄƒ este posibil sÄƒ nu poÈ›i folosi anumite pÄƒrÈ›i ale website-ul nostru à®n acest caz.</p>","your_privacy_title":"ConfidenÈ›ialitatea ta"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktivni","always_active":"Vedno aktivni","change_settings":"Spremeni moje nastavitve","find_out_more":"<p>Za veÄ informacij si prosim oglejte naÅ¡ <a href=\'%s\' target=\'_blank\'>Pravilnik o piÅ¡kotkih</a>.</p>","i_agree_text":"Se strinjam","inactive":"Neaktivni","ok_text":"V redu","text":"PiÅ¡kotke in druge sledilne tehnologije uporabljamo za izboljÅ¡anje vaÅ¡e uporabniÅ¡ke izkuÅ¡nje med brskanjem po naÅ¡i spletni strani, za  prikazovanje personaliziranih vsebin oz. targetiranih oglasov, za analizo obiskov naÅ¡e spletne strani in za vpogled v to, iz kje prihajajo naÅ¡i gostje. Z brskanjem po naÅ¡i spletni strani soglaÅ¡ate z naÅ¡o rabo piÅ¡kotkov in drugih sledilnih tehnologij.<br/>","title":"Uporabljamo piÅ¡kotke"},"level_functionality":{"content":"<p>Ti piÅ¡kotki se uporabljajo za zagotavljanje bolj personalizirane izkuÅ¡nje na naÅ¡i spletni strani in za shranjevanje vaÅ¡ih odloÄitev ob uporabi naÅ¡e spletne strani.</p><p>Funkcionalne piÅ¡kotke lahko, na primer, uporabljamo za to, da si zapomnimo vaÅ¡e jezikovne nastavitve oz. podatke za vpis v vaÅ¡ raÄun.</p>","title":"Funkcionalni piÅ¡kotki (ang. functionality cookies)"},"level_strictly_necessary":{"content":"<p>Ti piÅ¡kotki so kljuÄnega pomena pri zagotavljanju storitev, ki so na voljo na naÅ¡i spletni strani, in pri omogoÄanju doloÄenih funkcionalnosti naÅ¡e spletne strani.</p><p>Brez teh piÅ¡kotkov vam ne moremo zagotoviti doloÄenih storitev na naÅ¡i spletni strani.</p>","title":"Nujno potrebni piÅ¡kotki (ang. strictly necessary cookies)"},"level_targeting":{"content":"<p>Ti piÅ¡kotki se uporabljajo za prikazovanje spletnih oglasov, ki vas bodo na podlagi vaÅ¡ih navad pri brskanju verjetno zanimali.</p><p>Ti piÅ¡kotki, ki jih uporabljajo naÅ¡i oglaÅ¡evalski ponudniki oz. ponudniki vsebine, lahko zdruÅ¾ujejo podatke, ki so jih zbrali na naÅ¡i spletni strani, z drugimi podatki, ki so jih zbrali neodvisno v povezavi z dejavnostmi vaÅ¡ega spletnega brskalnika na njihovi mreÅ¾i spletnih mest.</p><p>ÄŒe se odloÄite izbrisati oz. onemogoÄiti te ciljne in oglaÅ¡evalske piÅ¡kotke, boste Å¡e vedno videvali oglase, vendar ti morda ne bodo relevantni za vas.</p>","title":"Ciljni in oglaÅ¡evalski piÅ¡kotki (ang. targeting and advertising cookies)"},"level_tracking":{"content":"<p>Ti piÅ¡kotki se uporabljajo za zbiranje podatkov za analizo obiskov naÅ¡e spletne strani in vpogled v to, kako gostje uporabljajo naÅ¡o spletno stran.</p><p>Ti piÅ¡kotki lahko, na primer, spremljajo stvari kot so to, koliko Äasa preÅ¾ivite na naÅ¡i spletni strani oz. katere strani obiÅ¡Äete, kar nam pomaga pri razumevanju, kako lahko za vas izboljÅ¡amo spletno stran.</p><p>Podatki, ki jih zbirajo ti piÅ¡kotki, ne identificirajo nobenega posameznega uporabnika.</p>","title":"Sledilni in izvedbeni piÅ¡kotki (ang. tracking and performance cookies)"},"preference_center":{"save":"Shrani moje nastavitve","title":"Nastavitve piÅ¡kotkov"},"preference_center_menu_and_content":{"more_information_content":"<h1>VeÄ informacij</h1><p>ÄŒe imate kakrÅ¡nakoli vpraÅ¡anja v zvezi z naÅ¡im pravilnikom o piÅ¡kotkih in vaÅ¡ih izbirah, nas prosim kontaktirajte.</p>","more_information_title":"VeÄ informacij","your_privacy_content":"<h1>Cenimo vaÅ¡o zasebnost</h1>\\n<p>PiÅ¡kotki so majhne besedilne datoteke, ki se shranijo na vaÅ¡o napravo ob obisku spletne strani. PiÅ¡kotke uporabljamo v veÄ namenov, predvsem pa za izboljÅ¡anje vaÅ¡e spletne izkuÅ¡nje na naÅ¡i strani (na primer za shranjevanje podatkov ob vpisu v vaÅ¡ raÄun).</p><p>VaÅ¡e nastavitve lahko spremenite in onemogoÄite doloÄenim vrstam piÅ¡kotkov, da bi se shranili na vaÅ¡o napravo med brskanjem po naÅ¡i spletni strani. Poleg tega lahko odstranite katerekoli piÅ¡kotke, ki so Å¾e shranjeni v vaÅ¡i napravi, a upoÅ¡tevajte, da vam bo po izbrisu piÅ¡kotkov morda onemogoÄeno uporabljati dele naÅ¡e spletne strani.</p>","your_privacy_title":"VaÅ¡a zasebnost"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktywne","always_active":"Zawsze aktywne","change_settings":"Zmiana ustawieÅ„","find_out_more":"<p>Aby dowiedzieÄ‡ siÄ™ wiÄ™cej, odwiedÅº naszÄ… <a href=\'%s\' target=\'_blank\'>PolitykÄ™ Cookie (PrywatnoÅ›ci)</a>.</p>","i_agree_text":"Zgoda","inactive":"Nieaktywne","ok_text":"OK","text":"UÅ¼ywamy plikà³w cookie i innych technologii Å›ledzenia, aby poprawiÄ‡ jakoÅ›Ä‡ przeglÄ…dania naszej witryny, wyÅ›wietlaÄ‡ spersonalizowane treÅ›ci i reklamy, analizowaÄ‡ ruch w naszej witrynie i wiedzieÄ‡, skÄ…d pochodzÄ… nasi uÅ¼ytkownicy. PrzeglÄ…dajÄ…c naszÄ… stronÄ™, wyraÅ¼asz zgodÄ™ na uÅ¼ywanie przez nas plikà³w cookie i innych technologii Å›ledzenia.<br/>","title":"UÅ¼ywamy pliki cookie"},"level_functionality":{"content":"<p>Te pliki cookie sÅ‚uÅ¼Ä… do bardziej spersonalizowanego korzystania z naszej strony internetowej i do zapamiÄ™tywania wyborà³w dokonywanych podczas korzystania z naszej strony internetowej.</p><p>Na przykÅ‚ad moÅ¼emy uÅ¼ywaÄ‡ funkcjonalnych plikà³w cookie do zapamiÄ™tywania preferencji jÄ™zykowych lub zapamiÄ™tywania danych logowania.</p>","title":"Funkcjonalne"},"level_strictly_necessary":{"content":"<p>Te pliki cookie sÄ… niezbÄ™dne do Å›wiadczenia usÅ‚ug dostÄ™pnych za poÅ›rednictwem naszej strony internetowej i umoÅ¼liwienia korzystania z niektà³rych funkcji naszej strony internetowej.</p><p>Bez tych plikà³w cookie nie moÅ¼emy zapewniÄ‡ usÅ‚ug na naszej stronie internetowej.</p>","title":"NiezbÄ™dne"},"level_targeting":{"content":"<p>Te pliki cookie sÅ‚uÅ¼Ä… do wyÅ›wietlania reklam, ktà³re mogÄ… CiÄ™ zainteresowaÄ‡ na podstawie Twoich zwyczajà³w przeglÄ…dania.</p><p>Pliki te tworzone przez naszych dostawcà³w treÅ›ci i/lub reklam, mogÄ… Å‚Ä…czyÄ‡ informacje zebrane z naszej strony z innymi informacjami, ktà³re gromadzili niezaleÅ¼nie w zwiÄ…zku z dziaÅ‚aniami przeglÄ…darki internetowej w ich sieci witryn.</p><p>JeÅ›li zdecydujesz siÄ™ usunÄ…Ä‡ lub wyÅ‚Ä…czyÄ‡ te pliki cookie, reklamy nadal bÄ™dÄ… wyÅ›wietlane, ale mogÄ… one nie byÄ‡ odpowiednie dla Ciebie.</p>","title":"Targeting i reklama"},"level_tracking":{"content":"<p>Te pliki cookie sÅ‚uÅ¼Ä… do zbierania informacji w celu analizy ruchu na naszej stronie internetowej i sposobu, w jaki uÅ¼ytkownicy korzystajÄ… z naszej strony internetowej.</p><p>Na przykÅ‚ad te pliki cookie mogÄ… Å›ledziÄ‡ takie rzeczy, jak czas spÄ™dzony na stronie lub odwiedzane strony, co pomaga nam zrozumieÄ‡, w jaki sposà³b moÅ¼emy ulepszyÄ‡ naszÄ… witrynÄ™ internetowÄ….</p><p>Informacje zebrane przez te pliki nie identyfikujÄ… Å¼adnego konkretnego uÅ¼ytkownika.</p>","title":"Åšledzenie i wydajnoÅ›Ä‡"},"preference_center":{"save":"Zapisz ustawienia","title":"Centrum ustawieÅ„ cookie"},"preference_center_menu_and_content":{"more_information_content":"<h1>WiÄ™cej informacji</h1><p>W przypadku jakichkolwiek pytaÅ„ dotyczÄ…cych naszej polityki dotyczÄ…cej plikà³w cookie i Twoich wyborà³w, skontaktuj siÄ™ z nami.</p>","more_information_title":"WiÄ™cej informacji","your_privacy_content":"<h1>Twoja prywatnoÅ›Ä‡ jest dla nas waÅ¼na.</h1>\\n<p>Pliki cookie to bardzo maÅ‚e pliki tekstowe, ktà³re sÄ… tworzone i przechowywane na komputerze uÅ¼ytkownika podczas odwiedzania strony internetowej. UÅ¼ywamy plikà³w cookie do rà³Å¼nych celà³w, w tym do ulepszania obsÅ‚ugi online na naszej stronie internetowej (na przykÅ‚ad, aby zapamiÄ™taÄ‡ dane logowania do konta).</p><p>MoÅ¼esz zmieniÄ‡ swoje ustawienia i odrzuciÄ‡ niektà³re rodzaje plikà³w cookie, ktà³re majÄ… byÄ‡ przechowywane na twoim komputerze podczas przeglÄ…dania naszej strony. MoÅ¼esz rà³wnieÅ¼ usunÄ…Ä‡ wszystkie pliki cookie juÅ¼ zapisane na komputerze, ale pamiÄ™taj, Å¼e usuniÄ™cie plikà³w cookie moÅ¼e uniemoÅ¼liwiÄ‡ korzystanie z czÄ™Å›ci naszej strony internetowej.</p>","your_privacy_title":"Twoja prywatnoÅ›Ä‡"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Aktivno","always_active":"Uvek aktivno","change_settings":"Promeni moja podeÅ¡avanja","find_out_more":"<p>Da saznate viÅ¡e, pogledajte naÅ¡u <a href=\'%s\' target=\'_blank\'>Politiku o KolaÄiÄ‡ima</a>.</p>","i_agree_text":"SlaÅ¾em se","inactive":"Neaktivno","ok_text":"OK","text":"Mi koristimo kolaÄiÄ‡e i ostale  tehnologije za praÄ‡enje kako bi unapredili vaÅ¡u pretragu na naÅ¡em veb sajtu, kako bi vam prikazali personalizovani sadrÅ¾aj i ciljane reklame, analizirali posete na naÅ¡em sajtu i razumeli odakle naÅ¡i posetioci sajta dolaze. Pregledanjem naÅ¡eg sajta, pristajete na koriÅ¡Ä‡enje kolaÄiÄ‡ i drugih tehnologija praÄ‡enja.<br/>","title":"Mi koristimo kolaÄiÄ‡e"},"level_functionality":{"content":"<p>Ovi kukiji koriste se za pruÅ¾anje personalizovanijeg iskustva na naÅ¡em veb sajtu i za pamÄ‡enje izbora koje koristite kada koristite naÅ¡u veb sajt.</p><p>Na primer, moÅ¾emo da koristimo kukije funkcionalnosti da bismo zapamtili vaÅ¡e jeziÄke postavke ili upamtili vaÅ¡e podatke za prijavu.</p>","title":"Funkcionalni kukiji"},"level_strictly_necessary":{"content":"<p>Ovi kukiji su neophodni za pruÅ¾anje usluga dostupnih putem naÅ¡eg veb sajta i za omoguÄ‡avanje koriÅ¡Ä‡enja odreÄ‘enih funkcija naÅ¡eg veb sajta.</p><p>Bez ovih kolaÄiÄ‡a ne moÅ¾emo vam pruÅ¾iti odreÄ‘ene usluge na naÅ¡em veb sajtu.</p>","title":"Obavezni kukiji"},"level_targeting":{"content":"<p>Ovi kukiji koriste se za prikazivanje reklama koje Ä‡e vas verovatno zanimati na osnovu vaÅ¡ih navika pregledavanja.</p><p>Ovi kukiji, opsluÅ¾eni od strane naÅ¡ih dobavljaÄa sadrÅ¾aja i / ili oglaÅ¡avanja, mogu kombinovati informacije koje su sakupili sa naÅ¡eg veb sajta sa drugim informacijama koje su nezavisno prikupili u vezi sa aktivnostima vaÅ¡eg veb pretraÅ¾ivaÄa kroz mreÅ¾u njihovih veb sajtova.</p><p>Ako odluÄite da uklonite ili onemoguÄ‡ite ove ciljane ili reklamne kukije i dalje Ä‡ete videti oglase, ali oni moÅ¾da neÄ‡e biti relevantni za vas.</p>","title":"Ciljanje i oglaÅ¡avanje kolaÄiÄ‡"},"level_tracking":{"content":"<p>Ovi kukiji koriste se za prikupljanje informacija za analizu saobraÄ‡aja na naÅ¡em veb sajtu i kako posetioci koriste naÅ¡ veb sajt.</p><p>Na primer, ovi kolaÄiÄ‡i mogu pratiti stvari poput vremena koliko provodite na veb lokaciji ili stranicama koje poseÄ‡ujete Å¡to nam pomaÅ¾e da shvatimo kako moÅ¾emo da poboljÅ¡amo naÅ¡ veb sajt.</p><p>Informacije prikupljene ovim kukijima za praÄ‡enje i performanse ne identifikuju nijednog pojedinaÄnog posetioca.</p>","title":"PraÄ‡enje i performanse kolaÄiÄ‡"},"preference_center":{"save":"SaÄuvaj moja podeÅ¡avanja","title":"Centar za podeÅ¡avanje kolaÄiÄ‡"},"preference_center_menu_and_content":{"more_information_content":"<h1>ViÅ¡e informacija</h1><p>Za bilo koje upite vezane za naÅ¡u politiku o kukijima i vaÅ¡im izbor, molimo vas kontaktirajte nas.</p>","more_information_title":"ViÅ¡e informacija","your_privacy_content":"<h1>VaÅ¡a privatnost je vaÅ¾na za nas</h1>\\n<p>Kukiji su veoma mali tekstualni fajlovi koji su saÄuvani na vaÅ¡em raÄunaru kada poseÄ‡ujete veb sajt. Mi koristimo kolaÄiÄ‡e za razliÄite namene i kako bi unapredili vaÅ¡e onlajn iskustvo na naÅ¡em veb sajtu (na primer, kako bi zapamtili vaÅ¡e pristupne podatke).</p><p>Vi moÅ¾ete promeniti vaÅ¡a podeÅ¡avanja i odbiti odreÄ‘enu vrstu kolaÄiÄ‡a koji Ä‡e biti saÄuvani na vaÅ¡em raÄunaru dok pregledate naÅ¡ veb sajt. TakoÄ‘e moÅ¾ete izbisati bilo koji kuki koji je veÄ‡ saÄuvan u vaÅ¡em raÄunaru, ali imajte na umu da brisanjem kolaÄiÄ‡ moÅ¾ete onemoguÄ‡iti pristup nekim delovima naÅ¡eg veb sajta.</p>","your_privacy_title":"VaÅ¡a privatnost"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Ð’ Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ ÑÐ° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸Ñ‚Ðµ","always_active":"Ð’Ð¸Ð½Ð°Ð³Ð¸ Ð² Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ ÑÐ° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸Ñ‚Ðµ","change_settings":"ÐŸÑ€Ð¾Ð¼ÑÐ½Ð° Ð½Ð° Ð¿Ñ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸ÑÑ‚Ð° Ð¼Ð¸","find_out_more":"<p>Ð—Ð° Ð´Ð° Ð½Ð°ÑƒÑ‡Ð¸Ñ‚Ðµ Ð¿Ð¾Ð²ÐµÑ‡Ðµ, Ð¼Ð¾Ð»Ñ, Ð¿Ð¾ÑÐµÑ‚ÐµÑ‚Ðµ Ð½Ð°ÑˆÐ°Ñ‚Ð° <a href=\'%s\' target=\'_blank\'>ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÐŸÐ¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° Ð·Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸</a>.</p>","i_agree_text":"Ð¡ÑŠÐ³Ð»Ð°ÑÐµÐ½ ÑÑŠÐ¼","inactive":"ÐÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸","ok_text":"Ð”Ð¾Ð±Ñ€Ðµ","text":"ÐÐ¸Ðµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð¼Ðµ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸, Ð¿Ñ€Ð¾ÑÐ»ÐµÐ´ÑÐ²Ð°Ñ‰Ð¸, Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸Ð¸, Ð·Ð° Ð´Ð° Ð¿Ð¾Ð´Ð¾Ð±Ñ€Ð¸Ð¼ ÑÑŠÑ€Ñ„Ð¸Ñ€Ð°Ð½ÐµÑ‚Ð¾ Ð²Ð¸ Ð² Ð½Ð°ÑˆÐ¸Ñ ÑÐ°Ð¹Ñ‚, ÐºÐ°Ñ‚Ð¾ Ð²Ð¸ Ð¿Ð¾ÐºÐ°Ð¶ÐµÐ¼ Ð¿ÐµÑ€ÑÐ¾Ð½Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð°Ð½Ð¾ ÑÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸Ðµ Ð¸ Ñ€ÐµÐºÐ»Ð°Ð¼Ð¸, Ð´Ð° Ð°Ð½Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð°Ð¼Ðµ Ñ‚Ñ€Ð°Ñ„Ð¸ÐºÐ° Ð½Ð° Ð½Ð°ÑˆÐ¸Ñ ÑÐ°Ð¹Ñ‚ Ð¸ Ð´Ð° Ñ€Ð°Ð·Ð±ÐµÑ€ÐµÐ¼ Ð¾Ñ‚ÐºÑŠÐ´Ðµ Ð¸Ð´Ð²Ð°Ñ‚ Ð½Ð°ÑˆÐ¸Ñ‚Ðµ Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»Ð¸. Ð Ð°Ð·Ð³Ð»ÐµÐ¶Ð´Ð°Ð¹ÐºÐ¸ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚, Ð²Ð¸Ðµ ÑÐµ ÑÑŠÐ³Ð»Ð°ÑÑÐ²Ð°Ñ‚Ðµ Ñ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½ÐµÑ‚Ð¾ Ð½Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸ Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸Ð¸ Ð·Ð° Ð¿Ñ€Ð¾ÑÐ»ÐµÐ´ÑÐ²Ð°Ð½Ðµ.<br/>","title":"ÐÐ¸Ðµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð¼Ðµ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸"},"level_functionality":{"content":"<p>Ð¢ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ ÑÐµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ‚, Ð·Ð° Ð´Ð° Ð²Ð¸ Ð¾ÑÐ¸Ð³ÑƒÑ€ÑÑ‚ Ð¾Ñ‰Ðµ Ð¿Ð¾-Ð¿ÐµÑ€ÑÐ¾Ð½Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð°Ð½Ð¾ Ð¸Ð·Ð¶Ð¸Ð²ÑÐ²Ð°Ð½Ðµ Ð½Ð° Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚ Ð¸ Ð´Ð° Ð±ÑŠÐ´Ð°Ñ‚ Ð·Ð°Ð¿Ð¾Ð¼Ð½ÐµÐ½Ð¸ Ð¸Ð·Ð±Ð¾Ñ€Ð¸Ñ‚Ðµ, ÐºÐ¾Ð¸Ñ‚Ð¾ ÑÑ‚Ðµ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð¸, ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ…Ñ‚Ðµ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚.</p><p>ÐÐ°Ð¿Ñ€Ð¸Ð¼ÐµÑ€: Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð¼Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»Ð½Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸, Ð·Ð° Ð´Ð° Ð·Ð°Ð¿Ð¾Ð¼Ð½Ð¸Ð¼ Ð¿Ñ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸Ñ Ð²Ð¸ ÐµÐ·Ð¸Ðº Ð¸Ð»Ð¸ Ð´Ð° Ð·Ð°Ð¿Ð¾Ð¼Ð½Ð¸Ð¼ Ð´ÐµÑ‚Ð°Ð¹Ð»Ð¸ Ð¿Ð¾ Ð²Ð»Ð¸Ð·Ð°Ð½ÐµÑ‚Ð¾ Ð²Ð¸ Ð² ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚Ð°.</p>","title":"Ð¤ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»Ð½Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸"},"level_strictly_necessary":{"content":"<p>Ð¢ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ ÑÐ° ÑÑŠÑ‰ÐµÑÑ‚Ð²ÐµÐ½ ÐµÐ»ÐµÐ¼ÐµÐ½Ñ‚, ÐºÐ¾Ð¹Ñ‚Ð¾ Ð¾ÑÐ¸Ð³ÑƒÑ€ÑÐ²Ð° ÑƒÑÐ»ÑƒÐ³Ð¸, Ð´Ð¾ÑÑ‚ÑŠÐ¿Ð½Ð¸ Ñ‡Ñ€ÐµÐ· Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚ Ð¸ Ð´Ð°Ð²Ð°Ñ‚ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ Ð·Ð° Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ Ð½Ð° Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚.</p><p>Ð‘ÐµÐ· Ñ‚ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÐ¼ Ð´Ð° Ð²Ð¸ Ð´Ð¾ÑÑ‚Ð°Ð²Ð¸Ð¼ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸ ÑƒÑÐ»ÑƒÐ³Ð¸ Ð½Ð° Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚.</p>","title":"Ð¡Ñ‚Ñ€Ð¾Ð³Ð¾ Ð·Ð°Ð´ÑŠÐ»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸"},"level_targeting":{"content":"<p>Ð¢ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ ÑÐµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ‚ Ð·Ð° Ð¿Ð¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ñ€ÐµÐºÐ»Ð°Ð¼Ð°, ÐºÐ¾ÑÑ‚Ð¾ Ð²ÐµÑ€Ð¾ÑÑ‚Ð½Ð¾ Ñ‰Ðµ Ð²Ð¸ Ð·Ð°Ð¸Ð½Ñ‚ÐµÑ€ÐµÑÐ¾Ð²Ð° Ð²ÑŠÐ· Ð¾ÑÐ½Ð¾Ð²Ð° Ð½Ð° Ð½Ð°Ð²Ð¸Ñ†Ð¸Ñ‚Ðµ Ð²Ð¸ Ð·Ð° ÑÑŠÑ€Ñ„Ð¸Ñ€Ð°Ð½Ðµ.</p><p>Ð¢ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸, Ð¾Ð±ÑÐ»ÑƒÐ¶Ð²Ð°Ð½Ð¸ Ð¾Ñ‚ Ð½Ð°ÑˆÐ¸Ñ‚Ðµ Ð´Ð¾ÑÑ‚Ð°Ð²Ñ‡Ð¸Ñ†Ð¸ Ð½Ð° ÑÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸Ðµ Ð¸ / Ð¸Ð»Ð¸ Ñ€ÐµÐºÐ»Ð°Ð¼Ð°, Ð¼Ð¾Ð³Ð°Ñ‚ Ð´Ð° ÐºÐ¾Ð¼Ð±Ð¸Ð½Ð¸Ñ€Ð°Ñ‚ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÑÑ‚Ð°, ÐºÐ¾ÑÑ‚Ð¾ ÑÐ° ÑÑŠÐ±Ñ€Ð°Ð»Ð¸ Ð¾Ñ‚ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚, Ñ Ð´Ñ€ÑƒÐ³Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ, ÐºÐ¾ÑÑ‚Ð¾ ÑÐ° ÑÑŠÐ±Ñ€Ð°Ð»Ð¸ Ð½ÐµÐ·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾, ÑÐ²ÑŠÑ€Ð·Ð°Ð½Ð° Ñ Ð´ÐµÐ¹Ð½Ð¾ÑÑ‚Ð¸Ñ‚Ðµ Ð½Ð° Ð²Ð°ÑˆÐ¸Ñ ÑƒÐµÐ± Ð±Ñ€Ð°ÑƒÐ·ÑŠÑ€ Ð² Ñ‚ÑÑ…Ð½Ð°Ñ‚Ð° Ð¼Ñ€ÐµÐ¶Ð° Ð¾Ñ‚ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚Ð¾Ð²Ðµ.</p><p>ÐÐºÐ¾ Ñ€ÐµÑˆÐ¸Ñ‚Ðµ Ð´Ð° Ð¿Ñ€ÐµÐ¼Ð°Ñ…Ð½ÐµÑ‚Ðµ Ð¸Ð»Ð¸ Ð´ÐµÐ°ÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð°Ñ‚Ðµ Ñ‚ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð·Ð° Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»ÑÐºÐ¸ Ð³Ñ€ÑƒÐ¿Ð¸ Ð¸Ð»Ð¸ Ñ€ÐµÐºÐ»Ð°Ð¼Ð°, Ð¿Ð°Ðº Ñ‰Ðµ Ð²Ð¸Ð´Ð¸Ñ‚Ðµ Ñ€ÐµÐºÐ»Ð°Ð¼Ð¸, Ð½Ð¾ Ñ‚Ðµ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð½Ðµ ÑÐ° Ð¾Ñ‚ Ð¿Ð¾Ð´Ñ…Ð¾Ð´ÑÑ‰Ð¸ Ð·Ð° Ð²Ð°Ñ.</p>","title":"ÐÐ°ÑÐ¾Ñ‡Ð²Ð°Ð½Ðµ Ð¸ Ñ€ÐµÐºÐ»Ð°Ð¼Ð½Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸"},"level_tracking":{"content":"<p>Ð¢ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ ÑÐµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ‚ Ð·Ð° ÑÑŠÐ±Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð·Ð° Ð°Ð½Ð°Ð»Ð¸Ð· Ð½Ð° Ñ‚Ñ€Ð°Ñ„Ð¸ÐºÐ° ÐºÑŠÐ¼ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚ Ð¸ ÐºÐ°Ðº Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»Ð¸Ñ‚Ðµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ‚ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚.</p><p>ÐÐ°Ð¿Ñ€Ð¸Ð¼ÐµÑ€, Ñ‚ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð¼Ð¾Ð³Ð°Ñ‚ Ð´Ð° Ð¿Ñ€Ð¾ÑÐ»ÐµÐ´ÑÐ²Ð°Ñ‚ Ð½ÐµÑ‰Ð° ÐºÐ°Ñ‚Ð¾ ÐºÐ¾Ð»ÐºÐ¾ Ð²Ñ€ÐµÐ¼Ðµ Ð¿Ñ€ÐµÐºÐ°Ñ€Ð²Ð°Ñ‚Ðµ Ð½Ð° ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚Ð° Ð¸Ð»Ð¸ Ð½Ð° Ð¿Ð¾ÑÐµÑ‰Ð°Ð²Ð°Ð½Ð¸Ñ‚Ðµ Ð¾Ñ‚ Ð²Ð°Ñ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸, ÐºÐ¾ÐµÑ‚Ð¾ Ð½Ð¸ Ð¿Ð¾Ð¼Ð°Ð³Ð° Ð´Ð° Ñ€Ð°Ð·Ð±ÐµÑ€ÐµÐ¼ ÐºÐ°Ðº Ð¼Ð¾Ð¶ÐµÐ¼ Ð´Ð° Ð¿Ð¾Ð´Ð¾Ð±Ñ€Ð¸Ð¼ Ð½Ð°ÑˆÐ¸Ñ ÑÐ°Ð¹Ñ‚ Ð·Ð° Ð²Ð°Ñ.</p><p>Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÑÑ‚Ð°, ÑÑŠÐ±Ñ€Ð°Ð½Ð° Ñ‡Ñ€ÐµÐ· Ñ‚ÐµÐ·Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð·Ð° Ð¿Ñ€Ð¾ÑÐ»ÐµÐ´ÑÐ²Ð°Ð½Ðµ Ð¸ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ð½Ð¾ÑÑ‚, Ð½Ðµ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸Ñ†Ð¸Ñ€Ð° Ð²ÑÐµÐºÐ¸ Ð¾Ñ‚Ð´ÐµÐ»ÐµÐ½ Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ».</p>","title":"Ð‘Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð·Ð° Ð¿Ñ€Ð¾ÑÐ»ÐµÐ´ÑÐ²Ð°Ð½Ðµ Ð¸ Ð·Ð° Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ð½Ð¾ÑÑ‚"},"preference_center":{"save":"Ð—Ð°Ð¿Ð°Ð·Ð¸ Ð¿Ñ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸ÑÑ‚Ð° Ð¼Ð¸","title":"Ð¦ÐµÐ½Ñ‚ÑŠÑ€ Ð·Ð° Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ð½Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸"},"preference_center_menu_and_content":{"more_information_content":"<h1>ÐžÑ‰Ðµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ</h1><p>Ð—Ð° Ð²ÑÑÐºÐ°ÐºÐ²Ð¸ Ð²ÑŠÐ¿Ñ€Ð¾ÑÐ¸ Ð²ÑŠÐ² Ð²Ñ€ÑŠÐ·ÐºÐ° Ñ Ð½Ð°ÑˆÐ°Ñ‚Ð° Ð¿Ð¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° Ð·Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸Ñ‚Ðµ Ð¸ Ð²Ð°ÑˆÐ¸Ñ‚Ðµ Ð¸Ð·Ð±Ð¾Ñ€Ð¸, Ð¼Ð¾Ð»Ñ, ÑÐ²ÑŠÑ€Ð¶ÐµÑ‚Ðµ ÑÐµ Ñ Ð½Ð°Ñ.</p>","more_information_title":"ÐžÑ‰Ðµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ","your_privacy_content":"<h1>Ð’Ð°ÑˆÐ°Ñ‚Ð° Ð¿Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÐµÐ»Ð½Ð¾ÑÑ‚ Ðµ Ð²Ð°Ð¶Ð½Ð° Ð·Ð° Ð½Ð°Ñ</h1>\\n<p>Ð‘Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸Ñ‚Ðµ ÑÐ° Ð¼Ð½Ð¾Ð³Ð¾ Ð¼Ð°Ð»ÐºÐ¸ Ñ‚ÐµÐºÑÑ‚Ð¾Ð²Ð¸ Ñ„Ð°Ð¹Ð»Ð¾Ð²Ðµ, ÐºÐ¾Ð¸Ñ‚Ð¾ ÑÐµ ÑÑŠÑ…Ñ€Ð°Ð½ÑÐ²Ð°Ñ‚ Ð½Ð° Ð²Ð°ÑˆÐ¸Ñ ÐºÐ¾Ð¼Ð¿ÑŽÑ‚ÑŠÑ€, ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚Ðµ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚. ÐÐ¸Ðµ Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð¼Ðµ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð·Ð° Ð¼Ð½Ð¾Ð¶ÐµÑÑ‚Ð²Ð¾ Ð¾Ñ‚ Ñ†ÐµÐ»Ð¸ Ð¸ Ð´Ð° Ð¿Ð¾Ð´Ð¾Ð±Ñ€Ð¸Ð¼ ÑÑŠÑ€Ñ„Ð¸Ñ€Ð°Ð½ÐµÑ‚Ð¾ Ð²Ð¸ Ð¸Ð· Ð½Ð°ÑˆÐ¸Ñ ÑÐ°Ð¹Ñ‚ (Ð½Ð°Ð¿Ñ€Ð¸Ð¼ÐµÑ€: Ð·Ð° Ð´Ð° Ð·Ð°Ð¿Ð¾Ð¼Ð½Ð¸Ð¼ Ð´ÐµÑ‚Ð°Ð¹Ð»Ð¸Ñ‚Ðµ Ð½Ð° Ð²Ð°ÑˆÐ¸Ñ Ð°ÐºÐ°ÑƒÐ½Ñ‚ Ð·Ð° Ð²Ð»Ð¸Ð·Ð°Ð½Ðµ).</p><p>ÐœÐ¾Ð¶ÐµÑ‚Ðµ Ð´Ð° Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸Ñ‚Ðµ Ð¿Ñ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸ÑÑ‚Ð° ÑÐ¸ Ð¸ Ð´Ð° Ð¾Ñ‚ÐºÐ°Ð¶ÐµÑ‚Ðµ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸ Ð²Ð¸Ð´Ð¾Ð²Ðµ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸, ÐºÐ¾Ð¸Ñ‚Ð¾ Ð´Ð° ÑÐµ ÑÑŠÑ…Ñ€Ð°Ð½ÑÐ²Ð°Ñ‚ Ð½Ð° Ð²Ð°ÑˆÐ¸Ñ ÐºÐ¾Ð¼Ð¿ÑŽÑ‚ÑŠÑ€, Ð´Ð¾ÐºÐ°Ñ‚Ð¾ ÑÑŠÑ€Ñ„Ð¸Ñ€Ð°Ñ‚Ðµ Ð² Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚. ÐœÐ¾Ð¶ÐµÑ‚Ðµ ÑÑŠÑ‰Ð¾ Ð´Ð° Ð¿Ñ€ÐµÐ¼Ð°Ñ…Ð½ÐµÑ‚Ðµ Ð½ÑÐºÐ¾Ð¸ Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸, ÐºÐ¾Ð¸Ñ‚Ð¾ Ð²ÐµÑ‡Ðµ ÑÐ° Ð·Ð°Ð¿Ð°Ð·ÐµÐ½Ð¸ Ð½Ð° Ð²Ð°ÑˆÐ¸Ñ ÐºÐ¾Ð¼Ð¿ÑŽÑ‚ÑŠÑ€, Ð½Ð¾ Ð¸Ð¼Ð°Ð¹Ñ‚Ðµ Ð¿Ñ€ÐµÐ´Ð²Ð¸Ð´, Ñ‡Ðµ Ð¸Ð·Ñ‚Ñ€Ð¸Ð²Ð°Ð½ÐµÑ‚Ð¾ Ð½Ð° Ð±Ð¸ÑÐºÐ²Ð¸Ñ‚ÐºÐ¸ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð²Ð¸ Ð¿Ð¾Ð¿Ñ€ÐµÑ‡Ð¸ Ð´Ð° Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ñ‚Ðµ Ñ‡Ð°ÑÑ‚Ð¸ Ð¾Ñ‚ Ð½Ð°ÑˆÐ¸Ñ ÑƒÐµÐ±ÑÐ°Ð¹Ñ‚.</p>","your_privacy_title":"Ð’Ð°ÑˆÐ°Ñ‚Ð° Ð¿Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÐµÐ»Ð½Ð¾ÑÑ‚"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Î•Î½ÎµÏÎ³ÏŒ","always_active":"Î Î¬Î½Ï„Î± ÎµÎ½ÎµÏÎ³ÏŒ","change_settings":"Î‘Î»Î»Î±Î³Î® Ï„Ï‰Î½ Ï€ÏÎ¿Ï„Î¹Î¼Î®ÏƒÎµÏŽÎ½ Î¼Î¿Ï…","find_out_more":"<p>Î“Î¹Î± Î½Î± Î¼Î¬Î¸ÎµÏ„Îµ Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎ±, Ï€Î±ÏÎ±ÎºÎ±Î»Î¿ÏÎ¼Îµ ÎµÏ€Î¹ÏƒÎºÎµÏ†Î¸ÎµÎ¯Ï„Îµ Ï„Î·Î½ ÏƒÎµÎ»Î¯Î´Î± Ï€ÎµÏÎ¯ <a href=\'%s\' target=\'_blank\'>Ï€Î¿Î»Î¹Ï„Î¹ÎºÎ®Ï‚ cookies</a>.</p>","i_agree_text":"Î£Ï…Î¼Ï†Ï‰Î½ÏŽ","inactive":"Î‘Î½ÎµÎ½ÎµÏÎ³ÏŒ","ok_text":"OK","text":"Î§ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ¼Îµ cookies ÎºÎ±Î¹ Î¬Î»Î»ÎµÏ‚ Ï„ÎµÏ‡Î½Î¿Î»Î¿Î³Î¯ÎµÏ‚ ÎµÎ½Ï„Î¿Ï€Î¹ÏƒÎ¼Î¿Ï Î³Î¹Î± Ï„Î·Î½ Î²ÎµÎ»Ï„Î¯Ï‰ÏƒÎ· Ï„Î·Ï‚ ÎµÎ¼Ï€ÎµÎ¹ÏÎ¯Î±Ï‚ Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ·Ï‚ ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚, Î³Î¹Î± Ï„Î·Î½ ÎµÎ¾Î±Ï„Î¿Î¼Î¯ÎºÎµÏ…ÏƒÎ· Ï€ÎµÏÎ¹ÎµÏ‡Î¿Î¼Î­Î½Î¿Ï… ÎºÎ±Î¹ Î´Î¹Î±Ï†Î·Î¼Î¯ÏƒÎµÏ‰Î½, Ï„Î·Î½ Ï€Î±ÏÎ¿Ï‡Î® Î»ÎµÎ¹Ï„Î¿Ï…ÏÎ³Î¹ÏŽÎ½ ÎºÎ¿Î¹Î½Ï‰Î½Î¹ÎºÏŽÎ½ Î¼Î­ÏƒÏ‰Î½ ÎºÎ±Î¹ Ï„Î·Î½ Î±Î½Î¬Î»Ï…ÏƒÎ· Ï„Î·Ï‚ ÎµÏ€Î¹ÏƒÎºÎµÏˆÎ¹Î¼ÏŒÏ„Î·Ï„Î¬Ï‚ Î¼Î±Ï‚. Î‘Î½ ÏƒÏ…Î½ÎµÏ‡Î¯ÏƒÎµÏ„Îµ Î½Î± Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹ÎµÎ¯Ï„Îµ Ï„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚, ÏƒÏ…Î½Î±Î¹Î½ÎµÎ¯Ï„Îµ ÏƒÏ„Î· Ï‡ÏÎ®ÏƒÎ· Ï„Ï‰Î½ cookies Î¼Î±Ï‚.<br/>","title":"Î‘Ï…Ï„Î® Î· Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹ÎµÎ¯ cookies"},"level_functionality":{"content":"<p>Î‘Ï…Ï„Î¬ Ï„Î± cookies Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ½Ï„Î±Î¹ Î³Î¹Î± Î½Î± ÏƒÎ±Ï‚ Ï€Î±ÏÎ­Ï‡Î¿Ï…Î½ Î¼Î¯Î± Ï€Î¹Î¿ Ï€ÏÎ¿ÏƒÏ‰Ï€Î¿Ï€Î¿Î¹Î·Î¼Î­Î½Î· ÎµÎ¼Ï€ÎµÎ¹ÏÎ¯Î± ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚ ÎºÎ±Î¹ Î³Î¹Î± Î½Î± Î¸Ï…Î¼Î¿ÏÎ½Ï„Î±Î¹ ÎµÏ€Î¹Î»Î¿Î³Î­Ï‚ Ï€Î¿Ï… ÎºÎ¬Î½ÎµÏ„Îµ ÏŒÏ„Î±Î½ Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹ÎµÎ¯Ï„Îµ Ï„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚.</p><p>Î“Î¹Î± Ï€Î±ÏÎ¬Î´ÎµÎ¹Î³Î¼Î±, Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î®ÏƒÎ¿Ï…Î¼Îµ cookies Î»ÎµÎ¹Ï„Î¿Ï…ÏÎ³Î¹ÎºÏŒÏ„Î·Ï„Î±Ï‚ Î³Î¹Î± Î½Î± Î¸Ï…Î¼ÏŒÎ¼Î±ÏƒÏ„Îµ Ï„Î·Î½ ÎµÏ€Î¹Î»Î¿Î³Î® Î³Î»ÏŽÏƒÏƒÎ±Ï‚ Î® Ï„Î± ÏƒÏ„Î¿Î¹Ï‡ÎµÎ¯Î± ÎµÎ¹ÏƒÏŒÎ´Î¿Ï… ÏƒÎ±Ï‚.</p>","title":"Cookies Î›ÎµÎ¹Ï„Î¿Ï…ÏÎ³Î¹ÎºÏŒÏ„Î·Ï„Î±Ï‚"},"level_strictly_necessary":{"content":"<p>Î¤Î± Î±Ï€Î±ÏÎ±Î¯Ï„Î·Ï„Î± cookies Î²Î¿Î·Î¸Î¿ÏÎ½ ÏƒÏ„Î¿ Î½Î± Î³Î¯Î½ÎµÎ¹ Ï‡ÏÎ·ÏƒÏ„Î¹ÎºÎ® Î¼Î¯Î± Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±, ÎµÏ€Î¹Ï„ÏÎ­Ï€Î¿Î½Ï„Î±Ï‚ Î²Î±ÏƒÎ¹ÎºÎ­Ï‚ Î»ÎµÎ¹Ï„Î¿Ï…ÏÎ³Î¯ÎµÏ‚ ÏŒÏ€Ï‰Ï‚ Ï„Î·Î½ Ï€Î»Î¿Î®Î³Î·ÏƒÎ· ÎºÎ±Î¹ Ï„Î·Î½ Ï€ÏÏŒÏƒÎ²Î±ÏƒÎ· ÏƒÎµ Î±ÏƒÏ†Î±Î»ÎµÎ¯Ï‚ Ï€ÎµÏÎ¹Î¿Ï‡Î­Ï‚ Ï„Î·Ï‚ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±Ï‚.</p><p>Î— Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î´ÎµÎ½ Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Î»ÎµÎ¹Ï„Î¿Ï…ÏÎ³Î®ÏƒÎµÎ¹ ÏƒÏ‰ÏƒÏ„Î¬ Ï‡Ï‰ÏÎ¯Ï‚ Î±Ï…Ï„Î¬ Ï„Î± cookies.</p>","title":"Î†ÎºÏÏ‰Ï‚ Î±Ï€Î±ÏÎ±Î¯Ï„Î·Ï„Î± cookies"},"level_targeting":{"content":"<p>Î‘Ï…Ï„Î¬ Ï„Î± cookies Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ½Ï„Î±Î¹ Î³Î¹Î± Î½Î± Î´ÎµÎ¯Ï‡Î½Î¿Ï…Î½ Î´Î¹Î±Ï†Î·Î¼Î¯ÏƒÎµÎ¹Ï‚ Ï€Î¿Ï… Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± ÏƒÎ±Ï‚ ÎµÎ½Î´Î¹Î±Ï†Î­ÏÎ¿Ï…Î½ Î¼Îµ Î²Î¬ÏƒÎ· Ï„Î¹Ï‚ ÏƒÏ…Î½Î®Î¸ÎµÎ¹ÎµÏ‚ Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ®Ï‚ ÏƒÎ±Ï‚ ÏƒÏ„Î¿ Î”Î¹Î±Î´Î¯ÎºÏ„Ï…Î¿.</p><p>Î‘Ï…Ï„Î¬ Ï„Î± cookies, Ï€Î±ÏÎ­Ï‡Î¿Î½Ï„Î±Î¹ Î±Ï€ÏŒ Ï„Î¿Ï…Ï‚ Ï€Î±ÏÏŒÏ‡Î¿Ï…Ï‚ Ï€ÎµÏÎ¹ÎµÏ‡Î¿Î¼Î­Î½Î¿Ï… Î®/ÎºÎ±Î¹ Î´Î¹Î±Ï†Î·Î¼Î¯ÏƒÎµÏ‰Î½, Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± ÏƒÏ…Î½Î´Ï…Î¬Î¶Î¿Ï…Î½ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚ Ï€Î¿Ï… ÏƒÏ…Î»Î»Î­Î³Î¿Ï…Î½ Î±Ï€ÏŒ Ï„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚ Î¼Îµ Î¬Î»Î»ÎµÏ‚ Ï€Î¿Ï… Î­Ï‡Î¿Ï…Î½ Î±Î½ÎµÎ¾Î¬ÏÏ„Î·Ï„Î± ÏƒÏ…Î»Î»Î­Î¾ÎµÎ¹ Î±Ï€ÏŒ Î¬Î»Î»Î± Î´Î¯ÎºÏ„Ï…Î± Î® Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´ÎµÏ‚ ÏƒÏ‡ÎµÏ„Î¹ÎºÎ¬ Î¼Îµ Ï„Î¹Ï‚ Î´ÏÎ±ÏƒÏ„Î·ÏÎ¹ÏŒÏ„Î·Ï„Î­Ï‚ ÏƒÎ±Ï‚ ÏƒÏ„Î¿Î½ Ï†Ï…Î»Î»Î¿Î¼ÎµÏ„ÏÎ·Ï„Î® ÏƒÎ±Ï‚.</p><p>Î•Î¬Î½ ÎµÏ€Î¹Î»Î­Î¾ÎµÏ„Îµ Î½Î± Î±Ï†Î±Î¹ÏÎ­ÏƒÎµÏ„Îµ Î® Î½Î± Î±Ï€ÎµÎ½ÎµÏÎ³Î¿Ï€Î¿Î¹Î®ÏƒÎµÏ„Îµ Î±Ï…Ï„Î¬ Ï„Î± cookies, Î¸Î± ÏƒÏ…Î½ÎµÏ‡Î¯ÏƒÎµÏ„Îµ Î½Î± Î²Î»Î­Ï€ÎµÏ„Îµ Î´Î¹Î±Ï†Î·Î¼Î¯ÏƒÎµÎ¹Ï‚, Î±Î»Î»Î¬ Î±Ï…Ï„Î­Ï‚ Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Î¼Î·Î½ ÎµÎ¯Î½Î±Î¹ Ï€Î»Î­Î¿Î½ ÏƒÏ‡ÎµÏ„Î¹ÎºÎ­Ï‚ Î¼Îµ Ï„Î± ÎµÎ½Î´Î¹Î±Ï†Î­ÏÎ¿Î½Ï„Î¬ ÏƒÎ±Ï‚.</p>","title":"Cookies ÎµÎ¾Î±Ï„Î¿Î¼Î¹ÎºÎµÏ…Î¼Î­Î½Î¿Ï… Ï€ÎµÏÎ¹ÎµÏ‡Î¿Î¼Î­Î½Î¿Ï… ÎºÎ±Î¹ Î´Î¹Î±Ï†Î·Î¼Î¯ÏƒÎµÏ‰Î½"},"level_tracking":{"content":"<p>Î‘Ï…Ï„Î¬ Ï„Î± cookies Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ½Ï„Î±Î¹ Î³Î¹Î± Î½Î± ÏƒÏ…Î»Î»Î­Î³Î¿Ï…Î½ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚ ÏƒÏ‡ÎµÏ„Î¹ÎºÎ­Ï‚ Î¼Îµ Ï„Î·Î½ Î±Î½Î¬Î»Ï…ÏƒÎ· Ï„Î·Ï‚ ÎµÏ€Î¹ÏƒÎºÎµÏˆÎ¹Î¼ÏŒÏ„Î·Ï„Î±Ï‚ Ï„Î·Ï‚ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±Ï‚ Î¼Î±Ï‚ ÎºÎ±Î¹ Î¼Îµ Ï„Î¿ Ï€ÏŽÏ‚ Î¿Î¹ Ï‡ÏÎ®ÏƒÏ„ÎµÏ‚ Ï„Î·Î½ Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ½.</p><p>Î“Î¹Î± Ï€Î±ÏÎ¬Î´ÎµÎ¹Î³Î¼Î±, Î±Ï…Ï„Î¬ Ï„Î± cookies Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± ÎµÎ½Ï„Î¿Ï€Î¯ÏƒÎ¿Ï…Î½ Ï€ÏŒÏƒÎ¿ Ï‡ÏÏŒÎ½Î¿ Î±Ï†Î¹ÎµÏÏŽÎ½ÎµÏ„Îµ ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚ Î® Ï€Î¿Î¹ÎµÏ‚ ÏƒÎµÎ»Î¯Î´ÎµÏ‚ Ï„Î·Ï‚ ÎµÏ€Î¹ÏƒÎºÎ­Ï€Ï„ÎµÏƒÏ„Îµ, Ï€ÏÎ¬Î³Î¼Î± Ï€Î¿Ï… Î¼Î±Ï‚ Î²Î¿Î·Î¸Î¬ÎµÎ¹ Î½Î± ÎºÎ±Ï„Î±Î»Î¬Î²Î¿Ï…Î¼Îµ Ï€ÏŽÏ‚ Î½Î± Î²ÎµÎ»Ï„Î¹ÏŽÏƒÎ¿Ï…Î¼Îµ Ï„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚.</p><p>ÎŸÎ¹ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚ Ï€Î¿Ï… ÏƒÏ…Î»Î»Î­Î³Î¿Î½Ï„Î±Î¹ Î¼Î­ÏƒÏ‰ Î±Ï…Ï„ÏŽÎ½ Ï„Ï‰Î½ cookies Î´ÎµÎ½ Î±Î½Î±Î³Î½Ï‰ÏÎ¯Î¶Î¿Ï…Î½ Î¼ÎµÎ¼Î¿Î½Ï‰Î¼Î­Î½Î¿Ï…Ï‚ Ï‡ÏÎ®ÏƒÏ„ÎµÏ‚.</p>","title":"Cookies ÎµÎ½Ï„Î¿Ï€Î¹ÏƒÎ¼Î¿Ï ÎºÎ±Î¹ Î±Ï€Î¿Î´Î¿Ï„Î¹ÎºÏŒÏ„Î·Ï„Î±Ï‚"},"preference_center":{"save":"Î‘Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ· Ï„Ï‰Î½ Ï€ÏÎ¿Ï„Î¹Î¼Î®ÏƒÎµÏŽÎ½ Î¼Î¿Ï…","title":"ÎšÎ­Î½Ï„ÏÎ¿ Î ÏÎ¿Ï„Î¹Î¼Î®ÏƒÎµÏ‰Î½ Cookies"},"preference_center_menu_and_content":{"more_information_content":"<h1>Î ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎµÏ‚ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚.</h1><p>Î“Î¹Î± Î¿Ï€Î¿Î¹Î±Î´Î®Ï€Î¿Ï„Îµ Î±Ï€Î¿ÏÎ¯Î± ÏƒÎµ ÏƒÏ‡Î­ÏƒÎ· Î¼Îµ Ï„Î·Î½ Ï€Î¿Î»Î¹Ï„Î¹ÎºÎ® Î¼Î±Ï‚ ÏƒÏ‡ÎµÏ„Î¹ÎºÎ¬ Î¼Îµ Ï„Î± cookies ÎºÎ±Î¹ Ï„Î¹Ï‚ ÎµÏ€Î¹Î»Î¿Î³Î­Ï‚ ÏƒÎ±Ï‚, Ï€Î±ÏÎ±ÎºÎ±Î»Î¿ÏÎ¼Îµ Î½Î± Î­ÏÎ¸ÎµÏ„Îµ ÏƒÎµ ÎµÏ€Î±Ï†Î® Î¼Î±Î¶Î¯ Î¼Î±Ï‚.</p>","more_information_title":"Î ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎµÏ‚ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚","your_privacy_content":"<h1>Î— Î¹Î´Î¹Ï‰Ï„Î¹ÎºÏŒÏ„Î·Ï„Î¬ ÏƒÎ±Ï‚ ÎµÎ¯Î½Î±Î¹ ÏƒÎ·Î¼Î±Î½Ï„Î¹ÎºÎ® Î³Î¹Î± ÎµÎ¼Î¬Ï‚.</h1>\\n<p>Î¤Î± cookies ÎµÎ¯Î½Î±Î¹ Ï€Î¿Î»Ï Î¼Î¹ÎºÏÎ¬ Î±ÏÏ‡ÎµÎ¯Î± ÎºÎµÎ¹Î¼Î­Î½Î¿Ï… Ï€Î¿Ï… Î±Ï€Î¿Î¸Î·ÎºÎµÏÎ¿Î½Ï„Î±Î¹ ÏƒÏ„Î¿Î½ Ï…Ï€Î¿Î»Î¿Î³Î¹ÏƒÏ„Î® ÏƒÎ±Ï‚ ÏŒÏ„Î±Î½ ÎµÏ€Î¹ÏƒÎºÎ­Ï€Ï„ÎµÏƒÏ„Îµ Î¼Î¹Î± Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±. Î§ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î¿ÏÎ¼Îµ cookies Î³Î¹Î± Î´Î¹Î¬Ï†Î¿ÏÎ¿Ï…Ï‚ Î»ÏŒÎ³Î¿Ï…Ï‚ ÎºÎ±Î¹ Î³Î¹Î± Î½Î± Î²ÎµÎ»Ï„Î¹ÏŽÏƒÎ¿Ï…Î¼Îµ Ï„Î·Î½ Î´Î¹Î±Î´Î¹ÎºÏ„Ï…Î±ÎºÎ® ÏƒÎ±Ï‚ ÎµÎ¼Ï€ÎµÎ¹ÏÎ¯Î± ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚ (Ï€.Ï‡., Î³Î¹Î± Ï…Ï€ÎµÎ½Î¸ÏÎ¼Î¹ÏƒÎ· Ï„Ï‰Î½ ÏƒÏ„Î¿Î¹Ï‡ÎµÎ¯Ï‰Î½ Ï€ÏÏŒÏƒÎ²Î±ÏƒÎ®Ï‚ ÏƒÎ±Ï‚ ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±).</p><p>ÎœÏ€Î¿ÏÎµÎ¯Ï„Îµ Î½Î± Î±Î»Î»Î¬Î¾ÎµÏ„Îµ Ï„Î¹Ï‚ Ï€ÏÎ¿Ï„Î¹Î¼Î®ÏƒÎµÎ¹Ï‚ ÏƒÎ±Ï‚ ÎºÎ±Î¹ Î½Î± Î¼Î·Î½ ÎµÏ€Î¹Ï„ÏÎ­ÏˆÎµÏ„Îµ ÏƒÎµ ÎºÎ¬Ï€Î¿Î¹Î¿Ï…Ï‚ Ï„ÏÏ€Î¿Ï…Ï‚ cookies Î½Î± Î±Ï€Î¿Î¸Î·ÎºÎµÏ…Ï„Î¿ÏÎ½ ÏƒÏ„Î¿Î½ Ï…Ï€Î¿Î»Î¿Î³Î¹ÏƒÏ„Î® ÏƒÎ±Ï‚ ÏŒÏƒÎ¿ Ï€ÎµÏÎ¹Î·Î³ÎµÎ¯ÏƒÏ„Îµ ÏƒÏ„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î± Î¼Î±Ï‚. ÎœÏ€Î¿ÏÎµÎ¯Ï„Îµ ÎµÏ€Î¯ÏƒÎ·Ï‚ Î½Î± Î´Î¹Î±Î³ÏÎ¬ÏˆÎµÏ„Îµ Î¿Ï€Î¿Î¹Î±Î´Î®Ï€Î¿Ï„Îµ cookies ÎµÎ¯Î½Î±Î¹ Î®Î´Î· Î±Ï€Î¿Î¸Î·ÎºÎµÏ…Î¼Î­Î½Î± ÏƒÏ„Î¿Î½ Ï…Ï€Î¿Î»Î¿Î³Î¹ÏƒÏ„Î® ÏƒÎ±Ï‚, Î±Î»Î»Î¬ Î½Î± Î­Ï‡ÎµÏ„Îµ Ï…Ï€ÏŒÏˆÎ¹Î½ ÏŒÏ„Î¹ Î´Î¹Î±Î³ÏÎ¬Ï†Î¿Î½Ï„Î±Ï‚ cookies Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± ÏƒÎ±Ï‚ Î±Ï€Î¿Ï„ÏÎ­ÏˆÎµÎ¹ Î±Ï€ÏŒ Ï„Î¿ Î½Î± Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î®ÏƒÎµÏ„Îµ Î¼Î­ÏÎ· Ï„Î·Ï‚ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±Ï‚ Î¼Î±Ï‚.</p>","your_privacy_title":"Î— Î¹Î´Î¹Ï‰Ï„Î¹ÎºÏŒÏ„Î·Ï„Î¬ ÏƒÎ±Ï‚"}}')
}, function (e) {
    e.exports = JSON.parse('{"dialog":{"active":"Gweithredol","always_active":"Yn weithredol bob tro","change_settings":"Newid fy newisiadau","find_out_more":"<p>I ganfod mwy, ewch at ein <a href=\'%s\' target=\'_blank\'>Polisi Cwcis</a>.</p>","i_agree_text":"Rwy\'n cytuno","inactive":"Anweithredol","ok_text":"Iawn","text":"Rydym yn defnyddio cwcis a thechnolegau tracio eraill i wella eich profiad o bori ar ein gwefan, i ddangos cynnwys wedi ei bersonoli a hysbysebion wedi\'u targedu, i ddadansoddi traffig ar ein gwefan ac i ddeall o ble daw ein hymwelwyr. Trwy bori ar ei gwefan, rydych yn cytuno y cawn ddefnyddio cwcis a thechnolegau tracio eraill.<br/>","title":"Rydym yn defnyddio cwcis"},"level_functionality":{"content":"<p>Mae\'r cwcis yma yn cael eu defnyddio i ddarparu profiad mwy personol ichi ar ein gwefan, ac i gofio dewisiadau a wnewch wrth ddefnyddio ein gwefan.</p><p>Er enghraifft, gallem ddefnyddio cwcis swyddogaeth i gofio\'ch dewis iaith neu gofio\'ch manylion mewngofnodi.</p>","title":"Cwcis swyddogaeth"},"level_strictly_necessary":{"content":"<p>Mae\'r cwcis yma yn hanfodol er mwyn ichi dderbyn gwasanaethau drwy ein gwefan a\'ch galluogi i ddefnyddio nodweddion penodol ar ein gwefan.</p><p>Heb y cwcis yma, ni fedrwn ddarparu rhai gwasanaethau penodol ichi ar ein gwefan.</p>","title":"Cwcis hollol hanfodol"},"level_targeting":{"content":"<p>Mae\'r cwcis yma yn cael eu defnyddio i ddangos hysbysebion sydd yn debygol o fod o ddiddordeb i chi yn seiliedig ar eich arferion pori.</p><p>Gall y cwcis yma, fel y\'u gweinyddir gan ein darparwyr cynnwys a/neu hysbysebion, gyfuno gwybodaeth a gasglwyd ganddynt o\'n gwefan gyda gwybodaeth arall maent wedi ei chasglu\'n annibynnol yn seiliedig ar eich gweithgareddau pori ar y rhyngrwyd ar draws eu rhwydweithiau o wefannau.</p><p>Os byddwch yn dewis tynnu neu atal y cwcis targedu neu hysbysebu yma, byddwch yn parhau i weld hysbysebion ond mae\'n bosib na fyddant yn berthnasol i chi. </p>","title":"Cwcis targedu a hysbysebu"},"level_tracking":{"content":"<p>Mae\'r cwcis yma yn cael eu defnyddio i gasglu gwybodaeth a dadansoddi traffig i\'n gwefan a sut mae ymwelwyr yn defnyddio\'n gwefan.</p><p>Er enghraifft, gall y cwcis yma dracio faint o amser rydych yn ei dreulio ar y wefan neu\'r tudalennau rydych yn ymweld à¢ hwy a\'n cynorthwyo i ddeall sut y gallwn wella ein gwefan ar eich cyfer.<p>Nid yw\'r wybodaeth a gesglir drwy\'r cwcis tracio a pherfformiad yn adnabod unrhyw ymwelydd unigol.</p>","title":"Cwcis tracio a pherfformiad"},"preference_center":{"save":"Cadw fy newisiadau","title":"Canolfan Dewisiadau Cwcis"},"preference_center_menu_and_content":{"more_information_content":"<h1>Rhagor o wybodaeth.</h1><p>Os oes gennych chi unrhyw ymholiadau yn ymwneud à¢\'n polisi cwcis a\'ch dewisiadau, a wnewch chi gysylltu à¢ ni.</p>","more_information_title":"Rhagor o wybodaeth","your_privacy_content":"<h1>Mae eich preifatrwydd yn bwysig i ni.</h1>\\n<p>Ffeiliau testun bach eu maint yw cwcis sydd yn cael eu storio ar eich cyfrifiadur wrth ichi ymweld à¢ gwefan. Rydym yn defnyddio cwcis i sawl diben ac i wella eich profiad ar-lein ar ein gwefan (er enghraifft, cofio eich manylion mewngofnodi i\'ch cyfrif).</p><p>Gallwch newid eich dewisiadau ac atal rhai mathau o gwcis rhag cael eu storio ar eich cyfrifiadur. Gallwch hefyd dynnu unrhyw gwcis sydd eisoes wedi eu storio ar eich cyfrifiadur, ond cofiwch y gall.</p>","your_privacy_title":"Eich preifatrwydd"}}')
}, function (e, n, o) {
    var t = o(19);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function (e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, '/*\n*****\nRESET STYLES\n*****\n */\n.m-0 {\n  margin: 0 !important; }\n\n.mt-0,\n.my-0 {\n  margin-top: 0 !important; }\n\n.mr-0,\n.mx-0 {\n  margin-right: 0 !important; }\n\n.mb-0,\n.my-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0,\n.mx-0 {\n  margin-left: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem !important; }\n\n.mt-1,\n.my-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1,\n.mx-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1,\n.my-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1,\n.mx-1 {\n  margin-left: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem !important; }\n\n.mt-2,\n.my-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2,\n.mx-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2,\n.my-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2,\n.mx-2 {\n  margin-left: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem !important; }\n\n.mt-3,\n.my-3 {\n  margin-top: 1rem !important; }\n\n.mr-3,\n.mx-3 {\n  margin-right: 1rem !important; }\n\n.mb-3,\n.my-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3,\n.mx-3 {\n  margin-left: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem !important; }\n\n.mt-4,\n.my-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4,\n.mx-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4,\n.my-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4,\n.mx-4 {\n  margin-left: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem !important; }\n\n.mt-5,\n.my-5 {\n  margin-top: 3rem !important; }\n\n.mr-5,\n.mx-5 {\n  margin-right: 3rem !important; }\n\n.mb-5,\n.my-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5,\n.mx-5 {\n  margin-left: 3rem !important; }\n\n.p-0 {\n  padding: 0 !important; }\n\n.pt-0,\n.py-0 {\n  padding-top: 0 !important; }\n\n.pr-0,\n.px-0 {\n  padding-right: 0 !important; }\n\n.pb-0,\n.py-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0,\n.px-0 {\n  padding-left: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem !important; }\n\n.pt-1,\n.py-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1,\n.px-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1,\n.py-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1,\n.px-1 {\n  padding-left: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem !important; }\n\n.pt-2,\n.py-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2,\n.px-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2,\n.py-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2,\n.px-2 {\n  padding-left: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem !important; }\n\n.pt-3,\n.py-3 {\n  padding-top: 1rem !important; }\n\n.pr-3,\n.px-3 {\n  padding-right: 1rem !important; }\n\n.pb-3,\n.py-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3,\n.px-3 {\n  padding-left: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem !important; }\n\n.pt-4,\n.py-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4,\n.px-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4,\n.py-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4,\n.px-4 {\n  padding-left: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem !important; }\n\n.pt-5,\n.py-5 {\n  padding-top: 3rem !important; }\n\n.pr-5,\n.px-5 {\n  padding-right: 3rem !important; }\n\n.pb-5,\n.py-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5,\n.px-5 {\n  padding-left: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto,\n.my-auto {\n  margin-top: auto !important; }\n\n.mr-auto,\n.mx-auto {\n  margin-right: auto !important; }\n\n.mb-auto,\n.my-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto,\n.mx-auto {\n  margin-left: auto !important; }\n\n.cc_css_reboot {\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff; }\n  .cc_css_reboot *,\n  .cc_css_reboot *::before,\n  .cc_css_reboot *::after {\n    box-sizing: border-box; }\n  .cc_css_reboot a,\n  .cc_css_reboot li,\n  .cc_css_reboot p,\n  .cc_css_reboot h1,\n  .cc_css_reboot h2,\n  .cc_css_reboot h3,\n  .cc_css_reboot h4,\n  .cc_css_reboot h5,\n  .cc_css_reboot h6,\n  .cc_css_reboot input,\n  .cc_css_reboot button,\n  .cc_css_reboot select {\n    border-style: none;\n    box-shadow: none;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    outline: none; }\n\n@-ms-viewport {\n  .cc_css_reboot {\n    width: device-width; } }\n  .cc_css_reboot article, .cc_css_reboot aside, .cc_css_reboot figcaption, .cc_css_reboot figure, .cc_css_reboot footer, .cc_css_reboot header, .cc_css_reboot hgroup, .cc_css_reboot main, .cc_css_reboot nav, .cc_css_reboot section {\n    display: block; }\n  .cc_css_reboot [tabindex="-1"]:focus {\n    outline: 0 !important; }\n  .cc_css_reboot hr {\n    box-sizing: content-box;\n    height: 0;\n    overflow: visible; }\n  .cc_css_reboot h1, .cc_css_reboot h2, .cc_css_reboot h3, .cc_css_reboot h4, .cc_css_reboot h5, .cc_css_reboot h6 {\n    margin-top: 0;\n    margin-bottom: 0.5rem;\n    color: #000; }\n  .cc_css_reboot p {\n    margin-top: 0;\n    margin-bottom: 1rem; }\n  .cc_css_reboot abbr[title],\n  .cc_css_reboot abbr[data-original-title] {\n    text-decoration: underline;\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n    cursor: help;\n    border-bottom: 0; }\n  .cc_css_reboot address {\n    margin-bottom: 1rem;\n    font-style: normal;\n    line-height: inherit; }\n  .cc_css_reboot div {\n    display: block; }\n  .cc_css_reboot ol,\n  .cc_css_reboot ul,\n  .cc_css_reboot dl {\n    margin-top: 0;\n    margin-bottom: 1rem; }\n  .cc_css_reboot ol ol,\n  .cc_css_reboot ul ul,\n  .cc_css_reboot ol ul,\n  .cc_css_reboot ul ol {\n    margin-bottom: 0; }\n  .cc_css_reboot b,\n  .cc_css_reboot strong {\n    font-weight: bolder; }\n  .cc_css_reboot small {\n    font-size: 80%; }\n  .cc_css_reboot sub,\n  .cc_css_reboot sup {\n    position: relative;\n    font-size: 75%;\n    line-height: 0;\n    vertical-align: baseline; }\n  .cc_css_reboot sub {\n    bottom: -.25em; }\n  .cc_css_reboot sup {\n    top: -.5em; }\n  .cc_css_reboot a {\n    color: #007bff;\n    text-decoration: none;\n    background-color: transparent;\n    -webkit-text-decoration-skip: objects; }\n  .cc_css_reboot a:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n  .cc_css_reboot a:not([href]):not([tabindex]) {\n    color: inherit;\n    text-decoration: none; }\n  .cc_css_reboot a:not([href]):not([tabindex]):hover, .cc_css_reboot a:not([href]):not([tabindex]):focus {\n    color: inherit;\n    text-decoration: none; }\n  .cc_css_reboot a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n  .cc_css_reboot img {\n    vertical-align: middle;\n    border-style: none; }\n  .cc_css_reboot svg:not(:root) {\n    overflow: hidden; }\n  .cc_css_reboot table {\n    border-collapse: collapse; }\n  .cc_css_reboot caption {\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    color: #6c757d;\n    text-align: left;\n    caption-side: bottom; }\n  .cc_css_reboot th {\n    text-align: inherit; }\n  .cc_css_reboot label {\n    display: inline-block;\n    margin-bottom: 0.5rem; }\n  .cc_css_reboot button {\n    border-radius: 2px;\n    padding: .5rem 1rem;\n    outline: none;\n    background: #dcdae5;\n    color: #111;\n    cursor: pointer;\n    border: none;\n    transition: all ease .3s; }\n    .cc_css_reboot button:focus {\n      outline: none; }\n  .cc_css_reboot select {\n    border-style: none; }\n  .cc_css_reboot input,\n  .cc_css_reboot button,\n  .cc_css_reboot select,\n  .cc_css_reboot optgroup,\n  .cc_css_reboot textarea {\n    margin: 0;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit; }\n  .cc_css_reboot button,\n  .cc_css_reboot input {\n    overflow: visible; }\n  .cc_css_reboot button,\n  .cc_css_reboot select {\n    text-transform: none; }\n  .cc_css_reboot button,\n  .cc_css_reboot html [type="button"],\n  .cc_css_reboot [type="reset"],\n  .cc_css_reboot [type="submit"] {\n    -webkit-appearance: button; }\n  .cc_css_reboot button::-moz-focus-inner,\n  .cc_css_reboot [type="button"]::-moz-focus-inner,\n  .cc_css_reboot [type="reset"]::-moz-focus-inner,\n  .cc_css_reboot [type="submit"]::-moz-focus-inner {\n    padding: 0;\n    border-style: none; }\n  .cc_css_reboot input[type="radio"],\n  .cc_css_reboot input[type="checkbox"] {\n    box-sizing: border-box;\n    padding: 0; }\n  .cc_css_reboot input[type="date"],\n  .cc_css_reboot input[type="time"],\n  .cc_css_reboot input[type="datetime-local"],\n  .cc_css_reboot input[type="month"] {\n    -webkit-appearance: listbox; }\n  .cc_css_reboot textarea {\n    overflow: auto;\n    resize: vertical; }\n  .cc_css_reboot fieldset {\n    min-width: 0;\n    padding: 0;\n    margin: 0;\n    border: 0; }\n  .cc_css_reboot legend {\n    display: block;\n    width: 100%;\n    max-width: 100%;\n    padding: 0;\n    margin-bottom: .5rem;\n    font-size: 1.5rem;\n    line-height: inherit;\n    color: inherit;\n    white-space: normal; }\n  .cc_css_reboot progress {\n    vertical-align: baseline; }\n  .cc_css_reboot [type="number"]::-webkit-inner-spin-button,\n  .cc_css_reboot [type="number"]::-webkit-outer-spin-button {\n    height: auto; }\n  .cc_css_reboot [type="search"] {\n    outline-offset: -2px;\n    -webkit-appearance: none; }\n  .cc_css_reboot [type="search"]::-webkit-search-cancel-button,\n  .cc_css_reboot [type="search"]::-webkit-search-decoration {\n    -webkit-appearance: none; }\n  .cc_css_reboot ::-webkit-file-upload-button {\n    font: inherit;\n    -webkit-appearance: button; }\n  .cc_css_reboot [hidden] {\n    display: none !important; }\n', ""])
}, function (e, n) {
    e.exports = function (e) {
        var n = "undefined" != typeof window && window.location;
        if (!n) throw new Error("fixUrls requires window.location");
        if (!e || "string" != typeof e) return e;
        var o = n.protocol + "//" + n.host,
            t = o + n.pathname.replace(/\/[^\/]*$/, "/");
        return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, n) {
            var i, a = n.trim().replace(/^"(.*)"$/, function (e, n) {
                return n
            }).replace(/^'(.*)'$/, function (e, n) {
                return n
            });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a) ? e : (i = 0 === a.indexOf("//") ? a : 0 === a.indexOf("/") ? o + a : t + a.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")")
        })
    }
}, function (e, n, o) {
    var t = o(22);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function (e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, '/*\n\nCookie Consent\n\n */\n.cc_overlay_lock {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 9999999999; }\n  .cc_overlay_lock.hidden {\n    display: none; }\n\n.cc_dialog {\n  background-color: #f2f2f2;\n  color: #111;\n  z-index: 99999999999;\n  font-size: 16px; }\n  .cc_dialog.hidden {\n    display: none; }\n  .cc_dialog.headline {\n    right: 0;\n    top: 0;\n    bottom: auto;\n    left: 0;\n    max-width: 100%;\n    position: relative; }\n  .cc_dialog.simple {\n    right: 0;\n    top: auto;\n    bottom: 0;\n    left: auto;\n    max-width: 50%;\n    position: fixed; }\n  .cc_dialog.interstitial {\n    right: 3vw;\n    top: 3vh;\n    left: 3vw;\n    max-width: 100%;\n    position: fixed; }\n  .cc_dialog.standalone {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%; }\n  .cc_dialog .cc_dialog_headline {\n    font-size: 24px;\n    font-weight: 600; }\n  .cc_dialog .cc_dialog_text {\n    font-size: 16px; }\n  .cc_dialog button {\n    font-weight: bold;\n    font-size: 14px; }\n    .cc_dialog button.cc_b_ok {\n      background-color: #008000;\n      color: #fff; }\n      .cc_dialog button.cc_b_ok:active {\n        background: #136d13; }\n    .cc_dialog button.cc_b_cp {\n      background-color: #eaeaea;\n      color: #111; }\n      .cc_dialog button.cc_b_cp:active {\n        background: #f2f2f2; }\n\n.cookie-consent-preferences-overlay {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999999999999;\n  top: 0;\n  left: 0;\n  display: none; }\n  .cookie-consent-preferences-overlay.visible {\n    display: block; }\n  .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog {\n    position: absolute;\n    margin: 30px auto;\n    width: 750px;\n    max-width: 90%;\n    height: auto;\n    left: 0;\n    right: 0; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n      width: 100%;\n      display: flex;\n      background: #fff;\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container > div {\n        width: 100%; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n        background: #fff;\n        color: #111;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title {\n          display: flex;\n          padding-left: 15px;\n          flex-direction: column;\n          justify-content: center;\n          align-items: baseline; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title h2,\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title p {\n            margin: 0; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title p {\n            font-size: 16px;\n            line-height: 1.5; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title h2 {\n            font-size: 20px;\n            font-weight: 600; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector {\n          display: flex;\n          align-items: center;\n          padding-right: 15px;\n          min-height: 80px;\n          justify-content: center; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n        display: flex;\n        flex-direction: row;\n        align-items: stretch;\n        background: #292929;\n        color: #f5f5f5;\n        border-bottom: none; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n          font-family: Arial, sans-serif !important;\n          width: 150px;\n          margin: 0;\n          padding: 0;\n          background: #e6e6e6;\n          min-width: 150px; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n            margin: 0;\n            padding: 0;\n            float: left;\n            display: block;\n            width: 100%;\n            color: #666;\n            background: #e6e6e6;\n            border-bottom: 1px solid #ccc;\n            border-right: 1px solid #ccc;\n            transition: all ease .1s;\n            box-sizing: content-box; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n              background: #292929;\n              color: #f5f5f5; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n              text-decoration: none;\n              color: #666;\n              display: block;\n              padding: 10px 5px 10px 10px;\n              font-weight: 700;\n              font-size: 12px;\n              line-height: 19px; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n          background: #292929 !important;\n          color: #f5f5f5; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry {\n            width: 100%;\n            display: none;\n            padding: 25px;\n            box-sizing: border-box; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry[active=true] {\n              display: block; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry h1 {\n              font-size: 24px;\n              font-weight: 600; }\n            .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content .cc_cp_m_content_entry p {\n              font-size: 16px;\n              line-height: 1.5; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n        background: #f2f2f2;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        border-top: 1px solid #ccc;\n        justify-content: space-between; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n          padding: 20px 10px;\n          font-size: 14px;\n          color: #333;\n          display: block !important; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by a {\n            color: #999; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n          margin-right: 10px;\n          opacity: .9;\n          transition: all ease .3s;\n          font-size: 14px;\n          font-weight: bold;\n          height: auto; }\n          .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button:hover {\n            opacity: 1; }\n  .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent {\n    position: absolute;\n    margin: 2px 0 0 16px;\n    cursor: pointer; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label {\n      position: relative;\n      padding: 4px 0 0 50px;\n      line-height: 2.0em;\n      cursor: pointer;\n      display: inline;\n      font-size: 14px; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:before {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0;\n        top: 0;\n        width: 40px;\n        /* x*5 */\n        height: 24px;\n        /* x*3 */\n        border-radius: 16px;\n        /* x*2 */\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:after {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0px;\n        top: 0px;\n        width: 24px;\n        /* x*3 */\n        height: 24px;\n        /* x*3 */\n        border-radius: 16px;\n        /* x*2 */\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent + label:hover:after {\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent:checked + label:after {\n      margin-left: 16px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent:checked + label:before {\n      background: #55D069; }\n  .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm {\n    position: absolute;\n    margin: 5px 0 0 10px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label {\n      position: relative;\n      padding: 0 0 0 32px;\n      line-height: 1.3em; }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:before {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0;\n        top: 0;\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s;\n        width: 25px;\n        /* x*5 */\n        height: 15px;\n        /* x*3 */\n        border-radius: 10px;\n        /* x*2 */ }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:after {\n        content: "";\n        position: absolute;\n        display: block;\n        left: 0px;\n        top: 0px;\n        background: #fff;\n        border: 1px solid #d9d9d9;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s;\n        width: 15px;\n        /* x*3 */\n        height: 15px;\n        /* x*3 */\n        border-radius: 10px;\n        /* x*2 */ }\n      .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm + label:hover:after {\n        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm:checked + label:after {\n      margin-left: 10px; }\n    .cookie-consent-preferences-overlay input[type="checkbox"].checkbox_cookie_consent-sm:checked + label:before {\n      background: #55D069; }\n\n@media screen and (max-width: 600px) {\n  .cookie-consent-preferences-overlay {\n    overflow-y: scroll; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_title {\n        align-items: center;\n        padding: 15px 0 0 0; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector {\n        padding: 15px 0;\n        min-height: 20px; }\n    .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n      flex-direction: column; }\n      .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n        width: 100%; }\n        .cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n          border-right: 0; } }\n', ""])
}, function (e, n, o) {
    var t = o(24);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function (e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, ".dark.cc_dialog {\n  background-color: #111;\n  color: #fff; }\n  .dark.cc_dialog .cc_dialog_headline {\n    color: #fff; }\n  .dark.cc_dialog .cc_dialog_text {\n    color: #fff; }\n  .dark.cc_dialog button.cc_b_ok {\n    color: #000;\n    background-color: #ff0; }\n  .dark.cc_dialog button.cc_b_cp {\n    background-color: #eaeaea;\n    color: #111; }\n\n.dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n  background: #212121; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n    background: #212121;\n    color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head h2 {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head p {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector select {\n      color: #212121; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n    background: #292929 !important;\n    color: #f5f5f5; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n      color: #666;\n      background: #e6e6e6; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n        border-right-color: #ccc;\n        border-bottom-color: #ccc; }\n        .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n          background: #292929 !important; }\n          .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] a {\n            color: #f5f5f5 !important; }\n        .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n          color: #666; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n      background: #292929 !important;\n      color: #f5f5f5; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content h1 {\n        color: #fff; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content p {\n        color: #fff; }\n      .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content a {\n        color: #cce5ff; }\n  .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n    background: #212121;\n    border-top-color: #111; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n      color: #fff; }\n    .dark.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n      background: #ff0;\n      color: #000; }\n", ""])
}, function (e, n, o) {
    var t = o(26);
    "string" == typeof t && (t = [
        [e.i, t, ""]
    ]);
    var i = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    o(1)(t, i);
    t.locals && (e.exports = t.locals)
}, function (e, n, o) {
    (e.exports = o(0)(!1)).push([e.i, ".light.cc_dialog {\n  background-color: #f2f2f2;\n  color: #111; }\n  .light.cc_dialog .cc_dialog_headline {\n    color: #111; }\n  .light.cc_dialog .cc_dialog_text {\n    color: #111; }\n  .light.cc_dialog button.cc_b_ok {\n    color: #fff;\n    background-color: #008000; }\n  .light.cc_dialog button.cc_b_cp {\n    background-color: #eaeaea;\n    color: #111; }\n\n.light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container {\n  background: #fff; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head {\n    background: #fff;\n    color: #111;\n    border-bottom: 1px solid #ccc; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head h2 {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head p {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_head .cc_cp_head_lang_selector select {\n      color: #111; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content {\n    background: #fbfbfb !important;\n    color: #111111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu {\n      color: #666;\n      background: #e6e6e6; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li {\n        border-right-color: #ccc;\n        border-bottom-color: #ccc; }\n        .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] {\n          background: #fbfbfb !important; }\n          .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li[active=true] a {\n            color: #111 !important; }\n        .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_menu li a {\n          color: #666; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content {\n      background: #fbfbfb !important;\n      color: #111111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content h1 {\n        color: #111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content p {\n        color: #111; }\n      .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_content .cc_cp_m_content a {\n        color: #007bff; }\n  .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer {\n    background: #f2f2f2;\n    border-top-color: #ccc; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_powered_by {\n      color: #111; }\n    .light.cookie-consent-preferences-overlay .cookie-consent-preferences-dialog .cc_cp_container .cc_cp_footer .cc_cp_f_save button {\n      background: #008000;\n      color: #FFF; }\n", ""])
}, function (e, n, o) {
    "use strict";
    o.r(n);
    o(18), o(21), o(23), o(25);
    var t = function () {
            function e() {}
            return e.insertCss = function (e) {
                var n = document.querySelector("head"),
                    o = document.createElement("link");
                o.setAttribute("href", e), o.setAttribute("rel", "stylesheet"), o.setAttribute("type", "text/css"), n.appendChild(o)
            }, e.appendChild = function (e, n, o) {
                var t, i;
                return void 0 === o && (o = null), t = "string" == typeof e ? document.querySelector(e) : e, i = "string" == typeof n ? document.querySelector(n) : n, "afterbegin" === o ? t.insertAdjacentElement("afterbegin", i) : t.insertAdjacentElement("beforeend", i), !0
            }, e.setCookie = function (e, n, o) {
                void 0 === o && (o = 62);
                var t = new Date;
                t.setTime(t.getTime() + 24 * o * 60 * 60 * 1e3);
                var i = "; expires=" + t.toUTCString();
                return document.cookie = e + "=" + (n || "") + i + "; path=/", !0
            }, e.getCookie = function (e) {
                for (var n = e + "=", o = document.cookie.split(";"), t = 0; t < o.length; t++) {
                    for (var i = o[t];
                        " " === i.charAt(0);) i = i.substring(1, i.length);
                    if (0 === i.indexOf(n)) return i.substring(n.length, i.length)
                }
                return null
            }, e.removeCookie = function (e) {
                document.cookie = e + "=; Max-Age=-99999999;"
            }, e.registerEvent = function (e) {
                var n = document.createEvent("Event");
                return n.initEvent(e, !0, !0), n
            }, e.searchObjectsArray = function (e, n, o) {
                for (var t in e) {
                    if (e[t][n] === o) return !0
                }
                return !1
            }, e.magicTransform = function (e) {
                return decodeURIComponent(atob(e).split("").map(function (e) {
                    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                }).join(""))
            }, e.isValidUrl = function (e) {
                return new RegExp("^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i").test(e)
            }, e
        }(),
        i = o(2),
        a = o(3),
        r = o(4),
        s = o(5),
        c = o(6),
        l = o(7),
        p = o(8),
        d = o(9),
        u = o(10),
        m = o(11),
        k = o(12),
        f = o(13),
        g = o(14),
        v = o(15),
        h = o(16),
        _ = o(17),
        b = function () {
            function e(e) {
                this.cookieConsent = e, this.userLang = "en", this.initAvailableLanguages(), this.initDefaultTranslations(), this.detectUserLanguage()
            }
            return e.prototype.detectUserLanguage = function () {
                var e = "en";
                if (void 0 !== (e = void 0 !== navigator.languages ? navigator.languages[0] : navigator.language)) {
                    if (e.indexOf("-") > 0) {
                        var n = e.split("-");
                        e = n[0]
                    }
                    this.cookieConsent.log("[i18n] Detected user default language: " + e, "info")
                } else e = this.cookieConsent.ownerSiteLanguage;
                var o = e.toLowerCase.toString();
                this.availableTranslations[o] ? this.userLang = o : this.availableTranslations[this.cookieConsent.ownerSiteLanguage] ? this.userLang = this.cookieConsent.ownerSiteLanguage : this.userLang = "en"
            }, e.prototype.initDefaultTranslations = function () {
                this.availableTranslations = {
                    en: i,
                    de: a,
                    fr: r,
                    es: s,
                    it: c,
                    pt: l,
                    hu: p,
                    hr: d,
                    da: u,
                    ro: m,
                    sl: k,
                    pl: f,
                    sr: g,
                    bg: v,
                    el: h,
                    cy: _
                }, this.cookieConsent.log("[i18n] Default translations initialized", "info")
            }, e.prototype.initAvailableLanguages = function () {
                this.availableLanguages = [{
                    value: "en",
                    title: "English"
                }, {
                    value: "de",
                    title: "German"
                }, {
                    value: "fr",
                    title: "French"
                }, {
                    value: "es",
                    title: "Spanish"
                }, {
                    value: "it",
                    title: "Italian"
                }, {
                    value: "pt",
                    title: "Portugese"
                }, {
                    value: "hu",
                    title: "Hungarian"
                }, {
                    value: "hr",
                    title: "Croatian"
                }, {
                    value: "da",
                    title: "Danish"
                }, {
                    value: "ro",
                    title: "Romanian"
                }, {
                    value: "sl",
                    title: "Slovenian"
                }, {
                    value: "pl",
                    title: "Polish"
                }, {
                    value: "sr",
                    title: "Serbian"
                }, {
                    value: "bg",
                    title: "Bulgarian"
                }, {
                    value: "el",
                    title: "Greek"
                }, {
                    value: "cy",
                    title: "Welsh"
                }], this.cookieConsent.log("[i18n] Default languages initialized", "info")
            }, e.prototype.$t = function (e, n, o) {
                void 0 === o && (o = null);
                var t = this.availableTranslations[this.userLang][e][n];
                return "string" == typeof o ? t = t.replace("%s", o) : Array.isArray(o) && o.map(function (e, n) {
                    var i = o[n];
                    t = t.replace("%s", i)
                }), t || ""
            }, e
        }();
    o.d(n, "run", function () {
        return R
    }), o.d(n, "consentDebugger", function () {
        return w
    });
    var y, w, z = (y = function (e, n) {
            return (y = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function (e, n) {
                    e.__proto__ = n
                } || function (e, n) {
                    for (var o in n) n.hasOwnProperty(o) && (e[o] = n[o])
                })(e, n)
        }, function (e, n) {
            function o() {
                this.constructor = e
            }
            y(e, n), e.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
        }),
        j = function () {
            function e(e) {
                this.scripts = {}, this.cookieConsent = e, this.cookieConsent.log("Javascript items initialized.", "info"), this.readScripts()
            }
            return e.prototype.readScripts = function () {
                var e = document.querySelectorAll('script[type="text/plain"]');
                for (var n in e) {
                    var o = e[n];
                    "object" == typeof o && this._noticeScriptIfValid(o)
                }
            }, e.prototype._noticeScriptIfValid = function (e) {
                var n = e.getAttribute("cookie-consent");
                !0 === t.searchObjectsArray(this.cookieConsent.cookieLevels.cookieLevels, "id", n) ? (this.cookieConsent.log("Javascript with valid cookie consent found", "info"), this.cookieConsent.log(e, "info"), void 0 === this.scripts[n] && (this.scripts[n] = []), this.scripts[n].push(e)) : this.cookieConsent.log("Invalid cookie consent level for javascript sript: " + n, "warning")
            }, e.prototype.enableScriptsByLevel = function (e) {
                for (var n in this.scripts[e]) try {
                    var o = this.scripts[e][n],
                        i = document.createElement("script");
                    i.setAttribute("type", "text/javascript"), i.setAttribute("initial-cookie-consent", o.getAttribute("cookie-consent")), null !== o.getAttribute("src") && i.setAttribute("src", o.getAttribute("src")), i.text = o.innerHTML, t.appendChild("head", i), o.parentNode.removeChild(o), delete this.scripts[e][n]
                } catch (e) {
                    this.cookieConsent.log("Got an error while trying to activate a script template, message: " + e.message.toString(), "log")
                }
            }, e
        }(),
        C = function () {
            function e(e) {
                this.acceptedLevels = {}, this.userAccepted = !1, this.consentLevelCookieName = "cookie_consent_level", this.consentAcceptedCookieName = "cookie_consent_user_accepted", this.loadCookiesUntilAndInclude = "strictly-necessary", this.cookieConsent = e, this.cookieConsent.log("UserConsent initialized.", "info"), this.checkIfUserAccepted(), this.getUserLevels()
            }
            return e.prototype.checkIfUserAccepted = function () {
                "true" === t.getCookie(this.consentAcceptedCookieName) && (this.userAccepted = !0)
            }, e.prototype.markUserAccepted = function () {
                this.userAccepted = !0, !1 === this.cookieConsent.isDemo && t.setCookie(this.consentAcceptedCookieName, "true")
            }, e.prototype.getUserLevels = function () {
                var e = t.getCookie(this.consentLevelCookieName),
                    n = {};
                try {
                    n = JSON.parse(decodeURIComponent(e))
                } catch (e) {
                    n = null
                }
                if (null === n) document.dispatchEvent(this.cookieConsent.events.cc_freshUser), this.enableAllCookies();
                else {
                    for (var o in this.cookieConsent.cookieLevels.cookieLevels) {
                        var i = this.cookieConsent.cookieLevels.cookieLevels[o].id;
                        !0 === n[i] ? this.acceptedLevels[i] = !0 : this.acceptedLevels[i] = !1, this.saveCookie()
                    }
                    this.cookieConsent.log(this.acceptedLevels, "info", "table")
                }
            }, e.prototype.enableAllCookies = function () {
                for (var e in this.cookieConsent.cookieLevels.cookieLevels) {
                    var n = this.cookieConsent.cookieLevels.cookieLevels[e].id;
                    this.acceptLevel(n)
                }
            }, e.prototype.loadCookiesUntilMaxLevel = function () {
                var e = !1;
                for (var n in this.cookieConsent.cookieLevels.cookieLevels) {
                    if (e) break;
                    var o = this.cookieConsent.cookieLevels.cookieLevels[n].id;
                    o === this.loadCookiesUntilAndInclude && (e = !0), !1 !== this.acceptedLevels[o] && this.cookieConsent.javascriptItems.enableScriptsByLevel(o)
                }
            }, e.prototype.loadAcceptedCookies = function () {
                for (var e in this.cookieConsent.cookieLevels.cookieLevels) {
                    var n = this.cookieConsent.cookieLevels.cookieLevels[e].id;
                    !1 !== this.acceptedLevels[n] && this.cookieConsent.javascriptItems.enableScriptsByLevel(n)
                }
            }, e.prototype.checkIsAccepted = function (e) {
                var n = !1;
                return e in this.acceptedLevels && !0 === this.acceptedLevels[e] && (n = !0), n
            }, e.prototype.acceptLevel = function (e) {
                return this.cookieConsent.log("Accepted cookie level: " + e, "info"), this.acceptedLevels[e] = !0, this.saveCookie()
            }, e.prototype.rejectLevel = function (e) {
                return this.cookieConsent.log("Rejected cookie level: " + e, "info"), this.acceptedLevels[e] = !1, this.saveCookie()
            }, e.prototype.saveCookie = function () {
                var e = encodeURIComponent(JSON.stringify(this.acceptedLevels));
                return t.setCookie(this.consentLevelCookieName, e), this.cookieConsent.log("Saved cookies containing the user consent level", "info"), !0
            }, e
        }(),
        x = function () {
            this.cc_dialogShown = t.registerEvent("cc_dialogShown"), this.cc_dialogOkPressed = t.registerEvent("cc_dialogOkPressed"), this.cc_dialogPreferencesPressed = t.registerEvent("cc_dialogPreferencesPressed"), this.cc_userLanguageChanged = t.registerEvent("cc_userLanguageChanged"), this.cc_preferencesSavePressed = t.registerEvent("cc_preferencesSavePressed"), this.cc_freshUser = t.registerEvent("cc_freshUser"), this.cc_userChangedConsent = t.registerEvent("cc_userChangedConsent")
        },
        L = function () {
            function e(e) {
                this.cookieConsent = e, this.cc_dialogShown(), this.cc_dialogOkPressed(), this.cc_dialogPreferencesPressed(), this.cc_userLanguageChanged(), this.cc_preferencesSavePressed(), this.cc_freshUser(), this.cc_userChangedConsent()
            }
            return e.prototype.cc_dialogShown = function () {
                var e = this;
                window.addEventListener("cc_dialogShown", function () {
                    e.cookieConsent.log("cc_dialogShown triggered", "event")
                })
            }, e.prototype.cc_dialogOkPressed = function () {
                var e = this;
                document.addEventListener("cc_dialogOkPressed", function () {
                    e.cookieConsent.log("cc_dialogOkPressed triggered", "event"), e.cookieConsent.consentType instanceof N ? (e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.userConsent.loadAcceptedCookies()) : e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.consentBanner.hideDialog()
                })
            }, e.prototype.cc_dialogPreferencesPressed = function () {
                var e = this;
                window.addEventListener("cc_dialogPreferencesPressed", function () {
                    e.cookieConsent.log("cc_dialogPreferencesPressed triggered", "event"), e.cookieConsent.consentPreferences.showPreferences()
                })
            }, e.prototype.cc_userLanguageChanged = function () {
                var e = this;
                window.addEventListener("cc_userLanguageChanged", function () {
                    e.cookieConsent.log("cc_userLanguageChanged triggered", "event")
                })
            }, e.prototype.cc_preferencesSavePressed = function () {
                var e = this;
                window.addEventListener("cc_preferencesSavePressed", function () {
                    e.cookieConsent.log("cc_preferencesSavePressed triggered", "event"), e.cookieConsent.userConsent.markUserAccepted(), e.cookieConsent.userConsent.loadAcceptedCookies(), e.cookieConsent.consentPreferences.hidePreferences(), e.cookieConsent.consentBanner.hideDialog()
                })
            }, e.prototype.cc_freshUser = function () {
                var e = this;
                window.addEventListener("cc_freshUser", function () {
                    e.cookieConsent.log("cc_freshUser triggered", "event")
                })
            }, e.prototype.cc_userChangedConsent = function () {
                var e = this;
                window.addEventListener("cc_userChangedConsent", function () {
                    e.cookieConsent.log("cc_userChangedConsent triggered", "event")
                })
            }, e
        }(),
        E = function () {
            function e(e) {
                this.cookieConsent = e, this.initDefaultLevels(), this.initPreferenceItems()
            }
            return e.prototype.languageChanged = function () {
                this.initDefaultLevels(), this.initPreferenceItems()
            }, e.prototype.initDefaultLevels = function () {
                this.cookieLevels = [{
                    id: "strictly-necessary",
                    title: this.cookieConsent.i18n.$t("level_strictly_necessary", "title"),
                    content: this.cookieConsent.i18n.$t("level_strictly_necessary", "content")
                }, {
                    id: "functionality",
                    title: this.cookieConsent.i18n.$t("level_functionality", "title"),
                    content: this.cookieConsent.i18n.$t("level_functionality", "content")
                }, {
                    id: "tracking",
                    title: this.cookieConsent.i18n.$t("level_tracking", "title"),
                    content: this.cookieConsent.i18n.$t("level_tracking", "content")
                }, {
                    id: "targeting",
                    title: this.cookieConsent.i18n.$t("level_targeting", "title"),
                    content: this.cookieConsent.i18n.$t("level_targeting", "content")
                }]
            }, e.prototype.initPreferenceItems = function () {
                this.preferenceItems = [{
                    title: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "your_privacy_title"),
                    content_container: "content_your_privacy",
                    content: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "your_privacy_content")
                }];
                for (var e = 0, n = this.cookieLevels; e < n.length; e++) {
                    var o = n[e];
                    this.preferenceItems.push({
                        id: o.id,
                        title: o.title,
                        content_container: "content_" + o.id,
                        content: "\n<h1>" + o.title + "</h1>\n<p>" + o.content + "</p>\n"
                    })
                }
                this.preferenceItems.push({
                    title: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "more_information_title"),
                    content_container: "content_more_information",
                    content: this.cookieConsent.i18n.$t("preference_center_menu_and_content", "more_information_content")
                }), null !== this.cookieConsent.cookiesPolicyUrl && t.isValidUrl(this.cookieConsent.cookiesPolicyUrl) && (this.preferenceItems[this.preferenceItems.length - 1].content = this.preferenceItems[this.preferenceItems.length - 1].content + this.cookieConsent.i18n.$t("dialog", "find_out_more", this.cookieConsent.cookiesPolicyUrl))
            }, e
        }(),
        S = function () {
            function e(e) {
                this.cpOverlay = null, this.cookieConsent = e
            }
            return e.prototype.listenToUserButtonToOpenPreferences = function (e) {
                var n = this,
                    o = document.querySelector(e);
                o && o.addEventListener("click", function () {
                    document.dispatchEvent(n.cookieConsent.events.cc_dialogPreferencesPressed), n.showPreferences()
                })
            }, e.prototype.showPreferences = function () {
                null === this.cpOverlay && (this.cpOverlay = this.createPreferencesOverlayAndDialog(), t.appendChild("body", this.cpOverlay)), this.cpOverlay.classList.add("visible"), this.cookieConsent.log("Cookie preferences dialog was shown", "info")
            }, e.prototype.hidePreferences = function () {
                this.cpOverlay.classList.remove("visible"), this.cookieConsent.log("Cookie preferences dialog was hidden", "info")
            }, e.prototype.refreshPreferences = function () {
                if (null !== this.cpOverlay) return this.cpOverlay.parentNode.removeChild(this.cpOverlay), this.cpOverlay = null, this.showPreferences()
            }, e.prototype.createPreferencesOverlayAndDialog = function () {
                var e = document.createElement("div");
                e.classList.add("cookie-consent-preferences-overlay"), e.classList.add(this.cookieConsent.colorPalette.getClass()), e.classList.add("cc_css_reboot");
                var n = document.createElement("div");
                n.classList.add("cookie-consent-preferences-dialog");
                var o = document.createElement("div");
                o.classList.add("cc_cp_container");
                var i = document.createElement("div");
                i.classList.add("cc_cp_head");
                var a = document.createElement("div");
                if (a.classList.add("cc_cp_head_title"), this.cookieConsent.ownerWebsiteName.length > 2) {
                    var r = document.createElement("p");
                    r.innerText = this.cookieConsent.ownerWebsiteName, t.appendChild(a, r)
                }
                var s = document.createElement("h2");
                s.innerHTML = this.cookieConsent.i18n.$t("preference_center", "title"), t.appendChild(a, s);
                var c = document.createElement("div");
                c.classList.add("cc_cp_head_lang_selector");
                var l = this.obtainLanguageSelector();
                t.appendChild(c, l), t.appendChild(i, a), t.appendChild(i, c);
                var p = document.createElement("div");
                p.classList.add("cc_cp_content");
                var d = this.getMenuContainer(),
                    u = this.getContentContainer();
                t.appendChild(p, d), t.appendChild(p, u);
                var m = this.getFooterContainer();
                return t.appendChild(o, i), t.appendChild(o, p), t.appendChild(o, m), t.appendChild(n, o), t.appendChild(e, n), e
            }, e.prototype.obtainLanguageSelector = function () {
                var e = this,
                    n = document.createElement("select");
                return [].forEach.call(e.cookieConsent.i18n.availableLanguages, function (o) {
                    var t = document.createElement("option");
                    t.text = o.title, t.value = o.value, e.cookieConsent.i18n.userLang === t.value && t.setAttribute("selected", "selected"), n.add(t)
                }), n.addEventListener("change", function () {
                    e.cookieConsent.i18n.userLang = n.value, e.cookieConsent.cookieLevels.languageChanged(), e.refreshPreferences(), document.dispatchEvent(e.cookieConsent.events.cc_userLanguageChanged)
                }), n
            }, e.prototype.getContentContainer = function () {
                var e = this,
                    n = document.createElement("div");
                n.classList.add("cc_cp_m_content");
                var o = 0;
                return e.cookieConsent.cookieLevels.preferenceItems.forEach(function (i) {
                    var a = document.createElement("div");
                    if (a.classList.add("cc_cp_m_content_entry"), a.setAttribute("content_layout", i.content_container), a.setAttribute("active", "false"), a.innerHTML = i.content, 0 === o && a.setAttribute("active", "true"), o++, i.id) {
                        var r = e._getLevelCheckbox(i);
                        t.appendChild(a, r)
                    }
                    t.appendChild(n, a)
                }), n
            }, e.prototype.getMenuContainer = function () {
                var e = this,
                    n = document.createElement("ul");
                n.classList.add("cc_cp_m_menu");
                var o = 0;
                return e.cookieConsent.cookieLevels.preferenceItems.forEach(function (i) {
                    var a = document.createElement("li"),
                        r = document.createElement("a");
                    r.setAttribute("href", "#"), r.setAttribute("t", i.content_container), r.innerHTML = i.title, 0 === o && a.setAttribute("active", "true"), o++, r.addEventListener("click", function (n) {
                        n.preventDefault(), e.cookieConsent.log("Preferences menu item clicked: " + i.title, "info");
                        var o = document.querySelectorAll('li[active="true"]');
                        [].forEach.call(o, function (e) {
                            e.setAttribute("active", "false")
                        }), a.setAttribute("active", "true");
                        try {
                            var t = document.querySelectorAll("div[content_layout]");
                            [].forEach.call(t, function (e) {
                                e.setAttribute("active", "false")
                            }), document.querySelector('div[content_layout="' + i.content_container + '"]').setAttribute("active", "true")
                        } catch (n) {}
                    }), t.appendChild(a, r), t.appendChild(n, a)
                }), n
            }, e.prototype.getFooterContainer = function () {
                var e = this,
                    n = document.createElement("div");
                n.classList.add("cc_cp_footer");
                var o = document.createElement("div");
                o.classList.add("cc_cp_f_powered_by"), o.innerHTML = t.magicTransform("Q29va2llIENvbnNlbnQgYnkgPGEgaHJlZj0iaHR0cHM6Ly93d3cucHJpdmFjeXBvbGljaWVzLmNvbS9jb29raWUtY29uc2VudC8iIHRhcmdldD0iX2JsYW5rIj5Qcml2YWN5UG9saWNpZXMuY29tPC9hPg==");
                var i = document.createElement("div");
                i.classList.add("cc_cp_f_save");
                var a = document.createElement("button");
                return a.innerHTML = e.cookieConsent.i18n.$t("preference_center", "save"), a.addEventListener("click", function () {
                    document.dispatchEvent(e.cookieConsent.events.cc_preferencesSavePressed)
                }), t.appendChild(i, a), t.appendChild(n, o), t.appendChild(n, i), n
            }, e.prototype._getLevelCheckbox = function (e) {
                var n = this,
                    o = document.createElement("div");
                if ("strictly-necessary" !== e.id) {
                    var i = n.cookieConsent.userConsent.acceptedLevels,
                        a = document.createElement("input");
                    a.setAttribute("cookie_consent_toggler", "true"), a.setAttribute("type", "checkbox"), a.setAttribute("class", "checkbox_cookie_consent"), a.setAttribute("id", e.id), a.setAttribute("name", e.id), (r = document.createElement("label")).setAttribute("for", e.id), i[e.id] ? (a.setAttribute("checked", "checked"), r.setAttribute("class", "is-active"), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "active")) : (r.setAttribute("class", "is-inactive"), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "inactive")), a.addEventListener("change", function () {
                        var o = a.checked,
                            t = e.id,
                            i = document.querySelector('label[for="' + t + '"]');
                        n.cookieConsent.log("User changed toggle for cookie level [" + t + "], new status: " + o, "info"), document.dispatchEvent(n.cookieConsent.events.cc_userChangedConsent), !0 === o ? (n.cookieConsent.userConsent.acceptLevel(t), i.innerHTML = n.cookieConsent.i18n.$t("dialog", "active")) : (n.cookieConsent.userConsent.rejectLevel(t), i.innerHTML = n.cookieConsent.i18n.$t("dialog", "inactive"))
                    }), t.appendChild(o, a), t.appendChild(o, r)
                } else {
                    var r, s = document.createElement("input");
                    s.setAttribute("cookie_consent_toggler", "true"), s.setAttribute("type", "checkbox"), s.setAttribute("checked", "checked"), s.setAttribute("disabled", "disabled"), s.setAttribute("class", "checkbox_cookie_consent"), s.setAttribute("id", e.id), s.setAttribute("name", e.id), (r = document.createElement("label")).setAttribute("for", e.id), r.innerHTML = n.cookieConsent.i18n.$t("dialog", "always_active"), t.appendChild(o, s), t.appendChild(o, r)
                }
                return o
            }, e
        }(),
        A = function () {
            function e(e) {
                this.dialog = null, this.dialogOverlay = null, this.dialogExtraCss = [], this.cookieConsent = e, this.dialogExtraCss.push(e.colorPalette.getClass())
            }
            return e.prototype.initDialog = function () {
                return null === this.dialog && (this.dialog = this.createDialog()), t.appendChild("body", this.dialog, "afterbegin"), this.cookieConsent.log("Consent dialog shown", "info"), document.dispatchEvent(this.cookieConsent.events.cc_dialogShown), !0
            }, e.prototype.hideDialog = function () {
                try {
                    this.dialog.classList.add("hidden"), this.cookieConsent.log("Consent dialog hidden", "info")
                } catch (e) {}
            }, e.prototype.createDialog = function () {
                var e = document.createElement("div");
                if (e.classList.add("cc_css_reboot"), e.classList.add("cc_dialog"), this.dialogExtraCss.length)
                    for (var n = 0, o = this.dialogExtraCss; n < o.length; n++) {
                        var i = o[n];
                        e.classList.add(i)
                    }
                if (t.appendChild(e, this.createDialogContent()), "interstitial" === this.cookieConsent.userNoticeType) {
                    var a = document.createElement("div");
                    return a.classList.add("cc_overlay_lock"), t.appendChild(a, e), a
                }
                return e
            }, e.prototype.createDialogContent = function () {
                var e = this,
                    n = document.createElement("div"),
                    o = document.createElement("h1");
                o.classList.add("cc_dialog_headline"), o.innerText = e.cookieConsent.i18n.$t("dialog", "title");
                var i = document.createElement("div"),
                    a = document.createElement("p");
                a.classList.add("cc_dialog_text"), a.innerHTML = e.cookieConsent.i18n.$t("dialog", "text"), t.appendChild(i, a);
                var r = document.createElement("button");
                r.classList.add("cc_b_ok"), "express" == e.cookieConsent.userConsentType ? r.innerHTML = e.cookieConsent.i18n.$t("dialog", "i_agree_text") : r.innerHTML = e.cookieConsent.i18n.$t("dialog", "ok_text"), r.addEventListener("click", function () {
                    document.dispatchEvent(e.cookieConsent.events.cc_dialogOkPressed)
                });
                var s = document.createElement("button");
                s.classList.add("cc_b_cp"), s.classList.add("ml-1"), s.innerHTML = e.cookieConsent.i18n.$t("dialog", "change_settings"), s.addEventListener("click", function () {
                    document.dispatchEvent(e.cookieConsent.events.cc_dialogPreferencesPressed)
                });
                var c = document.createElement("div");
                return t.appendChild(c, r), t.appendChild(c, s), t.appendChild(n, o), t.appendChild(n, i), t.appendChild(n, c), n
            }, e
        }(),
        P = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("simple"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return z(n, e), n
        }(A),
        I = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("headline"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return z(n, e), n
        }(A),
        T = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("interstitial"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return z(n, e), n
        }(A),
        O = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.dialogExtraCss.push("standalone"), o.dialogExtraCss.push("px-5"), o.dialogExtraCss.push("py-5"), o
            }
            return z(n, e), n
        }(A),
        U = function () {
            function e(e) {
                e.log("ConsentType main class initialized", "info")
            }
            return e.prototype.loadInitialCookies = function () {}, e
        }(),
        N = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return z(n, e), n.prototype.loadInitialCookies = function () {
                var e = this.cookieConsent.cookieLevels.cookieLevels[0].id;
                this.cookieConsent.userConsent.loadCookiesUntilAndInclude = e.toString(), this.cookieConsent.userConsent.loadCookiesUntilMaxLevel()
            }, n
        }(U),
        D = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return z(n, e), n.prototype.loadInitialCookies = function () {
                var e = this.cookieConsent.cookieLevels.cookieLevels.length,
                    n = this.cookieConsent.cookieLevels.cookieLevels[e - 1].id;
                this.cookieConsent.userConsent.loadCookiesUntilAndInclude = n.toString(), this.cookieConsent.userConsent.loadCookiesUntilMaxLevel()
            }, n
        }(U),
        M = function () {
            function e(e) {
                this.cookieConsent = e
            }
            return e.prototype.getClass = function () {
                return "light"
            }, e
        }(),
        q = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return z(n, e), n.prototype.getClass = function () {
                return "dark"
            }, n
        }(M),
        W = function (e) {
            function n(n) {
                var o = e.call(this, n) || this;
                return o.cookieConsent = n, o
            }
            return z(n, e), n.prototype.getClass = function () {
                return "light"
            }, n
        }(M),
        B = function () {
            function e(e) {
                switch (this.debug = !1, this.ownerWebsiteName = e.website_name || "", this.cookiesPolicyUrl = e.cookies_policy_url || null, this.userConsentType = e.consent_type || "express", this.userNoticeType = e.notice_banner_type || "headline", this.userColorPalette = e.palette || "light", this.ownerSiteLanguage = e.language || "en", this.userLanguageStrings = e.language_overwrite || {}, this.changePreferencesSelector = e.change_preferences_selector || null, this.isDemo = "true" == e.demo, this.debug = "true" == e.debug, this.userConsentType) {
                    default:
                    case "express":
                        this.consentType = new N(this);
                        break;
                    case "implied":
                        this.consentType = new D(this)
                }
                switch (this.userColorPalette) {
                    default:
                    case "dark":
                        this.colorPalette = new q(this);
                        break;
                    case "light":
                        this.colorPalette = new W(this)
                }
                switch (this.userNoticeType) {
                    default:
                    case "simple":
                        this.consentBanner = new P(this);
                        break;
                    case "headline":
                        this.consentBanner = new I(this);
                        break;
                    case "interstitial":
                        this.consentBanner = new T(this);
                        break;
                    case "standalone":
                        this.consentBanner = new O(this)
                }
                this.events = new x, this.eventsListeners = new L(this), this.i18n = new b(this), this.cookieLevels = new E(this), this.userConsent = new C(this), this.javascriptItems = new j(this), this.consentPreferences = new S(this), null !== this.changePreferencesSelector && this.consentPreferences.listenToUserButtonToOpenPreferences(this.changePreferencesSelector), !0 === this.userConsent.userAccepted ? (this.userConsent.loadAcceptedCookies(), !0 === this.isDemo && this.consentBanner.initDialog()) : (this.consentBanner.initDialog(), this.consentType.loadInitialCookies())
            }
            return e.prototype.log = function (e, n, o) {
                void 0 === o && (o = "log"), !0 === this.debug && ("log" === o ? console.log("[" + n + "]", e) : "table" === o && console.log("[" + n + "]", e))
            }, e
        }(),
        R = function (e) {
            return w = new B(e)
        }
}]);