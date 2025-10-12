document.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname === "/datenschutz.html") return;

    function loadConsentContent(acceptAll = false) {
        document.querySelectorAll(".consent-placeholder").forEach(container => {
            const type = container.dataset.type || "iframe";
            const src = container.dataset.src;
            const height = container.dataset.height || "400";

            if (!acceptAll && (type === "iframe" || type === "embedsocial")) return;

            container.innerHTML = "";

            if (type === "iframe") {
                const iframe = document.createElement("iframe");
                iframe.src = src;
                iframe.width = "100%";
                iframe.height = height;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowFullscreen = true;
                container.appendChild(iframe);
            } 
            else if (type === "embedsocial") {
                container.classList.add("embedsocial-hashtag");
                container.setAttribute("data-ref", container.dataset.ref);

                if (!document.getElementById("EmbedSocialHashtagScript")) {
                    const script = document.createElement("script");
                    script.id = "EmbedSocialHashtagScript";
                    script.src = src;
                    script.async = true;
                    document.head.appendChild(script);
                } 
                else if (typeof window.EmbedSocialHashtag !== "undefined") {
                    window.EmbedSocialHashtag.load();
                }
            }
        });
    }

    if (!localStorage.getItem("cookieChoice")) {

        const overlay = document.createElement("div");
        overlay.id = "cookie-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            backdrop-filter: blur(5px);
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.style.cssText = `
            background: #fff;
            color: #000;
            max-width: 600px;
            width: 90%;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 25px rgba(0,0,0,0.3);
            font-size: 0.95rem;
            line-height: 1.5;
            display: flex;
            flex-direction: column;
            text-align: left;
        `;

        banner.innerHTML = `
            <style>
                #cookie-banner a {
                    color: #ffc107;
                    text-decoration: underline;
                }

                .cookie-actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .cookie-actions button {
                    padding: 12px 18px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }

                #open-preferences {
                    background: #f0f0f0;
                    color: #000;
                }

                #accept-all {
                    background: #ffc107;
                    color: #000;
                }

                #accept-all:hover {
                    background: #e0a800;
                }

                #cookie-detailed {
                    display: none;
                    margin-top: 1rem;
                    border-top: 1px solid #ddd;
                    padding-top: 1rem;
                }

                .cookie-checkbox {
                    margin-bottom: 1rem;
                    padding: 1rem;
                    border-radius: 8px;
                    background: #f7f7f7;
                }

                .cookie-checkbox input[type="checkbox"] {
                    transform: scale(1.2);
                    accent-color: #ffc107;
                    margin-right: 8px;
                }

                .cookie-checkbox label {
                    font-weight: 700;
                }

                .save-pref {
                    background: #f0f0f0;
                    color: #000;
                    border: none;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 0.5rem;
                }

                .save-pref:hover {
                    background: #ddd;
                }

                @media (max-width: 600px) {
                    #cookie-banner {
                        padding: 1.2rem;
                        width: 90%;
                        font-size: 0.9rem;
                    }

                    .cookie-actions {
                        flex-direction: column-reverse;
                        align-items: stretch;
                    }

                    .cookie-actions button {
                        width: 100%;
                    }
                }
            </style>

            <div class="cookie-text">
                <h3 style="margin-top:0;">Cookie-Informationen</h3>
                Wir verwenden Cookies, um die Funktionalität der Seite zu gewährleisten.
                Externe Inhalte (YouTube, RaceResult, Instagram/EmbedSocial) werden nur mit deiner Zustimmung geladen.
                Weitere Informationen findest du in unserer
                <a href="/datenschutz.html">Datenschutzerklärung</a>.
            </div>

            <div class="cookie-actions">
                <button id="open-preferences">Cookie-Präferenzen</button>
                <button id="accept-all">Alle akzeptieren</button>
            </div>

            <div id="cookie-detailed">
                <div class="cookie-checkbox">
                    <input type="checkbox" id="chk-necessary" checked disabled>
                    <label for="chk-necessary">Notwendige Cookies</label>
                    <div style="font-size:0.9rem;">Diese Cookies sind erforderlich, um die grundlegende Funktionalität dieser Website zu gewährleisten.</div>
                </div>

                <div class="cookie-checkbox">
                    <input type="checkbox" id="chk-external">
                    <label for="chk-external">Externe Inhalte (YouTube, RaceResult, EmbedSocial)</label>
                    <div style="font-size:0.9rem;">Diese Inhalte werden von Drittanbietern geladen. Wenn du sie aktivierst, können Daten (z. B. IP-Adresse) an diese Anbieter übermittelt werden.</div>
                </div>

                <div style="text-align:right;">
                    <button class="save-pref" id="save-preferences">Präferenzen speichern</button>
                </div>
            </div>
        `;

        overlay.appendChild(banner);
        document.body.appendChild(overlay);
        document.body.classList.add("cookie-open");

        const openPrefBtn = document.getElementById("open-preferences");
        const acceptAllBtn = document.getElementById("accept-all");
        const detailsEl = document.getElementById("cookie-detailed");
        const savePrefBtn = document.getElementById("save-preferences");
        const chkExternal = document.getElementById("chk-external");

        openPrefBtn.addEventListener("click", () => {
            detailsEl.style.display = "block";
            openPrefBtn.style.display = "none";
        });

        acceptAllBtn.addEventListener("click", () => {
            localStorage.setItem("cookieChoice", JSON.stringify({
                necessary: true,
                external: true
            }));
            overlay.remove();
            loadConsentContent(true);
        });

        savePrefBtn.addEventListener("click", () => {
            localStorage.setItem("cookieChoice", JSON.stringify({
                necessary: true,
                external: chkExternal.checked
            }));
            overlay.remove();
            loadConsentContent(chkExternal.checked);
        });

    } else {
        const choice = JSON.parse(localStorage.getItem("cookieChoice"));
        loadConsentContent(choice.external);
    }

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("accept-cookies-btn")) {
            localStorage.setItem("cookieChoice", JSON.stringify({
                necessary: true,
                external: true
            }));
            const overlay = document.getElementById("cookie-overlay");
            if (overlay) overlay.remove();
            loadConsentContent(true);
        }
    });

});
