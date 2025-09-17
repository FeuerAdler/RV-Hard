document.addEventListener("DOMContentLoaded", function () {

    // === COOKIE BANNER ===
    if (!localStorage.getItem("cookieChoice")) {
        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.style.cssText = `
            position:fixed;bottom:0;left:0;width:100%;
            background:#f4f4f4;border-top:1px solid #ccc;
            padding:1rem;display:flex;flex-wrap:wrap;
            justify-content:center;align-items:center;gap:1rem;
            z-index:1000;font-size:0.9rem;`;
        banner.innerHTML = `
            <span>Wir verwenden technisch notwendige Cookies. Externe Inhalte (z. B. YouTube, RaceResult, Instagram) werden nur mit Zustimmung geladen. <a href="/datenschutz.html">Mehr erfahren</a></span>
            <button id="cookie-accept-all" style="padding:0.5rem 1rem;background:#28a745;color:#fff;border:none;border-radius:5px;cursor:pointer;">Alles akzeptieren</button>
            <button id="cookie-decline" style="padding:0.5rem 1rem;background:#dc3545;color:#fff;border:none;border-radius:5px;cursor:pointer;">Nur notwendige</button>
        `;
        document.body.appendChild(banner);

        document.getElementById("cookie-accept-all").addEventListener("click", function () {
            localStorage.setItem("cookieChoice", "accepted");
            banner.remove();
            loadConsentContent(); // Iframes direkt laden
        });

        document.getElementById("cookie-decline").addEventListener("click", function () {
            localStorage.setItem("cookieChoice", "declined");
            banner.remove();
        });

    } else if (localStorage.getItem("cookieChoice") === "accepted") {
        loadConsentContent();
    }

    // === FUNKTION: PLATZHALTER-INHALTE LADEN ===
    function loadConsentContent() {
        document.querySelectorAll(".consent-placeholder").forEach(container => {
            const type = container.dataset.type || "iframe";
            const src = container.dataset.src;
            const height = container.dataset.height || "400";

            container.innerHTML = ""; // Platzhalter entfernen

            if (type === "iframe") {
                // RaceResult oder YouTube
                const iframe = document.createElement("iframe");
                iframe.src = src;
                iframe.width = "100%";
                iframe.height = height;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowFullscreen = true;
                container.appendChild(iframe);

            } else if (type === "embedsocial") {
                // EmbedSocial
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

    // === BUTTON INNERHALB DER PLATZHALTER ===
    document.addEventListener("click", e => {
        if (e.target.classList.contains("accept-cookies-btn")) {
            localStorage.setItem("cookieChoice", "accepted");
            document.getElementById("cookie-banner")?.remove(); // Banner entfernen, falls noch sichtbar
            loadConsentContent(); // Inhalte sofort laden
        }
    });

}); 

// === FUNKTION: EINSTELLUNGEN ÄNDERN ===
function openCookieSettings() {
    localStorage.removeItem("cookieChoice");
    location.reload();
}
