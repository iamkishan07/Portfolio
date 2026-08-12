import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const reactCardRef = useRef(null);
  const jsCardRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        ".hero-status",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
      )
        .fromTo(
          ".hero-title span",
          {
            y: 120,
            opacity: 0,
            rotateX: 70,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.5",
        )
        .fromTo(
          ".hero-buttons",
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.4",
        )
        .fromTo(
          visualRef.current,
          {
            scale: 0.85,
            opacity: 0,
            rotateY: 20,
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
          },
          "-=0.8",
        )
        .fromTo(
          ".scroll-indicator",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3",
        );

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".hero-title", {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-description", {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-buttons", {
        y: -12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(visualRef.current, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(reactCardRef.current, {
        y: -15,
        x: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(jsCardRef.current, {
        y: 18,
        x: -10,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const x = mouseX / innerWidth - 0.5;
        const y = mouseY / innerHeight - 0.5;

        gsap.to(visualRef.current, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(reactCardRef.current, {
          x: x * 45,
          y: y * 35,
          rotate: x * 4,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(jsCardRef.current, {
          x: x * -55,
          y: y * -40,
          rotate: x * -5,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(spotlightRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      const magneticButtons = document.querySelectorAll(".magnetic");

      const buttonHandlers = [];

      magneticButtons.forEach((button) => {
        const moveButton = (e) => {
          const rect = button.getBoundingClientRect();

          const x = e.clientX - (rect.left + rect.width / 2);

          const y = e.clientY - (rect.top + rect.height / 2);

          gsap.to(button, {
            x: x * 0.18,
            y: y * 0.18,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        const resetButton = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        };

        button.addEventListener("mousemove", moveButton);

        button.addEventListener("mouseleave", resetButton);

        buttonHandlers.push({
          button,
          moveButton,
          resetButton,
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        buttonHandlers.forEach(({ button, moveButton, resetButton }) => {
          button.removeEventListener("mousemove", moveButton);

          button.removeEventListener("mouseleave", resetButton);
        });
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white"
    >
      {/* MOUSE SPOTLIGHT */}

      <div
        ref={spotlightRef}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/[0.055] blur-[110px]"
      />

      {/* BACKGROUND GRID */}

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(214,255,0,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(214,255,0,0.5) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* CENTER GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/[0.025] blur-[150px]" />

      {/* MAIN CONTAINER */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 py-28 sm:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/*  LEFT CONTENT */}

          <div className="max-w-4xl">
            {/* STATUS */}

            <div className="hero-status mb-8 flex items-center gap-3 opacity-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
              </span>

              <span className="text-xs font-medium tracking-[0.25em] text-zinc-400">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="hero-title overflow-hidden text-[18vw] font-black leading-[0.78] tracking-[-0.07em] sm:text-[15vw] lg:text-[10.5rem]"
              style={{
                perspective: "1000px",
              }}
            >
              <span className="block">KISHAN</span>

              <span className="block text-lime-400">
                SINGH
                <span className="text-white">.</span>
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="hero-description mt-10 max-w-xl text-base leading-7 text-zinc-400 opacity-0 sm:text-lg">
              Frontend developer crafting fast, interactive and visually refined
              digital experiences with modern web technologies.
            </p>

            {/* BUTTONS */}

            <div className="hero-buttons mt-9 flex flex-wrap gap-4 opacity-0">
              {/* PROJECT BUTTON */}

              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="magnetic group relative overflow-hidden bg-lime-400 px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_35px_rgba(214,255,0,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  VIEW PROJECTS
                  <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-2">
                    ↗
                  </span>
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </button>

              {/* CONTACT BUTTON */}

              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="magnetic group border border-zinc-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-lime-400 hover:text-lime-400 hover:shadow-[0_0_30px_rgba(214,255,0,0.06)]"
              >
                <span className="flex items-center gap-3">
                  LET'S CONNECT
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/*  RIGHT INTERACTIVE VISUAL */}

          <div
            ref={visualRef}
            className="relative mx-auto h-[450px] w-full max-w-[600px] opacity-0"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* MAIN CODE WINDOW */}

            <div
              className="
                hero-code-card
                absolute left-1/2 top-1/2
                w-[90%]
                -translate-x-1/2
                -translate-y-1/2
                overflow-hidden
                rounded-2xl
                border border-zinc-800
                bg-[#111111]/95
                shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-lime-400/40
                hover:shadow-[0_30px_100px_rgba(214,255,0,0.08)]
              "
            >
              {/* WINDOW HEADER */}

              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>

                <span className="text-[10px] tracking-[0.2em] text-zinc-600">
                  KISHAN.DEV
                </span>
              </div>

              {/* CODE */}

              <div className="p-7 font-mono text-sm leading-8">
                <div>
                  <span className="text-zinc-600">01</span>
                  <span className="ml-6 text-purple-400">const</span>{" "}
                  <span className="text-white">developer</span>{" "}
                  <span className="text-zinc-500">=</span>
                </div>

                <div>
                  <span className="text-zinc-600">02</span>

                  <span className="ml-6 text-white">{"{"}</span>
                </div>

                <div>
                  <span className="text-zinc-600">03</span>
                  <span className="ml-12 text-zinc-500">name:</span>{" "}
                  <span className="text-lime-400">'Kishan Singh'</span>,
                </div>

                <div>
                  <span className="text-zinc-600">04</span>
                  <span className="ml-12 text-zinc-500">role:</span>{" "}
                  <span className="text-lime-400">'Frontend Developer'</span>,
                </div>

                <div>
                  <span className="text-zinc-600">05</span>
                  <span className="ml-12 text-zinc-500">stack:</span>{" "}
                  <span className="text-lime-400">
                    ['React', 'JS', 'Tailwind']
                  </span>
                  ,
                </div>

                <div>
                  <span className="text-zinc-600">06</span>
                  <span className="ml-12 text-zinc-500">passion:</span>{" "}
                  <span className="text-lime-400">
                    'Building digital experiences'
                  </span>
                </div>

                <div>
                  <span className="text-zinc-600">07</span>

                  <span className="ml-6 text-white">{"}"}</span>
                </div>

                {/* TERMINAL STATUS */}

                <div className="mt-5 flex items-center gap-2 border-t border-zinc-800 pt-4">
                  <span className="text-lime-400">●</span>

                  <span className="text-zinc-600">system.ready()</span>

                  <span className="ml-auto animate-pulse text-lime-400">_</span>
                </div>
              </div>

              {/* CARD HOVER LIGHT */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime-400/[0.035] via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>

            {/* REACT FLOATING CARD  */}

            <div
              ref={reactCardRef}
              className="absolute -left-2 top-14 hidden rounded-xl border border-zinc-800 bg-[#151515] px-4 py-3 shadow-2xl transition-colors duration-300 hover:border-cyan-400/40 sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#202020] text-lg text-cyan-400">
                  ⚛
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">React</p>

                  <p className="text-[10px] text-zinc-600">Frontend</p>
                </div>
              </div>
            </div>

            {/*  JAVASCRIPT FLOATING CARD  */}

            <div
              ref={jsCardRef}
              className="absolute -right-2 bottom-16 hidden rounded-xl border border-zinc-800 bg-[#151515] px-4 py-3 shadow-2xl transition-colors duration-300 hover:border-lime-400/40 sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400/10 text-sm font-bold text-lime-400">
                  JS
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">JavaScript</p>

                  <p className="text-[10px] text-zinc-600">Interactive</p>
                </div>
              </div>
            </div>

            {/* DECORATIVE LINES */}

            <div className="absolute left-1/2 top-4 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-lime-400/50 to-transparent" />

            <div className="absolute bottom-0 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-lime-400 to-transparent" />
          </div>
        </div>
      </div>

      {/*  SCROLL INDICATOR */}

      <div className="scroll-indicator absolute bottom-8 left-1/2 z-20 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.35em] text-zinc-600">
            SCROLL TO EXPLORE
          </span>

          <div className="h-10 w-px overflow-hidden bg-zinc-800">
            <div className="h-1/2 w-full animate-pulse bg-lime-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
