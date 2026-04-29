import { useState } from 'react';

function Toggle() {
    const [isOn, setIsOn] = useState(false);
    
    return (
        <div className="toggle">
            <p>The light is {isOn ? 'ON 💡' : 'OFF 🌑'}</p>
            
            <button onClick={() => setIsOn(!isOn)}>
                Toggle
            </button>
        </div>
    );
}

export default Toggle;