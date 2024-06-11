import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, showDialog, onClose }) => {
  const dialog = useRef();

  useEffect(() => {
    showDialog ? dialog.current.showModal() : dialog.current.close();
  }, [showDialog])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {showDialog && children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
