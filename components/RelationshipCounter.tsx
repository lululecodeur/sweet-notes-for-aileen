
import React, { useState, useEffect } from 'react';
import { START_DATE } from '../constants';

const RelationshipCounter: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFuture: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(START_DATE).getTime();
      const now = new Date().getTime();
      let diff = now - start;
      
      const isFuture = diff < 0;
      if (isFuture) diff = Math.abs(diff);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isFuture });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center mb-6">
      <span className="text-[10px] uppercase tracking-[0.3em] text-pink-400 mb-2 font-semibold">
        {timeLeft.isFuture ? "Counting down to us" : "Time spent together"}
      </span>
      <div className="flex gap-4 md:gap-6 text-gray-600">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hrs', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-light tabular-nums">{String(item.value).padStart(2, '0')}</span>
            <span className="text-[8px] uppercase tracking-widest text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationshipCounter;
