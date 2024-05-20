document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('imageGallery');
    let currentIndex = 0;

    // Event-Listener für alle Bilder in der Galerie hinzufügen
    document.querySelectorAll('.gjs-image-box').forEach((imageBox, index) => {
        imageBox.addEventListener('click', function() {
            showImageDetails(this, index);
        });
    });

    // Funktion zum Anzeigen der Bilderdetails
    function showImageDetails(imageBox, index) {
        // Vergrößere das Bild und blurre den Hintergrund
        imageBox.classList.add('zoomed');
        document.body.classList.add('blurred');

        // Erstelle ein Container-Div für Bilderdetails
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('image-details');

        // Füge Like- und Kommentar-Buttons hinzu
        detailsContainer.innerHTML = `
        <div class="like-button">Like</div>
        <div class="comment-button">Kommentieren</div>
        <div class="close-button">X</div>
        `;

        // Füge den Container zu gallery hinzu
        gallery.appendChild(detailsContainer);

        // Event-Listener für Like- und Kommentar-Buttons hinzufügen
        detailsContainer.querySelector('.like-button').addEventListener('click', function() {
            // Implementiere deine Like-Funktionalität hier
            alert('Liked!');
        });

        detailsContainer.querySelector('.comment-button').addEventListener('click', function() {
            // Implementiere deine Kommentar-Funktionalität hier
            alert('Kommentieren...');
        });

        detailsContainer.querySelector('.close-button').addEventListener('click', function() {
            hideImageDetails();
        });

        // Aktualisiere den aktuellen Index
        currentIndex = index;
    }

    // Funktion zum Ausblenden der Bilderdetails
    function hideImageDetails() {
        // Zurücksetzen des zoomed und blurred Zustands
        document.querySelector('.gjs-image-box.zoomed').classList.remove('zoomed');
        document.body.classList.remove('blurred');

        // Entferne das Bilderdetails-Container
        const detailsContainer = document.querySelector('.image-details');
        if (detailsContainer) {
            detailsContainer.remove();
        }
    }

    // Event-Listener für Swipe-Gesten hinzufügen
    gallery.addEventListener('touchstart', handleTouchStart, false);
    gallery.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
    };

    function handleTouchMove(evt) {
        if (!xDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let xDiff = xDown - xUp;

        if (xDiff > 0) {
            // Swipe nach links (nächstes Bild anzeigen)
            showNextImage();
        } else {
            // Swipe nach rechts (vorheriges Bild anzeigen)
            showPreviousImage();
        }

        // Zurücksetzen von xDown, um wiederholte Gesten zu erkennen
        xDown = null;
    };

    // Funktion zum Anzeigen des nächsten Bildes
    function showNextImage() {
        if (currentIndex < gallery.children.length - 1) {
            hideImageDetails();
            currentIndex++;
            showImageDetails(gallery.children[currentIndex], currentIndex);
        }
    }

    // Funktion zum Anzeigen des vorherigen Bildes
    function showPreviousImage() {
        if (currentIndex > 0) {
            hideImageDetails();
            currentIndex--;
            showImageDetails(gallery.children[currentIndex], currentIndex);
        }
    }
});
