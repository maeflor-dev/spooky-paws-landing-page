     document.addEventListener('DOMContentLoaded', () => {
            // 1. Mobile Navigation Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');

            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            });

            // Close mobile menu on link click
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                });
            });

            // 2. Mobile Split-Screen Toggle for Hero
            const mobileToggleBtns = document.querySelectorAll('.mobile-toggle-btn');
            const paneLight = document.getElementById('pane-light');
            const paneDark = document.getElementById('pane-dark');

            mobileToggleBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    mobileToggleBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const target = btn.getAttribute('data-target');
                    if (target === 'light') {
                        paneLight.classList.add('mobile-active');
                        paneDark.classList.remove('mobile-active');
                    } else {
                        paneDark.classList.add('mobile-active');
                        paneLight.classList.remove('mobile-active');
                    }
                });
            });

            // 3. Responsive Flashlight Mask Tracking (Mouse & Touch)
            const flashlightSection = document.getElementById('flashlightSection');
            const flashlightMask = document.getElementById('flashlightMask');

            function updateFlashlight(clientX, clientY) {
                const rect = flashlightSection.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                flashlightMask.style.setProperty('--x', `${x}px`);
                flashlightMask.style.setProperty('--y', `${y}px`);
            }

            flashlightSection.addEventListener('mousemove', (e) => {
                updateFlashlight(e.clientX, e.clientY);
            });

            flashlightSection.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    updateFlashlight(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });

            // 4. Gallery Filtering System
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.getAttribute('data-filter');

                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // 5. Appointment Booking Form Submission & Toast
            const appointmentForm = document.getElementById('appointmentForm');
            const toastNotification = document.getElementById('toastNotification');
            const toastMessage = document.getElementById('toastMessage');

            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const owner = document.getElementById('ownerName').value;
                const pet = document.getElementById('petName').value;
                const groomerSelect = document.getElementById('groomerSelect');
                const selectedGroomerText = groomerSelect.options[groomerSelect.selectedIndex].text;

               toastMessage.textContent = `Thank you, ${owner}! Your request for ${pet} with ${selectedGroomerText} has been received. This is a demo, so no real appointment was made.`;
                toastNotification.classList.add('active');

                appointmentForm.reset();

                setTimeout(() => {
                    toastNotification.classList.remove('active');
                }, 5000);
            });
        });

        // 6. Quick Select Groomer Function from Team Cards
        function selectGroomer(groomerValue) {
            const groomerSelect = document.getElementById('groomerSelect');
            if (groomerSelect) {
                groomerSelect.value = groomerValue;
            }
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // 7. Lightbox Functions
        function openLightbox(element) {
            const modal = document.getElementById('lightboxModal');
            const img = document.getElementById('lightboxImg');
            const title = document.getElementById('lightboxTitle');
            const desc = document.getElementById('lightboxDesc');

            const sourceImg = element.querySelector('img').src;
            const heading = element.querySelector('h4').textContent;
            const description = element.querySelector('p').textContent;

            img.src = sourceImg;
            title.textContent = heading;
            desc.textContent = description;

            modal.classList.add('active');
        }

        function closeLightbox() {
            const modal = document.getElementById('lightboxModal');
            modal.classList.remove('active');
        }

        // Close lightbox on background click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('lightboxModal');
            if (e.target === modal) {
                closeLightbox();
            }
        });