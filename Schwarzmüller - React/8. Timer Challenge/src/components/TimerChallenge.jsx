import { useState, useRef, useEffect } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
    const [runningTimer, setRunningTimer] = useState(0);
    const timerIsActive = runningTimer > 0 && runningTimer <= targetTime * 1000; 
    const timer = useRef();
    const dialog = useRef();

    useEffect(() => {
        console.log('TimerChallenge rendered.');
    }, [])
    
    const handleStart = () => {
        timer.current = setInterval(() => {
            setRunningTimer(previous => previous + 10);
        }, 10);
    };

    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();
    };

    if (runningTimer >= targetTime * 1000) {
        clearInterval(timer.current);
        dialog.current.open();
    };
    
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} accumulatedTime={runningTimer / 1000} resetTime={() => setRunningTimer(0)}/>
            <section className='challenge'>
                <h2>{title}</h2>
                <p className='challenge-time'>{targetTime} Second{targetTime > 1 ? 's' : ''}</p>
                <p><button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'}</button></p>
                <p className={timerIsActive ? 'active' : undefined}>{timerIsActive ? 'Running' : 'Inactive'}</p>
            </section>
        </>
    );
};

export default TimerChallenge;