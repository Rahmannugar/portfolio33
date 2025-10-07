import { MdArrowDropUp } from "react-icons/md";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <footer className="w-full py-10 mt-20">
      <div className="flex items-center justify-center">
        <button
          onClick={scrollToTop}
          className="py-3 px-3 rounded-full cursor-pointer bg-white text-black"
        >
          <MdArrowDropUp />
        </button>
      </div>
    </footer>
  );
};
export default Footer;
