document.addEventListener("DOMContentLoaded", () => {
    // Funktion, die ein RaceResult-Iframe in einen Container einfügt
    function loadIframe(container) {
        const src = container.dataset.src;
        if (!src) return;
        const height = container.dataset.height || "700"; // Standardhöhe 700px
        // Platzhalter entfernen, Iframe einfügen
        container.innerHTML = `<iframe src="${src}" width="100%" height="${height}" frameborder="0"></iframe>`;
    }

    // Alle RaceResult-Container auf der Seite finden
    const iframeContainers = document.querySelectorAll(".raceresult-embed-container[data-src]");

    // Prüfen, ob Cookies schon akzeptiert wurden
    if (localStorage.getItem("cookieAccepted") === "true") {
        iframeContainers.forEach(loadIframe);
    } else {
        // Beobachten, bis der Cookie-Banner erzeugt wird
        const observer = new MutationObserver(() => {
            const btn = document.getElementById("cookie-ok-btn");
            if (btn) {
                // Sobald Nutzer auf OK klickt → Iframes laden
                btn.addEventListener("click", () => {
                    iframeContainers.forEach(loadIframe);
                });
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

