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
