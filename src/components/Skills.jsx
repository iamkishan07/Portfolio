import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Frontend Development",
  "Responsive UI",
  "React Applications",
  "State Management",
  "API Integration",
  "Backend Fundamentals",
];

const techRows = [
  "REACT",
  "HTML",
  "TAILWIND",
  "JAVASCRIPT",
  "EXPRESS",
  "MONGODB",
];

const Skills = () => {
  const sectionRef = useRef(null);
  const techTrackRef = useRef(null);
  const techTrackTwoRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".skills-label", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
      })
        .from(
          ".skills-heading",
          {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .from(
          ".skills-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );

      gsap.to(techTrackRef.current, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(techTrackTwoRef.current, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(".tech-marquee", {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".tech-marquee",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".skill-row", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".skill-number", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 78%",
        },
      });

      gsap.from(".skills-footer", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-footer",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      const handleMouseMove = (e) => {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      const rows = gsap.utils.toArray(".skill-row");

      rows.forEach((row) => {
        const number = row.querySelector(".skill-number");
        const arrow = row.querySelector(".skill-arrow");

        const enter = () => {
          gsap.to(row, {
            x: 8,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(number, {
            color: "#d6ff00",
            x: 5,
            duration: 0.3,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            x: 8,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(row, {
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(number, {
            color: "#52525b",
            x: 0,
            duration: 0.3,
          });

          gsap.to(arrow, {
            x: 0,
            opacity: 0,
            duration: 0.3,
          });
        };

        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);

        row._enter = enter;
        row._leave = leave;
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        rows.forEach((row) => {
          row.removeEventListener("mouseenter", row._enter);
          row.removeEventListener("mouseleave", row._leave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      <div
        ref={glowRef}
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
          bg-lime-400/[0.045]
          blur-[120px]
        "
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
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

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-lime-400/[0.018]
          blur-[160px]
        "
      />

      {/* main container  */}

      <div className="relative z-10 mx-auto max-w-[1250px]">
        <div className="skills-label mb-7 flex items-center gap-3 opacity-100">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(214,255,0,0.7)]" />

          <span className="text-[10px] font-medium tracking-[0.3em] text-lime-400">
            SKILLS & EXPERTISE
          </span>

          <span className="text-[10px] tracking-[0.2em] text-zinc-700">02</span>
        </div>

        <div className="skills-heading max-w-4xl">
          <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[7rem]">
            BUILT WITH
            <br />
            <span className="text-lime-400">THE RIGHT</span>
            <br />
            TOOLS.
          </h2>
        </div>

        <p className="skills-description mt-8 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
          I combine modern frontend technologies with thoughtful interaction and
          clean architecture to build fast, responsive and engaging digital
          experiences.
        </p>

        <div className="tech-marquee relative -mx-5 mt-20 overflow-hidden sm:-mx-8 lg:-mx-16">
          {/* TOP LINE */}

          <div
            ref={techTrackRef}
            className="
              flex
              w-max
              items-center
              gap-8
              whitespace-nowrap
              will-change-transform
            "
          >
            {[...techRows, ...techRows].map((tech, index) => (
              <React.Fragment key={`${tech}-one-${index}`}>
                <span
                  className="
                    text-[13vw]
                    font-black
                    leading-none
                    tracking-[-0.07em]
                    text-transparent
                    [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]
                    sm:text-[10vw]
                    lg:text-[8rem]
                  "
                >
                  {tech}
                </span>

                <span className="text-4xl text-lime-400/20">/</span>
              </React.Fragment>
            ))}
          </div>

          {/* SECOND LINE */}

          <div
            ref={techTrackTwoRef}
            className="
              mt-2
              flex
              w-max
              items-center
              gap-8
              whitespace-nowrap
              will-change-transform
            "
          >
            {[...techRows].reverse().map((tech, index) => (
              <React.Fragment key={`${tech}-two-${index}`}>
                <span
                  className="
                    text-[13vw]
                    font-black
                    leading-none
                    tracking-[-0.07em]
                    text-transparent
                    [-webkit-text-stroke:1px_rgba(214,255,0,0.08)]
                    sm:text-[10vw]
                    lg:text-[8rem]
                  "
                >
                  {tech}
                </span>

                <span className="text-4xl text-zinc-800">/</span>
              </React.Fragment>
            ))}
          </div>

          {/* FADE EDGES */}

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b0b0b] to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
        </div>

        {/* skill list  */}

        <div className="skills-list mt-24 max-w-3xl">
          {skills.map((skill, index) => (
            <div
              key={skill}
              className="
                skill-row
                group
                flex
                cursor-default
                items-center
                gap-6
                border-b
                border-zinc-900
                py-5
                will-change-transform
              "
            >
              {/* NUMBER */}

              <span className="skill-number w-6 font-mono text-[9px] text-zinc-600">
                0{index + 1}
              </span>

              {/* SKILL */}

              <span
                className="
                  flex-1
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                  text-zinc-300
                  transition-colors
                  duration-300
                  group-hover:text-white
                  sm:text-xl
                "
              >
                {skill}
              </span>

              {/* ARROW */}

              <span
                className="
                  skill-arrow
                  text-lg
                  text-lime-400
                  opacity-0
                "
              >
                ↗
              </span>
            </div>
          ))}
        </div>

        <div className="skills-footer mt-20 flex items-center justify-between border-t border-zinc-900 pt-8">
          <span className="text-[9px] tracking-[0.3em] text-zinc-700">
            KISHAN.DEV
          </span>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />

            <span className="text-[9px] tracking-[0.2em] text-zinc-700">
              ALWAYS LEARNING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
