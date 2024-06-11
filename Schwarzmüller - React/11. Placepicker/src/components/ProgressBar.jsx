import { useState, useEffect } from 'react';

const ProgressBar = ({ timer }) => {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        const dialogInterval = setInterval(() => {
          setRemainingTime(previous => previous - 10);
        }, 10)
    
        return () => clearInterval(dialogInterval);
      }, []);

      return <progress value={remainingTime} max={timer} />;
};

export default ProgressBar;
