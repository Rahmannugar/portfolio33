import Image from "next/image";
import Link from "next/link";
const menuItems = [
  { label: "Experience", link: "/#experience" },
  { label: "Projects", link: "/#projects" },
  { label: "Blog", link: "/blog" },
  { label: "Contact", link: "/#contact" },
];

const socialItems = [
  { label: "Email", link: "mailto:cladeadenugar@gmail.com" },
  { label: "GitHub", link: "https://github.com/rahmannugar" },
  { label: "LinkedIn", link: "https://linkedin.com/in/rahmannugar" },
  { label: "Twitter", link: "https://twitter.com/NugarRahman" },
];

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="w-[90%] lg:w-full flex items-center justify-between py-1 left-1/2 -translate-x-1/2 px-5 md:px-10 absolute top-7 max-w-7xl mx-auto bg-white/10 backdrop-blur-[5px] border border-white/20 rounded-full">
        <div>
          <Image src="/33.png" alt="Logo" priority width={50} height={50} />
        </div>

        {/* desktop nav */}
        <div className="hidden md:flex gap-8 text-xl font-semibold text-white">
          <Link href="/#experience">Experience</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/#blog">Blog</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        {/* mobile navtools */}
        <div></div>

        {/* mobile nav */}
        {/* <div style={{ height: "100vh", background: "#fffff" }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/33.png"
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
          isFixed={false}
        />
      </div> */}
      </nav>
    </div>
  );
};

export default Navbar;
