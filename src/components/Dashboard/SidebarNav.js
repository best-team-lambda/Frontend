import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSearchTerm, setSearchType, setAskedAnsweredBoth, setOpenClosedAll } from '../../actions/SearchActions.js';

import unclaimed from '../../images/unclaimed.png'
import mine from '../../images/mine.png'
import closed from '../../images/closed.png'

function SidebarNav(props) {
        // console.log('SideBarNav', props.props.location.pathname);

    const handleChange = e => {
        props.setSearchTerm(e.target.value)
      };
    
    const clearSearchTerm = () => {
        props.setSearchTerm('');
    }

    const handleSelect = e => {
        props.setSearchType(e.target.value);
    }

    const handleAskedAnswered = () => {
        if (props.filterByAskedAnsweredBoth === 'All') {
            props.setAskedAnsweredBoth('Asked');
        }
        else if (props.filterByAskedAnsweredBoth === 'Asked') {
            props.setAskedAnsweredBoth('Answered');
        }
        else if (props.filterByAskedAnsweredBoth === 'Answered') {
            props.setAskedAnsweredBoth('All');
        }
    }

    const handleOpenClosed = () => {
        if (props.filterByOpenClosedAll === 'All') {
            props.setOpenClosedAll('Open');
        }
        else if (props.filterByOpenClosedAll === 'Open') {
            props.setOpenClosedAll('Resolved');
        }
        else if (props.filterByOpenClosedAll === 'Resolved') {
            props.setOpenClosedAll('All');
        }
    }


    return (
        <div className='sidebarDiv'>
            <nav className='sidebarNav'>
            <div>
                <img src={unclaimed} alt="Unclaimed tickets" />
                <NavLink className='navLink' to='/Dashboard/Unassigned'>Unassigned</NavLink> 
            </div>
            <div>
                <img src={mine} alt="My tickets" />
                <NavLink className='navLink' to='/Dashboard/Mine'>Mine</NavLink>
            </div>
            <div>
                <img src={closed} alt="Closed tickets" />
                <NavLink className='navLink' to='/Dashboard/Resolved'>Resolved</NavLink>
            </div>
            <div>
                <img src={closed} alt="Closed tickets" />
                <NavLink className='navLink' to='/Dashboard/Lambda'>Lambda</NavLink>
            </div>
            </nav>

            
                
            <div className='filterToolsDiv'>
                {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
                        if(props.props.location.pathname === '/Dashboard/Unassigned' | props.props.location.pathname === '/Dashboard/Mine' | props.props.location.pathname === '/Dashboard/Resolved')
                        {   //only if at any of the three above routes display filter tools.
                            return(
                                <>
                                    <p> Filter by:</p>
                                    <div className="select">
                                        {/* <label for="select-box"> */}
                                        <select id="select-box" onChange={handleSelect} name="searchBy">
                                            <option value="Category">Category</option>
                                            <option value="author">author Name</option>
                                            {props.props.location.pathname !== '/Dashboard/Unassigned' && <option value="Helper">Helper Name</option>}
                                            <option value="Title">Title</option>
                                            <option value="Description">Description</option>
                                            {props.props.location.pathname !== '/Dashboard/Unassigned' && <option value="Solution">Solution</option>}
                                        </select>
                                    </div>
                                    <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} value={props.searchTerm} placeholder="Filter" />
                                    <br />
                                    <button className="button" onClick={clearSearchTerm}>Clear</button>
                                    <br />
                                    {props.props.location.pathname === '/Dashboard/Mine' &&
                                        <>
                                        <label> Asked/Answered:
                                        <button className="button" onClick={handleAskedAnswered}>{props.filterByAskedAnsweredBoth}</button>
                                        </label>
                                        <br />
                                        <label> Status:
                                        <button className="button" onClick={handleOpenClosed}>{props.filterByOpenClosedAll}</button>
                                        </label>
                                        </>
                                    }
                                </>
                            );
                        }
                })()}
            </div>
        </div>  
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        searchType: state.SearchReducer.searchType,
        searchTerm: state.SearchReducer.searchTerm,
        filterByAskedAnsweredBoth: state.SearchReducer.filterByAskedAnsweredBoth,
        filterByOpenClosedAll: state.SearchReducer.filterByOpenClosedAll,
    }
  }

export default connect(mapStateToProps, { setSearchTerm, setSearchType, setAskedAnsweredBoth, setOpenClosedAll })(SidebarNav)