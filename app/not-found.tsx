import Link from "next/link";

const NotFound = () => {
  return (
    <main className="mt-16 mb-10 xl:px-28 px-5 lg:px-16 2xl:flex 2xl:justify-center min-h-screen 2xl:items-center sm:px-10">
      <div>
        <h1
          className={`text-[#CDA274] text-[6.25rem] md:text-[9.375rem] lg:text-[12.5rem]`}
        >
          404
        </h1>
        <h2 className="text-[#292F36] max-w-[35.563rem] text-[1.125rem] md:text-[1.875rem] lg::text-[2.188rem]">
          We are sorry, but the page you requested for was not found!
        </h2>
        <Link href="/">
          <button className="bg-[#292F36] text-[0.875rem] mt-10 lg:text-[1.125rem] text-white shadow-md rounded-[0.5rem] py-3 px-5">
            Back To Home
          </button>
        </Link>
      </div>
    </main>
  );
};
export default NotFound;
