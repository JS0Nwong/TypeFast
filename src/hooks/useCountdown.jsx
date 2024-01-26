import { useEffect, useRef } from 'react'
import useStore from '../utils/store'

export default function useCountdown(callback, delay) {
    const { time } = useStore()
    const intervalRef = useRef(null);
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => savedCallback.current()
        if(typeof delay === 'number') {
            intervalRef.current = window.setInterval(tick, delay)
            return () => window.clearInterval(intervalRef.current)
        }
    }, [delay])
    
    return intervalRef
}
