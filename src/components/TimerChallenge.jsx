import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge ({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function resetTimer() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStartChallenge() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStopChallenge() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost" remainingTime={timeRemaining} onReset={resetTimer}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStopChallenge : handleStartChallenge}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={timerIsActive ? 'active' : ''}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}