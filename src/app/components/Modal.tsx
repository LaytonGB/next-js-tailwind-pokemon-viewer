import Link from "next/link";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/?resultsPerPage=10&pageNumber=1">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border border-slate-600 w-3/4 shadow-lg rounded-md bg-white dark:bg-slate-800">
          {children}
        </div>
      </div>
    </Link>
  );
}
