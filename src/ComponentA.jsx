import React, {useState, createContext} from 'react';
import ComponenetB from "./ComponentB.jsx";

export const UserContext = createContext();
//props drilling
function ComponenetA(){
    const [user, setUser] = useState("BroCode");

    return(
        <div className="box">
            <h1>ComponenetA</h1>
            <h2>{`Hello ${user}`}</h2>
            <UserContext.Provider value={user}>
                <ComponenetB user={user}/>
            </UserContext.Provider>
        </div>
    )
}

export default ComponenetA;