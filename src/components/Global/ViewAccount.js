import React from 'react'

export default function ViewAccount() {
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        // courseSelected: state.CourseBuilderReducer.courseSelected,
    }
  }

export default connect(mapStateToProps, {  })(ViewAccount)
