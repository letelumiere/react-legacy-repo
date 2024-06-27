import { useState, useEffect} from "react";

function MyComponent_Clock(){
    const [time, setTime] = useState(new Date());
    const [format, setFormat] = useState("12");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime(format){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        let meridiem = "";

        if(format === "12") {
            hours = hours % 12 || 12;
            meridiem = hours >= 12 ? "PM" : "AM";
        }

        return `${padZero(hours)} : ${padZero(minutes)} : ${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    function changeFormat(){
        return setFormat(format === "12" ? "24" : "12");
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime(format)}</span>
                <button onClick={changeFormat}>Change Format</button>
            </div>
        </div>
    );
}

export default MyComponent_Clock;
