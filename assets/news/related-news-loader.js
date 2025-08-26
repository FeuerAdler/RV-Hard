document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.related-news-list');
    if (!container) return;

    const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');

    fetch('/data/News/news.json')
        .then(response => {
            if (!response.ok) throw new Error("news.json konnte nicht geladen werden");
            return response.json();
        })
        .then(newsItems => {
            const currentItem = newsItems.find(item => item.slug === currentSlug);
            if (!currentItem) {
                console.warn("Aktueller Artikel nicht in news.json gefunden.");
                return;
            }

            const currentTags = currentItem.tags || [];

            // Verwandte Artikel finden mit mindestens einem gemeinsamen Tag
            let relatedItems = newsItems.filter(item =>
                item.slug !== currentSlug &&
                item.tags &&
                item.tags.some(tag => currentTags.includes(tag))
            );

            // Wenn keine verwandten Artikel nach Tags gefunden wurden, Zufallsauswahl
            if (relatedItems.length === 0) {
                relatedItems = newsItems.filter(item => item.slug !== currentSlug);
            }

            relatedItems.sort(() => 0.5 - Math.random());

            relatedItems.slice(0, 2).forEach(item => {
                const div = document.createElement("div");
                div.className = "related-news-item";

                div.innerHTML = `
                    <a href="/news/${item.slug}.html">
                        <div class="related-news-thumb" style="background-image: url('${item.image}');"></div>
                        <div class="related-news-text">
                            <h3>${item.title}</h3>
                            <p>${item.content.substring(0, 100)}...</p>
                        </div>
                    </a>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => console.error("Fehler beim Laden verwandter News:", err));
});
