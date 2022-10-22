import React from 'react'

function Button({style={},...props}) {
    console.log(props)
    // return <button className="btn">{props.btnValue}</button>
    return (<button
        style={{ margin: 12  , color: 'blue', ...style}}
        className={`btn ${props.otherClasses}`}
        onClick={props.click}>{props.titleBut}</button>
    )

}
export default Button;