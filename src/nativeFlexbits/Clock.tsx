import React, { JSX } from 'react'
import { useState, useEffect } from 'react'

function Clock(): JSX.Element {
      const [time, setTime] = useState(new Date().toLocaleTimeString());
      
      useEffect(() => {
        const t = setInterval(() => {
          setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(t);
      }, []);
      
      return (
        <div className="text-xl font-bold text-green-400">
          {time}
        </div>
      );
    }

export default Clock;