import React, {useContext} from 'react';
import {UserContext} from './ComponentA.jsx';

function ComponenetD(){

    const user = useContext(UserContext);
    return(
        <div className="box">
            <h1>ComponenetD</h1>
            <h2>{`Bye ${user}`}</h2>
        </div>
    )
}

export default ComponenetD;