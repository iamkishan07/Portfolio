import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Intro = ({ onComplete }) => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.set(".intro-line", {
        scaleX: 0,
        transformOrigin: "center",
      })
        .to(".intro-line", {
          scaleX: 0.25,
          duration: 0.3,
          ease: "power3.out",
        })
        .fromTo(
          ".intro-k",
          {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.05",
        )
        .to(
          ".intro-name",
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
          },
          "-=0.05",
        )
        .to(
          ".intro-role",
          {
            opacity: 1,
            letterSpacing: "0.25em",
            duration: 0.45,
          },
          "-=0.05",
        )
        .to(".intro-line", {
          scaleX: 1,
          duration: 0.5,
          ease: "expo.out",
        })
        .to(
          ".intro-background-text",
          {
            opacity: 0.035,
            scale: 1,
            duration: 0.3,
          },
          "-=0.3",
        )
        .to(
          ".intro-glow",
          {
            x: "120vw",
            duration: 0.45,
            ease: "power2.inOut",
          },
          "-=0.05",
        )
        .to(".intro-content", {
          yPercent: -8,
          duration: 0.3,
          ease: "power3.in",
        })
        .to(".intro-screen", {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.55,
          ease: "expo.inOut",
        });
    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={introRef}
      className="intro-screen fixed inset-0 z-[9999] overflow-hidden bg-[#080808]"
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* huge typography */}
      <div className="intro-background-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.05] whitespace-nowrap font-black text-[25vw] tracking-[-0.08em] text-white opacity-0">
        KISHAN
      </div>

      {/* content */}
      <div className="intro-content absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* line */}
          <div className="intro-line absolute -top-8 h-[1px] w-[100vw] bg-white/20" />

          {/* K */}
          <div className="intro-k relative text-[110px] font-black leading-none tracking-[-0.12em] text-white">
            K{/* lime light */}
            <div className="intro-glow pointer-events-none absolute -left-[100vw] top-0 h-full w-[60px] bg-lime-400/20 blur-xl" />
          </div>

          {/* name */}
          <div className="intro-name mt-5 translate-y-2 font-mono text-[10px] tracking-[0.25em] text-white opacity-0">
            KISHAN®
          </div>

          {/* role */}
          <div className="intro-role mt-2 font-mono text-[7px] tracking-[0.05em] text-white/35 opacity-0">
            FRONTEND DEVELOPER
          </div>
        </div>
      </div>

      {/* bottom left */}
      <div className="absolute bottom-6 left-6 font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
        <div>Initializing Experience</div>
        <div className="mt-1">India · 2026</div>
      </div>

      {/* bottom right */}
      <div className="absolute bottom-6 right-6 font-mono text-[7px] tracking-[0.18em] text-white/25">
        001
      </div>
    </div>
  );
};

export default Intro;
