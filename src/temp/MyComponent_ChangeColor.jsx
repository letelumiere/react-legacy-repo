import {useState, useEffect} from "react";

function MyComponent_two() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("green");

    useEffect(() => {
        document.title = `Count: ${count} ${color}`;

        return () => ({

        }, [count, color]);
    });

    function addCount(){
        setCount(count => count+1);
    }

    function subtractCount(){
        setCount(count => count-1);
    }

    function changeColor(){
        setColor(color => color == "green" ? "red" : "green");
    }

    return(<>
        <p style={{color: color}}>Count : {count}</p>
        <button onClick={addCount}>add</button>
        <button onClick={subtractCount}>Subtract</button>
        <button onClick={changeColor} value={"red"}>changeRed</button>
        <button onClick={changeColor} value={"green"}>changeGreen</button>

    </>);
}

export default MyComponent_two;
