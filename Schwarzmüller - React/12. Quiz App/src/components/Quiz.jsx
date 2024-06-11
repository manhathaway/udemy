import { useState, useCallback } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback((answer) => {
        setUserAnswers((previous) => {
            return [...previous, answer];
        });
        console.log(userAnswers);
    }, []);

    const handleTimeout = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        );
    } else {
        return (
            <div id='quiz'>
                <Question
                    key={activeQuestionIndex}
                    questionIndex={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    onTimeout={handleTimeout}
                />
            </div>
        );
    };
};

export default Quiz;