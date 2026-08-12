import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      if (sections.length === 0) return;

      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= 180) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (id) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActive("home");
      setIsOpen(false);

      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActive(id);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed
          left-0
          top-0
          z-[100]
          w-full
          transition-all
          duration-500
          ${scrolled ? "bg-[#0b0b0b]/75 backdrop-blur-xl" : "bg-transparent"}
        `}
      >
        {/* Subtle bottom glow — NO BORDER */}

        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />

        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <button
            onClick={() => handleNavigation("home")}
            className="group flex items-center gap-3"
          >
            {/* Logo */}

            <div
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-lime-400/[0.06]
                transition-all
                duration-300
                group-hover:bg-lime-400/10
              "
            >
              <span className="text-sm font-black text-lime-400">K</span>

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-full
                  origin-left
                  scale-x-0
                  bg-lime-400
                  transition-transform
                  duration-300
                  group-hover:scale-x-100
                "
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-[0.12em] text-white">
                KISHAN
                <span className="text-lime-400">.</span>
                DEV
              </p>

              <p className="mt-0.5 text-[8px] tracking-[0.28em] text-zinc-600">
                FRONTEND DEVELOPER
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item, index) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-lime-400"
                        : "text-zinc-500 hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`
                      text-[8px]
                      ${
                        isActive
                          ? "text-lime-400/60"
                          : "text-zinc-700 group-hover:text-lime-400/50"
                      }
                    `}
                  >
                    0{index + 1}
                  </span>

                  {item.name}

                  {/* Active line */}

                  <span
                    className={`
                      absolute
                      bottom-1
                      left-1/2
                      h-[2px]
                      -translate-x-1/2
                      rounded-full
                      bg-lime-400
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-100"
                      }
                    `}
                  />
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => handleNavigation("contact")}
            className="
              group
              hidden
              items-center
              gap-2
              rounded-lg
              bg-lime-400
              px-4
              py-2.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-black
              transition-all
              duration-300
              hover:bg-lime-300
              hover:shadow-[0_0_30px_rgba(214,255,0,0.15)]
              md:flex
            "
          >
            Let's Talk
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-white/[0.04]
              text-zinc-300
              transition-all
              duration-300
              hover:bg-lime-400/[0.08]
              hover:text-lime-400
              md:hidden
            "
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            md:hidden
            ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-[#0b0b0b]/95 px-6 pb-5 pt-3 backdrop-blur-2xl">
            {navItems.map((item, index) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    px-3
                    py-4
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-lime-400"
                        : "text-zinc-500 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] tracking-[0.2em] text-zinc-700">
                      0{index + 1}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                      {item.name}
                    </span>
                  </div>

                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(214,255,0,0.6)]" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => handleNavigation("contact")}
              className="
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-lime-400
                px-4
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-black
              "
            >
              Let's Talk
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
