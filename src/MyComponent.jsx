import React, {useState, useEffect} from 'react';

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



/*
function MyComponent(){
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("green");

    useEffect(() =>{
        document.title = `Count: ${count} ${color}`;

        return () => {
            //SOME CLEANUP CODE
        }
    }, [count, color]);

    function addCount(){
        setCount(count => count + 1);
    }

    function subtractCount(){
        setCount(count => count - 1);
    }

    function changeColor(){
        setColor(color => color === "green" ? "red" : "green");
    }

    return(<>
        <p style={{color: color}}>Count: {count}</p>
        <button onClick={addCount}>Add</button>
        <button onClick={subtractCount}>Subtract</button><br/>
        <button onClick={changeColor}>Change Color</button>
        </>
    );
}


export default MyComponent;

/*

function MyComponent() {
    const [cars, setCars] = useState([]);
    const [carYear, setCarYear] = useState(new Date().getFullYear());
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");

    function handleAddCar(){
        const newCar = {year : carYear, 
                        make: carMake, 
                        model: carModel};
        setCars(cars => [...cars, newCar]);

        setCarYear(new Date().getFullYear());
        setCarMake("");
        setCarModel("");
    }

    function handleRemoveCar(index){
        setCars(c => c.filter((element, i) => i !==index));
    }

    function handleYearChange(event){
        setCarYear(event.target.value);
    }


    function handleMakeChange(event){
        setCarMake(event.target.value);
    }

    function handleModelChange(event){
        setCarModel(event.target.value);
    }


    return (<div>
                <h2>List of Car Objects</h2>
                <ul>
                    {cars.map((car, index) => 
                    <li key={index} onClick={() => handleRemoveCar(index)}>
                        {car.year} {car.make} {car.model}
                    </li>)}
                </ul>
                <input type='number' value={carYear} onChange={handleYearChange}/><br/>
                <input type='text' value={carMake} onChange={handleMakeChange}
                        placeholder='Enter car make'/><br/>
                <input type='text' value={carModel} onChange={handleModelChange}
                        placeholder='Enter car make'/><br/>
                <button onClick={handleAddCar}>Add car</button>

            </div>);
}


export default MyComponent;


/*
function MyComponent(){
    const[foods, setFoods] = useState(["Apple", "Orange", "Banana"]);

    function handleAddFood(){
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = "";

        setFoods(foods => [...foods, newFood]);
        //setFoods(f => [...f, newFood]);

    }

    function handleRemoveFood(index){
        //_ === element
        setFoods(foods.filter((_, i) => i !== index));

    }

    return(<div>   
                <h2>List of Food</h2>
                <ul>
                    {foods.map((food, index) =>  
                     <li key={index} onClick={() => handleRemoveFood(index)}>
                        {food}
                    </li>)}
                </ul>
                <input type="text" id="foodInput" placeholder="Enter food name"/>
                <button onClick={handleAddFood}>Add Food</button>

            </div>);
}

export default MyComponent;

function MyComponent(){
    const [car, setCar] = useState({year: 2024,
                                     make: "Ford",
                                     model: "Mustang"});
    
    function handleYearChange(event){
        setCar(car => ({...car, year: event.target.value}));
    }

    function handleMakeChange(event){
        setCar(car => ({...car, make: event.target.value}));
    }

    function handleModelChange(event){
        setCar(car =>({...car, model: event.target.value}));
    }

    return(<div>
                <p>Your Favorite car is : {car.year} {car.make} {car.model}</p>

                <input type='number' value={car.year} onChange={handleYearChange}/>
                <input type='text' value={car.make} onChange={handleMakeChange}/>
                <input type='text' value={car.model} onChange={handleModelChange}/>

            </div>);
}

export default MyComponent;


/*
function MyComponent(){
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

export default MyComponent;




/*
function MyComponent(){

    const [name, setName] = useState("guest");
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("Visa");
    const [shipping, setShipping] = useState("Delivery");


    function handleNameChange(event){
        setName(event.target.value);
    }

    function handleQuantityChange(event){
        setQuantity(event.target.value);
    }

    function handleCommentChange(event){
        setComment(event.target.value);
    }

    function handlePaymentChange(event){
        setPayment(event.target.value);
    }

    function handleShippingChange(event){
        setShipping(event.target.value);
    }

    return (<div>
            <input value={name} onChange={handleNameChange} />
            <p>Name : {name}</p>

            <input value={quantity} onChange={handleQuantityChange} type="number" />
            <p>Quantity : {quantity}</p>

            <textarea value={comment} onChange={handleCommentChange} placeholder="Enter delivery instructions"/>
            <p>Comment : {comment}</p>

            <select value={payment} onChange={handlePaymentChange}>
                <option value="">select an option</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Giftcard">Giftcard</option>
            </select>
            <p>Payment : {payment}</p>

            <label> 
                <input type="radio" value="Pick Up" checked={shipping === "Pick Up"} 
                    onChange={handleShippingChange} />
                Pick Up
            </label><br/>
            <label>
                <input type="radio" value="Delivery" checked={shipping === "Delivery"}
                    onChange={handleShippingChange} />
                Delivery
            </label>
            <p>Shipping : {shipping}</p>
        </div>);

}

export default MyComponent;

function MyComponent() {
    const [name, setName] = useState("Guest");
    const [age, setAge] = useState(0);
    const [isEmployed, setIsEmployed] = useState(false);

    const updateName = () => {
        setName("Spongebob");
    }

    const incrementAge = () => {
        setAge(age + 1);
    }

    const decrementAge = () => {
        setAge(age - 1);
    }

    const toggleEmployedStatus = () => {
        setIsEmployed(!isEmployed);
    }

    return(<div>
                <p>Name: {name}</p>
                <button onClick={updateName}>Set Name</button>

                <p>Age: {age}</p>
                <button onClick={incrementAge}>Increment Age</button>

                <p>is employed: {isEmployed ? "Yes" : "No"}</p>
                <button onClick={toggleEmployedStatus}>toggle status</button>

        </div>);
}
*/