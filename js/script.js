const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animateVariants();
  animateHistory();
  animateHeadings();
  // scrubbingVideo();
};

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

const animateHeadings = () => {
  const containers = gsap.utils.toArray(".heading-text");
  containers.forEach((container) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top", // Adjust these values as needed
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: true,
      },
    });

    tl.to(container, {
      autoAlpha: 1,
    }).to(
      container,
      {
        autoAlpha: 0,
      },
      0.5
    );
  });
};

// const scrubbingVideo = () => {
//   /* 
//     taken from https://codepen.io/shshaw/pen/vYKBPbv/9e810322d70c306de2d18237d0cb2d78?editors=0010
//   */
//   const $video = document.querySelector(".scrollVideo");
//   const src = $video.currentSrc || $video.src;
//   console.log($video, src);

//   /* Make sure the video is 'activated' on iOS */
//   const once = (el, event, fn, opts) => {
//     const onceFn = function (event) {
//       el.removeEventListener(event, onceFn);
//       fn.apply(this, arguments);
//     };
//     el.addEventListener(event, onceFn, opts);
//     return onceFn;
//   };

//   once(document.documentElement, "touchstart", function (event) {
//     $video.play();
//     $video.pause();
//   });

//   /* ---------------------------------- */

//   let tl = gsap.timeline({
//     defaults: { duration: 1 },
//     scrollTrigger: {
//       trigger: ".scrollVideo",
//       start: "top top",
//       end: "bottom bottom",
//       markers: true,
//       scrub: true,
//       pin: true,
//     },
//   });
//   console.log($video.duration);
//   once($video, "loadedmetadata", () => {
//     tl.fromTo(
//       $video,
//       {
//         currentTime: 1,
//       },
//       {
//         currentTime: $video.duration || 1,
//       }
//     );
//   });
// };

init();
