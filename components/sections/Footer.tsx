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
      label: "Services",
      link: "/#services",
    },
    {
      label: "Blog",
      link: "/blog",
    },
  ];

  return (
    <footer className="w-screen bg-[#1e1d1d] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-7 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
          <div>
            <Link href="/">
              <Image src="/33.png" alt="Nugar.dev" width={100} height={100} />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="flex justify-between items-start gap-10">
            {/*App Section */}
            <div>
              <h2 className="mb-6 font-semibold uppercase">Sections</h2>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.link} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials Section */}
            <div>
              <h2 className="mb-6 font-semibold uppercase">Socials</h2>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="mailto:cladeadenugar@gmail.com"
                    target="_blank"
                    className="hover:underline"
                  >
                    Email
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/Rahmannugar"
                    target="_blank"
                    className="hover:underline"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/Rahmannugar"
                    target="_blank"
                    className="hover:underline"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.x.com/nugarRahman"
                    target="_blank"
                    className="hover:underline"
                  >
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>

            {/* File Section */}
            <div>
              <h2 className="mb-6 font-semibold uppercase">File</h2>
              <ul>
                <li>
                  <Link
                    href="https://docs.google.com/document/d/1ibsZ8pXdPh5WeA22O7mXJTckm9-3OWxYASYGmaO8f68"
                    className="hover:underline"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/40 w-full my-6" />

        {/* Copyright */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="sm:text-center">
            ©{currentYear} 33™. All Rights Reserved.
          </span>
        </div>
      </div>
      {/* Scroll to top button */}
      <div className="flex items-center justify-center mt-4 sm:mt-0">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors"
        >
          <MdArrowDropUp size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
