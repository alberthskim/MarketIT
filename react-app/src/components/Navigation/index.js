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
				<div onClick={() => history.push('/home')}><img src="marketit-logo.png" alt="logo" style={{width:'150px', height: '100px'}}/></div>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</>
			)}
		</div>
	);
}

export default Navigation;
