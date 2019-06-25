import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {


    if (isSignedIn === true) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim blank underline pa3 mt0 pointer'>Sign Out</p>
            </nav>)
    } else {
        return (
            <div>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim blank underline pa3 mt0 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim blank underline pa3 mt0 pointer'>Register</p>
                </nav>
            </div>)
    }
}

export default Navigation;