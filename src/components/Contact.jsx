import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const spotlightRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".contact-label", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
      })
        .from(
          ".contact-intro",
          {
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".contact-heading",
          {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".contact-info",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          formRef.current,
          {
            x: 70,
            opacity: 0,
            rotateY: 8,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.8",
        );

      gsap.from(".contact-field", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".contact-heading", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(formRef.current, {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".contact-footer", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-footer",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      const handleMouseMove = (e) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      const fields = gsap.utils.toArray(".contact-field");

      fields.forEach((field) => {
        const input = field.querySelector("input, textarea");
        const line = field.querySelector(".input-line");

        if (!input) return;

        const focus = () => {
          gsap.to(line, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(field, {
            y: -2,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        const blur = () => {
          gsap.to(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(field, {
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        input.addEventListener("focus", focus);
        input.addEventListener("blur", blur);

        field._focus = focus;
        field._blur = blur;
      });

      const button = formRef.current?.querySelector(".contact-submit");

      if (button) {
        const moveButton = (e) => {
          const rect = button.getBoundingClientRect();

          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          gsap.to(button, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.35,
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

        button._moveButton = moveButton;
        button._resetButton = resetButton;
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        fields.forEach((field) => {
          const input = field.querySelector("input, textarea");

          if (!input) return;

          input.removeEventListener("focus", field._focus);
          input.removeEventListener("blur", field._blur);
        });

        if (button) {
          button.removeEventListener("mousemove", button._moveButton);
          button.removeEventListener("mouseleave", button._resetButton);
        }
      };
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = `Portfolio Contact from ${name}`;

    const body = `Hi Kishan,

My name is ${name}.
My email is ${email}.

Message:
${message}

Regards,
${name}`;

    window.location.href = `mailto:kishaniam401@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0b0b0b]
        px-5
        pt-28
        text-white
        sm:px-8
        lg:px-16
      "
    >
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
          bg-lime-400/[0.045]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.055]
        "
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
          left-[5%]
          top-[35%]
          z-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-lime-400/[0.018]
          blur-[150px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1250px]">
        <div className="contact-label mb-7 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(214,255,0,0.7)]" />

          <span className="text-[10px] font-medium tracking-[0.3em] text-lime-400">
            LET&apos;S TALK
          </span>

          <span className="text-[10px] tracking-[0.2em] text-zinc-700">05</span>
        </div>

        <div className="contact-intro max-w-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-300">
            LET&apos;S BUILD
            <br />
            SOMETHING <span className="text-lime-400">GREAT.</span>
          </p>

          <p className="mt-5 text-xs leading-6 text-zinc-500">
            Have an idea, a project, or an opportunity? Let&apos;s turn it into
            something meaningful.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="contact-heading max-w-3xl">
              <h2
                className="
                  text-5xl
                  font-black
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-6xl
                  lg:text-[5.5rem]
                "
              >
                START A
                <br />
                <span className="text-zinc-200">CONVERSATION</span>
              </h2>
            </div>

            <div className="contact-info mt-14 grid max-w-xl grid-cols-2 gap-10 border-t border-zinc-900 pt-8">
              <div>
                <p className="text-[8px] font-medium tracking-[0.25em] text-zinc-600">
                  DIRECT
                </p>

                <a
                  href="mailto:kishaniam401@gmail.com"
                  className="mt-3 inline-block text-[10px] text-zinc-300 transition-colors duration-300 hover:text-lime-400"
                >
                  kishaniam401@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[8px] font-medium tracking-[0.25em] text-zinc-600">
                  SOCIALS
                </p>

                <div className="mt-3 flex gap-4 text-[10px] text-zinc-300">
                  <a
                    href="https://github.com/iamkishan07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-lime-400"
                  >
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/kishan-singh-a7959b263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-lime-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="col-span-2">
                <p className="text-[8px] font-medium tracking-[0.25em] text-zinc-600">
                  STATUS
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(214,255,0,0.6)]" />

                  <span className="text-[10px] text-zinc-400">
                    Open to frontend opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={formRef}
            className="
              relative
              overflow-hidden
              border
              border-zinc-800
              bg-[#111111]/80
              p-7
              backdrop-blur-xl
              sm:p-8
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-br
                from-lime-400/[0.045]
                via-transparent
                to-transparent
              "
            />

            <form className="relative z-10" onSubmit={handleSubmit}>
              <div className="contact-field relative">
                <label className="text-[8px] font-medium tracking-[0.2em] text-zinc-500">
                  YOUR NAME
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-zinc-800
                    bg-transparent
                    pb-3
                    text-xs
                    text-white
                    outline-none
                    placeholder:text-zinc-700
                    transition-colors
                    duration-300
                    focus:border-transparent
                  "
                />

                <div className="input-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lime-400" />
              </div>

              <div className="contact-field relative mt-8">
                <label className="text-[8px] font-medium tracking-[0.2em] text-zinc-500">
                  YOUR EMAIL
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-zinc-800
                    bg-transparent
                    pb-3
                    text-xs
                    text-white
                    outline-none
                    placeholder:text-zinc-700
                    transition-colors
                    duration-300
                    focus:border-transparent
                  "
                />

                <div className="input-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lime-400" />
              </div>

              <div className="contact-field relative mt-8">
                <label className="text-[8px] font-medium tracking-[0.2em] text-zinc-500">
                  YOUR MESSAGE
                </label>

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  required
                  className="
                    mt-3
                    w-full
                    resize-none
                    border-0
                    border-b
                    border-zinc-800
                    bg-transparent
                    pb-3
                    text-xs
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-zinc-700
                    focus:border-transparent
                  "
                />

                <div className="input-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lime-400" />
              </div>

              <button
                type="submit"
                className="
                  contact-submit
                  group
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-between
                  bg-lime-400
                  px-5
                  py-3.5
                  text-[9px]
                  font-black
                  tracking-[0.18em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-lime-300
                  hover:shadow-[0_0_35px_rgba(214,255,0,0.12)]
                "
              >
                <span>SEND MESSAGE</span>

                <span className="flex items-center gap-2">
                  <span className="text-[9px] transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="contact-footer mt-32 border-t border-zinc-900 py-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xl font-black tracking-[-0.05em] text-lime-400">
                KISHAN.
              </span>
            </div>

            <p className="text-[8px] tracking-[0.18em] text-zinc-500">
              BUILT WITH REACT • GSAP • PASSION
            </p>

            <p className="text-[8px] text-zinc-600">
              © 2026 KISHAN. All rights reserved.
            </p>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                group
                flex
                items-center
                gap-2
                text-[8px]
                font-bold
                tracking-[0.15em]
                text-zinc-500
                transition-colors
                duration-300
                hover:text-lime-400
              "
            >
              BACK TO TOP
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-5 text-[7px] tracking-[0.15em] text-zinc-700">
            <a href="#home" className="transition-colors hover:text-lime-400">
              HOME
            </a>

            <a href="#about" className="transition-colors hover:text-lime-400">
              ABOUT
            </a>

            <a
              href="#projects"
              className="transition-colors hover:text-lime-400"
            >
              PROJECTS
            </a>

            <a href="#contact" className="text-lime-400">
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
