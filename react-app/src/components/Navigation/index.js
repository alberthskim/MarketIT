import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	if(sessionUser) <NavLink exact to ='/home'></NavLink>
	return (
		<div className="navigation-container">
			<div>
				<NavLink exact to='/'>MarketIt</NavLink>
			</div>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)} */}
		</div>
	);
}

export default Navigation;
