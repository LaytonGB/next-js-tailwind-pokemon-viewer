import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-lg font-bold text-gray-800 dark:text-white"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
