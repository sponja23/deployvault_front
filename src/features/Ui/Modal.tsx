import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const Modal = ({
  children,
  className,
  show,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  show: boolean;
  onClose: () => void;
}) => {
  if (!show) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-accent/10 backdrop-blur-md z-40"
        onClick={onClose}
      />
      <div
        className={twMerge(
          "shadow-lg bg-primary-600 p-8 fixed z-50 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2",
          className,
        )}
      >
        {children}
      </div>
    </>,
    document.getElementById("modal-root")!,
  );
};
export default Modal;
