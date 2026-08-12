import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skyMart from "../image/skymart.png";
import productivity from "../image/productivity.png";
import studentnest from "../image/studentnest.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "SkyMart",
    description:
      "A modern e-commerce experience designed for seamless product discovery, browsing and purchasing with a clean interface.",
    tech: ["React", "Tailwind CSS", "API"],
    image: skyMart,
    link: "https://github.com/iamkishan07/Cohort3.0_assignment-10",
    align: "left",
  },
  {
    number: "02",
    name: "Productivity Dashboard",
    description:
      "A modern productivity dashboard designed to streamline tasks, track progress, manage daily activities, and keep everything organized in one focused workspace.",
    tech: ["React", "Redux", "LocalStorage"],
    image: productivity,
    link: "https://github.com/iamkishan07/Cohort3.0_assignment-9",
    align: "right",
  },
  {
    number: "03",
    name: "StudentNest",
    description:
      "A comprehensive student platform designed to simplify campus life, productivity and essential student workflows.",
    tech: ["React", "Node.js", "MongoDB"],
    image: studentnest,
    link: "https://github.com/iamkishan07/PG-s-Website",
    align: "left",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 100,
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      });

      gsap.utils.toArray(".project-item").forEach((project, index) => {
        const imageWrapper = project.querySelector(".project-image-wrapper");

        const image = project.querySelector(".project-image");

        const content = project.querySelector(".project-content");

        const number = project.querySelector(".project-image-wrapper > div");

        const techItems = project.querySelectorAll(".project-content span");

        gsap.fromTo(
          imageWrapper,
          {
            y: 100,
            opacity: 0,
            rotateY: index % 2 === 0 ? -8 : 8,
            scale: 0.92,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: project,
              start: "top 88%",
              end: "top 45%",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          content,
          {
            y: 90,
            opacity: 0,
            x: index % 2 === 0 ? 45 : -45,
          },
          {
            y: 0,
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: project,
              start: "top 82%",
              end: "top 48%",
              scrub: 1,
            },
          },
        );

        if (number) {
          gsap.fromTo(
            number,
            {
              x: index % 2 === 0 ? -40 : 40,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            },
          );
        }

        gsap.fromTo(
          techItems,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 75%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );

        gsap.to(image, {
          yPercent: -10,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(content, {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(project, {
          scale: 0.97,
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "bottom 35%",
            end: "bottom 5%",
            scrub: 1,
          },
        });
      });

      gsap.fromTo(
        ".mt-32.flex.justify-center",
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
            trigger: ".mt-32.flex.justify-center",
            start: "top 90%",
            end: "top 65%",
            scrub: 1,
          },
        },
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const image = card.querySelector(".project-image");
    const glow = card.querySelector(".project-hover-glow");

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -4;
    const rotateY = (x / rect.width - 0.5) * 4;

    gsap.to(image, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 1000,
    });

    gsap.to(glow, {
      x: x - 150,
      y: y - 150,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    const image = e.currentTarget.querySelector(".project-image");
    const glow = e.currentTarget.querySelector(".project-hover-glow");

    gsap.to(image, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-[#0b0b0b] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      {/* Background Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(214,255,0,0.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(214,255,0,0.7) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Glow */}

      <div className="pointer-events-none absolute right-[-200px] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.025] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1250px]">
        <div className="projects-heading mb-24 grid items-end gap-8 opacity-100 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(214,255,0,0.6)]" />

              <span className="text-[10px] font-medium tracking-[0.3em] text-zinc-500">
                SELECTED WORK
              </span>
            </div>

            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl">
              BUILT
              <br />
              <span className="text-lime-400">WITH INTENT.</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-sm leading-6 text-zinc-500">
              A collection of digital products and experiences I've designed and
              developed with a focus on usability, performance and visual
              detail.
            </p>
          </div>
        </div>

        <div className="space-y-32 lg:space-y-44">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="project-item group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Project Number */}

              <div className="mb-6 flex items-center justify-between lg:hidden">
                <span className="font-mono text-xs text-lime-400">
                  / {project.number}
                </span>

                <span className="text-[9px] tracking-[0.25em] text-zinc-600">
                  CASE STUDY
                </span>
              </div>

              <div
                className={`grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 ${
                  project.align === "right"
                    ? "lg:grid-cols-[0.85fr_1.15fr]"
                    : ""
                }`}
              >
                {/* image  */}
                <div
                  className={`project-image-wrapper relative ${
                    project.align === "right" ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={{
                    perspective: "1200px",
                  }}
                >
                  {/* Number */}

                  <div className="absolute -top-7 left-0 z-20 hidden font-mono text-[11px] text-lime-400 lg:block">
                    / {project.number}
                  </div>

                  {/* Mouse Hover Glow */}

                  <div className="project-hover-glow pointer-events-none absolute left-0 top-0 z-0 h-[300px] w-[300px] rounded-full bg-lime-400/[0.07] blur-[100px] opacity-0" />

                  {/* Image Container */}

                  <div className="relative z-10 overflow-hidden rounded-sm border border-zinc-800 bg-[#111111] transition-all duration-500 group-hover:border-lime-400/30 group-hover:shadow-[0_0_40px_rgba(214,255,0,0.06)]">
                    {/* Browser Header */}

                    <div className="relative z-20 flex h-8 items-center justify-between border-b border-zinc-800 bg-[#151515] px-3 transition-colors duration-500 group-hover:border-lime-400/10">
                      <div className="flex gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 transition-colors duration-300 group-hover:bg-lime-400/50" />
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                      </div>

                      <div className="rounded-sm bg-[#0c0c0c] px-8 py-1">
                        <span className="text-[6px] text-zinc-600">
                          {project.name.toLowerCase()}.app
                        </span>
                      </div>

                      <span className="text-[7px] text-zinc-700 transition-colors duration-300 group-hover:text-lime-400">
                        ↗
                      </span>
                    </div>

                    {/* Actual Project Image */}

                    <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]">
                      <img
                        src={project.image}
                        alt={`${project.name} project`}
                        className="project-image h-full w-full object-cover will-change-transform transition-[filter] duration-500 group-hover:brightness-110"
                      />

                      {/* Hover Overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-lime-400/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Image Shine */}

                      <div className="pointer-events-none absolute -left-[100%] top-0 h-full w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-all duration-700 group-hover:left-[150%] group-hover:opacity-100" />

                      {/* Corner */}

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40 text-sm text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:border-lime-400/30 group-hover:bg-lime-400 group-hover:text-black">
                          ↗
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* contact  */}

                <div
                  className={`project-content ${
                    project.align === "right" ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="mb-5 hidden text-[9px] tracking-[0.25em] text-zinc-600 lg:block">
                    FEATURED PROJECT
                  </div>

                  <h3 className="text-4xl font-bold tracking-[-0.04em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime-400 sm:text-5xl">
                    {project.name}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                    {project.description}
                  </p>

                  {/* Tech */}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-800 px-3 py-1.5 text-[9px] uppercase tracking-wider text-zinc-500 transition-all duration-300 group-hover:border-lime-400/20 group-hover:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View */}

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-8 flex cursor-pointer items-center gap-3 text-[10px] font-bold tracking-[0.18em] text-white transition-all duration-300 group-hover:text-lime-400">
                      VIEW CASE STUDY
                      <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </button>
                  </a>

                  {/* Bottom Line */}

                  <div className="mt-10 h-px w-full max-w-md bg-zinc-900">
                    <div className="h-px w-0 bg-lime-400 shadow-[0_0_8px_rgba(214,255,0,0.5)] transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* all project  */}

        {/* <div className="mt-32 flex justify-center">
          <button className="group flex items-center gap-5 border border-zinc-800 px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-zinc-400 transition-all duration-300 hover:border-lime-400 hover:text-lime-400">
            <span>VIEW ALL PROJECTS</span>

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Projects;
