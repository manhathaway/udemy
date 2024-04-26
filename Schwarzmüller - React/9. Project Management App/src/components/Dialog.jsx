import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const Dialog = forwardRef(({ children }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });
    
    return createPortal(
        <dialog ref={dialog} className='p-[50px] border-b-[3px] border-stone-400'>
            {children}
            <form action='dialog'>
                <button className='block px-2 py-1 mx-auto mt-[15px] rounded-md bg-stone-400 text-stone-100 hover:bg-stone-500 hover:text-stone-200'>Close</button>
            </form>
        </dialog>
    , document.querySelector('#modal-root'));
});

export default Dialog;