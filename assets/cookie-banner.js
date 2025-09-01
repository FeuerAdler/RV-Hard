document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("cookieAccepted") === "true") return;

    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.style.cssText = "position:fixed;bottom:0;left:0;width:100%;background:#f4f4f4;border-top:1px solid #ccc;padding:1rem;display:flex;justify-content:center;align-items:center;gap:1rem;z-index:1000;font-size:0.9rem;";
    banner.innerHTML = `
        <span>Diese Internetseite verwendet Cookies, um die Nutzererfahrung zu verbessern und den Benutzern bestimmte Dienste und Funktionen bereitzustellen. <a href="/datenschutz.html">Mehr erfahren</a></span>
        <button id="cookie-ok-btn" style="padding:0.5rem 1rem;background-color:#333;color:#fff;border:none;border-radius:5px;cursor:pointer;" autofocus>OK</button>
    `;
    document.body.appendChild(banner);

    document.getElementById("cookie-ok-btn").addEventListener("click", function() {
        banner.style.display = "none";
        localStorage.setItem("cookieAccepted", "true");
    });
});
