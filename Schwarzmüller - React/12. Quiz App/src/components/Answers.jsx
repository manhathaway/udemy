import { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) { shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5) };
    
    return (        
        <ul id='answers'>
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                
                let buttonStyle;
                if (answerState === 'answered' && isSelected) { buttonStyle = 'selected'; }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) { buttonStyle = answerState; }
                
                return (
                    <li className='answer' key={answer}>
                        <button
                            className={buttonStyle}
                            onClick={() => onSelect(answer)}
                            disabled={answerState !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Answers;