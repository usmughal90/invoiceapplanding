import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen  bg-globalBackground flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-7xl font-extrabold  text-white drop-shadow-lg mb-4">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Page Not Found
        </h2>

        <Link
          href="/"
          className="bg-(--color-primary) hover:bg-[#c60d17]/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg transform hover:scale-102 active:scale-95"
        >
          Go To Home Page
        </Link>
      </div>
    </main>
  );
}
