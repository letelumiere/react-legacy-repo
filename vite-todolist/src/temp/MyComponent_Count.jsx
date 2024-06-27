import { useState } from "react";


function MyComponent_05(){
    const [count, setCount] = useState(0);

    function increment(){
        //updater Function ex) y => y+1
        //function  내에서 multiple state가 update되려면 arrow function 사용 
        //ex)
        //setCount(count + 1);
        //setCount(count + 1);
        //setCount(count + 1);  
        // and
        setCount(count => count + 1);  
        setCount(count => count + 1);  
        setCount(count => count + 1);  

    }

    function decrement(){
        setCount(count => count - 1);
    }
    
    function reset(){
        //setCount(0);
        setCount(count => count = 0);
    }

    return(<div>
            <p>Count : {count}</p>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <button onClick={increment}>Increment</button>
        </div>);
}

export default MyComponent_05;

