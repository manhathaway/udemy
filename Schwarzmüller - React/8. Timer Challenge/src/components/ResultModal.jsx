import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({accumulatedTime, targetTime, resetTime}, ref) {
    const dialog = useRef();
    const userLost = accumulatedTime == targetTime;
    const userScore = (accumulatedTime / targetTime * 100).toFixed(1);
    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });
    
    return createPortal(
        <dialog ref={dialog} className='result-modal'>
            <h2>{userLost ? 'You Loose' : 'Game Over'}</h2>
            <p>Target Time: <strong>{targetTime} seconds</strong>.</p>
            {
                userLost ?
                <p>You've failed to stop the timer.</p>
                :
                <>
                    <p>You stopped the timer with <strong>{(targetTime - accumulatedTime).toFixed(2)} seconds</strong> left.</p>
                    <p>Your Score: <strong>{userScore}%</strong>.</p>
                </>
            }
            <form method='dialog'>
                <button onClick={resetTime}>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;