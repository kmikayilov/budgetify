// import { IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
// import { LinkContainer } from 'react-router-bootstrap';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import HeaderLogo from '../../assets/static/icons/budgetify.svg';

// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import AccountCircle from '@mui/icons-material/AccountCircle';

import './Header.scss';

interface HeaderProps {
	toggle?: Function | null;
}

const Header: React.FC<HeaderProps> = ({ toggle }) => {
	// const navigate = useNavigate();

	// const [anchorEl, setAnchorEl] = useState(null);

	// const isMenuOpen = Boolean(anchorEl);

	// const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
	// const handleMenuClose = () => setAnchorEl(null);

	// const loginBtnHandler = () => navigate('/sign-in');

	// const logoutHandler = useCallback(() => {
	// 	dispatch(logout());
	// 	window.location.pathname = '/';
	// }, [dispatch]);

	// const user = useSelector((store) => store.auth.loggedUser, shallowEqual

	return (
		<header>
			<div className="header__logo">
				<img src={HeaderLogo} alt="header-logo" className="header__logo__img" />
			</div>
			{/* {
				toggle && (
					<IconButton
						className="menuBtn"
						color="inherit"
						aria-label="menu"
						onClick={() => toggle()}>
						<MenuIcon />
					</IconButton>
				)
			} */}

			{/* <LinkContainer exact={true} to="/">
				<Box
					className="title"
					display="flex"
					justifyContent="space-between"
					alignItems="center">
					<AccountBalanceIcon className="logoIcon" /> Budgetify
				</Box>
			</LinkContainer> */}
			{/* {!user && (
				<Button className="actionBtn" onClick={loginBtnHandler} color="inherit">
					Login
				</Button>
			)}
			{   !!user && (
					<div className={['sectionDesktop', 'actionBtn'].join(' ')}>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit">
							<AccountCircle />
							<div className="account-popup">@{user.username}</div>
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							id="primary-search-account-menu"
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
							open={isMenuOpen}
							onClose={handleMenuClose}>
							<MenuItem onClick={logout}>Sign out</MenuItem>
						</Menu>
					</div>
				)
			} */}

		</header>
	);
};

export default Header;
