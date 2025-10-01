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

            } else if (type === "embedsocial") {
                container.classList.add("embedsocial-hashtag");
                container.setAttribute("data-ref", container.dataset.ref);

                if (!document.getElementById("EmbedSocialHashtagScript")) {
                    const script = document.createElement("script");
                    script.id = "EmbedSocialHashtagScript";
                    script.src = src;
                    script.async = true;
                    document.head.appendChild(script);
                } else {
                    if (typeof window.EmbedSocialHashtag !== "undefined") {
                        window.EmbedSocialHashtag.load();
                    }
                }
            }
        });
    }

    if (!localStorage.getItem("cookieChoice")) {

        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.style.cssText = `
            position: fixed; top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.6); display:flex;
            justify-content:center; align-items:center;
            z-index:10000; font-size:0.95rem; padding:1rem;
        `;

        banner.innerHTML = `
            <style>
                body.cookie-open { overflow: hidden; }

                .cookie-content {
                    background:#fff; color:#333; max-width:600px; width:90%;
                    padding:1.5rem; border-radius:10px; text-align:left;
                    box-shadow:0 4px 15px rgba(0,0,0,0.3);
                    max-height:80%;
                    display:flex;
                    flex-direction:column;
                }
                .cookie-text { margin-bottom:1rem; }
                .cookie-details-container {
                    display:none;
                    overflow-y:auto;
                    max-height:40%;
                    border:1px solid #ddd;
                    border-radius:8px;
                    background:#fafafa;
                    padding:1rem;
                    margin-bottom:1rem;
                }
                .cookie-details-container table {
                    width:100%;
                    border-collapse:collapse;
                    table-layout: fixed;
                    word-wrap: break-word;
                }
                .cookie-details-container th, .cookie-details-container td {
                    border:1px solid #ccc;
                    padding:0.5rem;
                    text-align:left;
                    font-size:0.9rem;
                }
                .cookie-details-container th { background:#eee; font-weight:bold; }
                #cookie-more-link { color:#ffc107; cursor:pointer; margin-bottom:0.5rem; display:block; text-decoration:underline; }

                .cookie-buttons {
                    display:flex; gap:1rem; flex-wrap:wrap; margin-top:auto;
                }
                .cookie-buttons button {
                    flex: 1 1 auto; padding:0.7rem 1rem; border:none; border-radius:5px;
                    font-size:0.95rem; cursor:pointer; background:#ffc107; color:#000;
                }
                .cookie-buttons button:hover { opacity:0.9; }

                @media (max-width: 480px) {
                    .cookie-content { width:95%; padding:1rem; max-height:90%; }
                    .cookie-details-container { max-height:50%; }
                    .cookie-details-container table, .cookie-details-container thead, .cookie-details-container tbody, .cookie-details-container th, .cookie-details-container td, .cookie-details-container tr {
                        display:block;
                    }
                    .cookie-details-container thead { display:none; }
                    .cookie-details-container tr { margin-bottom:0.75rem; border-bottom:1px solid #ccc; padding-bottom:0.25rem; }
                    .cookie-details-container td {
                        border:none; padding:0.25rem 0; position: relative; padding-left: 50%;
                    }
                    .cookie-details-container td:before {
                        position: absolute; left:0; width:45%; padding-left:0.5rem; font-weight:bold;
                        white-space: nowrap; content: attr(data-label);
                    }
                }
            </style>
            <div class="cookie-content">
                <div class="cookie-text">
                    <strong>Wir verwenden Cookies.</strong><br>
                    Einige Cookies sind technisch notwendig für den Betrieb dieser Website. 
                    Externe Inhalte (YouTube, RaceResult, Instagram/EmbedSocial) werden nur mit Ihrer Zustimmung geladen.
                </div>
                <span id="cookie-more-link">Mehr erfahren</span>
                <div class="cookie-details-container" id="cookie-details">
                    <table>
                        <thead>
                            <tr><th>Kategorie</th><th>Zweck</th><th>Anbieter</th><th>Speicherdauer</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Kategorie">Notwendig</td>
                                <td data-label="Zweck">Grundfunktionen der Website</td>
                                <td data-label="Anbieter">RV Hard</td>
                                <td data-label="Speicherdauer">bis Sitzungsende</td>
                            </tr>
                            <tr>
                                <td data-label="Kategorie">Externe Inhalte</td>
                                <td data-label="Zweck">Social-Feed-Einbindung</td>
                                <td data-label="Anbieter">EmbedSocial</td>
                                <td data-label="Speicherdauer">ca. 25 Monate</td>
                            </tr>
                            <tr>
                                <td data-label="Kategorie">Externe Inhalte</td>
                                <td data-label="Zweck">Ergebnislisten & Anmeldungen</td>
                                <td data-label="Anbieter">RaceResult</td>
                                <td data-label="Speicherdauer">ca. 23 Monate</td>
                            </tr>
                            <tr>
                                <td data-label="Kategorie">Externe Inhalte (Video)</td>
                                <td data-label="Zweck">Videoeinbettungen</td>
                                <td data-label="Anbieter">YouTube / Google</td>
                                <td data-label="Speicherdauer">ca. 12 Monate</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-accept-all">Alle Cookies akzeptieren</button>
                    <button id="cookie-decline">Nur technisch notwendige Cookies</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        document.body.classList.add("cookie-open");

        const moreLink = document.getElementById("cookie-more-link");
        const detailsBox = document.getElementById("cookie-details");
        moreLink.addEventListener("click", function(){
            detailsBox.style.display = (detailsBox.style.display === 'none' || detailsBox.style.display === '') ? 'block' : 'none';
        });

        function closeBanner(acceptAll) {
            localStorage.setItem("cookieChoice", acceptAll ? "accepted" : "declined");
            document.getElementById("cookie-banner")?.remove();
            document.body.classList.remove("cookie-open");
            loadConsentContent(acceptAll);
        }

        document.getElementById("cookie-accept-all").addEventListener("click", function(){ closeBanner(true); });
        document.getElementById("cookie-decline").addEventListener("click", function(){ closeBanner(false); });

    } else if (localStorage.getItem("cookieChoice") === "accepted") {
        loadConsentContent(true);
    } else if (localStorage.getItem("cookieChoice") === "declined") {
        loadConsentContent(false);
    }

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("accept-cookies-btn")) {
            localStorage.setItem("cookieChoice", "accepted");
            const banner = document.getElementById("cookie-banner");
            if (banner) banner.remove();
            document.body.classList.remove("cookie-open");
            loadConsentContent(true);
            const placeholderDiv = e.target.closest(".consent-placeholder")?.querySelector("div");
            if (placeholderDiv) placeholderDiv.remove();
        }
    });

});
