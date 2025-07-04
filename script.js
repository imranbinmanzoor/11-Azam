// Sticky Header on Scroll
const header = document.querySelector('.header-bottom');

window.addEventListener('scroll', () => {
  const offset = header.getBoundingClientRect().top;
  if (offset <= 0) {
    header.classList.add('stuck');
  } else {
    header.classList.remove('stuck');
  }
});

// Case Study Company Switch Logic
const companies = document.querySelectorAll(".company");
const descripHeading = document.querySelectorAll(".descrip-heading");
const descriptPara = document.querySelectorAll(".descript-para");
const sessionHeading = document.querySelectorAll(".session-heading");
const usersHeading = document.querySelectorAll(".users-heading");
const viewsHeading = document.querySelectorAll(".views-heading");
const bounceRateHeading = document.querySelectorAll(".bounce-rate-heading");

// Define content data for each company
const caseStudyData = {
  "n-blends": {
    heading: "Nature's Blends",
    para: "Nature's Blends offers herbal and medicinal oil products. With our SEO Strategy, they got 200%+ increase in organic traffic within 1 year.",
    session: "245.49%",
    users: "262.58%",
    views: "277.21%",
    bounce: "-26.97%"
  },
  "money-ad": {
    heading: "Money Advisor",
    para: "Money Advisor helps hundreds of individuals find solutions to get out of debt, with our SEO strategy they get 100%+ traffic increase with 4-month work.",
    session: "114.64%",
    users: "118.57%",
    views: "122.59%",
    bounce: "-16.14%"
  },
  "ic": {
    heading: "IC Insurance Solutions",
    para: "They are experienced insurance brokers, we have developed their website and with our SEO strategy they got 90%+ increase with 6 months work.",
    session: "98.55%",
    users: "94.36%",
    views: "75.55%",
    bounce: "-50.77%"
  },
  "eroc": {
    heading: "Electric Ride on Cars",
    para: "Electric ride on cars is an online toy car shop serving in UK. With our 3 months of implementing an SEO strategy, they got a raise of 45%+ increase in traffic.",
    session: "49.65%",
    users: "44.86%",
    views: "49.97%",
    bounce: "-1.05%"
  },
  "four-a": {
    heading: "4A Law",
    para: "4A Law provides world-class immigration service, we have developed their website as well with our SEO Strategy they got a 30%+ increase in traffic within 2 months work.",
    session: "33.55%",
    users: "27.55%",
    views: "17.85%",
    bounce: "-2.55%"
  }
};

// Company click handler
companies.forEach(company => {
  company.addEventListener("click", () => {
    // Update active class
    companies.forEach(c => c.classList.remove("active"));
    company.classList.add("active");

    // Show colored logo only for active company
    companies.forEach(c => {
      const coloredImg = c.querySelector(".colored");
      const grayImg = c.querySelector(".gray");
      if (c.classList.contains("active")) {
        coloredImg.style.display = "block";
        grayImg.style.display = "none";
      } else {
        coloredImg.style.display = "none";
        grayImg.style.display = "block";
      }
    });

    // Update stats and description
    const key = [...company.classList].find(cls => caseStudyData[cls]);
    if (key) {
      for (let i = 0; i < descripHeading.length; i++) {
        descripHeading[i].textContent = caseStudyData[key].heading;
        descriptPara[i].textContent = caseStudyData[key].para;
        sessionHeading[i].textContent = caseStudyData[key].session;
        usersHeading[i].textContent = caseStudyData[key].users;
        viewsHeading[i].textContent = caseStudyData[key].views;
        bounceRateHeading[i].textContent = caseStudyData[key].bounce;
      }
    }
  });
});

// CAROUSEL
document.addEventListener('DOMContentLoaded', function () {
    // --- Elements Selection ---
    const carousel = document.querySelector('.carousel');
    const carouselCards = document.querySelector('.carousel-cards');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const dots = document.querySelectorAll('.dot');
    
    // --- State & Configuration ---
    let originalCards = Array.from(carouselCards.children);
    const totalOriginalCards = originalCards.length;
    let currentIndex = 0;
    let isTransitioning = false;
    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 2000; // Time in ms (e.g., 2000ms = 2 seconds)

    // --- 1. Clone Cards for Infinite Effect ---
    originalCards.forEach(card => carouselCards.appendChild(card.cloneNode(true)));
    originalCards.slice().reverse().forEach(card => carouselCards.prepend(card.cloneNode(true)));
    const allCards = Array.from(carouselCards.children);

    // --- 2. Core Functions ---
    function setPosition(index, withTransition = true) {
        const targetCard = allCards[index];
        const carouselCenter = carousel.offsetWidth / 2;
        const cardCenter = targetCard.offsetLeft + (targetCard.offsetWidth / 2);
        const translateX = carouselCenter - cardCenter;
        
        carouselCards.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
        carouselCards.style.transform = `translateX(${translateX}px)`;
    }
    
    function moveCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex += (direction === 'next' ? 1 : -1);
        setPosition(totalOriginalCards + currentIndex);
        updateDots();
    }
    
    function updateDots() {
        const activeDotIndex = (currentIndex % totalOriginalCards + totalOriginalCards) % totalOriginalCards;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[activeDotIndex].classList.add('active');
    }

    // --- 3. Autoplay Functions ---
    function startAutoplay() {
        if (autoplayInterval) return; // Prevent multiple intervals
        autoplayInterval = setInterval(() => moveCarousel('next'), AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }

    // --- 4. Event Listeners ---
    rightArrow.addEventListener('click', () => {
        stopAutoplay();
        moveCarousel('next');
    });

    leftArrow.addEventListener('click', () => {
        stopAutoplay();
        moveCarousel('prev');
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoplay();
            currentIndex = index;
            setPosition(totalOriginalCards + currentIndex);
            updateDots();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    carouselCards.addEventListener('transitionend', () => {
        if (currentIndex >= totalOriginalCards || currentIndex < 0) {
            currentIndex = (currentIndex % totalOriginalCards + totalOriginalCards) % totalOriginalCards;
            setPosition(totalOriginalCards + currentIndex, false);
        }
        isTransitioning = false;
    });

    // --- 5. Initial Setup ---
    window.addEventListener('resize', () => setPosition(totalOriginalCards + currentIndex, false));
    
    // Use a small timeout to ensure the browser has calculated initial layout
    setTimeout(() => {
        setPosition(totalOriginalCards, false); // Initial centering
        updateDots();
        startAutoplay(); // Start the show! 🚀
    }, 100);
});

/////////
const servicesNav = document.querySelector(".services-nav");
const servicesArrow = document.querySelector("#services-arrow");

servicesNav.addEventListener("mouseover", function() {
  servicesArrow.style.transform = "rotateX(180deg)";
})

servicesNav.addEventListener("mouseleave", function() {
  servicesArrow.style.transform = "rotateX(0deg)";
})