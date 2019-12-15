import React from 'react'
import { Link } from 'react-router-dom';

export default function LambdaTK() {
    return (
        <div>
            <div className='courseContainer'>
                <Link to = "/Dashboard/Lambda/Web">
                    <div className='courseBox' style={{backgroundColor: '#2F2C4B'}}>Full Stack Web Development</div>
                </Link>
                <div className='courseBox' style={{backgroundColor: '#14121F'}}>Android Development</div>
                <div className='courseBox' style={{backgroundColor: '#0C3D78'}}>Career Readiness</div>
                <div className='courseBox' style={{backgroundColor: '#3BB5E6'}}>Data Science</div>
                <div className='courseBox' style={{backgroundColor: '#1A61AF'}}>iOS Development</div>
                <div className='courseBox' style={{backgroundColor: '#D84A5A'}}>Java Backend Development</div>
                <div className='courseBox' style={{backgroundColor: '#14121F'}}>Principles for Success</div>
                <div className='courseBox' style={{backgroundColor: '#0C3D78'}}>Ruby on Rails</div>
                <div className='courseBox' style={{backgroundColor: '#3BB5E6'}}>User Experience Design</div>
            </div>
        </div>
    )
}
