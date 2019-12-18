import React from 'react'
import { connect } from 'react-redux';
import { deletePicture } from '../actions/TicketActions.js';

function ImageModal(props) {
    // console.log('Image Modal Props: ', props);
    return (
        <div className='modalDiv tooltip' >
            {/* <!-- Trigger the Modal --> */}
            {/* style={{border: '1px solid red'}} */}
            <img className="modalImg" onClick={()=>{props.setActiveImage(props.src)}} src={props.src} alt={props.alt} />
            {/* <!-- The Modal --> */}
            <div id='myModal' className="modal" onClick={()=>{props.setActiveImage('')}} style={{display: props.modalToggle}}>
                {/* <!-- The Close Button --> */}
                <span className="close">&times;</span>
                {/* <!-- Modal Content (The Image) --> */}
                <img className="modal-content" id={props.src} src={props.src} alt={props.alt} style={{maxWidth: props.width}}/>
                {/* <!-- Modal Caption (Image Text) --> */}
                <div id="caption">{props.filename}</div>
            </div>
            {props.editing && <button className='button' style={{marginLeft: '25.5%'}} onClick={()=>{props.deletePicture(props.type, props.parentId, props.id)}}>Delete</button>}
            {!props.active && !props.editing && <span className='tooltiptext' style={{bottom: '102%'}}>Expand</span>}
        </div>
    )
}
const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
    }
  }
  
  export default connect(mapStateToProps, { deletePicture })(ImageModal)
  
