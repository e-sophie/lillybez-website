document.addEventListener('DOMContentLoaded', () => {
    // responsive navigation menu
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    if (menuBtn && navigation) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navigation.classList.toggle('active');
        });
    }

    // picture slider navigation (clip-path reveal) with autoplay; a separate vision section will slide up
    const home = document.querySelector('.home');
    const vision = document.querySelector('.vision');
    const btns = Array.from(document.querySelectorAll('.slider-navigation .nav-btn'));
    const slides = Array.from(document.querySelectorAll('.bg'));

    if (!home || slides.length === 0 || btns.length === 0) return;

    const totalItems = slides.length + 1; // extra item is the vision section

    // default clip center
    slides.forEach(s => s.style.setProperty('--clip-center', '50% 50%'));

    // initialize
    slides.forEach(s => s.classList.remove('active'));
    if (vision) vision.classList.remove('active');
    btns.forEach(b => b.classList.remove('active'));
    let current = 0;
    slides[current].classList.add('active');
    btns[current].classList.add('active');

    function setClipCenterForSlideFromDot(slide, dot) {
        const homeRect = home.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();
        const centerX = dotRect.left + dotRect.width / 2 - homeRect.left;
        const centerY = dotRect.top + dotRect.height / 2 - homeRect.top;
        const xPercent = (centerX / homeRect.width) * 100;
        const yPercent = (centerY / homeRect.height) * 100;
        slide.style.setProperty('--clip-center', `${xPercent}% ${yPercent}%`);
    }


    document.addEventListener("DOMContentLoaded", function () {

        let slides = document.querySelectorAll(".story-slide");
        let currentIndex = 0;

        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }

        function nextSlide() {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            showSlide(currentIndex);
        }

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        // Auto slide
        setInterval(nextSlide, 6000);

    });


    function showVision() {
        // hide slides and show vision section by sliding it up
        slides.forEach(s => s.classList.remove('active'));
        if (!vision) return;
        vision.classList.remove('active');
        // small delay to ensure transition restarts
        // eslint-disable-next-line no-unused-expressions
        vision.offsetWidth;
        vision.classList.add('active');
        // also scroll to the vision section smoothly
        vision.scrollIntoView({ behavior: 'smooth' });
    }

    function hideVision() {
        if (vision) vision.classList.remove('active');
    }

    function activateItem(index, dot) {
        if (index < slides.length) {
            hideVision();
            const target = slides[index];
            if (dot) setClipCenterForSlideFromDot(target, dot);
            slides.forEach(s => s.classList.remove('active'));
            btns.forEach(b => b.classList.remove('active'));
            // restart clip animation
            // eslint-disable-next-line no-unused-expressions
            target.offsetWidth;
            target.classList.add('active');
            btns[index].classList.add('active');
        } else {
            slides.forEach(s => s.classList.remove('active'));
            btns.forEach(b => b.classList.remove('active'));
            showVision();
        }
        current = index;
    }

    // attach dot handlers (only for slides)
    btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            activateItem(i, btn);
            startAutoplay();
        });
    });

    // autoplay across slides + vision section
    const AUTOPLAY_INTERVAL = 5000;
    let autoplayId = null;

    function startAutoplay() {
        stopAutoplay();
        autoplayId = setInterval(() => {
            const next = (current + 1) % totalItems;
            if (next < slides.length) {
                slides[next].style.setProperty('--clip-center', '50% 50%');
            }
            activateItem(next, null);
        }, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        if (autoplayId) clearInterval(autoplayId);
        autoplayId = null;
    }

    home.addEventListener('mouseenter', stopAutoplay);
    home.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
});

// Auto-update year
document.getElementById("year").textContent = new Date().getFullYear();


