import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	if(sessionUser) <NavLink exact to ='/home'></NavLink>

	return (
		<div className="navigation-container">
			<div className="marketIt">
				<NavLink exact to='/'>MarketIt</NavLink>
			</div>
			{isLoaded && sessionUser && (
			<>
				<button className="post-button">Create Post</button>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</>
			)}
		</div>
	);
}

export default Navigation;
