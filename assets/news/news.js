// assets/script-news.js

document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.news-detail-gallery-wrapper');

    galleries.forEach(wrapper => {
        const gallery = wrapper.querySelector('.news-detail-gallery');
        const slides = gallery.querySelectorAll('.gallery-slide'); // Jetzt 'gallery-slide' Divs
        const prevButton = wrapper.querySelector('.gallery-control.prev');
        const nextButton = wrapper.querySelector('.gallery-control.next');

        if (slides.length === 0) {
            console.warn("No slides found in gallery:", gallery.id);
            return; // Beende, wenn keine Slides gefunden wurden
        }

        let currentSlide = 0;

        function showSlide(index) {
            // Verstecke alle Slides
            slides.forEach(slide => {
                slide.style.display = 'none';
            });

            // Zeige die aktuelle Slide
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Event Listener für Buttons
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialisiere: Zeige die erste Slide
        showSlide(currentSlide);
    });
});

    document.addEventListener("DOMContentLoaded", () => {
        const currentSlug = "Rennbericht-CadFish-Lübeck-Juni-2024"; // ← passt du pro Seite an
        fetch("/assets/news/news.json")
            .then(res => res.json())
            .then(news => {
                const relatedContainer = document.querySelector(".related-news-list");
                if (!relatedContainer) return;

                // Filtere andere News heraus
                const otherNews = news.filter(item => item.slug !== currentSlug);

                // Optional: mische die Reihenfolge
                otherNews.sort(() => 0.5 - Math.random());

                // Zeige max. 3 weitere News
                otherNews.slice(0, 3).forEach(item => {
                    const div = document.createElement("div");
                    div.className = "related-news-item";
                    div.innerHTML = `
                        <a href="/news/${item.slug}.html">
                            <img src="${item.image}" alt="${item.title}">
                            <h3>${item.title}</h3>
                            <p>${item.content.substring(0, 100)}...</p>
                        </a>
                    `;
                    relatedContainer.appendChild(div);
                });
            })
            .catch(err => {
                console.error("Fehler beim Laden der News:", err);
            });
    });

