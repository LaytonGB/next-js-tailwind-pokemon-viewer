import ModalBackground from "./ModalBackground";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <ModalBackground>
      <div className="border border-slate-600 w-3/4 h-3/4 shadow-lg rounded-md bg-white dark:bg-slate-800 relative overflow-auto">
        {children}
      </div>
    </ModalBackground>
  );
}
