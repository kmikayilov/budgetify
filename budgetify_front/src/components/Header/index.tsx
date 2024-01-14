import { useNavigate } from 'react-router-dom';
import { FC, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import HeaderLogo from '../../assets/static/icons/budgetify.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faHouse, faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../../helpers/state/authSlice';
import { RootState } from '../../helpers/state/store';

import './Header.scss';

const Header: FC= () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = useCallback(() => {
		dispatch(logout())
		navigate('/')
	}, [navigate, dispatch]);

	const user = useSelector((store: RootState) => store.auth?.user, shallowEqual)

	return (
		<header className="header">
			<div className="header__logo" onClick={ () => navigate('/') }>
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
								<div className="username">{ user.username }</div>
							</div>
							<button className="custom-btn" onClick={ logoutHandler }>
								<div className="icon"><FontAwesomeIcon icon={faRightFromBracket} /></div>
								<div className='title'>Logout</div>
							</button>
						</>
					)
				}
			</div>
		</header>
	);
};

export default Header;
