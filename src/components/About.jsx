import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../image/My.png"

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-label",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".about-heading",
        {
          y: 120,
          opacity: 0,
          rotateX: 12,
          scale: 0.94,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.to(".about-heading", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 30%",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        ".about-content",
        {
          x: -80,
          y: 70,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 82%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      gsap.to(".about-content", {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.utils.toArray(".about-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 90,
            opacity: 0,
            scale: 0.9,
            rotateX: index % 2 === 0 ? -8 : 8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );

        gsap.to(card, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      gsap.utils.toArray(".about-content p").forEach((text, index) => {
        gsap.fromTo(
          text,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
          },
        );
      });

      gsap.utils.toArray(".about-card span").forEach((tag, index) => {
        gsap.fromTo(
          tag,
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tag,
              start: "top 92%",
              end: "top 70%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        ".mt-24.grid",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".mt-24.grid",
            start: "top 88%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".mt-20.flex.items-center.justify-between",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mt-20.flex.items-center.justify-between",
            start: "top 92%",
            end: "top 70%",
            scrub: 1,
          },
        },
      );

      const handleMouseMove = (e) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white"
    >
      {/* MOUSE SPOTLIGHT*/}

      <div
        ref={spotlightRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-lime-400/[0.055]
          blur-[110px]
        "
      />

      {/* SAME HERO BACKGROUND GRID */}

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

      {/* SAME HERO CENTER GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-lime-400/[0.025]
          blur-[150px]
        "
      />

      {/* MAIN CONTENT */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-32 sm:px-10 lg:px-16">
        {/* TOP LABEL */}

        <div className="about-label mb-8 flex items-center gap-4 opacity-0">
          <span className="h-px w-12 bg-lime-400" />

          <span className="text-xs font-semibold tracking-[0.3em] text-lime-400">
            ABOUT ME
          </span>

          <span className="text-xs tracking-[0.2em] text-zinc-700">01</span>
        </div>

        <div className="about-heading max-w-5xl opacity-0">
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[7rem]">
            I BUILD
            <br />
            <span className="text-lime-400">DIGITAL</span> EXPERIENCES.
          </h2>
        </div>

        {/* main grid  */}
        <div className="mt-20 grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left content  */}

          <div className="about-content opacity-0">
            <img
              src={profile}
              alt="Kishan"
              className="mb-10 h-72 w-72 object-contain drop-shadow-[0_0_35px_rgba(214,255,0,0.15)]"
            />
            <div className="max-w-3xl">
              <p className="text-xl leading-9 text-zinc-300 sm:text-2xl">
                I'm Kishan Singh, a frontend developer focused on creating
                modern, interactive and visually refined web experiences.
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-500">
                I enjoy turning ideas into clean and meaningful interfaces. My
                focus is not just making websites work, but making them feel
                smooth, responsive and memorable.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-500">
                I work primarily with React, JavaScript and Tailwind CSS, while
                continuously exploring modern frontend technologies, animations
                and better ways to build digital products.
              </p>
            </div>

            {/* Signature line  */}

            <div className="mt-12 flex items-center gap-5">
              <div className="h-px w-16 bg-zinc-800" />

              <span className="text-xs tracking-[0.2em] text-zinc-600">
                CODE • DESIGN • EXPERIENCE
              </span>
            </div>
          </div>

          {/* right side  */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div
              className="
                about-card
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-[#111111]/80
                p-7
                opacity-0
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-lime-400/40
                hover:shadow-[0_25px_80px_rgba(214,255,0,0.06)]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-lime-400/[0.05]
                  via-transparent
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                <span className="text-xs tracking-[0.2em] text-zinc-600">
                  01
                </span>

                <h3 className="mt-8 text-2xl font-bold">Frontend</h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  Building responsive interfaces with modern frontend
                  technologies and clean component architecture.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["React", "JavaScript", "Tailwind"].map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        border
                        border-zinc-800
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        tracking-wide
                        text-zinc-400
                        transition-colors
                        duration-300
                        group-hover:border-lime-400/20
                        group-hover:text-lime-400
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="
                about-card
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-[#111111]/80
                p-7
                opacity-0
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-lime-400/40
                hover:shadow-[0_25px_80px_rgba(214,255,0,0.06)]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-lime-400/[0.05]
                  via-transparent
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                <span className="text-xs tracking-[0.2em] text-zinc-600">
                  02
                </span>

                <h3 className="mt-8 text-2xl font-bold">Interaction</h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  Adding meaningful motion and micro-interactions to create
                  interfaces that feel alive.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["GSAP", "Animations", "UX"].map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        border
                        border-zinc-800
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        tracking-wide
                        text-zinc-400
                        transition-colors
                        duration-300
                        group-hover:border-lime-400/20
                        group-hover:text-lime-400
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom stats  */}

        <div className="mt-24 grid border-y border-zinc-900 sm:grid-cols-3">
          {/* STAT */}

          <div className="about-card group border-b border-zinc-900 px-6 py-10 opacity-0 sm:border-b-0 sm:border-r">
            <span className="text-4xl font-black text-lime-400">01</span>

            <p className="mt-3 text-xs tracking-[0.2em] text-zinc-600">
              DEVELOPER
            </p>
          </div>

          {/* STAT */}

          <div className="about-card group border-b border-zinc-900 px-6 py-10 opacity-0 sm:border-b-0 sm:border-r">
            <span className="text-4xl font-black text-white">∞</span>

            <p className="mt-3 text-xs tracking-[0.2em] text-zinc-600">
              IDEAS TO BUILD
            </p>
          </div>

          {/* STAT */}

          <div className="about-card group px-6 py-10 opacity-0">
            <span className="text-4xl font-black text-lime-400">24/7</span>

            <p className="mt-3 text-xs tracking-[0.2em] text-zinc-600">
              LEARNING MODE
            </p>
          </div>
        </div>

        {/* BOTTOM DECORATION  */}

        <div className="mt-20 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.3em] text-zinc-700">
            KISHAN.DEV
          </span>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />

            <span className="text-[10px] tracking-[0.2em] text-zinc-700">
              ALWAYS BUILDING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
