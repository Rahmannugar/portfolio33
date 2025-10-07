import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <div className="min-h-screen flex flex-col mt-[-100px] justify-center items-center pt-40 lg:pt-48 space-y-6">
        <h1 className="text-5xl font-bold">40!Found</h1>
        <h2 className="text-lg">The page you requested for was not found!</h2>
        <Link href="/">
          <button className="bg-purple-400 hover:bg-purple-300 active:bg-purple-300 duration-300 ease-in-out text-white py-3 px-6 cursor-pointer rounded-full">
            Back To Home
          </button>
        </Link>
      </div>
    </main>
  );
};
export default NotFound;
