const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  firstSectionAnimation();
  secondSectionAnimation();
};

const firstSectionAnimation = () => {
  gsap.from(".introduction .from-left", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".introduction",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  gsap.from(".introduction .from-right", {
    x: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".introduction",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};

const secondSectionAnimation = () => {};

init();
