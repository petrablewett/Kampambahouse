// Kampamba House - Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryFilters();
    initializeLightbox();
});

// Gallery filtering functionality
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--dark-brown)';
                btn.style.border = '2px solid var(--dark-brown)';
                btn.classList.remove('active');
            });

            this.style.backgroundColor = 'var(--dark-brown)';
            this.style.color = 'var(--off-white)';
            this.style.border = 'none';
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox functionality
function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-lightbox');
    const nextBtn = document.querySelector('.next-lightbox');

    let currentIndex = 0;
    let visibleItems = [];

    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get currently visible items
            visibleItems = Array.from(galleryItems).filter(item => {
                return window.getComputedStyle(item).display !== 'none';
            });

            currentIndex = visibleItems.indexOf(this);
            openLightbox(this.querySelector('img').src);
        });
    });

    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
        });
    }

    // Next image
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % visibleItems.length;
            lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % visibleItems.length;
                lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
            }
        }
    });

    function openLightbox(imgSrc) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
    }
}
