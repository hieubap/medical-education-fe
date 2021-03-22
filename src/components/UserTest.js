import React from 'react'

const User = (props) => {
    return (
        <li>
            <span>name:{props.children}, age: {props.age} </span>
            <input onChange={props.changeEvent} value={props.children}></input>
            <button onClick={props.delEvent}>Delete</button>
        </li>
    )
}

export default User;