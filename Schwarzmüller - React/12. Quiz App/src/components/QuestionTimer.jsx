import { useState, useEffect } from 'react';

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
    
        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((previous) => {
                return previous - 100;
            })
        }, 100);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <progress
            className={mode}
            id='question-time'
            max={timeout}
            value={remainingTime}
        />
    );
};

export default QuestionTimer;