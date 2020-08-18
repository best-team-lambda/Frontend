import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions/AppActions.js';
import logo from '../../images/logo.png';


function Header(props) {
    const logOut = () => {
        sessionStorage.removeItem('token');
        props.logout();
        props.history.push('/');
    }

  return (
    <>
    <header>
        {props.currentUser 
            ? <Link to='/Dashboard/OpenTickets'><img className="logo" src={logo} alt='Lambda Logo'/></Link> 
            : <Link to='/'><img className="logo" src={logo} alt='Lambda Logo'/></Link>
        }
        {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
            if (props.currentUser){
                return (
                    <>
                    <h4>Welcome {props.currentUser.name}!</h4>
                        <nav className='loggedIn'>
                            {/* <NavLink className='navLink' to='/Dashboard/CourseBuilder'>Course Builder</NavLink> */}
          
                            <NavLink className='navLink' to='/Dashboard/CreateTicket'>Create Ticket</NavLink>
                            {/* <NavLink className='navLink' to='/Dashboard/OpenTickets'>Dashboard</NavLink> */}
                            <NavLink className='navLink' to={`/Dashboard/Account/${props.currentUser.id}`}> My Account</NavLink>
                            <Link className="navLink" to='/' onClick={logOut}>Sign out</Link>
                        </nav>
                    </>
                );
            }
            else{
                return (
                    <>
                    <nav className='notLoggedIn'>
                        <NavLink className='navLink' exact to='/Login'>Login</NavLink>
                        <NavLink className='button' to='/Register'>Register</NavLink>
                    </nav>
                    </>
                );
            }
        })()}
    </header>
    </>
  );
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
    }
  }

export default connect(mapStateToProps, {  logout })(Header)
