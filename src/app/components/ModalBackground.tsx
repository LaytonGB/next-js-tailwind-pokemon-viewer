"use client";

import { useRouter } from "next/navigation";

export default function ModalBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      onClick={router.back}
    >
      {children}
    </div>
  );
}
