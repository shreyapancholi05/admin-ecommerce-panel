import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col gap-20 w-full max-w-5xl px-6">
        <div className="flex flex-col gap-4 text-left lg:text-left sm:text-center px-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold  ">
            Everything Just,
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold ">
            One Click Away
          </h1>
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Check Our Products Here
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="bg-neutral-300/50 text-neutral-900 px-6 py-2 text-2xl rounded-xl w-48 md:w-56 font-semibold hover:bg-neutral border border-neutral-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
