import { useRef, useState } from 'react';

export const useTimers = () => {
  const [sec, setSec] = useState(0)
  const [ clockEnabled, setClockEnabled ] = useState(false)
  const clock = useRef([])
  const timers = useRef([]);

  const updateClock = () => {
    setSec(prevSec => prevSec +1)
  }
  
  const setTimeClock = (callback, delay) => {
    const clockId = setInterval(callback, delay);
    clock.current.push(clockId);
    return clockId;
  };

  const stopClock = () => {
    clock.current.forEach(clearInterval);
    clock.current = [];
    setSec(prevSec => prevSec)
  }
  
  const clearClock = () => {
    setSec(0)
    clock.current.forEach(clearInterval);
    clock.current = [];
  }

  const setTimer = (callback, delay) => {
    const timerId = setTimeout(callback, delay);
    timers.current.push(timerId);
    return timerId;
  };

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  return { sec, clock, stopClock, setTimeClock, updateClock, clearClock, clockEnabled, setClockEnabled, setTimer, clearAllTimers };
};
