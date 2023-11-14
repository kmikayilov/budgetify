import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import HeaderLogo from '../../assets/static/icons/budgetify.svg';

// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import AccountCircle from '@mui/icons-material/AccountCircle';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

const Header: React.FC= () => {
	const navigate = useNavigate();

	// const logoutHandler = useCallback(() => {
	// 	dispatch(logout());
	// 	window.location.pathname = '/';
	// }, [dispatch]);

	// const user = useSelector((store: any) => store.auth.loggedUser, shallowEqual)

	const user: boolean = false

	return (
		<header className="header">
			<div className="header__logo">
				<img src={HeaderLogo} alt="header-logo" className="header__logo__img" />
			</div>
			<div className="header__navbar">
				{
					!!user && (
						<>
							<div className="header__navbar__item custom-btn" onClick={ () => navigate('/') }>
								<div className="header__navbar__item__icon icon"><FontAwesomeIcon icon={faHouse} /></div>
								<div className="header__navbar__item__title title">Dashboard</div>
							</div>
							<div className="header__navbar__item custom-btn" onClick={ () => navigate('/transactions') }>
								<div className="header__navbar__item__icon icon"><FontAwesomeIcon icon={faReceipt} /></div>
								<div className="header__navbar__item__title title">Transactions</div>
							</div>
						</>
					)
				}
			</div>
			
			<div className="header__account">
				{
					!user && (
						<button className="custom-btn" onClick={ () => navigate('/sign-in') }>
							<div className='title'>Sign In</div>
						</button>
					)
				}
				{   
					!!user && (
						<>
							<div className="header__account__info">
								<div className="icon"><FontAwesomeIcon icon={faCircleUser} /></div>
								<div className="username">kananmika</div>
							</div>
							<button className="custom-btn" onClick={ () => console.log('logout') }>
								<div className='title'>Logout</div>
							</button>
						</>
					)
				}
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
