import React from "react"

const Unit = (props) => {
    console.log('UNIT', props)
    // props.course.name && onClick


    return (
            <div> 
                <button onClick={props.handleToggle}>Show/Hide</button>
                {props.toggle && <div>
                    <div>
                        <p>{props.course.units[0].name}</p>
                        <p>{props.course.units[0].description}</p>
                    </div>
                </div>}
            </div>
    )

    // if(props.course.name=== "Full Stack Web") {
    //     return (
    //         <div>
    //             <p>{props.course.units[0].name}</p>
    //             <p>{props.course.units[0].description}</p>
    //         </div>
    //     )
    // } else {
    //     return null;
    //     //add if else upon new course endpoints
    // }

}

export default Unit;

