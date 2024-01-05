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
			{/* <div className="marketIt">
				<NavLink exact to='/home'>MarketIt</NavLink>
			</div> */}
			{isLoaded && sessionUser && (
			<>
				<div onClick={() => history.push('/home')}>MarketIt Logo</div>
				<button className="post-button" onClick={() => history.push('/posts/new')}>Create Post</button>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</>
			)}
		</div>
	);
}

export default Navigation;
