import { MdArrowDropDown } from "react-icons/md";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <footer>
      <button
        onClick={scrollToTop}
        className="py-2 px-2 rounded-full bg-white text-black"
      >
        <MdArrowDropDown />
      </button>
    </footer>
  );
};
export default Footer;
