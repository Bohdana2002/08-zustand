"use client";
import css from "./Modal.module.css";

import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();
  const close = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        {!onClose && (
          <button className={css.button} onClick={close}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
