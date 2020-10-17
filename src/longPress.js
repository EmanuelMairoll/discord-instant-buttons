import {useEffect, useState} from 'react';

export default function useLongPress(shortCallback, longCallback, ms = 300) {
    const [pressState, setPressState] = useState(false);

    useEffect(() => {
        if (!pressState) return

        let wasLongPress = false
        const timerId = setTimeout(() => {
            setPressState(false)
            wasLongPress = true;
            longCallback()
        }, ms);

        return () => {
            if (!wasLongPress) {
                clearTimeout(timerId)
                shortCallback()
            }
        };
    }, [shortCallback, longCallback, ms, pressState]);

    return {
        onMouseDown: () => setPressState(true),
        onMouseUp: () => setPressState(false),
        onMouseLeave: () => setPressState(false),
        onTouchStart: () => setPressState(true),
        onTouchEnd: () => setPressState(false),
    };
}