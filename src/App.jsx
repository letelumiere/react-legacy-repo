//react Hook = useState, useEffect, useContext, useReducter,useCallback, and more...
//useState()

import Counter from "./Counter.jsx"


function App(){

  return(< Counter/>);
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


/*
import List from './List.jsx'

function App() {
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
        {vegetables.length>0 && <List items={vegetables} category="Vegetables"/>}
    </>);
}

export default App

/*
  return(
    <>
      <UserGreeting isLoggedIn={false} username="BroCode"/>
    </>
  );

  return(
    <>
      <Student name="Spongebob" age={30} isStudent={false}/>
      <Student name="Patrick" age={43} isStudent={false}/>
      <Student name="Squidward" age={50} isStudent={false}/>
      <Student name="Sandy" age={27} isStudent={true}/>
      <Student name="Larry" />
      <Student />
    </>
  );
  */