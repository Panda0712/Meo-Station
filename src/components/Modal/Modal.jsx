import { createPortal } from "react-dom";

const Modal = ({ handleCloseModal, title, children }) => {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <section className="fixed left-0 right-0 bottom-0 top-0 inset-0 bg-black/50 z-1000 flex items-center justify-center">
      <div className="bg-white relative p-4 rounded-lg max-w-[400px] w-[400px]">
        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold text-xl">{title}</p>
          <div
            onClick={handleCloseModal}
            className="cursor-pointer transition hover:opacity-80"
          >
            <span>❌</span>
          </div>
        </div>
        {children}
      </div>
    </section>,
    modalRoot
  );
};

export default Modal;
