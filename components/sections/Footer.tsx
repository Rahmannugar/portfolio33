import Image from "next/image";
import Link from "next/link";
import { MdArrowDropUp } from "react-icons/md";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menuItems = [
    {
      label: "Experience",
      link: pathname === "/" ? "/#experience" : "/experience",
    },
    {
      label: "Projects",
      link: pathname === "/" ? "/#projects" : "/projects",
    },
    {
      label: "Blog",
      link: "/blog",
    },
  ];

  return (
    <footer className="w-screen border-t border-white/10 bg-[#1e1d1d] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-7 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="grid gap-6">
            <Link href="/">
              <Image src="/33.png" loading="eager" alt="Nugar.dev" width={80} height={80} />
            </Link>
            <span className="text-sm text-white/50">
              ©{currentYear} 33™. All Rights Reserved.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-14">
            <div>
              <h2 className="mb-5 text-sm font-semibold uppercase text-white/50">
                Sections
              </h2>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      className="text-white/80 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-sm font-semibold uppercase text-white/50">
                Socials
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="mailto:cladeadenugar@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white"
                  >
                    Email
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/Rahmannugar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/Rahmannugar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.x.com/nugarRahman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white"
                  >
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-sm font-semibold uppercase text-white/50">
                File
              </h2>
              <ul>
                <li>
                  <Link
                    href="https://docs.google.com/document/d/1ibsZ8pXdPh5WeA22O7mXJTckm9-3OWxYASYGmaO8f68"
                    className="text-white/80 hover:text-white"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 sm:mt-0">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full cursor-pointer border border-white/10 bg-white text-black hover:bg-gray-200 transition-colors"
          aria-label="Scroll to top"
        >
          <MdArrowDropUp size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
