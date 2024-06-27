import List from './List.jsx'

function MyComponent_List() {
    const fruits = [
        {id: 1, name : "apple", calories : 95}, 
        {id: 2, name : "orange", calories : 45}, 
        {id: 3, name : "banana", calories : 105}, 
        {id: 4, name : "coconut", calories : 159}, 
        {id: 5, name : "pineapple", calories : 37}];
    const vegetables = [
        {id: 6, name : "potatoes", calories : 110}, 
        {id: 7, name : "celery", calories : 15}, 
        {id: 8, name : "carrots", calories : 25}, 
        {id: 9, name : "corn", calories : 63}, 
        {id: 10, name : "broccoli", calories : 50}];

    return(<>
        {fruits.length>0 && <List items={fruits} category="Fruits"/>}
        {vegetables.length>0 && <List items={vegetables} category="Vegetabless"/>}
    </>);
}

export default MyComponent_List;


/*
    const fruits = [
        {id: 1, name : "apple", calories : 95}, 
        {id: 2, name : "orange", calories : 45}, 
        {id: 3, name : "banana", calories : 105}, 
        {id: 4, name : "coconut", calories : 159}, 
        {id: 5, name : "pineapple", calories : 37}];
*/    
    //fruits.sort((a, b) => a.name.localeCompare(b.name));  //ALPHABETICAL
    //fruits.sort((a, b) => b.name.localeCompare(a.name));    //REVERSE-ALPHABETICAL
    //fruits.sort((a, b) => a.calories - b.calories);     //NUMERIC
    //fruits.sort((a, b) => b.calories - a.calories);     //REVERSE-NUMERIC

    //const lowCalFruits = fruits.filter(fruit => (fruit.calories<100));
    //const highCalFruits = fruits.filter(fruit => (fruit.calories>=100));s