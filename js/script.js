const init = () => {
  
  gsap.registerPlugin(ScrollTrigger);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".square",
      markers: { fontSize: "25px", fontWeight: "bold" },
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
  });
  tl.to(".square", {
    x: 400,
    duration: 3,
  });
  tl.to(".square", {
    y: 200,
    duration: 2,
  });
  tl.to(".square", {
    x: 200,
    duration: 2,
  });
};

init();
