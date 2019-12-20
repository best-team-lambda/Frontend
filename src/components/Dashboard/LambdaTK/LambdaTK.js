import React from 'react'
import { Link } from 'react-router-dom';

export default function LambdaTK() {
    return (
        <div className='helperDashboard'>
            <div className='courseContainer' style={{margin: '0 auto', maxWidth: '1200px'}}>
                <div style={{margin: '0 auto', width: '80%', paddingLeft: '10px'}}>
                    <h1>Welcome</h1>
                    <p>The Lambda School Training Kit is the home for all learning resources at Lambda School. 
                        Our curriculum is constantly evolving to ensure you’re armed with the latest technologies. 
                        You will always have access to the materials in this training kit, even after you graduate. 
                        Pick your track to get started!
                    </p>
                </div>
                <div style={{display: 'flex', margin: '0 auto', width: '80%'}}>
                    <Link to = "/Dashboard/Browse/FullStackWeb">
                        <div className='courseBox' style={{backgroundColor: '#2F2C4B'}}>Full Stack Web Development</div>
                    </Link>
                    <div className='courseBox' style={{backgroundColor: '#14121F'}}>Android Development</div>
                    <div className='courseBox' style={{backgroundColor: '#0C3D78'}}>Career Readiness</div>
                </div>
                <div style={{display: 'flex', margin: '0 auto', width: '80%'}}>
                    <div className='courseBox' style={{backgroundColor: '#3BB5E6'}}>Data Science</div>
                    <div className='courseBox' style={{backgroundColor: '#1A61AF'}}>iOS Development</div>
                    <div className='courseBox' style={{backgroundColor: '#D84A5A'}}>Java Backend Development</div>
                </div>
                <div style={{display: 'flex', margin: '0 auto', width: '80%'}}>
                    <div className='courseBox' style={{backgroundColor: '#14121F'}}>Principles for Success</div>
                    <div className='courseBox' style={{backgroundColor: '#0C3D78'}}>Ruby on Rails</div>
                    <div className='courseBox' style={{backgroundColor: '#3BB5E6'}}>User Experience Design</div>
                </div>
            </div>
        </div>
    )
}
