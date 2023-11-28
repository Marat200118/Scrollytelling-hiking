const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animateSection(".introduction");
  animateSection(".hobby");
  animateSection(".answer");
  animateSection(".history");
  animateSection(".types-locations");
  animateSection(".future-adventures");
  animateSection(".facts");

  document.querySelectorAll(".spacer").forEach(animateSpacer);
  animateVariants();
  animateHistory();
};

// const firstSectionAnimation = () => {
//   gsap.from(".introduction .from-left", {
//     x: -100,
//     opacity: 0,
//     duration: 1,
//     scrollTrigger: {
//       trigger: ".introduction",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//   });
//   gsap.from(".introduction .from-right", {
//     x: 100,
//     opacity: 0,
//     duration: 1,
//     scrollTrigger: {
//       trigger: ".introduction",
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//   });
// };

// const secondSectionAnimation = () => {};

const animateSection = (section) => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top top", // Start the animation when the top of the trigger hits the top of the viewport
      end: "bottom top", // End the animation when the bottom of the trigger hits the top of the viewport
      pin: true, // Pin the section in place while it's in view
      scrub: true, // Smooth scrubbing effect
      markers: false, // For debugging, remove in production
    },
  });
};

const animateSpacer = (spacer) => {
  gsap.fromTo(
    spacer,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: spacer,
        start: "top bottom", // Start animation when spacer top hits the bottom of the viewport
        end: "bottom top", // End animation when spacer bottom leaves the top of the viewport
        scrub: true,
        markers: false, // For debugging, remove in production
      },
    }
  );
};

const animateVariants = () => {
  gsap.utils.toArray(".variants .variant").forEach((variant, i) => {
    gsap.from(variant, {
      x: i % 2 === 0 ? -300 : 300, // Alternating direction
      rotation: i % 2 === 0 ? -90 : 90,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: variant,
        start: "top center", // Start when the top of the variant is in the center of the viewport
        end: "bottom top", // End when the bottom of the variant is at the top of the viewport
        toggleActions: "play none none reset",
        markers: false, // For debugging, remove in production
      },
    });
  });
};

const animateHistory = () => {
  let historyPanels = gsap.utils.toArray(".history-container .history-article");
  let historyContainer = document.querySelector(".history-container");

  // Set up horizontal scrolling for the history section
  gsap.to(historyPanels, {
    xPercent: -100 * (historyPanels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".history-container",
      pin: true,
      start: "top top",
      end: () =>
        "+=" + historyContainer.offsetWidth * (historyPanels.length - 1),
      scrub: true,
      markers: true, // For debugging, remove in production
    },
  });
};

init();
