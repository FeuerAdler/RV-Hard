document.addEventListener("DOMContentLoaded", function () {

    // Cookie-Banner nicht auf Datenschutz-Seite anzeigen
    if (window.location.pathname === "/datenschutz.html") return;

    // Funktion zum Laden der externen Inhalte nach Zustimmung
    function loadConsentContent(acceptAll = false) {
    document.querySelectorAll(".consent-placeholder").forEach(container => {
        const type = container.dataset.type || "iframe";
        const src = container.dataset.src;
        const height = container.dataset.height || "400";

        // Technisch notwendige Inhalte immer laden, alle Drittanbieter nur bei acceptAll
        if (!acceptAll && type !== "iframe" && type !== "embedsocial") return;
        if (!acceptAll && (type === "iframe" || type === "embedsocial")) return; // nur Notwendige laden

        // Platzhalter entfernen
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


    // Cookie-Banner erstellen, wenn noch keine Wahl getroffen
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
                .cookie-content {
                    background:#fff; color:#333; max-width:600px; width:90%;
                    padding:2rem; border-radius:10px; text-align:left;
                    box-shadow:0 4px 15px rgba(0,0,0,0.3);
                    overflow-y:auto; max-height:90%;
                }
                .cookie-buttons {
                    display:flex; gap:1rem; margin-top:1rem; flex-wrap:wrap;
                }
                .cookie-buttons button {
                    padding:0.7rem 1rem; border:none; border-radius:5px;
                    font-size:0.95rem; cursor:pointer; flex: 1 1 auto;
                }
                #cookie-accept-all { background:#28a745; color:#fff; }
                #cookie-decline { background:#dc3545; color:#fff; }
                #cookie-more-link {
                    color:#ffc107; cursor:pointer; display:block;
                    margin-top:0.5rem; text-decoration:underline;
                }
                #cookie-details {
                    display:none;
                    margin-top:1rem;
                    background:#fafafa;
                    padding:1rem;
                    border-radius:8px;
                    border:1px solid #ddd;
                    max-height:300px;
                    overflow-y:auto;
                }
                #cookie-details table {
                    width:100%;
                    border-collapse:collapse;
                    margin-bottom:1rem;
                }
                #cookie-details th, #cookie-details td {
                    border:1px solid #ccc;
                    padding:0.5rem;
                    text-align:left;
                    font-size:0.9rem;
                }
                #cookie-details th { background:#eee; font-weight:bold; }
                #cookie-details a { color:#ffc107; text-decoration:underline; }
                @media (max-width: 480px) {
                    .cookie-content { padding:1rem; width:95%; }
                    #cookie-details { max-height:200px; }
                }
            </style>
            <div class="cookie-content">
                <p>
                    <strong>Wir verwenden Cookies.</strong><br>
                    Einige Cookies sind technisch notwendig für den Betrieb dieser Website. Externe Inhalte (YouTube, RaceResult, Instagram/EmbedSocial) werden nur mit Ihrer Zustimmung geladen.
                </p>
                <span id="cookie-more-link">Mehr erfahren</span>
                <div id="cookie-details">
                    <table>
                        <thead>
                            <tr><th>Kategorie</th><th>Zweck</th><th>Anbieter</th><th>Speicherdauer</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Notwendig</td>
                                <td>Grundfunktionen der Website</td>
                                <td>RV Hard</td>
                                <td>bis Sitzungsende</td>
                            </tr>
                            <tr>
                                <td>Externe Inhalte</td>
                                <td>Social-Feed-Einbindung</td>
                                <td>EmbedSocial</td>
                                <td>ca. 25 Monate</td>
                            </tr>
                            <tr>
                                <td>Externe Inhalte</td>
                                <td>Ergebnislisten & Anmeldungen</td>
                                <td>RaceResult</td>
                                <td>ca. 23 Monate</td>
                            </tr>
                            <tr>
                                <td>Externe Inhalte (Video)</td>
                                <td>Videoeinbettungen</td>
                                <td>YouTube / Google</td>
                                <td>ca. 12 Monate</td>
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

        // "Mehr erfahren" toggle
        const moreLink = document.getElementById("cookie-more-link");
        const detailsBox = document.getElementById("cookie-details");
        moreLink.addEventListener("click", function(){
            detailsBox.style.display = (detailsBox.style.display === 'none' || detailsBox.style.display === '') ? 'block' : 'none';
        });

        // Buttons
        document.getElementById("cookie-accept-all").addEventListener("click", function(){
            localStorage.setItem("cookieChoice", "accepted");
            document.getElementById("cookie-banner")?.remove();
            loadConsentContent(true); // alle Inhalte laden
        });

        document.getElementById("cookie-decline").addEventListener("click", function(){
            localStorage.setItem("cookieChoice", "declined");
            document.getElementById("cookie-banner")?.remove();
            loadConsentContent(false); // nur technisch notwendige Inhalte laden
        });

    } else if (localStorage.getItem("cookieChoice") === "accepted") {
        loadConsentContent(true);
    } else if (localStorage.getItem("cookieChoice") === "declined") {
        loadConsentContent(false);
    }

    // Delegierter Eventlistener für alle Platzhalter-Buttons
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("accept-cookies-btn")) {
        // Cookie als akzeptiert speichern
        localStorage.setItem("cookieChoice", "accepted");

        // Cookie-Banner entfernen, falls noch sichtbar
        const banner = document.getElementById("cookie-banner");
        if (banner) banner.remove();

        // Externe Inhalte laden
        loadConsentContent(true);

        // Platzhalter-Box selbst entfernen
        const placeholderDiv = e.target.closest(".consent-placeholder")?.querySelector("div");
        if (placeholderDiv) placeholderDiv.remove();
    }
})
});
