"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-b-slate-600 bg-white dark:bg-gray-800 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/?resultsPerPage=10&pageNumber=1"
          className="text-lg font-bold text-gray-800 dark:text-white"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
