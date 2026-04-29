import { useState } from 'react';

function Counter() {
    // Declare state: count starts at 0
    const [count, setCount] = useState(0);
    
    // count = current value (starts at 0)
    // setCount = function to update it
    // 0 = initial value
    
    return (
        <div className="counter">
            <h3>Counter: {count}</h3>
            
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
            
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}

export default Counter;