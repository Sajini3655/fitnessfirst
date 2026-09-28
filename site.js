document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Transparent to Solid Navbar & Back to Top Button
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add("scrolled");
      if (backToTop) backToTop.classList.add("show");
    } else {
      if (navbar) navbar.classList.remove("scrolled");
      if (backToTop) backToTop.classList.remove("show");
    }
  });

  // Rotating Text in Hero
  const animatedText = document.querySelector(".animated-text");
  const words = ["STRONGER", "HEALTHIER", "UNSTOPPABLE"];
  let wordIndex = 0;

  if (animatedText) {
    animatedText.style.transition = "opacity 0.3s ease-in-out";
    setInterval(() => {
      animatedText.style.opacity = 0;
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        animatedText.textContent = words[wordIndex];
        animatedText.style.opacity = 1;
      }, 300);
    }, 3000);
  }

  // Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Statistics Counter Animation
  const counters = document.querySelectorAll(".counter");
  let hasCounted = false;

  const countObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));
          
          let current = 0;
          const increment = target > 100 ? Math.ceil(target / 50) : 1;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target + (target >= 15 ? "+" : "");
              clearInterval(timer);
            } else {
              counter.innerText = current;
            }
          }, stepTime);
        });
      }
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    countObserver.observe(statsSection);
  }
});
