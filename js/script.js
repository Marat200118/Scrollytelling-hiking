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
        start: "top top",
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
        markers: true,
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
        markers: true,
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
    "pk.eyJ1IjoibXMxODAxNiIsImEiOiJja2dnZ3lmemswMHV6MnNzMDB0bWUxcGQ0In0.3pyWk-wGiKUF_Lzp40eKZw";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [28.5983, 83.9311],
    zoom: 1,
  }); map.scrollZoom.disable();

  const chapters = {
    himalayas: {
      center: [28.5983, 83.9311],
      zoom: 5,
      bearing: 0,
      UserActivation: false,
      // Add other properties like bearing, pitch, etc.
    }, 
    himalayas: {
      center: [28.5983, 83.9311],
      zoom: 5,
      bearing: 0,
      allowZoom: false,
      // Add other properties like bearing, pitch, etc.
    },
  };

  let activeChapterName = "himalayas";

  function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;
    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).classList.add("active");
    if (activeChapterName) {
      document.getElementById(activeChapterName).classList.remove("active");
    }
    activeChapterName = chapterName;
  }

  function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  window.onscroll = () => {
    for (const chapterName in chapters) {
      if (isElementOnScreen(chapterName)) {
        setActiveChapter(chapterName);
        break;
      }
    }
  };
};

init();
