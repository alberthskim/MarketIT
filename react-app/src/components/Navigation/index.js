import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	if(sessionUser) <NavLink exact to ='/home'></NavLink>

	return (
		<div className="navigation-container">
		{isLoaded && sessionUser && (
			<div className='navigation-area'>
				<div onClick={() => history.push('/home')}><img className="market-logo" src="../../marketit-logo.png" alt="logo"/></div>
				<input className="search-input" placeholder='Search For Keywords: Jobs, For Sale, Relationship' type="text" />
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</div>
			)}
		</div>
	);
}

export default Navigation;
