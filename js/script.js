const init = () => {
  // videos = document.querySelectorAll(".scrollVideo");

  // const videosForEach = async () => {
  //   videos.forEach((video) => {
  //     const video = document.querySelector(".scrollVideo");
  //     const videoDataBlob = await fetch(video.src).then((res) => res.blob());
  //     const videoDataUrl = URL.createObjectURL(videoDataBlob);
  //     video.src = videoDataUrl;
  //   });
  // };
  // videosForEach();
  gsap.registerPlugin(ScrollTrigger);
  animateVariants();
  animateHistory();
  animateHeadings();
  scrubbingVideo();
  animateRectangle();
  animateMaps();
  animateFacts();
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
      markers: false,
    },
  });
};

const animateHeadings = () => {
  const containers = gsap.utils.toArray(".heading-text");
  containers.forEach((container) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: false,
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

const scrubbingVideo = () => {
  // Select all videos
  const videos = document.querySelectorAll(".scrollVideo");

  videos.forEach((video) => {
    // Ensure the video is 'activated' on iOS
    const once = (el, event, fn, opts) => {
      const onceFn = function (event) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    };

    once(document.documentElement, "touchstart", function (event) {
      video.play();
      video.pause();
    });

    // Create timeline for each video
    let tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: video.parentElement,
        start: "top top",
        end: "bottom top",
        markers: false,
        scrub: 1.2,
        pin: true,
      },
    });

    once(video, "loadedmetadata", () => {
      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration || 1 }
      );
    });
  });
};

const animateRectangle = () => {
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(MotionPathPlugin);

    gsap.to(".rectangle", {
      scrollTrigger: {
        trigger: ".rectangle-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        opacity: 0,
        markers: false,
      },
      motionPath: {
        path: ".path-for-rectangle",
        align: ".path-for-rectangle",
        autoRotate: true,
      },
    });
  });
};

const animateMaps = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXMxODAxNiIsImEiOiJja2dnZ3lmemswMHV6MnNzMDB0bWUxcGQ0In0.3pyWk-wGiKUF_Lzp40eKZw"; // Replace with your Mapbox access token

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    // center: [56.947407778, 24.106875278],
    zoom: 0,
  });
  map.scrollZoom.disable();

  const chapters = {
    himalayas: { center: [86.420679, 27.772537], zoom: 7 },
    alps: { center: [10.8326, 45.8652], zoom: 9 },
    // andes: { center: [-40.6532, -10.0109], zoom: 5 },
  };

  function updateMapAndContent(chapterName) {
    map.flyTo(chapters[chapterName]);

    gsap.utils.toArray(".adventure section").forEach((section) => {
      if (section.classList.contains(chapterName)) {
        gsap.to(section, {
          autoAlpha: 1,
          duration: 1,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(section, {
          autoAlpha: 0,

          duration: 1,
          ease: "power1.inOut",
        });
      }
    });
  }
  function leaveMapAndContent(chapterName) {
    gsap.utils.toArray(".adventure section").forEach((section) => {
      if (section.classList.contains(chapterName)) {
        gsap.to(section, {
          autoAlpha: 0,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    });
  }

  // updateMapAndContent("himalayas");

  Object.keys(chapters).forEach((chapterName) => {
    ScrollTrigger.create({
      trigger: `.${chapterName}`,
      start: "top top",
      end: "bottom top",
      pinSpacing: false,
      pin: true,
      markers: false,
      onEnter: () => updateMapAndContent(chapterName),
      onEnterBack: () => updateMapAndContent(chapterName),
      onLeave: () => leaveMapAndContent(chapterName),
    });
  });

  ScrollTrigger.create({
    trigger: ".adventure",
    start: "top top",
    end: "bottom top",
    scrub: true,
    // pinSpacing: false,
    pin: true,
    markers: false,
  });
};

const animateFacts = () => {
  const targetNumbers = [500, 1200, 800, 300];
  const facts = document.querySelector(".facts");

  gsap.utils.toArray(".facts .fact").forEach((fact, index) => {
    const numberSpan = fact.querySelector(".number");

    gsap.to(numberSpan, {
      innerHTML: targetNumbers[index],
      scrollTrigger: {
        trigger: fact,
        start: "top bottom",
        end: "bottom 20%",
        scrub: true,
        markers: true,
        onUpdate: () => {
          numberSpan.innerHTML = Math.ceil(numberSpan.innerHTML);
        },
      },
    });
  });
  gsap.to(facts, {
    scrollTrigger: {
      trigger: facts,
      start: "top 20%",
      pin: true,
      end: "bottom top",
      markers: false,
    },
  });
};

init();
