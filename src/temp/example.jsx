/**
 * MyComponent.jsx
 * 
*/

/*
import React, {useState, useEffect, useRef} from 'react';

function MyComponent(){

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);

    useEffect(() => {
        console.log("COMPONENT RENDERED");
    });

    function handleClick1(){
        inputRef1.current.focus();
        inputRef1.current.style.backgroundColor = "yellow";
        inputRef2.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "";

    }
    function handleClick2(){
        inputRef2.current.focus();
        inputRef1.current.style.backgroundColor = "";
        inputRef2.current.style.backgroundColor = "yellow";
        inputRef3.current.style.backgroundColor = "";

    }
    function handleClick3(){
        inputRef3.current.focus();
        inputRef1.current.style.backgroundColor = "";
        inputRef2.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "yellow";

    }

    return (
        <div>
            <button onClick={handleClick1}>
                Click me!
            </button>
            <input ref={inputRef1}/>
            <button onClick={handleClick2}>
                Click me!
            </button>
            <input ref={inputRef2}/>
            <button onClick={handleClick3}>
                Click me!
            </button>
            <input ref={inputRef3}/>
        </div>            
    );
}

export default MyComponent;
/*

function MyComponent(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        console.log("EVENT LISTNER ADDED.");    

        return () => {
            window.removeEventListener("resize", handleResize);
            console.log("EVENT LISTNER REMOVED.");    
        }
    }, []);

    useEffect(() => {
        document.title = `Size: ${width} x ${height}`;
    }, [width, height]);

    function handleResize(){
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    return(<>
        <p>Window Width: {width}px</p>
        <p>Window Height: {height}px</p>
    </>);
}

export default MyComponent;







// app.jsx


/*
react Hook = useState, useEffect, useContext, useReducter,useCallback, and more...
useState()
import React from "react";
import Stopwatch from "./Stopwatch";

function App(){

  return(<>
  <Stopwatch/>
  <Stopwatch/>
  <Stopwatch/>
  <Stopwatch/>
  </>  );
}

export default App;






// prop = read-only properties, betweencomponenet share
// parents and child componenet
// <componenet key=value>
/*
import Button from "./Button.jsx";
import ProfilePicture from "./ProfilePicture.jsx";

function App(){

  return(<ProfilePicture />);
}


export default App;



  */

