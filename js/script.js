const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animateVariants();
  animateHistory();
  animateHeadings();
  animateVideoSection();
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

const animateVideoSection = () => {
  // Function to calculate video scroll progress
  function calculateProgress(video) {
    const duration = video.duration;
    const scrollPosition = ScrollTrigger.current().scroll();
    return scrollPosition / duration;
  }

  // Play video on scroll
  const video = document.getElementById("scrollVideo");
  gsap.to(video, {
    scrollTrigger: {
      trigger: ".video-section",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: true,
      onScrubComplete: () => {
        // Transition to the description when the video ends
        gsap.to(".video-section", { autoAlpha: 0, duration: 1 });
        gsap.to(".description-section", { autoAlpha: 1, duration: 1 });
      },
      onUpdate: (self) => {
        if (video.duration) {
          const playTime = calculateProgress(video) * video.duration;
          video.currentTime = playTime;
        }
      },
    },
  });

  // Initial state
  gsap.set(".description-section", { autoAlpha: 0 });
};

init();
