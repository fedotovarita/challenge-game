import {useRef, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';

export default function ResultModal ({ref, result, targetTime, remainingTime, onReset}) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const timeInSeconds = (remainingTime / 1000).toFixed(2);
    const score = Math.floor((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open: () => dialog.current.showModal(),
        };
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You {result}</h2>}
            {!userLost && <h2>Your score {score}</h2>}
            <p>Target time was <strong>{targetTime}</strong> second{targetTime > 1 ? 's' : ''}.</p>
            <p>You stopped the timer within <strong>{timeInSeconds} seconds left.</strong> </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}