import React from 'react'

export default function ImageModal(props) {
    // console.log('Image Modal Props: ', props);
    return (
        <div className='modalDiv'>
            {/* <!-- Trigger the Modal --> */}
            <img className="modalImg" onClick={()=>{props.setActiveImage(props.src)}} src={props.src} alt={props.alt} />
            {/* <!-- The Modal --> */}
            <div id='myModal' className="modal" onClick={()=>{props.setActiveImage('')}} style={{display: props.modalToggle}}>
            {/* <!-- The Close Button --> */}
            <span className="close">&times;</span>
            {/* <!-- Modal Content (The Image) --> */}
            <img className="modal-content" id={props.src} src={props.src} alt={props.alt}/>
            {/* <!-- Modal Caption (Image Text) --> */}
            <div id="caption">caption text if desired</div>
            </div>
        </div>
    )
}
