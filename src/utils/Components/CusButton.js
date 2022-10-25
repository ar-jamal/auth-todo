import React from 'react'

function ButtonCus({style={},...props}) {
    return (<button
        style={{ margin: 12  , color: 'blue', ...style}}
        className={`btn ${props.otherClasses}`}
        onClick={props.click}>{props.titleBut}</button>
    )

}
export default ButtonCus;