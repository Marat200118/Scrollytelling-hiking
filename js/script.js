const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  // animateSection(".introduction");
  // animateSection(".hobby");
  // animateSection(".answer");
  // animateSection(".history");
  // animateSection(".types-locations");
  // animateSection(".future-adventures");
  // animateSection(".facts");

  // document.querySelectorAll(".spacer").forEach(animateSpacer);
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
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      markers: false,
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
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    }
  );
};

const animateVariants = () => {
  gsap.utils.toArray(".variants .variant").forEach((variant, i) => {
    gsap.from(variant, {
      x: i % 2 === 0 ? -300 : 300,
      rotation: i % 2 === 0 ? -90 : 90,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: variant,
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reset",
        markers: false,
      },
    });
  });
};

const animateHistory = () => {
  let historyPanels = gsap.utils.toArray(".history-container .history-article");
  let historyContainer = document.querySelector(".history-container");

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
      markers: true,
    },
  });
};

init();
