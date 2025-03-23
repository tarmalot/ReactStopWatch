import { useState, useEffect } from "react";

export default function Stopwatch() {
    const [running, setRunning] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [seconds, setSeconds] = useState(0)
    
    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600)
        let minutes = Math.floor((seconds % 3600) / 60)
        let second = seconds % 60
        return [
            String(hours).padStart(2, "0"), 
            String(minutes).padStart(2, "0"), 
            String(second).padStart(2, "0")
        ].join(":")
    }

    const handleStartPause = () => {
        if(!running) {
            setRunning(true)
            if(seconds === 0) {
                setStartTime(Math.floor(Date.now() / 1000))
            }
        }else{
            setRunning(false)
        }
    }

    const handleReset = () => {
        setRunning(false)
        setStartTime(Math.floor(Date.now() / 1000));
        setSeconds(0)
    }
    
    useEffect(() => {
        let interval
        if(running) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)
        }else{
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [running])

    return (
        <div class="stopwatch">
            <h1 id="time">{formatTime(seconds)}</h1>
            <button id="start" onClick={handleStartPause}>{running ? "Pause" : "Start"}</button>
            <button id="reset" onClick={handleReset}>Reset</button>
        </div>
    )
        
    
}